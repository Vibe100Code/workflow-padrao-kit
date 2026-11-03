---
regra: prova-pelo-caminho-do-usuario
data: 2026-10-29
decidiu: dono
literal: sim
---

# Prove toda mudança visível pelo caminho real do usuário a frio no mesmo build de publicação

## Incidente que a originou
Em 2026-10-29, a tela principal de edição abrindo estreita (com a barra inferior da tela inicial sobreposta) e com controles travados chegou à loja em dois builds seguidos (b51 e b52) mesmo com gate verde, 19 mutações provadas, revisão por API e captura aprovada pelo dono, porque todas as provas usaram atalhos de lançamento ou mediram código estático. Em outro incidente anterior, um efeito com vazamento rosa e verde foi publicado porque a captura de referência de terceiro já continha o defeito engolido.

## Por quê
Gate de código-fonte, revisão de diff, medição em recorte e captura por flag de atalho são necessários mas não provam a experiência real. Mudança que o usuário vê só está provada quando exercida pelo caminho que ele percorre, a partir da abertura a frio, na configuração exata de distribuição.

## Como aplicar
- **Quatro provas obrigatórias para toda mudança de tela, fluxo, animação ou efeito**:
  1. **Caminho real**: abrir o app a frio, sem argumentos/flags de atalho, chegando à tela pelos toques reais do usuário (declare o caminho tocado no cartão de aprovação).
  2. **Todas as entradas**: listar antes com `git grep` todos os pontos que levam ao estado alterado e testar cada um (corrigir a classe de entrada, não só o caminho relatado).
  3. **Transição inteira e toque**: em tela que anima ou carrega, conferir a sequência de quadros do toque até assentar (largura, posição, sobreposição) e acionar um controle durante a carga para provar que responde.
  4. **Quadro inteiro na resolução real**: conferir efeitos visuais na imagem completa (no simulador e na resolução máxima), a olho e com detector de artefato (borda dura, faixa, emenda), nunca só num recorte central.
- **Referência conferida**: toda captura de referência de terceiro deve bater com a tela real vista pelo dono antes de servir de régua; relato visual do dono vence medição contra referência não validada.
- **Duas frentes em paralelo (2026-10-29)**: rode gates/testes de código e roteiro de interface no simulador em paralelo; um verde não dispensa o outro.
- **Trava antes de publicar na loja**: rode o roteiro completo do usuário num build de configuração de produção, compilado do mesmo `HEAD` do pacote de envio, com árvore limpa (`git status --porcelain` vazio) e mesma versão/build no manifesto (não use hash de binário, pois a assinatura de distribuição difere do simulador).
- **Vermelho não se normaliza**: gate vermelho na área tocada ou gate que imprime `FALHA` saindo com código `0` bloqueia o envio até ser corrigido.

## Como se prova
Roteiro automatizado no simulador a frio + verificação das 4 condições de identidade do build (`HEAD`, árvore limpa, configuração de loja e versão/build) antes de qualquer upload.
