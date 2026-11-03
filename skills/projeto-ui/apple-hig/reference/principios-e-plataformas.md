# Princípios de design e plataformas (HIG)

Fonte: Apple Human Interface Guidelines — Getting Started (Design principles + Designing for iOS/iPadOS/macOS/tvOS/visionOS/watchOS/games/iPhone Duo).

## Design principles

Sete princípios fundamentais. Não há ordem certa de aplicação — são ferramentas para pesar prioridades concorrentes, não uma checklist sequencial.

### Purpose

Definição: crie algo que tenha significado — identifique o que mais importa para quem você projeta e foque nisso.

- Priorize as funcionalidades mais importantes do app alinhadas a como as pessoas querem usá-lo; não tente fazer tudo bem ao mesmo tempo.

- Investigue soluções existentes antes de recriá-las; defina o que diferencia seu produto e deixe isso guiar decisões de design.

- A cada estágio de desenvolvimento, pergunte para que o produto serve e se o design atual realmente serve a esse propósito.

### Agency

Definição: deixe as pessoas fazerem as coisas do jeito delas — dê liberdade de ação, mantenha-as informadas, facilite a recuperação de erros.

- Fique fora do caminho: leve a pessoa direto à tarefa/conteúdo em vez de forçar fluxos rígidos; os melhores designs são discretos e aparecem só quando necessários.

- Dê liberdade para explorar a interface e acessar funcionalidades sem prender a pessoa a um fluxo específico; quando um fluxo guiado for necessário, torne-o fácil de pular ou escapar.

- Construa "perdão" no design: quando a pessoa sabe que pode reverter uma ação ou voltar a um estado anterior, ela se sente livre para explorar — recuperar de um erro não pode custar tempo nem trabalho perdido.

### Responsibility

Definição: aja no melhor interesse das pessoas — priorize segurança/privacidade e seja transparente sobre o que o produto faz e por quê.

- Seja totalmente transparente sobre as intenções do app desde a primeira interação; dê uma razão clara ao pedir permissão, e ao coletar dado, explique o que coleta e como usa.

- Mantenha a informação da pessoa segura: colete só o que o produto precisa para funcionar, trate o dado com cuidado, antecipe formas de uso indevido e proteja contra elas.

### Familiarity

Definição: construa sobre o que as pessoas já sabem — use conceitos do mundo real e de outros softwares.

- Use conceitos que as pessoas já conhecem do mundo real e de outros apps para tornar a interface intuitiva desde o primeiro contato.

- Mantenha visuais e interações consistentes: uma vez definido um comportamento/aparência para um elemento, aplique-o em todo o design — isso acelera o aprendizado e gera confiança de que novas interações vão funcionar como esperado.

- Dê feedback claro sempre: mostre quando controles estão disponíveis, indique quando conteúdo muda, use padrões de sistema para alertas e escolhas — feedback consistente mantém a pessoa informada e no controle.

### Flexibility

Definição: adapte-se a contextos e necessidades diversas — pense em pessoas, dispositivos e modos de entrada diferentes.

- Projete para todo mundo: trate acessibilidade como prioridade desde o início, considerando a diversidade de perspectivas e necessidades de quem pode encontrar seu design.

- Preserve o contexto da pessoa ao adaptar entre plataformas/configurações — mantenha conteúdo e controles em posições consistentes e previsíveis, e use animações naturais para suavizar transições.

- Considere uma variedade de métodos de entrada (voz, toque, teclado e outros) — quanto mais métodos suportados, mais gente consegue usar o produto do jeito que funciona melhor para ela.

- Aborde cada plataforma com intenção: dê a mesma dedicação a cada plataforma suportada, em vez de portar a experiência de uma para outra sem ajuste.

### Simplicity

Definição: seja claro e direto — remova o desnecessário, cada elemento precisa justificar sua presença.

- Inclua só o necessário: simplicidade não é minimalismo — o objetivo é uma experiência focada e útil que mantém o essencial por perto e deixa o resto cair fora.

- Seja conciso: a forma mais simples de dizer algo é geralmente a mais universal e a mais útil — escolha exatamente as palavras necessárias para transmitir um conceito ou rotular um controle.

