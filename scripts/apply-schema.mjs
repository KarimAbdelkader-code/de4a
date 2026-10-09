import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing. Add a MongoDB Atlas connection string to .env.local first.");

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10_000 });
try {
  await client.connect();
  const database = client.db(process.env.MONGODB_DB || "invitation");
  await database.collection("rsvps").createIndex({ created_at: -1 });
  await database.collection("wishes").createIndex({ approved: 1, created_at: -1 });
  console.log(`MongoDB collections and indexes ready in ${database.databaseName}.`);
} finally {
  await client.close();
}
