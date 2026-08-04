"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperClass from "swiper";
import { Reveal } from "@/components/motion/Reveal";
import { getService } from "@/data/services";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

import "swiper/css";

function ProjectSlide({
  project,
  isActive,
  index,
}: {
  project: (typeof projects)[number];
  isActive: boolean;
  index: number;
}) {
  const service = getService(project.service);
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      data-media
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "relative block aspect-[4/5] w-full overflow-hidden outline-none sm:aspect-[3/4] lg:aspect-[4/5] xl:h-[440px] xl:aspect-auto",
        "transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isActive
          ? "z-[1] opacity-100"
          : "z-0 opacity-[0.55] saturate-[0.75]",
      )}
    >
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
        className={cn(
          "object-cover object-center transition duration-[1.1s] ease-out",
          isActive ? "scale-105" : "scale-100",
        )}
      />

      {/* Cinematic grade — stronger only when focused */}
      <div
        className={cn(
          "absolute inset-0 transition duration-700",
          isActive
            ? "bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/35 to-[#0a0a0a]/10"
            : "bg-[#0a0a0a]/40",
        )}
      />

      {/* Index marker */}
      <span
        className={cn(
          "absolute top-4 left-4 z-10 font-display text-[11px] font-semibold tracking-[0.2em] uppercase transition duration-500",
          isActive ? "text-[#ffffff]/90" : "text-[#ffffff]/40",
        )}
      >
        {number}
      </span>

      {/* Focused caption — type over gradient, no stacked boxes */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 px-4 pb-5 pt-16 sm:px-5 sm:pb-6",
          "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isActive
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0",
        )}
      >
        <div
          className={cn(
            "mb-3 h-px w-8 bg-accent transition-all duration-700 delay-75",
            isActive ? "scale-x-100 opacity-100" : "origin-left scale-x-0 opacity-0",
          )}
        />

        {service && (
          <p
            className={cn(
              "font-display text-[11px] font-semibold tracking-[0.18em] text-accent uppercase transition-all duration-500 delay-100",
              isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            {service.name}
          </p>
        )}

        <h3
          className={cn(
            "mt-2 font-display text-[17px] leading-snug font-bold tracking-wide text-[#ffffff] uppercase sm:text-[18px] lg:text-[19px]",
            "transition-all duration-500 delay-150",
            isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          {project.title}
        </h3>

        <p
          className={cn(
            "mt-2 text-[13px] text-[#ffffff]/65 transition-all duration-500 delay-200",
            isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          {project.location}
        </p>
      </div>

      {/* Quiet autoplay meter */}
      {isActive ? (
        <span
          key={`progress-${project.id}`}
          aria-hidden
          className="project-slide-progress absolute inset-x-0 bottom-0 z-20 h-[2px] bg-accent"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 h-px bg-[#ffffff]/10"
        />
      )}
    </Link>
  );
}

export default function PortfolioPreview() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section data-dark-surface className="overflow-x-clip bg-navy-950 py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
            <div className="max-w-2xl">
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
              className="group inline-flex items-center gap-2 border-b border-accent pb-1 font-display text-[13px] font-bold tracking-[0.12em] text-accent uppercase transition hover:gap-3 hover:text-accent-light"
            >
              View all completed
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="overflow-visible">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            spaceBetween={16}
            slidesPerView={1}
            loop
            speed={800}
            touchAngle={25}
            threshold={8}
            touchStartPreventDefault={false}
            resistanceRatio={0.65}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="!overflow-hidden"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.id} className="!h-auto">
                <ProjectSlide
                  project={project}
                  isActive={index === activeIndex}
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 flex items-center border-t border-white/10 pt-6">
            <div className="flex gap-2">
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
