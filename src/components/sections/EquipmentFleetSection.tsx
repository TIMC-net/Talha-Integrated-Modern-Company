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
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperClass from "swiper";
import { Reveal } from "@/components/motion/Reveal";
import WriteOnScroll from "@/components/motion/WriteOnScroll";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  fleetCategories,
  type FleetCategory,
  type FleetEquipment,
} from "@/data/fleet";
import { cn } from "@/lib/cn";
import { lockPageScroll } from "@/hooks/useLenis";
import { useStableInsetHover } from "@/hooks/useStableInsetHover";

import "swiper/css";

const AUTOPLAY_MS = 3000;
const SLIDE_SPEED_MS = 700;
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

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
  const { theme, mounted: themeReady } = useTheme();
  const isLight = themeReady && theme === "light";
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const unlock = lockPageScroll();
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // Move focus into the dialog (a11y) without scrolling the page.
    // Windows Chromium default focus restoration scrolls the focused node
    // into view and can jump to the top of the page on close.
    requestAnimationFrame(() => {
      const root = document.querySelector(".fleet-eq-detail-root");
      const focusTarget =
        root?.querySelector<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        ) ?? null;
      focusTarget?.focus({ preventScroll: true });
    });

    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
      // Restore prior focus without scrolling (Windows needs preventScroll)
      if (
        previouslyFocused &&
        document.contains(previouslyFocused) &&
        typeof previouslyFocused.focus === "function"
      ) {
        try {
          previouslyFocused.focus({ preventScroll: true });
        } catch {
          /* ignore */
        }
      }
    };
  }, [onClose]);

  // Portal to body so fixed FABs / scroll-spy / Reveal transforms can't stack
  // above the dialog (which was why bottom-right chrome peeked through).
  if (!portalReady) return null;

  return createPortal(
    <div
      data-lenis-prevent
      className="fleet-eq-detail-root fixed inset-0 z-[300] flex items-end justify-center overscroll-none sm:items-center sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/*
        Backdrop must NOT be a labelled <button> — browsers show a native
        tooltip on that control when the cursor sits in the margin under
        the dialog ("Close equipment details").
      */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 backdrop-blur-[6px] transition-colors",
          isLight ? "bg-[#0a0a0a]/55" : "bg-[#0a0a0a]/82",
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
                  "font-display text-lg font-bold tracking-wide uppercase sm:text-xl lg:mt-1.5 lg:pr-8 lg:text-xl lg:leading-tight xl:pr-11 xl:text-[24px]",
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
    </div>,
    document.body,
  );
}

