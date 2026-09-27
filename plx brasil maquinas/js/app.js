// Réplica fiel — menu mobile, busca, modal de orçamento
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* MENU MOBILE */
const navToggle = $('#navToggle'), mainnav = $('#mainnav');
navToggle.addEventListener('click', () => {
  const open = mainnav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
$$('#mainnav a').forEach(a => a.addEventListener('click', () => mainnav.classList.remove('open')));

/* BUSCA — leva para as páginas oficiais dos modelos */
const MODELS = [
  ['X65 Pro', 'Mini Escavadeira', 'https://plxbrasil.com.br/mini-escavadeira-x65-pro'],
  ['X35 Pro', 'Mini Escavadeira', 'https://plxbrasil.com.br/mini-escavadeira-x35-pro'],
  ['X30 Pro', 'Mini Escavadeira', 'https://plxbrasil.com.br/mini-escavadeira-x30-pro'],
  ['X20 Pro', 'Mini Escavadeira', 'https://plxbrasil.com.br/mini-escavadeira-x20-pro'],
  ['X15 Pro', 'Mini Escavadeira', 'https://plxbrasil.com.br/mini-escavadeira-x15-pro'],
  ['X10 Pro', 'Mini Escavadeira', 'https://plxbrasil.com.br/mini-escavadeira-x10-pro'],
  ['X10 Plus', 'Mini Escavadeira', 'https://plxbrasil.com.br/mini-escavadeira-x10-plus'],
  ['XC750', 'Mini Carregadeira', 'https://plxbrasil.com.br/mini-carregadeira-xc750'],
  ['XD500', 'Mini Carregadeira / Dumper', 'https://plxbrasil.com.br/mini-dumper-xd500'],
  ['XR12', 'Mini Rolo Compactador', 'https://plxbrasil.com.br/mini-rolo-compactador-xr12'],
];
const searchInput = $('#searchInput'), searchResults = $('#searchResults');
function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.hidden = true; return; }
  const hits = MODELS.filter(m => (m[0] + ' ' + m[1]).toLowerCase().includes(q)).slice(0, 7);
  searchResults.innerHTML = hits.length
    ? hits.map(m => `<a href="${m[2]}"><span>${m[0]}</span><small>${m[1]} →</small></a>`).join('')
    : `<a href="https://plxbrasil.com.br/"><span>Nada encontrado — ir ao site oficial</span><small>→</small></a>`;
  searchResults.hidden = false;
}
searchInput.addEventListener('input', runSearch);
searchInput.addEventListener('focus', runSearch);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' }); } });
document.addEventListener('click', e => { if (!e.target.closest('.searchbox')) searchResults.hidden = true; });

