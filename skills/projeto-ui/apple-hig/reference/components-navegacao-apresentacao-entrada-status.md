# Components: navegação e busca, apresentação, seleção e entrada, status, experiências de sistema (HIG)

Origem: https://developer.apple.com/design/human-interface-guidelines/components

## Navegação e busca

### Path controls

**O que é / quando usar**: mostra o caminho do sistema de arquivos até um arquivo/pasta selecionado (ex.: barra de caminho do Finder). Só macOS.

**Regras**
- Duas variantes: Standard (lista linear com disco raiz, pastas pai e item selecionado, ícone+nome cada; trunca nomes do meio quando não cabe) e Pop-up (parece botão pop-up, abre menu com disco raiz/pastas pai/item selecionado).
- Editável: permite arrastar um item sobre o controle para selecioná-lo e exibir seu caminho; a variante pop-up ganha um comando "Choose" extra no menu.
- Usar no corpo da janela, nunca em toolbar ou status bar — no Finder o path control fica na base do corpo da janela, não na status bar.
- Não suportado em iOS, iPadOS, tvOS, visionOS, watchOS.

**Equivalente web**
- Breadcrumb: `nav aria-label="breadcrumb"` com `ol`/`li`, `aria-current="page"` no último item.
- Versão editável não tem paralelo direto — simular com um combobox por segmento ou input de path com autocomplete.

### Search fields

**O que é / quando usar**: campo de texto editável com ícone de busca, botão limpar e placeholder; pode combinar com scope bar e tokens para refinar buscas.

**Regras**
- Placeholder text para indicar o que pode ser buscado.
- Se possível, iniciar a busca assim que a pessoa digita (busca ao vivo).
- Mostrar sugestões (buscas recentes ou preditivas) antes/durante a digitação.
- Priorizar os resultados mais relevantes primeiro; considerar categorizar.
- Scope bar filtra por categorias bem definidas, do escopo mais amplo para o mais estreito — usar por padrão o escopo mais amplo.
- Token representa um termo de busca selecionável/editável (ver Token fields).
- iOS: 3 posições possíveis — tab (estilo "standard" com landing page de sugestões, ou estilo "button" que abre o teclado direto), toolbar (base ou topo, preferir base quando houver espaço), ou inline com o conteúdo.
- iPadOS/macOS: posicionar preferencialmente no lado final (trailing) da toolbar; usar no topo da sidebar quando filtra navegação; focar automaticamente ao entrar numa área dedicada de busca, exceto no iPad só-com-teclado-virtual (evita cobrir a view).
- tvOS: tela de busca dedicada com teclado; oferecer sugestões populares/contextuais e buscas recentes para reduzir digitação.
- watchOS: tocar o campo cobre a tela inteira com input de texto; só volta ao campo com Cancel ou Search.

**Equivalente web**
- `input type="search"` com `aria-label`.
- Scope bar equivale a um grupo de tabs/segmented control (`role="tablist"`) filtrando o mesmo dataset.
- Tokens equivalem a "chips" removíveis dentro do input (padrão combobox com listbox de sugestões).

### Sidebars

**O que é / quando usar**: aparece no lado inicial (leading) de uma view para navegar entre áreas do app ou coleções de nível superior (pastas, playlists). Exige bastante espaço vertical e horizontal.

**Regras**
- Com Liquid Glass, estender conteúdo visualmente rico por baixo da sidebar (rolagem horizontal ou `backgroundExtensionEffect()`).
- Permitir customização do conteúdo da sidebar quando possível.
- Agrupar hierarquia com disclosure controls se houver muito conteúdo.
- Usar símbolos familiares (SF Symbols); se precisar de ícone próprio, criar símbolo customizado, nunca bitmap.
- Permitir esconder a sidebar com o gesto/atalho nativo da plataforma (edge swipe no iPadOS, comando Show/Hide Sidebar no macOS); não esconder por padrão — prejudica a descoberta.
- No máximo 2 níveis de hierarquia em geral; acima disso, usar split view com lista de conteúdo entre sidebar e detalhe.
- Com 2 níveis, usar rótulos curtos e descritivos por grupo.
- Ícones usam o accent color do app por padrão; no macOS a pessoa pode trocar o accent color do sistema e espera que os ícones sigam essa cor; cor fixa só esporadicamente, para destacar (ex.: ícone VIP amarelo no Mail).
- iOS/iPadOS: estilo `sidebarAdaptable` de tab view alterna entre sidebar e tab bar; para só sidebar (sem alternância), usar `NavigationSplitView`/`UISplitViewController`. Preferir tab bar primeiro; sidebar quando há mais áreas do que cabem numa tab bar.
- macOS: altura de linha, texto e glifo dependem do tamanho geral (pequeno/médio/grande), configurável por código ou pela pessoa em Ajustes Gerais.
  - Considerar auto-esconder ao redimensionar a janela.
  - Evitar informação/ação crítica no fim da sidebar — a janela pode ser movida escondendo a borda inferior.
- visionOS: hierarquia profunda pode usar sidebar dentro de uma tab; impedir que a seleção na sidebar troque a tab ativa.
- Não suportado em watchOS.

**Equivalente web**
- `nav` lateral persistente com lista de links, `aria-current="page"` no item ativo.
- Grupos colapsáveis via `details/summary` ou `aria-expanded` em botões de disclosure.
- Responsivo: colapsa para off-canvas/drawer abaixo de um breakpoint, análogo ao comportamento adaptável sidebar↔tab bar.

### Tab bars

**O que é / quando usar**: navegação entre seções de nível superior de um app, preservando o estado de navegação de cada seção.

**Regras**
- Usar para navegação, não para ações (ações vão em toolbar).
- Manter a tab bar visível ao navegar entre seções, exceto quando uma view modal a cobre.
- Usar o número apropriado de tabs — menos tabs facilita a navegação; considerar sidebar ou tab bar conversível para hierarquia complexa.
- Evitar tabs de overflow: se o espaço horizontal limita, a última tab vira "More" em iOS/iPadOS — limitar cenários que geram isso.
- Nunca desabilitar/esconder botões de tab mesmo com conteúdo indisponível — explicar por que a seção está vazia.
- Incluir rótulos de tab, de preferência uma palavra só.
- Usar SF Symbols (adaptam a contexto compact/regular); preferir símbolos preenchidos por consistência.
- Badge (oval vermelho com número ou "!") só para informação crítica — não banalizar.
- Evitar cor de rótulo/tab parecida com o fundo do conteúdo; preferir aparência monocromática se o conteúdo já for colorido.
- iOS: tab bar flutua sobre o conteúdo (Liquid Glass) na base da tela; pode ter um accessory anexado (ex.: MiniPlayer) que minimiza ao rolar; pode incluir tab de busca dedicada ao final.
- iPadOS: aparece perto do topo, fixa ou conversível em sidebar via botão. Se deixar a pessoa customizar, mirar lista padrão de 5 tabs ou menos para manter continuidade entre compact e regular.
- tvOS: altura fixa de 68 pt, borda superior a 46 pt do topo do ecrã (valores não alteráveis).
  - Trunca item mais à direita com fade quando não cabe; tab selecionada ganha drop shadow.
  - Ordem recomendada em apps de live-viewing: conteúdo ao vivo, DVR/gravado, outros.
- visionOS: sempre vertical, flutuando fixa no lado inicial da janela; expande ao olhar; símbolo sempre visível, rótulo só aparece expandido — manter rótulos curtos.
- Não suportado em watchOS.

**Equivalente web**
- Bottom navigation bar fixa (`position: fixed; bottom:0`) em mobile web, com no máximo ~5 itens visíveis + rótulo curto.
- `role="tablist"` só se a navegação alternar painéis sem trocar URL; senão usar links de navegação simples.
- Badge = elemento com `aria-label` descrevendo a contagem, nunca só cor.

### Token fields

**O que é / quando usar**: campo de texto (macOS) que converte texto digitado em tokens selecionáveis/arrastáveis — ex.: campos de destinatário no Mail.

**Regras**
- Pode mostrar lista de sugestões enquanto a pessoa digita; selecionar sugestão insere como token.
- Cada token pode ter menu de contexto (editar, informações, ações) — adiciona valor.
- Por padrão, vírgula converte texto em token; dá para configurar atalhos adicionais (ex.: Return).
- Pode customizar o delay antes de mostrar sugestões (padrão: imediato) — ajustar se distrair durante a digitação.
- Não suportado em iOS, iPadOS, tvOS, visionOS, watchOS.

**Equivalente web**
- Padrão "input chips"/tag input: combobox com cada chip tendo botão de remover e `aria-label`.
- Listbox de sugestões associada via `aria-controls`/`aria-activedescendant`.

## Apresentação

### Action sheets

**O que é / quando usar**: view modal que apresenta escolhas relacionadas a uma ação que a pessoa iniciou de propósito.

**Regras**
- Usar action sheet, não alert, para escolhas ligadas a uma ação intencional (ex.: cancelar rascunho no Mail → apagar ou salvar). Alert é para situações inesperadas, sem escolhas adicionais.
- Usar com moderação — interrompe a tarefa atual.
- Título curto o bastante para caber numa linha só.
- Mensagem só se necessária — o título mais o contexto costuma bastar.
- Botão Cancel (se necessário) na base do action sheet (ou no canto superior esquerdo em watchOS); o `confirmationDialog` do SwiftUI já inclui Cancel por padrão.
- Ações destrutivas com estilo destrutivo, posicionadas no topo do action sheet, onde chamam mais atenção.
- iOS/iPadOS: usar action sheet, não menu, para escolhas ligadas a uma ação (menu é para algo que a pessoa escolhe revelar).
  - Evitar rolagem no action sheet — quanto mais botões, mais difícil e mais fácil tocar errado.
- watchOS: título + mensagem opcional + Cancel + 1 ou mais botões; 3 estilos de botão — Default, Destructive, Cancel. No máximo 4 botões contando o Cancel → no máximo 3 escolhas adicionais.
- Não suportado em visionOS.

**Equivalente web**
- `dialog` com `role="alertdialog"` quando exige escolha imediata em torno de ação destrutiva, ou `dialog` comum com focus trap.
- Botão destrutivo visualmente distinto (ex.: vermelho) e, seguindo a convenção da plataforma, separado do Cancel.
- No mobile web, o padrão "bottom sheet" deslizando da base é o análogo mais próximo.

### Alerts

**O que é / quando usar**: view modal com informação crítica que a pessoa precisa saber na hora (problema, confirmação de ação destrutiva, confirmação de compra).

**Regras**
- Usar com moderação — só informação essencial e ações realmente úteis.
- Nunca usar alert só para informar sem ação; achar alternativa não bloqueante (ex.: indicador inline).
- Evitar alert em ações comuns e desfazíveis, mesmo que destrutivas.
- Evitar alert na abertura do app; se precisa avisar de algo importante, tornar essa informação descobrível de outro jeito (dados em cache + rótulo não intrusivo, por exemplo).
- Anatomia: título + texto informativo opcional + até 3 botões. iOS/iPadOS/macOS/visionOS podem incluir campo de texto; macOS/visionOS podem incluir ícone e accessory view; macOS pode adicionar checkbox de supressão e botão Help.
- Título: direto, tom neutro; descrever o que aconteceu, o contexto e o porquê; evitar títulos vazios como "Error" ou "Error 329347"; evitar mais de 2 linhas.
  - Se for frase completa, capitalização de frase + pontuação; se for fragmento, capitalização de título sem pontuação final.
- Texto informativo só se agrega valor; frases completas, capitalização de frase.
- Não explicar o que os botões fazem se o texto e os títulos já são claros.
- Campo de texto só se o input da pessoa é realmente necessário para resolver a situação.
- Botões: título de 1-2 palavras descrevendo o resultado (verbo/frase verbal) — ex. "View All", "Reply", "Ignore".
  - "OK" só em alerts puramente informativos, evitando "Yes"/"No"; sempre "Cancel" para cancelar; capitalização de título, sem pontuação final.
- Evitar "OK" como botão padrão a menos que o alert seja puramente informativo — o significado de "OK" é ambíguo; preferir verbo específico como "Erase", "Convert", "Clear", "Delete".
- Botão mais provável de ser escolhido no lado final (trailing) de uma linha ou no topo de uma pilha; botão padrão sempre no lado final/topo; Cancel geralmente no lado inicial (leading) de uma linha ou na base de uma pilha.
- Estilo destrutivo só para um botão que executa ação destrutiva que a pessoa não escolheu deliberadamente — quando a pessoa já escolheu deliberadamente uma ação destrutiva (ex.: Empty Trash), o alert resultante não aplica o estilo destrutivo ao próprio botão, porque ele cumpre a intenção original.
- Se existe ação destrutiva, sempre incluir botão Cancel; nunca torná-lo o botão padrão.
  - Se quiser evitar que a pessoa pressione Return sem ler, não defina nenhum botão como padrão.
  - Alert com um único botão que também é o padrão deve usar "Done", nunca "Cancel".
- Formas alternativas de cancelar: sair para a Tela de Início (iOS/iPadOS), Esc ou Cmd-ponto (iOS/iPadOS/macOS/visionOS), botão Menu do controle remoto (tvOS).
- iOS/iPadOS: action sheet, não alert, para escolhas de uma ação intencional. Evitar alert que rola — títulos curtos, mensagem breve.
- macOS: ícone do app aparece automaticamente (pode ser substituído); suporta supressão de alerts repetidos, accessory view, botão Help.
  - Usar o símbolo de cautela (exclamationmark.triangle) com moderação — só quando é preciso atenção extra de verdade (perda inesperada de dados), nunca em tarefas cujo único propósito é salvar ou esvaziar a lixeira.
