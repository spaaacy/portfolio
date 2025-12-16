-- Create timesheet_categories table for user-defined categories

create table if not exists public.timesheet_categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  constraint timesheet_categories_user_name_unique unique (user_id, name)
);

create index if not exists timesheet_categories_user_id_idx
  on public.timesheet_categories (user_id, created_at desc);

alter table public.timesheet_categories enable row level security;

-- SELECT
drop policy if exists "Timesheet categories: select own" on public.timesheet_categories;
create policy "Timesheet categories: select own"
on public.timesheet_categories
for select
to authenticated
using ((select auth.uid()) = user_id);

-- INSERT
drop policy if exists "Timesheet categories: insert own" on public.timesheet_categories;
create policy "Timesheet categories: insert own"
on public.timesheet_categories
for insert
to authenticated
with check ((select auth.uid()) = user_id);

-- UPDATE
drop policy if exists "Timesheet categories: update own" on public.timesheet_categories;
create policy "Timesheet categories: update own"
on public.timesheet_categories
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- DELETE
drop policy if exists "Timesheet categories: delete own" on public.timesheet_categories;
create policy "Timesheet categories: delete own"
on public.timesheet_categories
for delete
to authenticated
using ((select auth.uid()) = user_id);
