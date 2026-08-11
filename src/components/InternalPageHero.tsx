"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import WriteOnScroll from "@/components/motion/WriteOnScroll";
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
  /**
   * Full-bleed photo. Omit for a professional surface-only hero
   * (typography + atmosphere, no image). Files stay on disk either way.
   */
  backgroundImage?: string;
  /** Extra classes for the background Image (object-position, etc.) */
  imageClassName?: string;
  /**
   * Overlay strength. `photo` keeps faces/subjects readable on people photos.
   */
  overlay?: "default" | "photo";
  /**
   * `split` places a sharp portrait/media panel beside the copy — use for
   * tall crew photos that break under full-bleed cover cropping.
   * Requires `backgroundImage`.
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
  /** Optional small label above the title (e.g. "Since 2010 · Jeddah") */
  eyebrow?: string;
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
  eyebrow,
  id,
  className,
  children,
}: InternalPageHeroProps) {
  const showStats = Boolean(stats && stats.length > 0);
  const photoOverlay = overlay === "photo";
  const hasImage = Boolean(backgroundImage);
  const isSplit = layout === "split" && hasImage;

  const titleClass = cn(
    "max-w-xl font-display text-4xl font-bold leading-[1.15] text-white uppercase sm:max-w-2xl md:text-5xl md:leading-[1.12] lg:text-[56px] lg:leading-[1.12]",
    hasImage
      ? "[text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_18px_rgba(0,0,0,0.55)]"
      : "drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]",
  );
  const accentClass = cn(
    "text-accent italic normal-case",
    hasImage &&
      "[text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_14px_rgba(0,0,0,0.45)]",
  );

  // Copy stays fully inside the solid plate (never under the fade wing)
  const descriptionClass = cn(
    "mt-5 max-w-md text-[16px] leading-[1.7] md:max-w-[28rem] md:text-[17px] md:leading-[1.7]",
    hasImage
      ? "text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]"
      : "max-w-2xl text-white/70",
  );

  // `fade` mode: no per-word overflow mask (was snipping last glyphs)
  const titleNode = (
    <h1 className={titleClass}>
      {titleLead ? (
        <>
          <WriteOnScroll
            as="span"
            mode="fade"
            text={`${titleLead} `}
            className="inline"
            immediate
          />
          {titleAccent ? (
            <WriteOnScroll
              as="span"
              mode="fade"
              text={titleAccent}
              className={cn("inline", accentClass)}
              delay={0.05}
              immediate
            />
          ) : null}
          <br />
          <WriteOnScroll
            as="span"
            mode="fade"
            text={title}
            className="inline"
            delay={0.08}
            immediate
          />
        </>
      ) : titleAccent ? (
        <>
          <WriteOnScroll
            as="span"
            mode="fade"
            text={titleAccent}
            className={cn("inline", accentClass)}
            immediate
          />
          <br />
          <WriteOnScroll
            as="span"
            mode="fade"
            text={title}
            className="inline"
            delay={0.06}
            immediate
          />
        </>
      ) : (
        <WriteOnScroll
          as="span"
          mode="fade"
          text={title}
          className="inline"
          immediate
        />
      )}
    </h1>
  );

  const crumbsNode = (
    <p
      className={cn(
        "breadcrumb mb-6",
        hasImage &&
          "[text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_1px_12px_rgba(0,0,0,0.4)]",
      )}
    >
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

  const eyebrowNode = eyebrow ? (
    <p
      className={cn(
        "mb-4 font-display text-[11px] font-semibold tracking-[0.22em] text-accent uppercase sm:text-[12px]",
        hasImage &&
          "[text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_1px_10px_rgba(0,0,0,0.4)]",
      )}
    >
      {eyebrow}
    </p>
  ) : null;

  const copyBlock = (
    <>
      {crumbsNode}
      {eyebrowNode}
      {titleNode}
      <p className={cn(descriptionClass, "pb-0.5")}>{description}</p>
    </>
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

  /** Atmospheric surface (no photo) — used when `backgroundImage` is omitted */
  const surfaceBackdrop = (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-navy-950" />
      <div
        className="absolute -top-24 left-1/2 h-[520px] w-[min(1200px,140%)] -translate-x-1/2 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 0%, rgba(255,107,53,0.14), transparent 70%)",
        }}
      />
      <div
        className="absolute right-0 bottom-0 h-[50%] w-[55%] opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 100% 100%, rgba(255,107,53,0.06), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />
      <div className="absolute top-[96px] right-6 hidden h-16 w-16 border-t border-r border-white/15 sm:top-[112px] sm:right-10 md:block lg:right-14" />
      <div className="absolute bottom-10 left-6 hidden h-16 w-16 border-b border-l border-accent/35 sm:left-10 md:block lg:left-14" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-4%] flex justify-center overflow-hidden select-none">
        <span className="font-display text-[18vw] leading-none font-bold tracking-tighter text-white/[0.035] uppercase sm:text-[15vw] lg:text-[12vw]">
          TIMC
        </span>
      </div>
      {connectBottom ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-navy-950 from-20% via-navy-950/90 via-55% to-transparent sm:h-32" />
      ) : null}
    </div>
  );

  const heroImageClass = cn(
    photoOverlay
      ? "object-cover object-center"
      : "object-cover object-[center_40%]",
    imageClassName,
  );

  if (isSplit && backgroundImage) {
    return (
      <section
        id={id}
        data-dark-surface
        data-media
        className={cn(
          "relative scroll-mt-20 overflow-x-clip bg-navy-950 sm:scroll-mt-24 lg:scroll-mt-28",
          className,
        )}
      >
        {/* Mobile only: full-bleed landscape photo first (matches home hero) */}
        <div className="relative w-full sm:hidden">
          <div
            data-media
            className="relative aspect-video w-full overflow-hidden bg-navy-900"
          >
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              quality={90}
              className={cn(
                "object-cover object-[center_18%]",
                imageClassName,
              )}
              sizes="100vw"
            />
          </div>
        </div>

        <div className="container-site relative z-10 grid items-center gap-10 pb-16 sm:gap-10 sm:pb-20 sm:pt-[120px] lg:grid-cols-2 lg:gap-14 lg:pb-24 lg:pt-[140px]">
          <Reveal immediate className="mt-0 overflow-visible pt-6 sm:mt-0 sm:pt-0">
            {copyBlock}
            {children}
            {actionsNode}
          </Reveal>

          <Reveal
            immediate
            delay={0.08}
            className="relative hidden w-full min-w-0 sm:block"
          >
            <div
              data-media
              className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-navy-900 lg:min-h-[520px] lg:aspect-auto"
            >
              <Image
                src={backgroundImage}
                alt=""
                fill
                priority
                quality={90}
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
      data-media={hasImage ? true : undefined}
      className={cn(
        "relative scroll-mt-20 overflow-x-clip bg-navy-950 pb-0 sm:scroll-mt-24 lg:scroll-mt-28",
        // No image: keep nav clearance in flow. With image: home-style stack on
        // mobile (media first), overlay + top pad from sm up.
        !hasImage && "pt-[100px] sm:pt-[120px] lg:pt-[140px]",
        hasImage && "sm:flex sm:min-h-[min(72svh,720px)] sm:items-end",
        className,
      )}
    >
      {hasImage && backgroundImage ? (
        /*
          Mobile: in-flow 16:9 photo (full frame, no copy on top).
          sm+: absolute full-bleed cover behind the copy.
        */
        <div className="relative w-full sm:absolute sm:inset-0">
          <div className="relative aspect-video w-full overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              quality={90}
              className={heroImageClass}
              sizes="100vw"
            />
            {/* Mobile: no wash so the photo reads clear end-to-end.
                sm+: light edge washes for text contrast over the image. */}
            <div
              aria-hidden
              className="absolute inset-0 hidden bg-gradient-to-b from-navy-950/10 via-transparent to-navy-950/70 sm:block"
            />
            <div
              aria-hidden
              className="absolute inset-0 hidden bg-gradient-to-r from-black/20 via-transparent to-transparent sm:block md:from-black/12"
            />
            {connectBottom ? (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-20 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-transparent sm:block sm:h-28 md:h-32"
              />
            ) : null}
          </div>
        </div>
      ) : (
        surfaceBackdrop
      )}

      <div
        className={cn(
          "container-site relative w-full",
          hasImage
            ? cn(
                // Mobile: stack under the photo (no overlap). sm+: float over bleed.
                "z-auto mt-0 pt-6",
                showStats
                  ? "pb-0 sm:pb-14 md:pb-16"
                  : "pb-0 sm:pb-16 md:pb-20",
                "sm:z-10 sm:mt-0 sm:pt-[120px] lg:pt-[140px]",
              )
            : showStats
              ? "pb-12 sm:pb-14 md:pb-16"
              : connectBottom
                ? "pb-10 sm:pb-16 md:pb-20"
                : "pb-10 sm:pb-16 md:pb-20",
        )}
      >
        <Reveal immediate className="overflow-visible">
          {/*
            Photo heroes: solid plate under all copy + separate soft fade wing.
            Mobile plate sits fully below the image; sm+ plate overlays the photo.
          */}
          {hasImage ? (
            <div className="relative flex max-w-3xl items-stretch sm:max-w-4xl">
              <div className="relative z-10 min-w-0 max-w-full border-l-[3px] border-accent bg-navy-950 py-5 pl-5 pr-7 sm:bg-[rgba(28,28,28,0.82)] sm:py-8 sm:pl-7 sm:pr-10 md:pr-12">
                {copyBlock}
              </div>
              <div
                aria-hidden
                className="pointer-events-none hidden w-10 shrink-0 bg-[linear-gradient(to_right,rgba(28,28,28,0.82)_0%,rgba(28,28,28,0.38)_55%,transparent_100%)] sm:block sm:w-16 md:w-24"
              />
            </div>
          ) : (
            <div className="relative max-w-3xl border-l-2 border-accent/70 pl-5 sm:pl-6 md:pl-7">
              {crumbsNode}
              {eyebrowNode}
              {titleNode}
              <p className={cn(descriptionClass, "pb-0.5")}>{description}</p>
            </div>
          )}
        </Reveal>

        {children}
        {actionsNode}
      </div>

      {statsNode}
    </section>
  );
}