- Estabeleça hierarquia: quando forma e função são evidentes, a pessoa sabe como chegar ao resultado desejado — priorize controles reconhecíveis e uma estrutura consistente que ajude a entender onde está e o que vem a seguir.

### Craft

Definição: cuide de cada detalhe — a qualidade do design reflete o quanto você se importa.

- A qualidade define o tom: seja deliberado em cada decisão e busque visuais impressionantes, animações fluidas, texto preciso e áudio cuidado.

- Experimente e itere: prototipe cedo, tente abordagens novas, descarte o que não funciona; eleve a régua a cada funcionalidade, refine e tente de novo — teste em cenários reais para garantir durabilidade e confiabilidade.

- Mantenha o craft: lançar não é a linha de chegada — mantenha a interface atualizada com as capacidades e padrões mais recentes da plataforma, com a régua de qualidade sempre alta.

### Delight

Definição: torne a experiência humana — as pessoas lembram de como um produto as fez sentir.

- Identifique a emoção que você quer inspirar: nem todo software deve parecer igual — um app de fitness pode energizar, um app de meditação pode acalmar; saiba o sentimento que quer evocar e deixe-o moldar o design.

- Crie momentos definidores: toda interação — de um simples toque em um botão a uma mensagem de erro — é uma chance de mostrar do que seu software é feito.

- Não confunda delight com decoração: as pessoas estão tentando realizar uma tarefa, então não deixe a busca por delight atrapalhar o propósito central do produto — alguns designs pedem um toque prático cuidadoso, outros pedem um pouco de leveza; experimente para achar o equilíbrio certo.

---

## Referência numérica rápida — tamanhos mínimos por plataforma

Consolidado a partir de Designing for games (única página getting-started com tabela numérica cross-plataforma). Use como piso absoluto de legibilidade/toque ao adaptar UI entre plataformas.

**Tamanho de texto (default / mínimo):**

- iOS, iPadOS: 17 pt / 11 pt.

- macOS: 13 pt / 10 pt.

- tvOS: 29 pt / 23 pt (bem maior — distância de visualização de 8+ pés).

- visionOS: 17 pt / 12 pt.

- watchOS: 16 pt / 12 pt.

**Tamanho de botão (default / mínimo):**

- iOS, iPadOS: 44×44 pt / 28×28 pt (o "toque de 44 pt" é o default, não o piso absoluto).

- macOS: 28×28 pt / 20×20 pt.

- tvOS: 66×66 pt / 56×56 pt.

- visionOS: 60×60 pt / 28×28 pt.

- watchOS: 44×44 pt / 28×28 pt.

**Método de interação default / adicional por plataforma:**

- iOS: touch (default) → game controller (adicional).

- iPadOS: touch (default) → game controller, teclado, mouse, trackpad, Apple Pencil (adicionais).

- macOS: teclado, mouse, trackpad (default) → game controller (adicional).

- tvOS: remote (default) → game controller, teclado, mouse, trackpad (adicionais).

- visionOS: touch (default) → game controller, teclado, mouse, trackpad, spatial game controller (adicionais).

- watchOS: touch (default) → nenhum adicional.

---

## macOS

Alvo do time — atenção especial a janelas, menu bar, ponteiro, teclado e densidade de informação.

**Contexto de uso**

- Display grande e de alta resolução; workspace pode se estender conectando monitores adicionais, incluindo o iPad como display extra.

- Pessoa geralmente estacionária (mesa/escrivaninha), com distância de visualização de **1 a 3 pés**.

- Sessões variam de minutos (tarefas rápidas) a horas de concentração profunda; múltiplos apps abertos ao mesmo tempo, com expectativa de transições suaves entre estados ativo/inativo.

- Input combinado esperado: teclado físico, ponteiro (mouse/trackpad), game controllers e Siri.

**Janelas e navegação**

- Deixe a pessoa redimensionar, esconder, mostrar e mover janelas livremente conforme o estilo de trabalho e a configuração de device.

- Suporte modo tela cheia como contexto opcional sem distração — não é o modo default de uso no Mac.

