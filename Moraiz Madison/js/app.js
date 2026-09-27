/* ============================================================
  Moraisz Madison — Scripts
  ============================================================ */

(function () {
 "use strict";

 var $ = function (s, c) { return (c || document).querySelector(s); };
 var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

 /* ---------------- FORMATADOR ---------------- */
 var BRL = function (v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
 };

 /* ---------------- PRODUTOS ----------------
   GRADE LIMPA — sem imagens por enquanto.
   Para repor: preencha img com 2 fotos por peça:
    img: ["img/s1-a.jpg", "img/s1-b.jpg"]
   A 1ª é a capa, a 2ª aparece no hover (crossfade).
   Enquanto img: [] o card mostra placeholder Moraisz Madison com shimmer,
   mantendo todas as animações (hover, slide-up, reveal). */
 var PRODUCTS = [
  /* ---- ÓCULOS DE SOL · COLEÇÃO SUMMER ---- */
  {
   id: "sm1",
      name: "W3 Summer Wayfarer",
      catLine: "Óculos de Sol · MM & W3 Collection",
      cat: "sol",
      desc: "Wayfarer preto brilhante, lentes verdes G-15 e W3 gravado na haste. O clássico do verão.",
      price: 990.00,
      img: ["img/mm-signature.png", "img/oculos-mm-modern.png", "img/mm-vanguard.png", "img/model-vanguard.png"],
      tag: "Summer",
   specs: [["Armação", "Acetato preto brilhante"], ["Lentes", "Verde G-15 · UV400"], ["Formato", "Wayfarer 52□18"], ["Haste", "W3 dourado gravado"], ["Acompanha", "Estojo + flanela + certificado"]]
  },
  {
   id: "sm2",
      name: "W3 Summer Round",
      catLine: "Óculos de Sol · MM & W3 Collection",
      cat: "sol",
      desc: "Redondo em metal dourado com lentes verdes e detalhe MM na haste. Leveza vintage para o dia a dia.",
      price: 1290.00,
      img: ["img/oculos-mm-vintage.png", "img/mm-classic-round.png", "img/mm-monarch.png"],
      tag: "Summer",
   specs: [["Armação", "Acetato preto · redondo"], ["Lentes", "Verde G-15 · UV400"], ["Formato", "Redondo 50□20"], ["Haste", "W3 dourado gravado"], ["Acompanha", "Estojo + flanela + certificado"]]
  },
  {
   id: "sm3",
      name: "W3 Summer Club",
      catLine: "Óculos de Sol · MM & W3 Collection",
      cat: "sol",
      desc: "Clubmaster preto com degradê grafite e ponte metálica. Elegância meia-aro com W3 na haste.",
      price: 1490.00,
      img: ["img/oculos-mm-classic.png", "img/modelo-mm-club.png", "img/mm-clubmaster-heritage.png", "img/model-clubmaster.png"],
      tag: "Summer",
   specs: [["Armação", "Meia-aro preto + metal"], ["Lentes", "Degradê grafite · UV400"], ["Formato", "Club 54□18"], ["Haste", "W3 dourado gravado"], ["Acompanha", "Estojo + flanela + certificado"]]
  },
  {
   id: "sm4",
      name: "W3 Summer Hexa Ouro",
      catLine: "Óculos de Sol · MM & W3 Collection",
   cat: "sol",
      desc: "Hexagonal em metal dourado, lentes degradê âmbar e W3 gravado. O statement da coleção.",
   price: 1750.00,
   img: ["img/summer-4.jpg"],
      tag: "Summer",
   specs: [["Armação", "Metal dourado · hexagonal"], ["Lentes", "Degradê âmbar · UV400"], ["Formato", "Hexa 54□19"], ["Haste", "W3 gravado a laser"], ["Acompanha", "Estojo + flanela + certificado"]]
  },
  /* ---- ÓCULOS DE SOL ---- */
  {
   id: "s1",
      name: "W3 Ophidia Gold",
      catLine: "Óculos de Sol · MM & W3 Collection",
      cat: "sol",
      desc: "Armação banhada a ouro 18k, ponte sob medida e lentes esmeralda-lapidadas à mão. Edição numerada.",
      price: 2490.90,
      compareAt: 2790.00,
      img: ["img/eyewear-mm-gold.png", "img/detalhe-mm-haste.png"],
   tag: "Edição numerada"
  },
  {
   id: "s2",
      name: "W3 Riviera Aviador",
      catLine: "Óculos de Sol · MM & W3 Collection",
      cat: "sol",
      desc: "Silhueta aviador em lâmina de ouro, lentes smoke esmeralda e alças de cavalete maciço.",
      price: 2150.00,
      img: ["img/mm-aviator.png", "img/eyewear-mm-aviador.png", "img/mm-aviator-classic.png", "img/model-aviador-classic.png", "img/model-titanium-sol.png"]
  },
   {
   id: "s3",
      name: "W3 Milano Croco",
    catLine: "Óculos de Sol · MM & W3 Collection",
   cat: "sol",
   desc: "Acetato tartaruga italiano, lentes escuras de alto contraste e acabamento de verniz profundo.",
      price: 2290.90,
      img: ["img/mm-blaze.png", "img/model-blaze.png"],
   tag: "Limitada"
  },
  {
   id: "s4",
      name: "W3 Belle Époque",
      catLine: "Óculos de Sol · MM & W3 Collection",
      cat: "sol",
      desc: "Linhas sinuosas de acetato marfim, lentes gradientes douradas e pérola incrustada no braço.",
      price: 1980.00,
      img: ["img/modelo-mm-fem.png", "img/model-monarch.png"]
  },
  {
   id: "s5",
      name: "W3 Capri Onda",
      catLine: "Óculos de Sol · MM & W3 Collection",
      cat: "sol",
      desc: "Moldura em meia-lua com ponte baixa, lentes fumê italianas e acabamento de verniz profundo.",
      price: 1350.00,
      img: ["img/mm-luxury.png", "img/mm-titanium.png"]
  },
  {
   id: "s6",
      name: "W3 Nerano Vintage",
      catLine: "Óculos de Sol · MM & W3 Collection",
      cat: "sol",
      desc: "A silhueta que atravessou gerações: acetato carey envelhecido e charneiras de titânio.",
      price: 997.00,
      img: ["img/mm-heritage-tortoise.png", "img/eyewear-mm-tortoise.png"]
    },
    {
      id: "s7",
      name: "MM Sport Polo",
      catLine: "Óculos de Sol · MM Sport",
      cat: "sol",
      desc: "Retangular esportivo em preto absoluto com MM dourado na haste. Performance com estilo do clube.",
      price: 1590.00,
      img: ["img/oculos-mm-sport.png", "img/mm-sport.png", "img/mm-iconic.png"],
      tag: "Novo",
      specs: [["Armação", "Acetato preto absoluto"], ["Lentes", "Smoke · UV400"], ["Formato", "Retangular 58□16"], ["Haste", "MM dourado gravado"], ["Acompanha", "Estojo + flanela + certificado"]]
    },
    {
      id: "s8",
      name: "MM Classic Metal",
      catLine: "Óculos de Sol · MM Classic",
      cat: "sol",
      desc: "Retangular em metal dourado com hastes pretas e MM gravado. O clássico metal da maison.",
      price: 1890.00,
      img: ["img/mm-classic-metal.png"],
      tag: "Novo",
      specs: [["Armação", "Metal dourado · retangular"], ["Lentes", "Verde G-15 · UV400"], ["Formato", "Retangular 56□17"], ["Haste", "MM gravado"], ["Acompanha", "Estojo + flanela + certificado"]]
    },

  /* ---- ÓCULOS DE GRAU ---- */

  /* ---- ÓCULOS DE GRAU ---- */
  {
   id: "g1",
      name: "W3 Portofino Blush",
      catLine: "Óculos de Grau · MM & W3 Collection",
   cat: "grau",
      desc: "Em acetato Mazzucchelli® tom gray, lentes de grau e o acabamento espelhado do atelier.",
      price: 1890.00,
      img: ["img/grau-modern.png", "img/model-grau-modern.png"]
  },
  {
   id: "g2",
      name: "W3 Portofino Gray",
      catLine: "Óculos de Grau · MM & W3 Collection",
   cat: "grau",
      desc: "O mesmo desenho que nasceu em Portofino, em acetato cinza-grafite com hastes acetinadas.",
      price: 2090.90,
      img: ["img/grau-heritage.png", "img/model-grau-heritage.png"]
  },
  {
   id: "g3",
      name: "W3 Gattino Clip-on",
      catLine: "Óculos de Grau · MM & W3 Collection",
   cat: "grau",
    desc: "Meio-arame gatinho com clip-on integrado: no sol e no grau, ela nunca tira a W3.",
      price: 1470.00,
      img: ["img/grau-executive.png"]
  },
  {
   id: "g4",
      name: "W3 Savoy Classic",
      catLine: "Óculos de Grau · MM & W3 Collection",
   cat: "grau",
      desc: "Acetato italiano Mazzucchelli®, bisel espelhado a 14 camadas e charneiras de titânio.",
      price: 1890.00,
      img: ["img/grau-classic-acetate.png", "img/model-grau-acetate.png"]
  },
  {
   id: "g5",
      name: "W3 Noir Onyx",
      catLine: "Óculos de Grau · MM & W3 Collection",
   cat: "grau",
   desc: "Fio de titânio leve como uma pena, lentes anti-reflexo e ponte flutuante de design exclusivo.",
      price: 1450.00,
      img: ["img/grau-titanium.png", "img/grau-ultralight.png", "img/model-grau-titanium.png", "img/model-grau-ultralight.png"]
  },
  {
   id: "g6",
      name: "W3 Élite Acetato",
      catLine: "Óculos de Grau · MM & W3 Collection",
   cat: "grau",
   desc: "A armação que inaugurou a maison: moldura redonda em acúmulo de acetato envelhecido.",
      price: 1990.90,
      img: ["img/grau-vintage.png", "img/model-grau-vintage.png"]
  },

  /* ---- ACESSÓRIOS ---- */
  {
   id: "a4",
      name: "MzM - Cápsula EuroSummer",
   catLine: "Acessório · Cápsula",
   cat: "acessorios",
   desc: "Cápsula de edição limitada com mini óculos de bolso, corrente e flanela de viagem.",
   price: 890.00,
   img: [],
   tag: "Cápsula"
  },
  {
   id: "a6",
      name: "MzM - Carteira Couro",
   catLine: "Acessório · Couro Italiano",
   cat: "acessorios",
   desc: "Carteira em couro de bezerro com monograma MM dourado. Clássica em cada detalhe.",
   price: 590.00,
   img: ["img/mzm-carteira.png", "img/life-marina.png"],
   tag: "Novo",
   specs: [["Material", "Couro de bezerro"], ["Detalhe", "Monograma MM dourado"], ["Fecho", "Dobrável clássico"], ["Acompanha", "Embalagem de presente assinada"]]
  },
  {
   id: "a7",
      name: "MzM - Caneta Signature",
   catLine: "Acessório · Escrita",
   cat: "acessorios",
   desc: "Caneta em laca preta com detalhes em ouro. Mais que uma caneta, uma afirmação.",
   price: 490.00,
   img: ["img/mzm-caneta.png", "img/life-library.png"],
   tag: "Novo",
   specs: [["Corpo", "Laca preta + ouro"], ["Detalhe", "MM gravado"], ["Carga", "Esferográfica premium"], ["Acompanha", "Estojo + certificado"]]
  },
  {
   id: "a8",
      name: "MzM - Abotoaduras Ouro",
   catLine: "Acessório · Joalheria",
   cat: "acessorios",
   desc: "Abotoaduras em ouro com esmalte preto e monograma MM. Elegância nos detalhes.",
   price: 390.00,
   img: ["img/mzm-abotoaduras.png"],
   tag: "Novo",
   specs: [["Material", "Ouro + esmalte preto"], ["Detalhe", "Monograma MM"], ["Fecho", "Bastão giratório"], ["Acompanha", "Estojo + certificado"]]
  },
  {
   id: "a9",
      name: "MzM - Cinto Couro",
   catLine: "Acessório · Couro Italiano",
   cat: "acessorios",
   desc: "Cinto em couro de bezerro com fivela dourada e MM gravado. Refinamento em cada passo.",
   price: 450.00,
   img: ["img/mzm-cinto.png", "img/life-street.png"],
   tag: "Novo",
   specs: [["Material", "Couro de bezerro"], ["Fivela", "Dourada com MM"], ["Largura", "35 mm"], ["Acompanha", "Embalagem de presente assinada"]]
  },
  {
   id: "a10",
      name: "MzM - Pouch Transversal",
   catLine: "Acessório · Couro Italiano",
   cat: "acessorios",
   desc: "Pouch transversal em couro com monograma MM dourado. Praticidade com estilo.",
   price: 690.00,
   img: ["img/mzm-pouch.png"],
   tag: "Novo",
   specs: [["Material", "Couro de bezerro"], ["Alça", "Transversal ajustável"], ["Detalhe", "Monograma MM dourado"], ["Fecho", "Zíper duplo dourado"]]
  },

  /* ---- RELÓGIOS ---- */
  {
   id: "r1",
   name: "Moraisz Madison Grande Complication",
      catLine: "Relógio · Rolex em Parceria com Madison",
   cat: "relogios",
   desc: "Calibre de manufatura com complicações, caixa em ouro 18k e mostrador em esmalte grand feu.",
      price: 15450.00,
      img: ["img/relogio-daytona.png", "img/model-daytona.png"],
   tag: "Ouro 18k"
  },
  {
   id: "r2",
   name: "Moraisz Madison Portofino Ouro",
      catLine: "Relógio · Rolex em Parceria com Madison",
   cat: "relogios",
   desc: "Três ponteiros de ouro, fundo vitrine e pulseira de couro bordô. Edição numerada.",
      price: 12900.00,
      img: ["img/relogio-daydate.png", "img/model-daydate.png"],
   tag: "Edição numerada"
  },
  {
   id: "r3",
   name: "Moraisz Madison Marina Automatico",
      catLine: "Relógio · Patek Philippe em Parceria com Madison",
   cat: "relogios",
   desc: "Calibre automático com data, caixa de 40 mm e resistência à água de 100 m.",
      price: 8990.90,
      img: ["img/relogio-nautilus.png", "img/model-nautilus.png"]
  },
  {
   id: "r4",
   name: "Moraisz Madison Ligure Crônografo",
      catLine: "Relógio · Audemars Piguet em Parceria com Madison",
   cat: "relogios",
   desc: "Crônografo de três figuras, aço polido e mostrador soleil dourado.",
      price: 4994.80,
      img: ["img/relogio-royaloak.png", "img/model-royaloak.png"]
  },

  /* ---- BOLSAS ---- */
  {
   id: "b1",
    name: "W3 Portofino Tote",
    catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
    desc: "Couro de bezerro liso, alças douradas e heráldica W3 gravada à mão. Peça de coleção.",
   price: 6760.90,
   compareAt: 7520.00,
   img: [],
   tag: "Alta Gioia"
  },
  {
   id: "b2",
    name: "W3 Marina Bucket",
    catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
   desc: "Silhueta balde em cuoio vegetal, cordão dourado e forro em camurça natural.",
   price: 4890.00,
   img: []
  },
  {
   id: "b3",
    name: "W3 Capri Mini",
    catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
   desc: "A mini do atelier: dimensões de viagem, fecho a cavalo e filete em ouro envelhecido.",
   price: 2350.00,
   img: []
  },
  {
   id: "b4",
    name: "W3 Liguria Pochette",
    catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
   desc: "Pochette noturna em couro calandrado, alça dourada e interior assinado pelo atelier.",
   price: 580.00,
   img: []
  },
  {
   id: "b6",
    name: "W3 Torino",
    catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
    desc: "Tote estruturado em Saffiano preto, alças de mão e placa W3 Milano em ouro. Cabe tudo, com postura.",
   price: 6390.00,
   img: ["img/bolsa-w3-torino-preta.jpg"],
   tag: "Novo",
   specs: [["Material", "Couro Saffiano preto"], ["Formato", "Tote estruturado"], ["Detalhe", "Placa W3 Milano em ouro"], ["Fecho", "Zíper superior dourado"], ["Acompanha", "Dustbag + certificado"]]
  },
  {
   id: "b7",
    name: "W3 Roma",
    catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
    desc: "Bowling em nylon e couro cognac, alças de mão e tiracolo, placa W3 em metal dourado. A viajada.",
   price: 5450.00,
   img: ["img/bolsa-w3-roma-cognac.jpg"],
   tag: "Novo",
   specs: [["Material", "Nylon + couro cognac"], ["Formato", "Bowling com tiracolo"], ["Detalhe", "Placa W3 em metal dourado"], ["Fecho", "Zíper duplo"], ["Acompanha", "Dustbag + certificado"]]
  },
  {
   id: "b8",
    name: "W3 Verona",
   catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
    desc: "Tiracolo em couro sálvia, corrente dourada e monograma W3 em ouro. Cor de colecionador.",
   price: 2890.00,
   img: ["img/bolsa-w3-verona-salvia.jpg"],
   tag: "Novo",
   specs: [["Material", "Couro sálvia"], ["Alça", "Corrente dourada + tiracolo"], ["Detalhe", "Monograma W3 em ouro"], ["Fecho", "Zíper frontal + principal"], ["Acompanha", "Dustbag + certificado"]]
  },
  {
   id: "a5",
    name: "W3 Kors",
   catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
    desc: "Tiracolo em couro Saffiano verde, corrente prateada e monograma W3 dourado. Alça transversal ajustável.",
   price: 890.00,
   img: ["img/bolsa-w3-kors-verde.jpg"],
   tag: "Novo",
    specs: [["Material", "Couro Saffiano verde"], ["Alça", "Corrente + tiracolo ajustável"], ["Detalhe", "Monograma W3 dourado"], ["Fecho", "Zíper superior"], ["Acompanha", "Dustbag + certificado"]]
   },
   {
    id: "b9",
      name: "W3 Executive Briefcase",
   catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
   desc: "Pasta executiva em couro de bezerro com tag W3. Para quem lidera com discrição.",
      price: 5490.00,
      img: ["img/bolsa-briefcase.png", "img/model-briefcase.png"],
   tag: "Novo",
   specs: [["Material", "Couro de bezerro"], ["Formato", "Pasta executiva + tiracolo"], ["Detalhe", "Tag W3 em couro"], ["Fecho", "Zíper superior"], ["Acompanha", "Dustbag + certificado"]]
   },
   {
    id: "b10",
      name: "W3 Travel Duffle",
   catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
   desc: "Duffle de viagem em canvas e couro com tags W3. Novos lugares, mesmos padrões.",
      price: 4990.00,
      img: ["img/bolsa-duffle.png", "img/model-duffle.png"],
   tag: "Novo",
   specs: [["Material", "Canvas + couro"], ["Formato", "Duffle de viagem"], ["Detalhe", "Tags W3 em couro"], ["Fecho", "Zíper duplo"], ["Acompanha", "Dustbag + certificado"]]
   },
   {
    id: "b11",
      name: "W3 Shoulder Bag",
   catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
   desc: "Bolsa de ombro em couro com fecho MM dourado. Elegância em cada detalhe.",
   price: 3290.00,
   img: ["img/bolsa-shoulder.png"],
   tag: "Novo",
   specs: [["Material", "Couro de bezerro"], ["Alça", "Ombro + tiracolo"], ["Detalhe", "Fecho MM dourado"], ["Fecho", "Aba com fivela"], ["Acompanha", "Dustbag + certificado"]]
   },
   {
    id: "b12",
      name: "W3 Tote Croco",
   catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
   desc: "Tote em couro com relevo croco e tag W3. Mais que uma bolsa, uma afirmação.",
   price: 5990.00,
   img: ["img/bolsa-tote-croco.png"],
   tag: "Novo",
   specs: [["Material", "Couro relevo croco"], ["Formato", "Tote amplo"], ["Detalhe", "Tag W3 em couro"], ["Fecho", "Aberto com bolso interno"], ["Acompanha", "Dustbag + certificado"]]
   },
   {
    id: "b13",
      name: "W3 Crossbody",
   catLine: "Bolsa · MM & W3 Collection",
   cat: "bolsas",
   desc: "Transversal compacta em couro com alça gravada MM. Liberdade no essencial.",
      price: 1890.00,
      img: ["img/bolsa-crossbody.png", "img/model-pouch.png"],
   tag: "Novo",
   specs: [["Material", "Couro de bezerro"], ["Alça", "Transversal gravada MM"], ["Detalhe", "Monograma MM"], ["Fecho", "Zíper frontal + principal"], ["Acompanha", "Dustbag + certificado"]]
   }
  ];

 /* ---------------- CATEGORIAS (título/sub do filtro) ---------------- */
  var CATS = {
  todas: ["Todas as <em>Peças</em>", "Óculos de luxo e acessórios MzM · Polo Club italiano EuroSummer."],
  sol: ["Óculos de <em>Sol</em>", "MM & W3 Collection · espírito polo EuroSummer, armações numeradas."],
  grau: ["Óculos de <em>Grau</em>", "MM & W3 Collection · acetato italiano e acabamento polo club."],
  acessorios: ["<em>Acessórios MzM</em>", "Estojos, correntes e flanelas do clube."],
  relogios: ["Relógios <em>em Parceria</em>", "Moraisz Madison em parceria com Rolex, Patek Philippe e Audemars Piguet — o tempo, selado entre gigantes."],
  bolsas: ["Bolsas <em>MM & W3</em>", "MM & W3 Collection · cuoio italiano e Alta Gioia."]
  };

 var currentCat = "todas";
 var lastList = [];

 /* ---------------- DS: rating + stars + sale (port star-rating/fractions, price-format/sale) ---------------- */
 var STAR_PATH = "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.14a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";
 var ratingFor = function (p) {
  var h = 0;
  for (var k = 0; k < p.id.length; k++) h = (h * 31 + p.id.charCodeAt(k)) % 997;
  return [5, 4.75, 5, 4.5][h % 4];
 };
 var starsHTML = function (value, uid, size) {
  size = size || 12;
  var out = '<span class="ds-stars" role="img" aria-label="Avaliação ' + String(value).replace(".", ",") + ' de 5">';
  var defs = "";
  for (var i = 0; i < 5; i++) {
   var diff = value - i, fill, stroke;
   if (diff >= 1) { fill = "#c9a45c"; stroke = "#c9a45c"; }
   else if (diff <= 0) { fill = "none"; stroke = "#6f6a5e"; }
   else {
    var gid = "mms-" + uid + "-" + i, pct = Math.round(diff * 100);
    defs += '<linearGradient id="' + gid + '" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="' + pct + '%" stop-color="#c9a45c"/><stop offset="' + pct + '%" stop-color="transparent"/></linearGradient>';
    fill = "url(#" + gid + ")"; stroke = "#c9a45c";
   }
   out += '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + STAR_PATH + '"/></svg>';
  }
  if (defs) out += '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' + defs + '</defs></svg>';
  return out + "</span>";
 };
 var saleHTML = function (p) {
  if (!(p.compareAt && p.compareAt > p.price)) return "";
  var pct = Math.round((1 - p.price / p.compareAt) * 100);
  return '<span class="ds-price"><s class="ds-price__original">' + BRL(p.compareAt) + '</s>' +
   '<span class="ds-badge ds-badge--sale">−' + pct + '%</span></span>';
 };

 /* ---------------- RENDER CARD ----------------
   Placeholder sem imagem: mantém animações (hover lift, crossfade,
   slide-up das ações). Quando img[] for preenchido, as fotos voltam
   sozinhas sem mexer no HTML/CSS. */
 var hasImg = function (p) {
  return !!(p.img && p.img.length && p.img[0]);
 };
 var mediaHTML = function (p) {
  if (!hasImg(p)) {
   return '<div class="card-ph" aria-label="' + p.name + ' — foto em breve" role="img">' +
    '<span class="card-ph__shine" aria-hidden="true"></span>' +
    '<span class="card-ph__logo" aria-hidden="true">MM</span>' +
    '<span class="card-ph__txt">Foto em breve</span>' +
    '<span class="card-ph__id">' + p.id + ' · ' + p.cat + '</span>' +
   '</div>';
  }
  var second = p.img[1] || p.img[0];
  return '<img class="a" src="' + p.img[0] + '" alt="' + p.name + ' Moraisz Madison" loading="lazy">' +
  '<img class="b" src="' + second + '" alt="' + p.name + ' Moraisz Madison" loading="lazy">';
 };
 var thumbHTML = function (p) {
  if (!hasImg(p)) {
   return '<span class="thumb-ph" aria-hidden="true">MM</span>';
  }
  return '<img src="' + p.img[0] + '" alt="' + p.name + '" loading="lazy">';
 };
 var cardHTML = function (p) {
  var pix = Math.round(p.price * 0.95);
  var install = Math.ceil((pix / 5) * 100) / 100;
  var tags = p.tag ? '<span class="ds-badge ds-badge--gold">' + p.tag + '</span>' : '<span class="ds-badge ds-badge--outline">MM</span>';
  return (
   '<article class="card" data-id="' + p.id + '" data-cat="' + p.cat + '">' +
    '<div class="card-media">' +
     mediaHTML(p) +
     '<div class="card-tags">' + tags + '</div>' +
     '<div class="card-actions">' +
      '<button type="button" class="add-btn" data-add="' + p.id + '">Adicionar à Sacola</button>' +
      '<button type="button" class="wish-btn" data-wish="' + p.id + '" aria-label="Desejar">♡</button>' +
     '</div>' +
    '</div>' +
    '<div class="card-body">' +
     '<span class="card-cat">' + p.catLine + '</span>' +
     '<span class="card-name">' + p.name + '</span>' +
     '<span class="card-stars">' + starsHTML(ratingFor(p), p.id) + '&nbsp;<span style="color:var(--cream-soft);opacity:.5">Ed. Madison</span></span>' +
     '<p class="card-desc">' + p.desc + '</p>' +
     '<div class="card-price">' +
      saleHTML(p) +
      '<span class="price-from">A partir de</span>' +
      '<span class="price-pix"><strong>' + BRL(pix).replace("R$", "R$ ") + '</strong> no Pix</span>' +
      '<span class="price-install">ou 5x de <b>' + BRL(install) + '</b> sem juros</span>' +
     '</div>' +
    '</div>' +
   '</article>'
  );
 };

 var renderCustom = function (list, titleHTML, subText, activePill) {
  lastList = list; col3dIdx = 0;
  var gridHTML;
  if (!list.length) {
   gridHTML = '<p class="cart-empty" style="grid-column:1/-1">Nenhuma peça encontrada.<br>Refine a busca ou explore a coleção completa.</p>';
  } else if (activePill === "todas") {
   var groups = [["Óculos", ["sol", "grau"]], ["Bolsas", ["bolsas"]], ["Acessórios", ["acessorios"]], ["Relógios", ["relogios"]]];
   gridHTML = groups.map(function (g) {
    var items = list.filter(function (p) { return g[1].indexOf(p.cat) > -1; });
    if (!items.length) return "";
    return '<h3 class="grid-group">' + g[0] + '</h3>' + items.map(cardHTML).join("");
   }).join("");
  } else {
   gridHTML = list.map(cardHTML).join("");
  }
  $("#grid").innerHTML = gridHTML;
  $("#colecaoTitle").innerHTML = titleHTML;
  $("#colecaoSub").textContent = subText;
  $$("#filters .pill").forEach(function (b) {
   b.classList.toggle("active", b.getAttribute("data-filter") === activePill);
  });
  refreshWish();
  col3dRender();
 };

 var renderGrid = function (cat) {
  currentCat = cat || "todas";
  var list = currentCat === "todas"
   ? PRODUCTS
   : PRODUCTS.filter(function (p) { return p.cat === currentCat; });
  var meta = CATS[currentCat] || CATS.todas;
  renderCustom(list, meta[0], meta[1], currentCat);
 };

 var goToFilter = function (cat) {
  renderGrid(cat);
  var target = $("#colecao");
  window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 90, behavior: "smooth" });
 };

 $$("[data-filter]").forEach(function (b) {
  b.addEventListener("click", function () { goToFilter(b.getAttribute("data-filter")); });
 });

 document.addEventListener("click", function (e) {
  var a = e.target.closest("a[data-cat]");
  if (a && !a.closest("#filters")) {
   e.preventDefault();
   goToFilter(a.getAttribute("data-cat"));
  }
 });

 /* ---------------- ESTADO (CART + WISHLIST) ---------------- */
 var state = {
  cart: localStorage.getItem("mm_cart") ? JSON.parse(localStorage.getItem("mm_cart")) : [],
  wish: localStorage.getItem("mm_wish") ? JSON.parse(localStorage.getItem("mm_wish")) : []
 };

 var findProd = function (id) {
  var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
  return p;
 };

 var save = function () {
  localStorage.setItem("mm_cart", JSON.stringify(state.cart));
  localStorage.setItem("mm_wish", JSON.stringify(state.wish));
 };

 /* ---------------- TOAST ---------------- */
 var toastTimer;
 var toast = function (msg) {
  var el = $("#toast");
  el.innerHTML = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
 };

 /* ---------------- CART UI ---------------- */
 var refreshCart = function () {
  var count = 0;
  state.cart.forEach(function (i) { count += i.qty; });
  $("#cartCount").textContent = count;
  $("#cartSubCount").textContent = count + (count === 1 ? " item" : " itens");

  var body = $("#cartBody");
  if (!state.cart.length) {
   body.innerHTML = '<p class="cart-empty">Sua sacola está vazia.<br>Permita-se escolher algo extraordinário.</p>';
   $("#cartTotal").textContent = BRL(0);
   return;
  }
  var total = 0;
  body.innerHTML = state.cart.map(function (i) {
   var p = findProd(i.id);
   total += p.price * i.qty;
   return (
    '<div class="cart-item" data-id="' + p.id + '">' +
     thumbHTML(p) +
     '<div>' +
      '<span class="cart-item-cat">' + p.catLine + '</span>' +
      '<div class="cart-item-name">' + p.name + '</div>' +
      '<div class="cart-item-price"><strong>' + BRL(p.price) + '</strong></div>' +
      '<div class="ds-stepper">' +
       '<button type="button" class="ds-stepper__btn" data-dec="' + p.id + '" aria-label="Diminuir quantidade"' + (i.qty <= 1 ? " disabled" : "") + '>−</button>' +
       '<input class="ds-stepper__input" data-qty="' + p.id + '" value="' + i.qty + '" inputmode="numeric" autocomplete="off" aria-label="Quantidade">' +
       '<button type="button" class="ds-stepper__btn" data-inc="' + p.id + '" aria-label="Aumentar quantidade">+</button>' +
      '</div>' +
     '</div>' +
     '<div class="cart-item-side">' +
      '<span class="cart-item-line">' + BRL(p.price * i.qty) + '</span>' +
      '<button type="button" class="remove" data-remove="' + p.id + '">Remover</button>' +
     '</div>' +
    '</div>'
   );
  }).join("");
  $("#cartTotal").textContent = BRL(total);
 };

 var addCart = function (id) {
  var f = state.cart.filter(function (i) { return i.id === id; })[0];
  if (f) { f.qty++; }
  else { state.cart.push({ id: id, qty: 1 }); }
  save(); refreshCart();
  var p = findProd(id);
  toast('Adicionado à sacola: <em>' + p.name + '</em>');
 };

 var refreshWish = function () {
  $("#wishCount").textContent = state.wish.length;
  if (state.wish.length) $("#wishlistBtn").classList.add("on");
  else $("#wishlistBtn").classList.remove("on");
  $$(".wish-btn").forEach(function (b) {
   var id = b.getAttribute("data-wish");
   if (state.wish.indexOf(id) > -1) { b.classList.add("on"); b.textContent = "♥"; }
   else { b.classList.remove("on"); b.textContent = "♡"; }
  });
  var wb = $("#wishBody");
  if (wb) {
   var wc = $("#wishSubCount");
   if (wc) wc.textContent = state.wish.length + (state.wish.length === 1 ? " peça" : " peças");
   if (!state.wish.length) {
    wb.innerHTML = '<p class="cart-empty">Nenhum desejo guardado ainda.<br>Explore a coleção.</p>';
   } else {
    wb.innerHTML = state.wish.map(function (id) {
     var p = findProd(id);
     if (!p) return "";
     return (
      '<div class="cart-item" data-id="' + p.id + '">' +
       thumbHTML(p) +
       '<div>' +
        '<span class="cart-item-cat">' + p.catLine + '</span>' +
        '<div class="cart-item-name">' + p.name + '</div>' +
        '<div class="cart-item-price"><strong>' + BRL(p.price) + '</strong></div>' +
        '<button type="button" class="wish-add-btn" data-add="' + p.id + '">Adicionar à sacola</button>' +
       '</div>' +
       '<div class="cart-item-side">' +
        '<button type="button" class="remove" data-wish="' + p.id + '">Remover ♥</button>' +
       '</div>' +
      '</div>'
     );
    }).join("");
   }
  }
 };

 var toggleWish = function (id) {
  var p = findProd(id);
  var idx = state.wish.indexOf(id);
  if (idx > -1) { state.wish.splice(idx, 1); toast('<em>' + p.name + '</em> removido dos desejos'); }
  else { state.wish.push(id); toast('Guardado nos desejos: <em>' + p.name + '</em>'); }
  save(); refreshWish();
 };

 /* ---------------- QUICK VIEW (página individual da peça) ----------------
   Galeria pronta para N fotos: basta preencher
    img: ["img/modelo-frente.jpg", "img/modelo-lado.jpg", "img/modelo-detalhe.jpg"]
   Setas + miniaturas aparecem sozinhas quando houver 2+ fotos. */
 var qvId = null, qvIdx = 0, qvQty = 1;

 var SPECS_DEFAULT = {
  sol: [["Lentes", "UV400 · proteção total"], ["Armação", "Atelier MM & W3 · Itália"], ["Acompanha", "Estojo + flanela + certificado"], ["Garantia", "12 meses W3"]],
  grau: [["Armação", "Acetato italiano"], ["Lentes", "Crystal sob medida"], ["Acompanha", "Estojo + flanela + certificado"], ["Garantia", "12 meses W3"]],
  acessorios: [["Origem", "Atelier Moraisz Madison · Itália"], ["Acompanha", "Embalagem de presente assinada"], ["Garantia", "12 meses Madison"]],
  relogios: [["Caixa", "Ouro 18k · edição numerada"], ["Movimento", "Calibre de manufatura"], ["Acompanha", "Certificado numerado"], ["Garantia", "24 meses Madison"]],
  bolsas: [["Material", "Cuoio italiano legítimo"], ["Acabamento", "Feito à mão no atelier"], ["Acompanha", "Dustbag + certificado"], ["Garantia", "24 meses W3"]]
 };

 var qvImgs = function (p) {
  return (p.img && p.img.length) ? p.img : [];
 };
 var qvPhHTML = function (p) {
  return '<div class="card-ph" role="img" aria-label="' + p.name + ' — foto em breve">' +
   '<span class="card-ph__shine" aria-hidden="true"></span>' +
   '<span class="card-ph__logo" aria-hidden="true">MM</span>' +
   '<span class="card-ph__txt">Foto em breve</span>' +
   '<span class="card-ph__id">' + p.id + ' · ' + p.cat + '</span></div>';
 };

 var renderQV = function () {
  var p = findProd(qvId);
  if (!p) return;
  var imgs = qvImgs(p);
  if (qvIdx >= imgs.length) qvIdx = 0;
  $("#qvMain").innerHTML = imgs.length
   ? '<img src="' + imgs[qvIdx] + '" alt="' + p.name + ' Moraisz Madison Óptica — foto ' + (qvIdx + 1) + '">'
   : qvPhHTML(p);
  var multi = imgs.length > 1;
  $("#qvPrev").hidden = !multi;
  $("#qvNext").hidden = !multi;
  $("#qvThumbs").innerHTML = multi ? imgs.map(function (src, i) {
   return '<button type="button" data-thumb="' + i + '" class="' + (i === qvIdx ? "active" : "") + '" aria-label="Ver foto ' + (i + 1) + '">' +
    '<img src="' + src + '" alt="" loading="lazy"></button>';
  }).join("") : "";
  $("#qvCat").textContent = p.catLine;
  $("#qvName").textContent = p.name;
  $("#qvStars").innerHTML = starsHTML(ratingFor(p), p.id, 14);
  $("#qvDesc").textContent = p.desc;
  var pix = Math.round(p.price * 0.95);
  var install = Math.ceil((pix / 5) * 100) / 100;
  $("#qvPrice").innerHTML = saleHTML(p) +
   '<span class="price-pix"><strong>' + BRL(pix).replace("R$", "R$ ") + '</strong> no Pix</span>' +
   '<span class="price-install">ou 5x de <b>' + BRL(install) + '</b> sem juros · <b>' + BRL(p.price) + '</b> no crédito</span>';
  var specs = p.specs || SPECS_DEFAULT[p.cat] || SPECS_DEFAULT.sol;
  $("#qvSpecs").innerHTML = specs.map(function (s) {
   return "<li><span>" + s[0] + "</span><strong>" + s[1] + "</strong></li>";
  }).join("");
  $("#qvQty").value = qvQty;
  var w = $("#qvWish");
  var on = state.wish.indexOf(p.id) > -1;
  w.classList.toggle("on", on);
  w.textContent = on ? "♥" : "♡";
  w.setAttribute("data-wish", p.id);
  $("#qvAdd").setAttribute("data-qvadd", p.id);
 };

 var openQV = function (id) {
  if (!findProd(id)) return;
  qvId = id; qvIdx = 0; qvQty = 1;
  renderQV();
  $("#qv").classList.add("open");
  $("#qv").setAttribute("aria-hidden", "false");
  $("#qvOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
 };
 var closeQV = function () {
  qvId = null;
  $("#qv").classList.remove("open");
  $("#qv").setAttribute("aria-hidden", "true");
  $("#qvOverlay").classList.remove("open");
  if (!anyOpen()) document.body.style.overflow = "";
 };

 /* ---------------- HERO / EYE SHRINK ON SCROLL ---------------- */
 var hero = $("#hero");
 var eyeFrame = $("#eyeFrame");
 var scrollHint = $("#scrollHint");
 var heroShadow = $("#heroShadow");
 var header = $("#header");
 var ticking = false;

  var heroScroll = function () {
  var y = window.pageYOffset || document.documentElement.scrollTop;
  var heroTop = hero.offsetTop;
  var scrolled = Math.max(0, y - heroTop);
  /* capa fica 100% visível no início: zona morta de 25% + percurso mais longo */
  var range = Math.min(window.innerHeight * 1.5, 1500);
  var raw = Math.min(1, scrolled / range);
  var p = Math.max(0, (raw - 0.25) / 0.75);
  var scale = 1 - p * 0.3;
  var ease = 1 - (1 - p) * (1 - p); /* easeOut */
  var translateY = ease * (window.innerHeight - window.innerHeight * 0.4);
  var opacity = 1 - ease * 0.35;

  eyeFrame.style.transform = "scale(" + scale + ") translateY(" + translateY * 0.06 + "px)";
  eyeFrame.style.opacity = opacity;
  /* sombra de transição só entra no final, sem faixa branca no meio */
  var shadowP = Math.max(0, (p - 0.55) / 0.45);
  heroShadow.style.opacity = shadowP * 0.95;
  heroShadow.style.transform = "scale(1)";
  if (p > 0.12) scrollHint.classList.add("hide");
  else scrollHint.classList.remove("hide");

  header.classList.toggle("scrolled", window.pageYOffset > 10);
  ticking = false;
 };

 window.addEventListener("scroll", function () {
  if (!ticking) {
   ticking = true;
   window.requestAnimationFrame(heroScroll);
  }
 }, { passive: true });

 /* ---------------- HERO SCENES (estilo TikTok: 01/02/03 + deriva lenta) ---------------- */
  var SCENES = [
  { title: 'Polo Club <em>EuroSummer</em>.', sub: "Moraisz Madison · Itália como base · óculos e acessórios de luxo" },
  { title: 'Tradição, <em>disciplina</em>, estilo.', sub: "Moraisz Madison · Polo Club Italiano" },
  { title: 'Italian Heritage · <em>Modern Luxury</em>.', sub: "Est. 2025 · Moraisz Madison" }
  ];
 var SCENE_MS = 6000;
 var sceneIdx = 0, sceneTimer = null, heroInView = true;
 var reduceMotion2 = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

 var restartProgress = function () {
  var bar = $("#heroProgressBar");
  if (!bar) return;
  bar.classList.remove("run");
  void bar.offsetWidth;
  bar.classList.add("run");
 };
 var showScene = function (n) {
  sceneIdx = (n + SCENES.length) % SCENES.length;
  var s = SCENES[sceneIdx];
  var num = $("#heroSceneNum");
  if (num) num.textContent = ("0" + (sceneIdx + 1)).slice(-2);
  var apply = function () {
   $("#heroTitle").innerHTML = s.title;
   $("#heroSub").textContent = s.sub;
   restartProgress();
   if (window.gsap && !reduceMotion2) {
    gsap.fromTo(["#heroTitle", "#heroSub"], { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 });
   }
  };
  if (window.gsap && !reduceMotion2) {
   gsap.to(["#heroTitle", "#heroSub"], { opacity: 0, y: -22, duration: 0.45, ease: "power2.in", onComplete: apply });
  } else { apply(); }
 };
 var tickScene = function () {
  if (document.hidden || !heroInView) return;
  showScene(sceneIdx + 1);
 };
 if ("IntersectionObserver" in window && hero) {
  new IntersectionObserver(function (entries) {
   heroInView = entries[0].isIntersecting;
  }, { threshold: 0 }).observe(hero);
 }
  if (!reduceMotion2) {
  restartProgress();
  sceneTimer = setInterval(tickScene, SCENE_MS);
  /* deriva do hero desativada p/ a capa polo aparecer sem zoom */
  }

 /* ---------------- REVEAL ---------------- */
 var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
   if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
 }, { threshold: 0.12 });
 $$(".reveal").forEach(function (el) { io.observe(el); });

 /* ---------------- PRELOADER ---------------- */
 window.addEventListener("load", function () {
  var img = new Image();
  img.onload = img.onerror = function () {
   setTimeout(function () { $("#preloader").classList.add("done"); }, 300);
  };
  var heroImg = $("#heroBleedImg");
  if (heroImg) img.src = heroImg.src;
  else setTimeout(function () { $("#preloader").classList.add("done"); }, 300);
  setTimeout(function () { $("#preloader").classList.add("done"); }, 1200);
 });

 /* ---------------- INTRO CINEMÁTICA (GSAP; fallback CSS sem CDN) ---------------- */
 var intro = $("#intro");
 var introTl = null;
 var introDone = function () {
  if (!intro || intro.classList.contains("done")) return;
  if (introTl) { introTl.kill(); introTl = null; }
  intro.classList.add("done");
  document.body.classList.remove("intro-lock");
  if (!anyOpen()) document.body.style.overflow = "";
  try { sessionStorage.setItem("mm_intro", "1"); } catch (e) {}
 };
 var finishIntroCSS = function () {
  if (!intro || intro.classList.contains("done")) return;
  intro.classList.add("open");
  setTimeout(introDone, 800);
  try { sessionStorage.setItem("mm_intro", "1"); } catch (e) {}
 };
 if (intro) {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var seenIntro = false;
  try { seenIntro = !!sessionStorage.getItem("mm_intro"); } catch (e) {}
  document.body.classList.add("intro-lock");
  document.body.style.overflow = "hidden";
  var skipBtn = $("#introSkip");
  if (reduceMotion) {
   introDone();
  } else if (window.gsap) {
   intro.classList.add("gsap-on");
   var eyeX = window.innerWidth <= 820 ? "60% 42%" : "72% 42%";
   var ZOOM = seenIntro ? 0.6 : 1.3;
   introTl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: introDone });
   introTl
    .fromTo(".intro-half img", { scale: 1, transformOrigin: eyeX }, { scale: 1.38, duration: ZOOM }, 0)
    .fromTo(".intro-center", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.2)
    .to(".intro-center", { opacity: 0, y: -14, duration: 0.5, ease: "power2.in" }, Math.max(0.3, ZOOM - 0.15))
    .fromTo(".intro-seam", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, Math.max(0.2, ZOOM - 0.45))
    .to(".intro-half.left", { xPercent: -102, duration: 0.75, ease: "expo.inOut" }, ZOOM)
    .to(".intro-half.right", { xPercent: 102, duration: 0.75, ease: "expo.inOut" }, ZOOM)
    .to(".intro-seam, .intro-skip", { opacity: 0, duration: 0.3 }, ZOOM);
   if (skipBtn) skipBtn.addEventListener("click", function () { if (introTl) introTl.progress(1); else introDone(); });
  } else {
   var introWait = setTimeout(finishIntroCSS, seenIntro ? 600 : 1400);
   if (skipBtn) skipBtn.addEventListener("click", function () { clearTimeout(introWait); finishIntroCSS(); });
  }
 }

 /* ---------------- DRAWERS / OVERLAYS ---------------- */
 var cart = $("#cart");
 var cartOverlay = $("#cartOverlay");
 var openCart = function () { closeQV(); closeWish(); closeMenu(); closeSearch(); cart.classList.add("open"); cartOverlay.classList.add("open"); document.body.style.overflow = "hidden"; };
 var closeCart = function () { cart.classList.remove("open"); cartOverlay.classList.remove("open"); if (!anyOpen()) document.body.style.overflow = ""; };

 var wishlist = $("#wishlist");
 var wishOverlay = $("#wishOverlay");
 var openWish = function () { closeQV(); closeCart(); closeMenu(); closeSearch(); refreshWish(); wishlist.classList.add("open"); wishOverlay.classList.add("open"); document.body.style.overflow = "hidden"; };
 var closeWish = function () { wishlist.classList.remove("open"); wishOverlay.classList.remove("open"); if (!anyOpen()) document.body.style.overflow = ""; };

 $("#cartBtn").addEventListener("click", openCart);
 $("#cartClose").addEventListener("click", closeCart);
 cartOverlay.addEventListener("click", closeCart);
 $("#wishlistBtn").addEventListener("click", openWish);
 $("#wishClose").addEventListener("click", closeWish);
 wishOverlay.addEventListener("click", closeWish);

 $("#wishToBag").addEventListener("click", function () {
  if (!state.wish.length) { toast('Nenhum desejo guardado ainda — explore a coleção'); return; }
  state.wish.forEach(function (id) {
   var f = state.cart.filter(function (i) { return i.id === id; })[0];
   if (f) f.qty++;
   else state.cart.push({ id: id, qty: 1 });
  });
  save(); refreshCart();
  toast('Desejos movidos para a <em>sacola</em>');
  closeWish(); openCart();
 });

 /* ---------------- MOBILE MENU ---------------- */
 var mmenu = $("#mmenu");
 var mmenuOverlay = $("#mmenuOverlay");
 var closeMenu = function () { mmenu.classList.remove("open"); mmenuOverlay.classList.remove("open"); if (!anyOpen()) document.body.style.overflow = ""; };
 var openMenu = function () { closeQV(); closeCart(); closeWish(); closeSearch(); mmenu.classList.add("open"); mmenuOverlay.classList.add("open"); document.body.style.overflow = "hidden"; };
 $("#hamburger").addEventListener("click", openMenu);
 $("#mmenuClose").addEventListener("click", closeMenu);
 mmenuOverlay.addEventListener("click", closeMenu);
 $$("#mmenu a").forEach(function (a) { a.addEventListener("click", closeMenu); });

 /* ---------------- EVENT DELEGATION ---------------- */
 document.addEventListener("click", function (e) {
  var t = e.target;
  var add = t.closest("[data-add]");
  if (add) { addCart(add.getAttribute("data-add")); return; }
  var wish = t.closest("[data-wish]");
  if (wish) {
   var wid = wish.getAttribute("data-wish");
   toggleWish(wid);
   if (qvId === wid) renderQV();
   return;
  }
  var qvadd = t.closest("[data-qvadd]");
  if (qvadd) {
   var qid = qvadd.getAttribute("data-qvadd");
   var q = parseInt($("#qvQty").value, 10);
   if (isNaN(q) || q < 1) q = 1;
   if (q > 99) q = 99;
   var f2 = state.cart.filter(function (i) { return i.id === qid; })[0];
   if (f2) f2.qty = Math.min(99, f2.qty + q);
   else state.cart.push({ id: qid, qty: q });
   save(); refreshCart();
   toast('Adicionado à sacola: <em>' + findProd(qid).name + '</em> × ' + q);
   closeQV(); openCart();
   return;
  }
  var thumb = t.closest("[data-thumb]");
  if (thumb && qvId) {
   qvIdx = parseInt(thumb.getAttribute("data-thumb"), 10) || 0;
   renderQV();
   return;
  }
  var inc = t.closest("[data-inc]");
  if (inc) {
   var f = state.cart.filter(function (i) { return i.id === inc.getAttribute("data-inc"); })[0];
   if (f) { f.qty++; save(); refreshCart(); }
   return;
  }
  var dec = t.closest("[data-dec]");
  if (dec) {
   var g = state.cart.filter(function (i) { return i.id === dec.getAttribute("data-dec"); })[0];
   if (g) {
    g.qty--;
    if (g.qty <= 0) state.cart = state.cart.filter(function (i) { return i.id !== g.id; });
    save(); refreshCart();
   }
   return;
  }
  var rem = t.closest("[data-remove]");
  if (rem) {
   state.cart = state.cart.filter(function (i) { return i.id !== rem.getAttribute("data-remove"); });
   save(); refreshCart();
   return;
  }
  /* Clique no card (foto ou nome) abre a página individual — botões têm ação própria */
  var card = t.closest(".card");
  if (card && !t.closest("button") && !t.closest("a")) {
   openQV(card.getAttribute("data-id"));
   return;
  }
 });

 /* ---------------- QV CONTROLS ---------------- */
 $("#qvClose").addEventListener("click", closeQV);
 $("#qvOverlay").addEventListener("click", closeQV);
 $("#qvPrev").addEventListener("click", function () {
  var n = qvImgs(findProd(qvId)).length;
  if (!n) return;
  qvIdx = (qvIdx - 1 + n) % n;
  renderQV();
 });
 $("#qvNext").addEventListener("click", function () {
  var n = qvImgs(findProd(qvId)).length;
  if (!n) return;
  qvIdx = (qvIdx + 1) % n;
  renderQV();
 });
 $("#qvInc").addEventListener("click", function () {
  var v = parseInt($("#qvQty").value, 10) || 1;
  $("#qvQty").value = Math.min(99, v + 1);
 });
 $("#qvDec").addEventListener("click", function () {
  var v = parseInt($("#qvQty").value, 10) || 1;
  $("#qvQty").value = Math.max(1, v - 1);
 });

 /* ---------------- DS STEPPER: digitação direta (quantity-input/basic: clamp no blur) ---------------- */
 document.addEventListener("change", function (e) {
  var q = e.target && e.target.closest ? e.target.closest("[data-qty]") : null;
  if (!q) return;
  var id = q.getAttribute("data-qty");
  var f = state.cart.filter(function (x) { return x.id === id; })[0];
  if (!f) return;
  var v = parseInt(q.value, 10);
  if (isNaN(v) || v < 1) v = 1;
  if (v > 99) v = 99;
  f.qty = v;
  save(); refreshCart();
 });
 document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target && e.target.closest && e.target.closest("[data-qty]")) e.target.blur();
 });

 /* ---------------- CHECKOUT ---------------- */
 $("#checkoutBtn").addEventListener("click", function () {
  if (!state.cart.length) { toast('Sua sacola está <em>vazia</em>'); return; }
  var total = 0;
  state.cart.forEach(function (i) { total += findProd(i.id).price * i.qty; });
  toast('Pedido recebido · ' + BRL(total) + ' — nosso concierge entrará em contato.');
  state.cart = [];
  save(); refreshCart();
 });

 /* ---------------- NEWSLETTER ---------------- */
 $("#newsForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var email = $("#emailInput").value.trim();
  if (email) {
   toast('Bem-vindo ao círculo <em>Madison</em>. Convite a caminho.');
   this.reset();
  }
 });

 /* ---------------- BUSCA REAL ---------------- */
 var searchOverlay = $("#searchOverlay");
 var searchInput = $("#searchInput");
 var searchResults = $("#searchResults");

 var norm = function (s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
 };

 var searchProducts = function (q) {
  q = norm(q.trim());
  if (!q) return [];
  return PRODUCTS.filter(function (p) {
   var hay = norm(p.name + " " + p.desc + " " + p.catLine + " " + p.cat + " " + p.price.toFixed(2));
   return q.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
  });
 };

 var renderSearchPreview = function () {
  var q = searchInput.value;
  if (!q.trim()) {
   searchResults.innerHTML = '<p class="search-empty">Digite para buscar em ' + PRODUCTS.length + ' peças da maison.</p>';
   return [];
  }
  var list = searchProducts(q);
  if (!list.length) {
   searchResults.innerHTML = '<p class="search-empty">Nenhuma peça para “' + q.replace(/</g, "&lt;") + '”.<br>Tente “ouro”, “tote” ou “acetato”.</p>';
   return list;
  }
  searchResults.innerHTML =
   '<p class="search-count">' + list.length + (list.length === 1 ? " peça encontrada" : " peças encontradas") + '</p>' +
   list.slice(0, 6).map(function (p) {
    return (
     '<div class="search-hit">' +
      thumbHTML(p) +
      '<div><span class="search-hit-name">' + p.name + '</span>' +
      '<span class="search-hit-cat">' + p.catLine + '</span>' +
      '<button type="button" class="search-hit-add" data-add="' + p.id + '">Adicionar · ' + BRL(p.price) + '</button></div>' +
      '<button type="button" class="wish-btn' + (state.wish.indexOf(p.id) > -1 ? " on" : "") + '" data-wish="' + p.id + '" aria-label="Desejar">' + (state.wish.indexOf(p.id) > -1 ? "♥" : "♡") + '</button>' +
     '</div>'
    );
   }).join("");
  return list;
 };

 var openSearch = function () {
  closeQV(); closeCart(); closeWish(); closeMenu();
  searchOverlay.classList.add("open");
  searchOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  renderSearchPreview();
  setTimeout(function () { searchInput.focus(); }, 60);
 };
 var closeSearch = function () {
  searchOverlay.classList.remove("open");
  searchOverlay.setAttribute("aria-hidden", "true");
  if (!anyOpen()) document.body.style.overflow = "";
 };
 var anyOpen = function () {
  var qv = $("#qv");
  return cart.classList.contains("open") || wishlist.classList.contains("open") ||
   mmenu.classList.contains("open") || searchOverlay.classList.contains("open") ||
   (qv && qv.classList.contains("open")) ||
   (intro && !intro.classList.contains("done"));
 };

 $("#searchToggle").addEventListener("click", openSearch);
 $("#searchClose").addEventListener("click", closeSearch);
 searchOverlay.addEventListener("click", function (e) { if (e.target === searchOverlay) closeSearch(); });
 searchInput.addEventListener("input", renderSearchPreview);
 searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
   e.preventDefault();
   var q = searchInput.value.trim();
   if (!q) return;
   var list = searchProducts(q);
   currentCat = "__search__";
  renderCustom(list, 'Busca por “<em>' + q.replace(/</g, "&lt;") + '</em>”',
  list.length + (list.length === 1 ? " peça encontrada" : " peças encontradas") + " na maison Moraisz Madison.", "__none__");
   closeSearch();
   var target = $("#colecao");
   window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 90, behavior: "smooth" });
  }
 });

 document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") { closeQV(); closeSearch(); closeCart(); closeWish(); closeMenu(); }
  if (qvId && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
   var n = qvImgs(findProd(qvId)).length;
   if (n > 1) {
    qvIdx = e.key === "ArrowRight" ? (qvIdx + 1) % n : (qvIdx - 1 + n) % n;
    renderQV();
   }
  }
 });

 /* ---------------- COLEÇÃO 3D (coverflow só óculos e bolsas) ---------------- */
 var colView = "grade", col3dIdx = 0;
 var CATS3D = ["sol", "grau", "bolsas"];
 var colStage = $("#col3dStage"), colTrack = $("#col3dTrack"),
   colDots = $("#col3dDots"), colCount = $("#col3dCount"), colEmpty = $("#col3dEmpty");

 var col3dList = function () {
  return lastList.filter(function (p) { return CATS3D.indexOf(p.cat) > -1; });
 };
 var col3dRender = function () {
  if (!colStage || colView !== "3d") return;
  var list = col3dList(), n = list.length, has = n > 0;
  if (col3dIdx >= n) col3dIdx = 0;
  colEmpty.hidden = has;
  colTrack.style.display = has ? "" : "none";
  colDots.hidden = !has; colCount.hidden = !has;
  $("#col3dPrev").hidden = !has; $("#col3dNext").hidden = !has;
  if (!has) return;
  colTrack.innerHTML = list.map(function (p, i) {
   var pix = Math.round(p.price * 0.95);
   return '<figure class="gal3d-card" data-i="' + i + '" data-id="' + p.id + '">' +
    (hasImg(p)
     ? '<img src="' + p.img[0] + '" alt="' + p.name + '" loading="lazy" draggable="false">'
     : mediaHTML(p)) +
    '<figcaption><span>' + p.catLine + '</span><strong>' + p.name + '</strong>' +
    '<span class="g3price">' + BRL(pix).replace("R$", "R$ ") + ' no Pix</span></figcaption></figure>';
  }).join("");
  colDots.innerHTML = list.map(function (_, i) {
   return '<button type="button" data-dot="' + i + '" aria-label="Ver peça ' + (i + 1) + '"></button>';
  }).join("");
  var cards = $$(".gal3d-card", colTrack);
  cards.forEach(function (card) {
   var i = parseInt(card.getAttribute("data-i"), 10);
   var off = i - col3dIdx;
   if (off > n / 2) off -= n;
   if (off < -n / 2) off += n;
   var a = Math.abs(off);
   var x = off * Math.min(230, window.innerWidth * 0.32);
   card.style.transform = "translateX(" + x + "px) translateZ(" + (-a * 190) + "px) rotateY(" + (off * -38) + "deg) scale(" + (off === 0 ? 1.06 : Math.max(0.72, 1 - a * 0.1)) + ")";
   card.style.zIndex = 100 - a;
   card.style.opacity = a > 3 ? 0 : 1 - a * 0.18;
   card.style.filter = off === 0 ? "none" : "brightness(.72) saturate(.9)";
   card.style.pointerEvents = a > 3 ? "none" : "auto";
   card.classList.toggle("active", off === 0);
  });
  $$("button", colDots).forEach(function (d, i) { d.classList.toggle("on", i === col3dIdx); });
  colCount.textContent = ("0" + (col3dIdx + 1)).slice(-2) + " / " + ("0" + n).slice(-2) + " · " + list[col3dIdx].name;
 };
 var col3dGo = function (n) {
  var len = col3dList().length;
  if (!len) return;
  col3dIdx = ((n % len) + len) % len;
  col3dRender();
 };
 var setView = function (v) {
  colView = v;
  $$(".viewtoggle button").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-view") === v); });
  $("#grid").hidden = (v !== "grade");
  colStage.hidden = (v !== "3d");
  if (v === "3d") { col3dIdx = 0; col3dRender(); }
 };
 $$(".viewtoggle button").forEach(function (b) {
  b.addEventListener("click", function () { setView(b.getAttribute("data-view")); });
 });
 $("#col3dPrev").addEventListener("click", function () { col3dGo(col3dIdx - 1); });
 $("#col3dNext").addEventListener("click", function () { col3dGo(col3dIdx + 1); });
 colDots.addEventListener("click", function (e) {
  var d = e.target.closest("[data-dot]");
  if (d) col3dGo(parseInt(d.getAttribute("data-dot"), 10));
 });
 $("#col3dTodas").addEventListener("click", function () { goToFilter("todas"); });
 var colDragX = null, colMoved = false;
 colStage.addEventListener("pointerdown", function (e) {
  colDragX = e.clientX; colMoved = false; colStage.classList.add("grabbing");
 });
 colStage.addEventListener("pointermove", function (e) {
  if (colDragX === null) return;
  if (e.pointerType === "mouse" && e.buttons === 0) { colDragX = null; return; }
  var dx = e.clientX - colDragX;
  if (Math.abs(dx) > 60) { colMoved = true; col3dGo(col3dIdx + (dx < 0 ? 1 : -1)); colDragX = e.clientX; }
 });
 ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
  colStage.addEventListener(ev, function () {
   colDragX = null; colStage.classList.remove("grabbing");
   if (colMoved) setTimeout(function () { colMoved = false; }, 350);
  });
 });
 colTrack.addEventListener("click", function (e) {
  if (colMoved) return;
  var card = e.target.closest(".gal3d-card");
  if (!card) return;
  if (!card.classList.contains("active")) { col3dGo(parseInt(card.getAttribute("data-i"), 10)); return; }
  openQV(card.getAttribute("data-id"));
 });
 window.addEventListener("resize", col3dRender);

  /* ---------------- TEMA CLARO/ESCURO (botão no menu) ---------------- */
  var applyTheme = function (t) {
  document.body.setAttribute("data-theme", t);
  try { localStorage.setItem("mm_theme", t); } catch (e) {}
  var btn = $("#themeToggle");
  if (btn) btn.textContent = t === "light" ? "◐" : "●";
  };
  try {
  var savedTheme = localStorage.getItem("mm_theme") || "light";
  applyTheme(savedTheme === "dark" ? "dark" : "light");
  } catch (e) { applyTheme("light"); }
  var themeBtn = $("#themeToggle");
  if (themeBtn) {
  themeBtn.addEventListener("click", function () {
  var cur = document.body.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(cur === "light" ? "dark" : "light");
  toast(cur === "light" ? "Tema <em>escuro</em> ativado." : "Tema <em>claro polo</em> ativado.");
  });
  }

  /* ---------------- INIT ---------------- */
 renderGrid("todas");
 refreshCart();
 refreshWish();
 heroScroll();

})();