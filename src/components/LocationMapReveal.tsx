"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink, MapPin } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { company } from "@/lib/company";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

const embedSrc = `https://maps.google.com/maps?q=${company.mapsLat},${company.mapsLng}&z=17&hl=en&output=embed`;

type LocationMapRevealProps = {
  /** Full address under the control */
  address?: string;
  /** Compact title above address */
  title?: string;
  className?: string;
  /** Optional custom trigger (default: pin + title + address) */
  children?: ReactNode;
};

/**
 * Click the location to expand an embedded map (loaded only when opened).
 * Secondary link opens Google Maps in a new tab.
 */
export default function LocationMapReveal({
  address = company.address,
  title = "Our Location",
  className,
  children,
}: LocationMapRevealProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div className={cn("min-w-0", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group/loc w-full text-left outline-none transition",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        )}
      >
        {children ?? (
          <span className="flex items-start gap-3 sm:gap-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-accent sm:h-10 sm:w-10">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="font-display text-[11px] font-semibold tracking-[2px] text-white/45 uppercase">
                  {title}
                </span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-300",
                    open && "rotate-180",
                  )}
                  aria-hidden
                />
              </span>
              <span className="mt-1.5 block break-words font-display text-[15px] font-bold text-white transition group-hover/loc:text-accent sm:text-[17px] md:text-[18px]">
                {address}
              </span>
              <span className="mt-1 block text-[12px] text-accent/90 transition group-hover/loc:text-accent">
                {open ? "Hide map" : "Show map"}
              </span>
            </span>
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="map-panel"
            initial={
              reduce ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <div className="relative aspect-[16/11] w-full overflow-hidden border border-white/10 bg-navy-950 sm:aspect-[16/10] md:aspect-[16/9]">
                <iframe
                  title="TIMC office location"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  src={embedSrc}
                />
              </div>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 font-display text-[11px] font-bold tracking-[0.12em] text-accent uppercase transition hover:text-accent-light"
              >
                Open in Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
