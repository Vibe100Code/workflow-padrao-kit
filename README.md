# Workflow padrão com IA — kit

> **Decide com dados, pergunta pouco, entrega com prova.**
> Um método de trabalho com agentes de IA (Claude Code, Codex ou o que você preferir), empacotado para levar a qualquer projeto: app, site, LP, conteúdo ou sistema. Cada regra veio de um erro real; cada número foi medido.

`00 / por onde começar` · `01 / preparar a base` · `02 / dar direção ao agente` · `03 / conhecimento que sobrevive à sessão` · `04 / evidência em vez de "parece pronto"` · `05 / prompts por objetivo` · `06 / global e local` · `07 / índice da documentação` · `08 / progresso`

---

## 00 / Por onde começar

O kit instala, num repositório git, um jeito de trabalhar: cada tarefa numa worktree própria, plano antes de código, revisão independente, prova pelo caminho do usuário e integração por fila. Hooks lembram e travam o que costuma dar errado; scripts fazem o caminho certo ser o mais curto.

```bash
git clone https://github.com/Vibe100Code/workflow-padrao-kit.git ~/workflow-padrao-kit
~/workflow-padrao-kit/scripts/instalar-maquina.sh               # só verifica o que falta
~/workflow-padrao-kit/scripts/instalar-projeto.sh ~/meu-projeto --nome "Meu Projeto"
```
Depois, dentro do projeto, peça ao agente: *"vamos começar o projeto"* ([prompt](docs/prompts/01-comecar-projeto.md)).

| Você quer… | Vá para |
|---|---|
| entender o método e as leis | [00 · Visão geral](docs/00-visao-geral.md) |
| instalar | [01 · Instalação](docs/01-instalacao.md) |
| fazer uma tarefa do começo ao fim | [04 · Fluxo de uma tarefa](docs/04-fluxo-de-uma-tarefa.md) |
| um prompt pronto | [Prompts por objetivo](docs/prompts/README.md) |
| saber o que uma ferramenta ou skill faz | [Ferramentas e skills](docs/tools/README.md) |

### As seis leis
1. **Dado vence opinião.** Decisão do dono escrita? Usa. Medição? Usa. Nenhuma das duas? Mede. "Não medi; medir custa X" é resposta válida; chute não é.
2. **Escrito vence memória.** Decisão, medição e erro resolvido vão para arquivo; o que fica só no chat a próxima sessão inventa de novo.
3. **Quem faz não revisa.** Quem construiu não revisa o próprio trabalho na mesma conversa. Revisor de outra IA é o recomendado; um agente revisor da mesma IA, em contexto limpo, também vale ([agente revisor](docs/08-agente-revisor.md)). Quais ferramentas fazem cada papel é escolha sua.
4. **Mínimo de contexto.** Trecho, não arquivo. Caminho, não conteúdo. Diff, não projeto.
5. **Pronto é com prova.** Testado pelo caminho do usuário: do zero, por todas as entradas, tela inteira conferida. Teste verde sozinho não é prova.
6. **Regra se lê pelo porquê.** Se a letra trava um caso que o motivo não cobre, siga o motivo e diga qual regra leu assim. **Nunca flexível:** dinheiro e gasto pago, senha e segredo, apagar, publicar/integrar na principal, segurança, loja de apps, aprovação final de tela.

## 01 / Preparar a base

