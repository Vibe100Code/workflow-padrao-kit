---
regra: regra-se-le-pelo-porque
data: 2026-10-28
decidiu: dono
literal: sim
---

# Leia regras de processo pelo porquê, exceto na lista fechada de regras literais

## Incidente que a originou
Em 2026-10-28, o dono interveio após regras de processo aplicadas ao pé da letra travarem caminhos válidos que não tinham relação com o problema que criou a regra ("tudo que é literal demais corta as possibilidades").

## Por quê
Regras de processo nascem para evitar um modo de falha específico; quando a letra bloqueia um caso onde aquele modo de falha não existe, seguir a letra gera burocracia sem proteção. Já fronteiras irreversíveis, financeiras ou de segurança exigem cumprimento literal absoluto.

## Como aplicar
- Diante de uma regra de processo (`literal: nao`), se a letra travar um caso que o motivo (`Por quê`) não cobre, siga o motivo e declare em uma linha qual regra foi lida pelo porquê.
- Cumpra **literalmente e sem exceção** (`literal: sim`) a lista fechada abaixo:
  1. **Dinheiro e gasto pago** (cobranças, compras, chaves de API pagas fora do liberado).
  2. **Senha e segredo** (credenciais, tokens, variáveis privadas, chaves).
  3. **Apagar** (remoção destrutiva de dados, branches, bancos ou arquivos).
  4. **Publicação e loja** (envio para loja de aplicativos, release ou produção externa).
  5. **Segurança** (autenticação, autorização, permissões, exposição de dados).
  6. **Integração na branch principal** (`main`).
  7. **Aprovação final de tela por captura real** (voto do dono sobre imagem real antes de integrar mudança visual).

## Como se prova
Cada arquivo de regra declara `literal: sim | nao` no cabeçalho; violações das regras literais são barradas por hooks de sessão e gates de pré-commit/integração.
