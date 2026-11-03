# AGENTS.md
O manual de operação deste projeto é o [CLAUDE.md](CLAUDE.md). Leia-o inteiro antes de agir; vale para Codex, Gemini, Claude e qualquer outro agente.

## Revisor da mesma IA (Codex)
Quando o Codex implementou e também vai revisar, a revisão roda numa execução **nova** (contexto limpo) e **somente leitura**, com o prompt de `docs/PROMPT-REVISOR.md` preenchido:
```bash
codex exec -s read-only -C "$PWD" "$(sed -e 's/{{BASE}}/main/' -e 's/{{HEAD}}/HEAD/' docs/PROMPT-REVISOR.md)" < /dev/null > revisao.md
```
Nunca reaproveite a sessão que implementou. Outra IA revisando continua sendo o recomendado (`docs/AGENTE-REVISOR.md` do kit).
