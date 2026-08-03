import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InternalPageHero from "@/components/InternalPageHero";
import ProjectGrid from "@/components/ProjectGrid";
import { Reveal } from "@/components/motion/Reveal";
import ProjectCategoryTabs from "@/components/sections/ProjectCategoryTabs";
import { Button } from "@/components/ui/button";
import { completedProjects } from "@/lib/company";

export default function CompletedProjectsPage() {
  return (
    <>
      <InternalPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects/ongoing" },
          { label: "Completed" },
        ]}
        titleLead="Our"
        titleAccent="Completed"
        title="Projects"
        description="Delivered contractor packages across industrial, infrastructure, and utility sites — executed with quality control, HSE discipline, and clear handover documentation."
        backgroundImage="/images/civil-construction.jpg"
      />

      <section
        id="projects"
        data-dark-surface
        className="relative scroll-mt-24 overflow-x-clip bg-navy-950 py-14 md:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 80% 0%, rgba(255,107,53,0.08), transparent 55%)",
          }}
        />

        <div className="container-site relative z-10">
          <Reveal immediate>
            <div className="mb-8 flex flex-col items-start justify-between gap-5 md:mb-10 md:flex-row md:items-end">
              <div>
                <span className="section-eyebrow text-accent">Our Project</span>
                <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                  Delivered With Pride
                </h2>
                <p className="mt-3 max-w-xl text-[15px] text-white/60">
                  Completed contractor packages across industrial, infrastructure,
                  and utility sites — executed with quality control and clear
                  handover documentation. Selected 100% completed works from the
                  last two years.
                </p>
                <p className="mt-3 border border-accent/25 bg-accent/10 px-3 py-2 text-[12px] text-accent">
                  Project photographs will be added once TIMC provides site media
                  and disclosure approvals.
                </p>
              </div>
              <Button asChild>
                <Link href="/contact">
                  Discuss Your Scope <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <ProjectCategoryTabs />
          <ProjectGrid projects={completedProjects} status="completed" />
        </div>
      </section>
    </>
  );
}
