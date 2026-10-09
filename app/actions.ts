"use server";

import { randomUUID } from "node:crypto";
import { describeDatabaseError, getDatabase } from "@/lib/database";
import { rsvpSchema, wishSchema } from "@/lib/validation";

export type FormResult = { ok: boolean; message: string };

export async function submitRsvp(input: unknown): Promise<FormResult> {
  const parsed = rsvpSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  try {
    const database = await getDatabase();
    await database.collection("rsvps").insertOne({
      id: randomUUID(),
      ...parsed.data,
      message: parsed.data.message || null,
      created_at: new Date(),
    });
    return { ok: true, message: "Thank you — your reply has been received." };
  } catch (error) {
    console.error("RSVP insert failed", {
      error: describeDatabaseError(error),
      mongodbUriConfigured: Boolean(process.env.MONGODB_URI),
      mongodbDatabase: process.env.MONGODB_DB || "invitation",
    });
    return { ok: false, message: "We could not save your RSVP. Please try again." };
  }
}

export async function submitWish(input: unknown): Promise<FormResult> {
  const parsed = wishSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  try {
    const database = await getDatabase();
    await database.collection("wishes").insertOne({
      id: randomUUID(),
      ...parsed.data,
      approved: false,
      created_at: new Date(),
    });
    return { ok: true, message: "Your wish is now part of our story." };
  } catch (error) {
    console.error("Wish insert failed", {
      error: describeDatabaseError(error),
      mongodbUriConfigured: Boolean(process.env.MONGODB_URI),
      mongodbDatabase: process.env.MONGODB_DB || "invitation",
    });
    return { ok: false, message: "We could not save your wish. Please try again." };
  }
}
