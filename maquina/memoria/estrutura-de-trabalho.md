---
name: estrutura-de-trabalho
description: Como toda sessão trabalha (dono → coordenador → sessão de tarefa → agentes); quem implementa, quem revisa, economia de tokens
metadata:
  type: feedback
---

Dono decide dinheiro, senha, apagar, publicar e tela; coordenador só orquestra e dá a aprovação final; cada frente é uma sessão com worktree própria; quem implementa e quem revisa fica em `papeis` no workflow.config.json de cada projeto (padrão sugerido: Codex implementa, API Claude revisa; o contrário ou uma ferramenta só também valem); quem construiu não revisa o próprio trabalho na mesma conversa (outra IA recomendada; agente revisor da mesma IA em contexto limpo vale); subagente Claude com modelo explícito.

**Why:** decisão do dono em 2026-10-26, depois de agentes caros implementando e revisando o próprio trabalho.
**How to apply:** toda sessão nova lê isto; todo relato termina com `AGENTES: ferramenta e modelo | o que faz | desde HH:MM`.
