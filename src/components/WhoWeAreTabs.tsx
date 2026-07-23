"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { whoWeAre } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WhoWeAreTabs() {
  const [active, setActive] = useState(0);
  const tab = whoWeAre[active];

  return (
    <section className="bg-paper py-16 md:py-20">
      <div className="container-site">
        <Reveal>
          <span className="section-eyebrow mb-3">Who We Are</span>
          <h2 className="section-heading mb-10 text-3xl md:text-[34px]">Our Foundations</h2>
        </Reveal>

        {/* Mobile select */}
        <div className="mb-6 md:hidden">
          <select
            className="h-12 w-full border border-border-soft bg-white px-4 text-[13px] font-semibold tracking-wide text-ink uppercase outline-none"
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

        {/* Desktop segmented tab bar */}
        <div className="relative mb-0 hidden border-b border-border-soft md:flex">
          {whoWeAre.map((item, i) => {
            const isActive = active === i;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                className={`relative px-6 py-4 font-display text-[13px] font-bold tracking-wide uppercase transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.title}
                {isActive && (
                  <motion.span
                    layoutId="who-we-are-indicator"
                    className="absolute right-0 -bottom-px left-0 h-[3px] bg-accent"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="border border-t-0 border-border-soft bg-white p-8 md:p-12">
          <div className="max-w-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <h3 className="mb-5 font-display text-2xl font-bold tracking-wide text-ink uppercase">
                  {tab.title}
                </h3>
                <div className="space-y-5 text-[14px] leading-[1.85] text-slate">
                  {tab.content.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
