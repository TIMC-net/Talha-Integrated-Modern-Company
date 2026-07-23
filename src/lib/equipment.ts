export type EquipmentCategorySlug =
  | "aerial"
  | "electrical"
  | "air-compressor"
  | "compaction-paving"
  | "earth-moving"
  | "material-handling"
  | "power-generation"
  | "transport"
  | "cranes";

export type EquipmentCategoryNav = {
  slug: EquipmentCategorySlug;
  label: string;
  href: string;
};

export type EquipmentProduct = {
  title: string;
  image: string;
  href?: string;
};

export type EquipmentCategoryDetail = {
  slug: EquipmentCategorySlug;
  bannerTitle: string;
  breadcrumb: string;
  sectionTitle: string;
  products: EquipmentProduct[];
};

export const equipmentCategoryBanner = "/images/header-scrap.jpg";

export const equipmentCategoryNav: EquipmentCategoryNav[] = [
  { slug: "aerial", label: "Aerial", href: "/services/equipment/aerial" },
  {
    slug: "electrical",
    label: "Electrical",
    href: "/services/equipment/electrical",
  },
  {
    slug: "air-compressor",
    label: "Air Compressor",
    href: "/services/equipment/air-compressor",
  },
  {
    slug: "compaction-paving",
    label: "Compaction & Paving",
    href: "/services/equipment/compaction-paving",
  },
  {
    slug: "earth-moving",
    label: "Earth Moving",
    href: "/services/equipment/earth-moving",
  },
  {
    slug: "material-handling",
    label: "Material Handling",
    href: "/services/equipment/material-handling",
  },
  {
    slug: "power-generation",
    label: "Power Generation",
    href: "/services/equipment/power-generation",
  },
  { slug: "transport", label: "Transport", href: "/services/equipment/transport" },
  { slug: "cranes", label: "Cranes", href: "/services/equipment/cranes" },
];

function categoryImage(slug: string, file: string) {
  return `/images/equipment/categories/${slug}/${file}`;
}

export const equipmentCategoryDetails: Record<
  EquipmentCategorySlug,
  EquipmentCategoryDetail
