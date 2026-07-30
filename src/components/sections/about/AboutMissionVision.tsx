"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { whoWeAre } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutMissionVision() {
  const [active, setActive] = useState(0);
  const tab = whoWeAre[active];

  return (
    <section data-dark-surface className="border-t border-white/10 bg-navy-950 py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <span className="section-eyebrow text-accent">Who We Are</span>
          <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
            Mission, Vision &amp; Values
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-white/60">
            The principles that guide TIMC&apos;s engineering, construction, and
            integrated equipment delivery across Saudi Arabia and the GCC.
          </p>
        </Reveal>

        <div className="mt-10">
          <div className="mb-6 md:hidden">
            <select
              className="h-12 w-full border border-white/15 bg-navy-900 px-4 text-[13px] font-semibold tracking-wide text-white uppercase outline-none"
              value={active}
              onChange={(e) => setActive(Number(e.target.value))}
            >
              {whoWeAre.map((item, i) => (
                <option key={item.id} value={i}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="relative mb-0 hidden border-b border-white/10 md:flex">
            {whoWeAre.map((item, i) => {
              const isActive = active === i;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative px-6 py-4 font-display text-[13px] font-bold tracking-wide uppercase transition ${
                    isActive ? "text-accent" : "text-white/45 hover:text-white"
                  }`}
                >
                  {item.title}
                  {isActive && (
                    <motion.span
                      layoutId="about-who-tab"
                      className="absolute right-0 bottom-0 left-0 h-[2px] bg-accent"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="border border-t-0 border-white/10 bg-navy-900 p-7 md:p-10"
            >
              <h3 className="font-display text-xl font-bold text-white uppercase md:text-2xl">
                {tab.title}
              </h3>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-white/65">
                {tab.content.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
