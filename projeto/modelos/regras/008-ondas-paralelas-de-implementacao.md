---
regra: ondas-paralelas-de-implementacao
data: 2026-08-22
decidiu: dono
literal: nao
---

# Despache implementadores em paralelo apenas com arquivos, recursos e dependências disjuntos, commitando pelo orquestrador

## Incidente que a originou
Consolidado em agosto de 2026 (com ajuste do dono em 2026-08-22 para agentes isolados): quando dois agentes editam o mesmo arquivo em paralelo, a escrita de um apaga a do outro em silêncio; quando dois agentes rodam `git commit` ao mesmo tempo, misturam mudanças não relacionadas ou commitam contra um `HEAD` defasado.

## Por quê
O paralelismo só é seguro quando a colisão de arquivo, a colisão de recurso compartilhado (porta, banco, pasta de build) e a corrida de commit são eliminadas por mecanismo antes do despacho, nunca por disciplina do subagente.

## Como aplicar
- **Marque cada tarefa no plano com três campos**:
  1. `Files`: caminhos ou globs exatos criados ou modificados.
  2. `Resources`: portas, pastas de build, bancos ou filas usados pela tarefa/teste e como são isolados (ou `none`).
  3. `Depends-on`: IDs das tarefas das quais ela depende (ou `none`). Se faltar qualquer campo ou houver dúvida sobre o escopo, defina `Depends-on: todas as anteriores` (degrada para serial).
- **Forme a onda**: duas tarefas só entram na mesma onda se (1) nenhuma depende da outra nem transitivamente, (2) os conjuntos de `Files` são totalmente disjuntos e (3) os `Resources` são independentes ou isolados. Se duas tarefas precisarem tocar o mesmo arquivo em paralelo, isole cada uma em sua própria worktree.
- **Quem commita (decisão de 2026-08-22)**:
  - Agente despachado **sozinho** numa tarefa conserta e commita (não há corrida).
  - Agentes despachados **em onda paralela** não commitam (o briefing deve avisar por extenso: *"você está numa onda, não commite"*). Eles deixam a mudança na árvore; o orquestrador commita tarefa por tarefa após a onda terminar, lendo o `HEAD` atualizado a cada commit, e faz um único registro de progresso por onda.
- **Falha no meio da onda**: antes de assumir ou redistribuir arquivos de um agente que falhou, confirme que o processo dele realmente parou; depois inspecione o diff parcial.

## Como se prova
Sem gate automático de formação de onda; o coordenador confere `Files`, `Resources` e `Depends-on` no plano antes do despacho e audita o histórico de commits por tarefa antes de integrar.
