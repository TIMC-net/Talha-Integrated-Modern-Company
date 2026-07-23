import { Check } from "lucide-react";
import FeatureServices from "@/components/FeatureServices";
import HeroSlider from "@/components/HeroSlider";
import ServicesShowcase3D from "@/components/ServicesShowcase3DClient";
import WhoWeAreTabs from "@/components/WhoWeAreTabs";
import HoverZoomImage from "@/components/motion/HoverZoomImage";
import { Reveal } from "@/components/motion/Reveal";
import { company } from "@/lib/company";

const highlights = ["Experienced", "Innovative", "Quick Response", "Quality Assurance"];

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeatureServices />

      {/* Welcome / About teaser */}
      <section className="pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <Reveal>
              <HoverZoomImage
                src="/images/civil-construction.jpg"
                alt="Industrial works"
                className="aspect-[4/5] w-full"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <span className="section-eyebrow mb-4">Who We Are</span>
              <h2 className="section-heading mb-6 text-2xl md:text-[32px]">
                {company.shortName} Integrated Modern — Contracting Company in Saudi
                Arabia
              </h2>
              <div className="mb-8 space-y-4 text-[14px] leading-[1.85] text-slate">
                <p>
                  TALHA was established as a contracting company, a Saudi-focused
                  industrial services organization. We are a team of technically
                  qualified engineers from different parts of the world.
                </p>
                <p>
                  Our main business is directed towards electrical, civil construction,
                  mechanical erection and also in the areas of oil refineries,
                  petrochemical plants, dewatering services, steel plants, and
                  fertilizer plants.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[14px] font-semibold text-ink">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive 3D services showcase */}
      <section className="bg-white pt-4 pb-6 md:pt-6 md:pb-12">
        <div className="container-site">
          <Reveal className="mb-3 text-center md:mb-4">
            <span className="section-eyebrow justify-center">
              Interactive Showcase
            </span>
            <h2 className="section-heading mt-3 text-2xl md:text-[32px]">
              Six Divisions, One Team
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-slate">
              Explore what we do — drag your cursor across the scene and click a
              shape to jump straight to that service.
            </p>
          </Reveal>
        </div>
        <ServicesShowcase3D />
      </section>

      <WhoWeAreTabs />
    </>
  );
}
