import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display text-sm font-semibold uppercase tracking-wide transition-[color,background-color,border-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "btn-holo bg-accent text-brand-ink hover:bg-accent-dark hover:text-brand-ink",
        outline:
          "btn-holo btn-holo-outline border border-white/35 text-white hover:border-white hover:bg-white/10",
        ghost: "text-foreground hover:bg-black/5",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 whitespace-nowrap",
        sm: "h-9 px-4 text-xs whitespace-nowrap",
        lg: "h-12 px-6 text-sm whitespace-nowrap sm:px-8 sm:text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
