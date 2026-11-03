# Plano — {{tipo/nome}}

## Quatro perguntas
- **Evidência do problema:** {{dado, print, log}}
- **O que a mudança alcança:** {{arquivos, telas, usuários}}
- **Risco:** {{o que pode quebrar}}
- **Como vou provar:** {{caminho do usuário + teste}}

## Etapas
| # | Etapa | Files | Resources | Depends-on |
|---|---|---|---|---|
| 1 | {{o que}} | `{{caminho}}` | {{porta/build/banco ou —}} | — |
| 2 | {{o que}} | `{{caminho}}` | {{—}} | 1 |

> Paralelo só se: não dependem uma da outra, Files não se cruzam e Resources não disputam. Na dúvida, série.

## Pronto quando
- [ ] {{critério checável}}
