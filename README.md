<div align="center">
  <img src="assets\topbarlogo.png" alt="PartysZonaNorte Logo" width="500">
  <h1>Partys Zona Norte</h1>
  <p>Official Partys Zona Norte Website.</p>
  <p>Create your own party decorations for any occassion</p>
  <p>Check the website at partyszonanorte.com</p>
  <p>Check our socials at @partyszonanorte in instagram</p>
</div>

## Production Google login redirect

The admin sign-in always requests the `/admin` route on the live website currently open in the browser. If a deployed login opens `localhost` and fails, update **Supabase Dashboard > Authentication > URL Configuration**:

- Set **Site URL** to `https://partyszonanorte.com`.
- Add `https://partyszonanorte.com/admin` under **Redirect URLs**.
- Keep `http://localhost:5173/admin` only for local development.

Also keep Google’s OAuth redirect URI set to the Supabase callback shown in **Authentication > Providers > Google**, not to localhost or the website’s `/admin` route.

To enable edit and delete controls in an already-created project, run [the catalog management migration](supabase/migrations/20260808_enable_catalog_management.sql) in Supabase SQL Editor.