- Aproveite o display grande para apresentar mais conteúdo com menos níveis aninhados e menos modalidade (menos sheets/dialogs empilhados), mantendo densidade de informação confortável sem forçar a vista.

**Menu bar**

- A menu bar é o catálogo completo de comandos do app — todo comando relevante precisa estar acessível por ela, não só espalhado pela UI principal.

- Trate a menu bar como caminho alternativo formal, não decorativo: pessoas que preferem teclado/menu esperam encontrar ali literalmente tudo que a UI oferece.

**Ponteiro e precisão**

- Ajude a pessoa a tirar proveito de modos de input de alta precisão para seleções e edições pixel-perfect — é uma vantagem estrutural do Mac sobre touch.

- Botão mínimo de interação: **28×28 pt default / 20×20 pt mínimo absoluto** — bem menor que o alvo de toque do iOS porque o ponteiro é muito mais preciso que o dedo.

**Teclado**

- Trate atalhos de teclado como aceleradores de primeira classe, não recurso secundário — apoie estilos de trabalho 100% por teclado.

- Handle keyboard shortcuts para ajudar a acelerar ações; a régua de qualidade do Mac espera atalho para toda ação frequente.

**Personalização e densidade**

- Suporte personalização: toolbars customizáveis, janelas configuráveis para mostrar as views mais usadas, escolha de cores e fontes na interface.

- Densidade de informação maior que em iOS/iPadOS é aceitável e esperada — a régua aqui é "confortável", não "minimalista".

**Recursos de sistema a integrar:** menu bar, file management, going full screen, Dock menus.

---

## iOS / iPadOS

Alvo do time — atenção a toque de 44 pt, adaptação de aparência e gestos.

### iOS (iPhone)

**Contexto de uso**

- Display médio, alta resolução; segurada com uma ou ambas as mãos, alternando entre portrait e landscape.

- Distância de visualização tipicamente de **1 a 2 pés** enquanto a pessoa interage.

- App interactions variam de checagens rápidas (um ou dois minutos vendo eventos, redes sociais, dados) a sessões longas (mais de uma hora navegando, jogando, consumindo mídia); troca frequente entre múltiplos apps abertos.

**Input**

- Toque é o input primário: gestos Multi-Touch, teclado virtual e controle de voz permitem realizar tarefas relevantes em movimento.

- Pessoas também esperam que apps usem dado pessoal do device e input de giroscópio/acelerômetro, e podem querer participar de interações espaciais.

- **Botão default e mínimo: 44×44 pt** — esse é o piso de toque confortável em toda a plataforma.

**Padrões de layout**

- Limite o número de controles na tela para ajudar a pessoa a focar na tarefa/conteúdo primário; torne detalhes e ações secundárias descobríveis com interação mínima (não escondidas demais, não despejadas todas de uma vez).

- Adapte-se sem atrito a mudanças de aparência: orientação do device, Dark Mode, Dynamic Type — a pessoa escolhe a configuração que funciona melhor para ela.

- Suporte interações que respeitam como a pessoa segura o device: controles no meio ou na parte inferior da tela são mais fáceis de alcançar; por isso, permita swipe para voltar ou iniciar ações numa linha de lista em vez de exigir alcançar um botão no topo.

- Integre, com permissão da pessoa, informação disponível via capacidades da plataforma de forma que melhore a experiência sem pedir digitação manual — ex.: aceitar pagamento, autenticação biométrica, recursos baseados em localização.

**Recursos de sistema:** Widgets, Home Screen quick actions, Spotlight, Shortcuts, Activity views.

### iPadOS

**Contexto de uso**

- Display grande, alta resolução; pode ser segurado, apoiado numa superfície ou num stand — a pose muda a distância de visualização, mas tipicamente fica dentro de **3 pés**.

- App interactions vão de ações rápidas a horas imersas em jogos, mídia, criação de conteúdo ou produtividade; múltiplos apps abertos ao mesmo tempo é comum, com expectativa de ver mais de um app na tela e usar drag and drop entre eles.

**Input combinável**

- Multi-Touch e teclado virtual, teclado físico anexado ou dispositivo apontador, Apple Pencil, ou voz — e frequentemente combinações desses modos ao mesmo tempo.

**Padrões de layout**

