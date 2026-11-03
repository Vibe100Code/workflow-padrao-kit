#!/usr/bin/env node
// Roda UM comando dentro da fila de trabalho pesado da máquina (decisão de 2026-08-20).
//
//   node scripts/na-fila.mjs [--rotulo=nome] -- <comando e argumentos>
//
// O QUE ISSO CONSERTA, medido em 2026-08-20: SEIS `integrar` rodando juntos, de
// três sessões, o mais velho havia 36 minutos. Cada um roda a suíte inteira e
// disputa os mesmos núcleos, então todos ficam lentos ao mesmo tempo; e quando
// a base anda no meio, o rebase manda cada um recomeçar do `fetch`, multiplicando
// o trabalho de todos em vez de somar. Naquele dia custou 38 minutos e três
// tentativas para UMA integração passar.
//
// A fila é por MÁQUINA, não por worktree: o ticket vive no `.git` COMUM, que os
// checkouts compartilham. É FIFO por prioridade e ordem de chegada, com ticket
// numerado.
//
// ATENÇÃO: ELA NÃO SUBSTITUI O REBASE. O git já serializa o push, e o `integrar`
// já recomeça quando é rejeitado. A fila resolve outra coisa: o DESPERDÍCIO de
// rodar N suítes ao mesmo tempo para que N-1 sejam jogadas fora.

import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { constants } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ESPERA_MS = Number(process.env.WF_FILA_ESPERA_MS) || 5000;
// Ticket sem sinal de vida por mais que isto é considerado morto. Generoso de
// propósito: derrubar o ticket de quem está trabalhando é pior que esperar demais.
const SEM_VIDA_MS = Number(process.env.WF_FILA_SEM_VIDA_MS) || 90_000;

function pasta(nome = "") {
  if (process.env.WF_FILA_DIR) {
    const d = nome ? `${process.env.WF_FILA_DIR}-${nome}` : process.env.WF_FILA_DIR;
    mkdirSync(d, { recursive: true });
    return d;
  }
  const comum = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], {
    encoding: "utf8",
  }).trim();
  const p = path.join(comum, nome ? `wf-fila-da-${nome}` : "wf-fila-de-integracao");
  mkdirSync(p, { recursive: true });
  return p;
}

function vivo(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return e.code === "EPERM";
  }
}

