# AGENTS.md

Manual para qualquer agente (Codex, Gemini, Claude…) que trabalhe **neste** repositório, o kit do workflow padrão. As instruções completas estão no [CLAUDE.md](CLAUDE.md); valem para todos.

Resumo:
- Idioma pt-BR. Nada de nome de produto, cliente ou conta no kit: exemplo concreto vira `{{placeholder}}`.
- O que vai para os projetos fica em `templates/`; o que roda no kit fica em `scripts/`.
- Antes de dizer "pronto": `bash scripts/testes/testar-kit.sh`, `bash scripts/testes/testar-fluxo.sh`, `bash scripts/testes/testar-revisor.sh` e `node scripts/validar-links.mjs`.
- Commit `tipo(escopo): descrição` em pt-BR, sem trailer de procedência de ferramenta.
- Quem implementou uma mudança não a revisa na mesma conversa ([agente revisor](docs/08-agente-revisor.md)).
