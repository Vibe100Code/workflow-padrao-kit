// Utilitários dos hooks do workflow padrão. Tudo falha ABERTO: hook quebrado
// não pode travar a sessão. Sem rede, sem build: hook lento é hook desligado.
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

function ler() {
  try { const j = JSON.parse(fs.readFileSync(0, 'utf8')); return j && typeof j === 'object' ? j : {}; }
  catch { return {}; }
}
function sair(obj) { if (obj) process.stdout.write(JSON.stringify(obj)); process.exit(0); }
function git(cwd, ...a) {
  try { return execFileSync('git', a, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 3000 }).trim(); }
  catch { return ''; }
}
function principal(cwd) {
  for (const b of ['main', 'master']) if (git(cwd, 'rev-parse', '--verify', '--quiet', b)) return b;
  return 'main';
}
module.exports = { ler, sair, git, principal };
