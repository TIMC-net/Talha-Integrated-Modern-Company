"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { whyChooseUs } from "@/data/about";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WhyChooseUs() {
  const [openId, setOpenId] = useState(whyChooseUs[0]?.id);
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/header-contracting.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-950/88" />
      </div>

      <div className="container-site relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="group relative overflow-hidden border border-white/10">
              <div className="img-zoom group relative aspect-[16/11] w-full overflow-hidden sm:aspect-[4/3] md:aspect-[5/6]">
                <Image
                  src="/images/civil-construction.jpg"
                  alt="TIMC contractor expertise — placeholder imagery"
                  fill
                  className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <span className="absolute top-3 left-3 z-10 bg-accent/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-navy-950 uppercase sm:top-4 sm:left-4">
                  Image pending
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent transition duration-700 group-hover:from-navy-950/95" />
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
                className="absolute right-5 bottom-5 left-5 border border-white/10 bg-navy-950/90 p-5 backdrop-blur-sm md:right-6 md:bottom-6 md:left-6"
              >
                <p className="font-display text-[12px] font-semibold tracking-[2px] text-accent uppercase">
                  Why Partners Choose TIMC
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">
                  Disciplined delivery across civil, foundation and energy
                  packages — with integrated equipment support.
                </p>
              </motion.div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="inline-block h-[7px] w-[7px] bg-accent" aria-hidden />
                <p className="font-display text-[13px] font-semibold tracking-[1.5px] text-white uppercase">
                  Why Choose Us
                </p>
                <span className="inline-block h-[7px] w-[7px] bg-accent" aria-hidden />
              </div>

              <h2 className="mt-4 font-display text-2xl font-bold text-white uppercase md:text-[36px] md:leading-[1.15]">
                Expertise and Experience
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
                We bring decades of industry experience to every project. Our
                teams handle complex scopes with clear communication, HSE
                discipline and reliable programme control.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 space-y-3">
              {whyChooseUs.map((item, index) => {
                const open = openId === item.id;

                return (
                  <RevealItem key={item.id}>
                    <div
                      className={`overflow-hidden border transition duration-400 ${
                        open
                          ? "border-accent/70 bg-navy-900/80"
                          : "border-white/10 bg-navy-950/55 hover:border-white/25"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(item.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                        aria-expanded={open}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-display text-[13px] font-bold text-accent/80">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[15px] font-semibold text-white md:text-[16px]">
                            {item.title}
                          </span>
                        </span>
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center transition duration-300 ${
                            open
                              ? "bg-accent text-navy-950"
                              : "bg-white/5 text-white"
                          }`}
                        >
                          <ArrowUpRight
                            className={`h-[17px] w-[17px] transition-transform duration-300 ${
                              open ? "rotate-45" : ""
                            }`}
                            strokeWidth={1.75}
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            key={`${item.id}-body`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 px-5 pb-5 md:px-6">
                              <p className="pt-4 text-[14px] leading-[1.75] text-white/60">
                                {item.description}
                              </p>
                              <p className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold tracking-wide text-accent uppercase">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Contractor standard
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