- visionOS: aparece na frente da janela do app, levemente à frente no eixo z; permanece ancorado à janela se ela for movida; centralizado no campo de visão numa Full Space.
  - Accessory view com no máximo 154 pt de altura e 16 pt de raio de canto.

**Equivalente web**
- `role="alertdialog"` com `aria-modal="true"`, título via `aria-labelledby`, corpo via `aria-describedby`.
- Foco entra e fica preso no dialog, volta ao elemento que o disparou ao fechar.
- Ação padrão/primária no lado final (direita, em LTR); Cancel no lado inicial (esquerda).
- Ação destrutiva com estilo visual distinto e, seguindo a regra do HIG, não como foco automático quando a pessoa já a escolheu de propósito.

### Page controls

**O que é / quando usar**: fileira de indicadores (pontos) representando páginas numa lista plana e ordenada.

**Regras**
- Usar só para navegação sequencial entre páginas, nunca para relações hierárquicas/não sequenciais — nesse caso usar sidebar ou split view.
- Centralizar horizontalmente perto da base da view/janela.
- Evitar mais de ~10 pontos (difícil contar rapidamente) — usar grid para mais páginas.
- Padrão: imagem de ponto do sistema; ponto sólido = página atual; pode usar imagem única para uma página específica (ex.: localização atual) ou uma imagem padrão customizada para todas.
- Imagens de indicador customizadas: simples e claras, sem espaço negativo, texto ou linhas internas (ficam ilegíveis em tamanho minúsculo).
- Evitar mais de 2 imagens de indicador diferentes num mesmo controle (fica confuso e difícil de memorizar).
- Evitar colorir as imagens de indicador — deixar o sistema colorir automaticamente para manter contraste.
- iOS/iPadOS: tocar no lado inicial/final do indicador atual revela a página anterior/seguinte; "scrub" (tocar e arrastar) abre páginas em sequência, e passar da borda pula direto para a primeira/última.
  - Animar a transição só no toque, nunca no scrub (evita travamentos e flashes).
  - Estilos de fundo: Automatic (só aparece durante interação — usar quando o page control não é o controle de navegação principal), Prominent (sempre visível — só quando é o controle principal da tela), Minimal (nunca visível, sem feedback de scrub — não habilitar scrubber com esse estilo).
- tvOS: usar só em coleções de páginas em tela cheia, ricas em conteúdo; evitar controles extras (atrapalha o foco).
- visionOS: só indicativo, sem interação.
- watchOS: vertical (rolagem com a Digital Crown) ou horizontal (na base da tela); considerar limitar cada página à altura de uma tela; usar páginas de altura variável com moderação, colocadas depois das de altura fixa.
- Não suportado em macOS.

**Equivalente web**
- Paginação em pontos: `nav aria-label="pagination"` com botões, `aria-current="true"` no ponto ativo.
- Limitar pontos visíveis e truncar/colapsar acima de ~10, espelhando o limite do HIG, ou trocar por paginação numerada/grid.

### Panels

**O que é / quando usar**: janela auxiliar flutuante, só macOS, com controles/informações complementares ligados à janela ativa ou à seleção atual.

**Regras**
- Usar para dar acesso rápido a controles/informação relacionados ao conteúdo em edição (ex.: inspector).
- Inspector = atualiza automaticamente com a seleção; se o conteúdo permanece fixo independente da seleção, usar uma janela regular (Info window), não um panel.
- Preferir controles de ajuste simples (sliders, steppers) em vez de exigir digitação ou seleção multi-etapa.
- Título breve com um substantivo (capitalização de título) — ex.: "Fonts", "Colors", "Inspector".
- Trazer todos os panels abertos do app para frente quando o app se torna ativo (independente de qual janela estava ativa); esconder todos quando o app fica inativo.
- Não listar panels no menu Window de documentos (comandos de Show/Hide podem ficar nesse menu, mas panels não são documentos).
- Em geral, evitar deixar o botão de minimizar disponível num panel.
- Referir-se ao panel pelo título, sem a palavra "panel", nos menus (ex.: "Show Fonts"); em documentação de ajuda, usar o título sozinho ou acrescentar "window" quando ajuda a clareza (ex.: "Fonts window").
- Panel estilo HUD (escuro, translúcido): usar só em apps orientados a mídia (filmes/fotos/apresentação de slides), quando um panel padrão obscureceria conteúdo essencial, ou quando não precisa de controles além do disclosure triangle (a maioria dos controles do sistema não combina com a aparência HUD). Preferir panels padrão fora desses casos.
  - Manter um único estilo de panel quando o app muda de modo (ex.: tela cheia).
  - Usar cor com moderação num HUD; manter HUDs pequenos — nunca obscurecer o conteúdo que ajustam.
- Não suportado em iOS, iPadOS, tvOS, visionOS, watchOS.

**Equivalente web**
- Paleta flutuante não modal: `role="dialog"` sem `aria-modal` (mantém a página de fundo interativa), arrastável.
- O análogo mais comum na web é uma "toolbar flutuante"/painel de inspeção fixado numa lateral, sem o comportamento real "sempre no topo" de uma janela de SO.

### Popovers

**O que é / quando usar**: view transiente que aparece sobre o conteúdo quando alguém clica ou toca num controle.

**Regras**
- Usar para expor uma quantidade pequena de informação/funcionalidade — desaparece após a interação.
- Considerar quando se quer mais espaço para conteúdo temporário (evita o peso de sidebar/panel).
- Posicionar bem: a seta deve apontar o mais diretamente possível para o elemento que o revelou; idealmente não cobre esse elemento nem conteúdo essencial.
- Botão Close (incluindo Cancel/Done) só quando dá clareza (ex.: sair salvando ou não) — do contrário, o popover fecha ao clicar/tocar fora ou ao selecionar um item. Se há múltiplas seleções possíveis, mantê-lo aberto até dispensa explícita ou clique/toque fora.
- Sempre salvar o trabalho ao fechar automaticamente um popover não modal; descartar só quando a pessoa clica um botão Cancel explícito.
- Mostrar só um popover por vez — nunca uma cascata/hierarquia de popovers emergindo um do outro; fechar o atual antes de abrir um novo.
- Nada aparece sobre um popover, exceto um alert.
- Quando possível, permitir fechar um popover e abrir outro com um único clique/toque.
- Manter o popover só grande o suficiente para seu conteúdo e para apontar à origem; se o tamanho muda, animar a transição suavemente (para não parecer que um novo popover substituiu o antigo).
- Não usar a palavra "popover" em documentação de ajuda — referir-se à tarefa ou seleção específica.
- Não usar popover para avisos — usar um alert.
- iOS/iPadOS: evitar popovers em views compact — reservar para views largas; em compact usar uma view modal em tela cheia (sheet).
- macOS: pode ser destacável (drag) e virar um panel separado, que permanece visível enquanto a pessoa interage com outro conteúdo; manter a aparência do popover destacado o mais parecida possível com a original.
- Não suportado em tvOS, watchOS.

**Equivalente web**
- `role="dialog"` não modal ou `<dialog>` nativo sem backdrop, posicionado via biblioteca de anchor positioning, com seta apontando ao gatilho.
- Fechar em clique fora ou Escape (`aria-haspopup="dialog"` no gatilho, foco volta ao gatilho ao fechar).
- Nunca empilhar mais de um popover — fechar o anterior antes de abrir o próximo, espelhando a regra "um por vez".

### Scroll views

**O que é / quando usar**: permite ver conteúdo maior que os limites da view, movendo-o vertical ou horizontalmente; sem aparência própria além do indicador translúcido de rolagem.

**Regras**
- Suportar os gestos de rolagem e atalhos de teclado padrão; indicadores customizados precisam ter o comportamento elástico esperado.
- Deixar claro quando o conteúdo é rolável (ex.: mostrar parte do conteúdo cortado na borda indica que há mais nessa direção).
- Evitar aninhar scroll views com a mesma orientação (interface imprevisível); scroll horizontal dentro de vertical (ou vice-versa) é aceitável.
- Considerar rolagem página a página com tamanho de página definido e uma unidade de sobreposição opcional para preservar contexto.
- Rolar automaticamente só o necessário nestes casos: seleção de resultado de busca fora da área visível, entrada de texto começando fora da tela, ponteiro passando da borda da view durante seleção, seleção seguida de rolagem antes de agir.
- Se suportar zoom, definir escala mínima e máxima sensatas (não deixar um único caractere preencher a tela).
- Efeito de borda de rolagem (iOS/iPadOS/macOS): separação visual entre barras flutuantes (toolbars) e a área rolável atrás delas.
  - Preferir o estilo automático (mais opaco, funciona bem com muitos controles/cabeçalhos fixos); usar hard/soft só depois de testar legibilidade.
  - Usar apenas quando há uma scroll view atrás de elementos flutuantes (não é decorativo).
  - Um efeito por view/painel (manter alturas consistentes entre painéis de split view).
- iOS/iPadOS: mostrar page control em modo página a página; não mostrar o indicador de rolagem no mesmo eixo do page control (redundante).
- macOS: o indicador de rolagem é chamado de "scroll bar"; usar scroll bars pequenas/mini em panels que precisam coexistir com outras janelas (tamanho consistente entre todos os controles desse panel).
- tvOS: sem indicadores de rolagem distintos — o sistema rola automaticamente para manter os itens focados visíveis.
- visionOS: indicador com tamanho pequeno e fixo, posição previsível (centralizado verticalmente na borda final para rolagem vertical, centralizado horizontalmente na borda inferior para horizontal).
  - Olhar para ele + gesto de arrastar habilita um "jog bar" de velocidade de rolagem.
  - Considerar o indicador levemente mais espesso que no iOS ao definir margens apertadas.
  - Look to Scroll: rolar só com o olhar perto da borda da view. Suportar em views de leitura/navegação, evitar em views com controles/informação densa que exige rolagem precisa. Manter consistência entre views parecidas; usar largura/altura total da janela para bordas de rolagem claras; remover efeitos de rolagem customizados (parallax) antes de habilitar.
- watchOS: preferir conteúdo com rolagem vertical via Digital Crown; usar tab views em pilha vertical para rolagem página a página (com page indicator); considerar limitar cada página a uma altura de tela; o page indicator vira indicador de rolagem em páginas mais longas.

**Equivalente web**
- `overflow: auto`/`scroll` no container; evitar containers de rolagem aninhados no mesmo eixo.
- Toolbar fixa/flutuante sobre uma área rolável precisa de um scrim ou fundo desfocado (`backdrop-filter`) espelhando a regra do efeito de borda de rolagem, para manter texto legível por baixo.
- `scroll-snap-type` para comportamento página a página.

### Sheets

**O que é / quando usar**: view para uma tarefa delimitada, muito ligada ao contexto atual; modal (macOS/tvOS/visionOS/watchOS) ou modal/não modal (iOS/iPadOS).

**Regras**
- macOS/tvOS/visionOS/watchOS: sheet sempre modal. iOS/iPadOS: pode ser modal ou não modal (não modal permite agir na view pai sem dispensar o sheet, ex.: sheet de formatação das Notes).
- Botões comuns: Cancel/Close (dispensa sem salvar), Done (dispensa após completar/salvar), Back (navega a um passo anterior ou à view pai — nunca dispensa o sheet).
- Para fluxos complexos/prolongados, considerar alternativas: estilo de view modal em tela cheia (iOS/iPadOS) para vídeo/foto/câmera ou edição multi-etapa; nova janela ou modo tela cheia (macOS); transição para uma Full Space (visionOS).
- Mostrar só um sheet por vez a partir da interface principal; se uma ação dentro de um sheet precisa abrir outro, fechar o primeiro antes (pode reabri-lo depois que o segundo é dispensado).
- Usar view não modal (iOS/iPadOS), split view (visionOS) ou panel (macOS) quando o objetivo é apresentar itens suplementares que afetam a tarefa principal sem bloqueá-la.
- Sempre parear um botão Done com um Cancel ou Back — nunca depender só do Done, que sugere que completar a tarefa é a única saída.
- Nunca mostrar os três botões (Cancel, Done, Back) juntos.
- iOS/iPadOS: sheet de view única → Cancel no lado inicial da toolbar superior, Done (se houver) no lado final.
  - Multi-etapa: primeiro passo tem Cancel (inicial) + Done inativo (final, até a tarefa ficar completa); passos seguintes variam.
  - Detents: "large" (altura total) e "medium" (~metade); large é automático, adicionar medium permite repousar nas duas alturas. Considerar medium para divulgação progressiva (ex.: share sheet); usar altura total quando o conteúdo exige (ex.: compor mensagem no Messages/Mail).
  - Incluir um grabber em sheets redimensionáveis (arrastar redimensiona, tocar cicla entre detents; funciona com VoiceOver).
  - Suportar swipe para dispensar; se há mudanças não salvas, confirmar com um action sheet.
  - Preferir os estilos de apresentação page ou form no iPadOS (tamanho padrão, centralizado, fundo escurecido).
- macOS: sheet = view tipo cartão com cantos arredondados flutuando sobre a janela pai.
  - A janela pai escurece (sem interação até dispensar), mas outras janelas do app continuam interagíveis.
  - Apresentar em tamanho padrão razoável (as pessoas não esperam redimensionar sheets, mas suportar quando agrega valor, ex.: expandir para visão mais clara).
  - Ao abrir o sheet, trazer a janela pai (e seus panels modeless) para frente; permitir trazer outras janelas do app para frente sem dispensar o sheet.
  - Usar um panel em vez de sheet quando a pessoa precisa fornecer input repetidamente e observar resultados (ex.: Find and Replace).
