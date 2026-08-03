import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
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
      <PageBanner
        title="About Us"
        backgroundImage="/images/about-banner-crew.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
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
