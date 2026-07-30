import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/company";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
  /** Smaller mark for compact floating nav */
  compact?: boolean;
  /** Icon only — Integriti collapsed state */
  markOnly?: boolean;
};

export default function Logo({
  className = "",
  variant = "dark",
  compact = false,
  markOnly = false,
}: LogoProps) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center no-underline ${
        markOnly
          ? "gap-0"
          : compact
            ? "gap-1.5 sm:gap-2"
            : "max-w-[11rem] gap-2 sm:max-w-none sm:gap-2.5"
      } ${className}`}
      aria-label={company.name}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={40}
        height={35}
        priority
        className={`w-auto shrink-0 object-contain transition-[height,max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          markOnly || compact
            ? "h-9 max-h-9 sm:h-10 sm:max-h-10 lg:h-11 lg:max-h-11"
            : "h-8 max-h-8 sm:h-10 sm:max-h-10 lg:h-12 lg:max-h-12"
        }`}
      />
      {!markOnly && (
        <span className="flex min-w-0 flex-col justify-center leading-none">
          <span
            className={`font-display font-bold tracking-wide uppercase transition-[font-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              compact
                ? "text-[13px] sm:text-[15px] lg:text-base"
                : "text-[12px] sm:text-base lg:text-lg"
            } ${light ? "text-white" : "text-ink"}`}
          >
            TALHA
          </span>
          {!compact && (
            <span
              className={`mt-0.5 text-[7px] font-semibold tracking-[0.14em] uppercase sm:text-[8px] sm:tracking-[0.12em] lg:text-[9px] ${
                light ? "text-white/65" : "text-slate"
              }`}
            >
              <span className="sm:hidden">(TIMC)</span>
              <span className="hidden sm:inline">Integrated Modern Co. (TIMC)</span>
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
