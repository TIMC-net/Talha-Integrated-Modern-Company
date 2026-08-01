import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { aboutNarrative, company } from "@/lib/company";

const yearsActive = new Date().getFullYear() - Number(company.established);

const features = [
  {
    icon: ShieldCheck,
    title: "Experienced Staff",
    text: "Seasoned site engineers, supervisors, and crews delivering civil, foundation, and energy projects to specification.",
  },
  {
    icon: Cpu,
    title: "Modern Capability",
    text: "Integrated equipment, disciplined HSE, and construction methods that keep complex infrastructure programmes on track.",
  },
];

export default function AboutSection() {
  return (
    <section data-dark-surface className="overflow-x-clip bg-navy-950 py-16 md:py-24">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative w-full min-w-0">
            <div
              data-media
              className="img-zoom group relative aspect-[16/11] w-full overflow-hidden sm:aspect-[4/3] md:aspect-[5/6]"
            >
              <Image
                src="/images/about-company-crew.jpg"
                alt="TIMC site crew and equipment on a project site in Saudi Arabia"
                fill
                className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 to-transparent" />
            </div>
            <div className="absolute -right-4 -bottom-4 hidden max-w-[220px] bg-accent p-6 text-navy-950 shadow-xl md:block lg:-right-8">
              <p className="font-display text-4xl font-bold">{yearsActive}+</p>
              <p className="mt-1 text-[13px] font-semibold tracking-wide uppercase">
                Years building KSA infrastructure
              </p>
              <p className="mt-2 text-[10px] font-bold tracking-wide uppercase opacity-70">
                Est. {company.established}
              </p>
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <span className="section-eyebrow text-accent">About Company</span>
              <h2 className="section-heading section-heading--on-dark mt-4 text-xl leading-snug sm:text-2xl md:text-[36px]">
                Building a Stronger Future Across Saudi Arabia
              </h2>
              <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-white/65 sm:text-[15px] md:text-[16px]">
                {aboutNarrative.slice(0, 2).map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <RevealItem key={feature.title}>
                    <div className="group/card relative h-full overflow-hidden border border-white/10 bg-navy-900 p-5 transition-all duration-500 hover:border-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                      <span aria-hidden className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent" />
                      <Icon
                        className="h-8 w-8 text-accent transition duration-500 group-hover/card:scale-110"
                        strokeWidth={1.5}
                      />
                      <h3 className="mt-4 font-display text-[16px] font-bold text-white uppercase transition duration-300 group-hover/card:text-accent">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                        {feature.text}
                      </p>
                      <span aria-hidden className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent" />
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <Reveal className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-display text-[13px] font-bold tracking-wide text-accent uppercase transition hover:gap-3 hover:text-accent-light"
              >
                Discover More <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
