import { createClient } from "@supabase/supabase-js";
import type { Database, Product } from "@/lib/supabase-types";
import { STATIC_PRODUCTS } from "@/lib/products";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const isReal = Boolean(
  supabaseUrl && !supabaseUrl.includes("placeholder") &&
  supabaseAnon && !supabaseAnon.includes("placeholder")
);

/** Typed read client — used for product queries. Null when keys are missing. */
const readClient = isReal
  ? createClient<Database>(supabaseUrl, supabaseAnon)
  : null;

/** Untyped client — used for inserts to avoid complex generic inference issues. */
const writeClient = isReal
  ? createClient(supabaseUrl, supabaseAnon)
  : null;

// ─── Helper functions ────────────────────────────────────────────

/**
 * Fetch all products ordered by display_order.
 * Falls back to STATIC_PRODUCTS when Supabase is unavailable.
 */
export async function getProducts(): Promise<Product[]> {
  if (!readClient) return STATIC_PRODUCTS as unknown as Product[];
  try {
    const { data, error } = await readClient
      .from("products")
      .select("*")
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return STATIC_PRODUCTS as unknown as Product[];
    return data as Product[];
  } catch {
    return STATIC_PRODUCTS as unknown as Product[];
  }
}

/**
 * Fetch a single product by slug.
 * Falls back to STATIC_PRODUCTS when Supabase is unavailable.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!readClient) {
    return (STATIC_PRODUCTS.find((p) => p.slug === slug) ?? null) as unknown as Product | null;
  }
  try {
    const { data, error } = await readClient
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error || !data) {
      return (STATIC_PRODUCTS.find((p) => p.slug === slug) ?? null) as unknown as Product | null;
    }
    return data as Product;
  } catch {
    return (STATIC_PRODUCTS.find((p) => p.slug === slug) ?? null) as unknown as Product | null;
  }
}

/**
 * Insert an enquiry row.
 * Falls back to console.log when Supabase is unavailable.
 */
export async function submitEnquiryToSupabase(data: {
  name: string;
  email: string;
  company?: string | null;
  message: string;
  selected_products?: string[];
  clerk_user_id?: string | null;
}): Promise<{ success: boolean; error?: string }> {
  if (!writeClient) {
    console.log("[submitEnquiry] Supabase unavailable — data:", data);
    return { success: true };
  }
  try {
    const { error } = await writeClient.from("enquiries").insert({
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      message: data.message,
      selected_products: data.selected_products ?? [],
      clerk_user_id: data.clerk_user_id ?? null,
      status: "new",
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
