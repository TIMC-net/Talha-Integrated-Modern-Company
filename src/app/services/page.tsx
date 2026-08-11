import type { Metadata } from "next";
import ServicesPageContent from "@/components/sections/ServicesPageContent";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: `Our Services | ${company.shortName}`,
  description:
    "TIMC contractor services: Equipment Rental, Civil Infrastructure, Foundation Engineering, and Energy Infrastructure.",
};

export default function ServicesIndexPage() {
  return <ServicesPageContent />;
}
