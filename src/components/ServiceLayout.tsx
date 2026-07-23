import { Check } from "lucide-react";
import type { ReactNode } from "react";
import PageBanner from "@/components/PageBanner";
import HoverZoomImage from "@/components/motion/HoverZoomImage";
import { Reveal } from "@/components/motion/Reveal";

type ServicePageProps = {
  title: string;
  breadcrumb: string;
  bannerImage?: string;
  image?: string;
  imageAlt?: string;
  listItems?: string[];
  children: ReactNode;
  sidebar?: ReactNode;
};

export default function ServiceLayout({
  title,
  breadcrumb,
  bannerImage,
  image,
  imageAlt,
  listItems,
  children,
  sidebar,
}: ServicePageProps) {
  return (
    <>
      <PageBanner
        title="Services"
        backgroundImage={bannerImage}
        crumbs={[{ label: "Home", href: "/" }, { label: breadcrumb }]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-site">
          {image ? (
            <div
              className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-12 ${
                sidebar ? "lg:grid-cols-[1fr_1fr_280px]" : ""
              }`}
            >
              <Reveal>
                <HoverZoomImage
                  src={image}
                  alt={imageAlt ?? title}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Reveal>

              <Reveal delay={0.1}>
                <span className="section-eyebrow mb-4">Our Expertise</span>
                <h1 className="section-heading mb-6 text-2xl md:text-[28px]">{title}</h1>
                <div className="space-y-4 text-[14px] leading-[1.85] text-slate">
                  {children}
                  {listItems && listItems.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {listItems.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-slate">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>

              {sidebar}
            </div>
          ) : (
            <div className={`grid gap-10 ${sidebar ? "lg:grid-cols-[1fr_280px]" : ""}`}>
              <Reveal>
                <span className="section-eyebrow mb-4">Our Expertise</span>
                <h1 className="section-heading mb-6 text-2xl md:text-[28px]">{title}</h1>
                <div className="space-y-4 text-[14px] leading-[1.85] text-slate">
                  {children}
                  {listItems && listItems.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {listItems.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-slate">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
              {sidebar}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function CategorySidebar({ title, items }: { title: string; items: string[] }) {
  return (
    <aside>
      <div className="border border-border-soft">
        <div className="bg-ink px-5 py-4 font-display text-[13px] font-bold tracking-wide text-white uppercase">
          {title}
        </div>
        <ul>
          {items.map((item) => (
            <li key={item} className="border-t border-border-soft">
              <span className="block cursor-default px-5 py-3.5 text-[13px] text-slate transition hover:bg-accent hover:text-white">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
