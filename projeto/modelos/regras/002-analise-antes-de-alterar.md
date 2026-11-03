---
regra: analise-antes-de-alterar
data: 2026-08-31
decidiu: dono
literal: nao
---

# Responda alcance, risco, efeito e prova com evidência antes da primeira edição

## Incidente que a originou
Em 2026-08-31, afirmar que uma rota não existia com base numa busca de escopo estreito gerou uma issue falsa, um plano de seis tarefas e uma implementação inteira duplicando código que já estava pronto em produção.

## Por quê
Ausência ("ninguém mais usa isso", "essa rota não existe") é a afirmação mais cara do projeto: busca com escopo estreito devolve vazio verdadeiro sobre a pergunta errada, indistinguível de ausência real. Além disso, "é uma linha só" é justamente o caso em que ninguém investiga antes de quebrar um contrato.

## Como aplicar
- Antes de qualquer edição (código, gate, regra, parâmetro, variável de ambiente, documentação normativa ou configuração de infraestrutura), responda por escrito e com evidência:
  1. **Alcance**: quem lê, chama, importa ou herda o alvo (saída de `git grep`, não memória).
  2. **Risco**: o que quebra se a hipótese estiver errada e quem sente primeiro.
  3. **Efeito**: o que muda no comportamento observável, não na intenção.
  4. **Prova**: como saber que funcionou e qual gate ou teste cobre.
- Só depois das quatro respostas monte um plano concreto (quais arquivos, em que ordem, o que testar em cada passo e como reverter).
- Mantenha a investigação em modo somente leitura; respondidas as quatro perguntas, execute sem cair em análise infinita e sem perguntar ao dono o que já consta nas fontes escritas.

## Como se prova
Sem gate ainda. Coordenador e revisor recusam plano ou diff que não traga as quatro respostas com evidência verificável.
