create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  guests integer not null check (guests between 1 and 10),
  attending text not null check (attending in ('yes', 'no')),
  message text check (char_length(message) <= 500),
  created_at timestamptz not null default now()
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  message text not null check (char_length(message) between 3 and 500),
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;
alter table public.wishes enable row level security;

create policy "Anyone can submit an RSVP" on public.rsvps for insert to anon with check (true);
create policy "Anyone can leave a wish" on public.wishes for insert to anon with check (true);
create policy "Approved wishes are public" on public.wishes for select to anon using (approved = true);

alter publication supabase_realtime add table public.wishes;
