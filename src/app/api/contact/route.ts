import { z } from "zod";
import { company } from "@/lib/company";

/**
 * Optional Resend-backed contact endpoint.
 *
 * Web3Forms free tier no longer allows reliable server-side / proxy submits
 * (Vercel Functions IPs get 403 / rate-limited). The public contact page posts
 * to Web3Forms from the browser instead. Keep this route only if you use
 * RESEND_API_KEY for programmatic/server mail.
 */

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().regex(/^\d{7,15}$/),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(4000),
  company_website: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.company_website?.trim()) {
    return Response.json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) {
    return Response.json(
      {
        error:
          "Server mail is not configured. The contact page should submit via Web3Forms from the browser.",
      },
      { status: 503 },
    );
  }

  const subject = `TIMC Project Enquiry — ${data.service}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    "",
    data.message,
  ].join("\n");

  try {
    const to = process.env.CONTACT_TO_EMAIL ?? company.email;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          "TIMC Website <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Contact form Resend error:", await res.text());
      return Response.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      {
        error: `Could not send your message. Please email ${company.email} directly.`,
      },
      { status: 500 },
    );
  }
}
