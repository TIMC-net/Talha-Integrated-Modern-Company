import AboutStats from "@/components/sections/about/AboutStats";
import WhyChooseUs from "@/components/sections/about/WhyChooseUs";

/** Solid dark band for Company Status + Why Choose Us */
export default function AboutStatusBand() {
  return (
    <section data-dark-surface className="bg-navy-950">
      <AboutStats />
      <WhyChooseUs />
    </section>
  );
}