// ESCRITA ATÔMICA (2026-10-08). `writeFileSync` TRUNCA e depois escreve: quem lê
// no meio vê arquivo vazio ou cortado. MEDIDO: com um escritor e um leitor
// disputando o mesmo ticket, 15.283 de 67.792 leituras (22%) não eram JSON. E a
// leitura que falhava APAGAVA o ticket, inclusive o de quem estava RODANDO, e o
// próximo da fila entrava com a suíte do primeiro ainda de pé (levando a máquina
// a load 140 com duas suítes juntas). Renomear é atômico no mesmo sistema de
// arquivos: quem lê vê o arquivo velho inteiro ou o novo inteiro.
export function gravarTicket(arquivo, t) {
  const tmp = `${arquivo}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(t));
  renameSync(tmp, arquivo);
}

// Lê a fila já limpa: ticket de processo morto, ou parado há muito tempo, sai.
// Sem esta limpeza, um `kill -9` no meio de uma integração tranca a máquina
// inteira.
//
// Ticket ILEGÍVEL não é ticket morto: só sai se o ARQUIVO estiver parado há mais
// que SEM_VIDA_MS, nunca porque a leitura caiu no meio de uma escrita.
//
// A ORDEM: quem já está RODANDO vem primeiro (a vez não se toma de quem está no
// meio do trabalho), depois a PRIORIDADE (0 = integrar, 1 = régua do push,
// 2 = suíte avulsa), e por fim a ordem de chegada.
function fila(dir) {
  const itens = [];
  for (const nome of readdirSync(dir)) {
    if (!nome.endsWith(".json")) continue;
    const alvo = path.join(dir, nome);
    let t;
    try {
      t = JSON.parse(readFileSync(alvo, "utf8"));
    } catch {
      try {
        if (Date.now() - statSync(alvo).mtimeMs > SEM_VIDA_MS) rmSync(alvo, { force: true });
      } catch {}
      continue;
    }
    const morto = !vivo(t.pid);
    const parado = Date.now() - (t.visto ?? 0) > SEM_VIDA_MS;
    if (morto || parado) {
      rmSync(alvo, { force: true });
      continue;
    }
    itens.push({ ...t, arquivo: alvo });
  }
  const prio = (t) => (t.prioridade === undefined ? -1 : t.prioridade);
  return itens.sort(
    (a, b) => (b.rodando ? 1 : 0) - (a.rodando ? 1 : 0) || prio(a) - prio(b) || a.ordem - b.ordem,
  );
}

// A DECISÃO "é minha vez?" e o carimbo `rodando` acontecem sob trava (mkdir é
// atômico). A trava mora FORA da pasta dos tickets (medido em 2026-10-08: dentro
// dela, leitores que varrem a pasta podiam colidir com o diretório).
function comTrava(dir, fn) {
  const trava = `${dir}.trava`;
  for (;;) {
    try {
      mkdirSync(trava);
      break;
    } catch {
      try {
        if (Date.now() - statSync(trava).mtimeMs > 10_000) rmSync(trava, { recursive: true, force: true });
      } catch {}
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20);
    }
  }
  try {
    return fn();
  } finally {
    rmSync(trava, { recursive: true, force: true });
  }
}

// REENTRÂNCIA SÓ PARA DESCENDENTE DO DONO (2026-10-08). O `integrar` segura a vez
// e chama `rodar-gates` / `gates-do-que-mudou`: o filho herda WF_FILA_DONO e
// confere se o pid do ticket está na cadeia de pais antes de passar direto.
function ancestrais() {
  const cadeia = new Set();
  let pid = process.pid;
  for (let i = 0; i < 64 && pid > 1; i++) {
    cadeia.add(pid);
    try {
      pid = Number(execFileSync("ps", ["-o", "ppid=", "-p", String(pid)], { encoding: "utf8" }).trim());
    } catch {
      break;
    }
  }
  return cadeia;
}

// QUEM PEGA A VEZ VAI PARA SEGUNDO PLANO NO MACOS (2026-10-09). `taskpolicy -b -p`
// põe o próprio processo em prioridade de fundo (CPU e disco), e todo filho que
// ele disparar depois herda. Medido no mesmo dia: uma suíte local fora disso
// levou o Mac a load 64 em 12 núcleos.
export function deFundo(pid) {
  if (process.platform !== "darwin" || process.env.WF_FILA_PRIMEIRO_PLANO === "1") return false;
  let ok = true;
  try { execFileSync("/usr/sbin/taskpolicy", ["-b", "-p", String(pid)], { stdio: "ignore" }); } catch { ok = false; }
  try { execFileSync("/usr/bin/renice", ["-n", "15", "-p", String(pid)], { stdio: "ignore" }); } catch { ok = false; }
  return ok;
}

// O CARIMBO CONTINUA ENQUANTO O TRABALHO RODA, num processo próprio (2026-08-20
// e 2026-10-07). Um temporizador no processo dono para quando o laço de eventos
// trava em `spawnSync`/`execFileSync`: na primeira integração real, passados os
// 90 s de `SEM_VIDA_MS`, o ticket de quem estava integrando foi lido como parado,
// apagado por outro processo, e o próximo da fila entrou com a máquina ocupada.
// E o pulso guarda uma cópia do ticket em memória (2026-10-08) para regravá-lo se
// for removido enquanto o dono ainda vive.
function manterVivo(arquivo) {
  const ticket = JSON.parse(readFileSync(arquivo, "utf8"));
  const codigo = `
    const fs = require("node:fs");
    const [arquivo, pid, inicial] = process.argv.slice(1);
    const t = JSON.parse(inicial);
    const bater = () => {
      try { process.kill(Number(pid), 0); } catch (e) {
        if (e.code !== "EPERM") { try { fs.rmSync(arquivo, { force: true }); } catch {} process.exit(0); }
      }
      t.visto = Date.now();
      const tmp = arquivo + "." + process.pid + ".tmp";
      fs.writeFileSync(tmp, JSON.stringify(t));
      fs.renameSync(tmp, arquivo);
    };
    bater();
    setInterval(bater, ${Math.max(50, Math.floor(SEM_VIDA_MS / 3))});
  `;
  const filho = spawn(process.execPath, ["-e", codigo, arquivo, String(process.pid), JSON.stringify(ticket)], { stdio: "ignore" });
  filho.unref();
  return filho;
}

export async function esperarAVez({ branch, aoEsperar, prioridade = 1, fila: nomeDaFila = "" }) {
  const dir = pasta(nomeDaFila);
  const VAR_DONO = nomeDaFila ? `WF_FILA_${nomeDaFila.toUpperCase()}_DONO` : "WF_FILA_DONO";
  if (process.env.WF_SEM_FILA === "1") {
    console.error("[fila] WF_SEM_FILA=1: rodando FORA da fila. Só para emergência.");
    return () => {};
  }
  const dono = Number(process.env[VAR_DONO]);
  if (dono) {
    const t = fila(dir).find((x) => x.ordem === dono);
    if (t && ancestrais().has(t.pid)) return () => {};
  }
  const ordem = Date.now() * 1000 + (process.pid % 1000);
  const meu = path.join(dir, `${ordem}.json`);
  const carimbar = (rodando = false) => gravarTicket(meu, { pid: process.pid, ordem, branch, prioridade, rodando, visto: Date.now() });
  carimbar();

  let pulso = null;
  const sair = () => {
    if (pulso) {
      try { pulso.kill("SIGKILL"); } catch {}
      pulso = null;
    }
    try { rmSync(meu, { force: true }); } catch {}
  };
  for (const s of ["SIGINT", "SIGTERM"]) process.on(s, () => { sair(); process.exit(130); });
  process.on("exit", sair);

  // Só reimprime quando o QUADRO muda (posição ou composição da fila). Repetir
  // linha idêntica a cada 5 s vira ruído; imprimir uma vez só deixa a tela
  // parada sem dizer se a fila andou (2026-08-20).
  let ultimo = "";
  const desde = Date.now();
  for (;;) {
    const { atual, posicao } = comTrava(dir, () => {
      carimbar();
      const atual = fila(dir);
      const posicao = atual.findIndex((t) => t.ordem === ordem);
      if (posicao <= 0) carimbar(true);
      return { atual, posicao };
    });
    if (posicao <= 0) {
      pulso = manterVivo(meu);
      process.env[VAR_DONO] = String(ordem);
      deFundo(process.pid);
      return sair;
    }

    const quadro = atual.map((t) => `${t.pid}:${t.branch}`).join("|");
    if (quadro !== ultimo) {
      aoEsperar?.(posicao, atual, Math.round((Date.now() - desde) / 1000));
      ultimo = quadro;
    }
    await new Promise((r) => setTimeout(r, ESPERA_MS));
  }
}

export function quemEstaIntegrando() {
  if (!existsSync(pasta())) return [];
  return fila(pasta());
}

export function entrarNaFila(tarefa, prioridade = 1) {
  let ramo = "?";
  try {
    ramo = execFileSync("git", ["branch", "--show-current"], { encoding: "utf8" }).trim() || "?";
  } catch {}
  return esperarAVez({
    branch: `${tarefa} em ${ramo}`,
    prioridade,
    aoEsperar: (posicao, atual, esperando) => {
      console.log(`[fila] ${new Date().toLocaleTimeString("pt-BR")}: você é o ${posicao + 1}o de ${atual.length}, esperando há ${esperando}s`);
      atual.forEach((t, k) => {
        const marca = k === 0 ? "RODANDO " : k === posicao ? "você    " : "na fila ";
        console.log(`[fila]   ${marca} ${t.branch} (pid ${t.pid})`);
      });
      console.log("[fila] Um trabalho pesado por vez nesta máquina. Esperando, não precisa fazer nada.");
    },
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  const corte = argv.indexOf("--");
  const antes = corte === -1 ? [] : argv.slice(0, corte);
  const comando = corte === -1 ? argv : argv.slice(corte + 1);
  if (!comando.length) {
    console.error("uso: node scripts/na-fila.mjs [--rotulo=nome] -- <comando>");
    process.exit(2);
  }
  const rotulo = antes.find((a) => a.startsWith("--rotulo="))?.slice(9) ?? comando.join(" ").slice(0, 60);

  let filho = null;
  // Registrados ANTES da fila: os handlers rodam na ordem de registro, e o filho
  // tem de morrer antes de a fila soltar o ticket e sair.
  for (const s of ["SIGINT", "SIGTERM"]) {
    process.on(s, () => {
      if (filho) try { filho.kill(s); } catch {}
    });
  }

  const sair = await entrarNaFila(rotulo);
  // Comando em partes vai SEM shell: juntar com espaço perdia as aspas e quebrava
  // caminho com espaço ("/Volumes/Portable SSD/..."). Uma string só (com && ou |)
  // continua indo pelo shell, que é o que ela pede (revisão 2026-11-02).
  filho = comando.length === 1
    ? spawn(comando[0], { stdio: "inherit", shell: true, env: process.env })
    : spawn(comando[0], comando.slice(1), { stdio: "inherit", env: process.env });
  // Sem shell, binário inexistente/sem permissão vira evento "error" (não "exit"):
  // sem ouvinte o Node abortava sem soltar a fila (2ª revisão 2026-11-02).
  filho.on("error", (err) => {
    console.error(`[na-fila] falha ao executar ${comando[0]}: ${err.message}`);
    sair();
    process.exit(127);
  });
  filho.on("exit", (codigo, sinal) => {
    sair();
    process.exit(codigo ?? 128 + (constants.signals[sinal] ?? 0));
  });
}
