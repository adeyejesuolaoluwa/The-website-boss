# IdeaVision Forge

IdeaVision Forge is a responsive project workspace organized around Idea, Learn, Plan, Create, Build, and Final Result. The workspace starts empty and does not publish fictional projects, reviews, fixed prices, or payment activity.

## Run locally

```powershell
npm ci
npm run dev
```

Check changes with `npm run lint` and `npm run build`.

## Enable accounts and cloud storage

1. Create a Supabase project and enable email/password authentication.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the Supabase project settings.
4. Restart the dev server. Sign-in is enabled when both variables are set.
5. For GitHub Pages, add the same values as repository Actions variables with those names. Never expose a service-role key in the browser.

Projects made in browser-only mode are not automatically imported into an account. Keep a separate copy before signing in.

## Publish with GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes `main`. A repository owner must enable **Settings → Pages → Build and deployment → GitHub Actions** once. The workflow cannot change this owner-controlled repository setting.

After a successful workflow run, the site URL is `https://adeyejesuolaoluwa.github.io/The-website-boss/`.

## Business setup

Contact is through the owner's phone and WhatsApp links. No website contact form or online payment is connected. Agree the scope and price directly before paid work. The Privacy and Terms pages are drafts and should be reviewed for the business and its jurisdictions before launch.
