-- Run this migration in the Supabase SQL Editor or with the Supabase CLI.
create extension if not exists pgcrypto;

create table if not exists public.catalog_items (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  service text not null check (length(trim(service)) > 0),
  image text not null check (length(trim(image)) > 0),
  badge text,
  description text not null check (length(trim(description)) > 0)
);

alter table public.catalog_items enable row level security;

-- This table has no client read policy. It keeps administrator addresses out
-- of the frontend bundle and out of the public catalog policy.
create table if not exists public.catalog_admins (
  email text primary key check (email = lower(trim(email)))
);
alter table public.catalog_admins enable row level security;
revoke all on public.catalog_admins from anon, authenticated;

create or replace function public.is_catalog_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.catalog_admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_catalog_admin() from public;
grant execute on function public.is_catalog_admin() to authenticated;

-- The public site may read its catalog. Writes are restricted both here and in the UI.
grant select on public.catalog_items to anon, authenticated;
grant insert on public.catalog_items to authenticated;
revoke insert, update, delete on public.catalog_items from anon;
revoke update, delete on public.catalog_items from authenticated;

drop policy if exists "public catalog read" on public.catalog_items;
create policy "public catalog read"
  on public.catalog_items for select
  using (true);

drop policy if exists "approved admins insert catalog items" on public.catalog_items;
drop policy if exists "Allow admin modifications" on public.catalog_items;
create policy "approved admins insert catalog items"
  on public.catalog_items for insert to authenticated
  with check (public.is_catalog_admin());

-- Needed only when you want already-open public pages to receive inserts live.
alter table public.catalog_items replica identity full;
do $$
begin
  alter publication supabase_realtime add table public.catalog_items;
exception
  when duplicate_object then null;
end $$;
