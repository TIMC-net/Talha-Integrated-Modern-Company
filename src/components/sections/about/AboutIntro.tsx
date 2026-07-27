"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { PendingBadge, PendingNotice } from "@/components/ui/PendingBadge";
import { aboutTabs } from "@/data/about";
import { company } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;
const yearsActive = new Date().getFullYear() - Number(company.established);

export default function AboutIntro() {
  const [active, setActive] = useState(0);
  const tab = aboutTabs[active];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect reduced-motion and data-saver preferences: stay on the
    // poster image rather than downloading/playing the video.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const isDataConscious =
      connection?.saveData ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g";

    if (prefersReducedMotion || isDataConscious) return;

    video.preload = "auto";
    video.play().catch(() => {});
  }, []);

  return (
    <section data-dark-surface className="bg-navy-950 py-16 md:py-24">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal immediate className="relative w-full min-w-0">
            <div className="group relative mx-auto aspect-video w-full max-w-full overflow-hidden bg-navy-900 sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[5/6]">
              <video
                ref={videoRef}
                className="video-cover absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center 40%" }}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/about-us-img.jpg"
              >
                <source src="/videos/about-company.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
              <div className="absolute top-3 left-3 z-10 sm:top-4 sm:left-4">
                <PendingBadge label="Media pending" />
              </div>
            </div>

            <div className="absolute right-2 bottom-6 hidden w-[130px] bg-accent p-4 text-navy-950 shadow-xl sm:block sm:right-0 md:-right-4 md:bottom-8 md:w-[150px] md:p-5 lg:-right-6">
              <p className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">{yearsActive}+</p>
              <p className="mt-2 text-[11px] font-bold tracking-wide uppercase md:text-[12px]">
                Years of Experience
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase opacity-70">Pending</p>
            </div>
          </Reveal>

          <div>
            <Reveal immediate>
              <span className="section-eyebrow text-accent">Building Company</span>
              <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                Building Your Visions Creating Reality
              </h2>
              <PendingNotice className="mt-4">
                Company profile narrative is placeholder. Final About Us, history,
                and profile copy pending from TIMC.
              </PendingNotice>
              <p className="mt-5 text-[15px] leading-relaxed text-white/65 md:text-[16px]">
                {company.shortName} is a Saudi-owned general contractor delivering civil
                infrastructure, foundation engineering and energy infrastructure —
                with integrated equipment rental supporting every project phase.
              </p>
            </Reveal>

            <Reveal immediate delay={0.08} className="mt-8">
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-0">
                {aboutTabs.map((item, index) => {
                  const isActive = active === index;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`relative px-4 py-3 font-display text-[13px] font-bold tracking-wide uppercase transition ${
                        isActive ? "text-accent" : "text-white/50 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="about-tab-indicator"
                          className="absolute right-0 -bottom-px left-0 h-[2px] bg-accent"
                          transition={{ duration: 0.3, ease: EASE }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="min-h-[160px] border border-t-0 border-white/10 bg-navy-900 p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="space-y-4 text-[14px] leading-relaxed text-white/65"
                  >
                    {tab.content.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-8">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
