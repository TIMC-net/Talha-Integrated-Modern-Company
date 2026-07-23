import { notFound } from "next/navigation";
import { EquipmentCategoryLayout } from "@/components/EquipmentLayout";
import {
  getEquipmentCategory,
  getEquipmentCategorySlugs,
} from "@/lib/equipment";

type EquipmentCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getEquipmentCategorySlugs().map((slug) => ({ slug }));
}

export default async function EquipmentCategoryPage({
  params,
}: EquipmentCategoryPageProps) {
  const { slug } = await params;
  const category = getEquipmentCategory(slug);

  if (!category) {
    notFound();
  }

  return <EquipmentCategoryLayout category={category} />;
}
