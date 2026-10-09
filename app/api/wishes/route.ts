import { NextResponse } from "next/server";
import { describeDatabaseError, getDatabase } from "@/lib/database";
import type { Wish } from "@/lib/database-types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const database = await getDatabase();
    const wishes = await database.collection<Wish>("wishes")
      .find({ approved: true }, { projection: { _id: 0, id: 1, name: 1, message: 1, created_at: 1 } })
      .sort({ created_at: -1 })
      .limit(12)
      .toArray();
    return NextResponse.json(wishes);
  } catch (error) {
    console.error("Wishes query failed", {
      error: describeDatabaseError(error),
      mongodbUriConfigured: Boolean(process.env.MONGODB_URI),
      mongodbDatabase: process.env.MONGODB_DB || "invitation",
    });
    return NextResponse.json({ error: "Guestbook unavailable" }, { status: 503 });
  }
}
