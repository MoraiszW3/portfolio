# PRD — W3 ÓPTICA

> **Documento de Requisitos de Produto** — site e-commerce de alta óptica/eyewear.
> Este documento consolida os requisitos que orientaram o desenvolvimento.

---

## 1. Visão do produto

Site one-page de e-commerce para a **W3 ÓPTICA**, maison fictícia de óptica de luxo com
herança italiana (Milão/Portofino). O objetivo é transmitir **old money**: discreção,
padrão herdado de geração em geração, exclusividade e acabamento artesanal — não seguir
tendências, herdar padrões.

### Marca
- Nome: **W3 ÓPTICA**
- Assinatura: *"O olhar que governa."* / *"Lo sguardo dell'élite"*
- História: fundada em **1998** na marina de **Portofino**; atelier em **Milão**
  (Via Montenapoleone 8); boutiques por indicação (Portofino Piazzetta 14,
  São Paulo·Oscar Freire).
- Tema: **Preto / Marfim / Ouro** — "dark luxury".

### Público-alvo
Homens e mulheres +30 com poder aquisitivo alto, que valorizam herança, silêncio visual
e peças numeradas. Clientes que preferem "não ver a marca" do que ostentar.

---

## 2. Requisitos de design

### Identidade visual
- **Cores** (CSS vars):
  - `--black #0a0a0a`, `--black-2 #101010`, `--black-3 #161616`
  - `--cream #f1ece2`, `--cream-soft #d8d2c4` (marfim)
  - `--gold #c9a45c`, `--gold-soft #e0c289`, `--gold-deep #8a6a2f`
- **Tipografia**: Serif `Cormorant Garamond` (títulos/assinatura) + Sans `Montserrat`
  (UI/textos; peso 300).
- **Estilo geral**: muito respiro, letter-spacing generoso em uppercase, linhas finas
  douradas, véus/overlays escuros sobre imagens, hover com escala lenta e aceleração
  `cubic-bezier(0.22,1,0.36,1)`, cantos e selos em ouro.

### Referência de layout
Modelado em estilo **Shopify luxury** (layout por referência do usuário): header
centralizado com logo e navegação expansível (dropdown), marquee de anúncios, grade de
categoria, grade de produtos 4 colunas, banner de assinatura, campanha de modelos,
seção institucional e newsletter.

---

## 3. Estrutura da página (seções)

1. **Preloader** — logo W3 + linha dourada animada; some ao carregar.
2. **Announcement marquee** — "Coleção Limitada 2026 — Alta óptica italiana";
   frete grátis acima de R$ 999; 5% de cortesia no Pix; certificado de autenticidade.
3. **Header** — sticky, blur, logo central `W3 ÓPTICA`, ícones: busca, wishlist, sacola
   (com badges). Nav: Coleção (dropdown: Sol/Grau/Acessórios), Relógios, Bolsas,
   Maison Signature, Atelier, História, Contato.
4. **Menu mobile** — drawer lateral com subdescrições por item.
5. **Hero full-bleed** — foto macro real `img/w3optica.png` (olho verde + ouro W3); headline gigante rotativa 01/02/03; encolhe no scroll.
6. **Benefits bar** — 5 selos.
7. **Category cards** — 6 cards: Todas, Sol, Grau, Acessórios, Relógios, Bolsas.
8. **Coleção (filtros)** — pills de categoria + grade de produtos re-renderizada por JS.
9. **Signature banner** — peça ancestral "W3 Ophidia" (edição numerada).
10. **Campanha "Quem usa W3"** — 3 modelos com faixas de preço.
11. **História W3 / Old Money** — seção full-bleed com Porto de Portofino ao fundo,
    véu escuro, narrativa "uma herança, não uma moda", citação em italiano e selos.
12. **Manufatura/Atelier** — bancada artesanal em Milão.
13. **Comunidade/Instagram** — grade 4 imagens.
14. **Newsletter** — "Entre para o círculo W3" (mock).
15. **Footer** — navegação, atendimento, boutiques, direitos.
16. **Drawers** — sacola lateral; wishlist ligada ao header; toast de confirmação.

---

## 4. Funcionalidades

