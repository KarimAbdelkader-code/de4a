import { MongoClient } from "mongodb";

if (!process.argv.includes("--yes")) {
  console.error("Refusing to clear the database without the --yes flag.");
  console.error("Run: npm run db:clear -- --yes");
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing. Add a MongoDB Atlas connection string to .env.local first.");

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10_000 });
try {
  await client.connect();
  const database = client.db(process.env.MONGODB_DB || "invitation");
  await Promise.all([
    database.collection("rsvps").deleteMany({}),
    database.collection("wishes").deleteMany({}),
  ]);
} finally {
  await client.close();
}

console.log("Cleared all RSVP and guestbook wish data.");
