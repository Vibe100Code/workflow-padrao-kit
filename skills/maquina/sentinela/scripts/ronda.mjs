#!/usr/bin/env node
/**
 * Sentinela: uma ronda de reconhecimento SOMENTE LEITURA sobre um alvo publico.
 *
 * Nao depende de nada alem do Node e de tres binarios que todo Mac e toda imagem Linux
 * tem: `dig`, `curl` e o TLS do proprio Node. Sem npm install, sem chave de API, sem conta.
 *
 * O QUE ELE NAO FAZ, e a lista e deliberada: nao envia payload, nao tenta login, nao
 * fuzzeia parametro, nao varre porta, nao escreve nada no alvo. Toda requisicao e um GET de
 * cabecalho ou uma consulta DNS. Isso e o que torna a ronda segura de rodar contra um site
 * que voce nao controla sem virar um ataque.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { promises as dns } from "node:dns";
import { connect } from "node:tls";

const exec = promisify(execFile);

/* ─── tempos e tentativas ────────────────────────────────────────────────────────────── */
const TIMEOUT_DIG_MS = 8000;
const TIMEOUT_CURL_MS = 15000;
const CURL_MAX_TIME_S = 12;
const TIMEOUT_TLS_MS = 8000;
const DIAS_ALERTA_CERTIFICADO = 15;
const TENTATIVAS_DIG = 4;
const BACKOFF_DIG_MS = [150, 400, 900, 1800];

/* ─── 1. Guarda de alvo (anti-SSRF) ──────────────────────────────────────────────────── */

const HOSTS_PROIBIDOS = new Set(["localhost", "localhost.localdomain", "ip6-localhost"]);
const SUFIXOS_PROIBIDOS = [".local", ".internal", ".localhost"];

const FAIXAS_IPV4_PRIVADAS = [
  { base: [10, 0, 0, 0], bits: 8 },
  { base: [172, 16, 0, 0], bits: 12 },
  { base: [192, 168, 0, 0], bits: 16 },
  { base: [169, 254, 0, 0], bits: 16 },
  { base: [127, 0, 0, 0], bits: 8 },
  { base: [100, 64, 0, 0], bits: 10 },
  { base: [0, 0, 0, 0], bits: 8 },
];

const ipv4ParaNumero = (p) => ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;

function ipv4EhPrivado(ip) {
  const partes = ip.split(".").map(Number);
  if (partes.length !== 4 || partes.some((p) => !Number.isInteger(p) || p < 0 || p > 255)) return false;
  const numero = ipv4ParaNumero(partes);
  return FAIXAS_IPV4_PRIVADAS.some(({ base, bits }) => {
    const mascara = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
    return (numero & mascara) === (ipv4ParaNumero(base) & mascara);
  });
}

function ipv6EhPrivado(ip) {
  const n = ip.toLowerCase();
  if (n === "::1" || n === "::") return true;
  if (n.startsWith("::ffff:")) {
    const embutido = n.slice(7);
    if (embutido.includes(".")) return ipv4EhPrivado(embutido);
  }
  const bloco = n.split(":")[0];
  return /^fe[89ab][0-9a-f]$/.test(bloco) || /^f[cd][0-9a-f]{2}$/.test(bloco);
}

export const ipEhPrivado = (ip) => (ip.includes(":") ? ipv6EhPrivado(ip) : ipv4EhPrivado(ip));

/**
 * O IP E RESOLVIDO UMA VEZ E FIXADO, e todo pedido seguinte usa `--resolve` com ele.
 *
 * Sem isso o alvo controla para onde cada requisicao vai: ele responde com um IP publico na
 * primeira consulta e com 127.0.0.1 na segunda, e a ferramenta passa a bater na rede de quem
 * roda a ronda. E o DNS rebinding, e a unica defesa real e nao resolver de novo.
 */
