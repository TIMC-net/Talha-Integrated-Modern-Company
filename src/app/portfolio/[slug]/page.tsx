import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { getService } from "@/data/services";
import { projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project Not Found | TIMC" };
  return {
    title: `${project.title} | TIMC Portfolio`,
    description: project.description,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const service = getService(project.service);

  return (
    <>
      <PageBanner
        title={project.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title },
        ]}
        backgroundImage={project.imageUrl}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-site">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-display text-[12px] font-bold tracking-wide text-accent-dark uppercase"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="img-zoom group relative aspect-video">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              {service && (
                <span className="section-eyebrow">{service.name}</span>
              )}
              <h2 className="section-heading mt-4 text-2xl md:text-[32px]">
                {project.title}
              </h2>
              <p className="mt-2 text-[14px] font-semibold tracking-wide text-slate uppercase">
                {project.location}
              </p>
              <p className="mt-5 text-[16px] leading-relaxed text-slate">
                {project.description}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-slate">
                Full project narrative, photography, and client references will
                be published once TIMC provides final project materials.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
