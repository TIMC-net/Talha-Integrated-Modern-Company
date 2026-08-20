import type { Metadata } from "next";
import PortfolioPageContent from "@/components/sections/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected TIMC contractor projects across civil infrastructure, foundations, energy, and equipment support.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