export async function alvoValido(entrada) {
  let alvo;
  try {
    alvo = new URL(entrada.includes("://") ? entrada : `https://${entrada}`);
  } catch {
    return { valido: false, motivo: "URL invalida." };
  }
  if (alvo.protocol !== "https:" && alvo.protocol !== "http:") {
    return { valido: false, motivo: "Só http e https." };
  }
  const host = alvo.hostname;
  const hostBaixo = host.toLowerCase();
  if (HOSTS_PROIBIDOS.has(hostBaixo) || SUFIXOS_PROIBIDOS.some((s) => hostBaixo.endsWith(s))) {
    return { valido: false, motivo: "Host não público." };
  }
  if (ipEhPrivado(host.replace(/^\[/, "").replace(/\]$/, ""))) {
    return { valido: false, motivo: "Host não público." };
  }
  let enderecos;
  try {
    const r = await dns.lookup(host, { all: true, verbatim: true });
    enderecos = r.map((x) => x.address);
  } catch {
    return { valido: false, motivo: "Não foi possível resolver o host." };
  }
  if (enderecos.length === 0) return { valido: false, motivo: "Host sem endereço resolvível." };
  if (enderecos.some(ipEhPrivado)) return { valido: false, motivo: "Host resolve para endereço não público." };
  return { valido: true, host, enderecos, pinado: enderecos[0] };
}

/* ─── 2. Medidas ─────────────────────────────────────────────────────────────────────── */

const aguardar = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * `medido: false` NAO E "ausente". E a distincao que separa um achado de um falso positivo.
 *
 * Uma consulta DNS que deu timeout nao diz nada sobre o SPF do dominio; tratada como ausencia,
 * ela vira um achado ALTO contra um dominio que talvez esteja perfeito. Por isso o dig tenta
 * quatro vezes com recuo, e so devolve "ausente" quando o servidor RESPONDEU vazio.
 */
export async function digTxt(nome, tipo = "TXT") {
  let ultimaVazia = false;
  for (let t = 1; t <= TENTATIVAS_DIG; t++) {
    try {
      const { stdout } = await exec("dig", ["+short", "+time=3", "+tries=1", tipo, nome], { timeout: TIMEOUT_DIG_MS });
      const registros = stdout.trim().split("\n").map((l) => l.trim()).filter(Boolean);
      if (registros.length > 0) return { medido: true, registros };
      ultimaVazia = true;
      if (t === TENTATIVAS_DIG) return { medido: true, registros: [] };
    } catch {
      ultimaVazia = false;
      if (t === TENTATIVAS_DIG) return { medido: false };
    }
    await aguardar(BACKOFF_DIG_MS[t - 1] ?? BACKOFF_DIG_MS.at(-1));
  }
  return ultimaVazia ? { medido: true, registros: [] } : { medido: false };
}

export async function curlCabecalhos(url, ipPinado) {
  if (ipEhPrivado(ipPinado)) return { medido: false };
  const alvo = new URL(url);
  const porta = alvo.port || (alvo.protocol === "http:" ? "80" : "443");
  try {
    const { stdout } = await exec(
      "curl",
      ["-sSI", "--max-time", String(CURL_MAX_TIME_S), "--resolve", `${alvo.hostname}:${porta}:${ipPinado}`, url],
      { timeout: TIMEOUT_CURL_MS },
    );
    const linhas = stdout.split(/\r?\n/);
    const status = Number((linhas[0].match(/\s(\d{3})\s/) || [])[1] || 0);
    if (!status) return { medido: false };
    const headers = {};
    for (const linha of linhas.slice(1)) {
      const i = linha.indexOf(":");
      if (i > 0) headers[linha.slice(0, i).trim().toLowerCase()] = linha.slice(i + 1).trim();
    }
    return { medido: true, status, headers };
  } catch {
    return { medido: false };
  }
}

