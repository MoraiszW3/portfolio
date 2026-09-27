// Ponte propria Figma <-> site (canal fixo "bamboo", com heartbeat).
// Uso: node server.js  (porta 3056)
// REST: GET /status | GET /doc | POST /cmd {command, params...} -> {ok, result}
const http = require("http");
const { WebSocketServer } = require("ws");

const PORT = 3056;
const CHANNEL = "bamboo";
let plugin = null;
let lastBeat = 0;
const pending = new Map();
let seq = 0;

const wss = new WebSocketServer({ port: PORT + 1, path: "/figma" });
wss.on("connection", (ws) => {
  ws.on("message", (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }
    if (msg.channel !== CHANNEL) return;
    if (msg.from === "plugin") {
      plugin = ws;
      lastBeat = Date.now();
      if (msg.id && pending.has(msg.id)) {
        const p = pending.get(msg.id);
        pending.delete(msg.id);
        clearTimeout(p.timer);
        p.resolve(msg.result !== undefined ? msg.result : msg);
      }
      return;
    }
  });
  ws.on("close", () => { if (plugin === ws) plugin = null; });
});

function send(cmd, params) {
  return new Promise((resolve, reject) => {
    if (!plugin || plugin.readyState !== 1) return reject(new Error("plugin-offline"));
    const id = "c" + (++seq);
    const timer = setTimeout(() => { pending.delete(id); reject(new Error("timeout")); }, 25000);
    pending.set(id, { resolve, reject, timer });
    plugin.send(JSON.stringify({ id, command: cmd, params: params || {} }));
  });
}

// heartbeat: se o plugin calar 20s, marca offline (ele reconecta sozinho)
setInterval(() => {
  if (plugin && Date.now() - lastBeat > 20000) plugin = null;
}, 5000);

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  const url = new URL(req.url, "http://x");
  const body = await new Promise((r) => {
    let s = "";
    req.on("data", (c) => (s += c));
    req.on("end", () => r(s));
  });
  try {
    if (url.pathname === "/status") {
      res.end(JSON.stringify({ ok: true, plugin: !!plugin, channel: CHANNEL }));
    } else if (url.pathname === "/doc" && req.method === "GET") {
      const result = await send("get_document_info", {});
      res.end(JSON.stringify({ ok: true, result }));
    } else if (url.pathname === "/cmd" && req.method === "POST") {
      const { command, params } = JSON.parse(body || "{}");
      const result = await send(command, params || {});
      res.end(JSON.stringify({ ok: true, result }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ ok: false, error: "rota?" }));
    }
  } catch (e) {
    res.statusCode = 502;
    res.end(JSON.stringify({ ok: false, error: String(e.message || e) }));
  }
});
server.listen(PORT, "127.0.0.1", () => console.log("ponte no ar: http://127.0.0.1:" + PORT + " | ws :" + (PORT + 1)));
