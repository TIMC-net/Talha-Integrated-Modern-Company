"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/hooks/useLenis";
import { services } from "@/data/services";

const navItems = [
  { id: "overview", label: "Services" },
  ...services.map((service) => ({
    id: service.slug,
    label: service.name,
  })),
  { id: "process", label: "Process" },
  { id: "capabilities", label: "Capabilities" },
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

export default function ServicesScrollSpy() {
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

    // Honor deep link hash with Lenis (avoid native scrollIntoView fight)
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

  const scrollTo = (id: string) => {
    setActiveId(id);
    scrollToId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:right-6 lg:flex xl:right-8"
    >
      {navItems.map((item) => {
        const active = activeId === item.id;
        const showLabel = active || hoveredId === item.id;

        return (
          <div
            key={item.id}
            className="pointer-events-auto relative flex items-center justify-end"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`absolute right-8 mr-1 transition duration-150 ${
                showLabel
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-2 opacity-0"
              }`}
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

            <button
              type="button"
              aria-label={`Go to ${item.label}`}
              aria-current={active ? "true" : undefined}
              onClick={() => scrollTo(item.id)}
              className="group flex h-11 w-11 items-center justify-center"
            >
              {active ? (
                <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              ) : (
                <span className="h-2.5 w-2.5 rounded-full border border-white/45 transition group-hover:border-white group-hover:bg-white/30" />
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
