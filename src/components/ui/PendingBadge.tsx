import { cn } from "@/lib/cn";

/** Visible label for content TIMC still needs to provide */
export function PendingBadge({
  label = "Content pending from TIMC",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block bg-accent/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-accent uppercase",
        className,
      )}
    >
      {label}
    </span>
  );
}

/** Section-level notice for placeholder copy / images */
export function PendingNotice({
  children = "Placeholder content and imagery — final materials will replace this once TIMC provides them.",
  className,
}: {
  children?: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "border border-accent/25 bg-accent/10 px-3 py-2 text-[12px] leading-relaxed text-accent/95",
        className,
      )}
    >
      {children}
    </p>
  );
}
