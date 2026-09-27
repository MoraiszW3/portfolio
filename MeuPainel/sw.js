// Mz4 agency — service worker v2. Troque APP_VERSION a cada deploy;
// o app mostra "Nova versão" e atualiza com 1 toque (sem F5 manual).
const APP_VERSION = "2.0.0";
const CACHE = "mz4-painel-v2";
const SHELL = [
  "./", "index.html", "app.js", "config.js", "manifest.json",
  "logo.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: "window" }).then((cs) =>
        cs.forEach((c) => c.postMessage({ tipo: "SW_UPDATED", versao: APP_VERSION }))))
  );
});
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

// Shell: cache-first. API/dados: nunca cachear (realtime precisa do fresco).
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (u.pathname.endsWith("data.json") || u.hostname.endsWith("supabase.co")) return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
      const copy = r.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return r;
    }).catch(() => hit))
  );
});

self.addEventListener("push", (e) => {
  const d = e.data ? e.data.json() : { title: "Mz4 agency", body: "Código pronto. Toque para abrir." };
  e.waitUntil(self.registration.showNotification(d.title || "Mz4 agency", {
    body: d.body, icon: "icon-192.png", badge: "icon-192.png", tag: "mz4"
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow("index.html"));
});
