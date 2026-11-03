# Pedir uma revisão independente

**Quando usar:** Depois de implementar e antes de integrar.

```
Use o agente revisor (ou outra IA): base {{main}}, head HEAD, plano planos/{{nome}}.md.
Revise só o diff. Para cada achado: severidade, arquivo:linha, cenário concreto e correção
mínima. Se não houver nada relevante, responda SEM ACHADOS. Não edite nada.
```

**O que esperar:** Achados por severidade ou `SEM ACHADOS`. Cada achado é conferido na linha antes de consertar.

Mais contexto: [08-agente-revisor.md](../08-agente-revisor.md).
