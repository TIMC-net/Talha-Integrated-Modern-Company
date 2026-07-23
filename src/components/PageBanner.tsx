"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

type PageBannerProps = {
  title: string;
  crumbs: { label: string; href?: string }[];
  backgroundImage?: string;
};

const DEFAULT_BG = "/images/header-scrap.jpg";

export default function PageBanner({
  title,
  crumbs,
  backgroundImage = DEFAULT_BG,
}: PageBannerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      data-dark-surface
      className="relative -mt-[84px] flex min-h-[320px] items-end overflow-hidden bg-ink-2 pt-[140px] pb-16 md:min-h-[380px] md:pt-[150px] md:pb-20 lg:-mt-[132px] lg:min-h-[400px] lg:pt-[180px]"
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        className={`object-cover transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="100vw"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/75 to-ink-2/40" />

      <div className="container-site relative z-10">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="font-display text-3xl font-bold tracking-wide text-white uppercase md:text-4xl">
              {title}
            </h1>
            <nav className="breadcrumb flex items-center gap-1.5" aria-label="Breadcrumb">
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
            </nav>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
