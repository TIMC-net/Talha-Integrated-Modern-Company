"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/hooks/useLenis";

export default function LenisWrapper({ children }: { children: ReactNode }) {
  useLenis();
  const pathname = usePathname();

  // Reset to top on every route change (Lenis otherwise keeps prior scroll)
  useEffect(() => {
    const lenis = window.timcLenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return <>{children}</>;
}