- visionOS: flutua na frente da janela pai, escurecendo-a; evitar emergir da borda inferior — preferir centralizar no campo de visão.
  - Usar tamanho padrão que preserva contexto (evitar cobrir a maior parte da janela), com opção de redimensionar.
- watchOS: view em tela cheia deslizando sobre o conteúdo atual, semitransparente com material de blur/dessaturação sobre o fundo coberto.
  - Usar sheet só quando a tarefa modal precisa de título ou apresentação de conteúdo customizados (senão usar alert ou action sheet).
  - Manter interações breves e ocasionais — nunca para navegar conteúdo do app.
  - Ao trocar o rótulo padrão, preferir SF Symbols a texto que pareça título de página/app (a pessoa não saberia como dispensar o sheet).

**Equivalente web**
- `<dialog>` nativo (modal via `showModal()`) ou `role="dialog"` + `aria-modal="true"`.
- Bottom sheet redimensionável no mobile web espelha os detents (altura parcial vs. total) com uma alça de arrastar equivalente ao grabber.
- Convenção de posição de botão — Cancel no lado inicial/esquerdo, ação primária (Done/Save) no lado final/direito, seguindo a regra do HIG.
- Swipe para dispensar via gesto de toque; confirmar mudanças não salvas com um dialog de confirmação aninhado.

### Windows

**O que é / quando usar**: apresenta views e componentes de UI; em iPadOS/macOS/visionOS define os limites visuais do conteúdo e habilita multitarefa.

**Regras**
- Dois tipos conceituais: janela primária (navegação e conteúdo principal) e janela auxiliar (tarefa única e dedicada, sem navegação para outras áreas do app, geralmente com botão de fechar).
- Fazer as janelas se adaptarem fluidamente a diferentes tamanhos para multitarefa/multi-janela.
- Escolher com cuidado o momento de abrir uma nova janela (ex.: Compose no Mail abre nova janela para manter mensagem nova e email original visíveis) — evitar abrir janelas em excesso como comportamento padrão.
- Considerar oferecer a opção de ver conteúdo numa nova janela (comando em menu de contexto ou menu File), em vez de forçar isso por padrão.
- Evitar UI de janela customizada — nunca replicar frames/controles de janela do sistema; uma réplica imperfeita faz o app parecer quebrado.
- Usar o termo "window" (janela) em conteúdo voltado à pessoa, nunca "scene" ou outros termos de implementação.
- iPadOS: dois modos de apresentação escolhidos pela pessoa em Multitasking & Gestures.
  - Full screen: troca de janela via app switcher.
  - Windowed: redimensionável livremente, reposicionável; o sistema lembra tamanho e posição mesmo com o app fechado.
  - Controles de janela (lado inicial da toolbar, só aparecem no modo windowed) não podem sobrepor botões de toolbar — mover botões para dentro em vez de colocá-los direto na borda inicial.
  - Considerar um gesto (ex.: pinça) para abrir conteúdo em nova janela.
  - Se só precisa mostrar um arquivo, dá para apresentar sem criar uma janela própria, mas o app ainda precisa suportar múltiplas janelas no geral.
- macOS: janela = frame (controles + toolbar, raramente uma bottom bar) + área de corpo.
  - 3 estados: Main (a mais à frente, só uma por app), Key/ativa (recebe input, só uma na tela — geralmente a main, mas panels também podem ser key), Inactive.
  - O sistema dá aparência distinta a cada estado (cor vs. cinza nos controles de semáforo, vibrância só em main/key) — replicar isso manualmente se não usar componentes do sistema.
  - Evitar informação/ação crítica numa bottom bar (a janela pode ser movida escondendo a borda inferior).
  - Se usar bottom bar, manter pequena (ex.: status bar do Finder com contagem de itens) — para mais informação, usar um inspector (lado final de um split view).
- visionOS: dois estilos principais.
  - Window: plano vertical com fundo "glass", inclui botão de fechar/window bar/controles de redimensionar, pode ter botão Share/tab bar/toolbar/ornaments. Estilo plain = igual ao default, sem o fundo glass.
  - Volume: conteúdo 2D/3D visível de qualquer ângulo; botão de fechar/window bar rotacionam para encarar quem observa.
  - Tamanho inicial padrão de janela: 1280x720 pt, abrindo a ~2 m de distância (~3 m de largura aparente) — minimizar espaço vazio.
  - Escolher formato inicial de acordo com o conteúdo (larga para slides, alta para páginas longas); definir tamanho mínimo e máximo por janela.
  - Manter o fundo glass — removê-lo prejudica legibilidade e desconecta visualmente o conteúdo; fundo opaco parece pesado/constritivo.
  - Minimizar a profundidade de conteúdo 3D numa janela (o sistema recorta conteúdo que se estende demais) — usar volume para 3D profundo.
  - Volumes: preferir escala dinâmica (legível/usável a distância), a menos que representem um objeto real em escala real (escala fixa, o padrão).
  - Glow padrão da baseplate ajuda a identificar as bordas do volume (visionOS 2+) — evitar para conteúdo full-bleed ou baseplate customizada.
  - Considerar um ornament para conteúdo de alto valor — evitar a mesma borda de toolbar/tab bar; preferir só um ornament extra.
  - Escolher alinhamento (paralelo ao chão vs. inclinado ao olhar) conforme o nível de interação esperado com o volume.
- Não suportado em iOS, tvOS, watchOS.

**Equivalente web**
- Janela primária = a própria página (`document`); janela auxiliar = uma janela/aba nova de verdade (`window.open`) reservada a uma tarefa única, ou, mais comum na web, um modal (`<dialog>`) simulando uma janela auxiliar sem semântica real de multi-janela de SO.
- Não há equivalente direto aos estados de janela do macOS (main/key/inactive); o mais próximo é `document.hasFocus()`/`:focus-within` para distinguir a aba/janela do navegador em foco.

## Seleção e entrada

### Color wells

**O que é / quando usar**: ajusta a cor de texto, formas, guias e outros elementos na tela; abre um color picker (do sistema ou customizado) ao clicar/tocar.

**Regras**
- Preferir o color picker do sistema para uma experiência familiar e consistente — também permite salvar uma paleta acessível de qualquer app, e mantém a experiência consistente entre iOS/iPadOS/macOS.
- macOS: ao clicar, o color well recebe destaque (confirmação visual de que está ativo); depois da seleção, o well atualiza para mostrar a nova cor. Color wells suportam drag and drop entre si e do color picker para um well.
- Não suportado em tvOS, watchOS.

**Equivalente web**
- `input type="color"` (picker nativo) ou um swatch customizado que abre um popover de color picker (`role="dialog"`).
- Suportar drag-and-drop de valores de cor (`dataTransfer` com MIME de cor) para espelhar o arrastar entre wells.

### Combo boxes

**O que é / quando usar**: combina um campo de texto com um botão pull-down num único controle (só macOS); valores customizados digitados não são adicionados à lista.

**Regras**
- Popular o campo com um valor padrão significativo da lista (não precisa ser o primeiro item); o campo pode começar vazio.
- Usar um rótulo introdutório indicando o tipo de item esperado (capitalização de título, terminando em dois-pontos).
- Fornecer escolhas relevantes — a pessoa aprecia tanto a entrada customizada quanto a conveniência de escolher da lista.
- Garantir que itens da lista não sejam mais largos que o campo de texto (item largo demais pode ser truncado, dificultando a leitura).
- Não suportado em iOS, iPadOS, tvOS, visionOS, watchOS.

**Equivalente web**
- `input` com atributo `list` apontando para um `datalist` (combobox nativo), ou o padrão ARIA 1.2 de combobox (`role="combobox"` + `aria-expanded`/`aria-controls` + `listbox`) quando precisa de filtro/estilo customizado.
- Manter a largura do popup ≤ largura do input para evitar o problema de truncamento apontado pelo HIG.

### Digit entry views

**O que é / quando usar**: view em tela cheia (tvOS) pedindo uma sequência de dígitos (ex.: PIN) via teclado específico para dígitos.

**Regras**
- Usar campos de dígito seguros (mostram asteriscos em vez do dígito digitado) sempre que o dado for sensível.
- Deixar claro o propósito com um título e um prompt explicando por que os dígitos são necessários.
- Não suportado em iOS, iPadOS, macOS, visionOS, watchOS.

**Equivalente web**
- `input type="password" inputmode="numeric" pattern="[0-9]*"` por dígito (ou um único input numérico mascarado); `autocomplete="one-time-code"` quando for um código OTP.
- Rótulo/`aria-describedby` deve declarar o propósito, espelhando o título e o prompt exigidos.

### Image wells

**O que é / quando usar**: versão editável de uma image view (macOS): depois de selecionar, a pessoa pode copiar/colar ou apagar a imagem; dá para arrastar uma imagem nova sem selecionar antes.

**Regras**
- Voltar à imagem padrão se o well exige uma e seu conteúdo é limpo.
- Se suporta copiar/colar, garantir que os itens padrão de copiar/colar do menu Edit (e os atalhos) funcionem.
- Não suportado em iOS, iPadOS, tvOS, visionOS, watchOS.

**Equivalente web**
- Drop-zone com `input type="file" accept="image/*"` combinado a handlers de drag-and-drop.
- Suporte explícito a colar (evento `paste` lendo `clipboardData.items`) e uma ação de apagar/limpar que restaura uma imagem placeholder.

### Pickers

**O que é / quando usar**: exibe uma ou mais listas roláveis de valores distintos para escolher (valores únicos ou compostos, incluindo data/hora).

**Regras**
- Usar para listas de médio a longo comprimento; listas curtas → usar pull-down button em vez de picker (o picker adiciona peso visual demais); conjuntos muito grandes → usar lista/tabela (pode incluir índice para pular rápido).
- Usar valores previsíveis e logicamente ordenados (ex.: alfabetizados) para que a pessoa navegue rápido mesmo sem ver todos os valores.
- Evitar trocar de view para mostrar um picker — exibir em contexto (abaixo ou perto do campo em edição), tipicamente na base da janela ou num popover.
- Listas de minutos: padrão de 60 valores (0 a 59); pode ampliar o intervalo só se dividir 60 igualmente (ex.: quartos de hora: 0/15/30/45).
- iOS/iPadOS: estilos de date picker — Compact (botão que abre conteúdo editável num modal/popover), Inline (rodas para hora; visão de calendário para data), Wheels (rodas de rolagem, suporta entrada por teclado), Automatic (o sistema escolhe).
  - 4 modos: Date, Time, Date and time, Countdown timer (horas e minutos até 23h59 — indisponível nos estilos inline/compact).
  - Usar compact quando o espaço é limitado.
- macOS: dois estilos — Textual (espaço limitado, seleções específicas) e Graphical (navegar dias/intervalos, aparência de relógio).
- tvOS: disponível via SwiftUI `Picker`.
- watchOS: navegado pela Digital Crown; estilo wheels para listas e data/hora; dá para configurar outline, legenda e indicador de rolagem; em listas longas, um botão de navigation link abre a lista (ainda dá para rolar com a Digital Crown sem tocar o botão).

**Equivalente web**
- `select`/`select multiple` para listas fechadas curtas a médias.
- Padrão ARIA `listbox` para listas longas customizadas que precisam de navegação por teclado.
- `input type="date"`/`type="time"`/`type="datetime-local"` para pickers nativos equivalentes aos modos Date/Time/Date and time.
- Um stepper de intervalo de minutos customizado reforça a regra "divide 60 igualmente" no client.

### Segmented controls

**O que é / quando usar**: conjunto linear de 2+ segmentos, cada um funcionando como botão; oferece escolha única (ou, no macOS, única ou múltipla) entre opções bem relacionadas; também pode agir como botões momentâneos, sem estado de seleção.

**Regras**
- Usar para escolhas fortemente relacionadas que afetam um objeto/estado/view (ex.: intervalo de tempo num gráfico, alternar painéis de edição numa toolbar).
- Considerar quando é importante agrupar funções visualmente ou mostrar claramente o estado de seleção (o agrupamento se mantém independente do tamanho da view ou de onde aparece).
- Manter o tipo de controle consistente dentro do mesmo segmented control — não misturar segmentos de ação com segmentos de estado de seleção.
- Limitar o número de segmentos: cerca de 5 a 7 numa interface larga, no máximo cerca de 5 no iPhone.
- Manter o tamanho dos segmentos consistente (largura igual; larguras de ícone/título também consistentes).
- Preferir texto ou imagens — não misturar os dois — dentro de um mesmo controle.
- Usar conteúdo de tamanho parecido em cada segmento (preenchimento desigual fica ruim com largura igual).
- Rótulos de segmento: substantivos ou frases nominais, capitalização de título; controle com rótulos de texto não precisa de texto introdutório.
- iOS/iPadOS: bom para alternar entre subviews muito relacionadas (ex.: New Event vs. New Reminder no sheet do Calendar); usar tab bar, não segmented control, para alternar seções completamente separadas do app.
- macOS: considerar texto introdutório para clarear o propósito; adicionar tooltip por segmento se o app já usa tooltips.
  - Usar tab view (não segmented control) na área principal da janela para trocar de view — reservar segmented control para trocar view em toolbar/inspector.
  - Pode suportar spring loading (force click + arrastar itens selecionados sobre o segmento, com Magic Trackpad).
- tvOS: preferir split view a segmented control em telas de filtragem de conteúdo (navegação de ida e volta mais fácil).
  - Evitar posicionar outros elementos focáveis perto (o foco, não o clique, seleciona segmentos — elementos próximos arriscam foco acidental).