/* MODAL ORÇAMENTO */
const quoteModal = $('#quoteModal');
function openQuote(modelo) {
  if (modelo) {
    const sel = $('#qMachine');
    const opts = [...sel.options].map(o => o.text);
    if (opts.includes(modelo)) sel.value = modelo;
    else { const hit = opts.find(t => t.startsWith(modelo.split(' ')[0])); if (hit) sel.value = hit; }
  }
  quoteModal.hidden = false; document.body.style.overflow = 'hidden';
}
function closeQuote() { quoteModal.hidden = true; document.body.style.overflow = ''; }
$$('[data-orcamento]').forEach(b => b.addEventListener('click', openQuote));
$$('[data-close]').forEach(b => b.addEventListener('click', e => closeQuote()));
quoteModal.addEventListener('click', e => { if (e.target === quoteModal) closeQuote(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuote(); });
$('#quoteForm').addEventListener('submit', e => {
  e.preventDefault();
  const tipo = (e.target.querySelector('input[name="qTipo"]:checked') || {}).value || 'Compra';
  const msg = `Olá, PLX Brasil! Sou ${$('#qName').value} (${$('#qPhone').value}). Quero orçamento: ${$('#qMachine').value} | ${tipo}.`;
  window.open('https://wa.me/5548988728340?text=' + encodeURIComponent(msg), '_blank');
});

/* ===== GIRO 360° FOTOGRÁFICO — config por máquina (só fotos, sem modelo 3D) =====
   Para adicionar uma máquina: crie img/<modelo>/ com frame-1..6 + frame-7 e
   acrescente uma entrada aqui seguindo o padrão da x65. */
const PHOTO360 = {
  x65: {
    base: 'img/x65/', name: 'Mini Escavadeira X65 Pro', cat: 'MINI ESCAVADEIRA',
    link: 'https://plxbrasil.com.br/mini-escavadeira-x65-pro', quote: 'X65 Pro',
    pills: ['5.950 kg', '4.159 mm', 'Yanmar 48,5 HP'],
    orbit: [
      { f: 'frame-6', label: 'Frontal' },
      { f: 'frame-2', label: '3/4 Frontal Direito' },
      { f: 'frame-4', label: 'Lateral Direita' },
      { f: 'frame-5', label: 'Traseira 3/4' },
      { f: 'frame-3', label: 'Lateral Esquerda' },
      { f: 'frame-1', label: '3/4 Frontal Esquerdo' },
    ],
    top: { f: 'frame-7.png', label: 'Vista Superior 3/4' },
    dots: [
      { id: 'cabine', img: 'detail-cabine.png', title: 'Cabine', text: 'Cabine fechada com banco PLX, ampla área envidraçada e comandos de fácil alcance.', pos: { 0: [68, 28], 1: [68, 26], 2: [24, 28], 3: [64, 28], 4: [76, 26], 5: [64, 28], 6: [52, 40] } },
      { id: 'motor', img: 'detail-motor.png', title: 'Motor Yanmar 48,5 HP', text: 'Yanmar 4TNV94L — 4 cilindros, diesel, tanque de 115 L, com ampla grade de ventilação e fácil acesso.', pos: { 2: [14, 44], 3: [34, 44], 4: [62, 44] } },
      { id: 'adesivos', img: 'detail-adesivos.png', title: 'Identidade PLX', text: 'Acabamento com adesivos PLX e placa X65 Pro — identificação e padrão de fábrica.', pos: { 2: [30, 44], 3: [48, 42], 4: [70, 46] } },
      { id: 'hidraulica', img: 'detail-hidraulica.png', title: 'Hidráulica', text: 'Bomba de pistão axial — 132 L/min e reservatório de 88 L. Pronta para rompedor e implementos.', pos: { 0: [50, 42], 1: [40, 34], 2: [56, 30], 4: [44, 32], 5: [36, 36], 6: [58, 30] } },
      { id: 'esteira', img: 'detail-esteira.png', title: 'Esteira em aço', text: 'Esteiras em aço (borracha opcional) — tração e estabilidade em qualquer terreno.', pos: { 0: [50, 82], 1: [62, 80], 2: [40, 80], 3: [45, 78], 4: [60, 80], 5: [58, 80], 6: [40, 62] } },
      { id: 'cacamba', img: 'detail-cacamba.png', title: 'Caçamba 0,210 m³', text: 'Caçamba de 0,210 m³ e 725 mm, com força de escavação de 48 kN na concha.', pos: { 0: [46, 66], 1: [26, 60], 2: [82, 58], 4: [22, 52], 5: [16, 58], 6: [70, 55] } },
    ],
  },
  x35: {
    base: 'img/x35/', name: 'Mini Escavadeira X35 Pro', cat: 'MINI ESCAVADEIRA',
    link: 'https://plxbrasil.com.br/mini-escavadeira-x35-pro', quote: 'X35 Pro',
    pills: ['Fundações profundas', 'Solo pesado', 'Linha Pro'],
    orbit: [
      { f: 'frame-6', label: 'Frontal' },
      { f: 'frame-2', label: '3/4 Frontal Direito' },
      { f: 'frame-4', label: 'Lateral Direita' },
      { f: 'frame-5', label: 'Traseira 3/4' },
      { f: 'frame-3', label: 'Lateral Esquerda' },
      { f: 'frame-1', label: '3/4 Frontal Esquerdo' },
    ],
    top: { f: 'frame-7.png', label: 'Vista Superior 3/4' },
    dots: [
      { id: 'cabine', img: null, title: 'Cabine do operador', text: 'Estação de operação com comandos de fácil alcance.', pos: { 0: [68, 28], 1: [68, 26], 2: [24, 28], 3: [64, 28], 4: [76, 26], 5: [64, 28], 6: [52, 40] } },
      { id: 'motor', img: null, title: 'Motor diesel', text: 'Motorização diesel com acesso facilitado para manutenção.', pos: { 2: [14, 44], 3: [34, 44], 4: [62, 44] } },
      { id: 'identidade', img: null, title: 'Identidade PLX', text: 'Acabamento padrão de fábrica com identificação PLX.', pos: { 2: [30, 44], 3: [48, 42], 4: [70, 46] } },
      { id: 'hidraulica', img: null, title: 'Sistema hidráulico', text: 'Pronta para rompedor e implementos hidráulicos.', pos: { 0: [50, 42], 1: [40, 34], 2: [56, 30], 4: [44, 32], 5: [36, 36], 6: [58, 30] } },
      { id: 'esteira', img: null, title: 'Esteiras', text: 'Tração e estabilidade em qualquer terreno.', pos: { 0: [50, 82], 1: [62, 80], 2: [40, 80], 3: [45, 78], 4: [60, 80], 5: [58, 80], 6: [40, 62] } },
      { id: 'cacamba', img: null, title: 'Caçamba', text: 'Concha para escavação, valetamento e nivelamento.', pos: { 0: [46, 66], 1: [26, 60], 2: [82, 58], 4: [22, 52], 5: [16, 58], 6: [70, 55] } },
    ],
  },
};
let CFG360 = PHOTO360.x65;
let KEY360 = 'x65';
/* Pontes p/ o módulo 3D (escopo isolado): fotos disponíveis e abertura */
window.__openPhoto = (k) => { if (PHOTO360[k]) open360(k); };
window.__hasPhoto = (k) => !!PHOTO360[k];

/* Links oficiais (fallback se o 3D não carregar e não houver fotos) */
const LINKS360 = {
  x65: 'https://plxbrasil.com.br/mini-escavadeira-x65-pro',
  x35: 'https://plxbrasil.com.br/mini-escavadeira-x35-pro',
  x30: 'https://plxbrasil.com.br/mini-escavadeira-x30-pro',
  x20: 'https://plxbrasil.com.br/mini-escavadeira-x20-pro',
  x15: 'https://plxbrasil.com.br/mini-escavadeira-x15-pro',
  x10pro: 'https://plxbrasil.com.br/mini-escavadeira-x10-pro',
  x10plus: 'https://plxbrasil.com.br/mini-escavadeira-x10-plus',
  xc750: 'https://plxbrasil.com.br/mini-carregadeira-xc750',
  xd500c: 'https://plxbrasil.com.br/mini-carregadeira-xd500',
  xd500d: 'https://plxbrasil.com.br/mini-dumper-xd500',
  xr12: 'https://plxbrasil.com.br/mini-rolo-compactador-xr12',
};

/* Badges 3D abrem o modelo 3D giratório (fotos ficam dentro, via botão) */
$$('.badge3d').forEach((b) => b.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const k = b.dataset.m;
  if (window.__open3D) window.__open3D(k);
  else if (PHOTO360[k]) open360(k);
  else window.open(LINKS360[k] || 'https://plxbrasil.com.br/', '_blank');
}));

