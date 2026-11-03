# Catálogo de skills e plugins

Skill é um pacote de instruções que o Claude carrega quando o pedido bate com a descrição dela. No fluxo vale a regra **≥1% de chance de ajudar = usa** (o hook `wf-sugere-skill` lembra as principais). As skills de projeto ficam versionadas em `.claude/skills/` do repositório (valem também em sessão remota); as de máquina ficam em `~/.claude/skills/`.

Cópias congeladas de cada skill estão em [`skills/`](../skills/), na versão em uso no fluxo. Para atualizar uma delas, use o link de origem.

## Plugins (instalados por marketplace)

| Plugin | O que traz | Quando o fluxo usa | Origem |
|---|---|---|---|
| **superpowers** | `brainstorming`, `writing-plans`, `executing-plans`, `systematic-debugging`, `test-driven-development`, `verification-before-completion`, `requesting-code-review`, `dispatching-parallel-agents`, `using-git-worktrees`, `finishing-a-development-branch` | brainstorming antes de feature; writing-plans antes de trabalho com mais de um passo; systematic-debugging antes de qualquer fix; TDD em teste novo; verification antes de dizer "pronto" | [obra/superpowers](https://github.com/obra/superpowers) · marketplace [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) |
| **typesafe** | `typesafe-ai` (tipagem estrita em código gerado por IA) | projetos TypeScript | [typesafe-ai/skills](https://github.com/typesafe-ai/skills) |

```bash
claude plugin marketplace add obra/superpowers-marketplace
claude plugin install superpowers@superpowers-marketplace
```
O `projeto/instalar.sh` também declara o superpowers no `.claude/settings.json` do projeto: quem abrir o repositório recebe a oferta de instalar.

## Skills de máquina (`skills/maquina/` → `~/.claude/skills/`)

| Skill | Para quê | Gatilho no fluxo | Origem |
|---|---|---|---|
| [ponytail](../skills/maquina/ponytail/SKILL.md) | a menor mudança que resolve; corta excesso de engenharia | toda tarefa de código | [dietrichgebert/ponytail](https://github.com/dietrichgebert/ponytail) |
| [caveman](../skills/maquina/caveman/SKILL.md) | resposta comprimida (~65–75% menos texto) mantendo precisão técnica | relatos entre agentes e ao coordenador | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) |
| [impeccable](../skills/maquina/impeccable/SKILL.md) | processo de design: critique, audit, polish, harden de interface | toda tela/LP/componente | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) |
| [security-review](../skills/maquina/security-review/SKILL.md) | varredura de segurança do código | dinheiro, autenticação, segredo, entrada externa | [github/awesome-copilot](https://github.com/github/awesome-copilot) |
| [sentinela](../skills/maquina/sentinela/SKILL.md) | auditoria caixa-preta de site público (SPF, DMARC, CSP, TLS, caminhos expostos) | antes de publicar site | do fluxo (interna) |

## Skills de projeto — grupo `base` (padrão em todo projeto)

| Skill | Para quê | Gatilho no fluxo | Origem |
|---|---|---|---|
| [iniciar-projeto](../skills/projeto-base/iniciar-projeto/SKILL.md) | questionário inicial em blocos → `BRIEFING.md` (sem resposta = `a confirmar`) | projeto novo, kickoff, `BRIEFING.md` vazio (o hook de início avisa) | do fluxo (interna) |
| [graphify](../skills/projeto-base/graphify/SKILL.md) | consulta o mapa do código: onde fica X, quem chama Y | antes de qualquer busca ampla (o hook `wf-exige-grafo` cobra) | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) |
| [extract-approach](../skills/projeto-base/extract-approach/SKILL.md) | grava a nota de aprendizado em `learnings/` | depois de todo problema não-trivial resolvido | do fluxo (interna) |
| [revisar-em-painel](../skills/projeto-base/revisar-em-painel/SKILL.md) | painel de revisores independentes com síntese que descarta | antes de integrar mudança não-trivial | do fluxo, a partir de [soumatheusgomes/vibe-coding-toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit) |
| [revisao-de-codigo](../skills/projeto-base/revisao-de-codigo/SKILL.md) | revisão em dois eixos (padrões do projeto e aderência ao plano), cada um num subagente de contexto limpo; usada pelo agente `revisor` | depois de implementar, quando o revisor é a mesma IA ([AGENTE-REVISOR](AGENTE-REVISOR.md)) | adaptada de [mattpocock/skills · code-review](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review) (MIT) |
| [sanear](../skills/projeto-base/sanear/SKILL.md) | limpeza que mede antes: código morto, TODO, dependência sem uso | "limpa o repo", "tem código morto?" | do fluxo, a partir de [soumatheusgomes/vibe-coding-toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit) |
| [grilling](../skills/projeto-base/grilling/SKILL.md) · [grill-me](../skills/projeto-base/grill-me/SKILL.md) | entrevista dura sobre plano ou decisão antes de construir | feature nova, decisão de arquitetura | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [caveman](../skills/projeto-base/caveman/SKILL.md) · [caveman-compress](../skills/projeto-base/caveman-compress/SKILL.md) | modo compacto · comprime CLAUDE.md e memória (guarda o original) | relatos; manual que passou de ~1 KB útil | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) |
| [find-skills](../skills/projeto-base/find-skills/SKILL.md) | acha e instala skill nova | "existe skill para X?" | [vercel-labs/skills](https://github.com/vercel-labs/skills) |

## Grupo `ui` (`--skills ui`)

| Skill | Para quê | Origem |
|---|---|---|
| [ui-ux-pro-max](../skills/projeto-ui/ui-ux-pro-max/SKILL.md) | estilos, paletas, pares de fonte, regras de UX por stack | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| [design](../skills/projeto-ui/design/SKILL.md) | marca, tokens, logo, banner, ícone, foto social | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| [frontend-design-review](../skills/projeto-ui/frontend-design-review/SKILL.md) | revisão de interface por pilares de qualidade | derivada de [anthropics/skills · frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) |
| [apple-hig](../skills/projeto-ui/apple-hig/SKILL.md) | regras das Apple Human Interface Guidelines destiladas | do fluxo (interna) |

No fluxo, toda peça de interface passa por **impeccable + ui-ux-pro-max** (e apple-hig quando é app).

## Grupo `spec` (`--skills spec`)

As 11 skills `speckit-*` (specify → clarify → plan → tasks → analyze → implement → converge, mais checklist, constitution, agent-context-update e taskstoissues), com a estrutura `.specify/` (modelos e scripts). Origem: [github/spec-kit](https://github.com/github/spec-kit). Uso: feature grande → `speckit-specify` antes de código.

## Grupo `pesquisa` (`--skills pesquisa`)

| Skill | Para quê | Origem |
|---|---|---|
| [agent-reach](../skills/projeto-pesquisa/agent-reach/SKILL.md) | lê e busca Twitter, Reddit, YouTube, GitHub etc. por um CLI | [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) |
| [defuddle](../skills/projeto-pesquisa/defuddle/SKILL.md) | página web → Markdown limpo (menos tokens que buscar a página crua) | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) |

## Ferramentas (binários, não skills)

| Ferramenta | Para quê | Origem |
|---|---|---|
| **RTK** | resume a saída de git/ls/grep/find antes de entrar no contexto (hook global) | [rtk-ai/rtk](https://github.com/rtk-ai/rtk) |
| **graphify** (CLI) | gera e consulta o mapa do código; post-commit mantém atualizado | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) (`uv tool install graphifyy`) |
| **Codex CLI** | implementador do padrão sugerido (opcional) | [openai/codex](https://github.com/openai/codex) |
| **agy** (Antigravity CLI) | opcional: implementa extra em arquivos disjuntos | Google Antigravity |
| **spec-kit** (`specify`) | estrutura de spec-driven development | [github/spec-kit](https://github.com/github/spec-kit) |
