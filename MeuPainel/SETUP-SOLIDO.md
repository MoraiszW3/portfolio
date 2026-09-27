# Mz4 agency — app sólido v2 (PWA + realtime, sem F5)

O que mudou: o painel virou PWA instalável com atualização na hora.
Sem nuvem ele já funciona local (mostra `● local`). Com a nuvem ele
vira `● realtime`: pipeline, aprovações e fotos chegam sozinhos.

## 1. Rodar agora (sem nuvem, 1 min)

Servidor na raiz do projeto:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

- Site: http://127.0.0.1:8080/W3Optica/
- App: http://127.0.0.1:8080/MeuPainel/

No celular (mesmo Wi-Fi): troque `127.0.0.1` pelo IP do PC.
No app aparece `● local` e tudo funciona, menos realtime/push fechado.

## 2. Ligar a nuvem (1 vez, ~10 min, grátis)

1. Crie conta em supabase.com → New project (free).
2. SQL Editor → cole e rode `MeuPainel/supabase-schema.sql` (v2).
3. Database → Replication → confira `sites, tasks, jobs, approvals, uploads`
   em `supabase_realtime` (o SQL já tenta ativar sozinho).
4. Storage → confira o bucket `w3-fotos` (público).
5. Authentication → habilite Email → crie seu usuário.
6. Project Settings → API → copie `URL` + `anon key`.
7. Cole nos 2 lugares:
   - `MeuPainel/config.js` → `SUPABASE_URL`, `SUPABASE_ANON_KEY`
   - crie `meu-app-config.txt` ao lado dos `.ps1`:
     ```
     SUPABASE_URL=https://xyz.supabase.co
     SUPABASE_ANON_KEY=sua-chave
     ```
8. Recarregue o app: o selo vira `● realtime`. Pronto — sem F5.

## 3. Instalar como app (estilo Play Store)

- Android/Edge: abra o app → menu ⋮ → **Instalar/Adicionar à tela inicial**.
  O botão 📲 também aparece sozinho quando o navegador permite.
- Play Store de verdade (opcional): gere o pacote em pwabuilder.com
  com a URL pública do painel (Netlify/Vercel) e publique.
- Cada deploy: suba `APP_VERSION` em `config.js` + `sw.js`.
  Quem estiver com o app aberto vê a faixa **"Nova versão" → Atualizar**.

## 4. O que cada função faz

| Função | Onde | Como funciona |
|---|---|---|
| Pipeline ao vivo | aba Início | PC grava em `jobs`; app recebe por websocket e toca aviso |
| Aprovar SIM/NAO | aba Aprovar 🔐 | `.\pedir-aprovacao-supabase.ps1 -Pergunta "..."`; resposta volta como exit 0/2 |
| Fotos | aba Fotos 📸 | com nuvem sobe p/ bucket `w3-fotos` + linha em `uploads`; sem nuvem salva no aparelho |
| Push c/ app fechado | Perfil → Avisos | precisa VAPID + deploy da function `push` (ver `supabase-functions-push-index.ts`) |
| Enviar job do PC | `.\enviar-para-meu-app.ps1 -JobNome "..." -Status gerando\|pronto` | nuvem ou `data.json` local |

## 5. VAPID + push fechado (opcional, depois)

1. Gere o par VAPID (uma vez): `npx web-push generate-vapid-keys`.
2. Pública → `config.js` (`VAPID_PUBLIC_KEY`). Privada → secrets da function.
3. Deploy da function `push` (passos no topo do arquivo de referência).
4. No app: Perfil → Ativar avisos → aceite a permissão.

## 6. Comandos do celular → PC (a IA executa aqui)

Nova aba **Comando ⌨️** no app:

1. Digite a ordem e toque **Enviar comando 📡**.
2. No PC, deixe rodando (1 vez):
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\ouvir-celular.ps1
   ```
3. O comando cai em `inbox-celular.md`. Aqui no chat, me diga
   **"tem comando"** (ou cole o texto) que eu leio e executo.
4. Após executar, eu devolvo a resposta:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\responder-comando.ps1 -Id "<id>" -Resposta "Feito ✓"
   ```
   Com nuvem, a resposta aparece no app na hora, sem F5.

Sem nuvem funciona via ntfy (só internet). Com nuvem vai pela
tabela `commands` (rode o `supabase-schema.sql` v3).

## 7. Regra das IAs

- Ao terminar código: `.\enviar-para-meu-app.ps1` (job + tokens).
- Antes de ação grande: `.\pedir-aprovacao-supabase.ps1` (SIM/NAO no app).
- A cada deploy do painel: subir `APP_VERSION` nos 2 arquivos.
