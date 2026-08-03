"use client";

import { type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { isDarkSurfaceAt } from "@/lib/surface";

/**
 * Build clip-path so the light-on-dark overlay only shows over dark page bands.
 * Same liquid-ink vertical clip used by the navbar capsule and circular FABs.
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

  /*
    Compact FABs (phone / scroll-top): center sample + full snap.
    Mobile menu / theme + desktop capsule: liquid vertical wipe.
  */
  if (compact) {
    const cy = nr.top + nr.height / 2;
    const isDark = isDarkSurfaceAt(cx, cy);
    overlay.style.clipPath = isDark ? "inset(0)" : "inset(100% 0 0 0)";
    return;
  }

  const narrow = nr.width <= 80;
  const samples = narrow ? 24 : 28;
  const dark: boolean[] = [];

  for (let i = 0; i < samples; i++) {
    const y = nr.top + ((i + 0.5) / samples) * nr.height;
    if (narrow) {
      // Probe just behind the chrome column so we read page surface, not glow.
      dark.push(isDarkSurfaceAt(cx, y));
    } else {
      const votes = [
        isDarkSurfaceAt(cx, y),
        isDarkSurfaceAt(nr.left + nr.width * 0.35, y),
        isDarkSurfaceAt(nr.left + nr.width * 0.65, y),
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

  // Media panels: only for wide capsules. Narrow circles rely on per-row
  // samples so a hero edge can wipe through the button like the desktop bar.
  if (!narrow) {
    for (const media of document.querySelectorAll<HTMLElement>("[data-media]")) {
      const r = media.getBoundingClientRect();
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

  // Prefer a single wipe band (desktop + mobile circle crossing one edge).
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
      {/* Base: black chrome for light page sections */}
      <div className={cn("relative z-0 h-full w-full")}>{base}</div>
      {/* Overlay: white chrome for dark page sections — liquid clip with scroll */}
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
