# PROGRESSO — W3Optica

> Arquivo de memória do projeto. O agente (opencode) deve atualizar
> este arquivo ao final de cada etapa concluída, marcando o que foi
> feito e o que falta. Isso permite continuar de onde parou mesmo
> depois de desligar o PC.

## Onde estou
- Projeto: site estático da **W3 OPTICA** (óptica/eyewear) em `W3Optica/`
  - `index.html` (~405 linhas: preloader, marquee, header, coleção...)
  - `css/`, `js/`, `img/`
- Workspace: `E:\codes zed\Default Project`

## Feito
- 2026-09-27: **Commits em dia + commit automático** — `.gitignore` (segredos e runtime fora do GitHub), `inbox/notify-log/ntfy-topic` fora do índice, PLX commitada (20 arquivos, redesign 3D + `models/x65.glb`); novo `auto-commit.ps1` (vigia a cada 60s, commita após 90s parado) ligado pelo `retomar.ps1`
- Estrutura inicial do site criada (header, preloader, marquee, navegação)
- Site completo conforme PRD (hero, coleção com filtros, sacola, wishlist, história, atelier)
- 2026-09-11: **Wishlist drawer + busca real**
  - Drawer de desejos (`#wishlist`): lista persistente, adicionar à sacola, mover todos, badge no header
  - Busca real (`#searchOverlay`): overlay de luxo, normalização sem acento, preview top-6, Enter renderiza grid filtrado
  - Refactor `renderGrid` → `renderCustom(list, title, sub)`; ESC fecha tudo; drawers exclusivos
  - Verificado: 40 IDs do JS existem no HTML, chaves/parênteses balanceados
- 2026-09-11: **Intro cinematográfica da capa**
  - `index.html`: bloco `#intro` após o preloader — 2 metades (`.intro-half`) com a capa, marca central, filete ouro (`.intro-seam`), botão pular
  - `style.css`: zoom `introZoom` com foco no olho (72%/42%), metades deslizam como portas (`.intro.open`), `prefers-reduced-motion` respeitado
  - `js/app.js`: trava scroll (`intro-lock`), abre as portas aos 2,5s (0,9s em revisita na sessão), `anyOpen()` considera a intro, fallback da capa para foto do hero
  - Verificado: 42 IDs existem no HTML, chaves/parênteses balanceados, hero original intacto
- 2026-09-11: **Intro migrada para GSAP + Tailwind, capa local**
  - Imagem `Pictures/W3Optica.png` copiada para `W3Optica/img/w3optica.png` (2,4MB); intro usa o arquivo local (fallback Unsplash)
  - `index.html`: Tailwind Play CDN (preflight OFF + ouro/creme no tema) + GSAP 3.12.5 CDN; intro com utilities Tailwind
  - `js/app.js`: timeline GSAP (zoom no olho → marca sai → filete ouro → portas `xPercent ±102` expo.inOut → hero); fallback CSS se CDN falhar; `gsap-on` desliga animações CSS p/ não conflitar
  - Verificado: 42 IDs no HTML, tudo balanceado, CDNs + fallback presentes
- 2026-09-11: **Design system stackzero/commerce-ui aplicado (cores W3 mantidas)**
  - Repo clonado em temp (`stackzero-ui`); port vanilla p/ estático (sem React)
  - Novo `W3Optica/css/design-system.css`: tokens shadcn→W3 (primary ouro, bg preto, fg marfim) + `.ds-badge/.ds-price/.ds-stars/.ds-stepper/.ds-accordion`
  - `app.js`: cards com estrelas SVG fracionadas ouro + sale (`compareAt` em s1/b1); sacola com stepper digitável (clamp 1–99)
  - Sacola com accordion Envio/Trocas/Autenticidade; doc em `W3Optica/DESIGN-SYSTEM.md`
  - Verificado: 42 IDs no HTML, tudo balanceado, sem violeta original, cores W3 intactas
- 2026-09-11: **Impeccable polish aplicado** (`impeccable context` + `detect` OK)
  - P1: ações do card sempre visíveis no touch (`hover:none`); foco teclado ouro global; `card-name` virou span (link morto `href="#"` removido); hit area dos ícones 6→10px
  - P2: `prefers-reduced-motion` (marquee/reveal/kenburns off); meta description + theme-color + favicon W3; removido CSS órfão (`.tag`, `.qty`, `.ver-todos`, `.section-head-row`, `.grau`)
  - Detector: 88 warnings, 0 erros — micro-tipografia uppercase + tracking largo e brilho ouro mantidos como exceção intencional (estética old-money fixada no PRD)
- 2026-09-11: **Hero refeito estilo TikTok** (ref. vídeo @thetechlife2; frames do vídeo inutilizáveis — tentar extração via yt-dlp/cover falhou)
  - `img/w3optica.png` full-bleed (olho verde + W3 real na haste; SVG da armação removido); headline Cormorant itálica gigante rotativa 01/02/03 + paginação lateral com progresso + deriva GSAP; CTA minimalista
  - Scroll-shrink mantido; preloader mira `heroBleedImg`; pausa fora de vista/aba oculta; `prefers-reduced-motion` estático
  - PRD §hero + checklist atualizados; zero CSS/JS órfão do hero antigo
  - Verificado: 46 IDs no HTML, tudo balanceado

