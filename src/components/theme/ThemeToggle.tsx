"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import type { CSSProperties } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type ThemeToggleProps = {
  className?: string;
  style?: CSSProperties;
  size?: "sm" | "md";
  /** White icon/chrome for mix-blend-mode difference nav */
  blend?: boolean;
  /** @deprecated Surface probing removed — blend mode handles contrast */
  overDark?: boolean;
};

export default function ThemeToggle({
  className,
  style,
  size = "sm",
  blend = false,
  overDark = true,
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isLightTheme = mounted && theme === "light";
  const iconClass = size === "md" ? "h-5 w-5" : "h-4 w-4 xl:h-5 xl:w-5";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isLightTheme ? "Switch to dark theme" : "Switch to light theme"}
      title={isLightTheme ? "Dark mode" : "Light mode"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={cn(
        "group/theme relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border transition-[border-color,background-color,color,box-shadow] duration-300 hover:border-accent/50 hover:bg-accent/12 hover:text-accent hover:shadow-[0_0_0_4px_rgba(255,107,53,0.14)]",
        size === "md" ? "h-11 w-11" : "h-10 w-10 xl:h-11 xl:w-11",
        blend
          ? "border-[#ffffff]/55 bg-[#ffffff]/10 text-[#ffffff]"
          : overDark
            ? "border-black/10 bg-black/5 text-[#0a0a0a]"
            : "border-white/15 bg-white/5 text-[#ffffff]",
        className,
      )}
      style={style}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-accent/0 transition-colors duration-300 group-hover/theme:bg-accent/[0.08]"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isLightTheme ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -55, scale: 0.45 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 55, scale: 0.45 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="relative inline-flex"
        >
          {isLightTheme ? (
            <Moon className={iconClass} strokeWidth={2.1} />
          ) : (
            <Sun
              className={cn(
                iconClass,
                "transition-transform duration-500 ease-out group-hover/theme:rotate-45",
              )}
              strokeWidth={2.1}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
