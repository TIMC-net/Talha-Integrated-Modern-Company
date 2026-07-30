export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "consultation",
    number: "01",
    title: "Consultation",
    description:
      "Initial consultation and requirements analysis to clarify scope, constraints, and project goals.",
  },
  {
    id: "assessment",
    number: "02",
    title: "Assessment",
    description:
      "Engineering assessment and planning to define technical approach, resources, and delivery method.",
  },
  {
    id: "proposal",
    number: "03",
    title: "Proposal",
    description:
      "Proposal and project scheduling with clear timelines, commercial terms, and mobilisation plan.",
  },
  {
    id: "execution",
    number: "04",
    title: "Execution",
    description:
      "Project execution and quality control with supervised works, inspection, and progress reporting.",
  },
  {
    id: "handover",
    number: "05",
    title: "Handover",
    description:
      "Testing, inspection, and handover with documentation packs and formal client acceptance.",
  },
  {
    id: "support",
    number: "06",
    title: "Support",
    description:
      "Post-project support and long-term partnership after completion.",
  },
];
