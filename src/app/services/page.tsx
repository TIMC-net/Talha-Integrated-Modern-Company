import type { Metadata } from "next";
import ServicesPageContent from "@/components/sections/ServicesPageContent";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: `Our Services | ${company.shortName}`,
  description:
    "TIMC contractor services: Civil Infrastructure, Foundation Engineering, Energy Infrastructure, and integrated Equipment Rental.",
};

export default function ServicesIndexPage() {
  return <ServicesPageContent />;
}
