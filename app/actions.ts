"use server";

import { createClient } from "@supabase/supabase-js";
import { rsvpSchema, wishSchema } from "@/lib/validation";

type Result = { ok: boolean; message: string };

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function submitRsvp(input: unknown): Promise<Result> {
  const parsed = rsvpSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  const client = db();
  if (!client) return { ok: false, message: "RSVP is not connected yet. Please try again later." };
  const { error } = await client.from("rsvps").insert(parsed.data);
  return error
    ? { ok: false, message: "We could not save your RSVP. Please try again." }
    : { ok: true, message: "Thank you — your reply has been received." };
}

export async function submitWish(input: unknown): Promise<Result> {
  const parsed = wishSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  const client = db();
  if (!client) return { ok: false, message: "The guestbook is not connected yet. Please try again later." };
  const { error } = await client.from("wishes").insert(parsed.data);
  return error
    ? { ok: false, message: "We could not save your wish. Please try again." }
    : { ok: true, message: "Your wish is now part of our story." };
}
