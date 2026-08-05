"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTERVAL_MS = 5200;

function subscribeVisibility(onStoreChange: () => void) {
  if (typeof document === "undefined") return () => {};
  document.addEventListener("visibilitychange", onStoreChange);
  return () => document.removeEventListener("visibilitychange", onStoreChange);
}

function getDocumentVisible() {
  return typeof document !== "undefined" ? !document.hidden : true;
}

function getServerVisible() {
  return true;
}

export function useServiceGalleryCycle(frames: string[], enabled = true) {
  const multi = frames.length > 1;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    getDocumentVisible,
    getServerVisible,
  );

  const advance = useEffectEvent(() => {
    setIndex((i) => (i + 1) % Math.max(frames.length, 1));
  });

  useEffect(() => {
    if (!enabled || !multi || reduce || paused || !pageVisible) return;
    const id = window.setInterval(advance, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [enabled, multi, reduce, paused, pageVisible, frames.length, advance]);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  return {
    index,
    multi,
    goTo,
    setPaused,
    active: frames[index] ?? frames[0] ?? "",
  };
}

type ServiceDivisionMediaProps = {
  images: string[];
  alt: string;
  priority?: boolean;
  className?: string;
};

/**
 * Feature panel: slow cross-fade + Ken Burns, with progress ticks overlaid
 * above the media (sibling-safe via internal absolute stack).
 */
export default function ServiceDivisionMedia({
  images,
  alt,
  priority = false,
  className = "",
}: ServiceDivisionMediaProps) {
  const frames = images.length > 0 ? images : [];
  const reduce = useReducedMotion();
  const { index, multi, goTo, setPaused, active } = useServiceGalleryCycle(frames);

  if (frames.length === 0) {
    return (
      <div
        className={`relative h-full w-full bg-navy-900 ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1.05, ease: EASE }}
        >
          <Image
            src={active}
            alt={multi ? `${alt} — site ${index + 1}` : alt}
            fill
            priority={priority && index === 0}
            className="object-cover object-center opacity-70"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Soft scrim only — keeps ticks readable without hiding photos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-navy-950/80 to-transparent"
      />

      {multi && (
        <div
          className="absolute right-4 bottom-4 left-4 z-[2] flex items-center gap-1.5 sm:right-6 sm:bottom-6 sm:left-6"
          role="tablist"
          aria-label={`${alt} gallery`}
        >
          {frames.map((src, i) => {
            const selected = i === index;
            return (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Show image ${i + 1} of ${frames.length}`}
                onClick={() => goTo(i)}
                className="group relative h-[3px] min-w-0 flex-1 overflow-hidden bg-white/25 transition-colors hover:bg-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span
                  className={`absolute inset-y-0 left-0 bg-accent transition-[width] duration-300 ease-out ${
                    selected ? "w-full" : "w-0 group-hover:w-1/3"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Resolve gallery frames: prefer `images`, always include `image` as fallback cover. */
export function serviceGalleryFrames(service: {
  image: string;
  images?: string[];
}): string[] {
  if (service.images && service.images.length > 0) {
    return service.images;
  }
  return service.image ? [service.image] : [];
}
