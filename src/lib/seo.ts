import type { Metadata } from "next";
import type { Service } from "@/data/services";
import { company } from "@/lib/company";

/** Canonical production origin for TIMC. */
export const SITE_URL = "https://www.trsco.net";

export const DEFAULT_TITLE =
  "TIMC | Jeddah Contractor & Equipment Rental Saudi Arabia";

export const DEFAULT_DESCRIPTION =
  "TIMC is a Jeddah contractor for civil infrastructure, foundation engineering, energy projects, and heavy equipment rental across Saudi Arabia.";

/** Shared keyword set for search engines that still read meta keywords. */
export const SITE_KEYWORDS = [
  "TIMC",
  "Talha Integrated Modern Company",
  "TIMC Jeddah",
  "contractor Jeddah",
  "contractor Saudi Arabia",
  "general contractor KSA",
  "civil infrastructure Saudi Arabia",
  "foundation engineering Jeddah",
  "energy infrastructure contractor",
  "heavy equipment rental Jeddah",
  "equipment rental Saudi Arabia",
  "crane rental Jeddah",
  "construction company Jeddah",
  "infrastructure contractor Saudi Arabia",
];

/** Default social preview image (1200×630). */
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

/** LinkedIn company page — used in footer and Organization sameAs. */
export const LINKEDIN_URL =
  "https://www.linkedin.com/company/talha-integrated-modern-company/";

/** Truncate meta descriptions on a word boundary (avoids mid-word SERP cutoffs). */
export function clipMetaDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  const base = (lastSpace > 60 ? sliced.slice(0, lastSpace) : sliced).trimEnd();
  return `${base}…`;
}

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
};

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${company.shortName}`,
      description,
      url,
      siteName: company.name,
      locale: "en_SA",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${company.shortName} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.shortName}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export type BreadcrumbItem = {
  name: string;
  path?: string;
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: company.name,
    alternateName: company.shortName,
    url: SITE_URL,
    logo: absoluteUrl("/images/logo-mark.webp"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    email: company.email,
    telephone: company.phone,
    foundingDate: company.established,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Jeddah",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.mapsLat,
      longitude: company.mapsLng,
    },
    sameAs: [LINKEDIN_URL],
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    description: DEFAULT_DESCRIPTION,
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    alternateName: `${company.shortName} ${service.name}`,
    description: service.fullDescription,
    serviceType: service.name,
    provider: {
      "@type": "Organization",
      name: company.name,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    url: absoluteUrl(`/services/${service.slug}`),
    image: absoluteUrl(service.image),
    category: service.category,
  };
}

export function creativeWorkJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    creator: {
      "@type": "Organization",
      name: company.name,
      url: SITE_URL,
    },
  };
}