- 2026-09-12: **Grade limpa sem fotos, animações mantidas**
  - `js/app.js`: 24 PRODUCTS com `img: []` + guia de reposição (`img: ["img/s1-a.jpg","img/s1-b.jpg"]`); helpers `hasImg/mediaHTML/thumbHTML` — card mostra `.card-ph` W3 + shimmer quando sem foto, fotos voltam sozinhas ao preencher
  - `css/style.css`: `.card-ph` (mesmo palco/aspect, hover scale 1.03, shine animado) + `.thumb-ph` p/ sacola/desejos/busca; `prefers-reduced-motion` cobre o shine; lift do card + slide-up das ações intactos
  - Verificado: `node --check` OK, só 4 `p.img` nos helpers

## Fazendo agora
- Aguardando: usuário enviar as fotos das peças para repor em `img: []` + testar no Edge (F5 para recarregar)
- 2026-09-12: marquee `announce` movida do topo para o fim (após footer, `announce--bottom`, mesma animação)
- 2026-09-12: **Categorias limpas** — 6 `cat-card` sem fotos, placeholder `.cat-ph` W3 + shine, hover zoom mantido
- 2026-09-12: **Site todo limpo (só entrada mantém foto)** — signature, campanha (3), história (bg), manufatura, instagram (4) com `.gen-ph` + shine; hero/intro `img/w3optica.png` intactos; JS com 0 URLs
- 2026-09-12: **Leo Ames em 1º em Quem usa W3** — foto editada `img/leo-ames-w3.png` (óculos W3) no lugar do SVG
- 2026-09-12: **Vitor Miguel em 2º** — foto `img/vitor-miguel-w3.png` ao lado do Leo
- 2026-09-12: **Gabriel Morais em 3º** — foto `img/gabriel-morais-w3.png` (Portofino, redondo W3); campanha completa
- 2026-09-12: **Coleção Summer (sol)** — 4 óculos recortados (`img/summer-1..4.jpg`) como sm1–sm4, R$ 990–1750
- 2026-09-12: **Página individual (quick view)** — clique na foto/nome abre modal com galeria N fotos (setas+miniaturas+teclado), specs, qty, sacola e desejo; specs reais nos 4 Summer + padrão por categoria
- 2026-09-12: **História com Portofino** — baía original restaurada local (`img/portofino.jpg`) + kenburns
- 2026-09-14: **Notificação no celular (ntfy)** — `notificar.ps1` + `ntfy-topic.txt` (tópico `w3-gabriel-a8f3k9p2x7q4m`); tipos `dev-pronto/em-revisao/revisado-ok/revisado-ajustes/deploy-ok/deploy-falha/info` (todos importantes em prioridade alta p/ pingar no Android); regra: toda IA ao terminar deve chamar o script com o que mudou + revisor + deploy
- 2026-09-14: **Zoom dos óculos afastado** — `.card-media img` e minis (sacola/busca/quick view) com `object-fit: contain` + fundo claro + respiro; óculos aparece inteiro sem abrir
- 2026-09-14: **Bolsa W3 Kors (a5)** — foto original MK editada p/ `img/bolsa-w3-kors-verde.jpg` (marca removida, monograma W3 ouro); cadastrada em Acessórios R$ 890,00
- 2026-09-14: **Aprovação pelo celular (SIM/NAO)** — `pedir-aprovacao.ps1`: push urgente com botões SIM/NAO (POST p/ tópico-resp) + espera até 150s; testado de verdade, SIM chegou e autorizou o lote das bolsas
- 2026-09-14: **4 bolsas (b5–b8)** — `W3 Milano` 5990 / `W3 Torino` 6390 / `W3 Roma` 5450 / `W3 Verona` 2890; fotos editadas (marcas removidas, W3 ouro) em `img/bolsa-w3-*.jpg`; originais intactas
- 2026-09-14: **Milano refeita + fundo branco + Kors em Bolsas** — placa refeita do original (MILANO sem colar na borda); `.card-media`/minis/quick view com fundo `#fff` (sem quadrado cinza); W3 Kors (a5) movida de Acessórios p/ Bolsas
- 2026-09-14: **URGENTE: Torino/Roma sem borda cinza + ordem + Milano fora** — fundo das fotos Torino/Roma estendido p/ branco puro (floodfill+feather); Kors movida p/ junto das bolsas (após b8); b5 Milano removida (vaga p/ amanhã)
- 2026-09-16: **Marca W3 ÓPTICA (com acento)** — `OPTICA/Optica` → `ÓPTICA/Óptica` em `W3Optica/index.html`, `js/app.js`, CSS, PRD, DESIGN-SYSTEM e `MeuPainel/data.json`; paths (`img/w3optica.png`), email e IDs intactos
- 2026-09-16: **App sólido v2 (PWA + realtime, sem F5)** — manifest completo, `sw.js` versionado (faixa "Nova versão → Atualizar", botão 📲 instalar), `supabase-schema.sql` v2 (`approvals`, `uploads`, bucket `w3-fotos`, realtime, RLS anon), `app.js` com websocket (selo `● realtime`), abas Aprovar 🔐 + Fotos 📸, login email+senha na nuvem, `pedir-aprovacao-supabase.ps1`, function `push` de referência, `SETUP-SOLIDO.md`; verificado: `node --check` OK, manifest OK, 200 em painel+site
- 2026-09-16: **Espera, idioma e textos** — preloader máx. 1200ms + intro ~2s (era ~6s); francês → italiano (`Lo sguardo dell'élite` na intro, hero e PRD); `esquilo-verde`→`verde-esmeralda`, `Marcenaria`→`Bolsas/cuoio italiano` (2 lugares), `Charnes`→`Charneiras`; payoff da imagem fica com o usuário
- 2026-09-16: **Setas 3D corrigidas + grade separada** — removido `setPointerCapture` (roubava o clique das setas); toque em qualquer card 3D abre a compra direto (arraste não abre); grade "Todas" separada em grupos Óculos/Bolsas/Acessórios/Relógios; clique na grade abre a visualização de compra (quick view)
- 2026-09-16: **3D dentro da coleção (Grade/3D)** — seção `#galeria` removida; coleção ganhou alternador Grade/3D, coverflow só óculos+bolsas (acompanha o filtro ativo), setas/pontos/arraste, contador `01/N`, clique abre a página da peça, sem foto vira placeholder W3
- 2026-09-16: **Galeria 3D estilo Sobha/WebGL** — seção `#galeria` coverflow (perspectiva, arraste, setas, pontos, autoplay, `prefers-reduced-motion`): só óculos (macro + 4 Summer + 3 modelos), frases da maison com contador `01/08`, preto/branco/dourado; peça central amplia e abre a página dela (modelos → coleção sol)
- 2026-09-16: **Login estilo Auth UI Kit** — `#login` redesenhado (ref. Figma Simple Login Mobile Auth UI Kit): card mobile central, logo redonda, título, campos com ícone e raio 16, olho mostra/esconde senha (`togglePw`), linha lembrar+esqueci, CTA grande, divisor "ou"; `checkAuth` mostra bloco `#auth-cloud`
- 2026-09-16: **Comandos celular → PC** — aba Comando ⌨️ no app (nuvem: tabela `commands`; sem nuvem: POST ntfy `-cmd`), `ouvir-celular.ps1` (puxa e anota em `inbox-celular.md`), `responder-comando.ps1` (devolve resposta ao app); schema v3 com `commands`+realtime; corrigido decode ndjson (bytes→UTF8) e scripts em ASCII (PS 5.1); teste ponta a ponta OK via ntfy

