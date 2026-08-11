"use client";

import { useEffect, useRef, useState } from "react";
import { DualToneShell } from "@/components/motion/DualToneShell";
import { scrollToId } from "@/hooks/useLenis";
import { SCROLL_LOCK_ONLY, useSuppressChrome } from "@/hooks/useSuppressChrome";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

const FLEET_SECTION_ID = "equipment-fleet";

const navItems = [
  { id: "overview", label: "Services" },
  ...services.map((service) => ({
    id: service.slug,
    label: service.name,
  })),
  { id: FLEET_SECTION_ID, label: "Fleet Categories" },
  { id: "process", label: "Process" },
];

const ROW_H = 44; // h-11
const ROW_GAP = 12; // gap-3
/** Hold spy on click target while Lenis eases — matches scroll duration */
const PROGRAMMATIC_PIN_MS = 1600;
const SPY_SCROLL_DURATION = 1.55;

function getActiveSectionId() {
  // Section that currently owns the reading line (below sticky header).
  // Stays on the active block until the next one's content actually takes
  // that line — stops the spy racing ahead of what the user is viewing.
  const probeY = Math.round(
    Math.min(Math.max(window.innerHeight * 0.42, 160), 320),
  );
  let current = navItems[0].id;

  for (const item of navItems) {
    const el = document.getElementById(item.id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    // Prefer the section that literally contains the probe line
    if (rect.top <= probeY && rect.bottom > probeY + 48) {
      return item.id;
    }
    // Gaps between sections: last section that has entered the reading zone
    if (rect.top <= probeY) {
      current = item.id;
    }
  }

  return current;
}

function DotGlyph({
  active,
  tone,
}: {
  active: boolean;
  tone: "onDark" | "onLight";
}) {
  const onDark = tone === "onDark";
  const ink = "#0a0a0a";
  const snow = "#ffffff";

  if (active) {
    return (
      <span
        className="relative flex h-4 w-4 items-center justify-center rounded-full border-2"
        style={{ borderColor: onDark ? snow : ink }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: onDark ? snow : ink }}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "h-2.5 w-2.5 rounded-full border transition",
        onDark ? "group-hover:bg-white/30" : "group-hover:bg-black/15",
      )}
      style={{
        borderColor: onDark ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.55)",
      }}
    />
  );
}

export default function ServicesScrollSpy({
  onEnsureFleet,
}: {
  /** Mount Fleet Categories when still collapsed (spy / deep link scroll) */
  onEnsureFleet?: () => void;
}) {
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pinUntilRef = useRef(0);
  const suppress = useSuppressChrome(SCROLL_LOCK_ONLY);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (performance.now() < pinUntilRef.current) {
        ticking = false;
        return;
      }
      const next = getActiveSectionId();
      setActiveId((prev) => (prev === next ? prev : next));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("timc:scroll", onScroll);
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("timc:scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    setHoveredId(null);
    setActiveId(id);
    pinUntilRef.current = performance.now() + PROGRAMMATIC_PIN_MS;

    const go = () =>
      scrollToId(id, false, { duration: SPY_SCROLL_DURATION });

    if (id === FLEET_SECTION_ID) {
      onEnsureFleet?.();
      window.history.replaceState(null, "", `#${FLEET_SECTION_ID}`);
      // Fleet may mount after ensure — wait for #equipment-fleet, then one scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(go);
      });
      return;
    }

    go();
    window.history.replaceState(null, "", `#${id}`);
  };

  // Exactly one tooltip — hover wins over active (never two at once)
  const labelId = hoveredId ?? activeId;
  const labelIndex = navItems.findIndex((item) => item.id === labelId);
  const labelItem = labelIndex >= 0 ? navItems[labelIndex] : null;
  const labelTop =
    labelIndex >= 0 ? labelIndex * (ROW_H + ROW_GAP) + ROW_H / 2 : 0;

  const dots = (tone: "onDark" | "onLight", interactive: boolean) => (
    <div className="flex flex-col items-end gap-3">
      {navItems.map((item) => {
        const active = activeId === item.id;

        return interactive ? (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to ${item.label}`}
            aria-current={active ? "true" : undefined}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group flex h-11 w-11 items-center justify-center"
          >
            <DotGlyph active={active} tone={tone} />
          </button>
        ) : (
          <div
            key={item.id}
            className="flex h-11 w-11 items-center justify-center"
            aria-hidden
          >
            <DotGlyph active={active} tone={tone} />
          </div>
        );
      })}
    </div>
  );

  if (suppress) return null;

  return (
    <nav
      aria-label="Page sections"
      className="site-section-spy pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 md:right-6 lg:block xl:right-8"
    >
      <div className="pointer-events-auto relative">
        {labelItem ? (
          <div
            className="pointer-events-none absolute right-full z-20 mr-3 -translate-y-1/2 transition-[top,opacity] duration-300 ease-out"
            style={{ top: labelTop }}
          >
            <div className="relative rounded bg-[#0a0a0a] px-3 py-1.5 shadow-lg">
              <span className="font-display text-[11px] font-semibold tracking-wide whitespace-nowrap text-[#ffffff] uppercase">
                {labelItem.label}
              </span>
              <span
                className="absolute top-1/2 left-full h-0 w-0 -translate-y-1/2 border-y-[6px] border-l-[6px] border-y-transparent border-l-[#0a0a0a]"
                aria-hidden
              />
            </div>
          </div>
        ) : null}

        <DualToneShell
          shellRef={shellRef}
          overlayRef={overlayRef}
          base={dots("onLight", true)}
          overlay={dots("onDark", false)}
        />
      </div>
    </nav>
  );
}
