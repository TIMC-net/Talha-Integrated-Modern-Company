"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";
import { Reveal } from "@/components/motion/Reveal";
import WriteOnScroll from "@/components/motion/WriteOnScroll";
import { Button } from "@/components/ui/button";
import DeliveryProcess from "@/components/sections/DeliveryProcess";
import EquipmentFleetSection from "@/components/sections/EquipmentFleetSection";
import ServiceDivisionBlock from "@/components/sections/ServiceDivisionBlock";
import ServicesScrollSpy from "@/components/sections/ServicesScrollSpy";
import StandardsMarquee from "@/components/sections/StandardsMarquee";
import { services } from "@/data/services";
import { scrollToId } from "@/hooks/useLenis";

export default function ServicesPageContent() {
  const [fleetOpen, setFleetOpen] = useState(true);

  useEffect(() => {
    if (window.location.hash === "#equipment-fleet") {
      setFleetOpen(true);
      requestAnimationFrame(() => scrollToId("equipment-fleet", true));
    }
  }, []);

  const toggleFleet = () => {
    if (fleetOpen) {
      // Collapse in place — do not jump to the top of Equipment Rental
      setFleetOpen(false);
      if (
        window.location.hash === "#equipment-fleet" ||
        window.location.hash === "#equipment-rental"
      ) {
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`,
        );
      }
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

      <InternalPageHero
        id="overview"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        titleLead="Our"
        titleAccent="Contractor"
        title="Services"
        description="Comprehensive contractor solutions — from civil infrastructure and foundation engineering to energy infrastructure, with integrated equipment rental supporting every project phase."
        backgroundImage="/images/services-page-hero-v3.webp"
        imageClassName="object-cover object-[center_40%]"
        connectBottom
      />

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
            <WriteOnScroll
              as="h2"
              text="Ready to Discuss Your Project?"
              className="font-display text-2xl font-bold text-navy-950 uppercase md:text-3xl"
            />
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
