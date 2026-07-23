import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/company";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
};

export default function Logo({ className = "", variant = "dark" }: LogoProps) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center gap-3 no-underline ${className}`}
      aria-label={company.name}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={807}
        height={697}
        priority
        className="h-11 w-auto object-contain sm:h-12 lg:h-14"
      />
      <span className="flex min-w-0 flex-col justify-center leading-tight">
        <span
          className={`font-display text-lg font-bold tracking-wide uppercase sm:text-xl lg:text-[22px] ${
            light ? "text-white" : "text-ink"
          }`}
        >
          TALHA
        </span>
        <span
          className={`whitespace-nowrap text-[9px] font-semibold tracking-[0.14em] uppercase sm:text-[10px] ${
            light ? "text-white/70" : "text-slate"
          }`}
        >
          Integrated Modern Company
        </span>
        <span className="mt-0.5 text-[9px] font-bold tracking-[0.2em] text-accent-dark sm:text-[10px]">
          (TIMC)
        </span>
      </span>
    </Link>
  );
}
