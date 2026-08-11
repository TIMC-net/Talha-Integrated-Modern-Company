import type { Metadata } from "next";
import InternalPageHero from "@/components/InternalPageHero";
import AboutCertifications from "@/components/sections/about/AboutCertifications";
import AboutFAQ from "@/components/sections/about/AboutFAQ";
import AboutIntro from "@/components/sections/about/AboutIntro";
import AboutMissionVision from "@/components/sections/about/AboutMissionVision";
import AboutStatusBand from "@/components/sections/about/AboutStatusBand";
import AboutTestimonials from "@/components/sections/about/AboutTestimonials";
import AboutVendorsMarquee from "@/components/sections/about/AboutVendorsMarquee";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: `About Us | ${company.shortName}`,
  description:
    "Learn about Talha Integrated Modern Company — a Saudi general contractor in civil infrastructure, foundation engineering, energy infrastructure and equipment rental.",
};

export default function AboutPage() {
  return (
    <>
      <InternalPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        eyebrow="Est. 2010 · Headquartered in Jeddah"
        titleLead="About"
        titleAccent="TIMC"
        title="Company"
        description="A Saudi engineering and contracting company delivering civil infrastructure, foundation engineering, energy infrastructure, and integrated equipment rental across the Kingdom and the GCC."
        backgroundImage="/images/about-page-hero-v3.webp"
        imageClassName="object-cover object-[center_38%]"
        connectBottom
      />
      <AboutIntro />
      <AboutMissionVision />
      <AboutStatusBand />
      <AboutCertifications />
      <AboutVendorsMarquee />
      <AboutFAQ />
      <AboutTestimonials />
    </>
  );
}
