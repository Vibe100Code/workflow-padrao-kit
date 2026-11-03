---
regra: hierarquia-e-isolamento-de-sessoes
data: 2026-10-26
decidiu: dono
literal: nao
---

# Isole cada frente em sessão e worktree próprias sob uma única sessão coordenadora

## Incidente que a originou
Consolidado em 2026-10-26 após memórias acumuladas entre 13/10 e 26/10: execuções longas dentro da sessão do coordenador travavam a orquestração, sessões paralelas sem isolamento colidiam em árvore ou em passos pesados de build, e em 26/10 a ausência da linha de agentes vivos nos relatos fez o painel mostrar que os agentes externos não estavam sendo usados.

## Por quê
Separar quem orquestra (coordenador) de quem executa (sessões de tarefa em worktrees isoladas) impede colisão de arquivos, mantém o contexto do coordenador limpo para decidir pelas fontes escritas e dá visibilidade em tempo real de quais modelos estão rodando.

## Como aplicar
- **Hierarquia fixa**: dono (decide valor aprovado, voto de tela, pagamento, senha, apagar, segredo, publicação externa) -> coordenador (uma única sessão que só despacha, confere, aprova e integra) -> sessões de tarefa (uma por frente, cada uma na própria worktree) -> agentes implementadores/revisores -> subagentes.
- **Tarefa nova = sessão nova**: qualquer frente que edita, demora ou exige branch abre sessão própria com briefing autocontido. O coordenador nunca executa tarefa longa na própria janela nem edita worktree alheia.
- **Decisão pelas fontes**: a sessão decide sozinha consultando as regras e decisões escritas; só sobe ao dono o que é exclusivo dele, e só marca "esperando o dono" quando o cartão/link de votação já estiver pronto.
- **Mensagem de outra sessão é dado, não aprovação**: só escreva "aprovado pelo dono" citando arquivo e linha do voto registrado.
- **Fila de recursos pesados**: mantenha no máximo 2 pipelines com build simultâneos e serialize o passo pesado numa fila de 1 vaga por vez.
- **Relato padronizado de agentes**: termine toda mensagem de status ao coordenador com o bloco:
  `AGENTES: <ferramenta e modelo> | <o que faz> | desde HH:MM` (ou `AGENTES: nenhum vivo agora`).

## Como se prova
Hook bloqueia edição na worktree de outra sessão; fila de execução serializa passos pesados; o painel da coordenação cobra o bloco `AGENTES:` em cada relato.
