# Foundations (HIG)

Fonte: https://developer.apple.com/design/human-interface-guidelines/

## Accessibility

**Essência.** Uma interface acessível é intuitiva, perceptível por mais de um sentido (visão, audição, fala, toque) e se adapta às preferências e ajustes de acessibilidade do sistema (Accessibility Inspector audita isso). Cobre visão, audição, mobilidade, fala e cognição — e ganhar acessibilidade significa alcançar um público maior, não um nicho.

**Regras**

Visão
- Suporte a tamanhos de texto maiores: idealmente permita aumento de até 200% (140% em watchOS), via Dynamic Type ou UI custom.
- Tamanhos de fonte padrão/mínimo por plataforma: iOS/iPadOS 17pt/11pt; macOS 13pt/10pt; tvOS 29pt/23pt; visionOS 17pt/12pt; watchOS 16pt/12pt.
- Pesos finos (thin) pedem tamanho maior que o recomendado para manter legibilidade — peso mais grosso é mais fácil de ler em tamanhos pequenos.
- Contraste mínimo (WCAG AA, usado pelo Accessibility Inspector): até 17pt (qualquer peso) = 4,5:1; 18pt+ (qualquer peso) = 3:1; texto bold em qualquer tamanho = 3:1.
- Se o app não atinge o contraste mínimo por padrão, precisa oferecer esquema de alto contraste quando "Increase Contrast" está ativo; validar em light e dark.
- Prefira cores definidas pelo sistema — têm variantes acessíveis que se adaptam automaticamente quando a pessoa liga Increase Contrast ou alterna light/dark (ex.: systemRed default vs. accessible).
- Nunca transmita informação só por cor — use forma/ícone distinto além de cor (ex.: daltonismo vermelho-verde e vermelho-laranja são pares problemáticos); considere permitir personalizar esquemas de cor (ex.: cores de gráfico, personagens de jogo).
- Descreva a interface e o conteúdo para VoiceOver (screen reader que permite usar o app sem ver a tela).

Audição
- Não comunique diálogo/informação crucial só por áudio. Ofereça, conforme o contexto: captions (equivalente textual síncrono, bom para cutscenes/clipes), subtitles (diálogo traduzido, bom para TV/filme), audio descriptions (narração das partes só visuais, entre pausas naturais) e transcripts (texto completo, bom para podcast/audiobook).
- Use haptics além de sinais de áudio (chime de sucesso, som de erro, feedback de jogo) para quem não percebe áudio ou está com som desligado; considere Music Haptics e Audio Graphs (iOS/iPadOS) para experimentar música/infográficos por vibração/textura.
- Audite periodicamente o app com o Accessibility Inspector e, sempre que possível, com pessoas que de fato usam VoiceOver/Switch Control/Voice Control no dia a dia — testes internos sem essas tecnologias tendem a deixar passar problemas reais de uso.
- Reforce sinais de áudio com sinais visuais, especialmente em jogos e apps espaciais onde conteúdo importante pode estar fora da tela — ao guiar por áudio, adicione também indicador visual apontando para onde interagir.

Mobilidade
- Ofereça controles com tamanho suficiente. Tamanho padrão/mínimo por plataforma: iOS/iPadOS 44×44pt / 28×28pt; macOS 28×28pt / 20×20pt; tvOS 66×66pt / 56×56pt; visionOS 60×60pt / 28×28pt; watchOS 44×44pt / 28×28pt.
- Espaçamento entre controles é tão importante quanto o tamanho: ~12pt de padding ao redor de elementos com bezel; ~24pt ao redor de elementos sem bezel (nas bordas visíveis).
- Prefira o gesto mais simples possível para interações frequentes; evite gestos multi-dedo/multi-mão customizados.
- Ofereça alternativa a todo gesto — funcionalidade essencial precisa ser acessível por mais de um tipo de interação física (ex.: swipe-to-delete também precisa de um botão editar/tocar-para-deletar).
- Suporte Voice Control (comandos falados, gestos, ditado, edição de texto) — rotule bem os elementos de interface para isso funcionar.
- Integre com Siri e Shortcuts para permitir automatizar tarefas importantes/repetitivas via voz, Action Button ou Control Center.
- Suporte tecnologias assistivas de mobilidade: VoiceOver, AssistiveTouch, Full Keyboard Access, Pointer Control, Switch Control — teste e verifique rotulagem adequada.

Fala
- Permita navegar e interagir só com teclado (Full Keyboard Access); não sobrescreva atalhos de teclado definidos pelo sistema; teste explicitamente com Full Keyboard Access ligado.
- Suporte Switch Control (hardware separado, controle de jogo ou sons como clique/pop) para selecionar, tocar, digitar e desenhar.

Cognitivo
- Mantenha ações simples e previsíveis; prefira gestos/comportamentos do sistema já conhecidos a gestos customizados que exigem aprendizado.
- Minimize elementos de interface com auto-dismiss por timer — problemático para quem precisa de mais tempo para processar ou usa tecnologia assistiva; prefira dispensar por ação explícita.
- Em jogos, considere acomodações de dificuldade (reduzir critério de sucesso, ajustar tempo de reação, assistência de controle).
- Não faça autoplay de áudio/vídeo sem oferecer controles de start/stop descobríveis; considere configuração global de opt-out de autoplay.
- Respeite a configuração "Dim Flashing Lights" (o sistema calcula/mitiga/avisa sobre luzes piscantes na mídia).
- Seja cauteloso com animações rápidas/piscantes em excesso — podem distrair, causar tontura e, em casos raros, episódios epiléticos. Com "Reduce Motion" ativo: aperte molas de animação (menos bounce), rastreie animação direto com o gesto da pessoa, evite animar profundidade no eixo z, substitua transições x/y/z por fade, evite animar entrando/saindo de blur.
- Otimize para Assistive Access (iOS/iPadOS): identifique a funcionalidade central e remova fluxos não-críticos; quebre fluxos multi-etapa em uma interação por tela; sempre peça confirmação dupla para ações difíceis de reverter (ex.: deletar arquivo).

visionOS (adicional)
- Priorize conforto: mantenha elementos de interface dentro do campo de visão, prefira layouts horizontais a verticais (evita tensão no pescoço), evite exigir atenção em locais diferentes em sucessão rápida.
- Reduza velocidade/intensidade de objetos animados, principalmente na visão periférica; seja suave com movimento de câmera/vídeo; evite ancorar conteúdo à cabeça (prende e atrapalha tecnologias assistivas como Pointer Control); minimize gestos grandes/repetitivos.
- visionOS oferece recursos como Pointer Control (mão e cabeça) e Zoom para interagir com o ambiente de forma confortável — teste explicitamente com esses recursos ativados.
- Use o Accessibility Inspector para auditar a interface durante o desenvolvimento e entender como o app se representa às tecnologias assistivas do sistema; considere também comunicar suporte a acessibilidade via Accessibility Nutrition Labels na App Store.

**Aplicação em web/extensão**
- Alvo de clique/toque mínimo de 44×44px (ou pelo menos 24×24px com espaçamento generoso) em botões e ícones de UI web/extensão, com padding entre alvos adjacentes.
- Contraste de texto mínimo 4,5:1 (texto normal) e 3:1 (texto grande/bold ≥18px ou 14px bold) — validar em light e dark theme com um checador de contraste; suporte `prefers-contrast: more`.
- Respeite `prefers-reduced-motion` no CSS/JS e reduza/objete animações automáticas quando ativo; forneça `alt`, `aria-label` e transcript/legenda para qualquer mídia com áudio essencial.
- Nunca use só cor para indicar estado (erro, sucesso, seleção) — combine com ícone, texto ou padrão; garanta navegação completa por teclado (`:focus-visible` claro) equivalente ao Full Keyboard Access.
- Suporte zoom de texto do navegador até 200% sem quebrar layout (equivalente à meta de aumento de 200% do Dynamic Type) — teste com o zoom de fonte do SO/navegador ativado, não só com `Ctrl +`.
- Evite elementos com auto-dismiss por timer (toasts que somem sozinhos sem opção de manter, banners cronometrados) em fluxos críticos — ofereça um botão de fechar explícito, espelhando "minimize elementos de interface com timer".

## App icons

**Essência.** O ícone do app é peça central da marca: precisa expressar identidade e propósito com clareza em todas as plataformas, usando camadas (layers) que o sistema anima e sombreia dinamicamente para dar sensação de profundidade e vitalidade.

**Regras**

Design em camadas
- Ícones em iOS/iPadOS/macOS/watchOS usam camada de fundo + uma ou mais camadas de frente, montadas no Icon Composer (parte do Xcode); ganham atributos Liquid Glass (destaque especular, refração, translucidez) que se adaptam automaticamente ao tamanho e podem variar entre versões do sistema.
- tvOS usa entre 2 e 5 camadas para efeito de parallax ao focar — o ícone eleva ao primeiro plano e balança suavemente conforme o movimento do dedo no controle remoto, com a superfície iluminando.
- visionOS usa fundo + 1-2 camadas de frente, formando um objeto 3D que se expande sutilmente ao ser visualizado; o sistema adiciona sombras entre camadas e usa o canal alfa das camadas superiores para criar aparência embutida (embossed).
- Prefira bordas bem definidas nas camadas de frente — evite bordas suaves/esfumaçadas (prejudicam highlights/sombras desenhados pelo sistema).
- Varie opacidade entre camadas para dar sensação de profundidade e vivacidade (ex.: ícone do Photos separa a peça central em múltiplas camadas translúcidas).
- O fundo deve, se possível, ser resolvido com cor sólida/gradiente dentro do próprio Icon Composer (evita precisar importar imagem de fundo); se importar um fundo, ele precisa ser full-bleed e opaco.
- Prefira vetores (SVG/PDF) para camadas ao trazer para o Icon Composer — escalam sem perda e ficam nítidos em qualquer tamanho; converta texto em contorno (outline). Para gradientes mesh e artwork raster, prefira PNG (formato sem perdas).

Forma do ícone
- Formato final por plataforma: iOS/iPadOS/macOS = quadrado com máscara de cantos arredondados que casam com a curvatura do resto da interface e do bisel físico do device; tvOS = retangular (paisagem) com cantos arredondados concêntricos; visionOS/watchOS = máscara circular.
- Forneça camadas não mascaradas na forma de origem (quadrada para iOS/iPadOS/macOS/visionOS/watchOS; retangular para tvOS) — fornecer camadas já com máscara pré-aplicada prejudica os efeitos de highlight especular e deixa bordas serrilhadas.
- Mantenha conteúdo principal centralizado para não cortar quando o sistema aplicar cantos/máscara — atenção redobrada em visionOS e watchOS. Use os grids dos templates de produção de ícone (Apple Design Resources) para posicionar.

Design
- Simplicidade: um conceito central capturando a essência do app, poucas formas, fundo simples (cor sólida/gradiente) — não é preciso preencher todo o canvas com conteúdo.
- Consistência visual do design do ícone entre todas as plataformas suportadas — ajuda a reconhecer o app e evita confundir com múltiplos apps diferentes.
- Considere basear o design em formas sólidas sobrepostas (overlapping shapes); combinadas com transparência/blur dão sensação de profundidade.
- Inclua texto só se essencial — texto não é acessível/localizável, costuma ficar pequeno demais para ler, e deixa o ícone com aparência poluída; evite palavras de instrução ("Watch", "Play") ou termos específicos de contexto ("New", "For visionOS"). Em tvOS, se incluir texto, mantenha-o acima das outras camadas para não ser cortado pelo parallax.
- Prefira ilustração a foto (fotos têm detalhes demais que não funcionam bem em diferentes aparências/tamanhos/camadas) e não replique componentes de UI real nem screenshots do app.
- Nunca use réplicas de produtos de hardware da Apple — são protegidos por copyright.

Efeitos visuais
- Deixe o sistema aplicar blur, sombra entre camadas, bisel, brilho — não inclua esses efeitos manualmente nas camadas (interferem com os efeitos do sistema, que são dinâmicos, enquanto os manuais são estáticos). Se incluir efeitos customizados, teste cuidadosamente no Icon Composer, num device simulado no Device Hub, ou em device físico.
- Agrupe camadas (layer groupings) no Icon Composer/ferramenta de design quando fizer sentido, para aplicar efeitos Liquid Glass (highlight especular, refração, translucidez) em nível de grupo em vez de camada individual.

Aparências
- Nas plataformas iOS/iPadOS/macOS, é possível escolher ícone default, dark, clear ou tinted no Home Screen. Você pode desenhar variantes para cada aparência; o sistema gera automaticamente as que você não fornecer.
- Mantenha as características centrais do ícone iguais entre as aparências — não troque elementos entre variantes (dificulta reconhecer o app ao trocar aparência).
- Ícones dark/tinted ficam mais discretos/subdued — desenhe-os para conviverem bem ao lado de ícones e widgets do sistema; preserve a paleta de cores do ícone default como base do dark, evitando imagens excessivamente brilhantes; fundos coloridos costumam dar mais contraste no dark.
- Considere ícones de app alternativos (iOS, iPadOS, tvOS e apps compatíveis em visionOS) — mantenha cada alternativa claramente relacionada ao conteúdo/experiência para não ser confundida com outro app. Ícones alternativos em iOS/iPadOS precisam ter suas próprias variantes dark/clear/tinted e passam por App Review.

Platform considerations
- tvOS: mantenha uma safe zone nas bordas — o sistema pode cortar conteúdo conforme o ícone escala/move ao ser focado; a safe zone varia conforme tamanho de imagem, profundidade de camada e movimento; camadas de frente são mais cortadas que as de fundo.
- visionOS: evite formas que pareçam buraco/área côncava no fundo — a sombra e o highlight especular do sistema fazem essa forma se destacar em vez de recuar.
- watchOS: evite fundo preto puro — o ícone se mistura com o fundo escuro do display; clareie um fundo preto.

Especificações
- Tamanho de layout: iOS/iPadOS/macOS 1024×1024px; tvOS 800×480px; visionOS 1024×1024px; watchOS 1088×1088px.
- O sistema escala automaticamente o ícone para variantes menores usadas em Settings e notificações.
- Espaços de cor suportados: sRGB (cor), Gray Gamma 2.2 (escala de cinza), Display P3 (cor wide-gamut, exceto em visionOS).
- Reavalie o ícone periodicamente conforme o produto evolui — um ícone que representava bem a proposta de valor original pode ficar desatualizado se o foco mudar significativamente; trate-o como parte viva do produto, não um asset congelado no lançamento.

**Aplicação em web/extensão**
- Favicon e ícone de extensão Chrome: forneça múltiplos tamanhos (16, 32, 48, 128px) em PNG nítido; sem texto ilegível em tamanhos pequenos.
- Simplicidade radical: 1 conceito central, poucas formas — o ícone da extensão aparece minúsculo na barra de ferramentas do navegador.
- Não replique screenshots da própria UI como ícone; crie uma representação gráfica do conceito, como pede a regra "prefira ilustração a foto/UI real".
- Prepare variante para light/dark toolbar (equivalente à variante dark do ícone) já que navegadores alternam o tema da barra de ferramentas.
- Mantenha o mesmo conceito visual central entre favicon, ícone de extensão e ícone usado em app stores/marketing — a consistência entre esses contextos é o que ajuda a reconhecer o produto rapidamente, espelhando "design visualmente consistente entre plataformas".
- Ao gerar ícones automaticamente a partir de um SVG-fonte (build pipeline), teste visualmente o resultado nos tamanhos finais em vez de confiar só no redimensionamento automático — detalhes finos podem borrar ou desaparecer em 16px.

## Branding

**Essência.** A marca deve ser reconhecível e expressar identidade única, mas sempre subordinada ao conteúdo e às convenções da plataforma — a interface precisa parecer confiável e familiar antes de parecer "sua".

**Regras**
- Use a voz e tom da marca de forma consistente em toda comunicação escrita (ex.: encorajamento/otimismo via palavras simples, exclamações ocasionais, emoji, frases simples).
- Aplique a cor de destaque (accent color) da marca com moderação — usá-la amplamente demais sobrecarrega a interface e dilui seu impacto. Reserve para ações primárias ou indicadores de status (badges de conteúdo não lido, ícone da aba selecionada). Considere mover a expressão da marca para a camada de conteúdo, que rola sob controles Liquid Glass e é captada dinamicamente por eles.
- Considere usar fonte customizada se a marca está fortemente associada a ela: garanta legibilidade em todos os tamanhos e suporte a bold text/Dynamic Type. Funciona bem usar fonte customizada em headlines/subheadings e fontes do sistema no corpo/legendas (fontes do sistema são otimizadas para legibilidade em tamanhos pequenos).
- Expresse a marca com componentes familiares — usar componentes já conhecidos faz a experiência parecer confiável de imediato, deixando espaço para o conteúdo/funcionalidades únicas se destacarem. Se customizar a aparência de um componente, preserve tamanho, posicionamento e comportamento apropriados à plataforma.
- Branding sempre cede espaço ao conteúdo: usar espaço de tela só para exibir um asset de marca sem função significa menos espaço para o que as pessoas realmente querem. Incorpore a marca de forma refinada e discreta.
- Ajude as pessoas a se sentirem confortáveis usando padrões-padrão de forma consistente: mesmo uma interface muito estilizada pode ser aproximável se mantiver comportamentos familiares. Posicione UI em locais esperados, use símbolos-padrão para ações comuns, siga convenções estabelecidas de navegação/modalidade.
- Resista à tentação de exibir o logo pela interface inteira, a menos que seja essencial para dar contexto — raramente as pessoas precisam ser lembradas de qual app estão usando.
- Não use a launch screen como oportunidade de branding — ela some rápido demais para transmitir qualquer informação; considere, em vez disso, uma tela de boas-vindas/onboarding com elementos de marca no início da experiência.
- Siga as diretrizes de trademark da Apple: marcas registradas da Apple não podem aparecer no nome do app nem em imagens.

**Aplicação em web/extensão**
- Reserve a cor de marca para CTAs primários, badges e estados-chave — não pinte navbars/painéis inteiros com ela; deixe a cor "morar" no conteúdo/dados, não em todo controle de UI.
- Evite logo repetido em cada seção da página/painel; um logo no header já basta para dar contexto — use o espaço restante para o conteúdo que a pessoa veio ver.
- Splash screens de carregamento (loading states) devem ser rápidos e funcionais, não uma peça de branding — prefira investir a atenção em um onboarding real, com conteúdo útil, em vez de uma tela de logo que desaparece rápido.
- Use componentes de UI conhecidos (padrões de navegação, formulário, modal já familiares na web) e customize apenas superficialmente (cor, tipografia) — não reinvente o comportamento esperado de um botão/menu só para "parecer com a marca".
- Se adotar fonte customizada de marca para headings/landing pages, garanta fallback de sistema (`font-family` com pilha) e teste legibilidade em corpo de texto pequeno — use a fonte de marca só em títulos e mantenha uma fonte de leitura otimizada (system-ui, ou similar) no corpo, espelhando "fonte customizada em headline, fonte de sistema no corpo".
- Trate a voz/tom da marca como um guia de copy versionado (lista de termos e exemplos de frase aprovados) compartilhado entre design e produto, para manter consistência entre landing page, painel e extensão — não deixe cada superfície inventar seu próprio tom.

## Color

**Essência.** Cor bem aplicada reforça comunicação, marca, status e hierarquia — mas nunca deve ser o único canal de informação, e precisa funcionar em light, dark, alto contraste e sob diferentes condições de luz/iluminação.

**Regras**

