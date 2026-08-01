"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperClass from "swiper";
import { Reveal } from "@/components/motion/Reveal";
import { getService } from "@/data/services";
import { projects } from "@/data/projects";

import "swiper/css";
import "swiper/css/navigation";

function ProjectSlide({
  project,
  isActive,
}: {
  project: (typeof projects)[number];
  isActive: boolean;
}) {
  const service = getService(project.service);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      data-media
      className="group relative block aspect-[16/10] w-full overflow-hidden sm:aspect-auto sm:h-[400px] lg:h-[460px]"
    >
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
        className={`object-cover object-center transition duration-700 ease-out ${
          isActive
            ? "scale-105"
            : "scale-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
        }`}
      />
      <div
        className={`absolute inset-0 bg-navy-950/25 transition duration-500 ${
          isActive ? "bg-navy-950/35" : "group-hover:bg-navy-950/40"
        }`}
      />

      <span className="absolute top-3 left-3 z-10 bg-accent/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-navy-950 uppercase">
        Photo pending
      </span>

      {/* Overlay reveals on active slide / hover — matches Abuild recording */}
      <div
        className={`absolute right-0 bottom-0 left-0 p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-5 ${
          isActive
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
        }`}
      >
        {service && (
          <span className="mb-2 inline-block bg-accent px-3 py-1.5 font-display text-[11px] font-bold tracking-wide text-white uppercase">
            {service.name}
          </span>
        )}
        <div className="bg-navy-950 px-4 py-3">
          <h3 className="font-display text-[15px] font-bold text-white uppercase sm:text-[16px]">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioPreview() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section data-dark-surface className="overflow-x-hidden overflow-y-visible bg-navy-950 py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-12 md:flex-row md:items-end">
            <div>
              <span className="section-eyebrow text-accent">Completed Projects</span>
              <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                Our Project Clarity
              </h2>
              <p className="mt-3 max-w-xl text-[14px] text-white/55">
                Selected completed contractor packages across civil, foundation,
                and industrial works. Project photography pending from TIMC.
              </p>
              <span className="mt-3 inline-block bg-accent/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-accent uppercase">
                Photos pending
              </span>
            </div>

            <Link
              href="/projects/completed"
              className="inline-flex items-center gap-2 bg-accent px-5 py-3 font-display text-[13px] font-bold tracking-wide text-navy-950 uppercase transition hover:bg-accent-light"
            >
              View All Completed <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="overflow-hidden">
          <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            spaceBetween={16}
            slidesPerView={1}
            loop
            speed={700}
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
              <SwiperSlide key={project.id}>
                <ProjectSlide
                  project={project}
                  isActive={index === activeIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-12 w-12 items-center justify-center border border-white/15 bg-navy-900 text-white transition hover:border-accent hover:bg-accent hover:text-brand-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-12 w-12 items-center justify-center bg-accent text-navy-950 transition hover:bg-accent-light"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
