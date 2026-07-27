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
        "group/card relative h-full overflow-hidden border border-white/10 bg-navy-950 p-6 transition-all duration-500",
        "hover:border-accent/70 hover:bg-navy-900",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_20px_40px_-28px_rgba(255,107,53,0.55)]",
        className,
      )}
    >
      <span className="absolute top-0 bottom-0 left-0 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover/card:scale-y-100 [@media(hover:none)]:group-hover/card:scale-y-0" />
      {children}
      <span className="absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover/card:scale-x-100 [@media(hover:none)]:group-hover/card:scale-x-0" />
    </Tag>
  );
}
