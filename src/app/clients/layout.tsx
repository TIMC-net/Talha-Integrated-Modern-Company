import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Clients",
  description:
    "TIMC clients and partners across contracting, engineering, and energy programmes in Jeddah and Saudi Arabia — organisations that rely on disciplined site delivery.",
  path: "/clients",
  keywords: [
    "TIMC clients",
    "TIMC partners Saudi Arabia",
    "Jeddah contractor partners",
  ],
});

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
