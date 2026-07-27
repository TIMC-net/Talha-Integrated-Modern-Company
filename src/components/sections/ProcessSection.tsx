"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { processSteps } from "@/data/process";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.2);
      },
      { threshold: [0.15, 0.3, 0.45] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((prev) => (prev + 1) % processSteps.length);
    }, 2200);

    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      data-dark-surface
      className="bg-navy-950 py-16 md:py-24"
    >
      <div className="container-site">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <span className="section-eyebrow justify-center text-accent">
              How To Process
            </span>
            <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
              Steps Of Construction Work Process
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/60 md:text-[15px]">
              A clear delivery sequence from planning through handover — built for
              infrastructure and industrial contractor projects.
            </p>
          </div>
        </Reveal>

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, index) => {
            const isActive = active === index;

            return (
              <RevealItem key={step.id}>
                <article
                  onMouseEnter={() => {
                    pausedRef.current = true;
                    setActive(index);
                  }}
                  onMouseLeave={() => {
                    pausedRef.current = false;
                  }}
                  className={`group relative h-full overflow-hidden border bg-navy-900 p-6 transition-all duration-500 md:p-7 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 ${
                    isActive
                      ? "border-accent shadow-[0_18px_40px_-24px_rgba(255,107,53,0.55)]"
                      : "border-white/10 hover:border-accent/60"
                  }`}
                >
                  <span
                    className={`absolute top-0 bottom-0 left-0 w-[2px] origin-top bg-accent transition-transform duration-500 ${
                      isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                    }`}
                  />

                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={`font-display text-5xl font-bold transition duration-500 ${
                        isActive ? "text-accent/55" : "text-accent/25 group-hover:text-accent/45"
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`font-display text-[11px] font-semibold tracking-[2px] uppercase transition duration-500 ${
                        isActive ? "text-accent" : "text-white/40"
                      }`}
                    >
                      Step
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[18px] font-bold text-white uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/55">
                    {step.description}
                  </p>

                  <span
                    className={`absolute right-0 bottom-0 left-0 h-[3px] origin-left bg-accent transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />

                  {index < processSteps.length - 1 && (
                    <span className="pointer-events-none absolute top-1/2 -right-3 hidden h-px w-6 bg-white/10 lg:block" />
                  )}
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