> = {
  aerial: {
    slug: "aerial",
    bannerTitle: "Aerial",
    breadcrumb: "Aerial",
    sectionTitle: "Aerial",
    products: [
      { title: "Scissor Lifts", image: categoryImage("aerial", "Scissor-Lifts.jpg") },
      { title: "Boom Lift", image: categoryImage("aerial", "boom-lift.jpg") },
    ],
  },
  electrical: {
    slug: "electrical",
    bannerTitle: "Electrical",
    breadcrumb: "Electrical",
    sectionTitle: "Electrical",
    products: [
      { title: "Tower Lights", image: categoryImage("electrical", "towerlights.jpg") },
      { title: "Welders", image: categoryImage("electrical", "welders.png") },
    ],
  },
  "air-compressor": {
    slug: "air-compressor",
    bannerTitle: "Air Compressor",
    breadcrumb: "Air Compressor",
    sectionTitle: "Air Compressor",
    products: [
      {
        title: "Compressor, 175cfm @ 100 psi",
        image: categoryImage("air-compressor", "Compressor175cfm.jpg"),
      },
      {
        title: "Compressor, 185cfm @ 100 psi",
        image: categoryImage("air-compressor", "Compressor185cfm.jpg"),
      },
      {
        title: "Compressor, 268cfm @ 100 psi",
        image: categoryImage("air-compressor", "Compressor268cfm.jpg"),
      },
    ],
  },
  "compaction-paving": {
    slug: "compaction-paving",
    bannerTitle: "Compaction & Paving",
    breadcrumb: "Compaction & Paving",
    sectionTitle: "Compaction & Paving",
    products: [
      { title: "Jack Hammer", image: categoryImage("compaction-paving", "jakhammers.jpg") },
      { title: "Plat Compactors", image: categoryImage("compaction-paving", "PlatCompactors.jpg") },
      { title: "Rammers", image: categoryImage("compaction-paving", "rammers.jpg") },
      { title: "Ride-On Rollers", image: categoryImage("compaction-paving", "rideonrollers.jpg") },
      {
        title: "Walk-Behind Rollers",
        image: categoryImage("compaction-paving", "Walk-BehindRollers.jpg"),
      },
    ],
  },
  "earth-moving": {
    slug: "earth-moving",
    bannerTitle: "Earth Moving",
    breadcrumb: "Earth Moving",
    sectionTitle: "Earth Moving",
    products: [
      { title: "Skid Steers", image: categoryImage("earth-moving", "Skid-Steers.jpg") },
      { title: "Backhoe Loader", image: categoryImage("earth-moving", "Backhoe-Loader.jpg") },
      { title: "Dozers", image: categoryImage("earth-moving", "dozers.jpg") },
      { title: "Excavators", image: categoryImage("earth-moving", "Excavators.png") },
    ],
  },
  "material-handling": {
    slug: "material-handling",
    bannerTitle: "Material Handling",
    breadcrumb: "Material Handling",
    sectionTitle: "Material Handling",
    products: [
      { title: "Electric Forklifts", image: categoryImage("material-handling", "forklift.jpg") },
      {
        title: "Industrial Forklifts",
        image: categoryImage("material-handling", "IndustrialForklifts.jpg"),
      },
      {
        title: "Rough Terrain Forklift",
        image: categoryImage("material-handling", "Rough-Terrain-Forklift.jpg"),
      },
      {
        title: "Telehandler Forklifts",
        image: categoryImage("material-handling", "Telehandler-Forklifts.jpg"),
      },
      { title: "Boom Truck", image: categoryImage("material-handling", "cranes3.png") },
    ],
  },
  "power-generation": {
    slug: "power-generation",
    bannerTitle: "Power Generation",
    breadcrumb: "Power Generation",
    sectionTitle: "Power Generation",
    products: [
      { title: "Generators", image: categoryImage("power-generation", "Generators.jpg") },
      { title: "Mega Generator", image: categoryImage("power-generation", "mega-generator.jpg") },
    ],
  },
  transport: {
    slug: "transport",
    bannerTitle: "Transportation",
    breadcrumb: "Transportation",
    sectionTitle: "Transportation",
    products: [
      { title: "Flat bed Trailer", image: categoryImage("transport", "Flat-bed-Trailer.jpg") },
      { title: "Low bed Trailer", image: categoryImage("transport", "Low-bed-Trailer.jpg") },
      {
        title: "4x4 Double Cabin Pick Up",
        image: categoryImage("transport", "4x4DoubleCabinPickUp.jpg"),
      },
      {
        title: "Mini Bus 30 Seats",
        image: categoryImage("transport", "Mini Bus15-30Seats.jpg"),
      },
      { title: "Mini Bus 15 Seats", image: categoryImage("transport", "minibus-15.jpg") },
      { title: "Bus 50-60 Seats", image: categoryImage("transport", "Bus50-60Seats.jpg") },
      { title: "Dump Truck 16-24m3", image: categoryImage("transport", "DumpTruck16-24m3.jpg") },
      {
        title: "Water Tanker 10000 litres",
        image: categoryImage("transport", "water-tanker.jpg"),
      },
      {
        title: "Diesel Tankers 10000 Litres",
        image: categoryImage("transport", "DieselTankers10000Litres.jpg"),
      },
    ],
  },
  cranes: {
    slug: "cranes",
    bannerTitle: "Cranes",
    breadcrumb: "Cranes",
    sectionTitle: "Cranes",
    products: [
      { title: "GA – 1000N", image: categoryImage("cranes", "tadano_faun_ga-1000n.jpg") },
      {
        title: "GROVE GMK4100L",
        image: categoryImage("cranes", "GMK4100L-1_silhouette-transparent-1024x561.png"),
      },
      {
        title: "GROVE GMK6300L",
        image: categoryImage("cranes", "GMK4100L-1_silhouette-transparent-1024x561.png"),
      },
      {
        title: "GROVE GMK7450",
        image: categoryImage("cranes", "7ae4830e-446a-41a6-b3f3-55ff8ad7d1b5.jpg"),
      },
      {
        title: "LIEBHERR LTM 1250-6.1",
        image: categoryImage("cranes", "ltm-1250-5.1-frei-1024x732.jpg"),
      },
      {
        title: "LIEBHERR LTM 1160/2",
        image: categoryImage("cranes", "ltm-1160-5.2-frei-1-1024x732.jpg"),
      },
      {
        title: "LIEBHERR LTM 11200 9.1",
        image: categoryImage("cranes", "ltm-11200-9.1-frei-1-1024x732.jpg"),
      },
      {
        title: "KOBELCO CKE2500-2",
        image: categoryImage("cranes", "img_CKE25001.jpg"),
      },
      {
        title: "LIEBHERR LTM 1300-6.1",
        image: categoryImage("cranes", "liebherr-ltm-1300-6.2-frei-1024x614.jpg"),
      },
      {
        title: "LIEBHERR LTM 1500 8.1",
        image: categoryImage("cranes", "ltm-1500-8.1-frei-1024x731.jpg"),
      },
      { title: "SANY SAC2200", image: categoryImage("cranes", "7rsz2VzQN8kRTJ7YDwDBJEEf-1024x772.jpg") },
      { title: "SANY SCC1000E", image: categoryImage("cranes", "SCC1000E.jpg") },
      { title: "SANY SCC3200A", image: categoryImage("cranes", "SCC3200A-1-115144.jpg") },
      { title: "SANY STC 100", image: categoryImage("cranes", "XvF8F4gt-1024x683.jpeg") },
      { title: "SANY STC1600", image: categoryImage("cranes", "SANY STC1600.jpg") },
      {
        title: "TEREX DEMAG AC100",
        image: categoryImage("cranes", "all-terrain-cranes-ac-100-10x8x8-terex-demag1.png"),
      },
      {
        title: "TEREX DEMAG AC160/2",
        image: categoryImage("cranes", "Terex-AC-160-2-1024x837-1.jpg"),
      },
      {
        title: "TEREX DEMAG AC700",
        image: categoryImage("cranes", "demag-terex-ac-700-700-ton-metric-all-terrain-crane-171730.jpg"),
      },
      {
        title: "TEREX DEMAG CC 8800-1",
        image: categoryImage("cranes", "51074-27450-Conrad-Demag-CC8800-Boom-Booster-Raupenkran-1-1024x1024.jpg"),
      },
      {
        title: "TEREX DEMAG CC3800-1",
        image: categoryImage("cranes", "cc-3800-1-939x1024.jpg"),
      },
      {
        title: "Rough Terrain Crane - Terex",
        image: categoryImage("cranes", "Rough Terrain Crane - Terex.jpg"),
      },
    ],
  },
};

