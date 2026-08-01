import type { Metadata, Viewport } from "next";
import { Open_Sans, Raleway } from "next/font/google";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import LenisWrapper from "@/components/LenisWrapper";
import FloatingActions from "@/components/motion/FloatingActions";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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
  title: `${company.name} | Contractor in Saudi Arabia`,
  description:
    "TIMC is a Saudi Arabian engineering and contracting company established in 2010, specializing in general contracting, civil infrastructure, foundation engineering, energy infrastructure, and integrated heavy equipment rental.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("timc-theme");if(t!=="light"&&t!=="dark")t="dark";var r=document.documentElement;r.dataset.theme=t;r.classList.add(t);r.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${raleway.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <LenisWrapper>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingActions />
          </LenisWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
