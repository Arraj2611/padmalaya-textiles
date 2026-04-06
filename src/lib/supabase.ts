import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase-types";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Browser-side Supabase client (anon key). Safe to import in client components. */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnon);
