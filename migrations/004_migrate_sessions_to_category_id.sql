-- Migrate timesheet_sessions from category text to category_id FK

-- Step 1: Migrate existing category text values to categories table
-- (This creates category rows for any existing category text values)
insert into public.timesheet_categories (user_id, name)
select distinct user_id, category
from public.timesheet_sessions
where category is not null
  and trim(category) != ''
  and not exists (
    select 1 from public.timesheet_categories tc
    where tc.user_id = timesheet_sessions.user_id
      and tc.name = timesheet_sessions.category
  )
on conflict (user_id, name) do nothing;

-- Step 2: Add category_id column to sessions
alter table public.timesheet_sessions
  add column if not exists category_id uuid null
    references public.timesheet_categories(id) on delete set null;

-- Step 3: Populate category_id from existing category text
update public.timesheet_sessions s
set category_id = c.id
from public.timesheet_categories c
where s.user_id = c.user_id
  and s.category = c.name
  and s.category is not null
  and trim(s.category) != '';

-- Step 4: Drop old category text column and its index
drop index if exists public.timesheet_sessions_user_category_started_at_idx;
alter table public.timesheet_sessions
  drop column if exists category;

-- Step 5: Create new index for category_id
create index if not exists timesheet_sessions_user_category_id_started_at_idx
  on public.timesheet_sessions (user_id, category_id, started_at desc);