export function tlsDoHost(host, ipPinado) {
  if (ipEhPrivado(ipPinado)) return Promise.resolve({ emissor: null, validoAte: null, alpn: null });
  return new Promise((resolve) => {
    const socket = connect(
      { host: ipPinado, port: 443, servername: host, timeout: TIMEOUT_TLS_MS, ALPNProtocols: ["h2", "http/1.1"] },
      () => {
        const cert = socket.getPeerCertificate();
        const alpn = socket.alpnProtocol || null;
        socket.end();
        resolve({
          emissor: cert?.issuer ? cert.issuer.O || cert.issuer.CN || "?" : "?",
          validoAte: cert?.valid_to || null,
          alpn,
        });
      },
    );
    socket.on("error", () => resolve({ emissor: null, validoAte: null, alpn: null }));
    socket.on("timeout", () => {
      socket.destroy();
      resolve({ emissor: null, validoAte: null, alpn: null });
    });
  });
}

/* ─── 3. Domínio registrável ─────────────────────────────────────────────────────────── */

const SUFIXOS_PUBLICOS = new Set([
  "br", "com.br", "app.br", "net.br", "org.br", "gov.br", "edu.br",
  "blog.br", "dev.br", "eco.br", "art.br",
  "com", "net", "org", "io", "dev", "app", "co", "ai", "me", "xyz",
]);

export function dominioRegistravel(host) {
  const r = host.replace(/\.$/, "").toLowerCase().split(".");
  for (let i = 1; i < r.length; i++) {
    if (SUFIXOS_PUBLICOS.has(r.slice(i).join("."))) return r.slice(i - 1).join(".");
  }
  return r.slice(-2).join(".");
}

/* ─── 4. Leitura dos registros ───────────────────────────────────────────────────────── */

export function analisarSpf(resultado) {
  if (!resultado.medido) return { medido: false };
  const bruto = resultado.registros.find((r) => /v=spf1/i.test(r)) ?? null;
  return {
    medido: true,
    existe: !!bruto,
    bruto,
    cobreGoogle: !!bruto && /_spf\.google\.com/i.test(bruto),
    cobreResend: !!bruto && /(amazonses|resend)/i.test(bruto),
  };
}

export function lerDmarc(resultado) {
  if (!resultado.medido) return { medido: false };
  const bruto = resultado.registros.find((r) => /v=DMARC1/i.test(r)) ?? null;
  const policy = bruto ? (bruto.match(/\bp=([a-z]+)/i) || [])[1]?.toLowerCase() ?? null : null;
  return { medido: true, existe: !!bruto, bruto, policy };
}

export function diretivaCsp(csp, nome) {
  if (!csp) return null;
  const parte = csp.split(";").map((p) => p.trim()).find((p) => p.toLowerCase().startsWith(nome + " "));
  return parte ?? null;
}

/* ─── 5. Achados ─────────────────────────────────────────────────────────────────────── */

const CABECALHOS_SEGURANCA = [
  { chave: "strict-transport-security", ref: "HSTS-000", gravidade: "MEDIO", titulo: "Sem HSTS",
    oQueE: "Sem Strict-Transport-Security, o navegador aceita voltar para HTTP puro, abrindo espaço para downgrade e ataques de rede (sslstrip).",
    conserto: "Emitir Strict-Transport-Security: max-age=31536000; includeSubDomains; preload." },
  { chave: "x-frame-options", ref: "XFO-000", gravidade: "MEDIO", titulo: "Sem X-Frame-Options",
    oQueE: "Sem X-Frame-Options (ou frame-ancestors na CSP), a página pode ser carregada dentro de um iframe de outro site, o que abre espaço para clickjacking.",
    conserto: "Emitir X-Frame-Options: DENY (ou SAMEORIGIN) ou a diretiva equivalente frame-ancestors na CSP." },
  { chave: "x-content-type-options", ref: "XCTO-000", gravidade: "BAIXO", titulo: "Sem X-Content-Type-Options",
    oQueE: "Sem X-Content-Type-Options: nosniff, navegadores antigos podem tentar adivinhar o tipo do conteúdo e executar como script um arquivo que deveria ser dado inerte.",
    conserto: "Emitir X-Content-Type-Options: nosniff." },
  { chave: "referrer-policy", ref: "REFPOL-000", gravidade: "BAIXO", titulo: "Sem Referrer-Policy",
    oQueE: "Sem Referrer-Policy, o navegador usa o próprio padrão para o que vaza na URL de origem ao clicar em links externos, e isso é inconsistente entre navegadores.",
    conserto: "Emitir Referrer-Policy: strict-origin-when-cross-origin (ou mais restritivo)." },
  { chave: "permissions-policy", ref: "PERMPOL-000", gravidade: "INFO", titulo: "Sem Permissions-Policy",
    oQueE: "Sem Permissions-Policy, a página não declara quais APIs sensíveis do navegador (câmera, microfone, geolocalização) estão desligadas por padrão.",
    conserto: "Emitir Permissions-Policy restringindo o que a página e um eventual iframe embutido podem pedir." },
];

