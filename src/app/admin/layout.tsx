import { requireAuth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — Padmalaya Textiles" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f0f2f1",
        fontFamily: "var(--font-outfit), sans-serif",
      }}
    >
      <AdminSidebar session={session} />
      <main style={{ flex: 1, minWidth: 0, padding: "32px 36px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
