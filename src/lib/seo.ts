import type { Metadata } from "next";
import type { Service } from "@/data/services";
import { company } from "@/lib/company";

/** Canonical production origin for TIMC. */
export const SITE_URL = "https://www.trsco.net";

export const DEFAULT_TITLE = "TIMC | Contractor in Saudi Arabia";

export const DEFAULT_DESCRIPTION =
  "TIMC is a Jeddah-based contractor for civil infrastructure, foundation engineering, energy projects, and integrated heavy equipment rental across Saudi Arabia.";

/** Default social preview image (1200×630). */
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

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
};

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
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
    sameAs: [],
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
