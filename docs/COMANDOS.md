# Comandos

Todos rodam da raiz do projeto (ou de dentro da worktree da tarefa). Se o projeto usa npm, crie atalhos no `package.json`:
```json
"scripts": {
  "sessao": "node scripts/nova-sessao.mjs",
  "tarefa": "node scripts/tarefa.mjs",
  "gates": "node scripts/rodar-gates.mjs",
  "integrar": "node scripts/integrar.mjs",
  "sessoes": "node scripts/sessoes-encerradas.mjs",
  "revisar": "node scripts/revisar-pela-api.mjs"
}
```
e use `npm run sessao -- fix/botao-salvar`, `npm run integrar`, etc.

## Ciclo da tarefa

### `node scripts/nova-sessao.mjs <tipo>/<nome>`
Abre uma worktree só desta sessão em `<worktrees>/<nome>`, na branch `<tipo>/<nome>`, nascida da base atual (do remoto quando ele responde). Liga por symlink os arquivos de `links` (`.env`, `node_modules`) e marca a tarefa como aberta. Roda de dentro de outra worktree sem aninhar. Tipos: `feature fix chore docs refactor perf style`. Imprime o `cd` a fazer.

### `node scripts/tarefa.mjs abrir <tipo>/<nome>` · `estado` · `concluir`
Marca explícita do ciclo em `git config branch.<b>.wfTarefa` (`aberta` / `concluida`). Existe porque "a branch já está na base" não distingue tarefa concluída de tarefa recém-aberta (zero commits). Sem marca = liberado. O hook de edição recusa editar em tarefa `concluida`; o de fim de turno só lembra de integrar tarefa `aberta`. `nova-sessao` e `tarefa abrir` recusam reabrir uma branch `concluida` (use nome novo), e `sessoes-encerradas` nunca remove worktree `aberta`, mesmo já contida na base.

### `node scripts/rodar-gates.mjs`
Roda **todos** os gates de `workflow.config.json` em paralelo (teto = número de núcleos), imprime a saída de cada um em bloco quando termina e reprova no fim com a lista inteira de falhas. Sem bandeira, roda tudo. Saída 0 = todos verdes.

### `node scripts/integrar.mjs`
1. confere árvore limpa;
2. `fetch` da base no remoto;
3. `rebase` sobre ela — **conflito: aborta o rebase e para**, devolvendo para você;
4. roda os gates **sobre o resultado do rebase** (o que sobe é exatamente o que foi validado); se algum ficar vermelho, separa pelo `gates-do-que-mudou`: vermelho **deste** trabalho não sobe, vermelho que já era da base vira aviso;
5. `push` com o selo `WF_VALIDADO_EM=<commit>` (o `pre-push` não repete a mesma régua);
6. push rejeitado (outra sessão integrou antes) → recomeça do passo 2, nunca dos gates antigos;
7. `publicar` do config, se houver.
Depois: `node scripts/tarefa.mjs concluir`.

### `node scripts/sessoes-encerradas.mjs [--remover]`
Lista as worktrees cujo trabalho já está na base (por `git merge-base --is-ancestor` contra a ref de integração, não pela marca). `--remover` remove só essas, com a branch. Worktree com commit não integrado ou árvore suja fica.

## Gates e fila

### `node scripts/na-fila.mjs [--rotulo=nome] -- <comando>`
Carga pesada (gates, build) espera a vez numa fila por máquina e imprime a posição. Ticket com pulso: dono morto libera a vaga. Variáveis: `WF_FILA_DIR`, `WF_FILA_ESPERA_MS`, `WF_FILA_SEM_VIDA_MS`, `WF_SEM_FILA=1` (pula).

### `node scripts/gates-do-que-mudou.mjs`
Usado pelo `pre-push`: roda os gates no seu commit e, para os que falham, confere se já falhavam na base. Bloqueia só o que **este** trabalho quebrou; o que já estava vermelho vira aviso. Reprovar todo mundo por culpa alheia é o que transforma `--no-verify` em rotina.

## Revisão

### `node scripts/revisar-pela-api.mjs --base <ref> -o <saida.md>`
| Opção | Padrão | Para quê |
|---|---|---|
| `--base` | — | diff de `<ref>...HEAD` |
| `--head` | `HEAD` | outra ponta |
| `--modelo` | `claude-sonnet-5-5` | `claude-opus-5-5` em dinheiro, segurança e motor |
| `--foco` | — | classes de defeito a priorizar |
| `--esforco` | — | `low` a `max` |
| `-o` | — | arquivo do parecer (inclui tokens e custo estimado) |

A chave vem **só** do Keychain (`security find-generic-password -a "$USER" -s anthropic-api-key -w`), nunca de argumento ou arquivo, e não é impressa. Pedido em streaming; resposta vazia ou cortada é **falha** (código 1), nunca parecer. Teste sem rede: `REVISOR_API_CHAVE_TESTE` + `REVISOR_API_URL`.

## Agentes
| Comando | Uso |
|---|---|
| `codex exec -s workspace-write -m <modelo> -c model_reasoning_effort=high -C <pasta> "$(cat brief.md)"` | implementar (se o Codex for o implementador, padrão) |
| `agy -p "$(cat brief.md)" --add-dir <pasta> --mode accept-edits --effort high` | opcional: implementar extra / reserva |

## Ferramentas
| Comando | Uso |
|---|---|
| `graphify query "<pergunta>"` | onde fica X, quem chama Y (antes de busca ampla) |
| `graphify path "<A>" "<B>"` · `graphify explain "<nó>"` | ligação entre dois pontos · explicar um nó |
| `graphify update .` | atualiza o mapa (o post-commit já faz) |
| `rtk gain` | economia acumulada do RTK |
| `rtk proxy <cmd>` | saída inteira, sem resumo (para decidir ou provar ausência) |

## Instaladores e testes do kit
| Comando | Uso |
|---|---|
| `maquina/instalar-maquina.sh [--aplicar] [--sem-plugins] [--sem-rede]` | prepara a máquina |
| `projeto/instalar.sh <repo> [--nome X] [--skills base,ui,spec,pesquisa\|todas]` | instala num projeto |
| `projeto/testes/testar-kit.sh` | instalação + hooks (33 checagens) |
| `projeto/testes/testar-fluxo.sh` | sessão → tarefa → gates → integrar → limpeza (17) |
| `projeto/testes/testar-revisor.sh` | revisor pela API sem rede (4) |
