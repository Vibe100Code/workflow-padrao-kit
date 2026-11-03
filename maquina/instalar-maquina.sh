#!/usr/bin/env bash
# Prepara a MÁQUINA para o workflow padrão (uma vez por máquina).
#   maquina/instalar-maquina.sh              só verifica e diz o que falta (não muda nada)
#   maquina/instalar-maquina.sh --aplicar    instala o que falta
#   opções: --sem-plugins  (não chama `claude plugin`)   --sem-rede (não instala nada da internet)
# Nunca sobrescreve: arquivo existente é pulado; settings.json ganha backup antes da mescla.
# Não instala nada pago nem cria conta (Codex, agy, chaves de API): só diz onde está faltando.
set -uo pipefail
KIT=$(cd "$(dirname "$0")/.." && pwd); M="$KIT/maquina"
APLICAR=0; PLUGINS=1; REDE=1
for a in "$@"; do case $a in --aplicar) APLICAR=1;; --sem-plugins) PLUGINS=0;; --sem-rede) REDE=0; PLUGINS=0;; esac; done
C="$HOME/.claude"; FALTA=0
ok()   { printf '  \033[32mok\033[0m    %s\n' "$1"; }
falta(){ printf '  \033[33mfalta\033[0m %s\n' "$1"; FALTA=$((FALTA+1)); }
faz()  { printf '  \033[36mfaz\033[0m   %s\n' "$1"; }
tem()  { command -v "$1" >/dev/null 2>&1 || [ -x "$HOME/.local/bin/$1" ]; }

echo "1. Ferramentas de base"
for b in git node python3 jq; do tem $b && ok "$b" || falta "$b (obrigatório: instale pelo gerenciador do sistema)"; done
tem uv && ok "uv" || falta "uv — https://docs.astral.sh/uv/ (instala o graphify)"

echo "2. RTK (resume saída de comando; hook global)"
if tem rtk; then ok "rtk $(rtk --version 2>/dev/null | awk '{print $2}')"
else falta "rtk — instale por https://github.com/rtk-ai/rtk/blob/master/INSTALL.md e rode de novo"; fi

echo "3. graphify (mapa do código)"
if tem graphify; then ok "graphify"
elif [ $APLICAR = 1 ] && [ $REDE = 1 ] && tem uv; then faz "uv tool install graphifyy"; uv tool install graphifyy >/dev/null && ok graphify || falta "graphify (uv tool install graphifyy falhou)"
else falta "graphify — uv tool install graphifyy  (pacote com dois y; https://github.com/Graphify-Labs/graphify)"; fi

echo "4. Agentes (conta própria; o kit não instala nem loga)"
tem claude && ok "claude (Claude Code)" || falta "claude — https://docs.claude.com/claude-code"
tem codex && ok "codex (implementador do padrão sugerido)" || echo "  ·     opcional: codex — implementador do padrão sugerido (npm i -g @openai/codex + login); troque em papeis se usar outro"
tem agy && ok "agy (ajudante opcional)" || echo "  ·     opcional: agy — Antigravity CLI"
security find-generic-password -a "$USER" -s anthropic-api-key >/dev/null 2>&1 && ok "chave da API Anthropic no Keychain (revisor pela API)" \
  || echo "  ·     opcional: API Anthropic como revisor — veja docs/CONECTAR-APIS.md (o workflow funciona só com os apps por assinatura)"

