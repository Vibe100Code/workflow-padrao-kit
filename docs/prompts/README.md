# Prompts por objetivo

Prompts prontos para colar no agente, um por objetivo. Troque o que está entre `{{ }}`. Cada um diz quando usar e o que esperar de volta.

| # | Objetivo | Quando |
|---|---|---|
| 01 | [Começar um projeto](01-comecar-projeto.md) | Projeto novo, ou `BRIEFING.md` vazio ou cheio de `a confirmar`. |
| 02 | [Abrir uma tarefa](02-abrir-tarefa.md) | Toda frente que edita arquivo. |
| 03 | [Planejar antes de implementar](03-planejar.md) | Tarefa com mais de um passo, ou que pode rodar em paralelo com outra. |
| 04 | [Mandar a tarefa ao implementador](04-briefar-implementador.md) | Quando quem coordena entrega a execução a outro agente (padrão: Codex). |
| 05 | [Pedir uma revisão independente](05-revisar.md) | Depois de implementar e antes de integrar. |
| 06 | [Provar e integrar](06-provar-e-integrar.md) | Revisão aprovada, críticos e altos corrigidos. |
| 07 | [Depurar um erro](07-depurar.md) | Erro, teste vermelho ou comportamento estranho. |
| 08 | [Passar ou retomar uma tarefa](08-passar-tarefa.md) | Sessão vai acabar, ou outra sessão vai continuar. |
| 09 | [Registrar o que se aprendeu](09-registrar-aprendizado.md) | Problema não trivial resolvido, ou erro que se repetiu. |
| 10 | [Limpar o repositório](10-limpar-o-repositorio.md) | Código morto, TODO velho, dependência sem uso, worktrees acumuladas. |

Os prompts seguem o [briefing padrão de subagente](../../templates/projeto/docs/BRIEF-PADRAO-SUBAGENTE.md): tarefa, caminhos, critério de pronto e formato da resposta, nunca histórico de conversa.
