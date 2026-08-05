"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { fadeInUp, revealText } from "@/lib/gsap-config";

const BRAND = "TIMC";
const HEADLINE = "General Contractor for Critical Infrastructure";
const SUBHEADING =
  "Civil infrastructure, foundation engineering, and energy infrastructure — with integrated equipment rental supporting every project phase across Saudi Arabia.";

export default function Hero() {
  const brandRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fadeInUp(brandRef.current, 0.15);
    revealText(wordsRef.current);
    fadeInUp(subRef.current, 0.7);
    fadeInUp(ctaRef.current, 1.0);

    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const isDataConscious =
      connection?.saveData ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g";

    if (prefersReducedMotion || isDataConscious) return;

    video.preload = "auto";
    const play = () => {
      video.play().catch(() => {});
    };

    play();
    const handleVisibility = () => {
      if (!document.hidden) play();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <section
      data-dark-surface
      data-media
      className="relative overflow-x-clip bg-navy-950 sm:flex sm:min-h-[100svh] sm:items-center"
    >
      {/*
        Mobile: native 16:9 frame under the floating nav so the full landscape
        video is visible with no side-crop. Desktop: absolute full-bleed cover.
      */}
      <div className="relative w-full sm:absolute sm:inset-0">
        <div className="relative aspect-video w-full overflow-hidden sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
          <video
            ref={videoRef}
            className="video-cover absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/header-contracting.jpg"
            aria-hidden
          >
            <source src="/videos/hero-construction.mp4" type="video/mp4" />
          </video>
          {/* Light at top → darker at bottom so the video stays visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/10 via-navy-950/30 to-navy-950/85" />
          {/* Soft left wash on desktop for headline contrast without crushing the video */}
          <div className="absolute inset-0 hidden sm:block sm:bg-gradient-to-r sm:from-navy-950/35 sm:via-transparent sm:to-transparent" />
        </div>
      </div>

      <div className="container-site relative z-10 w-full -mt-10 pt-0 pb-10 sm:mt-0 sm:pt-[100px] sm:pb-14 lg:pt-[120px] lg:pb-16">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-3 font-display text-[11px] font-semibold tracking-[2.5px] text-accent uppercase sm:mb-4 sm:text-[12px] sm:tracking-[3px]">
            <span className="inline-block h-[2px] w-7 bg-accent" aria-hidden />
            Kingdom of Saudi Arabia
          </p>

          <h1
            ref={brandRef}
            className="font-display text-[2.25rem] leading-none font-bold tracking-wide text-white uppercase sm:text-5xl md:text-6xl lg:text-[72px]"
          >
            {BRAND}
          </h1>

          <p className="mt-3 font-display text-[15px] leading-snug font-semibold text-white/90 uppercase sm:mt-5 sm:text-xl md:text-2xl lg:text-[32px] lg:leading-[1.2]">
            {HEADLINE.split(" ").map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden">
                <span
                  ref={(el) => {
                    if (el) wordsRef.current[i] = el;
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </span>
              </span>
            ))}
          </p>

          <p
            ref={subRef}
            className="mt-3 max-w-xl text-[13px] leading-relaxed text-white/75 sm:mt-6 sm:text-[16px] md:text-[18px]"
          >
            {SUBHEADING}
          </p>

          <div
            ref={ctaRef}
            className="mt-6 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="animate-soft-heartbeat h-auto min-h-12 w-full justify-center whitespace-normal px-5 py-3.5 text-center text-[13px] sm:w-auto sm:whitespace-nowrap sm:px-8 sm:text-base"
            >
              <Link href="/contact">
                Discuss Your Project <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto min-h-12 w-full justify-center whitespace-normal px-5 py-3.5 text-center text-[13px] sm:w-auto sm:whitespace-nowrap sm:px-8 sm:text-base"
            >
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
