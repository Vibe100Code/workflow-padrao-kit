#!/usr/bin/env bash
# Prova do kit: repo git vazio → instala → cada hook dispara (ou cala) quando deve.
# Uso: testes/testar-kit.sh [pasta-temporária]
set -uo pipefail
KIT=$(cd "$(dirname "$0")/.." && pwd)
T=${1:-$(mktemp -d)}/repo-teste; rm -rf "$T"; mkdir -p "$T"
export WF_GRAFO_CACHE="$T/../cache"; rm -rf "$WF_GRAFO_CACHE"
ok=0; falha=0
confere() { # nome, saída, regex esperada ("" = deve ser vazia)
  if { [ -z "$3" ] && [ -z "$2" ]; } || { [ -n "$3" ] && grep -qE "$3" <<<"$2"; }; then echo "PASSA  $1"; ok=$((ok+1));
  else echo "FALHA  $1 → saída: ${2:0:200}"; falha=$((falha+1)); fi
}
H="$T/.claude/hooks"
roda() { (cd "${3:-$T}" && CLAUDE_PROJECT_DIR="$T" node "$H/$1" <<<"$2"); }

git init -q -b main "$T"
"$KIT/instalar.sh" "$T" --nome "Teste" >/dev/null || { echo "instalador falhou"; exit 1; }
confere "instalador criou arquivos-base" "$(cd "$T" && ls CLAUDE.md AGENTS.md DECISOES.md regras/_MODELO.md learnings/_MODELO.md planos/_MODELO.md docs/BRIEF-PADRAO-SUBAGENTE.md docs/CARTAO-DE-VOTACAO.md docs/PASSAGEM-DE-TAREFA.md 2>&1)" '^CLAUDE.md'
confere "BRIEFING, questionário e workflow.config criados" "$(cd "$T" && ls BRIEFING.md docs/QUESTIONARIO-INICIAL.md workflow.config.json 2>&1 | wc -l | tr -d ' ')" '^3$'
confere "skills base instaladas (iniciar-projeto, graphify)" "$(ls "$T/.claude/skills" | tr '\n' ' ')" 'iniciar-projeto.*|graphify'
confere "agente revisor, prompt de revisor e skill revisao-de-codigo instalados" "$(cd "$T" && ls .claude/agents/revisor.md docs/PROMPT-REVISOR.md .claude/skills/revisao-de-codigo/SKILL.md 2>&1 | wc -l | tr -d ' ')" '^3$'
confere "githooks ligados (core.hooksPath)" "$(git -C "$T" config core.hooksPath)" '^githooks$'
confere "scripts do fluxo copiados" "$(ls "$T/scripts" | tr '\n' ' ')" 'integrar.mjs.*nova-sessao.mjs'
confere "settings.json liga 5 hooks" "$(grep -c 'wf-' "$T/.claude/settings.json")" '^5$'
"$KIT/instalar.sh" "$T" >/dev/null; confere "reinstalar é idempotente" "$(grep -c 'wf-' "$T/.claude/settings.json")" '^5$'
confere "Dia 1 (sem commit): edição na main libera" "$(roda wf-exige-worktree.cjs "{\"tool_name\":\"Edit\",\"tool_input\":{\"file_path\":\"$T/CLAUDE.md\"},\"cwd\":\"$T\"}")" ''
# o hook que o graphify grava em .git/hooks tem de rodar mesmo com core.hooksPath=githooks
mkdir -p "$T/.git/hooks"; printf '#!/bin/sh\ntouch "%s/.pc-rodou"\n' "$T" > "$T/.git/hooks/post-commit"; chmod +x "$T/.git/hooks/post-commit"
(cd "$T" && git add -A && git -c user.name=t -c user.email=t@t commit -qm "chore: inicio" && git -c user.name=t -c user.email=t@t commit --no-verify --allow-empty -qm "chore: 2" 2>/dev/null) || true
confere "post-commit de .git/hooks (graphify) é repassado" "$([ -f "$T/.pc-rodou" ] && echo sim)" '^sim$'

S=$(roda wf-inicio.cjs '{"hook_event_name":"SessionStart"}'); B=$(printf %s "$S" | wc -c | tr -d ' ')
confere "início avisa BRIEFING por preencher" "$S" 'iniciar-projeto'
confere "início mostra os PAPÉIS do workflow.config.json" "$S" 'PAPÉIS.*implementa Codex'
cp "$T/workflow.config.json" "$T/../wf.bak"; node -e 'const f=process.argv[1],c=JSON.parse(require("fs").readFileSync(f));c.papeis={coordenador:"Codex",implementador:"Claude Code",revisores:["Claude Code","Gemini"]};require("fs").writeFileSync(f,JSON.stringify(c))' "$T/workflow.config.json"
confere "papéis invertidos valem; mesma IA revisando lembra o contexto limpo" "$(roda wf-inicio.cjs '{}')" 'coordena Codex.*0-C.*contexto limpo'
cp "$T/../wf.bak" "$T/workflow.config.json"
confere "início injeta regras (${B} B ≤ 2 KB)" "$S" 'REGRAS DE INÍCIO'; [ "$B" -le 2048 ] || { echo "FALHA  regras > 2 KB"; falha=$((falha+1)); }

