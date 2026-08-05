import { completedProjects } from "@/lib/company";
import { listedProjectImage } from "@/lib/project-media";

export type Project = {
  id: string;
  slug: string;
  title: string;
  service: string;
  location: string;
  imageUrl: string;
  description: string;
  client?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type CompletedSource = {
  title: string;
  client: string;
  scope: string;
  service: string;
};

/**
 * Completed project highlights from TIMC list (100% completed, last 2 years).
 * Used on homepage portfolio carousel and /portfolio pages.
 * Cover images match `/projects/completed` via `completedProjects` + shared fallbacks.
 */
const completedSource: CompletedSource[] = [
  {
    title: "Jeddah Solar Power Project (300 MW)",
    client: "Larsen & Toubro Limited Company",
    scope: "Supply of Equipment and Power Generators",
    service: "energy-infrastructure",
  },
  {
    title: "Al Shuaibah 1 & 2 Solar Power Plant (2,631 MW)",
    client: "Branch of Hyundai Engineering & Contracting Co.",
    scope: "Supply of Equipment and Power Generators",
    service: "energy-infrastructure",
  },
  {
    title: "THE LINE – Civil & Infrastructure Works (NEOM)",
    client: "ABACUS International Co",
    scope: "Supply of Equipment and Power Generators",
    service: "equipment-rental",
  },
  {
    title: "NEOM Al Khuraybah Infrastructure Development",
    client: "Gheed Najd Contracting Est",
    scope: "Supply of Equipment and Power Generators",
    service: "civil-infrastructure",
  },
  {
    title: "Sindalah Island Backbone Infrastructure",
    client: "Desert Eagle Contracting Co",
    scope: "Supply of Heavy Equipment",
    service: "equipment-rental",
  },
  {
    title: "Majma Housing Project – Residential Infrastructure",
    client: "Katerra Saudi Arabia Contracting Co",
    scope: "Supply of Power Generators",
    service: "civil-infrastructure",
  },
  {
    title: "Water Treatment System (WTS) Plant Projects",
    client: "Memar Monif Contracting Est",
    scope: "Supply of Heavy Equipment",
    service: "equipment-rental",
  },
  {
    title: "THE LINE – Civil & Infrastructure Works (NEOM)",
    client: "Prestige Rental Equipements CO",
    scope: "Supply of Heavy Equipment",
    service: "equipment-rental",
  },
  {
    title: "SANY Alameriah Precast Concrete Factory – Jeddah Industrial City 3",
    client: "SANY Alameriah for Contracting Co",
    scope: "Supply of Equipment and Power Generators",
    service: "equipment-rental",
  },
  {
    title: "Jabal Omar Development Project – Makkah",
    client: "Tahadi Lifter For Contracting Est",
    scope: "Supply of Equipment and Power Generators",
    service: "civil-infrastructure",
  },
  {
    title: "Rabigh 2 Independent Power Plant (Rabigh 2 IPP)",
    client: "Taj Noori Contracting Est",
    scope: "Supply of Heavy Equipment",
    service: "energy-infrastructure",
  },
  {
    title: "Sindalah Island Development – Infrastructure Works",
    client: "Ahmed Muhammad Al Mkhavi",
    scope: "Supply of Heavy Equipment",
    service: "civil-infrastructure",
  },
  {
    title: "Al Shuaibah 1 & 2 Solar PV Independent Power Plant (IPP)",
    client: "Tran Ji Trading and Contracting Company",
    scope: "Supply of Equipment and Power Generators",
    service: "energy-infrastructure",
  },
  {
    title: "Reinforcement of Rabigh Power Plant — 1.2GW SCC6-5000F 3+1",
    client: "ELSEWEDY Electric Power Systems Projects",
    scope: "Supply of Equipment and Power Generators",
    service: "energy-infrastructure",
  },
];

/** Completed project highlights for homepage portfolio + /portfolio */
export const projects: Project[] = completedSource.map((item, index) => {
  // Unique slug when two entries share a project name (e.g. THE LINE)
  const slugBase = slugify(item.title);
  const slug =
    completedSource.filter((p) => slugify(p.title) === slugBase).length > 1
      ? `${slugBase}-${slugify(item.client).slice(0, 24)}`
      : slugBase;

  const listed = completedProjects[index];

  return {
    id: `completed-${index + 1}`,
    slug,
    title: item.title,
    service: item.service,
    location: listed?.location ?? "KSA",
    imageUrl: listedProjectImage(listed ?? {}, index),
    description: item.scope,
    client: item.client,
  };
});
