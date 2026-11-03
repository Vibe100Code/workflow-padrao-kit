#!/usr/bin/env node
// Revisor externo que chama a API da Anthropic DIRETO, para gastar o crédito promocional da
// organização (vale para a API e o Agent SDK, não para o Claude Code) e poupar o limite do plano.
//
// uso:
//   node scripts/revisar-pela-api.mjs --base <ref> [--head HEAD] [--modelo claude-sonnet-5-5|claude-opus-5-5]
//        [--foco "<classes de defeito>"] [--esforco low|medium|high|xhigh|max] -o <saida.md>
//
// Teto de saída e streaming (medido em 2026-10-28): o Sonnet 5.5 pensa por padrão e o pensamento
// conta no max_tokens. Com teto 8000, o diff d5ca9c0fc...8a3f246b0 (75 mil caracteres) gastou os
// 8000 em pensamento e parou por `max_tokens` sem bloco de texto; o script gravava "(resposta vazia)"
// e saía 0. Com teto 16000 o mesmo diff pensou 13774 tokens em 104 s. O teto subiu para 64000 e o
// pedido vai em streaming, porque uma resposta longa sem streaming passa do tempo do fetch. Resposta
// sem texto ou com stop_reason diferente de end_turn agora é FALHA (código 1), nunca parecer.
//
// A chave NUNCA vem de argumento nem de arquivo: é lida em tempo de execução do Keychain
// (`security find-generic-password -a "$USER" -s anthropic-api-key -w`) e vai só para o cabeçalho
// `x-api-key`. Nunca é impressa, gravada nem logada. Sem a marca `anthropic-beta: claude-code-*`
// (o crédito promocional a recusa).
//
// Ganchos de teste (sem rede externa): REVISOR_API_CHAVE_TESTE (chave falsa, dispensa o Keychain)
// e REVISOR_API_URL (aponta para um servidor local).

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const URL_PADRAO = "https://api.anthropic.com/v1/messages";
export const LIMITE_DO_DIFF = 150_000;
export const MODELO_PADRAO = "claude-sonnet-5-5";
export const MAX_TOKENS_SAIDA = 64000;
export const ESFORCOS = ["low", "medium", "high", "xhigh", "max"];

// USD por milhão de tokens. ESTIMATIVA: fonte, a página de preços da Anthropic
// (platform.claude.com/docs/en/about-claude/pricing), conferida em 2026-10-10.
export const PRECOS = {
  "claude-sonnet-5-5": { entrada: 2, escrita: 2.5, leitura: 0.1, saida: 10 },
  "claude-opus-5-5": { entrada: 4, escrita: 5, leitura: 0.2, saida: 20 },
};

