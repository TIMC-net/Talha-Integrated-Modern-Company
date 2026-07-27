"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperClass from "swiper";
import { Reveal } from "@/components/motion/Reveal";
import { testimonials } from "@/data/testimonials";

import "swiper/css";
import "swiper/css/navigation";

export default function AboutTestimonials() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [active, setActive] = useState(0);

  return (
    <section data-dark-surface className="border-t border-white/10 bg-navy-900 py-16 md:py-24">
      <div className="container-site">
        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-12 md:flex-row md:items-end">
            <div>
              <span className="section-eyebrow text-accent">Testimonials</span>
              <h2 className="section-heading section-heading--on-dark mt-4 max-w-xl text-2xl md:text-[36px]">
                What Our Clients Say About Our Work
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-2 font-display text-[12px] tracking-wide text-white/40">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-11 w-11 items-center justify-center border border-white/15 bg-navy-950 text-white transition hover:border-accent hover:bg-accent hover:text-navy-950"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-11 w-11 items-center justify-center bg-accent text-navy-950 transition hover:bg-accent-light"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActive(swiper.realIndex);
            }}
            onSlideChange={(swiper) => setActive(swiper.realIndex)}
            spaceBetween={24}
            slidesPerView={1}
            loop
            speed={600}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <article className="group/card relative flex h-full min-h-[280px] flex-col overflow-hidden border border-white/10 bg-navy-950 p-7 transition-all duration-500 hover:border-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                  <span className="absolute top-0 bottom-0 left-0 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover/card:scale-y-100" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-1 text-accent" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          fill={i < item.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-accent/25 transition duration-500 group-hover/card:text-accent/50" strokeWidth={1.25} />
                  </div>
                  <p className="mt-5 flex-1 text-[15px] leading-relaxed text-white/65">
                    &ldquo;{item.testimonialText}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="font-display text-[14px] font-bold text-white uppercase transition duration-300 group-hover/card:text-accent">
                      {item.clientName}
                    </p>
                    <p className="mt-1 text-[13px] text-white/45">{item.company}</p>
                  </div>
                  <span className="absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover/card:scale-x-100" />
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
}
