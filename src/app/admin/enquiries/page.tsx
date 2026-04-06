import { createServerClient } from "@/lib/supabase-server";
import type { Enquiry } from "@/lib/supabase-types";
import EnquiriesClient from "@/components/admin/EnquiriesClient";

interface Props {
  searchParams: Promise<{ status?: string; page?: string }>;
}

async function getEnquiries(status: string, page: number) {
  try {
    const supabase = createServerClient();
    const pageSize = 20;
    const from = (page - 1) * pageSize;
    let query = supabase
      .from("enquiries")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);
    if (status !== "all") query = query.eq("status", status);
    const { data, count } = await query;
    return { data: (data ?? []) as Enquiry[], count: count ?? 0 };
  } catch {
    return { data: [], count: 0 };
  }
}

export default async function EnquiriesPage({ searchParams }: Props) {
  const { status = "all", page = "1" } = await searchParams;
  const { data, count } = await getEnquiries(status, Number(page));

  return <EnquiriesClient enquiries={data} total={count} status={status} page={Number(page)} />;
}
