import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { ongoingProjects } from "@/lib/company";
import { SITE_URL } from "@/lib/seo";

/** Stable lastmod dates so sitemap doesn't stamp every URL with "now". */
const SITE_LASTMOD = new Date("2026-08-20T12:00:00.000Z");
const SERVICES_LASTMOD = new Date("2026-08-20T12:00:00.000Z");
const PORTFOLIO_LASTMOD = new Date("2026-08-18T12:00:00.000Z");
const PROJECTS_LASTMOD = new Date("2026-08-18T12:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", changeFrequency: "weekly" as const, priority: 1, lastModified: SITE_LASTMOD },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7, lastModified: SITE_LASTMOD },
    { path: "/services", changeFrequency: "weekly" as const, priority: 0.9, lastModified: SERVICES_LASTMOD },
    { path: "/projects/ongoing", changeFrequency: "weekly" as const, priority: 0.7, lastModified: PROJECTS_LASTMOD },
    { path: "/projects/completed", changeFrequency: "monthly" as const, priority: 0.7, lastModified: PROJECTS_LASTMOD },
    { path: "/portfolio", changeFrequency: "monthly" as const, priority: 0.7, lastModified: PORTFOLIO_LASTMOD },
    { path: "/clients", changeFrequency: "monthly" as const, priority: 0.7, lastModified: SITE_LASTMOD },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.9, lastModified: SITE_LASTMOD },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3, lastModified: SITE_LASTMOD },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3, lastModified: SITE_LASTMOD },
  ].map(({ path, changeFrequency, priority, lastModified }) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: SERVICES_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: PORTFOLIO_LASTMOD,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const ongoingRoutes: MetadataRoute.Sitemap = ongoingProjects
    .filter((project) => project.details)
    .map((project) => ({
      url: `${SITE_URL}/projects/ongoing/${project.no}`,
      lastModified: PROJECTS_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...ongoingRoutes];
}
