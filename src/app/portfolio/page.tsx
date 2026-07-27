import type { Metadata } from "next";
import PortfolioPageContent from "@/components/sections/PortfolioPageContent";

export const metadata: Metadata = {
  title: "Portfolio | TIMC",
  description:
    "Selected TIMC contractor projects across civil infrastructure, foundations, energy, and equipment support.",
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
