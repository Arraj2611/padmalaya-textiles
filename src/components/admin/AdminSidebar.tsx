"use client";

import { usePathname, useRouter } from "next/navigation";
import { adminLogout } from "@/app/actions/admin";
import type { SessionPayload } from "@/lib/auth";

const links = [
  { href: "/admin",            label: "Dashboard", icon: "▦" },
  { href: "/admin/products",   label: "Products",  icon: "⊞" },
  { href: "/admin/enquiries",  label: "Enquiries", icon: "✉" },
];

const sidebar: React.CSSProperties = {
  width: 220,
  minHeight: "100vh",
  background: "#0d281f",
  display: "flex",
  flexDirection: "column",
  padding: "28px 0 24px",
  flexShrink: 0,
};

export default function AdminSidebar({ session }: { session: SessionPayload }) {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    await adminLogout();
    router.push("/admin/login");
  }

  return (
    <aside style={sidebar}>
      {/* Brand */}
      <div style={{ padding: "0 22px 28px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <p style={{ fontSize: 8, letterSpacing: 3, color: "#b8955c", fontWeight: 800, marginBottom: 4 }}>
          PADMALAYA
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", fontWeight: 500 }}>Admin</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "20px 12px" }}>
        {links.map((l) => {
          const active = pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href));
          return (
            <a
              key={l.href}
              href={l.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 10,
                marginBottom: 4,
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                color: active ? "#fff" : "rgba(255,255,255,.55)",
                background: active ? "rgba(255,255,255,.10)" : "transparent",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 15, opacity: 0.8 }}>{l.icon}</span>
              {l.label}
            </a>
          );
        })}
      </nav>

      {/* User + logout */}
      <div style={{ padding: "16px 22px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 10, wordBreak: "break-all" }}>
          {session.email}
        </p>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "9px 0",
            background: "rgba(255,255,255,.07)",
            border: "none",
            borderRadius: 8,
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
