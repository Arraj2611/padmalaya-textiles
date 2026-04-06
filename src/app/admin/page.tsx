import { createServerClient } from "@/lib/supabase-server";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

async function getDashboardData() {
  try {
    const supabase = createServerClient();

    const [
      { count: totalEnquiries },
      { count: newEnquiries },
      { count: totalProducts },
      { data: recentEnquiries },
      { data: enquiriesOverTime },
    ] = await Promise.all([
      supabase.from("enquiries").select("*", { count: "exact", head: true }),
      supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase
        .from("enquiries")
        .select("id, name, email, product_interest, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("enquiries")
        .select("created_at, product_interest")
        .order("created_at", { ascending: true })
        .limit(200),
    ]);

    return {
      totalEnquiries: totalEnquiries ?? 0,
      newEnquiries:   newEnquiries ?? 0,
      totalProducts:  totalProducts ?? 0,
      recentEnquiries: recentEnquiries ?? [],
      enquiriesOverTime: enquiriesOverTime ?? [],
    };
  } catch {
    return {
      totalEnquiries: 0, newEnquiries: 0, totalProducts: 0,
      recentEnquiries: [], enquiriesOverTime: [],
    };
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData();
  return <AdminDashboardClient {...data} />;
}
