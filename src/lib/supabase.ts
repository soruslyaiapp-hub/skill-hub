// Optional upvotes backend. Nothing loads unless both variables are set.
import type { SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const votesEnabled = Boolean(url && key);

let client: Promise<SupabaseClient> | null = null;

/** Lazy-loads supabase-js in the browser, so pages without votes ship no extra code. */
export function getSupabase(): Promise<SupabaseClient> | null {
  if (!votesEnabled || typeof window === "undefined") return null;
  client ??= import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(url!, key!, { auth: { flowType: "pkce", persistSession: true, detectSessionInUrl: true } }),
  );
  return client;
}
