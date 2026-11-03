# CLAUDE.md — direção padrão para o Claude neste kit

> Você (Claude, ou qualquer agente) foi aberto dentro do **kit do workflow padrão**. Este arquivo diz o que fazer quando alguém pedir para instalar, usar, atualizar ou explicar o kit. Idioma: pt-BR.

## O que este repositório é
Um kit que aplica a qualquer projeto o fluxo de trabalho com IA usado em produção (dono → coordenador → sessões de tarefa → agentes). Organização:
- `templates/` — o que vai para fora: `projeto/` (arquivos-base do repositório), `claude-hooks/`, `scripts-do-fluxo/`, `githooks/` e `maquina/` (regras e hooks globais).
- `scripts/` — o que roda aqui: os dois instaladores, `validar-links.mjs` e `testes/`.
- `skills/` — cópias com licença de origem, por grupo.
- `docs/` — numerado por jornada (00 a 11), mais `prompts/` e `tools/`, cada um com índice.
Leia o [README](README.md) para o mapa completo.

## Pedidos comuns → o que fazer

| Pedido | Faça |
|---|---|
| "instala o kit nesta máquina" | `scripts/instalar-maquina.sh` (só verifica) → mostre o que falta → com OK do dono, `--aplicar`. Nunca instale nada pago nem faça login por ele. |
| "instala o kit no projeto X" | confirme que X é repositório git e que o dono pediu **esse** projeto. Rode `scripts/instalar-projeto.sh <X> --nome "<Nome>" --skills <grupos>`. Mostre a saída. Não faça commit no projeto sem pedido. |
| "quais skills uso para Y?" | [docs/tools/README.md](docs/tools/README.md). |
| "como funciona o fluxo / o que faço agora?" | [docs/04-fluxo-de-uma-tarefa.md](docs/04-fluxo-de-uma-tarefa.md) e [docs/05-comandos.md](docs/05-comandos.md). |
| "um hook está atrapalhando" | [docs/06-hooks.md](docs/06-hooks.md) → seção de escape. Não desligue hook sem dizer qual e por quê. |
| "atualiza uma skill" | troque a cópia em `skills/<grupo>/<nome>/` pela versão da origem (link no catálogo), rode `scripts/testes/testar-kit.sh`, commit. |
| "quero outra ferramenta coordenando / implementando / revisando" | edite `papeis` no `workflow.config.json` do projeto ([CONFIGURACAO](docs/03-configuracao.md#papéis-escolha-sua)). Nenhuma ferramenta é obrigatória; se o implementador também revisa, a revisão tem de ser em contexto limpo ([agente revisor](docs/08-agente-revisor.md)). |
| "prova que funciona" | `scripts/testes/testar-kit.sh`, `testar-fluxo.sh`, `testar-revisor.sh` e `node scripts/validar-links.mjs`; cole a saída. |

## Regras para mexer neste kit
1. **Nada de produto.** Nome de app, cliente, tela, servidor ou conta não entra. Exemplo concreto vira `{{placeholder}}`.
2. **Todo hook falha aberto, roda em < 0,5 s e fica mudo quando não se aplica.** Hook que trava sessão ou fala sempre é removido.
3. **Toda regra em `templates/projeto/regras/` tem data, quem decidiu e o incidente.** Sem incidente real, não é regra; é sugestão no README.
4. **Instaladores nunca sobrescrevem arquivo do usuário** e fazem backup antes de mesclar `settings.json`.
5. **Mudou hook, script, instalador ou doc → rode os testes e o validador de links** (`scripts/testes/testar-*.sh`, `node scripts/validar-links.mjs`) e cole o resultado antes de dizer "pronto". O CI roda os mesmos em todo push e PR.
9. **Doc nova entra na jornada:** numerada em `docs/`, ou em `docs/prompts/` / `docs/tools/` com linha no índice daquela pasta e no README.
6. **Literais do fluxo continuam literais aqui:** dinheiro, senha, segredo, apagar, publicar/integrar, segurança. Pergunte antes.
7. Commit `tipo(escopo): descrição` em pt-BR, `git add` por caminho, sem trailer de procedência de ferramenta (o `commit-msg` do fluxo recusa).
8. **Nenhuma ferramenta é obrigatória no texto do kit.** Claude/Codex/API Claude são o padrão sugerido; usar API (Claude, OpenAI, Gemini) é opcional ([docs/09-conectar-apis.md](docs/09-conectar-apis.md)). Doc ou regra nova fala em papel (coordenador, implementador, revisor), não em marca.
