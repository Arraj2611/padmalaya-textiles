import { createServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import type { Enquiry } from "@/lib/supabase-types";
import EnquiryDetailClient from "@/components/admin/EnquiryDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

async function getEnquiry(id: string): Promise<Enquiry | null> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase.from("enquiries").select("*").eq("id", id).single();
    return data as Enquiry | null;
  } catch {
    return null;
  }
}

export default async function EnquiryDetailPage({ params }: Props) {
  const { id } = await params;
  const enquiry = await getEnquiry(id);
  if (!enquiry) notFound();

  return <EnquiryDetailClient enquiry={enquiry} />;
}
