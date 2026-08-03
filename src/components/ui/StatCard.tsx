import Link from "next/link";
import { Award, Briefcase, Building2, HardHat } from "lucide-react";
import Counter from "@/components/ui/Counter";
import type { Stat } from "@/data/stats";

const iconMap = { Award, Briefcase, Building2, HardHat };

export default function StatCard({
  stat,
  onDark = false,
}: {
  stat: Stat;
  onDark?: boolean;
}) {
  const Icon = iconMap[stat.icon];

  const content = (
    <>
      {!onDark && (
        <span
          className="mb-4 flex h-24 w-24 items-center justify-center rounded-full"
          style={{ backgroundColor: `${stat.color}1a` }}
        >
          <Icon className="h-12 w-12" style={{ color: stat.color }} />
        </span>
      )}
      <div
        className={`font-display text-3xl font-bold sm:text-4xl md:text-5xl ${
          onDark ? "text-accent" : "text-ink"
        }`}
        style={onDark ? undefined : { color: stat.color }}
      >
        <Counter value={stat.value} suffix={stat.suffix} />
      </div>
      <p
        className={`mt-2 text-[12px] leading-relaxed transition sm:text-[14px] ${
          onDark ? "text-white/70 group-hover:text-accent" : "text-slate group-hover:text-accent"
        }`}
      >
        {stat.label}
      </p>
    </>
  );

  if (stat.href) {
    return (
      <Link
        href={stat.href}
        className="group flex flex-col items-center text-center no-underline transition hover:opacity-90"
      >
        {content}
      </Link>
    );
  }

  return <div className="flex flex-col items-center text-center">{content}</div>;
}
