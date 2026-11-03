#!/usr/bin/env node
// Roda TODOS os passos da suíte EM PARALELO, acumulando as falhas, e reprova no fim.
//
// POR QUE ELE EXISTE (medido em 2026-08-18, duas vezes no mesmo dia):
// a suíte era uma cadeia `&&` de 190 passos e PARAVA no primeiro vermelho. De
// manhã isso escondeu ~187 gates; à noite escondeu justamente o gate que
// barraria uma mudança de cache ressuscitada por um merge, e aquele gate estava
// CORRETO, só não foi executado.
//
// POR QUE ELE RODA EM PARALELO (2026-08-20): a suíte era serial e a maior parte
// do relógio era Node subindo. Rodar N de cada vez NÃO muda cobertura nenhuma:
// os mesmos passos rodam, todos, sempre. O que muda é o relógio.
//
// ATENÇÃO: O TETO É O NÚMERO DE NÚCLEOS, não um número escolhido. Acima disso o
// ganho vira contenção: os processos passam a disputar a mesma CPU.
//
// ATENÇÃO: A SAÍDA DE CADA PASSO SAI EM BLOCO, de uma vez, quando ele termina.
// Em paralelo o stdout de vários processos se entrelaçaria linha a linha e o
// relatório deixaria de ser legível.
//
// A lista de gates vem de `workflow.config.json` na raiz do projeto.

import { execFileSync, spawn } from "node:child_process";
import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { cpus } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { entrarNaFila } from "./na-fila.mjs";

export const TETO = Math.max(1, cpus().length || 1);

export function jobsPedidos(bruto) {
  const n = Number(bruto);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : TETO;
}

// Uma FILA COMPARTILHADA, não lotes fixos: em lotes de N, o lote inteiro espera
// pelo item mais lento dele e os outros trabalhadores ficam ociosos. Aqui quem
// termina puxa o próximo. A ordem do resultado é a da entrada, nunca a de
// chegada (2026-08-20).
export async function emParalelo(itens, tarefa, jobs = TETO) {
  const resultados = new Array(itens.length);
  let proximo = 0;
  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(jobs, itens.length)) }, async () => {
      while (proximo < itens.length) {
        const i = proximo++;
        resultados[i] = await tarefa(itens[i], i);
      }
    }),
  );
  return resultados;
}

export function acharRaiz(cwd = process.cwd()) {
  try {
    return execFileSync("git", ["rev-parse", "--path-format=absolute", "--show-toplevel"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return path.resolve(import.meta.dirname, "..");
  }
}

export function lerConfig(raiz = acharRaiz()) {
  const padrao = {
    base: "main",
    remoto: "origin",
    gates: [],
    publicar: null,
    worktrees: ".claude/worktrees",
    links: [".env", "node_modules"],
  };
  let raizPrincipal = raiz;
  try {
    const comum = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], {
      cwd: raiz,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    raizPrincipal = path.dirname(comum);
  } catch {}
  for (const dir of [raiz, raizPrincipal]) {
    const arq = path.join(dir, "workflow.config.json");
    if (!existsSync(arq)) continue;
    try {
      return { ...padrao, ...JSON.parse(readFileSync(arq, "utf8")) };
    } catch {
      continue;
    }
  }
  return padrao;
}

export function lerGates(raiz = acharRaiz()) {
  const cfg = lerConfig(raiz);
  const brutos = Array.isArray(cfg.gates) ? cfg.gates : [];
  return brutos
    .map((g, i) => {
      if (typeof g === "string") {
        const limpo = g.trim();
        return limpo ? { nome: limpo, cmd: limpo, numero: i + 1 } : null;
      }
      if (g && typeof g === "object" && typeof g.cmd === "string" && g.cmd.trim()) {
        const cmd = g.cmd.trim();
        const nome = typeof g.nome === "string" && g.nome.trim() ? g.nome.trim() : cmd;
        return { nome, cmd, numero: i + 1 };
      }
      return null;
    })
    .filter(Boolean);
}

// O RECIBO: quem roda a suíte já sabe quais passos ficaram vermelhos. Sem isto
// a informação morre no console e `gates-do-que-mudou.mjs` redescobre os mesmos
// vermelhos rodando todos os passos de novo.
function caminhoDoRecibo(raiz) {
  const gitDir = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-dir"], {
    cwd: raiz,
    encoding: "utf8",
  }).trim();
  return path.join(gitDir, "wf-recibo-da-suite.json");
}

export function gravarRecibo(raiz, { sha, passos, vermelhos }) {
  try {
    const alvo = caminhoDoRecibo(raiz);
    const tmp = `${alvo}.${process.pid}.tmp`;
    writeFileSync(tmp, JSON.stringify({ sha, em: Date.now(), passos, vermelhos }, null, 2));
    renameSync(tmp, alvo);
  } catch {}
}

