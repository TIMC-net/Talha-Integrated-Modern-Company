import PageBanner from "@/components/PageBanner";
import ProjectGrid from "@/components/ProjectGrid";
import { Reveal } from "@/components/motion/Reveal";
import { ongoingProjects } from "@/lib/company";

export default function OngoingProjectsPage() {
  return (
    <>
      <PageBanner
        title="Projects"
        crumbs={[{ label: "Home", href: "/" }, { label: "Ongoing Projects" }]}
      />
      <section className="bg-paper py-14 md:py-20">
        <div className="container-site">
          <Reveal>
            <span className="section-eyebrow mb-4">What We&rsquo;re Building</span>
            <h2 className="section-heading mb-10 text-2xl md:text-[28px]">Ongoing Projects</h2>
          </Reveal>

          <ProjectGrid projects={ongoingProjects} status="ongoing" />
        </div>
      </section>
    </>
  );
}
