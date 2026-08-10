import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InternalPageHero from "@/components/InternalPageHero";
import ProjectGrid from "@/components/ProjectGrid";
import { Reveal } from "@/components/motion/Reveal";
import ProjectCategoryTabs from "@/components/sections/ProjectCategoryTabs";
import { Button } from "@/components/ui/button";
import { ongoingProjects } from "@/lib/company";

export default function OngoingProjectsPage() {
  return (
    <>
      <InternalPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects/ongoing" },
          { label: "Ongoing" },
        ]}
        titleLead="Our"
        titleAccent="Ongoing"
        title="Projects"
        description="Active contractor works underway across the Kingdom — supervised on site with progress reporting, quality control, and disciplined HSE management."
        backgroundImage="/images/projects-page-hero-v3.jpg"
        imageClassName="object-cover object-[center_40%]"
        connectBottom
      />

      <section
        id="projects"
        data-dark-surface
        className="relative scroll-mt-24 overflow-x-clip bg-navy-950 pt-6 pb-14 md:pt-8 md:pb-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 20% 0%, rgba(255,107,53,0.08), transparent 55%)",
          }}
        />

        <div className="container-site relative z-10">
          <Reveal immediate>
            <div className="mb-8 flex flex-col items-start justify-between gap-5 md:mb-10 md:flex-row md:items-end">
              <div>
                <span className="section-eyebrow text-accent">Our Project</span>
                <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                  What We&rsquo;re Building
                </h2>
                <p className="mt-3 max-w-xl text-[15px] text-white/60">
                  Active contractor works underway across the Kingdom — tracked
                  with site supervision, HSE discipline, and progress reporting.
                </p>
              </div>
              <Button asChild>
                <Link href="/contact">
                  Request Project Support <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <ProjectCategoryTabs />
          <ProjectGrid projects={ongoingProjects} status="ongoing" />
        </div>
      </section>
    </>
  );
}
