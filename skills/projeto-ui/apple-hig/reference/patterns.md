# Patterns (HIG)

Origem: https://developer.apple.com/design/human-interface-guidelines/patterns

## Charting data

**Essência**: Um gráfico (chart) comunica dados complexos com mais clareza e apelo visual do que texto corrido, mas só vale a pena quando ajuda a analisar tendências, estado atual ou comparação entre categorias — nem todo dado precisa virar gráfico.

**Regras**:
- Use um gráfico quando quiser destacar informação importante de um dataset.
- Gráficos são visualmente proeminentes e atraem atenção — comunique com clareza o que a pessoa pode aprender com o dado que importa pra ela.
- Se você só precisa fornecer dado — sem transmitir informação sobre ele ou ajudar a analisá-lo — ofereça em outro formato, como uma lista/tabela que a pessoa possa rolar, buscar e ordenar.
- Mantenha o gráfico simples.
- Deixe que a pessoa escolha quando quer mais detalhe (progressive disclosure) em vez de empacotar o máximo de dado possível de uma vez.
- Excesso de dado torna o gráfico visualmente sobrecarregado e difícil de usar, obscurecendo relações e outras informações que você quer transmitir.
- Se há muito dado ou muita funcionalidade, deixe a pessoa escolher nível de detalhe ou subconjunto de dado.
- Considere oferecer várias versões do mesmo gráfico interativo, cada uma com mais funcionalidade que a anterior, para ensinar a usá-lo.
- Todo gráfico precisa ser acessível: forneça accessibility labels que descrevam valores e componentes do gráfico.
- Forneça também elementos de acessibilidade que ajudem a interagir com o gráfico, não só a "ouvir" o valor.
- Prefira tipos de gráfico comuns (barra, linha) — as pessoas já sabem ler esses tipos, o que aumenta a chance de leitura correta.
- Se precisar de um tipo de gráfico novo/não convencional, ensine como interpretá-lo (ex.: animar cada componente individualmente na primeira exibição).
- Examine o dado em múltiplos níveis: macro (totais/médias de alto nível que a pessoa pode se interessar).
- Nível meio: identifique subconjuntos úteis do dado.
- Nível micro: identifique pontos individuais que merecem destaque.
- Adicione texto descritivo (título, subtítulo, anotação) para enfatizar a informação mais importante e destacar conclusões acionáveis.
- Considere um resumo tipo "manchete" acima do gráfico que capture a informação essencial num relance.
- Esse resumo textual nunca substitui os accessibility labels.
- Dimensione o gráfico conforme função, tópico e nível de detalhe.
- Um gráfico precisa ser grande o bastante para exibir labels/anotações com conforto e suportar a interatividade pretendida.
- Use um gráfico pequeno quando é só informação glanceable, ou um preview/snapshot de uma versão maior.
- Mantenha consistência visual (tipo e estilo) entre múltiplos gráficos que servem propósito parecido.
- Desvie do padrão visual só para destacar diferenças reais entre gráficos.
- Ao usar vários gráficos para explorar o mesmo dataset por ângulos diferentes, mantenha um único tipo de gráfico, cores, anotações, layout e texto.
- Isso sinaliza visualmente que o dataset é o mesmo entre a versão resumida e a versão expandida.

**Aplicação em web/extensão**:
- Em dashboards web, prefira bar/line chart padrão (Chart.js, D3, Recharts) a visualizações exóticas; se usar algo não convencional, adicione uma legenda/tooltip que ensine a leitura na primeira visita.
- Implemente sempre `aria-label`/`role="img"` com descrição textual do valor por trás de cada gráfico SVG/canvas, e ofereça uma tabela de dados alternativa (`<table>` oculta ou expansível) para leitores de tela.
- Em vez de renderizar todos os pontos de uma série longa de uma vez, ofereça zoom/filtro de período (semana/mês/ano) como progressive disclosure.
- Reuse uma paleta de cores e um componente de chart único no design system para todos os relatórios do painel, variando só quando precisa contrastar dados diferentes.

## Collaboration and sharing

**Essência**: Colaboração e compartilhamento devem ser simples e responsivos, com pontos de entrada convencionais (botão de compartilhar, sheet do sistema) e feedback claro sobre quem tem acesso e o quê pode fazer.

**Regras**:
- Coloque o botão de compartilhar em local conveniente e recorrente, como uma toolbar.
- Isso facilita iniciar compartilhamento ou colaboração a qualquer momento.
- Se precisar customizar a folha/popover de compartilhamento, ofereça os tipos de compartilhamento de arquivo que seu app suporta.
- Inclua suporte a "enviar cópia" quando aplicável ao seu tipo de armazenamento/colaboração.
- Escreva frases curtas e diretas que resumam as permissões de compartilhamento (ex.: "Só convidados podem editar", "Todos podem alterar").
- O sistema usa esse resumo de permissão num botão que revela as opções de compartilhamento.
- Ofereça um conjunto simples de opções de compartilhamento: quem acessa, se pode editar ou só ler, e se colaboradores podem adicionar novos participantes.
- Mantenha o número de escolhas customizadas ao mínimo.
- Agrupe as opções de forma que a pessoa entenda num relance.
- Exiba com destaque o botão/indicador de "colaboração ativa" assim que a colaboração começa.
- Normalmente funciona bem colocar esse indicador ao lado do botão de compartilhar.
- Ofereça ações customizadas no popover de colaboração só se necessário.
- Um popover de colaboração típico tem três seções: a do topo lista colaboradores e ações de comunicação; a do meio traz seus itens customizados; a de baixo gerencia o arquivo compartilhado.
- Não sobrecarregue o popover de colaboração com informação além do essencial.
- Se fizer sentido, customize o título do botão/view de gerenciamento de compartilhamento (por padrão "Manage Shared File") para refletir a linguagem do seu produto.
- Considere postar notificações de eventos de colaboração (mudança de conteúdo, membro entrou/saiu, menção a alguém).
- Inclua nessas notificações um link direto de volta ao contexto relevante no app.
- **visionOS**: por padrão o sistema suporta compartilhamento de tela transmitindo a janela atual para outros colaboradores no Shared Space; se alguém transiciona o app para um Full Space durante o compartilhamento, o stream pausa para os demais até o app voltar ao Shared Space.
- **watchOS**: use `ShareLink` no seu app SwiftUI para apresentar a folha de compartilhamento do sistema.

**Aplicação em web/extensão**:
- No painel web, um botão "Compartilhar" fixo (header/toolbar) que abre um modal com resumo de permissão em 1 frase e toggle simples (editar/ler, convidar ou não) é suficiente — evite formulário de permissões granulares demais.
- Mostre um indicador visível (avatar/badge "compartilhado com N pessoas") sempre que o recurso atual tiver colaboradores, e um link/deep-link no e-mail/notificação de convite que abre direto na tela relevante.
- Para extensão de navegador, ao compartilhar uma seleção/página, gere um link e copie automaticamente para a área de transferência com confirmação textual imediata (toast), evitando etapas extras.

## Drag and drop

**Essência**: Drag and drop deixa a pessoa mover ou duplicar conteúdo selecionado arrastando de uma origem (source) para um destino (destination); dentro do mesmo container normalmente move, entre containers diferentes normalmente copia.

**Regras**:
- Soltar dentro do mesmo container move o conteúdo.
- Soltar em um container diferente copia o conteúdo.
- Arrastar entre apps diferentes sempre resulta em cópia.
- Determine se, dentro do seu app, o resultado deve ser move ou copy: move faz sentido quando origem e destino são o mesmo container.
- Copy faz sentido quando origem e destino são containers diferentes.
- Antes de mudar esses padrões, prefira o comportamento que menos arrisca frustração ou perda de dado.
- Suporte drag and drop no máximo de lugares possível — as pessoas tentam usá-lo por hábito em quase tudo.
- Componentes padrão de texto (campos e views) já têm suporte embutido a drag and drop.
- Sempre ofereça alternativa não-drag para a mesma ação (ex.: menu de copiar/mover um item), já que drag and drop às vezes é inconveniente ou impossível de realizar.
- Em iOS/iPadOS, use APIs de acessibilidade para identificar origens e destinos, permitindo drag and drop via tecnologia assistiva.
- Suporte arrastar múltiplos itens de uma vez quando fizer sentido, evitando ter que arrastar item por item.
- Prefira permitir desfazer (undo) uma operação de drag-and-drop, já que às vezes a pessoa solta no destino errado por engano.
- Considere pedir confirmação antes de completar um drop que não pode ser desfeito.
- Em macOS, por exemplo, o Finder pede confirmação ao arrastar um arquivo para uma pasta write-only, porque a pessoa não vai conseguir abrir a pasta e remover o item depois.
- Em algumas situações, ofereça um jeito de reverter o resultado por outro caminho quando não é possível desfazer (ex.: cancelar o compartilhamento depois de arrastar uma foto para um álbum compartilhado).
- Considere oferecer múltiplas "fidelidades" do conteúdo arrastado, da mais rica à mais simples, para que o destino escolha a versão de maior qualidade que consegue aceitar.
- Exemplo: para um desenho de linha, ofereça PDF vetorial, PNG sem perda com transparência, e JPEG com perda sem transparência, nessa ordem.
- Para objetos ricos e complexos (ex.: gráficos), ofereça o objeto nativo seguido de uma versão mais simples (ex.: uma imagem do gráfico) para destinos que não suportam o objeto nativo.
- Considere suportar spring loading: deixar que um controle (botão, segmented control) ative quando a pessoa arrasta um conteúdo por cima e permanece ali.
- Em Mac com trackpad, um botão pode ativar com force-click enquanto a pessoa segura o conteúdo; no iPad, pode ativar ao pairar sobre o controle segurando o conteúdo.
- **Feedback durante o arraste**: mostre uma imagem de arraste (drag image) translúcida assim que a pessoa arrasta a seleção por cerca de **3 pontos (points)**.
- Mantenha a drag image visível até a pessoa soltar o conteúdo.
- A translucidez ajuda a distinguir a representação do conteúdo original e permite ver os destinos por trás dela.
- Modifique a drag image para ajudar a prever o resultado da operação, se isso ajudar (ex.: expandir para mostrar o tamanho final da imagem no destino).
- Evite mudanças constantes ou radicais na drag image, que distraem.
- Considere usar "drag flocking" para agrupar visualmente múltiplos itens sendo arrastados, confirmando que nenhum foi esquecido, e desagrupá-los ao soltar.
- Mostre se o destino aceita o drop: destaque um ponto de inserção ou contorno só quando o destino aceita.
- Mostre um ícone explícito de "não permitido" (ex.: círculo cortado) ou nenhum feedback quando o destino não aceita o drop.
- Mostre esse destaque só enquanto o conteúdo estiver posicionado sobre o destino, removendo assim que a pessoa arrasta para longe.
- Quando há múltiplos destinos possíveis, destaque um de cada vez.
- Se o drop for inválido ou falhar, dê feedback visual — o item pode voltar à sua origem (se ainda visível).
- Como alternativa, o item pode "evaporar" (escalar e desaparecer com fade), dando sensação de que não pousou com sucesso.
- **Ao aceitar drops**: role automaticamente o conteúdo do destino quando o item é arrastado sobre um container com scroll e muito conteúdo.
- Interrompa esse auto-scroll assim que a pessoa arrastar para fora do container.
- Quando há escolha, aceite a versão mais rica do conteúdo solto que seu app suporta.
- Se seu app suporta gráficos e a origem oferece um objeto de gráfico nativo além de uma imagem dele, extraia e exiba o objeto nativo; senão, use a imagem.
- Extraia só a parte relevante do conteúdo solto quando necessário (ex.: só nome e e-mail ao soltar um contato num campo de destinatário de e-mail, não o endereço completo).
- Em desktop com teclado físico conectado, verifique a tecla Option no momento do drop.
- Segurar Option força uma operação dentro do mesmo container a se comportar como cópia.
- Soltar Option antes de largar o conteúdo faz a operação voltar a ser move.
- Dê feedback quando o conteúdo solto precisa de tempo para transferir (ex.: indicador de progresso).
- Em listas, coleções e tabelas, considere mostrar um placeholder no local de destino até o conteúdo terminar de chegar.
- O sistema pode exibir um alerta quando ocorre uma transferência demorada entre apps.
- Dê feedback quando o conteúdo solto inicia uma tarefa/ação (ex.: impressão) — mostre que a tarefa começou e mantenha a pessoa informada do progresso.
- Aplique a estilização correta a texto solto: mantenha fonte/tipo/tamanho original quando origem e destino suportam os mesmos estilos.
- Se origem e destino não suportam os mesmos estilos, aplique o estilo do destino ao texto solto.
- Após o drop, mantenha o estado de seleção do conteúdo no destino.
- Ao mesmo tempo, atualize a seleção na origem conforme a operação: um move remove a seleção da origem, já que o conteúdo desaparece de lá.
- Num copy dentro do mesmo container, remova o estado de seleção do que ficou na origem.
- Ao arrastar para um container diferente, deselecione o conteúdo na origem.
- **iOS, iPadOS**: deixe a pessoa realizar múltiplas atividades de drag simultâneas — no iPadOS, é possível selecionar um item, começar a arrastar, e adicionar outros itens ao grupo antes de soltar (ex.: selecionar um ícone de app, arrastar, adicionar mais ícones, e soltar todos numa outra Home Screen ou pasta).
- Para suportar isso, permita adicionar itens durante um drag, com feedback visual via flocking, e aceite múltiplos drops simultâneos.
- **macOS**: considere deixar a pessoa arrastar conteúdo do seu app para o Finder, num formato que seu app consiga abrir depois (ex.: Calendar deixa arrastar um evento como arquivo .ics).
- Quando necessário, você pode gerar um "clipping" — um container temporário para armazenar conteúdo arrastado (ex.: a maioria dos apps do sistema deixa arrastar texto para o Finder, onde ele vira um clipping que pode ser arrastado depois para um campo de texto).
- Deixe a pessoa arrastar conteúdo selecionado de uma janela inativa sem precisar ativá-la primeiro — essa seleção em segundo plano tem aparência diferente da seleção na janela ativa, e a expectativa é poder arrastá-la direto para a janela ativa.
- Quando possível, deixe arrastar itens individuais de uma janela inativa sem afetar uma seleção em segundo plano já existente (ex.: arrastar um arquivo não selecionado de uma janela inativa do Finder sem deselecionar os arquivos já selecionados nela).
- Considere exibir um badge (pequeno oval preenchido com um número) durante operações de drag multi-item, indicando quantos itens estão sendo arrastados.
- Se o destino só aceita um subconjunto dos itens arrastados, atualize o badge para mostrar o novo número.
- Considere mudar a aparência do ponteiro para indicar o que vai acontecer ao soltar o conteúdo (ex.: ponteiro de copiar, drag link, item desaparecendo, operação não permitida).
- Ao máximo, deixe selecionar e arrastar conteúdo com um único movimento, sem exigir pausa entre selecionar e começar o drag (exceto ao selecionar múltiplos itens).
- **visionOS**: quando possível, lance seu app para lidar com conteúdo que a pessoa solta no espaço vazio — ao associar uma user activity ao seu conteúdo arrastável, seu app pode abrir uma janela/cena para lidar com o conteúdo solto (ex.: soltar uma URL no espaço vazio abre o Safari; soltar conteúdo suportado por Quick Look abre o Quick Look).

