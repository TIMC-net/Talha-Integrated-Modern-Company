"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Check, Hammer, Truck, Zap } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/data/services";

const iconMap = { Truck, Building2, Hammer, Zap };
const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const Icon = iconMap[service.icon];

  return (
    <section data-dark-surface data-media className="relative overflow-x-clip bg-navy-900 py-16 md:py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/header-contracting.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-950/80" />
      </div>

      <div className="container-site relative z-10">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <span className="section-eyebrow justify-center text-accent">
              Our Divisions
            </span>
            <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
              Contractor Capabilities Across the Kingdom
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/60 md:text-[15px]">
              Civil infrastructure, foundation engineering, and energy
              infrastructure — with equipment rental as an integrated supporting
              division.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Service divisions"
            className="mb-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:gap-3 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {services.map((item, index) => {
              const TabIcon = iconMap[item.icon];
              const isActive = index === active;
              const shortName =
                item.name === "Civil Infrastructure"
                  ? "Civil"
                  : item.name === "Foundation Engineering"
                    ? "Foundation"
                    : item.name === "Energy Infrastructure"
                      ? "Energy"
                      : item.name === "Equipment Rental"
                        ? "Equipment"
                        : item.name;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(index)}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex shrink-0 items-center gap-2 border px-3 py-2.5 font-display text-[11px] font-bold tracking-wide uppercase transition sm:px-4 sm:py-3 sm:text-[12px] md:px-5 md:text-[13px] ${
                    isActive
                      ? "border-accent bg-accent text-navy-950"
                      : "border-white/15 bg-white/5 text-white [@media(hover:hover)_and_(pointer:fine)]:hover:border-accent [@media(hover:hover)_and_(pointer:fine)]:hover:text-accent"
                  }`}
                >
                  <TabIcon className="h-4 w-4 shrink-0" />
                  <span className="md:hidden">{shortName}</span>
                  <span className="hidden md:inline">{item.name}</span>
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid overflow-hidden border border-white/10 bg-navy-900 lg:grid-cols-2"
          >
            <div className="img-zoom group relative aspect-[16/11] w-full overflow-hidden sm:aspect-[16/10] sm:min-h-0 lg:aspect-auto lg:min-h-[440px]">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-900/40" />
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.35, ease: EASE }}
                className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center bg-accent text-navy-950 shadow-lg sm:bottom-6 sm:left-6 sm:h-16 sm:w-16"
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </motion.div>
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-7 md:p-10 lg:p-12">
              <p className="font-display text-[11px] font-semibold tracking-[2px] text-accent uppercase sm:text-[12px]">
                {service.tagline}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-white uppercase sm:mt-3 sm:text-2xl md:text-[28px]">
                {service.name}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60 sm:mt-4 sm:text-[15px]">
                {service.fullDescription.slice(0, 220)}…
              </p>

              <ul className="mt-6 space-y-3">
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-white/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button asChild>
                  <Link href={`/services#${service.slug}`}>
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
