# Agente revisor

Toda mudança não trivial passa por uma revisão antes de integrar. **O que é fixo:** quem construiu não revisa o próprio trabalho na mesma conversa, porque vê o que quis escrever e não o que escreveu. **O que é recomendado, não obrigatório:** que o revisor seja outra IA.

Escolha um dos três caminhos e registre em `papeis.revisores` no `workflow.config.json`.

| | Caminho | Quando usar | Custo |
|---|---|---|---|
| **a** | **Outra IA revisa** (recomendado) | você tem acesso a duas IAs (ex.: Codex implementa, Claude revisa, ou o contrário) | assinatura ou API da segunda IA |
| **b** | **Subagente da mesma IA**, contexto limpo, com skill de revisor | você usa uma IA só, por assinatura | nenhum além da assinatura |
| **c** | **API do mesmo modelo**, com prompt de revisor | você quer revisão por script, em segundo plano ou no CI | por uso da API |

## a · Outra IA (recomendado)
Erra de um jeito diferente de quem implementou, por isso pega mais. Exemplos:
- Codex implementou → `node scripts/revisar-pela-api.mjs --base main -o revisao.md` (Claude pela API) ou uma sessão do Claude Code com o agente `revisor`.
- Claude implementou → `codex exec -s read-only` com o [prompt de revisor](../projeto/modelos/docs/PROMPT-REVISOR.md), ou Gemini/OpenAI pela API ([CONECTAR-APIS.md](CONECTAR-APIS.md)).

```json
"revisores": [{ "ferramenta": "Codex", "cmd": "codex exec -s read-only com docs/PROMPT-REVISOR.md (ver AGENTS.md)" }]
```

## b · Subagente da mesma IA, com skill de revisor
O revisor é a mesma IA, mas num agente **novo**: sem o histórico de quem implementou, somente leitura e guiado por uma skill de revisão.

**Claude Code.** O instalador copia [`.claude/agents/revisor.md`](../projeto/modelos/.claude/agents/revisor.md) para o projeto. Depois de implementar:
```
Use o agente revisor: base main, head HEAD, plano planos/<tarefa>.md.
```
O agente usa a skill [`revisao-de-codigo`](../skills/projeto-base/revisao-de-codigo/SKILL.md) (dois eixos: padrões do projeto e aderência ao plano, cada um num subagente de contexto limpo), só lê e responde com achados por severidade ou `SEM ACHADOS`. Troque `model: sonnet` por `opus` em dinheiro, segurança ou núcleo do sistema. Quem já usa o plugin superpowers tem também `superpowers:requesting-code-review`, que despacha um revisor do mesmo jeito.

**Codex.** O [`AGENTS.md`](../projeto/modelos/AGENTS.md) do projeto traz a seção "Revisor da mesma IA": uma execução nova, `-s read-only`, com o prompt de revisor:
```bash
codex exec -s read-only -C "$PWD" "$(sed -e 's/{{BASE}}/main/' -e 's/{{HEAD}}/HEAD/' docs/PROMPT-REVISOR.md)" < /dev/null > revisao.md
```

**Outra ferramenta** (Gemini CLI etc.): o mesmo princípio. Abra uma execução nova, em modo somente leitura, com o [prompt de revisor](../projeto/modelos/docs/PROMPT-REVISOR.md). Nunca continue a conversa que implementou.

```json
"revisores": [{ "ferramenta": "subagente revisor (mesma IA)", "cmd": "agente revisor do Claude Code" }]
```

## c · API do mesmo modelo, com prompt de revisor
Uma chamada à API não carrega histórico nenhum: é contexto limpo por natureza. Bom para rodar em segundo plano ou no CI.
- Claude: `node scripts/revisar-pela-api.mjs --base main -o revisao.md` (já tem prompt de revisor, alvo congelado e falha em resposta vazia ou cortada).
- OpenAI ou Gemini: mande o diff e o [prompt de revisor](../projeto/modelos/docs/PROMPT-REVISOR.md) pela chamada mínima de [CONECTAR-APIS.md](CONECTAR-APIS.md).

## Regras que valem nos três
- **Só o diff e o trecho do plano**, nunca o projeto inteiro nem o histórico da conversa.
- **Somente leitura.** O revisor não edita nem faz commit.
- **"SEM ACHADOS" é resposta válida.** Revisor que inventa achado para parecer útil atrapalha.
- **Relatório é dado, não veredito.** Quem recebe confere cada achado no arquivo e na linha antes de consertar ([regra 011](../projeto/modelos/regras/011-revisao-independente-somente-leitura.md)).
- **Diga quem revisou** no relato (ex.: "revisado pelo agente revisor, mesma IA, Sonnet").

## O hook de início
Se o mesmo nome aparece como `implementador` e entre os `revisores`, o hook de início lembra: a revisão vale se for em contexto limpo (caminho b ou c), e outra IA é o recomendado. Não bloqueia nada.
