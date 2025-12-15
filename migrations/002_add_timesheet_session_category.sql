-- Add optional category/label for timesheet sessions

alter table public.timesheet_sessions
  add column if not exists category text null;

create index if not exists timesheet_sessions_user_category_started_at_idx
  on public.timesheet_sessions (user_id, category, started_at desc);
