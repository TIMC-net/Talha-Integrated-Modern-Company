import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { getService, services } from "@/data/services";
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  breadcrumbJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { company } from "@/lib/company";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };

  const description =
    `${service.name} by TIMC in Jeddah, Saudi Arabia. ${service.fullDescription}`.slice(
      0,
      158,
    );
  const url = absoluteUrl(`/services/${slug}`);
  const image = absoluteUrl(service.image || DEFAULT_OG_IMAGE);

  return {
    title: service.name,
    description,
    keywords: [
      `TIMC ${service.name}`,
      `${service.name} Jeddah`,
      `${service.name} Saudi Arabia`,
      "TIMC contractor",
    ],
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.name} | ${company.shortName}`,
      description,
      url,
      images: [{ url: image, alt: service.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | ${company.shortName}`,
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
