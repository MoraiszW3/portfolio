# Login da Bamboo (Supabase Auth)

Sem configurar nada, o site funciona normal e mostra "Entrar em breve".
Para ligar o login do cliente:

1. Crie um projeto grátis em supabase.com
2. Authentication → ative **Email**
3. Project Settings → API → copie `URL` + `anon key`
4. Copie `bamboo/js/config.local.EXAMPLE.js` para `bamboo/js/config.local.js`
   (esse arquivo é ignorado pelo git — a chave nunca vai pro GitHub)
5. Cole as 2 chaves nele e recarregue o site

O cliente cria conta e entra pelo botão **Entrar** no header.
Sessão persiste sozinha. Nada de senha no código, nada no git.
