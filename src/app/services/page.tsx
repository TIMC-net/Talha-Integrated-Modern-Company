import type { Metadata } from "next";
import ServicesPageContent from "@/components/sections/ServicesPageContent";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "TIMC services in Jeddah & Saudi Arabia: heavy equipment rental, civil infrastructure, foundation engineering, and energy infrastructure contracting.",
  keywords: [
    "TIMC services",
    "equipment rental Jeddah",
    "civil infrastructure contractor",
    "foundation engineering Saudi Arabia",
    "energy infrastructure TIMC",
  ],
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return <ServicesPageContent />;
}
