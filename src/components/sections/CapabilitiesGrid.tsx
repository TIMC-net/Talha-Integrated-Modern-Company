"use client";

import {
  ClipboardList,
  HardHat,
  MapPinned,
  ShieldCheck,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { underOneRoof } from "@/data/services-page";

const icons: LucideIcon[] = [
  ShieldCheck,
  MapPinned,
  ClipboardList,
  Truck,
  Users,
  HardHat,
];

export default function CapabilitiesGrid() {
  return (
    <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {underOneRoof.map((item, index) => {
        const Icon = icons[index] ?? ShieldCheck;

        return (
          <RevealItem key={item.id}>
            <article className="group relative h-full overflow-hidden border border-white/10 bg-navy-950 p-6 transition-all duration-500 hover:border-accent md:p-7 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_18px_40px_-24px_rgba(255,107,53,0.55)]">
              <span
                className="pointer-events-none absolute top-3 right-4 font-display text-5xl font-bold text-white/5 transition duration-500 group-hover:text-accent/20 md:text-6xl"
                aria-hidden
              >
                {item.number}
              </span>

              <span className="relative mb-5 flex h-12 w-12 items-center justify-center bg-accent/15 text-accent transition duration-500 group-hover:bg-accent group-hover:text-navy-950">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>

              <p className="relative font-display text-[13px] font-bold text-accent/80 transition duration-500 group-hover:text-accent">
                {item.number}
              </p>
              <h3 className="relative mt-2 font-display text-[16px] font-bold text-white uppercase">
                {item.title}
              </h3>
              <p className="relative mt-2 text-[13px] leading-relaxed text-white/55">
                {item.description}
              </p>

              <span className="absolute right-0 bottom-0 left-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </article>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
