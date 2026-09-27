# Mz4 agency — seu app (sem ntfy)

## O que mudou
- Marca: **Mz4 agency** (preto + vermelho, em `MeuPainel/config.js` → `APP_BRAND`).
- Login: com nuvem = email+senha (Supabase Auth); sem nuvem = PIN local.
- Canal próprio: o PC grava em `jobs` na SUA nuvem; o app atualiza sozinho a cada 30s + notificação com sua marca. Nada de ntfy.

## Ligar sua nuvem grátis (5 min, 1 vez)
1. Crie conta em supabase.com → New project (free).
2. No projeto: Authentication → habilite Email. Crie seu usuário.
3. SQL Editor → cole e rode `MeuPainel/supabase-schema.sql`.
4. Project Settings → API: copie `URL` + `anon key`.
5. Cole nos 2 lugares:
   - `MeuPainel/config.js` (SUPABASE_URL, SUPABASE_ANON_KEY)
   - crie `meu-app-config.txt` ao lado dos scripts com:
     SUPABASE_URL=https://xyz.supabase.co
     SUPABASE_ANON_KEY=sua-chave
6. No PC: `.\enviar-para-meu-app.ps1 -JobNome "Teste" -Status gerando`
   No app: aba Pipeline mostra o job. Depois:
   `.\enviar-para-meu-app.ps1 -JobNome "Teste" -Status pronto -Mensagem "OK" -Tokens 100`

## Push com app fechado (opcional, depois)
Gere chaves VAPID (web-push CLI, grátis), cole a pública em `config.js` → `VAPID_PUBLIC_KEY`,
guarde a privada numa Edge Function que lê `push_subs` e dispara. Sem isso, o aviso funciona com o app aberto.

## Regra nova das IAs
Trocar `notificar.ps1` por `enviar-para-meu-app.ps1` ao terminar cada código.
O `notificar.ps1` antigo fica guardado como fallback.
