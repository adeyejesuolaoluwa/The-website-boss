# Database and Account Setup

The site now has optional Supabase email authentication and account-scoped project storage. Until the owner supplies Supabase configuration, projects remain in this browser's local storage and do not sync between devices. The site does not process online payments or collect contact messages; use the real phone and WhatsApp links.

## Connect Supabase

1. Create a Supabase project and enable email/password authentication.
2. In the Supabase SQL Editor, run `supabase/schema.sql` on a new project. Row-level security limits project reads and writes to the signed-in owner. Do not disable those policies.
3. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from the Supabase project settings. The publishable key is intended for browser use; never put a service-role or payment secret in a `VITE_` variable.
4. Restart the local development server. A Sign in control appears when both values are configured.
5. For GitHub Pages, add those same two public values as repository Actions variables named `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. The workflow passes them only to the build step.
6. Browser-only projects are not automatically imported into a new account. Export or manually preserve any important local project before signing in; then verify project access with two separate accounts.

## Before accepting messages or payments

The Contact page opens a direct phone or WhatsApp conversation. No website message form is connected. If a form is added later, route it through a server-side function with validation, rate limiting, and spam protection; do not expose credentials in the browser.

No prices have been approved or published, and no online payment is active. Agree a written scope and quote first. A payment provider must be connected server-side, and only a verified provider webhook may record a payment as paid. Never collect or store card numbers in this app.

The Privacy and Terms pages describe current behavior but are drafts and should be reviewed for the business and jurisdictions where the site will operate.