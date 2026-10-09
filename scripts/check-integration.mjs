import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { MongoClient } from "mongodb";

const attendingId = randomUUID();
const decliningId = randomUUID();
const wishId = randomUUID();
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing. Add a MongoDB Atlas connection string to .env.local first.");

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10_000 });
await client.connect();
const database = client.db(process.env.MONGODB_DB || "invitation");
const rsvps = database.collection("rsvps");
const wishes = database.collection("wishes");
await rsvps.deleteMany({ name: "Integration Test" });
await wishes.deleteMany({ name: "Integration Test" });

try {
  await rsvps.insertMany([
    { id: attendingId, name: "Integration Test", guests: 2, attending: "yes", message: null, created_at: new Date() },
    { id: decliningId, name: "Integration Test", guests: 0, attending: "no", message: null, created_at: new Date() },
  ]);
  const savedRsvps = await rsvps.find({ id: { $in: [attendingId, decliningId] } }).sort({ guests: -1 }).toArray();
  assert.deepEqual(savedRsvps.map(({ guests, attending }) => `${guests}:${attending}`), ["2:yes", "0:no"]);

  await wishes.insertOne({ id: wishId, name: "Integration Test", message: "Wishing you a beautiful beginning.", approved: false, created_at: new Date() });
  assert.equal((await wishes.findOne({ id: wishId })).approved, false);
  await wishes.updateOne({ id: wishId }, { $set: { approved: true } });
  assert.equal((await wishes.findOne({ id: wishId, approved: true })).id, wishId);

  console.log("Live MongoDB RSVP, moderation, and approved guestbook reads verified.");
} finally {
  await rsvps.deleteMany({ id: { $in: [attendingId, decliningId] } });
  await wishes.deleteOne({ id: wishId });
  await client.close();
}
