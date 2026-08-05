"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToId, useLenis } from "@/hooks/useLenis";
import { ScrollTrigger } from "@/lib/gsap-config";

export default function LenisWrapper({ children }: { children: ReactNode }) {
  useLenis();
  const pathname = usePathname();

  // On route change: either jump to hash target or reset to top
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const lenis = window.timcLenis;

    const settleLayout = () => {
      lenis?.resize();
      ScrollTrigger.refresh();
    };

    if (hash) {
      // Allow the new page (and images) to measure, then scroll to the section.
      // Immediate once, then a short re-try after layout settles.
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

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(settleLayout);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return <>{children}</>;
}