- visionOS: ao olhar para um segmento com ícone, o sistema mostra um tooltip com o texto descritivo fornecido.
- Não suportado em watchOS.

**Equivalente web**
- Grupo ARIA `radiogroup` de `role="radio"` renderizado como barra segmentada (escolha única), ou um `toolbar`/`group` de botões toggle com `aria-pressed` (escolha múltipla, estilo macOS).
- Limitar segmentos visíveis e colapsar o excedente num menu/dropdown acima de ~5-7, espelhando o limite de segmentos.

### Sliders

**O que é / quando usar**: trilho horizontal (ou específico da plataforma) com um "thumb" ajustável entre mínimo e máximo; o trilho preenchido mostra o progresso do mínimo até o thumb.

**Regras**
- Customizar a aparência (cor do trilho, imagem/tint do thumb, ícones à esquerda/direita) só quando agrega valor ou comunica intenção (ex.: ícone de imagem pequena→grande num slider de tamanho).
- Direções familiares: mínimo no lado inicial / máximo no lado final para sliders horizontais; mínimo embaixo / máximo em cima para verticais.
- Considerar parear com um campo de texto (valor exato) e um stepper (incrementos inteiros) em faixas de valores amplas.
- iOS/iPadOS: não usar slider para volume de áudio — usar uma volume view (customizável, inclui controle de dispositivo de saída).
- macOS: pode incluir marcas de escala (tick marks) para facilitar acertar um valor específico.
  - Slider linear: thumb em forma de losango estreito, trilho preenchido do mínimo ao thumb, ícones suplementares opcionais.
  - Slider circular: thumb circular pequeno, tick marks como pontos igualmente espaçados.
  - Considerar feedback ao vivo enquanto o valor muda (ex.: preview do tamanho do ícone no Dock).
  - Escolher horizontal para um intervalo fixo de início/fim (ex.: opacidade 0-100%); circular para valores repetitivos/indefinidos (ex.: rotação 0-360°, ou giros sem limite).
  - Considerar um rótulo introdutório (capitalização de frase, terminando em dois-pontos).
  - Usar tick marks para clareza/precisão; rotular (números ou palavras) só quando reduz confusão — rotular apenas mínimo e máximo costuma bastar; em valores não lineares, rótulos periódicos ajudam.
  - Fornecer tooltip mostrando o valor do thumb ao passar o ponteiro.
- visionOS: preferir sliders horizontais (gesto lateral é mais fácil que de cima para baixo).
- watchOS: trilho horizontal em passos discretos ou barra contínua; botões nas laterais aumentam/diminuem por um valor predefinido; glifos padrão são mais/menos — criar glifos customizados se necessário para comunicar o propósito.
- Não suportado em tvOS.

**Equivalente web**
- `input type="range"` com `min`/`max`/`step`; `aria-valuenow`/`aria-valuemin`/`aria-valuemax` já vêm nativamente do input.
- Tick marks via atributo `list` + `datalist` com `<option>`.
- Parear com um `input type="number"` espelhando o valor do slider, para a combinação "slider + campo de texto + stepper".

### Steppers

**O que é / quando usar**: controle de dois segmentos para aumentar/diminuir um valor incremental; não mostra o valor em si — fica ao lado de um campo que exibe o valor atual.

**Regras**
- Deixar óbvio qual valor o stepper afeta (contexto ao redor ou campo adjacente precisa mostrar qual valor está mudando).
- Parear com um campo de texto quando mudanças grandes de valor são prováveis (o stepper sozinho é ótimo para pequenos ajustes com poucos toques/cliques) — ex.: tela de impressão se beneficia de stepper + campo para número de cópias.
- macOS: para faixas grandes, considerar suportar Shift-click para mudar o valor mais rápido (ex.: 10x o incremento padrão).
- Não suportado em watchOS, tvOS.

**Equivalente web**
- Dois `button`s (incrementar/decrementar) ao lado de um `input` numérico, ou `input type="number"` nativo com spin buttons.
- Anunciar o valor atual via `aria-live="polite"` no campo adjacente, já que o stepper em si não tem valor visível.
- Suportar um modificador (Shift) para um passo maior, espelhando o comportamento de faixa grande do macOS.

### Text fields

**O que é / quando usar**: área retangular para digitar ou editar pedaços pequenos e específicos de texto.

**Regras**
- Usar para pouca informação (nome, email) — usar text view para textos maiores.
- Mostrar placeholder text (ex.: "Email", "Password") para comunicar o propósito; considerar também um rótulo separado, já que o placeholder some assim que a pessoa começa a digitar.
- Usar campos de texto seguros para dados sensíveis — sempre para senhas.
- Ajustar o tamanho do campo à quantidade de texto esperada.
- Espaçar bem múltiplos campos de texto; empilhar verticalmente quando possível, com larguras consistentes (ex.: nome e sobrenome numa largura, endereço e cidade em outra).
- Garantir que o tab entre campos siga uma sequência lógica (o sistema costuma resolver isso automaticamente).
- Validar quando faz sentido — o momento depende do contexto: validar email ao trocar de campo; validar usuário/senha antes de deixar trocar de campo.
- Usar um number formatter para dados numéricos (só aceita valores numéricos; pode formatar casas decimais, porcentagem ou moeda) — não assumir a apresentação exata, ela varia por localidade.
- Tratamento de quebra de linha: recorte (padrão), quebra (por caractere ou palavra), ou truncamento (reticências no início, meio ou fim); considerar um tooltip de expansão para mostrar o texto completo ao passar o ponteiro.
- iOS/iPadOS/tvOS/visionOS: mostrar o tipo de teclado apropriado ao conteúdo (ver Virtual keyboards).
- tvOS/watchOS: minimizar entrada de texto — preferir botões ou outras formas eficientes de coletar informação.
- iOS/iPadOS: mostrar botão Clear no lado final do campo para apagar o input; usar imagens/botões customizados no lado inicial para indicar o propósito do campo, e no lado final para funcionalidades extras (ex.: botão Bookmarks).
- macOS: considerar um combo box quando precisa parear entrada de texto com uma lista de escolhas.
- watchOS: apresentar um campo de texto só quando necessário — preferir uma lista de opções à entrada de texto.

**Equivalente web**
- `input type="text"/"email"/"tel"/"password"` com `inputmode`/`autocomplete` correspondentes (espelha "mostrar o teclado apropriado").
- `label` visível junto ao `placeholder` (nunca só placeholder — o HIG lembra que ele some ao digitar).
- Formatação numérica via `Intl.NumberFormat` no blur, mantendo o valor numérico bruto no estado.
- `maxlength` + `text-overflow: ellipsis` para o comportamento de recorte/truncamento, com `title` como tooltip de expansão de baixo custo.

### Toggles

**O que é / quando usar**: permite escolher entre um par de estados opostos (ligado/desligado) usando aparência diferente para cada estado; estilos incluem switch e checkbox (dependendo da plataforma); botões também podem se comportar como toggle mudando a aparência.

**Regras**
- Usar só para controlar o estado de conteúdo/uma view — para escolher de uma lista, usar outro componente (ex.: pop-up button).
- Identificar claramente o que o toggle afeta — geralmente o contexto ao redor já dá isso; no macOS costuma-se adicionar um rótulo explícito; botões que se comportam como toggle usam um ícone de interface cuja aparência (tipicamente o fundo) muda com o estado.
- Deixar a diferença visual entre ligado/desligado óbvia (preenchimento, forma de fundo, detalhes internos como check ou ponto) — nunca depender só de cor (acessibilidade).
- iOS/iPadOS: usar o estilo switch só dentro de uma linha de lista (o conteúdo da linha já dá o contexto — não precisa de rótulo separado).
  - Mudar a cor padrão do switch (verde) só se necessário (o accent color do app serve, desde que tenha contraste suficiente com o estado desligado).
  - Fora de uma lista, usar um botão que se comporta como toggle, não um switch (ex.: o botão de filtro do Phone usa destaque azul, não um switch) — e evitar fornecer um rótulo explicando o propósito do botão (o ícone + mudança de fundo já comunicam isso).
- macOS: switches, checkboxes e radio buttons pertencem ao corpo da janela, nunca à toolbar ou status bar.
  - Switch: preferir para configurações que se quer enfatizar/que controlam mais funcionalidade que um item só. Mini switch para controlar uma linha só dentro de um formulário agrupado (altura de linha consistente, ex.: configurações subordinadas sob uma configuração primária com switch regular). Em geral, não substituir um checkbox já existente por um switch.
  - Checkbox: quadrado pequeno, vazio=desligado, com check=ligado, com traço=misto; costuma ter título no lado final (checklists editáveis podem omitir).
    - Usar em vez de switch ao apresentar uma hierarquia de configurações (alinhamento/indentação mostram dependência); usar radio buttons em vez disso quando há mais de 2 opções mutuamente exclusivas.
    - Rotular um grupo de checkboxes se a relação não é clara (alinhar a base do rótulo com o primeiro checkbox).
    - Refletir com precisão o estado misto quando um checkbox alterna globalmente checkboxes subordinados com estados diferentes.
  - Radio buttons: círculo pequeno + rótulo, geralmente em grupos de 2 a 5; estado selecionado (círculo preenchido) ou desmarcado (círculo vazio) — estado misto raramente é útil (preferir checkbox nesse caso).
    - Preferir para opções mutuamente exclusivas (checkboxes para múltipla escolha); evitar listas longas (mais de ~5 → usar pop-up button).
    - Para uma única configuração ligado/desligado, preferir checkbox a um radio button isolado (presença/ausência do check é mais clara) — um par de radio buttons só em casos raros onde um checkbox não comunica bem.
    - Usar espaçamento consistente medido pelo rótulo mais longo ao exibir radio buttons horizontalmente.
- tvOS/visionOS/watchOS: sem considerações adicionais além das gerais — totalmente suportado.

**Equivalente web**
- `input type="checkbox"` para semântica de checkbox/switch; um "switch" é um checkbox reestilizado visualmente — adicionar `role="switch"` + `aria-checked` para leitores de tela anunciarem corretamente.
- `input type="radio"` agrupados pelo mesmo `name` (equivalente à exclusividade mútua dos radio buttons do macOS; limitar o grupo a ~5 opções).
- Estado indeterminado/misto via a propriedade DOM `indeterminate` num checkbox (espelha o estado "traço" misto).
- Nunca codificar ligado/desligado só via `background-color` — parear com mudança de ícone/texto, seguindo a regra de não depender só de cor.

### Virtual keyboards

**O que é / quando usar**: teclados na tela fornecidos pelo sistema para dispositivos sem teclado físico; conjuntos de teclas específicos por tarefa; não suportam atalhos de teclado.

**Regras**
- Escolher um teclado compatível com o tipo de conteúdo (numérico, email etc.) — especificar o tipo de conteúdo semântico deixa o sistema escolher automaticamente e refinar a autocorreção.
- Customizar o tipo de tecla Return quando isso clarifica a experiência de entrada (ex.: tecla Return de busca em campos de busca).
- Input view customizada: substitui o teclado do sistema enquanto a pessoa está no app, para entrada específica (ex.: input view numérica do Numbers) — garantir que o benefício seja claro para não confundir sobre o sumiço do teclado padrão; tocar o som padrão de teclado ao digitar (a pessoa pode desligar todos os sons de teclado em Ajustes).
- Teclado customizado (extensão de app, iOS/iPadOS/tvOS): substitui o teclado do sistema em qualquer lugar, exceto em campos de texto seguro e campos de número de telefone, depois que a pessoa habilita em Ajustes.
  - Faz sentido para necessidades de entrada únicas em todo o sistema (ex.: idioma não suportado) — não para funcionalidade só do próprio app (nesse caso usar input view customizada).
  - Fornecer forma óbvia de trocar de teclado (espelhar a tecla Globe).
  - Evitar duplicar teclas do sistema (Emoji/Globe, Dictation) que persistem de qualquer forma.
  - Considerar um tutorial no próprio app (não dentro do teclado) já que aprender um teclado novo leva tempo.
- iOS/iPadOS: usar o keyboard layout guide para que a UI do app e o teclado coexistam (mantém UI importante visível, botões tocáveis) — sem isso, o teclado pode obscurecer conteúdo ou dificultar toques em botões.
  - Posicionar controles customizados acima do teclado (input accessory view) só quando diretamente relevantes à tarefa atual.
  - Aplicar Liquid Glass a essa view se o resto da UI já usa (uma toolbar padrão já adota automaticamente).
- tvOS: teclado virtual linear via Siri Remote; tela de teclado em grade (layout do conteúdo se adapta) para outros dispositivos de entrada; teclado específico de dígitos para digit entry views (ver Digit entry views).
- visionOS: suporta gestos diretos e indiretos, aparece numa janela separada e móvel — não é preciso considerar a posição dele no layout.
- watchOS: mostra teclado se a tela é grande o suficiente; senão, dita­do ou Scribble; não dá para mudar o tipo de teclado, mas dá para definir o content type do campo de texto (ajuda o sistema a oferecer sugestões); um iPhone pareado próximo também pode ser usado para digitar.
- Não suportado em macOS.

**Equivalente web**
- `inputmode` (`numeric`, `email`, `tel`, `url`, `search` etc.) junto com o atributo `type` correspondente controla a variante do teclado virtual do navegador móvel, espelhando "escolher o teclado compatível com o conteúdo".
- `enterkeyhint` (`search`, `send`, `done`, `next`...) mapeia a customização da tecla Return.
- Não há equivalente web a teclados customizados instaláveis no sistema; uma input view customizada na própria página (ex.: um teclado numérico sobreposto) é o análogo mais próximo de "input view customizada".

