#!/usr/bin/env node
// SessionStart: injeta .claude/regras-de-inicio.md (~1 KB, cortado em 1500 B)
// e avisa, só quando se aplica: diretório principal com várias worktrees
// (outra sessão troca o branch sem aviso) e árvore atrás da origin/main.
const fs = require('node:fs');
const path = require('node:path');
const { ler, sair, git, principal } = require('./_comum.cjs');

try {
  const e = ler();
  const cwd = e.cwd || process.cwd();
  const raiz = process.env.CLAUDE_PROJECT_DIR || git(cwd, 'rev-parse', '--show-toplevel') || cwd;
  const avisos = [];

  const meu = git(cwd, 'rev-parse', '--path-format=absolute', '--git-dir');
  const comum = git(cwd, 'rev-parse', '--path-format=absolute', '--git-common-dir');
  if (meu && meu === comum) {
    const n = git(cwd, 'worktree', 'list', '--porcelain').split('\n').filter((l) => l.startsWith('worktree ')).length;
    if (n >= 2) avisos.push(`0. PARE: diretório PRINCIPAL com ${n} checkouts. Antes de editar: node scripts/nova-sessao.mjs <tipo>/<nome> e trabalhe no cd que ele imprime.`);
  }
  const base = principal(cwd);
  const atras = Number(git(cwd, 'rev-list', '--count', `HEAD..origin/${base}`));
  if (atras > 0) avisos.push(`0-A. Árvore ${atras} commit(s) atrás de origin/${base}: medição aqui não descreve o produto de hoje.`);

  // Projeto sem direcionamento: o agente chuta público, marca e objetivo. Avisa só
  // enquanto o BRIEFING.md não existe ou está quase todo "a confirmar".
  try {
    const b = path.join(raiz, 'BRIEFING.md');
    const n = fs.existsSync(b) ? (fs.readFileSync(b, 'utf8').match(/a confirmar/gi) || []).length : -1;
    if (n === -1) avisos.push('0-B. Projeto sem BRIEFING.md: rode a skill `iniciar-projeto` (questionário) antes da primeira entrega.');
    else if (n >= 15) avisos.push(`0-B. BRIEFING.md com ${n} itens "a confirmar": rode a skill \`iniciar-projeto\` antes da primeira entrega.`);
  } catch { /* segue */ }

  // Papéis vêm do workflow.config.json (lugar único): nenhum hook ou regra fixa
  // nome de ferramenta. Avisa se o implementador também aparece como revisor.
  try {
    const p = JSON.parse(fs.readFileSync(path.join(raiz, 'workflow.config.json'), 'utf8')).papeis;
    if (p) {
      const nome = (x) => (x && (x.ferramenta || x)) || 'a definir';
      const rev = (p.revisores || []).map(nome);
      avisos.push(`PAPÉIS (workflow.config.json): coordena ${nome(p.coordenador)} · implementa ${nome(p.implementador)} · revisa ${rev.join(' ou ') || 'a definir'}. Quem construiu não revisa o próprio trabalho na mesma conversa.`);
      if (rev.includes(nome(p.implementador))) avisos.push(`0-C. ${nome(p.implementador)} implementa e revisa: vale só em contexto limpo (agente revisor ou API, sem o histórico de quem implementou); outra IA é o recomendado.`);
    }
  } catch { /* sem config ou sem papéis: segue */ }

  let regras = '';
  try { regras = fs.readFileSync(path.join(raiz, '.claude', 'regras-de-inicio.md'), 'utf8').slice(0, 1500); } catch { /* sem arquivo */ }
  const texto = avisos.concat(regras ? [regras.trim()] : []).join('\n');
  if (!texto) sair();
  sair({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: texto }, suppressOutput: true });
} catch { sair(); }
