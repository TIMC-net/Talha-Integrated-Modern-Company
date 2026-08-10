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
      // Only nested vertical scroll areas — NOT horizontal Swipers.
      // Blocking .swiper made Project Clarity (and similar) jerk on vertical scroll.
      prevent: (node) =>
        node instanceof HTMLElement &&
        node.closest("[data-lenis-prevent]") !== null,
    });
    lenisRef.current = lenis;
    window.timcLenis = lenis;

    let isScrolling = false;
    let needsRefresh = false;
    let scrollIdleTimer = 0;
    let refreshRaf = 0;
    let refreshTimer = 0;
    let lastBodyHeight = 0;

    const applyRefresh = () => {
      const nextH = document.body.scrollHeight;
      // Ignore tiny layout jitters (font swap / 1px shifts) that cause scroll jumps
      if (lastBodyHeight > 0 && Math.abs(nextH - lastBodyHeight) < 32) {
        return;
      }
      lastBodyHeight = nextH;
      lenis.resize();
      ScrollTrigger.refresh();
    };

    const scheduleRefresh = () => {
      // Never refresh mid-scroll — that causes visible page jerks sitewide.
      if (isScrolling) {
        needsRefresh = true;
        return;
      }
      if (refreshRaf) cancelAnimationFrame(refreshRaf);
      refreshRaf = requestAnimationFrame(() => {
        refreshRaf = 0;
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(applyRefresh, 220);
      });
    };

    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", () => {
      isScrolling = true;
      window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        isScrolling = false;
        if (needsRefresh) {
          needsRefresh = false;
          applyRefresh();
        }
      }, 180);
      window.dispatchEvent(new Event("timc:scroll"));
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Content height changes (Reveals, images) invalidate Lenis limits
    const resizeObserver = new ResizeObserver(() => {
      scheduleRefresh();
    });
    resizeObserver.observe(document.body);

    window.addEventListener("resize", scheduleRefresh);
    // After route paints / images load
    const loadRefresh = () => scheduleRefresh();
    window.addEventListener("load", loadRefresh);
    requestAnimationFrame(scheduleRefresh);

    return () => {
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("load", loadRefresh);
      resizeObserver.disconnect();
      if (refreshRaf) cancelAnimationFrame(refreshRaf);
      window.clearTimeout(refreshTimer);
      window.clearTimeout(scrollIdleTimer);
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

/**
 * Lock document scroll while a modal / sheet is open.
 * Handles Lenis + iOS Safari (overflow:hidden alone still lets the page move).
 * Returns an unlock function — call it in effect cleanup.
 */
export function lockPageScroll() {
  const lenis = typeof window !== "undefined" ? window.timcLenis : undefined;
  const scrollY =
    lenis && typeof lenis.scroll === "number" ? lenis.scroll : window.scrollY;

  const html = document.documentElement;
  const body = document.body;

  const prev = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
    bodyTouchAction: body.style.touchAction,
  };

  // Hide viewport FABs / section spies so they can't paint over dialogs.
  html.setAttribute("data-scroll-locked", "");
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.touchAction = "none";
  lenis?.stop();

  return () => {
    html.removeAttribute("data-scroll-locked");
    html.style.overflow = prev.htmlOverflow;
    body.style.overflow = prev.bodyOverflow;
    body.style.position = prev.bodyPosition;
    body.style.top = prev.bodyTop;
    body.style.left = prev.bodyLeft;
    body.style.right = prev.bodyRight;
    body.style.width = prev.bodyWidth;
    body.style.touchAction = prev.bodyTouchAction;
    lenis?.start();
    if (lenis) {
      lenis.scrollTo(scrollY, { immediate: true });
    } else {
      window.scrollTo(0, scrollY);
    }
  };
}

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