**Aplicação em web/extensão**:
- Use a Drag and Drop API nativa (`draggable`, `dragstart`, `dragover`, `drop`) e sempre ofereça um caminho alternativo por clique/menu de contexto para mover/reordenar itens (acessibilidade e paridade com teclado).
- Ao arrastar sobre uma lista/kanban, mostre imediatamente um placeholder ou highlight de onde o item vai cair; remova o highlight assim que o cursor sai da zona de drop.
- Trate erro de drop (tipo de arquivo não aceito, zona errada) com feedback imediato (borda vermelha, shake, mensagem curta) e sem exigir nova tentativa cega.
- Ofereça undo (toast com botão "Desfazer") logo após uma reordenação ou movimentação por drag and drop, para cobrir o caso de soltar no lugar errado.

## Entering data

**Essência**: Ao pedir informação para a pessoa, minimize o esforço: pré-preencha o que já é sabido pelo sistema, ofereça todos os métodos de entrada disponíveis (escolha, drag, paste) e valide o quanto antes.

**Regras**:
- Prefira obter dado do sistema (ex.: settings, localização, calendário via permissão) a pedir que a pessoa digite de novo algo que já pode ser detectado.
- Seja claro sobre o dado que você precisa: use um placeholder de exemplo no campo (ex.: "usuario@empresa.com").
- Como alternativa ao placeholder, ofereça uma label introdutória descritiva (ex.: "Email").
- Prefila campos com valores padrão razoáveis quando possível, para minimizar decisão e acelerar a entrada.
- Use um campo de texto seguro (mascarado, geralmente com um círculo preenchido por caractere) quando o dado é sensível.
- Nunca prepopule um campo de senha.
- Sempre peça que a pessoa digite a senha ou use autenticação biométrica/keychain.
- Quando possível, ofereça escolhas (picker, menu, outro seletor) em vez de exigir digitação livre.
- Escolher costuma ser mais rápido e eficiente que digitar, mesmo com teclado disponível.
- Deixe a pessoa fornecer dado arrastando/soltando ou colando, sempre que possível.
- Isso facilita a entrada e integra melhor sua experiência com o resto do sistema.
- Valide o valor do campo dinamicamente assim que a pessoa digita.
- Dê feedback assim que um problema é detectado, evitando frustração de corrigir erros só no fim de um formulário longo.
- Para dado numérico, use um formatador que aceite só valores numéricos.
- Configure o formatador para exibir o valor no formato certo (casas decimais, porcentagem, moeda).
- Deixe claro quando dado é obrigatório antes de a pessoa poder prosseguir.
- Um botão "Próximo"/"Continuar" deve ficar disponível só depois que os dados exigidos forem preenchidos.
- **macOS**: considere usar um tooltip de expansão para mostrar a versão completa de texto cortado/truncado num campo.
- Um tooltip de expansão se comporta como um tooltip normal, aparecendo quando o ponteiro fica sobre o campo — útil quando o campo é pequeno demais para exibir todo o dado que a pessoa digitou.

**Aplicação em web/extensão**:
- Em formulários web, valide campo a campo com feedback inline (borda + mensagem) no `blur`/`input`, não só no submit; desabilite o botão de envio até os campos obrigatórios estarem válidos.
- Use `autocomplete`, `type="email"`/`type="password"`, e nunca prepopule um campo de senha; ofereça "mostrar senha" em vez de pedir redigitação.
- Prefira `<select>`/combobox/radio a texto livre quando as opções são finitas e conhecidas — reduz erro de digitação e facilita internacionalização.
- Aplique formatação automática em campos numéricos/monetários (máscara de moeda, separador de milhar) enquanto a pessoa digita, em vez de validar só depois.

## Feedback

**Essência**: Feedback claro e consistente diz à pessoa o que está acontecendo, o que ela pode fazer a seguir e o resultado de uma ação — a intensidade do feedback deve casar com a importância da informação.

**Regras**:
- Feedback pode comunicar o status atual de algo.
- Feedback pode comunicar o sucesso ou falha de uma tarefa/ação importante.
- Feedback pode comunicar um aviso sobre uma ação com consequências negativas.
- Feedback pode comunicar uma oportunidade de corrigir um erro ou situação problemática.
- Casa a forma de entrega do feedback com a importância da informação.
- Status pode ser exibido de forma passiva, para a pessoa ver quando quiser.
- Um aviso de possível perda de dado precisa interromper o fluxo, dando a chance de evitar o problema.
- Torne todo feedback acessível: combine cor, texto, som e (quando aplicável) haptics.
- Assim, quem silencia o dispositivo, olha para outro lugar ou usa VoiceOver ainda recebe o feedback.
- Integre feedback de status à própria interface, perto do item que ele descreve.
- Isso deixa a pessoa ver a informação quando precisar, sem sair do contexto ou tomar ação extra.
- Use alertas (modais) para entregar informação crítica e, idealmente, acionável.
- Como alertas interrompem o contexto atual, a importância da informação precisa justificar o nível de interrupção.
- Alertas perdem impacto se usados demais ou para entregar informação sem importância — reserve-os.
- Avise a pessoa quando ela inicia uma tarefa que pode causar perda de dado inesperada e irreversível.
- Não avise quando a perda de dado é o resultado esperado da própria ação (ex.: o Finder não avisa toda vez que a pessoa joga um arquivo no lixo, porque isso é o resultado esperado).
- Quando fizer sentido, confirme que uma ação/tarefa significativa foi concluída (ex.: confirmar uma transação de pagamento bem-sucedida).
- Reserve esse tipo de confirmação para atividades importantes o bastante — normalmente a pessoa espera que a ação funcione, então só precisa saber quando ela falha.
- Mostre quando um comando não pode ser executado, e ajude a pessoa a entender por quê.
- Exemplo: se a pessoa pede uma rota sem especificar destino, o Maps explica que não pode dar direções entre o mesmo ponto de origem e destino.
- **watchOS**: evite exibir um indicador de progresso indeterminado (ex.: loading) num app watchOS — um indicador animado pode fazer a pessoa achar que precisa continuar prestando atenção ao display, o que não é uma boa experiência.
- Para dar uma experiência melhor em watchOS, tranquilize a pessoa de que ela vai receber uma notificação quando o processo terminar.

**Aplicação em web/extensão**:
- Toast/snackbar para confirmações de sucesso não-crítico; modal/dialog reservado só para decisões que bloqueiam o fluxo ou risco real de perda de dado.
- Nunca exiba um `confirm()` genérico para toda ação destrutiva — só quando a perda é inesperada; para deleções esperadas (ex.: remover item de um carrinho) o próprio "desfazer" é feedback suficiente.
- Mensagens de erro devem dizer a causa específica ("e-mail já cadastrado", não "erro ao processar"), com uma ação de correção sugerida.
- Combine indicação visual (cor/ícone) com texto em todo estado de feedback — nunca comunique status só por cor, para não depender de percepção de cor.

## File management

**Essência**: Apps baseados em documento precisam se integrar ao gerenciamento de arquivos que a pessoa já espera do sistema — criar, abrir, salvar sem esforço extra, e permitir preview via Quick Look.

**Regras**:
- Use menus de app e atalhos de teclado para dar jeitos convenientes de criar e abrir documentos.
- Sempre inclua um botão "Adicionar (+)" para criar novo documento, independente da disponibilidade de atalhos de teclado.
- Se construir um navegador de arquivos customizado, respeite o entendimento que a pessoa já tem da estrutura do sistema de arquivos (Finder/Files).
- Você pode abrir por padrão na pasta mais relevante (Documentos, iCloud, local mais recente), mas deixe navegar pelo resto do sistema de arquivos se quiser.
- **Salvar trabalho**: dê confiança de que o trabalho está sempre preservado, a menos que a pessoa cancele ou delete.
- Em geral, evite exigir uma ação explícita de "salvar".
- Faça salvamentos automáticos periódicos enquanto a pessoa edita e ao fechar um arquivo ou trocar de app.
- Esconda a extensão de arquivo por padrão, mas permita que a pessoa opte por vê-la.
- Reflita essa escolha em toda interface de abrir/salvar que você mostrar.
- **Quick Look**: use um Quick Look viewer para deixar a pessoa ver o preview de um arquivo mesmo quando seu app não consegue abri-lo.
- Isso é útil quando seu app permite anexar/interagir com arquivos que não suporta nativamente.
- Considere implementar um Quick Look generator se seu app produz tipos de arquivo customizados.
- Um Quick Look generator deixa outros apps (Finder, Files, Spotlight) exibirem previews dos seus documentos.
- **iOS/iPadOS — document launcher** (a partir do iOS/iPadOS 18): dá um jeito consistente e gráfico de navegar, abrir e criar arquivos.
- O document launcher tem três partes: um cartão de título com dois botões específicos do app, uma imagem de fundo com acessórios opcionais ao redor, e uma folha com navegador de arquivo e controles opcionais.
- Atribua os botões do cartão de título às funções mais importantes do app.
- O botão primário tipicamente cria um novo documento; o secundário pode oferecer opções adicionais (ex.: em Numbers, o primário é "Start Writing" e o secundário é "Choose a Template").
- Forneça um fundo claramente distinto dos acessórios e do cartão de título — cor sólida, gradiente ou padrão.
- Evite imagens complexas ou padrões que distraiam dos elementos em primeiro plano.
- Seja cuidadoso com o posicionamento dos acessórios — pode colocá-los na frente e atrás do cartão de título para dar profundidade.
- O nome do app e os dois botões precisam permanecer claramente visíveis; evite acessórios em excesso.
- Teste a aparência geral do document launcher em todos os tamanhos de tela e orientações que seu app suporta.
- Use animação com moderação nos acessórios — muito movimento na tela pode confundir ou desorientar.
- Prefira animações suaves e repetitivas (ex.: um acessório que parece "respirar" ou balançar suavemente).
- **iOS/iPadOS — file provider extension**: se seu app compartilha arquivos com outros apps, mostre só documentos apropriados ao contexto atual.
- Exemplo: se um app de edição de PDF carrega sua extensão, liste só arquivos PDF para abrir ou importar.
- Considere exibir informação adicional útil, como data de modificação, tamanho, e se o documento é local ou remoto.
- Deixe escolher um destino ao exportar/mover documentos, a menos que seu app armazene documentos num único diretório.
- Se seu app usa mais de um diretório, permita navegar até um destino específico e, se fizer sentido, criar novos subdiretórios.
- Evite incluir uma toolbar customizada no topo da extensão — ela já carrega dentro de uma modal que já inclui toolbar.
- Uma segunda toolbar confunde e ocupa espaço do seu conteúdo.
- **macOS — gerenciamento customizado de arquivo**: use o navegador de arquivos padrão (Finder) e a maioria dos apps baseados em documento a menos que haja motivo importante para um customizado.
- As pessoas têm fortes associações com a experiência familiar de navegação do Finder e da maioria dos apps de documento.
- Se customizar a interface de abertura de arquivo, considere oferecer uma ação "abrir recente" além da ação simples "abrir".
- Considere deixar escolher critérios para filtrar a experiência de navegação, ou selecionar múltiplos documentos para abrir de uma vez.
- Num open panel de macOS, você pode customizar o título do botão Open para refletir a tarefa (ex.: mudar para "Insert" se o app insere o conteúdo do arquivo no documento atual).
- Forneça uma interface de salvar que permita mudar o nome, formato e local de um arquivo.
- Por padrão, um documento novo se chama "Untitled" até a pessoa escolher um nome customizado.
- Se suportar salvar em diferentes formatos, dê um jeito de escolher o formato específico.
- Considere estender a funcionalidade do Save dialog adicionando uma view de acessório com configurações úteis do seu app.
- Exemplo: o diálogo de salvar mensagens do Mail como arquivos contém uma opção de incluir anexos.
- **macOS — Finder Sync extensions**: se seu app sincroniza arquivos locais e remotos, considere uma Finder Sync app extension.
- Use-a para exibir badges no Finder indicando o status de sincronização dos itens.
- Use-a também para fornecer itens de menu contextual customizados que realizam tarefas de arquivo/pasta (ex.: favoritar, adicionar proteção por senha).
- Use-a ainda para fornecer botões de toolbar customizados que realizam ações globais, como iniciar uma operação de sincronização.
- Ajude a evitar perda de trabalho se a pessoa desligar o autosave (via "Ask to keep changes when closing documents" em Desktop & Dock settings).
- Nesse cenário, mostre que um documento tem alterações não salvas e apresente um diálogo de salvar ao fechar o documento, sair do app, fazer logout ou reiniciar.
- Quando o autosave está desligado, mostre claramente quando há alterações não salvas — por exemplo, uma bolinha no botão de fechar da janela e ao lado do nome do documento no menu Window.
- Quando o autosave está ligado, nunca mostre esse indicador de bolinha, porque implica uma ação necessária que na verdade não existe.
- Independente do status de autosave, você pode acrescentar "Edited" ao título do documento na barra de título.
- Remova esse sufixo "Edited" assim que o autosave ocorrer ou a pessoa salvar explicitamente.

**Aplicação em web/extensão**:
- Em um editor/painel web com "documentos" (rascunhos, templates), faça autosave silencioso a cada mudança relevante (debounce) e mostre um indicador discreto de estado ("Salvo às 14:32" / "Salvando..."), nunca force um botão "Salvar" manual como único caminho.
- Para exportação/importação de arquivo, aceite drag-and-drop de arquivo na área de upload além do `<input type="file">`, e dê preview do conteúdo antes de confirmar o upload quando possível (equivalente web ao Quick Look).
- Nunca exija que a pessoa "salve" para não perder trabalho — se o estado é local (rascunho de mensagem, filtro configurado), persista em storage assim que muda.
- Mostre claramente quando há alterações não salvas (ex.: indicador "não salvo" no título da aba ou próximo ao botão de fechar), removendo assim que o salvamento (automático ou manual) ocorrer.

## Going full screen

**Essência**: Modo tela cheia esconde controles do sistema para criar um ambiente livre de distração; deve ser escolha da pessoa entrar e sair, nunca automático nem forçado.

