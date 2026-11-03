# Configuração

## `workflow.config.json` (raiz do projeto)
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
  "links": [".env", "node_modules"],
  "papeis": {
    "coordenador": { "ferramenta": "Claude Code" },
    "implementador": { "ferramenta": "Codex", "cmd": "codex exec -s workspace-write -C <pasta> \"$(cat brief.md)\"" },
    "ajudantes": [{ "ferramenta": "subagentes do Claude", "uso": "buscar, varrer, conferir" }],
    "revisores": [{ "ferramenta": "API Claude", "cmd": "node scripts/revisar-pela-api.mjs --base main -o revisao.md" }]
  }
}
```
| Campo | Lido por | Observação |
|---|---|---|
| `base` | todos os scripts e githooks | nada é commitado nela direto |
| `remoto` | nova-sessao, integrar, sessoes-encerradas | sem resposta do remoto, usa a base local |
| `gates` | rodar-gates, integrar, pre-push | cada `cmd` roda num shell na raiz; saída ≠ 0 reprova. Exemplos: `npm run lint`, `pytest -q`, `swift test`, `node scripts/testar-x.mjs` |
| `publicar` | integrar | comando depois do push (ex.: `npx vercel deploy --prod`); `null` = não publica |
| `worktrees` | nova-sessao, sessoes-encerradas | já vai no `.gitignore` |
| `links` | nova-sessao | arquivos ignorados que cada worktree recebe por symlink |
| `papeis` | hook de início, skill `iniciar-projeto`, você e os agentes | **quem faz o quê neste projeto** (lugar único). Os valores acima são só o padrão sugerido |

### Papéis: escolha sua
Cada papel aceita qualquer ferramenta. Exemplos:

| Combinação | coordenador | implementador | revisores |
|---|---|---|---|
| padrão sugerido | Claude Code | Codex | API Claude |
| o contrário | Codex | Claude Code (`claude -p`) | outro modelo (ex.: API Claude com outro modelo, Gemini, GPT) |
| uma ferramenta só | Claude Code | Claude Code | agente `revisor` (mesma IA, contexto limpo) |
| com segundo revisor por API | Claude Code | Codex | API Claude, Gemini API ([conectar](CONECTAR-APIS.md)) |

O hook de início mostra os papéis em toda sessão e lembra, quando o implementador também está entre os revisores, que a revisão precisa ser em contexto limpo: **quem construiu não revisa o próprio trabalho na mesma conversa** é a única parte fixa ([agente revisor](AGENTE-REVISOR.md)). `cmd` é opcional e serve de lembrete do comando; nenhum script do kit chama a ferramenta pelo nome.

**Gate novo nasce provado:** antes de entrar na lista, injete o defeito que ele deve pegar e confirme que ele reprova.

## Arquivos que você edita
| Arquivo | O que pôr |
|---|---|
| `BRIEFING.md` | respostas do questionário (skill `iniciar-projeto`) |
| `CLAUDE.md` | o que é, como rodar, erros proibidos (curto) |
| `DECISOES.md` | votos do dono com data |
| `regras/NNN-*.md` | regra nova a partir de incidente real (`_MODELO.md`) |
| `.claude/regras-de-inicio.md` | o resumo injetado em toda sessão (≤ 1,5 KB) |
| `.claude/hooks/wf-sugere-skill.cjs` | `REGRAS`: palavra-chave → skill |

## Variáveis de ambiente
| Variável | Efeito |
|---|---|
| `WF_SEM_TRAVA=1` | desliga a trava de edição na base (sessão consciente) |
| `WF_SEM_GRAFO=1` | desliga a exigência de `graphify query` |
| `WF_GRAFO_CACHE` | pasta das marcas por sessão do hook do grafo |
| `WF_SEM_FILA=1` · `WF_FILA_DIR` · `WF_FILA_ESPERA_MS` · `WF_FILA_SEM_VIDA_MS` | fila de carga pesada |
| `COORD_DIR` | pasta do coordenador (padrão `~/.coord`) |
| `REVISOR_API_CHAVE_TESTE` · `REVISOR_API_URL` | testar o revisor sem rede |

## Segredos
- Chave da API Anthropic: só no Keychain (`security add-generic-password -a "$USER" -s anthropic-api-key -w`). Nunca em `.env` versionado, argumento ou log.
- O kit não lê, grava nem imprime credencial nenhuma.

## Ajustar ao tipo de projeto
| Projeto | Grupos de skills | Gates típicos |
|---|---|---|
| LP / site | `base,ui` | build, lint, links quebrados, Lighthouse |
| app web | `base,ui,spec` | tipos, testes, e2e |
| app iOS | `base,ui,spec` | `swift build`, `swift test`, design system |
| sistema / API | `base,spec` | tipos, testes, segurança |
| conteúdo / pesquisa | `base,pesquisa` | conferência de fonte |
