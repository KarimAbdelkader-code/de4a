import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig, SUPABASE_CONFIGURATION_ERROR } from "./config";

let client: SupabaseClient | null;
let warned = false;

export function getSupabaseBrowserClient() {
  if (!supabaseConfig) {
    if (process.env.NODE_ENV === "development" && !warned) {
      console.error(SUPABASE_CONFIGURATION_ERROR);
      warned = true;
    }
    return null;
  }
  return client ??= createBrowserClient(supabaseConfig.url, supabaseConfig.publishableKey);
}
