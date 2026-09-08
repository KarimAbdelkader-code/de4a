"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { rsvpSchema, wishSchema } from "@/lib/validation";

export type FormResult = { ok: boolean; message: string };

export async function submitRsvp(input: unknown): Promise<FormResult> {
  const parsed = rsvpSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  const client = getSupabaseServerClient();
  if (!client) return { ok: false, message: "RSVP is not connected yet. Please try again later." };
  const { error } = await client.from("rsvps").insert({ ...parsed.data, message: parsed.data.message || null });
  return error
    ? { ok: false, message: "We could not save your RSVP. Please try again." }
    : { ok: true, message: "Thank you — your reply has been received." };
}

export async function submitWish(input: unknown): Promise<FormResult> {
  const parsed = wishSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  const client = getSupabaseServerClient();
  if (!client) return { ok: false, message: "The guestbook is not connected yet. Please try again later." };
  const { error } = await client.from("wishes").insert(parsed.data);
  return error
    ? { ok: false, message: "We could not save your wish. Please try again." }
    : { ok: true, message: "Your wish is now part of our story." };
}
