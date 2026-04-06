import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <a href="/admin/products" style={{ fontSize: 12, color: "#6b7280", textDecoration: "none" }}>
          ← Products
        </a>
        <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 26, color: "#14221e", margin: "8px 0 0" }}>
          Add product
        </h1>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: "32px 36px", boxShadow: "0 2px 12px rgba(13,40,31,.06)", maxWidth: 720 }}>
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