**Regras**:
- Suporte tela cheia quando fizer sentido: um jogo, visualização de mídia (vídeo, slideshow de fotos), ou tarefa aprofundada que se beneficia de ambiente livre de distração.
- Se necessário, ajuste seu layout em tela cheia, mas não redimensione a janela programaticamente.
- Mantenha o conteúdo essencial em destaque, ajustando proporções sem mudar quais itens aparecem.
- Garanta que qualquer ajuste de layout seja sutil o bastante para manter uma interface consistente.
- Evite transições visualmente abruptas entre o modo tela cheia e o normal.
- Continue dando acesso a recursos e controles essenciais para completar a tarefa sem sair do modo tela cheia.
- Exemplo: uma experiência de mídia em tela cheia precisa manter controles de reprodução persistentemente disponíveis ou fáceis de revelar.
- Fora de jogos, deixe a pessoa revelar o Dock enquanto seu app está em tela cheia (iPadOS/macOS).
- É importante preservar acesso rápido a outros apps e itens do Dock.
- Em um jogo em tela cheia, pode pedir para o sistema ignorar o primeiro swipe a partir da borda inferior, evitando revelação acidental do Dock.
- Como alternativa em macOS, pode esconder o Dock inteiramente durante o jogo.
- Depois que a pessoa troca de app e volta à sua experiência em tela cheia, ajude-a a resumir de onde parou.
- Exemplo: um jogo ou slideshow precisa pausar automaticamente ao trocar de app, para a pessoa não perder nada.
- Deixe a pessoa escolher quando sair do modo tela cheia.
- Não espere que ele termine sozinho ao trocar de app ou terminar uma atividade absorvente como um jogo ou filme.
- Priorize conteúdo escondendo temporariamente toolbars e controles de navegação.
- Isso funciona bem ao ver fotos em tela cheia ou ler um documento, onde o conteúdo é o foco principal.
- Se esconder elementos, dê um gesto ou ação familiar para restaurá-los (tocar, deslizar para baixo, mover o cursor até o topo da tela).
- Mantenha sempre visíveis os controles essenciais para navegação ou realização de tarefas.
- **iOS, iPadOS**: considere adiar gestos do sistema para prevenir saídas acidentais.
- Por padrão, o indicador da Home Screen esconde pouco depois de trocar para seu app/jogo, reaparecendo ao interagir com a parte inferior da tela para permitir sair com um swipe.
- Se isso causar saídas inesperadas do seu app/jogo, você pode exigir dois swipes em vez de um.
- **macOS**: use o suporte de tela cheia do próprio sistema em vez de implementar o seu.
- Isso garante compatibilidade com todos os contextos — por exemplo, alguns modelos de Mac têm uma área de câmera no topo-centro da tela que o suporte do sistema acomoda automaticamente.
- Em um jogo, não mude o modo de exibição (display mode) ao entrar em tela cheia.
- As pessoas esperam controlar o modo de exibição, e mudar automaticamente não melhora performance.
- Sempre deixe a pessoa escolher quando entrar em tela cheia — pelo botão "Enter Full Screen" da janela, o item de menu View, ou o atalho Control-Command-F.
- Evite oferecer um menu customizado de modos de janela.
- Em um jogo, você pode oferecer um toggle customizado que liga/desliga o modo tela cheia.

**Aplicação em web/extensão**:
- Use a Fullscreen API (`requestFullscreen`) apenas mediante ação explícita do usuário (clique em botão "Tela cheia"), nunca automaticamente ao carregar a página.
- Ao entrar em tela cheia (ex.: viewer de imagem/vídeo em uma landing page), esconda a navegação do site mas mantenha um botão claro de "Sair" (X) sempre visível ou revelável ao mover o mouse/tocar.
- Retome o estado (scroll, posição de zoom, item selecionado) ao sair do modo tela cheia — nunca resete o que a pessoa estava vendo.

## Launching

**Essência**: O lançamento (launch) de um app precisa ser instantâneo e sem distração — a launch screen só existe pra dar sensação de rapidez, nunca é branding ou onboarding.

**Regras**:
- Lançamento começa quando a pessoa abre o app, inclui um download inicial e termina quando a primeira tela está pronta.
- Onboarding, se existir, vem depois do lançamento — não faz parte dele.
- Lance instantaneamente — pessoas às vezes não querem esperar mais que poucos segundos para começar a interagir.
- Se a plataforma exigir, forneça uma launch screen (não aplicável em macOS, visionOS, watchOS).
- Uma launch screen substitui rapidamente pela primeira tela real, dando impressão de rapidez e responsividade.
- Se precisar de splash screen (peça gráfica que comunica branding de forma sucinta), considere exibi-la no início do fluxo de onboarding.
- Se não houver onboarding, pode exibir o splash screen assim que o lançamento terminar.
- Restaure o estado anterior ao reiniciar o app, para a pessoa continuar de onde parou.
- Restaure detalhes granulares o quanto possível: role a view até a posição mais recente da pessoa, exiba janelas no mesmo estado/local em que ficaram.
- **Launch screens**: não fazem parte de uma experiência de onboarding, nem de um splash screen, nem são oportunidade de expressão artística.
- A única função de uma launch screen é reforçar a percepção de que sua experiência é rápida de lançar e imediatamente pronta para usar.
- Desenhe uma launch screen quase idêntica à primeira tela real do seu app/jogo.
- Elementos diferentes causam um "flash" desagradável na transição entre a launch screen e a primeira tela.
- Se sua primeira tela é uma cor sólida antes de transicionar, crie uma launch screen que mostre só essa cor.
- Garanta que a launch screen bata com a orientação e o modo de aparência (claro/escuro) atuais do dispositivo.
- Evite incluir texto na launch screen, mesmo que a primeira tela real tenha texto.
- Como o conteúdo de uma launch screen não muda, qualquer texto nela não será localizado.
- Não use a launch screen para propaganda — ela não é uma oportunidade de branding.
- Evite criar uma tela que pareça um splash screen ou uma janela "Sobre".
- Não inclua logos ou outros elementos de branding, a menos que sejam parte fixa da primeira tela real do seu app.
- **iOS, iPadOS**: lance na orientação apropriada — se o app suporta retrato e paisagem, use a orientação atual do dispositivo.
- Se sua interface roda só numa orientação, lance nela e deixe a pessoa girar o dispositivo se quiser.
- Garanta que uma interface só-paisagem responda corretamente independente de a pessoa girar o dispositivo para a esquerda ou direita.
- **tvOS**: diferente das imagens em camadas usadas no resto de um app tvOS, a launch screen é estática.
- Em um app de exibição ao vivo, considere iniciar reprodução automaticamente pouco depois de abrir o app, após alguns segundos de inatividade.
- **visionOS**: considere lançar no Shared Space mesmo que seu app seja totalmente imersivo.
- Abrir uma janela no Shared Space dá mais contexto sobre seu app enquanto ele carrega.
- Isso também permite apresentar um controle que a pessoa usa para abrir sua experiência totalmente imersiva quando quiser.

**Aplicação em web/extensão**:
- Priorize tempo até primeiro conteúdo útil (LCP) na landing page/painel — evite splash/loading artificial; se precisar de skeleton, ele deve ter o mesmo layout da tela final (evita "flash" de reflow).
- Nunca use a tela de carregamento inicial para mostrar propaganda ou branding não essencial — é sobre percepção de velocidade, não sobre marketing.
- Restaure o último estado de sessão (aba ativa, filtro aplicado, scroll) ao reabrir um painel/SPA via `localStorage`/URL params, para retomar de onde a pessoa parou.

## Live-viewing apps

**Essência**: Apps de exibição ao vivo devem priorizar e destacar o conteúdo ao vivo, deixando claro a diferença entre live e VOD (video on demand), com interações fluidas de troca de canal.

**Regras**:
- Destaque conteúdo ao vivo em toda tela e torne fácil de acessar.
- Quando o conteúdo ao vivo está na primeira aba, a pessoa não precisa tocar mais de uma vez para começar a assistir.
- Deixe tocar com um toque, ou nenhum toque, para iniciar a reprodução.
- Exemplo: um botão "Watch Now" sobre conteúdo em destaque/recém-visto que some assim que tocado, substituindo a UI do app imediatamente por uma experiência de visualização imersiva em tela cheia.
- Faça o conteúdo ao vivo parecer de fato ao vivo — a própria reprodução já é o melhor indicador.
- Marque de alguma forma (badge, símbolo, faixa) itens ao vivo numa coleção, como um grupo "Live", para diferenciar de VOD.
- Considere indicar o progresso do conteúdo ao vivo em andamento com uma barra de progresso ou outro indicador.
- Isso ajuda a pessoa a saber onde vai "cair" ao entrar num conteúdo já em progresso.
- Dê ações e alternativas de visualização além da reprodução, que é sempre a ação primária: gravar, reiniciar, baixar, favoritar.
- Mantenha essas ações na mesma ordem em todo o app (ex.: Watch, Start Over, Record, Favorite).
- Se o conteúdo atual for reprisado em outros horários, mostre essa informação para a pessoa poder programar a visualização.
- **Content footer** (rodapé de navegação de canais durante a reprodução): dê um tratamento sutil (ex.: escurecimento) para manter o texto legível.
- Ajude todos os itens do content footer a ficarem visualmente distintos do conteúdo tocando atrás dele.
- Facilite identificar a miniatura do conteúdo em reprodução (ex.: badge na miniatura ou tint na barra de progresso dela).
- Alinhe as categorias do content footer às categorias do seu guia de programação eletrônico (EPG).
- Defina um jeito simples e previsível de invocar/dispensar o content footer.
- Exemplo: se deslizar para cima invoca o footer, deslizar para baixo deve dispensá-lo.
- Dê feedback visual instantâneo ao trocar de canal — por dois motivos: confirmar que a pessoa chegou no canal certo, e cobrir o tempo de carregamento do stream.
- Combine o áudio ao contexto atual — quando a pessoa começa a assistir ao vivo, o áudio precisa tocar mesmo que ela troque para navegar enquanto o conteúdo toca em segundo plano.
- Ao sair da aba/tela "ao vivo" do app, o áudio precisa parar, já que a pessoa saiu do contexto de exibição ao vivo.
- **EPG (guia de programação eletrônico)**: mostre com destaque a informação atual (programa, canal e horário).
- Facilite voltar rapidamente à reprodução ao abrir o EPG.
- Facilite navegar o EPG paginando, rolando ou pulando.
- Considere oferecer um grupo "Meus Canais" ou "Favoritos" para acesso rápido ao conteúdo mais visto.
- Agrupe conteúdo em categorias familiares, como Filmes, Séries, Kids, Esportes e Popular.
- Se o app tem content footer, organize as miniaturas usando as mesmas categorias do EPG.
- Deixe navegar o EPG sem sair do conteúdo atual, mantendo a reprodução em picture-in-picture ou em segundo plano.
- **Cloud DVR**: permita iniciar e parar gravação a partir do painel de informação, enquanto assiste ao vivo.
- Permita gravar um programa futuro numa view com detalhes do conteúdo.
- Dê a opção de gravar só aquele episódio ou todos os futuros episódios.
- Ajude a adaptar a experiência de gravação às necessidades: gravar só o episódio atual, só episódios novos, ou só jogos de times específicos.
- Permita reprodução e outras ações específicas de conteúdo dentro da área de cloud DVR (reproduzir, deletar, ajustar configurações de gravação).
- Considere oferecer controle das configurações de cloud DVR, como deletar gravações já assistidas ou conteúdo com mais de X dias.
- Ajude a evitar que a pessoa fique sem espaço, permitindo configurar gestão automática de armazenamento que sobrescreve o conteúdo mais antigo ou já assistido.

**Aplicação em web/extensão**:
- Em um painel com stream ao vivo (ex.: métricas em tempo real, chat ao vivo), use badge "AO VIVO" com indicador de atualização em tempo real, distinto visualmente de dados históricos/estáticos.
- Dê feedback instantâneo (loading state curto) ao trocar de fonte/canal, e pare qualquer polling/websocket de dados quando a aba não está mais em foco, para economizar recursos.
- Mantenha a ordem das ações secundárias (ex.: favoritar, exportar, compartilhar) consistente em todas as telas do painel, assim como o HIG recomenda para live-viewing apps.

## Loading

**Essência**: A melhor experiência de carregamento termina antes da pessoa perceber que ela existe — mostre algo o quanto antes e nunca bloqueie o app inteiro.

**Regras**:
- Mostre algo o mais rápido possível.
- Se a pessoa espera o carregamento terminar antes de ver qualquer coisa, ela pode interpretar a ausência de conteúdo como um problema do app.
- Considere mostrar texto, gráfico ou animação de placeholder enquanto o conteúdo carrega.
- Substitua o placeholder por elementos reais assim que disponíveis.
- Deixe a pessoa fazer outras coisas no app/jogo enquanto espera o conteúdo carregar.
- Carregar em segundo plano dá acesso a outras ações — exemplo: um jogo carrega conteúdo em segundo plano enquanto o jogador aprende sobre a próxima fase ou vê um menu.
- Se o carregamento leva um tempo inevitavelmente longo, dê algo interessante para ver enquanto espera.
- Exemplos: dicas de jogo, tips, ou apresentação de novas funcionalidades.
- Meça o tempo restante de carregamento com a maior precisão possível.
- Isso evita dar tempo curto demais para aproveitar o conteúdo de espera, ou tempo longo demais a ponto de precisar repeti-lo.
- Melhore o tempo de instalação e lançamento baixando assets grandes em segundo plano.
- Considere usar o Background Assets framework para agendar downloads (ex.: pacotes de fase de jogo, modelos 3D, texturas).
- Agende esses downloads para ocorrer logo após a instalação, durante updates, ou em outros momentos não disruptivos.
- **Mostrando progresso**: comunique claramente que o conteúdo está carregando e, quando possível, quanto tempo pode levar.
- Use um indicador de progresso determinado quando você sabe quanto tempo vai levar.
- Use um indicador de progresso indeterminado quando você não sabe quanto tempo vai levar.
- Para jogos, considere criar uma view de loading customizada — indicadores padrão funcionam bem na maioria dos apps, mas às vezes destoam do estilo visual de um jogo.
- Anime e estilize a view de loading de acordo com a identidade visual do seu jogo.
- **watchOS**: evite ao máximo mostrar um indicador de carregamento — as pessoas esperam interações rápidas no Apple Watch.
- Almeje exibir conteúdo imediatamente; se o conteúdo precisa de um ou dois segundos, é melhor mostrar um indicador de carregamento do que uma tela em branco.

**Aplicação em web/extensão**:
- Use skeleton screens (placeholders com o formato real do conteúdo final) em vez de spinner genérico sempre que possível — reduz percepção de espera e evita "pulo" de layout.
- Priorize carregamento progressivo: renderize o shell da UI primeiro, dados assíncronos depois (streaming/suspense), permitindo interação parcial antes do carregamento total.
- Para uploads/downloads longos em uma extensão ou painel, use barra de progresso determinada quando o tamanho é conhecido; nunca deixe a interface travada sem nenhum feedback além de alguns segundos.
- Baixe/pré-carregue em segundo plano assets pesados (imagens, fontes, dados de rotas seguintes) logo após o carregamento inicial, em vez de esperar a navegação da pessoa para começar a buscar.

## Managing accounts

**Essência**: Conta só deve existir quando a funcionalidade principal exige; quando existir, peça o mínimo, adie o sign-in o máximo possível e sempre ofereça exclusão de conta completa (não só desativação).

