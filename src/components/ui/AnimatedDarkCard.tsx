import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AnimatedDarkCardProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "div";
};

/** Shared dark-surface card with lift, accent border, side & bottom bars */
export default function AnimatedDarkCard({
  children,
  className,
  as: Tag = "article",
}: AnimatedDarkCardProps) {
  return (
    <Tag
      className={cn(
        "dark-card group/card relative h-full overflow-hidden border border-white/10 bg-navy-950 p-6",
        "transition-[color,background-color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-accent/70 hover:bg-navy-900",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="card-bar-y pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-[2px] bg-accent"
      />
      {children}
      <span
        aria-hidden
        className="card-bar-x pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-[2px] bg-accent"
      />
    </Tag>
  );
}
