import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = "Padmalaya Textiles <exports@padmalaya.example>";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "exports@padmalaya.example";
