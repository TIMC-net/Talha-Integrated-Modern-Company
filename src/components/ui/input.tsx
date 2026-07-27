import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({
  className,
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        // text-base (16px) prevents iOS Safari's zoom-on-focus for inputs under 16px
        "flex h-12 w-full border border-border-soft bg-white px-4 text-base text-ink outline-none transition placeholder:text-slate focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}
