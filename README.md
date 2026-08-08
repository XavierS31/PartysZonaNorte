<div align="center">
  <img src="assets\topbarlogo.png" alt="PartysZonaNorte Logo" width="500">
  <h1>Partys Zona Norte</h1>
  <p>Official Partys Zona Norte Website.</p>
  <p>Create your own party decorations for any occassion</p>
  <p>Check the website at partyszonanorte.com</p>
</div>

## Supabase catalog and admin portal

1. Create a Supabase project, then run [the catalog migration](supabase/migrations/20260807_create_catalog_items.sql) in its SQL Editor (or apply it through the Supabase CLI).
2. In Supabase **Authentication > Providers**, enable Google and enter the Google OAuth client ID and secret. In **Authentication > URL Configuration**, add `http://localhost:5173/admin` and your production `https://your-domain/admin` as redirect URLs.
3. Copy `.env.example` to `.env` and set `SUPABASE_URL` and `SUPABASE_ANON_KEY`. Never put a Supabase service-role key in this frontend. The existing `VITE_SUPABASE_*` names are also accepted for backward compatibility.
4. Start the app with `npm run dev`, then use the small lock in the footer to visit `/admin`. Only `danabaso23@gmail.com` and `xaviersoto31@gmail.com` can remain signed in or insert catalog items.

The catalog provider makes one full `catalog_items` request when the app starts and holds it in client state. It uses Supabase Realtime for insert events, so open catalog pages also receive admin additions without another full query. The API wrapper serializes catalog requests with a minimum delay to prevent bursty calls.
