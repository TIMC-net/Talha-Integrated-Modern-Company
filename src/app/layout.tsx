import type { Metadata } from "next";
import { Open_Sans, Raleway } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/motion/FloatingActions";
import { company } from "@/lib/company";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${company.name} | Saudi Arabia`,
  description:
    "Equipment rental, scaffolding, civil works, mechanical erection, materials supply and manpower services in Kingdom of Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${raleway.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