Boas práticas gerais
- Não use a mesma cor para significar coisas diferentes na mesma interface — use cor de forma consistente, especialmente quando ela comunica status ou interatividade (ex.: se a cor de marca indica que um botão sem borda é interativo, usar a mesma cor em texto não-interativo confunde).
- Garanta que todas as cores funcionem em light, dark e contraste aumentado (Increase Contrast) — com Increase Contrast ligado, as diferenças de cor ficam bem mais evidentes. Prefira cores do sistema (já definem variantes para todos esses contextos); se definir cor customizada, forneça variantes light e dark, e uma opção de contraste aumentado para cada variante com diferenciação visual significativamente maior. Mesmo apps single-appearance devem fornecer cores light e dark, para suportar a adaptividade do Liquid Glass.
- Teste o esquema de cores sob condições de luz variadas: em ambientes claros/ensolarados as cores parecem mais escuras e menos saturadas; em ambientes escuros parecem mais brilhantes e saturadas; em visionOS as cores podem parecer diferentes dependendo das cores/reflexos do ambiente físico.
- Teste em diferentes devices: True Tone ajusta o ponto de branco conforme a luz ambiente (apps de leitura/foto/vídeo/jogo podem especificar um estilo de adaptividade de ponto de branco); teste tvOS em múltiplas marcas de TV HD/4K com diferentes configurações; teste em Mac com diferentes perfis de cor (P3 vs sRGB).
- Considere como artwork e translucidez afetam cores próximas — variações de artwork às vezes exigem ajustar cores vizinhas para manter continuidade visual (ex.: Maps usa esquema claro no modo mapa e escuro no modo satélite); cores também podem parecer diferentes atrás de um elemento translúcido como uma toolbar.
- Se o app permite escolher cores, prefira os controles de cor fornecidos pelo sistema (color pickers nativos) — dá experiência consistente e permite salvar cores acessíveis de qualquer app.

Cor inclusiva
- Evite depender só de cor para diferenciar objetos, indicar interatividade ou comunicar informação essencial — ofereça a mesma informação de outra forma (texto, forma de glifo) para quem tem daltonismo ou outras deficiências visuais.
- Evite cores que dificultem perceber conteúdo — contraste insuficiente faz ícones/texto se misturarem com o fundo; pessoas daltônicas podem não distinguir certas combinações.
- Considere como as cores usadas podem ser percebidas em outros países/culturas (ex.: vermelho = perigo em algumas culturas, positivo em outras; no app Stocks, verde indica alta em inglês, mas vermelho indica alta em chinês).

Cores do sistema
- Evite hardcodar valores de cor do sistema — os valores documentados são referência de design, mas o valor real pode variar entre releases de acordo com fatores ambientais; use APIs (ex.: `Color`) para aplicar cores do sistema.
- iOS/iPadOS/macOS/visionOS definem conjuntos de cores dinâmicas do sistema que casam com componentes-padrão e adaptam automaticamente a light/dark. Cada cor dinâmica é definida semanticamente pelo propósito (ex.: fundo em diferentes níveis de hierarquia, texto/label, link, separador), não pela aparência/valor.
- Nunca redefina o significado semântico de uma cor dinâmica do sistema (ex.: não use a cor de separador como cor de texto, nem a cor de label secundário como cor de fundo) — quebra a consistência quando a aparência da plataforma muda.
- Documente a paleta de cores do produto (tokens, valores hex/HSL, uso pretendido de cada um) num único local versionado, acessível a design e engenharia, para evitar variações não intencionais do mesmo "azul de marca" surgindo em telas diferentes.

Cor no Liquid Glass
- Por padrão, Liquid Glass não tem cor própria — herda cor do conteúdo atrás dele. Você pode aplicar cor a alguns elementos Liquid Glass, dando aparência de "vidro colorido/tingido" — útil para dar ênfase a um controle específico, como um CTA primário (é a abordagem do sistema para estilizar botões proeminentes).
- Em elementos pequenos (toolbars, tab bars), o sistema pode adaptar o Liquid Glass entre aparência clara e escura em resposta ao conteúdo por baixo — por padrão, símbolos/texto seguem esquema monocromático (mais escuros sobre fundo claro, mais claros sobre fundo escuro). Elementos maiores (sidebars) usam Liquid Glass mais opaco para preservar legibilidade sobre fundos complexos.
- Aplique cor ao Liquid Glass com moderação, reservando para elementos que realmente se beneficiam de ênfase (indicadores de status, ações primárias) — para enfatizar ação primária, aplique cor ao fundo do controle, não ao símbolo/texto (é como o sistema aplica a accent color no fundo de um botão "Done", por exemplo).
- Evite adicionar cor ao fundo de múltiplos controles simultaneamente.
- Evite cores similares nos rótulos de controle se o fundo do app for colorido/visualmente rico — prefira aparência monocromática em toolbars/tab bars, ou escolha uma accent color com diferenciação visual suficiente. Por outro lado, em apps com conteúdo/fundo majoritariamente monocromático, usar a cor de marca como accent color pode funcionar muito bem.
- Fique atento à posição da cor na camada de conteúdo — evite sobreposição de cores similares entre conteúdo e controles; mesmo que conteúdo colorido role intermitentemente sob os controles, o estado de repouso (ex.: topo de uma tela de conteúdo rolável) precisa manter legibilidade clara.

Gestão de cor
- Um color space (gamut) representa as cores de um modelo de cor (RGB, CMYK); comuns são sRGB e Display P3. Um color profile descreve as cores de um color space (fórmulas matemáticas/tabelas); a imagem incorpora esse perfil para reprodução correta no display.
- Aplique perfis de cor às imagens — sRGB produz cores precisas na maioria dos displays.
- Use wide color (Display P3) para aproveitar displays compatíveis — produz cores mais ricas/saturadas que sRGB; ao usar, aplique o perfil Display P3 a 16 bits por pixel/canal e exporte em PNG. É preciso um display wide color para desenhar/selecionar cores P3 corretamente.
- Se necessário, forneça variações de imagem/cor específicas por color space — cores P3 muito próximas podem ficar indistinguíveis em display sRGB, e gradientes P3 podem parecer "clipados" em sRGB; use o asset catalog do Xcode para fornecer versões por color space.

**Aplicação em web/extensão**
- Defina cores como tokens semânticos (ex.: `--color-text-primary`, `--color-surface`) em vez de hex hardcoded espalhado — troque os valores por tema sem tocar em componentes, e nunca reaproveite o token de "separador" como cor de texto.
- Garanta contraste mínimo 4,5:1 (texto normal) / 3:1 (texto grande) em CSS, testando light e dark via `prefers-color-scheme`, e considere uma variante de alto contraste via `prefers-contrast: more`.
- Nunca use cor isolada para indicar erro/sucesso em formulários web — acompanhe de ícone e texto (ex.: "Erro: campo obrigatório", não só borda vermelha); considere convenções culturais de cor (ex.: vermelho/verde em gráficos financeiros) se o público for internacional.
- Reserve a cor de destaque/marca para 1-2 elementos por tela (CTA primário, item ativo de nav) — evite "sopa colorida" nos painéis; para overlays translúcidos sobre imagem, mantenha o texto por cima em cor sólida de alto contraste, nunca aplicando profundidade/cor decorativa ao próprio texto.
- Se o produto oferece color picker para o usuário (ex.: customizar tema de um dashboard), prefira o `<input type="color">` nativo do navegador ou um componente acessível testado em vez de reinventar um seletor de cor do zero — espelha "prefira controles de cor fornecidos pelo sistema".
- Teste o esquema de cor do produto sob diferentes brilhos de tela/monitor (não só no monitor de referência do designer) antes de aprovar, espelhando "teste sob condições de luz variadas".

## Dark Mode

**Essência.** Dark Mode é uma preferência de aparência do sistema (light/dark/auto) que a interface deve respeitar automaticamente, sem alternar por conta própria nem exigir configuração redundante — as pessoas esperam que todo app respeite a escolha sistêmica.

**Regras**
- Não ofereça uma configuração de aparência específica do app — cria trabalho extra (ajustar duas configs) e pode fazer a pessoa achar que o app está quebrado por não responder à escolha sistêmica.
- Garanta que o app funcione bem nos dois modos — além de escolher um ou outro, as pessoas podem escolher "Auto", que alterna conforme o horário do dia, potencialmente enquanto o app está aberto.
- Teste conteúdo com Increase Contrast e Reduce Transparency ligados (separadamente e juntos) em Dark Mode — pode haver lugares onde texto escuro fica pouco legível sobre fundo escuro; ligar Increase Contrast em Dark Mode pode até reduzir o contraste visual entre texto escuro e fundo escuro em certos casos, tornando texto ilegível para muita gente mesmo que pessoas com visão forte ainda consigam ler.
- Em casos raros, considere usar só aparência escura na interface — ex.: um app que suporta visualização imersiva de mídia pode usar aparência permanentemente escura para deixar a UI recuar e focar na mídia (ex.: Stocks usa aparência só-dark).

Cores em Dark Mode
- A paleta em Dark Mode inclui cores de fundo mais escuras e cores de primeiro plano mais brilhantes — não são necessariamente inversões diretas das cores do modo claro (algumas são invertidas, outras não).
- Prefira cores que adaptam à aparência atual: cores semânticas (ex.: `labelColor`/`controlColor` no macOS, `separator` no iOS/iPadOS) adaptam automaticamente. Para cor customizada, adicione um Color Set no asset catalog do Xcode especificando variantes clara e escura — evite valores de cor hardcoded ou cores que não adaptam.
- Busque contraste de cor suficiente em todas as aparências: no mínimo 4,5:1 entre cores; para cores de frente/fundo customizadas, busque 7:1, especialmente em texto pequeno.
- Suavize o fundo branco de imagens de conteúdo — considere escurecer levemente uma imagem com fundo branco para evitar que "brilhe" demais no contexto de Dark Mode.

Ícones e imagens
- O sistema usa SF Symbols (adaptam automaticamente a Dark Mode) e imagens full-color otimizadas para ambas aparências.
- Use SF Symbols sempre que possível — funcionam bem nos dois modos ao usar cores dinâmicas para tingir ou ao adicionar vibrancy.
- Desenhe ícones de interface separados para light/dark quando necessário (ex.: um ícone de lua cheia pode precisar de um contorno escuro sutil para contrastar em fundo claro, mas nenhum contorno sobre fundo escuro).
- Garanta que imagens/ícones full-color fiquem bons nas duas aparências: use o mesmo asset se funcionar bem nas duas; se um asset só funciona bem em um modo, modifique-o ou crie assets separados para light/dark, combinando-os num único named image via asset catalog.

Texto
- O sistema usa vibrancy e contraste aumentado para manter legibilidade de texto sobre fundos mais escuros.
- Use as cores de label fornecidas pelo sistema (primary, secondary, tertiary, quaternary) — adaptam automaticamente entre light e dark.
- Use views de sistema para desenhar text fields e text views — ajustam automaticamente para presença/ausência de vibrancy; prefira uma view fornecida pelo sistema a desenhar o texto você mesmo.

Platform considerations
- Não há considerações adicionais para tvOS. Dark Mode não é suportado em visionOS nem watchOS.
- iOS/iPadOS: usa dois conjuntos de cor de fundo em Dark Mode — base (mais escuro, faz a interface de fundo parecer recuar) e elevated (mais claro, faz a interface de primeiro plano parecer avançar), usados também para dar separação visual entre apps multitarefa e entre janelas múltiplas. Prefira as cores de fundo do sistema em vez de cor de fundo customizada — Dark Mode é dinâmico (muda de base para elevated quando a interface vai para primeiro plano, como um popover ou modal sheet).
- macOS: ao escolher accent color "graphite", o macOS aplica "desktop tinting" (fundo de janela pega cor do papel de parede atual) — um efeito sutil de harmonia. Inclua transparência em fundos de componentes customizados quando apropriado, para eles pegarem cor do fundo de janela durante desktop tinting; adicione transparência só quando o componente tem fundo/bezel visível e está em estado neutro (sem uso de cor), evitando flutuação de cor quando o componente está em estado colorido.

**Aplicação em web/extensão**
- Implemente dark mode via `prefers-color-scheme: dark` no CSS, nunca um toggle manual isolado do SO — mas ofereça um toggle explícito na UI se o produto quiser sobrepor a preferência do SO (deixando "Auto" como padrão).
- Use tokens de cor com variante dark definida explicitamente (não inverta cores automaticamente via filtro CSS `invert()`), espelhando a regra de "não são inversões diretas".
- Confira contraste mínimo 4,5:1 em dark também — texto cinza claro sobre fundo cinza escuro frequentemente falha nesse teste; teste também com simulação de alto contraste do navegador.
- Amenize (não use puro `#fff`) fundos de imagens/screenshots incorporados em telas dark para evitar brilho excessivo, e forneça versões de ícone/ilustração ajustadas para dark quando o asset original não funcionar bem nos dois temas.
- Ao usar dois níveis de fundo (superfície base e superfície elevada, ex.: modal sobre página) em dark mode, torne a superfície elevada perceptivelmente mais clara que a base para dar sensação de profundidade — espelha o par base/elevated do iOS/iPadOS.
- Persista a escolha explícita de tema (se oferecida) em preferência do usuário/local storage, mas sempre trate "Auto"/"Sistema" como valor padrão inicial, nunca force light ou dark na primeira visita.

## Icons

**Essência.** Ícones de interface (glyphs, distintos do app icon) comunicam uma única ideia com formas simplificadas, usando SF Symbols prontos ou desenho vetorial customizado — ambos usam preto/transparente para definir a forma, que o sistema depois tinge de cor.

**Regras**
- Crie um design reconhecível e altamente simplificado — muitos detalhes tornam um ícone confuso ou ilegível; busque um design simples e universal usando metáforas visuais diretamente ligadas à ação/conteúdo.
- Mantenha consistência visual entre todos os ícones de interface do app (custom, sistema, ou mistura dos dois): mesmo tamanho, nível de detalhe, espessura de traço (peso) e perspectiva — pode ser necessário ajustar dimensões individuais para manter consistência de peso visual.
- Combine, em geral, o peso dos ícones de interface com o peso do texto adjacente — a menos que queira enfatizar um dos dois, usar o mesmo peso dá aparência consistente e nível de ênfase parecido.
- Adicione padding a um ícone customizado se necessário para atingir alinhamento óptico — ícones assimétricos podem parecer desbalanceados se centralizados geometricamente em vez de opticamente (ex.: ícone de download com mais peso visual embaixo pode parecer "baixo demais" se centralizado geometricamente); pequenos ajustes de poucos pixels têm grande impacto.
- Não é preciso fornecer versão "selecionado" separada de um ícone usado em componentes-padrão (toolbars, tab bars, botões) — o sistema atualiza a aparência do estado selecionado automaticamente (ex.: em toolbar, ícone selecionado recebe a accent color do app).
- Use imagens inclusivas: considere como os ícones podem ser compreensíveis e acolhedores para todos; prefira figuras humanas neutras em gênero e evite imagens difíceis de reconhecer entre culturas/idiomas.
- Inclua texto no ícone só quando essencial para o significado (ex.: um caractere que representa formatação de texto pode ser a forma mais direta de comunicar o conceito); localize caracteres exibidos; se sugerir um bloco de texto, desenhe uma representação abstrata e inclua uma versão espelhada para contexto right-to-left.
- Use formato vetorial (PDF/SVG) para ícone de interface customizado — o sistema escala automaticamente para displays de alta resolução, sem precisar fornecer múltiplas versões (ao contrário do PNG, usado para app icons e imagens com efeitos de sombra/textura/highlight, que não escala e exige múltiplas versões). Alternativa: criar um SF Symbol customizado especificando uma escala que combine a ênfase do símbolo com o texto adjacente.
- Forneça rótulos de texto alternativo (accessibility descriptions) para ícones de interface customizados — não são visíveis, mas permitem que o VoiceOver descreva audivelmente o que está na tela, simplificando navegação para quem tem deficiência visual.
- Evite usar réplicas de produtos de hardware da Apple — os designs de hardware mudam com frequência e podem deixar seus ícones datados; se precisar exibir hardware Apple, use só as imagens disponíveis em Apple Design Resources ou os SF Symbols que representam produtos Apple.

Ícones-padrão (SF Symbols para ações comuns)
- Edição: Cut = `scissors`; Copy = `document.on.document`; Paste = `document.on.clipboard`; Done/Save = `checkmark`; Cancel/Close = `xmark`; Delete = `trash`; Undo = `arrow.uturn.backward`; Redo = `arrow.uturn.forward`; Compose = `square.and.pencil`; Duplicate = `plus.square.on.square`; Rename = `pencil`; Move to/Folder = `folder`; Attach = `paperclip`; Add = `plus`; More = `ellipsis`.
- Seleção: Select = `checkmark.circle`; Deselect/Close = `xmark`; Delete = `trash`.
- Formatação de texto: Superscript = `textformat.superscript`; Subscript = `textformat.subscript`; Bold = `bold`; Italic = `italic`; Underline = `underline`; Align Left = `text.alignleft`; Center = `text.aligncenter`; Justified = `text.justify`; Align Right = `text.alignright`.
- Busca: Search = `magnifyingglass`; Find/Find and Replace = `text.page.badge.magnifyingglass`; Filter = `line.3.horizontal.decrease`.
- Compartilhar/exportar: Share = `square.and.arrow.up`; Export/Print = `printer`.
- Usuários: Account/User/Profile = `person.crop.circle`.
- Avaliações: Dislike = `hand.thumbsdown`; Like = `hand.thumbsup`.
- Camadas: Bring to Front = `square.3.layers.3d.top.filled`; Send to Back = `square.3.layers.3d.bottom.filled`; Bring Forward = `square.2.layers.3d.top.filled`; Send Backward = `square.2.layers.3d.bottom.filled`.
- Outros: Alarm = `alarm`; Archive = `archivebox`; Calendar = `calendar`.

Ícones de documento (macOS)
- Formato tradicional: papel com canto superior direito dobrado; se não fornecer um ícone customizado, o macOS gera um compositando o app icon + extensão do arquivo.
- Pode fornecer combinação de fundo (background fill), imagem central (center image) e texto; o sistema faz o layering/máscara/composição sobre o formato de canto dobrado.
- Desenhe imagens simples que comuniquem claramente o tipo do documento — formas descomplicadas, paleta reduzida de cores distintas; o ícone pode aparecer tão pequeno quanto 16×16px.
- Reduza complexidade nas versões pequenas — detalhes claros em versões grandes podem ficar borrados/difíceis em versões pequenas (ex.: menos linhas de grid e linhas mais grossas em 32×32px; sem linhas de grid em 16×16px).
- Evite conteúdo importante no canto superior direito do fundo — o sistema desenha ali o canto dobrado branco por cima.
- Tamanhos de fundo: 512×512px @1x/1024×1024px @2x; 256×256px @1x/512×512px @2x; 128×128px @1x/256×256px @2x; 32×32px @1x/64×64px @2x; 16×16px @1x/32×32px @2x.
- Imagem central mede metade do canvas total do ícone de documento (ex.: para ícone 32×32px, canvas de imagem central de 16×16px); tamanhos disponíveis: 256×256/128×128/32×32/16×16px @1x com @2x correspondente.
- Defina uma margem de ~10% do canvas da imagem, mantendo a maior parte da imagem dentro dela (imagem ocupando ~80% do canvas) — partes podem se estender à margem para alinhamento óptico.
- Especifique um termo sucinto se ajudar a entender o tipo do documento (por padrão o sistema mostra a extensão do arquivo); o sistema escala automaticamente o texto da extensão, então use um termo curto o bastante para ser legível em tamanhos pequenos (por padrão em caixa alta).

