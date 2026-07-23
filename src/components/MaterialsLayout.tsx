"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import MaterialCategoriesSidebar from "@/components/MaterialCategoriesSidebar";
import PageBanner from "@/components/PageBanner";
import ImageFocusZoom from "@/components/motion/ImageFocusZoom";
import MotionCard from "@/components/motion/MotionCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { materialCategoryBanner, type MaterialCategoryDetail } from "@/lib/materials";

export type MaterialProduct = {
  title: string;
  image: string;
  href?: string;
  focus?: string;
};

type MaterialsLayoutProps = {
  bannerTitle?: string;
  breadcrumb: string;
  bannerImage: string;
  sectionTitle: string;
  products: MaterialProduct[];
};

function ProductCard({ product }: { product: MaterialProduct }) {
  return (
    <MotionCard>
      <div className="group">
        <div className="relative h-[190px] overflow-hidden border border-border-soft bg-white">
          <ImageFocusZoom
            src={product.image}
            alt={product.title}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
          />
        </div>

        {product.href ? (
          <Link href={product.href} className="mt-4 block text-center">
            <span className="font-display text-[13px] font-bold tracking-wide text-ink uppercase transition hover:text-accent-dark">
              {product.title}
            </span>
          </Link>
        ) : (
          <p className="mt-4 text-center font-display text-[13px] font-bold tracking-wide text-ink uppercase">
            {product.title}
          </p>
        )}
      </div>
    </MotionCard>
  );
}

export default function MaterialsLayout({
  bannerTitle = "Materials",
  breadcrumb,
  bannerImage,
  sectionTitle,
  products,
}: MaterialsLayoutProps) {
  return (
    <>
      <PageBanner
        title={bannerTitle}
        backgroundImage={bannerImage}
        crumbs={[{ label: "Home", href: "/" }, { label: breadcrumb }]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
            <MaterialCategoriesSidebar />

            <div>
              <Reveal>
                <span className="section-eyebrow mb-4">Materials Supply</span>
                <h2 className="section-heading mb-10 text-2xl md:text-[28px]">{sectionTitle}</h2>
              </Reveal>

              <RevealGroup className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <RevealItem key={product.title}>
                    <ProductCard product={product} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type MaterialCategoryLayoutProps = {
  category: MaterialCategoryDetail;
};

export function MaterialCategoryLayout({ category }: MaterialCategoryLayoutProps) {
  const midpoint = Math.ceil(category.listItems.length / 2);
  const listColumns = [
    category.listItems.slice(0, midpoint),
    category.listItems.slice(midpoint),
  ];

  return (
    <>
      <PageBanner
        title={category.bannerTitle}
        backgroundImage={materialCategoryBanner}
        crumbs={[{ label: "Home", href: "/" }, { label: category.breadcrumb }]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
            <MaterialCategoriesSidebar activeSlug={category.slug} />

            <div>
              <Reveal>
                <span className="section-eyebrow mb-4">Materials Supply</span>
                <h2 className="section-heading mb-8 text-2xl md:text-[28px]">
                  {category.sectionTitle}
                </h2>
              </Reveal>

              {category.body.length > 0 && (
                <Reveal delay={0.08} className="mb-10 space-y-4 text-[14px] leading-[1.85] text-slate">
                  {category.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </Reveal>
              )}

              {category.listItems.length > 0 && (
                <Reveal delay={0.12} className="mb-14 grid gap-x-10 gap-y-2.5 md:grid-cols-2">
                  {listColumns.map((column, columnIndex) => (
                    <ul key={columnIndex} className="space-y-2.5">
                      {column.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[14px] text-slate">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ))}
                </Reveal>
              )}

              {category.gallery.length > 0 && (
                <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {category.gallery.map((image) => (
                    <RevealItem key={image}>
                      <MotionCard className="relative h-[190px] overflow-hidden border border-border-soft bg-white">
                        <ImageFocusZoom
                          src={image}
                          alt={category.sectionTitle}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 220px"
                        />
                      </MotionCard>
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
