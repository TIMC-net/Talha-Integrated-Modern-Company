import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import InternalPageHero from "@/components/InternalPageHero";
import { getService } from "@/data/services";
import { projects } from "@/data/projects";
import WriteOnScroll from "@/components/motion/WriteOnScroll";

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
  const words = project.title.split(" ");
  const accent = words[0] ?? "Project";
  const rest = words.slice(1).join(" ") || "Detail";

  return (
    <>
      <InternalPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title },
        ]}
        titleLead="Project"
        titleAccent={accent}
        title={rest}
        description={`${project.description}${service ? ` Delivered under ${service.name}.` : ""} Location: ${project.location}.`}
        backgroundImage="/images/projects-page-hero-v3.jpg"
        imageClassName="object-cover object-[center_40%]"
        connectBottom
      />

      <section data-dark-surface className="bg-navy-950 py-14 md:py-20">
        <div className="container-site">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-display text-[12px] font-bold tracking-wide text-accent uppercase"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="img-zoom group relative aspect-video border border-white/10">
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
                <span className="section-eyebrow text-accent">{service.name}</span>
              )}
              <WriteOnScroll
                as="h2"
                text={project.title}
                className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[32px]"
              />
              <p className="mt-2 text-[14px] font-semibold tracking-wide text-white/55 uppercase">
                {project.location}
              </p>
              <p className="mt-5 text-[16px] leading-relaxed text-white/65">
                {project.description}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-white/50">
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
