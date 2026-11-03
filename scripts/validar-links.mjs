#!/usr/bin/env node
// Valida os links relativos da documentação do kit (README, CLAUDE.md, AGENTS.md e docs/).
// Uso: node scripts/validar-links.mjs   → sai 1 se algum link aponta para arquivo que não existe.
// Ignora http(s), mailto, âncoras puras e o que está dentro de bloco de código.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function mds(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? mds(p) : n.endsWith(".md") ? [p] : [];
  });
}

const alvos = ["README.md", "CLAUDE.md", "AGENTS.md"].map((f) => join(RAIZ, f)).filter(existsSync)
  .concat(mds(join(RAIZ, "docs")));

let quebrados = 0, conferidos = 0;
for (const arq of alvos) {
  const texto = readFileSync(arq, "utf8").replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  for (const [, alvo] of texto.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(alvo)) continue;
    const caminho = decodeURIComponent(alvo.split("#")[0]);
    conferidos++;
    if (!existsSync(resolve(dirname(arq), caminho))) {
      quebrados++;
      console.error(`QUEBRADO  ${arq.slice(RAIZ.length + 1)} → ${alvo}`);
    }
  }
}
console.log(`links: ${conferidos} conferidos em ${alvos.length} arquivos, ${quebrados} quebrado(s)`);
process.exit(quebrados ? 1 : 0);
