# 00 · Visão geral

O que o kit resolve, as leis que ele aplica, o que vem dentro e como o agente recebe direção. Próximo passo: [01 · Instalação](01-instalacao.md).

## Introdução: o que o kit resolve

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

## As seis leis

1. **Dado vence opinião.** Decisão do dono escrita? Usa. Medição? Usa. Nenhuma das duas? Mede. "Não medi; medir custa X" é resposta válida; chute não é.
2. **Escrito vence memória.** Decisão, medição e erro resolvido vão para arquivo; o que fica só no chat a próxima sessão inventa de novo.
3. **Quem faz não revisa.** Quem construiu não revisa o próprio trabalho na mesma conversa. Revisor de outra IA é o recomendado; um agente revisor da mesma IA, em contexto limpo, também vale ([agente revisor](08-agente-revisor.md)). Quais ferramentas fazem cada papel é escolha sua.
4. **Mínimo de contexto.** Trecho, não arquivo. Caminho, não conteúdo. Diff, não projeto.
5. **Pronto é com prova.** Testado pelo caminho do usuário: do zero, por todas as entradas, tela inteira conferida. Teste verde sozinho não é prova.
6. **Regra se lê pelo porquê.** Se a letra trava um caso que o motivo não cobre, siga o motivo e diga qual regra leu assim. **Nunca flexível:** dinheiro e gasto pago, senha e segredo, apagar, publicar/integrar na principal, segurança, loja de apps, aprovação final de tela.

## O que vem no kit

| Peça | Camada | Onde | Detalhe |
|---|---|---|---|
| Regras globais do Claude | máquina | `templates/maquina/CLAUDE.global.md` → `~/.claude/CLAUDE.md` | regra de entrada + estrutura de trabalho |
| Hooks globais | máquina | `templates/maquina/hooks/` | RTK, bloqueia `pkill -f`, registro de pedidos do dono |
| Pasta do coordenador | máquina | `templates/maquina/coordenacao/` → `~/.coord/` | pedidos, prazos, decisões do coordenador, log de provedores |
| Modelos de memória | máquina | `templates/maquina/memoria/` | um fato por arquivo, com Why/How to apply |
| Plugins | máquina + projeto | `settings.json` | superpowers, typesafe |
| Skills | máquina + projeto | `skills/` | 5 de máquina + 4 grupos de projeto (base, ui, spec, pesquisa) |
| Arquivos-base | projeto | `templates/projeto/` | CLAUDE.md, AGENTS.md, BRIEFING.md (+ questionário inicial), DECISOES.md, regras/, learnings/, planos/, docs/ (brief, cartão de votação, passagem de tarefa) |
| Regras do fluxo | projeto | `templates/projeto/regras/` | uma por arquivo: data, quem decidiu, incidente, porquê ([índice](../templates/projeto/regras/INDICE.md)) |
| Hooks do Claude Code | projeto | `templates/claude-hooks/` | início, exige worktree, exige grafo, sugere skill, fim |
| Scripts do fluxo | projeto | `templates/scripts-do-fluxo/` | nova-sessao, tarefa, rodar-gates, integrar, na-fila, gates-do-que-mudou, sessoes-encerradas, revisar-pela-api |
| Githooks | projeto | `templates/githooks/` | commit-msg, pre-commit, pre-push |
| Configuração do projeto | projeto | `workflow.config.json` | base, remoto, gates, publicar, links |
| Testes do kit | — | `scripts/testes/` | `testar-kit.sh` (instalação + hooks), `testar-fluxo.sh` (sessão → integrar), `testar-revisor.sh` (revisor sem rede) |

## Direção padrão para o Claude

Três arquivos dizem ao Claude como agir, em ordem de alcance:

| Arquivo | Vale para | Conteúdo |
|---|---|---|
| `~/.claude/CLAUDE.md` | toda sessão da máquina | regra de entrada, estrutura de trabalho, ferramentas ligadas |
| `<projeto>/CLAUDE.md` (+ `AGENTS.md`) | o projeto | o que é, fontes da verdade, como rodar, esteira, erros proibidos |
| `<projeto>/.claude/regras-de-inicio.md` | início de toda sessão (injetado) | o resumo de ~1 KB |

Este próprio repositório tem um [`CLAUDE.md`](../CLAUDE.md): abra o Claude Code aqui e peça "instala o kit no projeto X" ou "o que falta na minha máquina?" — ele sabe o que fazer.
