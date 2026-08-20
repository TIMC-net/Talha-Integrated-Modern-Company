import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Clients",
  description:
    "Official TIMC partners across contracting, engineering, and energy programmes in Saudi Arabia — organisations that rely on disciplined site delivery.",
  path: "/clients",
});

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
