# Components: conteúdo, layout e organização, menus e ações (HIG)

Origem: https://developer.apple.com/design/human-interface-guidelines/components

Destilado das páginas de componentes da Apple HIG nas categorias Content, Layout and organization, e Menus and actions. Cada componente traz: o que é / quando usar, regras operacionais (números, limites e Do/Don't da página original) e o equivalente mais próximo em desenvolvimento web.

## Content

### Charts

O que é / quando usar: componente que organiza dados em marks (bar, line, point) dentro de uma área de plotagem, com eixos e descrições, para destacar um insight específico de um dataset — não para despejar dado bruto.

Regras:
- Bar mark: usar para comparar categorias ou ver proporções de um todo.
- Bar mark funciona especialmente bem quando cada valor representa uma soma (ex. total de passos no dia).
- Line mark: mostra variação ao longo do tempo; a inclinação da linha comunica a magnitude da mudança e revela tendência geral.
- Point mark: depicta valores individuais como marcas visualmente distintas; ajuda a inspecionar valor a valor e a identificar outliers e clusters.
- Combinar tipos de mark quando isso adicionar clareza (ex. line + point mostra tendência e destaca valores individuais ao mesmo tempo).
- Eixo fixo: usar quando mínimo e máximo têm significado universal para qualquer dado possível (ex. bateria: 0% a 100%).
- Eixo dinâmico: usar quando os valores variam muito e os marks devem preencher a área de plotagem disponível.
- Limite inferior do eixo Y em gráfico de barra: usar zero, para permitir comparação visual direta das alturas.
- Evitar forçar zero como limite inferior quando isso esconde diferenças relevantes que ocorrem longe do zero (ex. frequência cardíaca em repouso vs ativa).
- Preferir sequências numéricas familiares nos ticks (0, 5, 10…) em vez de sequências incomuns (1, 6, 11…), mesmo seguindo a mesma regra matemática.
- Calibrar densidade de grid lines e labels ao contexto de uso: menos linhas e labels mais claros quando a pessoa pode inspecionar pontos interativamente.
- Usar mais grid lines quando a leitura precisa ser feita só visualmente, sem interação.
- Fornecer título e subtítulo que resumam a mensagem principal do gráfico antes dos detalhes.
- Título/subtítulo resumidos são críticos para VoiceOver e para pessoas com certas deficiências cognitivas, que dependem deles para decidir se vale a pena investigar mais.
- Hierarquia visual: o dado é sempre o elemento mais proeminente do gráfico.
- Eixos e descrições dão contexto sem competir visualmente com o dado.
- Em espaço compacto: maximizar a largura da área de plotagem.
- Em espaço compacto: manter labels do eixo vertical o mais curtos possível sem perder clareza.
- Em espaço compacto: considerar mover a unidade de medida para o título em vez de repeti-la no eixo.
- Acessibilidade: cada mark (ou grupo de marks) precisa de accessibility label próprio.
- Usar Audio Graphs quando disponível para dar contexto sonoro adicional a usuários de VoiceOver.
- Escrever descrições de acessibilidade sem termos subjetivos ("rapidamente", "quase") — usar valores reais.
- Evitar formatos ambíguos ("6/6") e abreviações ("60m") nas descrições — escrever por extenso ("6 de junho", "60 minutos").
- Descrever o que o dado representa, não a cor usada para representá-lo (cor é aparência, não conteúdo).
- Ser consistente na ordem de menção dos eixos em todo o app (ex. sempre citar o eixo X primeiro).
- Esconder de leitores de tela os labels visuais de eixo/tick — essa informação já chega por accessibility label e Audio Graphs.
- Interação: quando marks são pequenos demais para tocar com precisão, expandir a hit target para toda a área de plotagem.
- Permitir "arrastar/esfregar" (scrub) pela área de plotagem inteira para revelar valores, em vez de exigir toque exato no mark.
- Navegação por teclado/Switch Control: por padrão visita elementos em sequência linear.
- Se precisar de navegação customizada (ex. só pelo eixo X, ou por subconjuntos de valores em dataset muito grande), usar APIs de acessibilidade dedicadas (ex. accessibilityRespondsToUserInteraction).
- Cor: nunca usar só cor para diferenciar dados — combinar sempre com forma ou padrão distinto.
- Adicionar separação visual entre áreas de cor contígua (ex. separadores finos entre segmentos de uma barra empilhada).

Equivalente web:
- `<canvas>` ou SVG com biblioteca de charting (Chart.js, D3, Recharts) para os marks.
- Manter o eixo Y começando em zero para gráficos de barra; permitir range dinâmico configurável para outros tipos de mark.
- `role="img"` com `aria-label` resumindo a mensagem do gráfico no elemento contêiner, substituindo o overview de Audio Graphs.
- `<title>`/`<desc>` por elemento de dado em SVG quando os pontos são interativos, para dar accessibility label individual por mark.
- Hit area maior que o ponto visual (via `<rect>` transparente sobreposto, ou padding de evento) para permitir "scrub" com precisão de dedo/mouse impreciso.
- `tabindex` nos pontos de dado para permitir inspecionar valores por teclado, sem depender de mouse fino.

### Image views

O que é / quando usar: view que exibe uma única imagem, ou uma sequência animada de imagens, tipicamente não interativa.

Regras:
- Usar image view quando o propósito da view é só exibir a imagem.
- Se precisar de interação, configurar um botão do sistema para exibir a imagem, em vez de adicionar comportamento de botão à própria image view.
- Para exibir um ícone, preferir símbolo (SF Symbols) ou interface icon em vez de image view.
- Símbolos e interface icons são vetoriais e recebem a cor de destaque escolhida pela pessoa; uma image view bitmap não.
- Cuidado ao sobrepor texto em imagem: garantir contraste suficiente entre texto e imagem de fundo.
- Considerar sombra de texto ou camada de fundo para o texto se destacar sobre a imagem.
- Em sequência animada, usar o mesmo tamanho para todas as imagens do conjunto.
- Tamanho consistente evita que o sistema precise reescalar; quando o sistema faz o scaling, a performance é geralmente pior.
- macOS: usar image well (não image view) quando precisar de imagem editável.
- Image well suporta copiar, colar, arrastar e apagar com a tecla Delete.
- macOS: usar image button (não image view) para tornar a imagem clicável.
- visionOS: janelas podem usar image views para imagens 2D, estereoscópicas e fotos espaciais.

Equivalente web:
- `<img>` simples, não interativo, é o equivalente direto de image view.
- Se precisar de clique, envolver a imagem num `<button>` — nunca usar handler de clique direto na tag `<img>` sem role de botão.
- Para ícones, preferir SVG inline ou ícone de fonte que herde `currentColor`, em vez de `<img>` bitmap.
- Herdar `currentColor` permite tingir o ícone com a cor de destaque do produto via CSS, como um símbolo do sistema.
- Texto sobre imagem: usar `background: linear-gradient(...)` como camada de contraste.
- Combinar o gradiente com `text-shadow` para legibilidade, replicando a orientação de usar sombra ou camada de fundo.

### Text views

O que é / quando usar: view que exibe texto multilinha estilizado, opcionalmente editável, com scroll quando o conteúdo excede a altura disponível.

Regras:
- Usar text view para texto longo, editável, ou em formato especial.
- Para pouco texto não editável, usar label em vez de text view.
- Para pouco texto editável, usar text field em vez de text view.
- Adotar Dynamic Type para manter a legibilidade quando a pessoa aumenta o tamanho de fonte no dispositivo.
- Testar o conteúdo com opções de acessibilidade ativadas, como texto em negrito (bold text).
- Tornar selecionável texto útil (mensagem de erro, número de série, endereço IP) para permitir copiar e colar em outro lugar.
- Padrão: conteúdo alinhado à borda inicial (leading) da view.
- Padrão: cor de texto = label color do sistema.
- iOS, iPadOS: mostrar o tipo de teclado apropriado ao tipo de conteúdo esperado, para agilizar a entrada de dados.
- tvOS: usa text field para texto editável em vez de text view, porque a entrada de texto é minimizada por design na plataforma.

Equivalente web:
- `<textarea>` para texto editável multilinha com scroll nativo.
- `contenteditable` num elemento de bloco quando precisar de texto rico estilizado que `<textarea>` não suporta.
- Equivalente a Dynamic Type: respeitar unidades relativas (`rem`) em vez de `px` fixo.
- Permitir zoom do navegador até 200% sem quebrar o layout, testando com `prefers-contrast` e tamanho de fonte do SO alterado.
- `user-select: text` explícito em blocos que exibem erro/ID/IP, para garantir que continuem copiáveis mesmo com reset de CSS agressivo no restante da página.

### Web views

O que é / quando usar: view que carrega e exibe conteúdo web rico (HTML embutido, sites) diretamente dentro do app, sem sair do contexto atual.

Regras:
- Suportar navegação forward/back quando fizer sentido para o caso de uso.
- Navegação forward/back não vem habilitada por padrão — é preciso adicionar os controles correspondentes explicitamente.
- Evitar usar web view para construir um navegador completo.
- Acessar rapidamente um site sem sair do app é aceitável; replicar a funcionalidade do Safari é desnecessário e desencorajado.
- Não suportado em tvOS nem em watchOS.

Equivalente web:
- `<iframe>` é o equivalente direto para embutir conteúdo de outra origem dentro da página.
- Implementar apenas os controles de voltar/avançar que fizerem sentido, via `iframe.contentWindow.history`, quando a mesma origem permitir esse acesso (cross-origin normalmente bloqueia).
- Manter o escopo de "mostrar conteúdo pontual" — evitar adicionar barra de endereço, abas ou histórico completo, o que replicaria um navegador dentro do produto.

## Layout and organization

### Boxes

O que é / quando usar: agrupamento visualmente distinto de informação e componentes relacionados, delimitado por borda visível ou cor de fundo, com título opcional.

Regras:
- Manter a box relativamente pequena em relação à view que a contém.
- Perto do tamanho da janela/tela, a box perde o efeito de comunicar separação e pode apertar outros conteúdos.
- Usar padding e alinhamento para comunicar subgrupos dentro da box.
- Evitar aninhar boxes para criar subgrupos — bordas aninhadas deixam a interface "ocupada" e constrangida.
- Título: incluir só se ajudar a esclarecer o conteúdo da box.
- Título também ajuda VoiceOver a prever o que a pessoa vai encontrar dentro da box.
- Escrever título como frase breve, com capitalização de sentença.
- Não usar pontuação final no título, exceto em painel de configurações, onde se adiciona dois-pontos ao final.
- iOS, iPadOS: usam cor de fundo secundária e terciária por padrão dentro de boxes.
- macOS: exibe o título da box acima dela por padrão.
- Não suportado em tvOS nem em watchOS.

Equivalente web:
- `<fieldset>` + `<legend>` é o equivalente semântico nativo quando o grupo precisa de título acessível.
- `<section>`/`<div>` com `border`/`background` quando o grupo não precisa de título formal.
- Evitar `border` aninhada dentro de outra `border` para criar subgrupos.
- Usar `padding`/`gap` para comunicar divisão interna, replicando a regra de não aninhar boxes.

### Collections

O que é / quando usar: gerencia um conjunto ordenado de conteúdo, tipicamente baseado em imagem, apresentado em layout customizável de linha ou grade.

Regras:
- Usar o layout padrão de linha (row) ou grade (grid) sempre que possível.
- Layout padrão é simples e é o que as pessoas já esperam de uma collection.
- Evitar layout customizado que confunda ou chame atenção indevida para si mesmo.
- Para conteúdo textual, preferir tabela em vez de collection.
- Formato de linha de tabela é mais simples e eficiente de ler para informação textual.
- Garantir padding adequado ao redor das imagens para o efeito de foco/hover ficar visível.
- Padding evita que o conteúdo se sobreponha, facilitando "acertar" o item certo.
- Interações padrão: tap para selecionar, touch-and-hold para editar, swipe para rolar.
- Adicionar gestos customizados só se o app exigir funcionalidade além do padrão.
- Usar animações (padrão ou customizadas) como feedback ao inserir, remover ou reordenar itens.
- iOS, iPadOS: ter cautela com mudanças dinâmicas de layout.
- Evitar mudar o layout enquanto a pessoa está vendo e interagindo com a collection, a menos que seja resposta direta a uma ação explícita dela.
- Não suportado em watchOS.

Equivalente web:
- CSS Grid (`display: grid`) para grade e Flexbox para linha — replicam os dois layouts padrão esperados.
- `gap` do Grid/Flexbox garante o "padding adequado entre itens", em vez de itens colados sem espaço para hover/focus respirar.
- Transições CSS (`transition`, `view-transition-name`) na inserção/remoção/reordenação de itens replicam a orientação de dar feedback animado nessas ações.

### Column views

O que é / quando usar: (também chamado "browser") navega uma hierarquia de dados usando colunas verticais; cada coluna é um nível, itens pai têm um triângulo indicador, e selecionar um pai abre seus filhos na próxima coluna.

Regras:
- Usar quando a hierarquia é profunda e a pessoa navega com frequência para frente e para trás entre níveis.
- Usar quando não é necessária a capacidade de ordenação que lista/tabela oferece.
- Mostrar sempre o nível raiz da hierarquia na primeira coluna.
- Primeira coluna fixa como raiz permite à pessoa voltar rapidamente ao topo rolando de volta.
- Ao chegar num item sem filhos, considerar mostrar informação sobre o item selecionado (preview do conteúdo).
- Informação do item sem filhos pode incluir data de criação, data de modificação, tipo e tamanho.
- Permitir redimensionar colunas.
- Redimensionar é essencial quando nomes de itens são longos demais para caber na largura padrão.
- Não suportado em iOS, iPadOS, tvOS, visionOS ou watchOS — exclusivo do macOS.

Equivalente web:
- Colunas roláveis lado a lado (`display: flex` com `overflow-x: auto` por coluna) para emular "miller columns".
- Cada coluna revela a próxima ao selecionar um item pai, replicando a navegação nativa.
- `resize: horizontal` (ou drag handle via JS) em cada coluna, para redimensionamento equivalente.
- Painel fixo na última coluna mostrando preview/metadados quando o item selecionado não tem filhos.

### Disclosure controls

O que é / quando usar: controles (triângulo ou botão) que revelam e escondem informação e funcionalidade associada a uma view ou lista específica.

Regras:
- Usar disclosure control para esconder detalhes até serem relevantes.
- Colocar no topo da hierarquia os controles mais usados, deixando funcionalidade avançada escondida por padrão.
- Disclosure triangle: aponta para dentro (a partir da borda inicial) quando o conteúdo está escondido.
- Disclosure triangle: aponta para baixo quando o conteúdo está visível.
- Sempre fornecer um label descritivo do que é revelado (ex. "Advanced Options") — nunca deixar sem rótulo.
- Disclosure button: aponta para baixo quando escondido, para cima quando visível.
- Posicionar o disclosure button perto do conteúdo que ele controla, estabelecendo relação clara.
- Usar no máximo um disclosure button por view — mais de um adiciona complexidade e confunde.
- iOS, iPadOS, visionOS: disponível via `DisclosureGroup` do SwiftUI.
- Não suportado em tvOS ou watchOS.

Equivalente web:
- `<details>` + `<summary>` é o equivalente nativo direto do disclosure triangle.
- `<details>` já vem com estado aberto/fechado e acessibilidade de teclado embutida.
- Ícone de seta/chevron rotacionando via `transform: rotate()` sincronizado com `aria-expanded`, quando `<details>` não é suficiente visualmente.
- Manter no máximo um disclosure control "de botão" por seção da interface, replicando a regra de não usar mais de um por view.

### Labels

O que é / quando usar: texto estático que a pessoa pode ler e, em certos casos, copiar, mas não editar; aparece em botões, itens de menu e dentro de views para dar contexto.

Regras:
- Usar label para exibir uma pequena quantidade de texto que não precisa ser editado.
- Se precisar editar pouco texto, usar text field em vez de label.
- Se precisar exibir muito texto, usar text view em vez de label.
- Preferir fontes do sistema, que suportam Dynamic Type por padrão.
- Se customizar estilo ou usar fonte própria, garantir que o texto continue legível.
- Usar as quatro cores de label do sistema para comunicar importância relativa.
- Label (cor primária): informação primária.
- Secondary label: subtítulo ou texto suplementar.
- Tertiary label: texto que descreve item ou comportamento indisponível.
- Quaternary label: texto de marca d'água (watermark).
- Tornar selecionável label que contenha informação útil (mensagem de erro, localização, endereço IP).
- watchOS: componentes de data/hora e de contador (timer) ajustam automaticamente a apresentação ao espaço disponível.
- watchOS: esses componentes se atualizam sozinhos, sem input adicional do app.
- Considerar usar componentes de data/timer em complications.

Equivalente web:
- `<span>`/`<p>` não editável é o equivalente direto de label.
- Evitar `<input readonly>` quando não há necessidade de foco de formulário.
- Mapear as quatro cores de label para tokens CSS com contraste decrescente (`--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-quaternary`).
- `user-select: text` em labels com dado copiável (erro, IP, ID), para não depender de menu customizado para permitir copiar.

### Lists and tables

O que é / quando usar: apresentam dados em uma ou mais colunas de linhas; suportam agrupamento ou hierarquia e interações como selecionar, adicionar, remover e reordenar.

Regras:
- Preferir lista/tabela para exibir texto — o formato em linha facilita escanear e ler.
- Para itens que variam muito de tamanho, ou grande volume de imagens, usar collection em vez de tabela.
- Permitir editar a tabela quando fizer sentido, mesmo que só para reordenar (sem poder adicionar/remover).
- iOS, iPadOS: a pessoa precisa entrar em modo de edição antes de poder selecionar itens da tabela.
- Tabela de navegação hierárquica mantém destaque persistente na linha selecionada, esclarecendo o caminho percorrido.
- Tabela de opções costuma destacar a linha só brevemente e depois indicar seleção com um ícone (ex. checkmark).
- Manter o texto do item sucinto para caber confortavelmente na linha, minimizando truncamento e quebra.
- Se cada item tem muito texto, considerar listar só o título e revelar o conteúdo completo numa detail view.
- Truncamento: considerar reticências no meio do texto em vez de cortar no final.
- Reticências no meio preservam início e fim do conteúdo, tornando o item mais distinto e reconhecível.
- Cabeçalho de coluna em tabela multicoluna: usar substantivos ou frases nominais curtas.
- Cabeçalho de coluna: capitalização de título, sem pontuação final.
- Em tabela de uma coluna sem cabeçalho, usar label ou header para dar contexto.
- iOS, iPadOS, visionOS: info button ("detail disclosure button" numa linha de lista) mostra detalhes, mas não navega por hierarquia.
- Disclosure indicator navega para o próximo nível, mas não mostra detalhes — nunca confundir os dois papéis.
- Evitar índice alfabético lateral numa tabela que já tem controles (ex. disclosure indicators) na borda final.
- Índice e controles na mesma borda disputam a mesma área e dificultam o toque preciso em um dos dois.
- macOS: permitir clicar no cabeçalho da coluna para ordenar por ela.
- Clicar de novo no cabeçalho já ordenado inverte a direção da ordenação.
- Permitir redimensionar colunas, já que dados variam de largura.
- Considerar cores de linha alternadas em tabela multicoluna, especialmente em tabelas largas.
- Usar outline view (não table view) para apresentar dados hierárquicos.
- tvOS: linha em foco aumenta de tamanho e ganha cantos arredondados.
- Preparar as imagens vizinhas para esse efeito e não aplicar máscara própria de canto arredondado.
- watchOS: limitar o número de linhas quando possível, já que listas curtas são mais fáceis de escanear.
- Para navegação vertical por página entre os detalhes das linhas, manter as detail views curtas, sem rolagem interna.
- Se as detail views rolarem, a navegação por página vertical entre elas deixa de funcionar.

Equivalente web:
- `<table>` semântica com `<th scope="col">`/`<th scope="row">` para dados genuinamente tabulares.
- `<ul>`/`<ol>` ou lista com `role="list"`/`role="listitem"` para listas simples de navegação, não tabulares.
- Alinhamento de coluna: numérico à direita (`text-align: right; font-variant-numeric: tabular-nums`).
- Alinhamento de coluna: texto à esquerda — replica a leitura em colunas do padrão nativo.
- `text-overflow: ellipsis` só corta no final do texto.
- Reticências no meio (preferência nativa) exige truncamento via JS preservando início e fim, já que CSS puro não oferece essa opção.
- Estado de seleção: classe/`aria-selected` persistente para navegação hierárquica.
- Ícone de check (não fundo colorido) para indicar seleção numa lista de opções.

### Lockups

O que é / quando usar: (específico de tvOS) combina múltiplas views — header, conteúdo, footer — numa única unidade interativa; os quatro tipos são cards, caption buttons, monograms e posters.

Regras:
- Deixar espaço adequado entre lockups, já que o item em foco expande de tamanho.
- Espaço adequado evita sobreposição ou deslocamento de itens vizinhos ao dar foco.
- Usar tamanhos consistentes de lockup dentro de uma mesma linha ou grupo (larguras e alturas iguais).
- Caption buttons inclinam com o movimento de swipe da pessoa.
- Alinhados verticalmente, caption buttons inclinam para cima/baixo.
- Alinhados horizontalmente, caption buttons inclinam para esquerda/direita.
- Em grade, caption buttons inclinam nos dois eixos.
- Monograms: preferir imagem real da pessoa a iniciais — a imagem cria conexão mais próxima.
- Usar iniciais só como fallback, quando a imagem não está disponível.
- Posters: título e subtítulo ficam ocultos até o poster entrar em foco.
- Posters podem ter qualquer tamanho, desde que apropriado ao conteúdo.
- Não suportado em iOS, iPadOS, macOS, visionOS ou watchOS — exclusivo do tvOS.

Equivalente web:
- Card component com `:hover`/`:focus-visible` aplicando `transform: scale()`.
- Adicionar leve `rotate`/`perspective` para simular o "tilt" de foco em grades navegadas por controle remoto ou teclado.
- `gap` consistente em CSS Grid mantém espaçamento entre cards mesmo quando um escala no hover.
- Avatar com fallback de iniciais (`<img onerror>` trocando para div com iniciais) replica a preferência por foto real com fallback textual.

### Outline views

O que é / quando usar: apresenta dados hierárquicos numa lista rolável organizada em colunas e linhas; pelo menos uma coluna carrega a hierarquia principal (pais com triângulo de disclosure), outras colunas mostram atributos complementares.

Regras:
- Usar tabela (não outline view) para dados que não são hierárquicos.
- Expor a hierarquia apenas na primeira coluna.
- Outras colunas exibem só atributos que se aplicam aos dados hierárquicos (ex. tamanho, data de modificação).
- Cabeçalho de coluna descritivo é obrigatório em outline multicoluna.
- Cabeçalho: substantivo ou frase nominal curta, capitalização de título, sem pontuação — em especial, evitar dois-pontos ao final.
- Em outline de coluna única sem cabeçalho, usar label ou outro recurso para dar contexto suficiente.
- Permitir ordenar clicando no cabeçalho.
- Clicar na coluna primária ordena em cada nível da hierarquia (ex. no Finder, pastas de topo primeiro, depois itens dentro de cada pasta).
- Clicar de novo num cabeçalho já ordenado inverte a direção.
- Permitir redimensionar colunas, já que os dados variam de largura.
- Facilitar expandir/colapsar contêineres aninhados.
- Clique no triângulo de disclosure expande só aquele nível.
- Option-clique expande todos os subníveis de uma vez.
- Reter a escolha de expansão da pessoa entre sessões, evitando que ela precise renavegar até o mesmo ponto.
- Considerar cores de linha alternadas em outline multicoluna largo.
- Permitir edição inline quando fizer sentido: clique único edita a célula.
- Duplo clique pode ter comportamento diferente (ex. abrir o arquivo em vez de editar o nome).
- Preferir reticências centralizadas para truncar texto de célula, preservando início e fim.
- Oferecer campo de busca na toolbar de janelas cujo componente principal é um outline extenso.
- Não suportado em iOS, iPadOS, tvOS, visionOS ou watchOS — exclusivo do macOS.

Equivalente web:
- Tree view acessível com `role="tree"`, `role="treeitem"`, `aria-expanded` e `aria-level`.
- Essa combinação replica a semântica de hierarquia com disclosure por nível.
- Persistir o estado expandido/colapsado por nó em `localStorage` (chaveado por id), para "lembrar" a navegação entre sessões.
- Ordenação por coluna clicável com `aria-sort` no `<th>` correspondente.
- Truncamento no meio do texto de célula via JS, igual ao caso de lists/tables.

### Split views

O que é / quando usar: gerencia a apresentação de múltiplos painéis adjacentes de conteúdo (tabelas, coleções, imagens, views customizadas) lado a lado, tipicamente para mostrar vários níveis de hierarquia e navegar entre eles.

Regras:
- Destacar persistentemente a seleção atual em cada painel que leva à detail view.
- Destaque persistente esclarece a relação entre o conteúdo dos vários painéis e ajuda a orientação.
- Considerar permitir drag and drop de conteúdo entre painéis.
- iOS: preferir split view em ambiente "regular", não compacto.
- Em iPhone no modo retrato é difícil mostrar múltiplos painéis sem quebrar ou truncar conteúdo.
- iPadOS: split view pode ter 2 painéis verticais (ex. Mail).
- iPadOS: split view pode ter 3 painéis verticais (ex. Keynote).
- Considerar larguras de janela estreita, compacta e intermediária, já que janelas de iPad são redimensionáveis fluidamente.
- macOS: painéis podem ser arranjados verticalmente, horizontalmente, ou em ambos.
- Incluir divisores que suportam arrastar para redimensionar.
- Definir tamanhos mínimo e máximo razoáveis, mantendo o divisor sempre visível.
- Um painel muito pequeno pode fazer o divisor parecer sumir e ficar difícil de usar.
- Considerar permitir esconder um painel (ex. para reduzir distração ao editar).
- Oferecer múltiplas formas de restaurar um painel escondido (botão de toolbar, comando de menu com atalho de teclado).
- Preferir o estilo de divisor "thin" (1 pt de largura), que maximiza espaço de conteúdo.
- Usar divisor mais grosso só quando ambos os lados têm elementos lineares fortes que dificultam enxergar o divisor thin.
- tvOS: split view funciona bem para filtrar conteúdo (categoria no painel primário, resultado no secundário).
- Layout padrão de tvOS dedica 1/3 da largura ao painel primário e 2/3 ao secundário.
- Também há opção de layout meio-a-meio em tvOS.
- Exibir um único título acima do split view — os painéis não precisam de título próprio.
- Centralizar o título se o painel secundário for uma coleção de conteúdo.
- Alinhar o título acima do painel primário se o secundário tiver uma única view principal de conteúdo importante.
- visionOS: preferir split view a abrir uma nova janela para mostrar informação suplementar.
- Abrir mais janelas exige gerenciar a relação entre elas e pode confundir quem está navegando.
- Usar sheet só quando precisar de uma tarefa simples que a pessoa completa antes de voltar à tarefa principal.
- watchOS: o split view mostra a lista OU uma detail view em tela cheia, nunca lado a lado.
- Exibir automaticamente a detail view mais relevante ao abrir o app (ex. baseada em localização, horário ou ação recente).
- Se houver múltiplas detail pages, colocá-las num tab view vertical navegável pela Digital Crown.
- watchOS exibe indicador de página ao lado da Digital Crown nesse cenário.

Equivalente web:
- CSS Grid com colunas nomeadas (`grid-template-columns`) para os painéis.
- `resize`/drag handle em JS no divisor, com `min-width`/`max-width` para replicar os limites mínimo/máximo do macOS.
- Media queries (`@media (min-width: ...)`) para colapsar de 2-3 painéis para 1 painel em telas estreitas.
- Colapso por media query replica o comportamento "regular vs compacto" de iOS/iPadOS.
- `aria-current="true"` ou classe de seleção persistente na linha/item do painel primário que determina o conteúdo do secundário.

### Tab views

O que é / quando usar: apresenta múltiplos painéis de conteúdo mutuamente exclusivos na mesma área, alternados por um controle de abas.

Regras:
- Usar tab view para áreas de conteúdo intimamente relacionadas.
- A aparência de "cercadura" do tab view sinaliza que as abas mostram conteúdo similar entre si.
- Garantir que controles dentro de um painel afetem só o conteúdo daquele painel.
- Painéis são mutuamente exclusivos e devem ser autocontidos.
- Rótulo de cada aba: substantivo ou frase nominal curta descrevendo o conteúdo do painel.
- Verbo ou frase verbal pode fazer sentido em alguns contextos de rótulo de aba.
- Usar capitalização de título nos rótulos de aba.
- Um bom rótulo de aba permite prever o conteúdo antes de clicar.
- Evitar usar pop-up button para trocar entre abas.
- Tab control é mais eficiente: 1 clique/toque contra 2 do pop-up button.
- Tab control mostra todas as opções ao mesmo tempo; pop-up button exige abrir para ver as opções.
- Pop-up button só é alternativa razoável quando há painéis demais para caber em abas.
- Máximo recomendado: não oferecer mais de 6 abas numa tab view.
- Mais de 6 abas pode ser opressivo e criar problemas de layout.
- Se precisar de 6 ou mais painéis, considerar cada painel como opção num pop-up button de "view options".
- O controle de abas fica na borda superior da área de conteúdo.
- O controle de abas pode ser escondido em apps que alternam painéis programaticamente.
- Ao esconder o controle, a área de conteúdo pode ficar sem borda, com bezel, ou com borda de linha.
- Uma view sem borda pode ser sólida ou transparente.
- Inset padrão: deixar margem de área "window-body" em todos os lados do tab view.
- Margem padrão fica mais limpa e sobra espaço para controles não relacionados ao conteúdo das abas.
- Estender o tab view até as bordas da janela é possível, mas incomum.
- Não suportado em iOS, iPadOS, tvOS ou visionOS — usar segmented control para funcionalidade parecida.
- watchOS exibe tab views usando page controls, navegáveis pela Digital Crown.

Equivalente web:
- `role="tablist"` com `role="tab"` (e `aria-selected`) associados a `role="tabpanel"` via `aria-controls`/`aria-labelledby`.
- Essa combinação é o padrão ARIA equivalente de abas.
- Limitar a interface a poucas abas visíveis (ideal ≤ 6, como a régua nativa).
- Usar `<select>`/dropdown como alternativa para muitas opções, replicando a exceção do pop-up button.
- Navegação por teclado: setas esquerda/direita movem entre abas com `roving tabindex`.
- Home/End vão para a primeira/última aba — comportamento esperado de uma tablist acessível.

## Menus and actions

### Activity views

O que é / quando usar: também chamado share sheet, apresenta um leque de tarefas que a pessoa pode realizar no contexto atual (compartilhar, copiar, imprimir, acesso rápido a apps frequentes); aparece como sheet ou popover.

Regras:
- Evitar duplicar ações comuns já disponíveis na activity view (ex. não criar um "Print" próprio).
- A pessoa não saberia diferenciar uma ação duplicada da ação equivalente do sistema.
- Se precisar de funcionalidade parecida mas diferente, dar título customizado que esclareça a diferença (ex. "Print Transaction" em vez de "Print").
- Usar um símbolo (SF Symbols) para representar a atividade customizada.
- Se precisar de ícone customizado, centralizá-lo numa área de aproximadamente 70x70 pixels.
- Escrever título sucinto e descritivo para cada ação customizada.
- Preferir um único verbo ou frase verbal curta que comunique o que a ação faz.
- Não incluir nome da empresa ou produto no título da ação customizada.
- O share sheet nativo exibe o nome da empresa abaixo do ícone da atividade de compartilhamento — diferente do título da ação em si.
- Garantir que as atividades exibidas façam sentido no contexto atual.
- Não é possível reordenar tarefas do sistema, mas é possível excluir as que não se aplicam ao app.
- Usar sempre o botão de Compartilhar padrão para revelar a activity view.
- Evitar criar caminho alternativo para abrir a mesma função de compartilhamento.
- Extensões: preferir a view de composição do sistema para share extension, para manter experiência consistente.
- Para action extension, incluir o nome do app na interface.
- Evitar empilhar view modal por cima da extensão — o sistema já apresenta a extensão dentro de uma view modal por padrão.
- Não notificar a pessoa só porque a tarefa terminou.
- Se a tarefa é demorada, continuar em background e oferecer forma de checar o status no app principal.
- Disponível em iOS, iPadOS e visionOS.
- Não suportado em macOS, tvOS ou watchOS (macOS oferece extensões de share/action equivalentes via toolbar e context menu).

Equivalente web:
- A Web Share API (`navigator.share()`) é o equivalente direto de abrir a activity view nativa do sistema operacional a partir do navegador.
- Fallback customizado (menu de "compartilhar em X/Y/Z") só quando a Web Share API não está disponível.
- No fallback, manter os mesmos princípios: título de ação curto e verbo, sem nome de marca no rótulo do botão de compartilhar.

### Buttons

O que é / quando usar: inicia uma ação instantânea; combina estilo (tamanho, cor, forma), conteúdo (símbolo e/ou texto) e role (significado semântico) para comunicar sua função.

Regras:
- Hit region mínima de 44x44 pt para garantir seleção fácil em qualquer método de input.
- Em visionOS, a hit region mínima é 60x60 pt.
- Sempre incluir um estado de "pressed" (pressionado) em botão customizado.
- Sem estado pressed, o botão parece não responder ao toque/clique.
- Usar estilo proeminente (com cor de destaque) só para a ação mais provável de cada view.
- Manter no máximo 1 a 2 botões proeminentes por view — mais que isso aumenta a carga cognitiva de escolha.
- Usar estilo (não tamanho) para diferenciar a opção preferida entre múltiplas opções.
- Botões do mesmo tamanho sinalizam um conjunto coerente de escolhas.
- Tamanhos diferentes lado a lado deixam a interface inconsistente e confusa.
- Evitar aplicar cor de label de botão parecida com o fundo da camada de conteúdo (contexto Liquid Glass).
- Quando o conteúdo já é colorido, preferir a aparência monocromática padrão do label do botão.
- Conteúdo: usar símbolo para ações já associadas a um ícone familiar (ex. square.and.arrow.up para compartilhar).
- Usar texto quando um rótulo curto comunica melhor que um ícone.
- Rótulo de texto: capitalização de título, de preferência começando com verbo (ex. "Add to Cart").
- Role Normal: sem significado semântico específico.
- Role Primary: a ação mais provável — responde à tecla Return.
- Role Primary pode fechar automaticamente sheets, views editáveis e alerts ao ser escolhida.
- Role Cancel: cancela a ação atual.
- Role Destructive: ação que pode destruir dado — usa a cor vermelha do sistema.
- Nunca atribuir role Primary a uma ação destrutiva, mesmo que seja a escolha mais provável.
- Isso evita que a pessoa perca conteúdo por confiar na proeminência visual sem ler o botão.
- iOS, iPadOS: para ação que não completa instantaneamente, configurar o botão para exibir um activity indicator.
- O botão pode trocar o label ao mesmo tempo do indicator (ex. "Checkout" → "Checking out…").
- O botão esconde a imagem, se houver uma, enquanto mostra o activity indicator.
- macOS — push button: tipo padrão, pode exibir texto, símbolo, ícone, imagem, ou combinação de texto+imagem.
- Push button pode ser o botão padrão de uma view e pode ser tintado.
- Usar flexible-height push button só quando precisar exibir conteúdo alto ou de altura variável.
- Flexible-height mantém o mesmo raio de canto e padding do botão padrão.
- Adicionar reticências ao título quando o botão abre outra janela, view ou app.
- Considerar suportar spring loading (arrastar item selecionado sobre o botão + force click) em trackpads compatíveis.
- macOS — square button (gradient button): usado para ações relacionadas a uma view (ex. adicionar/remover linha numa tabela).
- Square button contém só símbolo ou ícone, nunca texto.
- Square button aparece perto da view que afeta (dentro ou abaixo dela).
- Nunca usar square button em toolbar ou status bar — nesse caso, usar toolbar item.
- Evitar label introdutório para square button, já que a proximidade com a view já esclarece o propósito.
- macOS — help button: circular, contém um ponto de interrogação.
- No máximo 1 help button por janela — múltiplos tornam difícil prever o resultado de cada um.
- Abrir, quando possível, o tópico de ajuda relacionado ao contexto atual.
- Se não houver tópico específico, abrir o nível superior da documentação de ajuda.
- Posicionar no canto inferior oposto aos botões de dismissal em diálogos com OK/Cancel, alinhado verticalmente com eles.
- Posicionar no canto inferior esquerdo ou direito em diálogo sem botões de dismissal, ou em janela/painel de configurações.
- Usar help button só dentro de uma view, nunca na toolbar ou status bar.
- Não exibir texto introdutório junto ao help button.
- macOS — image button: aparece numa view e exibe imagem, símbolo ou ícone.
- Pode se comportar como push button, toggle ou pop-up button.
- Incluir cerca de 10 pixels de padding entre as bordas da imagem e as bordas do botão.
- As bordas do botão definem a área clicável mesmo quando invisíveis.
- Evitar borda padrão do sistema no image button.
- Se precisar de label, posicioná-lo abaixo do image button.
- Nunca usar image button em toolbar ou status bar.
- visionOS: botão inclui fundo visível por padrão.
- Botão em visionOS toca som para dar feedback ao ser interagido.
- Três formas padrão: círculo (botão só de ícone).
- roundedRectangle ou capsule para botão só de texto.
- capsule para botão com ícone + texto.
- Quatro estados visuais: idle, hover, selected, unavailable.
- Botões em visionOS não suportam hover effect customizado.
- Tamanhos padrão em visionOS: mini 28 pt, small 32 pt, regular 44 pt, large 52 pt, extra large 64 pt.
- Manter os centros dos botões a pelo menos 60 pt de distância entre si.
- Se o botão mede 60 pt ou mais, adicionar 4 pt de padding ao redor para o hover effect não sobrepor os vizinhos.
- Evitar dispor botões pequenos ou "mini" em pilha vertical ou linha horizontal.
- Usar material "thin" como fundo quando o botão aparece sobre uma janela de vidro.
- Usar material "glass" quando o botão flutua no espaço.
- Nunca criar botão customizado com fundo branco e texto/ícone preto — reservado ao estado "toggled" do sistema.
- Preferir formas circulares ou capsule — mais fáceis de manter o olhar fixo nelas.
- Em pilha vertical de botões com texto, preferir rounded-rectangle.
- Em linha horizontal de botões com texto, preferir capsule.
- Usar controles padrão para aproveitar os sons de feedback já conhecidos — importante porque o sistema não reproduz haptics em visionOS.
- watchOS: todos os botões inline usam a forma capsule.
- Ao ficar inline com conteúdo, o botão ganha efeito de material que contrasta com o fundo para legibilidade.
- Usar toolbar para posicionar botões nos cantos — o sistema move automaticamente hora e título para acomodá-los.
- O sistema aplica Liquid Glass aos botões de toolbar em watchOS.
- Preferir botões que ocupam toda a largura da tela para ações primárias — mais fáceis de tocar.
- Se dois botões dividem o mesmo espaço horizontal, usar a mesma altura para ambos.
- Usar imagens ou títulos de texto curtos quando dois botões dividem espaço horizontal.
- Usar botões de toolbar para navegação a áreas relacionadas ou ações contextuais do conteúdo da view.
- Manter a mesma altura em pilhas verticais de botões de texto de uma e duas linhas.

Equivalente web:
- `<button>` nativo preserva foco de teclado, estado `:active` e semântica de role sem trabalho extra.
- Nunca usar `<div onclick>` no lugar de `<button>`.
- Área mínima de toque de 44x44 CSS px (alinhado ao WCAG 2.5.5), via `min-width`/`min-height` ou padding.
- Manter a área mínima mesmo em botões visualmente pequenos (ícone).
- Hierarquia de estilo via classes (`.btn-primary`, `.btn-secondary`, `.btn-destructive`) em vez de tamanho.
- Manter no máximo 1 a 2 `.btn-primary` visíveis por tela/painel.
- Nunca aplicar `.btn-primary` a uma ação destrutiva — usar cor de perigo + role secundário em vez disso.
- Estado de carregamento inline: trocar texto por spinner e usar `aria-busy="true"`.
- Desabilitar o botão (`disabled`) durante a operação, replicando o activity indicator no lugar do label padrão.

### Context menus

O que é / quando usar: dá acesso a funcionalidade diretamente relacionada a um item sem poluir a interface; fica escondido até a pessoa revelá-lo (touch-and-hold, Control+clique, clique secundário com trackpad).

Regras:
- Priorizar relevância ao escolher itens: incluir só os comandos mais prováveis no contexto atual.
- Um context menu não é lugar para itens avançados ou raramente usados.
- Manter o número de itens pequeno — um menu longo demais é difícil de escanear e rolar.
- Suportar context menu de forma consistente em todo o app.
- Oferecê-lo em algumas telas e não em outras faz a pessoa pensar que há um problema.
- Sempre disponibilizar os itens do context menu também na interface principal (ex. toolbar, menus da menu bar).
- Nunca deixar o context menu como único caminho para um comando.
- Submenu: usar no máximo 1 nível de profundidade.
- Dar ao submenu um título intuitivo que permita prever o conteúdo sem precisar abrir.
- Esconder itens indisponíveis, não deixá-los acinzentados.
- Diferente de menu regular, o context menu mostra só ações relevantes ao conteúdo/seleção atual.
- Exceção em macOS: Cut, Copy e Paste podem aparecer indisponíveis (acinzentados) em vez de sumir.
- Colocar os itens mais frequentemente usados onde a pessoa vai ler primeiro.
- Geralmente isso é perto de onde o dedo ou ponteiro revelou o menu.
- Pode ser necessário inverter a ordem dos itens se o menu abrir acima em vez de abaixo do conteúdo selecionado.
- Não mostrar atalhos de teclado no context menu — isso fica reservado aos menus principais.
- Separadores: seguir as mesmas boas práticas de menus em geral.
- Evitar mais de aproximadamente 3 grupos separados por linha num context menu.
- iOS, iPadOS, visionOS: avisar sobre itens que podem destruir dado.
- Itens potencialmente destrutivos (Delete, Remove) devem ficar ao final do menu.
- Identificar itens destrutivos como destructive — o sistema pode exibi-los em texto vermelho.
- iOS, iPadOS: oferecer context menu OU edit menu para um item, nunca os dois.
- Oferecer ambos confunde a pessoa e dificulta o sistema detectar a intenção.
- iPadOS: considerar usar context menu para criar novo objeto (ex. nova pasta em área vazia no Files).
- Pode exibir um preview gráfico do conteúdo perto da lista de comandos.
- Ajustar o clipping path do preview para as bordas (ex. cantos arredondados) não parecerem mudar durante a animação.
- macOS: context menu às vezes é chamado de contextual menu.
- visionOS: considerar usar context menu em vez de painel/inspector window para reduzir número de janelas abertas.
- Evitar que a altura do context menu exceda a altura da janela associada.
- Uma janela em visionOS tem componentes do sistema acima e abaixo de suas bordas que poderiam ficar obscurecidos.
- Não suportado em watchOS.

Equivalente web:
- Handler de evento `contextmenu` customizado, substituindo o menu nativo do navegador.
- Renderizar um popover posicionado em `clientX`/`clientY`, equivalente ao clique-secundário/touch-and-hold nativo.
- Fechar automaticamente ao perder foco ou clicar fora.
- Disponibilizar as mesmas ações também na UI visível (toolbar/menu principal) — nunca esconder ação exclusivamente no menu de contexto.
- `role="menu"`/`role="menuitem"` com navegação por seta e tecla Esc para fechar.

### Dock menus

O que é / quando usar: no Mac, clique secundário no ícone do app na Dock revela um menu com itens do sistema e customizados, que pode variar dependendo se o app está aberto ou não.

Regras:
- Rotular itens de forma sucinta e organizá-los logicamente, seguindo as mesmas regras gerais de menus.
- Disponibilizar os itens customizados do Dock menu também em outro lugar do app (ex. menu bar).
- Nem todo mundo usa o Dock menu, por isso os itens não podem viver só ali.
- Priorizar itens de alto valor no Dock menu, como listar janelas abertas/recentes.
- Incluir ações úteis mesmo quando o app não está em primeiro plano ou não tem janela aberta.
- Exemplo: Mail inclui "Get new mail" e "Compose" junto da lista de janelas abertas.
- Não suportado em iOS, iPadOS, tvOS, visionOS ou watchOS — exclusivo do macOS.
- O equivalente em iOS/iPadOS são as Home Screen quick actions.

Equivalente web:
- Sem equivalente direto no navegador.
- O mais próximo é o menu de contexto do ícone de um PWA instalado, definido via `manifest.json` → `shortcuts`.
- Esse menu de PWA também deve listar ações de alto valor (ex. "Nova conversa", "Buscar").
- Manter as mesmas ações também acessíveis dentro do próprio app — nunca só no atalho do ícone/dock.

### Edit menus

O que é / quando usar: permite alterar conteúdo selecionado na view atual, além de oferecer comandos relacionados como Copy, Select, Translate e Look Up; a aparência muda por plataforma (barra horizontal compacta em iOS; context menu em iPadOS/macOS quando revelado por teclado/ponteiro).

Regras:
- Preferir sempre o edit menu fornecido pelo sistema em vez de recriar um customizado.
- Recriar um menu com os mesmos comandos é redundante e provavelmente confuso.
- Deixar a pessoa revelar o edit menu pelas interações padrão que ela já conhece na plataforma.
- Interações padrão: touch-and-hold ou double-tap em touchscreen, pinch-and-hold em visionOS, clique secundário com trackpad/teclado.
- Não exigir gesto customizado para essa tarefa padrão.
- Oferecer só comandos relevantes ao contexto atual, removendo ou acinzentando os que não se aplicam.
- Não mostrar Copy/Cut sem nada selecionado.
- Não mostrar Paste quando não há nada para colar.
- Listar comandos customizados perto dos comandos padrão relacionados.
- Exemplo: comandos de formatação customizados depois dos comandos padrão, na mesma seção.
- Evitar sobrecarregar com comandos customizados demais.
- Quando fizer sentido, permitir selecionar e copiar texto não editável (ex. legenda de imagem, status de rede social).
- Em geral, permitir copiar o texto de conteúdo, mas não os rótulos dos controles.
- Suportar undo e redo sempre que possível.
- Edit menu não exige confirmação antes de agir, por isso undo/redo é essencial.
- Evitar implementar outros controles que dupliquem a função de itens do edit menu.
- Usar os atalhos de teclado padrão em vez de sobrecarregar a interface com controles redundantes.
- Diferenciar tipos de comando de remoção quando necessário.
- Delete se comporta como pressionar a tecla Delete.
- Cut copia o conteúdo selecionado para o pasteboard do sistema antes de apagá-lo.
- Escrever labels curtos para comandos customizados: verbos ou frases verbais curtas.
- iOS, iPadOS: garantir que o edit menu funcione bem nos dois estilos — horizontal compacto e vertical.
- Estilo horizontal compacto é revelado por gesto Multi-Touch.
- Estilo vertical é revelado por teclado ou ponteiro.
- Ajustar a posição do menu quando necessário — não é possível mudar sua forma ou a seta indicadora, só a posição.
- Por padrão, o edit menu aparece acima ou abaixo do ponto de inserção/seleção, dependendo do espaço disponível.
- macOS: acessar comandos de edição via context menu durante uma tarefa de edição.
- macOS também acessa comandos de edição pelo menu Edit na menu bar.
- Não suportado em tvOS ou watchOS, já que editar conteúdo é raro nessas experiências.

Equivalente web:
- Selection toolbar customizada (barra flutuante disparada por `selectionchange`) só quando o navegador não oferece suporte nativo.
- Preferir a seleção nativa do navegador sempre que possível, em vez de reimplementar comandos padrão.
- Mostrar/esconder itens conforme `window.getSelection().toString()` estar vazio ou não.
- Isso replica a regra de esconder Copy/Cut sem seleção e Paste sem nada para colar.
- Garantir `user-select: text` em conteúdo não editável relevante, para permitir copiar sem depender de menu customizado.

### Home Screen quick actions

O que é / quando usar: em iOS/iPadOS, menu de ações específicas do app acessível ao segurar o ícone na Home Screen ou na Dock, com título, interface icon e subtítulo opcional para cada ação.

Regras:
- Criar quick actions só para tarefas de alto valor.
- É possível oferecer um total de até 4 quick actions por app.
- Evitar mudanças imprevisíveis nas quick actions dinâmicas.
- Pode fazer sentido atualizá-las conforme localização, atividade recente, hora do dia ou mudanças de configuração.
- A mudança precisa ser previsível para a pessoa, mesmo quando dinâmica.
- Título sucinto que comunique instantaneamente o resultado da ação (ex. "Directions Home", "New Message").
- Usar subtítulo só se precisar dar mais contexto (ex. indicar mensagens não lidas).
- Nunca incluir o nome do app ou informação supérflua no título/subtítulo.
- Manter o texto curto para evitar truncamento.
- Considerar localização do texto ao escrever título/subtítulo.
- Fornecer um interface icon familiar para cada quick action.
- Preferir SF Symbols para representar ações de quick action.
- Se desenhar ícone próprio, usar o Quick Action Icon Template dos Apple Design Resources.
- Nunca usar emoji no lugar de símbolo ou interface icon.
- Emoji é totalmente colorido; o símbolo de quick action é monocromático e muda de aparência no Dark Mode.
- Não suportado em macOS, tvOS, visionOS ou watchOS — exclusivo de iOS/iPadOS.
- O equivalente no Mac é o Dock menu.

Equivalente web:
- `shortcuts` no Web App Manifest (`manifest.json`) é o equivalente direto.
- Cada entrada tem `name`, `short_name`, `url` e `icons`.
- Seguir o mesmo princípio de "poucos, de alto valor" ao definir shortcuts.
- Usar ícones monocromáticos "maskable" no manifest para consistência visual.
- Evitar emoji como ícone de atalho, replicando a proibição de emoji nas quick actions nativas.

### Menus

O que é / quando usar: componente que revela opções ao ser interagido, forma eficiente de apresentar comandos; as regras de rotulagem e organização valem para todo tipo de menu (pop-up button, pull-down button, context menu, menu bar).

Regras:
- Label de item: verbo ou frase verbal que descreve a ação (ex. "View", "Close", "Select").
- Usar capitalização de título nos labels de item de menu.
- Capitalização de título: capitaliza toda palavra exceto artigos, conjunções coordenativas e preposições curtas.
- Capitalização de título sempre capitaliza a última palavra do label, independente da classe gramatical.
- Remover artigos (a, an, the em inglês) dos labels de item de menu para economizar espaço.
- Mostrar item indisponível como acinzentado (dimmed) em vez de escondê-lo, em menu regular.
- O menu inteiro precisa permanecer disponível mesmo quando todos os itens estão indisponíveis.
- Adicionar reticências (…) ao final do label de um item quando a ação exige mais informação antes de completar.
- Reticências tipicamente indicam que a ação abre outra view para coletar essa informação.
- Ícones: usar ícones padrão para representar ações comuns de forma consistente (Share, Print, Search).
- Usar ícones de item de menu com moderação e propósito, destacando as ações mais comuns/chave.
- Não deixar item sem ícone se não encontrar um que represente bem a ação — nesse caso, preferir não usar ícone.
- Aplicar tratamento visual uniforme dentro de um mesmo grupo de itens: ícone em todos, ou em nenhum.
- Organização: listar itens importantes ou frequentemente usados primeiro.
- A pessoa tende a escanear o menu de cima para baixo.
- Agrupar itens logicamente relacionados (ex. Copy/Cut/Paste) e usar separador entre os grupos.
- Manter comandos relacionados no mesmo grupo mesmo com importância diferente.
- Exemplo: "Paste and Match Style" fica junto de "Paste"/"Copy"/"Cut", mesmo sendo usado com menos frequência.
- Ser atento ao comprimento do menu — menu longo demais exige mais tempo e atenção para ler.
- Se o menu ficar longo, considerar dividi-lo em menus separados ou usar submenu.
- Exceção: menu com conteúdo definido pela pessoa ou gerado dinamicamente (ex. History, Bookmarks) pode ser longo e rolável.
- Submenus: usar com moderação, já que cada submenu adiciona complexidade e esconde os itens que contém.
- Considerar submenu quando um termo aparece em mais de dois itens do mesmo grupo.
- Exemplo: em vez de "Sort by Date", "Sort by Score", "Sort by Time" separados, usar item "Sort by" com submenu Date/Score/Time.
- Repetir o termo comum no label do item pai ajuda a prever o conteúdo do submenu.
- Limitar profundidade a 1 nível de hierarquia de submenu.
- Se um submenu passar de aproximadamente 5 itens, considerar criar um novo menu em vez de aumentá-lo.
- Manter o item de submenu disponível mesmo quando todos os itens internos estão indisponíveis.
- Preferir submenu a indentar itens — indentação é inconsistente com o padrão do sistema.
- Itens toggled: considerar um label mutável que descreva o estado atual (ex. "Show Map" ↔ "Hide Map" num único item).
- Incluir um verbo se o label mutável não for claro o suficiente (ex. "Turn HDR On"/"Turn HDR Off" em vez de só "HDR On"/"HDR Off").
- Se necessário, exibir os dois itens separadamente em vez de um só toggled.
- Usar checkmark para indicar atributo atualmente em efeito, facilitando escanear a lista.
- Oferecer item que remove múltiplos atributos toggled de uma vez quando fizer sentido (ex. "Plain").
- Menus em jogos: deixar a pessoa navegar usando o método de interação padrão da plataforma.
- Garantir que os menus continuem fáceis de abrir e ler em todas as plataformas suportadas.
- Ajustar tamanho de fonte e alvos de toque se o conteúdo escalado ficar pequeno demais numa tela móvel.
- iOS, iPadOS: layout Small — linha de 4 itens no topo mostrando só símbolo/ícone sem label, seguida de lista com os itens restantes.
- Layout Medium — linha de 3 itens no topo com símbolo/ícone acima de um label curto, seguida de lista.
- Layout Large (padrão) — todos os itens numa lista única.
- Usar layout Medium para até 3 ações importantes e frequentes (ex. Notes usa Medium para Scan/Lock/Pin).
- Usar layout Small apenas para ações intimamente relacionadas que aparecem tipicamente como grupo (ex. Bold/Italic/Underline/Strikethrough).
- Cada item em layout Small usa símbolo reconhecível sem precisar de label.
- visionOS: pode exibir itens usando os layouts Small ou Large definidos para iOS/iPadOS.
- Pode aplicar um efeito de "breakthrough" para o menu permanecer visível mesmo quando outro conteúdo o ocluiria.
- Preferir o efeito "subtle" na maioria dos casos — mescla a apresentação com o conteúdo ao redor.
- "Subtle" é o padrão quando o modo é "automatic".
- Usar "prominent" só quando for importante exibir o menu por cima de toda a cena — pode atrapalhar a experiência e causar desconforto.
- Usar "none" para ocluir totalmente o menu atrás de outro conteúdo 3D quando fizer parte do design (ex. jogo de puzzle).
- Preferir exibir o menu perto do conteúdo que ele controla, já que a pessoa precisa olhar para o item antes de tocar.

Equivalente web:
- `role="menu"`/`role="menuitem"` com navegação por seta/Enter/Esc é a base ARIA equivalente a qualquer menu nativo.
- Item indisponível: `aria-disabled="true"` + estilo acinzentado, mantendo o item no DOM.
- Nunca remover o item indisponível do markup — replica "esconder disponibilidade, não o item" em menu regular.
- Item toggled: `role="menuitemcheckbox"`/`aria-checked` para refletir estado ligado/desligado com ícone de check.
- Alternativa de item toggled: trocar o texto visível quando a abordagem escolhida for label mutável.

### Ornaments

O que é / quando usar: em visionOS, apresenta controles ou informação relacionados a uma janela sem lotar ou obscurecer seu conteúdo; flutua num plano paralelo à janela, ligeiramente à frente no eixo z.

Regras:
- Ornament acompanha o movimento da janela, mantendo a posição relativa mesmo com o conteúdo da janela rolando.
- Usar ornament para controles ou informação frequentemente necessários, num local consistente que não polua a janela.
- Exemplo: Music usa um ornament para os controles de Now Playing, num lugar sempre previsível.
- Em geral, manter o ornament visível.
- Pode fazer sentido escondê-lo quando a pessoa "mergulha" no conteúdo (ex. assistindo a um vídeo ou vendo uma foto).
- Na maioria dos casos, a pessoa aprecia acesso consistente aos controles do ornament.
- Se precisar exibir múltiplos ornaments, priorizar o equilíbrio visual geral da janela.
- Considerar limitar o número total de ornaments para não aumentar o peso visual da janela.
- Se decidir remover um ornament, é possível realocar seus elementos para dentro da janela principal.
- Manter a largura do ornament igual ou mais estreita que a janela associada.
- Um ornament mais largo que a janela pode interferir com uma tab bar ou outro conteúdo vertical na lateral.
- Considerar usar botões sem borda (borderless) num ornament.
- O fundo do ornament já é glass por padrão, então um botão sobre ele pode não precisar de borda visível.
- O sistema aplica automaticamente o hover effect a um botão borderless em ornament.
- Usar toolbars e tab bars fornecidos pelo sistema em vez de criar um ornament do zero para eles.
- Em visionOS, toolbars e tab bars já aparecem automaticamente como ornaments.
- Não suportado em iOS, iPadOS, macOS, tvOS ou watchOS — exclusivo do visionOS.

Equivalente web:
- Painel flutuante fixo (`position: fixed` relativo a um container, ou `position: sticky`) ancorado a um card/janela.
- Usar `box-shadow`/`backdrop-filter: blur()` simulando o material "glass" e a separação de profundidade em z.
- `position: sticky` relativo ao container (não à viewport) para o painel "acompanhar" o card ao rolar.
- Limitar a 1-2 painéis flutuantes simultâneos por tela, seguindo a mesma lógica de "priorizar equilíbrio visual".

### Pop-up buttons

O que é / quando usar: exibe um menu de opções mutuamente exclusivas; ao escolher um item, o menu fecha e o botão pode atualizar seu conteúdo para refletir a seleção atual.

Regras:
- Usar pop-up button para apresentar uma lista plana de opções ou estados mutuamente exclusivos.
- Usar pull-down button em vez disso quando precisar de uma lista de ações.
- Usar pull-down button em vez disso quando precisar permitir seleção de múltiplos itens.
- Usar pull-down button em vez disso quando precisar incluir um submenu.
- Sempre fornecer uma seleção padrão útil.
- O pop-up button mostra o item default especificado até a pessoa fazer uma escolha.
- Escolher, quando possível, o item default que a maioria das pessoas provavelmente quer.
- Dar meios de prever as opções do pop-up button sem precisar abri-lo.
- Usar um label introdutório ou um label no próprio botão que descreva o efeito.
- Considerar usar pop-up button quando o espaço é limitado e não é necessário mostrar todas as opções o tempo todo.
- Pop-up button é uma forma eficiente de apresentar um leque amplo de escolhas em pouco espaço.
- Se necessário, incluir uma opção "Custom" no menu para itens úteis só em algumas situações.
- Opção "Custom" evita poluir a interface principal com controles usados ocasionalmente.
- Pode exibir texto explicativo abaixo da lista para esclarecer como as opções funcionam.
- iPadOS: dentro de um popover ou modal view, considerar usar pop-up button em vez de disclosure indicator.
- Isso permite escolher rapidamente sem precisar navegar até uma detail view.
- Usar essa abordagem quando o conjunto de opções for razoavelmente pequeno e bem definido.
- Não suportado em tvOS ou watchOS.

Equivalente web:
- `<select>` nativo é o equivalente direto de pop-up button.
- `<select>` já mostra opções mutuamente exclusivas, exibe a seleção atual e fecha ao escolher.
- Dropdown customizado só quando `<select>` não permite o visual necessário.
- Nesse caso, manter a semântica `role="listbox"`/`role="option"` e `aria-activedescendant`.
- Isso evita perder a acessibilidade nativa que o `<select>` já oferece de graça.

### Pull-down buttons

O que é / quando usar: exibe um menu de itens ou ações diretamente relacionados ao propósito do botão; ao escolher um item, o menu fecha e o app executa a ação escolhida.

Regras:
- Usar pull-down button para comandos ou itens diretamente relacionados à ação do próprio botão.
- Exemplo: um botão "Add" com menu especificando o tipo de item a adicionar.
- Exemplo: um botão "Sort" com menu de atributos de ordenação.
- Exemplo: um botão "Back" com menu de locais específicos para voltar.
- Se precisar de uma lista de opções mutuamente exclusivas que não são comandos, usar pop-up button em vez disso.
- Evitar colocar todas as ações de uma view num único pull-down button.
- As ações primárias precisam ficar facilmente descobríveis sem exigir abrir um menu antes de fazer qualquer coisa.
- Balancear o comprimento do menu com a facilidade de uso.
- Listar no mínimo 3 itens ajuda a interação (abrir o botão) a valer a pena.
- Para 1-2 itens, considerar alternativas: botões diretos para ações, toggles/switches para seleções.
- Listar itens demais no menu pode atrasar a pessoa para achar o item específico.
- Exibir título de menu sucinto só se agregar significado.
- Em geral, o conteúdo do botão combinado com itens descritivos já dá contexto suficiente.
- Marcar itens destrutivos com texto vermelho para destacá-los.
- Ao escolher ação destrutiva, o sistema exibe action sheet (iOS) ou popover (iPadOS) para confirmar ou cancelar.
- A confirmação aparece em local diferente do menu e exige dismissal deliberada, ajudando a evitar perda de dado por engano.
- Incluir um interface icon junto ao item de menu quando agregar valor.
- Usar SF Symbols mantém experiência familiar e o símbolo alinhado ao texto em qualquer escala.
- iOS, iPadOS: é possível revelar o pull-down menu por um gesto específico no botão (ex. touch-and-hold), além do toque padrão.
- Considerar um botão "More" (pull-down) para itens que não precisam de posição de destaque.
- Botão "More" ajuda a oferecer um leque de itens onde o espaço é limitado.
- Botão "More" pode prejudicar a descobribilidade, já que o ícone de reticências não indica claramente o conteúdo.
- Pesar a conveniência de espaço contra o impacto na descobribilidade para achar o equilíbrio certo no app.
- Não suportado em tvOS ou watchOS.

Equivalente web:
- Menu dropdown de ações (`<button aria-haspopup="menu" aria-expanded>` controlando um `role="menu"`).
- Cada opção executa uma ação e fecha o menu, diferente do `<select>`, que só troca um valor selecionado.
- Botão "More" (`<button aria-label="Mais ações">`) contendo o menu de itens secundários.
- Isso replica a mesma lógica de equilibrar espaço vs. descobribilidade do More pull-down button.
- Ação destrutiva no menu: cor de perigo no item + modal/dialog de confirmação antes de executar.
- Nunca destruir dado direto ao clicar no item do menu, sem confirmação.

### The menu bar

O que é / quando usar: no Mac (e de forma similar no iPad), a barra no topo da tela que exibe os menus de nível superior do app; segue ordem fixa esperada por quem usa Mac com frequência.

Regras:
- Ordem padrão dos menus: [Nome do app] · File · Edit · Format · View · menus específicos do app (se houver) · Window · Help.
- No macOS, o menu Apple sempre ocupa a borda inicial e não pode ser modificado ou removido.
- Menus bar extras podem aparecer na borda final da menu bar quando há espaço.
- Sempre respeitar a ordem padrão de menus do sistema — a pessoa espera encontrá-los numa ordem já familiar.
- Em muitos casos o sistema já implementa o comportamento de itens padrão (ex. Edit > Copy fica disponível automaticamente em text field padrão).
- Manter sempre o mesmo conjunto de itens visível, mesmo quando indisponível no contexto atual.
- Se um item de menu não é executável no momento, desabilitá-lo em vez de escondê-lo.
- Representar ações de item de menu com ícones familiares, iguais aos usados pelo sistema (Copy, Share, Delete).
- Suportar os atalhos de teclado já definidos para itens padrão (Copy, Cut, Paste, Save, Print).
- Definir atalhos customizados só quando necessário.
- Preferir títulos de menu de uma palavra só.
- Título de uma palavra funciona melhor com fatores como tamanho de tela variável e presença de menu bar extras.
- Se precisar de mais de uma palavra no título do menu, usar capitalização de título.
- Menu do app: About [App] deve vir primeiro, com nome curto de até 16 caracteres, sem número de versão.
- Incluir separador logo após About [App], para ficar sozinho em seu grupo.
- Settings… é reservado a configurações no nível do app.
- Configurações específicas de documento vão no menu File, não em Settings.
- Itens específicos do app opcionais ficam listados depois de Settings, no mesmo grupo.
- Services fica disponível só em macOS.
- Hide [App] / Hide Others / Show All ficam disponíveis só em macOS, usando o mesmo nome curto do About.
- Quit [App]: pressionar Option muda o item para "Quit and Keep Windows".
- Menu File: New [Item] usa o termo que nomeia o tipo de item criado (ex. "Event" e "Calendar" no Calendar).
- Open usa reticências se abrir uma interface de seleção.
- Open Recent é um submenu listando documentos/arquivos recentes por nome, nunca por caminho de arquivo.
- Open Recent lista do mais recente ao mais antigo, incluindo item "Clear Menu".
- Close: pressionar Option muda para "Close All".
- Numa janela com abas, "Close Tab" substitui "Close"; considerar adicionar "Close Window" para fechar a janela inteira.
- Close Tab: pressionar Option muda para "Close Other Tabs".
- Close File fecha o arquivo atual e todas as janelas associadas a ele.
- Save deve salvar automaticamente em intervalos regulares, reduzindo a necessidade do comando manual.
- Save pede nome e local só para documento novo.
- Se precisar salvar em múltiplos formatos, preferir pop-up menu de formato dentro do Save sheet.
- Save All salva todos os documentos abertos.
- Duplicate: pressionar Option muda para "Save As".
- Preferir Duplicate a itens como "Save As", "Export" ou "Copy To" — esses não deixam clara a relação entre o arquivo original e a cópia.
- Rename… permite mudar o nome do documento atual.
- Move To… solicita novo local para o documento.
- Export As… reserva-se para quando for preciso exportar em formato que o app não usa normalmente.
- Ao usar Export As…, o documento atual continua aberto e o arquivo exportado não abre.
- Revert To é um submenu com versões recentes do documento, disponível quando autosave está ativado.
- Page Setup… deve ser incluído só se o app precisa de parâmetros de impressão salvos por documento.
- Parâmetros de impressão globais (ex. nome da impressora) ficam no painel de impressão, não em Page Setup.
- Print… abre o Print panel padrão, que permite imprimir, enviar fax ou salvar como PDF.
- Menu Edit: Undo/Redo devem esclarecer o alvo no label (ex. "Undo Paste and Match Style", "Undo Typing").
- Ordem típica de Edit: Cut/Copy/Paste/Paste and Match Style, depois Delete.
- Usar "Delete", nunca "Erase" ou "Clear" — precisa ser consistente com o comportamento da tecla Delete.
- Select All vem depois de Delete na ordem típica do menu Edit.
- Find é um submenu com Find, Find and Replace, Find Next, Find Previous, Use Selection for Find, Jump to Selection.
- Spelling and Grammar é um submenu com Show Spelling and Grammar, Check Document Now, Check Spelling While Typing, Check Grammar With Spelling, Correct Spelling Automatically.
- Substitutions é um submenu com Show Substitutions, Smart Copy/Paste, Smart Quotes, Smart Dashes, Smart Links, Data Detectors, Text Replacement.
- Transformations é um submenu com Make Uppercase, Make Lowercase, Capitalize.
- Speech é um submenu com Start Speaking e Stop Speaking.
- Start Dictation é adicionado automaticamente pelo sistema no fim do menu Edit.
- Emoji & Symbols também é adicionado automaticamente no fim do menu Edit.
- Menu Format (só se o app suporta texto formatado): Font é um submenu com Show Fonts, Bold, Italic, Underline, Bigger, Smaller, Show Colors, Copy Style, Paste Style.
- Text é um submenu com Align Left, Align Center, Justify, Align Right, Writing Direction, Show Ruler, Copy Ruler, Paste Ruler.
- Menu View não inclui itens de navegação entre janelas específicas nem de gerenciamento de janela.
- Isso é papel do menu Window, não do View.
- Fornecer o menu View mesmo que o app suporte só um subconjunto das funções padrão.
- Exemplo: incluir apenas Enter/Exit Full Screen se o app não tem toolbar, tab bar nem sidebar.
- Garantir que cada título de item show/hide reflita o estado atual (ex. "Show Toolbar" quando escondida, "Hide Toolbar" quando visível).
- Ordem típica de View: Show/Hide Tab Bar, Show All Tabs/Exit Tab Overview, Show/Hide Toolbar, Customize Toolbar, Show/Hide Sidebar, Enter/Exit Full Screen.
- Menus específicos do app aparecem na menu bar entre View e Window (ex. Safari tem History e Bookmarks).
- Fornecer menus específicos para comandos customizados, mesmo que já estejam disponíveis em outro lugar do app.
- A menu bar é onde as pessoas procuram comandos, especialmente na primeira vez que usam o app.
- Listar na menu bar também permite atribuir atalhos de teclado e acessibilidade via Full Keyboard Access.
- Refletir a hierarquia do app na ordem dos menus específicos (ex. Mail lista Mailbox, Message, Format nessa ordem).
- Listar os menus específicos do mais geral/comum ao menos geral/usado.
- Menu Window não serve para customizar a aparência de janelas (isso é o menu View).
- Menu Window não serve para fechar janelas (isso é File > Close).
- Fornecer o menu Window mesmo que o app tenha só uma janela.
- Incluir os itens Minimize e Zoom no Window para dar suporte a Full Keyboard Access.
- Considerar incluir itens para mostrar/esconder painéis no menu Window.
- Não é necessário incluir acesso ao font panel ou color panel no Window — já ficam no menu Format.
- Ordem típica de Window: Minimize (Option → "Minimize All"), Zoom (Option → "Zoom All").
- Nunca usar Zoom para entrar/sair de modo full screen — isso é papel do View.
- Ordem típica de Window continua: Show Previous Tab, Show Next Tab, Move Tab to New Window, Merge All Windows.
- Enter/Exit Full Screen só aparece no Window se o app não tiver menu View, mantendo Minimize e Zoom separados.
- Bring All to Front: Option muda para "Arrange in Front", que organiza as janelas lado a lado.
- Ao final do Window, listar as janelas abertas específicas do app, em ordem alfabética.
- Não listar painéis ou outras views modais na lista de janelas do menu Window.
- Menu Help fica na borda final da menu bar.
- Ao usar o formato Help Book, o macOS adiciona automaticamente um campo de busca no topo do Help.
- Ordem típica de Help: Send [App] Feedback to Apple, depois [App] Help.
- [App] Help abre o conteúdo no Help Viewer embutido, quando usa formato Help Book.
- Usar separador antes de itens adicionais no Help.
- Manter o total de itens do Help pequeno, para não sobrecarregar quem busca ajuda.
- Considerar linkar itens adicionais de dentro da própria documentação de ajuda, em vez de listá-los no menu Help.
- Itens dinâmicos mudam de comportamento ao segurar tecla modificadora (Control, Option, Shift ou Command).
- Nunca tornar um item dinâmico a única forma de realizar a tarefa, já que fica escondido por padrão.
- Exemplo: quem não descobriu "Minimize All" ainda pode minimizar cada janela individualmente.
- Usar itens dinâmicos principalmente em menus da menu bar.
- Evitar itens dinâmicos em context menus ou Dock menus — ficam ainda mais difíceis de descobrir ali.
- Exigir só uma tecla modificadora para revelar o item dinâmico.
- Mais de uma tecla modificadora é fisicamente incômodo e reduz a descobribilidade.
- iPadOS: a menu bar fica escondida até ser revelada (mover o ponteiro até a borda superior, ou swipe a partir dela).
- No iPadOS, a menu bar fica alinhada ao centro (diferente do Mac, alinhada à borda inicial).
- Não há menu Apple no iPadOS.
- Não há menu bar extras no iPadOS.
- O menu do app no iPadOS não inclui os itens de visibilidade específicos do macOS (About, Services, Hide).
- Esses itens de visibilidade ficam "always available" só no Mac.
- Como a menu bar costuma ficar escondida no modo full screen, garantir que toda função do app esteja acessível também pela interface visível.
- Itens dinâmicos só ficam disponíveis com teclado físico conectado no iPadOS.
- Evitar usar a menu bar como repositório único de funcionalidade que não coube em outro lugar.
- Reservar [App] > Settings para abrir a página do app nas Settings do iPadOS.
- Se o app tem área de preferências interna própria, linkar para ela com item separado logo abaixo de Settings, no mesmo grupo.
- Para apps com navegação em estilo de abas, considerar adicionar cada aba como item do menu View.
- Atribuir atalho de teclado próprio a cada aba no menu View facilita a navegação.
- Considerar agrupar itens em submenus com mais frequência do que se faria no Mac.
- Linhas de item de menu ocupam mais espaço no iPad, e telas de iPad podem ser menores.
- macOS: o menu Apple é sempre o primeiro item na borda inicial, com itens de sistema sempre disponíveis.
- O menu Apple não pode ser modificado nem removido.
- Quando o espaço da menu bar é restrito, o sistema prioriza a exibição dos menus e dos menu bar extras essenciais.
- O sistema pode reduzir o espaçamento entre títulos e truncá-los se necessário.
- Ao entrar em modo full screen, a menu bar tipicamente se esconde até ser revelada.
- Menu bar extras expõem funcionalidade específica do app via ícone, mesmo quando o app não está em primeiro plano.
- Menu bar extras ficam do lado oposto da menu bar em relação aos menus do app.
- O sistema esconde extras quando necessário para dar espaço aos menus do app.
- O sistema pode esconder alguns extras se houver demais, para não sobrecarregar os menus do app.
- A altura da menu bar é 24 pt.
- Considerar usar um símbolo para representar o menu bar extra.
- Símbolos e interface icons usam preto e transparente para definir a forma.
- O sistema aplica outras cores ao ícone para funcionar bem em menu bar clara e escura, e quando selecionado.
- Exibir um menu (não um popover) ao clicar no extra, a menos que a funcionalidade seja complexa demais para um menu.
- Deixar a pessoa (não o app) decidir se quer o menu bar extra ativo, tipicamente via configuração no app.
- Considerar oferecer a opção de ativar o extra durante o setup, para garantir descobribilidade.
- Evitar depender da presença do menu bar extra — o sistema esconde e mostra extras regularmente.
- Não há como prever a localização exata nem quais outros extras estão visíveis.
- Considerar expor a mesma funcionalidade específica de outras formas também, como um Dock menu.
- Dock menu fica sempre disponível enquanto o app está rodando, diferente do menu bar extra.
- Não suportado em iOS, tvOS, visionOS ou watchOS.

Equivalente web:
- Sem equivalente 1:1 no navegador — apps web não têm "menu bar" do SO.
- O mais próximo é uma barra de menu customizada tipo desktop-app, usando `role="menubar"`/`role="menuitem"`.
- Submenus replicam-se com `role="menu"` aninhado e navegação por seta.
- Só vale a pena replicar em apps que emulam de fato um desktop app completo.
- Se replicar, manter a mesma ordem/agrupamento lógico (Arquivo/Editar/Ver/Ajuda).
- Manter a regra de "sempre mostrar todos os itens, desabilitar em vez de esconder".
- Atalhos de teclado (Ctrl/Cmd+C, Cmd+Z etc.) via listener global de `keydown`.
- Nunca sobrescrever atalhos nativos do navegador (Ctrl+T, Ctrl+W, Cmd+Q) para não quebrar a expectativa de quem usa.

### Toolbars

O que é / quando usar: dá acesso conveniente a comandos, controles, navegação e busca usados com frequência; fica na borda superior ou inferior da view, com controles agrupados em seções lógicas (título da view atual, controles de navegação, ações/bar items).

Regras:
- Escolher itens deliberadamente para não superlotar a toolbar.
- A pessoa precisa conseguir distinguir e ativar cada item da toolbar.
- Definir quais itens migram para o menu de overflow conforme a toolbar fica mais estreita.
- O sistema adiciona automaticamente um menu de overflow em macOS ou iPadOS quando os itens não cabem mais.
- Não criar overflow manual — deixar o sistema gerenciar isso.
- Evitar layouts que já nascem estourando o espaço disponível por padrão.
- Adicionar um menu "More" para ações adicionais menos importantes.
- Priorizar ações menos importantes para o menu "More".
- Tentar caber tudo na toolbar primeiro, e só adicionar o "More" se realmente necessário.
- iPadOS, macOS: considerar permitir que a pessoa customize a toolbar com seus itens mais comuns.
- Customização é especialmente útil em apps com muitos itens ou funcionalidade avançada nem sempre necessária.
- Customização também ajuda em apps que as pessoas tendem a usar por longos períodos.
- Reduzir o uso de fundos customizados e controles tintados na toolbar.
- Fundos e tintas customizados podem sobrepor ou interferir nos efeitos de fundo do sistema.
- Preferir usar a camada de conteúdo para informar cor/aparência da toolbar.
- Usar um ScrollEdgeEffectStyle quando for necessário distinguir visualmente a área da toolbar da área de conteúdo.
- Evitar cor de label de item de toolbar parecida com o fundo da camada de conteúdo (contexto Liquid Glass).
- Se o app já tem conteúdo colorido e chamativo, preferir a aparência monocromática padrão da toolbar.
- Preferir componentes padrão na toolbar.
- Por padrão, botões, campos de texto, headers e footers têm raio de canto concêntrico com os cantos da barra.
- Se criar componente customizado, replicar esse mesmo raio de canto.
- Considerar esconder temporariamente a toolbar para uma experiência sem distrações.
- Sempre oferecer forma confiável de restaurar os elementos escondidos.
- Fornecer um título útil por janela.
- Título útil ajuda a confirmar a localização atual e diferenciar múltiplas janelas abertas.
- Deixar a área de título vazia se um título parecer redundante.
- Exemplo: Notes não titula a nota atual quando há só uma janela aberta, porque a primeira linha já dá contexto.
- Notes titula as janelas com a primeira linha de conteúdo quando há várias abertas, para diferenciá-las.
- Nunca usar o nome do app como título de janela — não dá informação útil sobre o conteúdo.
- Escrever título conciso: uma palavra ou frase curta que destile o propósito da janela/view.
- Manter o título abaixo de 15 caracteres, para sobrar espaço a outros controles.
- Navegação: usar sempre os botões padrão de Back e Close.
- A pessoa já sabe que Back retrocede na hierarquia e Close fecha uma view modal.
- Preferir os símbolos padrão para Back e Close, e não usar label de texto dizendo "Back" ou "Close".
- Se criar versão customizada de Back/Close, garantir a mesma aparência e o mesmo comportamento esperado.
- Garantir consistência da versão customizada em todo o app.
- Ações: priorizar comandos que suportam as tarefas principais realizadas na view.
- Priorizar comandos mais frequentemente usados, ou os que mapeiam para os objetos mais importantes do app.
- Deixar claro o significado de cada controle — nunca fazer a pessoa adivinhar o que um item faz.
- Preferir símbolos simples e reconhecíveis em vez de texto.
- Exceção: ações mal representadas por símbolo (ex. "Edit") podem usar texto.
- Preferir símbolos fornecidos pelo sistema sem borda.
- Bordas (ex. círculo contornado) são desnecessárias porque a seção já fornece um container visível.
- O sistema já define hover/seleção automaticamente para símbolos sem borda.
- Usar o estilo ".prominent" para ações-chave como Done ou Submit.
- Estilo prominent separa e tinge a ação, criando um ponto focal claro.
- Especificar só uma ação primária por toolbar.
- Colocar a ação primária sempre na borda final (trailing) da toolbar.
- Agrupamento: borda inicial (leading) recebe elementos para voltar e mostrar/esconder sidebar.
- O título da view vem depois desses elementos na borda inicial.
- Ao lado do título pode haver um menu de documento (Duplicate, Rename, Move, Export).
- Itens da borda inicial não são customizáveis, para garantir que estejam sempre disponíveis.
- Área central recebe controles comuns e úteis.
- O título da view pode aparecer na área central se não estiver na borda inicial.
- Em macOS e iPadOS, a pessoa pode adicionar, remover e reorganizar itens da área central, se customização for permitida.
- Itens da área central colapsam automaticamente no menu de overflow gerenciado pelo sistema quando a janela encolhe.
- Borda final (trailing) contém itens importantes que precisam continuar disponíveis.
- Borda final também contém botões que abrem inspectors próximos, campo de busca opcional, e o menu "More".
- O menu "More" na borda final também suporta customização da toolbar.
- A ação primária (ex. Done) fica na borda final quando existir.
- Itens da borda final permanecem visíveis em qualquer tamanho de janela.
- Posicionar itens fixando-os à borda inicial, central ou final.
- Inserir espaço entre botões/itens onde for apropriado para criar os agrupamentos desejados.
- Agrupar itens de toolbar logicamente por função e frequência de uso.
- Exemplo: Keynote separa seções para comandos de apresentação, comandos de reprodução, e comandos de inserção de objeto.
- Agrupar controles de navegação e ações críticas (Done, Close, Save) em seções dedicadas, familiares e visualmente distintas.
- Esse agrupamento reflete a importância desses comandos e ajuda a descobri-los.
- Manter agrupamentos e posicionamento consistentes entre plataformas de um mesmo app.
- Consistência entre plataformas gera familiaridade e confiança em qualquer contexto de uso.
- Minimizar o número de grupos na toolbar.
- Muitos grupos de controles deixam a toolbar confusa e "carregada", mesmo com espaço extra em iPad e Mac.
- Mirar um máximo de 3 grupos na toolbar.
- Manter ações com labels de texto separadas entre si.
- Uma ação de texto ao lado de uma ação de símbolo pode criar a ilusão de uma única ação combinada.
- Se a toolbar tem múltiplos botões com label de texto, o texto pode parecer "correr junto".
- Adicionar espaço fixo entre botões com texto para separá-los visualmente.
- iOS: priorizar só os itens mais importantes na área principal da toolbar, já que o espaço é muito limitado.
- Criar um menu "More" para o restante dos itens em iOS.
- Usar título grande (large title) para ajudar a manter orientação ao navegar e rolar.
- Por padrão, o título grande transita para um título padrão quando a pessoa começa a rolar o conteúdo.
- O título volta ao tamanho grande quando a pessoa rola de volta ao topo, reforçando a localização atual.
- iPadOS: considerar combinar uma toolbar com uma tab bar no mesmo espaço horizontal no topo da view.
- Combinar toolbar e tab bar é útil em layouts que navegam entre poucas áreas principais mantendo a largura toda para o conteúdo.
- macOS: a toolbar fica no frame do topo da janela, abaixo ou integrada com a title bar.
- Títulos de janela podem aparecer inline com os controles em macOS.
- Itens de toolbar não têm bezel em macOS.
- Disponibilizar todo item de toolbar também como comando na menu bar.
- Como a pessoa pode customizar ou esconder a toolbar, ela não pode ser o único lugar que apresenta um comando.
- Não faz sentido criar um item de toolbar para todo item de menu — nem todo comando é usado o suficiente para merecer espaço na toolbar.
- visionOS: o sistema apresenta a toolbar padrão ao longo da borda inferior da janela, acima dos controles de gerenciamento de janela.
- A toolbar em visionOS fica num plano ligeiramente à frente da janela no eixo z.
- visionOS usa um blur variável no fundo da barra para manter a legibilidade dos itens enquanto conteúdo rola por trás.
- O blur variável ancora a barra acima do conteúdo rolável sem dividir o material de vidro uniforme da view.
- É possível fornecer símbolo, texto, ou ambos para cada item de toolbar em visionOS.
- Ao olhar para um item que só tem símbolo, o visionOS revela o label de texto como informação adicional.
- Preferir a toolbar padrão do sistema, otimizada para input por olhar e mão.
- A toolbar padrão é posicionada automaticamente em relação à janela.
- Evitar criar uma toolbar vertical em visionOS — tab bars é que são verticais nessa plataforma.
- Uma toolbar vertical poderia confundir, por parecer uma tab bar.
- Tentar impedir que a janela redimensione abaixo da largura da toolbar.
- visionOS não tem uma menu bar de apoio listando todas as ações do app, tornando a toolbar a via confiável de acesso.
- Se o app entra em estado modal, considerar oferecer controles de toolbar contextuais relevantes a essa tarefa.
- Reinstaurar os controles padrão da janela ao sair do estado modal.
- Evitar usar pull-down menu numa toolbar em visionOS.
- Pull-down menu pode ser difícil de descobrir e pode obscurecer os controles padrão de janela abaixo da borda inferior.
- watchOS: um botão de toolbar permite oferecer funcionalidade importante numa view cujo conteúdo principal é outra coisa.
- É possível colocar botões de toolbar nos cantos superiores ou ao longo da borda inferior.
- Se posicionados acima de conteúdo rolável, os botões permanecem sempre visíveis enquanto o conteúdo rola por baixo.
- Também é possível colocar um botão dentro da própria view rolável.
- Por padrão, um botão de toolbar "scrolling" fica escondido até a pessoa revelá-lo rolando para cima.
- Como as pessoas rolam para o topo com frequência, a descoberta do botão scrolling acaba sendo automática.
- Usar um botão de toolbar "scrolling" para uma ação importante que não é a função primária do app, mas está relacionada a ela.
- Exemplo: Mail oferece a ação "New Message" num botão de toolbar no topo da view de Inbox.
- Não há considerações adicionais específicas para tvOS.

Equivalente web:
- `<header>` ou barra fixa (`position: sticky`) com `role="toolbar"` no container.
- Usar elementos `<button>` reais para cada item da toolbar.
- Replicar o agrupamento leading/center/trailing com Flexbox (`justify-content: space-between` mais grupos internos).
- Overflow automático: `ResizeObserver` medindo a largura disponível e movendo itens excedentes para um menu "More" (`role="menu"`).
- Nunca deixar itens simplesmente cortarem ou quebrarem linha sem controle.
- Título de página curto (`<h1>`/`document.title`), nunca igual ao nome do produto.
- A regra dos "até 15 caracteres" pode virar um guia de wireframe, sem forçar corte agressivo em telas largas.
- Ação primária (`.btn-prominent`) sempre na extremidade final (direita em LTR) da toolbar.
- Manter no máximo uma ação primária por barra, replicando a regra de "uma única ação de destaque, sempre na borda final".
