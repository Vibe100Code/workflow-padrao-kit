#!/usr/bin/env bash
# Prova o revisar-pela-api sem rede nem custo: servidor SSE local + chave falsa.
# Confere: streaming ligado, chave no cabeçalho, parecer gravado, falha quando a resposta vem vazia.
set -uo pipefail
KIT=$(cd "$(dirname "$0")/.." && pwd); T=$(mktemp -d); ok=0; falha=0
confere() { if grep -qE "$3" <<<"$2"; then echo "PASSA  $1"; ok=$((ok+1)); else echo "FALHA  $1 → ${2:0:200}"; falha=$((falha+1)); fi; }
cd "$T" && git init -q -b main && echo a > a.txt && git add a.txt && git -c user.name=t -c user.email=t@t commit -qm a && echo b >> a.txt && git -c user.name=t -c user.email=t@t commit -qam b
cat > srv.mjs <<'JS'
import http from 'node:http';
const vazio = process.argv[2] === 'vazio';
const ev = (t, d) => `event: ${t}\ndata: ${JSON.stringify(d)}\n\n`;
http.createServer((q, r) => { let c = ''; q.on('data', (x) => (c += x)); q.on('end', () => {
  const j = JSON.parse(c); console.log('stream=' + j.stream + ' chave=' + (q.headers['x-api-key'] ? 'sim' : 'nao'));
  r.writeHead(200, { 'content-type': 'text/event-stream' });
  r.end(ev('message_start', { type: 'message_start', message: { usage: { input_tokens: 100, output_tokens: 0 } } }) +
    (vazio ? '' : ev('content_block_start', { type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } }) +
      ev('content_block_delta', { type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: 'sem achados' } }) +
      ev('content_block_stop', { type: 'content_block_stop', index: 0 })) +
    ev('message_delta', { type: 'message_delta', delta: { stop_reason: vazio ? 'max_tokens' : 'end_turn' }, usage: { output_tokens: 5 } }) +
    ev('message_stop', { type: 'message_stop' }));
  setTimeout(() => process.exit(0), 100); }); }).listen(Number(process.argv[3]));
JS
roda() { node srv.mjs "$1" "$2" > srv.log & sleep 0.5
  REVISOR_API_CHAVE_TESTE=falsa REVISOR_API_URL="http://127.0.0.1:$2/v1/messages" node "$KIT/scripts/revisar-pela-api.mjs" --base HEAD~1 -o rev.md >/dev/null 2>&1; echo $?; wait; }
P=$((20000 + RANDOM % 20000))
rc=$(roda cheio $P); confere "resposta normal sai 0" "$rc" '^0$'
confere "pedido em streaming com chave no cabeçalho" "$(cat srv.log)" 'stream=true chave=sim'
confere "parecer gravado no arquivo" "$(cat rev.md)" 'sem achados'
rm -f rev.md; rc=$(roda vazio $((P+1))); confere "resposta vazia é FALHA (nunca parecer)" "$rc" '^[1-9]'
echo; echo "RESULTADO: $ok passaram, $falha falharam"; [ $falha -eq 0 ]