## Status

### Activity rings

**O que é / quando usar**: mostram o progresso diário da pessoa nas metas Move, Exercise e Stand (watchOS: sempre 3 anéis; iOS: 1 anel — Move — ou os 3 se há um Apple Watch pareado).

**Regras**
- Mostrar só quando relevante ao propósito de saúde/fitness do app (especialmente se contribui para o HealthKit).
- Usar estritamente para Move/Exercise/Stand — nunca reaproveitar para outros dados, nunca inventar um elemento parecido com anel para outra finalidade.
- Representar o progresso de uma única pessoa — nunca agregar mais de uma pessoa; deixar claro de quem é o progresso mostrado (rótulo, foto ou avatar).
- Aparência visual é fixa e não negociável:
  - Nunca mudar as cores dos anéis (sem filtros nem mudança de opacidade); sempre exibir num fundo preto.
  - Preferir encaixar os anéis+fundo num círculo ajustando o raio de canto, não com uma máscara circular.
  - Manter o fundo preto visível ao redor do anel mais externo (adicionar um traço preto fino se necessário, sem gradiente/sombra/outro efeito).
  - Sempre escalar proporcionalmente; adaptar a interface ao redor dos anéis, nunca os anéis à interface.
- Cores específicas em RGB definidas para Move/Exercise/Stand devem ser usadas em qualquer rótulo/valor relacionado exibido.
- Manter margem externa mínima não menor que a distância entre os anéis; nunca deixar outros elementos cortarem, obstruírem ou invadirem os anéis ou essa margem.
- Diferenciar visualmente (espaçamento, linhas, rótulos, cor, escala) qualquer outro elemento parecido com anel para não confundir com Activity rings.
- Nunca enviar notificações duplicando as atualizações de Move/Exercise/Stand que o próprio Activity app já envia; nunca mostrar um elemento de Activity ring dentro de uma notificação (referenciar o progresso com texto próprio do app é aceitável).
- Nunca usar para decoração nem para branding (proibido em ícone do app ou material de marketing).
- iOS: a aparência muda automaticamente conforme há ou não Apple Watch pareado (3 anéis vs. aproximação só de Move a partir de passos/treinos); o histórico de uma pessoa pode misturar os dois estilos.
- Não suportado em macOS, tvOS, visionOS.

**Equivalente web**
- Sem equivalente — o HIG restringe explicitamente Activity rings a Move/Exercise/Stand e proíbe reuso decorativo/de marca; um app web que acompanhe dados concêntricos parecidos precisa construir seu próprio componente de anel/gauge, distinto, em vez de copiar esse visual, seguindo a regra "nunca usar para outros propósitos".

### Gauges

**O que é / quando usar**: exibe um valor numérico dentro de um intervalo, usando um caminho circular ou linear; o estilo padrão mostra um indicador pontual, o estilo capacity mostra um preenchimento até o valor.

**Regras**
- Também disponível numa variante "accessory", visualmente parecida com complicações do watchOS (boa para widgets de Lock Screen no iOS ou em qualquer lugar que queira ecoar o estilo de complicação).
- Escrever rótulos sucintos para o valor atual e os dois extremos do intervalo — nem todo estilo mostra todos os rótulos visualmente, mas o VoiceOver lê os que estiverem presentes.
- Considerar um preenchimento em gradiente para comunicar o propósito do gauge (ex.: vermelho a azul para temperatura quente a fria).
- O macOS também define level indicators (não gauges) com estilos capacity/rating/relevance:
  - Continuous capacity: trilho translúcido preenchido por uma barra sólida — usar para faixas grandes (em discrete os segmentos ficariam pequenos demais).
  - Discrete capacity: fileira de segmentos retangulares de tamanho igual que preenchem completamente — nunca parcialmente.
  - Cor de preenchimento padrão é verde; pode mudar em níveis significativos, ou usar o estado tiered para mostrar uma sequência de cores num só indicador.
  - Estilo rating: ver Rating indicators.
  - Estilo relevance (raramente usado): barra horizontal sombreada comunicando relevância, ex., numa lista de resultados de busca ordenados.
- Não suportado em tvOS.

**Equivalente web**
- Elemento circular/linear de progresso (SVG/CSS) com `role="meter"` (não `progressbar`, já que um gauge representa um valor dentro de um intervalo limitado, não conclusão de tarefa), com `aria-valuenow`/`aria-valuemin`/`aria-valuemax`/`aria-valuetext`.
- O visual de capacity discreto mapeia para uma fileira de N elementos-bloco preenchidos/vazios do tamanho da capacidade total, preenchidos só em unidades inteiras.

### Progress indicators

**O que é / quando usar**: mostram que o app não travou enquanto carrega conteúdo ou executa operações longas; sempre transientes (aparecem só durante, somem depois). Dois tipos: determinado (duração conhecida) e indeterminado (duração desconhecida, também chamado activity indicator/spinner).

**Regras**
- Determinado: preenche um trilho linear (inicial→final) ou circular (sentido horário).
- Indeterminado: imagem animada "girando" em todas as plataformas; o macOS também suporta uma barra de progresso indeterminada.
- Preferir indicador determinado sempre que possível (ajuda a decidir esperar, multitarefar ou abandonar).
- Reportar o avanço com o máximo de precisão possível; equilibrar o ritmo de avanço (pular de 90% em 5 segundos para os últimos 10% em 5 minutos parece enganoso ou travado).
- Manter o indicador em movimento — um indicador parado passa a sensação de processo travado ou app congelado; se realmente travar, dar feedback do problema e do que fazer.
- Trocar de indeterminado para determinado assim que a duração puder ser calculada (a pessoa geralmente prefere determinado).
- Nunca trocar entre o estilo circular e o de barra no meio da tarefa (formatos/tamanhos diferentes atrapalham a interface).
- Se mostrar uma descrição, ser preciso e sucinto — evitar termos vagos como "Loading" ou "Authenticating" (raramente agregam valor).
- Exibir o indicador num local consistente em todo o app/plataforma.
- Permitir interromper o processo quando viável (botão Cancel); adicionar também um botão Pause se interromper tem efeitos colaterais negativos (ex.: perder a parte já baixada de um arquivo). Avisar (alert com confirmar/retomar) quando cancelar causa perda real de progresso.
- Refresh control (iOS/iPadOS): escondido por padrão, aparece ao arrastar para baixo numa view (tipicamente uma table view); ainda assim, fazer atualizações automáticas periódicas — não deixar o refresh manual como único caminho de atualização; um título é opcional e, se usado, deve trazer valor (ex.: hora da última atualização), não instruções de como atualizar.
- macOS: preferir um spinner (activity indicator) para status de operação em segundo plano ou espaço restrito (pequeno, discreto — bom num campo de texto ou ao lado de um controle específico); evitar rotular um spinner (ele costuma aparecer logo depois que a pessoa inicia a ação, então um rótulo é redundante na maioria dos casos).
- watchOS: indicadores de progresso renderizam em branco sobre o fundo da cena por padrão; a cor tint é configurável.

**Equivalente web**
- `progress value max` (determinado) ou `progress` sem `value` (indeterminado, semântica nativa de spinner do navegador) — ambos mapeiam para `role="progressbar"` com `aria-valuenow` só quando determinado.
- Nunca alternar entre uma barra `<progress>` linear e um spinner circular no meio da operação, seguindo a regra de não trocar de estilo.
- Um botão Cancel/Pause próximo ao indicador espelha a orientação de permitir interromper o processo.

### Rating indicators

**O que é / quando usar**: série de símbolos dispostos horizontalmente (padrão: estrelas) comunicando um nível de classificação; arredonda para símbolos completos apenas (sem símbolo parcial); os símbolos mantêm espaçamento fixo, nunca expandem/encolhem para preencher a largura.

**Regras**
- Permitir mudar a classificação inline numa lista já classificada — não forçar navegação a uma tela de edição separada.
- Ao substituir a estrela por um símbolo customizado, garantir que o propósito de classificação continue claro (a estrela é um símbolo de classificação muito reconhecível; outros símbolos podem não transmitir isso).
- Não suportado em iOS, iPadOS, tvOS, visionOS, watchOS (só macOS).

**Equivalente web**
- Grupo `role="radiogroup"` de botões `role="radio"` em forma de estrela (cada um representa "avaliar com N estrelas"), ou `input type="range"` nativo com um overlay visual de um passo por estrela.
- Anunciar o valor inteiro arredondado via `aria-label` no grupo (ex.: "Avaliação de 4 em 5 estrelas"), espelhando a regra de "sem símbolo parcial".
- Manter o espaçamento dos ícones fixo, independente da largura do container.

## Experiências de sistema

### App Shortcuts

**O que é / quando usar**: dá acesso às funções/conteúdo-chave de um app em todo o sistema (Siri, Spotlight, app Shortcuts, botão Action, aperto do Apple Pencil); disponível imediatamente após a instalação; construído sobre App Intents.

**Regras**
- Máximo de 10 App Shortcuts por app.
- Considerar adotar app schemas em vez disso para funcionalidade comum de domínio (deixa a Apple Intelligence/Siri expor ações contextualmente sem trabalho por atalho individual) — App Shortcuts servem para recursos/conteúdo únicos fora da cobertura de schemas.
- Oferecer atalhos para as tarefas mais comuns e importantes; tarefas simples, completáveis sem sair do contexto atual, funcionam melhor, mas abrir o app é aceitável se ajuda a completar tarefas multi-etapa mais facilmente.
- Um atalho pode incluir um único parâmetro opcional, com valores previsíveis e familiares (a pessoa não terá a lista à frente para referência).
- Pedir esclarecimento (com um padrão sensato + lista curta de alternativas) quando falta uma informação opcional no pedido.
- Manter as frases de voz simples — se soar complicado demais falado em voz alta, é difícil demais de lembrar ou dizer certo; pedir informação extra obrigatória num passo seguinte em vez de amontoar tudo numa frase.
- Tornar os App Shortcuts descobríveis dentro do app (ex.: dicas ocasionais quando a pessoa realiza a ação correspondente).
- Opções de resposta: Snippets para informação estática/confirmação de diálogo (ex.: previsão do tempo, confirmação de pedido); Live Activities para informação continuamente relevante e que muda ao longo do tempo (timers/contagens regressivas).
- Fornecer texto de diálogo completo cobrindo toda informação crítica para dispositivos só de áudio (AirPods/HomePod), onde não há tela disponível.
- Editorial: manter frases de ativação breves e memoráveis, sempre incluindo o nome do app (mas podendo ser criativo — ex.: "Create a Keynote" e "Add a new presentation in Keynote" são ambas válidas).
  - Usar capitalização de título "App Shortcuts"/"Shortcuts" (plural) ao se referir ao recurso/app; usar minúsculas ao se referir a atalhos individuais customizados.
- iOS/iPadOS: pode aparecer no Top Hit do Spotlight ou na área Shortcuts, cada um com um SF Symbol ou uma imagem de preview do item vinculado.
  - Ordenar por importância (ordem inicial no Spotlight/app Shortcuts); o sistema reprioriza depois pelo uso real.
- macOS: App Shortcuts em si não são suportados, mas ações baseadas em App Intents são, e podem ser usadas para montar atalhos customizados no app Shortcuts do Mac.
- Não suportado em tvOS.

**Equivalente web**
- O análogo mais próximo é a integração do PWA com o SO fora da própria página: o array `shortcuts` do Web App Manifest (entradas de jump-list instaladas, limitadas pelo SO, análogas ao limite de 10 atalhos) e handlers de Share Target/`launchQueue`.
- Não há equivalente no navegador para invocação por voz via Siri nem para exposição via Spotlight.

### Complications

**O que é / quando usar**: exibe informação pontual e relevante no mostrador do relógio; organizadas (watchOS 9+) em famílias (circular, corner, inline, rectangular, mais templates legacy para versões anteriores). Cada mostrador declara qual família cada slot de complicação suporta.

**Regras**
- Preferir WidgetKit para complicações watchOS 9+ (o protocolo `CLKComplicationDataSource` do ClockKit é só para compatibilidade com versões anteriores).
- Mostrar conteúdo dinâmico e essencial que sempre pareça atualizado — uma complicação estática e sem significado tem menos chance de continuar num slot de destaque do mostrador.
- Suportar o máximo de famílias de complicação possível (mais famílias = elegível em mais mostradores); se nenhuma família tem dado útil para exibir, fornecer ao menos uma imagem tipo ícone do app para permitir abrir o app.
- Considerar criar múltiplas complicações por família (ex.: complicações separadas de natação/ciclismo/corrida para um app de triatlo) — combina bem com mostradores compartilháveis pré-configurados com essas complicações e cores customizadas.
- Dar a cada complicação suportada um deep link distinto para a área mais relevante do app — deep links idênticos entre complicações reduzem a utilidade percebida.
- Cuidar da privacidade: o display Always-On Retina pode expor informação do mostrador a quem está por perto.
- Escolher o timing de atualização de acordo com a real necessidade de cada tipo de dado — as timelines têm um número limitado de atualizações diárias e o sistema guarda um número limitado de entradas por app, então escolher horários que maximizem a utilidade (ex.: lembrete de reunião uma hora antes vs. previsão do tempo no horário previsto).
- Escolha de estilo de anel/gauge:
  - Closed: para um valor que é porcentagem de um todo (ex.: bateria).
  - Open: para um intervalo mínimo-máximo arbitrário/não percentual (ex.: velocidade).
  - Segmented: para um intervalo definido pelo app com mudanças rápidas (ex.: complicação de nível de ruído).