const CAMINHOS_EXPOSTOS = [
  { caminho: "robots.txt", ref: "ROBOTS-EXPOSTO", titulo: "robots.txt acessível publicamente",
    oQueE: "robots.txt está acessível, o que é normal para a maioria dos sites, mas seu conteúdo pode revelar rotas administrativas que a equipe preferia não anunciar: Disallow funciona como mapa, não como bloqueio." },
  { caminho: "sitemap.xml", ref: "SITEMAP-EXPOSTO", titulo: "sitemap.xml acessível publicamente",
    oQueE: "sitemap.xml está acessível, o que é normal para SEO, mas confirma publicamente a lista de rotas indexáveis do site." },
];

const MARCADORES_STACK = [
  { testar: (h) => /vercel/i.test(h["server"] ?? "") || !!h["x-vercel-id"] || !!h["x-vercel-cache"], nome: "Vercel" },
  { testar: (h) => /next\.js/i.test(h["x-powered-by"] ?? ""), nome: "Next.js (x-powered-by)" },
  { testar: (h) => /cloudflare/i.test(h["server"] ?? ""), nome: "Cloudflare" },
];

function achados({ dominioReg, alvo, spf, dmarc, dkim, cabecalhos, tls, caminhos }) {
  const out = [];

  if (spf.medido && !spf.existe) {
    out.push({ ref: "SPF-000", gravidade: "ALTO", titulo: "SPF ausente no domínio",
      oQueE: "Sem registro SPF (v=spf1), qualquer servidor pode enviar e-mail se passando pelo domínio sem que o destinatário tenha como desconfiar por essa via.",
      evidencia: `TXT de ${dominioReg}: nenhum registro v=spf1 encontrado`,
      conserto: `Publicar um registro TXT em ${dominioReg} com v=spf1 e os remetentes autorizados, terminando em ~all ou -all.` });
  } else if (spf.medido && spf.existe && !spf.cobreGoogle && !spf.cobreResend) {
    out.push({ ref: "SPF-COBERTURA", gravidade: "BAIXO", titulo: "SPF existe mas não cita provedores conhecidos de envio",
      oQueE: "O registro SPF está presente, mas não inclui os provedores de e-mail transacional ou de Workspace mais comuns, então pode estar desatualizado.",
      evidencia: spf.bruto ?? "", conserto: "Conferir se o registro SPF lista todos os serviços que hoje enviam e-mail em nome do domínio." });
  }

  if (dmarc.medido && !dmarc.existe) {
    out.push({ ref: "DMARC-000", gravidade: "ALTO", titulo: "DMARC ausente, domínio vulnerável a spoofing",
      oQueE: "Sem registro DMARC, o domínio não declara nenhuma política de rejeição de e-mail falsificado, mesmo que SPF e DKIM existam.",
      evidencia: `TXT de _dmarc.${dominioReg}: ausente`,
      conserto: `Publicar TXT em _dmarc.${dominioReg} com v=DMARC1; p=quarantine (ou reject) e um endereço de rua (rua=mailto:...).` });
  } else if (dmarc.medido && dmarc.policy === "none") {
    out.push({ ref: "DMARC-NONE", gravidade: "MEDIO", titulo: "DMARC publicado em p=none, não bloqueia nada",
      oQueE: "O registro DMARC existe e monitora, mas p=none não instrui provedores de e-mail a rejeitar ou pôr em quarentena mensagens falsificadas: é telemetria, não proteção.",
      evidencia: dmarc.bruto ?? "", conserto: "Depois de validar os relatórios DMARC, subir a policy para p=quarantine e, quando estável, p=reject." });
  }

  if (dkim.medido && dkim.registros.length === 0) {
    out.push({ ref: "DKIM-RESEND-AUSENTE", gravidade: "INFO", titulo: "Sem seletor DKIM do Resend em resend._domainkey",
      oQueE: "Não há registro DKIM do Resend nesse domínio. Se o Resend não for o provedor de envio aqui, isso é esperado; se for, as mensagens saem sem assinatura DKIM e dependem só do SPF.",
      evidencia: `TXT de resend._domainkey.${dominioReg}: ausente`,
      conserto: "Se o domínio envia e-mail pelo Resend, publicar o registro DKIM fornecido pelo provedor." });
  }

  if (cabecalhos.medido) {
    const csp = cabecalhos.headers["content-security-policy"] || null;
    const scriptSrc = diretivaCsp(csp, "script-src");
    const styleSrc = diretivaCsp(csp, "style-src-elem") || diretivaCsp(csp, "style-src");

    if (scriptSrc && /'unsafe-inline'/.test(scriptSrc)) {
      out.push({ ref: "CSP-SCRIPT-UNSAFE-INLINE", gravidade: "CRITICO", titulo: "CSP script-src com 'unsafe-inline', não barra XSS",
        oQueE: "'unsafe-inline' em script-src permite executar qualquer script injetado na página, que é exatamente a permissão de que um XSS refletido ou armazenado precisa. Uma CSP com essa diretiva não protege contra a classe de ataque para a qual foi criada.",
        evidencia: scriptSrc,
        conserto: "Trocar 'unsafe-inline' por nonce por requisição ou por hashes, emitidos no cabeçalho e propagados para cada script da página." });
    }
    if (styleSrc && /'unsafe-inline'/.test(styleSrc)) {
      out.push({ ref: "CSP-STYLE-ELEM-UNSAFE-INLINE", gravidade: "BAIXO", titulo: "CSP style-src-elem com 'unsafe-inline'",
        oQueE: "style-src-elem controla quem pode injetar estilo na página. Com 'unsafe-inline', CSS injetado por um ataque de exfiltração de dados não é barrado.",
        evidencia: styleSrc, conserto: "Servir estilos por arquivo (style-src-elem 'self') ou por nonce, em vez de permitir estilo inline irrestrito." });
    }
    if (!csp) {
      out.push({ ref: "CSP-000", gravidade: "MEDIO", titulo: "Sem Content-Security-Policy",
        oQueE: "A resposta não traz o cabeçalho Content-Security-Policy, então não há camada de defesa contra XSS e injeção no navegador.",
        evidencia: `GET ${alvo}: sem content-security-policy`,
        conserto: "Emitir uma CSP restritiva, com nonce por requisição em script-src e style-src-elem 'self'." });
    }
    for (const item of CABECALHOS_SEGURANCA) {
      if (!cabecalhos.headers[item.chave]) {
        out.push({ ...item, evidencia: `GET ${alvo}: cabeçalho ${item.chave} ausente` });
      }
    }
  }

  if (!tls.validoAte) {
    out.push({ ref: "TLS-INDISPONIVEL", gravidade: "INFO", titulo: "Não foi possível ler o certificado TLS",
      oQueE: "A conexão TLS na porta 443 não devolveu certificado. Pode ser bloqueio de rede, timeout, ou o host não servir HTTPS.",
      evidencia: "handshake TLS: sem certificado",
      conserto: "Conferir se a porta 443 responde e se o certificado está corretamente instalado." });
  } else {
    const dias = Math.round((new Date(tls.validoAte).getTime() - Date.now()) / 86_400_000);
    if (dias < DIAS_ALERTA_CERTIFICADO) {
      out.push({ ref: "TLS-EXPIRANDO", gravidade: "ALTO", titulo: `Certificado TLS vence em ${dias} dia(s)`,
        oQueE: "O certificado do site está perto de expirar. Expirado, o navegador bloqueia o acesso com aviso de segurança para todo visitante.",
        evidencia: `valid_to: ${tls.validoAte}`,
        conserto: "Renovar o certificado, ou conferir a renovação automática se houver, antes da data de validade." });
    }
    if (tls.alpn !== "h2" && tls.alpn !== "h3") {
      out.push({ ref: "TLS-SEM-HTTP2", gravidade: "INFO", titulo: "Servidor não negociou HTTP/2 via ALPN",
        oQueE: "O handshake TLS não negociou h2 nem h3, então o site serve HTTP/1.1, mais lento sob carga por não multiplexar a conexão.",
        evidencia: `alpn negociado: ${tls.alpn ?? "nenhum"}`,
        conserto: "Habilitar HTTP/2 ou HTTP/3 no balanceador ou CDN à frente do site." });
    }
  }

  out.push(...caminhos);
  return out;
}

