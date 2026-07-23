import MaterialsLayout from "@/components/MaterialsLayout";
import {
  materialProducts,
  servicesContent,
} from "@/lib/company";

export default function MaterialsPage() {
  const s = servicesContent.materials;

  return (
    <MaterialsLayout
      bannerTitle={s.bannerTitle}
      breadcrumb={s.breadcrumb}
      bannerImage={s.bannerImage!}
      sectionTitle={s.title}
      products={materialProducts}
    />
  );
}
