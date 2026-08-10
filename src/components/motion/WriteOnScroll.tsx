"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type WriteAs = "h1" | "h2" | "h3" | "h4" | "p" | "span";

type WriteOnScrollProps = {
  text: string;
  as?: WriteAs;
  className?: string;
  /**
   * `words` — clipped rise-in per word (drawn onto the page).
   * `write` — character-by-character type-on.
   * `fade` — whole string fades/rises (no overflow mask — safe for hero titles).
   */
  mode?: "words" | "write" | "fade";
  delay?: number;
  /** Play on mount instead of waiting for scroll */
  immediate?: boolean;
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
} as const;

/**
 * Scroll-triggered text: words lift into place as if being written,
 * or characters type on for shorter headlines.
 * Plays once per page load when first scrolled into view (reload to replay).
 */
export default function WriteOnScroll({
  text,
  as = "h2",
  className,
  mode = "words",
  delay = 0,
  immediate = false,
}: WriteOnScrollProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[as];

  if (reduce) {
    const StaticTag = as;
    return <StaticTag className={className}>{text}</StaticTag>;
  }

  const viewProps = immediate
    ? ({ initial: "hidden", animate: "show" } as const)
    : ({
        initial: "hidden",
        whileInView: "show",
        viewport: {
          once: true,
          amount: 0.35,
          margin: "0px 0px -8% 0px",
        },
      } as const);

  if (mode === "fade") {
    return (
      <MotionTag
        className={cn("write-on-scroll write-on-scroll--fade", className)}
        {...viewProps}
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, delay, ease: EASE },
          },
        }}
      >
        {text}
      </MotionTag>
    );
  }

  if (mode === "write") {
    const chars = Array.from(text);
    return (
      <MotionTag
        className={cn("write-on-scroll write-on-scroll--type", className)}
        {...viewProps}
        variants={{
          hidden: {},
          show: {
            transition: { delayChildren: delay, staggerChildren: 0.02 },
          },
        }}
        aria-label={text}
      >
        {chars.map((ch, i) => (
          <motion.span
            key={`${i}-${ch === " " ? "sp" : ch}`}
            className="write-on-scroll__char"
            variants={{
              hidden: { opacity: 0, y: "0.28em" },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.2, ease: EASE },
              },
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  const words = text.split(/(\s+)/).filter(Boolean);

  return (
    <MotionTag
      className={cn("write-on-scroll write-on-scroll--words", className)}
      {...viewProps}
      variants={{
        hidden: {},
        show: {
          transition: { delayChildren: delay, staggerChildren: 0.048 },
        },
      }}
      aria-label={text}
    >
      {words.map((token, i) => {
        if (/^\s+$/.test(token)) {
          return <span key={`sp-${i}`}>{" "}</span>;
        }
        return (
          <span key={`${i}-${token}`} className="write-on-scroll__word">
            <motion.span
              className="write-on-scroll__word-inner"
              variants={{
                hidden: { y: "112%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.55, ease: EASE },
                },
              }}
            >
              {token}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