**Aplicação em web/extensão**
- Use SVG (não PNG) para ícones de UI web sempre que possível — escalam sem perda em qualquer densidade de tela, equivalente à regra de preferir vetor a raster para ícones de interface.
- Mantenha peso de traço (stroke-width) consistente entre todos os ícones de um mesmo conjunto/biblioteca no produto, e combine esse peso com o peso da fonte adjacente.
- Sempre inclua `aria-label` ou texto oculto (`sr-only`) em ícones clicáveis sem texto visível, equivalente ao rótulo alternativo do VoiceOver.
- Evite ícones com texto embutido em raster (perde nitidez e não localiza); se precisar de letra/texto no ícone, use texto real via CSS/SVG `<text>` para manter localização e nitidez.
- Não force estado "selecionado" customizado em ícones dentro de componentes-padrão do design system (tabs, nav) — deixe o próprio componente aplicar a cor/peso de seleção automaticamente, como o sistema faz em toolbars e tab bars nativas.
- Ajuste alinhamento óptico de ícones assimétricos (ex.: seta de download, play) manualmente no SVG quando o centro geométrico parecer "torto" — o mesmo cuidado de padding/centralização óptica descrito para ícones nativos.

## Images

**Essência.** Imagens precisam ser entregues na resolução e formato certos para cada densidade de tela e plataforma, garantindo nitidez sem desperdiçar peso de arquivo — e testadas em devices reais, nunca só em tempo de design.

**Regras**

Resolução
- Um ponto (point) é uma unidade abstrata de medida que mantém o conteúdo visual consistente independentemente de como é exibido; em plataformas 2D, um ponto mapeia para um número de pixels que varia conforme a resolução do display; em visionOS, um ponto é um valor angular que permite ao conteúdo escalar conforme a distância do observador.
- Scale factor (densidade de pixel por ponto): @1x = 1:1 (10×10px); @2x = 2:1 (20×20px); @3x = 3:1 (30×30px). Displays de alta resolução exigem imagens com mais pixels.
- Forneça assets de alta resolução para todas as imagens bitmap, para cada device suportado, identificando o scale factor no nome do arquivo ("@1x", "@2x", "@3x") no asset catalog.
- Scale factors recomendados por plataforma: iPadOS/watchOS = @2x; iOS = @2x e @3x; visionOS = @2x ou superior; macOS/tvOS = @1x e @2x.
- Em geral, desenhe na resolução mais baixa e escale para cima para criar os assets de alta resolução; ao usar formas vetorizadas redimensionáveis, posicione pontos de controle em valores inteiros para alinhamento limpo no grid de raster em resoluções mais altas (2x e 3x são múltiplos de 1x).

Formatos
- Bitmap/raster: PNG desentrelaçado (de-interlaced).
- PNG que não precisa de cor 24-bit completa: paleta de cor 8-bit.
- Fotos: JPEG (otimizado conforme necessário) ou HEIC.
- Fotos estéreo/espaciais: Stereo HEIC.
- Ícones planos, ícones de interface e outro artwork "flat" que precisa escalar em alta resolução: PDF ou SVG.

Boas práticas
- Inclua um perfil de cor em cada imagem — ajuda a garantir que as cores do app apareçam como pretendido em diferentes displays.
- Sempre teste imagens numa variedade de devices reais — uma imagem que parece ótima em tempo de design pode parecer pixelada, esticada ou comprimida em devices variados.
- Automatize a geração dos múltiplos scale factors (@1x/@2x/@3x) a partir de uma única fonte vetorial no pipeline de build, em vez de exportar manualmente cada tamanho — reduz erro humano e mantém os assets sincronizados quando a arte original muda.

Platform considerations
- tvOS: imagens em camadas (layered images) são centrais na experiência da Apple TV — o sistema combina camadas, transparência, escala e movimento para dar sensação de realismo e vigor conforme o elemento entra em foco (parallax). O app icon do tvOS precisa usar imagem em camadas; para outras imagens focáveis (ex.: Top Shelf), é fortemente recomendado mas opcional. Uma imagem em camadas consiste em 2 a 5 camadas distintas; a separação entre camadas + transparência cria sensação de profundidade; ao interagir, camadas mais próximas da superfície elevam/escalam, sobrepondo camadas mais atrás.
  - Identifique elementos lógicos de primeiro plano, meio e fundo: primeiro plano para elementos proeminentes (personagem, texto em capa de álbum/pôster); meio para conteúdo secundário/efeitos como sombra; fundo como pano opaco que exibe primeiro plano/meio sem ofuscá-los.
  - Em geral, mantenha texto no primeiro plano para clareza.
  - Mantenha a camada de fundo opaca — usar opacidade variável para deixar conteúdo transparecer nas camadas superiores é aceitável, mas a camada de fundo precisa ser opaca (senão gera erro); garante boa aparência com parallax, sombras projetadas e fundos do sistema.
  - Mantenha as camadas simples e sutis — o parallax é feito para ser quase imperceptível; efeitos 3D excessivos parecem irreais e bruscos.
  - Deixe uma safe zone ao redor das camadas de primeiro plano — conteúdo pode ser cortado conforme a imagem escala/move ao ser focada.
  - Sempre visualize (preview) imagens em camadas usando Xcode, Parallax Previewer (macOS) ou Parallax Exporter (plug-in Photoshop); teste também numa TV real ao final.
- visionOS: pessoas podem visualizar imagens numa gama muito maior de tamanhos que em qualquer outra plataforma, e o sistema escala dinamicamente a resolução da imagem para o tamanho atual; pixels da imagem podem não bater 1:1 com pixels da tela, já que imagens podem ser posicionadas em ângulos específicos no espaço.
  - Crie um app icon em camadas (2-3 camadas com aparência de profundidade ao focar).
  - Prefira arte vetorial para imagens 2D — evite conteúdo bitmap porque pode não ficar bom ao ser escalado pelo sistema.
  - Se precisar rasterizar, balanceie qualidade e performance ao escolher resolução: uma imagem @2x fica boa em distâncias comuns de visualização mas, por ter resolução fixa (o sistema não escala dinamicamente), pode não ficar nítida de perto; resoluções maiores custam mais em tamanho de arquivo e podem afetar performance de runtime, especialmente acima de @6x — use filtro de imagem de alta qualidade acima de @2x.
  - Fotos e cenas espaciais: uma foto espacial é uma foto estereoscópica com metadados espaciais adicionais (capturada em iPhone 15 Pro+, Apple Vision Pro ou câmera compatível); uma cena espacial é uma imagem 3D gerada a partir de uma imagem 2D, adicionando efeito de parallax que responde ao movimento da cabeça.
  - Use o formato Stereo HEIC para exibir foto espacial; metadados espaciais nesse formato fazem o visionOS reconhecer a foto como espacial e aplicar tratamentos visuais que minimizam desconforto de visualização estéreo.
  - Prefira o efeito de fundo "feathered glass" para exibir texto sobre foto espacial — adiciona contraste para legibilidade e borra detalhe para reduzir desconforto visual.
  - Considere conforto visual ao criar cenas espaciais a partir de conteúdo 2D existente — metadados como ajuste de disparidade podem alterar a percepção 3D e causar desconforto de certos ângulos.
  - Exiba fotos/cenas espaciais em views isoladas (sheet, janela separada) — evite exibi-las inline com outro conteúdo (causa desconforto visual); se precisar exibir inline, dê espaçamento generoso.
  - Use cenas espaciais para momentos específicos — cada cena pode levar vários segundos para ser gerada; evite exibir cenas espaciais demais de uma vez; prefira scroll views/paginação/ações explícitas para navegar entre fotos.
  - Ao exibir imersivamente, prefira UI mínima (ex.: legenda pequena + botão Back único, navegação por swipe).
  - Prefira exibir cenas espaciais maiores centralizadas no campo de visão da pessoa — cenas menores dão menos efeito de parallax e impactam menos.
- watchOS: em geral, evite transparência para manter arquivos de imagem pequenos (é mais eficiente incluir o fundo na imagem se ela sempre é composta sobre o mesmo fundo sólido); transparência é necessária em imagens de complication, ícones de menu e outros ícones de interface que servem como template images (o sistema usa a transparência para decidir onde aplicar cor).
  - Use PDFs com autoscaling para servir todos os tamanhos de tela com um único asset: desenhe para telas de 40mm/42mm a 2x; o WatchKit escala automaticamente conforme o tamanho do device (38mm=90%, 40mm=100%, 41mm=106%, 42mm=100%, 44mm=110%, 45mm=119%, 49mm=119%).

**Aplicação em web/extensão**
- Sirva imagens responsivas com `srcset`/`sizes` cobrindo 1x/2x/3x em vez de um único PNG grande fixo, espelhando a lógica de scale factor.
- Use SVG para ícones/ilustrações vetoriais e WebP/AVIF (com fallback JPEG) para fotos — evite PNG pesado para fotografia, mesma lógica de "formato certo por tipo de imagem".
- Sempre defina `width`/`height` (ou `aspect-ratio`) explícitos na tag `<img>` para evitar layout shift enquanto carrega, e sempre teste em devices/telas reais antes de publicar.
- Inclua `alt` descritivo em toda imagem informativa; `alt=""` só em imagens puramente decorativas — equivalente ao texto alternativo de acessibilidade.
- Incorpore o perfil de cor (sRGB) ao exportar imagens de marketing/landing page e evite depender de wide-gamut (P3) para elementos de UI crítica, já que a maioria dos monitores/navegadores ainda normaliza para sRGB — reserve P3 para hero images fotográficas onde o navegador suporta.

## Immersive experiences

**Essência.** Em visionOS, apps podem rodar no Shared Space (lado a lado com outros apps) ou transicionar para um Full Space com diferentes graus de imersão (mixed, progressive, full), sempre priorizando conforto e controle explícito da pessoa sobre o nível de imersão.

**Regras**

Imersão e passthrough
- Passthrough mostra o ambiente físico via câmeras externas do device em tempo real, ajudando a pessoa a se sentir confortável/conectada ao contexto físico.
- A pessoa pode usar a Digital Crown a qualquer momento para gerenciar conteúdo ou ajustar o passthrough: pressionar e segurar recentraliza conteúdo no campo de visão; clique duplo esconde brevemente todo o conteúdo e mostra passthrough total.
- O sistema muda automaticamente a opacidade do conteúdo em certas situações (ex.: se a pessoa chega perto demais de um objeto físico em imersão mista, o conteúdo à frente esmaece brevemente).
- Em experiências mais imersivas (progressive e full), o sistema define um boundary de aproximadamente 1,5 metro a partir da posição inicial da cabeça da pessoa; ao chegar perto desse limite, toda a experiência começa a esmaecer e o passthrough aumenta; ao ultrapassar, os visuais imersivos são substituídos no espaço pelo ícone do app, sendo restaurados quando a pessoa volta ao local original ou recentraliza a visão com a Digital Crown.

Estilos de imersão
- Dimmed passthrough: esmaece/tinge sutilmente o passthrough e outro conteúdo visível para trazer atenção ao app no Shared Space sem esconder outros apps, ou criar experiência mais focada em Full Space; é possível aplicar cor de tint customizada (passthrough é tingido de preto por padrão).
- Mixed immersion (Full Space): mistura conteúdo com passthrough sem definir boundary; quando a pessoa chega perto demais de um objeto físico, o sistema automaticamente torna o conteúdo próximo semi-opaco para manter consciência do ambiente; o app pode solicitar acesso a informação sobre objetos físicos próximos e layout do ambiente.
- Progressive immersion (Full Space): exibe um ambiente customizado que substitui parcialmente o passthrough; permite definir um range específico de imersão (padrão 120° a 360°, ou customizado) e exibir conteúdo em retrato ou paisagem; a pessoa usa a Digital Crown para ajustar o grau de imersão dentro do range; o sistema define automaticamente o boundary de ~1,5m ao transicionar.
- Full immersion (Full Space): exibe um ambiente customizado de 360° que substitui completamente o passthrough, transportando a pessoa para um novo lugar; o sistema também define o boundary de ~1,5m.

Boas práticas
- Ofereça múltiplas formas de usar o app/jogo — além da liberdade de escolha, é essencial suportar recursos de acessibilidade que personalizam a interação.
- Prefira lançar o app no Shared Space ou usar mixed immersion — permite que a pessoa referencie o app enquanto usa outros softwares e alterne com facilidade; se a experiência é fully immersive/progressive, lançar em mixed ou baseado em janela no Shared Space dá mais controle, deixando a pessoa escolher quando aumentar a imersão.
- Reserve imersão para momentos/conteúdo significativos — nem toda tarefa se beneficia de imersão, e nem toda tarefa imersiva precisa ser totalmente imersiva; as pessoas frequentemente querem permanecer situadas no ambiente enquanto usam outro software/recursos do sistema ao mesmo tempo.
- Ajude a engajar em momentos-chave independentemente do nível de imersão, usando pistas como esmaecimento, tingimento, movimento, escala e Spatial Audio — comece com pistas sutis e as intensifique só quando houver boa razão.
- Prefira tons sutis de tingimento (tint) no passthrough (visionOS 2+) — ajuda o ambiente físico a coordenar visualmente com o conteúdo e faz as mãos da pessoa parecerem pertencer à experiência; evite tints brilhantes/dramáticos que distraiam e diminuam a sensação de imersão.

Promovendo conforto
- Seja atento ao conforto visual: mesmo podendo posicionar conteúdo 3D em qualquer lugar em Full Space, prefira posicionar dentro do campo de visão da pessoa; exiba movimento de forma confortável para evitar distração, confusão ou desconforto.
- Escolha o estilo de imersão que suporta os movimentos que a pessoa pode fazer: pequenos movimentos (mudar peso do corpo, girar, sentar/levantar) são ok, mas movimento excessivo pode fazer o sistema interromper a experiência. Evite progressive/full, ou transicione de volta a mixed, se achar que a pessoa vai precisar se mover além do boundary de 1,5m.
- Evite encorajar movimento durante experiência progressive/full — algumas pessoas não querem ou não conseguem se mover (deficiência ou ambiente físico); desenhe formas de interagir sem se mover (ex.: trazer um objeto virtual para perto em vez de esperar a pessoa se aproximar).
- Em mixed immersion, evite obscurecer demais o passthrough — as pessoas usam passthrough para entender/navegar o ambiente físico; se objetos virtuais bloqueariam substancialmente a visão, use full ou progressive em vez de mixed.
- Adote ARKit se quiser misturar conteúdo customizado com o ambiente da pessoa (ex.: integrar conteúdo virtual ao ambiente, ou usar posição das mãos); dados sensíveis desse tipo exigem permissão explícita.

Transições entre estilos imersivos
- Desenhe transições suaves e previsíveis ao mudar de imersão — ajude a pessoa a se preparar com transições graduais que permitam rastrear a mudança visualmente; evite transições bruscas/desorientadoras.
- Deixe a pessoa escolher quando entrar/sair de uma experiência mais imersiva — entrar de repente em algo mais imersivo sem esperar pode ser desorientador; forneça uma ação clara para entrar/sair (ex.: botão "Exit" proeminente, como o Keynote no ambiente Rehearsal totalmente imersivo). Evite exigir controles do sistema para reduzir a imersão dentro da experiência.
- Indique o propósito de um controle de saída — deixe claro se ele retorna a um contexto anterior menos imersivo ou encerra a experiência de vez; se sair também fecha o app/jogo, considere oferecer controles para pausar ou salvar progresso antes de fechar.

Exibindo mãos virtuais
- Ao transicionar para Full Space, o app pode pedir permissão para esconder as mãos reais da pessoa e mostrar mãos virtuais representando-as.
- Prefira mãos virtuais que casem com características familiares — combine posições e gestos das mãos reais para que a interação continue natural.
- Use cautela com mãos virtuais maiores que as mãos da pessoa — podem impedir de ver o conteúdo de interesse e fazer as interações parecerem desajeitadas; mãos grandes demais também podem parecer desproporcionais e "muito perto do rosto".
- Se houver interrupção nos dados de hand-tracking, esmaeça as mãos virtuais e revele as mãos reais da pessoa — não deixe as mãos virtuais congeladas/não-responsivas; volte a mostrá-las com fade-in quando os dados de tracking retornarem.

Criando um ambiente
- Minimize conteúdo distrativo — para ajudar a imergir num objetivo primário (ex.: assistir a um vídeo), evite muito movimento ou detalhes de alto contraste no ambiente; quando quiser chamar atenção para uma área, use texturas/formas de alta qualidade ali e assets de menor qualidade/esmaecidos no resto.
- Ajude a distinguir objetos interativos por proximidade — objetos distantes tendem a não ser tocados; objetos próximos convidam à interação.
- Mantenha animação sutil — pequenos movimentos suaves (nuvens à deriva, transformações) enriquecem sem distrair; sempre evite muito movimento perto das bordas do campo de visão.
- Crie um ambiente expansivo, independentemente do lugar retratado — um ambiente pequeno/restritivo pode causar desconforto e até claustrofobia.
- Use Spatial Audio para criar atmosfera — evite repetição/looping excessivo; se a pessoa pode tocar outro áudio simultaneamente (ex.: assistindo a um filme), baixe ou pare o som ambiente do seu app.
- Em geral, evite usar uma imagem 360° flat para criar o ambiente — não dá sensação de escala; prefira meshes de objeto com iluminação e shaders para animações sutis (nuvens, folhas, reflexos).
- Ajude a pessoa a se sentir "no chão" — sempre forneça um mesh de plano de chão para não parecer que está flutuando; se precisar usar uma imagem 360° flat, adicionar um plano de chão ajuda no realismo.
- Minimize redundância de assets — usar o mesmo asset/modelo com frequência demais deixa o ambiente menos realista.
- Teste toda experiência imersiva com pessoas reais usando o hardware antes de lançar — desconforto visual/motion sickness varia muito entre indivíduos e raramente é totalmente previsível só em revisão de design.

**Aplicação em web/extensão**
- Não é diretamente aplicável (recurso exclusivo de visionOS/hardware espacial); ignore para produto web/extensão padrão.
- O princípio de "dar controle explícito de entrar/sair" de um modo mais intenso se traduz em: nunca force fullscreen/modal imersivo sem um botão claro de saída sempre visível, e deixe claro se o botão fecha o modal ou encerra o fluxo inteiro (equivalente a "indique o propósito de um controle de saída").
- O princípio "transições suaves, nunca bruscas" vale para qualquer modal/overlay full-screen na web — anime entrada/saída, nunca troque de estado instantaneamente.
- O princípio "minimize conteúdo distrativo para focar no essencial" se traduz em: ao abrir um modo de foco/apresentação (ex.: modo leitura, tela de apresentação em um painel), esconda navegação secundária e reduza ruído visual ao redor do conteúdo central.

## Inclusion

**Essência.** Um app inclusivo prioriza comunicação respeitosa e apresenta conteúdo/funcionalidade de forma que qualquer pessoa, com qualquer característica humana, consiga acessar e entender — design inclusivo é iterativo e exige empatia e disposição para revisar suposições.

**Regras**

Inclusivo por design
- Investigue objetivos e perspectivas das pessoas antes de desenhar, usando empatia para entender como perspectivas diferentes podem responder ao conteúdo/experiência que você cria.
- Considere perspectivas diversas: idade, gênero e identidade de gênero, raça e etnia, sexualidade, atributos físicos, atributos cognitivos, deficiências permanentes/temporárias/situacionais, idioma e cultura, religião, educação, opinião política/filosófica, contexto social e econômico.
- O objetivo não é apenas evitar conteúdo ofensivo — um app inofensivo não é necessariamente inclusivo; foque em inclusão, o que também ajuda a evitar conteúdo ofensivo como consequência.

