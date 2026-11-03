---
name: iniciar-projeto
description: Questionário padrão de início de projeto. Faz as perguntas de docs/QUESTIONARIO-INICIAL.md em blocos curtos (AskUserQuestion) e grava as respostas em BRIEFING.md, que todo agente lê antes de agir. Use ao começar um projeto novo, quando BRIEFING.md não existe ou está cheio de "a confirmar", ou quando pedirem "vamos começar o projeto", "faz o briefing", "me pergunta o que precisa", "kickoff".
---

# iniciar-projeto — questionário de início

Objetivo: dar ao Claude e aos agentes/subagentes um direcionamento completo **antes** de qualquer código ou peça, com o mínimo de idas e vindas com o dono.

## Antes de perguntar
1. Leia `docs/QUESTIONARIO-INICIAL.md` (fonte única das perguntas) e o `BRIEFING.md` atual, se existir.
2. **Não pergunte o que já está escrito**: procure resposta em `BRIEFING.md`, `CLAUDE.md`, `DECISOES.md`, README, site no ar ou arquivos que o dono indicou. Achou? Preencha e cite a fonte entre parênteses.
3. Pule bloco que não se aplica ao tipo de projeto (ex.: sem "ação principal" num sistema interno — troque por "tarefa principal do usuário").

## Como perguntar
- Um bloco por vez, com `AskUserQuestion`: no máximo 4 perguntas por chamada, cada uma com 2–4 opções concretas quando der (o dono sempre pode escrever em "Outro").
- Perguntas abertas (links, hex, textos) vão como opções do tipo "Tenho, vou colar" / "Não tenho ainda" / "Usar padrão do agente": quem escolhe "Outro" escreve a resposta.
- Ordem: 0 Projeto → 1 Negócio e público → 2 Objetivo e medida → 3 Marca → 4 Referências → 5 Restrições e pronto → 6 Conteúdo real → 7 Operação.
- Depois de cada bloco, grave em `BRIEFING.md` na hora (sessão pode cair no meio).
- O dono pode responder "pula" ou "depois": marque **`a confirmar`** e siga.

## Regras de gravação
- **Nada é inventado.** Sem resposta = `a confirmar`. Dedução sua = escreva "(dedução: <de onde>)".
- Use as palavras do dono; não reescreva em tom de marketing.
- Ao fim, liste em **Pendências** só os `a confirmar` que bloqueiam algo, dizendo o que bloqueiam.
- A pergunta 29 (papéis) também se grava em `papeis` do `workflow.config.json` (`coordenador`, `implementador`, `ajudantes`, `revisores`), que é onde hooks e scripts leem. Sem resposta, deixe o padrão sugerido e marque `a confirmar` no BRIEFING. Se o implementador também estiver entre os revisores, avise: a revisão de uma mudança tem de vir de outro.
- Decisão firme que surgir (ex.: "nunca usar foto de banco") também vai para `DECISOES.md` com data.

## Depois do questionário
1. Mostre ao dono um resumo de 5–8 linhas e as pendências bloqueantes.
2. Rode `graphify update .` (o briefing vira nó consultável).
3. Daqui em diante, todo briefing de agente/subagente **cita o bloco do BRIEFING que importa** (ex.: "BRIEFING §3 Marca: cores #111/#E63946, tom próximo") — nunca o arquivo inteiro.
