---
name: revisar-em-painel
description: Revisão por painel de especialistas independentes, com SÍNTESE que descarta em vez de empilhar. Use antes de integrar mudança não-trivial, ou quando pedirem "revisa isso", "olha esse diff", "está pronto para subir?". Não substitui os gates — eles medem o que é medível; isto olha o que nenhum gate cobre.
---

# revisar-em-painel

> Adaptado de `docs/prompts/03-multi-agent-code-review.md` do
> [vibe-coding-toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit),
> com as leis deste repositório por cima.

## Por que isto existe, e o que ele acrescenta ao que já temos

`/pr-review-toolkit:review-pr` já despacha revisores especialistas. **Ele
AGREGA; não SINTETIZA** (medido no `commands/review-pr.md`): não deduplica, não
exige cenário de falha, não descarta achado fraco — e ainda produz seções
*"Strengths"* e *"Positive Observations"*.

Sem descarte, quatro revisores produzem **uma lista quatro vezes mais longa**,
não quatro vezes mais sinal. E lista longa com achado fraco no meio treina a
pessoa a passar os olhos — que é como o achado forte se perde.

⚠️ **`ReportFindings` já impõe `failure_scenario` como campo obrigatório** quando
a revisão roda por `/code-review`. Esta skill leva a mesma exigência para o
painel avulso, onde nada obriga.

## Quando NÃO usar

- **Mudança que um gate cobre.** Gate mede; painel opina. Se existe
  `scripts/testar-*` para aquilo, o gate decide — e ele é mais barato.
- **Diff trivial** (texto, uma constante, um `.md`). Multiagente custa **3 a 10×
  mais tokens** que um agente só (medição da Anthropic).
- ⚠️ **Sem o dono pedir.** O `CLAUDE.md` diz *"Do not call the AgentTool unless
  the user requested it"*. Esta skill descreve COMO revisar quando ele pedir.

## 1. Despachar o painel — numa mensagem só

Lentes, descartando as que não se aplicam ao diff:

| lente | agente aqui | quando entra |
|---|---|---|
| qualidade geral | `feature-dev:code-reviewer` | sempre |
| falha silenciosa | `pr-review-toolkit:silent-failure-hunter` | `catch`, fallback, tratamento de erro |
| tipos | `pr-review-toolkit:type-design-analyzer` | tipo novo ou alterado |
| segurança | skill `sentinela` | auth, entrada, segredo, rota nova |
| comentário | `pr-review-toolkit:comment-analyzer` | ⚠️ em `src/` e `nativo-swift/` a resposta é sempre "sai" (§7.1.1) |

Cada revisor trabalha **isolado — nenhum vê o achado do outro**. É a única coisa
que faz o painel valer mais que um revisor: lentes que se contaminam convergem.

**Formato obrigatório de todo achado:**

```
arquivo:linha — severidade — a alegação em uma frase — o cenário concreto que quebra
```

**Achado sem cenário concreto não é achado, é palpite.** O revisor descarta o
dele antes de reportar, em vez de encher a lista.

## 2. Sintetizar — esta é a etapa que não pode ser pulada

1. **Deduplicar.** O mesmo problema visto por duas lentes vira **uma** entrada,
   com a descrição mais afiada e a nota de quem concordou. Concordância é sinal,
   e some quando vira duas linhas.
2. **Descartar** — sem cenário concreto, ou já tratado noutro ponto do código.
   ⚠️ **Conferir contra o diff antes de descartar.** Aceitar a alegação de um
   revisor sem olhar é o mesmo erro nos dois sentidos: manter o falso e cortar o
   verdadeiro.
3. **Ranquear:** CRÍTICO (segurança/perda de dado — barra a integração) → ALTO
   (bug real) → MÉDIO (manutenção) → BAIXO (estilo).

🔴 **Não escrever seção de elogio.** Régua deste repositório **ordena e
descarta; não aprova** (§7.3). Espaço gasto com "o que ficou bom" é espaço que
compete com o achado que importa.

## 3. Apresentar

Um relatório, mais severo primeiro. Cada entrada com arquivo:linha, a frase, o
cenário, a severidade e quem levantou.

✅ **Lista de CRÍTICO/ALTO vazia é resultado válido e útil** — dizer isso por
extenso, nunca inventar um achado para a revisão "ter valido".

## 4. Depois

- CRÍTICO e ALTO se consertam antes de integrar. MÉDIO/BAIXO são decisão do dono.
- 🔑 **Achado que um gate poderia ter pego vira gate**, com a mutação declarada
  em `scripts/mutacoes-dos-gates.ts` — senão a mesma revisão se repete para
  sempre, à mão. Painel encontra uma vez; gate encontra sempre.
- Problema não-trivial vira nota em `learnings/` (§7.1).
