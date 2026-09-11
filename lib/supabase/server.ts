import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig, SUPABASE_CONFIGURATION_ERROR } from "./config";

let client: SupabaseClient | null;

export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serverKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = serverKey ?? supabaseConfig?.publishableKey;

  if (!url || !key) {
    if (process.env.NODE_ENV === "development") console.error(SUPABASE_CONFIGURATION_ERROR);
    return null;
  }
  return client ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
