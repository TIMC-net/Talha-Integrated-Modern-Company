import Link from "next/link";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { company } from "@/lib/company";

export default function CTASection() {
  return (
    <section data-dark-surface className="border-t border-white/10 bg-navy-900 py-16 md:py-20">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <span className="section-eyebrow text-accent">Contact Us</span>
              <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]">
                Supporting You in Shaping Communities Across KSA
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
                Reach TIMC for civil, foundation, and energy project enquiries —
                or integrated equipment support. Official office coordinates and
                maps will be published once confirmed by TIMC.
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="w-full justify-center whitespace-normal sm:w-auto"
                >
                  <Link href="/contact">
                    Get In Touch <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <RevealGroup className="space-y-4">
            <RevealItem>
              <div className="group/card relative flex items-start gap-4 overflow-hidden border border-white/10 bg-navy-950 p-5 transition-all duration-500 hover:border-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                <span aria-hidden className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent" />
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-display text-[13px] font-bold tracking-wide text-white uppercase transition duration-300 group-hover/card:text-accent">
                    Headquarters
                  </p>
                  <p className="mt-1 text-[14px] text-white/55">{company.location}</p>
                </div>
                <span aria-hidden className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent" />
              </div>
            </RevealItem>
            <RevealItem>
              <div className="group/card relative flex items-start gap-4 overflow-hidden border border-white/10 bg-navy-950 p-5 transition-all duration-500 hover:border-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                <span aria-hidden className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent" />
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-display text-[13px] font-bold tracking-wide text-white uppercase transition duration-300 group-hover/card:text-accent">
                    Phone
                  </p>
                  <a
                    href={`tel:${company.phone}`}
                    className="mt-1 block text-[14px] text-white/55 transition hover:text-accent"
                  >
                    {company.phone}
                  </a>
                </div>
                <span aria-hidden className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent" />
              </div>
            </RevealItem>
            <RevealItem>
              <div className="group/card relative flex items-start gap-4 overflow-hidden border border-white/10 bg-navy-950 p-5 transition-all duration-500 hover:border-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                <span aria-hidden className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent" />
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-display text-[13px] font-bold tracking-wide text-white uppercase transition duration-300 group-hover/card:text-accent">
                    Email
                  </p>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-1 block text-[14px] text-white/55 transition hover:text-accent"
                  >
                    {company.email}
                  </a>
                </div>
                <span aria-hidden className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent" />
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
