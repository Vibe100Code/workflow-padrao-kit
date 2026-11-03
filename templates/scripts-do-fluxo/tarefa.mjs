#!/usr/bin/env node
// O ciclo de UMA tarefa dentro de uma sessão (2026-08-10).
//
//   node scripts/tarefa.mjs abrir <tipo>/<nome>   nasce a branch, marcada como ABERTA
//   node scripts/tarefa.mjs estado                em que pé está
//   node scripts/tarefa.mjs concluir              marca CONCLUÍDA (depois de integrada)
//
// POR QUE A MARCA EXISTE, e não é preciosismo: "a branch já está na main" NÃO
// distingue tarefa CONCLUÍDA de tarefa RECÉM-ABERTA, pois a segunda tem zero
// commits e por isso também é ancestral da main. Inferir pelo git bloquearia
// justamente quem acabou de abrir a tarefa. A marca é explícita:
//
//   git config branch.<nome>.wfTarefa = aberta | concluida
//
// **Marca AUSENTE = liberado.** Branch criada antes disto, ou à mão, não
// pode ficar refém de um mecanismo que ela não conhece. Gate novo que trava
// trabalho em andamento é gate que alguém desliga no mesmo dia.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

function lerConfig() {
  const padrao = { base: "main", remoto: "origin" };
  const comum = gitQuieto("rev-parse", "--path-format=absolute", "--git-common-dir");
  const raizPrincipal = comum ? path.dirname(comum) : AQUI;
  for (const dir of [AQUI, raizPrincipal]) {
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

export function marcaDaBranch(branch, cwd = AQUI) {
  try {
    return execFileSync("git", ["config", `branch.${branch}.wfTarefa`], { cwd, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function resolverRefBase(cfg) {
  const remota = `${cfg.remoto}/${cfg.base}`;
  return gitQuieto("rev-parse", "--verify", "--quiet", remota) ? remota : cfg.base;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const cfg = lerConfig();
  const acao = process.argv[2];
  const branchAtual = git("rev-parse", "--abbrev-ref", "HEAD");

  function estado() {
    const refBase = resolverRefBase(cfg);
    const marca = marcaDaBranch(branchAtual) || "(sem marca)";
    const naBase = branchAtual === cfg.base || branchAtual === "HEAD";
    const commits = naBase ? "0" : gitQuieto("rev-list", "--count", `${refBase}..${branchAtual}`) || "0";
    const sujos = gitQuieto("status", "--porcelain").split("\n").filter(Boolean).length;
    console.log(`branch:   ${branchAtual}`);
    console.log(`tarefa:   ${marca}`);
    console.log(`commits não integrados: ${commits}`);
    console.log(`arquivos não salvos:    ${sujos}`);
  }

  if (acao === "estado" || !acao) {
    estado();
    process.exit(0);
  }

  if (acao === "abrir") {
    const nome = process.argv[3];
    if (!nome || !/^(feature|fix|chore|docs|refactor|perf|style)\/[a-z0-9][a-z0-9-]*$/.test(nome)) {
      console.error("uso: node scripts/tarefa.mjs abrir <tipo>/<nome>");
      console.error("     tipo: feature | fix | chore | docs | refactor | perf | style");
      process.exit(1);
    }

    const sujos = gitQuieto("status", "--porcelain").split("\n").filter(Boolean);
    if (sujos.length) {
      // Abrir tarefa nova por cima de trabalho não salvo levaria as mudanças da
      // tarefa anterior junto, e ninguém perceberia até a revisão.
      console.error("Há trabalho não salvo aqui. Feche a tarefa anterior antes de abrir outra:");
      for (const s of sujos.slice(0, 8)) console.error(`  ${s}`);
      process.exit(1);
    }

    try {
      execFileSync("git", ["fetch", cfg.remoto, cfg.base, "--quiet"], { cwd: AQUI, stdio: "ignore" });
    } catch {
      // Sem remoto ou offline: segue com a ref local.
    }

    const refBase = resolverRefBase(cfg);
    const jaExiste = gitQuieto("rev-parse", "--verify", "--quiet", `refs/heads/${nome}`);
    if (jaExiste && marcaDaBranch(nome) === "concluida") {
      console.error(`${nome}: Essa branch já foi CONCLUÍDA e integrada. Abra uma tarefa com nome novo.`);
      process.exit(1);
    }
    if (jaExiste) {
      if (branchAtual !== nome) git("checkout", nome);
    } else {
      git("checkout", "-b", nome, refBase);
    }
    git("config", `branch.${nome}.wfTarefa`, "aberta");

    console.log("");
    console.log(`Tarefa ABERTA: ${nome}${jaExiste ? " (branch já existia)" : `, a partir de ${refBase}`}`);
    console.log("Pode editar. Ao concluir: gates, commit, e perguntar ao dono se integra.");
    console.log("");
    process.exit(0);
  }

  if (acao === "concluir") {
    try {
      execFileSync("git", ["fetch", cfg.remoto, cfg.base, "--quiet"], { cwd: AQUI, stdio: "ignore" });
    } catch {
      // Sem remoto ou offline: compara com a ref local.
    }
    const refBase = resolverRefBase(cfg);
    let integrada = false;
    try {
      git("merge-base", "--is-ancestor", "HEAD", refBase);
      integrada = true;
    } catch {
      integrada = false;
    }
    if (!integrada) {
      console.error(`A branch ${branchAtual} ainda tem commits fora de ${refBase}. Integre antes de concluir:`);
      console.error("  node scripts/integrar.mjs");
      process.exit(1);
    }
    git("config", `branch.${branchAtual}.wfTarefa`, "concluida");
    console.log(`Tarefa CONCLUÍDA: ${branchAtual}. A próxima edição exige abrir outra.`);
    process.exit(0);
  }

  console.error(`ação desconhecida: ${acao}`);
  console.error("use: abrir <tipo>/<nome> | estado | concluir");
  process.exit(1);
}