/* ===== Motor do giro 360° fotográfico (usa CFG360, a máquina aberta) ===== */
const m360 = $('#view360'), st360 = $('#v360Stage'), zm360 = $('#v360Zoom'),
  im360 = $('#v360Img'), im360B = $('#v360ImgB'), im360T = $('#v360ImgT'),
  dots360 = $('#v360Dots'), cnt360 = $('#v360Count'),
  det360 = $('#v360Detail'), detImg360 = $('#v360DetailImg');
const S360 = { idx: 0, top: false, tilt: 0, tiltTarget: 0, lastOrbit: 0, vel: 0, drag: false, sx: 0, sy: 0, si: 0, st: 0, px: 0, py: 0, pan: false, pinch: false, scale: 1, tx: 0, ty: 0, auto: true, idle: 0, tween: null, open: false, detail: false, loaded: false };
let NSTEP = CFG360.orbit.length;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const orbitMod = (i) => ((i % NSTEP) + NSTEP) % NSTEP;

function orbitFile(i) { return CFG360.base + CFG360.orbit[orbitMod(i)].f + '.png' + '?v=red'; }
let TOPFILE = CFG360.base + CFG360.top.f + '?v=red';
/* Ângulo exibido (0-5 órbita, 6 topo): topo vale quando inclinado p/ cima */
function dispKey() { return (S360.top || S360.tilt > 0.5) ? 6 : orbitMod(Math.round(S360.idx)); }
function setLayer(img, src) { if (img.getAttribute('src') !== src) img.setAttribute('src', src); }
function frameKey() { return dispKey(); }

