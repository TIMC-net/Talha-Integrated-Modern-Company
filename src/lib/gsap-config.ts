import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type AnimatableTarget = gsap.TweenTarget;

export function fadeInUp(target: AnimatableTarget, delay = 0) {
  if (prefersReducedMotion()) return gsap.set(target, { opacity: 1, y: 0 });
  return gsap.fromTo(
    target,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, delay, ease: "power2.out" }
  );
}

export function fadeInDown(target: AnimatableTarget, delay = 0) {
  if (prefersReducedMotion()) return gsap.set(target, { opacity: 1, y: 0 });
  return gsap.fromTo(
    target,
    { opacity: 0, y: -40 },
    { opacity: 1, y: 0, duration: 0.8, delay, ease: "power2.out" }
  );
}

export function slideInLeft(target: AnimatableTarget, delay = 0) {
  if (prefersReducedMotion()) return gsap.set(target, { opacity: 1, x: 0 });
  return gsap.fromTo(
    target,
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.8, delay, ease: "power2.out" }
  );
}

export function slideInRight(target: AnimatableTarget, delay = 0) {
  if (prefersReducedMotion()) return gsap.set(target, { opacity: 1, x: 0 });
  return gsap.fromTo(
    target,
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.8, delay, ease: "power2.out" }
  );
}

export function scaleIn(target: AnimatableTarget, delay = 0) {
  if (prefersReducedMotion()) return gsap.set(target, { opacity: 1, scale: 1 });
  return gsap.fromTo(
    target,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.8, delay, ease: "power2.out" }
  );
}

/** Word-by-word reveal — caller should pre-split text into one span per word. */
export function revealText(target: AnimatableTarget, delay = 0) {
  if (prefersReducedMotion()) return gsap.set(target, { opacity: 1, y: 0 });
  return gsap.fromTo(
    target,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay,
      stagger: 0.05,
      ease: "power2.out",
    }
  );
}

export function parallax(target: AnimatableTarget, speed = 0.5) {
  if (prefersReducedMotion()) return;
  return gsap.to(target, {
    yPercent: speed * 30,
    ease: "none",
    scrollTrigger: {
      trigger: target as gsap.DOMTarget,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/** Animates a counter element's textContent from 0 to `value`. */
export function countUp(
  target: AnimatableTarget,
  value: number,
  duration = 2
) {
  const counter = { value: 0 };
  if (prefersReducedMotion()) {
    gsap.set(target as Element, { textContent: Math.round(value).toString() });
    return;
  }
  return gsap.to(counter, {
    value,
    duration,
    ease: "power1.inOut",
    onUpdate: () => {
      const el = target as Element;
      el.textContent = Math.round(counter.value).toLocaleString();
    },
  });
}

export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top bottom-=50",
  toggleActions: "play none none none",
} as const;

export const STAGGER_DELAY = 0.1;

export { gsap, ScrollTrigger };
