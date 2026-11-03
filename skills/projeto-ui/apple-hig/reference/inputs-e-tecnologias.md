# Inputs e tecnologias (HIG)

Fonte: Apple Human Interface Guidelines — Inputs (13 páginas) e Technologies (29 páginas).

## Inputs

### Keyboards

Essência: teclado físico conectável a todo device exceto Apple Watch; atalho = tecla primária + modificadoras (Control, Option, Shift, Command).

Regras operacionais (números e Do/Don't — alta relevância para painel web):

1. Suporte Full Keyboard Access sempre que possível (iOS, iPadOS, macOS, visionOS) — navegação e ativação de janelas, menus, controles e recursos de sistema só de teclado.

2. **Do:** deixe o Full Keyboard Access do sistema cuidar de ativar controles (botões, switches) em iPadOS. **Don't:** implementar navegação por teclado customizada para controles — reserve teclado customizado para campos de texto, text views e sidebars.

3. Respeite atalhos padrão do sistema (ex.: Command-Q para sair, Command-Z para desfazer) — **Don't** redefinir um atalho padrão a menos que a ação padrão não faça sentido no seu app.

4. Ordem obrigatória de modificadoras ao combinar mais de uma: **Control, Option, Shift, Command** (nessa ordem, sempre).

5. Prioridade de uso de modificadoras: Command é a principal modificadora recomendada; Shift como secundária complementar; Option para comandos menos comuns/power features; **Control deve ser evitado como modificadora** (o sistema já usa Control extensivamente para foco e captura de tela).

6. **Don't** adicionar Shift a um atalho que já usa o caractere superior de uma tecla de dois caracteres (ex.: use Command-? para Ajuda, não Shift-Command-/).

7. **Don't** criar um atalho novo simplesmente somando uma modificadora a um atalho existente de comando não relacionado (gera confusão de expectativa — ex.: gente espera Command-Z = desfazer; Shift-Command-Z para algo não relacionado a desfazer/refazer confunde).

8. Defina atalhos customizados só para os comandos mais usados e específicos do app — atalhos demais tornam o app difícil de aprender.

9. Modificadoras seguem convenções físicas: Command ao arrastar move um grupo de itens; Shift ao redimensionar restringe à proporção original; segurar uma seta move o item selecionado pelo menor incremento definido pelo app até soltar a tecla.

10. Deixe o sistema localizar/espelhar atalhos automaticamente para teclados conectados e layouts right-to-left — não hardcode caracteres específicos de um layout.

11. Em jogos, um "key binding" é tipicamente uma única tecla; priorize comandos de tecla única (mais rápidos, combináveis com mouse/trackpad); teste em teclado Apple — remapeie Control (^) não-Apple para Command (⌘), que fica ao lado da barra de espaço e é mais fácil de alcançar junto com W/A/S/D.

12. Considere a proximidade física das teclas ao mapear comandos relacionados (ex.: usar teclas numéricas para categorias de inventário).

13. Sempre permita que o jogador customize os key bindings — apesar dos defaults razoáveis, personalização de conforto é esperada.

### Pointing devices

Essência: mouse/trackpad para navegar e iniciar ações; em iPad/Vision Pro é um input **adicional**, não substitui toque/olhos/gestos.

Regras operacionais (alta relevância para painel web):

1. **Consistência é regra de ouro**: gestos de mouse/trackpad devem se comportar igual em toda a interface, independente do app — não redefina gestos systemwide (ex.: "Swipe between pages").

2. Padrão de shape do ponteiro no iPadOS: círculo por default; muda para I-beam sobre área de texto, ou shape customizado sobre elementos específicos.

3. Três content effects definidos no iPadOS (aplicáveis conceitualmente a qualquer UI de ponteiro na web):

   - **Highlight** — retângulo translúcido arredondado + parallax sutil; use para elemento pequeno com fundo transparente (bar buttons, tab bars, segmented controls).
   - **Lift** — parallax + elevação (escala + sombra + brilho); use para elemento pequeno com fundo opaco (ícones de app).
   - **Hover** — scale/tint/shadow customizáveis sem transformar o shape do ponteiro; use para elementos grandes.
4. Padding recomendado para hit regions confortáveis: **~12 pt ao redor de elementos com bezel; ~24 pt ao redor de elementos sem bezel**. Hit region pequena demais frustra; grande demais dá sensação de "grude".

5. Botões adjacentes numa barra devem ter hit regions contíguas (sem espaço entre eles) — evita o ponteiro "piscar" para o shape default ao passar de um botão a outro.

6. **Don't** criar efeitos de ponteiro puramente decorativos — pessoas notam mudança de aparência e esperam que ela tenha função prática.

7. **Don't** exibir texto instrucional grudado no ponteiro — prioriza clareza da interface em vez de depender de dica textual junto ao cursor.

8. Magnetismo: elementos com lift/highlight "atraem" o ponteiro ao se aproximar ou ao ser mirado com flick; **Don't** aplicar magnetismo a elementos hover (o shape do ponteiro não muda, então o magnetismo confunde).

9. Cursor patterns padrão do macOS relevantes para replicar semântica na web: arrow (padrão), iBeam horizontal/vertical (seleção/inserção de texto), pointingHand (link), crosshair (seleção retangular precisa), resize em 5 variações (up/down/left/right/left-right/up-down), contextualMenu (aparece ao segurar Control), operationNotAllowed, disappearingItem/dragCopy/dragLink (estados de drag and drop).

10. Modificadoras durante drag precisam produzir o mesmo resultado seja o gesto feito por toque ou por ponteiro (ex.: Option para duplicar ao arrastar).

11. Use o ponteiro para revelar/esconder controles que minimizam ou desaparecem automaticamente (ex.: toolbar que aparece ao pairar o ponteiro por cima e recolhe ao afastar; controles de playback que somem em vídeo full-screen até o ponteiro se mover).

12. visionOS: quando um dispositivo apontador está conectado, a área que a pessoa está olhando determina o contexto do ponteiro — ao mudar o olhar de uma janela para outra, o contexto do ponteiro transiciona sem esforço extra do app.

### Gestures

Essência: movimento físico que afeta diretamente um objeto na tela — toque, ar, ou em dispositivo com superfície de toque (trackpad, remote, controller).

Regras operacionais (alta relevância — mapeiam para eventos de mouse/touch na web):

1. Todo gesto padrão (tap, swipe, drag) tem comportamento esperado consistente entre plataformas — **Don't** usar tap/swipe para uma ação exclusiva do seu app; **Don't** inventar um gesto customizado para uma ação padrão (ativar botão, rolar uma lista longa).

2. Sempre dê feedback imediato durante o gesto — ele precisa comunicar o resultado previsto e, se necessário, a extensão de movimento exigida para completar a ação.

3. Se um gesto não estiver disponível, **indique isso claramente** — senão a pessoa acha que o app travou ou que está fazendo o gesto errado.

4. Gesto customizado só se justifica quando: (a) é descobrível, (b) é fácil de executar, (c) é distinto de outros gestos, (d) **não é a única forma** de realizar uma ação importante.

5. Gesto de atalho deve **suplementar**, nunca substituir, o caminho padrão (ex.: swipe da borda para voltar deve coexistir com um botão Back visível).

6. Tabela de gestos padrão suportados amplamente (mapeamento direto para web/mouse+touch):

   - **Tap** → ativar controle, selecionar item.
   - **Swipe** → revelar ações/controles, dispensar views, rolar.
   - **Drag** → mover elemento de UI.
   - **Touch/pinch and hold** → revelar controles ou funcionalidade adicional.
   - **Double tap** → zoom in (zoom out se já ampliado).
   - **Zoom** (pinça) → ampliar view/conteúdo.
   - **Rotate** → girar item selecionado.
7. iOS/iPadOS: three-finger swipe = undo (esquerda)/redo (direita); three-finger pinch = copy (in)/paste (out); shake = undo/redo — gestos systemwide que não devem ser reaproveitados para outra função; four-finger swipe (só iPadOS) = trocar de app.

8. macOS: gestos padrão em trackpad/mouse são customizáveis pela pessoa — não assuma que um gesto específico está sempre disponível ou sempre no mesmo dedo/direção.

9. Sempre ofereça mais de uma forma de interagir — nunca assuma que a pessoa consegue realizar um gesto específico (voz, teclado, Switch Control como alternativas obrigatórias).

10. visionOS distingue gesto indireto (olhar + pinça à distância, confortável em qualquer distância, ótimo para trocar foco rápido) de gesto direto (tocar o objeto virtual fisicamente, cansa em uso prolongado — reserve para uso pouco frequente).

### Focus and selection

Essência: foco confirma visualmente o alvo de uma interação; navegação por componentes usando remote, game controller ou teclado.

Regras operacionais (alta relevância para painel web — foco de teclado):

1. Focar um item **geralmente também o seleciona** — exceção: quando a seleção automática causaria uma mudança de contexto disruptiva (abrir uma nova view); nesse caso, seleção exige um gesto separado do foco.

2. Prefira sempre os efeitos de foco fornecidos pelo sistema/padrão em vez de criar um customizado — consistência e previsibilidade aceleram o aprendizado; crie foco customizado só se for absolutamente necessário.

3. **Don't** mudar o foco sem interação da pessoa — ela perde a referência de "onde estou" e precisa gastar tempo procurando o item focado. Exceção: quando o item focado desaparece durante navegação discreta por teclado/remote/controller e há poucas opções próximas para redirecionar o foco automaticamente.

4. Padrão de indicação visual: **halo/focus ring** para campo de texto/busca (ou conteúdo opaco tipo imagem numa célula); **highlight de fundo** (cor de destaque + texto branco) para item de lista/coleção inteiro.

5. iPadOS: Tab move foco entre "focus groups" (áreas como sidebar, grid, lista); teclas de seta navegam dentro do mesmo focus group (comportamento direcional, similar ao tvOS mas escopado a um grupo). Ordem de leitura padrão ao percorrer grupos: leading→trailing, top→bottom.

6. Customize a ordem de foco em views customizadas quando a ordem natural do sistema não fizer sentido (ex.: querer que o foco desça por uma pilha vertical antes de ir para a próxima coluna) — identifique o container como um único focus group.

7. Ajuste a prioridade de um item dentro de um focus group para refletir sua importância — quando o grupo ganha foco, o item primário (de maior prioridade) recebe foco junto, facilitando selecionar o item mais provável.

8. tvOS define 5 estados visuais distintos por item focável: não focado (menos proeminente), focado (elevação/iluminação/animação), escolhido (feedback instantâneo ao ser ativado), selecionado/desselecionado (estado persistente pós-ativação), indisponível (aparência inativa) — planeje assets para o tamanho maior de foco, já que itens tendem a aumentar de escala ao ganhar foco.

9. **Don't** exibir um ponteiro livre em tvOS — as pessoas esperam navegar um número fixo de itens mudando o foco, não arrastando um cursor minúsculo numa tela grande.

10. Em tela cheia (vídeo, jogo), gestos devem afetar o conteúdo diretamente, não mover o foco — a pessoa não espera um indicador de foco nesse contexto.

### Action button

Essência: acesso rápido a uma função favorita em iPhone/Apple Watch com Action Button dedicado; roda App Shortcuts ou função de sistema.

- Rótulo de ação: title-case, começa com verbo, tempo presente, sem artigos/preposições, **máximo 3 palavras** (ex.: "Start Race", não "Started Race" ou "Start the Race").

- Não ofereça um App Shortcut que apenas abre o app — o sistema já cobre isso via ícone/widget/complication.

- Deixe o sistema mostrar como configurar o botão; não replique essa orientação dentro do app.

- watchOS: considere uma função secundária que dê continuidade lógica à ação primária (ex.: marcar um segmento durante um treino); evite oferecer mais de uma função secundária (aumenta carga cognitiva).

- Não suportado em iPadOS, macOS, tvOS, visionOS.

### Apple Pencil and Scribble

Essência: instrumento de marcação com precisão de pixel para iPad; Scribble converte escrita à mão em texto em qualquer campo.

- Deixe marcar a partir do primeiro toque na tela — sem exigir toque em botão ou troca de modo antes (espelha a experiência de lápis real em papel).

- Double tap: respeite a configuração do sistema (trocar ferramenta↔borracha, ferramenta atual↔anterior, mostrar seletor de cor); **Don't** usar double tap para ação destrutiva ou difícil de desfazer (pode ser acidental).

- Squeeze (Pencil Pro): ação única e rápida (não contínua); se abrir UI, exiba perto da ponta do lápis; **Don't** usar para ação destrutiva.

- Scribble funciona em todo campo de texto padrão por default (exceto senha) — não exija tap/seleção antes de escrever; oculte placeholder e evite autoscroll/autocompletar durante a escrita.

- Dê espaço suficiente para escrever — aumente o campo de texto antes ou ao pausar a escrita, nunca durante.

- Não suportado em iOS, macOS, tvOS, visionOS, watchOS.

### Camera Control

Essência: acesso direto à experiência de câmera do app via botão físico dedicado (iPhone 16/16 Pro).

- Use apenas símbolos do SF Symbols para representar função de controle — nada de símbolo customizado.

- Slider: inclua unidade/contexto no valor (ex.: "EV", "%") para clareza; picker para opções discretas (ex.: grid on/off).

- Minimize distrações no viewfinder — evite duplicar controles do overlay na sua própria UI.

- Ordene os controles com os mais usados ao centro — o sistema lembra o último controle usado ao reabrir o overlay.

- Não suportado em iPadOS, macOS, watchOS, tvOS, visionOS.

### Digital Crown

Essência: input físico rotativo em Apple Vision Pro e Apple Watch; no Watch é o principal meio de navegação desde watchOS 10.

- watchOS: apps **não** respondem a pressões (reservadas ao sistema); só a rotação gera dados de interação.

- Ancore a navegação vertical do app (listas, tabs paginadas, scroll) ao Digital Crown, sempre com equivalente por toque como backup.

- Dê feedback visual em toda interação com o Digital Crown — sem isso, a pessoa assume que girar não teve efeito.

- Ajuste a velocidade de atualização da interface à velocidade com que a pessoa gira a coroa — não atualize tão rápido que dificulte selecionar valores.

- Vision Pro: controla volume, quantidade de imersão em portal/Environment/Full Space, recentralização de conteúdo, abre Acessibilidade, sai do app para a Home View.

- Não suportado em iOS, iPadOS, macOS, tvOS.

### Eyes

Essência: em visionOS, olhar para um objeto o identifica como alvo de interação (hover effect); ativação real requer gesto indireto (ex.: tap).

- Espaçamento mínimo entre itens interativos: **16 pt de margem** ao redor de cada item, ou centros a pelo menos **60 pt** de distância entre si — evita "pulos" de olhar entre alvos próximos.

- Prefira formas arredondadas em itens interativos — cantos atraem o olhar e dificultam manter foco no centro do elemento.

- Posicione conteúdo a pelo menos **1 metro** de distância para leitura/engajamento prolongado, dentro do campo de visão, sem exigir giro de cabeça.

- visionOS não informa ao app onde a pessoa está olhando antes do tap (privacidade) — só informa quando o componente do sistema é efetivamente tocado/selecionado.

- Minimize distrações visuais e movimento — o olho é atraído involuntariamente por movimento, especialmente periférico, o que compete com o alvo pretendido.

- Não suportado em iOS, iPadOS, macOS, tvOS, watchOS.

### Game controls

Essência: input físico (controller) ou default da plataforma (touch, remote, mouse+teclado) para jogos.

- Controles virtuais em touch: tamanho mínimo **44×44 pt** para frequentes, **28×28 pt** para secundários (menus).

- Sempre dê estado de pressão visível e tátil (glow, haptics, som) — controle virtual sem isso parece não-responsivo.

- Use símbolos que comuniquem a ação (ex.: ícone de arma para ataque) — **Don't** usar nomenclatura de controller (A, X, R1) como arte, dificulta reconhecimento.

- Mapeamento esperado de botão de controller fora de gameplay: A = ativa controle; B = cancela/volta; shoulders = navega entre telas; thumbstick/d-pad = move seleção; Menu = abre configurações/pausa; Home/logo = reservado para o sistema.

- Sempre ofereça fallback ao método de interação default da plataforma mesmo suportando controller físico — nem todo jogador tem um.

- Teclado em jogos: priorize comandos de tecla única; teste em teclado Apple; deixe customizar bindings.

- Não suportado em watchOS.

### Gyroscope and accelerometer

Essência: dados de movimento físico do device (giroscópio/acelerômetro) para apps/jogos em iOS, iPadOS, watchOS (e Siri Remote em tvOS).

- Use dado de movimento só quando ele trouxer benefício tangível (fitness, gameplay) — **Don't** coletar só para ter o dado.

- Explique por que precisa do acesso — o texto de justificativa aparece no pedido de permissão do sistema na primeira tentativa de acesso.

- Fora de gameplay ativo, **evite** usar acelerômetro/giroscópio para manipulação direta da interface — gestos de movimento são difíceis de replicar com precisão, podem ser desafiadores fisicamente e consomem bateria.

### Nearby interactions

Essência: interações que integram a presença física de pessoas/objetos próximos via Ultra Wideband (framework Nearby Interaction).

- Baseie a interação em uma ação do mundo físico (ex.: aproximar devices para transferir áudio) — inspire-se no gesto físico real para achar o conceito certo.

- Dê feedback contínuo que reflita a proximidade mudando (ex.: seta direcional → círculo pulsante ao se aproximar, como no Find My/AirTag).

- Encoraje orientação portrait — landscape reduz precisão e disponibilidade da informação de distância/direção.

- **Don't** usar nearby interaction como único caminho para realizar uma tarefa — nem todo device suporta Ultra Wideband.

- Não suportado em macOS, tvOS, visionOS.

### Remotes

Essência: Siri Remote é o input primário da Apple TV — clickpad + touch surface (swipe, press).

- Prefira gestos padrão para ações padrão — redefinir comportamento do remote confunde e complica, exceto durante gameplay ativo.

- Diferencie press (intencional — escolher/confirmar) de tap (navegação/info adicional); **evite** responder a tap durante reprodução de vídeo ao vivo (toque acidental é comum ao segurar o remote).

- Back button: abre o "pai" da tela atual, não necessariamente a tela anterior; em gameplay, Back abre menu de pausa em vez de sair direto (evita saída acidental repetida); segurar Back sempre leva à Home Screen.

- Não suportado em iOS, iPadOS, macOS, visionOS, watchOS.

---

## Technologies

### Generative AI

Destaque — regras essenciais para qualquer feature de IA generativa:

- **Mantenha a pessoa no controle**: honre pedidos dentro do escopo, permita descartar/reverter/refazer conteúdo gerado, identifique claramente quando e onde há IA envolvida.

- **Transparência obrigatória**: nunca deixe alguém pensar que interage com conteúdo feito por humano quando na verdade é IA; explique capacidades e limitações antes do uso (tutorial breve, exemplos curados de entrada).

- **Inclusão ativa**: modelos de IA tendem a favorecer a informação mais comum e podem replicar vieses/estereótipos; peça à pessoa a informação necessária em vez de inferir atributos pessoais/culturais, e teste com um conjunto diverso de pessoas.

- **Privacidade por modelo**: prefira modelo on-device quando possível (mantém dado no device, responde rápido, funciona offline); para modelo server-based, minimize o que é compartilhado e seja explícito sobre o que sai do device e se é usado para treino.

- **Combata alucinação**: evite pedir informação factual ao modelo a menos que ele tenha acesso a dados verificados e atualizados; nunca use conteúdo gerado por IA em contexto onde uma alucinação poderia prejudicar alguém.

- **Peça confirmação antes de ações irreversíveis ou problemáticas** feitas em nome da pessoa (ex.: deletar, comprar) — considere as consequências de um engano.

- Dê feedback específico durante geração (ex.: "Resumindo temas principais das suas notas" em vez de "Processando...") — reduz incerteza e ansiedade de espera; se algo falhar, descreva o que aconteceu em linguagem simples e dê um próximo passo claro.

- Ofereça fallback sem IA quando possível; teste ativamente por vieses, estereótipos e cenários de uso malicioso/abuso antes de lançar, e evite replicar conteúdo com copyright curando os prompts/dados de entrada.

### Machine learning

Destaque — vocabulário de padrões de design para features com ML:

- Classifique cada feature em pares de espectro para calibrar tolerância a erro: **crítica vs. complementar**, **dado privado vs. público**, **proativa vs. reativa**, **visível vs. invisível**, **dinâmica vs. estática**. Quanto mais crítica/sensível/proativa, maior a exigência de precisão.

- **Feedback explícito** (a pessoa responde a um pedido específico do app): torne sempre voluntário, use linguagem direta sobre a consequência (ex.: "Sugerir menos pop" em vez de "Não curti"), aja imediatamente e persista a mudança.

- **Feedback implícito** (inferido do comportamento): sempre proteja a privacidade do dado coletado; não deixe o feedback implícito reduzir a chance de a pessoa explorar coisas novas; priorize sinal recente sobre histórico antigo; cuidado com viés de confirmação — implícito só mostra o que a pessoa já vê/faz, raramente revela o que ela gostaria de descobrir.

- **Calibração** (pessoa fornece dado inicial necessário, ex.: Face ID): use só quando a feature realmente não funciona sem ela; colete o mínimo essencial; nunca peça calibração mais de uma vez sem necessidade; dê assistência imediata se o progresso travar, sem implicar culpa da pessoa.

- **Mistakes**: dê correções fáceis e familiares; correções guiadas (sugestões específicas) exigem menos esforço da pessoa que correções freeform; nunca dependa de correções para compensar resultado de baixa qualidade; seja especialmente cuidadoso com erros em features proativas (a pessoa não pediu o resultado, então tem menos paciência com falhas).

- **Multiple options**: prefira opções diversas em vez de só as mais prováveis; liste a opção mais provável primeiro; evite excesso de opções (aumenta carga cognitiva); torne as opções fáceis de distinguir entre si.

- **Confidence**: só exiba valor de confiança se ele realmente correlaciona com qualidade do resultado; traduza confiança em termos que a pessoa já entende (categorias como "alta chance" em vez de percentual cru), exceto em contexto estatístico esperado (clima, esporte, eleição).

- **Attribution**: explique o porquê do resultado sem jargão técnico e sem implicar julgamento emocional (ex.: "Porque você lê não-ficção", não "Porque você ama não-ficção"); evite ser específico demais (parece vigilância) ou genérico demais (parece impessoal).

- **Limitations**: estabeleça expectativa realista antes do uso; demonstre como obter o melhor resultado (placeholder de exemplo, feedback em tempo real); explique por que um resultado ruim ocorreu em vez de deixar a pessoa achar que a feature é aleatória.

### Sign in with Apple

Destaque:

- Ofereça em toda versão do app/site em todas as plataformas, inclusive não-Apple; sempre use a API/botão fornecido pela Apple — nunca replique visual customizado sem seguir as specs oficiais.

- **Nunca peça senha** a quem usa Sign in with Apple; **nunca peça e-mail pessoal** quando a pessoa já compartilhou um endereço de relay privado — respeite essa escolha de privacidade.

- Botão: largura mínima **140 pt**, altura mínima **30 pt**, margem mínima de **1/10 da altura do botão**; três estilos de cor (white, white-outline, black) conforme contraste do fundo.

- Adie o sign-in o máximo possível — deixe a pessoa explorar o app antes de exigir login; se precisar de conta, explique o motivo antes de pedir e ofereça as opções de login só depois da explicação.

- Dados adicionais (data de nascimento, região): deixe claro se são obrigatórios (legal/contratual) ou apenas recomendados (melhoram a experiência) — nunca bloqueie o uso do app por causa de dado opcional recusado.

- Título do botão restrito a: "Sign in with Apple", "Sign up with Apple" ou "Continue with Apple" — não invente variações; considere permitir vincular uma conta Sign in with Apple a uma conta existente.

### Siri

Destaque:

- App expõe ações (intents) e conteúdo (entities) via **App Intents framework** para aparecer em Siri, Spotlight e Shortcuts; schemas de domínio comum (email, música, fotos) dão acesso a lógica de conversação mais rica sem trabalho extra.

- Escreva diálogo de resposta claro e sucinto — evite humor ou palavras desnecessárias (as pessoas ouvem a mesma resposta muitas vezes ao repetir o comando).

- Design inclusivo: evite pronomes de gênero desnecessários (ex.: "Who should I send it to?" em vez de "What's his or her name?").

- Faça perguntas abertas quando a lista completa de opções for longa demais para a Siri ler em tempo razoável (ex.: "What kind of shoes are you interested in?").

- Mantenha respostas independentes de device específico — a pessoa pode iniciar um pedido num device e ele ter efeito em outro.

- Omita o nome do seu app na resposta — o sistema já fornece atribuição visual/verbal automaticamente.

- Nunca use frases reservadas ("Call 911", "Hey Siri") nem tente reproduzir/personificar a funcionalidade da Siri.

- Só traduza a palavra "Hey" na frase "Hey Siri" — "Siri" nunca é traduzido (em pt-BR: "E aí Siri").

### VoiceOver

Destaque:

- Forneça rótulos alternativos descritivos para todo elemento-chave de interface — vá além do rótulo genérico do sistema, mantenha atualizado conforme a interface muda.

- Descreva imagens com significado; **exclua imagens puramente decorativas** do VoiceOver (`accessibilityHidden`) para reduzir carga cognitiva e respeitar o tempo da pessoa.

- Torne gráficos e infográficos totalmente acessíveis: dê uma descrição concisa do que o gráfico transmite, e se a pessoa pode interagir com ele para obter mais informação, disponibilize essa interação também via VoiceOver.

- Use títulos e headings para navegação hierárquica; agrupe elementos relacionados (ex.: imagem + legenda) para que o VoiceOver os leia juntos, na ordem de leitura do idioma ativo (em pt-BR: topo→base, esquerda→direita).

- Avise o VoiceOver sempre que houver mudança visível de conteúdo/layout — sem isso o mapa mental da pessoa fica desatualizado.

- Suporte o VoiceOver rotor para navegação por headings/links/tipos de conteúdo quando possível — o rotor também dá acesso ao teclado braille.

- visionOS: gestos customizados não recebem input de mão por default quando VoiceOver está ativo (a menos que a pessoa habilite Direct Gesture mode) — preserva a exploração por voz sem interferência de gesto acidental.

### Maps

Destaque:

- Torne o mapa interativo (zoom, pan, rotação) — elementos não-interativos que obscurecem o mapa quebram a expectativa padrão de manipulação.

- Dois estilos de ênfase: **default** (cores saturadas, alinhado ao app Maps — bom para manter alinhamento visual quando a pessoa alterna entre seu app e o Maps) e **muted** (dessaturado, melhor quando há muito conteúdo customizado sobreposto ao mapa).

- Logo da Apple e link legal: padding mínimo de **7 pt nas laterais e 10 pt acima/abaixo**; nunca cobrir permanentemente (cobertura temporária é aceitável); mapas menores que 200×100 px não precisam exibi-los.

- Agrupe pontos de interesse sobrepostos em clusters que se expandem progressivamente ao dar zoom, para manter legibilidade.

- Place cards: estilos automatic, callout (full/compact), caption, sheet — escolha conforme quanto espaço/contexto o seu mapa oferece; evite duplicar informação já exibida no app; mantenha a localização visível no mapa mesmo com o card aberto.

- Mapas indoor: ajuste nível de detalhe por zoom (mostre só andares/salas grandes de longe, revele lojas/detalhes ao aproximar); ofereça seletor de andar quando houver múltiplos níveis; limite o quanto se pode rolar para fora do limite do local para evitar que a pessoa se perca.

### App Clips

- Foque em completar uma tarefa ou demo essencial sem exigir instalação do app completo; **evite** usar App Clip só para fins de marketing/anúncio.

- UI linear e mínima — sem tab bars, navegação complexa ou telas de configuração; mostre a parte mais relevante já na abertura, sem splash screen nem espera.

- App Clip Code é a melhor forma de descoberta física; use a variante NFC-integrada quando o código for fisicamente acessível, scan-only quando não for.

- Evite exigir criação de conta antes de entregar valor; considere Sign in with Apple quando conta for realmente necessária.

- Notificações liberadas por até 8h após o lançamento — use com moderação, sempre ligadas à tarefa em andamento, nunca puramente promocionais.

- Não suportado em macOS, tvOS, visionOS, watchOS.

### Apple Pay

- Use apenas para bens físicos, serviços ou doações (não para bens virtuais — isso é In-app purchase).

- Se detectar que a pessoa tem cartão ativo, Apple Pay deve ser a opção de pagamento **primária** (não necessariamente única) em todo lugar onde a API é usada — nunca separe Apple Pay num fluxo à parte.

- Use sempre o botão/API fornecidos pela Apple (nunca crie botão customizado com o texto/logo "Apple Pay" sem seguir as specs); a marca Apple Pay não é botão — nunca a use como um.

- Sheet de pagamento: só peça/mostre informação essencial; use line items para taxas extras, descontos, doações e assinaturas — nunca para listar os itens da compra em si.

- Botão mínimo: **100 pt largura / 30 pt altura** (varia por tipo de botão) com margem de 1/10 da altura; três estilos de cor (black, white, white-outline).

- Não suportado em tvOS.

### Augmented reality (AR)

- Use o máximo da tela para o mundo físico + objetos virtuais; minimize controles sobrepostos.

- Atualize a cena **60 vezes por segundo** para não quebrar a ilusão (objetos não devem pular/piscar).

- Use a coaching view do sistema para orientar a pessoa a encontrar superfícies, em vez de instrução textual solta.

- Prefira manipulação direta (tocar o objeto 3D diretamente) quando a pessoa estiver parada; use controles indiretos em screen space quando ela estiver em movimento ou precisar de controles persistentes.

- Use terminologia amigável em textos (ex.: "Try moving to the side" em vez de "Unable to find a plane. Adjust tracking.").

- Ofereça sempre um jeito de resetar a experiência se ela não corresponder à expectativa (falha de superfície, luz insuficiente, movimento excessivo).

- Não suportado em macOS, tvOS, watchOS.

### CareKit

- Proteja dados extremamente sensíveis de saúde — política de privacidade clara é obrigatória no processo de submissão do app.

- Peça acesso a HealthKit só no momento de uso real (ex.: ao registrar peso), nunca no lançamento do app.

- Cinco estilos de task view (simple, instructions, log, checklist, grid) — escolha conforme a tarefa é de um passo ou múltiplos passos.

- Use cor para reforçar significado de itens de tarefa, nunca como único veículo de informação.

- Combine precisão com simplicidade na descrição de tarefas (nome comercial do medicamento, não descrição química).

- Incorpore branding de forma sutil — pessoas usam apps de cuidado para atingir metas de saúde, não querem ver publicidade.

- Não suportado em macOS, tvOS, visionOS, watchOS.

### CarPlay

- Elimine interação com o iPhone quando o CarPlay estiver ativo — tudo deve funcionar com o iPhone bloqueado ou guardado.

- Use os templates de sistema (audio, communication, navigation, fueling) — você fornece conteúdo, o CarPlay renderiza; não adapte layout para resoluções manualmente.

- Áudio: não inicie reprodução automática a menos que seja a única fonte do app ou esteja retomando algo interrompido; não altere o volume geral, só níveis relativos internos.

- Layout limpo e escaneável a partir do banco do motorista; conteúdo/controles mais importantes na metade superior da tela.

- Teste a paleta de cores sob luz real do carro (dia/noite/reflexo) — cores que parecem bem no monitor podem lavar ao sol ou ficar ilegíveis à noite.

- Reporte erros dentro do CarPlay, nunca direcionando a pessoa a pegar o iPhone.

- Não suportado em iPadOS, macOS, tvOS, visionOS, watchOS.

### Game Center

- Access point (elemento de UI padrão) deve aparecer em telas de menu/configurações, nunca durante gameplay ativo ou em splash screens/tutoriais.

- Use terminologia correta e localizada: "Game Center" (nunca "GameKit"/"game center"), "Achievements", "Leaderboards", "Challenges" — evite sinônimos como Awards/Trophies/Rankings.

- Achievements: título e descrição limitados a **2 linhas cada**; alinhe aos 4 estados nativos (locked, in-progress, hidden, completed).

- Leaderboards: escolha entre classic (recorde histórico, sempre ativo) e recurring (reseta por intervalo, ex.: semanal) conforme o tipo de engajamento desejado.

- Challenges: gameplay de **1 a 5 minutos**, comparando a pontuação mais recente (não a melhor histórica) para manter competição justa.

- Multiplayer: use party codes (tipicamente 8 caracteres alfanuméricos) para coordenar sessões em tempo real; permita entrar tarde e sair cedo.

### HealthKit

- **Nunca** peça acesso a dado de saúde privado se o app não oferece funcionalidade de saúde/fitness.

- Peça acesso só quando necessário no contexto (ex.: ao registrar peso), não no lançamento do app.

- Activity rings: use **exclusivamente** para Move/Exercise/Stand de **uma única pessoa** — nunca para branding, ornamentação, ou dado de múltiplas pessoas; mantenha margem externa mínima igual à distância entre os anéis.

- Nunca crie tela customizada replicando a tela de permissão padrão do sistema — só adicione texto explicativo à tela padrão.

- Gerencie compartilhamento de dado de saúde só via Settings > Privacy do sistema — não crie telas duplicadas no app.

- Refira-se ao app como "Apple Health" ou "the Apple Health app" — nunca use o termo técnico "HealthKit" em texto voltado à pessoa usuária.

- Não suportado em macOS, tvOS, visionOS.

### HomeKit

- Use a terminologia e o modelo de objetos do HomeKit (home → rooms/zones → accessories → services → characteristics → scenes → automations) mesmo que sua UI não organize por cômodos.

- Não duplique configuração de casa/cômodos já feita no app Home — sempre reflita e defira às escolhas feitas lá.

- Regras de nomeação de serviço: apenas caracteres alfanuméricos, espaço e apóstrofo; começar/terminar com caractere alfanumérico; sem emoji.

- Use o fluxo de setup do sistema (mais rápido: nomear, parear, atribuir categoria/room em poucos passos) em vez de recriar seu próprio onboarding.

- Peça permissão antes de escrever no banco de dados do HomeKit quando a pessoa fizer mudanças no seu app.

- Nunca sugira nome de serviço com marca/modelo, nem nome que duplique informação de localização (ex.: "kitchen light" pode confundir comandos de voz).

### iCloud

- Torne o uso com iCloud automático — não force a pessoa a escolher documento por documento o que sincroniza.

- Avise antes de deletar (a exclusão remove de todos os devices); resolva conflitos de versão automaticamente sempre que possível, com aviso não-intrusivo quando não for possível.

- Use iCloud para conteúdo que a pessoa cria e entende, não para recursos do app regeneráveis (evite estourar o espaço finito e pago da pessoa).

- Inclua conteúdo do iCloud nos resultados de busca — a expectativa é de disponibilidade universal.

- Trate a indisponibilidade do iCloud (Airplane Mode, desativado manualmente) sem alerta bloqueante — apenas avise discretamente que as mudanças não sincronizarão.

### ID Verifier

- Peça só o dado mínimo necessário (ex.: "maior de 21" em vez da data de nascimento completa).

- Dois tipos de pedido: **Display Only** (dado nunca chega ao seu app, só é exibido na UI do sistema para confirmação visual) e **Data Transfer** (requer entitlement extra, use só quando há exigência legal real).

- Rótulo do botão que inicia verificação: "Verify Age" ou "Verify Identity" — nunca inclua símbolo de NFC/QR nem o logo da Apple.

- Não suportado em iPadOS, macOS, tvOS, visionOS, watchOS.

### iMessage apps and stickers

- Prefira uma experiência primária por app iMessage — se precisar de múltiplas funções, crie apps separados.

- Coloque os recursos mais usados na compact view; reserve edição de texto para a expanded view (compact ocupa o mesmo espaço do teclado).

- Stickers devem permanecer legíveis contra fundos variados, rotação e escala — use transparência para integração visual.

- Forneça descrição alternativa localizada para cada sticker (suporte a VoiceOver).

- Ícone quadrado que o sistema mascara com cantos arredondados automaticamente.

- Não suportado em macOS, tvOS, visionOS, watchOS.

### In-app purchase

- Use para bens/serviços **virtuais** (conteúdo premium, assinaturas digitais) — nunca para bens físicos (isso é Apple Pay).

- Quatro tipos: consumível, não-consumível, assinatura auto-renovável, assinatura não-renovável.

- Deixe a pessoa experimentar o app antes de pedir compra; exiba sempre o preço total de cobrança, independente do tipo.

- Use sempre a sheet de confirmação padrão do sistema — nunca a modifique ou replique.

- Torne trivial cancelar uma assinatura auto-renovável — esconder ou dificultar o cancelamento passa a impressão de que a pessoa está sendo impedida.

- Suporte Family Sharing quando aplicável e mencione isso explicitamente na tela de assinatura.

### Live Photos

- Aplique ajustes/efeitos a **todos os frames**, nunca só ao frame estático.

- Nunca desmonte a Live Photo (frames e áudio separados) — mantenha o conteúdo íntegro em todo app que a exibe.

- Em ambiente que não suporta Live Photos, mostre a versão estática tradicional — não tente replicar o efeito.

- Se movimento não for possível, use o badge padrão do sistema — nunca um botão de "play" (confunde com vídeo).

- Não suportado em watchOS.

### Mac Catalyst

- Bom candidato: apps iPad que já suportam drag and drop, navegação/atalhos de teclado, multitasking (Split View/Slide Over) e múltiplas janelas — esses recursos migram automaticamente.

- Má fit: apps que dependem essencialmente de giroscópio/acelerômetro/câmera traseira, ou de frameworks como HealthKit/ARKit sem equivalente no Mac.

- Escolha entre idioma iPad (escala a 77%, menos trabalho de adaptação) e idioma Mac (renderiza a 100%, mais nítido, exige auditoria completa de layout/fontes/imagens).

- Substitua tab bar por split view com sidebar (ou segmented control em hierarquia flat) para navegação — mais alinhado à convenção do Mac.

- Gestos de iPadOS convertem automaticamente para mouse/trackpad (tap→click, touch and hold→click and hold, pan→drag).

- Não suportado em iOS, tvOS, visionOS, watchOS.

### NFC

- Use terminologia amigável: "scan" e "hold near" em vez de "tap"/"touch" — o device não precisa tocar fisicamente a tag.

- Evite jargão técnico ("NFC", "Core NFC", "tag") no texto voltado à pessoa usuária.

- Sheet de instrução deve nomear o objeto a escanear em frase completa, curta, para evitar truncamento.

- Suporte tanto leitura em background (automática, tela acesa) quanto in-app (obrigatória para devices sem suporte a background).

- Não suportado em macOS, tvOS, visionOS, watchOS.

### Photo editing

- Confirme cancelamento se houver edição em progresso — não descarte silenciosamente o trabalho da pessoa.

- Não forneça uma segunda toolbar customizada — a modal view já inclui uma.

- Deixe a pessoa pré-visualizar o resultado antes de fechar a extensão.

- Use o ícone do próprio app como ícone da extensão (gera confiança de que é seu app).

- Não suportado em tvOS, visionOS, watchOS.

### ResearchKit

- Ordem obrigatória de onboarding: introdução → elegibilidade → consentimento informado → pedido de permissão de dados.

- Determine elegibilidade o quanto antes — não faça a pessoa passar por consentimento se ela não é elegível.

- Quebre formulário de consentimento longo em seções digestíveis (coleta de dado, uso, riscos, benefícios, duração, como sair).

- Uma pergunta por tela em surveys; mostre progresso; avise quantas perguntas há e quanto tempo leva.

- Peça permissão de dado (localização, Health, notificações) só depois do consentimento, explicando o motivo claramente.

- Não suportado em macOS, tvOS, visionOS, watchOS.

### SharePlay

- Use para experiências em **tempo real**; para colaboração assíncrona, ofereça compartilhar/salvar depois que a sessão terminar.

- Dê um jeito claro e reconhecível de iniciar (botão com o símbolo do SharePlay); deixe entrar na atividade sem fricção — leve rápido ao conteúdo compartilhado.

- Mantenha as pessoas orientadas quando uma ação de alguém muda a experiência para todos (ex.: pausar mídia pausa para o grupo).

- visionOS: três templates espaciais — **side-by-side** (assistir juntos, foco no conteúdo), **surround** (jogos de mesa, conteúdo central), **conversational** (pessoas juntas com conteúdo em segundo plano); suporte até **5 Personas espaciais**, assentos a pelo menos **1 metro** de distância.

- Use "SharePlay" como substantivo ou verbo, mas nunca com adjetivo nem flexão (não "SharePlayed", "SharePlaying").

- Não suportado em watchOS.

### ShazamKit

- Pare de gravar assim que tiver a amostra necessária — não deixe o microfone ligado além do preciso.

- Peça consentimento explícito antes de guardar músicas reconhecidas na biblioteca iCloud da pessoa.

- Peça acesso ao microfone com justificativa clara, como qualquer outro pedido de permissão sensível.

### Sign in with Apple

Ver seção de destaque acima.

### Siri

Ver seção de destaque acima.

### Tap to Pay on iPhone

- Ajude o comerciante a aceitar termos e condições **antes** de iniciar um fluxo de checkout com cliente.

- Só apresente termos e condições a um usuário administrador — trate não-administradores com mensagem explicando a exigência.

- Sempre disponibilize o botão de checkout mesmo durante a configuração em background — mostre indicador de progresso em vez de bloquear a opção.

- Rótulo do botão: "Tap to Pay on iPhone" (ou "Tap to Pay" se espaço limitado) — apenas para ações de pagamento; use símbolos SF `wave.3.right.circle`; nunca inclua o logo da Apple.

- Exiba claramente o resultado da transação (sucesso/recusa) e ofereça caminho alternativo de pagamento em caso de falha.

- Não suportado em iPadOS, macOS, tvOS, visionOS, watchOS.

### VoiceOver

Ver seção de destaque acima.

### Wallet

- Ofereça adicionar passes com um toque (`Add to Apple Wallet`) no momento da criação (compra de ingresso, cadastro em programa de fidelidade); agrupe passes relacionados (ex.: voos com conexão) numa única adição.

- Informe expiração/validade corretamente (`expirationDate`, `relevantDate`, `voided`) para o sistema esconder passes vencidos automaticamente.

- Peça permissão sempre antes de deletar um pass do Wallet.

- Ajude o sistema a sugerir o pass certo no Lock Screen fornecendo dados de relevância (local/horário).

- Use "change messages" só para atualização de informação crítica em tempo (ex.: mudança de portão), nunca para marketing.

- Identity verification: peça dado de identidade só no momento exato da necessidade; explique em uma frase clara por que precisa (purpose string obrigatória, sentence case, terminando em ponto); indique claramente se e por quanto tempo guardará o dado.

- Não suportado em tvOS.
