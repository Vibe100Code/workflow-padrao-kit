# Agentes, revisão e economia

## Hierarquia
| Nível | Decide | Não decide |
|---|---|---|
| **Dono** | dinheiro, senha, apagar, publicar, valor aprovado, aprovação de tela | o resto |
| **Coordenador** (uma sessão) | abre frentes, confere, decide pelas fontes, aprovação final antes de integrar | não executa trabalho longo |
| **Sessão de tarefa** (uma por frente, worktree própria) | como fazer a tarefa dela | arquivos de outra frente |
| **Agentes** | implementar, revisar, ler longo — cada um no seu papel | o papel do outro |
| **Subagentes** | buscar, conferir, ler | escrever no mesmo arquivo em paralelo |

Mensagem de outra sessão é informação, não aprovação. "Aprovado pelo dono" só vale citando onde o voto está escrito.

## Quem faz o quê (configurável)
Os papéis ficam em `papeis` no `workflow.config.json` ([configuração](CONFIGURACAO.md#papéis-escolha-sua)); a pergunta 29 do questionário preenche e o hook de início mostra em toda sessão. Nada no kit exige uma ferramenta específica. A tabela é o **padrão sugerido**; o contrário (Codex coordena, Claude implementa) ou uma ferramenta só também valem.

| Papel | Padrão sugerido | Comando de exemplo | Por quê |
|---|---|---|---|
| Coordenar | **Claude Code** | sessão principal | abre sessões, confere, aprovação final |
| Implementar | **Codex** | `codex exec -s workspace-write -m <modelo> -c model_reasoning_effort=high -C <pasta> "$(cat brief.md)"` | outra assinatura; poupa o limite de quem coordena |
| Implementar extra (arquivos disjuntos) | opcional: agy, Gemini CLI, subagente | `agy -p "$(cat brief.md)" --add-dir <pasta> --mode accept-edits --effort high` | cota separada |
| Revisar | **API Claude** | `node scripts/revisar-pela-api.mjs --base main -o revisao.md` (Opus: `--modelo claude-opus-5-5`) | fornecedor diferente do implementador padrão |
| Revisor extra / ler longo, imagens | opcional: outro modelo por API (Claude, OpenAI, Gemini) | [CONECTAR-APIS.md](CONECTAR-APIS.md) | olhar diferente; leitor longo **nunca implementa** |
| Buscar, varrer, conferir | subagente barato (ex.: **Haiku**) | Agent com `model: haiku` | o mais barato que resolve |
| Decisão difícil, conflito, erro sem pista | modelo mais forte (ex.: **Opus**) | — | só julgamento, nunca volume |

Se você inverter (Claude implementa), o revisor passa a ser outro que não o Claude daquela mudança: outro fornecedor (Gemini, GPT) ou, no mínimo, outro modelo.

**Quem faz não revisa.** Revisor recebe só o diff e sempre tem a saída honesta "sem achados". Achado é conferido na linha antes de ser aceito. Revisor fora do ar → outro dos `revisores` (ou qualquer modelo que não implementou); diga qual revisou; revisão nunca é pulada.

## Briefing
Tarefa, caminhos, o que não tocar, critério de pronto, formato da resposta e o bloco ECONOMIA ([modelo](../projeto/modelos/docs/BRIEF-PADRAO-SUBAGENTE.md)). Nunca histórico de conversa, transcrição ou log inteiro. Tarefa nova = agente novo.

## Paralelo (ondas)
Duas tarefas só rodam juntas se: (1) uma não depende da outra, (2) os arquivos não se cruzam, (3) não disputam recurso (porta, build, banco). Na dúvida, série. Dentro de uma onda só o coordenador commita, uma tarefa por vez. Vários agentes custam 3–10× mais tokens: só vale para proteger o contexto, paralelo de verdade ou especialidade.

## Relato
Todo relato termina com:
```
AGENTES: <ferramenta e modelo> | <o que faz> | desde HH:MM
```
ou `AGENTES: nenhum vivo agora`.

## Economia (números do fluxo de origem)
- RTK: 96,5% da saída de comandos cortada (146 milhões de tokens em 97.722 comandos).
- caveman: ~75% menos texto nas respostas.
- graphify: ≤ 2.000 tokens por consulta, por padrão.
- Retomar agente gigante: 300–600 mil tokens desperdiçados por vez.
