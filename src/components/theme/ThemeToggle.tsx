"use client";

import { Moon, Sun } from "lucide-react";
import type { CSSProperties } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/cn";

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

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLightTheme ? "Switch to dark theme" : "Switch to light theme"}
      title={isLightTheme ? "Dark mode" : "Light mode"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border transition-[border-color] duration-150 hover:border-accent/40 hover:bg-accent/10 hover:text-accent",
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
      {isLightTheme ? (
        <Moon className={size === "md" ? "h-5 w-5" : "h-4 w-4 xl:h-5 xl:w-5"} />
      ) : (
        <Sun className={size === "md" ? "h-5 w-5" : "h-4 w-4 xl:h-5 xl:w-5"} />
      )}
    </button>
  );
}
