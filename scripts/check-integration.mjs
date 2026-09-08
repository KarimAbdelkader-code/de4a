import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { psql } from "./postgres.mjs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
assert.ok(url && key, "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local");

const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const attendingId = randomUUID();
const decliningId = randomUUID();
const wishId = randomUUID();
const sql = (statement) => psql(["-At", "-c", statement]);

assert.equal(sql("select 1"), "1", "Database preflight failed");
sql("delete from public.rsvps where name='Integration Test'; delete from public.wishes where name='Integration Test'");

try {
  assert.equal((await db.from("rsvps").insert({ id: attendingId, name: "Integration Test", guests: 2, attending: "yes" })).error, null);
  assert.equal((await db.from("rsvps").insert({ id: decliningId, name: "Integration Test", guests: 0, attending: "no" })).error, null);
  assert.ok((await db.from("rsvps").insert({ name: "Integration Test", guests: 11, attending: "yes" })).error, "Invalid guest count should fail");
  assert.equal(sql(`select guests || ':' || attending from public.rsvps where id in ('${attendingId}','${decliningId}') order by guests desc`), "2:yes\n0:no");

  assert.equal((await db.from("wishes").insert({ id: wishId, name: "Integration Test", message: "Wishing you a beautiful beginning." })).error, null);
  assert.equal(sql(`select approved from public.wishes where id='${wishId}'`), "f");
  assert.deepEqual((await db.from("wishes").select("id").eq("id", wishId)).data, []);
  sql(`update public.wishes set approved=true where id='${wishId}'`);
  assert.equal((await db.from("wishes").select("id").eq("id", wishId).single()).data?.id, wishId);

  console.log("Live RSVP, validation, moderation, and approved guestbook reads verified.");
} finally {
  try {
    sql(`delete from public.rsvps where id in ('${attendingId}','${decliningId}'); delete from public.wishes where id='${wishId}'`);
  } catch {
    console.error("Integration cleanup failed; remove rows named 'Integration Test' after database access is restored.");
  }
}