function FleetEquipmentCard({
  item,
  Icon,
  canHover,
  onViewDetails,
  onPanelOpenChange,
}: {
  item: FleetEquipment;
  Icon: LucideIcon;
  canHover: boolean;
  onViewDetails: (equipment: FleetEquipment) => void;
  /** true when this card's details panel is open (hover or mobile tap) */
  onPanelOpenChange: (itemId: string, open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;

  useEffect(() => {
    if (canHover && openRef.current) {
      setOpen(false);
      onPanelOpenChange(item.id, false);
    }
  }, [canHover, item.id, onPanelOpenChange]);

  const {
    ref,
    active: hot,
    handlers,
  } = useStableInsetHover<HTMLElement>({
    enabled: canHover,
    inset: 12,
    bottomInset: 14,
    enterDelay: 70,
    leaveDelay: 140,
    onChange: (active) => onPanelOpenChange(item.id, active),
  });

  // Desktop hover OR mobile tap panel
  const panelOpen = canHover ? hot : open;

  const toggleMobilePanel = () => {
    if (canHover) return;
    setOpen((prev) => {
      const next = !prev;
      // Stop / resume autoplay immediately on the user gesture
      onPanelOpenChange(item.id, next);
      return next;
    });
  };

  return (
    <article
      ref={ref}
      tabIndex={canHover ? -1 : 0}
      role={canHover ? undefined : "button"}
      aria-expanded={canHover ? undefined : open}
      aria-label={
        canHover
          ? undefined
          : `${item.name}. ${open ? "Tap to close details" : "Tap for details"}`
      }
      onClick={toggleMobilePanel}
      onKeyDown={(e) => {
        if (canHover) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleMobilePanel();
        }
      }}
      {...(canHover ? handlers : {})}
      data-hot={panelOpen ? "true" : undefined}
      data-open={!canHover && open ? "true" : undefined}
      className={cn(
        "fleet-eq-card group/eq relative aspect-[2/3] w-full cursor-pointer overflow-hidden bg-[#0a0a0a]",
        "outline-none border-0",
        "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
        panelOpen && "fleet-eq-card--hot z-[2]",
      )}
    >
      {/* Photo — fixed frame (no hover scale: transforms caused 1px white seams mid-animation) */}
      <div className="fleet-eq-photo-shell absolute inset-0 overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 699px) 55vw, (max-width: 1199px) 28vw, 22vw"
            className="fleet-eq-photo object-cover object-center"
            loading="lazy"
            decoding="async"
            quality={70}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#141414]">
            <Icon className="h-10 w-10 text-white/15" strokeWidth={1.25} />
          </div>
        )}
      </div>

      {/* Subtle bottom shade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-transparent"
      />

      {/* Left accent draw */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 bottom-0 left-0 z-30 w-[2px] origin-bottom scale-y-0 bg-accent",
          "transition-transform duration-500",
          EASE,
          panelOpen && "scale-y-100",
        )}
      />

      {/* Default title strip */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-20 sm:px-5 sm:pb-5",
          "transition-opacity duration-400",
          EASE,
          panelOpen && "opacity-0",
        )}
      >
        <p className="line-clamp-2 font-display text-[14px] leading-snug font-bold tracking-wide text-[#ffffff] uppercase drop-shadow-md sm:text-[15px]">
          {item.name}
        </p>
        {!canHover && !open ? (
          <p className="mt-2 flex items-center gap-1 font-display text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
            Tap for details
            <ChevronUp className="h-3 w-3" />
          </p>
        ) : null}
      </div>

      {/*
        Details panel: max-height (not translateY).
        translateY + fractional Swiper widths caused a white hairline mid-hover
        that only vanished after the transition finished.
      */}
      <div
        className={cn(
          "fleet-eq-details-panel absolute inset-x-0 bottom-0 z-20 flex flex-col overflow-hidden",
          "transition-[max-height,opacity] duration-500",
          EASE,
          panelOpen
            ? "max-h-[74%] opacity-100 sm:max-h-[70%]"
            : "max-h-0 opacity-0",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-0 left-0 z-10 h-[2px] w-full origin-left scale-x-0 bg-accent",
            "transition-transform duration-500 delay-75",
            EASE,
            panelOpen && "scale-x-100",
          )}
        />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-4 pb-4 sm:px-5 sm:pt-5 sm:pb-5">
          <span
            className={cn(
              "inline-flex border border-accent/60 bg-accent/12 px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[0.12em] text-accent uppercase",
              "transition-opacity duration-400 delay-75",
              EASE,
              panelOpen ? "opacity-100" : "opacity-0",
            )}
          >
            {item.capacity}
          </span>

          <h3
            className={cn(
              "mt-2.5 font-display text-[14px] leading-snug font-bold tracking-wide text-[#ffffff] uppercase sm:text-[15px]",
              "transition-opacity duration-400 delay-100",
              EASE,
              panelOpen ? "opacity-100" : "opacity-0",
            )}
          >
            {item.name}
          </h3>

          <p
            className={cn(
              "mt-2 text-[12px] leading-relaxed text-[#ffffff]/80 sm:text-[13px]",
              "transition-opacity duration-400 delay-125",
              EASE,
              panelOpen ? "opacity-100" : "opacity-0",
            )}
          >
            {item.application}
          </p>

          <div
            className={cn(
              "mt-4",
              "transition-opacity duration-400 delay-150",
              EASE,
              panelOpen ? "opacity-100" : "opacity-0",
            )}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
              tabIndex={panelOpen ? 0 : -1}
              className={cn(
                "inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.12em] text-accent uppercase",
                "transition-[gap,color] duration-300",
                "hover:gap-2.5 hover:text-[#ffffff]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              )}
            >
              View details
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
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
  /** True after a full stop() — needs start() instead of resume() */
  const fullyStoppedRef = useRef(true);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  /** Bar only runs after the slide has settled — avoids start→restart on each change */
  const [barReady, setBarReady] = useState(false);
  const [canHover, setCanHover] = useState(false);
  /** Item ids with an open details panel (hover or “Tap for details”) */
  const [openPanelIds, setOpenPanelIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const openPanelIdsRef = useRef(openPanelIds);
  openPanelIdsRef.current = openPanelIds;
  const inViewRef = useRef(inView);
  inViewRef.current = inView;
  const detailsOpenRef = useRef(detailsOpen);
  detailsOpenRef.current = detailsOpen;

  const Icon = iconByCategory[category.id] ?? Truck;
  const canLoop = category.items.length > 2;
  const panelBlocking = openPanelIds.size > 0;
  /** True autoplay engine allowed to run (starts/resumes between pauses) */
  const engineAllowed = inView && !detailsOpen;

  /** Soft pause — keeps Swiper delay progress so resume continues mid-slide */
  const pauseAutoplaySoft = useCallback(() => {
    const s = swiperRef.current;
    if (!s?.autoplay) return;
    try {
      s.autoplay.pause();
    } catch {
      /* older builds */
      s.autoplay.stop();
      fullyStoppedRef.current = true;
    }
  }, []);

  /** Full stop (modal / leave viewport) — bar remounts on next start */
  const stopAutoplayHard = useCallback(() => {
    const s = swiperRef.current;
    if (!s?.autoplay) return;
    s.autoplay.stop();
    fullyStoppedRef.current = true;
    setBarReady(false);
  }, []);

  const resumeOrStartAutoplay = useCallback(() => {
    const s = swiperRef.current;
    if (!s?.autoplay) return;
    if (!inViewRef.current || detailsOpenRef.current) return;
    if (openPanelIdsRef.current.size > 0) return;

    if (fullyStoppedRef.current) {
      s.autoplay.start();
      fullyStoppedRef.current = false;
      setBarReady(true);
      setProgressKey((k) => k + 1);
      return;
    }
    try {
      s.autoplay.resume();
    } catch {
      s.autoplay.start();
    }
    setBarReady(true);
  }, []);

  const onPanelOpenChange = useCallback(
    (itemId: string, open: boolean) => {
      setOpenPanelIds((prev) => {
        const next = new Set(prev);
        if (open) next.add(itemId);
        else next.delete(itemId);
        const hasOpen = next.size > 0;
        // Soft-pause mid-timer; do NOT reset progressKey / barReady
        if (hasOpen) {
          pauseAutoplaySoft();
        } else if (inViewRef.current && !detailsOpenRef.current) {
          resumeOrStartAutoplay();
        }
        return next;
      });
    },
    [pauseAutoplaySoft, resumeOrStartAutoplay],
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

  // Engine gate: hard-stop when leaving view / opening modal; otherwise resume if free
  useEffect(() => {
    if (!engineAllowed) {
      stopAutoplayHard();
      return;
    }
    if (panelBlocking) {
      pauseAutoplaySoft();
      return;
    }
    resumeOrStartAutoplay();
  }, [
    engineAllowed,
    panelBlocking,
    stopAutoplayHard,
    pauseAutoplaySoft,
    resumeOrStartAutoplay,
  ]);

  return (
    <div
      ref={rootRef}
      id={`fleet-${category.id}`}
      data-fleet-carousel
      data-panel-open={panelBlocking ? "true" : undefined}
      data-carousel-paused={panelBlocking || detailsOpen ? "true" : undefined}
      className="scroll-mt-28"
    >
      <div className="mb-5 flex items-end justify-between gap-4 px-1 sm:mb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center border border-white/12 bg-white/[0.04] text-accent">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase md:text-xl">
                {category.name}
              </h3>
              <p className="mt-0.5 text-[13px] text-white/50">{category.description}</p>
            </div>
          </div>
        </div>
        <p className="hidden shrink-0 font-display text-[11px] font-semibold tracking-[0.14em] text-white/35 uppercase sm:block">
          {category.items.length} units
        </p>
      </div>

      <div className="relative">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(s) => {
            swiperRef.current = s;
            if (
              openPanelIdsRef.current.size > 0 ||
              detailsOpenRef.current ||
              !inViewRef.current
            ) {
              s.autoplay?.stop();
              fullyStoppedRef.current = true;
            }
          }}
          onSlideChange={(s) => {
            setActive(s.realIndex);
            // New slide → new bar; only if engine may run
            if (
              openPanelIdsRef.current.size > 0 ||
              detailsOpenRef.current ||
              !inViewRef.current
            ) {
              pauseAutoplaySoft();
              return;
            }
            setBarReady(false);
            requestAnimationFrame(() => {
              setProgressKey((k) => k + 1);
              setBarReady(true);
            });
          }}
          onSlideChangeTransitionEnd={() => {
            if (
              openPanelIdsRef.current.size > 0 ||
              detailsOpenRef.current ||
              !inViewRef.current
            ) {
              pauseAutoplaySoft();
              return;
            }
            setBarReady(true);
          }}
          loop={canLoop}
          speed={SLIDE_SPEED_MS}
          slidesPerView={1.35}
          spaceBetween={12}
          grabCursor
          watchSlidesProgress
          roundLengths
          touchAngle={28}
          threshold={6}
          autoplay={{
            delay: AUTOPLAY_MS,
            disableOnInteraction: false,
            // Swiper pauses its timer; CSS pauses the visual bar (resumes mid-fill)
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          breakpoints={{
            480: { slidesPerView: 2.1, spaceBetween: 14 },
            700: { slidesPerView: 2.9, spaceBetween: 16 },
            960: { slidesPerView: 3.7, spaceBetween: 16 },
            1200: { slidesPerView: 4.4, spaceBetween: 18 },
          }}
          className="fleet-eq-swiper"
        >
          {category.items.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <FleetEquipmentCard
                item={item}
                Icon={Icon}
                canHover={canHover}
                onViewDetails={onViewDetails}
                onPanelOpenChange={onPanelOpenChange}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 sm:gap-4 sm:px-2">
          <button
            type="button"
            aria-label={`Previous ${category.name} equipment`}
            onClick={() => swiperRef.current?.slidePrev()}
            className="slider-nav-btn h-10 w-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex min-w-0 flex-wrap items-center justify-center gap-2">
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
                  "fleet-eq-dot relative h-1.5 overflow-hidden rounded-full",
                  active === index
                    ? "fleet-eq-dot--active w-8 bg-white/20"
                    : "w-1.5 bg-white/25",
                )}
              >
                {active === index && barReady && (
                  <span
                    key={progressKey}
                    className="fleet-eq-progress-bar absolute inset-y-0 left-0 w-full !bg-accent"
                    style={
                      {
                        ["--fleet-eq-ms" as string]: `${AUTOPLAY_MS}ms`,
                      } as CSSProperties
                    }
                  />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label={`Next ${category.name} equipment`}
            onClick={() => swiperRef.current?.slideNext()}
            className="slider-nav-btn h-10 w-10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EquipmentFleetSection() {
  const [selected, setSelected] = useState<SelectedUnit | null>(null);
  const detailsOpen = selected !== null;
  const closeDetails = useCallback(() => setSelected(null), []);

  return (
    <section
      id="equipment-fleet"
      className="scroll-mt-28 border-t border-white/10 bg-[#0a0a0a] py-16 md:py-24"
    >
      <div className="container-site">
        <Reveal>
          <p className="font-display text-[12px] font-semibold tracking-[2px] text-accent uppercase">
            Equipment Rental
          </p>
          <WriteOnScroll
            as="h2"
            text="Fleet Categories"
            className="section-heading mt-3 text-2xl text-white md:text-[36px]"
            mode="write"
          />
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
          onClose={closeDetails}
        />
      )}
    </section>
  );
}
