-- Atlas AI / SmartLedger Sprint 10 foundation
create extension if not exists "pgcrypto";

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'starter',
  created_at timestamptz not null default now()
);

create table public.company_users (
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','admin','employee','accountant')),
  created_at timestamptz not null default now(),
  primary key (company_id, user_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.companies enable row level security;
alter table public.company_users enable row level security;
alter table public.notifications enable row level security;

create policy "members can view their companies" on public.companies
for select using (exists (select 1 from public.company_users cu where cu.company_id = id and cu.user_id = auth.uid()));

create policy "members can view memberships" on public.company_users
for select using (user_id = auth.uid() or exists (select 1 from public.company_users cu where cu.company_id = company_users.company_id and cu.user_id = auth.uid() and cu.role in ('owner','admin')));

create policy "users can view company notifications" on public.notifications
for select using (exists (select 1 from public.company_users cu where cu.company_id = notifications.company_id and cu.user_id = auth.uid()));
