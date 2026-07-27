export type FleetItem = {
  id: string;
  name: string;
  /** Spec line — replace with TIMC equipment specifications */
  specs: string;
  /** Optional image under /public — leave empty until TIMC provides photos */
  image?: string;
};

export type FleetCategory = {
  id: string;
  name: string;
  description: string;
  items: FleetItem[];
};

/** Fleet shell ready for TIMC categories, specs, and images */
export const fleetCategories: FleetCategory[] = [
  {
    id: "earth-moving",
    name: "Earth Moving",
    description:
      "Excavators, loaders, and site preparation equipment for civil and industrial works.",
    items: [
      {
        id: "em-1",
        name: "Excavator Class",
        specs: "Specifications pending from TIMC",
        image: "/images/hero-equipment.jpg",
      },
      {
        id: "em-2",
        name: "Wheel Loader Class",
        specs: "Specifications pending from TIMC",
        image: "/images/header-scrap.jpg",
      },
    ],
  },
  {
    id: "lifting",
    name: "Lifting & Cranes",
    description:
      "Mobile and crawler crane support for erection, heavy lifts, and plant works.",
    items: [
      {
        id: "lc-1",
        name: "Mobile Crane Class",
        specs: "Specifications pending from TIMC",
        image: "/images/header-contracting.jpg",
      },
      {
        id: "lc-2",
        name: "Crawler Crane Class",
        specs: "Specifications pending from TIMC",
      },
    ],
  },
  {
    id: "power",
    name: "Power Generation",
    description:
      "Temporary power packages for remote, brownfield, and shutdown sites.",
    items: [
      {
        id: "pg-1",
        name: "Generator Sets",
        specs: "Specifications pending from TIMC",
        image: "/images/civil-construction.jpg",
      },
    ],
  },
  {
    id: "compaction",
    name: "Compaction & Paving",
    description:
      "Rollers, compactors, and paving support for roads, pads, and hardstanding.",
    items: [
      {
        id: "cp-1",
        name: "Compactor / Roller Class",
        specs: "Specifications pending from TIMC",
        image: "/images/header-scaffolding.jpg",
      },
    ],
  },
];
