export type FleetItem = {
  id: string;
  name: string;
  /** Short capability summary shown on the card */
  specs: string;
  /** Optional highlights (tonnage, typical use) */
  notes?: string;
  image?: string;
};

export type FleetCategory = {
  id: string;
  name: string;
  description: string;
  items: FleetItem[];
};

/**
 * TIMC equipment rental fleet — aligned to contractor support packages
 * for civil, foundation, energy, and industrial packages across KSA.
 */
export const fleetCategories: FleetCategory[] = [
  {
    id: "earth-moving",
    name: "Earth Moving",
    description:
      "Excavators, loaders, and site-preparation machines for civil infrastructure, pads, trenches, and industrial compound works.",
    items: [
      {
        id: "em-1",
        name: "Excavator Class",
        specs:
          "Hydraulic excavators for bulk dig, trench works, structure foundations, and utility corridors — dry and normal soil packages.",
        notes: "Typical support: civil roads, substation pads, plant civil",
        image: "/images/equipment/categories/earth-moving/excavator-class-v1.jpg",
      },
      {
        id: "em-2",
        name: "Wheel Loader Class",
        specs:
          "Wheel loaders and articulated handling for stockpile management, backfill, material transfer, and site logistics support.",
        notes: "Paired with dump trucks and compaction for full site cycles",
        image: "/images/equipment/categories/earth-moving/wheel-loader-class-v1.jpg",
      },
    ],
  },
  {
    id: "lifting",
    name: "Lifting & Cranes",
    description:
      "Mobile and crawler crane support for erection, heavy lifts, plant installs, and multi-storey civil packages.",
    items: [
      {
        id: "lc-1",
        name: "Mobile Crane Class",
        specs:
          "Truck-mounted and all-terrain mobile cranes for rapid mobilisation, equipment placement, and general site lifts.",
        notes: "Ideal for industrial sites and staged infrastructure works",
        image: "/images/services/equipment-rental/06-v1.jpg",
      },
      {
        id: "lc-2",
        name: "Crawler Crane Class",
        specs:
          "Crawler cranes for sustained heavy lifts, structural erection, and high-capacity plant and tower packages.",
        notes: "Stable duty cycles for long-duration critical lifts",
        image:
          "/images/equipment/categories/cranes/crawler-crane-class-v2.jpg",
      },
    ],
  },
  {
    id: "material-handling",
    name: "Material Handling",
    description:
      "Industrial and rough-terrain forklifts for warehouse yards, storage compounds, and laydown logistics on TIMC-supported sites.",
    items: [
      {
        id: "mh-1",
        name: "Industrial Forklift Class",
        specs:
          "Heavy-duty sit-down forklifts (e.g. Doosan-class) for containerised loads, palletised materials, and yard stacking.",
        notes: "Yard logistics for materials, generators, and site stores",
        image:
          "/images/equipment/categories/material-handling/industrial-forklift-class-v2.jpg",
      },
      {
        id: "mh-2",
        name: "Counterbalance Forklift Line",
        specs:
          "Mixed counterbalance forklift fleet for multi-capacity material handling across industrial lots and storage walls.",
        notes: "Scalable units for concurrent warehouse and outdoor use",
        image:
          "/images/equipment/categories/material-handling/counterbalance-forklift-line-v2.jpg",
      },
    ],
  },
  {
    id: "power",
    name: "Power Generation",
    description:
      "Temporary power packages for remote locations, brownfield plants, shutdowns, and early-works camps.",
    items: [
      {
        id: "pg-1",
        name: "Generator Sets",
        specs:
          "Diesel generator sets for construction power, lighting packages, and temporary plant support.",
        notes: "Aligned with energy and industrial project demands",
        image: "/images/equipment/categories/power-generation/generator-sets-v1.jpg",
      },
      {
        id: "pg-2",
        name: "High-Capacity Power Packages",
        specs:
          "Larger mega-set packages for peak demand, multi-zone sites, and continuous-duty temporary power.",
        notes: "Supports energy infrastructure and major civil camps",
        image:
          "/images/equipment/categories/power-generation/high-capacity-power-v1.jpg",
      },
    ],
  },
  {
    id: "compaction",
    name: "Compaction & Paving Support",
    description:
      "Rollers and compactors for roads, structure pads, access routes, and hardstanding packages.",
    items: [
      {
        id: "cp-1",
        name: "Ride-On Roller / Compactor Class",
        specs:
          "Ride-on rollers for layer compaction on access roads, subgrades, and pad preparation.",
        notes: "Used with civil infrastructure delivery packages",
        image:
          "/images/equipment/categories/compaction-paving/ride-on-roller-pro-v1.jpg",
      },
      {
        id: "cp-2",
        name: "Plate Compactors & Hand Units",
        specs:
          "Plate compactors, walk-behind rollers, and hand units for trenches, edges, and confined areas.",
        notes: "Finishing support for utilities and pad works",
        image:
          "/images/equipment/categories/compaction-paving/plate-compactors-pro-v2.jpg",
      },
    ],
  },
];
