"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import WriteOnScroll from "@/components/motion/WriteOnScroll";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/company";
import { cn } from "@/lib/cn";

export default function ClientsSection({ lite = false }: { lite?: boolean }) {
  return (
    <section
      id="clients"
      data-dark-surface
      className={cn(
        "relative scroll-mt-24 overflow-x-clip border-t border-white/10 bg-navy-950",
        lite ? "pt-6 pb-12 md:pt-7 md:pb-14" : "py-12 md:py-16",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255,107,53,0.09), transparent 60%)",
        }}
      />

      <div className="container-site relative z-10">
        <Reveal>
          <div
            className={cn(
              "mx-auto max-w-2xl text-center",
              lite ? "mb-8 md:mb-9" : "mb-10 md:mb-12",
            )}
          >
            <span className="section-eyebrow justify-center text-accent">
              Trusted Partners
            </span>
            <WriteOnScroll
                as="h2"
                text="Clients Who Rely On TIMC"
                className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]"
              />
            <p className="mt-3 text-[15px] text-white/60">
              {clients.length} official partners across contracting,
              engineering, and energy programmes in the Kingdom.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <ClientsMarquee clients={clients} lite={lite} />
      </Reveal>

      <div className="container-site relative z-10">
        <Reveal delay={0.12} className="mt-10 flex justify-center md:mt-12">
          <Button
            asChild
            variant="outline"
            className="border-white/25 text-white hover:border-accent hover:bg-accent hover:text-brand-ink"
          >
            <Link href="/clients">
              View all clients <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
