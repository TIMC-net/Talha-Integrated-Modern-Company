"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { company } from "@/lib/company";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;
const embedSrc = `https://maps.google.com/maps?q=${company.mapsLat},${company.mapsLng}&z=17&hl=en&output=embed`;

function HeadquartersCard() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div className="group/card relative overflow-hidden border border-white/10 bg-navy-950 transition-all duration-500 hover:border-accent/70">
      <span
        aria-hidden
        className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent"
      />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 p-5 text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
      >
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-display text-[13px] font-bold tracking-wide text-white uppercase transition duration-300 group-hover/card:text-accent">
            Headquarters
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-accent transition-transform duration-300",
                open && "rotate-180",
              )}
              aria-hidden
            />
          </p>
          <p className="mt-1 text-[14px] text-white/55">{company.address}</p>
          <p className="mt-2 text-[12px] font-medium text-accent">
            {open ? "Hide map" : "Show map"}
          </p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="home-map"
            initial={
              reduce ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="relative aspect-[16/11] w-full overflow-hidden border border-white/10 bg-navy-900">
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
                className="mt-3 inline-flex font-display text-[11px] font-bold tracking-[0.12em] text-accent uppercase transition hover:text-accent-light"
              >
                Open in Google Maps →
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <span
        aria-hidden
        className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent"
      />
    </div>
  );
}

export default function CTASection() {
  return (
    <section data-dark-surface className="border-t border-white/10 bg-navy-900 py-12 md:py-14">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal>
            <div>
              <span className="section-eyebrow text-accent">Contact Us</span>
              <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                Supporting You in Shaping Communities Across KSA
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
                Reach TIMC for civil, foundation, and energy project enquiries —
                or integrated equipment support from our Jeddah headquarters.
              </p>
              <div className="mt-6">
                <Button
                  asChild
                  size="lg"
                  className="w-full justify-center whitespace-normal sm:w-auto"
                >
                  <Link href="/contact">
                    Get In Touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <RevealGroup className="space-y-4">
            <RevealItem>
              <HeadquartersCard />
            </RevealItem>
            <RevealItem>
              <div className="group/card relative flex items-start gap-4 overflow-hidden border border-white/10 bg-navy-950 p-5 transition-all duration-500 hover:border-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                <span aria-hidden className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent" />
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-display text-[13px] font-bold tracking-wide text-white uppercase transition duration-300 group-hover/card:text-accent">
                    Phone
                  </p>
                  <a
                    href={`tel:${company.phone}`}
                    className="mt-1 block text-[14px] text-white/55 transition hover:text-accent"
                  >
                    {company.phone}
                  </a>
                </div>
                <span aria-hidden className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent" />
              </div>
            </RevealItem>
            <RevealItem>
              <div className="group/card relative flex items-start gap-4 overflow-hidden border border-white/10 bg-navy-950 p-5 transition-all duration-500 hover:border-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                <span aria-hidden className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent" />
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-display text-[13px] font-bold tracking-wide text-white uppercase transition duration-300 group-hover/card:text-accent">
                    Email
                  </p>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-1 block text-[14px] text-white/55 transition hover:text-accent"
                  >
                    {company.email}
                  </a>
                </div>
                <span aria-hidden className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent" />
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
