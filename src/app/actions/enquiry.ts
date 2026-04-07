"use server";

import { z } from "zod";
import { createServerClient } from "@/lib/supabase-server";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { customerAutoResponse, adminNotification } from "@/lib/email-templates";
import { getPostHogClient } from "@/lib/posthog-server";

const schema = z.object({
  name:              z.string().min(2, "Name must be at least 2 characters"),
  email:             z.email("Invalid email address"),
  company:           z.string().optional(),
  phone:             z.string().optional(),
  product_interest:  z.string().optional(), // kept for email templates; derived from selected_products
  selected_products: z.array(z.string()).optional(),
  message:           z.string().min(10, "Message must be at least 10 characters"),
  clerk_user_id:     z.string().optional(),
});

export type EnquiryInput = z.infer<typeof schema>;

export interface EnquiryResult {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof EnquiryInput, string>>;
}

export async function submitEnquiry(data: EnquiryInput): Promise<EnquiryResult> {
  // 1. Validate
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof EnquiryInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof EnquiryInput;
      if (field) fieldErrors[field] = issue.message;
    }
    return { success: false, fieldErrors };
  }

  const { name, email, company, phone, message, selected_products, clerk_user_id } = parsed.data;
  const product_interest = parsed.data.product_interest
    ?? (selected_products?.join(", ") || "General enquiry");

  // 2. Insert into Supabase
  try {
    const supabase = createServerClient();
    const { error: dbError } = await supabase.from("enquiries").insert({
      name,
      email,
      company:           company ?? null,
      message,
      selected_products: selected_products ?? [],
      clerk_user_id:     clerk_user_id ?? null,
      status:            "new",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      // Don't fail the whole request — still try to send emails
    }
  } catch (err) {
    console.error("Supabase unavailable:", err);
  }

  // 3. Send emails (best-effort — don't fail form if emails fail)
  if (process.env.RESEND_API_KEY) {
    await Promise.allSettled([
      resend.emails.send({
        from:    FROM_EMAIL,
        to:      email,
        subject: "Enquiry received — Padmalaya Textiles",
        html:    customerAutoResponse({ name, product_interest, message }),
      }),
      resend.emails.send({
        from:    FROM_EMAIL,
        to:      ADMIN_EMAIL,
        subject: `New enquiry: ${name} — ${product_interest}`,
        html:    adminNotification({ name, email, company, phone, product_interest, message }),
      }),
    ]);
  }

  // 4. Track server-side enquiry_submitted event
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: email,
    event: "enquiry_submitted",
    properties: {
      name,
      company: company ?? null,
      product_interest,
      product_count: selected_products?.length ?? 0,
      selected_products: selected_products ?? [],
      has_clerk_user: Boolean(clerk_user_id),
    },
  });
  await posthog.shutdown();

  return { success: true };
}
