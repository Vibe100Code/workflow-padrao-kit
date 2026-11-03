---
regra: continuidade-e-passagem-de-tarefa
data: 2026-10-17
decidiu: coordenador
literal: nao
---

# Conclua tudo que não estiver bloqueado e trate passagem de tarefa como contexto, não prova

## Incidente que a originou
Conferido e consolidado em 2026-10-17 a partir de falhas recorrentes de orquestração: sessões paravam a execução inteira ao receber uma simples pergunta de status, repetiam tentativas cegas sem causa nova ou confiavam em resumos de sessão anterior sem checar o estado real do Git e dos processos.

## Por quê
Pergunta informativa não é ordem de parada; parar tudo no primeiro bloqueio desperdiça o trabalho independente que já estava autorizado; e um resumo de passagem (handoff) envelhece assim que outro processo toca na árvore ou nos recursos compartilhados.

## Como aplicar
- **Pergunta de status não cancela tarefa ativa**: responda curto e continue o que falta; só pare ou mude de rumo com pedido explícito de pausa, cancelamento ou troca de objetivo.
- **Bloqueio parcial**: isole o que depende da ação bloqueada e conclua tudo que for independente, seguro e autorizado, sem contornar gates nem negativas.
- **Retentativa só com evidência nova**: só tente de novo após achar a causa ou consertar a dependência, respeitando tetos de tempo, tentativa e custo.
- **Segundo plano verificável**: só diga que algo "continua rodando" se houver processo, agente ou automação inspecionável vivo.
- **Passagem de tarefa (handoff)**: ao deixar trabalho inacabado para outra sessão, registre no arquivo oficial da tarefa (sem criar documento concorrente e sem colar segredos ou logs inteiros): objetivo/aceite, estado conferido (`branch`, distância para `origin/main`, mudanças locais), feito, evidência com comandos e hora, o que falta, bloqueios, recursos vivos (portas, processos, builds) e contexto a rever.
- **Ao retomar um handoff**: reconfira arquivos, estado do Git, checagens e processos vivos antes de editar.

## Como se prova
Sem gate ainda. O coordenador confere o estado real do repositório (`git status`, `git rev-list`, processos vivos) antes de despachar ou aceitar retomada.
