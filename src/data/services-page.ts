export type CapabilityPillar = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type StandardBadge = {
  id: string;
  label: string;
};

export const deliveryProcess = [
  {
    id: "enquiry",
    number: "01",
    title: "Enquiry & Assessment",
    description:
      "Site visit, scope review, technical clarifications, and detailed cost estimation.",
  },
  {
    id: "engineering",
    number: "02",
    title: "Engineering & Planning",
    description:
      "Design coordination, method statements, ITP preparation, and procurement planning.",
  },
  {
    id: "mobilisation",
    number: "03",
    title: "Mobilisation",
    description:
      "Site establishment, material and equipment delivery, HSE inductions, and crew deployment.",
  },
  {
    id: "execution",
    number: "04",
    title: "Execution & QC",
    description:
      "Supervised construction with daily inspection, NCR management, and progress reporting.",
  },
  {
    id: "handover",
    number: "05",
    title: "Testing & Handover",
    description:
      "Inspection, punch-list clearance, documentation packs, and formal client acceptance.",
  },
];

export const underOneRoof: CapabilityPillar[] = [
  {
    id: "hse",
    number: "01",
    title: "HSE Management",
    description:
      "Dedicated HSE focus on every project with risk assessments, permit-to-work discipline, and incident reporting aligned to ISO 45001 principles.",
  },
  {
    id: "ksa",
    number: "02",
    title: "Kingdom-Wide Delivery",
    description:
      "Contractor operations across Saudi Arabia with local mobilisation capability for industrial and infrastructure programmes.",
  },
  {
    id: "quality",
    number: "03",
    title: "ISO-Aligned Quality",
    description:
      "Documented quality processes covering inspection, non-conformance control, and continual improvement.",
  },
  {
    id: "fleet",
    number: "04",
    title: "Integrated Equipment",
    description:
      "In-house equipment support that keeps civil, foundation and energy packages moving without third-party delays.",
  },
  {
    id: "workforce",
    number: "05",
    title: "Skilled Workforce",
    description:
      "Experienced supervisors, engineers and trades aligned to industrial and infrastructure project requirements.",
  },
  {
    id: "reporting",
    number: "06",
    title: "Project Reporting",
    description:
      "Progress reporting, photographic records and programme tracking for clear client visibility.",
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

export const servicesHeroStats = [
  { value: "4+", label: "Core Divisions" },
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Years Experience" },
  { value: "KSA", label: "Kingdom Focus" },
];
