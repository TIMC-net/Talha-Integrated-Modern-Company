import Counter from "@/components/ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const statusStats = [
  { value: 500, suffix: "+", label: "Completed Projects" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "+", label: "Running Projects" },
];

export default function AboutStats() {
  return (
    <div className="py-16 md:py-20">
      <div className="container-site">
        <Reveal>
          <div className="mb-12 text-center md:mb-14">
            <span className="section-eyebrow justify-center text-accent">
              Our Company Status
            </span>
            <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
              Trusted & Reliable
            </h2>
          </div>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {statusStats.map((stat) => (
            <RevealItem key={stat.label} className="text-center">
              <p className="font-display text-4xl font-bold text-accent md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[14px] text-white/60">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
