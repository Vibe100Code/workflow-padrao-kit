# O fluxo de uma tarefa, passo a passo

Exemplo do começo ao fim: o dono pede "o botão salvar não responde no formulário de perfil".

## Uma vez por projeto: questionário inicial
Projeto novo (ou `BRIEFING.md` quase todo `a confirmar`) → skill `iniciar-projeto`. Ela pergunta em blocos (projeto, negócio e público, objetivo e medida, marca, referências, restrições e pronto, conteúdo real, operação) e grava `BRIEFING.md` bloco a bloco. Sem resposta = `a confirmar`; nada inventado. Daí em diante, todo briefing de agente cita o bloco do BRIEFING que importa.

## 0. Antes: quem pega a tarefa
O **coordenador** recebe o pedido (o hook `pedidos-do-dono` já registrou). Consulta rápida ele mesmo responde. Frente que edita, demora ou tem branch → abre **sessão nova** com briefing curto (tarefa, caminhos, critério de pronto, formato). Não cola histórico.

## 1. Abrir a sessão
```bash
node scripts/nova-sessao.mjs fix/botao-salvar
cd .claude/worktrees/botao-salvar        # o caminho que ele imprimir
node scripts/tarefa.mjs abrir fix/botao-salvar   # se a nova-sessao não marcou
```
Uma cópia isolada, nascida da base atual. Editar na `main` é negado pelo hook `wf-exige-worktree`.

## 2. Quatro perguntas, por escrito (regra 002)
Num comentário do plano ou no relato:
- **Evidência:** o que prova o problema? (print, log, passo que reproduz)
- **Alcance:** que arquivos/telas a mudança toca? (`graphify query "quem chama salvarPerfil"`)
- **Risco:** o que pode quebrar?
- **Prova:** como vou mostrar que funcionou pelo caminho do usuário?

Bug → `superpowers:systematic-debugging` antes de propor fix: reproduzir, isolar, só então consertar.

## 3. Plano
`planos/botao-salvar.md` a partir de `planos/_MODELO.md`. Cada etapa diz **Files** (arquivos que toca), **Resources** (porta, build, banco) e **Depends-on**. É o que permite dizer, com dado, se duas etapas podem ir em paralelo.

## 4. Implementar
O **implementador** de `papeis` (no `workflow.config.json`) executa o plano. Com o padrão sugerido (Codex):
```bash
codex exec -s workspace-write -m <modelo> -c model_reasoning_effort=high -C "$PWD" "$(cat planos/botao-salvar.md)"
```
Se o implementador for o Claude, a própria sessão (ou um subagente) implementa; se for outra ferramenta, use o `cmd` dela. A sessão confere o diff (`git diff`), não reescreve. Implementador sem cota → troque o papel ou use um ajudante em arquivos disjuntos.

## 5. Testes
```bash
node scripts/rodar-gates.mjs
```
Roda todos os gates do `workflow.config.json` em paralelo e reprova no fim, com a lista inteira de falhas. **Teste novo nasce provado:** injete o defeito real, confirme que o teste acusa, desfaça. Vermelho é dado: defeito no código, pré-condição faltando ou outra sessão mexendo no mesmo lugar — três causas, três ações diferentes.

## 6. Revisão independente
Um dos `revisores` de `papeis`, nunca a conversa que implementou. Outra IA é o recomendado; o agente `revisor` da mesma IA em contexto limpo também vale ([3 caminhos](08-agente-revisor.md)). Com o padrão sugerido (API Claude):
```bash
node scripts/revisar-pela-api.mjs --base main -o revisao.md            # Sonnet
node scripts/revisar-pela-api.mjs --base main --modelo claude-opus-5-5 -o revisao.md   # dinheiro, segurança, motor
```
Opcional: outro modelo como segundo revisor (ex.: Gemini ou OpenAI pela API, [CONECTAR-APIS.md](09-conectar-apis.md)). O revisor recebe **só o diff** e pode responder "sem achados". Crítico/alto: conserta antes de seguir. Cada achado é conferido na linha antes de ser aceito. Painel para mudança grande: skill `revisar-em-painel`.

## 7. Prova pelo caminho do usuário (regra 010)
Abrir do zero, sem atalho; passar por **todas** as entradas que levam ao estado alterado; conferir a tela inteira em tamanho real; acionar o controle durante o carregamento. Print ou log vai para o relato.

## 8. Aprovar
O coordenador confere pelas fontes escritas e dá a aprovação final. Mudança de tela: [cartão de votação](../templates/projeto/docs/CARTAO-DE-VOTACAO.md) com antes/depois para o dono — uma pergunta, pronta para decidir.

## 9. Integrar
```bash
node scripts/integrar.mjs
node scripts/tarefa.mjs concluir
```
`integrar` faz fetch → rebase → **gates de novo sobre a base nova** → push. Se o push for rejeitado (outra sessão integrou antes), recomeça do fetch. Conflito: **para** e devolve para você resolver olhando o que foi aprovado. Uma integração por vez.

## 10. Aprendizado
Skill `extract-approach` → `learnings/AAAA-MM-DD-botao-salvar.md` (sintoma, causa, passos, regra reaproveitável, prova). Se o erro já aconteceu antes, vira `regras/NNN-*.md`. O post-commit atualiza o grafo.

## Relato final ao coordenador
```
fix/botao-salvar integrado (abc1234). Causa: handler perdia o form após re-render. Prova: print do salvar a frio + gate novo provado.
Falta: nada.
AGENTES: nenhum vivo agora
```

## Trabalho inacabado
Sai com [passagem de tarefa](../templates/projeto/docs/PASSAGEM-DE-TAREFA.md): objetivo, estado conferido, feito, evidência, falta, bloqueios, o que reler. Quem retoma confere o estado real antes de continuar — passagem é contexto, não prova.
