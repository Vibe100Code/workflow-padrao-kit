# Briefing padrão de subagente

Copie, preencha e mande. Nada além disto.

```
TAREFA: {{uma frase}}
CAMINHOS: {{arquivos/pastas que pode ler ou editar}}
CONTEXTO DO PROJETO: {{só o bloco do BRIEFING.md que importa, ex.: "BRIEFING §3 Marca: ..."; nunca o arquivo inteiro}}
NÃO TOQUE: {{o que é de outra frente}}
PRONTO QUANDO: {{critério checável}}
FORMATO DA RESPOSTA: até 15 linhas, modo caveman: fato, caminho:linha, veredito.
  Se não achar nada, diga "sem achados" (saída honesta é válida).
MODELO: {{Haiku busca · Sonnet implementa · Opus só decisão difícil}}

ECONOMIA (obrigatório):
- Mande/leia trecho ou diff, nunca o arquivo, a pasta ou o log inteiro.
- Caminho no lugar do conteúdo quando você puder ler sozinho.
- Antes de busca ampla: `graphify query "<o que procura>"`.
- Imagens: JPG 1440 px, recortadas na seção, no máximo 12.
- Nunca histórico de conversa, transcrição ou log inteiro como entrada.
- Estime o tamanho antes de chamada grande; passou do limite, divida.
- Tarefa nova = agente novo. Não retome agente que já leu tudo.
- Não vigie em loop: espere aviso.
```
