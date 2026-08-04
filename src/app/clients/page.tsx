"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InternalPageHero from "@/components/InternalPageHero";
import { Reveal } from "@/components/motion/Reveal";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/company";

export default function ClientsPage() {
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
        className="relative scroll-mt-24 overflow-x-clip bg-navy-950 py-14 md:py-20"
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
            <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
              <span className="section-eyebrow justify-center text-accent">
                Trusted Partners
              </span>
              <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                Clients Who Rely On TIMC
              </h2>
              <p className="mt-3 text-[15px] text-white/60">
                {clients.length} official partners across contracting,
                engineering, and energy programmes in the Kingdom.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ClientsMarquee clients={clients} />
        </Reveal>

        <div className="container-site relative z-10">
          <Reveal delay={0.15} className="mt-12 border-t border-white/10 pt-10 md:mt-14">
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
