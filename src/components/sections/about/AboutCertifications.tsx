import { Award, ClipboardCheck, FileBadge, Leaf, ShieldCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import AnimatedDarkCard from "@/components/ui/AnimatedDarkCard";
import { certifications } from "@/lib/company";

const iconMap = {
  iso9001: Award,
  iso14001: Leaf,
  iso45001: ShieldCheck,
  licenses: FileBadge,
  vendor: ClipboardCheck,
} as const;

const isoCertifications = certifications.filter((item) =>
  item.id.startsWith("iso"),
);
const otherCertifications = certifications.filter(
  (item) => !item.id.startsWith("iso"),
);

function CertificationCard({
  item,
}: {
  item: (typeof certifications)[number];
}) {
  const Icon = iconMap[item.id as keyof typeof iconMap] ?? Award;

  return (
    <AnimatedDarkCard className="flex h-full flex-col bg-navy-900">
      <span className="flex h-12 w-12 items-center justify-center bg-accent/15 text-accent transition duration-500 group-hover/card:bg-accent group-hover/card:text-navy-950">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </span>
      <h3 className="mt-5 font-display text-[15px] font-bold tracking-wide text-white uppercase transition duration-300 group-hover/card:text-accent">
        {item.title}
      </h3>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/55">
        {item.description}
      </p>
    </AnimatedDarkCard>
  );
}

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
            Quality, environmental, and occupational health systems, together with
            commercial registration details and major vendor approvals.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isoCertifications.map((item) => (
            <RevealItem key={item.id}>
              <CertificationCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-5 flex flex-col items-stretch justify-center gap-5 sm:flex-row sm:justify-center">
          {otherCertifications.map((item) => (
            <RevealItem
              key={item.id}
              className="w-full sm:max-w-[calc(50%-0.625rem)] lg:w-[calc((100%-2.5rem)/3)] lg:max-w-none"
            >
              <CertificationCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
