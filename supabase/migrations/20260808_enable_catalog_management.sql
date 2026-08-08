-- Apply this migration to an existing Supabase project to enable admin editing
-- and deletion of catalog rows.
grant update, delete on public.catalog_items to authenticated;

drop policy if exists "approved admins update catalog items" on public.catalog_items;
create policy "approved admins update catalog items"
  on public.catalog_items for update to authenticated
  using (public.is_catalog_admin())
  with check (public.is_catalog_admin());

drop policy if exists "approved admins delete catalog items" on public.catalog_items;
create policy "approved admins delete catalog items"
  on public.catalog_items for delete to authenticated
  using (public.is_catalog_admin());
