#!/usr/bin/env node
// Integra a tarefa na base validando DEPOIS do rebase (2026-08-10).
//
//   node scripts/integrar.mjs
//
// O QUE ISTO CONSERTA, e é o defeito mais caro medido em 2026-08-10:
//
// Com 20 pushes por hora na `main`, duas sessões integram quase juntas. O git
// já serializa isso: o segundo push é REJEITADO, e nada se perde por aí
// (medido: zero retrocesso no histórico de `origin/main`). O estrago vem do
// que se faz DEPOIS da rejeição: rebasear, resolver conflito às pressas e
// publicar um trabalho que foi validado numa base que já não existe.
//
// Foi assim que `46e22f9` entrou: um rebase de 65 commits com 11 conflitos
// resolvidos. Ele passou nos tipos, nos gates e no build, e mesmo assim apagou
// TRÊS peças aprovadas na tela.
//
// Conflito não é erro de digitação: são dois códigos VÁLIDOS.
//
// A INVARIANTE, e é só ela: o que sobe é exatamente o que foi validado.
// Qualquer rejeição reinicia do `fetch`, nunca dos gates.

import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { esperarAVez } from "./na-fila.mjs";
import { acharRaiz, lerConfig } from "./rodar-gates.mjs";

const RAIZ = acharRaiz();
const SCRIPTS_DIR = import.meta.dirname;
const git = (...a) => execFileSync("git", a, { cwd: RAIZ, encoding: "utf8" }).trim();
const gitQuieto = (...a) => {
  try { return git(...a); } catch { return ""; }
};

const cfg = lerConfig(RAIZ);
const TENTATIVAS = 3;

const branch = git("rev-parse", "--abbrev-ref", "HEAD");
if (branch === cfg.base || branch === "main" || branch === "master" || branch === "HEAD") {
  console.error(`Você está em \`${branch}\`. Integrar é levar uma TAREFA para a \`${cfg.base}\`.`);
  process.exit(1);
}

const sujos = gitQuieto("status", "--porcelain").split("\n").filter(Boolean);
if (sujos.length) {
  console.error("Há trabalho não salvo. Commite antes de integrar:");
  for (const s of sujos.slice(0, 10)) console.error(`  ${s}`);
  process.exit(1);
}

// A FILA VEM DEPOIS DAS CONFERÊNCIAS BARATAS E ANTES DE GASTAR CPU.
// Antes delas, quem está na `main` ou com arquivo sujo esperaria a vez só para
// ser recusado no primeiro passo. Prioridade 0: a integração passa na frente de
// suíte avulsa que ainda espera (2026-10-08).
await esperarAVez({
  branch,
  prioridade: 0,
  aoEsperar: (posicao, atual, esperando) => {
    console.log("");
    console.log(`[fila] ${new Date().toLocaleTimeString("pt-BR")}: você é o ${posicao + 1}o de ${atual.length}, esperando há ${esperando}s`);
    for (const [k, t] of atual.entries()) {
      const marca = k === 0 ? "INTEGRANDO" : k === posicao ? "você      " : "na fila   ";
      console.log(`         ${marca}  pid ${String(t.pid).padEnd(7)} ${t.branch}`);
    }
    if (posicao === 1) console.log("[fila] você é o próximo.");
    console.log("[fila] UMA por vez nesta máquina. Esperando, não precisa fazer nada.");
    console.log("");
  },
});

const refRemota = `${cfg.remoto}/${cfg.base}`;

