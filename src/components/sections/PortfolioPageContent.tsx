"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PortfolioCard from "@/components/ui/PortfolioCard";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

export default function PortfolioPageContent() {
  return (
    <>
      <PageBanner
        title="Our Portfolio"
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        backgroundImage="/images/civil-construction.jpg"
      />

      <section data-dark-surface className="relative overflow-hidden bg-navy-950 py-14 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 70% 0%, rgba(255,107,53,0.08), transparent 55%)",
          }}
        />

        <div className="container-site relative z-10">
          <Reveal immediate>
            <div className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-12 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="section-eyebrow text-accent">Completed Projects</span>
                <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                  Contractor Work Across the Kingdom
                </h2>
                <p className="mt-3 text-[15px] text-white/60">
                  Completed contractor packages across civil infrastructure,
                  foundations, energy, and industrial works. Browse ongoing and
                  completed listings for full project categories.
                </p>
                <p className="mt-3 border border-accent/25 bg-accent/10 px-3 py-2 text-[12px] text-accent">
                  Demo photography shown — final project photos pending from TIMC.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:border-accent hover:bg-accent hover:text-brand-ink"
                >
                  <Link href="/projects/ongoing">Ongoing</Link>
                </Button>
                <Button asChild>
                  <Link href="/projects/completed">
                    Completed <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <RevealGroup immediate className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <RevealItem key={project.id}>
                <div className="overflow-hidden border border-white/10 transition duration-500 hover:border-accent/60 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_24px_50px_-28px_rgba(255,107,53,0.45)]">
                  <PortfolioCard project={project} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
