"use client";

import { useLayoutEffect, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { isDarkSurfaceAt } from "@/lib/surface";

type InkPair = {
  shell: HTMLElement;
  overlay: HTMLElement;
};

const pairs = new Set<InkPair>();
let listening = false;
let raf = 0;
let running = false;
let mediaCache: DOMRect[] | null = null;
let pointCache = new Map<string, boolean>();

function darkAt(x: number, y: number): boolean {
  // Quantize to cut duplicate probes across shells in the same frame
  const key = `${x | 0}:${(y / 3) | 0}`;
  const hit = pointCache.get(key);
  if (hit !== undefined) return hit;
  const value = isDarkSurfaceAt(x, y);
  pointCache.set(key, value);
  return value;
}

function mediaRects(): DOMRect[] {
  if (mediaCache) return mediaCache;
  mediaCache = Array.from(
    document.querySelectorAll<HTMLElement>("[data-media]"),
  ).map((el) => el.getBoundingClientRect());
  return mediaCache;
}

/**
 * Build clip-path so the light-on-dark overlay only shows over dark page bands.
 */
export function clipOverlayToDarkBands(
  shell: HTMLElement,
  overlay: HTMLElement,
) {
  const nr = shell.getBoundingClientRect();
  if (nr.height < 1 || nr.width < 1) {
    overlay.style.clipPath = "inset(100% 0 0 0)";
    return;
  }

  overlay.style.opacity = "1";
  overlay.style.transition = "none";

  const compact = shell.hasAttribute("data-nav-compact");
  const cx = nr.left + nr.width / 2;

  if (compact) {
    const cy = nr.top + nr.height / 2;
    overlay.style.clipPath = darkAt(cx, cy) ? "inset(0)" : "inset(100% 0 0 0)";
    return;
  }

  const narrow = nr.width <= 80;
  // Fewer samples = smoother scroll; still enough for a clean liquid wipe
  const samples = narrow ? 10 : 14;
  const dark: boolean[] = [];

  for (let i = 0; i < samples; i++) {
    const y = nr.top + ((i + 0.5) / samples) * nr.height;
    if (narrow) {
      dark.push(darkAt(cx, y));
    } else {
      // Two probes is enough for the desktop capsule
      const votes = [
        darkAt(cx, y),
        darkAt(nr.left + nr.width * 0.3, y),
        darkAt(nr.left + nr.width * 0.7, y),
      ].filter(Boolean).length;
      dark.push(votes >= 2);
    }
  }

  const bands: { top: number; bottom: number }[] = [];
  let start: number | null = null;
  for (let i = 0; i < samples; i++) {
    if (dark[i] && start === null) start = i;
    if ((!dark[i] || i === samples - 1) && start !== null) {
      const end = dark[i] && i === samples - 1 ? i + 1 : i;
      bands.push({
        top: (start / samples) * nr.height,
        bottom: (end / samples) * nr.height,
      });
      start = null;
    }
  }

  if (!narrow) {
    for (const r of mediaRects()) {
      if (r.left > cx || r.right < cx) continue;
      const top = Math.max(0, r.top - nr.top);
      const bottom = Math.min(nr.height, r.bottom - nr.top);
      if (bottom - top > 2) bands.push({ top, bottom });
    }
  }

  if (bands.length === 0) {
    overlay.style.clipPath = "inset(100% 0 0 0)";
    return;
  }

  bands.sort((a, b) => a.top - b.top);
  const merged: { top: number; bottom: number }[] = [];
  for (const b of bands) {
    const last = merged[merged.length - 1];
    if (!last || b.top > last.bottom + 1) merged.push({ ...b });
    else last.bottom = Math.max(last.bottom, b.bottom);
  }

  const cover = merged.reduce((s, b) => s + (b.bottom - b.top), 0);
  if (cover >= nr.height - 2) {
    overlay.style.clipPath = "inset(0)";
    return;
  }

  if (merged.length === 1 || narrow) {
    const band =
      merged.length === 1
        ? merged[0]
        : merged.reduce((a, b) => (b.bottom - b.top > a.bottom - a.top ? b : a));
    const top = Math.max(0, band.top);
    const bottom = Math.max(0, nr.height - band.bottom);
    overlay.style.clipPath = `inset(${top}px 0 ${bottom}px 0)`;
    return;
  }

  overlay.style.clipPath =
    cover >= nr.height * 0.5 ? "inset(0)" : "inset(100% 0 0 0)";
}

function flushInk() {
  running = false;
  raf = 0;
  pointCache = new Map();
  mediaCache = null;

  if (pairs.size === 0) return;

  const chrome = Array.from(
    document.querySelectorAll<HTMLElement>("[data-nav-chrome]"),
  );
  const prevPe = chrome.map((el) => el.style.pointerEvents);
  for (const el of chrome) el.style.pointerEvents = "none";

  for (const { shell, overlay } of pairs) {
    if (!shell.isConnected || !overlay.isConnected) continue;
    clipOverlayToDarkBands(shell, overlay);
  }

  chrome.forEach((el, i) => {
    el.style.pointerEvents = prevPe[i] ?? "";
  });
}

function scheduleInk() {
  if (running) return;
  running = true;
  raf = requestAnimationFrame(flushInk);
}

function ensureListening() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener("scroll", scheduleInk, { passive: true });
  window.addEventListener("timc:scroll", scheduleInk);
  window.addEventListener("resize", scheduleInk, { passive: true });

  const themeObserver = new MutationObserver(scheduleInk);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class"],
  });
  // Keep observer alive for app lifetime (pairs come and go)
  (ensureListening as { _obs?: MutationObserver })._obs = themeObserver;
}

/** Force an immediate ink refresh (e.g. after navbar morph). */
export function refreshNavInk() {
  scheduleInk();
}

/** Register a dual-tone shell for the shared scroll clip pass. */
export function registerNavInk(
  shell: HTMLElement,
  overlay: HTMLElement,
): () => void {
  const pair: InkPair = { shell, overlay };
  pairs.add(pair);
  ensureListening();
  scheduleInk();
  return () => {
    pairs.delete(pair);
  };
}

export function DualToneShell({
  className,
  shellRef,
  overlayRef,
  base,
  overlay,
  compact = false,
}: {
  className?: string;
  shellRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  base: ReactNode;
  overlay: ReactNode;
  /** Circular phone/scroll FABs — snap whole control, no mid-glyph split */
  compact?: boolean;
}) {
  useLayoutEffect(() => {
    const shell = shellRef.current;
    const overlayEl = overlayRef.current;
    if (!shell || !overlayEl) return;
    return registerNavInk(shell, overlayEl);
  }, [shellRef, overlayRef]);

  return (
    <div
      ref={shellRef}
      data-nav-chrome
      data-nav-compact={compact ? "" : undefined}
      className={cn(
        "relative",
        compact && "overflow-hidden rounded-full shadow-lg",
        className,
      )}
    >
      <div className={cn("relative z-0 h-full w-full")}>{base}</div>
      <div
        ref={overlayRef}
        aria-hidden
        className={cn(
          "nav-ink-overlay pointer-events-none absolute inset-0 z-10 h-full w-full overflow-hidden",
          compact && "rounded-full",
        )}
      >
        {overlay}
      </div>
    </div>
  );
}
