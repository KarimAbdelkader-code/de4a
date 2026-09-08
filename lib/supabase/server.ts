import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig, SUPABASE_CONFIGURATION_ERROR } from "./config";

let client: SupabaseClient | null;

export function getSupabaseServerClient() {
  if (!supabaseConfig) {
    if (process.env.NODE_ENV === "development") console.error(SUPABASE_CONFIGURATION_ERROR);
    return null;
  }
  return client ??= createClient(supabaseConfig.url, supabaseConfig.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
