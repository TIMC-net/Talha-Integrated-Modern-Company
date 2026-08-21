import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { getService, services } from "@/data/services";
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  breadcrumbJsonLd,
  clipMetaDescription,
  serviceJsonLd,
} from "@/lib/seo";
import { company } from "@/lib/company";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

const SERVICE_SEO_TITLE: Record<string, string> = {
  "equipment-rental": "Heavy Equipment Rental in Jeddah",
  "civil-infrastructure": "Civil Infrastructure Contractor in Jeddah",
  "foundation-engineering": "Foundation Engineering Services in Jeddah",
  "energy-infrastructure": "Energy Infrastructure Contractor in Jeddah",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };

  const title =
    SERVICE_SEO_TITLE[slug] ?? `${service.name} in Jeddah & Saudi Arabia`;
  const description = clipMetaDescription(
    `${service.name} by TIMC in Jeddah, Saudi Arabia. ${service.tagline}. ${service.description}`,
  );
  const url = absoluteUrl(`/services/${slug}`);
  const image = absoluteUrl(service.image || DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    keywords: [
      `TIMC ${service.name}`,
      `${service.name} Jeddah`,
      `${service.name} Saudi Arabia`,
      "TIMC contractor",
    ],
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${title} | ${company.shortName}`,
      description,
      url,
      images: [{ url: image, alt: service.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.shortName}`,
      description,
      images: [image],
    },
  };
}

export default async function ServiceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
          serviceJsonLd(service),
        ]}
      />
      <ServiceDetail service={service} />
    </>
  );
}
