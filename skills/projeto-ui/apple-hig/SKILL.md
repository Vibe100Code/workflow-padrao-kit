---
name: apple-hig
description: Regra universal de interface, destilada das Apple Human Interface Guidelines (158 páginas, set/2026): 7 princípios de design, foundations (acessibilidade, cor, layout, tipografia, motion, escrita...), patterns (feedback, loading, modalidade, undo, busca, settings, onboarding...), 64 componentes, inputs (teclado, ponteiro, gestos, foco) e plataformas. Use SEMPRE que for desenhar, construir, revisar ou criticar qualquer interface (site, landing page, painel, app, extensão, componente), ANTES de escrever CSS/JS, junto com `impeccable` (processo) e `ui-ux-pro-max` (paletas/tipografia). Trigger: UI, UX, tela, painel, dashboard, extensão, botão, formulário, modal, alerta, lista, tabela, navegação, feedback, acessibilidade, "está bom de usar?".
---

# apple-hig: a régua de interface

> Destilado de https://developer.apple.com/design/human-interface-guidelines/ em 2026-09-15 (158 páginas lidas na íntegra; cada regra numérica preservada). Não é lei da Apple pra web: é a **régua de bom senso testada em bilhões de dispositivos**, traduzida em cada seção para HTML/CSS/JS. Onde a HIG e um brief do cliente conflitarem, o brief vence; onde a HIG e o hábito conflitarem, a HIG vence.

## Como usar (3 passos, sempre)

1. **Antes de desenhar:** leia [reference/principios-e-plataformas.md](reference/principios-e-plataformas.md) §Design principles (5 min) e decida o **modo** da superfície (a pessoa opera, lê, decide ou vive dentro?). Escolha os 3 princípios que mais pesam nessa superfície e anote.
2. **Enquanto constrói:** abra só a seção do que está construindo: um botão → `components-conteudo-layout-menus.md` §Buttons; um formulário → `components-navegacao-apresentacao-entrada-status.md` §Text fields/§Toggles/§Pickers; um estado de carregamento → `patterns.md` §Loading; um erro → `patterns.md` §Feedback; um modal → `patterns.md` §Modality + `…apresentacao…` §Sheets/§Alerts; cor/tipografia/espaçamento → `foundations.md` §Color/§Typography/§Layout; teclado e foco → `inputs-e-tecnologias.md` §Keyboards/§Focus and selection.
3. **Antes de entregar:** rode o **checklist universal** abaixo. Item que falha é defeito, não opinião.

## Os 7 princípios (Apple, 2026) em uma linha cada

| Princípio | O que cobra | Pergunta de checagem |
|---|---|---|
| **Purpose** | fazer bem o que mais importa, não tudo | O que esta tela existe pra resolver? Está em primeiro lugar? |
| **Agency** | a pessoa no controle, com saída e perdão | Dá pra pular, voltar e desfazer sem perder trabalho? |
| **Responsibility** | transparência, privacidade, só o dado necessário | Cada permissão/dado pedido tem motivo visível? |
| **Familiarity** | conceitos conhecidos, consistência, feedback | Um controle igual se comporta igual em toda a tela? |
| **Flexibility** | acessível, multi-input, multi-plataforma | Funciona só com teclado? Com texto maior? No celular? |
| **Simplicity** | só o necessário, conciso, hierarquia clara | Cada elemento justifica estar aqui? O título fala sozinho? |
| **Craft** | detalhe, iteração, manutenção | Foi olhado renderizado, nos dois tamanhos, com conteúdo real? |
| **Delight** | emoção intencional, sem decoração | O momento memorável é a ação bem feita, não um enfeite? |

## Checklist universal (o que a HIG exige e dá pra medir)

**Alvos e toque**
- Área clicável ≥ **44×44 pt** (44 px CSS) em todo controle; ícone pequeno ganha padding, não fica pequeno.
- Espaço entre alvos adjacentes ≥ 8 pt; nada de dois botões colados.

**Texto e cor**
- Corpo ≥ 11 pt no iOS / 13 px web; hierarquia por **tamanho e peso**, não por cor.
- Contraste texto/fundo ≥ **4.5:1** (grande ≥ 3:1); estado nunca só por cor (ícone, texto ou forma junto).
- Cor de marca só onde significa algo (ação primária, estado); mesma cor = mesmo significado na tela inteira.
- Funciona em claro, escuro e **contraste aumentado**; se só um tema, declare o fundo explicitamente.
- Texto que a pessoa lê: frases curtas, verbo no botão ("Enviar", nunca "OK"), sem jargão, sem "Tem certeza?" pra ação reversível.

**Feedback e tempo**
- Todo clique responde em < 100 ms (estado do controle); > 1 s mostra progresso (determinado quando dá); > 10 s permite cancelar.
- Erro diz **o que houve e como sair**; sucesso confirma curto; nunca silêncio.
- Ação reversível: **Desfazer** (Undo) em vez de confirmação; destrutiva e irreversível: confirmação com o verbo destrutivo nomeado ("Excluir 3 leads", nunca "Sim").

