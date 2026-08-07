"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import { serviceGalleryFrames } from "@/data/services";
import { useServiceGalleryCycle } from "@/components/sections/ServiceDivisionMedia";

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
  const frames = serviceGalleryFrames(service);
  const { index: frameIndex, multi, goTo, setPaused, active } =
    useServiceGalleryCycle(frames);

  return (
    <motion.div
      data-media
      className="group/panel relative aspect-[16/10] w-full overflow-hidden border border-white/10 bg-navy-950 sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[520px]"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: EASE }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        {active ? (
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 1.05, ease: EASE }}
            >
              <Image
                src={active}
                alt={
                  multi
                    ? `${service.name} — site ${frameIndex + 1}`
                    : service.name
                }
                fill
                priority={index === 0 && frameIndex === 0}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/15 to-transparent" />

      <div className="pointer-events-none absolute right-5 bottom-10 left-5 z-10 sm:right-6 sm:bottom-12 sm:left-6 md:right-8 md:bottom-14 md:left-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center bg-accent text-navy-950 shadow-[0_12px_30px_-10px_rgba(255,107,53,0.7)] sm:mb-4 sm:h-14 sm:w-14">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <p className="font-display text-xl font-bold tracking-wide text-white uppercase sm:text-2xl md:text-[28px] md:leading-tight">
          {service.name}
        </p>
      </div>

      {multi && (
        <div
          className={[
            "absolute right-5 bottom-4 left-5 z-30 sm:right-6 sm:bottom-5 sm:left-6 md:right-8 md:left-8",
            "flex items-center gap-1.5 px-1 py-1 transition-opacity duration-300 ease-out",
            reduce
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover/panel:pointer-events-auto [@media(hover:hover)_and_(pointer:fine)]:group-hover/panel:opacity-100 group-focus-within/panel:pointer-events-auto group-focus-within/panel:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100",
          ].join(" ")}
          role="tablist"
          aria-label={`${service.name} gallery`}
        >
          <span
            aria-hidden
            className="pointer-events-none h-3 w-3 shrink-0 border-b border-l border-accent/80"
          />
          {frames.map((src, i) => {
            const selected = i === frameIndex;
            return (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Show image ${i + 1} of ${frames.length}`}
                onClick={() => goTo(i)}
                className="group/tick relative h-[3px] min-w-0 flex-1 overflow-hidden bg-white/25 transition-colors hover:bg-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span
                  className={`absolute inset-y-0 left-0 bg-accent transition-[width] duration-300 ease-out ${
                    selected ? "w-full" : "w-0 group-hover/tick:w-1/3"
                  }`}
                />
              </button>
            );
          })}
          <span
            aria-hidden
            className="pointer-events-none h-3 w-3 shrink-0 border-r border-b border-accent/80"
          />
        </div>
      )}
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
      className={`relative scroll-mt-24 overflow-x-clip py-12 md:scroll-mt-28 md:py-16 lg:py-24 ${
        index === 0 ? "border-t-0 pt-6 md:pt-8 lg:pt-12" : "border-t border-white/10"
      } ${reverse ? "bg-navy-900" : "bg-navy-950"}`}
    >
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
            className="flex w-full min-w-0 flex-col justify-center lg:min-h-[520px]"
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

            <RevealGroup className="mt-7 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
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

            <Reveal
              delay={0.12}
              className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Button asChild className="w-full whitespace-normal text-center sm:w-auto">
                <Link href="/contact">
                  Request {service.name}{" "}
                  <ArrowRight className="h-4 w-4 shrink-0" />
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
