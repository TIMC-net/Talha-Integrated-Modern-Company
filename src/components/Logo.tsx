"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/company";
import { handleSameRouteClick } from "@/lib/nav";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
  /** Smaller mark for tight spaces */
  compact?: boolean;
  /** Icon only */
  markOnly?: boolean;
  /**
   * For mix-blend-mode nav: white wordmark (inverts with difference),
   * colored mark escapes the blend so brand colors stay true.
   */
  blend?: boolean;
};

export default function Logo({
  className = "",
  variant = "dark",
  compact = false,
  markOnly = false,
  blend = false,
}: LogoProps) {
  const pathname = usePathname();
  const light = blend || variant === "light";

  return (
    <Link
      href="/"
      onClick={(e) => {
        handleSameRouteClick(e, pathname, "/");
      }}
      className={`inline-flex shrink-0 items-center no-underline ${
        markOnly
          ? "gap-0"
          : compact
            ? "gap-1.5 sm:gap-2"
            : "gap-2.5 sm:gap-3"
      } ${className}`}
      aria-label={company.name}
    >
      <span className={blend ? "nav-blend-escape inline-flex" : "inline-flex"}>
        <Image
          src="/images/logo-mark.webp"
          alt=""
          width={256}
          height={256}
          priority
          className={`w-auto shrink-0 rounded-full object-contain ${
            markOnly
              ? "h-9 max-h-9 sm:h-10 sm:max-h-10"
              : compact
                ? "h-8 max-h-8 sm:h-9 sm:max-h-9"
                : "h-10 max-h-10 sm:h-11 sm:max-h-11 lg:h-12 lg:max-h-12"
          }`}
        />
      </span>
      {!markOnly && (
        <span className="flex min-w-0 flex-col justify-center leading-none">
          <span
            className={`font-display font-bold tracking-wide uppercase ${
              compact
                ? "text-[13px] sm:text-[15px]"
                : "text-[15px] sm:text-base lg:text-lg"
            } ${light ? "text-[#ffffff]" : "text-[#0a0a0a]"}`}
          >
            TALHA
          </span>
          {!compact && (
            <span
              className={`mt-1 font-semibold tracking-[0.12em] uppercase ${
                light ? "text-[#ffffff]/65" : "text-[#0a0a0a]/55"
              } text-[7px] sm:text-[8px] lg:text-[9px]`}
            >
              Integrated Modern Co. (TIMC)
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