**Regras**:
- Peça criação de conta só se a funcionalidade central do app/jogo exigir; caso contrário, deixe a pessoa aproveitar o app sem conta.
- Se exigir conta, considere usar Sign in with Apple para dar uma experiência de login consistente e confiável.
- Isso evita que a pessoa precise lembrar de múltiplas contas e métodos de autenticação.
- Explique o benefício de criar conta e como se cadastrar.
- Escreva uma descrição breve e amigável dos motivos e benefícios, exibida na própria tela de sign-in.
- Atrase o sign-in o máximo possível.
- Pessoas costumam abandonar apps quando forçadas a entrar antes de fazer qualquer coisa útil.
- Dê a chance de sentir o valor do app antes de pedir esse compromisso — exemplo: um app de compras pode deixar navegar livremente, exigindo login só na hora de comprar.
- Se não usar Sign in with Apple (em iOS, iPadOS, macOS ou visionOS), prefira usar passkey.
- Passkey elimina a necessidade de criar ou digitar senha.
- Ao usar passkey, a pessoa só fornece o nome de usuário para criar ou entrar numa conta.
- Se precisar continuar usando senha, reforce a segurança exigindo autenticação de dois fatores.
- Sempre identifique o método de autenticação que você oferece (ex.: título "Entrar com Face ID" em vez de "Entrar" genérico).
- Referencie só métodos de autenticação disponíveis no contexto atual.
- Não mencione Face ID num dispositivo que não o oferece — verifique as capacidades do dispositivo antes de usar a terminologia.
- Em geral, evite oferecer uma configuração específica do app para opt-in de autenticação biométrica.
- A pessoa já ativa a biometria a nível de sistema, e um toggle redundante no app pode confundir.
- Evite usar o termo "passcode" para se referir a autenticação de conta.
- A pessoa cria um passcode para desbloquear o dispositivo ou autenticar em serviços Apple.
- Usar o termo "passcode" no seu app pode fazer a pessoa pensar que você está pedindo para reusar esse passcode.
- **Deletar contas**: se você ajuda a criar uma conta dentro do app, também precisa ajudar a deletá-la — não só desativá-la.
- Cumpra os requisitos legais da sua região sobre exclusão de conta e direito ao esquecimento.
- Se exigências legais obrigam manter contas/informação (ex.: registros de saúde digitais) ou um processo específico de exclusão, descreva claramente essa situação para a pessoa.
- Ofereça um jeito claro de iniciar a exclusão de conta dentro do app.
- Se não for possível fazer isso dentro do app, forneça um link direto para a página web onde a pessoa pode fazer isso.
- Torne esse link fácil de achar, não enterrado na Política de Privacidade ou nos Termos de Serviço.
- Se a pessoa usou Sign in with Apple para criar a conta, revogue os tokens associados quando ela deletar a conta.
- Ofereça uma experiência de exclusão de conta consistente entre app e web.
- Evite tornar uma versão do fluxo de exclusão mais longa ou complicada que a outra.
- Considere permitir agendar a exclusão de conta para o futuro — a pessoa pode querer usar o restante do serviço ou esperar a renovação da assinatura antes de deletar.
- Se oferecer a opção de agendar, ofereça também a opção de exclusão imediata.
- Informe quando a exclusão de conta vai se completar.
- Notifique quando a exclusão terminar — como pode levar um tempo, é essencial manter a pessoa informada do status.
- Se você suporta compra dentro do app, ajude a pessoa a entender como funciona cobrança e cancelamento ao deletar a conta.
- A cobrança de uma assinatura auto-renovável continua através da Apple até a pessoa cancelar, independente de deletar a conta.
- Depois de deletar a conta, a pessoa precisa cancelar a assinatura ou pedir reembolso separadamente.
- Além de explicar esses cenários, forneça informação sobre como cancelar assinaturas e gerenciar compras.
- Mesmo que a pessoa não tenha comprado a assinatura pelo seu app, você ainda precisa suportar a exclusão de conta.
- **tvOS — contas de provedor de TV**: use TV Provider Authentication quando seu app exige sign-in, para a experiência de onboarding mais eficiente.
- Evite mostrar opção de sign-out quando a pessoa está autenticada a nível de sistema.
- Se seu app precisar de opção de sign-out, ela deve orientar a navegar até Settings > TV Provider para sair da conta.
- Nunca instrua a pessoa a sair da conta ajustando controles de privacidade — esses controles gerenciam quais apps acessam a conta, não são um mecanismo de sign-out.
- **tvOS**: peça o mínimo de informação necessária, já que a maioria interage via controle remoto e não teclado.
- Prefira deixar autenticar por outro dispositivo — em tvOS, ao configurar domínios associados, o Apple TV pode sugerir com segurança credenciais de sign-in de outros dispositivos, inclusive Sign in with Apple.
- Quando a pessoa está numa conta compartilhada a nível de sistema, evite pedir para escolher o perfil toda vez que ela se torna a usuária atual.
- Minimize entrada de dados — se precisar de mais que uma pequena quantidade de informação, peça para visitar um site em outro dispositivo; se precisar de um e-mail, mostre a tela de teclado de e-mail com lista de endereços recentemente digitados.
- **watchOS**: use sincronização via iCloud para dar acesso ao Keychain, permitindo autofill de nome de usuário e senha e preservando as configurações do app.

**Aplicação em web/extensão**:
- Em SaaS/painel web, permita navegação e teste do produto (demo, dados de exemplo) antes de forçar cadastro; só exija login na ação que realmente precisa de conta (salvar, comprar, publicar).
- Ofereça um caminho claro e único para excluir conta (não só "desativar"), acessível nas configurações de conta e não enterrado em política de privacidade; sempre confirme por e-mail quando a exclusão for concluída.
- Nunca reimplemente 2FA/biometria dentro do app se o navegador/SO já oferece passkey — prefira WebAuthn a formulário de senha.
- Explique claramente, no fluxo de exclusão de conta de um produto com assinatura, que o cancelamento da cobrança é um passo separado da exclusão da conta.

## Managing notifications

**Essência**: Notificação exige permissão prévia; o nível de urgência sinalizado (interruption level) precisa refletir a real importância, porque a confiança da pessoa no sistema de notificação é o que sustenta seu uso.

**Regras**:
- Peça permissão antes de enviar qualquer notificação.
- O sistema deixa a pessoa mudar essa decisão nas configurações, inclusive silenciando todas as notificações (exceto alertas governamentais em algumas localidades).
- **Integração com Focus**: a pessoa pode filtrar notificações durante um período reservado para uma atividade, como dormir, trabalhar, ler ou dirigir.
- A pessoa pode escolher receber alertas imediatamente ou num resumo entregue em horários que ela define (delivery scheduling).
- A pessoa pode identificar contatos e apps que furam o Focus para entregar alertas na hora — exemplo: num Work Focus, ela pode querer receber alertas de colegas, família e apps relacionados ao trabalho assim que chegam.
- A pessoa também pode querer receber todos os alertas Time Sensitive durante um Focus.
- Mesmo que o Focus atrase a entrega de um alerta, a notificação em si já está disponível assim que chega.
- Para suportar essas customizações, identifique os tipos de notificação que seu app pode enviar.
- Comunicações diretas (ligações, mensagens) usam notificações de comunicação, adotando SiriKit intents.
- Todo o resto usa notificações não-comunicacionais, cada uma com um nível de interrupção definido pelo sistema.
- Para uma notificação de comunicação, o sistema usa o remetente para decidir quando entregar o alerta; para uma não-comunicacional, usa o nível de interrupção que você especifica.
- **Quatro níveis de interrupção para notificações não-comunicacionais**:
  - **Passive**: informação que a pessoa pode ver quando quiser (ex.: recomendação de restaurante).
  - **Active** (o padrão): informação que a pessoa pode gostar de saber quando chega (ex.: placar de um time favorito).
  - **Time Sensitive**: informação que impacta diretamente a pessoa e exige atenção imediata (ex.: problema de segurança da conta, entrega de encomenda).
  - **Critical**: informação urgente de saúde/segurança que exige atenção imediata, extremamente rara, tipicamente de agências governamentais/públicas ou apps de saúde/casa.
- Passive e Active não forçam entrega agendada, não furam Focus e não sobrepõem o switch Ring/Silent.
- Time Sensitive força a entrega agendada e fura o Focus, mas não sobrepõe o switch Ring/Silent.
- Critical força a entrega agendada, fura o Focus, e sobrepõe o switch Ring/Silent — exige um entitlement especial para ser enviada.
- Construa confiança representando com precisão a urgência de cada notificação.
- A pessoa tem várias formas de ajustar como recebe suas notificações, inclusive desligando tudo — não queira que ela sinta que você usa alta urgência para interromper com informação de baixa prioridade.
- Use o nível Time Sensitive só para notificações relevantes no momento — a informação deve ser sobre um evento acontecendo agora ou dentro da próxima hora.
- Na primeira vez que uma notificação Time Sensitive chega do seu app, o sistema explica como ela funciona e dá um jeito de desligá-la.
- O sistema também dá oportunidades periódicas para a pessoa reavaliar se aquele tipo de notificação Time Sensitive está funcionando bem para ela.
- **Notificações de marketing**: não use notificação para enviar conteúdo promocional/de marketing a menos que a pessoa concorde explicitamente em receber esse tipo de informação.
- Nunca use o nível Time Sensitive para enviar notificação de marketing.
- Mesmo que a pessoa tenha concordado em receber notificações de marketing, elas nunca devem furar um Focus ou uma configuração de entrega agendada.
- Peça permissão explícita antes de enviar notificações promocionais/de marketing.
- Crie um alerta, view modal ou outra interface que descreva os tipos de informação que você quer enviar, com um jeito claro de aceitar/recusar.
- Garanta que a pessoa consiga gerenciar suas configurações de notificação dentro do seu app.
- Além de pedir permissão inicial, forneça uma tela de configurações dedicada para mudar essa escolha depois.
- **watchOS**: por padrão, as configurações de notificação usadas para apps no iPhone se aplicam ao mesmo app no Apple Watch.
- A pessoa pode gerenciar isso no app Apple Watch no iPhone.
- Ela também pode acessar opções por notificação (ex.: Mute 1 Hour, Turn off Time Sensitive) deslizando para a esquerda quando a notificação chega no relógio.

**Aplicação em web/extensão**:
- Peça permissão de notificação do navegador (`Notification.requestPermission()`) só depois de a pessoa já ter engajado com o produto (ex.: após primeira ação relevante), nunca no primeiro load da página.
- Separe claramente, no opt-in, notificações transacionais/essenciais de notificações de marketing — nunca misture as duas categorias de permissão em um único toggle.
- Numa extensão que envia notificações do sistema, use nível de urgência proporcional (badge silencioso para status, notificação de sistema só para algo que realmente exige ação imediata) para não treinar o usuário a ignorá-las.
- Ofereça, dentro do próprio painel, uma página de configurações de notificação onde a pessoa possa ajustar granularmente o que recebe, além do toggle nativo do navegador/SO.

## Modality

**Essência**: Modalidade apresenta conteúdo num modo dedicado que bloqueia interação com a view por trás e exige ação explícita para fechar — só deve ser usada quando há benefício claro, nunca por padrão.

**Regras**:
- Apresentar conteúdo modalmente pode garantir que a pessoa receba informação crítica e, se necessário, aja sobre ela.
- Também pode dar opções para confirmar ou modificar a ação mais recente da pessoa.
- Também ajuda a executar uma tarefa distinta e delimitada sem perder o contexto anterior.
- Também dá uma experiência imersiva ou ajuda a concentrar numa tarefa complexa.
- Use modal só quando há benefício claro — ela tira a pessoa do contexto atual e exige uma ação para fechar.
- Só use modalidade quando ela ajuda a focar ou tomar decisões que afetam o conteúdo/dispositivo.
- Mantenha tarefas modais simples, curtas e enxutas.
- Se uma tarefa modal é complicada demais, a pessoa pode perder o fio da tarefa que suspendeu, especialmente se a modal esconde o contexto anterior.
- Evite criar uma experiência modal que pareça "um app dentro do app".
- Apresentar uma hierarquia de views dentro de uma tarefa modal pode fazer a pessoa esquecer como retraçar os passos.
- Se uma tarefa modal precisar conter subviews, forneça um único caminho pela hierarquia.
- Evite botões que possam ser confundidos com o botão que fecha a modal.
- Considere um estilo modal em tela cheia para conteúdo aprofundado ou tarefa complexa.
- Esse estilo minimiza distração, funcionando bem para vídeos, fotos, câmera, ou tarefas multi-etapa como marcar um documento ou editar uma foto.
- Sempre dê um jeito óbvio de fechar a modal.
- Em geral, siga as convenções que a pessoa já conhece na plataforma: um botão na toolbar do topo ou deslizar para baixo em mobile/watchOS; um botão na view de conteúdo principal em macOS/tvOS.
- Quando necessário, ajude a evitar perda de dado pedindo confirmação antes de fechar uma modal.
- Se fechar pode resultar em perda de conteúdo gerado pela pessoa, explique a situação e dê formas de resolver (ex.: uma opção de salvar num action sheet).
- Torne fácil identificar a tarefa de uma modal.
- Dê um título que nomeie a tarefa, ou texto adicional que a descreva, para ajudar a pessoa a manter seu lugar no app.
- Deixe a pessoa fechar uma modal antes de apresentar outra.
- Múltiplas modais visíveis ao mesmo tempo tendem a criar clutter visual e fazem o app parecer desorganizado.
- A pessoa precisa lembrar do contexto anterior, e empilhar modais aumenta a carga cognitiva, especialmente quando uma modal esconde outra.
- Um alerta pode aparecer sobre todo o resto do conteúdo, inclusive outras modais.
- Nunca mostre mais de um alerta ao mesmo tempo.

**Aplicação em web/extensão**:
- Reserve `<dialog>`/modal para tarefas curtas e bem delimitadas (confirmar exclusão, editar um único campo); nunca empilhe dois modais — feche o atual antes de abrir outro.
- Sempre dê um X/Cancelar visível e permita fechar com Esc e clique fora (quando não há risco de perda de dado); se há dado não salvo, confirme antes de fechar.
- Para tarefas multi-etapa (wizard), evite modal quando a tarefa é longa — prefira página dedicada com breadcrumb, porque modal longa faz o usuário perder o contexto.
- Dê um título visível no cabeçalho de todo modal que nomeie a tarefa, para reforçar contexto ao reabrir uma aba ou voltar de outra janela.

## Multitasking

**Essência**: Multitarefa é esperada por padrão — todo app precisa salvar/restaurar contexto a qualquer momento e responder bem a interrupções, sem exceções fora de casos muito específicos (jogos, experiências imersivas).