- Aproveite o display grande para elevar o conteúdo que importa, minimizando interfaces modais e transições em tela cheia; posicione controles onde sejam fáceis de alcançar mas não atrapalhem.

- Use distância de visualização e modo de input ativo para determinar tamanho e densidade do conteúdo exibido.

- Adapte-se sem atrito a mudanças de orientação, modos de multitasking, Dark Mode e Dynamic Type, e faça transição suave para rodar em macOS (Mac Catalyst) — deixe a pessoa escolher a configuração que funciona melhor.

**Teclado e foco**

- Full Keyboard Access (iPadOS 15+) cobre navegação por teclado em campos de texto, text views e sidebars, além de collection views e outras views customizadas via API.

- **Evite** suportar navegação por teclado diretamente em controles (botões, segmented controls, switches) — deixe essa responsabilidade para o Full Keyboard Access do próprio sistema, que já cobre ativação de controle e gestos como drag and drop.

- Focus groups (áreas como sidebar, grid, lista) permitem duas interações de teclado distintas: Tab move entre focus groups; teclas de seta navegam dentro do mesmo focus group (comportamento direcional, similar ao tvOS mas escopado a um grupo).

**Ponteiro (iPadOS 15+)**

- O shape do ponteiro adapta ao contexto automaticamente — ex.: I-beam sobre área de texto — e três content effects trazem foco a elementos diferentes: **highlight** (retângulo translúcido com parallax sutil, para bar buttons/tab bars/segmented controls/edit menus), **lift** (elevação com sombra e brilho, para ícones de app e botões do Control Center), **hover** (scale/tint/shadow customizáveis sem mudar o shape do ponteiro, para elementos grandes).

- Magnetismo do ponteiro "atrai" o cursor em direção a elementos com highlight/lift, tanto ao aproximar quanto ao mirar com um flick — não se aplica a elementos hover.

- Multiple selection: em iPadOS 15+, clicar e arrastar o ponteiro sobre múltiplos itens os seleciona (suportado nativamente em collection views não-lista; views customizadas precisam implementar via `UIBandSelectionInteraction`).

**Recursos de sistema:** Multitasking, Widgets, Drag and drop.

---

## tvOS

- **Contexto de uso:** display muito grande; pessoa fica tipicamente a **8 pés ou mais** de distância, às vezes continuando a interagir enquanto se move pelo cômodo.

- **Input primário:** Siri Remote (clickpad + touch surface — swipe para navegar/mudar foco, press para ativar); também suporta game controller, voz e apps rodando em outros devices da pessoa.

- **Sistema de foco é central:** o app precisa "abraçar" o focus system do tvOS, deixando-o destacar e expandir suavemente os itens onscreen conforme a pessoa navega entre eles — isso comunica onde ela está e o que pode fazer a qualquer momento.

- **Imersão cinematográfica:** entregue artwork edge-to-edge, animações sutis e fluidas, e áudio envolvente — a experiência precisa ser clara, legível e cativante mesmo vista do outro lado do cômodo.

- **Multiuser:** torne o sign-in fácil e infrequente, trate sign-in compartilhado, e troque automaticamente de perfil quando a pessoa que está assistindo muda.

- **App interactions:** pessoas podem ficar profundamente imersas numa única experiência por horas, mas também apreciam picture-in-picture para acompanhar um app ou vídeo alternativo simultaneamente.

- Tamanhos-piso: texto 23 pt mínimo (29 pt default); botão 56×56 pt mínimo (66×66 pt default) — bem maiores que outras plataformas por causa da distância de visualização.

- **Recursos de sistema:** integração com o app TV, SharePlay, Top Shelf, contas de provedor de TV.

---

## visionOS

- **Espaço e imersão:** Apple Vision Pro oferece um canvas ilimitado onde janelas, volumes e objetos 3D coexistem; por default um app abre na Shared Space (múltiplos apps lado a lado, com liberdade de abrir/fechar/reposicionar janelas), mas pode transicionar fluidamente para uma Full Space, onde é o único app rodando e pode misturar conteúdo 3D com o ambiente, abrir um portal para outro lugar, ou levar a pessoa a um mundo diferente.

