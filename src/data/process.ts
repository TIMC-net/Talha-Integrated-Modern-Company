export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "planning",
    number: "01",
    title: "Planning",
    description:
      "Scope review, site assessment, and delivery planning aligned to schedule, HSE, and client specifications.",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description:
      "Engineering coordination, method statements, and constructability reviews before mobilization.",
  },
  {
    id: "execution",
    number: "03",
    title: "Execution",
    description:
      "Supervised construction with progress control, quality checkpoints, and integrated equipment support.",
  },
  {
    id: "deliver",
    number: "04",
    title: "Deliver",
    description:
      "Inspection, punch-list clearance, documentation, and formal handover to the client.",
  },
];
