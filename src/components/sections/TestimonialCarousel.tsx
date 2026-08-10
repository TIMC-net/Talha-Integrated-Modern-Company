"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import WriteOnScroll from "@/components/motion/WriteOnScroll";
import { testimonials } from "@/data/testimonials";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 5500;

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const total = testimonials.length;
  const testimonial = testimonials[active];

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused || reduce || total <= 1) return;
    const id = window.setInterval(goNext, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, total, goNext]);

  return (
    <section data-dark-surface className="overflow-x-clip bg-navy-950 py-12 md:py-16">
      <div className="container-site">
        <Reveal>
          <div className="mb-8 md:mb-10">
            <span className="section-eyebrow text-accent">Our Testimonial</span>
            <WriteOnScroll
                as="h2"
                text="What Our Clients Say About Our Work"
                className="section-heading section-heading--on-dark mt-4 max-w-2xl text-2xl md:text-[36px]"
              />
            <p className="mt-3 max-w-xl text-[14px] text-white/55">
              Feedback from project partners across TIMC&apos;s completed works
              in solar, power, housing, and industrial construction.
            </p>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          <div className="flex min-h-0 flex-col justify-between bg-accent p-6 text-navy-950 sm:p-8 md:min-h-[420px] md:p-10">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase sm:text-3xl md:text-[40px]">
                Let&apos;s Build Future
              </h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-navy-950/75 sm:mt-4 sm:text-[15px]">
                Partner with TIMC for civil infrastructure, foundation
                engineering, energy projects, and integrated equipment support
                across Saudi Arabia.
              </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <Button
                asChild
                size="lg"
                className="w-full bg-navy-950 text-white hover:bg-navy-900 sm:w-auto"
              >
                <Link href="/contact">
                  Get Started Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div
            className="relative min-h-[320px] border border-white/10 bg-navy-900 sm:min-h-[380px] md:min-h-[420px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={testimonial.id}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex min-h-[320px] flex-col p-5 pb-16 sm:min-h-[380px] sm:p-7 sm:pb-20 md:min-h-[420px] md:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex items-center gap-1 text-accent"
                    role="img"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <Quote className="h-10 w-10 text-accent/40" strokeWidth={1.25} />
                </div>

                <p className="mt-6 flex-1 text-[16px] leading-relaxed text-white/80 md:text-[17px]">
                  &ldquo;{testimonial.testimonialText}&rdquo;
                </p>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-display text-[15px] font-bold tracking-wide text-white uppercase">
                    {testimonial.clientName}
                  </p>
                  <p className="mt-1 text-[13px] text-white/55">
                    {testimonial.company}
                  </p>
                  <span className="mt-3 inline-block bg-accent/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent uppercase">
                    {testimonial.service}
                  </span>
                </div>
              </motion.article>
            </AnimatePresence>

            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 sm:right-5 sm:left-auto lg:right-5">
              <span className="mr-2 font-display text-[12px] tracking-wide text-white/45">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={goPrev}
                className="slider-nav-btn h-10 w-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={goNext}
                className="slider-nav-btn h-10 w-10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
