# Índice de Regras do Kit

- `001-dado-vence-opiniao.md` — Decida por decisão escrita ou medição; sem as duas, meça.
- `002-analise-antes-de-alterar.md` — Responda alcance, risco, efeito e prova com evidência antes da primeira edição.
- `003-continuidade-e-passagem-de-tarefa.md` — Conclua tudo que não estiver bloqueado e trate passagem de tarefa como contexto, não prova.
- `004-saida-comprimida-nao-prova-ausencia.md` — Nunca use saída de terminal resumida para provar ausência ou avaliar resultado de gate.
- `005-entrada-minima.md` — Envie a qualquer agente apenas o trecho mínimo que responde à pergunta.
- `006-hierarquia-e-isolamento-de-sessoes.md` — Isole cada frente em sessão e worktree próprias sob uma única sessão coordenadora.
- `007-regra-se-le-pelo-porque.md` — Leia regras de processo pelo porquê, exceto na lista fechada de regras literais.
- `008-ondas-paralelas-de-implementacao.md` — Despache implementadores em paralelo apenas com arquivos, recursos e dependências disjuntos, commitando pelo orquestrador.
- `009-onda-de-investigacao-em-arquivo-unico.md` — Paralelize a investigação em leitura e serialize a escrita quando várias tarefas convergem no mesmo arquivo.
- `010-prova-pelo-caminho-do-usuario.md` — Prove toda mudança visível pelo caminho real do usuário a frio no mesmo build de publicação.
- `011-revisao-independente-somente-leitura.md` — Audite mudanças não triviais com revisor de outro modelo em modo somente leitura e verifique cada achado no código.
- `012-roteamento-de-especialistas-e-camada-de-modelo.md` — Só despache subagentes quando o ganho pagar o custo de 3 a 10x, com camada de modelo explícita e catálogo verificado em disco.
- `013-design-system-obrigatorio-e-divida-decrescente.md` — Proíba valores visuais crus fora do tema central, congele a dívida para só encolher e exija aprovação de tela.

Origem de cada regra e o que ficou de fora: `docs/ORIGEM-DAS-REGRAS.md` no repositório do kit.
