"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { aboutFaqs } from "@/data/about";
import { cn } from "@/lib/cn";
import { company } from "@/lib/company";
import WriteOnScroll from "@/components/motion/WriteOnScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutFAQ() {
  const [openId, setOpenId] = useState<string | null>(aboutFaqs[0]?.id ?? null);
  const reduce = useReducedMotion();

  return (
    <section data-dark-surface className="bg-navy-950 py-16 md:py-24">
      <div className="container-site">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex h-full flex-col">
            <Reveal>
              <span className="section-eyebrow text-accent">Special Answer</span>
              <WriteOnScroll
                as="h2"
                text="Frequently Asked Questions"
                className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]"
              />
            </Reveal>

            <RevealGroup className="mt-8 space-y-3">
              {aboutFaqs.map((faq, index) => {
                const open = openId === faq.id;

                return (
                  <RevealItem key={faq.id}>
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
                          ? "border-accent/70 bg-navy-900 shadow-[0_18px_36px_-28px_rgba(255,107,53,0.55)]"
                          : "border-white/10 bg-navy-900/60 hover:border-accent/40 hover:bg-navy-900",
                      )}
                    >
                      {/* Left accent bar */}
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
                        onClick={() => setOpenId(open ? null : faq.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                        aria-expanded={open}
                      >
                        <span className="flex min-w-0 items-start gap-3">
                          <motion.span
                            animate={
                              open
                                ? { scale: 1.05 }
                                : { scale: 1 }
                            }
                            transition={{ duration: 0.3, ease: EASE }}
                            className="mt-0.5 font-display text-[12px] font-bold tabular-nums text-accent"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </motion.span>
                          <span
                            className={cn(
                              "font-display text-[14px] font-bold tracking-wide uppercase transition-colors duration-300 md:text-[15px]",
                              open
                                ? "text-white"
                                : "text-white/90 group-hover/item:text-white",
                            )}
                          >
                            {faq.question}
                          </span>
                        </span>

                        <motion.span
                          animate={
                            open
                              ? {
                                  backgroundColor: "var(--accent)",
                                  color: "var(--brand-ink)",
                                }
                              : {
                                  backgroundColor: "transparent",
                                  color: "var(--accent)",
                                }
                          }
                          transition={{ duration: 0.3, ease: EASE }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center"
                        >
                          <motion.span
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 22,
                            }}
                            className="inline-flex"
                          >
                            <ChevronDown
                              className="h-5 w-5"
                              strokeWidth={1.75}
                            />
                          </motion.span>
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            key={`${faq.id}-body`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.38, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 px-5 pb-5">
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
                                className="pt-4 text-[14px] leading-relaxed text-white/60"
                              >
                                {faq.answer}
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

          <Reveal delay={0.1} className="relative h-full min-h-[360px] lg:min-h-0">
            <div
              data-media
              className="img-zoom group relative h-full min-h-[360px] overflow-hidden border border-white/10 lg:min-h-full"
            >
              {/* Accent edges on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-[3px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />

              <Image
                src="/images/about-faq-crew.jpg"
                alt="TIMC project crew with foundation drilling equipment on site"
                fill
                className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent transition duration-700 group-hover:from-navy-950/90" />

              <span
                aria-hidden
                className="pointer-events-none absolute top-4 right-4 z-10 h-3 w-3 border-t border-r border-white/0 transition-colors duration-500 group-hover:border-accent/80"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 left-4 z-10 h-3 w-3 border-b border-l border-white/0 transition-colors duration-500 group-hover:border-accent/80"
              />
            </div>

            <motion.a
              href={`tel:${company.phone}`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              whileHover={reduce ? undefined : { y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="absolute bottom-6 left-6 right-6 z-10 flex items-center gap-4 bg-accent p-5 text-navy-950 shadow-[0_20px_40px_-20px_rgba(255,107,53,0.55)] transition-colors hover:bg-accent-light md:left-8 md:right-auto md:min-w-[280px]"
            >
              <motion.span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center bg-navy-950 text-accent"
                whileHover={reduce ? undefined : { scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <Phone className="h-5 w-5" />
              </motion.span>
              <span>
                <span className="block text-[12px] font-semibold tracking-wide uppercase opacity-80">
                  Still have questions?
                </span>
                <span className="mt-0.5 block font-display text-[18px] font-bold">
                  {company.phone}
                </span>
              </span>
            </motion.a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
