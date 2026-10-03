/* Bamboo — login do cliente via Supabase Auth (opcional).
   Sem chaves em config.local.js, o site funciona normal sem login. */
(function () {
  "use strict";
  var cfg = (window.BAMBOO_BACKEND || {});
  var box = document.getElementById("accountBox");
  if (!box) return;
  if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY || typeof supabase === "undefined") {
    box.innerHTML = '<span class="hact-dim">Entrar em breve</span>';
    return;
  }
  var sb = supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  var render = function (user) {
    if (user) {
      box.innerHTML = '<span class="hact-user"></span><button class="hact-btn" id="logoutBtn">Sair</button>';
      box.querySelector(".hact-user").textContent = "Olá, " + (user.email || "skatista");
      box.querySelector("#logoutBtn").addEventListener("click", function () {
        sb.auth.signOut().then(function () { render(null); });
      });
    } else {
      box.innerHTML = '<button class="hact-btn" id="loginBtn">Entrar</button>' +
        '<div class="auth-pop" id="authPop" hidden>' +
        '<input type="email" id="authEmail" placeholder="Seu e-mail" autocomplete="email">' +
        '<input type="password" id="authPass" placeholder="Senha" autocomplete="current-password">' +
        '<button class="btn-solid w-full" id="authGo">Entrar</button>' +
        '<button class="btn-ghost w-full" id="authUp">Criar conta</button>' +
        '<p class="mut" id="authMsg"></p></div>';
      var email = function () { return box.querySelector("#authEmail").value.trim(); };
      var pass = function () { return box.querySelector("#authPass").value; };
      var say = function (m) { box.querySelector("#authMsg").textContent = m; };
      box.querySelector("#loginBtn").addEventListener("click", function () {
        var p = box.querySelector("#authPop"); p.hidden = !p.hidden;
      });
      box.querySelector("#authGo").addEventListener("click", function () {
        sb.auth.signInWithPassword({ email: email(), password: pass() }).then(function (r) {
          if (r.error) say("Não entrou: " + r.error.message);
          else render(r.data.user);
        });
      });
      box.querySelector("#authUp").addEventListener("click", function () {
        sb.auth.signUp({ email: email(), password: pass() }).then(function (r) {
          if (r.error) say("Não criou: " + r.error.message);
          else say(r.data.user ? "Conta criada! Confira seu e-mail." : "Verifique seu e-mail.");
        });
      });
    }
  };
  sb.auth.getSession().then(function (r) {
    render(r.data.session ? r.data.session.user : null);
  });
})();
