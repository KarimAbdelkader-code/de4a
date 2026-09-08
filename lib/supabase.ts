import { createBrowserClient } from "@supabase/ssr";

export type Wish = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createBrowserClient(url, key) : null;
}
