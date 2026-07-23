import PageBanner from "@/components/PageBanner";
import ProjectGrid from "@/components/ProjectGrid";
import { Reveal } from "@/components/motion/Reveal";
import { completedProjects } from "@/lib/company";

export default function CompletedProjectsPage() {
  return (
    <>
      <PageBanner
        title="Projects"
        crumbs={[{ label: "Home", href: "/" }, { label: "Completed Projects" }]}
      />
      <section className="bg-paper py-14 md:py-20">
        <div className="container-site">
          <Reveal>
            <span className="section-eyebrow mb-4">Delivered With Pride</span>
            <h2 className="section-heading mb-10 text-2xl md:text-[28px]">Completed Projects</h2>
          </Reveal>

          <ProjectGrid projects={completedProjects} status="completed" />
        </div>
      </section>
    </>
  );
}
