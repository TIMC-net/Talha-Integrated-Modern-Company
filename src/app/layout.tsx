import type { Metadata, Viewport } from "next";
import { Open_Sans, Raleway } from "next/font/google";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import LenisWrapper from "@/components/LenisWrapper";
import FloatingActions from "@/components/motion/FloatingActions";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { company } from "@/lib/company";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_KEYWORDS,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${company.shortName}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: company.shortName,
  keywords: SITE_KEYWORDS,
  authors: [{ name: company.name, url: SITE_URL }],
  creator: company.name,
  publisher: company.name,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_SA",
    url: SITE_URL,
    siteName: company.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${company.shortName} — Contractor in Saudi Arabia`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
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
        <OrganizationJsonLd />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <GoogleAnalytics />
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
