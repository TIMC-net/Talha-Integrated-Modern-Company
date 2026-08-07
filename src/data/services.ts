export type ServiceCategory = "integrated" | "contractor";

export type SubService = {
  title: string;
  description: string;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  icon: "Truck" | "Building2" | "Hammer" | "Zap";
  color: string;
  category: ServiceCategory;
  /** Primary / cover frame (cards, hero fallback). */
  image: string;
  /** Full division gallery — first frame should usually match `image`. */
  images?: string[];
  highlights: string[];
  capabilities: string[];
  subServices: SubService[];
  industries: string[];
};

/** Resolve gallery frames: prefer `images`, fall back to `image` cover. */
export function serviceGalleryFrames(service: Pick<Service, "image" | "images">): string[] {
  if (service.images && service.images.length > 0) {
    return service.images;
  }
  return service.image ? [service.image] : [];
}

// Four equal divisions — Equipment Rental is one integrated offering
// alongside the three core contractor disciplines, not the lead service.
export const services: Service[] = [
  {
    id: "civil-infrastructure",
    slug: "civil-infrastructure",
    name: "Civil Infrastructure",
    tagline: "Roads, Highways, Bridges & Infrastructure",
    description: "Roads, highways, bridges, and infrastructure projects.",
    fullDescription:
      "TIMC specializes in large-scale civil infrastructure projects as a leading contractor. Our experience spans highway construction, bridge development, and utility infrastructure with proven expertise in managing complex, multi-phase contractor projects. We bring decades of contractor experience to every infrastructure challenge.",
    icon: "Building2",
    color: "#FF6B35",
    category: "contractor",
    image: "/images/services/civil-infrastructure/01-cover-v2.jpg",
    images: [
      "/images/services/civil-infrastructure/01-cover-v2.jpg",
      "/images/services/civil-infrastructure/02-v2.jpg",
      "/images/services/civil-infrastructure/03-v2.jpg",
      "/images/services/civil-infrastructure/04-v2.jpg",
      "/images/services/civil-infrastructure/05-v2.jpg",
      "/images/services/civil-infrastructure/06-v2.jpg",
    ],
    highlights: [
      "Highways, bridges & utilities",
      "Multi-phase project delivery",
      "QA/QC on every work package",
    ],
    capabilities: [
      "Highway construction",
      "Bridge design and build",
      "Utility infrastructure",
      "Drainage systems",
      "Pavement solutions",
      "Road rehabilitation",
      "Traffic management",
      "Quality assurance",
    ],
    subServices: [
      {
        title: "Roads & Highways",
        description:
          "New construction, widening, rehabilitation, and pavement packages for regional corridors.",
      },
      {
        title: "Bridges & Structures",
        description:
          "Structural civil works for bridges, culverts, and associated approach infrastructure.",
      },
      {
        title: "Utilities & Drainage",
        description:
          "Underground networks, stormwater systems, and site utility corridors.",
      },
      {
        title: "Industrial Civil Works",
        description:
          "Plant civil packages including pads, trenches, roads, and compound development.",
      },
    ],
    industries: ["Transportation", "Municipal", "Industrial", "Energy"],
  },
  {
    id: "foundation-engineering",
    slug: "foundation-engineering",
    name: "Foundation Engineering",
    tagline: "Deep Foundations & Structural Systems",
    description: "Deep foundations, structural systems, and engineering solutions.",
    fullDescription:
      "As a specialized contractor, TIMC provides comprehensive foundation engineering services. Our expertise in deep pile foundations, structural systems, and geotechnical solutions supports projects of all scales. We combine technical excellence with contractor practicality to deliver solutions that work.",
    icon: "Hammer",
    color: "#E85A24",
    category: "contractor",
    image: "/images/services/foundation-engineering/01-cover-v3.jpg",
    images: [
      "/images/services/foundation-engineering/01-cover-v3.jpg",
      "/images/services/foundation-engineering/03-v2.jpg",
      "/images/services/foundation-engineering/04-v2.jpg",
      "/images/services/foundation-engineering/05-v2.jpg",
      "/images/services/foundation-engineering/06-v2.jpg",
      "/images/services/foundation-engineering/07-v2.jpg",
      "/images/services/foundation-engineering/08-v2.jpg",
      "/images/services/foundation-engineering/09-v2.jpg",
      "/images/services/foundation-engineering/10-v2.jpg",
      "/images/services/foundation-engineering/11-v2.jpg",
    ],
    highlights: [
      "Deep piles & structural systems",
      "Geotechnical-informed delivery",
      "Load-tested foundation packages",
    ],
    capabilities: [
      "Deep piles and shafts",
      "Drilled caissons",
      "Soil stabilization",
      "Structural engineering",
      "Geotechnical analysis",
      "Foundation design",
      "Load-bearing solutions",
      "Quality testing",
    ],
    subServices: [
      {
        title: "Deep Pile Foundations",
        description:
          "Driven and bored piles for industrial towers, bridges, and heavy process structures.",
      },
      {
        title: "Raft & Mat Foundations",
        description:
          "Large-area raft systems for equipment halls, substations, and heavy machinery pads.",
      },
      {
        title: "Soil Stabilization",
        description:
          "Ground improvement and stabilization methods for weak or variable soil profiles.",
      },
      {
        title: "Equipment Foundations",
        description:
          "Precision foundations for turbines, compressors, transformers, and rotating equipment.",
      },
    ],
    industries: ["Building", "Industrial", "Infrastructure", "Specialized"],
  },
  {
    id: "energy-infrastructure",
    slug: "energy-infrastructure",
    name: "Energy Infrastructure",
    tagline: "Power & Renewable Energy Projects",
    description: "Power generation, renewable energy, and energy projects.",
    fullDescription:
      "TIMC contractor capabilities extend to energy infrastructure, including thermal and renewable energy projects. We bring contractor expertise to power generation, grid infrastructure, and clean energy initiatives. Our technical team understands the unique demands of energy sector projects.",
    icon: "Zap",
    color: "#FF8F66",
    category: "contractor",
    image: "/images/services/energy-infrastructure/01-cover-v2.jpg",
    images: [
      "/images/services/energy-infrastructure/01-cover-v2.jpg",
      "/images/services/energy-infrastructure/02-v2.jpg",
      "/images/services/energy-infrastructure/03-v2.jpg",
      "/images/services/energy-infrastructure/04-v2.jpg",
      "/images/services/energy-infrastructure/05-v2.jpg",
      "/images/services/energy-infrastructure/06-v2.jpg",
    ],
    highlights: [
      "Power & renewable project delivery",
      "Grid & substation civil packages",
      "Energy-sector HSE discipline",
    ],
    capabilities: [
      "Power generation facilities",
      "Renewable energy projects",
      "Grid infrastructure",
      "Energy storage systems",
      "Transmission line work",
      "Substation construction",
      "Environmental integration",
      "Regulatory compliance",
    ],
    subServices: [
      {
        title: "Substation Civil Works",
        description:
          "Foundations, cable trenches, control buildings, and compound works for substations.",
      },
      {
        title: "Renewable Site Development",
        description:
          "Site prep, access roads, and civil packages for solar and related renewable projects.",
      },
      {
        title: "Plant Infrastructure",
        description:
          "Civil and structural support for power plants and associated balance-of-plant works.",
      },
      {
        title: "Transmission Support Works",
        description:
          "Tower foundations, access, and civil packages supporting transmission corridors.",
      },
    ],
    industries: ["Energy", "Power", "Renewable", "Utility"],
  },
  {
    id: "equipment-rental",
    slug: "equipment-rental",
    name: "Equipment Rental",
    tagline: "Integrated Equipment Support for Contractors",
    description: "Integrated equipment support for all project phases.",
    fullDescription:
      "As a contractor company, TIMC provides integrated equipment rental services to support all project phases. Our fleet of modern, well-maintained equipment complements our core contractor services, ensuring project efficiency and cost optimization. Equipment rental is one of our integrated service offerings, designed to work seamlessly with our infrastructure and foundation engineering expertise.",
    icon: "Truck",
    color: "#FF6B35",
    category: "integrated",
    image: "/images/services/equipment-rental/01-cover-v1.jpg",
    images: [
      "/images/services/equipment-rental/01-cover-v1.jpg",
      "/images/services/equipment-rental/02-v1.jpg",
      "/images/services/equipment-rental/03-v1.jpg",
      "/images/services/equipment-rental/04-v1.jpg",
      "/images/services/equipment-rental/05-v1.jpg",
      "/images/services/equipment-rental/06-v1.jpg",
      "/images/services/equipment-rental/07-v1.jpg",
    ],
    highlights: [
      "Modern, well-maintained heavy fleet",
      "Project-phase equipment packages",
      "Operator support & logistics",
    ],
    capabilities: [
      "Heavy equipment rental",
      "Fleet maintenance and support",
      "Project-specific equipment solutions",
      "Cost-effective rental packages",
      "Emergency equipment availability",
      "Flexible lease terms",
      "Equipment operator support",
      "Integrated logistics",
    ],
    subServices: [
      {
        title: "Lifting & Mobile Cranes",
        description:
          "Mobile, rough terrain, all-terrain, crawler, boom, tower and spider cranes for heavy and utility lifts.",
      },
      {
        title: "Civil, Earthmoving & Compaction",
        description:
          "Excavators, dozers, loaders, graders, skid steers and rollers for earthworks and compaction.",
      },
      {
        title: "Transportation & Heavy Haulage",
        description:
          "Flatbeds, lowbeds, satah and pipe trailers, dump trucks and water or fuel tankers.",
      },
      {
        title: "Rigging & Material Handling",
        description:
          "Forklifts, telehandlers, reach stackers, winches and spreader beams for yard logistics.",
      },
      {
        title: "Aerial & Access",
        description:
          "Scissor lifts, articulating and telescopic booms, spider lifts and manlifts for elevated work.",
      },
      {
        title: "Power, Air & Utilities",
        description:
          "Generators, ATS, distribution panels, air compressors and LED lighting towers.",
      },
      {
        title: "Site Support & Specialty",
        description:
          "Office cabins, accommodation, storage containers, fencing and concrete barriers.",
      },
    ],
    industries: ["Construction", "Infrastructure", "Foundation Work", "Energy Projects"],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