- Modo tinted: o sistema aplica uma cor sólida a texto/gauges/imagens e dessatura imagens coloridas a menos que se forneça versões tintadas.
  - Nunca depender só de cor para transmitir informação — precisa ler igual em modo tintado e normal.
  - Fornecer uma imagem alternativa para modo tintado se a versão dessaturada padrão ficar ruim.
  - Considerar que a pessoa pode preferir ativamente o modo tintado ao colorido.
- Usar espessura de linha de 2 pontos ou mais na arte da complicação (linhas mais finas são difíceis de ver rapidamente, especialmente em movimento).
- Fornecer imagens placeholder estáticas para cada complicação suportada (usadas antes do primeiro dado real e no carrossel de escolha de complicações); o tamanho da imagem placeholder pode diferir do tamanho da imagem real por layout/template legacy.
- Existem specs extensas de pixel/ponto por tamanho para cada família (circular, circular extra-large, corner, inline utilitarian small/large, rectangular) em cada tamanho de caixa (40/41/44/45/49 mm) e para cada template legacy (circular small, modular small, modular large, extra large).
  - Tratar como valores exatos de produção, não aproximações; tirar do Apple Design Resources/da página HIG atual em vez de estimar de memória.
- Layouts rectangular também podem aparecer no Smart Stack (watchOS 10+) — otimizar fornecendo cor/conteúdo de fundo significativo, usando intents para sinalizar relevância/timing, e oferecendo um layout customizado específico para o Smart Stack.
- Não suportado em iOS, iPadOS, macOS, tvOS, visionOS (só watchOS).

**Equivalente web**
- Sem equivalente direto — o mais próximo é uma superfície de "relance" do navegador/SO, como um badge de PWA (Badging API) ou um mini-widget fixado na barra de tarefas/área de notificação, mas nenhum tem um sistema de layout por família, contrato de modo tintado, nem grade de pixels por dispositivo. Tratar complicações como algo nativo do watchOS e não tentar forçar um padrão web equivalente.

### Controls

**O que é / quando usar**: botão ou toggle que dá acesso rápido a uma funcionalidade do app a partir da Control Center, da Lock Screen ou do botão Action.

**Regras**
- Anatomia: símbolo (SF Symbols ou customizado), título (o que o control se refere) e valor opcional (seu estado — ex.: nome de uma luz + ligada/desligada).
  - A exibição varia por local: Control Center mostra símbolo sempre, título+valor só em tamanhos maiores; Lock Screen mostra só o símbolo; pressionar e segurar o botão Action mostra o símbolo (e o valor, se houver) na Dynamic Island.
- Oferecer controls só para ações com benefício claro sem precisar abrir o app.
- Atualizar o control na interação, ao completar a ação, ou remotamente via push — refletir com precisão o estado em andamento vs. concluído.
- Escolher um símbolo descritivo que sugira o comportamento por si só (título/valor podem não estar visíveis dependendo do local); toggles precisam de um símbolo para cada estado (ligado e desligado) — ex.: `door.garage.open`/`door.garage.closed`.
- Animar transições de símbolo nas mudanças de estado: toggles animam entre ligado/desligado; botões com ações que têm duração animam indefinidamente enquanto rodam, param ao completar.
- Escolher uma cor tint alinhada à marca do app — aplicada ao símbolo do toggle no estado ligado, e à cor de valor/símbolo na Dynamic Island quando disparado pelo botão Action.
- Ajudar a fornecer a informação de configuração necessária (ex.: qual luz) — pedir isso no momento em que o control é adicionado; permitir reconfigurar a qualquer momento.
- Fornecer texto de dica para o botão Action, usando verbos descrevendo o que acontece ao pressionar e segurar.
- Fornecer um placeholder de título/valor quando forem situacionais — mostrado na galeria de controls/seletor de Lock Screen ou antes de atribuir ao botão Action.
- Esconder informação sensível quando o dispositivo está bloqueado — pode especificar redação só de título/valor, ou também do estado do símbolo (símbolo redigido mostra a aparência do estado desligado).
- Exigir autenticação para ações que afetam segurança (ex.: trancar/destrancar uma porta, ligar o carro).
- Experiências de câmera com dispositivo bloqueado (iOS 18+): pode lançar direto para a experiência de câmera do app enquanto bloqueado; qualquer tarefa além da captura exige desbloquear e autenticar; reusar a mesma UI de câmera no app e na experiência do control para uma transição contínua; fornecer instruções para adicionar o control.
- Não suportado em watchOS, tvOS, visionOS.

**Equivalente web**
- Sem equivalente verdadeiro — os análogos parciais mais próximos são integrações de PWA no nível do SO, como a Badging API (estado visível só como valor) ou uma entrada de ação rápida via `shortcuts`/share-target no manifest, mas nenhum alcança o posicionamento na Control Center/Lock Screen/botão Action, que são superfícies nativas do SO fora do alcance da plataforma web.

### Live Activities

**O que é / quando usar**: permite acompanhar o progresso de uma atividade, evento ou tarefa rapidamente; começa no iPhone/iPad e aparece automaticamente em outros lugares do sistema (Lock Screen/Home Screen/Dynamic Island/StandBy no iPhone, menu bar no Mac, Smart Stack no Apple Watch, CarPlay Dashboard).

**Regras**
- Precisa suportar 4 apresentações: Compact, Minimal, Expanded, Lock Screen — o sistema compõe/deriva outros contextos (StandBy, CarPlay, Apple Watch) a partir delas.
- Compact: usada quando só uma Live Activity está ativa, dividida em elemento inicial e final ao redor da câmera TrueDepth na Dynamic Island.
  - Desenhar os dois como uma peça unificada de informação (cor e tipografia consistentes).
  - Manter o conteúdo o mais estreito e rente possível à câmera; não obscurecer a status bar.
  - Equilibrar a largura entre os elementos (encurtar unidades/precisão se necessário).
  - Garantir que ambos apontem para a mesma tela ao serem tocados.
- Minimal: usada quando há múltiplas Live Activities ativas (o sistema mostra 2 na Dynamic Island, uma anexada e outra separada, circular ou oval).
  - Precisa continuar reconhecível — preferir mostrar informação atualizada ao vivo em vez de só um logo (ex.: o Timer mostra o tempo restante, não só o ícone).
- Expanded: aparece ao tocar e segurar a compact ou minimal.
  - Manter o posicionamento relativo dos elementos da compact/minimal para parecer uma ampliação, não um design diferente.
  - Encaixar o conteúdo bem justo ao redor da câmera TrueDepth.
- Lock Screen: banner na base da Lock Screen (também sobrepõe brevemente a Home Screen/outros apps como banner de alerta em dispositivos sem Dynamic Island).
  - Não replicar o layout de uma notificação comum — usar um design próprio para o conteúdo da Live Activity.
  - Margem padrão de 14 pontos.
  - Verificar a cor gerada automaticamente do botão de dispensar e ajustar via `activitySystemActionForegroundColor(_:)` se não bater com o design.
  - Verificar legibilidade no Dark Mode e em displays Always-On com luminância reduzida.
- StandBy: mostra a apresentação minimal; tocar transiciona para a Lock Screen escalada 2x para preencher a tela.
  - Cor de fundo customizada da Lock Screen se estende automaticamente para tela cheia.
  - Preferir a cor de fundo padrão no StandBy (combina com a moldura do dispositivo, permite ao sistema escalar um pouco mais já que dispensa as margens da câmera TrueDepth).
  - Usar margens padrão, não sangrar gráficos até a borda da tela.
  - Verificar o design sob o tint vermelho do Night Mode.
- Escopo: só para tarefas/eventos com início e fim definidos, sem exceder cerca de 8 horas.
- Mostrar só os poucos pontos de dados que a pessoa precisa num relance — tocar abre o app para mais detalhe; nunca usar para anúncios/promoções; evitar informação sensível visível (Lock Screen/Always-On podem ser vistos por quem está por perto) — mostrar um resumo inofensivo e deixar um toque revelar o detalhe no app, ou redigir e deixar a pessoa optar por mostrar dados sensíveis.
- Combinar com a identidade visual do app (claro/escuro) para ficar reconhecível; um logo mark, se incluído, aparece sem container (não o ícone completo do app); não adicionar elementos no app que chamem atenção extra para a Dynamic Island.
- Texto: grande, peso médio ou mais pesado; usar texto pequeno com moderação, manter a informação-chave legível num relance.
- Layout:
  - Adaptar a todos os tamanhos de tela/apresentações usando os valores de especificação como guia; dimensionar elementos só ao necessário (não forçar preenchimento).
  - Usar templates do Apple Design Resources (margens padrão/tamanhos de texto recomendados) — ajuda a caber também no Smart Stack.
  - Usar margens consistentes e concêntricas, com raio de canto batendo com a forma externa da Live Activity (via `ContainerRelativeShape`), para o conteúdo não invadir os cantos arredondados.
  - Separar blocos de conteúdo com um container com forma inset ou uma linha grossa — nunca desenhar conteúdo até a borda da Dynamic Island.
- Redimensionar dinamicamente a altura na Lock Screen ou na apresentação expanded conforme a informação disponível cresce/diminui (ex.: uma Live Activity de corrida por app fica mais compacta enquanto procura motorista, e cresce quando o horário estimado/dados do motorista ficam disponíveis).
- Cores:
  - Fundo fixo (preto opaco) para compact/minimal/expanded — só a apresentação Lock Screen suporta cor/opacidade de fundo customizada (garantir contraste, especialmente para Always-On com luminância reduzida).
  - Usar cor forte em texto/objetos para expressar identidade e se destacar.
  - Tintar a "key line" (contorno ao redor da Dynamic Island em fundos escuros) combinando com as demais cores dos elementos.
- Animação:
  - Animações do sistema e customizadas com duração máxima de 2 segundos; nenhuma toca em displays Always-On com luminância reduzida.
  - Usar animação para reforçar atualizações (transição padrão de substituição de conteúdo, ou transições customizadas de escala/opacidade/movimento — ex.: transições numéricas para mudança de placar).
  - Animar mudanças de layout movendo elementos existentes para as novas posições em vez de removê-los e recriá-los.
  - Evitar sobreposição de elementos durante uma transição (animar para fora e depois de volta na nova posição, se há risco de colisão).
- Interatividade:
  - Tocar deve sempre abrir o app na localização exata relevante (deep link, sem navegação extra).
  - Manter elementos interativos ao mínimo — só ações essenciais e diretamente relacionadas que a pessoa faz uma vez ou pausa/retoma brevemente (música, treino, gravação ao vivo); preferir limitar a interatividade a um único elemento para evitar toques acidentais.
  - Considerar um botão/toggle para respostas diretas no local a atualizações (ex.: botão de contatar motorista numa Live Activity de corrida por app).
- Ciclo de vida:
  - Iniciar em momentos apropriados e esperados (após um pedido, uma solicitação, o início de uma partida) e deixar a pessoa desligar pela view correspondente no app (ex.: deixar de seguir um jogo/time) — sem esse controle no app, a pessoa arrisca desligar Live Activities globalmente em Ajustes.
  - Oferecer um App Shortcut para iniciar uma (ex.: via botão Action).
  - Atualizar só quando há conteúdo novo de fato — não atualizar por atualizar.
  - Alertar (tela acende + som + apresentação expanded ou banner) só para atualizações realmente essenciais — não usar também notificação push para a mesma atualização.
  - Preferir uma única Live Activity que alterna entre múltiplos eventos em vez de várias separadas que a pessoa precisa alternar.
  - Sempre encerrar imediatamente quando a tarefa/evento termina, com um tempo de dispensa customizado proporcional à duração (15 a 30 minutos é típico) — ela então permanece até 4 horas na Lock Screen/menu bar do Mac/Smart Stack (removida imediatamente da Dynamic Island/CarPlay).
- macOS: aparece na menu bar via as apresentações compact/minimal/expanded; clicar lança o iPhone Mirroring para mostrar o app.
- watchOS: aparece no topo do Smart Stack por padrão, combinando os elementos inicial+final da compact do iPhone.
  - Sem um app watchOS, tocar abre uma view em tela cheia com um botão para abrir o app no iPhone pareado.
  - Considerar um layout customizado para watchOS para mais informação/interatividade — mas nunca incluir botões/toggles se esse mesmo layout customizado também aparecer no CarPlay (elementos interativos são desativados lá e a pessoa pode estar dirigindo).
- CarPlay: os elementos inicial/final da compact se combinam automaticamente num único layout no Dashboard; elementos interativos são desativados.
  - Considerar um layout customizado `ActivityFamily.small` para texto maior/mais informação em vez do padrão.
  - Preferir conteúdo pontual a botões/toggles se a pessoa provavelmente está dirigindo.
- Specs (valores exatos mudam por geração de dispositivo — conferir na página HIG atual/Apple Design Resources em vez de fixar de memória):
  - CarPlay: 240x78, 240x100, 170x78 pt; configurações de teste do Smart Display Zoom: 1920x720, 900x1200, 800x480.
  - iOS: dimensões de Dynamic Island/compact/minimal/expanded/Lock Screen por família de dispositivo, até modelos específicos de iPhone (ex.: 250 pt de largura da Dynamic Island em Pro Max/Air vs. 230 pt em modelos padrão/Pro).
  - iPadOS: faixas de altura de Lock Screen por tamanho de tela.
  - watchOS: tamanhos de Smart Stack por tamanho de caixa (40-49 mm).
- Não suportado em tvOS, visionOS.

