"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

declare global {
  interface Window {
    timcLenis?: Lenis;
  }
}

/** Initializes Lenis smooth scroll and keeps it in lockstep with GSAP's
 * ticker so ScrollTrigger positions stay accurate. Returns the live
 * instance (null until mounted / if the user prefers reduced motion). */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      lerp: 0.1,
      infinite: false,
      // Prevent native anchor / scrollIntoView from fighting Lenis
      anchors: false,
      prevent: (node) =>
        node instanceof HTMLElement &&
        (node.closest("[data-lenis-prevent]") !== null ||
          node.closest(".swiper") !== null),
    });
    lenisRef.current = lenis;
    window.timcLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("timc:scroll"));
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    // Content height changes (Reveals, images) invalidate Lenis limits
    const resizeObserver = new ResizeObserver(() => {
      refresh();
    });
    resizeObserver.observe(document.body);

    window.addEventListener("resize", refresh);
    // After route paints / images load
    const loadRefresh = () => refresh();
    window.addEventListener("load", loadRefresh);
    requestAnimationFrame(refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", loadRefresh);
      resizeObserver.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      if (window.timcLenis === lenis) {
        window.timcLenis = undefined;
      }
    };
  }, [reduceMotion]);

  return lenisRef;
}

const HEADER_OFFSET = 100;

/** Smooth-scroll to an element id using Lenis when available. */
export function scrollToId(id: string, immediate = false) {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = window.timcLenis;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: -HEADER_OFFSET,
      immediate,
      duration: 1.2,
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}
