import { createServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import type { Product } from "@/lib/supabase-types";
import ProductForm from "@/components/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase.from("products").select("*").eq("id", id).single();
    return data as Product | null;
  } catch {
    return null;
  }
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/products" style={{ fontSize: 12, color: "#6b7280", textDecoration: "none" }}>
          ← Products
        </a>
        <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 26, color: "#14221e", margin: "8px 0 0" }}>
          Edit product
        </h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{product.name}</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: "32px 36px", boxShadow: "0 2px 12px rgba(13,40,31,.06)", maxWidth: 720 }}>
        <ProductForm product={product} mode="edit" />
      </div>
    </div>
  );
}
