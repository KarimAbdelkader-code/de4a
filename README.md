# Mostafa & Roaa — Digital Engagement Invitation

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

## MongoDB Atlas

Copy `.env.example` to `.env.local` and set `MONGODB_URI` to your MongoDB Atlas connection string.

```bash
cp .env.example .env.local
npm run db:apply
```

`npm run db:apply` creates the required collections and indexes. New guestbook wishes are stored as pending and only approved wishes are shown publicly.

The private `/admin` route lists every RSVP and wish. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`; these values stay server-only and are enforced before the route renders.

# de4a
