import StatCard from "@/components/ui/StatCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { stats } from "@/data/stats";

export default function StatsSection() {
  return (
    <section data-dark-surface className="bg-navy-950 pt-10 pb-6 md:pt-14 md:pb-8">
      <div className="container-site">
        <RevealGroup className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <RevealItem key={stat.id}>
              <StatCard stat={stat} onDark />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
