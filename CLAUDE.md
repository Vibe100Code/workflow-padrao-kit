# CLAUDE.md — direção padrão para o Claude neste kit

> Você (Claude, ou qualquer agente) foi aberto dentro do **kit do workflow padrão**. Este arquivo diz o que fazer quando alguém pedir para instalar, usar, atualizar ou explicar o kit. Idioma: pt-BR.

## O que este repositório é
Um kit que aplica a qualquer projeto o fluxo de trabalho com IA usado em produção (dono → coordenador → sessões de tarefa → agentes). Duas camadas:
- `maquina/` — uma vez por computador: regras globais, hooks globais (RTK, pkill, pedidos do dono), plugins, skills de máquina, pasta do coordenador.
- `projeto/` — uma vez por repositório: arquivos-base, regras, hooks do Claude Code, scripts do fluxo (sessão, tarefa, gates, integrar, revisar), githooks, skills de projeto.
Leia o [README](README.md) para o mapa completo e [docs/](docs/) para cada parte.

## Pedidos comuns → o que fazer

| Pedido | Faça |
|---|---|
| "instala o kit nesta máquina" | `maquina/instalar-maquina.sh` (só verifica) → mostre o que falta → com OK do dono, `--aplicar`. Nunca instale nada pago nem faça login por ele. |
| "instala o kit no projeto X" | confirme que X é repositório git e que o dono pediu **esse** projeto. Rode `projeto/instalar.sh <X> --nome "<Nome>" --skills <grupos>`. Mostre a saída. Não faça commit no projeto sem pedido. |
| "quais skills uso para Y?" | [docs/SKILLS.md](docs/SKILLS.md). |
| "como funciona o fluxo / o que faço agora?" | [docs/FLUXO.md](docs/FLUXO.md) e [docs/COMANDOS.md](docs/COMANDOS.md). |
| "um hook está atrapalhando" | [docs/HOOKS.md](docs/HOOKS.md) → seção de escape. Não desligue hook sem dizer qual e por quê. |
| "atualiza uma skill" | troque a cópia em `skills/<grupo>/<nome>/` pela versão da origem (link no catálogo), rode `projeto/testes/testar-kit.sh`, commit. |
| "quero outra ferramenta coordenando / implementando / revisando" | edite `papeis` no `workflow.config.json` do projeto ([CONFIGURACAO](docs/CONFIGURACAO.md#papéis-escolha-sua)). Nenhuma ferramenta é obrigatória; só confira que o implementador não está entre os revisores. |
| "prova que funciona" | `projeto/testes/testar-kit.sh` e `projeto/testes/testar-fluxo.sh`; cole a saída. |

## Regras para mexer neste kit
1. **Nada de produto.** Nome de app, cliente, tela, servidor ou conta não entra. Exemplo concreto vira `{{placeholder}}`.
2. **Todo hook falha aberto, roda em < 0,5 s e fica mudo quando não se aplica.** Hook que trava sessão ou fala sempre é removido.
3. **Toda regra em `projeto/modelos/regras/` tem data, quem decidiu e o incidente.** Sem incidente real, não é regra; é sugestão no README.
4. **Instaladores nunca sobrescrevem arquivo do usuário** e fazem backup antes de mesclar `settings.json`.
5. **Mudou hook, script ou instalador → rode os dois testes** e cole o resultado antes de dizer "pronto".
6. **Literais do fluxo continuam literais aqui:** dinheiro, senha, segredo, apagar, publicar/integrar, segurança. Pergunte antes.
7. Commit `tipo(escopo): descrição` em pt-BR, `git add` por caminho, sem trailer de procedência de ferramenta (o `commit-msg` do fluxo recusa).
8. **Nenhuma ferramenta é obrigatória no texto do kit.** Claude/Codex/API Claude são o padrão sugerido; usar API (Claude, OpenAI, Gemini) é opcional ([docs/CONECTAR-APIS.md](docs/CONECTAR-APIS.md)). Doc ou regra nova fala em papel (coordenador, implementador, revisor), não em marca.
