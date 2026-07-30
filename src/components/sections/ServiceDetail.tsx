import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Hammer,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/services";
import { deliveryProcess } from "@/data/services-page";

const iconMap: Record<Service["icon"], LucideIcon> = {
  Truck,
  Building2,
  Hammer,
  Zap,
};

export default function ServiceDetail({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <>
      <section
        data-dark-surface
        className="relative overflow-hidden bg-navy-950 pt-[100px] pb-14 sm:pt-[120px] sm:pb-16 lg:pt-[140px]"
      >
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/75 to-navy-950" />
        </div>

        <div className="container-site relative z-10">
          <p className="breadcrumb mb-6">
            <Link href="/">Home</Link>
            <span className="mx-2 text-white/40">/</span>
            <Link href="/services">Services</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-accent-light">{service.name}</span>
          </p>
          <p className="font-display text-[12px] font-semibold tracking-[2.5px] text-accent uppercase">
            {service.category === "integrated"
              ? "Integrated Division"
              : "Core Division"}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-white uppercase md:text-5xl">
            {service.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/70">
            {service.tagline}. {service.description}
          </p>
        </div>
      </section>

      <section data-dark-surface className="bg-navy-950 py-14 md:py-20">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <h2 className="font-display text-2xl font-bold text-white uppercase md:text-[32px]">
                {service.tagline}
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-white/65">
                {service.fullDescription}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {service.capabilities.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-start gap-3 font-display text-[12px] font-semibold tracking-wide text-white/80 uppercase sm:text-[13px]"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="img-zoom group relative aspect-[16/11] w-full border border-white/10 bg-navy-900 sm:min-h-[280px] sm:aspect-auto">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover object-center opacity-55 transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-70"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
              <div className="absolute right-6 bottom-6 left-6 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center bg-accent text-navy-950">
                  <Icon className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-white uppercase">
                    {service.name}
                  </p>
                  <p className="text-[12px] text-white/55">
                    {service.industries.join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-dark-surface className="border-t border-white/10 bg-navy-900 py-14 md:py-20">
        <div className="container-site">
          <span className="section-eyebrow text-accent">Capabilities</span>
          <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[32px]">
            Structured Service Offerings
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {service.subServices.map((item, index) => (
              <article
                key={item.title}
                className="group/card relative flex flex-col items-center overflow-hidden border border-white/10 bg-navy-950 p-6 text-center transition-all duration-500 hover:border-accent/70 md:p-7 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]"
              >
                <span className="absolute top-0 bottom-0 left-0 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover/card:scale-y-100" />
                <span className="font-display text-2xl font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[17px] font-bold text-white uppercase transition duration-300 group-hover/card:text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                  {item.description}
                </p>
                <span className="absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover/card:scale-x-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-dark-surface className="border-t border-white/10 bg-navy-950 py-14 md:py-20">
        <div className="container-site">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="img-zoom group relative aspect-[16/11] w-full sm:aspect-[4/3]">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover object-center transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="section-eyebrow text-accent">Delivery Process</span>
              <h2 className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[32px]">
                How We Execute This Division
              </h2>
              <ol className="mt-8 space-y-5">
                {deliveryProcess.map((step) => (
                  <li
                    key={step.id}
                    className="flex gap-4 border-b border-white/10 pb-5 last:border-0"
                  >
                    <span className="font-display text-xl font-bold text-accent">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-bold text-white uppercase">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[14px] text-white/55">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section data-dark-surface className="bg-accent py-14 md:py-16">
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy-950 uppercase md:text-3xl">
              Request {service.name} Services
            </h2>
            <p className="mt-2 max-w-xl text-[15px] text-navy-950/75">
              Share your scope and we will prepare a technical and commercial
              response aligned to your project requirements.
            </p>
          </div>
          <Button asChild size="lg" className="bg-navy-950 text-white hover:bg-navy-900">
            <Link href="/contact">
              Contact Our Team <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
