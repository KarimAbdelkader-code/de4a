# MongoDB collections

The `db:apply` script creates these collections and indexes in `MONGODB_DB`:

- `rsvps`, indexed by `created_at` descending.
- `wishes`, indexed by `approved` and `created_at` descending.

Application validation enforces the RSVP and guestbook field limits. Wishes are inserted with `approved: false` and are shown publicly only after moderation.
