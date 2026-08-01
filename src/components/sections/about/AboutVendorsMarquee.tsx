"use client";

import { useState } from "react";
import { vendors } from "@/data/vendors";

function VendorCapsule({ serial, name }: { serial: string; name: string }) {
  return (
    <span className="theme-capsule inline-flex shrink-0 items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 whitespace-nowrap transition-colors duration-300 hover:border-accent/50 hover:bg-accent/10 md:px-6 md:py-3">
      <span className="font-display text-[11px] font-bold tracking-[1.5px] text-accent uppercase md:text-[12px]">
        {serial}
      </span>
      <span className="h-3 w-px bg-white/20" aria-hidden />
      <span className="font-display text-[13px] font-semibold tracking-wide text-white md:text-[14px]">
        {name}
      </span>
    </span>
  );
}

export default function AboutVendorsMarquee() {
  const [pausedA, setPausedA] = useState(false);
  const [pausedB, setPausedB] = useState(false);
  const rowA = [...vendors, ...vendors];
  const rowB = [...vendors.slice().reverse(), ...vendors.slice().reverse()];

  return (
    <section data-dark-surface className="overflow-x-clip border-t border-white/10 bg-navy-950 py-16 md:py-20">
      <div className="container-site mb-10 md:mb-12">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-orange-500" aria-hidden />
          <p className="font-display text-[12px] font-semibold tracking-[2.5px] text-orange-500 uppercase">
            Approved Network
          </p>
        </div>
        <h2 className="mt-4 font-display text-[28px] leading-none font-bold tracking-tight text-white uppercase md:text-[40px]">
          Vendor List
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/55 md:text-[16px]">
          Registered vendors and partners across contracting, engineering, and
          energy — serial references from our approved vendor register.
        </p>
      </div>

      <div className="relative flex flex-col gap-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-navy-950 to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-navy-950 to-transparent md:w-24" />

        <div
          className="vendors-marquee flex w-max gap-3 md:gap-4"
          style={{ animationPlayState: pausedA ? "paused" : "running" }}
          onPointerEnter={() => setPausedA(true)}
          onPointerLeave={() => setPausedA(false)}
        >
          {rowA.map((vendor, index) => (
            <VendorCapsule
              key={`a-${vendor.serial}-${index}`}
              serial={vendor.serial}
              name={vendor.name}
            />
          ))}
        </div>

        <div
          className="vendors-marquee-reverse flex w-max gap-3 md:gap-4"
          style={{ animationPlayState: pausedB ? "paused" : "running" }}
          onPointerEnter={() => setPausedB(true)}
          onPointerLeave={() => setPausedB(false)}
        >
          {rowB.map((vendor, index) => (
            <VendorCapsule
              key={`b-${vendor.serial}-${index}`}
              serial={vendor.serial}
              name={vendor.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