### Hero (requisito central)
- Intro cinematográfica (capa `img/w3optica.png` → zoom no olho → portas abrem) antes do herói; respeita `prefers-reduced-motion` e tem botão pular.
- Herói **full-bleed estilo TikTok**: foto macro real `img/w3optica.png` (olho verde + armação ouro com **"W3" gravado na haste**, sem SVG), headline serifada itálica gigante rotativa em 3 cenas (01/02/03) com paginação lateral + barra de progresso, deriva lenta (GSAP kenburns) e CTA minimalista.
- O herói **encolhe (scroll-shrink)** conforme o usuário rola; o conteúdo seguinte
  passa por cima (`main` com `z-index:5` sobre hero de 175vh, sticky).

### Catálogo e filtros
- Base única `PRODUCTS` com categorias: `sol`, `grau`, `acessorios`, `relogios`, `bolsas`.
- Seletor funcional por `data-cat`/`data-filter`: pills, cards de categoria, dropdown,
  menu mobile e botões da signature — todos re-renderizam o grid (`renderGrid(cat)`),
  atualizam título/subtítulo e ativo o pill correto, com scroll suave até `#colecao`.
- Card: hover com segunda imagem, tag posicionada, preço no Pix + 5x sem juros,
  botões "Adicionar à Sacola" e wishlist.
- Seção vazia usa mensagem padrão.

### Preços (faixas exigidas)
- Óculos (sol/grau): **R$ 997,00 – R$ 2.490,90**
- Acessórios: R$ 180,00 – R$ 890,00
- Relógios: **R$ 4.994,80 – R$ 15.450,00**
- Bolsas: **R$ 580,00 – R$ 6.760,90**
- Pix com 5% de cortesia; parcelamento 5x sem juros (exibido no card).

### Sacola e wishlist
- Drawer de sacola (quantidade +/−, remover, subtotal), checkout mock com toast.
- Wishlist com badge no header e contagem.
- Persistência em `localStorage` (`w3_cart`, `w3_wish`).
- Toast de feedback em todas as ações.

### Imagens de produto
- Modelos reais **usando óculos** (não fotos de batata/café/barista — rejeitadas pelo
  usuário):
  - Fotos reais do produto **Portofino** extraídas da Sajamagazine (wixstatic).
  - Foto real do **clip-on gatinho** da Millu (CDN Tray).
  - Pool verificado de eyewear/relógio/bolsa no Unsplash (HEAD 200 confirmado).
- Portofino de referência: blog e imagem gstatic do usuário (thumb pequena; usado
  imagem alta resolução do porto para o fundo da História).

---

## 5. Histórias de usuário

- Como cliente, quero abrir o site no herói e ver a armação encolher ao rolar.
- Como cliente, quero filtrar a coleção por tipo (sol/grau/acessórios/relógios/bolsas)
  sem recarregar a página.
- Como cliente, quero guardar peças e montar uma sacola persistente entre sessões.
- Como cliente, quero sentir a herança da marca (Portofino, atelier, edição numerada).

---

## 6. Requisitos não funcionais

- **Idioma**: pt-BR.
- **Responsivo**: breakpoints 1080 / 820 / 520 (grade 4→3→2→1 colunas; menu mobile).
- **Performance/mock**: site estático, sem backend; preloader até carregar o herói.
- **Acessibilidade básica**: `aria-label` nos ícones, texto alternativo nas imagens.
- **Sem dependências**: zero bibliotecas JS; CSS puro + fontes Google.

---

## 7. Fora do escopo (v1)

- Checkout real / pagamento.
- Busca funcional (apenas toast de luxo).
- Cadastro/autenticação.
- CMS / catálogo dinâmico (produtos em `PRODUCTS` no JS).

---

## 8. Critérios de aceite (checklist)

- [x] Intro cinematográfica + herói full-bleed com cenas 01/02/03; encolhe no scroll.
- [x] "W3" gravado na haste da armação (foto real `img/w3optica.png`).
- [x] Filtros de categoria re-renderizam o grid e rolam até a coleção.
- [x] Preços dentro das faixas exigidas por categoria.
- [x] Sacola + wishlist funcionais e persistentes (localStorage).
- [x] Imagens de modelo/glasses reais (sem fotos suspeitas).
- [x] Seção História com Porto de Portofino e narrativa old money.
- [x] Responsivo e em pt-BR.