**Regras**:
- Com raras exceções (alguns jogos, apps do Apple Vision Pro rodando em Full Space), todo app precisa funcionar bem com multitarefa.
- A pessoa pode achar que algo está errado se seu app não permitir multitarefa.
- Esteja sempre pronto para salvar e restaurar contexto, já que você não controla quando a pessoa vai iniciar multitarefa.
- Pause atividades que exigem atenção/participação ativa (jogo, app de mídia) ao trocar de app.
- Garanta que a pessoa não perca nada; ao voltar, deixe continuar como se nunca tivesse saído.
- Responda de forma suave a interrupções de áudio.
- Pause indefinidamente para interrupções de áudio primário, como música, podcast ou audiobook (ex.: uma ligação recebida, ou uma playlist iniciada pela Siri).
- Para interrupções mais curtas (ex.: notificação de direção do GPS), abaixe temporariamente o volume ou pause.
- Retome o volume/reprodução original quando a interrupção terminar.
- Termine em segundo plano tarefas iniciadas pela pessoa, como download de assets ou processamento de um arquivo de vídeo.
- Se a tarefa não precisa de input adicional, complete-a em segundo plano antes de suspender o app.
- Use notificações com moderação.
- Se a pessoa inicia uma tarefa importante/time-sensitive e troca de app, considere notificar quando terminar, para ela poder voltar e dar o próximo passo.
- Para tarefa rotineira/secundária, evite notificação desnecessária — deixe a pessoa checar ao voltar.
- **iOS**: multitarefa permite usar FaceTime ou assistir vídeo em Picture in Picture enquanto usa outro app.
- O app switcher mostra todos os apps abertos.
- Uma chamada FaceTime em andamento pode continuar enquanto a pessoa usa outro app.
- **iPadOS**: a pessoa pode ver e interagir com janelas de vários apps ao mesmo tempo.
- Um app individual pode ter múltiplas janelas abertas, permitindo ver e interagir com mais de uma janela do mesmo app.
- Apps podem rodar em tela cheia (trocados via app switcher) ou em modo janela.
- Em modo janela, as janelas são redimensionáveis e a pessoa pode arranjá-las com comportamento parecido com o macOS.
- O sistema fornece controles de janela para configurações comuns de tiling, entrar em tela cheia, minimizar e fechar janelas.
- A janela em foco é identificada por cor nos controles da janela e sombra projetada sobre as janelas atrás.
- Apps não controlam nem recebem indicação da configuração de multitarefa que a pessoa escolheu.
- Garanta que seu app se adapte bem a diferentes tamanhos de tela quando aberto em modo janela.
- Vídeos e chamadas FaceTime também podem tocar num overlay de Picture in Picture, independente de os apps estarem em tela cheia ou em janela.
- **macOS**: multitarefa é a experiência padrão — a pessoa tipicamente roda mais de um app ao mesmo tempo, trocando entre janelas e tarefas.
- Quando múltiplas janelas de apps estão abertas, o macOS aplica sombras que fazem as janelas parecerem em camadas na área de trabalho.
- O macOS também aplica outros efeitos visuais para ajudar a diferenciar estados de janela.
- **tvOS**: é possível reproduzir ou navegar conteúdo enquanto também assiste filmes/programas em Picture in Picture (quando suportado).
- **visionOS**: múltiplos apps podem rodar ao mesmo tempo no Shared Space, com janelas e volumes que a pessoa visualiza e alterna.
- Só uma janela está ativa por vez.
- Ao olhar de uma janela para outra, a que está sendo olhada fica ativa e a anterior fica mais translúcida, recuando no eixo z.
- Fechar a janela de um app no Shared Space transiciona o app para segundo plano sem encerrá-lo.
- Se o app é o "Now Playing", fechar sua janela pausa automaticamente a reprodução de áudio, retomável no Control Center sem reabrir a janela.
- Evite interferir no comportamento de multitarefa do sistema em visionOS.
- Quando a pessoa olha de uma janela para outra, o sistema aplica uma máscara "feathered" na janela que perdeu o foco, para clarificar seu estado mudado.
- Para não atrapalhar esse feedback, não mude a aparência das bordas de uma janela.
- Não pause a reprodução de vídeo de uma janela quando a pessoa olha para longe dela.
- Assim como no macOS, espera-se que a reprodução iniciada numa janela continue enquanto a pessoa vê/faz outra tarefa em outra janela.
- Esteja preparado para situações onde seu áudio pode "duckar" (abaixar automaticamente) — a menos que seu app seja o app "Now Playing" atual, seu áudio pode abaixar quando a pessoa olha para outro app.

**Aplicação em web/extensão**:
- Persista o estado da aplicação (formulário em progresso, filtro aplicado, aba ativa) em storage local ou na URL, para sobreviver a troca de aba, refresh ou fechamento acidental.
- Continue e finalize uploads/exports em segundo plano (Web Worker, Service Worker) mesmo se a aba perder foco; notifique (toast ou notificação do navegador) só quando a tarefa é longa e importante o bastante para justificar interromper.
- Pause polling/websocket/animações custosas quando a aba está em background (`document.visibilityState`) para não desperdiçar recursos, e retome sem perder o estado ao voltar o foco.
- Não pause reprodução de áudio/vídeo iniciada numa aba/janela quando o foco muda para outra aba do mesmo produto — só pause ao trocar para um contexto realmente diferente (outra origem, outro app).

## Offering help

**Essência**: A melhor experiência é intuitiva o bastante para não precisar de ajuda, mas quando necessário, ofereça ajuda contextual, curta e no momento certo — nunca explique como componentes padrão funcionam.

**Regras**:
- Deixe as tarefas do seu app informarem que tipo de ajuda a pessoa pode precisar.
- Para tarefas simples de 1-2 passos, uma view inline que descreve a tarefa sucintamente pode bastar.
- Para tarefas complexas/multi-etapa, considere um tutorial que ensine a alcançar objetivos maiores.
- Em geral, relacione a ajuda diretamente com a ação/tarefa que a pessoa está fazendo agora.
- Torne fácil dispensar ou evitar a ajuda se a pessoa não precisar dela.
- Use linguagem e imagens relevantes e consistentes no conteúdo de ajuda.
- Sempre garanta que a orientação é apropriada ao contexto atual — exemplo: não mostre dicas com controle de jogo se a pessoa está usando o Siri Remote.
- Certifique-se de que os termos e descrições são consistentes com a plataforma — não escreva "clique" para um botão em iPhone nem "toque num item de menu" para Mac.
- Torne todo conteúdo de ajuda inclusivo.
- Evite inchar seu conteúdo de ajuda explicando como componentes ou padrões padrão funcionam.
- Descreva a ação/tarefa específica que aquele elemento realiza no seu app, em vez de reexplicar o componente.
- Se seu produto introduz um controle único ou espera um uso não convencional de um dispositivo de entrada, oriente rapidamente.
- Prefira animação ou gráfico a uma descrição longa para orientar sobre um uso não convencional.
- **Tips** (dicas transitórias que ensinam como usar uma feature): use popover tip quando quer preservar o fluxo de conteúdo.
- Use inline tip quando quer garantir que a informação ao redor continue visível.
- Use um inline tip de anotação para apontar para um elemento específico de UI.
- Use um inline tip de hint quando a dica não está ligada a uma peça específica de UI.
- Use tips para features simples — funcionam melhor com passos fáceis de descrever.
- Se uma feature exige mais de **3 ações**, ela provavelmente é complicada demais para um tip.
- Torne tips curtos, acionáveis e envolventes — o objetivo de um tip é encorajar a pessoa a experimentar a nova feature.
- Use linguagem direta e orientada a ação, descrevendo o que a feature faz e como usá-la.
- Mantenha o tip em **1 ou 2 frases**.
- Evite incluir conteúdo promocional ou relacionado a uma feature/fluxo diferente do atual.
- Defina regras de elegibilidade para que os tips alcancem a audiência certa.
- Nem todo mundo se beneficia de todo tip — exemplo: quem já usou a feature não aprecia ver um tip sobre ela.
- Use regras baseadas em parâmetro ou evento para controlar quando um tip aparece.
- Quando há mais de um tip no app, defina a frequência de exibição para uma cadência razoável — por exemplo, uma vez a cada **24 horas**.
- Se há uma imagem/símbolo associado à feature, considere incluí-lo no tip, preferindo a variante preenchida (filled).
- Evite repetir a mesma imagem no tip e na UI, se o tip já se conecta diretamente a ela.
- Use botões para direcionar a pessoa a informação ou opções, quando a feature tem configurações customizáveis.
- Se há mais informação que a pessoa possa achar útil, adicione um botão que leve direto a esse lugar (ex.: um fluxo de setup).
- **Tooltips (macOS, visionOS)** — chamados de "help tag" na documentação: aparecem ao segurar o ponteiro sobre um elemento em apps rodando no Mac.
- Em visionOS, um tooltip pode aparecer ao olhar para o elemento ou segurar o ponteiro sobre ele.
- Descreva só o controle específico que a pessoa demonstrou interesse — não ensine sobre controles vizinhos.
- Não ensine sobre uma tarefa maior no tooltip de um controle específico.
- Explique a ação/tarefa que o controle inicia, começando de preferência com um verbo (ex.: "Restaurar configurações padrão").
- Outro exemplo de boa descrição: "Adicionar ou remover um idioma da lista".
- Em geral, evite repetir o nome do controle no tooltip — repetir ocupa espaço e raramente agrega valor.
- Seja breve: limite o conteúdo do tooltip a no máximo **60 a 75 caracteres**.
- Lembre que a localização costuma mudar o tamanho do texto, então deixe margem.
- Use fragmento de frase e omita artigos para ser direto.
- Se precisar de muito texto para descrever um controle, considere simplificar o design da interface.
- Use sentence case (só a primeira letra maiúscula) — parece mais casual e acessível.
- Se escrever frases completas, omita pontuação final a menos que seja necessária para consistência com o estilo do seu app.
- Considere oferecer tooltips sensíveis ao contexto — por exemplo, textos diferentes para estados diferentes de um controle.

**Aplicação em web/extensão**:
- Use tooltips nativos (`title`) ou componentes leves só para explicar o quê um controle faz, com texto curto (uma frase, sem repetir o label do botão) — nunca use tooltip para instrução longa.
- Para onboarding de feature nova num painel/extensão, prefira um tooltip contextual (coach mark) pontual e dispensável a um modal de tutorial completo, respeitando regra de "só mostrar se a pessoa ainda não usou a feature".
- Limite a cadência de dicas (ex.: não mostrar mais de uma coach mark por sessão, ou repetir a cada 24h no máximo) para não sobrecarregar quem já conhece o produto.
- Mantenha o texto de cada tooltip curto (na faixa de 60-75 caracteres é um bom teto também para web) e comece com um verbo de ação.

## Onboarding

**Essência**: Onboarding deve ser rápido, divertido e opcional — idealmente a pessoa entende o produto simplesmente usando-o; onboarding acontece depois do launch, nunca faz parte dele.

**Regras**:
- Ensine por interatividade — as pessoas retêm melhor a informação quando realizam de fato a tarefa que estão aprendendo.
- Isso funciona melhor do que só ver material instrucional passivo.
- Ao máximo, ofereça um onboarding interativo onde a pessoa testa uma ação, descobre uma feature ou experimenta uma mecânica com segurança.
- Considere oferecer uma coleção de dicas contextuais específicas em vez de um único fluxo de onboarding.
- Integrar dicas relevantes ao contexto ajuda a aprender sobre a tarefa atual enquanto a pessoa avança no app/jogo.
- Um tip contextual também ajuda a aprender melhor, porque concentra a atenção numa única ação/tarefa por vez.
- Quando o conteúdo instrucional se refere a uma área específica da interface, exiba as instruções perto dessa área.
- Se precisar de um fluxo de onboarding pré-requisito, desenhe uma experiência breve e agradável.
- Não exija memorizar muita informação — onboarding rápido e divertido tem mais chance de ser completado.
- Se você tentar ensinar demais, a pessoa pode se sentir sobrecarregada e reter menos.
- Se fizer sentido oferecer um tutorial separado, considere torná-lo opcional.
- Se a pessoa pular o tutorial no primeiro lançamento, não apresente de novo em lançamentos seguintes.
- Mesmo assim, deixe fácil de achar depois — por exemplo, disponível numa área de ajuda, conta ou configurações.
- Mantenha o conteúdo de onboarding focado na experiência que você oferece.
- A pessoa entra para aprender sobre seu app/jogo, não sobre como usar o sistema ou o dispositivo.
- Se precisar de splash screen, desenhe um gráfico bonito que comunique de forma sucinta.
- Exiba o splash screen só o tempo suficiente para a pessoa absorver a informação num relance, sem sentir que está atrasando a experiência.
- Não deixe downloads grandes atrapalharem o onboarding.
- Considere incluir mídia e conteúdo suficiente no pacote de software para não obrigar espera antes de interagir, seja participando do onboarding ou pulando.
- Evite exibir detalhes de licenciamento dentro do fluxo de onboarding.
- Deixe a App Store mostrar acordos e disclaimers antes do download.
- Se precisar incluir esses itens dentro do fluxo de onboarding, integre de forma balanceada, sem interromper a experiência.
- Adie fluxos de configuração ou passos de customização não essenciais.
- Forneça configurações padrão razoáveis para que a maioria comece a interagir imediatamente sem configuração extra.
- Se precisar de acesso a dado/recurso privado antes de funcionar, considere integrar o pedido de permissão ao fluxo de onboarding.
- Isso dá a chance de mostrar por que você precisa daquele dado e os benefícios de concedê-lo.
- Senão, apresente o pedido de permissão só quando a pessoa acessar a função específica que depende daquele dado/recurso.
- Prefira deixar a pessoa experimentar seu app/jogo antes de pedir avaliações ou compras.
- A resposta tende a ser mais positiva depois de a pessoa já estar engajada com a experiência.

**Aplicação em web/extensão**:
- Prefira coach marks/tooltips contextuais espalhados pelo primeiro uso real a um carrossel de slides explicativos antes de liberar o produto.
- Configure defaults sensatos (tema, layout, filtros) para que a pessoa comece a usar sem passar por um wizard de configuração inicial; deixe a customização acessível depois, em configurações.
- Peça permissão de dados sensíveis (localização, câmera, notificação do navegador) só no momento em que a funcionalidade correspondente é usada pela primeira vez, com uma frase de contexto explicando o motivo — nunca no carregamento da página.
- Se oferecer um tutorial opcional, não force de novo em quem já pulou uma vez — mantenha-o acessível a partir de um menu de ajuda para quem quiser revisitar.

## Playing audio

**Essência**: Áudio deve se adaptar automaticamente ao contexto do dispositivo (silêncio, volume, troca de saída) sem que o app tente controlar o volume geral do sistema.

**Regras**:
- Dispositivos tocam áudio de várias formas: alto-falantes internos/externos, fones, e sem fio via Bluetooth ou AirPlay.
- A pessoa controla o som via botões de volume, o switch Ring/Silent no iPhone, controles do fone, o slider de volume da Control Center, e controles de som de acessórios de terceiros.
- Seu app precisa se comportar como esperado em todas essas mudanças de volume e saída.
- **Silêncio**: quando a pessoa coloca o dispositivo em silencioso, ela quer evitar interrupções por sons inesperados como toques e tons de mensagem.
- Ela também quer silenciar sons não essenciais, como cliques de teclado, efeitos sonoros, trilhas de jogo e outro feedback audível.
- Em modo silencioso, o dispositivo toca só o áudio que a pessoa iniciou explicitamente — reprodução de mídia, alarmes, mensagens de áudio/vídeo.
- **Volume**: a pessoa espera que sua configuração de volume afete todo o som do sistema, inclusive música e efeitos sonoros do app.
- Isso vale independente do método usado para ajustar o volume — exceto o volume do toque no iPhone, ajustável separadamente em Configurações.
- **Fones de ouvido**: ao conectar, a pessoa espera que o som seja redirecionado automaticamente sem interrupção.
- Ao desconectar fones, ela espera que a reprodução pause imediatamente.
- Ajuste níveis automaticamente quando necessário — não ajuste o volume geral do sistema.
- Seu app pode ajustar níveis relativos e independentes para conseguir um bom mix de áudio, mas o volume do sistema sempre governa a saída final.
- Permita reroteamento de áudio quando possível.
- A pessoa às vezes quer ouvir por outro dispositivo de saída, como o estéreo da sala, o rádio do carro, ou uma Apple TV.
- Suporte reroteamento a menos que haja uma razão forte para não permitir.
- Use a view de volume do sistema para deixar a pessoa fazer ajustes de áudio.
- Ela inclui um slider de nível de volume e um controle para reroteamento de saída; você pode customizar a aparência do slider.
- Escolha uma categoria de áudio que combine com o uso de som do seu app/jogo.
- **Categorias de áudio**:
  - **Solo ambient**: som não essencial, mas silencia outros áudios (ex.: trilha de um jogo) — responde ao switch de silêncio, não mixa com outros sons, não toca em segundo plano.
  - **Ambient**: som não essencial, não silencia outros áudios (ex.: um jogo que deixa tocar música de outro app durante o gameplay) — responde ao switch de silêncio, mixa com outros sons, não toca em segundo plano.
  - **Playback**: som essencial, pode mixar com outro áudio (ex.: audiobook ou app de idiomas) — não responde ao switch de silêncio, pode ou não mixar com outros sons, pode tocar em segundo plano.
  - **Record**: som é gravado (ex.: app de notas com gravação de áudio) — não responde ao switch de silêncio, não mixa com outros sons, pode gravar em segundo plano.
  - **Play and record**: som é gravado e tocado, possivelmente ao mesmo tempo (ex.: app de mensagem de áudio ou chamada de vídeo) — não responde ao switch de silêncio, pode ou não mixar, pode gravar e tocar em segundo plano.