Linguagem acolhedora
- Considere o tom da copy de diferentes perspectivas — o estilo de escrita comunica quase tanto quanto as palavras; um tom acadêmico, por exemplo, pode parecer que o app só acolhe pessoas com alto nível de educação. Busque ser claro, direto e respeitoso.
- Preste atenção em como se refere às pessoas: geralmente funciona bem usar "você"/"seu" para se dirigir diretamente; referir-se indiretamente como "o usuário"/"o jogador" pode parecer distante; reserve "nós"/"nosso" para representar o software/empresa (usar demais pode sugerir uma relação pessoal que soa insultante ou condescendente).
- Evite termos técnicos/especializados sem definição — deixam a escrita mais concisa mas excluem quem não conhece o termo; se precisar usá-los, defina-os primeiro e facilite consultar a definição.
- Substitua expressões coloquiais por linguagem simples — são culturalmente específicas e difíceis de traduzir; algumas têm origem excludente mesmo sem a pessoa saber (ex.: "peanut gallery", "grandfathered in" surgiram em contextos opressivos e continuam excluindo).
- Considere cuidadosamente antes de incluir humor — é altamente subjetivo e, como expressões coloquiais, difícil de traduzir entre culturas; risco de confundir quem não entende, irritar quem se cansa de encontrá-lo repetidamente, e insultar quem interpreta de forma diferente.
- Trate o design inclusivo como processo iterativo: revise periodicamente copy, imagens e fluxos existentes à luz de novo entendimento sobre como diferentes perspectivas os recebem, em vez de tratar uma auditoria inicial como suficiente para sempre.

Sendo acessível/aproximável (approachable)
- Um app aproximável não exige habilidades/conhecimento particular antes de usar, e dá um caminho claro para aprofundar o entendimento ao longo do tempo.
- Apresente uma interface clara e direta.
- Construa formas de aprender a usar o app — considere um fluxo de onboarding passo a passo para quem é novo, mas permita que outros pulem direto ao conteúdo que querem.

Identidade de gênero
- Ajude todos a se sentirem bem-vindos evitando referências desnecessárias a gênero específico (ex.: trocar "he or she" por linguagem neutra como "subscribers" em vez de pronomes de gênero — também ajuda a manter a frase inclusiva quando localizada para idiomas com pronomes de gênero).
- Evite referenciar gênero específico em avatar, emoji, glifo ou personagem de jogo quando possível — prefira dar ferramentas para a pessoa customizar como quiser.
- Ao precisar retratar pessoa/pessoas genéricas, use imagem humana não-gendrada (SF Symbols oferece glifos neutros como `person.crop.circle`, `person.3.fill`, `figure.wave`).
- A maioria dos apps não precisa saber o gênero da pessoa; se precisar (razões legais/de saúde), considere opções inclusivas como não-binário, autodeclarar e prefiro não dizer; considere também permitir especificar pronomes.

Pessoas e cenários
- Retratar diversidade humana é uma das formas mais notáveis de acolher todos — quando as pessoas se reconhecem numa experiência, se sentem menos excluídas e mais propensas a achar que vão se beneficiar dela.
- Ao criar copy/imagens representando pessoas, retrate uma gama de características/atividades humanas (ex.: app de fitness mostrando exercícios demonstrados por pessoas de diferentes etnias, tipos de corpo, idades, capacidades físicas); evite retratos estereotipados (ex.: só médicos homens, só enfermeiras mulheres, heróis/vilões que perpetuem estereótipos raciais/de gênero).
- Revise também os cenários/objetos mostrados — alto nível de afluência pode fazer sentido em alguns casos, mas em outros pode parecer deslocado; prefira, quando fizer sentido, lugares/casas/atividades/itens familiares e identificáveis para a maioria das pessoas.

Evitando estereótipos
- Todos carregam vieses e estereótipos, frequentemente inconscientes — o objetivo do design inclusivo é ficar ciente desses vieses para reconhecer onde podem influenciar decisões de design.
- Exemplo: um app de gerenciamento de acesso familiar que assume uma definição estereotipada de família (mulher, homem, filhos biológicos) comunica essa perspectiva em copy/imagens, excluindo quem tem família diferente.
- Nem toda suposição é fácil de identificar — ex.: perguntas de segurança baseadas em experiências específicas de cultura/capacidade (ex.: "qual foi sua matéria favorita na faculdade", "qual foi seu primeiro carro") excluem quem não compartilha esse contexto; prefira alternativas mais universais ("qual sua atividade favorita", "qual foi o nome do seu primeiro amigo", "que qualidade descreve você melhor").
- Basear decisões de design em estereótipos/suposições sempre leva a exclusão, porque generalizações não conseguem refletir a diversidade de perspectivas humanas.

Acessibilidade
- Um app/jogo inclusivo é acessível a todos — as pessoas dependem de recursos de acessibilidade da Apple (VoiceOver, Display Accommodations, legendas, Switch Control, Speak Screen) para personalizar seus devices às necessidades individuais.
- É essencial evitar presumir que uma deficiência impede alguém de querer aproveitar a experiência — essa suposição limita o público potencial; tornar cada experiência acessível dá a oportunidade de todos se beneficiarem.
- Cada deficiência é um espectro (ex.: deficiências visuais vão de baixa visão a cegueira completa, incluindo daltonismo, visão embaçada, sensibilidade à luz, perda de visão periférica).
- Todos podem experimentar deficiências — além das deficiências relacionadas ao envelhecimento, há deficiências temporárias (perda auditiva por infecção) e situacionais (não conseguir ouvir num trem barulhento) que afetam qualquer pessoa em algum momento.
- Evite imagens/linguagem que excluam pessoas com deficiência; ao representar variedade de pessoas, inclua pessoas com deficiência; evite linguagem que use uma deficiência para expressar qualidade negativa.
- Adote abordagem "pessoa primeiro" ao escrever sobre pessoas com deficiência — descreva conquistas/objetivos de um indivíduo antes de mencionar a deficiência; se escrever sobre pessoa/comunidade específica, descubra como ela se autoidentifica.

Idiomas
- As pessoas esperam customizar idioma/região do device (internacionalização primeiro, depois tradução/localização para locales específicos).
- Criar uma experiência inclusiva também ajuda a preparar para localização: linguagem simples, evitar referências de gênero desnecessárias, representar variedade de pessoas, evitar estereótipos/conteúdo específico de cultura colocam você em boa posição para localizar para mais idiomas. Usar SF Symbols para os glifos também ajuda (oferece glifos específicos de idioma e glifos compatíveis com LTR/RTL).
- Ao localizar, tenha atenção às cores usadas — cores têm significados culturais fortes (ex.: branco associado à morte/luto em alguns lugares, pureza/paz em outros); se usa cor para comunicar algo, garanta que a comunicação seja consistente em cada versão localizada.

**Aplicação em web/extensão**
- Escreva copy em segunda pessoa direta ("você") e evite jargão técnico sem explicação nos textos de UI e landing pages.
- Ao internacionalizar o produto, planeje para expansão/contração de texto entre idiomas (alemão e finlandês tendem a ser mais longos que inglês/português) desde o layout inicial, em vez de ajustar componentes depois que a tradução já quebrou o design.
- Evite emoji/humor como único veículo de informação crítica — pode não traduzir ou renderizar em todo navegador/idioma.
- Ao usar imagens de pessoas em banners/landing pages, cheque diversidade real e evite estereótipos de papel/ocupação; revise também os cenários/objetos de fundo (afluência excessiva pode parecer deslocada).
- Estruture formulários evitando campos de gênero binário sem necessidade; se precisar, ofereça opção neutra/autodeclaração, e evite perguntas de segurança culturalmente específicas.
- Ao escrever textos de onboarding/tour de produto, permita pular direto ao app para quem já sabe usar, e ofereça passo a passo só para quem quer — espelhando "seja aproximável: ensine, mas deixe pular".
- Prefira ícones/glifos neutros (sem gênero) em avatares default e ilustrações de estado vazio, e use SF-Symbols-like neutros (figuras humanas genéricas) em vez de bonecos claramente masculinos/femininos por padrão.

## Layout

**Essência.** Um layout consistente e adaptável — a diferentes tamanhos de tela, orientações e estados de multitarefa — ajuda as pessoas a entender o conteúdo desde a abertura do app, com relações familiares entre controles e conteúdo.

**Regras**

Hierarquia visual
- Ordene conteúdo por importância relativa — as pessoas geralmente começam vendo conteúdo em ordem de leitura (de cima para baixo, do lado leading para o trailing), então coloque os itens mais importantes perto do topo e do lado leading da janela/tela; prefira componentes-padrão do sistema que adaptam automaticamente a ordem natural de leitura em idiomas RTL.
- Alinhe elementos para facilitar a varredura visual (scan), e use indentação para transmitir hierarquia — alinhamento deixa o app organizado e ajuda a acompanhar conteúdo ao rolar/mover os olhos; pessoas assumem que itens alinhados estão relacionados e que itens indentados são subordinados ao item que os precede.
- Agrupe itens relacionados para expressar claramente informação/função relacionada — use espaço negativo, formas de contêiner ou linhas separadoras para mostrar quais elementos estão relacionados e quais não estão.
- Use progressive disclosure para deixar layouts mais limpos e fáceis de interagir — uma interface com conteúdo/opções demais dificulta achar informação e entender as escolhas disponíveis; use disclosure triangles, menus ou nested views para reduzir quanto conteúdo exibir de início, ou seções roláveis (útil especialmente para apps de mídia como vídeo/música/livros).
- Diferencie controles do conteúdo — aproveite o material Liquid Glass (nas plataformas que suportam) para dar aparência distinta aos controles; em vez de aplicar fundo sólido/semi-opaco sob controles, use um scroll edge effect para elevar controles visualmente acima do conteúdo. Para conteúdo de fundo full-screen, estenda-o por baixo de sidebars, toolbars e tab bars para preencher toda a tela/janela.
- Se escalar uma imagem de fundo até a borda da janela resultar em componentes (sidebars, inspectors) cobrindo partes importantes da imagem, use um background extension effect, que espelha e borra a imagem por baixo dos componentes adjacentes, dando a impressão de que o fundo se estende sob eles.

Adaptabilidade
- Apps precisam se adaptar a diferentes tamanhos de tela, mudanças de orientação, tamanhos de janela e estados de multitarefa. Em iOS/iPadOS/tvOS/visionOS, o sistema define características do ambiente do device que afetam a aparência do app; use SwiftUI ou Auto Layout para garantir adaptação.
- Características comuns a lidar: size classes horizontal/vertical (regular/compact), diferentes tamanhos de tela de device, diferentes orientações/proporções de tela, recursos do sistema como a Dynamic Island, suporte a display externo, Display Zoom e janelas redimensionáveis em iPad/Mac, mudanças de tamanho de texto, recursos de internacionalização baseados em locale (direção LTR/RTL, formatação de data/hora/número, variação de fonte, tamanho do texto).
- Desenhe um layout que se adapte com graça e consistência — as pessoas esperam que a experiência permaneça familiar ao girar o device, redimensionar uma janela, adicionar outro display ou trocar de device. Respeite safe areas, margens e guias definidas pelo sistema (onde disponíveis) e especifique modificadores de layout para ajustar finamente o posicionamento das views.
- Mesmo um app travado numa orientação específica (ex.: jogo só-paisagem) ainda precisa redimensionar bem em diferentes devices e tamanhos de janela.
- Esteja preparado para mudanças de tamanho de texto: as pessoas usam Dynamic Type para aumentar o texto — apps que não respondem podem ficar difíceis ou impossíveis de usar. Ajuste o layout para acomodar texto maior: views horizontalmente adjacentes podem precisar empilhar verticalmente; linhas de tabela/contêineres podem precisar crescer em altura para não cortar texto; linhas com uma única linha de texto por padrão podem precisar crescer verticalmente para acomodar múltiplas linhas.
- Visualize (preview) o app em múltiplos devices, usando diferentes size classes, localizações e tamanhos de texto — teste primeiro os layouts maior e menor; use um device simulado no Device Hub para checar cortes e outros problemas de layout (ex.: iPad redimensionado ou iPhone Mirroring no Mac).
- Ao necessário, escale artwork de fundo em resposta a mudanças de exibição — ver o app numa proporção de tela diferente pode cortar/pilarboxar/letterboxar o artwork; nunca mude a proporção do artwork, apenas escale para preencher completamente a tela (janelas podem ficar muito largas/curtas ou altas/estreitas, então o artwork de fundo pode precisar se estender além do que é tipicamente visível numa proporção mais padrão).

Size classes (iOS/iPadOS)
- Cada dimensão (horizontal e vertical) é representada por uma de duas size classes: compact ou regular. A horizontal determina se o app é estreito (compact) ou largo (regular); a vertical determina se é curto (compact) ou alto (regular).
- O sistema define as size classes com base no tipo de device, configuração de janela e estado de multitarefa (ex.: full screen, Slide Over, espelhado de iPhone para Mac); dependendo do ambiente, apps podem existir em qualquer combinação de size classes (compact×compact, compact×regular, regular×compact, regular×regular).
- Determine o layout com base em size classes, não em tipo de device ou orientação — size classes descrevem o espaço realmente disponível, independentemente de retrato/paisagem; orientação e "idiom" do device não são úteis para decisões de layout porque não informam quanto espaço está disponível.
- Considere todas as combinações possíveis de size classes, em retrato e paisagem — um layout desenhado só para paisagem com largura regular/altura compact no iPhone pode não aproveitar o espaço vertical disponível no iPad em paisagem com altura regular; da mesma forma, desenhar exclusivamente para retrato compact pode deixar espaço sobrando quando a janela do iPad é redimensionada para largura regular.
- Mantenha a funcionalidade igual conforme as size classes mudam, e mantenha as mudanças de layout reconhecíveis/familiares à plataforma — não altere funcionalidade com base no espaço ocupado, mas pode mudar a quantidade de funcionalidade visível na tela (ex.: trocar tab bar por sidebar, ou expor funcionalidade que ficaria num menu de overflow, em espaços maiores).
- O idiom do app (o tipo de device para o qual foi feito) permanece o mesmo mesmo quando as size classes mudam ao redimensionar — mantenha o layout reconhecível e familiar à plataforma mesmo ao redimensionar.

Guias e safe areas
- Um layout guide define uma região retangular que ajuda a posicionar, alinhar e espaçar conteúdo na tela; o sistema inclui guias predefinidas que facilitam aplicar margens-padrão ao redor do conteúdo e restringir a largura do texto para leitura ideal; também é possível definir guias customizadas.
- Uma safe area define a área dentro de uma janela que não é coberta na borda por um recurso de hardware ou outra view dentro da janela (toolbar, tab bar, status bar). Respeitar a safe area é essencial para que UI do sistema e recursos de hardware (ex.: Dynamic Island) não obstruam conteúdo/controles.

Platform considerations
- macOS: evite colocar controles ou informação crítica na parte inferior da janela — as pessoas costumam mover janelas de forma que a borda inferior fique abaixo da tela; evite exibir conteúdo atrás do camera housing na borda superior da janela.
- tvOS: adira à safe area da tela — recue o conteúdo primário 60 pontos do topo/base da tela e 80 pontos das laterais, garantindo visibilidade independentemente de configurações de compatibilidade de TV ou corte por overscan. Inclua padding apropriado entre elementos focáveis (um elemento aumenta ao ganhar foco — cuide para não sobrepor informação importante).
- Grids (tvOS): grid de 2 colunas usa 860pt de largura de conteúdo não focado, 40pt de espaçamento horizontal, mínimo 100pt de espaçamento vertical (também há especificações para 3 a 9 colunas). Inclua espaçamento vertical adicional para linhas com título (espaço entre o fim da linha anterior não focada e o centro do título, e entre o fim do título e o topo dos itens não focados da linha). Use espaçamento consistente — espaçamento inconsistente deixa de parecer um grid e dificulta a varredura. Deixe o conteúdo parcialmente escondido simétrico (mesma largura visível em cada lado da tela) para direcionar atenção ao conteúdo totalmente visível.
- visionOS: em geral, suporte redimensionamento de janelas/volumes (comportamento padrão, como em macOS/iPadOS) — garanta que o layout se adapte bem conforme o tamanho muda, preferindo manter o conteúdo horizontalmente centralizado em tamanhos muito grandes. Pode definir tamanho mínimo/máximo para janelas, volumes e elementos anexados (ornaments) para evitar sobreposição em tamanhos pequenos e evitar layouts grandes demais — mas não use isso como forma de impedir redimensionamento (ex.: no Safari, a barra de navegação customizada em ornament tem tamanho máximo fixo para manter controles acessíveis, mas a janela em si é redimensionável).
  - Use conteúdo 3D com moderação em janelas — reserve para momentos significativos ao lado de conteúdo 2D; ao exibir inline, posicione-o inset dentro da janela para evitar colisão ou aparecer imprevisivelmente fora da borda da janela. Para modelos maiores ou views majoritariamente 3D, considere usar um volume ou espaço imersivo.
  - Exiba conteúdo suplementar numa janela adjacente, não num ornament — ornaments são melhores para controles interativos específicos do app (toolbars, controles de reprodução de vídeo), não para conteúdo suplementar; abra uma nova janela ao lado usando `defaultWindowPlacement(_:)`.
  - Inclua espaço suficiente ao redor de controles para facilitar interação — espaço suficiente identifica claramente o controle e evita que o efeito de hover do sistema obscureça outro conteúdo; ex.: posicione botões com centros a pelo menos 60 pontos de distância.
- watchOS: evite colocar mais de 2-3 controles lado a lado — regra geral: no máximo 3 botões com glifo, ou 2 botões com texto, numa linha (geralmente é melhor deixar botões de texto ocuparem a largura total da tela, mas dois botões lado a lado com rótulos curtos também funcionam, desde que a tela não role). Suporte autorotação em views que a pessoa pode querer mostrar a outros — ao virar o pulso, os apps normalmente dormem a tela, mas em alguns casos faz sentido autorotacionar o conteúdo (ex.: mostrar uma imagem ou QR code a alguém).

**Aplicação em web/extensão**
- Estruture layout com CSS Grid/Flexbox reagindo a breakpoints reais de largura disponível (equivalente a size classes), não a "tipo de dispositivo" hardcoded via user-agent sniffing.
- Reserve o topo/início da página (esquerda em LTR) para o conteúdo/ação mais importante; use indentação e agrupamento visual (cards, divisores) para expressar hierarquia, e use progressive disclosure (accordions, "mostrar mais") para reduzir conteúdo inicial em telas densas.
- Ao aumentar o zoom/tamanho de fonte do navegador, garanta que texto não seja cortado — use `overflow: visible`, `min-height` flexível em vez de altura fixa, espelhando a regra de acomodar Dynamic Type.
- Diferencie visualmente controles fixos (header sticky, toolbar) do conteúdo rolável usando leve blur/sombra em vez de apenas cor sólida idêntica ao fundo, e mantenha layout e funcionalidade consistentes ao redimensionar a janela do navegador (não escondendo funcionalidade essencial, só reorganizando visualmente).
- Ao escalar uma imagem de fundo (hero banner) para preencher larguras de viewport muito variadas, use `object-fit: cover` para preencher sem distorcer a proporção, nunca `fill`/esticar — espelha "nunca distorça a proporção do artwork de fundo".
- Respeite a "safe area" equivalente na web: não deixe conteúdo interativo colado nas bordas extremas da viewport em mobile (considere `env(safe-area-inset-*)` em PWAs/apps com notch) e mantenha margem lateral mínima de 16px.

## Materials

**Essência.** Materiais criam profundidade e hierarquia visual entre primeiro plano e fundo, deixando cor passar do fundo para o primeiro plano. Liquid Glass é o material dinâmico que unifica a linguagem visual entre plataformas, para controles/navegação; materiais padrão (blur, vibrancy) diferenciam conteúdo dentro da própria camada de conteúdo.

