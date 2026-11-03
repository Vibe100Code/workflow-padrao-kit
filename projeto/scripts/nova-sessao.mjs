#!/usr/bin/env node
// Abre um diretório de trabalho só desta sessão (2026-08-10).
//
//   node scripts/nova-sessao.mjs <tipo>/<tarefa>
//   node scripts/nova-sessao.mjs fix/botao-salvar
//
// POR QUE ISTO EXISTE: várias sessões trabalham neste repositório ao mesmo
// tempo e, no MESMO diretório, o `HEAD` do git é um arquivo só. Quem der
// `checkout` troca o branch de todo mundo que estiver ali, e ninguém é
// avisado. Em 2026-08-10 isso mandou o commit de uma sessão para o branch de
// outra e publicou uma branch VAZIA. Medido no diretório principal: 33 trocas
// de branch registradas.
//
// O worktree resolve porque dá um `HEAD` por diretório, mantendo UMA
// configuração, UM conjunto de remotes e os MESMOS ganchos.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, symlinkSync } from "node:fs";
import path from "node:path";

function acharContexto() {
  try {
    return execFileSync("git", ["rev-parse", "--path-format=absolute", "--show-toplevel"], { encoding: "utf8" }).trim();
  } catch {
    return path.resolve(import.meta.dirname, "..");
  }
}

const AQUI = acharContexto();
const git = (...a) => execFileSync("git", a, { cwd: AQUI, encoding: "utf8" }).trim();
const gitQuieto = (...a) => {
  try { return git(...a); } catch { return ""; }
};

// A raiz é sempre o checkout PRINCIPAL, mesmo rodando de dentro de um worktree:
// `--git-common-dir` aponta para o `.git` de verdade, e o pai dele é a raiz.
// Sem isto, rodar o comando de dentro de um worktree cria outro worktree ANINHADO
// dentro dele: medido, e o caminho impresso já saía errado.
const RAIZ = path.dirname(git("rev-parse", "--path-format=absolute", "--git-common-dir"));

function lerConfig() {
  const padrao = {
    base: "main",
    remoto: "origin",
    gates: [],
    publicar: null,
    worktrees: ".claude/worktrees",
    links: [".env", "node_modules"],
  };
  for (const dir of [AQUI, RAIZ]) {
    const arq = path.join(dir, "workflow.config.json");
    if (!existsSync(arq)) continue;
    try {
      const lido = JSON.parse(readFileSync(arq, "utf8"));
      return { ...padrao, ...lido };
    } catch {
      continue;
    }
  }
  return padrao;
}

const cfg = lerConfig();
const argumentos = process.argv.slice(2);
const tarefa = argumentos.find((a) => !a.startsWith("--"));

if (!tarefa || !/^(feature|fix|chore|docs|refactor|perf|style)\/[a-z0-9][a-z0-9-]*$/.test(tarefa)) {
  console.error("uso: node scripts/nova-sessao.mjs <tipo>/<tarefa>");
  console.error("     tipo: feature | fix | chore | docs | refactor | perf | style");
  console.error("     exemplo: node scripts/nova-sessao.mjs fix/botao-salvar");
  process.exit(1);
}

const nome = tarefa.split("/")[1];
const destino = path.join(RAIZ, cfg.worktrees, nome);

if (existsSync(destino)) {
  console.error(`Já existe ${path.relative(RAIZ, destino)}. Use outro nome, ou entre nele:`);
  console.error(`  cd ${destino}`);
  process.exit(1);
}

try {
  execFileSync("git", ["fetch", cfg.remoto, cfg.base, "--quiet"], { cwd: RAIZ, stdio: "ignore" });
} catch {
  // Repositório local sem remoto ou rede indisponível: parte da ref local.
}

const refRemota = `${cfg.remoto}/${cfg.base}`;
const refBase = gitQuieto("rev-parse", "--verify", "--quiet", refRemota) ? refRemota : cfg.base;

if (!gitQuieto("rev-parse", "--verify", "--quiet", refBase)) {
  console.error(`A base (${refBase}) ainda não tem commit. Faça o commit inicial primeiro.`);
  process.exit(1);
}

// A branch nasce da base ATUALIZADA, nunca do que estiver no disco: partir do
// branch de outra sessão é herdar trabalho que não é seu e não saber disso.
const existe = git("branch", "--list", tarefa).length > 0;
if (existe && gitQuieto("config", `branch.${tarefa}.wfTarefa`) === "concluida") {
  console.error(`${tarefa}: Essa branch já foi CONCLUÍDA e integrada. Abra uma tarefa com nome novo.`);
  process.exit(1);
}
const args = existe
  ? ["worktree", "add", destino, tarefa]
  : ["worktree", "add", "-b", tarefa, destino, refBase];
execFileSync("git", args, { cwd: RAIZ, encoding: "utf8" });

// Marca explícita da tarefa na branch (2026-08-10): permite aos hooks saberem
// que há uma tarefa aberta sem inferir pelo histórico do git.
git("config", `branch.${tarefa}.wfTarefa`, "aberta");

// O `.env` e `node_modules` NÃO nascem junto com o worktree, e sem eles todo
// script que precisa de credencial ou dependência nasce cego ou reprova por
// pré-condição com cara de defeito do código (medido em 2026-08-20, num worktree
// cujo diff eram quatro arquivos `.md`: 4 das 5 etapas vermelhas, nenhuma por
// defeito). O link é RELATIVO e aponta para o checkout principal, de propósito:
// credencial girada (medido em 2026-08-17) precisa chegar a todas as árvores de
// uma vez, e cópia congela o valor do dia em que a árvore foi aberta.
const links = Array.isArray(cfg.links) ? cfg.links : [".env", "node_modules"];
for (const item of [...new Set([...links, "graphify-out"])]) {
  const origem = path.join(RAIZ, item);
  const alvo = path.join(destino, item);
  if (existsSync(origem) && !existsSync(alvo)) {
    mkdirSync(path.dirname(alvo), { recursive: true });
    symlinkSync(path.relative(path.dirname(alvo), origem), alvo);
  }
}

console.log("");
console.log(`Pronto. Branch \`${tarefa}\`, saída de ${refBase}${existe ? " (branch já existia)" : ""}.`);
console.log("");
console.log("Trabalhe SÓ aqui:");
console.log("");
console.log(`  cd ${destino}`);
console.log("");
console.log("Ao terminar a tarefa:");
console.log("");
console.log("  node scripts/integrar.mjs");
console.log("  node scripts/tarefa.mjs concluir");
console.log(`  cd ${RAIZ} && node scripts/sessoes-encerradas.mjs --remover`);
console.log("");
