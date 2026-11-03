#!/usr/bin/env bash
# Instala o workflow padrão num repositório git (uma vez por projeto).
#   scripts/instalar-projeto.sh <pasta-do-repo> [--nome "Projeto"] [--skills base,ui,spec,pesquisa | --skills todas]
# Padrão de skills: base. Nunca sobrescreve arquivo do projeto (avisa e pula); hooks,
# scripts e githooks do kit são atualizados (são do kit, não do projeto). Idempotente.
# Não faz commit, não publica nada.
set -euo pipefail
RAIZ_KIT=$(cd "$(dirname "$0")/.." && pwd)   # raiz do kit
T="$RAIZ_KIT/templates"
ALVO=${1:?uso: scripts/instalar-projeto.sh <pasta-do-repo> [--nome "Projeto"] [--skills base,ui,spec,pesquisa|todas]}; shift
NOME=$(basename "$(cd "$ALVO" && pwd)"); GRUPOS=base
while [ $# -gt 0 ]; do case $1 in --nome) NOME=$2; shift 2;; --skills) GRUPOS=$2; shift 2;; *) echo "opção desconhecida: $1"; exit 1;; esac; done
[ "$GRUPOS" = todas ] && GRUPOS=base,ui,spec,pesquisa
ALVO=$(cd "$ALVO" && pwd)
git -C "$ALVO" rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "ERRO: $ALVO não é repositório git (rode git init)"; exit 1; }
command -v node >/dev/null || { echo "ERRO: precisa de node no PATH (hooks e scripts são .js/.mjs)"; exit 1; }

copiar() { # origem destino — não sobrescreve
  if [ -e "$2" ]; then echo "  pula (já existe): ${2#$ALVO/}"; return; fi
  mkdir -p "$(dirname "$2")"; cp -R "$1" "$2"; echo "  cria: ${2#$ALVO/}"
}

echo "1/6 arquivos-base (CLAUDE.md, AGENTS.md, DECISOES.md, regras/, learnings/, planos/, docs/, workflow.config.json)"
( cd "$T/projeto" && find . -type f ! -name .DS_Store ) | while read -r f; do copiar "$T/projeto/$f" "$ALVO/${f#./}"; done
sed -i '' "s/{{PROJETO}}/$NOME/" "$ALVO/CLAUDE.md" 2>/dev/null || sed -i "s/{{PROJETO}}/$NOME/" "$ALVO/CLAUDE.md" 2>/dev/null || true