- **Passthrough:** vídeo ao vivo das câmeras externas do device, permitindo interagir com conteúdo virtual enquanto ainda se vê o ambiente real; a pessoa controla a quantidade de passthrough usando o Digital Crown.

- **Spatial Audio:** o device modela as características sônicas do ambiente da pessoa para tornar o áudio natural nesse espaço; com permissão, o app pode ajustar fino o Spatial Audio para experiências customizadas.

- **Input primário:** olhos para focar (olhar identifica o alvo) + gesto indireto (ex.: tap) para ativar; também suporta gesto direto (tocar o objeto virtual diretamente com o dedo).

- **Ergonomia e conforto:** como a pessoa depende inteiramente das câmeras do device para tudo que vê (real e virtual), conforto visual é primordial; o sistema posiciona conteúdo relativo à cabeça de quem usa, independente de altura ou de estar sentado/em pé/deitado — o conteúdo vem até a pessoa, ela não precisa se mover até ele.

- **Acessibilidade:** suporta VoiceOver, Switch Control, Dwell Control, Guided Access, Head Pointer e mais — como em toda plataforma Apple, componentes de UI do sistema já vêm com suporte de acessibilidade embutido.

- **Segurança (nota importante da Apple):** não deve ser usado ao dirigir veículo ou operar maquinário pesado; não é projetado para uso em movimento em ambientes inseguros (varandas, ruas, escadas); uso recomendado a partir de 13 anos.

- Tamanhos-piso: texto 12 pt mínimo (17 pt default); botão 28×28 pt mínimo (60×60 pt default).

- **Recursos de sistema:** SharePlay (com Personas espaciais), Digital Crown para volume/imersão/recentralização, saída para Home View.

---

## watchOS

- **Contexto de uso:** display pequeno no pulso, com experiência de alta resolução fácil de ler apesar do tamanho; a pessoa fica tipicamente a menos de **1 pé** de distância ao erguer o pulso, usando a mão oposta para interagir; o display Always On mostra informação mesmo com o pulso baixado.

- **Input primário:** Digital Crown, que desde watchOS 10 assumiu papel elevado como principal meio de navegação — rolar o Smart Stack no watch face, mover verticalmente pela coleção de apps na Home Screen, trocar entre tabs paginadas verticalmente e rolar list views e páginas de altura variável dentro dos apps.

- Apps **não** respondem a pressões no Digital Crown — essas interações são reservadas pelo sistema para funcionalidade própria (ex.: revelar a Home Screen); só a rotação gera dado que o app pode usar.

- Além da navegação, girar o Digital Crown pode ser usado para inspecionar dado (ex.: avançar a hora do dia no World Clock) ou operar controles customizados quando navegação não é a necessidade principal do contexto.

- **App interactions:** interações concisas e "glanceable" que costumam durar menos de um minuto cada, muitas vezes repetidas várias vezes ao dia; pessoas usam experiências relacionadas do app (complications, notificações, interações com Siri) com mais frequência do que o app propriamente dito.

- Minimize a profundidade de hierarquia de navegação; use o Digital Crown para navegação vertical (scroll ou troca de telas) como eixo central da experiência.

- Personalize proativamente antecipando necessidades da pessoa e usando dado on-device para conteúdo acionável relevante no momento ou logo a seguir.

- Tamanhos-piso: texto 12 pt mínimo (16 pt default); botão 28×28 pt mínimo (44×44 pt default).

- **Recursos de sistema:** Complications, Notifications, Always On, Watch faces.

---

## Games (todas as plataformas)

- **Baixe rápido, jogue rápido:** deixe a pessoa jogar assim que a instalação terminar — inclua o máximo de conteúdo jogável possível na instalação inicial mantendo o tempo de download em **30 minutos ou menos**; baixe conteúdo adicional em background.

- **Defaults inteligentes:** use informação do device da pessoa para escolher os melhores defaults automaticamente — resolução que valoriza os gráficos no device específico, reconhecimento automático de acessórios/game controllers pareados, e respeito às configurações de acessibilidade já definidas pela pessoa; garanta suporte aos métodos de interação mais comuns da plataforma.

