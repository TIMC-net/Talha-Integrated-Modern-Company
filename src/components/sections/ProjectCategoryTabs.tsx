"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { label: "Ongoing Projects", href: "/projects/ongoing" },
  { label: "Completed Projects", href: "/projects/completed" },
] as const;

export default function ProjectCategoryTabs() {
  const pathname = usePathname();

  return (
    <div className="mb-10 flex flex-wrap gap-2 border-b border-white/10 pb-6 md:mb-12">
      {categories.map((cat) => {
        const active = pathname === cat.href;
        return (
          <Link
            key={cat.href}
            href={cat.href}
            className={`relative px-5 py-3 font-display text-[12px] font-bold tracking-[1.5px] uppercase transition duration-300 ${
              active
                ? "bg-accent text-navy-950"
                : "border border-white/15 bg-white/[0.03] text-white/70 hover:border-accent/60 hover:text-white"
            }`}
          >
            {cat.label}
            {active && (
              <span className="absolute right-0 -bottom-px left-0 h-[2px] bg-accent" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
