import postgres from "postgres";

let client: ReturnType<typeof postgres> | null;

export function getDatabase() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing");
  return client ??= postgres(process.env.DATABASE_URL, {
    ssl: "require",
    max: 1,
    prepare: false,
    connect_timeout: 10,
  });
}