confere "edição na main é NEGADA" "$(roda wf-exige-worktree.cjs "{\"tool_name\":\"Edit\",\"tool_input\":{\"file_path\":\"$T/CLAUDE.md\"},\"cwd\":\"$T\"}")" '"deny"'
confere "edição fora do repo libera (mudo)" "$(roda wf-exige-worktree.cjs '{"tool_name":"Write","tool_input":{"file_path":"/tmp/x.txt"}}')" ''
(cd "$T" && node scripts/nova-sessao.mjs feature/teste-kit >/dev/null)
W="$T/.claude/worktrees/teste-kit"
confere "nova-sessao.mjs abriu worktree" "$(git -C "$W" rev-parse --abbrev-ref HEAD)" '^feature/teste-kit$'
confere "edição na worktree libera (mudo)" "$(roda wf-exige-worktree.cjs "{\"tool_name\":\"Edit\",\"tool_input\":{\"file_path\":\"$W/CLAUDE.md\"},\"cwd\":\"$T\"}")" ''
confere "início avisa diretório principal com 2 checkouts" "$(roda wf-inicio.cjs '{}')" 'PARE: diretório PRINCIPAL com 2'

mkdir -p "$T/graphify-out"; echo '{}' > "$T/graphify-out/graph.json"; export WF_GRAPHIFY_PRESENTE=1
G='{"session_id":"s1","tool_name":"Grep","tool_input":{"pattern":"x","path":"'"$T"'"},"cwd":"'"$T"'"}'
confere "1ª busca ampla sem grafo é NEGADA" "$(roda wf-exige-grafo.cjs "$G")" 'graphify query'
confere "Grep num arquivo só libera" "$(roda wf-exige-grafo.cjs '{"session_id":"s1","tool_name":"Grep","tool_input":{"path":"'"$T"'/CLAUDE.md"}}')" ''
roda wf-exige-grafo.cjs '{"session_id":"s1","tool_name":"Bash","tool_input":{"command":"graphify query \"onde\""}}' >/dev/null
confere "após graphify query, busca libera" "$(roda wf-exige-grafo.cjs "$G")" ''
for i in 1 2 3; do roda wf-exige-grafo.cjs "${G/s1/s2}" >/dev/null; done
confere "após 3 negações falha aberto" "$(roda wf-exige-grafo.cjs "${G/s1/s2}")" ''
confere "sem graph.json fica mudo" "$(rm -rf "$T/graphify-out"; roda wf-exige-grafo.cjs "${G/s1/s3}")" ''

confere "prompt de bug sugere debugging" "$(roda wf-sugere-skill.cjs '{"prompt":"deu erro no login, quebrou"}')" 'systematic-debugging'
confere "prompt neutro fica mudo" "$(roda wf-sugere-skill.cjs '{"prompt":"bom dia"}')" ''

confere "fim: worktree sem commit novo fica mudo" "$(roda wf-fim.cjs "{\"cwd\":\"$W\"}" "$W")" ''
(cd "$W" && echo x > nota.txt && git add nota.txt && git -c user.name=t -c user.email=t@t commit -qm "feat: x")
confere "fim: commit pronto não integrado LEMBRA" "$(roda wf-fim.cjs "{\"cwd\":\"$W\"}" "$W")" 'NÃO INTEGRADO'
confere "fim: nunca bloqueia" "$(roda wf-fim.cjs "{\"cwd\":\"$W\"}" "$W" | grep -c '"block"')" '^0$'

t0=$(perl -MTime::HiRes=time -e 'print time'); roda wf-exige-worktree.cjs "{\"tool_input\":{\"file_path\":\"$T/a\"}}" >/dev/null
ms=$(perl -MTime::HiRes=time -e "printf '%d', (time-$t0)*1000"); confere "hook rápido (${ms} ms < 500)" "$([ "$ms" -lt 500 ] && echo r)" 'r'
confere "entrada quebrada falha aberto" "$(echo 'lixo' | node "$H/wf-exige-worktree.cjs"; echo 'lixo' | node "$H/wf-exige-grafo.cjs")" ''

git -C "$T" worktree remove --force "$W" && git -C "$T" config branch.feature/teste-kit.wfTarefa concluida
confere "não reabre tarefa CONCLUÍDA" "$(cd "$T" && node scripts/nova-sessao.mjs feature/teste-kit 2>&1)" 'CONCLUÍDA'

# projeto com "type":"module" (Next.js, Vite): .js viraria ESM e o require quebraria em silêncio
echo '{"type":"module"}' > "$T/package.json"
confere "hooks rodam em projeto type:module" "$(roda wf-exige-worktree.cjs "{\"tool_name\":\"Edit\",\"tool_input\":{\"file_path\":\"$T/CLAUDE.md\"},\"cwd\":\"$T\"}" 2>&1)" '"deny"'
rm -f "$T/package.json"

echo; echo "RESULTADO: $ok passaram, $falha falharam (repo: $T)"; [ $falha -eq 0 ]
