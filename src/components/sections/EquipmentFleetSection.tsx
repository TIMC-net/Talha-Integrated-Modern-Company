"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpFromLine,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Construction,
  Forklift,
  Gauge,
  HardHat,
  Package,
  Target,
  Truck,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperClass from "swiper";
import { Reveal } from "@/components/motion/Reveal";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  fleetCategories,
  type FleetCategory,
  type FleetEquipment,
} from "@/data/fleet";
import { cn } from "@/lib/cn";
import { lockPageScroll } from "@/hooks/useLenis";

import "swiper/css";

const AUTOPLAY_MS = 4200;
const SLIDE_SPEED_MS = 700;

const iconByCategory: Record<string, LucideIcon> = {
  lifting: ArrowUpFromLine,
  civil: Construction,
  transport: Truck,
  rigging: Forklift,
  aerial: HardHat,
  power: Zap,
  site: Package,
};

type SelectedUnit = {
  category: FleetCategory;
  equipment: FleetEquipment;
};

function EquipmentDetailsPanel({
  selected,
  onClose,
}: {
  selected: SelectedUnit;
  onClose: () => void;
}) {
  const titleId = useId();
  const { category, equipment } = selected;
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";

  useEffect(() => {
    const unlock = lockPageScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      data-lenis-prevent
      className="fleet-eq-detail-root fixed inset-0 z-[180] flex items-end justify-center overscroll-none sm:items-center sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close equipment details"
        className={cn(
          "absolute inset-0 backdrop-blur-[6px] transition-colors",
          isLight ? "bg-[#0a0a0a]/45" : "bg-[#0a0a0a]/78",
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          /* Cap height unchanged; desktop width tuned for cover fill */
          "fleet-eq-detail-modal relative z-10 flex max-h-[min(94vh,880px)] w-full max-w-xl flex-col overflow-hidden sm:max-w-2xl md:max-w-4xl lg:max-w-5xl",
          "lg:min-h-[min(74vh,680px)]",
          "animate-[fleetEqModalIn_0.38s_cubic-bezier(0.22,1,0.36,1)_both]",
          "border-2 shadow-[0_40px_100px_-28px_rgba(0,0,0,0.55)]",
          isLight
            ? "border-[rgba(0,0,0,0.16)] bg-[#ffffff]"
            : "border-[rgba(255,255,255,0.2)] bg-[#111111]",
        )}
      >
        <div
          className={cn(
            "grid min-h-0 flex-1 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)]",
            /* Mobile: image + scrollable body share the same max-h shell (no taller modal) */
            "max-lg:flex max-lg:min-h-0 max-lg:flex-1 max-lg:flex-col",
            isLight
              ? "divide-y divide-[rgba(0,0,0,0.12)] lg:divide-x lg:divide-y-0"
              : "divide-y divide-[rgba(255,255,255,0.14)] lg:divide-x lg:divide-y-0",
          )}
        >
          {/* Media — full-bleed cover (edges fill, no black bars); height budget unchanged on mobile */}
          <div
            className={cn(
              "relative shrink-0 overflow-hidden bg-[#0a0a0a]",
              "h-[min(46vh,400px)] w-full max-lg:max-h-[min(46vh,400px)]",
              "sm:h-[min(48vh,440px)] sm:max-lg:max-h-[min(48vh,440px)]",
              "lg:h-auto lg:max-h-none lg:min-h-full",
            )}
          >
            {equipment.image ? (
              <Image
                src={equipment.image}
                alt={equipment.name}
                fill
                sizes="(max-width: 1023px) 100vw, 46vw"
                className="object-cover object-center"
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Package
                  className="h-12 w-12 text-white/20"
                  strokeWidth={1.25}
                />
              </div>
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0a0a0a]/20"
            />

            <div className="absolute top-3 left-3 z-20 sm:top-4 sm:left-4">
              {/* Hex white avoids light-theme text-white → black remap */}
              <span className="inline-flex items-center gap-1.5 border border-[rgba(255,255,255,0.28)] bg-[rgba(10,10,10,0.72)] px-2.5 py-1 font-display text-[9px] font-bold tracking-[0.16em] text-[#ffffff] uppercase backdrop-blur-md">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                Equipment rental
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={cn(
                "absolute top-2.5 right-2.5 z-30 flex h-9 w-9 items-center justify-center rounded-full transition sm:top-3 sm:right-3",
                "border border-[rgba(255,255,255,0.28)] bg-[rgba(10,10,10,0.72)] text-[#ffffff] backdrop-blur-md",
                "hover:border-accent hover:bg-accent hover:text-[#0a0a0a]",
                "lg:hidden",
              )}
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="absolute inset-x-0 bottom-0 z-20 p-3.5 sm:p-5 lg:hidden">
              <p className="font-display text-[10px] font-semibold tracking-[0.16em] text-accent uppercase">
                {category.name}
              </p>
              <p className="mt-1 font-display text-lg font-bold tracking-wide text-[#ffffff] uppercase sm:text-xl">
                {equipment.name}
              </p>
            </div>
          </div>

          {/* Content — scrolls inside fixed modal height; tighter on mobile */}
          <div
            className={cn(
              "relative flex min-h-0 flex-col max-lg:min-h-0 max-lg:flex-1 max-lg:overflow-hidden",
              isLight ? "bg-[#ffffff] text-[#0a0a0a]" : "bg-[#111111] text-[#f5f5f5]",
            )}
          >
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "absolute top-3 right-3 z-20 hidden h-9 w-9 items-center justify-center rounded-full transition lg:flex",
                isLight
                  ? "border border-black/10 bg-[#f5f5f5] text-[#0a0a0a] hover:border-accent hover:bg-accent hover:text-[#0a0a0a]"
                  : "border border-white/12 bg-white/[0.06] text-[#ffffff] hover:border-accent hover:bg-accent hover:text-[#0a0a0a]",
              )}
              aria-label="Close"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <div
              data-lenis-prevent
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3.5 py-3.5 touch-pan-y sm:px-6 sm:py-6 lg:px-7 lg:py-7"
            >
              <p className="font-display text-[10px] font-semibold tracking-[0.18em] text-accent uppercase max-lg:sr-only">
                {category.name}
              </p>
              <h3
                id={titleId}
                className={cn(
                  "font-display text-lg font-bold tracking-wide uppercase sm:text-xl lg:mt-1.5 lg:pr-11 lg:text-[24px] lg:leading-tight",
                  "max-lg:sr-only",
                  isLight ? "text-[#0a0a0a]" : "text-[#ffffff]",
                )}
              >
                {equipment.name}
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 lg:mt-5">
                <div
                  className={cn(
                    "min-w-0 border p-2 sm:p-3",
                    isLight
                      ? "border-[rgba(0,0,0,0.14)] bg-[#f5f5f5]"
                      : "border-[rgba(255,255,255,0.16)] bg-white/[0.04]",
                  )}
                >
                  <div className="flex items-center gap-1.5 text-accent">
                    <Gauge className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                    <p className="font-display text-[9px] font-bold tracking-[0.12em] uppercase">
                      Capacity
                    </p>
                  </div>
                  <p
                    className={cn(
                      "mt-1 font-display text-[15px] font-bold tracking-tight sm:mt-1.5 sm:text-[18px]",
                      isLight ? "text-[#0a0a0a]" : "text-[#ffffff]",
                    )}
                  >
                    {equipment.capacity}
                  </p>
                </div>
                <div
                  className={cn(
                    "min-w-0 border p-2 sm:p-3",
                    isLight
                      ? "border-[rgba(0,0,0,0.14)] bg-[#f5f5f5]"
                      : "border-[rgba(255,255,255,0.16)] bg-white/[0.04]",
                  )}
                >
                  <div className="flex items-center gap-1.5 text-accent">
                    <Target className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                    <p className="font-display text-[9px] font-bold tracking-[0.12em] uppercase">
                      Application
                    </p>
                  </div>
                  <p
                    className={cn(
                      "mt-1 text-[12px] font-semibold leading-snug sm:mt-1.5 sm:text-[14px]",
                      isLight ? "text-[#0a0a0a]" : "text-[#ffffff]",
                    )}
                  >
                    {equipment.application}
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "mt-2.5 border p-2 sm:mt-4 sm:p-3.5",
                  isLight
                    ? "border-[rgba(0,0,0,0.14)] bg-[#fafafa]"
                    : "border-[rgba(255,255,255,0.16)] bg-white/[0.03]",
                )}
              >
                <p className="font-display text-[9px] font-bold tracking-[0.12em] text-accent uppercase">
                  Typical use
                </p>
                <p
                  className={cn(
                    "mt-1 text-[12px] leading-[1.5] sm:mt-1.5 sm:text-[13px] sm:leading-[1.6]",
                    isLight ? "text-[rgba(10,10,10,0.72)]" : "text-[rgba(255,255,255,0.72)]",
                  )}
                >
                  {equipment.description}
                </p>
              </div>

              <div
                className={cn(
                  "mt-3 border-t pt-3 sm:mt-5 sm:pt-4",
                  isLight
                    ? "border-[rgba(0,0,0,0.14)]"
                    : "border-[rgba(255,255,255,0.16)]",
                )}
              >
                <Button asChild size="sm" className="w-full sm:w-auto">
                  <Link href="/contact">
                    Request a quote
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </Link>
                </Button>
                <p
                  className={cn(
                    "mt-2 text-[11px] leading-relaxed",
                    isLight ? "text-[rgba(10,10,10,0.45)]" : "text-[rgba(255,255,255,0.4)]",
                  )}
                >
                  TIMC mobilisation support across Saudi project sites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryFleetCarousel({
  category,
  onViewDetails,
  detailsOpen,
}: {
  category: FleetCategory;
  onViewDetails: (equipment: FleetEquipment) => void;
  detailsOpen: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const Icon = iconByCategory[category.id] ?? Truck;
  const canLoop = category.items.length > 2;
  const autoplayActive = inView && !detailsOpen;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (autoplayActive) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [autoplayActive]);

  return (
    <div
      ref={rootRef}
      id={`fleet-${category.id}`}
      data-fleet-carousel
      style={{ ["--fleet-eq-ms" as string]: `${AUTOPLAY_MS}ms` }}
      className="scroll-mt-28 overflow-hidden border border-white/10 bg-navy-900/60"
    >
      <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 md:px-8 md:py-6">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center bg-accent/15 text-accent">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-[16px] font-bold tracking-wide text-white uppercase md:text-[18px]">
              {category.name}
            </h3>
            <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-white/55">
              {category.description}
            </p>
          </div>
        </div>
        <p className="shrink-0 font-display text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase sm:pb-0.5">
          {category.items.length} units · auto-scrolling
        </p>
      </div>

      {/* Clip slides to this panel — no spill past the card edge while animating */}
      <div className="relative overflow-hidden px-2 py-6 sm:px-4 sm:py-7 md:px-5 md:py-8">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActive(swiper.realIndex);
            if (!autoplayActive) swiper.autoplay?.stop();
          }}
          onSlideChange={(swiper) => {
            setActive(swiper.realIndex);
            setProgressKey((k) => k + 1);
          }}
          slidesPerView={1.7}
          spaceBetween={14}
          speed={SLIDE_SPEED_MS}
          loop={canLoop}
          grabCursor
          watchSlidesProgress
          touchAngle={28}
          threshold={6}
          autoplay={{
            delay: AUTOPLAY_MS,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: { slidesPerView: 2.1, spaceBetween: 14 },
            700: { slidesPerView: 2.9, spaceBetween: 16 },
            960: { slidesPerView: 3.7, spaceBetween: 16 },
            1200: { slidesPerView: 4.4, spaceBetween: 18 },
          }}
          className="fleet-eq-swiper !overflow-hidden"
        >
          {category.items.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <article
                className={cn(
                  "group/eq relative flex h-full flex-col overflow-hidden border border-white/10 bg-navy-950",
                  "transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:border-accent/60 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1",
                  "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_22px_44px_-28px_rgba(255,107,53,0.45)]",
                )}
              >
                <span
                  aria-hidden
                  className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/eq:scale-y-100 group-focus-within/eq:scale-y-100"
                />

                <div
                  data-media
                  className="relative aspect-[2/3] w-full overflow-hidden bg-[#141414]"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 699px) 55vw, (max-width: 1199px) 28vw, 22vw"
                      className="object-cover object-center transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/eq:scale-[1.06] group-focus-within/eq:scale-[1.06]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#141414]">
                      <Icon
                        className="h-10 w-10 text-white/15"
                        strokeWidth={1.25}
                      />
                    </div>
                  )}

                  {/* Touch: full-photo tap target + “TAP FOR DETAILS” cue (ref: mobile mock) */}
                  <button
                    type="button"
                    className={cn(
                      "absolute inset-0 z-[5] flex flex-col justify-end",
                      "[@media(hover:hover)_and_(pointer:fine)]:hidden",
                    )}
                    onClick={() => onViewDetails(item)}
                    aria-label={`Tap for details — ${item.name}`}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none bg-gradient-to-t from-[#0a0a0a]/75 via-[#0a0a0a]/20 to-transparent px-3.5 pb-3.5 pt-12"
                    >
                      <span className="inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.14em] text-accent uppercase">
                        Tap for details
                        <ChevronUp className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                      </span>
                    </span>
                  </button>

                  <div
                    className={cn(
                      "fleet-eq-hover-panel absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-5",
                      "bg-gradient-to-t from-[#0a0a0a]/92 via-[#0a0a0a]/45 to-transparent",
                      "pointer-events-none translate-y-5 opacity-0",
                      "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      /* Fine pointer only: reveal on hover / keyboard focus */
                      "[@media(hover:hover)_and_(pointer:fine)]:group-hover/eq:pointer-events-auto",
                      "[@media(hover:hover)_and_(pointer:fine)]:group-hover/eq:translate-y-0",
                      "[@media(hover:hover)_and_(pointer:fine)]:group-hover/eq:opacity-100",
                      "[@media(hover:hover)_and_(pointer:fine)]:group-focus-within/eq:pointer-events-auto",
                      "[@media(hover:hover)_and_(pointer:fine)]:group-focus-within/eq:translate-y-0",
                      "[@media(hover:hover)_and_(pointer:fine)]:group-focus-within/eq:opacity-100",
                      /* Touch / no-hover: never show the overlay */
                      "[@media(hover:none)]:invisible [@media(hover:none)]:!opacity-0",
                    )}
                    aria-hidden
                  >
                    <div>
                      <span className="fleet-eq-hover-chip inline-flex border border-accent/55 bg-accent/15 px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.12em] text-accent uppercase">
                        {item.capacity}
                      </span>
                      <h4 className="fleet-eq-hover-title mt-3 font-display text-[14px] font-bold tracking-wide text-white uppercase sm:text-[15px]">
                        {item.name}
                      </h4>
                      <p className="fleet-eq-hover-app mt-1.5 text-[12px] leading-snug text-white/70 sm:text-[13px]">
                        {item.application}
                      </p>
                      <button
                        type="button"
                        onClick={() => onViewDetails(item)}
                        tabIndex={-1}
                        className={cn(
                          "fleet-eq-hover-cta mt-4 inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.12em] text-accent uppercase",
                          "hover:gap-2.5 hover:text-white",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                          "pointer-events-auto",
                        )}
                      >
                        View details
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover/eq:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6 flex items-center justify-between gap-4 px-3 sm:px-2">
          <div className="flex flex-wrap items-center gap-2">
            {category.items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show ${item.name}`}
                onClick={() => {
                  if (canLoop) swiperRef.current?.slideToLoop(index);
                  else swiperRef.current?.slideTo(index);
                }}
                className={cn(
                  "relative h-1.5 overflow-hidden rounded-full transition-all duration-300",
                  active === index
                    ? "w-8 bg-white/20"
                    : "w-1.5 bg-white/25 hover:bg-white/45",
                )}
              >
                {active === index && (
                  <span
                    key={progressKey}
                    className={cn(
                      "absolute inset-y-0 left-0 bg-accent",
                      autoplayActive && "fleet-eq-progress-bar",
                    )}
                    style={autoplayActive ? undefined : { width: "100%" }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Previous ${category.name} equipment`}
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition hover:border-accent hover:bg-accent hover:text-brand-ink"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={`Next ${category.name} equipment`}
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition hover:border-accent hover:bg-accent hover:text-brand-ink"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EquipmentFleetSection() {
  const [selected, setSelected] = useState<SelectedUnit | null>(null);
  const detailsOpen = selected !== null;

  return (
    <section
      id="equipment-fleet"
      data-dark-surface
      className="scroll-mt-28 border-t border-white/10 bg-navy-950 py-16 md:py-24"
    >
      <div className="container-site">
        <Reveal>
          <p className="font-display text-[12px] font-semibold tracking-[2px] text-accent uppercase">
            Equipment Rental
          </p>
          <h2 className="section-heading section-heading--on-dark mt-3 text-2xl md:text-[36px]">
            Fleet Categories
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-white/60">
            Browse each division’s units by photo. Open any unit for capacity,
            application and typical use — no extra page hops required.
          </p>
        </Reveal>

        <div className="mt-12 space-y-8 md:space-y-10">
          {fleetCategories.map((category, index) => (
            <Reveal key={category.id} delay={Math.min(index * 0.04, 0.16)}>
              <CategoryFleetCarousel
                category={category}
                detailsOpen={detailsOpen}
                onViewDetails={(equipment) =>
                  setSelected({ category, equipment })
                }
              />
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <EquipmentDetailsPanel
          selected={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
