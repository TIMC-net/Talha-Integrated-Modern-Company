import ContactPageClient from "./ContactPageClient";

/**
 * Server component: reads the Web3Forms key from env and passes it into the
 * client form. Free-tier Web3Forms only allows browser (client) submissions —
 * proxying via /api/contact is blocked (403 / rate limit / Cloudflare).
 *
 * Existing Vercel env name WEB3FORMS_ACCESS_KEY keeps working; no rename needed.
 * Web3Forms documents the access key as safe to use in client HTML/JS.
 */
export default function ContactPage() {
  const web3formsAccessKey = (
    process.env.WEB3FORMS_ACCESS_KEY ??
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
    ""
  ).trim();

  return <ContactPageClient web3formsAccessKey={web3formsAccessKey} />;
}
