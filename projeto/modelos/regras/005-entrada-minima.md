---
regra: entrada-minima
data: 2026-10-19
decidiu: dono
literal: sim
---

# Envie a qualquer agente apenas o trecho mínimo que responde à pergunta

## Incidente que a originou
Em 2026-10-19, um modelo de leitura longa usado como agente consumiu ~US$ 214 num único dia (43,8 milhões de tokens de entrada) porque recebia arquivos e páginas inteiras e era retomado com contexto acumulado de 300 a 600 mil tokens por turno.

## Por quê
Enviar arquivos inteiros, capturas de página completa ou histórico de conversa multiplica o custo e degrada a atenção do modelo sem melhorar a resposta. Vale para qualquer agente, por assinatura ou por API.

## Como aplicar
- **Entrada mínima para qualquer agente ou subagente**:
  - envie diff ou trecho relevante, nunca o arquivo, a pasta ou o log inteiro;
  - passe o caminho do arquivo quando o agente puder ler sozinho;
  - envie capturas em JPG com 1440 px de largura, recortadas na seção em questão (nunca página inteira), no máximo 12 por chamada;
  - nunca inclua transcrição ou histórico de sessão como entrada.
- **Briefing enxuto**: passe apenas tarefa, caminhos, critério de pronto e formato da resposta (máximo de 15 linhas).
- **Sem retomada de contexto gigante**: nunca retome agente que já acumulou 300 a 600 mil tokens para uma tarefa nova; abra agente novo com briefing curto.
- **Estimativa prévia**: antes de chamada grande, meça caracteres e imagens; se passar do que a pergunta precisa, divida a pergunta ou reduza a entrada.
- **Modelo de leitura longa não implementa como agente**: ele lê trecho e responde.

## Como se prova
Sem gate automático. Quem coordena recusa briefing que cole arquivo inteiro, log inteiro ou histórico, e confere o tamanho antes de chamada grande.
