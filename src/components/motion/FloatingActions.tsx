"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";
import {
  DualToneShell,
} from "@/components/motion/DualToneShell";
import { company } from "@/lib/company";

function waLink(mobile: string) {
  const digits = mobile.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}

function handleGlowMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

function handleGlowLeave(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--x", "-999px");
  e.currentTarget.style.setProperty("--y", "-999px");
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current sm:h-6 sm:w-6" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const VIEW = 44;
const STROKE = 2.5;
const RADIUS = (VIEW - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (docHeight <= 0) return 0;
  return Math.min(1, Math.max(0, scrollTop / docHeight));
}

function scrollToTop(reduce: boolean | null) {
  const lenis = window.timcLenis;
  if (lenis && !reduce) {
    lenis.scrollTo(0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 3) });
    return;
  }
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

function ProgressRing({
  circleRef,
  trackStroke,
}: {
  circleRef: RefObject<SVGCircleElement | null>;
  trackStroke: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
      aria-hidden
    >
      <circle
        cx={VIEW / 2}
        cy={VIEW / 2}
        r={RADIUS}
        fill="none"
        stroke={trackStroke}
        strokeWidth={STROKE}
      />
      <circle
        ref={circleRef}
        cx={VIEW / 2}
        cy={VIEW / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE}
      />
    </svg>
  );
}

const fabBase =
  "relative grid h-full w-full place-items-center rounded-full border border-white/25 bg-[#0a0a0a] text-[#ffffff] shadow-none";
const fabOverlay =
  "relative grid h-full w-full place-items-center rounded-full border border-black/10 bg-[#ffffff] text-[#0a0a0a]";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const reduce = useReducedMotion();
  const showTopRef = useRef(false);

  const topShellRef = useRef<HTMLDivElement>(null);
  const topOverlayRef = useRef<HTMLDivElement>(null);
  const phoneShellRef = useRef<HTMLDivElement>(null);
  const phoneOverlayRef = useRef<HTMLDivElement>(null);
  const progressDarkRef = useRef<SVGCircleElement>(null);
  const progressLightRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHover = () => setCanHover(mq.matches);
    updateHover();
    mq.addEventListener("change", updateHover);
    return () => mq.removeEventListener("change", updateHover);
  }, []);

  useEffect(() => {
    const applyProgress = (progress: number) => {
      const offset = String(CIRCUMFERENCE * (1 - progress));
      if (progressDarkRef.current) {
        progressDarkRef.current.style.strokeDashoffset = offset;
      }
      if (progressLightRef.current) {
        progressLightRef.current.style.strokeDashoffset = offset;
      }
    };

    let raf = 0;
    let running = false;

    const update = () => {
      running = false;
      raf = 0;

      const progress = getScrollProgress();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      applyProgress(progress);

      const nextShow = scrollTop > 320;
      if (nextShow !== showTopRef.current) {
        showTopRef.current = nextShow;
        setShowTop(nextShow);
      }
    };

    const schedule = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("timc:scroll", schedule);
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("timc:scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!showTop) return;
    const offset = String(CIRCUMFERENCE * (1 - getScrollProgress()));
    if (progressDarkRef.current) progressDarkRef.current.style.strokeDashoffset = offset;
    if (progressLightRef.current) progressLightRef.current.style.strokeDashoffset = offset;
  }, [showTop]);

  return (
    <div className="fixed right-3 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-2.5 sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:gap-3 lg:right-8 lg:bottom-8">
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce || !canHover ? undefined : { scale: 1.06 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            className="h-11 w-11 sm:h-12 sm:w-12"
          >
            <DualToneShell
              shellRef={topShellRef}
              overlayRef={topOverlayRef}
              className="h-full w-full overflow-hidden rounded-full shadow-lg"
              base={
                <button
                  type="button"
                  aria-label="Back to top"
                  onClick={() => scrollToTop(reduce)}
                  className={fabBase}
                >
                  <ProgressRing
                    circleRef={progressDarkRef}
                    trackStroke="rgba(255,255,255,0.2)"
                  />
                  <ArrowUp
                    className="relative z-10 h-4 w-4 sm:h-[18px] sm:w-[18px]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </button>
              }
              overlay={
                <div className={fabOverlay}>
                  <ProgressRing
                    circleRef={progressLightRef}
                    trackStroke="rgba(10,10,10,0.15)"
                  />
                  <ArrowUp
                    className="relative z-10 h-4 w-4 sm:h-[18px] sm:w-[18px]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </div>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      <DualToneShell
        shellRef={phoneShellRef}
        overlayRef={phoneOverlayRef}
        className="h-11 w-11 overflow-hidden rounded-full shadow-lg sm:h-12 sm:w-12"
        base={
          <a
            href={`tel:${company.phone}`}
            aria-label="Call us"
            onMouseMove={handleGlowMove}
            onMouseLeave={handleGlowLeave}
            className={`${fabBase} border-glow [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5`}
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        }
        overlay={
          <div className={fabOverlay}>
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        }
      />

      <div className="whatsapp-fab relative h-11 w-11 sm:h-12 sm:w-12">
        <span className="whatsapp-fab__pulse" aria-hidden />
        <span className="whatsapp-fab__pulse whatsapp-fab__pulse--delay" aria-hidden />
        <a
          href={waLink(company.mobile)}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          onMouseMove={handleGlowMove}
          onMouseLeave={handleGlowLeave}
          className="border-glow relative z-10 grid h-full w-full place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-110 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
}