- Responda a controles de áudio externos (Control Center, controles do fone) só quando fizer sentido.
- Se o app está tocando áudio ativamente, num contexto claramente relacionado a áudio, ou conectado a um dispositivo Bluetooth/AirPlay, tudo bem responder.
- Senão, evite interromper áudio que já está tocando de outro app quando a pessoa ativa um controle.
- Evite reaproveitar controles de áudio para outro significado.
- A pessoa espera que controles de áudio se comportem de forma consistente em todos os apps.
- Se seu app não suporta certos controles, simplesmente não responda a eles.
- Considere criar controles customizados de player de áudio só se precisar de comandos que o sistema não suporta.
- Exemplo: incrementos customizados de avanço/retrocesso, ou exibir informação relacionada, como um placar esportivo.
- Avise outros apps quando seu app termina de tocar áudio temporário que interrompeu outros.
- Flag sua sessão de áudio para que outros apps saibam quando podem retomar.
- **Lidando com interrupções**: determine como responder a interrupções de sessão de áudio.
- Exemplo: se seu app faz gravação ou tarefa relacionada a áudio que a pessoa não quer interrompida, você pode dizer ao sistema para não interromper o áudio atual por uma ligação recebida a menos que a pessoa escolha atender.
- Outro exemplo: um app VoIP precisa encerrar uma chamada quando a pessoa fecha o Smart Folio do iPad enquanto usa o microfone embutido, já que fechar o Smart Folio muta o microfone e interrompe a sessão de áudio por padrão.
- Ao final de uma interrupção, decida se retoma a reprodução automaticamente.
- Uma interrupção pode ser resumível (ex.: ligação recebida) ou não-resumível (ex.: início de uma nova playlist).
- Use o tipo de interrupção e o tipo do seu app para decidir se retoma — um app de reprodução de mídia deve checar se a interrupção é resumível antes de continuar.
- Um jogo pode retomar automaticamente sem checar o tipo, já que toca áudio sem escolha explícita da pessoa.
- **iOS, iPadOS**: use os serviços de som do sistema para tocar sons curtos e vibrações.
- **macOS**: por padrão, os sons de notificação mixam com outro áudio.
- **tvOS**: o sistema toca áudio só quando a pessoa o inicia, através de interações dentro de apps/jogos ou calibrações de dispositivo — o tvOS não toca sons para acompanhar componentes como alertas ou notificações.
- **visionOS**: sons sutis e expressivos estão por toda parte, reforçando experiências e dando feedback essencial ao olhar/gesticular sobre um objeto virtual.
- O sistema combina algoritmos de áudio com informação sobre o entorno físico para produzir Spatial Audio — som percebido como vindo de locais específicos no espaço, não só dos alto-falantes.
- Em visionOS, como em toda plataforma, evite comunicar informação importante usando só som — sempre ofereça formas adicionais de entender o app.
- A reprodução do app "Now Playing" pausa automaticamente ao fechar a janela do app.
- Áudio de um app que não é o Now Playing pode "duckar" (abaixar) quando a pessoa olha para outro app.
- Prefira tocar som — a pessoa geralmente mantém sons audíveis enquanto usa o dispositivo.
- Um app sem som, especialmente num momento imersivo, pode parecer sem vida ou até quebrado.
- Projete sons customizados para elementos de UI customizados, já que elementos do sistema tocam som para ajudar a localizá-los e dar feedback de interação.
- Use Spatial Audio para criar experiência intuitiva e envolvente, especialmente em contexto totalmente imersivo.
- Considere usar áudio ambiente, que ancora a pessoa num mundo virtual, e áudio pontual, que parece vir de um objeto específico.
- Considere definir uma variedade de lugares de onde os sons do seu app podem se originar, já que Spatial Audio ajuda a localizar o que faz o som, parado ou em movimento.
- Considere variar sons que poderiam parecer repetitivos ao longo do tempo.
- Randomizar tom e volume durante a reprodução é um jeito eficiente de criar variação, em vez de criar arquivos diferentes.
- Decida entre som fixo no usuário (percebido como apontado direto para a pessoa, independente de para onde ela olha) e som rastreado por objeto (parece vir de um objeto específico, mudando com a distância).
- Use tracked sound para reforçar realismo, mas há casos para fixed sound — exemplo: um app de mindfulness usa som fixo para envolver a pessoa num ambiente pacífico.
- **watchOS**: o sistema gerencia a reprodução de áudio.
- Um app pode tocar clipes curtos em primeiro plano, ou áudio mais longo que continua mesmo com o pulso baixado ou trocando de app.
- Use os valores de encoding recomendados para assets de mídia: **64 kbps HE-AAC** (High-Efficiency Advanced Audio Coding), para boa qualidade com requisito de dado menor.
- Considere apresentar uma view Now Playing para controlar áudio atual/recente sem sair do app.
- Essa view também mostra informação sobre a fonte atual, que pode ser outro app no relógio ou no iPhone, e seleciona automaticamente a fonte atual ou mais recente.

**Aplicação em web/extensão**:
- Nunca force `volume` do elemento `<audio>`/`<video>` acima do que o usuário configurou no sistema/navegador; ofereça só o controle de volume relativo do seu player.
- Pause automaticamente qualquer áudio/vídeo em autoplay quando a aba perde o foco ou quando outro player de mídia (do navegador ou de outra aba) começa a tocar — não force dois áudios a mixar.
- Numa extensão que manipula áudio (leitor de texto, transcrição), pare o áudio imediatamente ao trocar de aba ou ao a pessoa clicar em qualquer controle de mídia nativo do navegador.
- Se o produto oferece player de áudio customizado, mantenha os atalhos e a Media Session API (`navigator.mediaSession`) para integrar com os controles de mídia do sistema operacional/notificação.

## Playing haptics

**Essência**: Haptics reforçam a relação causa-efeito entre ação e resultado, complementando (nunca substituindo) feedback visual/sonoro; devem ser usados com moderação e sempre opcionais.

**Regras**:
- Dependendo da plataforma e do dispositivo, o sistema pode tocar haptics além de feedback visual e sonoro.
- Exemplo: switches, sliders e pickers tocam feedback háptico automaticamente em iPhones suportados.
- No Apple Watch, o Taptic Engine gera haptics combinados com um tom audível para vários padrões embutidos.
- Num Mac com trackpad Force Touch, um app pode tocar haptics ao arrastar conteúdo ou ao force-click para mudar a velocidade de controles de mídia.
- Dispositivos de entrada externos também podem tocar haptics: controles de jogo em apps iPadOS, macOS, tvOS ou visionOS.
- Apple Pencil Pro e alguns trackpads podem prover feedback háptico em certos modelos de iPad.
- Use padrões hápticos do sistema só conforme seu significado documentado.
- A pessoa reconhece haptics padrão porque o sistema os toca de forma consistente em controles padrão.
- Se o caso de uso documentado não fizer sentido no seu app, use um padrão genérico ou crie o seu próprio, em vez de reaproveitar um padrão existente para significar outra coisa.
- Use haptics de forma consistente em todo o app/jogo.
- É crucial construir uma relação causal clara entre cada haptic e a ação que o causa, para a pessoa aprender a associar certos padrões a certas experiências.
- Se um haptic não reforça uma relação causa-efeito, pode parecer confuso ou gratuito.
- Exemplo: se o mesmo padrão é usado tanto para falha quanto para sucesso, a pessoa fica confusa.
- Prefira usar haptics para complementar outro feedback no app/jogo.
- Quando feedback visual, sonoro e tátil estão em harmonia, como geralmente acontece no mundo físico, a experiência parece mais coerente e natural.
- Em geral, combine a intensidade e nitidez de um haptic com a intensidade e nitidez da animação que ele acompanha.
- Você também pode sincronizar som com haptics para reforçar essa harmonia.
- Evite abusar de haptics — às vezes um haptic parece certeiro ocasionalmente, mas cansativo se tocar com frequência.
- Teste com usuários reais para achar o equilíbrio certo.
- Muitas vezes o melhor haptic é aquele que a pessoa não percebe conscientemente, mas sente falta se desligado.
- Na maioria dos apps, prefira haptics curtos que complementem eventos discretos.
- Haptics longos que acompanham um fluxo de gameplay podem melhorar a experiência num jogo, mas em um app podem diluir o significado do feedback e distrair da tarefa.
- No Apple Pencil Pro, por exemplo, haptics contínuos ou duradouros geralmente não esclarecem a experiência de escrever/desenhar e podem até tornar segurar a caneta menos agradável.
- Torne haptics opcionais — deixe a pessoa desligar ou silenciar haptics.
- Garanta que a pessoa ainda consiga aproveitar o app/jogo mesmo sem eles.
- Esteja ciente de que tocar haptics pode impactar outras experiências.
- Por design, haptics produzem força física suficiente para serem sentidos — garanta que a vibração não atrapalhe experiências que envolvam câmera, giroscópio ou microfone.
- **Haptics customizados**: jogos costumam usar haptics customizados para reforçar o gameplay.
- Apps que não são jogos também podem usar haptics customizados para uma experiência mais rica.
- É possível projetar padrões hápticos customizados que variam dinamicamente conforme input ou contexto.
- Exemplo: o impacto de um personagem pulando de uma árvore pode ser mais forte que pulando no lugar.
- Uma colisão pode parecer muito diferente de experiências mais sutis, como passos se aproximando.
- Dois blocos básicos para gerar padrões customizados: **eventos transientes**, breves e compactos, como toques ou impulsos (ex.: tocar o botão de lanterna na tela inicial).
- **Eventos contínuos**: sensação de vibração sustentada, como o efeito de laser numa mensagem.
- Além do tipo de evento, você pode controlar nitidez (sharpness) e intensidade.
- Sharpness abstrai a experiência háptica na forma de onda que produz a sensação física, permitindo comunicar experiências suaves/arredondadas/orgânicas ou nítidas/precisas/mecânicas.
- Intensidade, como o termo implica, é a força do haptic.
- **iOS — padrões predefinidos de feedback generator**, em três categorias:
  - **Notification**: Success (tarefa/ação concluída), Warning (produziu um aviso), Error (ocorreu um erro).
  - **Impact**: Light (colisão entre objetos pequenos/leves), Medium (objetos médios), Heavy (objetos grandes/pesados), Rigid (objetos duros/inflexíveis), Soft (objetos macios/flexíveis).
  - **Selection**: Selection (indica que os valores de um elemento de UI estão mudando).
- **macOS (Magic Trackpad)**: três padrões hápticos disponíveis em resposta a um drag ou force click.
  - **Alignment**: indica alinhamento de um item arrastado (ex.: alinhar uma forma com outra, encaixar em dimensões específicas, atingir início/fim/mínimo/máximo de um scrubber).
  - **Level change**: indica movimento entre níveis discretos de pressão (ex.: aumentar/diminuir avanço rápido conforme a pressão de um botão de fast-forward).
  - **Generic**: feedback geral quando os outros padrões não se aplicam.
- **watchOS**: a partir do Apple Watch Series 4, feedback háptico para a Digital Crown dá uma experiência mais tátil ao rolar conteúdo.
- Por padrão, o sistema fornece detentes lineares hápticos sentidos ao girar a Digital Crown.
- Alguns controles do sistema, como table views, fornecem detentes conforme novos itens entram na tela.
- **Conjunto de haptics definidos em watchOS**, cada um com significado específico: Notification, Up, Down, Success, Failure, Retry, Start, Stop, Click.
- Notification: diz à pessoa que algo significativo/fora do comum aconteceu e exige atenção — o mesmo haptic toca quando chega uma notificação local ou remota.

**Aplicação em web/extensão**:
- Em contexto mobile-web, use a Vibration API (quando suportada) só para confirmar ações discretas (ex.: item adicionado), nunca de forma contínua ou repetitiva.
- Torne qualquer vibração/feedback tátil opcional via configuração, e nunca dependa dela como único canal de feedback — sempre acompanhe de indicação visual.
- Se usar vibração para indicar sucesso/erro, mantenha o padrão consistente em todo o produto (ex.: sempre o mesmo padrão curto para "confirmado"), replicando a ideia de causa-efeito consistente do HIG.

## Playing video

**Essência**: Reprodução de vídeo deve seguir o comportamento e a interface do player de sistema (aspect ratio correto, controles previsíveis); um player customizado só se justifica se necessário, e mesmo assim deve imitar o comportamento padrão.