- **Ensine jogando:** integre fluxos de configuração e onboarding num tutorial jogável que engaje rápido e gere sucesso imediato, em vez de telas de instrução separadas; se houver tutorial escrito, ofereça-o como referência opcional, não como pré-requisito.

- **Adie pedidos de permissão para o momento certo:** não bombardeie a pessoa com pedidos antes de ela começar a jogar; se o jogo usa sensores do device ou personaliza a jogabilidade acessando dado como hand-tracking, peça permissão integrada ao cenário que a exige (ex.: entre uma cutscene inicial e o primeiro uso real das mãos); espere a pessoa passar tempo de qualidade com o jogo antes de pedir avaliação/review.

- **Legibilidade garantida:** texto sempre confortavelmente legível — contraste adequado com o fundo e pelo menos o tamanho mínimo recomendado de cada plataforma (ver tabela de referência numérica acima).

- **Botões sempre utilizáveis:** cada plataforma define um tamanho mínimo de botão baseado no método de interação default dela (ver tabela acima) — botões pequenos demais ou próximos demais frustram e atrapalham a diversão.

- **Assets resolution-independent:** prefira texturas e gráficos independentes de resolução; se não for possível, combine a resolução do jogo à do device. Em visionOS, prefira arte vetorial que continue boa quando o sistema escala dinamicamente conforme a distância/ângulo de visualização.

- **Integração com recursos do device:** acomode cantos arredondados, câmera housing e outras características físicas durante o layout, confiando em safe areas fornecidas pela plataforma quando possível.

- **Menus adaptáveis a aspect ratio:** funcionem bem em proporções variadas (16:10, 19.5:9, 4:3) e, quando suportado, nas duas orientações em iPhone/iPad, sem obscurecer conteúdo; prefira layouts dinâmicos com constraints relativos a layouts fixos.

- **Tela cheia como contexto dedicado:** em macOS/iOS/iPadOS, tela cheia deixa esconder outros apps e parte da UI do sistema; em visionOS, um jogo rodando numa Full Space pode envolver completamente a pessoa, transportando-a para outro lugar.

- Suporte o método de interação default de cada plataforma mesmo quando também suportar game controller físico (ver tabela de métodos default/adicionais acima) — nem todo jogador tem acesso a um controller físico.

---

## iPhone Duo

Página nova (introduzida em 9 de setembro de 2026) — dois displays (externo e interno) unidos por uma dobradiça central, cada display com sua própria câmera frontal. Continua sendo "designing for iOS": os padrões de Designing for iOS se aplicam integralmente.

**Anatomia**

- **Outer display:** usado quando o device está fechado; o sistema posiciona toolbars e tab bars na lateral para maximizar espaço vertical de conteúdo. É mais largo que alto (compact width).

- **Inner display:** usado quando o device está aberto; regular width, com espaço suficiente para manter barras horizontais padrão quando em portrait.

- **Câmera externa:** sempre visível, no canto, alinhada verticalmente com os controles laterais; expande para a Dynamic Island durante Live Activities.

- **Câmera interna:** fica escondida até ser ativada; quando ativa, a UI se desloca para indicar sua presença.

- **Dobradiça central:** suporta várias formas de segurar/posicionar o device (parcialmente dobrado como livro, apoiado numa superfície, em pé sobre as bordas) e impacta o espaço disponível para conteúdo conforme o device dobra.

**Regra de ouro: size classes, não layouts fixos por pose**

- Não é preciso desenhar um layout customizado para cada pose — use size classes para que o app se adapte naturalmente conforme muda de tamanho: compact width para o outer display, regular width para o inner display cobrem os fundamentos de toda pose.

- Não reinvente o app ao redimensionar; deixe o layout existente expandir com base no espaço disponível.

- Construa layouts com layout margins e safe area insets, evitando larguras fixas ou qualquer dependência atrelada a um display específico.

**Regiões reservadas**

- Além das safe areas padrão, o espaço disponível é moldado por regiões reservadas que o conteúdo deve evitar cobrir ou que os componentes precisam acomodar: a câmera externa (sempre presente), a câmera interna (só quando ativa) e a região de dobra (presente quando o device está parcialmente aberto, dividindo o inner display em múltiplas regiões utilizáveis e excluindo o centro onde o display dobra).

