export type Stat = {
  id: string;
  value: number;
  label: string;
  suffix: string;
  icon: "Briefcase" | "Heart" | "Users" | "Award";
  color: string;
};

export const stats: Stat[] = [
  {
    id: "projects",
    value: 500,
    label: "Completed Projects",
    suffix: "+",
    icon: "Briefcase",
    color: "#FF6B35",
  },
  {
    id: "satisfaction",
    value: 98,
    label: "Client Satisfaction",
    suffix: "%",
    icon: "Heart",
    color: "#FF8F66",
  },
  {
    id: "team",
    value: 50,
    label: "Team Members",
    suffix: "+",
    icon: "Users",
    color: "#E85A24",
  },
  {
    id: "years",
    value: 15,
    label: "Years Experience",
    suffix: "+",
    icon: "Award",
    color: "#FF6B35",
  },
];
