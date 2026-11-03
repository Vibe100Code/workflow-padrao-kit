---
name: sanear
description: Passada de limpeza no repositório que MEDE antes de agir — código morto, TODO/FIXME, dependência sem uso, arquivo órfão. Use quando pedirem "limpa isso", "organiza o repo", "tem código morto?", "remove o que não usa". Nada é apagado sem inventário com evidência e aprovação item a item.
---

# sanear

> Funde `docs/prompts/01-project-sanitation.md` do
> [vibe-coding-toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit)
> com a régua que o dono impôs em 2026-08-17, que é mais forte porque nasceu de
> uma varredura real neste repositório.

## Por que isto é skill do repo, e não lembrete

A lição de 2026-08-17 existia só como memória do ambiente do dono — some numa
máquina nova, numa sessão nova, num clone novo. **O que vale para o repositório
mora no repositório.**

## A separação que governa tudo: MEDIR ≠ AGIR

Toda alegação sobre o estado do código sai de um **comando rodado agora**. Nunca
de estimativa, nunca de número lembrado de mais cedo na mesma sessão.

## 0. Linha de base — rodar, não estimar

```bash
npm run ci -- --essencial     # limpeza + tipos + os gates de logica
npm run gate:limpeza          # comentario e emoji em src/ e nativo-swift/
npx tsx scripts/testar-gates-orfaos.ts
```

Reportar a saída literal de cada um. **Se algo já está vermelho, dizer isso
ANTES de qualquer coisa** — limpeza empilhada sobre base quebrada não é
mensurável, e o resultado fica indistinguível de defeito novo.

⚠️ **Worktree recém-aberto não é base válida** sem `npm install` e
`prisma generate` — sem eles, `tipos` e `tela` reprovam inteiras por
pré-condição. Medido em 2026-08-20: 4 de 5 etapas vermelhas num diff de quatro
arquivos `.md`.

## 1. Inventário — achar, ainda não consertar

Cada item com **arquivo, linhas, quem chama, e por que se acredita que é órfão**.

🔴 **CONSUMIDOR EXTERNO É CHAMADOR, e varredura ingênua não o enxerga.** Em
2026-08-17 uma varredura por "quem chama esta rota" marcou como órfãos os
webhooks de pagamento, o callback do Supabase e o `/api/checkout/criar` —
**apagar aquilo derrubaria login e pagamento**. Antes de chamar qualquer coisa de
órfã, conferir:

- `src/app/api/webhooks/**` — quem chama é o gateway
- `cron/**` no `vercel.json` — quem chama é a Vercel
- `auth/callback` — quem chama é o Supabase
- `diagnostico-*` — o dono abre à mão no navegador
- rotas consumidas pelo **app Swift**
- links dentro de **e-mail** (o descadastro tem POST do botão do Gmail)

⚠️ **Falsos positivos conhecidos:** `.d.ts` (o TypeScript consome sem `import`)
e `index.ts` de barril (importado pelo diretório). Não são órfãos.

⚠️ **"Marca d'água de IA" = caractere invisível + metadado EXIF/C2PA.** Medir
antes de remover: o único acerto de 2026-08-17 foi um **BOM funcional** em
`src/lib/leads.ts`, que faz o Excel abrir o CSV de leads com acento certo.
Removê-lo quebraria o export.

## 2. Plano — o que é seguro e o que exige assinatura

1. **Seguro (padrão se ninguém responder).** Mecânico e preserva comportamento:
   import não usado, arquivo com zero referências **conferidas contra a lista
   acima**, TODO que aponta para trabalho já concluído.
2. **Precisa do dono.** Qualquer "sem uso" ambíguo — reflexão, import dinâmico,
   superfície pública —, remoção de dependência que pode ser peer/transitiva, e
   todo TODO que documenta uma lacuna real.
3. **Fora de escopo — só anotar.** Dívida de arquitetura, e o que o passo 0 não
   levantou.

**Apresentar e esperar decisão sobre o grupo 2.** Sem resposta, só o grupo 1.

## 3. Executar — um item por vez

Um item, um diff, uma verificação. Depois de cada mudança, rodar **o comando que
prova aquela mudança** — não a suíte inteira de memória.

🔴 **Uma frente por branch, commit atômico** (§9/§12). Mutirão grande é o padrão
que apagou três peças aprovadas em `46e22f9` passando em todos os gates: conflito
são dois códigos VÁLIDOS, e válido não é aprovado.

⚠️ **Remoção de coluna vai DEPOIS do deploy** (§14.22): acrescentar é seguro em
qualquer ordem; remover não é.

## 4. Relatório final

Rodar tudo do passo 0 **de novo** e mostrar antes/depois lado a lado. **Nunca
escrever "limpo" sem a saída do comando que prova.**

## O que a experiência deste repositório já respondeu

- **"Organiza tudo"** costuma se responder com *"já está"*: em 2026-08-17 os
  comentários em `src/` e `nativo-swift/` já eram zero, o metadado já saía em
  `src/lib/delivery.ts`, e das 89 rotas **nenhuma estava morta**.
- **Varredura que não cobre um tipo de arquivo não deixa rastro** — ela reporta
  MENOS, e o número parece bom. Conferir a lista de extensões antes de confiar
  no zero (§7.1.1).
- **Mutirão conserta o passado e não muda o futuro.** Limpeza que não vem com
  gate no mesmo commit volta na velocidade em que o código é escrito.
