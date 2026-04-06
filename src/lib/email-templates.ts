const brand = {
  ink:     "#14221e",
  inkSoft: "#2d4a42",
  forest:  "#0d281f",
  pearl:   "#F3F6F4",
  brass:   "#b8955c",
  pine:    "#243D36",
};

interface CustomerEmailData {
  name: string;
  product_interest: string;
  message: string;
}

interface AdminEmailData {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  product_interest: string;
  message: string;
}

export function customerAutoResponse({ name, product_interest, message }: CustomerEmailData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Enquiry received — Padmalaya Textiles</title>
</head>
<body style="margin:0;padding:0;background:${brand.pearl};font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${brand.pearl};padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(13,40,31,.08);">

      <!-- Header -->
      <tr>
        <td style="background:${brand.forest};padding:32px 40px;text-align:center;">
          <p style="margin:0;font-size:11px;letter-spacing:4px;color:${brand.brass};font-weight:700;">PADMALAYA TEXTILES</p>
          <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,.65);font-weight:400;">Solapur, India · Terry Towel Manufacturer</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 40px 32px;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;font-weight:800;color:${brand.brass};">ENQUIRY RECEIVED</p>
          <h1 style="margin:0 0 20px;font-size:26px;color:${brand.ink};font-weight:600;line-height:1.2;">Thank you, ${name}.</h1>
          <p style="margin:0 0 16px;font-size:15px;color:${brand.inkSoft};line-height:1.7;">
            We've received your enquiry about <strong style="color:${brand.pine};">${product_interest}</strong> and will respond with pricing bands and lead times within <strong>24 business hours</strong>.
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:${brand.inkSoft};line-height:1.7;">
            Our export desk reviews each enquiry personally — you'll hear from a real person, not a bot.
          </p>

          <!-- Quoted message -->
          <div style="background:${brand.pearl};border-left:3px solid ${brand.brass};border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:32px;">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;font-weight:700;color:${brand.brass};">YOUR MESSAGE</p>
            <p style="margin:0;font-size:13px;color:${brand.inkSoft};line-height:1.65;">${message.replace(/\n/g, "<br/>")}</p>
          </div>

          <!-- CTA -->
          <p style="margin:0 0 8px;font-size:14px;color:${brand.inkSoft};">Need to add anything?</p>
          <a href="mailto:exports@padmalaya.example" style="display:inline-block;background:${brand.forest};color:#fff;padding:14px 28px;border-radius:50px;font-size:13px;font-weight:700;text-decoration:none;">Reply to this email</a>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:24px 40px;border-top:1px solid rgba(13,40,31,.06);text-align:center;">
          <p style="margin:0;font-size:12px;color:rgba(45,74,66,.5);">© 2026 Padmalaya Textiles · Solapur, Maharashtra, India</p>
          <p style="margin:4px 0 0;font-size:12px;color:rgba(45,74,66,.5);">ISO-aligned · OEKO-TEX certified yarns</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function adminNotification({
  name, email, company, phone, product_interest, message,
}: AdminEmailData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New enquiry — Padmalaya Admin</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 20px;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.06);">

      <tr>
        <td style="background:${brand.pine};padding:20px 32px;">
          <p style="margin:0;font-size:11px;letter-spacing:3px;color:${brand.brass};font-weight:700;">PADMALAYA ADMIN</p>
          <h2 style="margin:6px 0 0;font-size:18px;color:#fff;font-weight:600;">New enquiry received</h2>
        </td>
      </tr>

      <tr>
        <td style="padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Name", name)}
            ${row("Email", `<a href="mailto:${email}" style="color:${brand.pine};">${email}</a>`)}
            ${company ? row("Company", company) : ""}
            ${phone ? row("Phone", phone) : ""}
            ${row("Product interest", `<strong>${product_interest}</strong>`)}
          </table>

          <div style="margin:20px 0;background:${brand.pearl};border-radius:8px;padding:16px 20px;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:2px;font-weight:700;color:${brand.brass};">MESSAGE</p>
            <p style="margin:0;font-size:14px;color:${brand.inkSoft};line-height:1.65;">${message.replace(/\n/g, "<br/>")}</p>
          </div>

          <a href="mailto:${email}?subject=Re: Enquiry about ${encodeURIComponent(product_interest)}" style="display:inline-block;background:${brand.forest};color:#fff;padding:12px 24px;border-radius:50px;font-size:13px;font-weight:700;text-decoration:none;margin-top:8px;">Reply to ${name}</a>
        </td>
      </tr>

      <tr>
        <td style="padding:16px 32px;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0;font-size:11px;color:#9ca3af;">Padmalaya Textiles · Admin Notification</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;font-size:12px;font-weight:700;color:#6b7280;width:130px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;font-size:14px;color:#111827;">${value}</td>
  </tr>`;
}