**Regras**

Liquid Glass
- Liquid Glass forma uma camada funcional distinta para controles e navegação (tab bars, sidebars) que flutua acima da camada de conteúdo, estabelecendo hierarquia visual clara entre elementos funcionais e conteúdo; permite que o conteúdo role e "espie" por baixo desses elementos, dando sensação de dinamismo e profundidade, mantendo legibilidade de controles/navegação.
- Não use Liquid Glass na camada de conteúdo — funciona melhor quando dá distinção clara entre elementos interativos e conteúdo; incluir na camada de conteúdo gera complexidade desnecessária e hierarquia visual confusa. Use materiais-padrão para elementos na camada de conteúdo (ex.: fundos de app). Exceção: controles na camada de conteúdo com elemento interativo transitório (sliders, toggles) ganham aparência Liquid Glass ao serem ativados, para enfatizar sua interatividade.
- Use efeitos Liquid Glass com moderação — componentes-padrão dos frameworks de sistema já adotam a aparência/comportamento desse material automaticamente; se aplicar a um controle customizado, faça com moderação (Liquid Glass busca trazer atenção ao conteúdo por baixo, e usá-lo demais em múltiplos controles customizados distrai desse conteúdo). Limite a elementos funcionais realmente importantes.
- Use a variante clear de Liquid Glass só em componentes sobre fundos visualmente ricos. Há duas variantes: regular e clear, cuja aparência responde a certas configurações do sistema (aparência preferida de Liquid Glass, redução de transparência, aumento de contraste).
  - Regular: borra e ajusta a luminosidade do conteúdo de fundo para manter legibilidade do texto/elementos de primeiro plano; scroll edge effects reforçam a legibilidade borrando/reduzindo opacidade do conteúdo de fundo. A maioria dos componentes do sistema usa essa variante; use quando o fundo pode gerar problemas de legibilidade ou quando o componente tem bastante texto (alertas, sidebars, popovers).
  - Clear: altamente translúcida, ideal para priorizar a visibilidade do conteúdo por baixo e manter elementos de fundo visualmente ricos em destaque; use para componentes que flutuam sobre fundos de mídia (fotos, vídeos), criando experiência de conteúdo mais imersiva.
  - Para contraste/legibilidade ótimos com clear Liquid Glass: se o conteúdo por baixo é claro, considere adicionar uma camada de dimming escura de 35% de opacidade; não é necessário se o conteúdo já é suficientemente escuro, ou se você usa controles-padrão de reprodução do AVKit (que já fornecem sua própria camada de dimming).

Materiais-padrão
- Use materiais e efeitos padrão — blur, vibrancy e blend modes — para transmitir estrutura no conteúdo abaixo do Liquid Glass.
- Escolha materiais/efeitos com base em significado semântico e uso recomendado, não pela cor aparente que imprimem à interface (configurações do sistema podem mudar aparência/comportamento) — combine o material/estilo de vibrancy ao seu caso de uso específico.
- Ajude a garantir legibilidade usando cores vibrantes (vibrancy do sistema) sobre materiais — evita se preocupar com cores parecendo escuras/brilhantes/saturadas/de baixo contraste demais em contextos diferentes.
- Considere contraste e separação visual ao escolher um material para combinar com blur/vibrancy: materiais mais espessos (mais opacos) podem dar melhor contraste para texto e elementos com detalhes finos; materiais mais finos (mais translúcidos) ajudam a manter contexto, dando um lembrete visível do conteúdo no fundo.

Platform considerations
- iOS/iPadOS: além de Liquid Glass, continuam fornecendo 4 materiais-padrão para a camada de conteúdo — ultraThin, thin, regular (default), thick. Também definem cores vibrantes para labels, fills e separators desenhadas para funcionar com cada material; labels e fills têm vários níveis de vibrancy (default = mais contraste, quaternary quando existe = menos contraste); separators têm um nível único. Evite usar quaternary sobre materiais thin/ultraThin (contraste baixo demais). Valores de label: `label` (default), `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel`; valores de fill: `fill` (default), `secondaryFill`, `tertiaryFill`.
- macOS: fornece vários materiais-padrão com propósitos designados e versões vibrantes de todas as cores do sistema. Escolha quando permitir vibrancy em views/controles customizados, testando em vários contextos. Escolha um blending mode de fundo que complemente o design: "behind window" e "within window".
- tvOS: Liquid Glass aparece por toda a navegação e experiências de sistema (Top Shelf, Control Center); elementos como image views e botões adotam Liquid Glass ao ganhar foco. Além disso, continua oferecendo materiais-padrão para dar estrutura na camada de conteúdo: ultraThin (views full-screen que precisam de esquema de cor claro), thin (views de overlay que obscurecem parcialmente conteúdo, esquema claro), regular (views de overlay que obscurecem parcialmente conteúdo), thick (views de overlay, esquema escuro).
- visionOS: janelas geralmente usam um material de sistema não-modificável chamado glass, que ajuda a pessoa a se manter situada deixando luz, o Environment atual, conteúdo virtual e objetos do ambiente físico transparecerem; glass é adaptativo, limitando a faixa de informação de cor do fundo para que a janela continue dando contraste ao conteúdo do app enquanto fica mais clara/escura conforme o ambiente físico e outro conteúdo virtual. visionOS não tem uma configuração de Dark Mode distinta — em vez disso, glass adapta automaticamente à luminância dos objetos/cores por trás dele.
  - Prefira translucidez a cores opacas nas janelas — áreas de opacidade podem bloquear a visão, dando sensação de restrição e reduzindo consciência dos objetos virtuais/físicos ao redor.
  - Se necessário, escolha materiais que ajudem a criar separações visuais ou indicar interatividade: thin traz atenção a elementos interativos (botões, itens selecionados); regular ajuda a separar visualmente seções do app (sidebar, tabela agrupada); thick cria elemento escuro que permanece visualmente distinto sobre uma área com fundo regular.
  - Para manter legibilidade do conteúdo de primeiro plano sobre um material, visionOS aplica vibrancy a texto, símbolos e fills, com 3 valores: `label` (texto padrão), `secondaryLabel` (texto descritivo, notas de rodapé/subtítulos), `tertiaryLabel` (elementos inativos, só quando o texto não precisa de alta legibilidade).
- watchOS: use materiais para dar contexto em views modais full-screen (comuns em watchOS) — o contraste dado pelas camadas de material ajuda a orientar a pessoa no app e distinguir controles/elementos do sistema do restante do conteúdo. Evite remover ou substituir fundos de material fornecidos por padrão em modal sheets.

**Aplicação em web/extensão**
- Simule "Liquid Glass" em headers/toolbars fixos com `backdrop-filter: blur()` + leve transparência, reservando o efeito para nav/controles, nunca para blocos de conteúdo de leitura — espelha a regra "não use Liquid Glass na camada de conteúdo".
- Para overlays sobre mídia rica (foto/vídeo de fundo), use um painel translúcido com dimming escuro (~30-35% opacidade) para garantir legibilidade do texto por cima, replicando a regra da variante clear.
- Diferencie visualmente "camada de controle" (sticky nav, toolbar) da "camada de conteúdo" usando blur/opacidade, não apenas uma borda/sombra sutil, e escolha o nível de blur (mais opaco vs. mais translúcido) conforme a densidade de texto do elemento — mais texto pede mais opacidade para contraste.
- Use efeitos de blur/translucidez com moderação — aplicar `backdrop-filter` a muitos elementos simultaneamente pode custar performance de renderização e, visualmente, dilui a ênfase que o efeito deveria dar aos poucos elementos que realmente precisam se destacar.
- Respeite `prefers-reduced-transparency` (quando suportado) reduzindo blur/translucidez para usuários que preferem fundos mais sólidos, espelhando o suporte a Reduce Transparency do sistema.

## Motion

**Essência.** Animação bem-feita transmite status, dá feedback e enriquece a experiência — mas deve ser proposital, breve, opcional (nunca o único canal de informação essencial) e responder a configurações de acessibilidade e método de input.

**Regras**
- Adicione movimento com propósito, apoiando a experiência sem ofuscá-la — não adicione movimento só por adicionar; animação gratuita/excessiva distrai e pode fazer as pessoas se sentirem desconectadas ou fisicamente desconfortáveis.
- Torne o movimento opcional — nem todos podem ou querem experimentar o movimento no app/jogo, então é essencial não usá-lo como único canal de informação importante; complemente feedback visual também com haptics e áudio.

Fornecendo feedback
- Busque movimento de feedback realista que siga os gestos e expectativas das pessoas — em apps não-jogo, movimento preciso e realista ajuda a entender como algo funciona; feedback que não faz sentido pode desorientar (ex.: se algo é revelado deslizando de cima, não faz sentido dispensá-lo deslizando para o lado).
- Busque brevidade e precisão em animações de feedback — quando o feedback animado é breve e preciso, tende a parecer leve e discreto, muitas vezes comunicando informação mais efetivamente que animação proeminente (ex.: uma animação sucinta e precisamente ligada a uma ação bem-sucedida num jogo comunica a mensagem instantaneamente sem distrair do gameplay; em visionOS, ao tocar num panorama no Photos, ele se expande rápida e suavemente para preencher o espaço, ajudando a acompanhar a transição sem esperar).
- Em apps, em geral evite adicionar movimento a interações de UI que ocorrem com frequência — o sistema já fornece animações sutis para interações com elementos-padrão; para um elemento customizado, evite fazer as pessoas gastarem tempo extra prestando atenção a movimento desnecessário a cada interação.
- Deixe as pessoas cancelarem o movimento — na medida do possível, não as faça esperar uma animação terminar antes de poderem fazer algo, especialmente se vão vivenciar a animação mais de uma vez.
- Considere usar símbolos animados quando fizer sentido (SF Symbols 5+ permite aplicar animações a símbolos, inclusive customizados).

Aproveitando capacidades da plataforma
- Garanta que o movimento do jogo fique ótimo por padrão em cada plataforma suportada — manter um frame rate consistente de 30 a 60 fps tipicamente resulta numa experiência fluida e visualmente atraente; use as capacidades gráficas do device para habilitar configurações-padrão que permitam aproveitar o jogo sem precisar mudar configurações primeiro.
- Deixe as pessoas customizarem a experiência visual do jogo para otimizar performance ou duração de bateria — considere permitir trocar entre modos de energia quando o sistema detecta fonte de energia externa.
- Ao introduzir uma nova animação de assinatura (signature motion) para a marca, valide com testes de usuário se ela é lida rápido o bastante para não atrasar a percepção de conclusão de uma tarefa — motion de marca não deve competir com motion funcional.

Platform considerations
- visionOS: além de comunicar contexto sutilmente, chamar atenção para informação e enriquecer experiências imersivas, o movimento pode se combinar com profundidade para dar feedback essencial ao olhar para elementos interativos; como o movimento tende a ser grande parte da experiência, é crucial evitar distração, confusão ou desconforto.
  - Na medida do possível, evite exibir movimento nas bordas do campo de visão — as pessoas são particularmente sensíveis a movimento na visão periférica; além de distrair, pode causar desconforto por dar a sensação de que a pessoa ou seu ambiente está se movendo. Se precisar mostrar um objeto se movendo na periferia durante experiência imersiva, garanta que o nível de brilho do objeto seja parecido com o resto do conteúdo visível.
  - Ajude a manter conforto ao mostrar movimento de objetos virtuais grandes — se um objeto preenche muito do campo de visão (ocluindo boa parte do passthrough), as pessoas naturalmente o percebem como parte do ambiente; para ajudar a perceber o movimento sem achar que elas/o ambiente estão se movendo, aumente a translucidez do objeto (deixa ver através) ou reduza seu contraste. É possível sentir desconforto mesmo ao mover-se um objeto grande por conta própria (ex.: uma janela) — considerar manter o tamanho da janela relativamente pequeno também ajuda.
  - Considere usar fades ao precisar reposicionar um objeto — quando um objeto se move de um local a outro, as pessoas naturalmente observam o movimento; se esse movimento não comunica nada útil, esmaeça o objeto antes de movê-lo e traga-o de volta com fade depois de posicionado.
  - Em geral, evite deixar as pessoas rotacionar um mundo virtual — quando um mundo virtual rotaciona, a experiência tipicamente perturba a sensação de estabilidade, mesmo quando a pessoa controla a rotação e o movimento é sutil; considere usar mudanças direcionais instantâneas durante um fade-out rápido.
  - Considere dar um referencial estacionário — é mais fácil lidar com movimento visual quando ele é contido numa área que não se move; em contraste, se toda a área ao redor parecer se mover (ex.: jogo que move o jogador automaticamente pelo espaço), a pessoa pode passar mal.
  - Evite mostrar objetos que oscilam de forma sustentada — em particular, evite oscilação com frequência próxima de 0,2 Hz, à qual as pessoas são muito sensíveis; se precisar mostrar oscilação, mantenha amplitude baixa e considere tornar o conteúdo translúcido.
- watchOS: SwiftUI oferece forma poderosa e simplificada de adicionar movimento ao app; para animar layout/mudanças de aparência via WatchKit ou criar sequências de imagem animadas, use `WKInterfaceImage`. Nota: todas as animações de layout/aparência incluem automaticamente easing embutido no início/fim, e esse easing não pode ser desligado nem customizado.

**Aplicação em web/extensão**
- Respeite `prefers-reduced-motion: reduce` — desative/reduza animações decorativas automaticamente quando o SO sinalizar essa preferência.
- Prefira transições de UI curtas e precisas (150-300ms) a animações longas e chamativas em botões, modais e menus — espelhando "brevidade e precisão em feedback".
- Nunca bloqueie a interação até uma animação terminar (ex.: spinner "engessado"); permita interromper/pular transições, e evite adicionar movimento a interações de UI muito frequentes (ex.: hover de cada item de lista) que o próprio CSS/framework já resolve com transição sutil padrão.
- Não use "auto-scroll" ou "auto-play" agressivo em carrosséis/banners sem controle de pausa visível — equivalente a "torne o movimento opcional".
- Para jogos/apps web pesados em Canvas ou WebGL, mire em 30-60fps consistentes e ofereça uma opção de qualidade gráfica reduzida para hardware mais fraco, espelhando a orientação de frame rate e configurações de performance de jogos nativos.
- Sincronize feedback de sucesso/erro com mais de um canal quando a ação for crítica (ex.: toast visual + som sutil opcional), nunca dependendo só da animação para comunicar que algo aconteceu, espelhando "torne o movimento opcional, complemente com outro canal".

## Privacy

**Essência.** Privacidade é inegociável: peça só o acesso que a funcionalidade realmente exige, no momento certo, seja transparente sobre uso de dados, e proteja o que a pessoa permitir acessar usando tecnologia de segurança do sistema.

**Regras**

Boas práticas
- Peça acesso somente a dados que a funcionalidade realmente precisa — pedir mais dados do que a funcionalidade exige, ou pedir antes de a pessoa demonstrar interesse na funcionalidade, dificulta construir confiança; torne os pedidos de permissão o mais específicos possível para dar controle preciso sobre os dados.
- Seja transparente sobre como o app coleta/usa os dados das pessoas — elas ficam menos confortáveis em compartilhar dados se não entendem exatamente como serão usados; sempre respeite escolhas como Hide My Email e Mail Privacy Protection, e entenda suas obrigações em relação a app tracking.
- Processe dados no device quando possível (ex.: usando o Apple Neural Engine e modelos CreateML customizados) — evita viagens de ida e volta longas e potencialmente arriscadas a um servidor remoto.
- Adote proteções de privacidade definidas pelo sistema e siga boas práticas de segurança (ex.: CloudKit provendo criptografia e gerenciamento de chaves para tipos de dado adicionais como strings, números e datas).

Solicitando permissão
- Exemplos de itens que exigem pedido de permissão: dados pessoais (localização, saúde, financeiro, contatos, outra informação de identificação pessoal); conteúdo gerado pela pessoa (emails, mensagens, dados de calendário, contatos, informação de gameplay, atividade do Apple Music, dados HomeKit, áudio/vídeo/foto); recursos protegidos (periféricos Bluetooth, automação residencial, conexões Wi-Fi, redes locais); capacidades do device (câmera, microfone); em visionOS rodando em Full Space, dados ARKit (hand tracking, estimativa de plano, ancoragem de imagem, world tracking); identificador de publicidade do device (suporta app tracking).
- O sistema fornece um alerta-padrão que exibe cada pedido; você fornece a copy que descreve por que o app precisa do acesso, e o sistema exibe essa descrição no alerta. As pessoas também podem ver/atualizar a escolha em Settings > Privacy.
- Peça permissão só quando o app claramente precisa do dado/recurso — é natural desconfiar de um pedido de informação pessoal/acesso a capacidade do device sem necessidade óbvia; idealmente, espere até a pessoa realmente usar uma funcionalidade que exige o acesso (ex.: use o location button para dar uma forma de compartilhar localização depois de indicar interesse numa funcionalidade que precisa disso).
- Evite pedir permissão no launch, a menos que o dado/recurso seja obrigatório para o app funcionar — as pessoas são menos incomodadas por um pedido no launch quando é óbvio o porquê (ex.: app de navegação pedindo localização faz sentido; um jogo em visionOS que deixa quicar objetos virtuais nas paredes do ambiente precisa de permissão de acesso ao ambiente antes de a pessoa poder jogar).
- Escreva copy que descreva claramente como o app usa a capacidade/dado/recurso solicitado. O alerta-padrão exibe sua copy (chamada de purpose string ou usage description string) depois do nome do app e antes dos botões de conceder/negar. Busque uma frase completa, breve, direta, específica e fácil de entender, em sentence case, evitando voz passiva, terminando com ponto final.
  - Exemplo bom: "The app records during the night to detect snoring sounds." (frase ativa que descreve claramente como e por que o app coleta o dado).
  - Exemplo ruim (vago/passivo): "Microphone access is needed for a better experience."
  - Exemplo ruim (imperativo sem justificativa): "Turn on microphone access."

Telas pré-alerta
- Se essencial dar detalhes adicionais, é possível exibir uma tela/janela customizada antes do alerta do sistema (aplicável a permissões de câmera, microfone, localização, contatos, calendário e tracking).
- Inclua só um botão, deixando claro que ele abre o alerta do sistema — as pessoas podem se sentir manipuladas se a tela custom também incluir um botão que não abre o alerta, ou usar um termo como "Allow" no título do botão custom (se o botão custom parecer semelhante em significado/peso visual ao botão "allow" do alerta, as pessoas podem escolher o "allow" do alerta sem querer). Use um termo como "Continue" ou "Next" no botão único, deixando claro que a ação é abrir o alerta do sistema.
- Não inclua ações adicionais na tela/janela customizada — por exemplo, não ofereça forma de sair da tela sem ver o alerta do sistema (opção de fechar/cancelar).

Pedidos de tracking
- App tracking é um assunto sensível. Em alguns casos, pode fazer sentido exibir uma tela customizada descrevendo os benefícios do tracking. Se quiser realizar tracking assim que a pessoa abre o app, o alerta-padrão do sistema precisa ser exibido antes de coletar qualquer dado de tracking.
- Nunca preceda o alerta-padrão do sistema com uma tela/janela customizada que possa confundir ou enganar as pessoas — elas às vezes tocam rápido para dispensar alertas sem ler; uma tela de mensagem customizada que se aproveita desse comportamento para influenciar a escolha leva à rejeição pela App Store review.
- Designs de tela customizada proibidos (causam rejeição): oferecer incentivos, exibir tela/janela que se parece com um pedido de permissão, exibir uma imagem do alerta, anotar a tela atrás do alerta.
- Não ofereça incentivos por conceder o pedido — não é permitido oferecer compensação por permitir tracking, nem reter funcionalidade/conteúdo ou deixar o app inutilizável até a pessoa permitir tracking.

