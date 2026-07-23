"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Pressable from "@/components/motion/Pressable";
import { slides } from "@/lib/company";

const AUTO_MS = 5500;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section
      id="home-hero"
      className="relative -mt-[84px] h-[560px] overflow-hidden md:h-[650px] lg:-mt-[132px] lg:h-[760px]"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="absolute inset-0 bg-navy-900">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className={`object-cover transition-opacity duration-700 ease-out ${
                loaded[index] ? "opacity-100" : "opacity-0"
              }`}
              sizes="100vw"
              quality={90}
              onLoad={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink-2/85 via-ink-2/50 to-ink-2/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-2/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center pt-20 lg:pt-28">
        <div className="container-site">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="max-w-2xl text-white"
              initial={reduce ? false : "hidden"}
              animate="show"
              exit="hidden"
            >
              <motion.span
                className="section-eyebrow mb-5 !text-accent-light"
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                Kingdom of Saudi Arabia
              </motion.span>

              <motion.h1
                className="mb-6 font-display text-4xl leading-[1.05] font-bold uppercase md:text-5xl lg:text-[56px]"
                variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              >
                {slide.title}
              </motion.h1>

              <motion.p
                className="mb-9 max-w-lg text-[15px] leading-relaxed text-white/85"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
              >
                {slide.text}
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, delay: 0.34, ease: EASE }}
              >
                <Pressable>
                  <Link href={slide.href} className="btn-primary">
                    Read More <ChevronRight className="h-4 w-4" />
                  </Link>
                </Pressable>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5 sm:left-auto sm:translate-x-0 sm:right-8 lg:right-[calc((100vw-1280px)/2+20px)]">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-accent" : "w-4 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-6 z-10 hidden items-center gap-2 text-white/70 sm:flex lg:left-[calc((100vw-1280px)/2+20px)]"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-4 w-4" />
        <span className="font-display text-[11px] font-semibold tracking-[2px] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