## PLX Brasil Máquinas — sessão 2026-09-20/21
- Pasta: `plx brasil maquinas/` — `index.html` (réplica fiel do plxbrasil.com.br, tema escuro acinzentado), `css/style.css`, `js/app.js`, `img/` (capa + `img/x65/` com 12 fotos)
- Capa estendida: foto do pôr-do-sol por trás de logo/busca/menu (`.cover`); títulos/textos/menus idênticos ao original; links apontam p/ páginas oficiais
- Tema escuro grafite; busca com dropdown p/ modelos oficiais; modal orçamento → WhatsApp 5548988728340
- **Giro 360° fotográfico X65** (badge `3D` no card): `img/x65/frame-{1..7}.png` + 5 `detail-*.png`; drag com inércia, 7 botões de ângulo, zoom, auto-giro, dots por peça (cabine/painel/hidráulica/esteira/caçamba/motor) com transição p/ detalhe + specs reais
- Demais 10 modelos: badge `3D` abre visor WebGL Three.js (módulo inline, `window.__open3D`); fallback abre página oficial
- **Pendente p/ amanhã:** usuário vai testar dots (cabine) no Edge — se falhar, pedir sintoma exato; possível fatiar pranchas dos outros modelos quando enviar
- Assets `?v=5` p/ forçar recarregamento no Edge (cache file://)

## Falta
- **PASSO DO USUÁRIO**: salvar a imagem do olho verde como `W3Optica/img/capa-olho-verde.jpg` (enquanto isso, a intro usa a foto do hero como fallback)
- Testar no navegador: intro cinematográfica, wishlist drawer, busca, sacola, filtros, mobile
- Possíveis próximos: quick view de produto, SEO/meta + favicon, correções de texto (ex: "Marcenaria", "12x vs 5x")
- Rodar `salvar.ps1` para checkpoint

## Como retomar depois de desligar o PC
1. Duplo-clique em `retomar.ps1` — abre o Zed no projeto e mostra o status
2. No Zed, aperte `F9` — abre o opencode
3. No opencode, retome a sessão anterior e diga:
   `leia o PROGRESS.md e continue de onde parou`
4. Ao terminar cada etapa, peça ao opencode para atualizar este arquivo
   e rode `salvar.ps1` para gravar um checkpoint no git
