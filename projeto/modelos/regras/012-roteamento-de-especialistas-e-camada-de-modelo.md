---
regra: roteamento-de-especialistas-e-camada-de-modelo
data: 2026-08-20
decidiu: coordenador
literal: nao
---

# Só despache subagentes quando o ganho pagar o custo de 3 a 10x, com camada de modelo explícita e catálogo verificado em disco

## Incidente que a originou
Medição da Anthropic (jan/2026) mostrou que multiagente consome de 3 a 10x mais tokens que um único agente na mesma tarefa. No repositório, três incidentes confirmaram o risco de roteamento no chute: em 2026-08-20, nomes genéricos copiados de um template externo (`backend-specialist`, `frontend-specialist`) falharam por não existir no ambiente; em 2026-08-22, a skill pública `capacity-plan` foi instalada e lida mas tratava de contratação de pessoas em vez de carga de servidor, enquanto uma revisão afirmou falsamente que `upstash-ratelimit-js` não existia sem rodar `ls`; e em 2026-09-18, uma reconfiguração de plugins removeu skills antes instaladas (`upstash-ratelimit-js` e `incident-response`), provando que inventário datado vira mentira se não for remedido.

## Por quê
Despachar subagente sem necessidade multiplica custo e latência; herdar o modelo da sessão principal em silêncio gasta modelo caro em tarefa mecânica; e citar agente ou skill de memória quebra o despacho ou injeta instruções inúteis.

## Como aplicar
- **Três únicos casos que justificam subagente**: (1) proteção de contexto (investigação ruidosa), (2) paralelização real de tarefas independentes ou (3) especialização genuína com checklist próprio.
- **Decomposição por fronteira de contexto isolável**: divida pelo que cada tarefa precisa saber para trabalhar sozinha, nunca por tema ("um pro banco, um pro front") nem por fase ("um pra planejar, um pra testar").
- **Camada de modelo sempre explícita**: nunca herde o modelo em silêncio; escolha a mais barata que resolve:
  - **rápida** (ex.: Haiku): busca ampla, varredura, conferência mecânica ou edição 100% especificada;
  - **intermediária** (ex.: Sonnet): padrão para implementação, debug e revisão;
  - **forte** (ex.: Opus): decisão arquitetural difícil, conflito entre decisões, dinheiro ou segurança.
- **Agentes direcionais do projeto**: para as camadas centrais do sistema (front-end, banco, auth, versionamento, APIs, deploy, segurança, rate-limit, cache, escala, observabilidade, recuperação), mantenha agentes locais versionados no repositório com as regras e armadilhas medidas da própria base, declarando lacunas por extenso quando não houver skill confiável.
- **Verificação em disco**: confirme com `ls` que o agente e a skill existem hoje no disco antes de citá-los, leia o conteúdo da skill antes de adotá-la (nome não diz o que faz) e nomeie no briefing as skills que o subagente deve carregar (subagente não herda skills do pai).

## Como se prova
Gate automatizado (`testar-agentes-direcionais`) confere se cada agente direcional está registrado na tabela de roteamento e se todas as skills citadas existem no disco.
