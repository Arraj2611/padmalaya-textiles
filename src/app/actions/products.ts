"use server";

import { z } from "zod";
import { createServerClient } from "@/lib/supabase-server";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const productSchema = z.object({
  name:          z.string().min(1, "Name required"),
  slug:          z.string().min(1, "Slug required").regex(/^[a-z0-9-]+$/, "Slug: lowercase, numbers, hyphens only"),
  description:   z.string().optional(),
  size:          z.string().optional(),
  weight:        z.string().optional(),
  tag:           z.string().optional(),
  image_url:     z.string().optional(),
  is_featured:   z.boolean().optional(),
  display_order: z.number().int().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;

export interface ActionResult {
  success: boolean;
  error?: string;
  id?: string;
}

export async function createProduct(data: ProductInput): Promise<ActionResult> {
  await requireAuth();
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  try {
    const supabase = createServerClient();
    const { data: row, error } = await supabase
      .from("products")
      .insert({ ...parsed.data, is_featured: parsed.data.is_featured ?? false, display_order: parsed.data.display_order ?? 0 })
      .select("id")
      .single();

    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true, id: row.id };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function updateProduct(id: string, data: ProductInput): Promise<ActionResult> {
  await requireAuth();
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message };

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("products").update(parsed.data).eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAuth();
  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

/** Upload an image to Supabase Storage and return the public URL */
export async function uploadProductImage(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  await requireAuth();
  const file = formData.get("file") as File | null;
  if (!file) return { success: false, error: "No file provided" };

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  try {
    const supabase = createServerClient();
    const bytes = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, bytes, { contentType: file.type, upsert: false });

    if (uploadError) return { success: false, error: uploadError.message };

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return { success: true, url: data.publicUrl };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
