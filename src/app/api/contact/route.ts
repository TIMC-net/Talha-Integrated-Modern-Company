import { z } from "zod";
import { company } from "@/lib/company";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().regex(/^\d{7,15}$/),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(4000),
  /** Honeypot — bots fill this; real users leave it empty */
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

  // Silent success for bots — no delivery, no error signal
  if (data.company_website?.trim()) {
    return Response.json({ ok: true });
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
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY?.trim();
    const resendKey = process.env.RESEND_API_KEY?.trim();

    if (web3Key) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key,
          subject,
          from_name: "TIMC Website",
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
          // Ensures reply-to is the visitor when Web3Forms supports it
          replyto: data.email,
          botcheck: false,
        }),
      });

      const raw = await res.text();
      let payload: { success?: boolean; message?: string } | null = null;
      try {
        payload = JSON.parse(raw) as { success?: boolean; message?: string };
      } catch {
        payload = null;
      }

      if (!res.ok || payload?.success === false) {
        console.error("Contact form Web3Forms error:", payload ?? raw);
        return Response.json(
          {
            error: `Could not send your message. Please email ${company.email} directly.`,
          },
          { status: 502 },
        );
      }

      return Response.json({ ok: true });
    }

    if (resendKey) {
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
    }

    return Response.json(
      {
        error:
          "Contact form is not configured. Add WEB3FORMS_ACCESS_KEY to the environment.",
      },
      { status: 503 },
    );
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
