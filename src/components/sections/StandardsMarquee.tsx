"use client";

import { standardsWeWorkTo } from "@/data/services-page";

function StandardPill({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-white/20 bg-navy-900 px-6 py-3 font-display text-[13px] font-bold tracking-wide whitespace-nowrap text-white uppercase md:px-7 md:text-[14px]">
      {label}
    </span>
  );
}

export default function StandardsMarquee() {
  const loop = [...standardsWeWorkTo, ...standardsWeWorkTo];

  return (
    <section data-dark-surface className="border-t border-white/10 bg-navy-950 py-14 md:py-16">
      <div className="container-site mb-8">
        <p className="font-display text-[12px] font-semibold tracking-[2px] text-white/50 uppercase">
          Standards We Work To
        </p>
      </div>

      <div className="relative overflow-x-clip">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy-950 to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy-950 to-transparent md:w-24" />

        <div className="standards-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
          {loop.map((item, index) => (
            <StandardPill key={`${item.id}-${index}`} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
