import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import AnimatedDarkCard from "@/components/ui/AnimatedDarkCard";
import { companyHistory } from "@/lib/company";

export default function AboutHistory() {
  return (
    <section data-dark-surface className="border-t border-white/10 bg-navy-900 py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <span className="section-eyebrow text-accent">Company History</span>
          <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
            Our Journey
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-white/60">
            Timeline shell ready for TIMC&apos;s official company history. Placeholder
            milestones below will be replaced with confirmed dates and narrative.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {companyHistory.map((item) => (
            <RevealItem key={item.title}>
              <AnimatedDarkCard>
                <p className="font-display text-[12px] font-bold tracking-[2px] text-accent uppercase">
                  {item.year}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold text-white uppercase transition duration-300 group-hover/card:text-accent">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">
                  {item.text}
                </p>
              </AnimatedDarkCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
