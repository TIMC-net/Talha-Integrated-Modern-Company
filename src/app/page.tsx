import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ProcessSection from "@/components/sections/ProcessSection";
import ServiceShowcase from "@/components/sections/ServiceShowcase";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServiceShowcase />
      <StatsSection />
      <ProcessSection />
      <PortfolioPreview />
      <TestimonialCarousel />
      <CTASection />
    </>
  );
}
