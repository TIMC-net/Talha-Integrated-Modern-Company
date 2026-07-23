import Image from "next/image";
import Link from "next/link";
import EquipmentCategoriesSidebar from "@/components/EquipmentCategoriesSidebar";
import PageBanner from "@/components/PageBanner";
import MotionCard from "@/components/motion/MotionCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  equipmentCategoryBanner,
  type EquipmentCategoryDetail,
  type EquipmentProduct,
} from "@/lib/equipment";

type EquipmentLayoutProps = {
  bannerTitle?: string;
  breadcrumb: string;
  bannerImage: string;
  sectionTitle: string;
  products: EquipmentProduct[];
};

function ProductCard({ product }: { product: EquipmentProduct }) {
  const body = (
    <>
      <div className="relative flex h-[190px] items-center justify-center overflow-hidden border border-border-soft bg-white p-4">
        <Image
          src={product.image}
          alt={product.title}
          width={280}
          height={190}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <p className="mt-4 text-center font-display text-[13px] font-bold tracking-wide text-ink uppercase transition group-hover:text-accent-dark">
        {product.title}
      </p>
    </>
  );

  const inner = product.href ? (
    <Link href={product.href} className="group block">
      {body}
    </Link>
  ) : (
    <div className="group">{body}</div>
  );

  return <MotionCard>{inner}</MotionCard>;
}

function ProductGrid({
  sectionTitle,
  products,
}: {
  sectionTitle: string;
  products: EquipmentProduct[];
}) {
  return (
    <div>
      <Reveal>
        <span className="section-eyebrow mb-4">Equipment Rental</span>
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
  );
}

export default function EquipmentLayout({
  bannerTitle = "Equipment",
  breadcrumb,
  bannerImage,
  sectionTitle,
  products,
}: EquipmentLayoutProps) {
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
            <EquipmentCategoriesSidebar />
            <ProductGrid sectionTitle={sectionTitle} products={products} />
          </div>
        </div>
      </section>
    </>
  );
}

type EquipmentCategoryLayoutProps = {
  category: EquipmentCategoryDetail;
};

export function EquipmentCategoryLayout({ category }: EquipmentCategoryLayoutProps) {
  return (
    <>
      <PageBanner
        title={category.bannerTitle}
        backgroundImage={equipmentCategoryBanner}
        crumbs={[{ label: "Home", href: "/" }, { label: category.breadcrumb }]}
      />

      <section className="bg-white py-14 md:py-20">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
            <EquipmentCategoriesSidebar activeSlug={category.slug} />
            <ProductGrid sectionTitle={category.sectionTitle} products={category.products} />
          </div>
        </div>
      </section>
    </>
  );
}
