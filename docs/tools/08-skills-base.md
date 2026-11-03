# Skills de projeto · grupo `base`

Instaladas em todo projeto (`.claude/skills/`), versionadas com ele.

| Skill | Para quê | Gatilho no fluxo | Origem |
|---|---|---|---|
| [iniciar-projeto](../../skills/projeto-base/iniciar-projeto/SKILL.md) | questionário inicial em blocos → `BRIEFING.md` (sem resposta = `a confirmar`) | projeto novo, kickoff, `BRIEFING.md` vazio (o hook de início avisa) | do fluxo (interna) |
| [graphify](../../skills/projeto-base/graphify/SKILL.md) | consulta o mapa do código: onde fica X, quem chama Y | antes de qualquer busca ampla (o hook `wf-exige-grafo` cobra) | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) |
| [extract-approach](../../skills/projeto-base/extract-approach/SKILL.md) | grava a nota de aprendizado em `learnings/` | depois de todo problema não-trivial resolvido | do fluxo (interna) |
| [revisar-em-painel](../../skills/projeto-base/revisar-em-painel/SKILL.md) | painel de revisores independentes com síntese que descarta | antes de integrar mudança não-trivial | do fluxo, a partir de [soumatheusgomes/vibe-coding-toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit) |
| [revisao-de-codigo](../../skills/projeto-base/revisao-de-codigo/SKILL.md) | revisão em dois eixos (padrões do projeto e aderência ao plano), cada um num subagente de contexto limpo; usada pelo agente `revisor` | depois de implementar, quando o revisor é a mesma IA ([AGENTE-REVISOR](../08-agente-revisor.md)) | adaptada de [mattpocock/skills · code-review](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review) (MIT) |
| [sanear](../../skills/projeto-base/sanear/SKILL.md) | limpeza que mede antes: código morto, TODO, dependência sem uso | "limpa o repo", "tem código morto?" | do fluxo, a partir de [soumatheusgomes/vibe-coding-toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit) |
| [grilling](../../skills/projeto-base/grilling/SKILL.md) · [grill-me](../../skills/projeto-base/grill-me/SKILL.md) | entrevista dura sobre plano ou decisão antes de construir | feature nova, decisão de arquitetura | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [caveman](../../skills/projeto-base/caveman/SKILL.md) · [caveman-compress](../../skills/projeto-base/caveman-compress/SKILL.md) | modo compacto · comprime CLAUDE.md e memória (guarda o original) | relatos; manual que passou de ~1 KB útil | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) |
| [find-skills](../../skills/projeto-base/find-skills/SKILL.md) | acha e instala skill nova | "existe skill para X?" | [vercel-labs/skills](https://github.com/vercel-labs/skills) |
