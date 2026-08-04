"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ClientEntry } from "@/lib/company";
import { cn } from "@/lib/cn";

/** Enough half-repeats that -50% translate stays seamless on wide screens. */
const HALF_REPEATS = 3;

function ClientLogoTile({
  client,
  index,
  float = true,
}: {
  client: ClientEntry;
  index: number;
  float?: boolean;
}) {
  const reduce = useReducedMotion();
  const shouldFloat = float && !reduce;

  return (
    <article
      title={client.name}
      className={cn(
        "group relative flex h-[108px] w-[188px] shrink-0 flex-col items-center justify-center",
        "border border-white/14 bg-[#ffffff] px-5 py-4 sm:h-[118px] sm:w-[210px]",
        "shadow-[0_12px_28px_-22px_rgba(0,0,0,0.55)]",
        "transition-[border-color,box-shadow] duration-500",
        "ease-[cubic-bezier(0.22,1,0.36,1)]",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:border-accent/60",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_18px_36px_-18px_rgba(255,107,53,0.5)]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0 bottom-0 left-0 w-[2px] origin-bottom scale-y-0 bg-accent",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "[@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-y-100",
        )}
      />

      <motion.div
        className="flex items-center justify-center will-change-transform"
        animate={
          shouldFloat
            ? {
                y: [0, -7, 0, 4, 0],
              }
            : undefined
        }
        transition={
          shouldFloat
            ? {
                duration: 4.2 + (index % 5) * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % 14) * 0.18,
              }
            : undefined
        }
      >
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={240}
          height={96}
          unoptimized
          className="h-[50px] w-auto max-w-[90%] object-contain sm:h-[56px]"
        />
      </motion.div>

      <p className="mt-2.5 max-w-full truncate font-display text-[10px] font-semibold tracking-[0.12em] text-[#0a0a0a]/55 uppercase sm:text-[11px]">
        {client.shortName}
      </p>
    </article>
  );
}

type ClientsMarqueeProps = {
  clients: ClientEntry[];
};

/**
 * Single-row logo marquee with per-logo float — compact height,
 * no duplicate reverse lane.
 */
export default function ClientsMarquee({ clients }: ClientsMarqueeProps) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduce) {
    return (
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4">
        {clients.map((client, index) => (
          <li key={client.name} className="min-w-0">
            <div className="w-full [&_article]:h-[104px] [&_article]:w-full">
              <ClientLogoTile client={client} index={index} float={false} />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  const half = Array.from({ length: HALF_REPEATS }, () => clients).flat();

  return (
    <div className="relative overflow-x-clip py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-navy-950 via-navy-950/80 to-transparent md:w-28" />

      <div
        className="clients-marquee flex w-max"
        style={{ animationPlayState: paused ? "paused" : "running" }}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="flex gap-4 pr-4 md:gap-5">
          {half.map((client, index) => (
            <ClientLogoTile
              key={`a-${client.shortName}-${index}`}
              client={client}
              index={index}
            />
          ))}
        </div>
        <div className="flex gap-4 pr-4 md:gap-5" aria-hidden>
          {half.map((client, index) => (
            <ClientLogoTile
              key={`b-${client.shortName}-${index}`}
              client={client}
              index={index + half.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
