#!/usr/bin/env node
// UserPromptSubmit: sugere a skill certa por palavra-chave forte, no máximo 2.
// Silencioso quando nada casa: aviso que aparece sempre vira ruído.
// Edite REGRAS para as skills que o projeto tem.
const { ler, sair } = require('./_comum.cjs');

const REGRAS = [
  [/\b(novo projeto|projeto novo|kickoff|briefing|come[çc]ar o projeto|iniciar o projeto)\b/, 'início: skill `iniciar-projeto` (questionário → BRIEFING.md).'],
  [/\b(bug|erro|traceback|stack ?trace|regress[aã]o|quebr(ou|ado|ada)|n[aã]o funciona)/, 'bug: `superpowers:systematic-debugging` antes de propor fix.'],
  [/\b(nova (feature|funcionalidade)|brainstorm|vamos (criar|montar|construir))\b/, 'feature: `superpowers:brainstorming` e plano em planos/ antes de codar.'],
  [/\b(teste|tdd)s?\b/, 'testes: `superpowers:test-driven-development` (teste novo nasce provado).'],
  [/\b(revis(a|ar|e|ão|ao)|review|olha esse diff)\b/, 'revisão: outro modelo, só o diff, com saída "sem achados".'],
  [/\b(landing|tela|layout|dashboard|tipografia|paleta|figma|ui|ux)\b/, 'UI: `impeccable` + `ui-ux-pro-max`.'],
  [/\b(seguran[çc]a|segredo|api key|token|lgpd|senha)\b/, 'segurança: regra literal; `security-review`.'],
  [/\b(onde fica|como funciona|quem chama|arquitetura)\b/, 'código: `graphify query "<pergunta>"` antes de abrir arquivos.'],
];

try {
  const e = ler();
  const p = String(e.prompt || e.user_prompt || '').toLowerCase();
  if (!p) sair();
  const hits = [];
  for (const [re, msg] of REGRAS) { if (re.test(p)) hits.push(msg); if (hits.length >= 2) break; }
  if (!hits.length) sair();
  sair({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: '[workflow] ' + hits.join(' | ') } });
} catch { sair(); }
