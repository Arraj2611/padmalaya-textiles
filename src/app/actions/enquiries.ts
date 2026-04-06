"use server";

import { createServerClient } from "@/lib/supabase-server";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { Enquiry } from "@/lib/supabase-types";

export interface EnquiriesResult {
  success: boolean;
  data?: Enquiry[];
  count?: number;
  error?: string;
}

export async function listEnquiries(opts: {
  status?: string;
  page?: number;
  pageSize?: number;
}): Promise<EnquiriesResult> {
  await requireAuth();
  const { status, page = 1, pageSize = 20 } = opts;
  const from = (page - 1) * pageSize;

  try {
    const supabase = createServerClient();
    let query = supabase
      .from("enquiries")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;
    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Enquiry[], count: count ?? 0 };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"]
): Promise<{ success: boolean; error?: string }> {
  await requireAuth();
  try {
    const supabase = createServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("enquiries").update({ status }).eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/enquiries");
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function getEnquiry(id: string): Promise<{ success: boolean; data?: Enquiry; error?: string }> {
  await requireAuth();
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data: data as Enquiry };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
