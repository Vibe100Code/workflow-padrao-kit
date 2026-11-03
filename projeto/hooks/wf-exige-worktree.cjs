#!/usr/bin/env node
// PreToolUse (Edit|Write|MultiEdit|NotebookEdit): não se edita sem uma tarefa aberta.
//
// O QUE ISTO IMPEDE, e por que é hook e não regra escrita (2026-08-10): editar
// direto na `main`, e uma tarefa nova nascer por cima da anterior sem ninguém
// notar. As duas coisas aconteceram sem dar erro e só apareceram depois: uma
// branch publicada VAZIA e 33 trocas de branch no diretório compartilhado.
// Regra escrita depende de alguém lembrar; isto recusa.
//
// BLOQUEIA em exatamente três estados:
//   · a branch é `main` / `master`
//   · HEAD solto (detached)
//   · a marca da branch (`branch.<b >.wfTarefa`) é `concluida`
//
// LIBERA no resto, inclusive quando NÃO HÁ marca. Branch criada antes disto, ou
// à mão, não pode ficar refém de um mecanismo que ela não conhece: gate novo que
// trava trabalho em andamento é gate que alguém desliga no mesmo dia.
//
// NÃO INFERIR PELO GIT. "A branch já está na main" é verdade tanto para a tarefa
// CONCLUÍDA quanto para a RECÉM-ABERTA (que tem zero commits, por construção):
// bloquearia justo quem acabou de abrir. Por isso a marca é explícita, escrita
// por `scripts/tarefa.mjs` e `scripts/nova-sessao.mjs`.
//
// Decide pelo diretório do ARQUIVO (a sessão pode estar no principal e editar na
// worktree por caminho absoluto). Fora do repo (scratchpad, /tmp) libera.
// Escape consciente: WF_SEM_TRAVA=1. Qualquer erro do próprio hook: libera.
const fs = require('node:fs');
const path = require('node:path');
const { ler, sair, git } = require('./_comum.cjs');

function negar(motivo) {
  sair({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: motivo } });
}

try {
  if (process.env.WF_SEM_TRAVA === '1') sair();
  const e = ler();
  const ti = e.tool_input || {};
  const alvo = ti.file_path || ti.notebook_path;
  if (!alvo) sair();
  const abs = path.resolve(e.cwd || process.cwd(), alvo);
  let dir = path.dirname(abs);
  while (!fs.existsSync(dir) && path.dirname(dir) !== dir) dir = path.dirname(dir);
  const raiz = git(dir, 'rev-parse', '--show-toplevel');
  if (!raiz) sair();
  // Repositório sem nenhum commit (Dia 1): nova-sessao exige o commit inicial,
  // então travar aqui era um beco sem saída (revisão 2026-11-02).
  if (!git(dir, 'rev-parse', '--verify', '--quiet', 'HEAD')) sair();
  const branch = git(dir, 'rev-parse', '--abbrev-ref', 'HEAD') || git(dir, 'symbolic-ref', '--short', 'HEAD');
  if (!branch) sair();

  const COMO = [
    '',
    'Abra a tarefa antes de editar:',
    '  node scripts/nova-sessao.mjs <tipo>/<nome>',
    '  node scripts/tarefa.mjs abrir <tipo>/<nome>',
    '  (tipo: feature|fix|chore|docs|refactor|perf|style)',
    'e edite os arquivos dentro da worktree da sessão.',
  ].join('\n');

  if (branch === 'main' || branch === 'master') {
    negar(`Você está na \`${branch}\`: nada é editado direto nela.${COMO}`);
  }
  if (branch === 'HEAD') {
    negar(`HEAD solto (detached): commit aqui não pertence a branch nenhuma.${COMO}`);
  }

  const marca = git(dir, 'config', `branch.${branch}.wfTarefa`);
  if (marca === 'concluida') {
    negar(
      `A tarefa da branch \`${branch}\` já foi CONCLUÍDA e integrada. ` +
      `Editar aqui empilharia trabalho novo sobre uma tarefa encerrada.${COMO}`,
    );
  }

  sair();
} catch { sair(); }
