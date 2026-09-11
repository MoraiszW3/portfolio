/* ============================================================
   W3 OPTICA — Scripts
   ============================================================ */

(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------- FORMATADOR ---------------- */
  var BRL = function (v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  /* ---------------- PRODUTOS ---------------- */
  var PRODUCTS = [
    /* ---- ÓCULOS DE SOL ---- */
    {
      id: "s1",
      name: "W3 Ophidia Gold",
      catLine: "Óculos de Sol · Ouro 18k",
      cat: "sol",
      desc: "Armação banhada a ouro 18k, ponte sob medida e lentes esmeralda-lapidadas à mão. Edição numerada.",
      price: 2490.90,
      img: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"],
      tag: "Edição numerada"
    },
    {
      id: "s2",
      name: "W3 Riviera Aviador",
      catLine: "Óculos de Sol · Aviador",
      cat: "sol",
      desc: "Silhueta aviador em lâmina de ouro, lentes smoke esmeralda e alças de cavalete maciço.",
      price: 2150.00,
      img: ["https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80"]
    },
    {
      id: "s3",
      name: "W3 Milano Croco",
      catLine: "Óculos de Sol · Ed. Limitada",
      cat: "sol",
      desc: "Relevo de crocodilo cinzelado à mão, lentes Zeiss® Crystal e estuque em madeira natural.",
      price: 2290.90,
      img: ["https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80"],
      tag: "Limitada"
    },
    {
      id: "s4",
      name: "W3 Belle Époque",
      catLine: "Óculos de Sol · Feminino",
      cat: "sol",
      desc: "Linhas sinuosas de acetato marfim, lentes gradientes douradas e pérola incrustada no braço.",
      price: 1980.00,
      img: ["https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1562583489-bf23ec64651d?auto=format&fit=crop&w=900&q=80"]
    },
    {
      id: "s5",
      name: "W3 Capri Onda",
      catLine: "Óculos de Sol · Hijama",
      cat: "sol",
      desc: "Moldura em meia-lua com ponte baixa, lentes fumê italianas e acabamento de verniz profundo.",
      price: 1350.00,
      img: ["https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=900&q=80"]
    },
    {
      id: "s6",
      name: "W3 Nerano Vintage",
      catLine: "Óculos de Sol · Clássico",
      cat: "sol",
      desc: "A silhueta que atravessou gerações: acetato carey envelhecido e charneiras de titânio.",
      price: 997.00,
      img: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=80"]
    },

    /* ---- ÓCULOS DE GRAU ---- */
    {
      id: "g1",
      name: "W3 Portofino Blush",
      catLine: "Óculos de Grau · Acetato Gray",
      cat: "grau",
      desc: "Em acetato Mazzucchelli® tom gray, lentes de grau e o acabamento espelhado do atelier.",
      price: 1890.00,
      img: ["https://static.wixstatic.com/media/3d0eb3_bbb0bb1f87e94687a5c00aef7cd2c87f~mv2.png/v1/fit/w_800,h_800,q_90/file.png",
            "https://static.wixstatic.com/media/3d0eb3_6e9dae32b5a84311bdb9d099164bb11b~mv2.png/v1/fit/w_800,h_800,q_90/file.png"]
    },
    {
      id: "g2",
      name: "W3 Portofino Gray",
      catLine: "Óculos de Grau · Premium",
      cat: "grau",
      desc: "O mesmo desenho que nasceu em Portofino, em acetato cinza-grafite com hastes acetinadas.",
      price: 2090.90,
      img: ["https://static.wixstatic.com/media/3d0eb3_5b1717f397ae4b65b5315d474d46c109~mv2.png/v1/fit/w_800,h_800,q_90/file.png",
            "https://static.wixstatic.com/media/3d0eb3_cd251ab2bfc24b4dba14910f90eb34ee~mv2.png/v1/fit/w_800,h_800,q_90/file.png"]
    },
    {
      id: "g3",
      name: "W3 Gattino Clip-on",
      catLine: "Óculos de Grau · Gatinho",
      cat: "grau",
      desc: "Meio-arame gatinho com clip-on integrado: no sol e no grau, ela nunca tira a W3.",
      price: 1470.00,
      img: ["https://images.tcdn.com.br/img/img_prod/602343/armao_de_culos_de_grau_clipon_2_em_1_feminino_gati_1_20260831171828_204f1dea191e.jpeg",
            "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80"]
    },
    {
      id: "g4",
      name: "W3 Savoy Classic",
      catLine: "Óculos de Grau · Acetato",
      cat: "grau",
      desc: "Acetato italiano Mazzucchelli®, bisel espelhado a 14 camadas e charneiras de titânio.",
      price: 1890.00,
      img: ["https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80"]
    },
    {
      id: "g5",
      name: "W3 Noir Onyx",
      catLine: "Óculos de Grau · Titânio",
      cat: "grau",
      desc: "Fio de titânio leve como uma pena, lentes anti-reflexo e ponte flutuante de design exclusivo.",
      price: 1450.00,
      img: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=900&q=80"]
    },
    {
      id: "g6",
      name: "W3 Élite Acetato",
      catLine: "Óculos de Grau · Clássico",
      cat: "grau",
      desc: "A armação que inaugurou a maison: moldura redonda em acúmulo de acetato envelhecido.",
      price: 1990.90,
      img: ["https://images.unsplash.com/photo-1562583489-bf23ec64651d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"]
    },

    /* ---- ACESSÓRIOS ---- */
    {
      id: "a1",
      name: "Estojo Croco W3",
      catLine: "Acessório · Couro Italiano",
      cat: "acessorios",
      desc: "Couro de bezerro com relevo de crocodilo, interior em camurça e fecho dourado cromado.",
      price: 590.00,
      img: ["https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80"]
    },
    {
      id: "a2",
      name: "Cadeia Riviera",
      catLine: "Acessório · Corrente",
      cat: "acessorios",
      desc: "Corrente para armação em tricô de ouro, elos móveis e fecho de mola oculto.",
      price: 320.00,
      img: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"]
    },
    {
      id: "a3",
      name: "Flanela Ophidia",
      catLine: "Acessório · Limpeza",
      cat: "acessorios",
      desc: "Flanela microfibra bordada à mão com a assinatura do atelier. Caixa de chá de madeira.",
      price: 180.00,
      img: ["https://images.unsplash.com/photo-1562583489-bf23ec64651d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?auto=format&fit=crop&w=900&q=80"]
    },
    {
      id: "a4",
      name: "Cápsula Portofino",
      catLine: "Acessório · Cápsula",
      cat: "acessorios",
      desc: "Cápsula de edição limitada com mini óculos de bolso, corrente e flanela de viagem.",
      price: 890.00,
      img: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=80"],
      tag: "Cápsula"
    },

    /* ---- RELÓGIOS ---- */
    {
      id: "r1",
      name: "W3 Grande Complication",
      catLine: "Relógio · Ouro 18k",
      cat: "relogios",
      desc: "Calibre de manufatura com complicações, caixa em ouro 18k e mostrador em esmalte grand feu.",
      price: 15450.00,
      img: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1000&q=80"],
      tag: "Ouro 18k"
    },
    {
      id: "r2",
      name: "W3 Portofino Ouro",
      catLine: "Relógio · Dress",
      cat: "relogios",
      desc: "Três ponteiros de ouro, fundo vitrine e pulseira de couro bordô. Edição numerada.",
      price: 12900.00,
      img: ["https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=1000&q=80"],
      tag: "Edição numerada"
    },
    {
      id: "r3",
      name: "W3 Marina Automatico",
      catLine: "Relógio · Automático",
      cat: "relogios",
      desc: "Calibre automático com data, caixa de 40 mm e resistência à água de 100 m.",
      price: 8990.90,
      img: ["https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=80"]
    },
    {
      id: "r4",
      name: "W3 Ligure Crônografo",
      catLine: "Relógio · Crônografo",
      cat: "relogios",
      desc: "Crônografo de três figuras, aço polido e mostrador soleil dourado.",
      price: 4994.80,
      img: ["https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1000&q=80"]
    },

    /* ---- BOLSAS ---- */
    {
      id: "b1",
      name: "W3 Portofino Tote",
      catLine: "Bolsa · Alta Gioia",
      cat: "bolsas",
      desc: "Couro de bezerro liso, alças douradas e heráldica W3 gravada à mão. Peça de coleção.",
      price: 6760.90,
      img: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80"],
      tag: "Alta Gioia"
    },
    {
      id: "b2",
      name: "W3 Marina Bucket",
      catLine: "Bolsa · Cuoio Italiano",
      cat: "bolsas",
      desc: "Silhueta balde em cuoio vegetal, cordão dourado e forro em camurça natural.",
      price: 4890.00,
      img: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=80"]
    },
    {
      id: "b3",
      name: "W3 Capri Mini",
      catLine: "Bolsa · Mini",
      cat: "bolsas",
      desc: "A mini do atelier: dimensões de viagem, fecho a cavalo e filete em ouro envelhecido.",
      price: 2350.00,
      img: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1000&q=80"]
    },
    {
      id: "b4",
      name: "W3 Liguria Pochette",
      catLine: "Bolsa · Pochette",
      cat: "bolsas",
      desc: "Pochette noturna em couro calandrado, alça dourada e interior assinado pelo atelier.",
      price: 580.00,
      img: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"]
    }
  ];

  /* ---------------- CATEGORIAS (título/sub do filtro) ---------------- */
  var CATS = {
    todas: ["Todas as <em>Peças</em>", "Eyewear de alta óptica, relógios em ouro e bolsas de cuoio italiano."],
    sol: ["Óculos de <em>Sol</em>", "Lentes esmeraldas e crisólito, armações numeradas de 1 a 100."],
    grau: ["Óculos de <em>Grau</em>", "Acetato Mazzucchelli® e lentes Zeiss® Crystal."],
    acessorios: ["<em>Acessórios</em>", "Estojos, correntes e flanelas do atelier."],
    relogios: ["Relógios <em>W3</em>", "Manufatura em ouro 18k, edição numerada."],
    bolsas: ["Bolsas <em>W3</em>", "Cuoio italiano e Alta Gioia."]
  };

  var currentCat = "todas";

  /* ---------------- RENDER CARD ---------------- */
  var cardHTML = function (p) {
    var pix = Math.round(p.price * 0.95);
    var install = Math.ceil((pix / 5) * 100) / 100;
    var tags = p.tag ? '<span class="tag gold">' + p.tag + '</span>' : '<span class="tag">W3</span>';
    return (
      '<article class="card" data-id="' + p.id + '" data-cat="' + p.cat + '">' +
        '<div class="card-media">' +
          '<img class="a" src="' + p.img[0] + '" alt="' + p.name + ' W3 Optica" loading="lazy">' +
          '<img class="b" src="' + p.img[1] + '" alt="' + p.name + ' W3 Optica" loading="lazy">' +
          '<div class="card-tags">' + tags + '</div>' +
          '<div class="card-actions">' +
            '<button type="button" class="add-btn" data-add="' + p.id + '">Adicionar à Sacola</button>' +
            '<button type="button" class="wish-btn" data-wish="' + p.id + '" aria-label="Desejar">♡</button>' +
          '</div>' +
        '</div>' +
        '<div class="card-body">' +
          '<span class="card-cat">' + p.catLine + '</span>' +
          '<a href="#" class="card-name">' + p.name + '</a>' +
          '<span class="card-stars">● ● ● ● ● &nbsp;<span style="color:var(--cream-soft);opacity:.5">Ed. W3</span></span>' +
          '<p class="card-desc">' + p.desc + '</p>' +
          '<div class="card-price">' +
            '<span class="price-from">A partir de</span>' +
            '<span class="price-pix"><strong>' + BRL(pix).replace("R$", "R$ ") + '</strong> no Pix</span>' +
            '<span class="price-install">ou 5x de <b>' + BRL(install) + '</b> sem juros</span>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  };

  var renderGrid = function (cat) {
    currentCat = cat || "todas";
    var list = currentCat === "todas"
      ? PRODUCTS
      : PRODUCTS.filter(function (p) { return p.cat === currentCat; });
    $("#grid").innerHTML = list.map(cardHTML).join("");
    var meta = CATS[currentCat] || CATS.todas;
    $("#colecaoTitle").innerHTML = meta[0];
    $("#colecaoSub").textContent = meta[1];
    $$("#filters .pill").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-filter") === currentCat);
    });
    refreshWish();
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
    cart: localStorage.getItem("w3_cart") ? JSON.parse(localStorage.getItem("w3_cart")) : [],
    wish: localStorage.getItem("w3_wish") ? JSON.parse(localStorage.getItem("w3_wish")) : []
  };

  var findProd = function (id) {
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    return p;
  };

  var save = function () {
    localStorage.setItem("w3_cart", JSON.stringify(state.cart));
    localStorage.setItem("w3_wish", JSON.stringify(state.wish));
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
          '<img src="' + p.img[0] + '" alt="' + p.name + '">' +
          '<div>' +
            '<span class="cart-item-cat">' + p.catLine + '</span>' +
            '<div class="cart-item-name">' + p.name + '</div>' +
            '<div class="cart-item-price"><strong>' + BRL(p.price) + '</strong></div>' +
            '<div class="qty">' +
              '<button type="button" data-dec="' + p.id + '">−</button>' +
              '<span>' + i.qty + '</span>' +
              '<button type="button" data-inc="' + p.id + '">+</button>' +
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
  };

  var toggleWish = function (id) {
    var p = findProd(id);
    var idx = state.wish.indexOf(id);
    if (idx > -1) { state.wish.splice(idx, 1); toast('<em>' + p.name + '</em> removido dos desejos'); }
    else { state.wish.push(id); toast('Guardado nos desejos: <em>' + p.name + '</em>'); }
    save(); refreshWish();
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
    var range = Math.min(window.innerHeight * 0.9, 900);
    var p = Math.min(1, scrolled / range);
    var scale = 1 - p * 0.42;
    var ease = 1 - (1 - p) * (1 - p); /* easeOut */
    var translateY = ease * (window.innerHeight - window.innerHeight * 0.4);
    var opacity = 1 - ease * 0.55;

    eyeFrame.style.transform = "scale(" + scale + ") translateY(" + translateY * 0.06 + "px)";
    eyeFrame.style.opacity = opacity;
    heroShadow.style.opacity = ease * 1;
    heroShadow.style.transform = "scale(" + (0.82 + ease * 1.22) + ")";
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
    img.src = $("#eyeImg").src;
    setTimeout(function () { $("#preloader").classList.add("done"); }, 2500);
  });

  /* ---------------- DRAWER / OVERLAY ---------------- */
  var cart = $("#cart");
  var cartOverlay = $("#cartOverlay");
  var openCart = function () { cart.classList.add("open"); cartOverlay.classList.add("open"); document.body.style.overflow = "hidden"; };
  var closeCart = function () { cart.classList.remove("open"); cartOverlay.classList.remove("open"); document.body.style.overflow = ""; };

  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  /* ---------------- MOBILE MENU ---------------- */
  var mmenu = $("#mmenu");
  var mmenuOverlay = $("#mmenuOverlay");
  var closeMenu = function () { mmenu.classList.remove("open"); mmenuOverlay.classList.remove("open"); document.body.style.overflow = ""; };
  $("#hamburger").addEventListener("click", function () { mmenu.classList.add("open"); mmenuOverlay.classList.add("open"); document.body.style.overflow = "hidden"; });
  $("#mmenuClose").addEventListener("click", closeMenu);
  mmenuOverlay.addEventListener("click", closeMenu);

  /* ---------------- EVENT DELEGATION ---------------- */
  document.addEventListener("click", function (e) {
    var t = e.target;
    var add = t.closest("[data-add]");
    if (add) { addCart(add.getAttribute("data-add")); return; }
    var wish = t.closest("[data-wish]");
    if (wish) { toggleWish(wish.getAttribute("data-wish")); return; }
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
      toast('Bem-vindo ao círculo <em>W3</em>. Convite a caminho.');
      this.reset();
    }
  });

  /* ---------------- BOTÃO WISHLIST HEADER ---------------- */
  $("#wishlistBtn").addEventListener("click", function () {
    toast(state.wish.length
      ? 'Você guardou <em>' + state.wish.length + '</em> peça(s) nos desejos'
      : 'Nenhum desejo guardado ainda — explore a coleção');
  });

  /* ---------------- SEARCH (mock de luxo) ---------------- */
  $("#searchToggle").addEventListener("click", function () {
    toast('Digite a peça que deseja encontrar');
  });

  /* ---------------- INIT ---------------- */
  renderGrid("todas");
  refreshCart();
  refreshWish();
  heroScroll();

})();