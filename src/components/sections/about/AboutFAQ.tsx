"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { aboutFaqs } from "@/data/about";
import { company } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutFAQ() {
  const [openId, setOpenId] = useState<string | null>(aboutFaqs[0]?.id ?? null);

  return (
    <section data-dark-surface className="bg-navy-950 py-16 md:py-24">
      <div className="container-site">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="h-full">
            <span className="section-eyebrow text-accent">Special Answer</span>
            <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-3">
              {aboutFaqs.map((faq) => {
                const open = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`border transition ${
                      open ? "border-accent bg-navy-900" : "border-white/10 bg-navy-900/60"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : faq.id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-display text-[14px] font-bold tracking-wide text-white uppercase md:text-[15px]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-white/10 px-5 py-4 text-[14px] leading-relaxed text-white/60">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative h-full min-h-[360px] lg:min-h-0">
            <div className="img-zoom group relative h-full min-h-[360px] overflow-hidden lg:min-h-full">
              <Image
                src="/images/about-faq-crew.jpg"
                alt="TIMC project crew with foundation drilling equipment on site"
                fill
                className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-navy-950/10" />
            </div>

            <a
              href={`tel:${company.phone}`}
              className="absolute bottom-6 left-6 right-6 z-10 flex items-center gap-4 bg-accent p-5 text-navy-950 transition hover:bg-accent-light md:left-8 md:right-auto md:min-w-[280px]"
            >
              <span className="flex h-12 w-12 items-center justify-center bg-navy-950 text-accent">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[12px] font-semibold tracking-wide uppercase opacity-80">
                  Still have questions?
                </span>
                <span className="mt-0.5 block font-display text-[18px] font-bold">
                  {company.phone}
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
