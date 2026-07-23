export type MaterialCategorySlug =
  | "safety-lifting"
  | "electrical"
  | "mechanical"
  | "civil"
  | "industrial-tools";

export type MaterialCategoryNav = {
  slug: MaterialCategorySlug;
  label: string;
  href: string;
};

export type MaterialCategoryDetail = {
  slug: MaterialCategorySlug;
  bannerTitle: string;
  breadcrumb: string;
  sectionTitle: string;
  body: string[];
  listItems: string[];
  gallery: string[];
};

export const materialCategoryNav: MaterialCategoryNav[] = [
  {
    slug: "safety-lifting",
    label: "Safety & Lifting",
    href: "/services/materials/safety-lifting",
  },
  {
    slug: "electrical",
    label: "Electrical",
    href: "/services/materials/electrical",
  },
  {
    slug: "mechanical",
    label: "Mechanical",
    href: "/services/materials/mechanical",
  },
  {
    slug: "civil",
    label: "Civil",
    href: "/services/materials/civil",
  },
  {
    slug: "industrial-tools",
    label: "Industrial Tools",
    href: "/services/materials/industrial-tools",
  },
];

export const materialCategoryDetails: Record<
  MaterialCategorySlug,
  MaterialCategoryDetail
> = {
  "safety-lifting": {
    slug: "safety-lifting",
    bannerTitle: "Safety & Lifting",
    breadcrumb: "Safety & Lifting",
    sectionTitle: "Safety & Lifting",
    body: [
      "We understand the safety concerns of our customers whose employees work in a risky environment where accidents are quite possible. So we came up with exclusive safety equipment supplies to industrial, commercial, and residential units all across the globe. We partner with the best and renowned safety equipment manufacturers to provide a wide range of safety products to our potential clients.",
      "Our company is run by the professional team comprising qualified and well-trained members who are being known as the top safety equipment suppliers. Our exclusive safety equipment supplies cover different types of safety and personal gears that are widely used in construction, industrial, marine, oil & Gas, and other vital sectors.",
    ],
    listItems: [
      "Safety Shoes",
      "Safety Goggles",
      "Construction Safety Equipment",
      "Safety Face Shields",
      "Safety Glasses",
      "Safety Helmets",
      "Safety Harnesses | Full Body Harness",
      "Safety Gloves & Life Jackets",
      "Hesco Barriers",
      "Hearing Protection",
      "Workwear",
      "Eye & Face Protection",
      "Head Protection",
      "Respiratory Protection",
      "Hand Protection",
      "Eye Wash & Shower",
      "Safety Footwear",
      "Fall Protection",
    ],
    gallery: [
      "Acrylic-Sheet.jpg",
      "Eye-Wash-Shower.jpg",
      "fall-protection.jpg",
      "Hearing-Protection.jpg",
      "saftey-glowes.jpg",
      "Safety-Harnesses-Full-Body-Harness.jpg",
      "saftey-glass.jpg",
      "saftey-helmet.jpg",
      "saftey-shoes.jpg",
    ].map((file) => `/images/materials/categories/safety/${file}`),
  },
  electrical: {
    slug: "electrical",
    bannerTitle: "Electrical Material",
    breadcrumb: "Electrical Material",
    sectionTitle: "Electrical Material",
    body: [
      "Our success has been built by serving our customers' electrical construction materials needs for many years. As one of the nation's largest suppliers of electrical construction materials, we maintain an extensive inventory surplus of electrical materials. Large inventory, product knowledge, attractive pricing structures and timely shipments make us the number one source for electrical construction materials.",
      "Our goal is to protect your lighting with the most advanced electrical supplies from the leading manufacturers everybody trusts. With over 25 years of experience in the industry, we have managed to develop partnerships with top developers and gained the trust of our valuable clients.",
    ],
    listItems: [
      "Conduit fittings",
      "Electrical connectors",
      "Lugs",
      "Circuit breakers",
      "Wire cable",
      "Junction boxes",
      "Motor control",
      "Motor control centres",
      "Wiring devices",
      "Strut fittings",
      "PVC products",
      "Safety switches",
      "Fire Detection & Alarm System",
      "Safety Tools for Substation",
      "Bulbs & Lamps",
      "Corn renunciation & Control Cables",
      "Cable Termination & Kits",
      "Safety & Disconnect Switches",
      "Cable Lugs",
      "Fuses",
      "Electrical Panelbaadrs",
      "Heat Tracing Systems",
      "Earthing And Lightning Protection",
      "Instrumentation Tubes & Fittings",
      "Industrial Automation",
      "Hazardous Lightings",
      "Bulbs, Lamps & Luminaires",
      "Power Cables LV. MV. HV",
      "Flexible Metallic Conduits",
      "Electrical Testing Equipment",
      "Conduit Boxes",
      "Electrical Metallic Tubing",
      "Enclosures/Cabinets",
    ],
    gallery: [
      "Circuit-Breakers.jpg",
      "Conduit-fittings.jpg",
      "Electrical-connectors.jpg",
      "Electrical-Panelbaadrs.jpg",
      "Fire-Detection-Alarm-System.jpg",
      "Fuses.jpg",
      "Junction-boxes.jpg",
      "Safety-switches.jpg",
      "wire-cable.jpg",
    ].map((file) => `/images/materials/categories/electrical/${file}`),
  },
  mechanical: {
    slug: "mechanical",
    bannerTitle: "Mechanical Material",
    breadcrumb: "Mechanical Material",
    sectionTitle: "Mechanical Material",
    body: [
      "As the leading mechanical materials supplier in Saudi Arabia, we assure our clients to deliver top of the line products to address all of your needs. Ever since we began our operations, we have strived hard to establish our position in the region, and achieved success in becoming renowned as the region's leading materials suppliers.",
      "Having been in the industry for many years, we understand each client's unique requirements and provide them with best mechanical products. Through our manufacturing network, we have the technical expertise to provide finished mechanical component solutions ready for fitment into your process.",
    ],
    listItems: [
      "Steel Pipes & Fittings",
      "Grooved Fittings & Valves",
      "Copper, Brass pipes & Fittings",
      "Soldering & Welding Products",
      "Pipes, Fittings, Valves & Drains",
      "Valves, Bar & Tubes",
      "Solvents, Adhesives & Cleaners",
      "Chlorine & water Filters",
      "Pressure Tanks",
      "Gaskets",
      "Sheets & Plates",
      "Gauges & Meters",
      "Valves & Arrestors",
      "Clamps, Joints & Couplings",
      "Flanges",
      "Pipes",
      "Butt Weld Fittings",
      "Fittings",
      "Valves",
      "PVC/CPVC/UPVC/HDPE/PVDF",
      "Fasteners And Stud",
    ],
    gallery: [
      "Copper-Brass-pipes-Fittings.jpg",
      "flanges.jpg",
      "Gaskets.jpg",
      "Grooved-Fittings-Valves.jpg",
      "Pipes-Fittings-Valves-Drains.jpg",
      "Pressure-Tanks.jpg",
      "Soldering-Welding.jpg",
      "Steel-Pipes-Fittings.jpg",
      "Valves-Bar-Tubes.jpg",
    ].map((file) => `/images/materials/categories/mechanical/${file}`),
  },
  civil: {
    slug: "civil",
    bannerTitle: "Civil Materials",
    breadcrumb: "Civil Materials",
    sectionTitle: "Civil Materials",
    body: [
      "We are widely involved in supplying a wide range of Aggregates to the construction industry. Aggregates are inert granular ingredients, such as sand, gravel, or crushed stone. We have been successfully supplying various small and large-scale projects, including some of the most iconic constructions. Today TALHA is one of the leading suppliers of Sands & Aggregates in the region. We serve the best quality of Aggregate all across the nations. Whatever the project, TALHA has the aggregates and sand to suit your needs.",
      "At TALHA, our dedicated team will ensure you have access to an extensive range of high quality products and building supplies for your project. We've invested in world-class technology systems to ensure we deliver the right products at the right time so our customers' projects are always a success. We have the people, we have the products and we have the technology to ensure you receive the highest quality service.",
    ],
    listItems: [
      "Steel Rebar",
      "Steel Wire Rods",
      "Supplementary Cementing Materials",
      "Aggregates",
      "Constructions Sand",
      "Chemical Admixtures",
      "Construction Wood & Carpentry Wood",
      "Formwork Shuttering Clamps",
      "Accessories",
      "Sheet Materials",
      "Wire Mesh",
      "Specialty Adhesives",
    ],
    gallery: [
      "Steel-Rebar.jpg",
      "Aggregates.jpg",
      "Constructions-Sand.jpg",
      "Construction-Carpentry-Wood.jpg",
      "Formwork.jpg",
      "Bagged-Products.jpg",
    ].map((file) => `/images/materials/categories/civil/${file}`),
  },
  "industrial-tools": {
    slug: "industrial-tools",
    bannerTitle: "Industrial Tools",
    breadcrumb: "Industrial Tools",
    sectionTitle: "Industrial Tools",
    body: [],
    listItems: [],
    gallery: [
      "RHINO-4120-4234-300x219.jpg",
      "rohino-23-300x300.png",
      "rohino-RH4010-300x233.jpg",
      "RHINO024-300x233.jpg",
      "RHINO-0800-300x233.jpg",
      "RUBBER-CASE-TAPE.png",
      "CARPENTER-SQUARE.png",
      "DWDT71563-300x249.jpg",
      "ML8143DPRO-300x300.jpg",
      "kr5010-286x300.jpg",
      "904927_103-300x300.jpg",
      "stanlay.jpg",
      "masterlock.jpg",
      "tramontina.jpg",
      "1-TRA206T-200x300.jpg",
      "MLCOM_PRODUCT_105-300x300.jpg",
      "STRAIGHT-AVIATION-SNIP.png",
      "40700227PNM001G-300x112.png",
      "rohino-20221106_11124600-1-300x300.png",
      "sata-0_WAYZ94481-300x200.jpg",
      "sata-012A55221-300x200.jpg",
      "magnatic-tool.jpg",
      "sata-digital-circuite.jpg",
      "rohino-magnatic-drilling-machine.jpg",
      "sata-23pc-wrench.jpg",
    ].map((file) => `/images/materials/categories/industrial-tools/${file}`),
  },
};

export const materialCategoryBanner = "/images/header-scrap.jpg";

export function getMaterialCategory(slug: string) {
  return materialCategoryDetails[slug as MaterialCategorySlug];
}

export function getMaterialCategorySlugs() {
  return Object.keys(materialCategoryDetails) as MaterialCategorySlug[];
}
