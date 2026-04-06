"use server";

import { z } from "zod";
import { createServerClient } from "@/lib/supabase-server";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { customerAutoResponse, adminNotification } from "@/lib/email-templates";

const schema = z.object({
  name:             z.string().min(2, "Name must be at least 2 characters"),
  email:            z.email("Invalid email address"),
  company:          z.string().optional(),
  phone:            z.string().optional(),
  product_interest: z.string().min(1, "Please select a product"),
  message:          z.string().min(10, "Message must be at least 10 characters"),
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

  const { name, email, company, phone, product_interest, message } = parsed.data;

  // 2. Insert into Supabase
  try {
    const supabase = createServerClient();
    const { error: dbError } = await supabase.from("enquiries").insert({
      name,
      email,
      company:          company ?? null,
      phone:            phone ?? null,
      product_interest,
      message,
      status: "new",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      // Don't fail the whole request — still try to send emails
    }
  } catch (err) {
    console.error("Supabase unavailable:", err);
  }

  // 3. Send emails (best-effort — don't fail form if emails fail)
  const emailsEnabled = Boolean(process.env.RESEND_API_KEY);

  if (emailsEnabled) {
    await Promise.allSettled([
      // Auto-response to customer
      resend.emails.send({
        from:    FROM_EMAIL,
        to:      email,
        subject: `Enquiry received — Padmalaya Textiles`,
        html:    customerAutoResponse({ name, product_interest, message }),
      }),
      // Admin notification
      resend.emails.send({
        from:    FROM_EMAIL,
        to:      ADMIN_EMAIL,
        subject: `New enquiry: ${name} — ${product_interest}`,
        html:    adminNotification({ name, email, company, phone, product_interest, message }),
      }),
    ]);
  }

  return { success: true };
}
