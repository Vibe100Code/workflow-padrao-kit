# Regras de toda sessão desta máquina (~/.claude/CLAUDE.md)

> Modelo do workflow padrão. Vale para toda sessão, agente e subagente (qualquer ferramenta: Claude, Codex, Gemini, modelo de leitura longa…) em qualquer projeto desta máquina. Datas e incidentes são os do fluxo de origem; troque pelos seus quando tiver os próprios.

## 1. Regra de entrada para qualquer agente (decisão do dono, 2026-10-19)
Motivo: um modelo de leitura longa consumiu ~US$ 214 num dia porque recebia arquivos e páginas inteiras.
1. **Mande o mínimo que responde à pergunta:** diff ou trecho, nunca arquivo/pasta/log inteiro; caminho em vez de conteúdo quando o agente lê sozinho; capturas em JPG 1440 px recortadas, no máximo 12; transcrição e histórico de sessão nunca entram.
2. **Briefing de subagente é curto:** tarefa, caminhos, critérios e formato da resposta (`docs/BRIEF-PADRAO-SUBAGENTE.md`).
3. **Antes de chamada grande, estime o tamanho.** Passou do que a pergunta precisa: divida ou reduza.

## 2. Estrutura de trabalho (decisão do dono, 2026-10-26)
1. **Hierarquia:** dono → coordenador (uma sessão, só orquestra) → sessões de tarefa (uma por frente, worktree própria) → agentes → subagentes. Frente nova (edita, demora, tem branch) = sessão nova com briefing curto; consulta rápida o coordenador faz.
2. **Quem faz:** os papéis (coordenador, implementador, revisores, ajudantes) são escolha do usuário e ficam em `papeis` no `workflow.config.json` de cada projeto. Padrão sugerido: Claude Code coordena, Codex implementa (`codex exec -s workspace-write -m <modelo> -C <pasta>`), API Claude revisa (`scripts/revisar-pela-api.mjs`; Opus em dinheiro, segurança e motor). O contrário, ou uma ferramenta só, também vale. Revisor extra opcional: qualquer outro modelo, por app ou por API (docs/09-conectar-apis.md do kit). **Fixo: quem construiu não revisa o próprio trabalho na mesma conversa.** Revisor de outra IA é recomendado, não obrigatório; o agente revisor da mesma IA em contexto limpo vale (docs/08-agente-revisor.md do kit). Depois da revisão, **o coordenador dá a aprovação final** antes de integrar. Subagente Claude com modelo explícito: Haiku busca, Sonnet implementa, Opus só decisão difícil.
3. **Modelo de leitura longa nunca implementa como agente** (US$ 177 num dia). Só lê trecho e responde. Erro 429 é cota por minuto: espere e não repita em rajada.
4. **Relato ao coordenador** termina com `AGENTES: <ferramenta e modelo> | <o que faz> | desde HH:MM` (ou "nenhum vivo agora").
5. **Economia:** briefing = tarefa, caminhos, critério de pronto, formato; nunca histórico; não retomar agente gigante para tarefa nova; trecho em vez de arquivo; resposta curta (caveman).
6. **Revisor caído:** um fora (limite/429/sem crédito) → outro dos `revisores`, ou o agente revisor em contexto limpo. Diga qual revisou. Não se pula a revisão.
7. **Regra de processo se lê pelo porquê, não pela letra.** Se a letra trava um caso que o porquê não cobre, siga o porquê e diga qual regra leu assim. **Literais:** dinheiro e gasto pago, senha, segredo, apagar, loja de apps, segurança, integração na main e aprovação final de tela por print.

## 3. Ferramentas sempre ligadas
- **RTK** (hook global): resume a saída de git/ls/grep/find. `rtk gain` mostra a economia; `rtk proxy <cmd>` quando precisar da saída inteira.
- **graphify:** `graphify query "<pergunta>"` antes de busca ampla; o post-commit mantém o grafo.
- **caveman** em relatos entre agentes; texto para o dono em pt-BR claro.
- **superpowers:** brainstorming antes de feature, systematic-debugging antes de fix, TDD, writing-plans antes de trabalho de mais de um passo.
- **ponytail:** a menor mudança que resolve.