function render360() {
  const tilt = S360.top ? 1 : clamp01(S360.tilt);
  /* 3 camadas: A = frame orbital atual, B = próximo frame (giro horizontal suave),
     T = vista superior (aparece ao arrastar p/ cima) */
  const i0 = Math.floor(S360.idx);
  const f = S360.idx - i0;
  setLayer(im360, orbitFile(i0));
  setLayer(im360B, orbitFile(i0 + 1));
  im360B.style.opacity = (f * (1 - tilt)).toFixed(3);
  setLayer(im360T, TOPFILE);
  im360T.style.opacity = tilt.toFixed(3);
  const k = dispKey();
  cnt360.textContent = k === 6 ? CFG360.top.label : (CFG360.orbit[k].label + ' · ' + (k + 1) + '/' + NSTEP);
  $$('#v360Angles .mini3d').forEach((a) => {
    const on = k === 6 ? a.dataset.k === 'top' : +a.dataset.k === k;
    a.classList.toggle('on', on);
  });
  // Dots: reconstrói só quando o ângulo / inclinação / zoom / detalhe muda
  const dotsKey = k + '|' + (S360.scale > 1.15) + '|' + S360.detail;
  if (dotsKey === S360._dotsKey) return;
  S360._dotsKey = dotsKey;
  dots360.innerHTML = '';
  if (S360.scale > 1.15 || S360.detail) return;
  CFG360.dots.forEach((d) => {
    const p = d.pos[k];
    if (!p) return;
    const b = document.createElement('button');
    b.className = 'v360-dot';
    b.dataset.di = CFG360.dots.indexOf(d);
    b.style.left = p[0] + '%';
    b.style.top = p[1] + '%';
    b.setAttribute('aria-label', d.title);
    b.title = d.title;
    b.addEventListener('click', (e) => { e.stopPropagation(); openDetail(d, p); });
    dots360.appendChild(b);
  });
}

/* Abre o detalhe no pointerup (toque): funciona mesmo se o click for
   retargeteado pelo navegador. O guard em openDetail evita duplo disparo.
   Registrado UMA vez (antes ficava dentro do render360 e duplicava a cada frame). */
dots360.addEventListener('pointerup', (e) => {
  const b = e.target.closest('.v360-dot');
  if (!b || S360.detail || (S360.moved || 0) >= 8) return;
  const d = CFG360.dots[+b.dataset.di];
  const p = d && d.pos[frameKey()];
  if (d && p) openDetail(d, p);
});

function applyZoom360() {
  zm360.style.transform = `translate(${S360.tx}px,${S360.ty}px) scale(${S360.scale})`;
  render360();
}
function setScale360(s, cx, cy) {
  S360.scale = Math.min(3, Math.max(1, s));
  if (S360.scale <= 1) { S360.tx = 0; S360.ty = 0; }
  applyZoom360();
}

function gotoOrbit(i, instant) {
  S360.top = false;
  S360.tiltTarget = 0;
  let t = ((Math.round(i) % NSTEP) + NSTEP) % NSTEP;
  let d = (t - S360.idx) % NSTEP;
  if (d > NSTEP / 2) d -= NSTEP;
  if (d < -NSTEP / 2) d += NSTEP;
  if (instant) { S360.idx = t; S360.tilt = 0; render360(); return; }
  S360.tween = { from: S360.idx, dist: d, t0: performance.now(), dur: 450 };
  S360.auto = false;
  $('#v360Auto').textContent = 'Auto: OFF';
}
function gotoTop() {
  S360.lastOrbit = Math.round(S360.idx);
  S360.top = true;
  S360.tiltTarget = 1;
  S360.auto = false;
  $('#v360Auto').textContent = 'Auto: OFF';
  render360();
}