Location button
- Em iOS/iPadOS/watchOS, o Core Location fornece um botão para a pessoa conceder autorização temporária de acessar sua localização no momento em que uma tarefa precisa dela; a aparência do botão pode variar para casar com a UI do app, mas sempre comunica a ação de compartilhamento de localização de forma instantaneamente reconhecível.
- Na primeira vez que a pessoa abre o app e toca no location button, o sistema exibe um alerta-padrão que ajuda a entender como usar o botão limita o acesso do app à localização, e lembra do indicador de localização que aparece quando o compartilhamento começa. Depois de confirmar o entendimento uma vez, simplesmente tocar no botão dá permissão de acesso pontual (one-time), sem precisar reconfirmar depois.
- Considere usar o location button para dar uma forma leve de compartilhar localização para funcionalidades específicas (ex.: anexar localização a uma mensagem/post, achar uma loja, identificar um prédio/planta/animal encontrado no local). Se você sabe que as pessoas costumam conceder "Allow Once", considere usar o location button para ajudá-las a se beneficiar do compartilhamento sem interagir repetidamente com o alerta.
- É possível customizar o location button para harmonizar com a UI: escolher o título-padrão que funciona melhor com a funcionalidade (ex.: "Current Location" ou "Share My Current Location"), escolher o glifo de localização preenchido ou contornado, selecionar cor de fundo e cor de título/glifo, ajustar o raio de canto do botão. Para manter reconhecimento/confiança, não é possível customizar outros atributos visuais do botão; o sistema também avisa sobre problemas como combinações de cor de baixo contraste ou translucidez demais, e é responsabilidade do dev garantir que o texto caiba no botão sem truncar em todos os tamanhos de acessibilidade e traduções.
- Se o sistema identificar problemas consistentes com um location button customizado, ele não dará acesso à localização do device quando a pessoa tocar; embora o botão ainda possa realizar outras ações específicas do app, as pessoas podem perder confiança no app se o location button não funcionar como esperado.
- Documente internamente qual funcionalidade dispara cada pedido de permissão e qual copy de justificativa usa, mantendo uma única fonte da verdade compartilhada entre design e engenharia — evita pedidos duplicados ou inconsistentes entre plataformas do mesmo produto.
- Revise periodicamente se alguma permissão pedida deixou de ser necessária (feature removida/trocada) e remova o pedido correspondente — pedir acesso a algo que o produto não usa mais corrói confiança tanto quanto pedir demais de início.

Protegendo dados
- Evite depender só de senhas para autenticação — onde possível, use passkeys para substituir senhas; se precisar continuar usando senhas, reforce a segurança exigindo autenticação de dois fatores; para proteger acesso a apps que a pessoa mantém logados no device, use identificação biométrica (Face ID, Optic ID, Touch ID).
- Armazene informação sensível num keychain — fornece experiência segura e previsível ao lidar com informação privada.
- Nunca armazene senhas ou outro conteúdo seguro em arquivos de texto plano — mesmo restringindo acesso via permissões de arquivo, a informação sensível está muito mais segura num keychain criptografado.
- Evite inventar esquemas de autenticação customizados — se o app exige autenticação, prefira recursos fornecidos pelo sistema como passkeys, Sign in with Apple ou Password AutoFill.

Platform considerations
- macOS: assine o app com um Developer ID válido (se distribuir fora da loja, identifica você como developer Apple e confirma que o app é seguro); proteja dados das pessoas com app sandboxing (obrigatório para todo app enviado à Mac App Store); evite presumir quem está logado (fast user switching pode ter múltiplas pessoas ativas no mesmo sistema).
- visionOS: por padrão, visionOS usa algoritmos ARKit para recursos como persistência, mapeamento do mundo, segmentação, matting e iluminação do ambiente — sempre rodando, permitindo que apps se beneficiem automaticamente do ARKit no Shared Space. ARKit não envia dados a apps no Shared Space; para acessar APIs ARKit, o app precisa abrir um Full Space. Recursos como Plane Estimation, Scene Reconstruction, Image Anchoring e Hand Tracking exigem permissão explícita da pessoa. Input da pessoa é privado por design — o sistema exibe automaticamente efeitos de hover ao olhar para componentes interativos, dando o feedback visual necessário sem expor para onde a pessoa está olhando antes de tocar. Acesso a câmeras funciona diferente em visionOS: a câmera traseira fornece input em branco (só disponível como conveniência de compatibilidade); a câmera frontal fornece input para Personas espaciais, mas só depois de permissão explícita — se um app iOS/iPadOS trazido para visionOS tem uma funcionalidade que precisa de câmera, remova-a ou substitua por uma opção de importar conteúdo.

**Aplicação em web/extensão**
- Peça permissões do navegador (localização, câmera, notificações, storage) apenas no momento de uso da funcionalidade correspondente, nunca no carregamento da página — espelha "peça permissão só quando o app claramente precisa".
- Extensão Chrome: solicite o menor escopo de permissões no manifest (`host_permissions` específicos em vez de `<all_urls>` quando possível) e explique no onboarding por que cada permissão é necessária, com copy clara e específica (equivalente à purpose string).
- Nunca armazene senha/token em `localStorage` em texto plano; prefira cookies `httpOnly`/`secure` ou storage criptografado do navegador — espelha "nunca armazene senhas em arquivo de texto plano".
- Seja transparente em banners de cookie/dados: frase clara do que é coletado e para quê, sem dark patterns (botão "aceitar" destacado e "recusar" escondido) — equivalente às telas pré-alerta proibidas de manipular a escolha.
- Prefira login via provedor confiável (Google/Microsoft/passkey via WebAuthn) a inventar fluxo de autenticação customizado — espelha "evite inventar esquemas de autenticação customizados, prefira passkeys/Sign in with Apple".
- Se a extensão/painel processa dados sensíveis, prefira processamento client-side (no navegador) quando possível, evitando enviar dado bruto a um servidor sem necessidade — espelha "processe dados no device onde possível".

## Right to left

**Essência.** Idiomas RTL (árabe, hebraico) exigem espelhar a interface de acordo com a direção de leitura; componentes-padrão do sistema já fazem isso automaticamente na maior parte dos casos, restando ajustes finos de layout, numerais, controles, imagens e ícones.

**Regras**

Alinhamento de texto
- Ajuste o alinhamento do texto para casar com a direção da interface, se o sistema não fizer isso automaticamente (ex.: texto alinhado à esquerda em LTR vira alinhado à direita em RTL).
- Alinhe um parágrafo (definido como 3+ linhas de texto) com base no idioma dele, não no contexto atual — quando o alinhamento de um parágrafo não bate com o idioma, fica difícil de ler (ex.: alinhar à direita um parágrafo em texto LTR dificulta ver o início de cada linha); continue alinhando blocos de 1-2 linhas conforme a direção do contexto atual, mas alinhe um parágrafo conforme seu idioma.
- Use um alinhamento consistente para todos os itens de texto de uma lista — para leitura/varredura confortável, reverta o alinhamento de todos os itens da lista, incluindo itens exibidos em script diferente.

Números e caracteres
- Diferentes idiomas RTL podem usar sistemas numéricos diferentes: hebraico usa numerais arábicos ocidentais; árabe pode usar numerais arábicos ocidentais ou orientais — o uso varia por país/região e até dentro da mesma região.
- Se o app cobre conceitos matemáticos ou tópicos numéricos, identifique a forma apropriada de exibir essa informação em cada locale suportado; apps que não abordam tópicos numéricos podem, em geral, confiar nas representações numéricas fornecidas pelo sistema.
- Não inverta a ordem dos numerais de um número específico — independentemente do idioma atual ou conteúdo ao redor, os dígitos de um número específico (ex.: "541", número de telefone, número de cartão de crédito) sempre aparecem na mesma ordem.
- Inverta a ordem de numerais que mostram progresso ou direção de contagem; nunca inverta os próprios numerais. Controles como progress bars, sliders e rating controls costumam incluir numerais para clarificar o significado — se usar numerais assim, inverta a ordem deles para casar com a direção do controle invertido. Também inverta uma sequência de numerais se ela é usada para comunicar uma ordem específica.

Controles
- Inverta controles que mostram progresso de um valor a outro — como as pessoas tendem a ver progresso "para frente" na mesma direção do idioma que leem, faz sentido inverter controles como sliders e indicadores de progresso no contexto RTL; ao fazer isso, inverta também a posição de glifos/imagens que representam os valores inicial e final do controle.
- Inverta controles que ajudam a navegar ou acessar itens em ordem fixa — ex.: no contexto RTL, um botão "voltar" precisa apontar para a direita para casar com a ordem de leitura do idioma RTL; da mesma forma, botões de próximo/anterior que dão acesso a itens numa lista ordenada precisam inverter em contexto RTL para casar com a ordem de leitura.
- Preserve a direção de um controle que se refere a uma direção real ou aponta para uma área da tela — ex.: um controle que significa "para a direita" precisa sempre apontar para a direita, independentemente do contexto atual.
- Balanceie visualmente scripts Latin e RTL adjacentes quando necessário — em botões, labels e títulos, texto árabe ou hebraico pode parecer pequeno demais ao lado de texto Latin em caixa alta, porque árabe e hebraico não têm maiúsculas; para balancear visualmente, costuma funcionar aumentar o tamanho da fonte árabe/hebraica em cerca de 2 pontos.

Imagens
- Evite inverter (flip) imagens como fotografias, ilustrações e artwork geral — inverter costuma mudar o significado da imagem; inverter uma imagem protegida por direitos autorais pode até ser uma violação. Se o conteúdo de uma imagem está fortemente conectado à direção de leitura, considere criar uma nova versão da imagem em vez de inverter a original.
- Inverta a posição de imagens quando a ordem delas for significativa — ex.: se você exibe múltiplas imagens numa ordem específica (cronológica, alfabética, favorita), inverta suas posições para preservar o significado da ordem em contexto RTL.

Ícones de interface
- Ao usar SF Symbols para ícones de interface, você já recebe variantes para o contexto RTL e símbolos localizados para árabe e hebraico, entre outros idiomas. Se criar símbolos customizados, é possível especificar sua direcionalidade.
- Inverta ícones de interface que representam texto ou direção de leitura — ex.: se um ícone usa barras alinhadas à esquerda para representar texto no contexto LTR, alinhe as barras à direita no contexto RTL.
- Considere criar uma versão localizada de um ícone de interface que exibe texto — alguns ícones incluem letras/palavras para comunicar um conceito relacionado a script (ex.: escolha de tamanho de fonte, assinatura); considere criar uma versão localizada nesses casos (SF Symbols já oferece versões diferentes dos símbolos de assinatura, texto formatado e cursor I-beam para uso com texto Latin, hebraico e árabe, entre outros).
- Se um ícone de interface customizado usa letras/palavras para comunicar um conceito não relacionado a leitura/escrita, considere desenhar uma imagem alternativa que não use texto.
- Inverta um ícone de interface que mostra movimento para frente ou para trás — quando algo se move na mesma direção que a pessoa lê, tipicamente é interpretado como "para frente"; quando se move na direção oposta, tende a ser interpretado como "para trás". Um ícone que representa um objeto se movendo para frente/trás precisa inverter no contexto RTL para preservar o significado do movimento (ex.: um ícone de alto-falante que mostra ondas sonoras emanando para frente — em LTR as ondas vêm da esquerda, então em RTL o ícone precisa inverter para mostrar as ondas vindo da direita).
- Não inverta logos, sinais e marcas universais — exibir um logo invertido confunde as pessoas e pode ter repercussões legais; as pessoas esperam que símbolos/marcas universais (ex.: checkmark) tenham aparência consistente, então evite inverter esses também.
- Em geral, evite inverter ícones de interface que retratam objetos do mundo real, a menos que use o objeto para indicar direcionalidade — ex.: relógios funcionam igual em todo lugar, então um ícone de relógio tradicional precisa parecer igual independentemente da direção do idioma; alguns ícones podem parecer referenciar direção de leitura por retratarem itens inclinados para uso destro, mas como a maioria das pessoas é destra, inverter um ícone que mostra uma ferramenta destra geralmente não é necessário e pode confundir.
- Antes de simplesmente inverter um ícone de interface customizado complexo, considere seus componentes individuais e o balanço visual geral — em alguns casos, um componente (badge, barra diagonal, lupa) precisa aderir a uma linguagem de design independente de localização (ex.: SF Symbols mantém consistência visual usando a mesma barra diagonal para representar proibição/negação em versões LTR e RTL). Em outros casos, pode ser necessário inverter um componente (ou sua posição) para garantir que a versão localizada do ícone ainda faça sentido — ex.: se um badge representa a UI real que a pessoa vê no app, ele precisa inverter se a UI inverter; se um badge modifica o significado de um ícone, considere se invertê-lo preserva tanto o significado modificado quanto o balanço visual geral do ícone.
- Se um ícone customizado inclui um componente que pode implicar destreza (ex.: uma ferramenta), considere preservar a orientação da ferramenta enquanto inverte a imagem-base, se necessário.

**Aplicação em web/extensão**
- Use propriedades lógicas de CSS (`margin-inline-start`, `padding-inline-end`, `text-align: start`) em vez de `left`/`right` fixos, para suportar `dir="rtl"` automaticamente.
- Ao dar suporte a árabe/hebraico, teste ícones direcionais (setas, "voltar", progress bar) espelhados; mantenha logos e ícones de status (check, alerta) sem espelhar — espelha a regra "nunca inverta logos ou marcas universais".
- Não inverta números dentro de strings (telefone, preço, código) mesmo em contexto RTL, e inverta apenas a ordem de sequências numéricas que indicam progresso/contagem (ex.: passos de um wizard), nunca os dígitos.
- Ao misturar texto Latin em caixa alta com árabe/hebraico num mesmo botão/título, considere aumentar levemente (1-2px) o tamanho da fonte RTL para balancear peso visual, espelhando a regra de +2pt no HIG.
- Defina `dir="rtl"` no elemento raiz (não só via CSS) para que o navegador ajuste corretamente scrollbars, seleção de texto e comportamento nativo de formulários, além do puro alinhamento visual.

## SF Symbols

**Essência.** SF Symbols é a biblioteca de milhares de símbolos consistentes e configuráveis que se alinham automaticamente com a fonte San Francisco em todos os pesos e tamanhos, usável em toolbars, tab bars, menus de contexto e dentro de texto.

**Regras**
- A disponibilidade de símbolos individuais e recursos varia conforme a versão do sistema visada — símbolos/recursos introduzidos num certo ano não estão disponíveis em sistemas operacionais anteriores.
- É proibido usar SF Symbols (ou imagens confusamente parecidas) em ícones de app, logos ou qualquer uso registrado/trademark.

Rendering modes
- 4 modos de renderização dão opções de aplicar cor: monochrome (uma cor em todas as camadas — os paths de um símbolo renderizam na cor especificada, ou como forma transparente dentro de um path preenchido de cor), hierarchical (uma cor, com opacidade variando por nível hierárquico da camada, criando profundidade), palette (2+ cores, uma por camada — se especificar só 2 cores para um símbolo com 3 níveis de hierarquia, as camadas secundária e terciária usam a mesma cor), multicolor (aplica cores intrínsecas a alguns símbolos para reforçar significado, ex.: `leaf` usa verde refletindo folhas no mundo físico, `trash.slash` usa vermelho para sinalizar perda de dados; alguns símbolos multicolor têm camadas que podem receber outras cores).
- Para suportar os modos de renderização, o SF Symbols organiza os paths de um símbolo em camadas distintas (ex.: `cloud.sun.rain.fill` tem 3 camadas: primária = nuvem, secundária = sol e raios, terciária = gotas de chuva).
- Independentemente do modo de renderização, usar cores fornecidas pelo sistema garante que os símbolos se adaptem automaticamente a acomodações de acessibilidade e modos de aparência como vibrancy e Dark Mode.
- Confirme que o modo de renderização de um símbolo funciona bem em todo contexto — dependendo de fatores como tamanho do símbolo e contraste com a cor de fundo atual, diferentes modos de renderização podem afetar quão bem as pessoas distinguem os detalhes; pode usar a configuração "automatic" para pegar o modo preferido do símbolo, mas ainda vale checar se um modo diferente melhoraria a legibilidade em algum lugar.

Gradientes e variable color
- Em SF Symbols 7+, gradient rendering gera um gradiente linear suave a partir de uma única cor-fonte; funciona em qualquer modo de renderização, cores de sistema/customizadas e símbolos customizados; gradientes renderizam em qualquer tamanho, mas ficam melhor em tamanhos maiores.
- Variable color representa uma característica que pode mudar ao longo do tempo (ex.: capacidade, força), independente do modo de renderização — aplica cor a diferentes camadas conforme um valor atinge diferentes limiares entre 0 e 100%. Ex.: usar variable color com `speaker.wave.3` para comunicar faixas de volume mapeando as camadas de onda para faixas de decibel; algumas camadas podem optar por não receber variable color (ex.: a camada do alto-falante em si não muda com o volume).
- Use variable color para comunicar mudança — não para comunicar profundidade (para isso, use hierarchical rendering).

Pesos e escalas
- 9 pesos de símbolo (ultralight a black) correspondem aos pesos da fonte San Francisco, permitindo casamento preciso de peso entre símbolos e texto adjacente, mantendo flexibilidade para diferentes tamanhos/contextos.
- 3 escalas: small, medium (padrão), large — definidas em relação à altura de caixa-alta (cap height) da fonte San Francisco.
- Especificar uma escala permite ajustar a ênfase de um símbolo em relação ao texto adjacente, sem atrapalhar o casamento de peso com texto do mesmo tamanho de ponto.

Variantes de design
- SF Symbols define várias variantes de design (fill, slash, enclosed) que ajudam a comunicar estados/ações precisos mantendo consistência visual e simplicidade na UI.
- Outline é a variante mais comum — um símbolo com contorno não tem áreas sólidas, parecendo com texto. A maioria dos símbolos também está disponível na variante fill, com áreas sólidas dentro de algumas formas.
- Além de outline e fill, há variantes com slash (barra diagonal, ex.: indicando desativado) ou que encerram o símbolo numa forma (círculo, quadrado, retângulo); enclosed e slash costumam se combinar com outline ou fill.
- SF Symbols oferece muitas variantes para idiomas/sistemas de escrita específicos: latim, árabe, hebraico, hindi, tailandês, chinês, japonês, coreano, cirílico, devanágari e vários sistemas numéricos índicos — adaptam automaticamente ao mudar o idioma do device.
- Uso recomendado das variantes: outline funciona bem em toolbars, listas e outros lugares onde o símbolo aparece ao lado de texto; símbolos com forma de fechamento (quadrado/círculo) melhoram legibilidade em tamanhos pequenos; as áreas sólidas da variante fill dão mais ênfase visual, boa escolha para tab bars de iOS e swipe actions e lugares onde a accent color comunica seleção. Em muitos casos, a própria view que exibe o símbolo já determina outline ou fill (ex.: tab bar de iOS prefere fill, toolbar prefere outline).

