"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/actions/products";
import type { Product } from "@/lib/supabase-types";

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: "24px 28px",
  boxShadow: "0 2px 12px rgba(13,40,31,.06)",
};

export default function ProductsClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await deleteProduct(id);
    router.refresh();
    setDeleting(null);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 26, color: "#14221e", margin: 0 }}>Products</h1>
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{products.length} products</p>
        </div>
        <a
          href="/admin/products/new"
          style={{
            background: "#0d281f", color: "#fff", padding: "11px 24px",
            borderRadius: 50, fontWeight: 700, fontSize: 13, textDecoration: "none",
          }}
        >
          + Add product
        </a>
      </div>

      <div style={card}>
        {products.length === 0 ? (
          <p style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", padding: "40px 0" }}>
            No products yet. <a href="/admin/products/new" style={{ color: "#1e4d3f" }}>Add one →</a>
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                {["Image", "Name", "Size", "Weight", "Tag", "Order", "Actions"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f9f9f9" }}>
                  <td style={{ padding: "10px 12px" }}>
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image_url} alt={p.name} style={{ width: 52, height: 40, objectFit: "cover", borderRadius: 8 }} referrerPolicy="no-referrer" />
                    ) : (
                      <div style={{ width: 52, height: 40, background: "#f0f2f1", borderRadius: 8 }} />
                    )}
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, color: "#14221e" }}>{p.name}</td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: "#6b7280" }}>{p.size ?? "—"}</td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: "#6b7280" }}>{p.weight ?? "—"}</td>
                  <td style={{ padding: "10px 12px" }}>
                    {p.tag && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#7a5f32", background: "rgba(184,149,92,.12)", padding: "3px 8px", borderRadius: 20 }}>
                        {p.tag}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: "#9ca3af" }}>{p.display_order}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <a
                        href={`/admin/products/${p.id}`}
                        style={{ fontSize: 12, fontWeight: 600, color: "#1e4d3f", textDecoration: "none", padding: "5px 12px", background: "#EEF3F1", borderRadius: 8 }}
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleting === p.id}
                        style={{ fontSize: 12, fontWeight: 600, color: "#c0392b", background: "rgba(192,57,43,.08)", border: "none", padding: "5px 12px", borderRadius: 8, cursor: "pointer" }}
                      >
                        {deleting === p.id ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