**Regras**:
- O sistema fornece players de vídeo desenhados para incorporar experiências de reprodução em iOS, iPadOS, macOS, tvOS e visionOS.
- Você também pode oferecer conteúdo através do app TV, para uma experiência de visualização consistente nessas plataformas.
- Os players do sistema suportam diferentes modos de proporção de aspecto e, na maioria das plataformas, modo Picture in Picture (PiP).
- A pessoa pode trocar de modo durante a reprodução, mas o sistema escolhe um modo padrão com base na proporção do vídeo.
- **Modo full-screen (aspect-fill)**: o vídeo escala para preencher o display, com possível corte de borda — é o padrão para vídeo largo (2:1 a 2.40:1).
- **Modo fit-to-screen (aspect)**: o vídeo inteiro fica visível, com letterbox/pillarbox conforme necessário — é o padrão para vídeo padrão (4:3, 16:9, até 2:1) e ultrawide (acima de 2.40:1).
- Em visionOS e tvOS, o player embutido também fornece controles de transporte, como ligar legendas ou trocar idioma de áudio.
- O player embutido também oferece ações, como adicionar a uma biblioteca ou favoritar um clipe.
- Abaixo dos controles de transporte, o player exibe abas de conteúdo (Info, Episódios, Capítulos) para navegação.
- Em visionOS, os controles de transporte aparecem como um ornamento.
- Use o player de vídeo do sistema para dar uma experiência familiar e conveniente.
- Se seu app realmente exige um player customizado, use o comportamento e a interface do player do sistema como referência.
- Uma experiência customizada que diverge sutilmente da do sistema pode causar frustração, porque a pessoa não sabe quais interações habituais ainda pode usar.
- Sempre exiba conteúdo de vídeo na proporção original.
- Padding embutido — letterbox/pillarbox já "assado" no arquivo — pode impedir o sistema de escalar corretamente conforme o modo de reprodução.
- Esse padding pode fazer o vídeo aparecer menor em ambos os modos, e impede exibição correta em contextos edge-to-edge não-tela-cheia, como PiP no iPad.
- Forneça informação adicional quando agrega valor — em iOS, iPadOS, tvOS e visionOS, você pode customizar imagem, título, descrição e outra informação útil.
- Restrinja esse conteúdo adicional para não obscurecer a reprodução da mídia.
- Suporte as interações esperadas independente do dispositivo de entrada.
- Exemplo: pressionar Espaço num teclado conectado deve dar play/pause em Apple Vision Pro, Mac, iPhone, iPad e Apple TV.
- Outro exemplo: movimentação na mídia via gestos familiares e intuitivos com o Siri Remote na Apple TV.
- Em tvOS, se a pessoa precisa acessar opções de reprodução ou informação específica de conteúdo, considere um controle de transporte ou aba de conteúdo customizada.
- Forneça só as ações/informações mais úteis, com no máximo um ou dois passos para voltar à experiência de visualização.
- Use um controle de transporte para uma ação relacionada a reprodução, como favoritar um vídeo; use abas de conteúdo customizadas para informação suplementar ou recomendações.
- Evite deixar áudio de fontes diferentes se mixarem ao trocar de modo — mixagem de áudio é uma experiência desagradável e frustrante.
- Em geral, mixagem acontece quando pelo menos uma das fontes de áudio não trata corretamente áudio secundário.
- Exemplo: ao mover um vídeo de tela cheia para PiP, o sistema o muta automaticamente; se um jogo em segundo plano não trata áudio secundário direito, ele mixa com o vídeo desmutado ao voltar.
- **Integração com o app TV**: garanta uma transição suave — o app TV esvanece para preto ao transicionar para seu app e não mostra sua launch screen.
- Mantenha continuidade visual apresentando imediatamente sua própria tela preta antes de começar ou retomar o conteúdo.
- Mostre o conteúdo esperado imediatamente — pule direto da tela preta para o conteúdo.
- Evite splash screens, telas de detalhe, animações de introdução ou qualquer barreira que demore o acesso ao conteúdo.
- Se precisar mostrar um elemento interstitial, deixe escolher "Select" para passar por ele ou "Play" para pular direto e iniciar a reprodução.
- Evite perguntar se a pessoa quer retomar a reprodução — se pode retomar, retome automaticamente sem pedir confirmação.
- Dê play/pause quando a pessoa pressiona Espaço num teclado Bluetooth conectado, independente do teclado usado.
- Garanta que o conteúdo toque para o espectador correto — se seu app suporta múltiplos perfis, faça o app trocar automaticamente para o perfil especificado pelo pedido de reprodução do app TV.
- Se o pedido não especifica perfil, pergunte antes de começar a reprodução, para essa informação ficar disponível no futuro.
- Use o tempo final anterior ao retomar reprodução de um clipe longo, deixando continuar rapidamente de onde parou.
- **Carregando conteúdo**: evite exibir telas de carregamento quando possível — uma tela de loading é desnecessária se o conteúdo carrega rápido.
- Se o carregamento demorar mais de **2 segundos**, considere mostrar uma tela preta com um spinner de atividade centralizado, sem conteúdo ao redor.
- Comece a reprodução imediatamente — se precisar exibir uma tela de loading, exiba só até carregar o suficiente para começar.
- Continue carregando o restante do conteúdo em segundo plano.
- Minimize o conteúdo da tela de loading — se incluir branding ou imagens, faça isso minimamente.
- Mantenha o fundo preto na tela de loading, que ajuda a dar transição contínua para a reprodução.
- **Saindo da reprodução**: depois de sair, a pessoa permanece no seu app em vez de voltar ao app TV.
- Ajude a evitar desorientação mostrando uma tela contextualmente relevante — a view de detalhe do conteúdo que estava assistindo, com opção de retomar reprodução.
- Se não houver view de detalhe, mostre um menu que liste o conteúdo ou o menu principal do app.
- Esteja preparado para uma saída imediata — prepare uma view de saída assim que possível após receber uma notificação de reprodução.
- Isso garante que você já esteja pronto caso a pessoa saia logo após a reprodução começar.
- **tvOS**: deixe o conteúdo em primeiro plano ao exibir logos ou overlays não interativos sobre o vídeo.
- Um pequeno logo ou timer de contagem regressiva pode ser apropriado, mas evite overlays grandes e distrativos que não melhoram a experiência.
- Alguns aparelhos são propensos a retenção de imagem, então prefira overlays curtos e gráficos translúcidos em SDR a conteúdo opaco e brilhante.
- Mostre overlays interativos (quiz, pesquisa, checagem de progresso) com transição graciosa.
- Implemente um delay mínimo de **0,5 segundos** para pausar a mídia e exibir o overlay.
- Dê um jeito claro de dispensar o overlay e retomar a reprodução depois de interagir.
- **visionOS**: ajude a pessoa a se manter confortável ao reproduzir vídeo — deixe escolher quando começar a assistir.
- Use uma janela pequena para reprodução, redimensionável se a pessoa quiser.
- Garanta que a pessoa consiga ver o entorno durante a reprodução.
- Em experiência totalmente imersiva, evite deixar conteúdo virtual obscurecer a reprodução ou os controles de transporte.
- O sistema posiciona o player automaticamente num local previsível na experiência totalmente imersiva.
- Use esse local para garantir que nenhum conteúdo virtual sobreponha os controles no ornamento perto da parte inferior do player.
- Evite iniciar automaticamente uma experiência de reprodução de vídeo totalmente imersiva.
- A pessoa precisa de controle sobre sua experiência e provavelmente não aprecia ser lançada sem aviso a um vídeo totalmente imersivo.
- Crie uma faixa de thumbnails se quiser suportar "scrubbing" — arrastar pela linha do tempo.
- O sistema exibe thumbnails conforme a pessoa arrasta para diferentes momentos, ajudando a escolher a seção que quer.
- Para melhorar performance, forneça thumbnails de **160 px de largura** cada.
- Evite expandir um player de vídeo inline para preencher a janela.
- Ao exibir o player do sistema numa janela, os controles de reprodução aparecem no mesmo plano da view do player, não flutuando num ornamento.
- Vídeo inline precisa ser 2D, mantendo o conteúdo da janela visível ao redor, para não sugerir uma experiência mais imersiva do que realmente é.
- Use um player de vídeo RealityKit se precisar reproduzir vídeo numa view como splash screen ou transição.
- Nesses casos, a pessoa geralmente espera que o vídeo leve à próxima experiência, sem precisar de controles de reprodução ou integração do sistema como dimming/ancoragem de view.
- **watchOS**: o sistema gerencia a reprodução de vídeo — apps podem tocar clipes curtos enquanto ativos e em primeiro plano.
- Você pode incorporar um elemento de filme à interface (inline) ou reproduzir num clipe numa interface separada.
- Mantenha clipes de vídeo curtos — prefira clipes de no máximo **30 segundos**.
- Clipes longos consomem mais espaço em disco e exigem manter o pulso erguido por mais tempo, causando fadiga.
- **Valores recomendados de encoding para vídeo em watchOS**: codec de vídeo H.264 High Profile.
- Bit rate de vídeo de **160 kbps a até 30 fps**.
- Resolução em tela cheia (retrato) de **208x260 px**.
- Resolução 16:9 (paisagem) de **320x180 px**.
- Áudio em **64 kbps HE-AAC**.
- Evite criar uma imagem de poster que pareça um controle do sistema — a pessoa deve entender que pode tocar o elemento de filme para reprodução.
- Não confunda a pessoa fazendo o poster parecer outra coisa que não um controle de reprodução.
- Considere criar uma imagem de poster que represente o conteúdo do clipe, ajudando a pessoa a decidir se quer ver o vídeo.
- Em geral, evite um poster sem relação com o conteúdo ou que possa ser confundido com um controle.

**Aplicação em web/extensão**:
- Use o elemento `<video>` nativo com controles padrão sempre que possível; se customizar os controles, mantenha os mesmos atalhos de teclado esperados (espaço = play/pause, setas = avançar/retroceder).
- Nunca incorpore vídeo com barras pretas já "queimadas" no arquivo — sirva o vídeo na proporção real e deixe o CSS/objectFit controlar o enquadramento.
- Mostre skeleton/spinner de carregamento só se o vídeo não começa em cerca de 2 segundos; salve a posição de reprodução (localStorage) para retomar automaticamente sem perguntar, ao reabrir o mesmo conteúdo.
- Para overlays interativos sobre vídeo (quiz, CTA), pause a reprodução com um pequeno delay (não instantâneo) e dê um botão claro de fechar que retome de onde parou.

## Printing

**Essência**: Impressão deve ser descobrível em locais convencionais e só oferecida quando de fato é possível imprimir naquele momento.

**Regras**:
- Torne a impressão descobrível colocando a ação em locais padrão do sistema.
- Exemplo: um item "Print" no menu File de um app macOS, ou um botão de toolbar que abre um action sheet em iOS/iPadOS.
- Num app macOS com toolbar, considere um botão de impressão opcional que a pessoa adiciona ao customizar a toolbar.
- Apresente a opção de imprimir só quando for possível.
- Se não há nada na tela para imprimir ou nenhuma impressora disponível, esmaeça o item Print no menu File (macOS).
- Em iOS/iPadOS, remova a ação de imprimir do Action sheet quando não há nada para imprimir.
- Se implementar um botão customizado, esmaeça-o ou esconda-o quando não for possível imprimir.
- Apresente opções de impressão relevantes só quando fizer sentido e a impressora suportar — intervalo de páginas, múltiplas cópias, impressão frente e verso.
- Use a view fornecida pelo sistema para apresentar essas opções.
- **macOS**: se seu app oferece opções de impressão específicas que o sistema não oferece, considere criar uma categoria customizada no painel de impressão.
- O painel de impressão já oferece categorias padrão como Layout, Paper Handling e Media & Quality.
- Nomeie sua categoria customizada de forma única, como o nome do seu app.
- Se seu app suporta configurações de página específicas do documento, considere apresentar um diálogo de page setup.
- Um page setup dialog inclui configurações raramente alteradas, como tamanho de página, orientação e escala.
- Evite reimplementar o que o sistema já oferece nesse diálogo, como orientação de página ou imprimir em ordem reversa.
- Deixe claras as interdependências entre opções — exemplo: se impressão frente e verso está disponível, a opção de imprimir em transparência fica indisponível.
- Separe recursos avançados dos recursos frequentes.
- Considere usar um disclosure control para esconder opções avançadas até serem necessárias, rotuladas como "Advanced Options".
- Considere deixar a pessoa pré-visualizar o efeito de uma configuração, como atualizar uma miniatura para mostrar o efeito de mudar um controle de tom.
- Considere armazenar configurações modificadas junto com o documento.
- No mínimo, faz sentido manter as configurações de impressão até o documento ser fechado, caso a pessoa queira imprimir de novo.

**Aplicação em web/extensão**:
- Use `window.print()` com uma folha de estilos `@media print` dedicada; esconda navegação/sidebar/botões irrelevantes na versão impressa, mostrando só o conteúdo relevante.
- Exiba a ação de imprimir só quando o conteúdo atual é de fato imprimível (não em telas de configuração ou estados vazios).
- Se o produto tem opções avançadas de impressão (ex.: incluir cabeçalho/rodapé, escala), agrupe-as atrás de um disclosure "Opções avançadas" em vez de poluir o diálogo principal.

## Ratings and reviews

**Essência**: A melhor forma de conseguir boa avaliação é entregar uma boa experiência primeiro — o momento e a frequência do pedido de avaliação importam tanto quanto o produto em si.

**Regras**:
- Peça avaliação só depois que a pessoa demonstrou engajamento real com o app/jogo.
- Exemplo: prompt a pessoa quando ela completa uma fase de jogo ou uma tarefa significativa.
- Evite pedir avaliação no primeiro lançamento ou durante onboarding.
- Nesse ponto a pessoa ainda não teve tempo de formar uma opinião clara sobre o valor do app.
- A pessoa pode até deixar feedback negativo se sentir que está sendo cobrada cedo demais.
- Evite interromper a pessoa enquanto ela realiza uma tarefa ou joga.
- Pedir feedback nesse momento pode parecer disruptivo e um fardo.
- Procure pausas naturais ou pontos de parada onde o pedido é menos incômodo.
- Evite insistir — pedidos repetidos podem irritar e até influenciar negativamente a opinião sobre o app.
- Considere esperar pelo menos **uma ou duas semanas** entre pedidos.
- Peça de novo só depois de mais engajamento demonstrado pela pessoa.
- Prefira o prompt fornecido pelo sistema, que dá um jeito consistente e não intrusivo de pedir avaliação/review em iOS, iPadOS e macOS.
- O sistema checa se já houve feedback anterior e, se não, mostra um prompt in-app que pede nota e review opcional.
- A pessoa responde ou dispensa com um único toque/clique.
- A pessoa também pode optar por não receber mais esses prompts em nenhum app.
- O sistema limita automaticamente a exibição desse prompt a **no máximo 3 ocorrências por app dentro de um período de 365 dias**.
- Avalie o custo-benefício de resetar seu resumo de avaliação ao lançar uma nova versão.
- Resetar reflete melhor a versão atual, mas também tende a resultar em menos avaliações totais.
- Menos avaliações totais pode desencorajar algumas pessoas de baixar seu app.

**Aplicação em web/extensão**:
- Peça avaliação/NPS/review só depois de uma ação de sucesso relevante (ex.: exportou um relatório, completou onboarding de verdade), nunca no primeiro acesso.
- Limite a frequência do pedido (ex.: no máximo 1 vez a cada poucas semanas por usuário, guardado em storage/backend) e nunca insista se a pessoa já dispensou.
- Deixe o pedido dispensável com um único clique, sem exigir justificativa, e respeite a escolha de "não perguntar de novo" se oferecida.

## Searching

**Essência**: Busca dentro do app deve ter local único e primário, com sugestões que aceleram a digitação; a busca do sistema (Spotlight) pode expor conteúdo do app sem precisar abri-lo.

**Regras**:
- Para buscar dentro de um app, a pessoa geralmente espera usar um campo de busca.
- Quando fizer sentido, personalize a experiência usando o que você sabe sobre como a pessoa interage com seu app.
- Exemplos de personalização: buscas recentes, sugestões, completions, correções baseadas em termos buscados antes.
- Em alguns casos, a pessoa aprecia poder escopar a busca ou filtrar resultados, por exemplo por data de criação, tamanho de arquivo ou tipo de arquivo.
- Se a busca é importante, dê a ela uma posição primária no app/view.
- Exemplo: campo de busca na toolbar inferior ao lado de outras ações importantes, ou uma aba dedicada em apps com tab bar.
- Procure tornar o conteúdo do app pesquisável através de um único local.
- A pessoa aprecia ter um lugar claramente identificado para achar qualquer coisa em seu app.
- Para apps com seções bem distintas, ainda pode valer oferecer busca local, funcionando como filtro na view atual.
- Exiba com clareza o escopo atual de uma busca.
- Use placeholder descritivo, scope bar, ou título para reforçar o que está sendo buscado.
- Ofereça sugestões para facilitar a busca.
- Buscas recentes antes de digitar, ou sugestões preditivas enquanto digita, ajudam a buscar mais rápido e digitar menos.
- Considere privacidade antes de exibir histórico de busca.
- A pessoa pode não gostar que seu histórico apareça onde outros possam ver.
- Se mostrar histórico de busca, dê um jeito de limpá-lo.
- **Busca em todo o sistema (Spotlight)**: torne o conteúdo do seu app pesquisável.
- Compartilhe conteúdo com o Spotlight tornando-o indexável e especificando metadados descritivos.
- O Spotlight extrai, armazena e organiza essa informação para buscas rápidas e abrangentes.
- Defina metadados para tipos de arquivo customizados que seu app manipula.
- Forneça um plug-in de Spotlight File Importer que descreva os tipos de metadado do seu formato.
- Use o Spotlight para oferecer capacidades avançadas de busca de arquivo no contexto do seu app.
- Exemplo: um botão que inicia instantaneamente uma busca do Spotlight baseada na seleção atual.
- Prefira usar as views de abrir/salvar fornecidas pelo sistema, que geralmente já incluem um campo de busca embutido para buscar e filtrar todo o sistema.
- Implemente um Quick Look generator se seu app produz tipos de arquivo customizados, ajudando o Spotlight e outros apps a mostrarem previews dos seus documentos.

