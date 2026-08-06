"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useTheme } from "@/components/theme/ThemeProvider";
import { whyChooseUs } from "@/data/about";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WhyChooseUs() {
  const [openId, setOpenId] = useState<string | undefined>(undefined);
  const reduce = useReducedMotion();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";

  return (
    <div
      data-dark-surface
      className="relative overflow-x-clip bg-navy-950 py-16 md:py-24"
    >
      <div className="container-site relative z-10">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="h-full min-h-[360px] lg:min-h-0">
            <div className="group relative h-full min-h-[360px] overflow-hidden border border-white/10 lg:min-h-full">
              {/* Accent edge draws on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />

              <div data-media className="img-zoom absolute inset-0">
                <Image
                  src="/images/why-choose-us-crew.jpg"
                  alt="TIMC team with drilling equipment on a project site"
                  fill
                  className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent transition duration-700 group-hover:from-[#0a0a0a]/90" />
              </div>

              {/* Hover corner marks */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-4 right-4 z-10 h-3 w-3 border-t border-r border-white/0 transition-colors duration-500 group-hover:border-accent/80"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 left-4 z-10 h-3 w-3 border-b border-l border-white/0 transition-colors duration-500 group-hover:border-accent/80"
              />

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
                className={cn(
                  "absolute right-5 bottom-5 left-5 z-10 border p-5 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:right-6 md:bottom-6 md:left-6",
                  "group-hover:-translate-y-1 group-hover:border-accent/50 group-hover:shadow-[0_20px_40px_-24px_rgba(255,107,53,0.45)]",
                  isLight
                    ? "border-black/10 bg-[#ffffff]/95"
                    : "border-[rgba(255,255,255,0.12)] bg-[#0a0a0a]/90",
                )}
              >
                <p className="font-display text-[12px] font-semibold tracking-[2px] text-accent uppercase">
                  Why Partners Choose TIMC
                </p>
                <p
                  className={cn(
                    "mt-2 text-[14px] leading-relaxed",
                    isLight ? "text-[#0a0a0a]/70" : "text-[#ffffff]/70",
                  )}
                >
                  Disciplined delivery across civil, foundation and energy
                  packages — with integrated equipment support.
                </p>
              </motion.div>
            </div>
          </Reveal>

          <div className="flex h-full flex-col">
            <Reveal>
              <div className="flex items-center gap-3">
                <motion.span
                  aria-hidden
                  className="inline-block h-[7px] w-[7px] bg-accent"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 380, damping: 18 }}
                />
                <p className="font-display text-[13px] font-semibold tracking-[1.5px] text-white uppercase">
                  Why Choose Us
                </p>
                <motion.span
                  aria-hidden
                  className="inline-block h-[7px] w-[7px] bg-accent"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 18,
                    delay: 0.08,
                  }}
                />
              </div>

              <h2 className="mt-4 font-display text-2xl font-bold text-white uppercase md:text-[36px] md:leading-[1.15]">
                Expertise and Experience
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
                Clients choose TIMC for integrated engineering and contracting,
                a modern equipment fleet, experienced professionals, and
                reliable delivery from planning through completion.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 space-y-3">
              {whyChooseUs.map((item, index) => {
                const open = openId === item.id;

                return (
                  <RevealItem key={item.id}>
                    <motion.div
                      layout={!reduce}
                      whileHover={
                        reduce
                          ? undefined
                          : open
                            ? undefined
                            : { x: 3 }
                      }
                      className={cn(
                        "group/item relative overflow-hidden border transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        open
                          ? "border-accent/70 bg-navy-900/80 shadow-[0_18px_36px_-28px_rgba(255,107,53,0.55)]"
                          : "border-white/10 bg-navy-950/55 hover:border-accent/40 hover:bg-navy-900/60",
                      )}
                    >
                      {/* Left accent — draws on open / peeks on hover */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute top-0 bottom-0 left-0 w-[2px] origin-top bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          open
                            ? "scale-y-100"
                            : "scale-y-0 group-hover/item:scale-y-100",
                        )}
                      />

                      <button
                        type="button"
                        onClick={() => setOpenId(open ? undefined : item.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                        aria-expanded={open}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <motion.span
                            animate={
                              open
                                ? { scale: 1.05, color: "var(--accent)" }
                                : { scale: 1, color: "rgba(255,107,53,0.8)" }
                            }
                            transition={{ duration: 0.3, ease: EASE }}
                            className="font-display text-[13px] font-bold tabular-nums"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </motion.span>
                          <span
                            className={cn(
                              "font-display text-[15px] font-semibold transition-colors duration-300 md:text-[16px]",
                              open
                                ? "text-white"
                                : "text-white/90 group-hover/item:text-white",
                            )}
                          >
                            {item.title}
                          </span>
                        </span>
                        <motion.span
                          animate={
                            open
                              ? {
                                  backgroundColor: "var(--accent)",
                                  color: "var(--brand-ink)",
                                }
                              : isLight
                                ? {
                                    backgroundColor: "rgba(10,10,10,0.06)",
                                    color: "var(--brand-ink)",
                                  }
                                : {
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    color: "#ffffff",
                                  }
                          }
                          transition={{ duration: 0.3, ease: EASE }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center"
                        >
                          <motion.span
                            animate={{ rotate: open ? 0 : 45 }}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 22,
                            }}
                            className="inline-flex"
                          >
                            <ArrowUpRight
                              className="h-[17px] w-[17px]"
                              strokeWidth={1.75}
                            />
                          </motion.span>
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            key={`${item.id}-body`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.38, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 px-5 pb-5 md:px-6">
                              <motion.p
                                initial={
                                  reduce ? false : { opacity: 0, y: 8 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.35,
                                  delay: 0.06,
                                  ease: EASE,
                                }}
                                className="pt-4 text-[14px] leading-[1.75] text-white/60"
                              >
                                {item.description}
                              </motion.p>
                              <motion.p
                                initial={
                                  reduce ? false : { opacity: 0, y: 6 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.35,
                                  delay: 0.12,
                                  ease: EASE,
                                }}
                                className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold tracking-wide text-accent uppercase"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Contractor standard
                              </motion.p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