export function lerRecibo(raiz, { sha, validadeMs = 30 * 60 * 1000 } = {}) {
  try {
    const r = JSON.parse(readFileSync(caminhoDoRecibo(raiz), "utf8"));
    if (!r || r.sha !== sha || typeof r.em !== "number") return null;
    if (Date.now() - r.em > validadeMs) return null;
    if (!Array.isArray(r.passos) || !Array.isArray(r.vermelhos)) return null;
    return r;
  } catch {
    return null;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const raiz = acharRaiz();

  // Sob `npm run` o npm já põe `node_modules/.bin` no PATH; chamado direto
  // (`node scripts/rodar-gates.mjs`), sem isto passos que chamam binários locais
  // falham por PRÉ-CONDIÇÃO, que é indistinguível de defeito (2026-08-20).
  const AMBIENTE = {
    ...process.env,
    PATH: `${path.join(raiz, "node_modules/.bin")}${path.delimiter}${process.env.PATH ?? ""}`,
  };

  const argumentos = process.argv.slice(2);
  const bandeira = (nome) => {
    const a = argumentos.find((x) => x.startsWith(`--${nome}=`));
    return a === undefined ? null : a.slice(nome.length + 3);
  };

  const SO = bandeira("so");
  const JOBS = jobsPedidos(bandeira("jobs"));
  const LISTA = bandeira("lista");

  const todos = lerGates(raiz);
  if (todos.length === 0) {
    console.error("Nenhum gate configurado em `workflow.config.json` (campo `gates`).");
    process.exit(2);
  }

  let passos = todos;
  if (SO !== null) {
    passos = todos.filter((p) => p.nome.includes(SO) || p.cmd.includes(SO));
    if (passos.length === 0) {
      console.error(`Nenhum passo da suíte contém "${SO}". Os disponíveis:`);
      for (const p of todos) console.error(`  ${p.nome}: ${p.cmd}`);
      process.exit(1);
    }
  }
  if (LISTA !== null) {
    try {
      const escolhidos = new Set(readFileSync(LISTA, "utf8").split("\n").map((l) => l.trim()).filter(Boolean));
      passos = passos.filter((p) => escolhidos.has(p.nome) || escolhidos.has(p.cmd));
    } catch {
      console.error(`Não consegui ler --lista=${LISTA}; rodo a suíte inteira.`);
    }
  }
  const parcial = passos.length !== todos.length;

  await entrarNaFila("gates", 2);

  const comeco = Date.now();
  const REGUA = "=".repeat(76);

  function imprimir(r) {
    console.log(REGUA);
    console.log(
      `${r.codigo === 0 ? "PASSOU" : "FALHOU"}  passo ${r.numero}/${todos.length}  (${(r.ms / 1000).toFixed(1)}s)  ${r.nome} (${r.cmd})`,
    );
    console.log(REGUA);
    if (r.saida) process.stdout.write(r.saida.endsWith("\n") ? r.saida : `${r.saida}\n`);
  }

  function rodarUm(item) {
    return new Promise((resolve) => {
      const t0 = Date.now();
      let saida = "";
      const filho = spawn(item.cmd, { cwd: raiz, shell: true, env: AMBIENTE });
      filho.stdout.on("data", (d) => { saida += d; });
      filho.stderr.on("data", (d) => { saida += d; });
      filho.on("error", (e) => {
        saida += `${e?.message ?? e}\n`;
        resolve({ ...item, codigo: 1, saida, ms: Date.now() - t0 });
      });
      filho.on("close", (codigo) => resolve({ ...item, codigo: codigo ?? 1, saida, ms: Date.now() - t0 }));
    });
  }

  const resultados = await emParalelo(passos, async (item) => {
    const r = await rodarUm(item);
    imprimir(r);
    return r;
  }, JOBS);

  const vermelhos = resultados.filter((r) => r.codigo !== 0).sort((a, b) => a.numero - b.numero);
  const segundos = ((Date.now() - comeco) / 1000).toFixed(1);
  const verdes = passos.length - vermelhos.length;

  try {
    // Recibo só com árvore LIMPA: com mudança não commitada, o verde mediu outra
    // coisa que não o HEAD, e o pre-push aprovaria o commit sem rodar nada
    // (revisão 2026-11-02).
    const sujo = execFileSync("git", ["status", "--porcelain"], { cwd: raiz, encoding: "utf8" }).trim();
    if (sujo) throw new Error("árvore suja: sem recibo");
    const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: raiz, encoding: "utf8" }).trim();
    gravarRecibo(raiz, {
      sha,
      passos: passos.map((p) => p.nome),
      vermelhos: vermelhos.map((v) => v.nome),
    });
  } catch {}

  console.log("");
  console.log(`suíte: ${passos.length} passos · ${verdes} verdes · ${vermelhos.length} vermelhos · ${segundos}s · ${JOBS} em paralelo`);

  if (parcial && SO !== null) {
    console.log("");
    console.log(`EXECUÇÃO PARCIAL: --so=${SO} rodou ${passos.length} de ${todos.length} passos.`);
    console.log("Isto NÃO é a suíte completa. Rode sem --so antes de concluir.");
  }

  if (vermelhos.length === 0) {
    console.log("Tudo passou.");
    process.exit(0);
  }

  console.log("");
  console.log("VERMELHOS (todos rodaram, nenhum ficou escondido):");
  for (const v of vermelhos) {
    console.log(`  passo ${v.numero}/${todos.length} (saída ${v.codigo}): ${v.nome} -> ${v.cmd}`);
  }
  process.exit(1);
}
