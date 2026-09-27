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

  /* MONTE SEU SKATE — preços 100% reais do lojabamboo.com.br.
     Trucks, rolamentos e lixas estão sem produto no site: fecham no WhatsApp. */
  var GROUPS = [
    { k: "shape", el: "optShape", opts: [
      ["Shape 8.0 Milk Maple", 299.9], ["Shape 8.25 Milk Maple", 299.9],
      ["Shape 8.65 Element Bob Ross", 379.9], ["Shape 8.5 Element Black Planet", 399.9],
      ["Shape Pro Model Patrik Mazzuchini", 399.9]] },
    { k: "truck", el: "optTruck", opts: [["Truck — ver no WhatsApp", 0]] },
    { k: "roda", el: "optRoda", opts: [
      ["Spitfire F4 53mm 99A (jogo)", 599.9], ["Outras — ver no WhatsApp", 0]] },
    { k: "rol", el: "optRol", opts: [["Rolamento — ver no WhatsApp", 0]] },
    { k: "lixa", el: "optLixa", opts: [["Lixa — ver no WhatsApp", 0]] }
  ];
  var PRESETS = [
    { shape: 0, truck: 0, roda: 1, rol: 0, lixa: 0 },
    { shape: 2, truck: 0, roda: 1, rol: 0, lixa: 0 },
    { shape: 4, truck: 0, roda: 0, rol: 0, lixa: 0 }
  ];
  var build = { shape: 0, truck: 0, roda: 1, rol: 0, lixa: 0 };
  var gByKey = function (k) { return GROUPS.filter(function (g) { return g.k === k; })[0]; };
  var bName = function (k) { var g = gByKey(k); return g.opts[build[k]][0]; };
  var bPrice = function (k) { var g = gByKey(k); return g.opts[build[k]][1]; };
  var renderBuild = function () {
    GROUPS.forEach(function (g) {
      $("#" + g.el).innerHTML = g.opts.map(function (o, i) {
        return '<button class="opt' + (build[g.k] === i ? " on" : "") + '" data-k="' + g.k + '" data-i="' + i + '">' + o[0] + (o[1] ? "<small>" + BRL(o[1]) + "</small>" : "<small>no zap</small>") + "</button>";
      }).join("");
    });
    var total = 0, lines = [], missing = [];
    GROUPS.forEach(function (g) {
      var o = g.opts[build[g.k]];
      if (o[1]) { total += o[1]; lines.push("<li><span>" + o[0] + "</span><strong>" + BRL(o[1]) + "</strong></li>"); }
      else missing.push(o[0].split(" — ")[0]);
    });
    if (missing.length) lines.push("<li><span>" + missing.join(" + ") + "</span><strong>a combinar</strong></li>");
    lines.push("<li><span>Parafusos + montagem</span><strong>inclusos</strong></li>");
    $("#buildList").innerHTML = lines.join("");
    $("#buildTotal").textContent = BRL(Math.round(total * 100) / 100);
    $("#buildZap").href = ZAP + encodeURIComponent("Salve! Meu setup: Shape " + bName("shape") + " (" + BRL(bPrice("shape")) + "), Truck: " + (bPrice("truck") ? BRL(bPrice("truck")) : "a combinar") + ", Rodas: " + bName("roda") + ", Rolamento e lixa a combinar. Total parcial: " + BRL(Math.round(total * 100) / 100));
  };
  document.addEventListener("click", function (e) {
    var pr = e.target.closest("[data-preset]");
    if (pr) {
      build = JSON.parse(JSON.stringify(PRESETS[parseInt(pr.getAttribute("data-preset"), 10)]));
      $$(".presets .opt").forEach(function (b) { b.classList.toggle("on", b === pr); });
      renderBuild(); return;
    }
    var o = e.target.closest(".bopt .opt");
    if (o) { build[o.getAttribute("data-k")] = parseInt(o.getAttribute("data-i"), 10); renderBuild(); }
  });

  /* tema claro / escuro (designfy: tokens por variável) */
  var themeBtn = $("#themeBtn");
  var applyTheme = function (t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("bamboo-theme", t); } catch (e) {}
    themeBtn.textContent = (t === "light" ? "◑" : "◐");
  };
  var savedTheme = "dark";
  try { savedTheme = localStorage.getItem("bamboo-theme") || "dark"; } catch (e) {}
  applyTheme(savedTheme);
  themeBtn.addEventListener("click", function () {
    applyTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
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
