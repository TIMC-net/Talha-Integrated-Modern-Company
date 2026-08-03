import {
  company,
  completedProjects,
  ongoingProjects,
} from "@/lib/company";
import { vendors } from "@/data/vendors";

export type Stat = {
  id: string;
  value: number;
  label: string;
  suffix: string;
  icon: "Briefcase" | "HardHat" | "Building2" | "Award";
  color: string;
  href?: string;
};

const yearsExperience =
  new Date().getFullYear() - Number(company.established);

export const stats: Stat[] = [
  {
    id: "completed",
    value: completedProjects.length,
    label: "Completed Projects",
    suffix: "",
    icon: "Briefcase",
    color: "#FF6B35",
    href: "/projects/completed",
  },
  {
    id: "ongoing",
    value: ongoingProjects.length,
    label: "Ongoing Projects",
    suffix: "",
    icon: "HardHat",
    color: "#FF8F66",
    href: "/projects/ongoing",
  },
  {
    id: "vendors",
    value: vendors.length,
    label: "Vendors",
    suffix: "",
    icon: "Building2",
    color: "#E85A24",
    href: "/about#vendors",
  },
  {
    id: "years",
    value: yearsExperience,
    label: "Years Experience",
    suffix: "+",
    icon: "Award",
    color: "#FF6B35",
  },
];
