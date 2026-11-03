---
regra: saida-comprimida-nao-prova-ausencia
data: 2026-10-17
decidiu: coordenador
literal: nao
---

# Nunca use saída de terminal resumida para provar ausência ou avaliar resultado de gate

## Incidente que a originou
Em 2026-10-17, ao instalar o proxy de compressão de saída de comandos (`rtk hook`) para economizar tokens em chamadas de `git`, `ls`, `rg`, `grep` e `find`, verificou-se que a filtragem omite linhas intermediárias e avisos que alteram o diagnóstico de testes e compiladores.

## Por quê
Saída de gate, compilador e teste é evidência; dado cortado é dado diferente. Uma saída resumida pode esconder justamente o aviso ou a linha que invalida uma hipótese de ausência.

## Como aplicar
- Mantenha comandos de leitura literal, compilação, construção e execução de gates/testes (`cat`, compiladores, executores de pacotes e suítes de teste) fora da reescrita automática de compressão.
- Se uma decisão depender de confirmar ausência, ler um aviso específico ou inspecionar uma linha exata em comando comprimido, repita a execução forçando a saída bruta sem corte antes de decidir.
- Não adicione prefixo manual de compressão em comandos que já passam pelo hook nem trate a métrica de compressão de saída como economia total da sessão.

## Como se prova
Configuração do hook de compressão exclui compiladores e executores de teste; revisores exigem saída bruta quando a prova depende de ausência.