function acharRaiz() {
  try {
    return execFileSync("git", ["rev-parse", "--path-format=absolute", "--show-toplevel"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return resolve(dirname(fileURLToPath(import.meta.url)), "..");
  }
}

const RAIZ = acharRaiz();

const PRIORIDADE_DE_CODIGO = [
  /^src\//,
  /^lib\//,
  /^app\//,
  /^scripts\//,
  /\.(ts|tsx|js|mjs|py|go|rs|java|rb|sql)$/,
];

export function ehCodigo(caminho) {
  return PRIORIDADE_DE_CODIGO.some((r) => r.test(caminho));
}

export function fatiarDiff(diff) {
  const partes = diff.split(/^(?=diff --git )/m).filter((p) => p.startsWith("diff --git "));
  return partes.map((texto) => {
    const m = /^diff --git a\/(.+?) b\/(.+)$/m.exec(texto);
    return { caminho: m ? m[2] : "?", texto };
  });
}

// Arquivos de código primeiro. Um arquivo que não cabe INTEIRO é omitido e listado, nunca cortado
// no meio (cortar fabricaria achado sobre meia função).
export function cortarDiff(diff, limite = LIMITE_DO_DIFF) {
  const arquivos = fatiarDiff(diff);
  const ordenados = [
    ...arquivos.filter((a) => ehCodigo(a.caminho)),
    ...arquivos.filter((a) => !ehCodigo(a.caminho)),
  ];
  let usado = 0;
  const incluidos = [];
  const omitidos = [];
  for (const a of ordenados) {
    if (usado + a.texto.length <= limite) {
      incluidos.push(a);
      usado += a.texto.length;
    } else {
      omitidos.push(a.caminho);
    }
  }
  return {
    texto: incluidos.map((a) => a.texto).join(""),
    omitidos,
    incluidos: incluidos.map((a) => a.caminho),
    total: arquivos.length,
  };
}

export function secaoDoClaude(md) {
  const ini = md.indexOf("## Convenções e estilo");
  if (ini < 0) return md.slice(0, 4000).trim();
  const resto = md.slice(ini + 3);
  const fim = resto.search(/^## /m);
  return md.slice(ini, fim < 0 ? undefined : ini + 3 + fim).trim();
}

export function montarRegras({ claudeMd, regrasExternas, foco }) {
  return [
    "Você é um revisor de código EXTERNO e INDEPENDENTE deste repositório.",
    "Responda SEMPRE em pt-BR. Revisão é SOMENTE LEITURA: você recebe um diff e opina; não há ferramentas.",
    "",
    "REGRAS DE SAÍDA (fechadas):",
    "- Liste achados classificados CRÍTICO, ALTO, MÉDIO ou BAIXO.",
    "- Cada achado traz `arquivo:linha` (linha do arquivo NOVO, pelos cabeçalhos @@ do diff), o CENÁRIO concreto em que quebra e o CONSERTO sugerido.",
    "- Se não houver defeito real, responda exatamente: `sem achados`. NÃO invente achado para ter o que entregar.",
    "- Não comente o que o diff não tocou. Não repita o diff. Seja direto e curto.",
    "- Seu parecer é dado, não veredito: quem recebe vai reconferir cada achado no código.",
    foco ? `\nFOCO desta revisão (classes de defeito a procurar com prioridade): ${foco}` : "",
    claudeMd ? `\nCONVENÇÕES DO REPOSITÓRIO (trecho do CLAUDE.md):\n${claudeMd}` : "",
    regrasExternas ? `\nREGRAS DE REVISORES EXTERNOS:\n${regrasExternas}` : "",
  ].filter(Boolean).join("\n");
}

export function montarPedido({ modelo, regras, diffCortado, base, head, esforco }) {
  const aviso = diffCortado.omitidos.length
    ? `\n\nAVISO: o diff passou do limite e ${diffCortado.omitidos.length} arquivo(s) ficaram FORA da revisão: ${diffCortado.omitidos.join(", ")}. Diga no início do parecer que a cobertura é parcial.`
    : "";
  return {
    model: modelo,
    max_tokens: MAX_TOKENS_SAIDA,
    stream: true,
    ...(esforco ? { output_config: { effort: esforco } } : {}),
    system: [{ type: "text", text: regras, cache_control: { type: "ephemeral" } }],
    messages: [
      {
        role: "user",
        content: `Revise o diff \`${base}...${head}\` (${diffCortado.incluidos.length} de ${diffCortado.total} arquivos).${aviso}\n\n\`\`\`diff\n${diffCortado.texto}\n\`\`\``,
      },
    ],
  };
}

export function montarCabecalhos(chave) {
  return {
    "content-type": "application/json",
    "x-api-key": chave,
    "anthropic-version": "2023-06-01",
  };
}

export function lerChave(env = process.env) {
  if (env.REVISOR_API_CHAVE_TESTE) return env.REVISOR_API_CHAVE_TESTE;
  try {
    const c = execFileSync(
      "security",
      ["find-generic-password", "-a", env.USER ?? "", "-s", "anthropic-api-key", "-w"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (c) return c;
  } catch {
    // Sem Keychain (Linux) ou sem item: tenta a variável de ambiente.
  }
  // Alternativa fora do macOS: ANTHROPIC_API_KEY vinda de um .env fora do git
  // ou do gerenciador de segredos (docs/CONECTAR-APIS.md).
  if (env.ANTHROPIC_API_KEY) return env.ANTHROPIC_API_KEY;
  return null;
}

export function custoEstimado(modelo, uso) {
  const p = PRECOS[modelo];
  const e = uso.input_tokens ?? 0;
  const s = uso.output_tokens ?? 0;
  const w = uso.cache_creation_input_tokens ?? 0;
  const r = uso.cache_read_input_tokens ?? 0;
  const usd = p ? (e * p.entrada + w * p.escrita + r * p.leitura + s * p.saida) / 1e6 : null;
  return { entrada: e, saida: s, escrita: w, leitura: r, usd, preco: p ?? null };
}

export function resumoDoCusto(modelo, uso) {
  const c = custoEstimado(modelo, uso);
  const pensamento = uso.output_tokens_details?.thinking_tokens;
  const linhas = [
    `modelo: ${modelo}`,
    `tokens: entrada ${c.entrada} | saída ${c.saida}${pensamento == null ? "" : ` (pensamento ${pensamento})`} | cache escrito ${c.escrita} | cache lido ${c.leitura}`,
  ];
  if (c.preco) {
    linhas.push(
      `preço (USD/MTok, ESTIMATIVA, fonte: página de preços da Anthropic): entrada ${c.preco.entrada} | cache escrito ${c.preco.escrita} | cache lido ${c.preco.leitura} | saída ${c.preco.saida}`,
      `custo estimado: US$ ${c.usd.toFixed(4)} (estimativa)`,
    );
  } else {
    linhas.push("custo estimado: indisponível (modelo sem preço conhecido)");
  }
  return linhas.join("\n");
}

export async function chamarApi({ url, chave, corpo, fetchImpl = fetch }) {
  const resp = await fetchImpl(url, {
    method: "POST",
    headers: montarCabecalhos(chave),
    body: JSON.stringify(corpo),
  });
  const texto = await resp.text();
  if (!resp.ok) throw new Error(`a API respondeu ${resp.status}: ${texto.slice(0, 500)}`);
  if ((resp.headers.get("content-type") ?? "").includes("text/event-stream")) return montarDoFluxo(texto);
  return JSON.parse(texto);
}

// Remonta a mensagem a partir dos eventos SSE do streaming (message_start, content_block_*,
// message_delta, error).
export function montarDoFluxo(texto) {
  let msg = { content: [], usage: {} };
  for (const linha of texto.split("\n")) {
    if (!linha.startsWith("data:")) continue;
    const ev = JSON.parse(linha.slice(5));
    if (ev.type === "message_start") msg = { ...ev.message, content: [] };
    else if (ev.type === "content_block_start") msg.content[ev.index] = { ...ev.content_block };
    else if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") msg.content[ev.index].text += ev.delta.text;
    else if (ev.type === "message_delta") {
      msg.stop_reason = ev.delta.stop_reason;
      msg.usage = { ...msg.usage, ...ev.usage };
    } else if (ev.type === "error") throw new Error(`a API interrompeu o fluxo: ${JSON.stringify(ev.error).slice(0, 500)}`);
  }
  return msg;
}

// Parecer só existe com texto e fim natural. max_tokens, refusal, pause_turn ou resposta só de
// pensamento viram falha explícita, nunca "(resposta vazia)" com código 0.
export function avaliarResposta(resposta) {
  const parecer = (resposta.content ?? [])
    .filter((b) => b?.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
  const tipos = (resposta.content ?? []).map((b) => b?.type).join(", ") || "nenhum";
  if (resposta.stop_reason !== "end_turn") {
    return { erro: `a API parou por ${resposta.stop_reason ?? "motivo ausente"} (blocos: ${tipos}); parecer descartado por estar incompleto` };
  }
  if (!parecer) return { erro: `a API terminou sem bloco de texto (blocos: ${tipos})` };
  return { parecer };
}

function lerArgs(argv) {
  const a = { head: "HEAD", modelo: MODELO_PADRAO };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--base") a.base = argv[++i];
    else if (k === "--head") a.head = argv[++i];
    else if (k === "--modelo") a.modelo = argv[++i];
    else if (k === "--foco") a.foco = argv[++i];
    else if (k === "--esforco") a.esforco = argv[++i];
    else if (k === "-o") a.saida = argv[++i];
    else throw new Error(`argumento desconhecido: ${k}`);
  }
  return a;
}

function sair(msg, codigo = 1) {
  process.stderr.write(`${msg}\n`);
  process.exit(codigo);
}

export async function main(argv = process.argv.slice(2), env = process.env) {
  let a;
  try {
    a = lerArgs(argv);
  } catch (e) {
    sair(e.message, 2);
  }
  if (!a.base || !a.saida) {
    sair(
      'uso: node scripts/revisar-pela-api.mjs --base <ref> [--head HEAD] [--modelo claude-sonnet-5-5|claude-opus-5-5] [--foco "<classes>"] [--esforco low|medium|high|xhigh|max] -o <saida.md>',
      2,
    );
  }
  if (a.esforco && !ESFORCOS.includes(a.esforco)) sair(`esforço desconhecido: ${a.esforco} (use ${ESFORCOS.join(", ")})`, 2);
  if (!PRECOS[a.modelo]) sair(`modelo desconhecido: ${a.modelo} (use ${Object.keys(PRECOS).join(" ou ")})`, 2);

  const chave = lerChave(env);
  if (!chave) {
    sair(
      'chave ausente: guarde-a no Keychain com `security add-generic-password -a "$USER" -s anthropic-api-key -w` (a chave é pedida no terminal) ou exporte ANTHROPIC_API_KEY (docs/CONECTAR-APIS.md).',
    );
  }

  const diff = execFileSync("git", ["diff", `${a.base}...${a.head}`], {
    cwd: RAIZ,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (!diff.trim()) sair(`diff vazio entre ${a.base} e ${a.head}: nada a revisar.`, 0);

  const ler = (rel) => (existsSync(join(RAIZ, rel)) ? readFileSync(join(RAIZ, rel), "utf8") : "");
  const cortado = cortarDiff(diff);
  const regras = montarRegras({
    claudeMd: secaoDoClaude(ler("CLAUDE.md")),
    regrasExternas: ler(".claude/rules/revisores-externos.md"),
    foco: a.foco,
  });
  const corpo = montarPedido({ modelo: a.modelo, regras, diffCortado: cortado, base: a.base, head: a.head, esforco: a.esforco });

  let resposta;
  try {
    resposta = await chamarApi({ url: env.REVISOR_API_URL || URL_PADRAO, chave, corpo });
  } catch (e) {
    sair(`falha na chamada: ${String(e.message).split(chave).join("[chave]")}`);
  }

  const { parecer, erro } = avaliarResposta(resposta);
  const custo = resumoDoCusto(a.modelo, resposta.usage ?? {});
  const cobertura = cortado.omitidos.length
    ? `\n\n> Cobertura parcial: ${cortado.omitidos.length} arquivo(s) fora do limite de ${LIMITE_DO_DIFF} caracteres: ${cortado.omitidos.join(", ")}`
    : "";
  if (erro) {
    writeFileSync(resolve(a.saida), `FALHA: ${erro}\n\n---\n${custo}\n`);
    sair(`falha: ${erro}\n${custo}`);
  }
  writeFileSync(resolve(a.saida), `${parecer}${cobertura}\n\n---\n${custo}\n`);
  process.stdout.write(`parecer gravado em ${a.saida}\n${custo}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => sair(`erro: ${e.message}`));
}
