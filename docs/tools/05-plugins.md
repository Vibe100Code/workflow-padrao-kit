# Plugins (superpowers, typesafe)


| Plugin | O que traz | Quando o fluxo usa | Origem |
|---|---|---|---|
| **superpowers** | `brainstorming`, `writing-plans`, `executing-plans`, `systematic-debugging`, `test-driven-development`, `verification-before-completion`, `requesting-code-review`, `dispatching-parallel-agents`, `using-git-worktrees`, `finishing-a-development-branch` | brainstorming antes de feature; writing-plans antes de trabalho com mais de um passo; systematic-debugging antes de qualquer fix; TDD em teste novo; verification antes de dizer "pronto" | [obra/superpowers](https://github.com/obra/superpowers) · marketplace [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) |
| **typesafe** | `typesafe-ai` (tipagem estrita em código gerado por IA) | projetos TypeScript | [typesafe-ai/skills](https://github.com/typesafe-ai/skills) |

```bash
claude plugin marketplace add obra/superpowers-marketplace
claude plugin install superpowers@superpowers-marketplace
```
O `scripts/instalar-projeto.sh` também declara o superpowers no `.claude/settings.json` do projeto: quem abrir o repositório recebe a oferta de instalar.
