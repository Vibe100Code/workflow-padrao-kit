# Claude Code

**Papel no padrão sugerido:** coordenador (abre sessões, confere, dá a aprovação final) e, se você quiser, implementador ou revisor. Troque em `papeis` ([configuração](../03-configuracao.md)).

| | |
|---|---|
| Instalar | [docs.claude.com/claude-code](https://docs.claude.com/claude-code) (assinatura ou API) |
| O que o kit liga nele | 5 hooks do projeto (`.claude/hooks/wf-*.cjs`), regras de início, skills em `.claude/skills/`, agente `revisor` em `.claude/agents/` |
| Global (máquina) | `~/.claude/CLAUDE.md`, hooks globais, skills de máquina ([instalação](../01-instalacao.md)) |
| Revisor da mesma IA | agente `revisor` em contexto limpo ([agente revisor](../08-agente-revisor.md)) |

Dentro do projeto, o `CLAUDE.md` é o manual e o `BRIEFING.md` é a fonte 0. O hook de início injeta ~1 KB de regras e mostra os papéis em toda sessão ([hooks](../06-hooks.md)).
