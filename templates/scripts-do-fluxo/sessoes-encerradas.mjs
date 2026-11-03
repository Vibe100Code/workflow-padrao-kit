#!/usr/bin/env node
// Lista os worktrees que JÁ ACABARAM, e só eles.
//
//   node scripts/sessoes-encerradas.mjs             lista
//   node scripts/sessoes-encerradas.mjs --remover   remove os que acabaram
//
// A regra manda remover o worktree ao terminar, e ninguém remove: medido em
// 2026-08-18, 66 worktrees abertos e 193 branches locais. Worktree esquecido
// segura um branch e entra na contagem que o hook de sessão usa para decidir se
// avisa: quanto mais lixo, mais barulho, e barulho com autoridade é o que
// ensina a ignorar aviso de verdade.
//
// NÃO existe limiar aqui, de propósito (não se escolhe número inventado). O que
// existe é uma pergunta binária e verificável: *o trabalho desta branch já está
// na base?* Se está, o worktree não guarda nada que se possa perder.
//
// A conferência é contra a REF de integração, não contra o nome da branch nem
// contra a marca de tarefa: marca diz o que a sessão ACHA, a ref diz o que o
// repositório TEM.

import { execFileSync } from "node:child_process";
import path from "node:path";
import { acharRaiz, lerConfig } from "./rodar-gates.mjs";

const AQUI = acharRaiz();
const git = (...a) => execFileSync("git", a, { cwd: AQUI, encoding: "utf8" }).trim();
const remover = process.argv.includes("--remover");
const cfg = lerConfig(AQUI);

// A ref de integração é a base do remoto quando ele responde, e a base local
// quando não responde. Sem esta queda o script fica inútil justamente no dia em
// que o remoto some.
function refDeIntegracao() {
  for (const ref of [`${cfg.remoto}/${cfg.base}`, cfg.base, "origin/main", "main"]) {
    try {
      git("rev-parse", "--verify", ref);
      return ref;
    } catch {
      continue;
    }
  }
  return null;
}

const ref = refDeIntegracao();
if (!ref) {
  console.error("[sessoes] nenhuma ref de base encontrada: rodou fora do repositório?");
  process.exit(1);
}

const principal = path.dirname(git("rev-parse", "--path-format=absolute", "--git-common-dir"));

// O worktree de onde ESTE processo roda nunca entra na lista.
//
// Medido na primeira execução real, em 2026-08-18: rodei de dentro de um
// worktree, ele foi classificado como acabado, removido no meio do laço e
// levou o `cwd` junto. Todo `git` seguinte morreu em "Unable to read current
// working directory" e só 18 de 62 saíram: o script cortou o galho em que
// estava sentado.
//
// `process.cwd()` sozinho não resolve: quem chama de uma subpasta tem cwd
// diferente do caminho que o `git worktree list` imprime. Quem responde é o
// `--show-toplevel`, que é a raiz da árvore ATUAL.
const meuWorktree = (() => {
  try {
    return git("rev-parse", "--path-format=absolute", "--show-toplevel");
  } catch {
    return null;
  }
})();

const arvores = git("worktree", "list", "--porcelain")
  .split("\n\n")
  .map((bloco) => {
    const caminho = bloco.match(/^worktree (.+)$/m)?.[1];
    const branch = bloco.match(/^branch refs\/heads\/(.+)$/m)?.[1] ?? null;
    return caminho ? { caminho, branch } : null;
  })
  .filter(Boolean)
  .filter((w) => w.caminho !== principal && w.caminho !== meuWorktree);

const acabadas = [];
const vivas = [];

for (const w of arvores) {
  if (!w.branch) {
    vivas.push({ ...w, motivo: "HEAD solto (não dá para saber o que tem dentro)" });
    continue;
  }
  let sujo = "";
  try {
    sujo = execFileSync("git", ["-C", w.caminho, "status", "--porcelain"], { encoding: "utf8" }).trim();
  } catch {
    vivas.push({ ...w, motivo: "não deu para ler o estado" });
    continue;
  }
  if (sujo) {
    vivas.push({ ...w, motivo: `${sujo.split("\n").length} arquivo(s) não salvos` });
    continue;
  }
  // Tarefa recém-aberta tem ZERO commits e por isso também é ancestral da base:
  // pelo git ela parece "integrada". A marca explícita desempata (revisão 2026-11-02:
  // sem isto, `--remover` apagava a worktree de uma sessão que acabara de abrir).
  let marca = "";
  try {
    marca = execFileSync("git", ["config", `branch.${w.branch}.wfTarefa`], { cwd: AQUI, encoding: "utf8" }).trim();
  } catch {}
  if (marca === "aberta") {
    vivas.push({ ...w, motivo: "tarefa aberta (wfTarefa=aberta)" });
    continue;
  }
  let integrada = false;
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", w.branch, ref], { cwd: AQUI, stdio: "ignore" });
    integrada = true;
  } catch {
    integrada = false;
  }
  if (integrada) acabadas.push(w);
  else vivas.push({ ...w, motivo: `tem commit fora de ${ref}` });
}

console.log(`\nReferência de integração: ${ref}`);
console.log(`Worktrees (fora do principal): ${arvores.length}\n`);

if (vivas.length) {
  console.log(`EM ANDAMENTO (${vivas.length}, nenhum será tocado):`);
  for (const w of vivas) console.log(`  · ${w.branch ?? "(HEAD solto)"} (${w.motivo})`);
  console.log("");
}

if (!acabadas.length) {
  console.log("Nada acabado para remover.");
  process.exit(0);
}

console.log(`ACABADOS (${acabadas.length} já estão em ${ref} e não guardam nada):`);
for (const w of acabadas) console.log(`  · ${w.branch}`);

if (!remover) {
  console.log("\nPara remover: node scripts/sessoes-encerradas.mjs --remover");
  process.exit(0);
}

let removidos = 0;
for (const w of acabadas) {
  try {
    git("worktree", "remove", w.caminho);
    // `w.branch` já foi provado ancestral de `ref` (ex: `origin/main`), mas a
    // `main` local do checkout principal pode ainda não ter dado `pull`, então
    // `branch -d` falharia comparando com `HEAD` local atrasado. Tenta `-d` e,
    // como a ancestralidade em `ref` já está provada acima, cai para `-D`.
    try {
      git("branch", "-d", w.branch);
    } catch {
      git("branch", "-D", w.branch);
    }
    removidos += 1;
  } catch (erro) {
    console.error(`  ! ${w.branch}: ${erro instanceof Error ? erro.message.split("\n")[0] : erro}`);
  }
}
console.log(`\n${removidos} de ${acabadas.length} removidos.`);
