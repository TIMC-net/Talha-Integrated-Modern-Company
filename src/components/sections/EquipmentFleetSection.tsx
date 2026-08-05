"use client";

import Image from "next/image";
import { Truck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { fleetCategories } from "@/data/fleet";

export default function EquipmentFleetSection() {
  return (
    <section
      id="equipment-fleet"
      data-dark-surface
      className="scroll-mt-28 border-t border-white/10 bg-navy-950 py-16 md:py-24"
    >
      <div className="container-site">
        <Reveal>
          <p className="font-display text-[12px] font-semibold tracking-[2px] text-accent uppercase">
            Equipment Rental
          </p>
          <h2 className="section-heading section-heading--on-dark mt-3 text-2xl md:text-[36px]">
            Fleet Categories
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-white/60">
            Integrated rental support for TIMC contractor packages — earth
            moving, lifting, material handling, power, and compaction aligned to
            civil, foundation, and energy infrastructure works.
          </p>
        </Reveal>

        <div className="mt-12 space-y-14">
          {fleetCategories.map((category) => (
            <div key={category.id}>
              <Reveal>
                <div className="mb-6 flex items-start gap-4 border-b border-white/10 pb-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent/15 text-accent">
                    <Truck className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white uppercase md:text-2xl">
                      {category.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[14px] text-white/55">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Reveal>

              <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <RevealItem key={item.id}>
                    <article className="group/card relative flex h-full flex-col overflow-hidden border border-white/10 bg-navy-900 transition-all duration-500 hover:border-accent/70 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]">
                      <span
                        aria-hidden
                        className="card-bar-y absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent"
                      />
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950 sm:aspect-auto sm:h-[168px]">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover object-center opacity-90 transition duration-700 [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:scale-105 [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:opacity-100"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-white/25">
                            <Truck className="h-10 w-10" strokeWidth={1.25} />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h4 className="font-display text-[14px] font-bold tracking-wide text-white uppercase transition duration-300 group-hover/card:text-accent">
                          {item.name}
                        </h4>
                        <p className="mt-2 text-[13px] leading-relaxed text-white/55">
                          {item.specs}
                        </p>
                        {item.notes && (
                          <p className="mt-3 border-t border-white/10 pt-3 text-[12px] text-white/40">
                            {item.notes}
                          </p>
                        )}
                      </div>
                      <span
                        aria-hidden
                        className="card-bar-x absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent"
                      />
                    </article>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
