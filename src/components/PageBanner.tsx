"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

type PageBannerProps = {
  title: string;
  crumbs: { label: string; href?: string }[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PageBanner({ title, crumbs }: PageBannerProps) {
  const reduce = useReducedMotion();

  return (
    <section
      data-dark-surface
      className="group/banner relative flex min-h-[260px] items-end overflow-x-clip bg-navy-950 pt-[100px] pb-12 sm:min-h-[320px] sm:pt-[120px] sm:pb-16 md:min-h-[380px] md:pt-[140px] md:pb-20 lg:min-h-[400px] lg:pt-[150px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 18% 35%, rgba(255,107,53,0.10), transparent 58%), radial-gradient(ellipse 50% 40% at 85% 20%, rgba(12,45,92,0.45), transparent 55%)",
        }}
      />

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
