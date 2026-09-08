import { execFileSync } from "node:child_process";

export const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new Error("DATABASE_URL is missing. Copy the Supabase Session Pooler URI into .env.local first.");

const connection = new URL(databaseUrl);
const environment = {
  ...process.env,
  PGHOST: connection.hostname,
  PGPORT: connection.port || "5432",
  PGUSER: decodeURIComponent(connection.username),
  PGPASSWORD: decodeURIComponent(connection.password),
  PGDATABASE: connection.pathname.slice(1) || "postgres",
  PGSSLMODE: "require",
  PGCONNECT_TIMEOUT: "10",
};

export function psql(args, options = {}) {
  try {
    return execFileSync("psql", ["-X", "-v", "ON_ERROR_STOP=1", ...args], {
      encoding: "utf8",
      env: environment,
      ...options,
    })?.trim();
  } catch (error) {
    if (connection.hostname.startsWith("db.")) {
      console.error("The Supabase direct database endpoint requires IPv6. Replace DATABASE_URL with the Session Pooler URI from Project → Connect → Session pooler.");
    }
    throw error;
  }
}
