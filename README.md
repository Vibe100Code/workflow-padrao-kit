# Workflow padrão com IA — kit

> **Decide com dados, pergunta pouco, entrega com prova.**
> O fluxo de trabalho com agentes de IA (Claude Code, Codex ou o que você preferir) usado em produção no dia a dia, empacotado para qualquer projeto: app, site, LP, conteúdo ou sistema. Cada regra existe por causa de um erro real; cada número foi medido.

Explicação visual das 12 seções: [Workflow Padrão com IA (artifact)](https://claude.ai/artifact/Fy2bzszMxGzyzTiLW84eiX).

---

## Sumário
1. [Introdução: o que o kit resolve](#1-introdução-o-que-o-kit-resolve)
2. [As seis leis](#2-as-seis-leis)
3. [O que vem no kit](#3-o-que-vem-no-kit)
4. [Pré-requisitos](#4-pré-requisitos)
5. [Instalar na máquina](#5-instalar-na-máquina-uma-vez)
6. [Instalar num projeto](#6-instalar-num-projeto)
7. [Configurar](#7-configurar)
8. [O fluxo de uma tarefa (10 passos)](#8-o-fluxo-de-uma-tarefa-10-passos)
9. [Comandos](#9-comandos)
10. [Skills e plugins](#10-skills-e-plugins)
11. [Hooks](#11-hooks)
12. [Agentes e revisão](#12-agentes-e-revisão)
13. [Direção padrão para o Claude](#13-direção-padrão-para-o-claude)
14. [Ordem de adoção](#14-ordem-de-adoção)
15. [Provar que o kit funciona](#15-provar-que-o-kit-funciona)
16. [Solução de problemas](#16-solução-de-problemas)
17. [Estrutura do repositório](#17-estrutura-do-repositório)

---

## 1. Introdução: o que o kit resolve

Trabalhar com vários agentes de IA no mesmo projeto falha de jeitos previsíveis, e todos aconteceram de verdade no projeto de origem:

| Problema medido | O que o kit põe no lugar |
|---|---|
| 33 trocas de branch no mesmo diretório; commit de uma sessão caindo na branch de outra | uma **worktree por tarefa** (`nova-sessao`) e hook que nega edição na `main` |
| rebase com 11 conflitos resolvidos às pressas apagou 3 telas aprovadas | `integrar`: gates rodam **depois** do rebase; conflito **para** em vez de resolver sozinho |
| 9 commits prontos e nunca integrados, por dias | hook de fim de turno que lembra de integrar quando há trabalho pronto e parado |
| 66 worktrees abertas e 193 branches esquecidas | `sessoes-encerradas --remover` (remove só o que já está na `main`) |
| ~US$ 214 num dia com um modelo lendo páginas inteiras | regra de entrada mínima: trecho, não arquivo; diff, não projeto |
| suíte em cadeia `&&` escondia 187 gates atrás do 1º vermelho | `rodar-gates`: todos em paralelo, acumula falhas, reprova no fim |
| regras de 17 KB que ninguém lia | ~1 KB de regras injetadas no início de cada sessão; o resto sob demanda |
| decisão perguntada de novo a cada sessão | `DECISOES.md`, `regras/` com o porquê, `learnings/`, memória e mapa do código |

O kit tem **duas camadas**:
- **Máquina** (uma vez por computador): regras globais do Claude, hooks globais, plugins, skills de máquina, pasta do coordenador.
- **Projeto** (uma vez por repositório): arquivos-base, regras, hooks do Claude Code, scripts do fluxo, githooks, skills de projeto.

## 2. As seis leis

1. **Dado vence opinião.** Decisão do dono escrita? Usa. Medição? Usa. Nenhuma das duas? Mede. "Não medi; medir custa X" é resposta válida; chute não é.
2. **Escrito vence memória.** Decisão, medição e erro resolvido vão para arquivo; o que fica só no chat a próxima sessão inventa de novo.
3. **Quem faz não revisa.** Um modelo implementa, outro (de preferência de outro fornecedor) revisa. Quais ferramentas fazem cada papel é escolha sua.
4. **Mínimo de contexto.** Trecho, não arquivo. Caminho, não conteúdo. Diff, não projeto.
5. **Pronto é com prova.** Testado pelo caminho do usuário: do zero, por todas as entradas, tela inteira conferida. Teste verde sozinho não é prova.
6. **Regra se lê pelo porquê.** Se a letra trava um caso que o motivo não cobre, siga o motivo e diga qual regra leu assim. **Nunca flexível:** dinheiro e gasto pago, senha e segredo, apagar, publicar/integrar na principal, segurança, loja de apps, aprovação final de tela.

## 3. O que vem no kit

| Peça | Camada | Onde | Detalhe |
|---|---|---|---|
| Regras globais do Claude | máquina | `maquina/CLAUDE.global.md` → `~/.claude/CLAUDE.md` | regra de entrada + estrutura de trabalho |
| Hooks globais | máquina | `maquina/hooks/` | RTK, bloqueia `pkill -f`, registro de pedidos do dono |
| Pasta do coordenador | máquina | `maquina/coordenacao/` → `~/.coord/` | pedidos, prazos, decisões do coordenador, log de provedores |
| Modelos de memória | máquina | `maquina/memoria/` | um fato por arquivo, com Why/How to apply |
| Plugins | máquina + projeto | `settings.json` | superpowers, typesafe |
| Skills | máquina + projeto | `skills/` | 5 de máquina + 4 grupos de projeto (base, ui, spec, pesquisa) |
| Arquivos-base | projeto | `projeto/modelos/` | CLAUDE.md, AGENTS.md, BRIEFING.md (+ questionário inicial), DECISOES.md, regras/, learnings/, planos/, docs/ (brief, cartão de votação, passagem de tarefa) |
| Regras do fluxo | projeto | `projeto/modelos/regras/` | uma por arquivo: data, quem decidiu, incidente, porquê ([índice](projeto/modelos/regras/INDICE.md)) |
| Hooks do Claude Code | projeto | `projeto/hooks/` | início, exige worktree, exige grafo, sugere skill, fim |
| Scripts do fluxo | projeto | `projeto/scripts/` | nova-sessao, tarefa, rodar-gates, integrar, na-fila, gates-do-que-mudou, sessoes-encerradas, revisar-pela-api |
| Githooks | projeto | `projeto/githooks/` | commit-msg, pre-commit, pre-push |
| Configuração do projeto | projeto | `workflow.config.json` | base, remoto, gates, publicar, links |
| Testes do kit | — | `projeto/testes/` | `testar-kit.sh` (instalação + hooks), `testar-fluxo.sh` (sessão → integrar), `testar-revisor.sh` (revisor sem rede) |

## 4. Pré-requisitos

| Obrigatório | Recomendado | Opcional |
|---|---|---|
| macOS ou Linux, `git`, `node` ≥ 22, `python3`, `jq`, [Claude Code](https://docs.claude.com/claude-code) | [`uv`](https://docs.astral.sh/uv/) (instala o graphify), [RTK](https://github.com/rtk-ai/rtk), [graphify](https://github.com/Graphify-Labs/graphify), [Codex CLI](https://github.com/openai/codex) | `agy` (Antigravity), chaves de API se quiser usar alguma ([conectar APIs](docs/CONECTAR-APIS.md)), `gh` |

## 5. Instalar na máquina (uma vez)

```bash
git clone <este-repo> ~/workflow-padrao-kit
cd ~/workflow-padrao-kit
maquina/instalar-maquina.sh            # só verifica: lista ok / falta
maquina/instalar-maquina.sh --aplicar  # instala o que dá
```

O `--aplicar`:
1. instala o graphify (`uv tool install graphifyy`) se faltar;
2. copia os hooks para `~/.claude/hooks/` (pula os que existem);
3. mescla hooks e plugins em `~/.claude/settings.json` (**backup** `settings.json.bak-kit-<data>` antes);
4. instala os plugins `superpowers` e `typesafe` pelo `claude plugin`;
5. copia as skills de máquina para `~/.claude/skills/` (pula as que existem);
6. cria `~/.claude/CLAUDE.md` com as regras — se já existir, salva `CLAUDE.kit.md` ao lado para você mesclar;
7. cria a pasta do coordenador `~/.coord/`.

O que **não** faz, de propósito (literais): instalar coisa paga, criar conta, fazer login, gravar chave. Ele diz o comando exato para você rodar, por exemplo:
```bash
security add-generic-password -a "$USER" -s anthropic-api-key -w
```
Opções: `--sem-plugins` (não chama `claude plugin`), `--sem-rede` (nada da internet).

## 6. Instalar num projeto

```bash
cd ~/meu-projeto && git init        # se ainda não for repositório
~/workflow-padrao-kit/projeto/instalar.sh . --nome "Meu Projeto" --skills base,ui
```

| Opção | Efeito |
|---|---|
| `--nome "X"` | preenche o título do `CLAUDE.md` |
| `--skills base` (padrão) | skills de processo: iniciar-projeto, graphify, extract-approach, revisar-em-painel, sanear, grilling, caveman, find-skills |
| `--skills ui` | + ui-ux-pro-max, design, frontend-design-review, apple-hig |
| `--skills spec` | + 11 skills speckit e a pasta `.specify/` |
| `--skills pesquisa` | + agent-reach, defuddle |
| `--skills todas` | os quatro grupos |

O instalador **nunca sobrescreve** arquivo do projeto (avisa e pula), não faz commit e pode rodar de novo. Ele:
1. cria os arquivos-base;
2. copia hooks do Claude Code, scripts do fluxo e githooks (`git config core.hooksPath githooks`);
3. liga os 5 hooks e declara o plugin superpowers em `.claude/settings.json`;
4. copia as skills dos grupos pedidos para `.claude/skills/`;
5. instala o post-commit do graphify;
6. põe `.claude/worktrees/` e `graphify-out/` no `.gitignore`.

Depois:
```bash
# preencha os {{...}} do CLAUDE.md e os gates do workflow.config.json
graphify update .                     # primeiro mapa do código
git add -A && git commit -m "chore: adota o workflow padrão"
```

## 7. Configurar

### `workflow.config.json` (raiz do projeto)
```json
{
  "base": "main",
  "remoto": "origin",
  "gates": [
    { "nome": "tipos", "cmd": "npx tsc --noEmit" },
    { "nome": "testes", "cmd": "npm test" }
  ],
  "publicar": null,
  "worktrees": ".claude/worktrees",
  "links": [".env", "node_modules"]
}
```
| Campo | Para quê |
|---|---|
| `base` | a branch principal; nada é editado direto nela |
| `remoto` | onde o `integrar` publica; sem remoto, integra na base local |
| `gates` | cada teste do projeto; `rodar-gates` roda todos em paralelo e reprova no fim |
| `publicar` | comando opcional depois de integrar (deploy); `null` = não publica |
| `worktrees` | onde ficam as cópias de cada tarefa |
| `links` | arquivos ignorados pelo git que cada worktree recebe por link (env, dependências) |

### Outros pontos de ajuste
| O quê | Onde |
|---|---|
| regras de início (~1 KB) | `.claude/regras-de-inicio.md` |
| palavras-chave → skill | `REGRAS` em `.claude/hooks/wf-sugere-skill.cjs` |
| manual do projeto | `CLAUDE.md` (curto; AGENTS.md aponta para ele) |
| desligar trava de edição numa sessão | `WF_SEM_TRAVA=1` |
| desligar exigência do grafo | `WF_SEM_GRAFO=1` |
| pasta do coordenador | `COORD_DIR` (padrão `~/.coord`) |

Detalhe: [docs/CONFIGURACAO.md](docs/CONFIGURACAO.md).

### APIs (opcional)
O workflow roda só com os apps por assinatura. Se quiser um revisor ou ajudante por API (Claude, OpenAI/Codex, Gemini), o passo a passo está em [docs/CONECTAR-APIS.md](docs/CONECTAR-APIS.md): onde criar a chave, como guardar fora do git, a chamada mínima e como apontar o `papeis` para ela.

## 8. O fluxo de uma tarefa (10 passos)

### Antes da primeira tarefa: o questionário inicial
Projeto novo começa com a skill **`iniciar-projeto`**: o Claude faz, em blocos curtos (`AskUserQuestion`, até 4 perguntas por vez, com opções prontas), as 29 perguntas de [`docs/QUESTIONARIO-INICIAL.md`](projeto/modelos/docs/QUESTIONARIO-INICIAL.md) e grava as respostas em `BRIEFING.md`:

| Bloco | Pergunta sobre |
|---|---|
| 0 · Projeto | tipo, o que já existe, stack obrigatória |
| 1 · Negócio e público | oferta, para quem, dor, diferencial com prova |
| 2 · Objetivo e medida | ação principal, métrica e meta, ação secundária |
| 3 · Marca | cores, fontes, tom e palavras proibidas, logo, o que falta |
| 4 · Referências | o que gosta (com links) e o que não quer |
| 5 · Restrições e pronto | prazo, critério de pronto, o que nunca fazer, orçamento pago |
| 6 · Conteúdo real | textos, fotos/vídeos (banco ou IA?), provas e depoimentos, contatos |
| 7 · Operação | quem aprova e como, onde publica e quem tem acesso, observações, **papéis** (quem coordena, implementa e revisa) |

Regras: não pergunta o que já está escrito (procura antes e cita a fonte); sem resposta = **`a confirmar`**, nada é inventado; grava bloco a bloco. O `CLAUDE.md` manda ler o `BRIEFING.md` antes de agir, o hook de início avisa enquanto ele estiver vazio, e todo briefing de subagente cita **só o bloco que importa** (ex.: "BRIEFING §3 Marca: …").

### Os 10 passos

| # | Passo | Como |
|---|---|---|
| 1 | **Abrir a sessão** | `node scripts/nova-sessao.mjs feature/nome` → `cd` no caminho impresso |
| 2 | **Quatro perguntas** por escrito | evidência do problema · o que a mudança alcança · risco · como vou provar |
| 3 | **Plano** | `planos/<nome>.md` a partir de `planos/_MODELO.md` (Files / Resources / Depends-on); `superpowers:writing-plans` |
| 4 | **Implementar** | o implementador dos `papeis` (padrão: Codex) executa o plano; a sessão confere o diff |
| 5 | **Testes** | `node scripts/rodar-gates.mjs`; teste novo nasce provado (injeta o defeito, ele acusa) |
| 6 | **Revisão por outro modelo** | um revisor dos `papeis` que não implementou (padrão: `node scripts/revisar-pela-api.mjs --base main -o revisao.md`); crítico/alto se conserta antes |
| 7 | **Prova pelo caminho do usuário** | abrir do zero, todas as entradas, tela inteira em tamanho real |
| 8 | **Aprovar** | coordenador aprova pelas fontes; tela nova só com voto do dono no print ([cartão de votação](projeto/modelos/docs/CARTAO-DE-VOTACAO.md)) |
| 9 | **Integrar pela fila** | `node scripts/integrar.mjs` → depois `node scripts/tarefa.mjs concluir` |
| 10 | **Aprendizado** | skill `extract-approach` → `learnings/AAAA-MM-DD-slug.md`; `graphify update .` |

Passo a passo com exemplos: [docs/FLUXO.md](docs/FLUXO.md).

### Decidir sem perguntar (em ordem; o primeiro "sim" decide)
1. Está escrito nas fontes (`DECISOES.md`, `regras/`, memória)? → usa.
2. Existe medição? → usa (se contradiz o aprovado, apresenta, não aplica sozinho).
3. Dá para medir agora? → mede.
4. É assunto do dono (literais)? → [cartão de votação](projeto/modelos/docs/CARTAO-DE-VOTACAO.md), uma pergunta por vez.
5. Nada disso → decide pelo porquê das regras, segue e registra em `DECISOES.md`.

## 9. Comandos

| Comando | Faz |
|---|---|
| `node scripts/nova-sessao.mjs <tipo>/<nome>` | worktree própria nascida da base atual (tipo: feature, fix, chore, docs, refactor, perf, style) |
| `node scripts/tarefa.mjs abrir <tipo>/<nome>` · `estado` · `concluir` | marca o ciclo da tarefa (`branch.<b>.wfTarefa`) |
| `node scripts/rodar-gates.mjs` | todos os gates do `workflow.config.json`, em paralelo, falhas acumuladas |
| `node scripts/integrar.mjs` | fetch → rebase → gates **depois** do rebase → push; rejeição recomeça do fetch; conflito para |
| `node scripts/sessoes-encerradas.mjs [--remover]` | lista/remove worktrees cujo trabalho já está na base |
| `node scripts/revisar-pela-api.mjs --base main -o revisao.md` | revisão do diff pela API Claude (chave do Keychain) |
| `graphify query "<pergunta>"` · `graphify update .` | consulta / atualiza o mapa do código |
| `rtk gain` · `rtk proxy <cmd>` | economia do RTK · saída inteira quando precisar |
| `codex exec -s workspace-write -m <modelo> -C <pasta> "<brief>"` | implementação, se o Codex for o implementador (padrão) |
| `maquina/instalar-maquina.sh [--aplicar]` · `projeto/instalar.sh <repo>` | instaladores |

Referência completa, com saída esperada de cada um: [docs/COMANDOS.md](docs/COMANDOS.md). Se o projeto usa npm, crie atalhos no `package.json` (`"sessao": "node scripts/nova-sessao.mjs"`, etc.) — o fluxo de origem usa `npm run sessao -- <tipo>/<nome>`.

## 10. Skills e plugins

Regra: **≥1% de chance de ajudar = usa.** Os gatilhos principais:

| Pedido | Skill |
|---|---|
| projeto novo, kickoff | `iniciar-projeto` (questionário → `BRIEFING.md`) |
| feature nova | `superpowers:brainstorming` → `grilling` → plano (`superpowers:writing-plans` ou `speckit-specify`) |
| bug, erro, "quebrou" | `superpowers:systematic-debugging` antes de qualquer fix |
| teste | `superpowers:test-driven-development` |
| qualquer código | `ponytail` (a menor mudança que resolve) |
| onde fica / quem chama | `graphify` |
| tela, LP, componente | `impeccable` + `ui-ux-pro-max` (+ `apple-hig` em app) |
| antes de integrar | `revisar-em-painel` + revisor externo |
| segurança, dinheiro, segredo | `security-review` (+ `sentinela` em site público) |
| limpeza do repositório | `sanear` |
| problema resolvido | `extract-approach` |
| relato entre agentes | `caveman` |

Catálogo completo, com link para cada skill e a origem: **[docs/SKILLS.md](docs/SKILLS.md)**.

### Origem e licença das skills
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
| `maquina/sentinela`, `projeto-base/iniciar-projeto`, `projeto-base/extract-approach`, `projeto-ui/apple-hig` | escritas para este fluxo | as do kit |

Plugins (superpowers, typesafe) e ferramentas (RTK, graphify, Codex) **não** vêm copiados: o instalador só aponta para a origem.

## 11. Hooks

| Hook | Quando | Faz |
|---|---|---|
| `wf-inicio` | início da sessão | regras (~1 KB) + aviso de diretório compartilhado / árvore velha |
| `wf-exige-worktree` | antes de editar | nega edição na base, em HEAD solto e em tarefa concluída |
| `wf-exige-grafo` | antes de buscar | 1ª busca ampla só depois de `graphify query` |
| `wf-sugere-skill` | a cada pedido | até 2 skills |
| `wf-fim` | fim do turno | lembra de integrar trabalho pronto e parado; nunca bloqueia |
| `commit-msg` · `pre-commit` · `pre-push` | git | sem trailer de ferramenta · sem commit na base · gates do que mudou |
| `rtk` · `bloqueia-pkill-f` · `pedidos-do-dono` | máquina | resumo de saída · sem `pkill -f` · registro de pedidos |

Todos falham aberto, rodam em ~50 ms e ficam mudos quando não se aplicam. Escapes e teste à mão: [docs/HOOKS.md](docs/HOOKS.md).

## 12. Agentes e revisão

**Os papéis são seus.** Quem coordena, quem implementa e quem revisa fica em `papeis` no `workflow.config.json` (a pergunta 29 do questionário preenche); o hook de início mostra a escolha em toda sessão. Claude coordenando e Codex implementando é só o padrão sugerido. O contrário vale, uma ferramenta só vale. Fixo é uma coisa: **quem implementou uma mudança não revisa essa mudança**.

| Papel | Padrão sugerido | Alternativas |
|---|---|---|
| coordenar (orquestra, aprovação final antes de integrar) | Claude Code | Codex, ou outro agente com sessões |
| implementar | Codex | Claude Code, agy, Gemini CLI… |
| revisar | API Claude (Opus em dinheiro, segurança e motor) | qualquer outro modelo disponível, por app ou por API ([conectar APIs](docs/CONECTAR-APIS.md)) |
| ajudar (buscar, conferir) | subagentes do Claude (Haiku) | subagentes da ferramenta escolhida |

Todo relato termina com `AGENTES: <ferramenta e modelo> | <o que faz> | desde HH:MM`. Detalhe, briefing, ondas paralelas e números de economia: [docs/AGENTES-E-REVISAO.md](docs/AGENTES-E-REVISAO.md).

## 13. Direção padrão para o Claude

Três arquivos dizem ao Claude como agir, em ordem de alcance:

| Arquivo | Vale para | Conteúdo |
|---|---|---|
| `~/.claude/CLAUDE.md` | toda sessão da máquina | regra de entrada, estrutura de trabalho, ferramentas ligadas |
| `<projeto>/CLAUDE.md` (+ `AGENTS.md`) | o projeto | o que é, fontes da verdade, como rodar, esteira, erros proibidos |
| `<projeto>/.claude/regras-de-inicio.md` | início de toda sessão (injetado) | o resumo de ~1 KB |

Este próprio repositório tem um [`CLAUDE.md`](CLAUDE.md): abra o Claude Code aqui e peça "instala o kit no projeto X" ou "o que falta na minha máquina?" — ele sabe o que fazer.

## 14. Ordem de adoção

Não precisa de tudo no primeiro dia. Cada etapa entra quando a anterior já roda sozinha.

**Dia 1 — base escrita**
- [ ] `maquina/instalar-maquina.sh --aplicar` (RTK, graphify, superpowers, hooks globais)
- [ ] `projeto/instalar.sh <repo>` com `--skills base`
- [ ] questionário inicial: skill `iniciar-projeto` → `BRIEFING.md`
- [ ] `CLAUDE.md` preenchido: o que é, como rodar, comando de testes
- [ ] 3 primeiras decisões em `DECISOES.md`
- [ ] `graphify update .` e commit inicial
- [ ] toda tarefa começa com `nova-sessao`

**Semana 1 — qualidade**
- [ ] gates reais no `workflow.config.json`; teste novo nasce provado
- [ ] revisor de outro fornecedor (chave da API no Keychain; `revisar-pela-api`)
- [ ] uma nota em `learnings/` por problema resolvido (`extract-approach`)
- [ ] subagente só com o [briefing padrão](projeto/modelos/docs/BRIEF-PADRAO-SUBAGENTE.md)
- [ ] erro que se repetiu vira `regras/NNN-*.md` com o incidente

**Depois — escala**
- [ ] coordenador + sessões paralelas (ondas: sem dependência, arquivos e recursos disjuntos)
- [ ] integração só por `integrar` (fila, um por vez); `sessoes-encerradas --remover` semanal
- [ ] cartão de votação para tudo que é do dono; `~/.coord/PEDIDOS-DO-DONO.jsonl` triado
- [ ] skills `ui`/`spec`/`pesquisa` conforme o projeto
- [ ] regra que alguém esqueceu duas vezes vira hook

## 15. Provar que o kit funciona

```bash
projeto/testes/testar-kit.sh      # repo vazio → instala → cada hook dispara ou cala quando deve
projeto/testes/testar-fluxo.sh    # sessão → tarefa → gates → integrar (verde integra, vermelho não, conflito para) → limpeza
projeto/testes/testar-revisor.sh  # revisor pela API, sem rede nem custo
maquina/instalar-maquina.sh       # o que falta nesta máquina
```

## 16. Solução de problemas

| Sintoma | Causa provável | Ação |
|---|---|---|
| "Você está na `main`: nada é editado direto nela" | editando no diretório principal | `node scripts/nova-sessao.mjs <tipo>/<nome>` e edite na worktree |
| "Rode `graphify query` primeiro" | 1ª busca ampla da sessão | rode uma consulta; ou `WF_SEM_GRAFO=1` se o grafo estiver quebrado |
| commit recusado por trailer | `Co-Authored-By` na mensagem | tire o trailer |
| árvore sempre suja depois do commit | `graphify-out/` versionado | confira `.gitignore` (o instalador põe) |
| `integrar` parou em conflito | duas mudanças válidas no mesmo lugar | resolva à mão, olhando o que foi aprovado; nunca às pressas |
| hook não dispara | settings não carregado / projeto não confiado | reabra o Claude Code na pasta; confira `.claude/settings.json` |
| implementador sem cota | limite do plano | troque o `implementador` em `papeis` (ou use um ajudante em arquivos disjuntos) |

Mais casos: [docs/SOLUCAO-DE-PROBLEMAS.md](docs/SOLUCAO-DE-PROBLEMAS.md).

## 17. Estrutura do repositório

```
workflow-padrao-kit/
├── README.md                 este arquivo
├── CLAUDE.md                 direção padrão para o Claude dentro do kit
├── docs/                     FLUXO · COMANDOS · CONFIGURACAO · SKILLS · HOOKS · AGENTES-E-REVISAO · CONECTAR-APIS · SOLUCAO-DE-PROBLEMAS · ORIGEM-DAS-REGRAS
├── maquina/                  camada global (uma vez por computador)
│   ├── instalar-maquina.sh
│   ├── CLAUDE.global.md      → ~/.claude/CLAUDE.md
│   ├── settings.global.json  fragmento mesclado em ~/.claude/settings.json
│   ├── hooks/                bloqueia-pkill-f · pedidos-do-dono
│   ├── coordenacao/          → ~/.coord
│   └── memoria/              modelos de memória
├── projeto/                  camada do repositório
│   ├── instalar.sh
│   ├── modelos/              CLAUDE.md · AGENTS.md · BRIEFING.md · DECISOES.md · workflow.config.json · regras/ · learnings/ · planos/ · docs/ · .claude/regras-de-inicio.md
│   ├── hooks/                wf-inicio · wf-exige-worktree · wf-exige-grafo · wf-sugere-skill · wf-fim
│   ├── scripts/              nova-sessao · tarefa · rodar-gates · integrar · na-fila · gates-do-que-mudou · sessoes-encerradas · revisar-pela-api
│   ├── githooks/             commit-msg · pre-commit · pre-push · post-commit · post-checkout
│   └── testes/               testar-kit.sh · testar-fluxo.sh · testar-revisor.sh
└── skills/
    ├── maquina/              ponytail · caveman · impeccable · security-review · sentinela
    ├── projeto-base/         iniciar-projeto · graphify · extract-approach · revisar-em-painel · sanear · grilling · grill-me · caveman · caveman-compress · find-skills
    ├── projeto-ui/           ui-ux-pro-max · design · frontend-design-review · apple-hig
    ├── projeto-spec/         speckit-* + _specify/
    └── projeto-pesquisa/     agent-reach · defuddle
```
