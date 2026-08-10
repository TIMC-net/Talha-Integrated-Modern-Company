"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { whoWeAre } from "@/lib/company";
import { cn } from "@/lib/cn";
import WriteOnScroll from "@/components/motion/WriteOnScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutMissionVision() {
  const [active, setActive] = useState(0);
  const tab = whoWeAre[active];
  const reduce = useReducedMotion();

  return (
    <section
      id="mission"
      data-dark-surface
      className="scroll-mt-24 border-t border-white/10 bg-navy-950 py-16 md:py-24"
    >
      <div className="container-site">
        <Reveal>
          <span className="section-eyebrow text-accent">Who We Are</span>
          <WriteOnScroll
                as="h2"
                text="Mission, Vision & Values"
                className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]"
              />
          <p className="mt-4 max-w-2xl text-[15px] text-white/60">
            The principles that guide TIMC&apos;s engineering, construction, and
            integrated equipment delivery across Saudi Arabia and the GCC.
          </p>
        </Reveal>

        <div className="mt-10">
          {/* Mobile tabs */}
          <div
            role="tablist"
            aria-label="Mission, vision and values"
            className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3 md:hidden"
          >
            {whoWeAre.map((item, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  whileTap={reduce ? undefined : { scale: 0.985 }}
                  className={cn(
                    "group relative overflow-hidden border px-4 py-3 text-left font-display text-[12px] font-bold tracking-wide uppercase transition-[border-color,background-color,color,box-shadow] duration-300",
                    isActive
                      ? "border-accent bg-accent/10 text-accent shadow-[0_12px_28px_-18px_rgba(255,107,53,0.7)]"
                      : "border-white/15 bg-navy-900 text-white/65 hover:border-accent/50 hover:bg-accent/[0.06] hover:text-white",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-0 bottom-0 left-0 w-[2px] origin-top bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100",
                    )}
                  />
                  <span className="flex items-center gap-2.5 pl-1">
                    <span
                      className={cn(
                        "font-display text-[11px] font-bold tabular-nums transition-colors duration-300",
                        isActive ? "text-accent" : "text-white/30 group-hover:text-accent/70",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Desktop tabs */}
          <div
            role="tablist"
            aria-label="Mission, vision and values"
            className="relative mb-0 hidden border-b border-white/10 md:flex"
          >
            {whoWeAre.map((item, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  whileHover={reduce ? undefined : { y: -1 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className={cn(
                    "group relative px-6 py-4 font-display text-[13px] font-bold tracking-wide uppercase transition-colors duration-300",
                    isActive ? "text-accent" : "text-white/45 hover:text-white",
                  )}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <span
                      className={cn(
                        "text-[11px] tabular-nums transition-colors duration-300",
                        isActive
                          ? "text-accent/80"
                          : "text-white/25 group-hover:text-accent/60",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </span>
                  {isActive ? (
                    <motion.span
                      layoutId="about-who-tab"
                      className="absolute right-0 bottom-0 left-0 h-[2px] bg-accent"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute right-4 bottom-0 left-4 h-px origin-center scale-x-0 bg-white/25 transition-transform duration-300 group-hover:scale-x-100"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              role="tabpanel"
              initial={
                reduce ? false : { opacity: 0, y: 16, scale: 0.985 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="group/panel relative overflow-hidden border border-white/10 bg-navy-900 p-6 transition-[border-color,box-shadow] duration-500 sm:p-7 md:border-t-0 md:p-10 hover:border-accent/35 hover:shadow-[0_24px_48px_-32px_rgba(255,107,53,0.45)]"
            >
              {/* Accent edge draw */}
              <motion.span
                aria-hidden
                key={`edge-${tab.id}`}
                initial={reduce ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="absolute top-0 bottom-0 left-0 w-[3px] origin-top bg-accent"
              />

              {/* Soft corner marks */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-4 right-4 h-3 w-3 border-t border-r border-accent/0 transition-colors duration-500 group-hover/panel:border-accent/70"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-accent/0 transition-colors duration-500 group-hover/panel:border-accent/70"
              />

              {/* Warm wash on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.07] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
              />

              <div className="relative">
                <motion.p
                  key={`idx-${tab.id}`}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="font-display text-[12px] font-semibold tracking-[0.2em] text-accent uppercase"
                >
                  {String(active + 1).padStart(2, "0")} — Principle
                </motion.p>

                <motion.h3
                  key={`title-${tab.id}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
                  className="mt-2 font-display text-xl font-bold text-white uppercase md:text-2xl"
                >
                  {tab.title}
                </motion.h3>

                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-white/65">
                  {tab.content.map((paragraph, pIndex) => (
                    <motion.p
                      key={paragraph.slice(0, 48)}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.08 + pIndex * 0.06,
                        ease: EASE,
                      }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
