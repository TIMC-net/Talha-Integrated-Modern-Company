"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  disableNativeScrollRestoration,
  scrollPageToTop,
  scrollToId,
  useLenis,
} from "@/hooks/useLenis";
import { ScrollTrigger } from "@/lib/gsap-config";

export default function LenisWrapper({ children }: { children: ReactNode }) {
  useLenis();
  const pathname = usePathname();

  // Browser "restore last scroll" fights soft-nav to a new page on mobile
  useEffect(() => {
    disableNativeScrollRestoration();
  }, []);

  // On route change: either jump to hash target or reset to top
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");

    const settleLayout = () => {
      window.timcLenis?.resize();
      ScrollTrigger.refresh();
    };

    if (hash) {
      // Allow the new page (and images) to measure, then scroll to the section.
      const go = (immediate: boolean) => scrollToId(hash, immediate);

      requestAnimationFrame(() => {
        settleLayout();
        go(true);
      });

      const retry = window.setTimeout(() => {
        settleLayout();
        go(false);
      }, 280);

      return () => window.clearTimeout(retry);
    }

    // Force page start. Mobile menu unlock + layout refresh can re-apply the
    // previous page's offset after the first scrollTo(0) — reassert top over a
    // short window while the new route paints.
    scrollPageToTop();
    const timers = [0, 16, 64, 180, 360].map((ms) =>
      window.setTimeout(() => {
        scrollPageToTop();
        if (ms === 180 || ms === 360) settleLayout();
      }, ms),
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [pathname]);

  return <>{children}</>;
}
