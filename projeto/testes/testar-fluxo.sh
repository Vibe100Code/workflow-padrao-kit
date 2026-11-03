#!/usr/bin/env bash
# Prova do fluxo de tarefa completo em repo temporário com remoto bare local:
#   sessao -> tarefa abrir -> commit -> integrar (verde integra; vermelho não
#   integra; conflito para) -> sessoes --remover, commit-msg recusa trailer,
#   pre-commit recusa na main.
# Uso: testes/testar-fluxo.sh [pasta-temporaria]
set -uo pipefail

KIT=$(cd "$(dirname "$0")/.." && pwd)
BASE_TMP=${1:-$(mktemp -d)}
REMOTO="$BASE_TMP/remoto.git"
REPO="$BASE_TMP/repo"
rm -rf "$REMOTO" "$REPO"
mkdir -p "$REMOTO" "$REPO"

ok=0
falha=0
confere() { # nome, saida, regex esperada ("" = deve ser vazia)
  local achatada="${2//$'\n'/ }"
  if { [ -z "$3" ] && [ -z "$2" ]; } || { [ -n "$3" ] && grep -qE "$3" <<<"$achatada"; }; then
    echo "PASSA  $1"
    ok=$((ok + 1))
  else
    echo "FALHA  $1 -> saída: ${achatada:0:240}"
    falha=$((falha + 1))
  fi
}

git init -q --bare -b main "$REMOTO"
git init -q -b main "$REPO"
git -C "$REPO" config user.name "Teste"
git -C "$REPO" config user.email "teste@exemplo.local"
git -C "$REPO" remote add origin "$REMOTO"

