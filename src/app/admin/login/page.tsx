"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/app/actions/admin";
import { capture } from "@/lib/analytics";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 12,
  border: "1px solid rgba(36,61,54,.15)",
  background: "#F5F8F7",
  boxShadow: "inset 3px 3px 8px rgba(13,40,31,.06), inset -2px -2px 6px rgba(255,255,255,.7)",
  fontSize: 14,
  color: "#14221e",
  outline: "none",
  fontFamily: "inherit",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await adminLogin({ email, password });
      if (result.success) {
        capture("admin_logged_in", { email });
        router.push("/admin");
        router.refresh();
      } else {
        capture("admin_login_failed", { email, reason: result.error ?? "Login failed" });
        setError(result.error ?? "Login failed");
      }
    } catch {
      capture("admin_login_failed", { email, reason: "unexpected_error" });
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #EEF3F1 0%, #F3F6F4 60%, #F0F4F2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "var(--font-outfit), sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 24,
          padding: "48px 40px",
          boxShadow: "0 24px 64px rgba(13,40,31,.10), inset 0 0 0 1px rgba(36,61,54,.1)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{ fontSize: 10, letterSpacing: 4, fontWeight: 800, color: "#b8955c", marginBottom: 6 }}>
            PADMALAYA TEXTILES
          </p>
          <h1
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontSize: 22,
              color: "#14221e",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Admin Portal
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#2d4a42", marginBottom: 6, textTransform: "uppercase" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="admin@padmalaya.example"
              required
              autoComplete="email"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#2d4a42", marginBottom: 6, textTransform: "uppercase" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: "#c0392b", marginBottom: 16, textAlign: "center" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#2d4a42" : "#0d281f",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: 14,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
