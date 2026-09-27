-- Backend sólido Mz4 agency (Supabase grátis). Rode no SQL Editor.
-- v2: realtime + approvals (SIM/NAO) + uploads (fotos) + bucket + RLS p/ anon (MVP).
-- Depois de rodar: Database > Replication > ative as 5 tabelas (se o bloco
-- "alter publication" abaixo falhar no seu plano, ative pelo painel).

-- ---------- tabelas base ----------
create table if not exists sites (
  id text primary key, nome text not null, descricao text default '',
  url_publica text default '', pasta text default '',
  status text default 'em-andamento', prd_resumo text default '',
  falta jsonb default '[]', feito_recente text default '',
  atualizado_em timestamptz default now()
);
create table if not exists tasks (
  id text primary key, site_id text default 'geral',
  titulo text not null, feito boolean default false,
  criado_em timestamptz default now()
);
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  nome text not null, status text default 'gerando',
  inicio timestamptz default now(), estimativa_min int default 10,
  mensagem text default '', ia text default 'opencode', tokens int default 0
);
create table if not exists push_subs (
  endpoint text primary key, p256dh text, auth text, criado_em timestamptz default now()
);

-- ---------- v2: aprovações SIM/NAO ----------
create table if not exists approvals (
  id uuid primary key default gen_random_uuid(),
  pergunta text not null, detalhe text default '', projeto text default 'W3Optica',
  status text default 'pendente', -- pendente | aprovado | negado
  criado_em timestamptz default now(), respondido_em timestamptz
);

-- ---------- v2: fotos enviadas pelo celular ----------
create table if not exists uploads (
  id uuid primary key default gen_random_uuid(),
  site_id text default 'w3optica', nome text default '',
  url text not null, criado_em timestamptz default now()
);

-- ---------- RLS ----------
alter table sites enable row level security;
alter table tasks enable row level security;
alter table jobs enable row level security;
alter table push_subs enable row level security;
alter table approvals enable row level security;
alter table uploads enable row level security;

-- MVP: app usa anon key sem login. Políticas permissivas p/ anon.
-- Quando ligar o Auth (email+senha), troque por políticas "to authenticated".
drop policy if exists "mvp-anon-sites" on sites;
create policy "mvp-anon-sites" on sites for all to anon using (true) with check (true);
drop policy if exists "mvp-anon-tasks" on tasks;
create policy "mvp-anon-tasks" on tasks for all to anon using (true) with check (true);
drop policy if exists "mvp-anon-jobs" on jobs;
create policy "mvp-anon-jobs" on jobs for all to anon using (true) with check (true);
drop policy if exists "mvp-anon-approvals" on approvals;
create policy "mvp-anon-approvals" on approvals for all to anon using (true) with check (true);
drop policy if exists "mvp-anon-uploads" on uploads;
create policy "mvp-anon-uploads" on uploads for all to anon using (true) with check (true);
drop policy if exists "mvp-anon-push" on push_subs;
create policy "mvp-anon-push" on push_subs for all to anon using (true) with check (true);

-- ---------- realtime (atualiza na hora, sem F5) ----------
-- Se der erro de permissão, ative em: Database > Replication > supabase_realtime.
do $$
begin
  begin alter publication supabase_realtime add table sites; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table tasks; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table jobs; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table approvals; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table uploads; exception when duplicate_object then null; end;
end $$;

-- ---------- storage: bucket das fotos ----------
insert into storage.buckets (id, name, public)
values ('w3-fotos', 'w3-fotos', true)
on conflict (id) do nothing;

drop policy if exists "mvp-anon-leitura-fotos" on storage.objects;
create policy "mvp-anon-leitura-fotos" on storage.objects
  for select to anon using (bucket_id = 'w3-fotos');
drop policy if exists "mvp-anon-upload-fotos" on storage.objects;
create policy "mvp-anon-upload-fotos" on storage.objects
  for insert to anon with check (bucket_id = 'w3-fotos');

-- ---------- v3: comandos do celular para o PC ----------
create table if not exists commands (
  id uuid primary key default gen_random_uuid(),
  texto text not null, status text default 'pendente', -- pendente | recebido | pronto
  resposta text default '', criado_em timestamptz default now()
);
alter table commands enable row level security;
drop policy if exists "mvp-anon-commands" on commands;
create policy "mvp-anon-commands" on commands for all to anon using (true) with check (true);
do $$
begin
  begin alter publication supabase_realtime add table commands; exception when duplicate_object then null; end;
end $$;
