// Edge Function "push" — dispara push com app FECHADO.
// Deploy (1 vez, com Supabase CLI logado):
//   supabase functions new push
//   copie este arquivo para supabase/functions/push/index.ts
//   supabase secrets set VAPID_PUBLIC_KEY=... VAPID_PRIVATE_KEY=... VAPID_SUBJECT=mailto:voce@exemplo.com
//   supabase functions deploy push
// Chamada (do PC ou de outra function):
//   POST /functions/v1/push  { "title": "...", "body": "..." }
//
// NOTA: arquivo salvo como supabase-functions-push-index.ts na raiz do
// MeuPainel só como referência — o deploy espera o caminho acima.
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const PUB = Deno.env.get("VAPID_PUBLIC_KEY")!;
const PRIV = Deno.env.get("VAPID_PRIVATE_KEY")!;
const SUBJ = Deno.env.get("VAPID_SUBJECT") ?? "mailto:voce@exemplo.com";
webpush.setVapidDetails(SUBJ, PUB, PRIV);

Deno.serve(async (req) => {
  const { title, body } = await req.json().catch(() => ({}));
  const sb = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const { data: subs } = await sb.from("push_subs").select("*");
  let enviadas = 0;
  for (const s of subs ?? []) {
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } } as never,
        JSON.stringify({ title: title ?? "Mz4 agency", body: body ?? "Atualizou ⚡" })
      );
      enviadas++;
    } catch {
      await sb.from("push_subs").delete().eq("endpoint", s.endpoint);
    }
  }
  return Response.json({ enviadas });
});
