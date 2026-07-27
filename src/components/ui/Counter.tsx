"use client";

import { useEffect, useRef } from "react";
import { countUp, ScrollTrigger } from "@/lib/gsap-config";

export default function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom-=50",
      once: true,
      onEnter: () => countUp(el, value, 2),
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span className="tabular-nums" aria-label={`${value}${suffix}`}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
