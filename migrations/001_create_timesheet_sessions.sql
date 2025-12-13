-- Timesheet sessions (per authenticated user)

create extension if not exists pgcrypto;

create table if not exists public.timesheet_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null,
  ended_at timestamptz null,
  created_at timestamptz not null default now(),
  constraint ended_after_started check (ended_at is null or ended_at >= started_at)
);

create index if not exists timesheet_sessions_user_started_at_idx
  on public.timesheet_sessions (user_id, started_at desc);

alter table public.timesheet_sessions enable row level security;

-- SELECT
drop policy if exists "Timesheet sessions: select own" on public.timesheet_sessions;
create policy "Timesheet sessions: select own"
on public.timesheet_sessions
for select
to authenticated
using ((select auth.uid()) = user_id);

-- INSERT
drop policy if exists "Timesheet sessions: insert own" on public.timesheet_sessions;
create policy "Timesheet sessions: insert own"
on public.timesheet_sessions
for insert
to authenticated
with check ((select auth.uid()) = user_id);

-- UPDATE
drop policy if exists "Timesheet sessions: update own" on public.timesheet_sessions;
create policy "Timesheet sessions: update own"
on public.timesheet_sessions
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

-- DELETE
drop policy if exists "Timesheet sessions: delete own" on public.timesheet_sessions;
create policy "Timesheet sessions: delete own"
on public.timesheet_sessions
for delete
to authenticated
using ((select auth.uid()) = user_id);

