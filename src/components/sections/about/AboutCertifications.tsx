import { Award, FileBadge, ClipboardCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import AnimatedDarkCard from "@/components/ui/AnimatedDarkCard";
import { certifications } from "@/lib/company";

const iconMap = {
  iso: Award,
  licenses: FileBadge,
  vendor: ClipboardCheck,
} as const;

export default function AboutCertifications() {
  return (
    <section
      id="certifications"
      data-dark-surface
      className="scroll-mt-28 border-t border-white/10 bg-navy-950 py-16 md:py-24"
    >
      <div className="container-site">
        <Reveal>
          <span className="section-eyebrow text-accent">Credentials</span>
          <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
            Certifications &amp; Registrations
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-white/60">
            Placeholder slots for ISO certifications, company licenses, and vendor
            registrations. Official documents will be published after TIMC
            provides them.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {certifications.map((item) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] ?? Award;
            return (
              <RevealItem key={item.id}>
                <AnimatedDarkCard className="flex flex-col bg-navy-900">
                  <span className="flex h-12 w-12 items-center justify-center bg-accent/15 text-accent transition duration-500 group-hover/card:bg-accent group-hover/card:text-navy-950">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-display text-[15px] font-bold tracking-wide text-white uppercase transition duration-300 group-hover/card:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/55">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-block self-start bg-accent/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-accent uppercase">
                    Content pending
                  </span>
                </AnimatedDarkCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
