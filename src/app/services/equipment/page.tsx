import EquipmentLayout from "@/components/EquipmentLayout";
import { equipmentProducts } from "@/lib/equipment";
import { servicesContent } from "@/lib/company";

export default function EquipmentPage() {
  const s = servicesContent.equipment;

  return (
    <EquipmentLayout
      bannerTitle={s.bannerTitle}
      breadcrumb={s.breadcrumb}
      bannerImage={s.bannerImage!}
      sectionTitle={s.title}
      products={equipmentProducts}
    />
  );
}