Animações
- SF Symbols oferece uma coleção de animações expressivas e configuráveis que reforçam a interface e adicionam vitalidade — comunicam ideias, dão feedback em resposta a ações e sinalizam mudanças de status/atividades em curso.
- Funcionam em todos os símbolos da biblioteca, em todos os modos de renderização, pesos e escalas, e em símbolos customizados. É possível controlar a reprodução (do início ao fim, ou indefinidamente repetindo até uma condição), customizar comportamentos (velocidade de reprodução, reverter antes de repetir).
- Tipos: Appear (emerge gradualmente); Disappear (recua gradualmente); Bounce (escala brevemente com movimento elástico para cima ou para baixo e volta ao estado inicial — toca uma vez por padrão, comunica que uma ação ocorreu/precisa ocorrer); Scale (muda o tamanho persistindo até definir nova escala ou remover o efeito — útil para chamar atenção a item selecionado); Pulse (varia a opacidade ao longo do tempo, animando por padrão só as camadas anotadas para pulsar, ou opcionalmente todas — útil para comunicar atividade contínua); Variable color (varia a opacidade de camadas incrementalmente, podendo ser cumulative — mudanças de cor persistem por camada até o ciclo terminar — ou iterative — mudanças ocorrem uma camada por vez; útil para progresso/atividade contínua como reprodução, conexão, transmissão; pode ser configurada para autoreverse; símbolos com camadas em loop fechado — como indicador de progresso circular — têm reprodução contínua e sem emenda); Replace (substitui um símbolo por outro, em 3 configurações: down-up = símbolo que sai escala para baixo e o que entra escala para cima, comunicando mudança de estado; up-up = ambos escalam para cima, comunicando progressão para frente; off-up = símbolo que sai desaparece imediatamente e o que entra escala para cima, enfatizando o próximo estado/ação); Magic Replace (transição inteligente entre dois símbolos com formas relacionadas — ex.: barras diagonais desenham/apagam, badges aparecem/desaparecem — é o padrão de substituição, mas não ocorre entre símbolos não relacionados, caindo de volta para down-up); Wiggle (move o símbolo para frente e para trás num eixo direcional — útil para destacar mudança ou chamada de ação que pode passar despercebida); Breathe (aumenta/diminui suavemente a presença do símbolo, dando qualidade viva — útil para mudanças de status ou atividade em curso como gravação); Rotate (rotaciona o símbolo inteiro ou só partes dele — ex.: um ventilador de mesa usa a opção "By Layer" para girar só as pás); Draw On / Draw Off (SF Symbols 7+, desenha o símbolo ao longo de um caminho por pontos-guia, de fora da tela para dentro ou vice-versa; pode desenhar todas as camadas de uma vez, escalonadas, ou uma por vez — útil para comunicar progresso como um download, ou reforçar o significado de uma seta direcional).
- Aplique animações de símbolo com moderação — não há limite de quantas animações adicionar a uma view, mas animações demais sobrecarregam a interface e distraem.
- Garanta que a animação sirva um propósito claro na comunicação da intenção do símbolo — cada tipo de animação tem um movimento discreto que comunica um tipo específico de ação ou provoca certa resposta; considere como as pessoas podem interpretar um símbolo animado e se a animação (ou combinação delas) pode confundir.
- Use animações de símbolo para comunicar informação mais eficientemente — fornecem feedback visual, reforçando que algo aconteceu na interface, e permitem apresentar informação complexa de forma simples sem ocupar muito espaço visual.
- Considere o tom do app ao adicionar animações — pense no que a animação comunica e como isso se alinha à identidade de marca e ao estilo/tom geral do app.

Símbolos customizados
- Se precisar de um símbolo que o SF Symbols não oferece, exporte o template de um símbolo parecido com o design desejado e modifique com uma ferramenta de edição vetorial.
- SF Symbols inclui símbolos protegidos por copyright que retratam produtos e recursos da Apple — você pode exibi-los no app, mas não pode customizá-los (a app SF Symbols marca símbolos não-customizáveis com um badge de ícone Info).
- Usando um processo chamado annotating, você atribui uma cor específica — ou um nível hierárquico específico (primary, secondary, tertiary) — a cada camada de um símbolo customizado; dependendo dos modos de renderização suportados, é possível usar um modo diferente em cada instância do símbolo no app.
- Use o template como guia — crie um símbolo customizado consistente com os do sistema em nível de detalhe, peso óptico, alinhamento, posição e perspectiva; busque um símbolo simples, reconhecível, inclusivo e diretamente relacionado à ação/conteúdo que representa.
- Atribua margens laterais negativas ao símbolo customizado se necessário — SF Symbols suporta margens laterais negativas para ajudar alinhamento horizontal óptico quando um símbolo contém um badge ou outros elementos que aumentam sua largura (ex.: ajuda a alinhar uma pilha de símbolos de pasta, algumas com badge). O nome de cada margem inclui a configuração relevante (ex.: "left-margin-Regular-M") — use esse padrão de nomenclatura ao adicionar margens.
- Otimize camadas para usar animações com símbolos customizados — se quiser animar por camada, anote as camadas na app SF Symbols; a ordem Z determina a ordem de aplicação de cor nas camadas de um símbolo variable color, podendo animar de frente-para-trás ou trás-para-frente; também é possível animar por grupos de camadas relacionadas se movendo juntas.
- Teste animações para símbolos customizados — é importante testar com todos os presets de animação porque formas/paths podem não aparecer como esperado durante o movimento; considere desenhar símbolos customizados com formas inteiras (ex.: em vez de criar um recorte para representar o espaço entre duas pessoas, desenhe a forma completa e um path deslocado, anotando-o depois como camada "erase").
- Evite criar símbolos customizados que incluam variantes comuns (enclosures ou badges) — use a component library da app SF Symbols para criar variantes comuns mantendo consistência de design.
- Forneça rótulos de texto alternativo para símbolos customizados — permitem que VoiceOver descreva a UI visível, facilitando navegação para quem tem deficiência visual.
- Não desenhe réplicas de produtos Apple — são protegidos por copyright, e você não pode customizar um símbolo identificado pelo SF Symbols como representando um recurso/produto Apple.
- Baixe a app SF Symbols para navegar o catálogo completo e entender termos/condições de uso antes de adotar símbolos em produção; consulte a documentação de developer para configurar e exibir símbolos corretamente na sua stack.
- Ao decidir entre um ícone-padrão do sistema e um customizado, prefira sempre o padrão quando ele comunica o conceito adequadamente — reduz trabalho de manutenção e já vem com suporte completo a Dynamic Type, RTL e acessibilidade.

**Aplicação em web/extensão**
- Para web, use uma biblioteca de ícones consistente (ex.: um único conjunto SVG) com o mesmo peso de traço em todo o produto — o equivalente a "não misturar pesos/estilos de símbolo".
- Combine peso visual do ícone com o peso da fonte adjacente (ícone muito fino ao lado de texto bold, ou vice-versa, quebra a hierarquia) — espelha a regra de casamento de peso entre símbolo e texto.
- Prefira variante "fill" para estado ativo/selecionado (aba ativa, item marcado) e "outline" para estado padrão — o mesmo padrão usado em tab bars/toolbars da Apple.
- Anime ícones (ex.: check ao concluir, spinner de carregamento) com moderação e propósito claro — nunca decorativo sem significado, espelhando "aplique animações de símbolo com moderação".
- Ofereça múltiplos tamanhos/escalas de ícone (small/medium/large equivalente) via variante de tamanho no componente, não escalando o mesmo SVG livremente sem ajuste de peso — em telas pequenas, um ícone pode precisar de traço proporcionalmente mais grosso para manter legibilidade.
- Ao construir um ícone customizado que representa "sem/negado" (equivalente ao slash de SF Symbols), use sempre a mesma barra diagonal/ângulo em todos os ícones do conjunto que expressam negação, para manter consistência de linguagem visual.

## Spatial layout

**Essência.** Em visionOS (Apple Vision Pro), o conteúdo é posicionado no espaço 3D usando campo de visão, profundidade e escala — sempre priorizando conforto visual, evitando desorientação e ancoragem indevida à cabeça da pessoa.

**Regras**

Campo de visão
- O campo de visão de uma pessoa é o espaço que ela pode ver sem mover a cabeça; as dimensões variam conforme fatores como a configuração do Light Seal e a acuidade periférica individual. O sistema não fornece informação sobre o campo de visão exato da pessoa.
- Centralize conteúdo importante dentro do campo de visão — por padrão, visionOS lança um app diretamente à frente da pessoa, já posicionando-o dentro do campo de visão. Em experiência imersiva, ajude a manter a atenção no conteúdo importante mantendo-o centralizado e não exibindo movimento distrativo ou objetos brilhantes/de alto contraste na periferia.
- Evite ancorar conteúdo à cabeça da pessoa (head-locked) — embora em geral você queira que o app permaneça dentro do campo de visão, ancorar conteúdo de forma que fique estaticamente à frente pode fazer a pessoa se sentir presa, confinada e desconfortável, especialmente se o conteúdo obscurece muito passthrough e diminui a sensação de estabilidade do ambiente. Em vez disso, ancore conteúdo no espaço da pessoa, dando liberdade de olhar ao redor naturalmente e ver diferentes objetos em locais diferentes.

Profundidade
- As pessoas confiam em pistas visuais como distância, oclusão e sombra para perceber profundidade e entender seu entorno. No Apple Vision Pro, o sistema usa automaticamente efeitos visuais como temperatura de cor, reflexos e sombra para ajudar a perceber a profundidade de conteúdo virtual; ao mover um objeto virtual no espaço — ou ao mudar de posição em relação a ele — esses efeitos mudam a profundidade aparente do objeto, tornando a experiência mais realista.
- Como as pessoas podem ver o conteúdo de qualquer ângulo, incorporar pequenas quantidades de profundidade por toda a interface — mesmo em janelas-padrão — ajuda a parecer mais natural. No SwiftUI, o sistema adiciona efeitos visuais a views numa janela 2D, dando aparência de profundidade.
- Se precisar apresentar conteúdo com profundidade adicional, use RealityKit para criar um objeto 3D — pode exibi-lo em qualquer lugar, ou usar um volume (componente que exibe conteúdo 3D, similar a uma janela mas sem frame visível).
- Forneça pistas visuais que comuniquem com precisão a profundidade do conteúdo — se as pistas estiverem ausentes ou entrarem em conflito com a experiência real da pessoa, pode causar desconforto visual.
- Use profundidade para comunicar hierarquia — um objeto que se destaca do conteúdo ao redor fica mais notável; as pessoas também tendem a notar mudanças de profundidade (ex.: quando um sheet aparece sobre uma janela, a janela recua no eixo z, deixando o sheet avançar e se tornar visualmente proeminente).
- Em geral, evite adicionar profundidade a texto — texto que parece flutuar acima do fundo é difícil de ler, o que desacelera a leitura e às vezes causa desconforto visual.
- Garanta que a profundidade agregue valor — use-a para clarificar e encantar, não em todo lugar; pense no tamanho e importância relativa dos objetos. Profundidade funciona bem para separar visualmente elementos grandes/importantes (ex.: destacar uma tab bar ou toolbar de uma janela), mas pode não funcionar tão bem em objetos pequenos (ex.: usar profundidade para destacar o símbolo de um botão do fundo pode deixar o botão menos legível/mais difícil de usar). Revise também a frequência de diferentes profundidades no app — as pessoas precisam refocar os olhos para perceber cada diferença de profundidade, e fazer isso com frequência/rapidez demais cansa.

Escala
- visionOS define dois tipos de escala para preservar a aparência de profundidade otimizando usabilidade: dynamic scale (mantém o conteúdo confortavelmente legível/interativo independente da proximidade — o sistema aumenta automaticamente a escala de uma janela conforme ela se afasta e diminui conforme se aproxima, fazendo-a parecer manter o mesmo tamanho a qualquer distância); fixed scale (o objeto mantém a mesma escala independente da proximidade, similar a como um objeto físico parece menor quando distante).
- Para suportar dynamic scaling e a aparência de profundidade, visionOS define um ponto como um ângulo, ao contrário de outras plataformas que definem ponto como número de pixels (varia com a resolução de um display 2D).
- Considere usar fixed scale quando quiser que um objeto virtual pareça exatamente como um objeto físico — ex.: manter a escala real de um produto para parecer mais realista quando visto no espaço da pessoa. Como conteúdo interativo precisa escalar para manter usabilidade conforme se aproxima/afasta, prefira aplicar fixed scale com moderação, reservando para objetos não-interativos que realmente precisam disso.

Boas práticas
- Teste todo ajuste de profundidade/escala com pessoas usando o hardware real antes de finalizar — a percepção de profundidade e o conforto variam por indivíduo mais do que em interfaces 2D tradicionais, tornando revisão só em tela plana insuficiente.
- Documente o range de distância de visualização esperado (perto/médio/longe) para cada tela do app, e valide legibilidade de texto/alvo de toque em cada extremo desse range — profundidade variável muda a experiência de forma que um layout 2D fixo não precisa considerar.
- Evite exibir janelas demais — pode obscurecer o ambiente da pessoa, dando sensação de sobrecarga, restrição e até desconforto; também torna incômodo relocar um app porque significa mover muitas janelas.
- Priorize gestos indiretos e padrão — um gesto indireto não exige mover a mão para o campo de visão; um gesto direto exige tocar fisicamente o objeto virtual, o que pode cansar, especialmente quando o objeto está na linha de visão ou acima dela. Em visionOS, gestos indiretos replicam gestos padrão já conhecidos e funcionam com qualquer objeto que a pessoa olhe, a qualquer distância. Se suportar gestos diretos, reserve para objetos próximos que convidam à inspeção/manipulação de perto por curtos períodos.
- Conte com a Digital Crown para ajudar a recentralizar janelas no campo de visão — ao mover/girar a cabeça, o conteúdo pode não aparecer mais onde a pessoa quer; ela pode pressionar a Digital Crown para recentralizar; o app não precisa fazer nada para suportar essa ação.
- Inclua espaço suficiente ao redor de componentes interativos para facilitar olhar para eles — ao olhar para um elemento interativo, visionOS exibe um efeito de hover visual que ajuda a confirmar que é o elemento desejado; é crucial ter espaço suficiente ao redor para tornar o olhar fácil e confortável, evitando que o efeito de hover atrapalhe conteúdo próximo. Ex.: posicione múltiplos botões de tamanho regular com centros a pelo menos 60 pontos de distância, deixando 16+ pontos de espaço entre eles; não deixe controles sobrepor outros elementos/views interativos (dificulta selecionar um único elemento).
- Deixe as pessoas usarem o app com movimento físico mínimo ou nulo — a menos que algum movimento físico seja essencial à experiência, ajude todos a aproveitarem permanecendo parados.
- Use o chão para ajudar a posicionar uma experiência imersiva grande — se a experiência inclui conteúdo que se estende a partir do chão, posicione-o usando um plano horizontal plano; alinhar esse plano com o chão ajuda a se misturar de forma integrada ao ambiente e dá experiência mais intuitiva.
- Não suportado em iOS, iPadOS, macOS, tvOS ou watchOS.
- Para aprofundar em windows e volumes em visionOS, consulte a página de Windows; para desenhar conteúdo dentro de uma janela ou volume, consulte a página de Layout específica de visionOS, que complementa estas diretrizes de posicionamento espacial.

**Aplicação em web/extensão**
- Não aplicável a produtos web 2D tradicionais (é específico de hardware espacial 3D).
- O princípio de "espaçamento mínimo entre alvos interativos para não sobrepor hover/foco" se traduz em: dar espaço suficiente (8-16px) entre botões/links clicáveis próximos na web, para não haver ambiguidade de foco/hover — espelha os 60pt de centro-a-centro / 16pt de espaço entre botões em visionOS.
- O princípio "evite exibir janelas demais" se traduz em: evite abrir múltiplos modais/popups simultâneos na web, que sobrecarregam e obscurecem o contexto da página.
- O princípio "use profundidade com moderação, evite em texto/objetos pequenos" se traduz em: reserve sombra/elevação (`box-shadow`, z-index) para separar blocos grandes (modal sobre página, dropdown sobre lista), não para decorar texto ou ícones pequenos — texto com sombra/relevo decorativo prejudica legibilidade do mesmo jeito que profundidade em texto no visionOS.
- O princípio "deixe usar com movimento físico mínimo" não se aplica a mouse/teclado, mas seu equivalente em extensão de navegador é: nunca exija que a pessoa navegue várias abas/janelas para completar uma ação simples — mantenha o fluxo dentro de um único popup/painel sempre que possível.
- O princípio "priorize gestos indiretos sobre diretos" se traduz, na web, em priorizar atalhos de teclado e cliques simples sobre interações que exigem precisão fina (arrastar-e-soltar complexo) para ações frequentes.
- O princípio "conte com um mecanismo de recentralização" (Digital Crown) se traduz em oferecer um atalho claro de "voltar ao topo" ou "resetar visualização" em painéis/dashboards com muito conteúdo ou zoom/pan customizado.

## Typography

**Essência.** Escolhas tipográficas garantem legibilidade, comunicam hierarquia de informação e expressam a marca — priorizando tamanhos mínimos legíveis, pesos adequados e suporte total a Dynamic Type.

**Regras**

Garantindo legibilidade
- Use tamanhos de fonte que a maioria das pessoas consiga ler facilmente, considerando várias distâncias de visualização e condições. Siga os tamanhos padrão/mínimo recomendados por plataforma (para fontes customizadas e do sistema): iOS/iPadOS 17pt/11pt; macOS 13pt/10pt; tvOS 29pt/23pt; visionOS 17pt/12pt; watchOS 16pt/12pt.
- Peso da fonte também impacta legibilidade — fonte customizada com peso fino deve mirar tamanhos maiores que o recomendado.
- Teste legibilidade em diferentes contextos — ex.: teste texto de jogo em cada plataforma suportada; se a legibilidade for difícil, considere tamanho maior, aumentar contraste (modificando texto/cores de fundo), ou usar tipografias desenhadas para legibilidade otimizada (como as fontes do sistema).
- Em geral, evite pesos de fonte leves — ao usar fontes do sistema, prefira Regular, Medium, Semibold ou Bold; evite Ultralight, Thin e Light (difíceis de ver, especialmente em texto pequeno).

Transmitindo hierarquia
- Ajuste peso, tamanho e cor da fonte conforme necessário para enfatizar informação importante e ajudar a visualizar hierarquia; mantenha a hierarquia relativa e distinção visual dos elementos de texto quando as pessoas ajustam tamanhos de texto.
- Minimize o número de tipografias usadas, mesmo numa interface altamente customizada — misturar tipografias demais pode obscurecer a hierarquia de informação e prejudicar legibilidade, além de deixar a interface parecendo inconsistente/mal projetada.
- Priorize conteúdo importante ao responder a mudanças de tamanho de texto — nem todo conteúdo é igualmente importante; quando alguém escolhe um tamanho de texto maior, geralmente quer facilitar a leitura do conteúdo que importa, não necessariamente aumentar toda palavra na tela (ex.: ao aumentar o tamanho do texto numa janela com abas, as pessoas não esperam que os títulos das abas cresçam junto; num jogo, as pessoas costumam se interessar mais pelo diálogo do personagem do que por valores de dano transitórios).

