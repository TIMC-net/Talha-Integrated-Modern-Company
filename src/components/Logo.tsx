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
      className={`inline-flex max-w-[11rem] shrink-0 items-center gap-2 no-underline sm:max-w-none sm:gap-2.5 ${className}`}
      aria-label={company.name}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={40}
        height={35}
        priority
        className="h-7 w-auto max-h-7 shrink-0 object-contain sm:h-9 sm:max-h-9 lg:h-11 lg:max-h-11"
      />
      <span className="flex min-w-0 flex-col justify-center leading-none">
        <span
          className={`font-display text-[12px] font-bold tracking-wide uppercase sm:text-base lg:text-lg ${
            light ? "text-white" : "text-ink"
          }`}
        >
          TALHA
        </span>
        <span
          className={`mt-0.5 text-[7px] font-semibold tracking-[0.14em] uppercase sm:text-[8px] sm:tracking-[0.12em] lg:text-[9px] ${
            light ? "text-white/65" : "text-slate"
          }`}
        >
          <span className="sm:hidden">(TIMC)</span>
          <span className="hidden sm:inline">Integrated Modern Co. (TIMC)</span>
        </span>
      </span>
    </Link>
  );
}