export const equipmentProducts: EquipmentProduct[] = [
  {
    title: "Aerial",
    image: "/images/equipment/aerial.jpg",
    href: "/services/equipment/aerial",
  },
  {
    title: "Electrical",
    image: "/images/equipment/towerlights.jpg",
    href: "/services/equipment/electrical",
  },
  {
    title: "Air Compressor",
    image: "/images/equipment/aircompressor.jpg",
    href: "/services/equipment/air-compressor",
  },
  {
    title: "Compaction & Paving",
    image: "/images/equipment/jakhammers.jpg",
    href: "/services/equipment/compaction-paving",
  },
  {
    title: "Earth Moving",
    image: "/images/equipment/dozers.jpg",
    href: "/services/equipment/earth-moving",
  },
  {
    title: "Material Handling",
    image: "/images/equipment/forklift.jpg",
    href: "/services/equipment/material-handling",
  },
  {
    title: "Power Generation",
    image: "/images/equipment/Generators.jpg",
    href: "/services/equipment/power-generation",
  },
  {
    title: "Transportation",
    image: "/images/equipment/water-tanker.jpg",
    href: "/services/equipment/transport",
  },
];

export function getEquipmentCategory(slug: string) {
  return equipmentCategoryDetails[slug as EquipmentCategorySlug];
}

export function getEquipmentCategorySlugs() {
  return Object.keys(equipmentCategoryDetails) as EquipmentCategorySlug[];
}
