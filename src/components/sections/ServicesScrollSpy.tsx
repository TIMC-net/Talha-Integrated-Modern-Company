"use client";

import { useEffect, useRef, useState } from "react";
import {
  DualToneShell,
  clipOverlayToDarkBands,
} from "@/components/motion/DualToneShell";
import { scrollToId } from "@/hooks/useLenis";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

const navItems = [
  { id: "overview", label: "Services" },
  ...services.map((service) => ({
    id: service.slug,
    label: service.name,
  })),
  { id: "process", label: "Process" },
];

function getActiveSectionId() {
  const marker = 140;
  let current = navItems[0].id;

  for (const item of navItems) {
    const el = document.getElementById(item.id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top - marker <= 0) {
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
  /** onDark = white dots over dark bands; onLight = ink dots over light bands */
  tone: "onDark" | "onLight";
}) {
  const onDark = tone === "onDark";
  // Hardcoded ink/white — never use theme-remapped navy/white tokens
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
        onDark
          ? "group-hover:bg-white/30"
          : "group-hover:bg-black/15",
      )}
      style={{
        borderColor: onDark ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.55)",
      }}
    />
  );
}

export default function ServicesScrollSpy() {
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
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

    const hash = window.location.hash.replace(/^#/, "");
    if (hash && document.getElementById(hash)) {
      requestAnimationFrame(() => scrollToId(hash, true));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("timc:scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let running = false;

    const clip = () => {
      running = false;
      raf = 0;
      const shell = shellRef.current;
      const overlay = overlayRef.current;
      if (!shell || !overlay) return;

      const prev = shell.style.pointerEvents;
      shell.style.pointerEvents = "none";
      clipOverlayToDarkBands(shell, overlay);
      shell.style.pointerEvents = prev;
    };

    const schedule = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(clip);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("timc:scroll", schedule);
    window.addEventListener("resize", schedule, { passive: true });

    const themeObserver = new MutationObserver(schedule);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    schedule();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("timc:scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const scrollTo = (id: string) => {
    setActiveId(id);
    scrollToId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const rows = (tone: "onDark" | "onLight", interactive: boolean) => (
    <div className="flex flex-col items-end gap-3">
      {navItems.map((item) => {
        const active = activeId === item.id;
        const showLabel = interactive && (active || hoveredId === item.id);

        return (
          <div
            key={item.id}
            className="relative flex items-center justify-end"
            onMouseEnter={
              interactive ? () => setHoveredId(item.id) : undefined
            }
            onMouseLeave={interactive ? () => setHoveredId(null) : undefined}
          >
            {interactive ? (
              <div
                className={cn(
                  "absolute right-8 mr-1 transition duration-150",
                  showLabel
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-2 opacity-0",
                )}
              >
                <div className="relative rounded bg-navy-900 px-3 py-1.5 shadow-lg">
                  <span className="font-display text-[11px] font-semibold tracking-wide whitespace-nowrap text-white uppercase">
                    {item.label}
                  </span>
                  <span
                    className="absolute top-1/2 -right-1.5 h-0 w-0 -translate-y-1/2 border-y-[6px] border-l-[6px] border-y-transparent border-l-navy-900"
                    aria-hidden
                  />
                </div>
              </div>
            ) : null}

            {interactive ? (
              <button
                type="button"
                aria-label={`Go to ${item.label}`}
                aria-current={active ? "true" : undefined}
                onClick={() => scrollTo(item.id)}
                className="group flex h-11 w-11 items-center justify-center"
              >
                <DotGlyph active={active} tone={tone} />
              </button>
            ) : (
              <div className="flex h-11 w-11 items-center justify-center">
                <DotGlyph active={active} tone={tone} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block md:right-6 xl:right-8"
    >
      <div className="pointer-events-auto">
        <DualToneShell
          shellRef={shellRef}
          overlayRef={overlayRef}
          base={rows("onLight", true)}
          overlay={rows("onDark", false)}
        />
      </div>
    </nav>
  );
}