echo "5. Hooks globais em ~/.claude/hooks"
mkdir -p "$C/hooks" 2>/dev/null
for h in "$M"/hooks/*; do n=$(basename "$h")
  if [ -e "$C/hooks/$n" ]; then ok "$n"
  elif [ $APLICAR = 1 ]; then cp "$h" "$C/hooks/$n" && chmod +x "$C/hooks/$n" && faz "copiado $n"
  else falta "$n"; fi
done

echo "6. ~/.claude/settings.json (hooks + plugins)"
if [ $APLICAR = 1 ]; then
  [ -f "$C/settings.json" ] && cp "$C/settings.json" "$C/settings.json.bak-kit-$(date +%Y%m%d-%H%M%S)"
  node - "$C/settings.json" "$M/settings.global.json" "$HOME" <<'JS'
const fs=require('fs');const [arq,frag,home]=process.argv.slice(2);
let s={};if(fs.existsSync(arq)){try{s=JSON.parse(fs.readFileSync(arq,'utf8'))}catch{console.error('settings.json inválido ('+arq+'): corrija antes; nada foi alterado.');process.exit(1)}}
const f=JSON.parse(fs.readFileSync(frag,'utf8').replaceAll('$HOME',home));
s.extraKnownMarketplaces={...f.extraKnownMarketplaces,...(s.extraKnownMarketplaces||{})};
s.enabledPlugins={...f.enabledPlugins,...(s.enabledPlugins||{})};
s.hooks=s.hooks||{};let n=0;
for(const [ev,grupos] of Object.entries(f.hooks)){const l=s.hooks[ev]=s.hooks[ev]||[];
  for(const g of grupos){const cmd=g.hooks[0].command;const chave=cmd.includes('rtk')?'rtk hook':cmd.split('/').pop();
    if(JSON.stringify(l).includes(chave))continue;l.push(g);n++;}}
fs.mkdirSync(require('path').dirname(arq),{recursive:true});fs.writeFileSync(arq,JSON.stringify(s,null,2)+'\n');
console.log('  \x1b[36mfaz\x1b[0m   settings.json mesclado ('+n+' hook(s) novo(s); backup ao lado)');
JS
else
  for k in bloqueia-pkill-f pedidos-do-dono 'rtk hook' superpowers@superpowers-marketplace; do
    grep -qF "$k" "$C/settings.json" 2>/dev/null && ok "settings: $k" || falta "settings: $k"; done
fi

echo "7. Plugins (superpowers, typesafe)"
for p in superpowers@superpowers-marketplace:obra/superpowers-marketplace typesafe@typesafe-ai:typesafe-ai/skills; do
  id=${p%%:*}; repo=${p#*:}; nome=${id%@*}
  if ls -d "$C"/plugins/cache/*/"$nome" >/dev/null 2>&1 || grep -q "\"$id\"" "$C/plugins/installed_plugins.json" 2>/dev/null; then ok "$id"
  elif [ $APLICAR = 1 ] && [ $PLUGINS = 1 ] && tem claude; then faz "claude plugin install $id"
    claude plugin marketplace add "$repo" >/dev/null 2>&1; claude plugin install "$id" >/dev/null 2>&1 && ok "$id" || falta "$id (rode: claude plugin marketplace add $repo && claude plugin install $id)"
  else falta "$id — claude plugin marketplace add $repo && claude plugin install $id"; fi
done

echo "8. Skills globais em ~/.claude/skills"
mkdir -p "$C/skills" 2>/dev/null
for s in "$KIT"/skills/maquina/*/; do n=$(basename "$s")
  if [ -e "$C/skills/$n" ]; then ok "$n"
  elif [ $APLICAR = 1 ]; then cp -R "$s" "$C/skills/$n" && faz "copiada $n"
  else falta "$n"; fi
done

echo "9. Regras globais e memória"
if [ -f "$C/CLAUDE.md" ]; then
  grep -q 'Estrutura de trabalho' "$C/CLAUDE.md" && ok "~/.claude/CLAUDE.md já tem as regras do fluxo" || {
    [ $APLICAR = 1 ] && cp "$M/CLAUDE.global.md" "$C/CLAUDE.kit.md" && faz "~/.claude/CLAUDE.md já existe: modelo salvo em CLAUDE.kit.md para você mesclar" || falta "regras do fluxo no ~/.claude/CLAUDE.md (modelo: maquina/CLAUDE.global.md)"; }
elif [ $APLICAR = 1 ]; then cp "$M/CLAUDE.global.md" "$C/CLAUDE.md" && faz "~/.claude/CLAUDE.md criado"
else falta "~/.claude/CLAUDE.md"; fi
COORD=${COORD_DIR:-$HOME/.coord}
if [ -d "$COORD" ]; then ok "pasta do coordenador $COORD"
elif [ $APLICAR = 1 ]; then mkdir -p "$COORD/logs" && cp -n "$M"/coordenacao/*.md "$COORD/" && faz "pasta do coordenador criada em $COORD"
else falta "pasta do coordenador $COORD"; fi
echo "   memória: o Claude Code cria uma por projeto em ~/.claude/projects/<projeto>/memory/; modelos em maquina/memoria/"

echo
if [ $APLICAR = 1 ]; then echo "Aplicado. Itens ainda 'falta' acima precisam de você (conta, login ou instalação manual)."
else echo "Verificação: $FALTA item(ns) faltando. Para instalar o que dá: $0 --aplicar"; fi
