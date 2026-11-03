#!/usr/bin/env node
// PreToolUse (Grep|Glob|Bash): a PRIMEIRA busca ampla da sessão é negada até
// haver um `graphify query|path|explain`. Depois libera. Ler arquivo com
// caminho e buscar num arquivo só nunca bloqueiam.
// Falha aberta: sem graph.json, sem binário graphify, erro, ou após 3 negações
// seguidas (grafo quebrado não trava a sessão). Marca por sessão/subagente.
// Teste: WF_GRAFO_CACHE, WF_GRAPHIFY_PRESENTE=0|1, WF_SEM_GRAFO=1.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { ler, sair } = require('./_comum.cjs');

const MAX = 3;
const CACHE = process.env.WF_GRAFO_CACHE || path.join(os.homedir(), '.cache', 'wf-graphify');
const CONSULTA = /(^|[\s;&|(])graphify\s+(query|path|explain)\b/;
const AMPLA = /(^|[\s;&|(])(rg|ag|ack|git\s+grep|find)\s|(^|[\s;&|(])e?grep\s+(-\w*[rR]\w*|--recursive)\b/;

function achaGrafo(cwd) {
  for (const b of [process.env.CLAUDE_PROJECT_DIR, cwd].filter(Boolean)) {
    let d = path.resolve(b);
    for (let i = 0; i < 8; i++) {
      const g = path.join(d, 'graphify-out', 'graph.json');
      if (fs.existsSync(g)) return g;
      if (path.dirname(d) === d) break;
      d = path.dirname(d);
    }
  }
  return null;
}
function temGraphify() {
  if (process.env.WF_GRAPHIFY_PRESENTE) return process.env.WF_GRAPHIFY_PRESENTE === '1';
  const dirs = (process.env.PATH || '').split(path.delimiter).concat([path.join(os.homedir(), '.local', 'bin')]);
  return dirs.some((d) => d && fs.existsSync(path.join(d, 'graphify')));
}
function negar(m) {
  sair({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: m } });
}

try {
  if (process.env.WF_SEM_GRAFO === '1') sair();
  const e = ler();
  const f = e.tool_name;
  const ti = e.tool_input || {};
  const chave = String(e.agent_id || e.session_id || '').replace(/[^A-Za-z0-9_.-]/g, '');
  if (!chave || !f) sair();
  const marca = path.join(CACHE, chave);
  const cmd = f === 'Bash' ? String(ti.command || '') : '';

  if (f === 'Bash' && CONSULTA.test(cmd)) {
    fs.mkdirSync(CACHE, { recursive: true });
    fs.writeFileSync(marca, 'ok');
    sair();
  }
  let ampla = false;
  if (f === 'Glob') ampla = true;
  else if (f === 'Bash') ampla = AMPLA.test(cmd);
  else if (f === 'Grep') {
    ampla = true;
    const alvo = ti.path || ti.file_path;
    try { if (alvo && fs.statSync(path.resolve(e.cwd || process.cwd(), alvo)).isFile()) ampla = false; } catch { /* diretório: ampla */ }
  }
  if (!ampla) sair();

  const grafo = achaGrafo(e.cwd);
  if (!grafo || !temGraphify()) sair();
  let estado = '';
  try { estado = fs.readFileSync(marca, 'utf8'); } catch { /* sem marca */ }
  if (estado === 'ok') sair();
  const n = Number(estado.replace('neg:', '')) || 0;
  if (n >= MAX) sair();
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(marca, 'neg:' + (n + 1));
  negar('Rode `graphify query "<o que procura>"` primeiro (o mapa responde onde fica X e quem chama Y); depois a busca ampla fica liberada nesta sessão. Fora da raiz, acrescente `--graph ' + grafo + '`. Ler arquivo com caminho não precisa disso.');
} catch { sair(); }
