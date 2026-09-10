import { psql } from "./postgres.mjs";

if (!process.argv.includes("--yes")) {
  console.error("Refusing to clear the database without the --yes flag.");
  console.error("Run: npm run db:clear -- --yes");
  process.exit(1);
}

psql([
  "-c",
  "TRUNCATE TABLE public.rsvps, public.wishes RESTART IDENTITY;",
], { stdio: "inherit" });

console.log("Cleared all RSVP and guestbook wish data.");