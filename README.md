# PartyZonaNorte

A production-ready, mobile-first party decorations storefront built with React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, and EmailJS.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Configure the EmailJS values in `.env.local`. Create an EmailJS template that receives `firstName`, `lastName`, `email`, `phone`, `subject`, `message`, `from_name`, and `reply_to`.

## Quality checks

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel; Vercel detects Vite automatically.
3. Add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, and optionally `VITE_CONTACT_EMAIL` under **Settings → Environment Variables**.
4. Deploy. The build command is `npm run build` and output directory is `dist`.

## Customize business details

Edit `src/config/business.ts` for the business name, contact details, social links, service area, hours, and brand colors. Product/catalog content lives in `src/data/products.ts`.

## Notes

- EmailJS is browser-based; the public key is intentionally exposed, but service/template permissions should be restricted in EmailJS.
- Remote product images use Unsplash URLs. Replace them with optimized owned assets before launch if preferred.
- `public/robots.txt` and `public/sitemap.xml` are included; replace the domain in the sitemap when the production URL is known.
