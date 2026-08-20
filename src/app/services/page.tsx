import type { Metadata } from "next";
import ServicesPageContent from "@/components/sections/ServicesPageContent";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "TIMC contractor services: Equipment Rental, Civil Infrastructure, Foundation Engineering, and Energy Infrastructure.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return <ServicesPageContent />;
}
