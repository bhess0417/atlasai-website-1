create table if not exists public.financial_imports (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  created_by uuid references auth.users(id),
  filename text not null,
  source_type text default 'csv',
  row_count integer not null default 0,
  valid_count integer not null default 0,
  duplicate_count integer not null default 0,
  status text not null default 'completed',
  column_mapping jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.financial_transactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null,
  import_id uuid references public.financial_imports(id) on delete cascade,
  transaction_date date not null,
  vendor_raw text,
  description text,
  amount numeric(14,2) not null,
  balance numeric(14,2),
  category_raw text,
  source_row integer,
  fingerprint text,
  created_at timestamptz not null default now()
);

create index if not exists financial_transactions_company_date_idx on public.financial_transactions(company_id, transaction_date desc);
create index if not exists financial_transactions_import_idx on public.financial_transactions(import_id);
