"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import DeliveryProcess from "@/components/sections/DeliveryProcess";
import EquipmentFleetSection from "@/components/sections/EquipmentFleetSection";
import ServiceDivisionBlock from "@/components/sections/ServiceDivisionBlock";
import ServicesScrollSpy from "@/components/sections/ServicesScrollSpy";
import StandardsMarquee from "@/components/sections/StandardsMarquee";
import { services } from "@/data/services";
import { servicesHeroStats } from "@/data/services-page";
import { scrollToId } from "@/hooks/useLenis";

export default function ServicesPageContent() {
  const [fleetOpen, setFleetOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#equipment-fleet") {
      setFleetOpen(true);
      requestAnimationFrame(() => scrollToId("equipment-fleet", true));
    }
  }, []);

  const toggleFleet = () => {
    if (fleetOpen) {
      setFleetOpen(false);
      window.history.replaceState(null, "", "#equipment-rental");
      requestAnimationFrame(() => scrollToId("equipment-rental"));
      return;
    }

    setFleetOpen(true);
    window.history.replaceState(null, "", "#equipment-fleet");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToId("equipment-fleet"));
    });
  };

  return (
    <>
      <ServicesScrollSpy />

      {/* Hero */}
      <section
        id="overview"
        data-dark-surface
        data-media
        className="relative scroll-mt-20 overflow-x-clip bg-navy-950 pt-[100px] pb-14 sm:scroll-mt-24 sm:pt-[120px] sm:pb-16 md:pb-20 lg:scroll-mt-28 lg:pt-[140px]"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/header-contracting.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/80 to-navy-950" />
        </div>

        <div className="container-site relative z-10">
          <Reveal immediate>
            <p className="breadcrumb mb-6">
              <Link href="/">Home</Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-accent-light">Services</span>
            </p>

            <h1 className="max-w-3xl font-display text-4xl font-bold text-white uppercase md:text-5xl lg:text-[58px]">
              Our{" "}
              <span className="text-accent italic normal-case">Contractor</span>
              <br />
              Services
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/70 md:text-[17px]">
              Comprehensive contractor solutions — from civil infrastructure and
              foundation engineering to energy infrastructure, with integrated
              equipment rental supporting every project phase.
            </p>
            <p className="mt-4 max-w-2xl border border-accent/25 bg-accent/10 px-3 py-2 text-[12px] text-accent">
              Service descriptions, capability tags, and imagery are structural
              placeholders. Detailed division copy pending from TIMC.
            </p>
          </Reveal>

          <RevealGroup immediate className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4 md:gap-8">
            {servicesHeroStats.map((stat) => {
              const body = (
                <>
                  <p className="font-display text-3xl font-bold text-accent md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[13px] text-white/55 transition group-hover:text-accent">
                    {stat.label}
                  </p>
                </>
              );

              return (
                <RevealItem key={stat.label}>
                  {"href" in stat && stat.href ? (
                    <Link
                      href={stat.href}
                      className="group block no-underline transition hover:opacity-90"
                    >
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>

          <RevealGroup immediate className="mt-10 grid grid-cols-2 gap-2">
            {services.map((service) => (
              <RevealItem key={service.id} className="min-w-0">
                <a
                  href={`#${service.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(service.slug);
                    window.history.replaceState(null, "", `#${service.slug}`);
                  }}
                  className="flex h-full w-full items-center justify-center border border-white/20 bg-white/5 px-2 py-3 text-center font-display text-[10px] font-bold tracking-wide text-white uppercase transition duration-300 sm:px-3 sm:text-[12px] hover:border-accent hover:bg-accent hover:text-brand-ink"
                >
                  {service.name}
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Four core division blocks */}
      {services.map((service, index) => (
        <ServiceDivisionBlock
          key={service.id}
          service={service}
          index={index}
          fleetOpen={
            service.category === "integrated" ? fleetOpen : undefined
          }
          onViewFleet={
            service.category === "integrated" ? toggleFleet : undefined
          }
        />
      ))}

      {fleetOpen && <EquipmentFleetSection />}

      {/* Delivery process */}
      <section
        id="process"
        data-dark-surface
        className="scroll-mt-28 border-t border-white/10 bg-navy-950 py-16 md:py-24"
      >
        <div className="container-site">
          <DeliveryProcess />
        </div>
      </section>

      <StandardsMarquee />

      {/* CTA */}
      <section data-dark-surface className="border-t border-white/10 bg-accent py-14 md:py-16">
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-navy-950 uppercase md:text-3xl">
              Ready to Discuss Your Project?
            </h2>
            <p className="mt-2 max-w-xl text-[15px] text-navy-950/75">
              Our team is ready to assess your requirements and prepare a
              detailed technical and commercial proposal.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button
              asChild
              className="w-full justify-center whitespace-normal bg-navy-950 text-white hover:bg-navy-900 sm:w-auto"
            >
              <Link href="/contact">
                Contact Our Team <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-center whitespace-normal border-navy-950/30 text-navy-950 hover:border-navy-950 hover:bg-navy-950/10 sm:w-auto"
            >
              <a href="/company-profile.pdf" target="_blank" rel="noopener noreferrer">
                Download Company Profile
              </a>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
