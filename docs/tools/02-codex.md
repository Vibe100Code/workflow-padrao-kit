# Codex CLI

**Papel no padrão sugerido:** implementador. Opcional: troque em `papeis` se preferir outro.

| | |
|---|---|
| Instalar | `npm i -g @openai/codex` e login pela conta do ChatGPT ou pela chave da API (`codex login --help`) |
| Implementar | `codex exec -s workspace-write -m <modelo> -C <pasta> "$(cat brief.md)"` |
| Revisar (mesma IA) | `codex exec -s read-only` numa execução nova, com `docs/PROMPT-REVISOR.md` ([agente revisor](../08-agente-revisor.md)) |
| Lê | `AGENTS.md`, que aponta para o `CLAUDE.md` do projeto |
| Origem | [openai/codex](https://github.com/openai/codex) |

Em segundo plano, feche a entrada (`< /dev/null`) para não travar esperando `stdin` ([regra 011](../../templates/projeto/regras/011-revisao-independente-somente-leitura.md)).