**Equivalente web**
- Sem equivalente direto — os análogos parciais mais próximos são a Badging API (contagem persistente e visível num ícone de PWA) e Web Push com atualizações silenciosas periódicas, mas nenhum entrega uma superfície multi-apresentação, composta pelo sistema, entre dispositivos.
- Um app web acompanhando uma tarefa parecida deve depender de UI em tempo real dentro da página (ex.: uma barra de status/toast persistente atualizada via WebSocket/SSE) mais notificações push para atualizações fora da aba, sem alegar paridade com o posicionamento de sistema de uma Live Activity.

### Notifications

**O que é / quando usar**: entrega informação pontual e de alto valor, compreensível num relance; exige consentimento prévio; a pessoa configura estilos e horários de entrega por nível de urgência em Ajustes.

**Regras**
- Anatomia varia por plataforma: banner/view (Lock Screen/Home Screen/Home View/desktop), badge no ícone do app, item no Notification Center; notificações de comunicação direta (ligações/mensagens) ganham interface distinta com imagem de contato/avatar em destaque + nome do grupo, em vez do ícone do app.
- Fornecer notificações concisas e informativas — a pessoa ativou notificações para atualizações rápidas.
- Evitar enviar múltiplas notificações para a mesma coisa mesmo sem resposta (lota o Notification Center, arrisca a pessoa desligar todas as notificações do app).
- Evitar dizer para a pessoa realizar tarefas específicas dentro do app via texto da notificação — oferecer ações de notificação em vez disso, se a tarefa é simples; instruções são facilmente esquecidas após a dispensa.
- Usar um alert, não uma notification, para mensagens de erro (evitar confundir os dois componentes).
- Com o app em primeiro plano, apresentar a informação de forma descobrível mas não invasiva (ex.: incrementar um badge, inserir discretamente o novo dado) em vez de mostrar a notificação do sistema.
- Nunca incluir informação sensível, pessoal ou confidencial (não dá para prever quem está por perto quando ela chega).
- Título: criar um só se agrega contexto; manter curto (especialmente crítico no Apple Watch).
  - Se não der para fornecer um título específico, deixar o sistema mostrar o nome do app (evitar títulos genéricos como "New Document").
  - Capitalização de título, sem pontuação final.
- Corpo: frases completas, capitalização de frase, pontuação correta; não truncar manualmente (o sistema faz isso automaticamente).
- Fornecer um `hiddenPreviewsBodyPlaceholder` — texto genérico descritivo (ex.: "Friend request", "New comment", "Reminder", "Shipment") mostrado quando a pessoa desativou previews em todo o sistema; capitalização de frase.
- Não incluir o nome/ícone do app no corpo — o sistema já mostra automaticamente um ícone grande do app (ou, em notificações de comunicação, a foto do remetente com um selo pequeno do ícone do app).
- Som: opcional, mas útil para se destacar/chamar atenção.
  - Som customizado precisa ser curto, distintivo e bem produzido.
  - Nunca depender só do som para informação crítica (a pessoa pode estar sem som) — sem controle programático de vibração.
- Ações: até 4 botões para completar tarefas direto na notificação, sem abrir o app.
  - Cada botão = termo ou frase curta em title case descrevendo o resultado, sem nome do app nem informação supérflua, breve (evita truncamento), levando em conta localização.
  - Evitar uma ação que só abre o app (redundante — tocar o corpo já faz isso).
  - Preferir ações não destrutivas; se oferecer uma ação destrutiva, dar contexto suficiente para evitar consequências não intencionais (o sistema já dá uma aparência distinta a ela).
  - Cada ação recebe um ícone de interface simples e reconhecível (SF Symbols) no lado final do título.
- Badging: pequeno oval preenchido com um número indicando quantas notificações não lidas há.
  - Usar só para isso — nunca para dado numérico não relacionado a notificações (clima, datas/horas, preço de ação, placar de jogo).
  - Não depender só do badge como único canal para informação essencial (a pessoa pode desativá-lo).
  - Mantê-lo atualizado — limpar assim que as notificações são endereçadas; zerar a contagem remove todos os itens relacionados do Notification Center.
  - Nunca criar um elemento customizado que imite a aparência/comportamento de um badge (confunde quem desativou o de verdade).
- watchOS: dois estágios.
  - Short look: aparece ao levantar o pulso, some ao abaixar; manter privado/básico apenas, nunca o único canal para informação crítica.
  - Long look: mais detalhe, rolável por swipe/Digital Crown, dispensável tocando ou abaixando o pulso.
  - Pode ser estático (mensagem + texto/imagens estáticas adicionais) ou dinâmico (conteúdo completo da notificação, mais opções de configuração) — sempre fornecer ao menos a interface estática, preferir fornecer a dinâmica também.
  - O sistema recorre à estática quando a dinâmica está inacessível (ex.: sem rede ou app companion do iPhone indisponível) — empacotar os recursos da interface estática com o app com antecedência.
  - O sash (barra do topo com ícone/nome) pode ter fundo colorido ou desfocado — usar desfocado se mostrar uma foto no topo da área de conteúdo.
  - A área de conteúdo tem fundo transparente por padrão — para bater com notificações do sistema, usar branco com 18% de opacidade, ou uma cor customizada/de marca.
  - Até 4 ações customizadas abaixo do conteúdo; o sistema sempre acrescenta um botão Dismiss no fim, abaixo de todos os botões customizados.
  - Toque duplo dispara a primeira ação não destrutiva da lista — ordenar as ações com a mais usada primeiro (ex.: num app de estacionamento, "estender 5 min" antes de "estender 1 hora").

**Equivalente web**
- A Notifications API + Service Worker Push (`showNotification` com `actions`, `badge`, `icon`, `body`, `requireInteraction`) espelha isso de perto — o array `actions` mapeia para os botões de ação da notificação (o limite de ações varia por navegador, mas manter um conjunto pequeno, breve e em title case, seguindo essa orientação).
- A Badging API (`navigator.setAppBadge(count)`) mapeia direto para a regra de badge (só contagem de não lidas, limpo com `clearAppBadge()`).
- Não há equivalente web ao short/long look do watchOS — uma notificação push web é mais próxima do "long look", sem analogia de short-look num relance.

### Snippets

**O que é / quando usar**: view compacta mostrada em resposta a uma ação via Siri/App Shortcut/Spotlight/app Shortcuts, confirmando ou apresentando um resultado.

**Regras**
- Dois tipos: snippet de confirmação (confirmar/cancelar uma ação, pode incluir opções que afetam o resultado) e snippet de resultado (mostra um desfecho, sem necessidade de mais ação); um app intent que exibe um snippet sempre mostra um resultado — a etapa de confirmação é opcional.
- Anatomia:
  - Diálogo: o texto do app intent que a Siri fala, mostrado por padrão acima da view customizada.
  - View customizada: informação visual + botões opcionais para modificar/obter mais informação/outra ação.
  - Botões do sistema: no snippet de confirmação, Cancel secundário + botão primário com rótulo customizável; no snippet de resultado, botão único Done.
- Garantir contraste suficiente entre o conteúdo customizado e o fundo fornecido pelo sistema, tanto em aparência clara quanto escura; manter margens consistentes.
- Manter o conteúdo conciso: altura máxima da view customizada é 400 pontos; considerar tamanhos de texto preferidos maiores ao decidir quanto texto incluir; para um snippet de resultado que precisa de mais detalhe, usar deep link para o app em vez de espremer tudo na view.
- Escolher um rótulo descritivo para o botão primário de um snippet de confirmação (ex.: "Order" em vez de "OK"/"Proceed" num fluxo de pedir café); o rótulo padrão do sistema é "Continue" se nenhum for especificado.
- Comunicar o propósito do snippet visualmente pela view customizada — não depender só do texto de diálogo falado (essencial para interações sem olhar a tela, mas deve ficar omitido ou secundário na representação visual).
- Não suportado em tvOS, visionOS, watchOS.

**Equivalente web**
- O análogo mais próximo é um card de confirmação/resultado retornado por uma integração de chat/assistente de voz baseada em web (ex.: um card de resposta rica de uma UI conversacional na web) — limitar sua altura/conteúdo de forma parecida à orientação de 400 pt, e sempre parear um card do tipo confirmação com um botão de ação primária explícito mais uma opção de cancelar, espelhando o contrato de dois botões do snippet de confirmação.

### Status bars

**O que é / quando usar**: fica ao longo da borda superior da tela (iOS/iPadOS) mostrando o estado do dispositivo (hora, operadora, nível de bateria etc.).

**Regras**
- O fundo é transparente por padrão (conteúdo aparece atrás) — manter legível e nunca sugerir que o conteúdo por trás é interativo (a pessoa pode tentar tocar e falhar); preferir um efeito de borda de rolagem (view desfocada atrás dela) para mantê-la legível sobre conteúdo rolando.
- Considerar esconder temporariamente durante mídia em tela cheia para uma experiência mais imersiva (ex.: Photos esconde ao navegar fotos em tela cheia).
- Nunca esconder permanentemente — sempre fornecer um gesto simples e descobrível para reexibi-la (ex.: um toque só no Photos).
- Não suportado em macOS, tvOS, visionOS, watchOS.

**Equivalente web**
- O análogo mais próximo é o próprio chrome nativo do navegador (barra de endereço, title bar de PWA), que a página não pode remover — para um estado imersivo dentro da página (ex.: um visualizador de fotos), usar a Fullscreen API para esconder a UI do navegador, sempre mantendo um controle de saída descobrível (tecla Esc + affordance visível de fechar), espelhando a regra de nunca esconder permanentemente.

### Top Shelf

**O que é / quando usar**: área da Home Screen do Apple TV que exibe o conteúdo do app de forma rica, com acesso aos apps favoritos no Dock; o suporte a tela cheia permite navegar pelo conteúdo por swipe, tocar trailers e ver mais informação.

**Regras**
- Dois dos templates de layout do sistema (carousel actions, carousel details) trazem por padrão 2 botões: um primário para começar a reprodução e um "More Info" que abre a view de detalhe do app.
- Destacar conteúdo novo (lançamentos/episódios novos, próximas estreias); evitar promover conteúdo já comprado, alugado ou assistido.
- Personalizar com recomendações direcionadas, retomar a reprodução de mídia, ou retomar uma partida de jogo em andamento.
- Evitar anúncios/preços — manter o foco em conteúdo novo/interessante; mostrar conteúdo comprável é aceitável, mas só exibir preços quando a pessoa demonstra interesse.
- Preferir conteúdo dinâmico e em camadas a imagens estáticas (estática é só um fallback).
- Se não fornecer conteúdo dinâmico em tela cheia, fornecer ao menos uma imagem estática de fallback; o tvOS espelha e desfoca essa imagem para caber em 1920 px de largura no formato 16:9. Tamanho da imagem estática: 2320x720 pt (2320x720 px @1x, 4640x1440 px @2x). Uma imagem estática não é focável — nunca sugerir que é interativa.
- Layout carousel actions: vídeo/imagens em tela cheia com controles discretos; funciona bem para conteúdo que a pessoa já conhece (conteúdo gerado por usuário, continuação de franquia/programa); incluir um título sucinto (e um subtítulo breve se necessário, ex.: intervalo de datas para um álbum de fotos, nome do programa para um episódio).
- Layout carousel details: estende o carousel actions com informação adicional (sinopse, elenco, metadados); o título identifica o conteúdo em reprodução no topo; frase curta opcional/atribuição de app acima do título (ex.: "Featured on My App").
- Sectioned content row: uma fileira rotulada única de conteúdo focável e rolável (recente/novo/favoritos).
  - Fornecer imagens suficientes para preencher no mínimo a largura total da tela; incluir ao menos um rótulo para contexto/consistência.
  - Tamanhos de imagem: Poster (2:3) real 404x608 pt / foco-safe 380x570 pt / sem foco 333x570 pt.
  - Square (1:1): real 608x608 pt / foco-safe 570x570 pt / sem foco 500x500 pt.
  - 16:9: real 908x512 pt / foco-safe 852x479 pt / sem foco 782x440 pt.
  - Tamanhos de imagem misturados na mesma fileira escalam automaticamente até a altura da imagem mais alta (ex.: uma imagem 16:9 escala para 500 px de altura ao lado de um poster ou square).
- Scrolling inset banner: imagens grandes ocupando quase toda a largura, rolando automaticamente num timer até uma ganhar foco, voltando ao início ao chegar no fim.
  - Fornecer de 3 a 8 imagens (menos parece pobre, mais dificulta a navegação).
  - Se precisar de texto, embuti-lo na própria imagem (esse layout não mostra rótulos abaixo do conteúdo) — colocá-lo numa camada dedicada no topo em imagens em camadas, e adicioná-lo também ao accessibility label da imagem para o VoiceOver.
  - Tamanho da imagem: 1940x692 pt real / 1740x620 pt foco-safe / 1740x560 pt sem foco.
- Não suportado em iOS, iPadOS, macOS, visionOS, watchOS (só tvOS).

**Equivalente web**
- Sem equivalente — Top Shelf é uma superfície nativa da Home Screen do tvOS sem contrapartida em navegador/PWA; o análogo mais próximo num app web de mídia/vídeo é seu próprio carrossel hero na página, mas sem posicionamento no nível de SO junto ao Dock.

### Watch faces

**O que é / quando usar**: a view primária que a pessoa escolhe no watchOS, customizada com complicações; compartilhável desde o watchOS 7 (mostrador configurado + complicações empacotados e compartilhados por Messages/Mail/redes sociais/site/no próprio app).

