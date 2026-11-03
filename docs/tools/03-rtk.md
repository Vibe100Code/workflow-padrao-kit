# RTK

Resume a saída de `git`, `ls`, `grep`, `find` e afins antes de ela entrar no contexto do agente. No fluxo de origem cortou 96,5% da saída de comandos.

| | |
|---|---|
| Instalar | [rtk-ai/rtk](https://github.com/rtk-ai/rtk); o `scripts/instalar-maquina.sh --aplicar` liga o hook global `rtk hook claude` |
| Ver a economia | `rtk gain` |
| Saída inteira | `rtk proxy <comando>` |

Saída resumida não prova ausência: antes de afirmar que algo não existe, confira com a saída inteira ([regra 004](../../templates/projeto/regras/004-saida-comprimida-nao-prova-ausencia.md)).
