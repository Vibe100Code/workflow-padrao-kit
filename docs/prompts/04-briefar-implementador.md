# Mandar a tarefa ao implementador

**Quando usar:** Quando quem coordena entrega a execução a outro agente (padrão: Codex).

```
TAREFA: {{etapa N de planos/nome.md}}
CAMINHOS: {{arquivos que pode tocar}} · NÃO TOQUE: {{o resto}}
PRONTO QUANDO: {{critério verificável; comando de teste que precisa passar}}
CONTEXTO: BRIEFING §{{bloco}}: {{só o trecho que importa}}
RESPOSTA: diff aplicado + saída do teste + o que ficou de fora. Máximo 15 linhas.
```

**O que esperar:** Diff pequeno, teste rodado e colado. Quem coordena confere o diff, não reescreve.

Mais contexto: [07-agentes-e-papeis.md](../07-agentes-e-papeis.md).
