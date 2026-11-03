# Conectar APIs (opcional)

> **Opcional.** O workflow funciona inteiro só com os apps por assinatura (Claude Code, Codex, Gemini CLI…). Use uma API apenas se quiser um papel que o app não cobre bem, por exemplo um **revisor de outro fornecedor** ou um **ajudante** chamado por script. Nada no kit exige chave.

## Quando vale a pena
| Situação | Exemplo |
|---|---|
| Revisor de outro fornecedor | Codex implementa, a API do Claude revisa o diff (o kit já traz `scripts/revisar-pela-api.mjs`) |
| Segundo revisor | a API do Gemini ou da OpenAI dá um segundo parecer sobre o mesmo diff |
| Ajudante por script | um script lê um trecho e devolve um resumo, sem abrir sessão |

Quem construiu não revisa o próprio trabalho na mesma conversa. Uma chamada à API já é contexto limpo, então o mesmo modelo pode revisar ([caminho c](08-agente-revisor.md)); outro fornecedor é o recomendado.

## 1. Guardar a chave fora do git
Chave nunca entra em commit, briefing, log ou prompt.

**Opção A, chaveiro do sistema (recomendado no macOS):**
```bash
security add-generic-password -a "$USER" -s anthropic-api-key -w   # pede a chave no terminal
security find-generic-password -a "$USER" -s anthropic-api-key -w  # lê
```
Troque `anthropic-api-key` por `openai-api-key` ou `gemini-api-key` para as outras. No Linux, use o gerenciador de segredos da distribuição (ex.: `secret-tool`) ou a opção B.

**Opção B, arquivo `.env` ignorado pelo git:**
```bash
# .env (já está no .gitignore que o instalador escreve; confira)
ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...
GEMINI_API_KEY=...
```
Carregue só na hora de usar: `set -a; . ./.env; set +a`. O `.env` vai para cada worktree por link (`links` do `workflow.config.json`), sem cópia.

Confira antes de cada commit: `git status --short` não pode listar `.env`.

## 2. Claude (Anthropic)
- **Chave:** [console.anthropic.com](https://console.anthropic.com/) → API Keys. A API é paga à parte da assinatura do Claude.
- **Variável:** `ANTHROPIC_API_KEY`
- **Chamada mínima:**
```bash
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" -H "anthropic-version: 2023-06-01" -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-5-5","max_tokens":1024,"messages":[{"role":"user","content":"Revise este diff: ..."}]}'
```
- **No kit:** `node scripts/revisar-pela-api.mjs --base main -o revisao.md` lê a chave do Keychain (`anthropic-api-key`) ou de `ANTHROPIC_API_KEY`. Use `--modelo claude-opus-5-5` em dinheiro, segurança e núcleo do sistema.
- Docs: [docs.claude.com](https://docs.claude.com/)

## 3. OpenAI (e Codex)
- **Chave:** [platform.openai.com/api-keys](https://platform.openai.com/api-keys). A API é paga à parte da assinatura do ChatGPT.
- **Variável:** `OPENAI_API_KEY`
- **Codex CLI:** entra pela conta do ChatGPT (assinatura, sem chave) ou pela chave da API. Veja `codex login --help`. Não precisa de chave se você já usa a assinatura.
- **Chamada mínima** (troque `<modelo>` por um da [lista de modelos](https://platform.openai.com/docs/models)):
```bash
curl -s https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" -H "content-type: application/json" \
  -d '{"model":"<modelo>","input":"Revise este diff: ..."}'
```
- Docs: [platform.openai.com/docs](https://platform.openai.com/docs)

## 4. Gemini (Google)
Dois caminhos:

**Google AI Studio (mais simples):**
- **Chave:** [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- **Variável:** `GEMINI_API_KEY`
- **Chamada mínima** (troque `<modelo>` por um da [lista de modelos](https://ai.google.dev/gemini-api/docs/models)):
```bash
curl -s "https://generativelanguage.googleapis.com/v1beta/models/<modelo>:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H "content-type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Revise este diff: ..."}]}]}'
```

**Vertex AI (projeto no Google Cloud, faturamento da organização):**
- Autentique com `gcloud auth application-default login` e escolha projeto e região. Sem chave em arquivo.
- Endpoint: `https://<regiao>-aiplatform.googleapis.com/v1/projects/<projeto>/locations/<regiao>/publishers/google/models/<modelo>:generateContent`
- Docs: [cloud.google.com/vertex-ai/generative-ai/docs](https://cloud.google.com/vertex-ai/generative-ai/docs)

## 5. Apontar `papeis` para a API
No `workflow.config.json` do projeto, o `cmd` é um lembrete de como chamar; o hook de início mostra o nome da ferramenta em toda sessão.
```json
"papeis": {
  "coordenador": { "ferramenta": "Claude Code" },
  "implementador": { "ferramenta": "Codex" },
  "revisores": [
    { "ferramenta": "API Claude", "cmd": "node scripts/revisar-pela-api.mjs --base main -o revisao.md" },
    { "ferramenta": "API Gemini", "cmd": "git diff main... > diff.patch && <seu script que manda diff.patch>" }
  ]
}
```

## 6. Cuidados que valem para qualquer API
- **Mande o mínimo** ([regra 005](../templates/projeto/regras/005-entrada-minima.md)): diff ou trecho, nunca o arquivo, a pasta ou o histórico inteiro. É o que mais pesa no custo.
- **Nunca mande segredo no prompt** (`.env`, chaves, dados pessoais).
- **Resposta vazia ou cortada é falha**, não "sem achados" (o `revisar-pela-api.mjs` já sai com código 1 nesses casos).
- **Erro 429** é limite por minuto: espere e tente de novo, sem rajada.
- **Saiba quanto gasta:** acompanhe o uso no painel do fornecedor e, se quiser, defina um limite de gasto lá.
