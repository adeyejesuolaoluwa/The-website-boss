# Database Setup

The current website preview stores projects and simulated test receipts in the visitor's browser. Those records do not sync to another device and are not a production database.

## Supabase starter

1. Create a Supabase project and enable email authentication.
2. Open the Supabase SQL Editor and run `supabase/schema.sql`.
3. Keep row-level security enabled. The schema lets signed-in users access only their own projects and milestones. Transaction rows have a user-scoped read policy; writes should only come from trusted server code after payment-provider verification. Contact messages have no browser write policy and should be received through a server-side function with spam protection.
4. Connect the React app using the Supabase URL and publishable key in environment variables. Never put a service-role key, payment secret, or card data in the browser.
5. Replace the current `localStorage` project functions with authenticated Supabase queries, then test ownership rules using two separate accounts.
6. For real payments, create a server endpoint or Supabase Edge Function that creates the checkout session and verifies signed payment webhooks. Only the verified webhook should mark a transaction as `paid`.

The test-payment screen is deliberately disconnected from payment providers. It records clearly labeled demo receipts in local browser storage and never represents them as real payments.