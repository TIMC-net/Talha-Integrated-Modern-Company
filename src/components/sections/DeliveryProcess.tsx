"use client";

import { useEffect, useRef, useState } from "react";
import { deliveryProcess } from "@/data/services-page";

export default function DeliveryProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.2;
        setInView(visible);
        if (visible) setRevealed(true);
      },
      { threshold: [0.15, 0.3, 0.45] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;

    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % deliveryProcess.length);
    }, 2400);

    return () => window.clearInterval(id);
  }, [inView, paused]);

  const progress = ((active + 1) / deliveryProcess.length) * 100;

  return (
    <div ref={sectionRef}>
      <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <p className="font-display text-[12px] font-semibold tracking-[2.5px] text-accent uppercase">
          How We Deliver
        </p>
        <h2 className="section-heading section-heading--on-dark mt-3 text-2xl md:text-[36px]">
          Our Delivery Process
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-white/60">
          A structured methodology that keeps every package safe, on time, and to
          specification.
        </p>
      </div>

      {/* Progress track — desktop */}
      <div className="relative mb-10 hidden md:block">
        <div className="absolute top-5 right-[10%] left-[10%] h-px bg-white/15" />
        <div
          className="absolute top-5 left-[10%] h-px bg-accent transition-[width] duration-700 ease-out"
          style={{ width: `calc(${progress}% * 0.8)` }}
        />
        <div className="relative flex justify-between px-[6%]">
          {deliveryProcess.map((step, index) => {
            const isActive = active === index;
            const isDone = index < active;
            return (
              <button
                key={step.id}
                type="button"
                onMouseEnter={() => {
                  setPaused(true);
                  setActive(index);
                }}
                onMouseLeave={() => setPaused(false)}
                onClick={() => setActive(index)}
                className="flex flex-col items-center"
                aria-label={step.title}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-[13px] font-bold transition duration-500 ${
                    isActive
                      ? "scale-110 border-accent bg-accent text-navy-950 shadow-[0_0_24px_rgba(255,107,53,0.45)]"
                      : isDone
                        ? "border-accent bg-accent/20 text-accent"
                        : "border-white/25 bg-navy-950 text-white/45"
                  }`}
                >
                  {step.number}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        onMouseLeave={() => setPaused(false)}
      >
        {deliveryProcess.map((step, index) => {
          const isActive = active === index;
          const delay = revealed ? index * 90 : 0;

          return (
            <article
              key={step.id}
              onMouseEnter={() => {
                setPaused(true);
                setActive(index);
              }}
              style={{
                transitionDelay: revealed ? `${delay}ms` : "0ms",
              }}
              className={`relative flex h-full flex-col overflow-hidden border p-5 transition-all duration-500 md:p-6 ${
                revealed
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } ${
                isActive
                  ? "border-accent bg-navy-900 shadow-[0_20px_40px_-24px_rgba(255,107,53,0.5)]"
                  : "border-white/10 bg-navy-900/70 hover:border-accent/40"
              }`}
            >
              <span
                className={`font-display text-4xl font-bold transition duration-500 ${
                  isActive ? "text-accent" : "text-accent/35"
                }`}
              >
                {step.number}
              </span>
              <p className="mt-1 font-display text-[11px] font-semibold tracking-[2px] text-white/35 uppercase">
                Step
              </p>
              <h3 className="mt-4 font-display text-[14px] font-bold text-white uppercase md:text-[15px]">
                {step.title}
              </h3>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-white/55">
                {step.description}
              </p>

              <span
                className={`mt-5 h-[2px] w-full origin-left bg-accent transition-transform duration-500 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}
