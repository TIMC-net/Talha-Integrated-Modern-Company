"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Hammer,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/services";

const iconMap: Record<Service["icon"], LucideIcon> = {
  Truck,
  Building2,
  Hammer,
  Zap,
};

const EASE = [0.22, 1, 0.36, 1] as const;

function EngineeringPanel({
  service,
  index,
}: {
  service: Service;
  index: number;
  fromRight?: boolean;
}) {
  const Icon = iconMap[service.icon];
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-media
      className="group relative aspect-[16/10] w-full overflow-hidden border border-white/10 bg-navy-950 sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[520px]"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      {/* Accent edge */}
      <span aria-hidden className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[3px] bg-accent" />

      {/* Corner brackets */}
      <span className="pointer-events-none absolute top-3 left-3 z-20 h-5 w-5 border-t border-l border-accent/70" />
      <span className="pointer-events-none absolute top-3 right-3 z-20 h-5 w-5 border-t border-r border-accent/70" />
      <span className="pointer-events-none absolute bottom-3 left-3 z-20 h-5 w-5 border-b border-l border-accent/70" />
      <span className="pointer-events-none absolute right-3 bottom-3 z-20 h-5 w-5 border-r border-b border-accent/70" />

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover object-center opacity-45 transition duration-[1.1s] ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-55"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/25" />

      <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-6 md:p-8">
        <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-3 font-mono text-[10px] tracking-wide text-white/50 uppercase sm:pb-4 sm:text-[11px]">
          <span className="truncate">TIMC — {service.slug.toUpperCase()}</span>
          <span className="shrink-0 text-accent">DWG REV: 0{index + 1}</span>
        </div>

        {/* Full drawing overlay on desktop only — avoids repeating the title on mobile */}
        <div className="hidden lg:block">
          <motion.div
            className="mb-5 flex h-14 w-14 items-center justify-center bg-accent text-navy-950 shadow-[0_12px_30px_-10px_rgba(255,107,53,0.7)]"
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          >
            <Icon className="h-7 w-7" />
          </motion.div>
          <p className="font-display text-xl font-bold text-white uppercase md:text-2xl">
            {service.name}
          </p>
          <p className="mt-2 text-[13px] text-white/55">
            {service.industries.join(" · ")}
          </p>
          <ul className="mt-5 space-y-2 font-mono text-[12px] text-white/55">
            {service.highlights.map((item, i) => (
              <motion.li
                key={item}
                className="flex gap-2"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.45, ease: EASE }}
              >
                <span className="text-accent">▸</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex items-end justify-between gap-3 lg:hidden">
          <span className="flex h-11 w-11 items-center justify-center bg-accent text-navy-950">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-display text-[11px] font-bold tracking-wide text-white/70 uppercase">
            {service.industries[0]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceDivisionBlock({
  service,
  index,
  fleetOpen = false,
  onViewFleet,
}: {
  service: Service;
  index: number;
  fleetOpen?: boolean;
  onViewFleet?: () => void;
}) {
  const reverse = index % 2 === 1;
  const reduce = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const isIntegrated = service.category === "integrated";
  const divisionLabel = isIntegrated ? "Integrated Division" : "Core Division";

  return (
    <section
      id={service.slug}
      data-dark-surface
      className={`relative scroll-mt-24 overflow-x-clip border-t border-white/10 py-12 md:scroll-mt-28 md:py-16 lg:py-24 ${
        reverse ? "bg-navy-900" : "bg-navy-950"
      }`}
    >
      {/* Soft atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background: reverse
            ? "radial-gradient(ellipse 60% 50% at 85% 20%, rgba(255,107,53,0.08), transparent 60%)"
            : "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(255,107,53,0.08), transparent 60%)",
        }}
      />

      <div className="container-site relative z-10">
        <div
          className={`grid items-stretch gap-8 lg:grid-cols-2 lg:gap-14 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <EngineeringPanel
            service={service}
            index={index}
            fromRight={reverse}
          />

          <motion.div
            className="flex w-full min-w-0 flex-col justify-center"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
          >
            <div className="flex items-end gap-3 sm:gap-4">
              <span className="font-display text-4xl font-bold leading-none text-accent/35 sm:text-5xl md:text-7xl">
                {number}
              </span>
              <div className="mb-1.5">
                <span className="block font-display text-[11px] font-semibold tracking-[2.5px] text-accent uppercase">
                  {divisionLabel}
                </span>
                <span className="mt-2 block h-[2px] w-12 bg-accent" />
              </div>
            </div>

            <p className="mt-5 font-display text-[12px] font-semibold tracking-[2px] text-white/40 uppercase sm:mt-6">
              {isIntegrated ? "Supporting Capability" : `Service ${number}`}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white uppercase sm:text-3xl md:text-[40px] md:leading-[1.15]">
              {service.name}
            </h2>
            <p className="mt-2 font-display text-[14px] font-medium tracking-wide text-accent/90">
              {service.tagline}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/65 md:text-[16px]">
              {service.fullDescription}
            </p>
            <p className="mt-3 border border-accent/25 bg-accent/10 px-3 py-2 text-[11px] text-accent">
              Detailed {service.name} copy and imagery pending from TIMC.
            </p>

            <RevealGroup className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {service.capabilities.slice(0, 8).map((tag) => (
                <RevealItem key={tag} className="min-w-0">
                  <div className="flex items-start gap-3 font-display text-[12px] font-semibold tracking-wide text-white/80 uppercase sm:text-[13px]">
                    <span
                      aria-hidden
                      className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{tag}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup className="mt-8 grid w-full gap-4 sm:grid-cols-2">
              {service.subServices.map((sub, i) => (
                <RevealItem key={sub.title} className="min-w-0">
                  <article className="group/card relative flex h-full w-full flex-col items-center overflow-hidden border border-white/10 bg-black/30 p-5 text-center transition duration-500 hover:border-accent/70 hover:bg-black/45 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                    <span aria-hidden className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent" />
                    <span className="font-display text-[13px] font-bold text-accent/70 transition duration-300 group-hover/card:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-[14px] font-bold text-white uppercase">
                      {sub.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                      {sub.description}
                    </p>
                    <span aria-hidden className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent" />
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15} className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="w-full whitespace-normal text-center sm:w-auto">
                <Link href="/contact">
                  Request {service.name} <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
              {isIntegrated && onViewFleet && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-white/20 text-white hover:border-accent hover:bg-accent hover:text-brand-ink sm:w-auto"
                  onClick={onViewFleet}
                  aria-expanded={fleetOpen}
                >
                  {fleetOpen ? "Hide Fleet Categories" : "View Fleet Categories"}
                </Button>
              )}
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
