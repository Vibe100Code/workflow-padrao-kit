# CLAUDE.md — {{PROJETO}}

> Manual de operação curto. Vale para qualquer ferramenta de IA (AGENTS.md aponta para cá).
> Idioma: pt-BR. Agir > perguntar, depois de ler as fontes abaixo.

## 1. O que é
{{Uma frase: o que o projeto faz e para quem.}}

## 2. Fontes da verdade (ordem de leitura)
0. `BRIEFING.md` — negócio, público, objetivo, marca, referências, restrições, conteúdo. **Leia antes de agir.** Não existe ou está cheio de `a confirmar`? Rode a skill `iniciar-projeto`.
1. `DECISOES.md` — votos do dono, com data. Vence tudo, exceto decisão mais nova.
2. `regras/` — uma regra por arquivo, com o porquê.
3. `learnings/` — uma nota por problema resolvido.
4. `planos/` — plano de cada tarefa (arquivos, recursos, dependências).
5. `graphify query "<pergunta>"` — mapa do código, antes de busca ampla.
6. `workflow.config.json` → `papeis` — quem coordena, quem implementa e quem revisa **neste** projeto. Quem construiu não revisa o próprio trabalho na mesma conversa.

Doc e código discordam: o código vence; siga o código e avise que o doc está velho.

## 3. Como rodar
```bash
{{comando de instalar}}
{{comando de rodar}}
{{comando de testes (gates)}}
```

## 4. Esteira de toda tarefa
1. `node scripts/nova-sessao.mjs <tipo>/<nome>` (worktree própria; editar na main é bloqueado).
2. Quatro perguntas por escrito: evidência, alcance, risco, como provar.
3. Plano em `planos/` (modelo `planos/_MODELO.md`).
4. Implementar (pelo `implementador` de `papeis`) · 5. Testes (teste novo nasce provado: injeta o defeito, ele acusa).
6. Revisão independente: outra IA (recomendado) ou o agente `revisor` em contexto limpo (só o diff) · 7. Prova pelo caminho do usuário.
8. Aprovação (tela nova: voto do dono no print) · 9. Integrar, um por vez.
10. Nota em `learnings/` + `graphify update .`.

## 5. Erros que a IA não pode cometer aqui
| Erro | Regra |
|---|---|
| {{erro real}} | {{regra, ver regras/NNN-*.md}} |

## 6. Nunca flexível (ao pé da letra)
Dinheiro e gasto pago · senha e segredo · apagar · publicar/integrar na main · segurança · loja de apps · aprovação final de tela. Tudo isso é do dono.

## 7. Relato
Todo relato ao coordenador termina com:
`AGENTES: <ferramenta e modelo> | <o que faz> | desde HH:MM` (ou "nenhum vivo agora").