/* ─── 6. Exposição 0 a 100 ───────────────────────────────────────────────────────────── */

export const PONTOS_POR_GRAVIDADE = { CRITICO: 25, ALTO: 15, MEDIO: 8, BAIXO: 4, INFO: 0 };
export const FAIXAS = [
  { ate: 39, nivel: "CRITICO" },
  { ate: 59, nivel: "ALTO" },
  { ate: 79, nivel: "MEDIO" },
  { ate: 100, nivel: "BAIXO" },
];

export const calcularExposicao = (achs) =>
  Math.min(100, Math.max(0, 100 - achs.reduce((t, a) => t + (PONTOS_POR_GRAVIDADE[a.gravidade] ?? 0), 0)));

export const nivelDaExposicao = (n) => FAIXAS.find((f) => n <= f.ate)?.nivel ?? "BAIXO";

/* ─── 7. A ronda ─────────────────────────────────────────────────────────────────────── */

export async function ronda(entrada) {
  const validacao = await alvoValido(entrada);
  if (!validacao.valido) return { ok: false, motivo: validacao.motivo };

  const { host, pinado } = validacao;
  const dominioReg = dominioRegistravel(host);
  const url = `https://${host}/`;

  const [spfR, dmarcR, dkim, cabecalhos, tls, ...respostasCaminhos] = await Promise.all([
    digTxt(dominioReg),
    digTxt(`_dmarc.${dominioReg}`),
    digTxt(`resend._domainkey.${dominioReg}`),
    curlCabecalhos(url, pinado),
    tlsDoHost(host, pinado),
    ...CAMINHOS_EXPOSTOS.map((i) => curlCabecalhos(`https://${host}/${i.caminho}`, pinado)),
  ]);

  const caminhos = [];
  respostasCaminhos.forEach((resposta, i) => {
    const item = CAMINHOS_EXPOSTOS[i];
    if (resposta.medido && resposta.status >= 200 && resposta.status < 300) {
      caminhos.push({
        ref: item.ref, gravidade: "INFO", titulo: item.titulo, oQueE: item.oQueE,
        evidencia: `GET https://${host}/${item.caminho}: HTTP ${resposta.status}`,
        conserto: "Conferir se o conteúdo revela algo que não deveria ser público; caso contrário, nenhuma ação é necessária.",
      });
    }
  });

  const lista = achados({
    dominioReg, alvo: url,
    spf: analisarSpf(spfR), dmarc: lerDmarc(dmarcR), dkim,
    cabecalhos, tls, caminhos,
  });

  const stack = [];
  if (cabecalhos.medido) {
    const h = cabecalhos.headers;
    if (h["server"]) stack.push(`server: ${h["server"]}`);
    if (h["x-powered-by"]) stack.push(`x-powered-by: ${h["x-powered-by"]}`);
    for (const m of MARCADORES_STACK) if (m.testar(h)) stack.push(m.nome);
  }

  /* O que NAO foi medido e dito em voz alta. Relatorio que omite a lacuna faz o leitor ler
     ausencia de achado como ausencia de problema, que e o falso NEGATIVO. */
  const naoMedido = [];
  if (!spfR.medido) naoMedido.push("SPF (consulta DNS falhou)");
  if (!dmarcR.medido) naoMedido.push("DMARC (consulta DNS falhou)");
  if (!dkim.medido) naoMedido.push("DKIM (consulta DNS falhou)");
  if (!cabecalhos.medido) naoMedido.push("cabeçalhos HTTP (requisição falhou)");
  if (!tls.validoAte) naoMedido.push("certificado TLS");

  return {
    ok: true, alvo: host, dominioRegistravel: dominioReg,
    quando: new Date().toISOString().slice(0, 19) + "Z",
    ipPinado: pinado, stack, achados: lista,
    naoMedido: Array.from(new Set(naoMedido)),
    exposicao: calcularExposicao(lista),
    nivel: nivelDaExposicao(calcularExposicao(lista)),
  };
}

