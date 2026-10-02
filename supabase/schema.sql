create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  project_type text not null default 'Creative project',
  description text not null default '',
  problem text not null default '',
  purpose text not null default '',
  audience text not null default '',
  solution text not null default '',
  stage text not null default 'idea' check (stage in ('idea', 'learn', 'plan', 'create', 'build', 'result')),
  stage_index smallint not null default 0 check (stage_index between 0 and 5),
  progress smallint not null default 0 check (progress between 0 and 100),
  idea_context jsonb not null default '{}'::jsonb,
  lesson_progress jsonb not null default '[]'::jsonb,
  build_checklist jsonb not null default '[]'::jsonb,
  creation_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Users can read their own projects"
  on public.projects for select to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own projects"
  on public.projects for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.projects for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.projects for delete to authenticated
  using (auth.uid() = user_id);

create table if not exists public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  position smallint not null default 0,
  is_complete boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.project_milestones enable row level security;

create policy "Users can read milestones for their projects"
  on public.project_milestones for select to authenticated
  using (exists (
    select 1 from public.projects
    where projects.id = project_milestones.project_id
      and projects.user_id = auth.uid()
  ));

create policy "Users can create milestones for their projects"
  on public.project_milestones for insert to authenticated
  with check (exists (
    select 1 from public.projects
    where projects.id = project_milestones.project_id
      and projects.user_id = auth.uid()
  ));

create policy "Users can update milestones for their projects"
  on public.project_milestones for update to authenticated
  using (exists (
    select 1 from public.projects
    where projects.id = project_milestones.project_id
      and projects.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.projects
    where projects.id = project_milestones.project_id
      and projects.user_id = auth.uid()
  ));

create policy "Users can delete milestones for their projects"
  on public.project_milestones for delete to authenticated
  using (exists (
    select 1 from public.projects
    where projects.id = project_milestones.project_id
      and projects.user_id = auth.uid()
  ));

create table if not exists public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  amount_minor_units bigint not null check (amount_minor_units > 0),
  currency text not null default 'USD' check (currency = 'USD'),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  provider text not null,
  provider_reference text unique,
  created_at timestamptz not null default now()
);

alter table public.payment_transactions enable row level security;

create policy "Users can read their own transaction records"
  on public.payment_transactions for select to authenticated
  using (auth.uid() = user_id);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null,
  sender_email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;