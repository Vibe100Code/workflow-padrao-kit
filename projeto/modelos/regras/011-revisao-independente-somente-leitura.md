---
regra: revisao-independente-somente-leitura
data: 2026-10-26
decidiu: dono
literal: nao
---

# Audite mudanças não triviais com revisor de outro modelo em modo somente leitura e verifique cada achado no código

## Incidente que a originou
Em 2026-10-05, um revisor de outro fornecedor pegou o defeito que o autor havia acabado de introduzir (sorteio sobrescrevendo escolha manual), 2 bugs altos em efeito visual e 17 recursos ausentes do pacote que já tinham ido para beta sem ninguém notar. Depois, três incidentes operacionais moldaram as travas: em 2026-10-06 uma revisão sem tela morreu sem saída por falta de comandos básicos de leitura (`awk`, `nl`, `sort`, `git rev-parse`) na lista de permissões; em 2026-10-23 `codex exec` em segundo plano sem `< /dev/null` travou por horas esperando `stdin`; e em 2026-10-28 um diff de 75 mil caracteres com teto de 8.000 tokens de saída gastou tudo no raciocínio interno e devolveu `(resposta vazia)` com código `0`.

## Por quê
Revisor de outro modelo ou fornecedor erra de um jeito diferente do implementador e enxerga o que o autor não vê. Para ser seguro e confiável, o revisor nunca pode ter permissão de escrita, não pode engolir falhas silenciosamente e seu parecer precisa ser conferido linha a linha antes de virar edição.

## Como aplicar
- **Separação entre quem escreve e quem revisa (decisão de 2026-10-26)**: agentes de implementação escrevem código; o parecer de revisão vem exclusivamente dos `revisores` listados em `papeis` no `workflow.config.json` que não implementaram a mudança (padrão sugerido: API direta, modelo forte para motor, dinheiro, segurança e tela, intermediário no resto; opcional: qualquer outro modelo, por app ou por API). Depois que a revisão aprova e os itens `CRÍTICO` e `ALTO` são corrigidos, o coordenador dá a aprovação final.
- **Somente leitura estrito**: rode revisores externos sempre em sandbox de leitura (e com lista explícita de comandos de inspeção permitidos); nunca use flags que pulem permissões de segurança (`--dangerously-skip-permissions`).
- **Alvo congelado e condição de parada**: despache com commits `base` e `head` exatos (ou retrato explícito da árvore), classes de defeito buscadas, severidades (`CRÍTICO`/`ALTO`/`MÉDIO`/`BAIXO` com `arquivo:linha` e cenário) e a saída honesta *"sem achados"*. Não invente rodadas extras sem risco novo.
- **Relatório é dado, não veredito**: o coordenador deduplica por causa raiz, reconfere cada achado no arquivo e na linha e reproduz o cenário antes de consertar.
- **Execução segura em segundo plano**: grave em arquivo, feche `stdin` (`< /dev/null`) para não travar, nunca envie segredos (`.env`, chaves, dados pessoais) no prompt e configure teto amplo de saída em streaming (64.000 tokens, saindo com código `1` e `FALHA:` se truncar por `max_tokens` ou vier sem texto).
- **Queda de revisor**: se um revisor permitido cair por limite ou saldo, troque por outro dos `revisores` (ou qualquer modelo que não implementou) e registre qual revisou; nunca pule a revisão.

## Como se prova
Gate automatizado (`testar-revisor-api-sem-texto`) garante código de saída `1` em resposta vazia ou truncada; hooks e permissões de CLI impedem escrita por revisores.
