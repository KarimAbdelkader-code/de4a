import { psql } from "./postgres.mjs";

psql(["-f", "supabase/schema.sql"], { stdio: "inherit" });
