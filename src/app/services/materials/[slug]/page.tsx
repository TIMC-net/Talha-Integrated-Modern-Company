import { notFound } from "next/navigation";
import { MaterialCategoryLayout } from "@/components/MaterialsLayout";
import {
  getMaterialCategory,
  getMaterialCategorySlugs,
} from "@/lib/materials";

type MaterialCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getMaterialCategorySlugs().map((slug) => ({ slug }));
}

export default async function MaterialCategoryPage({
  params,
}: MaterialCategoryPageProps) {
  const { slug } = await params;
  const category = getMaterialCategory(slug);

  if (!category) {
    notFound();
  }

  return <MaterialCategoryLayout category={category} />;
}
