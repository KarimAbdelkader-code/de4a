# Karim & Salma — Digital Engagement Invitation

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase

Copy `.env.example` to `.env.local` and set the project URL, publishable key (or legacy anon key), server-only Supabase secret key, and the **Session Pooler** Postgres connection string from Supabase’s Connect panel. The direct `db.<project-ref>.supabase.co` endpoint requires IPv6 and will not work on IPv4-only networks. Never expose `SUPABASE_SECRET_KEY` or a service-role key to the browser.

```bash
cp .env.example .env.local
npm run db:apply
```

`schema.sql` is idempotent: it preserves existing rows, enables RLS, and applies the minimum public grants. New guestbook wishes require moderation in the Supabase dashboard before they appear publicly.

The private `/admin` route lists every RSVP and wish. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`; these values stay server-only and are enforced before the route renders.
