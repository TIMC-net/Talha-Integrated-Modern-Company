"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InternalPageHero from "@/components/InternalPageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PortfolioCard from "@/components/ui/PortfolioCard";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import WriteOnScroll from "@/components/motion/WriteOnScroll";

export default function PortfolioPageContent() {
  return (
    <>
      <InternalPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        titleLead="Our"
        titleAccent="Selected"
        title="Portfolio"
        description="A selection of TIMC contractor work across civil infrastructure, foundations, energy, and industrial sites throughout Saudi Arabia."
        backgroundImage="/images/projects-page-hero-v3.webp"
        imageClassName="object-cover object-[center_40%]"
        connectBottom
      />

      <section
        id="portfolio"
        data-dark-surface
        className="relative scroll-mt-24 overflow-x-clip bg-navy-950 py-14 md:py-20"
      >
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
                <WriteOnScroll
                as="h2"
                text="Contractor Work Across the Kingdom"
                className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]"
              />
                <p className="mt-3 text-[15px] text-white/60">
                  Completed contractor packages across civil infrastructure,
                  foundations, energy, and industrial works. Browse ongoing and
                  completed listings for full project categories.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center border-white/20 text-white hover:border-accent hover:bg-accent hover:text-brand-ink sm:w-auto"
                >
                  <Link href="/projects/ongoing">Ongoing</Link>
                </Button>
                <Button asChild className="w-full justify-center sm:w-auto">
                  <Link href="/projects/completed">
                    Completed <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <RevealGroup immediate className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <RevealItem key={project.id}>
                <div className="overflow-hidden border border-white/10 transition duration-500 hover:border-accent/60 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_24px_50px_-28px_rgba(255,107,53,0.45)]">
                  <PortfolioCard project={project} priority={i < 3} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
