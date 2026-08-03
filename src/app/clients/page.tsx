"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import InternalPageHero from "@/components/InternalPageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/company";

export default function ClientsPage() {
  const reduce = useReducedMotion();
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light";

  return (
    <>
      <InternalPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Clients" }]}
        titleLead="Our"
        titleAccent="Trusted"
        title="Clients"
        description="Official partners across contracting, engineering, and energy programmes in the Kingdom — organisations that rely on TIMC for disciplined site delivery."
        backgroundImage="/images/who-section-bg.jpg"
      />

      <section
        id="partners"
        data-dark-surface
        className="relative scroll-mt-24 overflow-x-clip bg-navy-950 py-16 md:py-24"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255,107,53,0.09), transparent 60%)",
          }}
        />

        <div className="container-site relative z-10">
          <Reveal immediate>
            <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
              <span className="section-eyebrow justify-center text-accent">
                Trusted Partners
              </span>
              <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                Clients Who Rely On TIMC
              </h2>
              <p className="mt-3 text-[15px] text-white/60">
                Official partners across contracting, engineering, and energy
                programmes in the Kingdom.
              </p>
            </div>
          </Reveal>

          <RevealGroup
            immediate
            className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-5"
          >
            {clients.map((client, index) => (
              <RevealItem
                key={client.name}
                className="w-[calc(50%-0.375rem)] max-w-[260px] sm:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.95rem)]"
              >
                <article className="group/card relative flex h-full flex-col overflow-hidden border border-white/10 bg-navy-900 p-5 transition-all duration-500 hover:border-accent/70 sm:p-6 md:p-7 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                  <span
                    aria-hidden
                    className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent"
                  />

                  <div className="relative flex min-h-[120px] flex-1 items-center justify-center sm:min-h-[140px] md:min-h-[152px]">
                    <motion.div
                      className="flex h-full w-full items-center justify-center"
                      animate={
                        reduce
                          ? undefined
                          : {
                              y: [0, -5, 0],
                            }
                      }
                      transition={{
                        duration: 4.2 + (index % 3) * 0.45,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.25,
                      }}
                    >
                      <Image
                        src={
                          isLight && client.logoOnLight
                            ? client.logoOnLight
                            : client.logo
                        }
                        alt={`${client.name} logo`}
                        width={320}
                        height={160}
                        unoptimized
                        className="h-[5rem] w-auto max-w-[90%] object-contain sm:h-24 md:h-28"
                      />
                    </motion.div>
                  </div>

                  <div className="relative mt-4 border-t border-white/10 pt-4 text-center">
                    <p className="font-display text-[12px] font-bold tracking-[1.5px] text-white uppercase transition duration-300 group-hover/card:text-accent sm:text-[13px]">
                      {client.shortName}
                    </p>
                  </div>

                  <span
                    aria-hidden
                    className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent"
                  />
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14 border-t border-white/10 pt-10 md:mt-16">
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
                className="w-full justify-center whitespace-normal border-white/25 text-white hover:border-accent hover:bg-accent hover:text-brand-ink sm:w-auto"
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
