/* Bamboo Shop — fiel ao Figma "BAMBOO - CLONE + REDESING" (preços reais) */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var BRL = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };
  var ZAP = "https://api.whatsapp.com/send?phone=554733326625&text=";

  /* PRODUCTS vem de js/products.js (catálogo real raspado do site oficial) */
  var CATNAME = { tenis: "Tênis", skate: "Skate", bones: "Bonés & Acessórios", vestuario: "Vestuário", outlet: "Outlet", chorao: "Chorão Eterno" };

  var thumb = function (src) { return src.indexOf("cdn.awsli") > -1 ? src.replace("300x300", "400x400") : src; };
  var cardHTML = function (p) {
    var pix = Math.round(p.price * 0.95 * 100) / 100;
    return '<article class="card" data-id="' + p.id + '">' +
      '<div class="card-media"><img src="' + thumb(p.img) + '" alt="' + p.name + '" loading="lazy"></div>' +
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
  var gridMode = { cat: null };
  var goCat = function (cat) {
    if (cat === "outlet") { document.querySelector("#outlet").scrollIntoView({ behavior: "smooth" }); return; }
    if (cat === "vestuario") { toast("Vestuário entra na próxima leva — chama no WhatsApp"); return; }
    if (cat === "todas") {
      gridMode.cat = null;
      $("#colecaoTitle").textContent = "Novidades";
      renderAll($("#searchInput").value.trim());
    } else {
      gridMode.cat = cat;
      var map = { tenis: "Tênis", skate: "Skate", bones: "Bonés & Acessórios" };
      $("#colecaoTitle").textContent = map[cat] || cat;
      var list = PRODUCTS.filter(function (p) { return p.cat === cat; });
      $("#grid").innerHTML = list.length ? list.map(cardHTML).join("") : '<p class="mut" style="grid-column:1/-1">Nada aqui ainda — chama no WhatsApp.</p>';
    }
    document.querySelector("#produtos").scrollIntoView({ behavior: "smooth" });
  };
  var goSearch = function (term) {
    $("#searchInput").value = term;
    renderAll(term.trim());
    document.querySelector("#produtos").scrollIntoView({ behavior: "smooth" });
  };
  document.addEventListener("click", function (e) {
    var s = e.target.closest("a[data-search]");
    if (s) { e.preventDefault(); goSearch(s.getAttribute("data-search")); $("#nav").classList.remove("open"); return; }
    var q = e.target.closest("a[data-qv]");
    if (q) { e.preventDefault(); location.href = "pdp.html?id=" + q.getAttribute("data-qv"); return; }
    var a = e.target.closest("a[data-cat]");
    if (a) { e.preventDefault(); goCat(a.getAttribute("data-cat")); $("#nav").classList.remove("open"); return; }
  });
  $("#verTudo").addEventListener("click", function (e) { e.preventDefault(); goCat("todas"); });
  $("#searchInput").addEventListener("input", function () {
    gridMode.cat = null;
    $("#colecaoTitle").textContent = "Novidades";
    renderAll(this.value.trim());
    if (this.value.trim()) document.querySelector("#produtos").scrollIntoView();
  });

  /* sacola (persiste entre páginas) */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem("bamboo_cart") || "[]"); } catch (e) { cart = []; }
  var saveCart = function () { try { localStorage.setItem("bamboo_cart", JSON.stringify(cart)); } catch (e) {} };
  var findP = function (id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; };
  var refreshCart = function () {
    saveCart();
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
    if (card && !e.target.closest("button")) location.href = "pdp.html?id=" + card.getAttribute("data-id");
  });

  var openCart = function () { $("#cart").classList.add("open"); $("#cartOverlay").classList.add("open"); };
  var closeCart = function () { $("#cart").classList.remove("open"); $("#cartOverlay").classList.remove("open"); };
  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#cartOverlay").addEventListener("click", closeCart);
  $("#hamburger").addEventListener("click", function () { $("#nav").classList.toggle("open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeCart(); } });

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
