import { Db, MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient> | null = null;

export async function getDatabase(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing");
  clientPromise ??= new MongoClient(uri, { serverSelectionTimeoutMS: 10_000 }).connect();
  return (await clientPromise).db(process.env.MONGODB_DB || "invitation");
}