/* ─── 8. Relatório ───────────────────────────────────────────────────────────────────── */

const ORDEM = ["CRITICO", "ALTO", "MEDIO", "BAIXO", "INFO"];

export function relatorioMarkdown(r) {
  if (!r.ok) return `# Ronda não realizada\n\n${r.motivo}\n`;
  const porGravidade = [...r.achados].sort((a, b) => ORDEM.indexOf(a.gravidade) - ORDEM.indexOf(b.gravidade));
  const contagem = ORDEM.map((g) => [g, r.achados.filter((a) => a.gravidade === g).length]).filter(([, n]) => n > 0);

  const linhas = [
    `# Ronda Sentinela: ${r.alvo}`,
    "",
    `**Exposição ${r.exposicao}/100 — ${r.nivel}**`,
    "",
    `Domínio registrável: \`${r.dominioRegistravel}\` · IP fixado: \`${r.ipPinado}\` · ${r.quando}`,
    "",
    contagem.length ? `Achados: ${contagem.map(([g, n]) => `${n} ${g}`).join(" · ")}` : "Nenhum achado.",
    "",
  ];

  if (r.stack.length) linhas.push(`Stack identificada: ${r.stack.join(" · ")}`, "");

  if (r.naoMedido.length) {
    linhas.push(
      "> ⚠️ **Não medido nesta ronda:** " + r.naoMedido.join(", ") + ".",
      "> Isto não é ausência de problema, é ausência de medida. Rode de novo antes de concluir.",
      "",
    );
  }

  for (const a of porGravidade) {
    linhas.push(
      `## [${a.gravidade}] ${a.titulo}`,
      "",
      `\`${a.ref}\``,
      "",
      a.oQueE,
      "",
      `**Evidência:** \`${a.evidencia}\``,
      "",
      `**Conserto:** ${a.conserto}`,
      "",
    );
  }
  return linhas.join("\n");
}

/* ─── CLI ────────────────────────────────────────────────────────────────────────────── */

const ehCli = process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop());
if (ehCli) {
  const alvo = process.argv[2];
  const json = process.argv.includes("--json");
  if (!alvo) {
    console.error("uso: node ronda.mjs <dominio-ou-url> [--json]");
    process.exit(64);
  }
  const r = await ronda(alvo);
  console.log(json ? JSON.stringify(r, null, 2) : relatorioMarkdown(r));
  process.exit(r.ok ? 0 : 1);
}
