import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CircleDot,
  MapPin,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import InternalPageHero from "@/components/InternalPageHero";
import { Reveal } from "@/components/motion/Reveal";
import WriteOnScroll from "@/components/motion/WriteOnScroll";
import { Button } from "@/components/ui/button";
import { company, ongoingProjects } from "@/lib/company";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  creativeWorkJsonLd,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ no: string }>;
};

export function generateStaticParams() {
  return ongoingProjects
    .filter((p) => p.details)
    .map((p) => ({ no: String(p.no) }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { no } = await params;
  const project = ongoingProjects.find(
    (p) => String(p.no) === no && p.details,
  );
  if (!project?.details) return { title: "Project Not Found" };
  const title = project.details.fullName ?? project.name;
  const description = project.details.overview.slice(0, 160);
  const url = absoluteUrl(`/projects/ongoing/${no}`);
  const image = absoluteUrl(
    project.details.heroImage || project.coverImage || "/images/og-default.jpg",
  );
  return {
    title,
    description,
    alternates: { canonical: `/projects/ongoing/${no}` },
    openGraph: {
      title: `${title} | ${company.shortName}`,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.shortName}`,
      description,
      images: [image],
    },
  };
}

export default async function OngoingProjectDetailPage({ params }: PageProps) {
  const { no } = await params;
  const project = ongoingProjects.find(
    (p) => String(p.no) === no && p.details,
  );
  if (!project?.details) notFound();

  const details = project.details;
  const title = details.fullName ?? project.name;
  const titleWords = title.split(" ");
  const titleAccent = titleWords.slice(0, 2).join(" ");
  const titleRest = titleWords.slice(2).join(" ") || "Details";
  const path = `/projects/ongoing/${project.no}`;
  const sponsorOrClient = project.sponsor || project.client;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ongoing Projects", path: "/projects/ongoing" },
            { name: title, path },
          ]),
          creativeWorkJsonLd({
            name: title,
            description: details.overview,
            path,
            image: details.heroImage || project.coverImage,
          }),
        ]}
      />
      <InternalPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects/ongoing" },
          { label: `Project ${String(project.no).padStart(2, "0")}` },
        ]}
        titleAccent={titleAccent}
        title={titleRest}
        description={project.scope ?? details.overview}
        backgroundImage="/images/projects-page-hero-v3.webp"
        imageClassName="object-cover object-[center_40%]"
        connectBottom
      />

      <section
        data-dark-surface
        className="relative bg-navy-950 pt-6 pb-14 md:pt-8 md:pb-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 0%, rgba(255,107,53,0.08), transparent 55%)",
          }}
        />

        <div className="container-site relative z-10">
          <Reveal immediate>
            <Link
              href="/projects/ongoing"
              className="inline-flex items-center gap-2 font-display text-[12px] font-bold tracking-wide text-accent uppercase transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to ongoing projects
            </Link>
          </Reveal>

          {/* Single-column read, left-aligned */}
          <article className="mt-8 max-w-3xl md:mt-10">
            <Reveal delay={0.05}>
              <header>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 border border-accent/70 bg-accent/15 px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
                    <CircleDot className="h-3.5 w-3.5" />
                    In Progress
                  </span>
                  <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-white/55 uppercase">
                    Project {String(project.no).padStart(2, "0")} ·{" "}
                    {project.description}
                  </span>
                </div>

                <WriteOnScroll
                  as="h2"
                  text={title}
                  className="mt-5 font-display text-[26px] leading-[1.2] font-bold tracking-wide text-white uppercase sm:text-[32px] md:text-[36px]"
                />
              </header>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-8 grid gap-4 border-y border-white/10 py-6 sm:grid-cols-2 sm:gap-6">
                {sponsorOrClient ? (
                  <div className="flex gap-3 sm:flex-col sm:gap-2">
                    <dt className="flex items-center gap-2 font-display text-[10px] font-bold tracking-[0.14em] text-accent uppercase">
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                      Customer
                    </dt>
                    <dd className="text-[14px] leading-snug text-white/78">
                      {sponsorOrClient}
                    </dd>
                  </div>
                ) : null}
                <div className="flex gap-3 sm:flex-col sm:gap-2">
                  <dt className="flex items-center gap-2 font-display text-[10px] font-bold tracking-[0.14em] text-accent uppercase">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    Location
                  </dt>
                  <dd className="text-[14px] leading-snug text-white/78">
                    {project.location}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              <section className="mt-10">
                <h3 className="font-display text-[12px] font-bold tracking-[0.14em] text-accent uppercase">
                  Overview
                </h3>
                <p className="mt-4 text-[16px] leading-[1.75] text-white/72 md:text-[17px]">
                  {details.overview}
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.12}>
              <section className="mt-12">
                <h3 className="font-display text-[12px] font-bold tracking-[0.14em] text-accent uppercase">
                  Scope of work
                </h3>
                <ol className="mt-5 space-y-0">
                  {details.scopeItems.map((item, i) => (
                    <li
                      key={item.slice(0, 56)}
                      className="flex gap-4 border-b border-white/8 py-4 last:border-b-0"
                    >
                      <span className="font-display text-[13px] font-bold tracking-wide text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[15px] leading-relaxed text-white/72 md:text-[16px]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ol>
                {details.standardsNote ? (
                  <p className="mt-6 border-l-2 border-accent/60 pl-5 text-[14px] leading-relaxed text-white/55">
                    {details.standardsNote}
                  </p>
                ) : null}
              </section>
            </Reveal>
          </article>

          {details.images.length > 0 ? (
            <Reveal delay={0.1} className="mt-16 md:mt-20">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-display text-[12px] font-bold tracking-[0.14em] text-accent uppercase">
                    Site photos
                  </h3>
                  <p className="mt-2 max-w-lg text-[14px] text-white/50">
                    Field works on site for this package.
                  </p>
                </div>
                <p className="font-display text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase">
                  {details.images.length} images
                </p>
              </div>
              <div
                className={
                  details.images.length === 2
                    ? "flex flex-wrap justify-start gap-3 md:gap-4"
                    : "flex flex-wrap justify-center gap-3 md:gap-4"
                }
              >
                {details.images.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] w-full max-w-[420px] overflow-hidden border border-white/10 bg-navy-900 sm:w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.7rem)]"
                  >
                    <Image
                      src={src}
                      alt={`${project.name} site photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={70}
                      loading={i < 2 ? "eager" : "lazy"}
                      className="object-cover bg-navy-900"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={0.12} className="mt-16 border-t border-white/10 pt-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="font-display text-[13px] font-semibold tracking-[2px] text-accent uppercase">
                  Partnership
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-white uppercase md:text-2xl">
                  Need support on a similar scope?
                </h3>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  asChild
                  variant="outline"
                  className="border-white/25 text-white"
                >
                  <Link href="/projects/ongoing">
                    <ArrowLeft className="h-4 w-4" /> All ongoing
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/contact">
                    Contact our team <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
