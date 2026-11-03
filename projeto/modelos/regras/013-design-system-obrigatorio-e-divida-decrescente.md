---
regra: design-system-obrigatorio-e-divida-decrescente
data: 2026-10-19
decidiu: dono
literal: sim
---

# Proíba valores visuais crus fora do tema central, congele a dívida para só encolher e exija aprovação de tela

## Incidente que a originou
Em 2026-10-18 e 2026-10-19, agentes de layout criaram avisos, folhas e ajustes de tela com cores, fontes, raios e espaçamentos avulsos fora do padrão sob a desculpa de "é só um aviso", degradando a consistência visual do produto até a decisão do dono em 2026-10-19: *"agente de layout nunca cria algo fora do design system"*.

## Por quê
Regras visuais que dependem de memória são violadas a cada edição rápida. Só a combinação de tokens fechados por papel, congelamento mecânico do legado (que só pode diminuir) e aprovação do dono por captura real mantém a interface íntegra.

## Como aplicar
- **Consulta prévia obrigatória**: antes de editar qualquer arquivo de interface, leia a seção do componente e a tabela de tokens por papel no documento do design system. Se o papel não existir na tabela, pare.
- **Zero valor cru fora da pasta de tema**: são proibidos literais de cor (hex, RGB, cores de fábrica), tamanhos/fontes numéricos avulsos, espaçamentos/raios/sombras/durações inventados e ícones fora do catálogo do tema.
- **Fluxo para elemento novo**: se faltar componente, token ou ícone no sistema: (1) apresente mockup fiel com tokens reais ao dono, (2) obtenha aprovação explícita do dono, (3) cadastre o token no tema e no documento do design system **antes** de usá-lo na tela, e (4) aprove a captura real do simulador antes de integrar.
- **Dívida congelada que só encolhe**: exceções legadas ficam listadas num arquivo de dívida versionado; nunca adicione linha nem aumente contagem para passar no gate (ao consertar um item, regrave a lista para reduzir o teto).
- **Cinco travas mecânicas**:
  1. Gate de valores crus na suíte principal (com lista de dívida decrescente).
  2. Hook de edição no editor/agente (~0,15 s por arquivo editado, sem build) que injeta a regra antes da edição e bloqueia valor cru imediatamente após.
  3. Hooks de `pre-commit` e `commit-msg` que exigem registro de aprovação de tela (arquivo, captura `.png`, data, aprovação do dono; apenas o orquestrador escreve nesse registro) ou tag `[sem-mudanca-visual]` comprovada sem toque em modificador visual.
  4. Gate de componentes que exige que todo componente compartilhado esteja documentado no design system.
  5. Anexo automático das regras de interface nos prompts de revisores externos quando o diff toca código de tela.

## Como se prova
Cinco gates automatizados (`testar-design-system-obrigatorio`, `testar-aprovacao-de-tela`, `testar-componentes-do-sistema`, `testar-prova-do-design-system` e `testar-travas-do-design-system`), todos com mutação provada no meta-gate.
