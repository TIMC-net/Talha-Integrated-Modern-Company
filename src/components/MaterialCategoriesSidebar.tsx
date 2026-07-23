import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { materialCategoryNav } from "@/lib/materials";

type MaterialCategoriesSidebarProps = {
  activeSlug?: string;
};

export default function MaterialCategoriesSidebar({
  activeSlug,
}: MaterialCategoriesSidebarProps) {
  return (
    <aside className="shrink-0">
      <h3 className="mb-6 border-b border-border-soft pb-4 font-display text-[14px] font-bold tracking-wide text-ink uppercase">
        Categories
      </h3>
      <ul>
        {materialCategoryNav.map((cat) => {
          const isActive = cat.slug === activeSlug;

          return (
            <li key={cat.slug}>
              {isActive ? (
                <span className="flex items-center gap-2 py-2.5 text-[13px] font-semibold text-accent-dark">
                  <ChevronRight className="h-3.5 w-3.5" />
                  {cat.label}
                </span>
              ) : (
                <Link
                  href={cat.href}
                  className="group flex items-center gap-2 py-2.5 text-[13px] text-slate transition hover:text-accent-dark"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-muted transition group-hover:text-accent" />
                  {cat.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
