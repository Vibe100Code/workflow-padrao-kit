---
regra: onda-de-investigacao-em-arquivo-unico
data: 2026-08-20
decidiu: coordenador
literal: nao
---

# Paralelize a investigação em leitura e serialize a escrita quando várias tarefas convergem no mesmo arquivo

## Incidente que a originou
Em 2026-08-20, 16 gates falharam no meta-gate de mutação; 7 tinham a mesma causa (âncora envelhecida) e exigiam edição no mesmo arquivo (`mutacoes-dos-gates.ts`). Pela regra de ondas paralelas de escrita, 7 tarefas no mesmo arquivo rodariam em série. No mesmo dia, remover marcadores de conflito sem devolver o fechamento `},` fundiu duas entradas (pego apenas pelo compilador TypeScript), e 6 correções colidiram com trabalho idêntico de outra sessão.

## Por quê
A colisão ocorre na escrita, nunca na leitura. Descobrir qual é a causa e o ponto exato de alteração exige ler vários arquivos e testar unicidade de âncoras: trabalho caro, independente entre tarefas e 100% somente leitura.

## Como aplicar
- **Fase 1 (investigar em paralelo)**: despache todos os subagentes de exploração numa única mensagem, em modo estritamente somente leitura.
- **Contrato executável do investigador**: cada subagente deve devolver o trecho literal `de:` atual com contagem de ocorrências conferida (0 ou >=2 ocorrências é falha), o literal `para:`, uma frase explicando por que a mudança reproduz o mecanismo real e a saída honesta *"o invariante não existe mais"* quando aplicável.
- **Fase 2 (aplicar em série)**: o orquestrador reconfere a contagem de ocorrências (pois o arquivo pode ter mudado) e aplica as edições uma a uma no arquivo compartilhado.
- **Cuidados de integração**: nunca inclua em onda ferramentas que mutam arquivos reais no disco durante o teste; ao resolver conflitos em listas/objetos, confira a sintaxe com o compilador; e ao rebasear trabalho que outra sessão já consertou, mantenha o lado já integrado.

## Como se prova
Compilador e suíte de gates rodam após a escrita serial do orquestrador; mutação cuja âncora aparece 0 ou mais de 1 vez falha imediatamente no gate.
