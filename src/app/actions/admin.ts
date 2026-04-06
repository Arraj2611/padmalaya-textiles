"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase-server";
import { verifyPassword, createSession, clearSession } from "@/lib/auth";
import type { AdminUser } from "@/lib/supabase-types";

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

    const user = rawUser as AdminUser | null;

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
