# Hooks

Regra que depende de alguém lembrar falha; por isso vira hook. Hook bom **falha aberto** (erro do próprio hook libera), **roda rápido** (medido ~50 ms) e **fica mudo** quando não se aplica — aviso que aparece sempre ensina a ignorar aviso de verdade.

## Do projeto (`.claude/hooks/`, ligados em `.claude/settings.json`)
| Hook | Evento | Faz | Escape |
|---|---|---|---|
| `wf-inicio.cjs` | SessionStart | injeta `.claude/regras-de-inicio.md` (~1 KB, corta em 1,5 KB); avisa diretório principal com várias worktrees; avisa árvore atrás da `origin/main` | edite o `.md` |
| `wf-exige-worktree.cjs` | PreToolUse Edit/Write | nega edição na base, em HEAD solto e em tarefa já concluída; arquivo fora do repo e repositório ainda sem commit (Dia 1) liberam | `WF_SEM_TRAVA=1` |
| `wf-exige-grafo.cjs` | PreToolUse Grep/Glob/Bash | nega a 1ª busca ampla da sessão até um `graphify query`; libera após 3 negações seguidas ou sem `graphify-out/` | `WF_SEM_GRAFO=1` |
| `wf-sugere-skill.cjs` | UserPromptSubmit | até 2 skills por palavra-chave forte; mudo se nada casa | edite `REGRAS` no arquivo |
| `wf-fim.cjs` | Stop | tarefa aberta + árvore limpa + commits fora da base → lembra de integrar; **nunca bloqueia** (faria laço) | — |

## Do git (`githooks/`, `core.hooksPath githooks`)
| Hook | Faz |
|---|---|
| `commit-msg` | recusa trailer de procedência de ferramenta (Co-Authored-By, link de sessão) |
| `pre-commit` | recusa commit na base / no diretório principal com worktrees |
| `pre-push` | roda os gates do que mudou, pela fila; bloqueia só o que **este** trabalho quebrou; pula se o `integrar` já validou o mesmo commit |
| `post-commit` / `post-checkout` | repassam para o hook de mesmo nome em `.git/hooks` (onde o `graphify hook install` grava): com `core.hooksPath` o git deixaria de rodá-lo. Nunca bloqueiam |
| `post-commit` (graphify) | atualiza o mapa do código em segundo plano |

Caso legítimo: `git commit --no-verify` / `git push --no-verify` — e diga por quê no relato.

## Da máquina (`~/.claude/hooks/`, ligados em `~/.claude/settings.json`)
| Hook | Evento | Faz |
|---|---|---|
| `rtk hook claude` | PreToolUse Bash | reescreve `git status` → `rtk git status` etc.; saída resumida. `rtk proxy <cmd>` quando precisar inteira |
| `bloqueia-pkill-f.sh` | PreToolUse Bash | bloqueia `pkill -f`/`killall -f` (17/10: derrubou um agente porque o texto aparecia nas regras dele). Use `kill <PID>` |
| `pedidos-do-dono.py` | UserPromptSubmit | grava todo pedido em `~/.coord/PEDIDOS-DO-DONO.jsonl`; lembra as fontes de decisão no 1º pedido da sessão |

## Testar um hook à mão
```bash
echo '{"tool_name":"Edit","tool_input":{"file_path":"'$PWD'/x.md"},"cwd":"'$PWD'"}' | node .claude/hooks/wf-exige-worktree.cjs
```
Saída vazia = liberado; `"permissionDecision":"deny"` = negado.
