/**
 * Maps URLs from the discarded PHP site (trsco.net) onto the current TIMC routes.
 * Exact paths are also emitted as 301s from next.config.ts for crawlers.
 * Unknown paths stay unmatched so Next.js can render the 404 page.
 */

export type LegacyRedirect = {
  source: string;
  destination: string;
};

export const LEGACY_EXACT_REDIRECTS: LegacyRedirect[] = [
  { source: "/index.php", destination: "/" },
  { source: "/index.html", destination: "/" },
  { source: "/home", destination: "/" },
  { source: "/home.php", destination: "/" },
  { source: "/cgi-sys/suspendedpage.cgi", destination: "/" },

  { source: "/about-us.php", destination: "/about" },
  { source: "/about-us", destination: "/about" },
  { source: "/aboutus", destination: "/about" },
  { source: "/aboutus.php", destination: "/about" },
  { source: "/about.php", destination: "/about" },

  { source: "/contact-us.php", destination: "/contact" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/contactus", destination: "/contact" },
  { source: "/contactus.php", destination: "/contact" },
  { source: "/contact.php", destination: "/contact" },
  { source: "/enquiry", destination: "/contact" },
  { source: "/enquiry.php", destination: "/contact" },
  { source: "/get-a-quote", destination: "/contact" },
  { source: "/quote", destination: "/contact" },

  { source: "/our-services.php", destination: "/services" },
  { source: "/our-services", destination: "/services" },
  { source: "/services.php", destination: "/services" },

  { source: "/rental-equipment-division.php", destination: "/services/equipment-rental" },
  { source: "/rental-equipment-division", destination: "/services/equipment-rental" },
  { source: "/rental-equipment", destination: "/services/equipment-rental" },
  { source: "/rental", destination: "/services/equipment-rental" },

  { source: "/power-generation.php", destination: "/services/energy-infrastructure" },
  { source: "/power-generation", destination: "/services/energy-infrastructure" },
  { source: "/maintenance-services.php", destination: "/services/energy-infrastructure" },
  { source: "/maintenance-services", destination: "/services/energy-infrastructure" },
  { source: "/maintenance", destination: "/services/energy-infrastructure" },

  { source: "/construction-services.php", destination: "/services/civil-infrastructure" },
  { source: "/construction-services", destination: "/services/civil-infrastructure" },
  { source: "/construction", destination: "/services/civil-infrastructure" },

  { source: "/our-valuable-clients.php", destination: "/clients" },
  { source: "/our-valuable-clients", destination: "/clients" },
  { source: "/our-clients", destination: "/clients" },
  { source: "/clients.php", destination: "/clients" },
  { source: "/valuable-clients", destination: "/clients" },

  { source: "/privacy-policy.php", destination: "/privacy" },
  { source: "/privacy-policy", destination: "/privacy" },
  { source: "/privacy.php", destination: "/privacy" },

  { source: "/terms-conditions.php", destination: "/terms" },
  { source: "/terms-and-conditions", destination: "/terms" },
  { source: "/terms.php", destination: "/terms" },

  { source: "/projects.php", destination: "/projects/completed" },
  { source: "/our-projects", destination: "/projects/completed" },
  { source: "/gallery", destination: "/portfolio" },
  { source: "/gallery.php", destination: "/portfolio" },
];

const EXACT_LOOKUP = new Map(
  LEGACY_EXACT_REDIRECTS.map((item) => [item.source, item.destination]),
);

const APP_PREFIXES = [
  "/about",
  "/services",
  "/projects",
  "/portfolio",
  "/clients",
  "/contact",
  "/privacy",
  "/terms",
  "/api",
  "/company-profile.pdf",
];

function normalizePath(pathname: string): string {
  let path = pathname.split("?")[0] ?? pathname;
  try {
    path = decodeURIComponent(path);
  } catch {
    /* keep raw path */
  }
  path = path.toLowerCase();
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path || "/";
}

export function isKnownAppPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (path === "/") return true;
  return APP_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

function matchKeywords(path: string): string | null {
  const slug = path.replace(/^\//, "").replace(/\.(php|html?|aspx|cgi)$/i, "");
  const text = slug.replace(/[_./-]+/g, " ").trim();
  if (!text) return "/";

  if (/\bprivacy\b/.test(text)) return "/privacy";
  if (/\bterms\b/.test(text)) return "/terms";
  if (/\b(contact|enquiry|inquiry|quote)\b/.test(text)) return "/contact";
  if (/\babout\b/.test(text)) return "/about";
  if (/\bclient\b/.test(text)) return "/clients";
  if (/\b(rental|equipment|crane|excavator|fleet)\b/.test(text)) {
    return "/services/equipment-rental";
  }
  if (/\b(power|generation|energy|solar)\b/.test(text)) {
    return "/services/energy-infrastructure";
  }
  if (/\b(foundation|piling|geotech)\b/.test(text)) {
    return "/services/foundation-engineering";
  }
  if (/\b(construction|civil|infrastructure|highway)\b/.test(text)) {
    return "/services/civil-infrastructure";
  }
  if (/\bmaintenance\b/.test(text)) return "/services/energy-infrastructure";
  if (/\bservice\b/.test(text)) return "/services";
  if (/\b(project|portfolio|gallery)\b/.test(text)) return "/projects/completed";
  if (/^(index|home)$/.test(text)) return "/";
  return null;
}

/**
 * Returns a new-site path, or null when the URL should 404.
 */
export function resolveLegacyPath(pathname: string): string | null {
  const path = normalizePath(pathname);
  if (path === "/" || isKnownAppPath(path)) return null;

  const exact = EXACT_LOOKUP.get(path);
  if (exact) return exact;

  const looksLegacy = /\.(php|html?|aspx|cgi)$/i.test(path);
  const matched = matchKeywords(path);
  if (looksLegacy) return matched;
  if (matched && path.split("/").filter(Boolean).length <= 2) return matched;
  return null;
}
