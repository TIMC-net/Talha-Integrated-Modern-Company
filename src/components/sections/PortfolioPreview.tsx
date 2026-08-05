"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperClass from "swiper";
import { Reveal } from "@/components/motion/Reveal";
import { getService } from "@/data/services";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

import "swiper/css";

const SLIDE_SPEED_MS = 400;

function ProjectSlide({
  project,
  isActive,
  progressKey,
  onProgressComplete,
}: {
  project: (typeof projects)[number];
  isActive: boolean;
  progressKey: number;
  onProgressComplete?: () => void;
}) {
  const service = getService(project.service);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      data-media
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "relative mx-auto block h-full w-full max-w-[min(100%,380px)] overflow-hidden outline-none",
        "aspect-[3/4] sm:aspect-[4/5]",
        "origin-center transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isActive
          ? "z-[2] scale-100 opacity-100 blur-0"
          : "z-0 scale-[0.92] opacity-60 blur-[1px] sm:scale-[0.88] sm:opacity-55 sm:blur-[1.5px]",
      )}
    >
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 33vw"
        className="object-cover object-center"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/92 via-[#0a0a0a]/30 to-[#0a0a0a]/10"
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[#0a0a0a]/35 transition-opacity duration-500",
          isActive ? "opacity-0" : "opacity-100",
        )}
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 px-3 pb-4 pt-14 sm:px-5 sm:pb-6 sm:pt-16",
          "transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isActive ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className={cn(
            "mb-2 h-px w-7 origin-left bg-accent transition-[transform,opacity] duration-500 sm:mb-3 sm:w-8",
            isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
          )}
        />

        {service && (
          <p className="font-display text-[10px] font-semibold tracking-[0.16em] text-accent uppercase sm:text-[11px] sm:tracking-[0.18em]">
            {service.name}
          </p>
        )}

        <h3 className="mt-1.5 line-clamp-3 font-display text-[14px] leading-snug font-bold tracking-wide text-[#ffffff] uppercase sm:mt-2 sm:line-clamp-none sm:text-[16px] md:text-[18px] lg:text-[19px]">
          {project.title}
        </h3>

        <p className="mt-1.5 text-[12px] text-[#ffffff]/65 sm:mt-2 sm:text-[13px]">
          {project.location}
        </p>
      </div>

      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-[#ffffff]/10"
      />
      {isActive ? (
        <span
          key={`progress-${project.id}-${progressKey}`}
          aria-hidden
          className="project-slide-progress absolute inset-x-0 bottom-0 z-20 h-[2px] bg-accent"
          onAnimationEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            onProgressComplete?.();
          }}
        />
      ) : null}
    </Link>
  );
}

export default function PortfolioPreview() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const pausedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const goNext = () => {
    if (pausedRef.current) return;
    swiperRef.current?.slideNext();
  };

  return (
    <section
      data-dark-surface
      className="overflow-hidden bg-navy-950 py-12 md:py-16"
    >
      <div className="container-site min-w-0">
        <Reveal>
          <div className="mb-8 flex flex-col items-start justify-between gap-5 md:mb-10 md:flex-row md:items-end">
            <div className="max-w-2xl min-w-0">
              <span className="section-eyebrow text-accent">Completed Projects</span>
              <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                Our Project Clarity
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/55">
                Selected packages across civil, foundation, and energy
                infrastructure — delivered with disciplined HSE and schedule
                control.
              </p>
            </div>

            <Link
              href="/projects/completed"
              className="group inline-flex shrink-0 items-center gap-2 border-b border-accent pb-1 font-display text-[13px] font-bold tracking-[0.12em] text-accent uppercase transition hover:gap-3 hover:text-accent-light"
            >
              View all completed
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0 overflow-hidden">
          <div
            className="project-clarity-shell min-w-0 overflow-hidden"
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
              setProgressKey((k) => k + 1);
            }}
          >
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setActiveIndex(swiper.realIndex);
              }}
              onRealIndexChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
                setProgressKey((k) => k + 1);
              }}
              onSlideChangeTransitionEnd={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              centeredSlides
              /* Mobile: one large center card + soft peeks. Desktop: three-up. */
              slidesPerView={1.18}
              spaceBetween={12}
              loop
              loopAdditionalSlides={3}
              speed={SLIDE_SPEED_MS}
              touchAngle={35}
              threshold={6}
              touchStartPreventDefault={false}
              resistanceRatio={0.65}
              watchSlidesProgress
              breakpoints={{
                480: {
                  slidesPerView: 1.35,
                  spaceBetween: 14,
                },
                640: {
                  slidesPerView: 2.15,
                  spaceBetween: 16,
                },
                900: {
                  slidesPerView: 3,
                  spaceBetween: 18,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="project-clarity-swiper !overflow-hidden"
            >
              {projects.map((project, index) => (
                <SwiperSlide
                  key={project.id}
                  className="!flex !h-auto items-center justify-center py-1 sm:py-2"
                >
                  <ProjectSlide
                    project={project}
                    isActive={index === activeIndex}
                    progressKey={progressKey}
                    onProgressComplete={
                      index === activeIndex ? goNext : undefined
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-6 flex justify-center border-t border-white/10 pt-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-11 w-11 items-center justify-center border border-white/15 text-white transition hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-11 w-11 items-center justify-center border border-white/15 text-white transition hover:border-accent hover:bg-accent hover:text-[#0a0a0a]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
