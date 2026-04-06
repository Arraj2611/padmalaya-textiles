"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase-server";
import { verifyPassword, createSession, clearSession } from "@/lib/auth";

// Local shape for the legacy password-based admin_users table.
// The global AdminUser type now uses clerk_user_id; this interface
// covers the older columns queried by the password login flow.
interface LegacyAdminUser {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "super_admin";
  name: string | null;
}

const loginSchema = z.object({
  email:    z.email("Invalid email"),
  password: z.string().min(1, "Password required"),
});

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function adminLogin(data: { email: string; password: string }): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const { email, password } = parsed.data;

  try {
    const supabase = createServerClient();
    const { data: rawUser, error } = await supabase
      .from("admin_users")
      .select("id, email, password_hash, role, name")
      .eq("email", email)
      .single();

    const user = rawUser as LegacyAdminUser | null;

    if (error || !rawUser || !user) {
      return { success: false, error: "Invalid credentials" };
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return { success: false, error: "Invalid credentials" };
    }

    await createSession({ userId: user.id, email: user.email, role: user.role });
    return { success: true };
  } catch {
    return { success: false, error: "Service unavailable — check Supabase configuration" };
  }
}

export async function adminLogout(): Promise<void> {
  await clearSession();
  redirect("/admin/login");
}
