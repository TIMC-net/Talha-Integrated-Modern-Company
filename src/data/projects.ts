export type Project = {
  id: string;
  slug: string;
  title: string;
  service: string;
  location: string;
  imageUrl: string;
  description: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Demo stock images — real project photography pending from TIMC */
const demoImages = [
  "/images/civil-construction.jpg",
  "/images/header-contracting.jpg",
  "/images/header-scaffolding.jpg",
  "/images/hero-equipment.jpg",
  "/images/hero-civil.jpg",
  "/images/header-scrap.jpg",
];

/** Completed project highlights for homepage portfolio + /portfolio */
export const projects: Project[] = [
  {
    id: "completed-1",
    slug: slugify("Steam Header Project"),
    title: "Steam Header Project",
    service: "energy-infrastructure",
    location: "Jubail – 1, KSA",
    imageUrl: demoImages[0],
    description: "Detailed Engineering",
  },
  {
    id: "completed-2",
    slug: slugify("Repair & Installation of Access Beam"),
    title: "Repair & Installation of Access Beam",
    service: "foundation-engineering",
    location: "Jubail – 1, KSA",
    imageUrl: demoImages[1],
    description: "Structural Works",
  },
  {
    id: "completed-3",
    slug: slugify("Turnaround Major Maintenance"),
    title: "Turnaround Major Maintenance",
    service: "energy-infrastructure",
    location: "Jubail – 1, KSA",
    imageUrl: demoImages[2],
    description: "Civil / Piping / Mechanical Works",
  },
  {
    id: "completed-4",
    slug: slugify("Raw Water Line – Re-routing Works"),
    title: "Raw Water Line – Re-routing Works",
    service: "civil-infrastructure",
    location: "Dhahran, KSA",
    imageUrl: demoImages[3],
    description: "Civil & Piping",
  },
  {
    id: "completed-5",
    slug: slugify("Road & Repair Works"),
    title: "Road & Repair Works",
    service: "civil-infrastructure",
    location: "Jubail Port, KSA",
    imageUrl: demoImages[4],
    description: "Civil & Asphalt",
  },
  {
    id: "completed-6",
    slug: slugify("Desalination Project – Walls & Ceilings"),
    title: "Desalination Project – Walls & Ceilings",
    service: "civil-infrastructure",
    location: "Al Khobar, KSA",
    imageUrl: demoImages[5],
    description: "Civil Construction",
  },
];
