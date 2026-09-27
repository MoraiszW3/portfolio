// Bamboo Bridge — code.js (sandbox do Figma). Recebe comandos da ui.html e responde.
figma.showUI(__html__, { width: 260, height: 160 });

function solid(node) {
  var out = [];
  var fills = node.fills;
  if (fills && fills.length && fills !== figma.mixed) {
    for (var i = 0; i < fills.length; i++) {
      var f = fills[i];
      if (f.type === "SOLID" && f.visible !== false) {
        var c = f.color;
        out.push("#" + [c.r, c.g, c.b].map(function (v) {
          return Math.round(v * 255).toString(16).padStart(2, "0");
        }).join(""));
      } else if (f.type === "IMAGE") {
        out.push("IMAGEM");
      }
    }
  }
  return out;
}

function slim(node, depth) {
  var o = {
    id: node.id, name: node.name, type: node.type,
    box: node.absoluteBoundingBox ? [
      Math.round(node.absoluteBoundingBox.x), Math.round(node.absoluteBoundingBox.y),
      Math.round(node.absoluteBoundingBox.width), Math.round(node.absoluteBoundingBox.height)] : null,
    fills: solid(node)
  };
  if (node.type === "TEXT") {
    o.characters = (node.characters || "").slice(0, 120);
    try {
      o.style = {
        fontFamily: node.fontName.family, fontSize: node.fontSize,
        fontWeight: node.fontWeight, align: node.textAlignHorizontal
      };
    } catch (e) {}
  }
  if (depth > 0 && node.children) {
    o.children = [];
    for (var i = 0; i < Math.min(node.children.length, 60); i++) {
      o.children.push(slim(node.children[i], depth - 1));
    }
    if (node.children.length > 60) o.truncated = node.children.length - 60;
  }
  return o;
}

function b64(bytes) {
  var s = "";
  var CH = 32768;
  for (var i = 0; i < bytes.length; i += CH) {
    s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
  }
  return btoa(s);
}

figma.ui.onmessage = async function (msg) {
  var id = msg.id, out = null;
  try {
    var p = msg.params || {};
    switch (msg.command) {
      case "ping":
        out = { pong: true, file: figma.root.name, page: figma.currentPage.name };
        break;
      case "get_document_info": {
        var kids = figma.currentPage.children.map(function (n) {
          return { id: n.id, name: n.name, type: n.type };
        });
        out = { page: figma.currentPage.name, childCount: kids.length, children: kids };
        break;
      }
      case "get_selection":
        out = {
          selectionCount: figma.currentPage.selection.length,
          selection: figma.currentPage.selection.map(function (n) {
            return { id: n.id, name: n.name, type: n.type };
          })
        };
        break;
      case "read_selection":
        out = figma.currentPage.selection.slice(0, 3).map(function (n) { return slim(n, 4); });
        break;
      case "export_node": {
        var node = await figma.getNodeByIdAsync(p.nodeId);
        if (!node) throw new Error("no " + p.nodeId);
        var bytes = await node.exportAsync({ format: (p.format || "JPG").toLowerCase(), constraint: { type: "SCALE", value: p.scale || 1 } });
        var full = b64(bytes);
        var parts = [];
        for (var j = 0; j < full.length; j += 500000) parts.push(full.slice(j, j + 500000));
        out = { nodeId: p.nodeId, format: p.format || "JPG", parts: parts };
        break;
      }
      case "create_text": {
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        var t = figma.createText();
        t.x = p.x || 0; t.y = p.y || 0;
        t.characters = p.text || "";
        t.fontSize = p.fontSize || 14;
        try { t.fills = [{ type: "SOLID", color: p.fontColor || { r: 0, g: 0, b: 0 } }]; } catch (e) {}
        out = { id: t.id, name: t.name };
        break;
      }
      case "create_frame": {
        var f = figma.createFrame();
        f.x = p.x || 0; f.y = p.y || 0;
        f.resize(p.width || 800, p.height || 600);
        f.name = p.name || "Frame";
        if (p.fillColor) { try { f.fills = [{ type: "SOLID", color: p.fillColor }]; } catch (e) {} }
        out = { id: f.id, name: f.name };
        break;
      }
      case "set_text_content": {
        var tn = await figma.getNodeByIdAsync(p.nodeId);
        if (!tn || tn.type !== "TEXT") throw new Error("texto?");
        await figma.loadFontAsync(tn.fontName);
        tn.characters = p.text || "";
        out = { id: tn.id, characters: tn.characters.slice(0, 60) };
        break;
      }
      default:
        throw new Error("comando? " + msg.command);
    }
  } catch (e) {
    figma.ui.postMessage({ pluginMessage: { id: id, error: String(e && e.message || e) } });
    return;
  }
  figma.ui.postMessage({ pluginMessage: { id: id, result: out } });
};
