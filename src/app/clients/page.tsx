"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/company";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ClientsPage() {
  return (
    <>
      <PageBanner
        title="Our Clients"
        crumbs={[{ label: "Home", href: "/" }, { label: "Clients" }]}
        backgroundImage="/images/header-contracting.jpg"
      />

      <section data-dark-surface className="relative overflow-hidden bg-navy-950 py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255,107,53,0.09), transparent 60%)",
          }}
        />

        <div className="container-site relative z-10">
          <Reveal immediate>
            <div className="mb-12 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="section-eyebrow text-accent">Trusted Partners</span>
                <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                  Clients Who Rely On TIMC
                </h2>
                <p className="mt-3 max-w-xl text-[15px] text-white/60">
                  Logo-ready partner grid. Names shown now; official client logos
                  will appear once TIMC provides brand assets.
                </p>
              </div>
              <Button asChild>
                <Link href="/contact">
                  Become A Partner <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <RevealGroup immediate className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clients.map((client, index) => (
              <RevealItem key={client.name}>
                <motion.article
                  className="group relative flex min-h-44 flex-col items-center justify-center gap-3 overflow-hidden border border-white/10 bg-navy-900 px-5 py-4 text-center transition duration-500 hover:border-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]"
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="absolute top-3 left-4 font-display text-[11px] font-bold tracking-wide text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {client.logo ? (
                    <div className="relative h-14 w-full max-w-[140px]">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain"
                        sizes="140px"
                      />
                    </div>
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center bg-accent/15 text-accent transition duration-500 group-hover:bg-accent group-hover:text-brand-ink">
                      <Building2 className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                  )}

                  <span className="font-display text-[14px] font-bold tracking-wide text-white uppercase">
                    {client.name}
                  </span>
                  {!client.logo && (
                    <span className="text-[10px] tracking-wide text-white/45 uppercase">
                      Logo pending
                    </span>
                  )}
                  <span aria-hidden className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[3px] bg-accent" />
                </motion.article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 border-t border-white/10 pt-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="font-display text-[13px] font-semibold tracking-[2px] text-accent uppercase">
                  Partnership
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-white uppercase md:text-2xl">
                  Ready to work with TIMC?
                </h3>
                <p className="mt-2 max-w-lg text-[14px] text-white/55">
                  Share your project scope and we will prepare a technical and
                  commercial response aligned to your requirements.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-white/25 text-white hover:border-accent hover:bg-accent hover:text-brand-ink"
              >
                <Link href="/contact">
                  Contact Our Team <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