| Camada | Quando | Comando | Detalhe |
|---|---|---|---|
| Máquina | uma vez por computador | `scripts/instalar-maquina.sh` (verifica) · `--aplicar` (instala) | [01 · Instalação](docs/01-instalacao.md#instalar-na-máquina-uma-vez-o-que-é-global) |
| Projeto | uma vez por repositório | `scripts/instalar-projeto.sh <repo> --skills base[,ui,spec,pesquisa]` | [01 · Instalação](docs/01-instalacao.md#instalar-num-projeto-o-que-é-local) |

Pré-requisitos: macOS ou Linux, `git`, `node` ≥ 22, `python3`, `jq` e um agente (Claude Code, Codex…). Recomendados: RTK, graphify, `uv`. Os instaladores nunca sobrescrevem arquivo seu, não fazem commit, não instalam nada pago e não fazem login por você. Ajustes finos: [03 · Configuração](docs/03-configuracao.md).

## 02 / Dar direção ao agente

O agente acerta mais quando sabe para quem, para quê e com quais limites, e quem faz o quê.

| Peça | Onde | O que dá ao agente |
|---|---|---|
| Questionário inicial | skill `iniciar-projeto` → `BRIEFING.md` | público, objetivo, marca, restrições, conteúdo real; o que falta fica `a confirmar` ([02 · Questionário](docs/02-questionario-inicial.md)) |
| Manual do projeto | `CLAUDE.md` (o `AGENTS.md` aponta para ele) | o que é, fontes da verdade, como rodar, esteira |
| Regras de início | `.claude/regras-de-inicio.md`, injetado pelo hook | ~1 KB lido em toda sessão |
| Papéis | `papeis` no `workflow.config.json` | quem coordena, implementa e revisa; padrão sugerido Claude Code / Codex / API Claude, troque à vontade ([07 · Agentes e papéis](docs/07-agentes-e-papeis.md)) |

## 03 / Conhecimento que sobrevive à sessão

O que fica só no chat a próxima sessão inventa de novo. Por isso tudo que importa vira arquivo:

| O quê | Onde | Quando |
|---|---|---|
| Decisão do dono | `DECISOES.md` | toda decisão, com data; vence tudo menos decisão mais nova |
| Regra com o porquê | `regras/NNN-*.md` | erro que se repetiu; cada regra tem data, quem decidiu e o incidente ([origem](docs/11-origem-das-regras.md)) |
| Aprendizado | `learnings/AAAA-MM-DD-*.md` | depois de todo problema não trivial (skill `extract-approach`) |
| Plano | `planos/<tarefa>.md` | antes de implementar: arquivos, recursos, dependências |
| Mapa do código | `graphify-out/` (fora do git) | consultado antes de busca ampla ([graphify](docs/tools/04-graphify.md)) |
| Passagem de tarefa | `docs/PASSAGEM-DE-TAREFA.md` | quando outra sessão vai continuar |

## 04 / Evidência em vez de "parece pronto"

| Etapa | Como | Detalhe |
|---|---|---|
| Gates | `node scripts/rodar-gates.mjs`; teste novo nasce provado (injeta o defeito, ele acusa) | [05 · Comandos](docs/05-comandos.md) |
| Revisão independente | outra IA (recomendado), agente `revisor` da mesma IA em contexto limpo, ou API; "sem achados" vale | [08 · Agente revisor](docs/08-agente-revisor.md) |
| Prova pelo caminho do usuário | do zero, por todas as entradas, tela ou saída inteira | [04 · Fluxo](docs/04-fluxo-de-uma-tarefa.md) |
| Integrar pela fila | `node scripts/integrar.mjs`: rebase, gates depois do rebase, push; conflito para | [05 · Comandos](docs/05-comandos.md) |

## 05 / Prompts por objetivo

| # | Objetivo |
|---|---|
| 01 | [Começar um projeto](docs/prompts/01-comecar-projeto.md) |
| 02 | [Abrir uma tarefa](docs/prompts/02-abrir-tarefa.md) |
| 03 | [Planejar antes de implementar](docs/prompts/03-planejar.md) |
| 04 | [Mandar a tarefa ao implementador](docs/prompts/04-briefar-implementador.md) |
| 05 | [Pedir uma revisão independente](docs/prompts/05-revisar.md) |
| 06 | [Provar e integrar](docs/prompts/06-provar-e-integrar.md) |
| 07 | [Depurar um erro](docs/prompts/07-depurar.md) |
| 08 | [Passar ou retomar uma tarefa](docs/prompts/08-passar-tarefa.md) |
| 09 | [Registrar o que se aprendeu](docs/prompts/09-registrar-aprendizado.md) |
| 10 | [Limpar o repositório](docs/prompts/10-limpar-o-repositorio.md) |

## 06 / O que é global e o que é local

| | Global (máquina, `~/.claude/`) | Local (projeto, versionado) |
|---|---|---|
| Regras | `~/.claude/CLAUDE.md` (entrada mínima, estrutura de trabalho) | `CLAUDE.md`, `regras/`, `.claude/regras-de-inicio.md` |
| Hooks | RTK, `bloqueia-pkill-f`, `pedidos-do-dono` | `wf-inicio`, `wf-exige-worktree`, `wf-exige-grafo`, `wf-sugere-skill`, `wf-fim` + githooks |
| Skills | ponytail, caveman, impeccable, security-review, sentinela | grupos `base`, `ui`, `spec`, `pesquisa` em `.claude/skills/` |
| Agentes | — | `.claude/agents/revisor.md`, seção de revisor no `AGENTS.md` |
| Config | plugins em `~/.claude/settings.json` | `.claude/settings.json`, `workflow.config.json` |

Todos os hooks falham aberto, rodam em ~50 ms e ficam mudos quando não se aplicam ([06 · Hooks](docs/06-hooks.md)).

## 07 / Índice da documentação

| # | Documento |
|---|---|
| 00 | [Visão geral](docs/00-visao-geral.md) |
| 01 | [Instalação](docs/01-instalacao.md) |
| 02 | [Questionário inicial](docs/02-questionario-inicial.md) |
| 03 | [Configuração](docs/03-configuracao.md) |
| 04 | [Fluxo de uma tarefa](docs/04-fluxo-de-uma-tarefa.md) |
| 05 | [Comandos](docs/05-comandos.md) |
| 06 | [Hooks](docs/06-hooks.md) |
| 07 | [Agentes e papéis](docs/07-agentes-e-papeis.md) |
| 08 | [Agente revisor](docs/08-agente-revisor.md) |
| 09 | [Conectar APIs (opcional)](docs/09-conectar-apis.md) |
| 10 | [Solução de problemas](docs/10-solucao-de-problemas.md) |
| 11 | [Origem das regras](docs/11-origem-das-regras.md) |
| — | [Ferramentas e skills](docs/tools/README.md) · [Prompts por objetivo](docs/prompts/README.md) |

Para o agente que trabalha **neste** repositório: [CLAUDE.md](CLAUDE.md) e [AGENTS.md](AGENTS.md).

## 08 / Progresso

Não precisa de tudo no primeiro dia. Cada etapa entra quando a anterior já roda sozinha.

**Dia 1 — base escrita**
- [ ] `scripts/instalar-maquina.sh --aplicar` e `scripts/instalar-projeto.sh <repo>`
- [ ] questionário inicial (`iniciar-projeto`) → `BRIEFING.md` e `papeis`
- [ ] `CLAUDE.md` preenchido: o que é, como rodar, comando de testes
- [ ] 3 primeiras decisões em `DECISOES.md`; `graphify update .` e commit inicial
- [ ] toda tarefa começa com `node scripts/nova-sessao.mjs <tipo>/<nome>`

**Semana 1 — qualidade**
- [ ] gates reais no `workflow.config.json`; teste novo nasce provado
- [ ] revisor definido: outra IA ou o agente `revisor` ([08](docs/08-agente-revisor.md))
- [ ] uma nota em `learnings/` por problema resolvido
- [ ] erro que se repetiu vira `regras/NNN-*.md` com o incidente

**Depois — escala**
- [ ] coordenador + sessões paralelas (sem dependência, arquivos e recursos disjuntos)
- [ ] integração só por `integrar`; `sessoes-encerradas --remover` semanal
- [ ] skills `ui` / `spec` / `pesquisa` conforme o projeto
- [ ] regra esquecida duas vezes vira hook

Provar que o kit funciona: `scripts/testes/testar-kit.sh`, `testar-fluxo.sh`, `testar-revisor.sh` e `node scripts/validar-links.mjs` (o CI roda os quatro em todo push e PR).

## Estrutura do repositório

```
workflow-padrao-kit/
├── README.md · CLAUDE.md · AGENTS.md
├── .github/workflows/validar.yml   CI: links + testes (push e PR)
├── docs/
│   ├── 00-visao-geral … 11-origem-das-regras
│   ├── prompts/                   prompts prontos por objetivo (+ índice)
│   └── tools/                     uma página por ferramenta ou grupo de skills (+ índice)
├── templates/
│   ├── projeto/                   copiado para a raiz do projeto: CLAUDE.md, AGENTS.md, BRIEFING.md, DECISOES.md,
│   │                              workflow.config.json, regras/, learnings/, planos/, docs/, .claude/
│   ├── claude-hooks/              hooks do Claude Code do projeto (wf-*.cjs)
│   ├── scripts-do-fluxo/          nova-sessao, tarefa, rodar-gates, integrar, na-fila, gates-do-que-mudou,
│   │                              sessoes-encerradas, revisar-pela-api
│   ├── githooks/                  commit-msg, pre-commit, pre-push, post-commit, post-checkout
│   └── maquina/                   CLAUDE.global.md, settings.global.json, hooks/, coordenacao/, memoria/
├── scripts/
│   ├── instalar-maquina.sh · instalar-projeto.sh
│   ├── validar-links.mjs
│   └── testes/                    testar-kit.sh, testar-fluxo.sh, testar-revisor.sh
└── skills/                        maquina/, projeto-base/, projeto-ui/, projeto-spec/, projeto-pesquisa/
```

## Créditos e licença

Toda skill de terceiros foi copiada com a licença de origem: `LICENSE` (e `NOTICE`, quando a origem tem um) fica dentro da pasta da skill. Todas as origens permitem redistribuição, então nenhuma saiu do repositório. Algumas cópias têm ajustes locais (tradução, exemplos genéricos); o `git log` da pasta mostra o quê.

| Skill (pasta em `skills/`) | Origem | Licença |
|---|---|---|
| `maquina/ponytail` | [dietrichgebert/ponytail](https://github.com/dietrichgebert/ponytail) | MIT |
| `maquina/caveman`, `projeto-base/caveman`, `projeto-base/caveman-compress` | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Apache-2.0 (+ NOTICE) |
| `maquina/impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Apache-2.0 |
| `maquina/security-review` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | MIT |
| `projeto-base/graphify` | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Apache-2.0 (+ NOTICE) |
| `projeto-base/revisar-em-painel`, `projeto-base/sanear` | adaptadas de [soumatheusgomes/vibe-coding-toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit) | MIT |
| `projeto-base/grilling`, `projeto-base/grill-me` | [mattpocock/skills](https://github.com/mattpocock/skills) | MIT |
| `projeto-base/find-skills` | [vercel-labs/skills](https://github.com/vercel-labs/skills) | MIT |
| `projeto-ui/ui-ux-pro-max`, `projeto-ui/design` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | MIT |
| `projeto-ui/frontend-design-review` | derivada de [anthropics/skills · frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Apache-2.0 (licença da pasta de origem) |
| `projeto-spec/speckit-*`, `projeto-spec/_specify` | [github/spec-kit](https://github.com/github/spec-kit) | MIT |
| `projeto-pesquisa/agent-reach` | [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | MIT |
| `projeto-pesquisa/defuddle` | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | MIT |
| `projeto-base/revisao-de-codigo` | adaptada de [mattpocock/skills · code-review](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review) (nome e nota local) | MIT |
| `maquina/sentinela`, `projeto-base/iniciar-projeto`, `projeto-base/extract-approach`, `projeto-ui/apple-hig` | escritas para este fluxo | as do kit |

Plugins (superpowers, typesafe) e ferramentas (RTK, graphify, Codex) **não** vêm copiados: o instalador só aponta para a origem.

O método de organização deste repositório (documentação numerada por jornada, prompts por objetivo, uma página por ferramenta, templates separados de scripts, validação no CI) segue o do [soumatheusgomes/vibe-coding-toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit) (MIT), sem copiar o texto.

**Licença do kit:** a definir pelo dono. Enquanto não houver um arquivo `LICENSE` na raiz, o texto e os scripts próprios do kit não têm licença de uso aberta; as skills de terceiros seguem cada uma a sua licença, listada acima.
