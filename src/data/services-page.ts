import { completedProjects, company, ongoingProjects } from "@/lib/company";
import { services } from "@/data/services";

export type StandardBadge = {
  id: string;
  label: string;
};

export const deliveryProcess = [
  {
    id: "consultation",
    number: "01",
    title: "Initial Consultation & Requirements Analysis",
    description:
      "Clarify project goals, site conditions, scope boundaries, and client requirements before technical planning begins.",
  },
  {
    id: "assessment",
    number: "02",
    title: "Engineering Assessment & Planning",
    description:
      "Technical assessment, method planning, and resource definition aligned to quality, safety, and schedule targets.",
  },
  {
    id: "proposal",
    number: "03",
    title: "Proposal & Project Scheduling",
    description:
      "Detailed proposal, commercial alignment, and programme scheduling for mobilisation and delivery milestones.",
  },
  {
    id: "execution",
    number: "04",
    title: "Project Execution & Quality Control",
    description:
      "Supervised construction with quality control, progress tracking, and disciplined site management.",
  },
  {
    id: "handover",
    number: "05",
    title: "Testing, Inspection & Handover",
    description:
      "Testing, inspection, punch-list clearance, documentation, and formal handover to the client.",
  },
  {
    id: "support",
    number: "06",
    title: "Post-Project Support & Long-Term Partnership",
    description:
      "Continued support after handover to protect performance and strengthen long-term client partnerships.",
  },
];

export const standardsWeWorkTo: StandardBadge[] = [
  { id: "iso9001", label: "ISO 9001" },
  { id: "iso14001", label: "ISO 14001" },
  { id: "iso45001", label: "ISO 45001" },
  { id: "saso", label: "SASO / SEC" },
  { id: "aci", label: "ACI 318" },
  { id: "vision", label: "Vision 2030" },
];

export type HeroStat = {
  value: string;
  label: string;
  href?: string;
};

const yearsExperience =
  new Date().getFullYear() - Number(company.established);

/** Shared stats band used on every internal page hero. */
export const siteHeroStats: HeroStat[] = [
  {
    value: String(services.length),
    label: "Core Divisions",
    href: "/services",
  },
  {
    value: String(completedProjects.length),
    label: "Projects Completed",
    href: "/projects/completed",
  },
  {
    value: String(ongoingProjects.length),
    label: "Ongoing Projects",
    href: "/projects/ongoing",
  },
  {
    value: `${yearsExperience}+`,
    label: "Years Experience",
  },
];

/** @deprecated Use siteHeroStats */
export const servicesHeroStats = siteHeroStats;
