# DESIGN SYSTEM — W3 ÓPTICA

> Port vanilla do **stackzero/commerce-ui** (MIT,
> https://github.com/stackzero-labs/ui — React + Tailwind v4 + shadcn/new-york)
> para o site estático W3Optica. **Cores W3 preservadas**: a estrutura,
> os tokens semânticos e a anatomia dos componentes vêm do stackzero;
> os valores de cor/fonte são Preto / Marfim / Ouro da maison.

## 1. Tokens (`css/design-system.css` → `:root`)

| Token shadcn | Valor W3 | Origem |
|---|---|---|
| `--background` / `--foreground` | `--black #0a0a0a` / `--cream #f1ece2` | fundo + texto |
| `--card` / `--popover` | `--black-2 #101010` / `--black-3 #161616` | cards, drawers, popovers |
| `--primary` / `--primary-foreground` | `--gold #c9a45c` / `--black` | ouro = ação primária (era violeta `#262.1 83.3% 57.8%` no stackzero) |
| `--secondary` / `--secondary-foreground` | `#1e1b14` / `--gold-soft` | superfícies afundadas |
| `--muted` / `--muted-foreground` | `#141311` / `#a49d8d` | textos secundários |
| `--accent` | `--gold` | destaques |
| `--destructive` | `#d04855` | remover / erros |
| `--border` / `--input` / `--ring` | `--line` / marfim 22% / `--gold` | bordas, campos, foco |
| `--radius` | `0.5rem` | igual ao stackzero |

Fontes seguem as da maison (`Cormorant Garamond` + `Montserrat`), não Arial/Geist do repo original.

## 2. Componentes portados

| DS (`css/design-system.css`) | Origem stackzero | Onde usa |
|---|---|---|
| `.ds-badge` + `--gold/--outline/--sale/--ghost` | `components/ui/badge.tsx` (cva) | tags dos cards (`js/app.js` → `cardHTML`), selo `−%` |
| `.ds-price` + `__original`/`__sale` | `price-format/sale/price-format-sale.tsx` | `saleHTML(p)`: riscado + badge de % quando `compareAt > price` |
| `.ds-stars` | `star-rating/fractions` (readOnly, gradiente parcial) | `starsHTML()` nos cards, ouro `#c9a45c`, tam. 12 |
| `.ds-stepper` + `__btn`/`__input` | `quantity-input/basic` (clamp no blur, min 1 max 99) | sacola (`refreshCart`); Enter confirma |
| `.ds-accordion` (`details/summary`, `name=` exclusivo) | `ui/accordion.tsx` (Radix) | rodapé da sacola: Envio / Trocas / Autenticidade |
| `.ds-focus` | `outline-ring/50` | anel de foco ouro acessível |

Botões seguem o mapeamento: `btn-solid` = `Button primary`, `btn-outline` = `Button outline`, `pill.active` = estado selecionado.

## 3. Dados

- `ratingFor(p)`: rating estável 4.5–5.0 derivado do `id` (sem alterar a base).
- `compareAt` (opcional, 2 peças: `s1`, `b1`): preço original riscado + `%` — para marcar sale em peça nova, basta adicionar `compareAt: <valor>` ao produto.

## 4. Adicionar peças novas do stackzero

1. Leia o `.tsx` em `C:\Users\Gabriel\AppData\Local\Temp\opencode\stackzero-ui\components\commerce-ui\...`
2. Traduza as classes Tailwind para `design-system.css` com prefixo `ds-`, trocando a paleta pela tabela acima.
3. Monte o HTML via JS em `app.js` (os blocos são re-renderizados) e registre neste arquivo.