function openDetail(d, p) {
  if (S360.detail) return;
  S360.detail = true;
  zm360.style.transition = 'transform .55s cubic-bezier(.22,.8,.24,1)';
  zm360.style.transformOrigin = p[0] + '% ' + p[1] + '%';
  zm360.style.transform = 'scale(2.1)';
  setTimeout(() => {
    if (!S360.open || !S360.detail) return;
    if (d.img) { detImg360.setAttribute('src', CFG360.base + d.img + '?v=red'); detImg360.style.display = ''; }
    else detImg360.style.display = 'none';
    $('#v360DetailTitle').textContent = d.title;
    $('#v360DetailText').textContent = d.text;
    det360.hidden = false;
    requestAnimationFrame(() => det360.classList.add('show'));
    render360();
  }, 360);
}
function closeDetail() {
  det360.classList.remove('show');
  setTimeout(() => { det360.hidden = true; }, 320);
  S360.detail = false;
  zm360.style.transition = 'transform .18s ease-out';
  zm360.style.transformOrigin = 'center';
  setScale360(1);
}

function loop360(now) {
  if (!S360.open) return;
  requestAnimationFrame(loop360);
  const dt = Math.min(50, now - (S360._l || now));
  S360._l = now;
  /* Inclinação vertical anima suavemente até o alvo (botões Ângulos) */
  if (!S360.drag && Math.abs(S360.tiltTarget - S360.tilt) > 0.001) {
    S360.tilt += (S360.tiltTarget - S360.tilt) * Math.min(1, dt / 180);
    if (Math.abs(S360.tiltTarget - S360.tilt) <= 0.002) S360.tilt = S360.tiltTarget;
    render360();
  }
  if (S360.tween && !S360.drag) {
    const t = Math.min(1, (now - S360.tween.t0) / S360.tween.dur);
    const e = 1 - Math.pow(1 - t, 3);
    S360.idx = S360.tween.from + S360.tween.dist * e;
    if (t >= 1) S360.tween = null;
    render360();
  } else if (!S360.drag && !S360.top && !S360.detail && S360.scale <= 1) {
    if (Math.abs(S360.vel) > 0.002) {
      S360.idx += S360.vel * dt / 16;
      S360.vel *= 0.95;
      if (Math.abs(S360.vel) <= 0.002) {
        const target = Math.round(S360.idx);
        S360.tween = { from: S360.idx, dist: (target - S360.idx) % NSTEP, t0: now, dur: 260 };
      }
      render360();
    } else if (S360.auto) {
      S360.idx += dt / 1600;
      render360();
    }
  }
}

function preload360(done) {
  const files = CFG360.orbit.map((o) => o.f + '.png')
    .concat([CFG360.top.f])
    .concat(CFG360.dots.map((d) => d.img).filter(Boolean));
  let n = 0;
  if (!files.length) { done(); return; }
  files.forEach((f) => {
    const im = new Image();
    im.onload = im.onerror = () => { if (++n === files.length) done(); };
    im.src = CFG360.base + f + '?v=red';
  });
}

