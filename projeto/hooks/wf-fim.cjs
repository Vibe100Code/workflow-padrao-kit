#!/usr/bin/env node
// Stop: lembra de fechar o ciclo da tarefa quando há trabalho pronto e parado.
//
// O que ele evita é o defeito mais caro e silencioso (medido em 2026-07-30):
// trabalho commitado, publicado na branch, e NUNCA integrado. Nove commits
// ficaram assim por dias e ninguém percebeu, porque nada falha: o produto
// simplesmente continua servindo a versão anterior.
//
// FALA SÓ QUANDO HÁ O QUE DIZER: tarefa marcada como `aberta` (`wfTarefa`),
// commits fora da base e árvore limpa. Em turno de conversa, em tarefa
// recém-aberta e com trabalho pela metade, ele é mudo: aviso que aparece sempre
// vira ruído.
//
// NUNCA `decision: "block"`. Bloquear a parada faria o agente continuar, o hook
// disparar de novo no fim dessa continuação, e assim por diante (laço).
//
// SEM REDE. Roda ao fim de todo turno; um `git fetch` aqui vira latência
// permanente, e ref local desatualizada só erra para MENOS (deixa de avisar),
// que é a direção segura.
const { ler, sair, git, principal } = require('./_comum.cjs');

try {
  const e = ler();
  if (e.stop_hook_active) sair();
  const cwd = e.cwd || process.cwd();
  const branch = git(cwd, 'rev-parse', '--abbrev-ref', 'HEAD');
  const base = principal(cwd);
  if (!branch || branch === 'HEAD' || branch === base || branch === 'main' || branch === 'master') sair();
  if (git(cwd, 'config', `branch.${branch}.wfTarefa`) !== 'aberta') sair();
  if (git(cwd, 'status', '--porcelain')) sair();
  const ref = git(cwd, 'rev-parse', '--verify', '--quiet', `origin/${base}`) ? `origin/${base}` : base;
  const n = Number(git(cwd, 'rev-list', '--count', `${ref}..${branch}`));
  if (!(n > 0)) sair();
  const lista = git(cwd, 'log', '--oneline', '-n', '10', `${ref}..${branch}`);
  sair({
    hookSpecificOutput: {
      hookEventName: 'Stop',
      additionalContext: [
        '',
        `TAREFA \`${branch}\` COM ${n} COMMIT(S) PRONTO(S) E NÃO INTEGRADO(S) em ${ref}:`,
        lista.split('\n').map((l) => '  ' + l).join('\n'),
        '',
        'Se a tarefa terminou, feche o ciclo com o dono, nesta ordem:',
        '  1. diga o que mudou e o que ficou em aberto;',
        '  2. PERGUNTE se ele quer integrar na base (é decisão dele, nunca sua);',
        '  3. se ele autorizar: node scripts/integrar.mjs',
        '  4. depois de integrada: node scripts/tarefa.mjs concluir',
        '',
        'Branch publicada não é entrega feita.',
        '',
      ].join('\n'),
    },
  });
} catch { sair(); }
