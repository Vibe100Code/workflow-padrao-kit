# 02 · Questionário inicial

Antes da primeira tarefa, o agente precisa saber para quem, para quê e com quais limites. Sem isso ele chuta público, marca e objetivo.

Projeto novo começa com a skill **`iniciar-projeto`**: o Claude faz, em blocos curtos (`AskUserQuestion`, até 4 perguntas por vez, com opções prontas), as 29 perguntas de [`docs/QUESTIONARIO-INICIAL.md`](../templates/projeto/docs/QUESTIONARIO-INICIAL.md) e grava as respostas em `BRIEFING.md`:

| Bloco | Pergunta sobre |
|---|---|
| 0 · Projeto | tipo, o que já existe, stack obrigatória |
| 1 · Negócio e público | oferta, para quem, dor, diferencial com prova |
| 2 · Objetivo e medida | ação principal, métrica e meta, ação secundária |
| 3 · Marca | cores, fontes, tom e palavras proibidas, logo, o que falta |
| 4 · Referências | o que gosta (com links) e o que não quer |
| 5 · Restrições e pronto | prazo, critério de pronto, o que nunca fazer, orçamento pago |
| 6 · Conteúdo real | textos, fotos/vídeos (banco ou IA?), provas e depoimentos, contatos |
| 7 · Operação | quem aprova e como, onde publica e quem tem acesso, observações, **papéis** (quem coordena, implementa e revisa) |

Regras: não pergunta o que já está escrito (procura antes e cita a fonte); sem resposta = **`a confirmar`**, nada é inventado; grava bloco a bloco. O `CLAUDE.md` manda ler o `BRIEFING.md` antes de agir, o hook de início avisa enquanto ele estiver vazio, e todo briefing de subagente cita **só o bloco que importa** (ex.: "BRIEFING §3 Marca: …").

## Papéis
A pergunta 29 define quem coordena, quem implementa e quem revisa. A resposta vai para `papeis` no `workflow.config.json` ([03 · Configuração](03-configuracao.md#papéis-escolha-sua)) e o hook de início mostra em toda sessão.

Perguntas completas: [`templates/projeto/docs/QUESTIONARIO-INICIAL.md`](../templates/projeto/docs/QUESTIONARIO-INICIAL.md) · skill: [`iniciar-projeto`](../skills/projeto-base/iniciar-projeto/SKILL.md).