function open360(key) {
  if (key && PHOTO360[key]) { CFG360 = PHOTO360[key]; KEY360 = key; }
  NSTEP = CFG360.orbit.length;
  TOPFILE = CFG360.base + CFG360.top.f + '?v=red';
  /* Textos do painel conforme a máquina aberta */
  $('#v360Kicker').textContent = CFG360.name.toUpperCase() + ' — GIRO 360° · ARRASTE PARA GIRAR';
  $('#v360Cat').textContent = CFG360.cat;
  $('#v360Name').textContent = CFG360.quote;
  $('#v360Pills').innerHTML = CFG360.pills.map((p) => `<span>${p}</span>`).join('');
  $('#v360Conds').href = CFG360.link;
  $('#v360Model').style.display = (typeof window.__open3D === 'function') ? '' : 'none';
  $('#v360DetailCat').textContent = CFG360.quote.toUpperCase();
  detImg360.alt = 'Detalhe ' + CFG360.quote;
  im360.alt = CFG360.name;
  m360.hidden = false;
  document.body.style.overflow = 'hidden';
  S360.open = true;
  S360.detail = false;
  S360.top = false;
  S360.idx = 0;
  S360.vel = 0; S360.tween = null; S360.drag = false; S360.pinch = false;
  S360.tilt = 0; S360.tiltTarget = 0;
  S360.moved = 0; S360.suppress = false;
  S360._dotsKey = null;
  S360.scale = 1; S360.tx = 0; S360.ty = 0;
  // Reseta overlay de detalhe e zoom (evita estado vazado de abertura anterior / timeout pendente)
  det360.classList.remove('show');
  det360.hidden = true;
  zm360.style.transition = '';
  zm360.style.transformOrigin = 'center';
  zm360.style.transform = '';
  applyZoom360();
  cnt360.textContent = 'Carregando fotos…';
  /* Ângulos reconstruídos a cada abertura (mudam por máquina) */
  const angles = $('#v360Angles');
  angles.innerHTML = '';
  CFG360.orbit.forEach((o, i) => {
    const b = document.createElement('button');
    b.className = 'mini3d';
    b.dataset.k = i;
    b.textContent = o.label;
    b.addEventListener('click', () => { if (S360.detail) closeDetail(); gotoOrbit(i); });
    angles.appendChild(b);
  });
  const t = document.createElement('button');
  t.className = 'mini3d';
  t.dataset.k = 'top';
  t.textContent = CFG360.top.label;
  t.addEventListener('click', () => { if (S360.detail) closeDetail(); gotoTop(); });
  angles.appendChild(t);
  preload360(() => { S360.loaded = true; render360(); });
  render360();
  requestAnimationFrame(loop360);
}
function close360() {
  S360.open = false;
  if (S360.detail) { det360.classList.remove('show'); det360.hidden = true; S360.detail = false; }
  m360.hidden = true;
  document.body.style.overflow = '';
}

/* Ponteiros ativos (p/ pinça com 2 dedos no celular) */
const ptrs360 = new Map();
function pinchDist() {
  const p = [...ptrs360.values()];
  return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
}
function pinchMid() {
  const p = [...ptrs360.values()];
  return { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 };
}

st360.addEventListener('pointerdown', (e) => {
  if (S360.detail) return;
  ptrs360.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (ptrs360.size === 2) {
    /* 2º dedo: entra em modo pinça (zoom + pan) */
    S360.pinch = true;
    S360.drag = true;
    S360._pd = pinchDist();
    S360._ps = S360.scale;
    const m = pinchMid();
    S360._mx = m.x; S360._my = m.y;
    S360.px = S360.tx; S360.py = S360.ty;
    S360.moved = 8;
    S360.vel = 0; S360.tween = null;
    return;
  }
  if (ptrs360.size > 2) return;
  S360.drag = true;
  S360.sx = e.clientX; S360.sy = e.clientY;
  S360.si = S360.idx;
  S360.st = S360.top ? 1 : S360.tilt;
  if (S360.top) { S360.top = false; S360.idx = S360.lastOrbit; S360.si = S360.idx; }
  S360._lx = 0;
  S360.moved = 0;
  S360.pan = S360.scale > 1;
  S360.px = S360.tx; S360.py = S360.ty;
  S360.vel = 0; S360.tween = null;
  S360.tiltTarget = S360.st;
});
/* Sem setPointerCapture: ele retargeteia o click para o stage e mata os dots.
   Cliques após arrasto são suprimidos pelo threshold abaixo. */