mkdir -p "$REPO/scripts" "$REPO/githooks" "$REPO/.claude/hooks"
cp "$KIT"/scripts/*.mjs "$REPO/scripts/"
cp "$KIT"/githooks/* "$REPO/githooks/"
cp "$KIT"/hooks/*.cjs "$REPO/.claude/hooks/"
chmod +x "$REPO"/scripts/*.mjs "$REPO"/githooks/* "$REPO"/.claude/hooks/wf-*.cjs

cat > "$REPO/workflow.config.json" <<'JSON'
{
  "base": "main",
  "remoto": "origin",
  "gates": [
    {
      "nome": "checar-integridade",
      "cmd": "node -e \"process.exit(require('fs').existsSync('QUEBRAR') ? 1 : 0)\""
    }
  ],
  "publicar": null,
  "worktrees": ".claude/worktrees",
  "links": [".env", "node_modules"]
}
JSON

cat > "$REPO/.gitignore" <<'EOF'
.claude/worktrees/
.env
node_modules/
EOF

echo "SEGREDOS=1" > "$REPO/.env"
echo "base inicial" > "$REPO/conflito.txt"

git -C "$REPO" add -A
git -C "$REPO" commit -qm "chore: inicial"
git -C "$REPO" push -q -u origin main
git -C "$REPO" config core.hooksPath githooks

# 1. pre-commit recusa commit direto na main
echo "tentativa" > "$REPO/na-main.txt"
git -C "$REPO" add na-main.txt
SAIDA_PRE_MAIN=$(git -C "$REPO" commit -m "feat: direto na main" 2>&1)
COD_PRE_MAIN=$?
git -C "$REPO" reset -q HEAD na-main.txt && rm -f "$REPO/na-main.txt"
confere "pre-commit recusa commit na main (código != 0)" "$([ $COD_PRE_MAIN -ne 0 ] && echo recusou): $SAIDA_PRE_MAIN" 'recusou.*commit recusado'

# 2. nova-sessao.mjs abre worktree e linka .env
(cd "$REPO" && node scripts/nova-sessao.mjs feature/entrega-verde >/dev/null)
W1="$REPO/.claude/worktrees/entrega-verde"
confere "nova-sessao.mjs criou worktree na branch certa" "$(git -C "$W1" rev-parse --abbrev-ref HEAD)" '^feature/entrega-verde$'
confere "nova-sessao.mjs criou symlink de .env" "$( [ -L "$W1/.env" ] && cat "$W1/.env" )" '^SEGREDOS=1$'

# 3. tarefa.mjs abrir e estado
SAIDA_ABRIR=$(cd "$W1" && node scripts/tarefa.mjs abrir feature/entrega-verde 2>&1)
confere "tarefa.mjs abrir marca wfTarefa=aberta" "$(git -C "$W1" config branch.feature/entrega-verde.wfTarefa)" '^aberta$'
confere "tarefa.mjs estado mostra tarefa aberta" "$(cd "$W1" && node scripts/tarefa.mjs estado)" 'tarefa:   aberta'

# 4. commit-msg recusa trailer de procedência de ferramenta
echo "entrega 1" > "$W1/entrega.txt"
git -C "$W1" add entrega.txt
SAIDA_TRAILER=$(git -C "$W1" commit -m $'feat: com trailer\n\nCo-Authored-By: Claude <noreply@anthropic.com>' 2>&1)
COD_TRAILER=$?
confere "commit-msg recusa trailer Co-Authored-By" "$([ $COD_TRAILER -ne 0 ] && echo recusou): $SAIDA_TRAILER" 'recusou.*procedência de ferramenta'

# 5. commit limpo na worktree passa
git -C "$W1" commit -qm "feat: entrega verde"
confere "commit limpo na worktree foi gravado" "$(git -C "$W1" log -1 --pretty=%s)" '^feat: entrega verde$'

# 6. integrar.mjs com gate verde integra na main e usa selo WF_VALIDADO_EM
SAIDA_INT_VERDE=$(cd "$W1" && node scripts/integrar.mjs 2>&1)
COD_INT_VERDE=$?
SHA_W1=$(git -C "$W1" rev-parse HEAD)
SHA_REMOTO=$(git -C "$REMOTO" rev-parse refs/heads/main)
confere "integrar.mjs com gate verde sai 0 e atualiza origin/main" "$([ $COD_INT_VERDE -eq 0 ] && [ "$SHA_W1" = "$SHA_REMOTO" ] && echo integrou)" '^integrou$'
confere "pre-push pulou segunda execução pelo selo WF_VALIDADO_EM" "$SAIDA_INT_VERDE" 'o integrar já validou'

# 7. tarefa.mjs concluir marca concluida e wf-exige-worktree bloqueia edição nela
(cd "$W1" && node scripts/tarefa.mjs concluir >/dev/null)
confere "tarefa.mjs concluir grava wfTarefa=concluida" "$(git -C "$W1" config branch.feature/entrega-verde.wfTarefa)" '^concluida$'
SAIDA_HOOK_CONCLUIDA=$(cd "$W1" && node "$REPO/.claude/hooks/wf-exige-worktree.cjs" <<<"{\"tool_name\":\"Edit\",\"tool_input\":{\"file_path\":\"$W1/entrega.txt\"},\"cwd\":\"$W1\"}")
confere "wf-exige-worktree nega edição em tarefa concluida" "$SAIDA_HOOK_CONCLUIDA" '"deny".*CONCLUÍDA'

# 8. integrar.mjs com gate vermelho NÃO integra
(cd "$REPO" && node scripts/nova-sessao.mjs fix/quebra-gate >/dev/null)
W2="$REPO/.claude/worktrees/quebra-gate"
(cd "$W2" && node scripts/tarefa.mjs abrir fix/quebra-gate >/dev/null)
echo "quebrou" > "$W2/QUEBRAR"
git -C "$W2" add QUEBRAR
git -C "$W2" commit -qm "fix: introduz falha no gate"
SHA_ANTES_VERMELHO=$(git -C "$REMOTO" rev-parse refs/heads/main)
SAIDA_INT_VERMELHO=$(cd "$W2" && node scripts/integrar.mjs 2>&1)
COD_INT_VERMELHO=$?
SHA_DEPOIS_VERMELHO=$(git -C "$REMOTO" rev-parse refs/heads/main)
confere "integrar.mjs com gate vermelho recusa publicar (código != 0)" "$([ $COD_INT_VERMELHO -ne 0 ] && echo bloqueou): $SAIDA_INT_VERMELHO" 'bloqueou.*o vermelho é DESTE trabalho'
confere "origin/main não mudou após gate vermelho" "$([ "$SHA_ANTES_VERMELHO" = "$SHA_DEPOIS_VERMELHO" ] && echo intacto)" '^intacto$'

# 9. integrar.mjs com conflito PARA e desfaz rebase
(cd "$REPO" && node scripts/nova-sessao.mjs feature/com-conflito >/dev/null)
W3="$REPO/.claude/worktrees/com-conflito"
(cd "$W3" && node scripts/tarefa.mjs abrir feature/com-conflito >/dev/null)
echo "linha da branch" > "$W3/conflito.txt"
git -C "$W3" add conflito.txt
git -C "$W3" commit -qm "feat: muda conflito.txt na branch"

# Avança origin/main com mudança conflitante no mesmo arquivo
(cd "$REPO" && node scripts/nova-sessao.mjs feature/avanca-main >/dev/null)
W4="$REPO/.claude/worktrees/avanca-main"
echo "linha da main" > "$W4/conflito.txt"
git -C "$W4" add conflito.txt
git -C "$W4" commit -qm "feat: muda conflito.txt na main"
(cd "$W4" && node scripts/integrar.mjs >/dev/null 2>&1)
(cd "$W4" && node scripts/tarefa.mjs concluir >/dev/null 2>&1)

SAIDA_CONFLITO=$(cd "$W3" && node scripts/integrar.mjs 2>&1)
COD_CONFLITO=$?
ESTADO_W3=$(git -C "$W3" status --porcelain)
confere "integrar.mjs para em conflito e aborta o rebase" "$([ $COD_CONFLITO -ne 0 ] && [ -z "$ESTADO_W3" ] && echo abortou): $SAIDA_CONFLITO" 'abortou.*CONFLITO: parei e desfiz o rebase'

# 10. sessoes-encerradas.mjs --remover remove só as worktrees já integradas (W1 e W4) e preserva as em andamento (W2 e W3)
SAIDA_SESSOES=$(cd "$REPO" && node scripts/sessoes-encerradas.mjs --remover 2>&1)
confere "sessoes-encerradas --remover removeu as 2 integradas e preservou as 2 vivas" "$SAIDA_SESSOES" '2 de 2 removidos'
confere "worktree integrada (W1) foi removida do disco" "$([ ! -d "$W1" ] && [ ! -d "$W4" ] && echo removidas)" '^removidas$'
confere "worktrees com commits não integrados (W2, W3) foram preservadas" "$([ -d "$W2" ] && [ -d "$W3" ] && echo preservadas)" '^preservadas$'

echo
echo "RESULTADO: $ok passaram, $falha falharam (repo: $REPO)"
[ $falha -eq 0 ]
