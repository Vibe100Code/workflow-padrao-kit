#!/usr/bin/env node
// Bloqueia o que VOCÊ quebrou; avisa sobre o que já estava quebrado (2026-08-10).
//
// O CICLO VICIOSO QUE ISTO EXISTE PARA CORTAR:
//
//   `main` fica vermelha por um gate qualquer
//     -> o `pre-push` reprova TODO push, de todo mundo, por culpa alheia
//     -> toda sessão passa a usar `git push --no-verify`
//     -> `--no-verify` não escolhe: ele libera o defeito ALHEIO **e o seu**
//     -> o defeito seguinte entra na `main` sem ninguém ver
//
// Foi assim que três vermelhos herdados em 2026-08-09 produziram o quarto: um
// arquivo de 382 KB contra um teto de 350 KB entrou na `main` num push que
// passou por cima do gancho, e ele não era o problema de ninguém, era só o
// próximo a passar pela porta que já estava escancarada.
//
// A SAÍDA NÃO É "reprovar mais", é REPROVAR O CERTO. Um gate que já falhava na
// base não é seu: avisa alto e deixa passar. Um gate que passava na base e
// falha no seu HEAD é seu: bloqueia. `--no-verify` deixa de ser rotina e volta
// a ser exceção, que é a única condição em que ele protege alguma coisa.
//
// O CUSTO É ZERO NO CASO COMUM, e isso é desenho, não sorte: com tudo verde
// roda-se exatamente o mesmo que hoje. A comparação com a base só acontece
// quando algo falhou, e só para o(s) gate(s) que falharam: rodar a suíte duas
// vezes deixaria o gancho lento, e gancho lento é gancho que alguém desliga.
//
// Rode: node scripts/gates-do-que-mudou.mjs

import { execFileSync, spawn } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { entrarNaFila } from "./na-fila.mjs";
import { acharRaiz, emParalelo, jobsPedidos, lerConfig, lerGates, lerRecibo } from "./rodar-gates.mjs";

const RAIZ = acharRaiz();

function git(...args) {
  return execFileSync("git", args, { cwd: RAIZ, encoding: "utf8" }).trim();
}

function gitQuieto(...args) {
  try { return git(...args); } catch { return ""; }
}

// A SAÍDA INTEIRA VAI PARA ARQUIVO, SEMPRE. Em 20/08/2026 a régua acusou dois
// vermelhos herdados como "DESTE trabalho" e a causa nunca foi encontrada,
// porque quem rodou usou `| tail -30` e o pipe cortou a linha que diz por que
// ela desistiu de comparar. Evidência que depende de quem roda lembrar de não
// usar pipe não é evidência.
const gitDir = gitQuieto("rev-parse", "--path-format=absolute", "--git-dir") || path.join(RAIZ, ".git");
const LOG = path.join(gitDir, "wf-regua-ultima.log");
try {
  mkdirSync(path.dirname(LOG), { recursive: true });
  writeFileSync(LOG, `# ${new Date().toISOString()}\n`);
} catch {}
const registrar = (linha) => {
  try { appendFileSync(LOG, linha + "\n"); } catch {}
};
for (const canal of ["log", "error"]) {
  const original = console[canal].bind(console);
  console[canal] = (...args) => {
    registrar(args.map(String).join(" "));
    original(...args);
  };
}

const cfg = lerConfig(RAIZ);
let passos = lerGates(RAIZ);

const listaArg = process.argv.slice(2).find((a) => a.startsWith("--lista="))?.slice("--lista=".length);
if (listaArg) {
  try {
    const escolhidos = new Set(readFileSync(listaArg, "utf8").split("\n").map((l) => l.trim()).filter(Boolean));
    passos = passos.filter((g) => escolhidos.has(g.nome) || escolhidos.has(g.cmd));
  } catch {
    console.error(`[gates] --lista=${listaArg} ilegível: comparo a suíte inteira.`);
  }
}

if (passos.length === 0) {
  console.error("[gates] não consegui ler os gates de `workflow.config.json`: não vou fingir que conferi.");
  process.exit(1);
}

const JOBS = jobsPedidos(
  process.argv.slice(2).find((a) => a.startsWith("--jobs="))?.slice("--jobs=".length),
);

// OS PIPES SÃO DRENADOS, nunca deixados encher. A saída do gate não interessa
// aqui (esta régua só lê o código de saída), mas um filho cujo stdout enche o
// buffer e ninguém lê PARA DE ESCREVER e trava para sempre.
function rodar(p, cwd) {
  const env = {
    ...process.env,
    PATH: `${path.join(cwd, "node_modules/.bin")}${path.delimiter}${process.env.PATH ?? ""}`,
  };
  return new Promise((resolve) => {
    const filho = spawn(p.cmd, { cwd, shell: true, env });
    filho.stdout.on("data", () => {});
    filho.stderr.on("data", () => {});
    filho.on("error", () => resolve(false));
    filho.on("close", (codigo) => resolve(codigo === 0));
  });
}

