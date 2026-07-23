"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
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
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const reduce = useReducedMotion();
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setShowTop(window.scrollY > 480);

      const stack = stackRef.current;
      if (!stack) return;
      // Hide the stack from hit-testing for one lookup so we sample the
      // section actually sitting behind it, not the buttons themselves.
      const prevPointerEvents = stack.style.pointerEvents;
      stack.style.pointerEvents = "none";
      const probeX = window.innerWidth - 48;
      const probeY = window.innerHeight - 48;
      const el = document.elementFromPoint(probeX, probeY);
      stack.style.pointerEvents = prevPointerEvents;
      setOnDark(Boolean(el?.closest("[data-dark-surface]")));
    };

    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  const surfaceClass = onDark
    ? "bg-white text-ink hover:bg-steel-300"
    : "bg-ink text-white hover:bg-navy-800";

  return (
    <div
      ref={stackRef}
      className="fixed right-5 bottom-6 z-40 flex flex-col items-end gap-3 sm:right-8 sm:bottom-8"
    >
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
            }
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            onMouseMove={handleGlowMove}
            onMouseLeave={handleGlowLeave}
            className={`border-glow flex h-11 w-11 items-center justify-center shadow-lg transition ${surfaceClass}`}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`tel:${company.phone}`}
        aria-label="Call us"
        onMouseMove={handleGlowMove}
        onMouseLeave={handleGlowLeave}
        className={`border-glow flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition hover:-translate-y-0.5 ${surfaceClass}`}
      >
        <Phone className="h-5 w-5" />
      </a>

      <a
        href={waLink(company.mobile)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseMove={handleGlowMove}
        onMouseLeave={handleGlowLeave}
        className="border-glow flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-110 hover:-translate-y-0.5"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
