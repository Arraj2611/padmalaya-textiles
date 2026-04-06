import { createServerClient } from "@/lib/supabase-server";
import type { Product } from "@/lib/supabase-types";
import ProductsClient from "@/components/admin/ProductsClient";

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("display_order", { ascending: true });
    return (data ?? []) as Product[];
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await getProducts();
  return <ProductsClient products={products} />;
}
