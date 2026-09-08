begin;

create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  guests integer not null check (guests between 0 and 10),
  attending text not null check (attending in ('yes', 'no')),
  message text check (char_length(message) <= 500),
  created_at timestamptz not null default now()
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  message text not null check (char_length(message) between 3 and 500),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Compatibility-safe migration for databases created by earlier versions.
alter table public.rsvps drop constraint if exists rsvps_guests_check;
alter table public.rsvps add constraint rsvps_guests_check check (guests between 0 and 10);
alter table public.wishes alter column approved set default false;

create index if not exists wishes_approved_created_at_idx
  on public.wishes (created_at desc) where approved = true;

alter table public.rsvps enable row level security;
alter table public.wishes enable row level security;

drop policy if exists "Anyone can submit an RSVP" on public.rsvps;
drop policy if exists "Anyone can leave a wish" on public.wishes;
drop policy if exists "Approved wishes are public" on public.wishes;

create policy "Anyone can submit an RSVP" on public.rsvps for insert to anon with check (true);
create policy "Anyone can leave a wish" on public.wishes for insert to anon with check (approved = false);
create policy "Approved wishes are public" on public.wishes for select to anon using (approved = true);

revoke all on public.rsvps from anon;
revoke all on public.wishes from anon;
grant insert on public.rsvps to anon;
grant insert, select on public.wishes to anon;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'wishes'
  ) then
    alter publication supabase_realtime add table public.wishes;
  end if;
end $$;

commit;