echo "2/6 hooks do Claude Code, scripts do fluxo e githooks"
mkdir -p "$ALVO/.claude/hooks" "$ALVO/scripts"
rm -f "$ALVO"/.claude/hooks/wf-*.js "$ALVO/.claude/hooks/_comum.js"   # versão antiga (.js quebra em projeto "type":"module")
cp "$T"/claude-hooks/*.cjs "$ALVO/.claude/hooks/"; chmod +x "$ALVO"/.claude/hooks/wf-*.cjs
for f in "$T"/scripts-do-fluxo/*; do cp -R "$f" "$ALVO/scripts/"; done; chmod +x "$ALVO"/scripts/* 2>/dev/null || true
if [ -d "$T/githooks" ]; then
  mkdir -p "$ALVO/githooks"; cp "$T"/githooks/* "$ALVO/githooks/"; chmod +x "$ALVO"/githooks/*
  git -C "$ALVO" config core.hooksPath githooks; echo "  git config core.hooksPath githooks"
fi
for ig in .claude/worktrees/ graphify-out/ .env; do   # graphify-out é gerado a cada commit; .env guarda chaves (docs/09-conectar-apis.md)
  grep -qxF "$ig" "$ALVO/.gitignore" 2>/dev/null || echo "$ig" >> "$ALVO/.gitignore"
done

echo "3/6 liga os hooks em .claude/settings.json (mescla, não apaga o que existe)"
node - "$ALVO/.claude/settings.json" <<'JS'
const fs = require('fs'); const arq = process.argv[2];
let s = {};
if (fs.existsSync(arq)) {
  try { s = JSON.parse(fs.readFileSync(arq, 'utf8')); }
  catch (err) { console.error(`settings.json inválido (${arq}): corrija antes; nada foi alterado.`); process.exit(1); }
}
s.hooks = s.hooks || {};
const cmd = (f) => `node "$CLAUDE_PROJECT_DIR/.claude/hooks/${f}"`;
const QUER = [
  ['SessionStart', null, 'wf-inicio.cjs'],
  ['UserPromptSubmit', null, 'wf-sugere-skill.cjs'],
  ['PreToolUse', 'Edit|Write|MultiEdit|NotebookEdit', 'wf-exige-worktree.cjs'],
  ['PreToolUse', 'Grep|Glob|Bash', 'wf-exige-grafo.cjs'],
  ['Stop', null, 'wf-fim.cjs'],
];
// Migração: hooks .js antigos saem (em projeto "type":"module" eles nem rodavam).
for (const ev of Object.keys(s.hooks)) {
  s.hooks[ev] = s.hooks[ev].filter((g) => !/wf-[a-z-]+\.js"/.test(JSON.stringify(g)));
  if (!s.hooks[ev].length) delete s.hooks[ev];
}
for (const [ev, matcher, f] of QUER) {
  const lista = s.hooks[ev] = s.hooks[ev] || [];
  if (JSON.stringify(lista).includes(f)) continue;
  const g = { hooks: [{ type: 'command', command: cmd(f), timeout: 5 }] };
  if (matcher) g.matcher = matcher;
  lista.push(g);
}
// Plugins do fluxo: quem abrir o projeto recebe a oferta de instalar.
s.extraKnownMarketplaces = { 'superpowers-marketplace': { source: { source: 'github', repo: 'obra/superpowers-marketplace' } }, ...(s.extraKnownMarketplaces || {}) };
s.enabledPlugins = { 'superpowers@superpowers-marketplace': true, ...(s.enabledPlugins || {}) };
fs.writeFileSync(arq, JSON.stringify(s, null, 2) + '\n');
console.log('  ok: ' + arq);
JS

echo "4/6 skills do projeto em .claude/skills (grupos: $GRUPOS)"
mkdir -p "$ALVO/.claude/skills"
for g in ${GRUPOS//,/ }; do
  d="$RAIZ_KIT/skills/projeto-$g"; [ -d "$d" ] || { echo "  grupo desconhecido: $g"; continue; }
  for s in "$d"/*/; do n=$(basename "$s"); [ "$n" = _specify ] && continue; copiar "$s" "$ALVO/.claude/skills/$n"; done
  [ "$g" = spec ] && copiar "$d/_specify" "$ALVO/.specify"
done

echo "5/6 graphify (mapa do código; post-commit)"
if command -v graphify >/dev/null; then
  ( cd "$ALVO" && graphify hook install ) 2>&1 | sed 's/^/  /' || echo "  aviso: graphify hook install falhou (seguindo)"
  echo "  primeiro mapa: cd $ALVO && graphify update ."
else
  echo "  graphify não instalado (scripts/instalar-maquina.sh): pulei o post-commit; o hook de busca fica mudo até existir graphify-out/"
fi

echo "6/6 conferência"
n=$(grep -c 'wf-' "$ALVO/.claude/settings.json"); echo "  hooks ligados: $n de 5 · skills: $(ls "$ALVO/.claude/skills" | wc -l | tr -d ' ')"
echo
echo "Pronto. Próximos passos (README → Dia 1):"
echo "  1. preencha os {{...}} do CLAUDE.md e os gates do workflow.config.json"
echo "  2. commit inicial na main; depois toda tarefa começa com: node scripts/nova-sessao.mjs <tipo>/<nome>"
