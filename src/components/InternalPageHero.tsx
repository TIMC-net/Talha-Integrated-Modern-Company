"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { HeroStat } from "@/data/services-page";
import { scrollToId } from "@/hooks/useLenis";
import { cn } from "@/lib/cn";

export type HeroCrumb = { label: string; href?: string };

export type HeroAction = {
  label: string;
  href: string;
  /** When true, treat href as in-page hash and smooth-scroll */
  hash?: boolean;
};

type InternalPageHeroProps = {
  crumbs: HeroCrumb[];
  /** Text before the accent word (e.g. "Our") */
  titleLead?: string;
  /** Accent italic word (e.g. "Contractor") */
  titleAccent?: string;
  /** Main title / second line (e.g. "Services") */
  title: string;
  description: string;
  backgroundImage: string;
  /** Extra classes for the background Image (object-position, etc.) */
  imageClassName?: string;
  /**
   * Overlay strength. `photo` keeps faces/subjects readable on people photos.
   */
  overlay?: "default" | "photo";
  /**
   * `split` places a sharp portrait/media panel beside the copy — use for
   * tall crew photos that break under full-bleed cover cropping.
   */
  layout?: "bleed" | "split";
  /** Optional page-specific jump tiles — omit on most pages */
  actions?: HeroAction[];
  /** Optional page-specific stats band — omit on most pages */
  stats?: HeroStat[];
  /**
   * Soften the bottom edge so the hero blends into the following section
   * (no hard seam / dividing line). Use on internal pages after home.
   */
  connectBottom?: boolean;
  id?: string;
  className?: string;
  children?: ReactNode;
};