st360.addEventListener('click', (e) => {
  if (S360.suppress) { e.stopPropagation(); e.preventDefault(); S360.suppress = false; }
}, true);
st360.addEventListener('pointermove', (e) => {
  if (!S360.drag || S360.detail) return;
  if (ptrs360.has(e.pointerId)) ptrs360.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (S360.pinch && ptrs360.size >= 2) {
    const d = pinchDist();
    if (S360._pd > 0) setScale360(S360._ps * d / S360._pd);
    const m = pinchMid();
    S360.tx = S360.px + (m.x - S360._mx);
    S360.ty = S360.py + (m.y - S360._my);
    applyZoom360();
    return;
  }
  if (S360.pan) {
    S360.tx = S360.px + (e.clientX - S360.sx);
    S360.ty = S360.py + (e.clientY - S360.sy);
    S360.moved = Math.max(S360.moved, Math.abs(e.clientX - S360.sx) + Math.abs(e.clientY - S360.sy));
    applyZoom360();
  } else {
    /* Órbita 2 eixos: horizontal = laterais, vertical = inclina p/ vista superior */
    const dx = e.clientX - S360.sx;
    const dy = e.clientY - S360.sy;
    S360.moved = Math.max(S360.moved, Math.abs(dx) + Math.abs(dy));
    S360.idx = S360.si + dx / 110;
    S360.tilt = S360.tiltTarget = clamp01(S360.st - dy / 240);
    S360.vel = (dx - (S360._lx || 0)) / 110;
    S360._lx = dx;
    S360.idle = performance.now();
    render360();
  }
});
['pointerup', 'pointercancel'].forEach((ev) => st360.addEventListener(ev, (e) => {
  ptrs360.delete(e.pointerId);
  if (S360.pinch) {
    if (ptrs360.size >= 2) {
      /* ainda há 2+ dedos: reinicia a base da pinça */
      S360._pd = pinchDist();
      S360._ps = S360.scale;
      const m = pinchMid();
      S360._mx = m.x; S360._my = m.y;
      S360.px = S360.tx; S360.py = S360.ty;
      return;
    }
    S360.pinch = false;
    if (ptrs360.size === 1) {
      /* volta p/ 1 dedo sem salto: reancora a órbita no dedo restante */
      const p = [...ptrs360.values()][0];
      S360.sx = p.x; S360.sy = p.y;
      S360.si = S360.idx;
      S360.st = S360.tilt;
      S360._lx = 0;
      S360.pan = S360.scale > 1;
      S360.px = S360.tx; S360.py = S360.ty;
      S360.moved = 8;
      S360.suppress = true;
      return;
    }
  }
  S360.drag = false;
  S360._lx = 0;
  if (S360.moved < 8) {
    /* foi só um toque: reverte qualquer micro-movimento e deixa o click passar */
    S360.idx = Math.round(S360.si);
    S360.tilt = S360.tiltTarget = S360.st;
    S360.tx = S360.px; S360.ty = S360.py;
    S360.vel = 0;
    applyZoom360();
    render360();
    return;
  }
  S360.suppress = true;
  S360.vel = Math.max(-0.5, Math.min(0.5, S360.vel));
  if (!S360.pan && !S360.top && Math.abs(S360.vel) <= 0.05) {
    const target = Math.round(S360.idx);
    const d = (target - S360.idx) % NSTEP;
    S360.tween = { from: S360.idx, dist: d, t0: performance.now(), dur: 260 };
  }
}));
st360.addEventListener('wheel', (e) => {
  if (S360.detail) return;
  e.preventDefault();
  setScale360(S360.scale - Math.sign(e.deltaY) * 0.2);
}, { passive: false });
$('#v360ZoomIn').addEventListener('click', () => setScale360(S360.scale + 0.5));
$('#v360ZoomOut').addEventListener('click', () => setScale360(S360.scale - 0.5));
$('#v360ZoomReset').addEventListener('click', () => setScale360(1));
$('#v360Auto').addEventListener('click', (e) => {
  S360.auto = !S360.auto;
  e.target.textContent = S360.auto ? 'Auto: ON' : 'Auto: OFF';
});
$('#v360Back').addEventListener('click', closeDetail);
$('#v360DetailQuote').addEventListener('click', () => { close360(); openQuote(CFG360.quote); });
$('#v360Quote').addEventListener('click', () => { close360(); openQuote(CFG360.quote); });
$('#v360Model').addEventListener('click', () => {
  if (typeof window.__open3D !== 'function') return;
  close360();
  window.__open3D(KEY360);
});
$('[data-close360]').addEventListener('click', close360);
m360.addEventListener('click', (e) => { if (e.target === m360) close360(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !m360.hidden) close360(); });
