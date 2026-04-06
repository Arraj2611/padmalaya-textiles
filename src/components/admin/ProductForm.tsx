"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct, uploadProductImage } from "@/app/actions/products";
import type { Product } from "@/lib/supabase-types";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1px solid rgba(36,61,54,.12)",
  background: "#F5F8F7",
  fontSize: 13,
  color: "#14221e",
  outline: "none",
  fontFamily: "inherit",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1,
  color: "#2d4a42", marginBottom: 6, textTransform: "uppercase" as const,
};
const rowStyle: React.CSSProperties = { marginBottom: 18 };

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

export default function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name:          product?.name          ?? "",
    slug:          product?.slug          ?? "",
    description:   product?.description   ?? "",
    size:          product?.size          ?? "",
    weight:        product?.weight        ?? "",
    tag:           product?.tag           ?? "",
    image_url:     product?.image_url     ?? "",
    is_featured:   product?.is_featured   ?? false,
    display_order: product?.display_order ?? 0,
  });

  const [saving,   setSaving]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error,    setError]    = useState("");

  function set(field: string, value: string | boolean | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadProductImage(fd);
    if (result.success && result.url) {
      set("image_url", result.url);
    } else {
      setError(result.error ?? "Upload failed");
    }
    setUploading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        display_order: Number(form.display_order),
      };

      const result = mode === "create"
        ? await createProduct(payload)
        : await updateProduct(product!.id, payload);

      if (result.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        setError(result.error ?? "Save failed");
      }
    } catch {
      setError("Unexpected error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave}>
      {/* Row: Name + Slug */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
        <div>
          <label style={labelStyle}>Product name *</label>
          <input
            value={form.name}
            onChange={(e) => {
              set("name", e.target.value);
              if (mode === "create") set("slug", autoSlug(e.target.value));
            }}
            style={inputStyle}
            placeholder="Classic Terry Bath Towel"
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Slug *</label>
          <input
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            style={inputStyle}
            placeholder="classic-terry-bath-towel"
            required
            pattern="[a-z0-9-]+"
          />
        </div>
      </div>

      {/* Description */}
      <div style={rowStyle}>
        <label style={labelStyle}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Product description…"
        />
      </div>

      {/* Row: Size + Weight + Tag */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 18 }}>
        <div>
          <label style={labelStyle}>Size</label>
          <input value={form.size} onChange={(e) => set("size", e.target.value)} style={inputStyle} placeholder="70×140 cm" />
        </div>
        <div>
          <label style={labelStyle}>Weight</label>
          <input value={form.weight} onChange={(e) => set("weight", e.target.value)} style={inputStyle} placeholder="500 GSM" />
        </div>
        <div>
          <label style={labelStyle}>Tag</label>
          <input value={form.tag} onChange={(e) => set("tag", e.target.value)} style={inputStyle} placeholder="Bestseller" />
        </div>
      </div>

      {/* Row: Order + Featured */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
        <div>
          <label style={labelStyle}>Display order</label>
          <input
            type="number"
            value={form.display_order}
            onChange={(e) => set("display_order", e.target.value)}
            style={inputStyle}
            min={0}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 2 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13, color: "#2d4a42", fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => set("is_featured", e.target.checked)}
              style={{ width: 16, height: 16 }}
            />
            Featured product
          </label>
        </div>
      </div>

      {/* Image */}
      <div style={rowStyle}>
        <label style={labelStyle}>Product image</label>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
          {form.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.image_url}
              alt="Preview"
              style={{ width: 100, height: 75, objectFit: "cover", borderRadius: 10, border: "1px solid rgba(36,61,54,.1)" }}
              referrerPolicy="no-referrer"
            />
          )}
          <div style={{ flex: 1, minWidth: 200 }}>
            <input
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
              style={{ ...inputStyle, marginBottom: 8 }}
              placeholder="https://images.unsplash.com/…"
            />
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{
                padding: "8px 16px", background: "#EEF3F1", border: "none", borderRadius: 8,
                fontSize: 12, fontWeight: 600, color: "#1e4d3f", cursor: "pointer",
              }}
            >
              {uploading ? "Uploading…" : "Upload image"}
            </button>
          </div>
        </div>
      </div>

      {error && <p style={{ fontSize: 13, color: "#c0392b", marginBottom: 16 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "13px 32px", background: saving ? "#2d4a42" : "#0d281f",
            color: "#fff", border: "none", borderRadius: 50,
            fontWeight: 700, fontSize: 13, cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Saving…" : mode === "create" ? "Create product" : "Save changes"}
        </button>
        <a
          href="/admin/products"
          style={{
            padding: "13px 24px", background: "#f0f2f1", borderRadius: 50,
            fontWeight: 600, fontSize: 13, color: "#6b7280", textDecoration: "none",
          }}
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
