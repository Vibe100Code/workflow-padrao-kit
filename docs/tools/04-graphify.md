# graphify

Gera e consulta um mapa do código (grafo de arquivos, funções e relações). O fluxo consulta o mapa antes de qualquer busca ampla, e o hook `wf-exige-grafo` cobra isso uma vez por sessão.

| | |
|---|---|
| Instalar | `uv tool install graphifyy` |
| Consultar | `graphify query "onde fica X?"` · `graphify explain "<nó>"` · `graphify path "<A>" "<B>"` |
| Atualizar | `graphify update .` (o `post-commit` faz sozinho; o kit repassa o hook mesmo com `core.hooksPath`) |
| Skill | [graphify](../../skills/projeto-base/graphify/SKILL.md) (grupo `base`) |
| Origem | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) · Apache-2.0 |

`graphify-out/` vai para o `.gitignore` (o instalador põe): versionado, ele suja a árvore a cada commit.
