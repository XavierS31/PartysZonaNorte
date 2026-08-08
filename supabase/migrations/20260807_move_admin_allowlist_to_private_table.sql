-- Apply this after the original migration if it has already been executed.
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

drop policy if exists "approved admins insert catalog items" on public.catalog_items;
drop policy if exists "Allow admin modifications" on public.catalog_items;
create policy "approved admins insert catalog items"
  on public.catalog_items for insert to authenticated
  with check (public.is_catalog_admin());
