#!/bin/bash
# Bloqueia pkill/killall por padrão de texto (-f): em 17/10 um pkill -f derrubou um agente porque o texto aparecia nas regras dele. Use kill <PID>.
CMD=$(jq -r '.tool_input.command // empty')
if printf '%s' "$CMD" | grep -Eq '(^|[;&|(][[:space:]]*|sudo[[:space:]]+)(pkill|killall)[[:space:]]+([^|;&]*[[:space:]])?-[a-zA-Z]*f'; then
  echo "pkill -f bloqueado: casa texto de linha de comando e mata agentes que citam o mesmo texto. Use kill <PID> (pgrep para achar o PID e confira com ps antes)." >&2
  exit 2
fi
exit 0