// O recibo só vale para o MESMO commit e por 30 minutos. Divergiu, venceu ou
// não existe -> roda tudo, exatamente como antes. Fail-closed: o atalho é a
// exceção, não o caminho.
const VALIDADE_DO_RECIBO_MS = 30 * 60 * 1000;

async function principal() {
  await entrarNaFila("regua", 1);
  const shaAqui = gitQuieto("rev-parse", "HEAD") || null;
  const arvoreLimpa = gitQuieto("status", "--porcelain") === "";
  const recibo = shaAqui && arvoreLimpa ? lerRecibo(RAIZ, { sha: shaAqui, validadeMs: VALIDADE_DO_RECIBO_MS }) : null;

  const falharam = [];
  if (recibo) {
    console.log(`[gates] recibo da suíte deste commit (${shaAqui.slice(0, 7)}): ${recibo.vermelhos.length} vermelho(s) entre os ${recibo.passos.length} passos que a suíte mediu.`);
    const desconhecidos = recibo.vermelhos.filter((v) => !passos.some((p) => p.nome === v));
    if (desconhecidos.length) {
      console.error(`[gates] o recibo traz vermelho(s) que não estão na minha lista: ${desconhecidos.join(", ")}`);
      console.error("        Não vou fingir que conferi.");
      process.exit(1);
    }
    // Passo que a suíte mediu -> vale o recibo. Passo que ela NÃO mediu -> roda
    // aqui, em paralelo como a suíte de verdade.
    const foraDoRecibo = passos.filter((p) => !recibo.passos.includes(p.nome));
    for (const p of passos) {
      if (recibo.passos.includes(p.nome) && recibo.vermelhos.includes(p.nome)) falharam.push(p);
    }
    if (foraDoRecibo.length > 0) {
      const verde = new Map();
      await emParalelo(
        foraDoRecibo,
        async (p) => { verde.set(p.nome, await rodar(p, RAIZ)); },
        JOBS,
      );
      falharam.push(...foraDoRecibo.filter((p) => !verde.get(p.nome)));
    }
    for (const p of falharam) console.log(`  vermelho  ${p.nome}`);
  } else {
    console.log(`[gates] ${passos.length} passos no seu HEAD, ${JOBS} em paralelo…`);
    const verde = new Map();
    await emParalelo(
      passos,
      async (p) => { verde.set(p.nome, await rodar(p, RAIZ)); },
      JOBS,
    );
    falharam.push(...passos.filter((p) => !verde.get(p.nome)));
    for (const p of falharam) console.log(`  vermelho  ${p.nome}`);
  }

  if (falharam.length === 0) {
    console.log("[gates] tudo verde.");
    process.exit(0);
  }

  console.log(`\n[gates] ${falharam.length} vermelho(s). Conferindo quais já estavam assim ANTES de você…`);

  // O `fetch` ATUALIZA a base; ele não é o que a PRODUZ. `merge-base` responde
  // da ref local, offline. Separar os dois é o que impede uma indisponibilidade
  // de rede de virar diagnóstico sobre o seu trabalho: em 2026-08-19 o fetch
  // falhou por instantes e a suíte reportou 32 vermelhos como SEUS quando os
  // medidos eram 2, e os dois eram herdados.
  let base;
  let baseDesatualizada = false;
  try {
    git("fetch", cfg.remoto, cfg.base, "--quiet");
  } catch {
    baseDesatualizada = true;
  }
  const refRemota = `${cfg.remoto}/${cfg.base}`;
  const refComparacao = gitQuieto("rev-parse", "--verify", "--quiet", refRemota) ? refRemota : cfg.base;
  try {
    base = git("merge-base", "HEAD", refComparacao);
  } catch {
    console.error(`[gates] não existe \`${refComparacao}\` local para comparar. Sem base, tudo conta como SEU.`);
    process.exit(1);
  }
  if (baseDesatualizada) {
    console.log(
      `[gates] sem rede: comparando com a \`${refComparacao}\` que já estava no disco.\n`
        + "        A base pode estar velha, então gate que a base acabou de quebrar\n"
        + "        aparece como SEU. É estreito para o lado seguro, de propósito.",
    );
  }

  function acharItemAcima(item) {
    let d = RAIZ;
    for (;;) {
      const alvo = path.join(d, item);
      if (existsSync(alvo)) return alvo;
      const acima = path.dirname(d);
      if (acima === d) return null;
      d = acima;
    }
  }

  // A ÁRVORE DA BASE NASCE DENTRO DO PROJETO, não em /tmp (medido em 2026-08-19:
  // fora do projeto a resolução de módulos pelo caminho real falhava por
  // infraestrutura e cobrava todo vermelho herdado de quem estava integrando).
  const dir = mkdtempSync(path.join(RAIZ, ".base-"));
  const arvore = path.join(dir, "arvore");
  let meus = falharam;
  let herdados = [];
  let comparavel = false;
  try {
    git("worktree", "add", "--detach", arvore, base, "--quiet");
    const links = Array.isArray(cfg.links) ? cfg.links : [".env", "node_modules"];
    for (const item of links) {
      const origem = acharItemAcima(item);
      const destino = path.join(arvore, item);
      if (origem && !existsSync(destino)) {
        try {
          mkdirSync(path.dirname(destino), { recursive: true });
          symlinkSync(origem, destino);
        } catch {}
      }
    }

    const gatesDaBase = new Map(lerGates(arvore).map((g) => [g.nome, g.cmd]));

    // CONTROLE: sem isto, gate que morre por INFRAESTRUTURA na base é lido como
    // "já estava vermelho" e LIBERA o push (fail-open). O controle é um passo
    // que está VERDE no seu HEAD e já existia na base: se ele reprovar ali, quem
    // está quebrado é a comparação, não o código.
    const verdesAqui = passos.filter((p) => !falharam.includes(p));
    const controle = verdesAqui.find((p) => gatesDaBase.get(p.nome) === p.cmd);
    // Sem controle (um gate só, ou todos vermelhos aqui) não há como provar que a
    // base roda: a comparação fica NÃO confiável e o vermelho conta como seu
    // (fail-closed; revisão 2026-11-02).
    if (!controle) throw new Error("sem gate verde para servir de controle: a comparação não é confiável");
    if (!(await rodar(controle, arvore))) {
      throw new Error(`o controle (${controle.nome}) reprovou na base: a comparação não é confiável`);
    }
    comparavel = true;

    const julgados = await emParalelo(
      falharam,
      async (p) => {
        // Gate que não existia na base (ou mudou de comando nesta branch) é
        // responsabilidade desta branch: não há como ser herdado.
        if (gatesDaBase.get(p.nome) !== p.cmd) return { nome: p.nome, meu: true };
        return { nome: p.nome, meu: await rodar(p, arvore) };
      },
      JOBS,
    );
    const meu = new Map(julgados.map((j) => [j.nome, j.meu]));
    meus = falharam.filter((p) => meu.get(p.nome));
    herdados = falharam.filter((p) => !meu.get(p.nome));
  } catch (e) {
    console.error(`\n[gates] não consegui comparar com a base: ${e?.message ?? e}`);
  } finally {
    try { git("worktree", "remove", "--force", arvore); } catch {}
    rmSync(dir, { recursive: true, force: true });
  }

  if (!comparavel) {
    console.error(`[gates] ${falharam.length} vermelho(s) e nenhuma base confiável para comparar: tratando todos como seus.`);
    for (const p of falharam) console.error(`      · ${p.nome}`);
    console.error("\nSe for deliberado: git push --no-verify\n");
    process.exit(1);
  }

  // SEGUNDA OPINIÃO ANTES DE ACUSAR (2026-08-20). Um gate que a suíte mediu sob
  // vários processos em paralelo pode ter ficado vermelho por DISPUTA de
  // recursos, não por defeito. Rerodar em série cada candidato descarta a
  // contenção antes de bloquear.
  const instaveis = [];
  if (meus.length > 0) {
    console.log(`\n[gates] ${meus.length} candidato(s) a defeito SEU. Rerodando cada um SOZINHO antes de acusar…`);
    const aindaVermelhos = [];
    for (const p of meus) {
      let passouSozinho = false;
      try { passouSozinho = await rodar(p, RAIZ); } catch { passouSozinho = false; }
      if (passouSozinho) instaveis.push(p);
      else aindaVermelhos.push(p);
    }
    meus = aindaVermelhos;
  }

  if (instaveis.length > 0) {
    console.log("");
    console.log(`AVISO: ${instaveis.length} gate(s) instável sob carga (vermelho na suíte, verde sozinho):`);
    for (const p of instaveis) console.log(`      · ${p.nome}`);
    console.log("    Eles não bloqueiam: rodando isolados no MESMO código, passam.");
  }

  if (herdados.length > 0) {
    console.log("");
    console.log(`AVISO: ${herdados.length} gate(s) JÁ estavam vermelhos em ${base.slice(0, 7)}, de onde`);
    console.log("    o seu trabalho saiu (não são seus):");
    for (const p of herdados) {
      console.log(`      · ${p.nome} (${p.cmd})`);
    }
    console.log(`    Se já foi consertado depois, \`git rebase ${refComparacao}\` some com o aviso.`);
  }

  if (meus.length === 0) {
    console.log("\n[gates] nada NOVO quebrou. Push liberado.");
    process.exit(0);
  }

  console.error("");
  console.error(`FALHA: ${meus.length} gate(s) que passavam em ${base.slice(0, 7)} e falham no seu HEAD:`);
  for (const p of meus) console.error(`      · ${p.nome} (${p.cmd})`);
  console.error("");
  console.error("Rode o gate sozinho para ver o motivo. Se for deliberado: git push --no-verify");
  console.error("");
  process.exit(1);
}

principal().catch((e) => {
  console.error(`[gates] falhei antes de terminar de conferir: ${e?.message ?? e}`);
  process.exit(1);
});
