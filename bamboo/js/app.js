/* Bamboo Shop — fiel ao Figma "BAMBOO - CLONE + REDESING" (preços reais) */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var BRL = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };
  var ZAP = "https://api.whatsapp.com/send?phone=554733326625&text=";

  var PRODUCTS = [
    { id: "p1", cat: "tenis", name: "Tênis Vans Sk8 Low Black True White", img: "img/vans-sk8-low.jpg", price: 314.90, was: 379.90, tags: ["novidades"] },
    { id: "p2", cat: "tenis", name: "Tênis Hocks Bold Unissex Sombras", img: "img/hocks-bold-sombras.jpg", price: 499.90, tags: ["novidades"] },
    { id: "p3", cat: "skate", name: "Skate Montado Iniciante Hondar Game", img: "img/hondar-game.jpg", price: 399.90, tags: ["novidades", "skate"] },
    { id: "p4", cat: "bones", name: "Relógio Casio Vintage LA670 Dourado", img: "img/casio-la670.jpg", price: 399.90, tags: [] },
    { id: "p5", cat: "tenis", name: "Tênis Vans Authentic Black White", img: "img/vans-authentic.jpg", price: 399.90, tags: ["novidades"] },
    { id: "p6", cat: "tenis", name: "Tênis Hocks Skate Pop Lite Petitpoa", img: "img/hocks-pop-lite.jpg", price: 389.90, tags: [] },
    { id: "p7", cat: "skate", name: "Skate Montado Hondar Night Crew", img: "img/fig-sk1.jpg", price: 399.90, tags: ["skate"] },
    { id: "p8", cat: "skate", name: "Skate Montado Hondar Jungle Preto", img: "img/fig-sk2.jpg", price: 399.90, tags: ["skate"] },
    { id: "p9", cat: "tenis", name: "Tênis Qix Chorão Lado B Preto", img: "img/qix-chorao.jpg", price: 499.90, tags: ["chorao"] },
    { id: "p10", cat: "tenis", name: "Tênis Qix Ninety Three Preto e Chumbo", img: "img/qix-ninety.jpg", price: 279.90, tags: ["novidades"] },
    { id: "p11", cat: "tenis", name: "Tênis Vans Knu Skool Black White", img: "img/vans-knu.jpg", price: 499.90, tags: [] },
    { id: "p12", cat: "bones", name: "Boné High Company Outdoor Black", img: "img/fig-out3.jpg", price: 99.90, was: 199.90, tags: ["outlet"] },
    { id: "p13", cat: "tenis", name: "Tênis Vans Old Skool Infantil Rosa", img: "img/fig-out1.jpg", price: 239.90, was: 299.90, tags: ["outlet"] },
    { id: "p14", cat: "tenis", name: "Tênis Hocks Flat Core Cascalho", img: "img/fig-out2.jpg", price: 299.90, tags: ["outlet"] },
    { id: "p15", cat: "skate", name: "Shape Element Bob Ross 8.65", img: "img/fig-out4.jpg", price: 379.90, was: 429.90, tags: ["outlet", "skate"] }
  ];
  var CATNAME = { tenis: "Tênis", skate: "Skate", bones: "Bonés & Acessórios", vestuario: "Vestuário" };

  var cardHTML = function (p) {
    var pix = Math.round(p.price * 0.95 * 100) / 100;
    return '<article class="card" data-id="' + p.id + '">' +
      '<div class="card-media"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>' +
      '<div class="card-body"><span class="card-cat">' + CATNAME[p.cat] + '</span>' +
      '<span class="card-name">' + p.name + '</span>' +
      '<div class="card-price">' + (p.was ? "<s>" + BRL(p.was) + "</s>" : "") + BRL(p.price) + "</div>" +
      '<span class="card-pix">' + BRL(pix) + " no Pix</span></div></article>";
  };
  var byTag = function (t) { return PRODUCTS.filter(function (p) { return p.tags.indexOf(t) > -1; }); };
  var byCat = function (c) { return PRODUCTS.filter(function (p) { return p.cat === c; }); };

  var renderAll = function (q) {
    var show = function (list) {
      if (!q) return list.map(cardHTML).join("");
      q = q.toLowerCase();
      var f = list.filter(function (p) { return (p.name + " " + p.cat).toLowerCase().indexOf(q) > -1; });
      return f.length ? f.map(cardHTML).join("") : '<p class="mut" style="grid-column:1/-1">Nada por aqui. Chama no WhatsApp que a gente acha.</p>';
    };
    $("#grid").innerHTML = show(byTag("novidades"));
    $("#gridSkate").innerHTML = show(byCat("skate"));
    $("#gridOutlet").innerHTML = show(byTag("outlet"));
    $("#choraoGrid").innerHTML = show(byTag("chorao"));
  };
  $("#tiles").innerHTML = [
    ["Tênis", "Vans · Hocks · Qix", "tenis", "img/fig-ct1.jpg"],
    ["Skate", "Shapes · Trucks", "skate", "img/fig-ct2.jpg"],
    ["Montados", "Prontos p/ andar", "skate", "img/fig-ct3.jpg"],
    ["Peças", "Trucks · Rodas", "skate", "img/fig-ct4.jpg"],
    ["Bonés", "New Era · High", "bones", "img/fig-ct5.jpg"],
    ["Acessórios", "Relógios · Mochilas", "bones", "img/fig-ct6.jpg"]
  ].map(function (t) {
    var href = t[2].charAt(0) === "#" ? t[2] : "#produtos";
    var extra = t[2].charAt(0) === "#" ? ' data-goto="builder"' : ' data-cat="' + t[2] + '"';
    return '<a class="tile reveal" href="' + href + '"' + extra + '><img src="' + t[3] + '" alt="' + t[0] + '" loading="lazy"><span>' + t[0] + "</span><small>" + t[1] + "</small></a>";
  }).join("");
  $("#brands").innerHTML = ["Hocks", "Nike SB", "Thrasher", "Santa Cruz", "Element", "Independent", "Qix", "Öus", "Hondar", "Grizzly", "Flip", "Volcom", "Diamond", "New Era"].map(function (b, i) {
    var n = ("0" + (i + 1)).slice(-2);
    return '<img class="brandlogo" src="img/fig-br' + n + '.png" alt="' + b + '" loading="lazy">';
  }).join("");

  /* busca + âncoras com filtro */
  var goCat = function (cat) {
    if (cat === "outlet") { document.querySelector("#outlet").scrollIntoView({ behavior: "smooth" }); return; }
    if (cat === "vestuario") { toast("Vestuário entra na próxima leva — chama no WhatsApp"); return; }
    renderAll("");
    $("#searchInput").value = cat === "todas" ? "" : "";
    document.querySelector("#produtos").scrollIntoView({ behavior: "smooth" });
    if (cat !== "todas") {
      var map = { tenis: "Tênis", skate: "Skate", bones: "Bonés & Acessórios" };
      toast("Mostrando: " + (map[cat] || cat));
    }
  };
  document.addEventListener("click", function (e) {
    var q = e.target.closest("a[data-qv]");
    if (q) { e.preventDefault(); openQV(q.getAttribute("data-qv")); return; }
    var a = e.target.closest("a[data-cat]");
    if (a) { e.preventDefault(); goCat(a.getAttribute("data-cat")); $("#nav").classList.remove("open"); return; }
  });
  $("#verTudo").addEventListener("click", function (e) { e.preventDefault(); goCat("todas"); });
  $("#searchInput").addEventListener("input", function () {
    renderAll(this.value.trim());
    if (this.value.trim()) document.querySelector("#produtos").scrollIntoView();
  });

  /* sacola */
  var cart = [];
  var findP = function (id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; };
  var refreshCart = function () {
    $("#cartCount").textContent = cart.length;
    if (!cart.length) {
      $("#cartBody").innerHTML = '<p class="cart-empty">Sacola vazia.<br>Bora andar?</p>';
      $("#cartTotal").textContent = BRL(0);
    } else {
      var total = 0;
      $("#cartBody").innerHTML = cart.map(function (id, i) {
        var p = findP(id); total += p.price;
        return '<div class="cart-item"><img src="' + p.img + '" alt=""><div><strong>' + p.name + "</strong><span>" + BRL(p.price) + '</span></div><button data-rm="' + i + '">tirar</button></div>';
      }).join("");
      $("#cartTotal").textContent = BRL(total);
    }
    $("#cartZap").href = ZAP + encodeURIComponent("Salve, Bamboo! Quero fechar: " + cart.map(function (id) { return findP(id).name; }).join(" | "));
  };
  document.addEventListener("click", function (e) {
    var rm = e.target.closest("[data-remove],[data-rm]");
    if (rm) { cart.splice(parseInt(rm.getAttribute("data-rm") || rm.getAttribute("data-remove"), 10), 1); refreshCart(); return; }
    var card = e.target.closest(".card");
    if (card && !e.target.closest("button")) openQV(card.getAttribute("data-id"));
  });

  /* quick view */
  var qvId = null;
  var openQV = function (id) {
    var p = findP(id); if (!p) return; qvId = id;
    $("#qvImg").src = p.img; $("#qvImg").alt = p.name;
    $("#qvCat").textContent = CATNAME[p.cat] || p.cat;
    $("#qvName").textContent = p.name;
    $("#qvPrice").innerHTML = '<div class="card-price">' + BRL(p.price) + '</div><span class="card-pix">' + BRL(Math.round(p.price * 0.95 * 100) / 100) + " no Pix · 6x sem juros</span>";
    $("#qvZap").href = ZAP + encodeURIComponent("Salve! Quero esse: " + p.name + " (" + BRL(p.price) + ")");
    $("#qv").classList.add("open"); $("#qvOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
  };
  var closeQV = function () {
    $("#qv").classList.remove("open"); $("#qvOverlay").classList.remove("open");
    document.body.style.overflow = "";
  };
  $("#qvClose").addEventListener("click", closeQV);
  $("#qvOverlay").addEventListener("click", closeQV);
  $("#qvAdd").addEventListener("click", function () {
    if (qvId) { cart.push(qvId); refreshCart(); closeQV(); openCart(); }
  });

  var openCart = function () { $("#cart").classList.add("open"); $("#cartOverlay").classList.add("open"); };
  var closeCart = function () { $("#cart").classList.remove("open"); $("#cartOverlay").classList.remove("open"); };
  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#cartOverlay").addEventListener("click", closeCart);
  $("#hamburger").addEventListener("click", function () { $("#nav").classList.toggle("open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeQV(); closeCart(); } });

  /* toast + newsletter */
  var toastTimer;
  var toast = function (msg) {
    var el = $("#toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  };
  $("#newsForm").addEventListener("submit", function (e) {
    e.preventDefault(); toast("Inscrito! Novidades a caminho."); this.reset();
  });

  /* reveal */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(function (el) { io.observe(el); });

  renderAll("");
  refreshCart();
})();