**Regras**
- Ajudar a descoberta do app compartilhando um mostrador pré-configurado com suas complicações (idealmente suportando múltiplas complicações para uma experiência curada) — alguns mostradores também permitem especificar um accent color do sistema, imagens ou estilos; se alguém adicionar o mostrador compartilhado sem o app instalado, o sistema pede a instalação.
- Fornecer um preview para cada mostrador compartilhado (enviar por email a si mesmo pelo app Watch do iOS para gerar um) — o preview padrão inclui uma moldura ilustrada de dispositivo adequada para sites/apps, ou dá para compor uma moldura de hardware de alta fidelidade (do Apple Design Resources) sobre ele.
- Buscar oferecer configurações compartilháveis em todos os dispositivos Apple Watch: alguns mostradores (California, Chronograph Pro, Gradient, Infograph, Infograph Modular, Meridian, Modular Compact, Solar Dial) exigem Series 4 ou posterior, e o Explorer exige Series 3 (com celular) ou posterior — se usar um desses, também oferecer uma configuração equivalente num mostrador compatível com Series 3 e anteriores, e rotular cada mostrador compartilhável com os dispositivos que suporta.
- Responder graciosamente a um erro de mostrador incompatível (Series 3 ou anterior tentando um mostrador não suportado), oferecendo imediatamente uma configuração alternativa compatível em vez de mostrar um erro puro; alinhar expectativas junto com os previews, avisando que um mostrador alternativo pode ser usado no lugar.
- Não suportado em iOS, iPadOS, macOS, tvOS, visionOS (só watchOS).

**Equivalente web**
- Sem equivalente — o compartilhamento de mostrador é um construto nativo do watchOS (um payload de configuração de mostrador + complicações empacotado); um site só pode hospedar a imagem de preview de marketing e um deep link/QR code para o fluxo de compartilhamento do app Watch, não reproduzir o próprio mostrador.

### Widgets

**O que é / quando usar**: dá acesso rápido a informação essencial e interações focadas de um app em contextos adicionais (Home Screen, Lock Screen, desktop, Notification Center, Smart Stack, superfícies espaciais no visionOS).

**Regras**
- Tamanhos de widget da família de sistema: Small, Medium, Large, Extra large, Extra large portrait — o suporte varia por plataforma (ex.: iPhone só suporta Small na Home Screen/Today View/StandBy/CarPlay; iPad/Mac/visionOS suportam mais tamanhos, com Extra large portrait só no visionOS).
- Tamanhos de widget accessory (informação bem limitada): Circular, Corner, Inline, Rectangular — o posicionamento varia (Lock Screen do iPhone/iPad para a maioria; complicações/Smart Stack do Apple Watch para os 4, mas Corner só no Apple Watch).
- Aparências/modos de renderização:
  - Full-color: família de sistema, todas as plataformas — o sistema não muda a cor.
  - Accented: família de sistema em todas as plataformas + widgets accessory no Apple Watch — remove o fundo, substitui por efeito de tint ou fundo Liquid Glass, divide as views em um grupo accent e um grupo primary, cada um recebendo uma cor sólida.
  - Vibrant: Lock Screen do iPhone/iPad, StandBy em pouca luz — dessatura texto/imagens/gauges, colore o conteúdo para o fundo, aplica tint vermelho automaticamente no StandBy com pouca luz.
  - Widgets accessory rectangular: monocromáticos sem tint na Lock Screen do iPhone/iPad; coloridos ou tintados como complicação de relógio, e no Smart Stack.
- Escolher ideias simples ligadas ao propósito principal do app, com conteúdo pontual (ex.: o widget do Weather prioriza máxima/mínima atual + condições).
- Dar acesso rápido a conteúdo significativo/ações úteis/deep links — replicar o ícone do app agrega pouco valor e reduz a chance de a pessoa manter o widget.
- Preferir informação dinâmica que muda ao longo do dia — widgets que parecem estáticos tendem a ser removidos.
- Oferecer múltiplos tamanhos só quando cada tamanho agrega valor real — evitar simplesmente esticar o conteúdo de um widget pequeno para preencher uma área maior; é mais importante acertar o tamanho que melhor representa o conteúdo do que oferecer todos os tamanhos.
- Equilibrar densidade de informação — nem tão esparso que pareça sem propósito, nem tão denso que perca o "relance"; num layout denso demais, considerar um tamanho maior ou substituir texto por gráficos.
- Manter a informação exibida ligada ao propósito principal do widget mesmo com o tamanho crescendo (ex.: todos os tamanhos do widget de Calendar mantêm o foco em eventos futuros, só expandindo o alcance de detalhe).
- Usar elementos de marca (cores, tipografia, glifos) sem sobrepujar a informação; um logo pequeno (canto superior direito) só se o widget agrega múltiplas fontes.
- Escolher deliberadamente entre conteúdo automático e conteúdo configurável pela pessoa (ex.: Stocks deixa escolher os símbolos; Podcasts mostra conteúdo recente automaticamente) — não forçar configuração quando é desnecessária.
- Nunca espelhar a aparência exata do widget dentro do próprio app (confunde a expectativa de comportamento interativo).
- Avisar quando fazer login agrega valor (ex.: "Sign in to view reservations" quando deslogado).
- Atualizações:
  - Widgets atualizam periodicamente, não em tempo real contínuo — escolher a frequência de acordo com quão frequentemente o dado realmente muda e quando a pessoa precisa vê-lo (ex.: atualização de hora em hora é aceitável mesmo para dados de maré que mudam continuamente).
  - Se a pessoa provavelmente checa mais vezes do que dá para atualizar, mostrar um indicador de "última atualização" em vez de manter dado obsoleto escondido atrás de placeholder.
  - Deixar o sistema atualizar automaticamente data/hora para preservar o orçamento limitado de atualizações.
  - Usar animações padrão ou customizadas de até 2 segundos para transições de atualização de conteúdo.
- Interatividade:
  - Tocar/clicar em área não interativa lança o app; botões/toggles permitem funcionalidade limitada sem lançar o app (ex.: toggle de conclusão no widget do Reminders).
  - Garantir que o toque abra o app na localização exata relevante (deep link, sem navegação extra no app).
  - Manter a interatividade simples e sem poluir (não construir layouts parecidos com o app), com alvos de toque de tamanho confiável.
  - Widgets accessory inline suportam só um único alvo de toque.
- Margens:
  - Margem padrão de 16 pontos na maioria dos widgets (evitar apertar as bordas).
  - Margens mais justas de 11 pontos são aceitáveis para agrupamentos internos (gráficos/botões/formas de fundo).
  - Desktop do Mac e Lock Screen/StandBy usam margens menores por padrão.
  - Coordenar o raio de canto do conteúdo com o raio de canto do próprio widget via um container-relative shape.
- Texto:
  - Preferir fonte e estilos de texto do sistema + SF Symbols; fonte customizada com moderação, idealmente reservada para o texto grande, com SF Pro no texto menor.
  - Nunca usar tamanho de fonte abaixo de 11 pontos.
  - Nunca rasterizar texto (quebra escalabilidade e VoiceOver).
  - Suporta Dynamic Type de Large a AX5 (iOS/iPadOS/visionOS) ao usar fontes do sistema/customizadas via `custom(_:size:)`.
- Cor:
  - Reforçar a aparência sem competir com o conteúdo.
  - Transmitir significado também via texto/iconografia, não só cor (widgets podem renderizar monocromáticos, e o watchOS pode inverter cores conforme o mostrador escolhido).
  - Usar imagens coloridas com moderação — chamam atenção especial e podem destoar em aparências tintadas/clear; reservar para conteúdo de mídia (ex.: capa de álbum) em dimensões menores que o widget.
- Orientação específica por modo de renderização:
  - Full-color: suportar fundos claro/escuro, cores semânticas do sistema, variantes de cor no asset catalog.
  - Accented: agrupar views em grupo accent e grupo primary — o sistema tinge de branco tanto primary quanto accented no iPhone/iPad/Mac; no Apple Watch tinge primary de branco e accented na cor do mostrador.
  - Vibrant: a opacidade dos pixels da imagem controla a força do efeito de blur do material de fundo (pixel totalmente transparente deixa o fundo passar como está); o brilho dos pixels controla a força de vibrância na Lock Screen (cinza mais claro = mais contraste); renderizar conteúdo em opacidade total, usar branco/cinza claro para conteúdo em destaque e tons de cinza mais escuros para elementos secundários, usar valores de cinza opacos em vez de opacidades de branco para o melhor efeito vibrante.
- Previews/placeholders:
  - Desenhar um preview realista para a galeria de widgets — pode usar dado real se carregar rápido o bastante, senão dado simulado realista.
  - O conteúdo placeholder (mostrado enquanto o dado carrega) deve combinar componentes estáticos de interface com formas semi-opacas substituindo o conteúdo dinâmico (retângulos para linhas de texto, círculos/quadrados no lugar de glifos/imagens).
  - Escrever uma descrição sucinta começando com um verbo de ação (ex.: "See the current weather conditions and forecast for a location"); evitar frases autorreferentes como "This widget shows…"/"Use this widget to…"/"Add this widget"; capitalização de frase.
  - Agrupar todos os tamanhos do widget sob uma única descrição (não repetir por tamanho).
  - Dá para colorir o botão Add da galeria para reforçar a marca.
- iOS/iPadOS:
  - Widgets de Lock Screen seguem os princípios de design de Complications além dos princípios de widgets — muitos designs funcionam para ambos, considerar desenhá-los juntos.
  - 3 formatos de Lock Screen: texto inline acima do relógio, circular e retangular abaixo dele.
  - Suportar o display Always-On com tons de cinza adequados de contraste para luminância reduzida.
  - Oferecer Live Activities para necessidades de atualização em tempo real/acompanhamento de progresso (widgets nunca mostram atualização em tempo real) — widgets e Live Activities compartilham frameworks, então desenvolvê-los juntos e reusar componentes é eficiente.
- StandBy/CarPlay:
  - O sistema mostra dois widgets small da família de sistema lado a lado, escalados para preencher a Lock Screen/tela de Widgets do CarPlay (fundo removido).
  - Limitar imagens ricas/cor no StandBy — em vez disso, escalar e reorganizar o texto para maior legibilidade à distância.
  - Não usar cores de fundo no StandBy (precisa se misturar ao fundo preto).
  - O StandBy em pouca luz renderiza os widgets monocromaticamente com tint vermelho.
- visionOS:
  - Widgets são objetos 3D colocados em superfícies horizontais/verticais, persistindo entre sessões em escala real consistente; aparecem coloridos por padrão, mudando para renderização accented quando a pessoa aplica uma paleta de tint do sistema.
  - Dois limiares de tamanho/legibilidade: simplificado (visto de longe: menos detalhe, tipo maior, sem elementos interativos) e padrão (visto de perto: mais detalhe, tipo menor) — manter elementos compartilhados entre os dois para continuidade.
  - Escolher um tamanho de família compatível com o local onde a pessoa provavelmente vai colocar o widget (small para uma mesa, extra large para decoração em escala de ambiente).
  - A pessoa pode escalar um widget colocado de 75% a 125% — incluir assets de alta resolução que aguentem esse aumento.
  - Dois estilos de montagem: Elevated (padrão, funciona em superfícies horizontais e verticais, inclina para trás em superfícies horizontais com sombra suave) e Recessed (só superfícies verticais, embutido na parede para uma ilusão de recorte) — escolher conforme o conteúdo (Elevated para lembretes/mídia/dados; Recessed para clima/editorial; optar só por Recessed impede colocação horizontal).
  - Testar designs elevated em cada largura de moldura fornecida pelo sistema (o layout não muda por largura, então precisa se manter equilibrado em todas).
  - Dois estilos de tratamento: Paper (aparência impressa, sólida, responde à luz ambiente escurecendo/clareando) e Glass (visual em camadas, primeiro plano sempre claro e legível independente da luz ambiente) — escolher Paper para sensação de objeto físico (ex.: capa de álbum emoldurada), Glass para widgets ricos em informação que precisam de legibilidade consistente no primeiro plano.
  - Testar em toda a gama de paletas de cor do sistema e condições de luz, especialmente elementos sem tint.
- watchOS: widgets do Smart Stack usam fundo preto por padrão — considerar uma cor de fundo customizada que transmita significado (ex.: Stocks usa fundo vermelho para queda e verde para alta); melhorar a sinalização de relevância (via RelevanceKit, baseada em localização ou ligada a ações do sistema em andamento, como um treino) para aparecer/subir de posição no Smart Stack nos momentos certos.
- Existem tabelas extensas de especificação em pixel/ponto para cada tamanho de dispositivo iOS (larguras/alturas de Small/Medium/Large/Circular/Rectangular/Inline), tamanhos da família de sistema para iPad/Mac/visionOS, e tamanhos de Smart Stack por tamanho de caixa no watchOS — tratar como valores exatos de produção a buscar na página HIG atual/Apple Design Resources, não a aproximar de memória (mudam por geração de dispositivo, como mostra a correção de dimensões do watchOS no changelog de 17 de janeiro de 2025).
- Não suportado em tvOS.

**Equivalente web**
- O análogo mais próximo é um "widget"/atalho de PWA declarado no Web App Manifest, mais a Badging API para estado visível num relance, e temas via `prefers-color-scheme`/custom properties CSS para o equivalente de aparência clara/escura/tintada — mas nenhum desses entrega posicionamento real no nível de SO (grade de widgets da Home Screen, Lock Screen, Smart Stack, superfícies espaciais).
- Mesmo sem integração literal de SO, um "card" embarcável de dashboard web deve seguir as mesmas regras de equilíbrio de densidade, conteúdo de propósito único e placeholder tipo esqueleto (skeleton screens espelham as formas semi-opacas de placeholder) descritas acima.