export default function InternalPageHero({
  crumbs,
  titleLead,
  titleAccent,
  title,
  description,
  backgroundImage,
  imageClassName,
  overlay = "default",
  layout = "bleed",
  actions,
  stats,
  connectBottom = false,
  id,
  className,
  children,
}: InternalPageHeroProps) {
  const showStats = Boolean(stats && stats.length > 0);
  const photoOverlay = overlay === "photo";
  const isSplit = layout === "split";

  const titleNode = (
    <h1 className="max-w-3xl font-display text-4xl font-bold text-white uppercase md:text-5xl lg:text-[58px]">
      {titleLead ? (
        <>
          {titleLead}{" "}
          {titleAccent ? (
            <span className="text-accent italic normal-case">{titleAccent}</span>
          ) : null}
          <br />
          {title}
        </>
      ) : titleAccent ? (
        <>
          <span className="text-accent italic normal-case">{titleAccent}</span>
          <br />
          {title}
        </>
      ) : (
        title
      )}
    </h1>
  );

  const crumbsNode = (
    <p className="breadcrumb mb-6">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={`${crumb.label}-${index}`}>
            {index > 0 && <span className="mx-2 text-white/40">/</span>}
            {crumb.href && !isLast ? (
              <Link href={crumb.href}>{crumb.label}</Link>
            ) : (
              <span className={isLast ? "text-accent-light" : undefined}>
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </p>
  );

  const actionsNode =
    actions && actions.length > 0 ? (
      <RevealGroup
        immediate
        className="mt-9 grid grid-cols-2 gap-2 sm:gap-3 lg:max-w-3xl"
      >
        {actions.map((action) => (
          <RevealItem key={action.label} className="min-w-0">
            {action.hash ? (
              <a
                href={action.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = action.href.replace(/^#/, "");
                  scrollToId(target);
                  window.history.replaceState(null, "", action.href);
                }}
                className="flex h-full w-full items-center justify-center border border-white/20 bg-black/35 px-2 py-3.5 text-center font-display text-[10px] font-bold tracking-wide text-white uppercase backdrop-blur-sm transition duration-300 sm:px-3 sm:text-[12px] hover:border-accent hover:bg-accent hover:text-brand-ink"
              >
                {action.label}
              </a>
            ) : (
              <Link
                href={action.href}
                className="flex h-full w-full items-center justify-center border border-white/20 bg-black/35 px-2 py-3.5 text-center font-display text-[10px] font-bold tracking-wide text-white uppercase backdrop-blur-sm transition duration-300 sm:px-3 sm:text-[12px] hover:border-accent hover:bg-accent hover:text-brand-ink"
              >
                {action.label}
              </Link>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    ) : null;

  const statsNode = showStats ? (
    <div className="relative z-10 border-t border-white/10 bg-navy-950/95 backdrop-blur-md">
      <RevealGroup
        immediate
        className="container-site grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-8 md:py-10"
      >
        {stats!.map((stat) => {
          const body = (
            <>
              <p className="font-display text-3xl font-bold text-accent md:text-4xl lg:text-[42px]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[12px] tracking-wide text-white/65 uppercase transition group-hover:text-accent sm:text-[13px]">
                {stat.label}
              </p>
            </>
          );

          return (
            <RevealItem key={stat.label}>
              {stat.href ? (
                <Link
                  href={stat.href}
                  className="group block border-l-2 border-accent/80 pl-4 no-underline transition hover:opacity-90"
                >
                  {body}
                </Link>
              ) : (
                <div className="border-l-2 border-accent/80 pl-4">{body}</div>
              )}
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  ) : null;

  if (isSplit) {
    return (
      <section
        id={id}
        data-dark-surface
        className={cn(
          "relative scroll-mt-20 overflow-x-clip bg-navy-950 pt-[100px] sm:scroll-mt-24 sm:pt-[120px] lg:scroll-mt-28 lg:pt-[140px]",
          className,
        )}
      >
        <div className="container-site relative z-10 grid items-center gap-10 pb-16 sm:pb-20 lg:grid-cols-2 lg:gap-14 lg:pb-24">
          <Reveal immediate>
            {crumbsNode}
            {titleNode}
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75 md:text-[17px]">
              {description}
            </p>
            {children}
            {actionsNode}
          </Reveal>

          <Reveal immediate delay={0.08} className="relative w-full min-w-0">
            <div
              data-media
              className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-navy-900 sm:aspect-[4/5] lg:min-h-[520px] lg:aspect-auto"
            >
              <Image
                src={backgroundImage}
                alt=""
                fill
                priority
                className={cn(
                  "object-cover object-[center_18%]",
                  imageClassName,
                )}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
        {statsNode}
      </section>
    );
  }

  return (
    <section
      id={id}
      data-dark-surface
      data-media
      className={cn(
        "relative scroll-mt-20 overflow-x-clip bg-navy-950 pt-[100px] pb-0 sm:scroll-mt-24 sm:pt-[120px] lg:scroll-mt-28 lg:pt-[140px]",
        className,
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className={cn(
            photoOverlay
              ? "object-cover object-center"
              : "object-cover object-[center_35%] brightness-[1.08] contrast-[1.06] saturate-[1.1]",
            imageClassName,
          )}
          sizes="100vw"
        />
        {photoOverlay ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/88 via-navy-950/45 to-navy-950/10" />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t to-navy-950/25",
                connectBottom
                  ? "from-navy-950 via-navy-950/55 via-40%"
                  : "from-navy-950/80 via-transparent",
              )}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/78 via-navy-950/45 to-navy-950/20" />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t to-navy-950/30",
                connectBottom
                  ? "from-navy-950 via-navy-950/70 via-45%"
                  : "from-navy-950/95 via-navy-950/15",
              )}
            />
          </>
        )}
        {/* Extra soft seam into the next section (matches navy-950 bands) */}
        {connectBottom ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-navy-950 from-15% via-navy-950/85 via-50% to-transparent sm:h-36 md:h-44"
          />
        ) : null}
      </div>

      <div
        className={cn(
          "container-site relative z-10",
          showStats
            ? "pb-12 sm:pb-14 md:pb-16"
            : connectBottom
              ? "pb-20 sm:pb-24 md:pb-28"
              : "pb-16 sm:pb-20 md:pb-24",
        )}
      >
        <Reveal immediate>
          {crumbsNode}
          {titleNode}
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75 md:text-[17px]">
            {description}
          </p>
        </Reveal>

        {children}
        {actionsNode}
      </div>

      {statsNode}
    </section>
  );
}
