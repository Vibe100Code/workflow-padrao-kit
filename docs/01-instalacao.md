# 01 · Instalação

Duas camadas: a **máquina** (uma vez por computador, vale para todo projeto) e o **projeto** (uma vez por repositório, versionado com ele). Depois: [02 · Questionário inicial](02-questionario-inicial.md) e [03 · Configuração](03-configuracao.md).

## Pré-requisitos

| Obrigatório | Recomendado | Opcional |
|---|---|---|
| macOS ou Linux, `git`, `node` ≥ 22, `python3`, `jq`, [Claude Code](https://docs.claude.com/claude-code) | [`uv`](https://docs.astral.sh/uv/) (instala o graphify), [RTK](https://github.com/rtk-ai/rtk), [graphify](https://github.com/Graphify-Labs/graphify), [Codex CLI](https://github.com/openai/codex) | `agy` (Antigravity), chaves de API se quiser usar alguma ([conectar APIs](09-conectar-apis.md)), `gh` |

## Instalar na máquina (uma vez): o que é global

```bash
git clone https://github.com/Vibe100Code/workflow-padrao-kit.git ~/workflow-padrao-kit
cd ~/workflow-padrao-kit
scripts/instalar-maquina.sh            # só verifica: lista ok / falta
scripts/instalar-maquina.sh --aplicar  # instala o que dá
```

O `--aplicar`:
1. instala o graphify (`uv tool install graphifyy`) se faltar;
2. copia os hooks para `~/.claude/hooks/` (pula os que existem);
3. mescla hooks e plugins em `~/.claude/settings.json` (**backup** `settings.json.bak-kit-<data>` antes);
4. instala os plugins `superpowers` e `typesafe` pelo `claude plugin`;
5. copia as skills de máquina para `~/.claude/skills/` (pula as que existem);
6. cria `~/.claude/CLAUDE.md` com as regras — se já existir, salva `CLAUDE.kit.md` ao lado para você mesclar;
7. cria a pasta do coordenador `~/.coord/`.

O que **não** faz, de propósito (literais): instalar coisa paga, criar conta, fazer login, gravar chave. Ele diz o comando exato para você rodar, por exemplo:
```bash
security add-generic-password -a "$USER" -s anthropic-api-key -w
```
Opções: `--sem-plugins` (não chama `claude plugin`), `--sem-rede` (nada da internet).

## Instalar num projeto: o que é local

```bash
cd ~/meu-projeto && git init        # se ainda não for repositório
~/workflow-padrao-kit/scripts/instalar-projeto.sh . --nome "Meu Projeto" --skills base,ui
```

| Opção | Efeito |
|---|---|
| `--nome "X"` | preenche o título do `CLAUDE.md` |
| `--skills base` (padrão) | skills de processo: iniciar-projeto, graphify, extract-approach, revisar-em-painel, sanear, grilling, caveman, find-skills |
| `--skills ui` | + ui-ux-pro-max, design, frontend-design-review, apple-hig |
| `--skills spec` | + 11 skills speckit e a pasta `.specify/` |
| `--skills pesquisa` | + agent-reach, defuddle |
| `--skills todas` | os quatro grupos |

O instalador **nunca sobrescreve** arquivo do projeto (avisa e pula), não faz commit e pode rodar de novo. Ele:
1. cria os arquivos-base;
2. copia hooks do Claude Code, scripts do fluxo e githooks (`git config core.hooksPath githooks`);
3. liga os 5 hooks e declara o plugin superpowers em `.claude/settings.json`;
4. copia as skills dos grupos pedidos para `.claude/skills/`;
5. instala o post-commit do graphify;
6. põe `.claude/worktrees/` e `graphify-out/` no `.gitignore`.

Depois:
```bash
# preencha os {{...}} do CLAUDE.md e os gates do workflow.config.json
graphify update .                     # primeiro mapa do código
git add -A && git commit -m "chore: adota o workflow padrão"
```

## Provar que o kit funciona

```bash
scripts/testes/testar-kit.sh      # repo vazio → instala → cada hook dispara ou cala quando deve
scripts/testes/testar-fluxo.sh    # sessão → tarefa → gates → integrar (verde integra, vermelho não, conflito para) → limpeza
scripts/testes/testar-revisor.sh  # revisor pela API, sem rede nem custo
scripts/instalar-maquina.sh       # o que falta nesta máquina
```
