import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service role key.
 * Only import this in Server Components / Route Handlers / Server Actions.
 * Never expose this to the browser.
 *
 * Returns an untyped client — use explicit casts (as Product[], etc.) at call sites.
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Copy .env.local.example to .env.local and fill in values."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
