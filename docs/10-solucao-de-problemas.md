# Solução de problemas

## Hooks
| Sintoma | Causa | Ação |
|---|---|---|
| hook não roda | projeto ainda não confiado, ou sessão aberta antes da instalação | reabra o Claude Code na pasta; confira `.claude/settings.json` tem `wf-` 5 vezes |
| "Você está na `main`" ao editar | sessão no diretório principal | `node scripts/nova-sessao.mjs <tipo>/<nome>` e edite os arquivos dentro da worktree (caminho absoluto serve) |
| "tarefa já CONCLUÍDA" | branch marcada `concluida` | abra tarefa nova; não empilhe trabalho em tarefa integrada |
| busca negada pedindo graphify | 1ª busca ampla da sessão | `graphify query "<o que procura>"`; grafo quebrado → `WF_SEM_GRAFO=1` (o hook também libera sozinho após 3 negações) |
| sugestão de skill aparecendo demais | palavra-chave fraca em `REGRAS` | ajuste o regex em `wf-sugere-skill.cjs` |
| `pkill -f` bloqueado | hook global | `pgrep -fl <padrão>`, confira com `ps`, `kill <PID>` |

## Git e integração
| Sintoma | Causa | Ação |
|---|---|---|
| commit recusado: procedência de ferramenta | trailer `Co-Authored-By` / link de sessão | tire da mensagem |
| commit recusado na base | `pre-commit` | commit na worktree da tarefa; commit inicial de repositório novo: `git commit --no-verify` uma vez |
| árvore suja depois de todo commit | `graphify-out/` versionado | `.gitignore` com `graphify-out/` e `git rm -r --cached graphify-out` |
| `integrar` parou em conflito | duas mudanças válidas no mesmo trecho | resolva à mão olhando o que foi aprovado; rode `integrar` de novo (os gates rodam sobre o resultado) |
| `integrar` em loop de rejeição | base andando rápido | normal: cada volta refaz fetch e gates; não force push |
| muitas worktrees | ninguém removeu | `node scripts/sessoes-encerradas.mjs --remover` (só remove o que já está na base) |
| pre-push lento | gates inteiros | ele roda só o que mudou e pula se o `integrar` já validou o mesmo commit |

## Agentes
| Sintoma | Ação |
|---|---|
| implementador sem cota (ex.: Codex "usage limit") | troque o `implementador` em `papeis` ou use um ajudante em arquivos disjuntos; volte quando a cota voltar |
| revisor pela API sem resposta | confira a chave no Keychain (`security find-generic-password -s anthropic-api-key`); sem crédito → outro dos `revisores` e diga qual revisou |
| subagente gastando demais | briefing com bloco ECONOMIA; tarefa nova = agente novo; modelo explícito (Haiku para busca) |