for (let vez = 1; vez <= TENTATIVAS; vez++) {
  console.log(`\n[integrar] tentativa ${vez}/${TENTATIVAS}`);

  git("fetch", cfg.remoto, cfg.base, "--quiet");
  const antes = git("rev-parse", refRemota);

  if (gitQuieto("rev-list", "--count", `${refRemota}..${branch}`) === "0") {
    console.log(`[integrar] esta branch não tem nada fora de ${refRemota}. Nada a fazer.`);
    process.exit(0);
  }

  // BRANCH QUE JÁ ESTÁ EM CIMA DA BASE NÃO SE REBASEIA (2026-10-13). O
  // `git rebase` sem `--rebase-merges` achata merges e reencontra conflitos já
  // resolvidos (medido numa leva com 8 merges onde `origin/main` já era
  // ancestral). Se a base remota já é ancestral, pular dá o mesmo resultado.
  const jaEmCimaDaBase = spawnSync("git", ["merge-base", "--is-ancestor", refRemota, "HEAD"], { cwd: RAIZ }).status === 0;
  const rebase = jaEmCimaDaBase
    ? { status: 0 }
    : spawnSync("git", ["rebase", refRemota], { cwd: RAIZ, encoding: "utf8" });

  if (rebase.status !== 0) {
    const conflitados = gitQuieto("diff", "--name-only", "--diff-filter=U").split("\n").filter(Boolean);

    // REBASE QUE FALHA SEM CONFLITO É OUTRA COISA, E PEDE OUTRA AÇÃO (2026-08-22).
    // O git recusa rebasear com a árvore suja, e aí NÃO HÁ rebase em curso: a
    // lista de conflitados volta vazia.
    if (conflitados.length === 0) {
      const sujosAgora = gitQuieto("status", "--porcelain").split("\n").filter(Boolean);
      console.error("\n[integrar] o rebase NÃO COMEÇOU: não é conflito.");
      if (sujosAgora.length) {
        console.error("\nA árvore está suja, e o git recusa rebasear assim:");
        for (const s of sujosAgora) console.error(`  ${s}`);
      } else {
        console.error(`\nSaída do git:\n${(rebase.stderr || rebase.stdout || "").trim()}\n`);
      }
      gitQuieto("rebase", "--abort");
      process.exit(1);
    }

    gitQuieto("rebase", "--abort");
    console.error("\n[integrar] CONFLITO: parei e desfiz o rebase. Nada foi alterado.");
    console.error("\nArquivos em conflito:");
    for (const c of conflitados) console.error(`  ${c}`);
    console.error("\nResolva à mão, com atenção: conflito são dois códigos VÁLIDOS, e");
    console.error("válido não é aprovado. Foi assim que 46e22f9 apagou três peças que o");
    console.error("dono tinha aprovado, passando em todos os gates.");
    console.error(`\n  git rebase ${refRemota}\n  (resolva)\n  node scripts/integrar.mjs\n`);
    process.exit(1);
  }

  console.log("[integrar] rebase feito. Rodando os gates SOBRE A BASE NOVA…");
  const gates = spawnSync("node", [path.join(SCRIPTS_DIR, "rodar-gates.mjs")], {
    cwd: RAIZ,
    encoding: "utf8",
    stdio: "inherit",
    env: process.env,
  });

  if (gates.status !== 0) {
    // Vermelho aqui pode ser SEU ou pode ser herdado da base. Reprovar os dois
    // igual foi o que travou a `main` para TODAS as sessões em 2026-08-18.
    // Quem separa os dois é `gates-do-que-mudou.mjs`, a MESMA régua do
    // `githooks/pre-push`.
    console.log("\n[integrar] vermelho. Separando o que é DESTE trabalho do que já era da base…");
    const meu = spawnSync("node", [path.join(SCRIPTS_DIR, "gates-do-que-mudou.mjs")], {
      cwd: RAIZ,
      encoding: "utf8",
      stdio: "inherit",
      env: process.env,
    });
    if (meu.status !== 0) {
      console.error("\n[integrar] o vermelho é DESTE trabalho. Não vou publicar.");
      console.error("Isto é o ponto do comando: o que sobe é o que foi validado.");
      process.exit(1);
    }
    console.log("\n[integrar] o vermelho já era da base: não é seu. Sigo publicando.");
  }

  // A TERCEIRA EXECUÇÃO DA SUÍTE MORRE AQUI. O `git push` dispara o
  // `githooks/pre-push`, que chama a MESMA régua que acabou de rodar acima. O
  // selo diz ao gancho QUAL commit já foi validado; ele só pula se o commit que
  // está sendo empurrado for exatamente aquele. Vive só dentro deste processo
  // filho: selo em arquivo sobreviveria ao comando e liberaria um `git push` à
  // mão que ninguém validou.
  const selado = { ...process.env, WF_VALIDADO_EM: git("rev-parse", "HEAD") };
  // Empurra o SHA VALIDADO, não o nome da branch: se o HEAD andar entre a
  // validação e o push, o que sobe continua sendo exatamente o que passou.
  const push = spawnSync("git", ["push", cfg.remoto, `${selado.WF_VALIDADO_EM}:refs/heads/${cfg.base}`], {
    cwd: RAIZ,
    encoding: "utf8",
    stdio: "inherit",
    env: selado,
  });

  if (push.status === 0) {
    console.log(`\n[integrar] integrado. ${cfg.base}: ${git("rev-parse", "--short", "HEAD")}`);

    if (typeof cfg.publicar === "string" && cfg.publicar.trim()) {
      console.log(`[integrar] rodando passo de publicar (${cfg.publicar})…`);
      const pub = spawnSync(cfg.publicar, {
        cwd: RAIZ,
        shell: true,
        encoding: "utf8",
        stdio: "inherit",
      });
      if (pub.status !== 0) {
        console.error(`[integrar] aviso: o passo de publicar saiu com código ${pub.status}.`);
      }
    }

    console.log("Feche a tarefa: node scripts/tarefa.mjs concluir");
    process.exit(0);
  }

  git("fetch", cfg.remoto, cfg.base, "--quiet");
  const entraram = gitQuieto("log", "--oneline", `${antes}..${git("rev-parse", refRemota)}`)
    .split("\n")
    .filter(Boolean);
  console.log(`\n[integrar] a ${cfg.base} andou no meio (${entraram.length} commit(s)):`);
  for (const e of entraram) console.log(`    ${e}`);
  console.log("[integrar] rebaseando de novo e revalidando: nunca repito o push sem revalidar.");
}

console.error(`\n[integrar] desisti depois de ${TENTATIVAS} tentativas: a fila está quente.`);
console.error(`A ${cfg.base} andou no meio de cada uma. Espere um minuto e rode de novo, ou`);
console.error("combine com a outra sessão quem integra primeiro.");
process.exit(1);
