import { Building2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import MotionCard from "@/components/motion/MotionCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { clients } from "@/lib/company";

export default function ClientsPage() {
  return (
    <>
      <PageBanner
        title="Clients"
        crumbs={[{ label: "Home", href: "/" }, { label: "Clients" }]}
      />
      <section className="bg-paper py-16 md:py-20">
        <div className="container-site">
          <Reveal>
            <span className="section-eyebrow mb-4">Trusted By Industry Leaders</span>
            <h2 className="section-heading mb-10 text-2xl md:text-[28px]">Our Clients</h2>
          </Reveal>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clients.map((client) => (
              <RevealItem key={client}>
                <MotionCard className="surface-card flex h-32 flex-col items-center justify-center gap-3 bg-white px-4 text-center">
                  <Building2 className="h-6 w-6 text-accent" />
                  <span className="font-display text-[14px] font-bold tracking-wide text-ink uppercase">
                    {client}
                  </span>
                </MotionCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
