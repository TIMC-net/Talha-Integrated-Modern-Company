"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { aboutNarrative, company } from "@/lib/company";
import WriteOnScroll from "@/components/motion/WriteOnScroll";

const yearsActive = new Date().getFullYear() - Number(company.established);

export default function AboutIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect reduced-motion and data-saver preferences: stay on the
    // poster image rather than downloading/playing the video.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
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
    video.play().catch(() => {});
  }, []);

  return (
    <section
      id="intro"
      data-dark-surface
      className="scroll-mt-24 overflow-x-clip bg-navy-950 pt-6 pb-16 md:pt-8 md:pb-24"
    >
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-10 2xl:gap-14">
          <Reveal immediate className="relative w-full min-w-0">
            <div className="group relative mx-auto aspect-video w-full max-w-full overflow-hidden bg-navy-900 sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[5/6]">
              <video
                ref={videoRef}
                className="video-cover video-cover--muted absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center 40%" }}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/about-us-img.webp"
              >
                <source src="/videos/about-company.mp4" type="video/mp4" />
              </video>
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(5,8,16,0.08) 0%, rgba(5,8,16,0.22) 40%, rgba(5,8,16,0.55) 72%, rgba(5,8,16,0.82) 100%)",
                }}
              />
            </div>

            <div className="absolute right-2 bottom-6 hidden w-[130px] bg-accent p-4 text-navy-950 shadow-xl sm:block sm:right-0 md:-right-4 md:bottom-8 md:w-[150px] md:p-5 lg:-right-6">
              <p className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">{yearsActive}+</p>
              <p className="mt-2 text-[11px] font-bold tracking-wide uppercase md:text-[12px]">
                Years of Experience
              </p>
              <p className="mt-1 text-[9px] font-bold uppercase opacity-70">
                Est. {company.established}
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal immediate>
              <span className="section-eyebrow text-accent">Building Company</span>
              <WriteOnScroll
                as="h2"
                text="Building Your Visions Creating Reality"
                className="section-heading section-heading--on-dark mt-4 text-2xl md:text-[36px]"
              />
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-white/65 md:text-[16px]">
                {aboutNarrative.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12} className="mt-8">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
