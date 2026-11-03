# Ferramentas e skills

Uma página por ferramenta ou grupo de skills: o que é, quando o fluxo usa, como instalar e de onde vem.

Skill é um pacote de instruções que o agente carrega quando o pedido bate com a descrição dela. No fluxo vale **≥1% de chance de ajudar = usa** (o hook `wf-sugere-skill` lembra as principais). Skills de projeto ficam versionadas em `.claude/skills/` do repositório; as de máquina, em `~/.claude/skills/`. Cópias com a licença de origem estão em [`skills/`](../../skills/); a tabela de origem e licença está no [README](../../README.md#créditos-e-licença).

| # | Página | Papel no fluxo |
|---|---|---|
| 01 | [Claude Code](01-claude-code.md) | coordenador no padrão sugerido; hooks, regras, agente revisor |
| 02 | [Codex CLI](02-codex.md) | implementador no padrão sugerido; revisor somente leitura |
| 03 | [RTK](03-rtk.md) | resume saída de comandos (economia de contexto) |
| 04 | [graphify](04-graphify.md) | mapa do código, consultado antes de busca ampla |
| 05 | [Plugins: superpowers, typesafe](05-plugins.md) | brainstorming, planos, debug sistemático, TDD, verificação |
| 06 | [spec-kit](06-spec-kit.md) | spec antes de código em feature grande |
| 07 | [Skills de máquina](07-skills-de-maquina.md) | ponytail, caveman, impeccable, security-review, sentinela |
| 08 | [Skills · base](08-skills-base.md) | iniciar-projeto, graphify, revisao-de-codigo, revisar-em-painel, sanear… |
| 09 | [Skills · ui](09-skills-ui.md) | ui-ux-pro-max, design, frontend-design-review, apple-hig |
| 10 | [Skills · pesquisa](10-skills-pesquisa.md) | agent-reach, defuddle |

Opcionais: **agy** (Antigravity CLI), ajudante em arquivos disjuntos; APIs da Anthropic, OpenAI e Gemini ([conectar APIs](../09-conectar-apis.md)).
