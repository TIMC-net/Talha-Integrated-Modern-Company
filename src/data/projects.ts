export type Project = {
  id: string;
  slug: string;
  title: string;
  service: string;
  location: string;
  imageUrl: string;
  description: string;
};

// Dummy placeholder projects — real photography/videos to follow.
export const projects: Project[] = [
  {
    id: "project-1",
    slug: "highway-expansion-project",
    title: "Highway Expansion Project",
    service: "civil-infrastructure",
    location: "Jubail, KSA",
    imageUrl: "/images/civil-construction.jpg",
    description: "Multi-phase highway widening and drainage upgrade.",
  },
  {
    id: "project-2",
    slug: "industrial-tower-foundations",
    title: "Industrial Tower Foundations",
    service: "foundation-engineering",
    location: "Dammam, KSA",
    imageUrl: "/images/header-contracting.jpg",
    description: "Deep pile foundation system for a petrochemical tower.",
  },
  {
    id: "project-3",
    slug: "regional-substation-buildout",
    title: "Regional Substation Buildout",
    service: "energy-infrastructure",
    location: "Riyadh, KSA",
    imageUrl: "/images/header-scaffolding.jpg",
    description: "Substation construction and transmission line tie-in.",
  },
  {
    id: "project-4",
    slug: "fleet-support-jubail-industrial",
    title: "Fleet Support — Jubail Industrial",
    service: "equipment-rental",
    location: "Jubail, KSA",
    imageUrl: "/images/header-scrap.jpg",
    description: "Integrated heavy-equipment support across three sites.",
  },
  {
    id: "project-5",
    slug: "bridge-rehabilitation-eastern-province",
    title: "Bridge Rehabilitation",
    service: "civil-infrastructure",
    location: "Eastern Province, KSA",
    imageUrl: "/images/civil-construction.jpg",
    description: "Structural rehabilitation of a regional highway bridge.",
  },
  {
    id: "project-6",
    slug: "renewable-energy-site-prep",
    title: "Renewable Energy Site Prep",
    service: "energy-infrastructure",
    location: "Al Khobar, KSA",
    imageUrl: "/images/header-contracting.jpg",
    description: "Civil works and grid interconnection for a solar project.",
  },
];
