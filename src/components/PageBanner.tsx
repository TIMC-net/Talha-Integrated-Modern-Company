"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { useState } from "react";

type PageBannerProps = {
  title: string;
  crumbs: { label: string; href?: string }[];
  backgroundImage?: string;
};

const DEFAULT_BG = "/images/header-scrap.jpg";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function PageBanner({
  title,
  crumbs,
  backgroundImage = DEFAULT_BG,
}: PageBannerProps) {
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section
      data-dark-surface
      data-media
      className="group/banner relative flex min-h-[260px] items-end overflow-hidden bg-ink-2 pt-[100px] pb-12 sm:min-h-[320px] sm:pt-[120px] sm:pb-16 md:min-h-[380px] md:pt-[140px] md:pb-20 lg:min-h-[400px] lg:pt-[150px]"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className={`object-cover object-center transition duration-[1.2s] ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover/banner:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/75 to-ink-2/40" />

      <div className="container-site relative z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
            className="font-display text-3xl font-bold tracking-wide text-white uppercase md:text-4xl"
          >
            {title}
          </motion.h1>
          <motion.nav
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
            className="breadcrumb flex flex-wrap items-center gap-1.5"
            aria-label="Breadcrumb"
          >
            <Home className="h-3.5 w-3.5 text-white/50" />
            {crumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-white/40" />}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span className="text-accent-light">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        </div>
      </div>
    </section>
  );
}
