"use client";

import Image from "next/image";
import {
  Building2,
  Calendar,
  CheckCircle2,
  CircleDot,
  HardHat,
  MapPin,
  Banknote,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { ListedProject } from "@/lib/company";

type ProjectGridProps = {
  projects: ListedProject[];
  status: "ongoing" | "completed";
};

const projectImages = [
  "/images/civil-construction.jpg",
  "/images/header-contracting.jpg",
  "/images/header-scaffolding.jpg",
  "/images/hero-equipment.jpg",
  "/images/hero-civil.jpg",
  "/images/header-scrap.jpg",
  "/images/scaffolding.jpg",
  "/images/manpower-supply.jpg",
];

function formatSar(amount: number) {
  return new Intl.NumberFormat("en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProjectGrid({ projects, status }: ProjectGridProps) {
  const isOngoing = status === "ongoing";
  const centerLastOnDesktop =
    projects.length % 3 === 1 && projects.length > 3;

  return (
    <RevealGroup immediate className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => {
        const image = projectImages[i % projectImages.length];
        const isLastOrphan =
          centerLastOnDesktop && i === projects.length - 1;
        const sponsorOrClient = project.sponsor || project.client;

        return (
          <RevealItem
            key={project.no}
            className={isLastOrphan ? "lg:col-start-2" : undefined}
          >
            <article
              data-media
              className="group relative flex h-full min-h-[320px] flex-col overflow-hidden border border-white/10 bg-navy-950 transition duration-500 hover:border-accent/60 sm:min-h-[400px] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_24px_50px_-28px_rgba(255,107,53,0.45)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden img-zoom sm:aspect-auto sm:h-[220px]">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
                  <span className="max-w-[70%] truncate bg-accent px-3 py-1.5 font-display text-[11px] font-bold tracking-wide text-navy-950 uppercase">
                    {project.description}
                  </span>
                  <span className="font-display text-2xl font-bold text-white/25">
                    {String(project.no).padStart(2, "0")}
                  </span>
                </div>

                <span
                  className={`absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 font-display text-[11px] font-bold tracking-wide uppercase ${
                    isOngoing
                      ? "bg-accent text-navy-950"
                      : "bg-white/10 text-white backdrop-blur-sm"
                  }`}
                >
                  {isOngoing ? (
                    <CircleDot className="h-3 w-3" />
                  ) : (
                    <CheckCircle2 className="h-3 w-3" />
                  )}
                  {isOngoing ? "In Progress" : "Completed"}
                </span>
                <span className="absolute right-4 bottom-4 bg-navy-950/80 px-2 py-1 text-[9px] font-semibold tracking-wide text-accent uppercase">
                  Photo pending
                </span>
              </div>

              <div className="relative flex flex-1 flex-col p-6">
                <h3 className="font-display text-[16px] leading-snug font-bold text-white uppercase">
                  {project.name}
                </h3>

                {project.scope && (
                  <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                    {project.scope}
                  </p>
                )}

                <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-[13px] text-white/55">
                  <div className="flex items-start gap-2.5">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>
                      <span className="text-white/35">
                        {project.sponsor ? "Sponsor: " : "Client: "}
                      </span>
                      {sponsorOrClient}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <HardHat className="h-4 w-4 shrink-0 text-accent" />
                    <span>
                      <span className="text-white/35">Contractor: </span>
                      {project.contractor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 shrink-0 text-accent" />
                    <span>{project.location}</span>
                  </div>
                  {typeof project.contractAmount === "number" && (
                    <div className="flex items-center gap-2.5">
                      <Banknote className="h-4 w-4 shrink-0 text-accent" />
                      <span>
                        <span className="text-white/35">Contract: </span>
                        {formatSar(project.contractAmount)}
                      </span>
                    </div>
                  )}
                  {project.endDate && (
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 shrink-0 text-accent" />
                      <span>
                        <span className="text-white/35">End of contract: </span>
                        {project.endDate}
                      </span>
                    </div>
                  )}
                </div>

                <span aria-hidden className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[3px] bg-accent" />
              </div>
            </article>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
