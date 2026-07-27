import StatCard from "@/components/ui/StatCard";
import { PendingBadge, PendingNotice } from "@/components/ui/PendingBadge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { stats } from "@/data/stats";

export default function StatsSection() {
  return (
    <section data-dark-surface className="bg-navy-950 py-14 md:py-20">
      <div className="container-site">
        <Reveal className="mb-8">
          <PendingBadge label="Stats pending verification" />
          <PendingNotice className="mt-3 max-w-2xl">
            Figures below are placeholders until TIMC confirms official project,
            satisfaction, team, and experience statistics.
          </PendingNotice>
        </Reveal>
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
