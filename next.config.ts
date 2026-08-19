import type { NextConfig } from "next";
import { LEGACY_EXACT_REDIRECTS } from "./src/lib/legacyRedirects";

const nextConfig: NextConfig = {
  images: {
    // Prefer modern formats; long TTL for optimized binaries on CDN
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Match card/hero `sizes` so optimizer doesn't over-serve 3840w assets
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/company-profile.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="TIMC-Company-Profile.pdf"',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      ...LEGACY_EXACT_REDIRECTS.map((item) => ({
        source: item.source,
        destination: item.destination,
        permanent: true as const,
      })),
      {
        source: "/services/scaffolding",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/manpower",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/civil",
        destination: "/services/civil-infrastructure",
        permanent: true,
      },
      {
        source: "/services/mechanical",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/materials",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/materials/:slug",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/equipment",
        destination: "/services/equipment-rental",
        permanent: true,
      },
      {
        source: "/services/equipment/:slug",
        destination: "/services/equipment-rental",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
