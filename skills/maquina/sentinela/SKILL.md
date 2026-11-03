---
name: sentinela
description: Auditoria de segurança caixa-preta de um site público, somente leitura. Use quando alguém pedir para auditar, revisar ou checar a segurança de um domínio ou URL, quando perguntar se um site está exposto, ou antes de publicar um site novo. Cobre SPF, DMARC, DKIM, CSP, cabeçalhos de segurança, TLS e caminhos expostos, e devolve exposição de 0 a 100 com o conserto de cada achado.
---

# Sentinela

Roda uma ronda de reconhecimento **somente leitura** contra um alvo público e devolve um
relatório com exposição de 0 a 100, os achados por gravidade e o conserto de cada um.

## Como rodar

```bash
node ~/.claude/skills/sentinela/scripts/ronda.mjs <dominio-ou-url>
node ~/.claude/skills/sentinela/scripts/ronda.mjs exemplo.com.br --json
```

Sem dependência, sem `npm install`, sem chave de API. Usa `dig`, `curl` e o TLS do próprio
Node. Sai com código 1 quando a ronda não pôde ser feita.

## O que ela NÃO faz

A lista é deliberada e é o que torna a ronda segura contra um site que você não controla:

- não envia payload, não tenta login, não fuzzeia parâmetro, não varre porta;
- não escreve nada no alvo: toda requisição é um GET de cabeçalho ou uma consulta DNS;
- não roda contra alvo não público, e recusa antes de tocar na rede.

Isso é reconhecimento externo, **não é pentest**. Ausência de achado aqui não é atestado de
segurança: ela não olha lógica de autorização, injeção, sessão nem dependência.

## As duas ideias que fazem o relatório valer

### 1. "Não medido" nunca vira "ausente"

Uma consulta DNS que deu timeout não diz nada sobre o SPF do domínio. Tratada como ausência,
ela vira um achado ALTO contra um domínio que talvez esteja perfeito, e quem recebe o
relatório perde a confiança em todos os outros achados junto.

Por isso cada medida devolve `medido: true | false`. O `dig` tenta **quatro vezes com recuo**
(150, 400, 900, 1800 ms) e só devolve "ausente" quando o servidor **respondeu vazio**. Se
todas falharem, o assunto entra na seção *Não medido nesta ronda* do relatório, em voz alta.

Relatório que omite a lacuna faz o leitor ler ausência de achado como ausência de problema,
e esse é o falso negativo.

### 2. O IP é resolvido uma vez e fixado

Todo pedido seguinte usa `curl --resolve` com o IP da primeira resolução.

Sem isso o alvo controla para onde cada requisição vai: responde com um IP público na primeira
consulta e com `127.0.0.1` na segunda, e a ferramenta passa a bater na rede de quem roda a
ronda. É DNS rebinding, e a única defesa real é não resolver de novo.

A guarda recusa antes disso: `localhost`, sufixos `.local`, `.internal`, `.localhost`, e as
faixas privadas de IPv4 (10/8, 172.16/12, 192.168/16, 169.254/16, 127/8, 100.64/10, 0/8) e de
IPv6 (`::1`, `::`, `fe80::/10`, `fc00::/7`, e IPv4 embutido em `::ffff:`).

## O que ela mede

| Área | Checa |
|---|---|
| **E-mail** | SPF presente e se cita provedores de envio conhecidos; DMARC presente e se a policy é `none`; DKIM do seletor `resend._domainkey` |
| **CSP** | ausência do cabeçalho; `'unsafe-inline'` em `script-src`; `'unsafe-inline'` em `style-src-elem` |
| **Cabeçalhos** | HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| **TLS** | certificado legível, dias para expirar (alerta abaixo de 15), ALPN negociado (h2/h3) |
| **Exposição** | `robots.txt` e `sitemap.xml` acessíveis |
| **Stack** | `server`, `x-powered-by`, marcadores de Vercel, Next.js e Cloudflare |

## Como a exposição é calculada

Começa em **100** e desconta por achado:

| Gravidade | Desconto |
|---|---|
| CRITICO | 25 |
| ALTO | 15 |
| MEDIO | 8 |
| BAIXO | 4 |
| INFO | 0 |

Faixas: **≤39 CRITICO · ≤59 ALTO · ≤79 MEDIO · ≤100 BAIXO**.

`INFO` desconta zero de propósito: são observações que o leitor precisa ver (o stack
identificado, o `robots.txt` público) sem que elas empurrem a nota para baixo. Achado que não
pede ação não pode competir com achado que pede.

## Como reportar o resultado

Todo achado sai com cinco campos, e nenhum é decorativo:

- **`ref`** — o código estável (`SPF-000`, `CSP-SCRIPT-UNSAFE-INLINE`), para o mesmo problema
  ser rastreável entre duas rondas;
- **`gravidade`**;
- **`oQueE`** — o mecanismo, não o nome. "'unsafe-inline' permite executar qualquer script
  injetado, que é exatamente a permissão de que um XSS precisa" ensina; "CSP fraca" não;
- **`evidencia`** — o que foi lido, verbatim, com o comando que leu;
- **`conserto`** — a ação concreta, não "revisar a configuração".

Ao apresentar para uma pessoa: comece pela exposição e pelo nível, depois os achados em ordem
de gravidade, e **cite a seção de não medido se ela existir**. Nunca diga que um site está
seguro: diga o que foi medido e o que não foi.

## Antes de rodar contra alvo de terceiro

Reconhecimento externo somente leitura contra um alvo público costuma ser aceitável, mas a
regra muda por jurisdição e por contrato. Rode contra o que você opera, ou com autorização
escrita de quem opera. A ferramenta não verifica isso por você.