**Aplicação em web/extensão**:
- Coloque a busca em posição primária e consistente (ex.: sempre no topo/header), com atalho de teclado (ex.: `/` ou `Cmd+K`) para invocar rapidamente.
- Mostre buscas recentes ao focar o campo vazio e sugestões/autocomplete conforme a pessoa digita, com resultados progressivos (não espere o Enter para começar a filtrar).
- Deixe explícito o escopo (ex.: "Buscando em Mensagens" vs. "Buscando em tudo") quando o produto tem múltiplos contextos de busca, e ofereça um jeito de limpar o histórico de busca salvo localmente.
- Exponha o conteúdo do painel/site a buscadores externos com metadados estruturados (sitemap, JSON-LD, `<meta>` descritivo) — o equivalente web de tornar o conteúdo indexável pelo Spotlight.

## Settings

**Essência**: Configurações devem ser mínimas, com bons defaults, colocadas perto da tarefa que afetam quando são específicas de tarefa; nunca duplique controles que já existem em nível de sistema.

**Regras**:
- O app de Settings do sistema deixa a pessoa ajustar coisas como aparência geral, conexões de rede, detalhes de conta, requisitos de acessibilidade, idioma e região.
- Em algumas plataformas, o app de Settings do sistema também pode incluir configurações específicas de apps.
- Essas configurações específicas geralmente controlam acesso a localização, uso de câmera/microfone, e integração com notificações, Siri ou busca.
- Quando necessário, você pode fornecer uma área de configurações customizada dentro do app para configurações gerais que afetam a experiência como um todo.
- Exemplo de configuração geral: estilo de interface num app, ou comportamento de salvar jogo num jogo.
- Configurações que afetam só uma tarefa específica podem ficar dentro da própria tarefa, sem exigir sair da experiência.
- Escolha defaults que deem a melhor experiência para o maior número de pessoas.
- Exemplo: maximize performance automaticamente para o dispositivo em vez de pedir para o jogador escolher depois do lançamento.
- Com bons defaults, a pessoa pode nem precisar ajustar nada antes de começar a aproveitar seu app/jogo.
- Minimize o número de configurações oferecidas.
- Muitas opções tornam a experiência menos aproximável e dificultam achar uma configuração específica.
- Torne configurações acessíveis do jeito que a pessoa espera.
- Exemplo: atalho padrão Command-Vírgula com teclado físico conectado para abrir configurações do app; tecla Esc em jogos.
- Evite usar configurações para pedir informação de setup que você já pode obter de outra forma.
- Exemplo: detecte automaticamente um controle/acessório conectado em vez de perguntar; detecte se a pessoa já está usando modo escuro.
- Respeite as configurações globais do sistema.
- Evite incluir versões redundantes de configurações globais na sua área de configurações customizada.
- A pessoa espera usar o app de Settings do sistema para gerenciar opções globais, como acomodações de acessibilidade, comportamento de scroll e métodos de autenticação.
- A pessoa espera que todos os apps sigam essas escolhas globais.
- Versões customizadas de opções globais confundem, sugerindo que configurações do sistema podem não se aplicar ao seu app.
- **Configurações gerais** (pouco alteradas): coloque na sua área customizada de configurações.
- A pessoa precisa suspender o que está fazendo para chegar lá, então inclua só opções que não precisam mudar o tempo todo.
- Exemplo: configuração de janela num app; comportamento de salvar jogo ou mapeamento de teclado num jogo; opções relacionadas a conta em ambos.
- **Opções específicas de tarefa**: quando possível, prefira deixar ajustável sem ir à área de configurações.
- Se a pessoa pode ajustar mostrar/esconder parte de uma view, reordenar uma coleção, ou filtrar uma lista, deixe essas opções disponíveis nas próprias telas afetadas.
- Nas próprias telas, essas opções são descobríveis e convenientes.
- Colocar esse tipo de opção numa área de configurações separada a desconecta do contexto.
- Isso exige suspender a tarefa para ajustar e frequentemente esconde o resultado até a pessoa voltar à tarefa.
- Em jogos, os jogadores tendem a ajustar sua abordagem a uma tarefa específica como parte do próprio gameplay, não como uma opção de configuração separada.
- **Configurações de sistema**: adicione ao app de Settings do sistema só as opções mais raramente alteradas.
- Se fizer sentido adicionar as configurações do seu app/jogo lá, considere fornecer um botão que abra diretamente essa tela a partir da sua interface.
- **macOS**: ao escolher o item Settings no menu App, abre a janela de configurações customizada.
- Tipicamente, uma janela de configurações customizada tem uma toolbar de botões para trocar entre panes (views) que agrupam configurações relacionadas.
- Inclua um item de configurações no menu App.
- Evite adicionar botões de configuração à toolbar de uma janela, pois isso reduz o espaço disponível para comandos essenciais de uso frequente.
- Se você fornece opções em nível de documento, adicione esse item ao menu File.
- Esmaeça os botões de minimizar e maximizar de uma janela de configurações.
- Como é rápido abrir via Command-Vírgula, não há necessidade de manter a janela na Dock.
- Como a janela acomoda o tamanho do pane atual, a pessoa não precisa expandi-la.
- Use uma toolbar não customizável na janela de configurações, sempre visível.
- A toolbar deve sempre indicar qual botão está ativo no momento.
- A pessoa confia numa interface de configurações estável para achar o que precisa.
- Atualize o título da janela para refletir o pane visível no momento.
- Se sua janela de configurações não tem múltiplos panes, use o título "App Name Settings".
- Restaure o pane mais recentemente visualizado.
- A pessoa costuma ajustar configurações relacionadas mais de uma vez, então é conveniente que a janela abra no último pane usado.
- **watchOS**: apps e jogos não adicionam configurações customizadas ao app de Settings do sistema.
- Como alternativa, considere disponibilizar um pequeno número de opções essenciais na parte inferior da view principal.
- Como outra alternativa, deixe usar um menu "More" para reconfigurar objetos.

**Aplicação em web/extensão**:
- Configurações de conta/preferência global (tema, idioma, notificação) ficam numa página dedicada de "Configurações"; opções específicas de uma tarefa (ordenar uma tabela, filtrar uma lista, mostrar/esconder coluna) ficam inline na própria tela, nunca escondidas em um menu de settings separado.
- Escolha defaults sensatos (ex.: idioma detectado do navegador, tema conforme `prefers-color-scheme`) em vez de pedir para configurar manualmente no primeiro uso.
- Numa extensão de navegador, exponha só as opções realmente necessárias no popup; configurações raramente usadas vão numa página de opções separada (`options_page`), fora do fluxo principal.
- Restaure a última seção/aba de configurações visitada ao reabrir a página de configurações, e atualize o `<title>` da aba para refletir a seção atual, espelhando o comportamento recomendado para o painel de settings do macOS.

## Undo and redo

**Essência**: Desfazer/refazer permite reverter ações com segurança, dando confiança para explorar; o resultado da ação de undo/redo precisa ser previsível e visível, sem limites artificiais.

**Regras**:
- A pessoa espera que undo/redo reverta suas ações recentes, e é comum tentar desfazer — às vezes múltiplas vezes — até algo mudar.
- Nessa situação a pessoa pode não lembrar qual ação anterior o undo está afetando.
- Isso pode levar a mudanças não intencionais e frustração.
- Por isso é essencial ajudar a prever o resultado do undo/redo e destacá-lo.
- Ajude a pessoa a prever o resultado de undo/redo o quanto possível.
- Em iPhone, por exemplo, você pode descrever o resultado no alerta que aparece ao balançar o dispositivo, dando a opção de confirmar ou cancelar o undo.
- Se fornecer itens de menu de undo/redo, modifique os labels para identificar o resultado.
- Exemplo: "Undo Typing" ou "Redo Bold" num app baseado em documento.
- Mostre os resultados de um undo ou redo.
- Às vezes a ação mais recente que a pessoa quer desfazer afeta conteúdo ou área que não está mais visível.
- Nesses casos é crucial destacar o resultado de cada undo/redo, para a pessoa não achar que a ação não teve efeito e repeti-la sem necessidade.
- Exemplo: se a pessoa desfaz depois de deletar um parágrafo numa área do documento que não está mais na tela, role o documento para mostrar o parágrafo restaurado.
- Deixe a pessoa desfazer múltiplas vezes.
- Evite impor limites desnecessários à quantidade de vezes que é possível desfazer/refazer.
- Em geral, espera-se poder desfazer toda ação realizada desde um passo lógico, como abrir um documento ou salvar o trabalho.
- Considere dar a opção de reverter múltiplas mudanças de uma vez.
- Em alguns cenários, a pessoa pode preferir desfazer um lote de ações discretas mas relacionadas, como ajustes incrementais numa única propriedade, sem precisar desfazer cada ajuste individualmente.
- Em outros casos, pode fazer sentido dar um jeito conveniente de desfazer todas as mudanças desde a abertura do documento ou o último salvamento.
- Forneça botões de undo/redo só quando necessário.
- Em geral, a pessoa espera iniciar undo/redo pelos jeitos suportados pelo sistema, como itens do menu Edit num app macOS, atalhos de teclado em Mac/iPad, ou balançar o iPhone.
- Se for importante ter botões dedicados, use os símbolos padrão do sistema e coloque-os numa toolbar.
- **iOS, iPadOS**: evite redefinir os gestos padrão de undo/redo, como deslizar com três dedos ou balançar o iPhone.
- Como todo gesto padrão, redefini-lo arrisca confundir a pessoa e tornar a experiência imprevisível.
- Descreva de forma breve e precisa a operação a ser desfeita/refeita.
- O título do alerta de undo/redo já inclui automaticamente o prefixo "Undo " ou "Redo " (incluindo o espaço).
- Você fornece uma ou duas palavras adicionais que descrevem o que está sendo desfeito/refeito, para aparecer depois desse prefixo.
- Exemplo: "Undo Name" ou "Redo Address Change".
- **macOS**: coloque os comandos de undo e redo no menu Edit e suporte os atalhos de teclado padrão.
- A pessoa espera encontrar undo/redo no topo do menu Edit.
- A pessoa também espera usar Command-Z e Shift-Command-Z para desfazer e refazer, respectivamente.

**Aplicação em web/extensão**:
- Implemente `Ctrl/Cmd+Z` e `Ctrl/Cmd+Shift+Z` como padrão em qualquer editor web, com um histórico de múltiplos passos (não limitado a 1 nível).
- Para ações destrutivas em um painel (deletar item, arquivar), prefira "desfazer" via toast temporário (com botão "Desfazer" por alguns segundos) em vez de modal de confirmação prévia — deixa a ação reversível sem interromper o fluxo.
- Ao desfazer uma ação cujo efeito não está na viewport atual (ex.: item restaurado em outra página de uma lista paginada), role ou navegue até o item afetado para confirmar visualmente o resultado.
- Descreva a ação no próprio texto do toast/menu de undo (ex.: "Desfazer exclusão de 'Relatório de Março'"), em vez de um "Desfazer" genérico, para a pessoa saber exatamente o que vai reverter.

## Workouts

**Essência**: Uma boa experiência de treino mantém a pessoa engajada no exercício atual sem distração, mostrando as métricas certas com clareza mesmo em movimento.

**Regras**:
- A pessoa pode usar o Apple Watch durante vários tipos de treino.
- Ela pode carregar iPhone ou iPad em atividades como caminhada, uso de cadeira de rodas ou corrida.
- Para sessões ao vivo ou gravadas, a pessoa tende a usar dispositivos maiores ou estacionários como iPad Pro, Mac e Apple TV, sozinha ou com outras pessoas.
- Em um app de fitness watchOS, use sessões de treino (workout sessions) para fornecer dado útil e controles relevantes.
- Durante uma sessão ativa, o watchOS continua exibindo o app entre os momentos em que a pessoa ergue o pulso.
- Por isso é importante mostrar o dado que ela mais valoriza — tempo decorrido/restante, calorias, distância.
- Ofereça também controles relevantes, como marcadores de volta/intervalo.
- Evite distrair a pessoa do treino com informação irrelevante.
- Durante o exercício, ela não precisa revisar a lista de treinos disponíveis nem acessar outras partes do app.
- Um arranjo comum de apps de treino watchOS (incluindo o app Workout): botões grandes que controlam a sessão em progresso (End, Resume, New) na tela mais à esquerda.
- Métricas e outros dados ficam numa tela dedicada de leitura rápida.
- Se suportado, controles de reprodução de mídia ficam na tela mais à direita.
- Use uma aparência visual distinta para indicar um treino ativo.
- A pessoa aprecia reconhecer uma sessão ativa num relance.
- A tela de métricas pode ajudar nisso porque os valores atualizam em tempo real.
- Você pode reforçar ainda mais essa distinção com um layout único para a tela de métricas.
- Forneça controles de treino fáceis de achar e tocar.
- Garanta feedback claro de quando uma sessão começa ou termina, além de pausar/retomar/parar.
- Ajude a pessoa a entender a informação de saúde registrada quando o dado de sensor está indisponível durante o treino.
- Exemplo: a água pode impedir medição de frequência cardíaca, mas o app ainda pode registrar distância nadada e calorias queimadas.
- Se o app suporta os tipos Natação ou Outro, explique a situação usando linguagem parecida com a do app Workout do sistema.
- Exemplo de texto: "GPS não é usado durante uma Nado em Piscina, e a água pode impedir uma medição de frequência cardíaca, mas o Apple Watch ainda vai rastrear suas calorias, voltas e distância usando o acelerômetro embutido".
- Outro exemplo: "Nesse tipo de treino, você ganha o equivalente calórico de uma caminhada rápida sempre que as leituras de sensor estão indisponíveis".
- Outro exemplo: "O GPS só vai fornecer distância quando você fizer um nado livre. A água pode impedir uma medição de frequência cardíaca, mas as calorias ainda serão rastreadas usando o acelerômetro embutido".
- Forneça um resumo ao final de uma sessão.
- Uma tela de resumo confirma que o treino terminou e exibe a informação registrada.
- Considere melhorar o resumo incluindo os Activity rings, para a pessoa checar seu progresso atual facilmente.
- Descarte sessões de treino extremamente breves.
- Se uma sessão termina poucos segundos depois de começar, descarte o dado automaticamente ou pergunte se a pessoa quer registrá-lo mesmo assim como treino.
- Garanta que o texto continue legível quando a pessoa está em movimento.
- Quando a sessão exige movimento, use tamanhos de fonte grandes e cores de alto contraste.
- Organize o texto para que a informação mais importante seja fácil de ler.
- Use os Activity rings corretamente.
- A view de Activity rings é um elemento desenhado pela Apple com um ou mais anéis cujas cores e significados combinam com os do app Activity.
- Use os Activity rings só para seu propósito documentado.

**Aplicação em web/extensão**:
- Num painel de acompanhamento de atividade/tempo real (ex.: rastreador de sessão), mostre só as métricas essenciais em destaque durante a sessão ativa (tempo decorrido, contagem), escondendo navegação secundária até a sessão terminar.
- Use tipografia grande e alto contraste para telas pensadas para consulta rápida "em movimento" (ex.: um painel visto de longe ou em mobile durante uma atividade), e um resumo final claro ao término da sessão/tarefa.
- Se algum dado de origem estiver indisponível durante uma sessão ao vivo (ex.: uma métrica que depende de uma integração instável), explique a limitação no lugar da métrica em vez de simplesmente escondê-la ou mostrar um erro genérico.
