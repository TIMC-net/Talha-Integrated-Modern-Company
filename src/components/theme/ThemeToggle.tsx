"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/cn";

type ThemeToggleProps = {
  className?: string;
  /** Larger hit target for mobile overlays */
  size?: "sm" | "md";
};

export default function ThemeToggle({
  className,
  size = "sm",
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isLight = mounted && theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Dark mode" : "Light mode"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border transition",
        size === "md" ? "h-11 w-11" : "h-10 w-10 xl:h-11 xl:w-11",
        "border-white/15 bg-white/5 text-white hover:border-accent/40 hover:bg-accent/10 hover:text-accent",
        "theme-toggle",
        className,
      )}
    >
      {isLight ? (
        <Moon className={size === "md" ? "h-5 w-5" : "h-4 w-4 xl:h-5 xl:w-5"} />
      ) : (
        <Sun className={size === "md" ? "h-5 w-5" : "h-4 w-4 xl:h-5 xl:w-5"} />
      )}
    </button>
  );
}