Usando fontes do sistema
- Apple fornece duas famílias tipográficas: San Francisco (SF, sans serif — variantes SF Pro, SF Compact, SF Arabic, SF Armenian, SF Georgian, SF Hebrew, SF Mono, e variantes arredondadas para coordenar com UI de cantos suaves) e New York (NY, serif, desenhada para funcionar bem sozinha e ao lado das fontes SF).
- As fontes vêm em formato de fonte variável (variable font), combinando diferentes estilos num único arquivo e suportando interpolação entre estilos para criar estilos intermediários. Fontes variáveis suportam optical sizing (tamanhos ópticos dinâmicos), que mescla tamanhos ópticos discretos (Text/Display) e pesos num design contínuo — normalmente não é preciso usar tamanhos ópticos discretos, exceto ao trabalhar com ferramenta de design sem suporte total ao formato de fonte variável.
- Fontes do sistema estão disponíveis numa variedade de pesos (Ultralight a Black) e — no caso de SF — larguras incluindo Condensed e Expanded; como SF Symbols usa pesos equivalentes, é possível atingir casamento preciso de peso entre símbolos e texto adjacente.
- O sistema define text styles (atributos tipográficos combinando peso da fonte, tamanho do ponto e valores de leading para cada tamanho de texto) que funcionam com ambas as famílias tipográficas — ex.: o estilo body usa valores que suportam leitura confortável em múltiplas linhas; headline usa tamanho/peso que ajuda a distinguir um título do conteúdo ao redor. Juntos, os text styles formam uma hierarquia tipográfica para expressar diferentes níveis de importância; também permitem que o texto escale proporcionalmente quando as pessoas mudam o tamanho de texto do sistema ou fazem ajustes de acessibilidade (ex.: Larger Text).
- Considere usar os text styles embutidos — dão forma conveniente e consistente de transmitir hierarquia de informação via tamanho/peso de fonte, e garantem suporte a Dynamic Type e tamanhos de acessibilidade maiores (onde disponível).
- Modifique os text styles embutidos se necessário: APIs de sistema definem ajustes de fonte (symbolic traits) que permitem modificar aspectos de um text style (ex.: o trait bold adiciona peso, criando outro nível de hierarquia); também é possível ajustar leading para melhorar legibilidade/economizar espaço (ex.: leading solto em colunas largas/passagens longas facilita acompanhar a linha; leading apertado ajuda a caber múltiplas linhas numa área de altura limitada como uma linha de lista — mas evite leading apertado se precisar exibir 3+ linhas, mesmo em área de altura limitada).
- Não embuta fontes do sistema no app — use as constantes definidas em `Font.Design` para acessar todas as fontes do sistema (ex.: `Font.Design.default` para a fonte do sistema em todas as plataformas, `Font.Design.serif` para New York).
- Se necessário, ajuste o tracking em mockups de interface — num app rodando, a fonte do sistema ajusta o tracking dinamicamente em cada tamanho de ponto; para produzir um mockup preciso de uma interface que usa as fontes variáveis do sistema, não é preciso escolher um tamanho óptico discreto em certos tamanhos de ponto, mas pode ser necessário ajustar o tracking (ver tabelas de tracking).

Usando fontes customizadas
- Garanta que fontes customizadas sejam legíveis — as pessoas precisam ler facilmente em várias distâncias e condições; guie-se pelos tamanhos mínimos recomendados por estilo/peso.
- Implemente recursos de acessibilidade para fontes customizadas — fontes do sistema suportam Dynamic Type (onde disponível) e respondem a recursos como Bold Text automaticamente; se usar fonte customizada, garanta que ela implemente os mesmos comportamentos.

Suportando Dynamic Type
- Dynamic Type é um recurso de nível de sistema em iOS/iPadOS/tvOS/visionOS/watchOS que permite ajustar o tamanho do texto visível no device para legibilidade e conforto.
- Garanta que o layout do app se adapte a todos os tamanhos de fonte — verifique se o design escala e se texto/glifos ficam legíveis em todos os tamanhos; teste com "Larger Accessibility Text Sizes" ativado (iPhone/iPad: Settings > Accessibility > Display & Text Size > Larger Text) e confirme que o app permanece confortavelmente legível.
- Aumente o tamanho de ícones de interface significativos conforme o tamanho da fonte aumenta — se usar ícones para comunicar informação importante, garanta que fiquem fáceis de ver em tamanhos de fonte maiores; SF Symbols já escala automaticamente com mudanças de Dynamic Type.
- Mantenha truncamento de texto no mínimo conforme o tamanho da fonte aumenta — em geral, busque exibir tanto texto útil no maior tamanho de acessibilidade quanto no maior tamanho padrão; evite truncar texto em regiões roláveis a menos que a pessoa possa abrir uma view separada para ler o resto; configure um label para usar quantas linhas forem necessárias para exibir uma quantidade útil de texto.
- Considere ajustar o layout em tamanhos de fonte grandes: quando o tamanho da fonte aumenta num contexto horizontalmente restrito, itens inline (glifos, timestamps) e limites de contêiner podem apertar o texto e causar truncamento/sobreposição — considere um layout empilhado onde o texto aparece acima de itens secundários; texto multi-coluna também pode ficar menos legível em tamanhos grandes devido a restrições de espaço horizontal — reduza o número de colunas conforme o tamanho da fonte aumenta.
- Mantenha uma hierarquia de informação consistente independentemente do tamanho de fonte atual — ex.: mantenha elementos primários perto do topo de uma view mesmo com fonte muito grande, para não perder o rastro desses elementos.

Platform considerations
- iOS/iPadOS: SF Pro é a fonte do sistema; apps também podem usar NY.
- macOS: SF Pro é a fonte do sistema; NY está disponível para apps Mac feitos com Mac Catalyst; macOS não suporta Dynamic Type. Quando necessário, use variantes dinâmicas de fonte do sistema para casar com o texto em controles-padrão (ex.: `controlContentFont`, `labelFont`, `menuFont`, `menuBarFont`, `messageFont`, `paletteFont`, `titleBarFont`, `toolTipsFont`, `userFont`, `userFixedPitchFont`, `boldSystemFont`, `systemFont`).
- tvOS: SF Pro é a fonte do sistema; apps também podem usar NY.
- visionOS: SF Pro é a fonte do sistema; se usar NY, é preciso especificar os text styles desejados. visionOS usa versões mais bold dos estilos Dynamic Type body e title, e introduz Extra Large Title 1 e Extra Large Title 2 para layouts editoriais largos.
  - Em geral, prefira texto 2D — quanto mais profundidade visual os caracteres têm, mais difícil ficam de ler; uma pequena quantidade de texto 3D pode dar um elemento visual divertido, mas para conteúdo que a pessoa precisa ler e entender, prefira texto com pouca ou nenhuma profundidade visual.
  - Garanta que o texto fique bom e legível ao ser escalado — use um text style que fique bom em escala completa, depois teste legibilidade em diferentes escalas.
  - Maximize o contraste entre texto e o fundo do contêiner — por padrão, o sistema exibe texto em branco (tende a dar forte contraste com o material de fundo padrão do sistema); se usar outra cor de texto, teste em vários contextos.
  - Se precisar exibir texto que não está sobre um fundo, considere deixá-lo em negrito para melhorar legibilidade — evite adicionar sombras para aumentar contraste (o espaço atual pode não incluir superfície visual para projetar sombra precisa, e não dá para prever tamanho/densidade de sombra adequados ao Environment atual da pessoa).
  - Mantenha o texto voltado para a pessoa (billboarding) — se exibir texto associado a um ponto no espaço (ex.: rótulo de um objeto 3D), geralmente você quer que o texto fique de frente para quem observa independente de como a pessoa/objeto se move; se não rotacionar o texto para permanecer de frente, ele pode ficar impossível de ler quando visto de lado ou ângulo muito oblíquo.
- watchOS: SF Compact é a fonte do sistema; apps também podem usar NY. Em complications, watchOS usa SF Compact Rounded.

Especificações (valores-chave)
- Text styles em iOS/iPadOS no tamanho padrão (Large): Large Title 34pt/41pt leading (bold); Title 1 28pt/34pt (bold); Title 2 22pt/28pt (bold); Title 3 20pt/25pt (semibold); Headline 17pt/22pt (semibold, peso semibold já no regular); Body 17pt/22pt (semibold); Callout 16pt/21pt (semibold); Subhead 15pt/20pt (semibold); Footnote 13pt/18pt (semibold); Caption 1 12pt/16pt (semibold); Caption 2 11pt/13pt (semibold). *(valores completos e tabelas para xSmall a xxxLarge e AX1-AX5, além de macOS/tvOS/watchOS e tabelas de tracking por tamanho de ponto, estão nas especificações completas da página oficial — usar como referência exata ao implementar componentes nativos.)*
- Emphasized weights (via `bold()` no SwiftUI ou `traitBold` no UIKit) podem ser medium, semibold, bold ou heavy, dependendo do estilo base.
- Tracking (rastreamento) varia por tamanho de ponto de forma não-linear (ex.: em SF Pro/iOS, tamanhos pequenos como 6-11pt recebem tracking positivo generoso, tamanhos médios ~12-23pt recebem tracking negativo, e tamanhos grandes 80pt+ tendem a zero) — para mockups fiéis, consulte a tabela de tracking completa por tamanho.
- watchOS Dynamic Type usa sua própria escala de tamanhos (xSmall a xxxLarge, mais AX1-AX3 de acessibilidade) com valores de tamanho/leading próprios por estilo — não reutilize as tabelas de iOS/iPadOS diretamente para watchOS.
- macOS tem sua própria tabela de text styles com tamanhos menores que iOS (ex.: Body 13pt/16pt, Large Title 26pt/32pt) refletindo distância de visualização maior mas tela geralmente mais próxima dos olhos que a TV — não presuma que os tamanhos de iOS servem para macOS.

**Aplicação em web/extensão**
- Tamanho mínimo de corpo de texto recomendado na web: 16px (equivalente ao "default" de 17pt do iOS) — evite texto de interface abaixo de 12-13px.
- Use unidades relativas (`rem`/`em`) em vez de `px` fixos para respeitar o zoom de texto do navegador (equivalente ao Dynamic Type) e garanta que o layout não quebre com texto 200% maior — teste truncamento e quebra de linha nesse cenário.
- Evite pesos de fonte muito finos (100-300) para texto de corpo — prefira 400 (regular) em diante, especialmente em tamanhos pequenos; e priorize o conteúdo mais importante ao crescer o texto (ex.: título de aba não precisa crescer tanto quanto o corpo).
- Limite a paleta tipográfica do produto a 1-2 famílias de fonte (ex.: uma para headings, uma para corpo) para manter hierarquia e consistência visual — espelha "minimize o número de tipografias".
- Defina uma escala tipográfica com poucos passos consistentes (ex.: 12/14/16/20/24/32px) mapeada a tokens semânticos (`--font-size-body`, `--font-size-heading`) em vez de tamanhos arbitrários por componente, espelhando o conceito de text styles do sistema.
- Ao usar fonte variável (variable font) na web via `font-variation-settings`, teste o peso em pelo menos os tamanhos mínimo e máximo do produto para garantir que o eixo de peso não fique fino demais em telas pequenas.

## Writing

**Essência.** As palavras escolhidas na interface são parte essencial da experiência — a voz precisa ser consistente com a marca, o tom deve variar com o contexto, e a escrita deve ser clara, direta, orientada à ação e escrita para todos.

**Regras**

Começando
- Determine a voz do app: pense em quem você está falando, para definir o vocabulário. Que palavras são familiares às pessoas que usam o app? Como você quer que elas se sintam? (ex.: um app bancário pode transmitir confiança/estabilidade; um jogo pode transmitir empolgação/diversão). Crie uma lista de termos comuns e a use como referência para manter a linguagem consistente — linguagem consistente + voz que reflita os valores do app deixam tudo mais coeso.
- Combine o tom com o contexto: depois de estabelecer a voz, varie o tom conforme a situação. Considere o que a pessoa está fazendo, tanto no mundo físico quanto dentro do app (ex.: se exercitando e atingiu uma meta, ou tentando fazer um pagamento e recebeu um erro) — fatores situacionais afetam tanto o que você diz quanto como exibe o texto na tela.
- Seja claro: escolha palavras facilmente entendidas que transmitam a coisa certa; verifique se cada palavra precisa estar ali; se puder usar menos palavras, use; na dúvida, leia em voz alta.
- Escreva para todos: para o app ser útil ao maior número de pessoas, precisa falar com o maior número de pessoas — escolha linguagem simples e plana, escrevendo pensando em acessibilidade e localização, evitando jargão e terminologia com gênero.

Boas práticas
- Considere o propósito de cada tela: preste atenção à ordem dos elementos, colocando a informação mais importante primeiro; formate o texto para facilitar a leitura; se precisar transmitir mais de uma ideia, considere dividir em múltiplas telas, pensando no fluxo de informação entre elas.
- Antes de publicar um texto novo de UI, pergunte-se se uma pessoa que nunca viu o produto entenderia a frase isoladamente, fora de contexto — se não entenderia, o texto provavelmente depende demais de jargão interno do time.
- Seja orientado à ação: voz ativa e rótulos claros ajudam a navegar de um passo/tela a outro. Ao rotular botões/links, quase sempre é melhor usar um verbo; priorize clareza e evite a tentação de ser "fofo" ou espirituoso demais nos rótulos (ex.: "Send" costuma funcionar melhor que "Let's do it!"). Para links, evite "Click here" — prefira palavras/frases descritivas ("Learn more about UX Writing"); isso é especialmente importante para quem usa leitores de tela.
- Ao nomear itens de menu/navegação, prefira substantivos ou frases curtas e descritivas em vez de rótulos internos da equipe de engenharia (ex.: "Relatórios" em vez do nome de uma tabela do banco de dados) — o rótulo precisa fazer sentido para quem usa o produto, não para quem o construiu.
- Construa padrões de linguagem: consistência gera familiaridade, ajudando o app a parecer coeso, intuitivo e bem projetado; também facilita escrever para o app, já que você pode voltar a esses padrões repetidamente.
- Adote regras de capitalização alinhadas ao estilo do app e as aplique consistentemente: title case é geralmente considerado mais formal, sentence case é mais casual. Escolha um estilo por tipo de elemento de UI e use-o consistentemente por todo o app (ex.: title case para todos os alertas, ou sentence case para todos os headlines).
- Mantenha um glossário vivo de termos de produto (nomes de features, rótulos de status, verbos de ação padronizados) acessível a quem escreve copy, para que app, landing page, e-mails e suporte falem a mesma língua sobre o mesmo conceito.
- Dê orientação clara e use linguagem consistente em processos multi-etapa: se o app tem um fluxo que se estende por múltiplas telas, decida como rotular as ações que levam de um passo ao próximo. Comece com linguagem como "Get Started" para indicar o início de um fluxo; use o rótulo do botão para sugerir o próximo passo, ou termos como "Continue"/"Next", mas seja consistente com o que escolher; deixe claro quando um fluxo termina usando linguagem como "Done".
- Use pronomes possessivos com moderação: "meu"/"seu" costumam ser desnecessários para estabelecer contexto (ex.: "Favoritos" transmite a mesma mensagem que "Seus Favoritos", e é mais sucinto). Se usar pronomes possessivos, use-os consistentemente por todo o app e evite trocar de perspectiva. Evite usar "nós" — pode não ficar claro a quem esse "nós" se refere, especialmente problemático em mensagens de erro (ex.: "We're having trouble loading this content" é menos claro que "Unable to load content").
- Escreva pensando em como as pessoas usam cada device: a linguagem precisa ser consistente entre devices, mas pense em onde vale ajustar o texto para cada um; descreva gestos corretamente por device (ex.: não dizer "click" num device de toque como iPhone/iPad, onde o correto é "tap"). Onde/como a pessoa usa o device, o tamanho de tela e sua localização afetam como escrever — iPhone/Apple Watch permitem personalização mas exigem brevidade pela tela pequena; TVs costumam estar em espaços comuns com várias pessoas vendo a mesma tela, então considere a quem você se dirige, além de precisar de texto grande o bastante para ver à distância.
- Forneça próximos passos claros em telas vazias: um estado vazio (lista de tarefas concluída, pasta de favoritos vazia) é uma boa oportunidade de acolher e educar sobre o app; empty states também mostram a voz do app, mas garanta que o conteúdo seja útil e caiba no contexto. Uma tela vazia pode intimidar se não for óbvio o que fazer a seguir — oriente ações possíveis e dê um botão/link para realizá-las se possível; lembre que empty states costumam ser temporários, então não mostre informação crucial que pode desaparecer depois.
- Escreva mensagens de erro claras: sempre é melhor ajudar a evitar o erro; quando uma mensagem de erro é necessária, exiba-a o mais perto possível do problema, evite culpar a pessoa, e seja claro sobre o que ela pode fazer para corrigir (ex.: "Choose a password with at least 8 characters" é mais útil que "That password is too short"). Lembre que erros são frustrantes — interjeições como "oops!" ou "uh-oh" costumam ser desnecessárias e podem soar insinceras. Se a linguagem sozinha não resolver um erro que provavelmente afeta muitas pessoas, use isso como oportunidade de repensar a interação.
- Escolha o método de entrega certo: há várias formas de chamar atenção, a pessoa usando o app ativamente ou não; considere urgência/importância da mensagem, o contexto em que alguém pode ver a mensagem, se exige ação imediata, e quanta informação de apoio pode ser necessária; escolha o método de entrega correto e um tom apropriado à situação.
- Ao decidir entre notificação push, e-mail, banner in-app ou modal, pese o custo de interrupção contra a urgência real da mensagem — reserve o canal mais interruptivo (modal bloqueante, push) para o que realmente exige ação imediata.
- Escreva o texto de cada estado de carregamento/processamento (spinners, barras de progresso) com uma frase curta que diga o que está acontecendo ("Enviando...", "Salvando alterações...") em vez de deixar o indicador visual sozinho sem contexto textual.
- Revise a copy de e-mails transacionais (confirmação, redefinição de senha, cobrança) com o mesmo rigor da copy de UI — são frequentemente o primeiro contato reescrito às pressas e acabam destoando do tom do restante do produto.
- Mantenha rótulos de configurações claros e simples: ajude a achar configurações facilmente rotulando-as da forma mais prática possível; se o rótulo não bastar, adicione uma explicação descrevendo o que acontece quando ativado (a pessoa infere o oposto). Se precisar direcionar alguém a uma configuração, forneça um link/botão direto em vez de descrever sua localização.
- Mostre dicas em campos de texto: se o app permite inserir texto próprio (conta, contato), rotule todos os campos claramente e use texto de dica/placeholder mostrando como formatar a informação (ex.: exemplo como "name@example.com", ou descrição como "Your name"). Mostre erros bem ao lado do campo e instrua como inserir corretamente, em vez de repreender por não seguir as regras (ex.: "Use only letters for your name" é melhor que "Don't use numbers or symbols"). Evite mensagens de erro robóticas sem informação útil, como "Invalid name".
- Ao nomear ações destrutivas (deletar, cancelar assinatura, sair sem salvar), use o verbo específico da ação no botão de confirmação (ex.: "Delete", "Cancel Subscription") em vez de rótulos genéricos como "OK" ou "Yes" — reduz risco de confirmação acidental de uma ação irreversível.
- Releia toda mensagem de sistema (erro, confirmação, notificação) em voz alta antes de publicar, como pede a regra "quando em dúvida, leia em voz alta" — é o teste mais rápido para achar frases roboticas, longas demais ou pouco claras.

**Aplicação em web/extensão**
- Use verbos de ação em CTAs de landing page/painel ("Enviar", "Criar conta") em vez de rótulos vagos ("Clique aqui", "Enviar!!!"); nunca use "Clique aqui" como texto de link — use texto descritivo do destino (também ajuda SEO e leitores de tela).
- Escreva mensagens de erro de formulário web ao lado do campo problemático, descrevendo a correção específica (ex.: "Use um e-mail válido como nome@exemplo.com"), nunca genéricas ("Campo inválido") nem com culpa, e evite interjeições tipo "Ops!" sem informação útil.
- Padronize capitalização de botões/menus em todo o produto (escolha sentence case ou title case e não misture) e use linguagem consistente em fluxos multi-etapa ("Continuar" sempre para avançar, "Concluir" sempre para finalizar).
- Em estados vazios de painel/dashboard (sem dados ainda), ofereça um CTA claro de próximo passo em vez de deixar a área simplesmente em branco, e evite pronomes possessivos redundantes em rótulos de navegação ("Meus Relatórios" → "Relatórios" já basta).
