import Link from "next/link";
import { ArrowRight, Building2, Hammer, Truck, Zap } from "lucide-react";
import type { Service } from "@/data/services";

const iconMap = { Truck, Building2, Hammer, Zap };

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <Link
      href={`/services#${service.slug}`}
      aria-label={`Learn more about ${service.name}`}
      className="group flex h-full flex-col border border-border-soft bg-white p-6 transition [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-2.5 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_18px_40px_-20px_rgba(14,21,32,0.35)]"
    >
      <span
        className="mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full transition group-hover:rotate-6"
        style={{ backgroundColor: `${service.color}1a` }}
      >
        <Icon className="h-16 w-16" style={{ color: service.color }} />
      </span>

      <h3 className="mb-3 font-display text-2xl font-bold text-ink uppercase">
        {service.name}
      </h3>
      <p className="mb-6 flex-1 text-[15px] leading-relaxed text-slate">
        {service.description}
      </p>

      <span className="inline-flex items-center gap-1.5 font-display text-[13px] font-bold tracking-wide text-accent-dark uppercase transition group-hover:gap-2.5">
        Learn More <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
