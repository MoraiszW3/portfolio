/* Bamboo Shop — redesign preview (dados reais do site atual) */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var BRL = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };
  var ZAP = "https://api.whatsapp.com/send?phone=554733326625&text=";

  var PRODUCTS = [
    { id: "p1", cat: "tenis", name: "Tênis Vans Sk8 Low Black True White", img: "img/vans-sk8-low.jpg", price: 314.90, was: 379.90 },
    { id: "p2", cat: "tenis", name: "Tênis Hocks Bold Unissex Sombras", img: "img/hocks-bold-sombras.jpg", price: 499.90 },
    { id: "p3", cat: "skate", name: "Skate Montado Iniciante Hondar Game", img: "img/hondar-game.jpg", price: 399.90 },
    { id: "p4", cat: "bones", name: "Relógio Casio Vintage LA670 Dourado", img: "img/casio-la670.jpg", price: 399.90 },
    { id: "p5", cat: "tenis", name: "Tênis Vans Authentic Black White", img: "img/vans-authentic.jpg", price: 399.90 },
    { id: "p6", cat: "tenis", name: "Tênis Hocks Skate Pop Lite Petitpoa", img: "img/hocks-pop-lite.jpg", price: 389.90 },
    { id: "p7", cat: "skate", name: "Skate Montado Hondar Night Crew", img: "img/hondar-nightcrew.jpg", price: 399.90 },
    { id: "p8", cat: "skate", name: "Skate Montado Hondar Jungle Preto", img: "img/hondar-jungle.jpg", price: 399.90 },
    { id: "p9", cat: "tenis", name: "Tênis Qix Chorão Lado B Preto", img: "img/qix-chorao.jpg", price: 499.90, chorao: true },
    { id: "p10", cat: "tenis", name: "Tênis Qix Ninety Three Preto e Chumbo", img: "img/qix-ninety.jpg", price: 279.90 },
    { id: "p11", cat: "tenis", name: "Tênis Vans Knu Skool Black White", img: "img/vans-knu.jpg", price: 499.90 },
    { id: "p12", cat: "bones", name: "Boné High Company Outdoor Black", img: "img/bone-high.jpg", price: 99.90, was: 199.90 }
  ];
  var CATNAME = { tenis: "Tênis", skate: "Skate", bones: "Bonés & Acessórios" };

  var cardHTML = function (p) {
    var pix = Math.round(p.price * 0.95 * 100) / 100;
    return '<article class="card" data-id="' + p.id + '">' +
      '<div class="card-media"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>' +
      '<div class="card-body"><span class="card-cat">' + CATNAME[p.cat] + '</span>' +
      '<span class="card-name">' + p.name + '</span>' +
      '<div class="card-price">' + (p.was ? "<s>" + BRL(p.was) + "</s>" : "") + BRL(p.price) + "</div>" +
      '<span class="card-pix">' + BRL(pix) + " no Pix</span></div></article>";
  };
  var renderGrid = function (cat) {
    var list = cat === "todas" ? PRODUCTS : PRODUCTS.filter(function (p) { return p.cat === cat; });
    $("#grid").innerHTML = list.map(cardHTML).join("");
    $$("#filters .pill").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-filter") === cat);
    });
  };
  $$("#filters .pill").forEach(function (b) {
    b.addEventListener("click", function () { renderGrid(b.getAttribute("data-filter")); });
  });
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-cat]");
    if (a) {
      e.preventDefault();
      renderGrid(a.getAttribute("data-cat"));
      document.querySelector("#produtos").scrollIntoView({ behavior: "smooth" });
    }
  });

  /* Chorão Eterno */
  $("#choraoGrid").innerHTML = PRODUCTS.filter(function (p) { return p.chorao; }).map(cardHTML).join("") +
    '<article class="card" data-id="p10"><div class="card-media"><img src="img/qix-ninety.jpg" alt="Tênis Qix Ninety Three" loading="lazy"></div>' +
    '<div class="card-body"><span class="card-cat">Tributo</span><span class="card-name">Tênis Qix Ninety Three Preto e Chumbo</span>' +
    '<div class="card-price">' + BRL(279.90) + '</div><span class="card-pix">' + BRL(265.90) + " no Pix</span></div></article>";

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
    var rm = e.target.closest("[data-rm]");
    if (rm) { cart.splice(parseInt(rm.getAttribute("data-rm"), 10), 1); refreshCart(); return; }
    var card = e.target.closest(".card");
    if (card && !e.target.closest("button")) openQV(card.getAttribute("data-id"));
  });

  /* quick view */
  var qvId = null;
  var openQV = function (id) {
    var p = findP(id); if (!p) return; qvId = id;
    $("#qvImg").src = p.img; $("#qvImg").alt = p.name;
    $("#qvCat").textContent = CATNAME[p.cat];
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

  /* drawers + menu */
  var openCart = function () { $("#cart").classList.add("open"); $("#cartOverlay").classList.add("open"); };
  var closeCart = function () { $("#cart").classList.remove("open"); $("#cartOverlay").classList.remove("open"); };
  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#cartOverlay").addEventListener("click", closeCart);
  $("#hamburger").addEventListener("click", function () { $("#nav").classList.toggle("open"); });
  $$("#nav a").forEach(function (a) { a.addEventListener("click", function () { $("#nav").classList.remove("open"); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeQV(); closeCart(); } });

  /* MONTE SEU SKATE (valores ilustrativos) */
  var PARTS = {
    shape: [["Shape 8.0", 199], ["Shape 8.25", 219], ["Shape 8.5", 239]],
    truck: [["Truck 139mm", 249], ["Truck 149mm", 269]],
    roda: [["Rodas 54mm + Reds", 288], ["Rodas 52mm + ABEC 7", 249]]
  };
  var build = { shape: 0, truck: 0, roda: 0 };
  var renderBuild = function () {
    ["shape", "truck", "roda"].forEach(function (k) {
      $("#opt" + k[0].toUpperCase() + k.slice(1)).innerHTML = PARTS[k].map(function (o, i) {
        return '<button class="opt' + (build[k] === i ? " on" : "") + '" data-k="' + k + '" data-i="' + i + '">' + o[0] + "<small>" + BRL(o[1]) + "</small></button>";
      }).join("");
    });
    var total = 0, lines = [];
    ["shape", "truck", "roda"].forEach(function (k) {
      var o = PARTS[k][build[k]]; total += o[1];
      lines.push("<li><span>" + o[0] + "</span><strong>" + BRL(o[1]) + "</strong></li>");
    });
    lines.push("<li><span>Lixa + montagem</span><strong>inclusos</strong></li>");
    $("#buildList").innerHTML = lines.join("");
    $("#buildTotal").textContent = BRL(total);
    $("#buildZap").href = ZAP + encodeURIComponent("Salve! Meu setup: Shape " + PARTS.shape[build.shape][0] + ", " + PARTS.truck[build.truck][0] + ", " + PARTS.roda[build.roda][0] + " = " + BRL(total));
  };
  document.addEventListener("click", function (e) {
    var o = e.target.closest(".opt");
    if (o) { build[o.getAttribute("data-k")] = parseInt(o.getAttribute("data-i"), 10); renderBuild(); }
  });

  /* reveal */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(function (el) { io.observe(el); });

  renderGrid("todas");
  renderBuild();
  refreshCart();
})();
