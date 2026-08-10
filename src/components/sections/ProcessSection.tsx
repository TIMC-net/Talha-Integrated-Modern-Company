"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import WriteOnScroll from "@/components/motion/WriteOnScroll";
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

  const topSteps = processSteps.slice(0, 4);
  const bottomSteps = processSteps.slice(4);

  function renderCard(step: (typeof processSteps)[number], index: number) {
    const isActive = active === index;

    return (
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
      </article>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-dark-surface
      className="bg-navy-950 pt-6 pb-12 md:pt-8 md:pb-16"
    >
      <div className="container-site">
        <Reveal>
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
            <span className="section-eyebrow justify-center text-accent">
              How To Process
            </span>
            <WriteOnScroll
                as="h2"
                text="Steps Of Construction Work Process"
                className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]"
              />
            <p className="mt-4 text-[14px] leading-relaxed text-white/60 md:text-[15px]">
              A clear delivery sequence from planning through handover — built for
              infrastructure and industrial contractor projects.
            </p>
          </div>
        </Reveal>

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {topSteps.map((step, index) => (
            <RevealItem key={step.id}>{renderCard(step, index)}</RevealItem>
          ))}
        </RevealGroup>

        {bottomSteps.length > 0 && (
          <RevealGroup className="mt-5 flex flex-col items-stretch justify-center gap-5 sm:flex-row sm:justify-center lg:mt-6 lg:gap-6">
            {bottomSteps.map((step, i) => {
              const index = i + topSteps.length;
              return (
                <RevealItem
                  key={step.id}
                  className="w-full sm:max-w-[calc(50%-0.625rem)] lg:w-[calc((100%-4.5rem)/4)] lg:max-w-none"
                >
                  {renderCard(step, index)}
                </RevealItem>
              );
            })}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
