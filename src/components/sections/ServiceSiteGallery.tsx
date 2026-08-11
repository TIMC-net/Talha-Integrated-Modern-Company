"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import WriteOnScroll from "@/components/motion/WriteOnScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

type ServiceSiteGalleryProps = {
  images: string[];
  serviceName: string;
};

/**
 * Editorial site proof strip for a service detail page.
 * Uneven mosaic on desktop; horizontal snap strip on mobile when many frames.
 */
export default function ServiceSiteGallery({
  images,
  serviceName,
}: ServiceSiteGalleryProps) {
  const reduce = useReducedMotion();
  if (images.length < 2) return null;

  const [feature, ...rest] = images;
  const strip = rest.slice(0, 5);

  return (
    <section data-dark-surface className="border-t border-white/10 bg-navy-900 py-14 md:py-20">
      <div className="container-site">
        <Reveal>
          <span className="section-eyebrow text-accent">Site Capability</span>
          <WriteOnScroll
            as="h2"
            text={`${serviceName} In The Field`}
            className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[32px]"
          />
          <p className="mt-3 max-w-xl text-[15px] text-white/55">
            Representative works and settings aligned to this division —
            construction delivery, structural works, and built environments.
          </p>
        </Reveal>

        {/* Desktop mosaic */}
        <div className="mt-8 hidden gap-3 md:grid md:grid-cols-12 md:grid-rows-2 md:gap-4">
          <motion.div
            className="group relative col-span-7 row-span-2 min-h-[380px] overflow-hidden border border-white/10"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Image
              src={feature}
              alt={`${serviceName} primary site`}
              fill
              loading="lazy"
              quality={70}
              className="object-cover object-center bg-navy-900 transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
          </motion.div>

          {strip.slice(0, 2).map((src, i) => (
            <motion.div
              key={src}
              className="group relative col-span-5 min-h-[180px] overflow-hidden border border-white/10"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.08 * (i + 1), ease: EASE }}
            >
              <Image
                src={src}
                alt={`${serviceName} site ${i + 2}`}
                fill
                loading="lazy"
                quality={70}
                className="object-cover object-center bg-navy-900 transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </motion.div>
          ))}
        </div>

        {strip.length > 2 && (
          <div className="mt-3 hidden gap-3 md:grid md:grid-cols-3 md:gap-4">
            {strip.slice(2).map((src, i) => (
              <motion.div
                key={src}
                className="group relative aspect-[4/3] overflow-hidden border border-white/10"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.06 * i, ease: EASE }}
              >
                <Image
                  src={src}
                  alt={`${serviceName} site ${i + 4}`}
                  fill
                  loading="lazy"
                  quality={70}
                  className="object-cover object-center bg-navy-900 transition duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile snap strip — cap frames so we don't fetch 10+ large images at once */}
        <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.slice(0, 6).map((src, i) => (
            <div
              key={src}
              className="relative aspect-[4/3] w-[82vw] max-w-[340px] shrink-0 snap-start overflow-hidden border border-white/10 bg-navy-900"
            >
              <Image
                src={src}
                alt={`${serviceName} site ${i + 1}`}
                fill
                loading="lazy"
                quality={70}
                className="object-cover object-center"
                sizes="82vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