**Modalidade e navegação**
- Modal só quando exige foco ou decisão; sempre com saída óbvia (Cancelar/Fechar/Esc); nunca modal sobre modal.
- Sheets para tarefas curtas; alertas com título + até 2 botões; a opção segura é a padrão.
- A pessoa sempre sabe onde está (título) e como volta (mesmo lugar, mesmo gesto).

**Teclado, foco e acessibilidade**
- Tudo alcançável por Tab na ordem visual; foco **visível** (anel 2 px com contraste ≥ 3:1); foco nunca se move sozinho.
- Atalhos: Cmd como primário, Shift secundário, Option raro, Control nunca; um atalho não some com o que ele dispara.
- Rótulos em todo campo (não só placeholder); listas são listas (`ul/li`, `role=list`); imagens com `alt` útil; regiões com landmarks.
- `prefers-reduced-motion` desliga movimento não essencial; movimento comunica (entrada, saída, relação), não decora.

**Layout e conteúdo**
- Margens seguras (safe area) respeitadas; grade de **8 pt**; medida de texto 45 a 75 caracteres.
- Estados de vazio, carregando, erro, sem rede, sem permissão: todos desenhados, com o próximo passo dentro deles.
- Conteúdo real desde o primeiro frame; nada parado em `opacity:0` esperando script.

**Sistema e privacidade**
- Pede permissão no contexto de uso, com motivo; funciona sem a permissão (degrada, não trava).
- Não coleta o que não usa; mostra o que faz com o dado.

## Índice das referências (5.318 linhas)

| Arquivo | Cobre | Quando abrir |
|---|---|---|
| [principios-e-plataformas.md](reference/principios-e-plataformas.md) | 7 princípios; iOS/iPadOS/macOS em detalhe; tvOS, visionOS, watchOS, games, iPhone Duo; tabela de tamanhos mínimos | começo de qualquer projeto; portar entre desktop e celular |
| [foundations.md](reference/foundations.md) | Accessibility, App icons, Branding, Color, Dark Mode, Icons, Images, Immersive, Inclusion, Layout, Materials, Motion, Privacy, Right to left, SF Symbols, Spatial layout, Typography, Writing | cor, tipo, espaçamento, ícone, movimento, texto, acessibilidade |
| [patterns.md](reference/patterns.md) | Charting, Collaboration, Drag and drop, Entering data, Feedback, File management, Full screen, Launching, Live-viewing, Loading, Accounts, Notifications, Modality, Multitasking, Help, Onboarding, Audio/Haptics/Video, Printing, Ratings, Searching, Settings, Undo/Redo, Workouts | qualquer fluxo: formulário, busca, carregamento, erro, modal, onboarding, configurações |
| [components-conteudo-layout-menus.md](reference/components-conteudo-layout-menus.md) | Charts, Image/Text/Web views; Boxes, Collections, Column views, Disclosure, Labels, Lists and tables, Lockups, Outline, Split views, Tab views; Activity views, Buttons, Context menus, Dock/Edit menus, Quick actions, Menus, Ornaments, Pop-up/Pull-down buttons, Menu bar, Toolbars | botões, menus, listas, tabelas, barras de ferramentas, painéis divididos |
| [components-navegacao-apresentacao-entrada-status.md](reference/components-navegacao-apresentacao-entrada-status.md) | Path controls, Search fields, Sidebars, Tab bars, Token fields; Action sheets, Alerts, Page controls, Panels, Popovers, Scroll views, Sheets, Windows; Color wells, Combo boxes, Digit entry, Image wells, Pickers, Segmented controls, Sliders, Steppers, Text fields, Toggles, Virtual keyboards; Activity rings, Gauges, Progress indicators, Rating indicators; App Shortcuts, Complications, Controls, Live Activities, Notifications, Snippets, Status bars, Top Shelf, Watch faces, Widgets | navegação, busca, alertas, sheets, popovers, campos, toggles, seletores, progresso, notificações, widgets |
| [inputs-e-tecnologias.md](reference/inputs-e-tecnologias.md) | Action button, Pencil, Camera Control, Digital Crown, Eyes, Focus and selection, Game controls, Gestures, Gyroscope, Keyboards, Nearby, Pointing devices, Remotes; 29 tecnologias (Generative AI, ML, Sign in with Apple, Siri, VoiceOver, Maps, Apple Pay...) | teclado/atalhos, ponteiro/hover, gestos, foco; IA generativa e ML na interface |

## Como compõe com as outras skills

- **`impeccable`** manda no *processo* (shape → build → audit → critique → polish) e no craft-floor; **`apple-hig`** manda na *régua* de cada decisão (o que é alvo, feedback, modal, foco). Quando o impeccable disser "verifique" é aqui que está o que verificar.
- **`ui-ux-pro-max`** dá paleta, tipografia e estilo; a HIG diz como aplicar (contraste, hierarquia, consistência).
- **`frontend-design-review`** revisa; use o checklist universal como rubrica.
- Regras de conformidade do produto (`produtos/<id>/REGRAS.md`) vencem a HIG onde houver conflito.

## Manutenção

A Apple atualiza a HIG a cada WWDC (junho). Pra reextrair: refaça a coleta das páginas da HIG; a lista de páginas em `reference/` cabeçalhos. Não edite as referências à mão sem citar a página de origem.