- Muitos componentes do sistema (alertas, context menus, sheets, split views) já se adaptam automaticamente às regiões reservadas; para componentes customizados, use as APIs de região reservada para reposicionar conteúdo.

- Prefira um container de layout que se adapte automaticamente (como o split view do Notes, que ajusta a largura de cada painel conforme o device dobra); em layouts em grade, prefira número par de colunas para que o conteúdo se divida de forma limpa.

- Evite mudanças extremas de layout ao dobrar/desdobrar o device — mova só o necessário para manter elementos visíveis e fáceis de tocar; controles que somem ou mudam drasticamente ficam mais difíceis de encontrar e rastrear.

**Consistência entre displays**

- Mantenha funcionalidade e estado dos elementos iguais entre os dois displays, preservando a hierarquia de informação do app; mostre um nível adicional de hierarquia no display interno maior só se fizer sentido para o conteúdo (ex.: Mail mostra lista OU email quando fechado; lista E email lado a lado quando aberto).

- Garanta acesso aos mesmos controles e conteúdo não importa como a pessoa segura ou vê o device, mesmo que controles precisem fazer overflow ou o conteúdo mude de tamanho/posição.

**Controles verticais**

- Toolbars, tab bars e controles de navegação que normalmente ficam no topo/rodapé migram para a lateral, preservando espaço vertical para conteúdo e mantendo controles ao alcance — exceção: display interno em portrait, que tem espaço vertical suficiente para manter barras horizontais padrão.

- Controles na lateral incluem tanto elementos de sistema (Dynamic Island, status bar) quanto do app (toolbar com botões de navegação, tab bar); quando dois apps dividem o display interno via Split View, cada um posiciona seus controles na borda externa.

- Ordem padrão de colocação: reserve o topo do eixo vertical para controles de navegação primária (Back, Close), seguidos de ações proeminentes (Done); mantenha os demais itens de toolbar em seus agrupamentos originais.

- Priorize itens de toolbar usados com frequência para mantê-los facilmente disponíveis — por default, itens fazem overflow de baixo para cima; ajuste a prioridade de visibilidade de cada item (por grupo inteiro primeiro, depois item a item) se precisar de controle mais fino.

- Em geral, **não sobrescreva** o posicionamento default das barras — a posição vertical dos controles é um dos padrões centrais do iPhone Duo, e mantê-los em posições familiares ajuda a pessoa a aprender o app rapidamente.

- Considere usar a largura total do display para interfaces visuais/imersivas que não rolam (ex.: Calculator) — pode combinar com conteúdo inset ao mesmo tempo (cabeçalho full-width + conteúdo rolável inset).

- Agrupe itens de toolbar relacionados em vez de espaçá-los manualmente — grupos criados via API já fornecem espaçamento automático que se adapta ao espaço disponível.

- Posicione controles perto do conteúdo que afetam, mesmo que isso signifique não movê-los para a lateral — proximidade deixa clara a relação entre controle e conteúdo.

- Dê título **e** símbolo para cada item de toolbar que não seja só texto — o sistema escolhe a representação certa por contexto e usa o título em menus de overflow e formulários expandidos.

- Mantenha botões baseados em texto ao mínimo — rótulos com texto ficam presos a uma barra horizontal, então prefira símbolo sempre que possível.

- Quando o espaço é limitado, o comportamento default de compressão prioriza manter tab bar e destinos primários visíveis em experiências de navegação (toolbar vai para overflow); em experiências orientadas a tarefa, minimize a tab bar para preservar as ações da toolbar centrais à tarefa.

- Use o menu de overflow do sistema para as próprias ações extras do app em vez de criar um overflow customizado — reserve o símbolo de reticências (ellipsis) exclusivamente para overflow.

**Jogos no iPhone Duo**

- Pode travar em portrait ou landscape, mas precisa preencher a tela conforme a pose do device muda; mantenha tamanhos de texto e controle o mais consistentes possível ao redimensionar.

- Prefira mudar o aspect ratio a usar letterboxing/pillarboxing; se não puder evitar, adicione arte na área de padding para manter a sensação de tela cheia.
