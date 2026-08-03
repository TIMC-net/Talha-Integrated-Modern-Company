export const company = {
  name: "TALHA INTEGRATED MODERN COMPANY",
  shortName: "TIMC",
  tagline: "Engineering, Contracting & Integrated Equipment Solutions",
  phone: "+966 50 197 9045",
  mobile: "+966 59 158 3779",
  email: "trs@trsco.net",
  website: "https://www.talhaimc.com",
  location: "Jeddah, Kingdom of Saudi Arabia",
  address:
    "6933 Muteb St, Al Rehab Dist., 3525 - 23343, Jeddah, Kingdom of Saudi Arabia",
  mapsUrl: "https://maps.app.goo.gl/2zyypMAAM1ikHjaZA?g_st=ic",
  /** Exact pin from TIMC Google Maps share link */
  mapsLat: 21.5431672,
  mapsLng: 39.2168627,
  established: "2010",
  commercialRegistration: "4030606311",
  vatNumber: "300660776900003",
  /** Contact details confirmed by TIMC */
  contactPending: false,
};

export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "SERVICES", href: "/services" },
  {
    label: "PROJECTS",
    href: "/projects/ongoing",
    children: [
      { label: "Ongoing Projects", href: "/projects/ongoing" },
      { label: "Completed Projects", href: "/projects/completed" },
    ],
  },
  { label: "CLIENTS", href: "/clients" },
  { label: "CONTACT US", href: "/contact" },
];

export const aboutNarrative = [
  "Talha Integrated Modern Company (TIMC) is a Saudi Arabian engineering and contracting company established in 2010, specializing in general contracting, civil infrastructure, foundation engineering, industrial maintenance, energy infrastructure, and integrated heavy equipment rental solutions. Headquartered in Jeddah, TIMC serves clients across Saudi Arabia's major cities, industrial zones, and strategic development projects while also maintaining operations in Pakistan.",
  "Since its establishment, TIMC has successfully delivered engineering and construction solutions for projects across the power, utility, industrial, infrastructure, renewable energy, and oil & gas sectors. By combining engineering expertise, modern equipment, skilled personnel, and strong project management capabilities, the company provides reliable turnkey solutions tailored to the unique requirements of every project.",
  "TIMC expanded its corporate identity to reflect its broader capabilities beyond equipment rental. Today, the company operates as an integrated engineering and contracting partner committed to delivering quality, safety, innovation, and long-term value while building lasting relationships with clients throughout Saudi Arabia and the wider GCC region.",
];

/** TIMC-approved Mission / Vision / Values */
export const whoWeAre = [
  {
    id: "mission",
    title: "Our Mission",
    content: [
      "To deliver innovative engineering, construction, and infrastructure solutions that meet the highest standards of quality, safety, and operational excellence while completing every project efficiently, responsibly, and within agreed timelines.",
    ],
  },
  {
    id: "vision",
    title: "Our Vision",
    content: [
      "To become one of Saudi Arabia's leading engineering and general contracting companies, recognized for excellence in infrastructure development, foundation engineering, and integrated heavy equipment rental, while expanding our presence across the GCC through sustainable growth, innovation, and client-focused solutions.",
    ],
  },
  {
    id: "values",
    title: "Core Values",
    content: [
      "Our business is built upon five fundamental principles:",
      "Integrity – We uphold the highest ethical standards in everything we do.",
      "Excellence – We continuously strive to exceed expectations through quality and professionalism.",
      "Collaboration – We believe successful projects are achieved through teamwork and strong partnerships.",
      "Innovation – We embrace modern technologies and engineering solutions to improve project outcomes.",
      "Commitment – We honor our promises by delivering projects safely, on time, and to the highest standards.",
    ],
  },
];

/** Placeholder company history — replace when TIMC provides official timeline */
export const companyHistory = [
  {
    year: "Est.",
    title: "Company Foundation",
    text: "TIMC established operations in the Kingdom of Saudi Arabia. Full founding story pending from TIMC.",
  },
  {
    year: "Growth",
    title: "Contractor Expansion",
    text: "Capabilities expanded across civil infrastructure, foundation engineering, and energy project support. Details pending from TIMC.",
  },
  {
    year: "Today",
    title: "Integrated Delivery",
    text: "TIMC operates as a multi-discipline contractor with equipment rental as an integrated division. Current profile pending from TIMC.",
  },
];

export const certifications = [
  {
    id: "iso9001",
    title: "ISO 9001",
    description: "Quality Management System",
  },
  {
    id: "iso14001",
    title: "ISO 14001",
    description: "Environmental Management System",
  },
  {
    id: "iso45001",
    title: "ISO 45001",
    description: "Occupational Health & Safety Management System",
  },
  {
    id: "licenses",
    title: "Company Registration",
    description:
      "Commercial Registration: 4030606311. VAT Number: 300660776900003.",
  },
  {
    id: "vendor",
    title: "Vendor Registrations",
    description:
      "Vendor approvals with Saudi Aramco, SEC, and SABIC.",
  },
];

export type ListedProject = {
  no: number;
  name: string;
  /** Short badge label shown on the card */
  description: string;
  /** Full scope of work from TIMC */
  scope?: string;
  /** Project sponsor / awarding party */
  sponsor?: string;
  /** Shown as client line (defaults to sponsor when present) */
  client: string;
  contractor: string;
  location: string;
  /** Contract value in SAR */
  contractAmount?: number;
  /** End of contract date (completed projects) */
  endDate?: string;
  /** Status note from TIMC (e.g. Completed) */
  notes?: string;
};

/** Ongoing projects — from TIMC Ongoing Project List */
export const ongoingProjects: ListedProject[] = [
  {
    no: 1,
    name: "Starah Independent Power Plant — 2GW Onshore Wind Project",
    description: "RC Pile Foundations",
    scope:
      "Supply and apply RC pile foundation type for suspension tower & tension tower",
    sponsor: "Civil & Electrical Projects Contracting Co",
    client: "Civil & Electrical Projects Contracting Co",
    contractor: "TIMC",
    location: "Starah, KSA",
    contractAmount: 1_500_000,
  },
  {
    no: 2,
    name: "Starah Central Road Access Project",
    description: "Access Roads & Pads",
    scope: "Supply and place access roads and supply and execute structure pad",
    sponsor: "Civil & Electrical Projects Contracting Co",
    client: "Civil & Electrical Projects Contracting Co",
    contractor: "TIMC",
    location: "Starah, KSA",
    contractAmount: 4_000_000,
  },
  {
    no: 3,
    name: "Reinforcement of Rabigh Power Plant 1.2GW SCC6-5000F 3+1 Project",
    description: "Generator & Equipment",
    scope: "Supply of power generator and equipment",
    sponsor: "Elsewedy Electric Power Systems Projects",
    client: "Elsewedy Electric Power Systems Projects",
    contractor: "TIMC",
    location: "Rabigh, KSA",
    contractAmount: 3_500_000,
  },
  {
    no: 4,
    name: "FA20 Power and Water Project PE-318 — Jazan Sabia",
    description: "Heavy Equipment",
    scope: "Supply of heavy equipment",
    sponsor: "Ahmed Muhammad Al Mkhavi",
    client: "Ahmed Muhammad Al Mkhavi",
    contractor: "TIMC",
    location: "Jazan Sabia, KSA",
    contractAmount: 1_004_000,
  },
  {
    no: 5,
    name: "Al Shuaibah 1 & 2 Solar Photovoltaic Independent Power Plant (IPP)",
    description: "Generator & Equipment",
    scope: "Supply of power generator & equipment",
    sponsor: "Tran Ji Trading and Contracting Company",
    client: "Tran Ji Trading and Contracting Company",
    contractor: "TIMC",
    location: "Al Shuaibah, KSA",
    contractAmount: 1_864_000,
  },
  {
    no: 6,
    name: "Expansion of the Rabigh 2 IPP Power Plant — Additional 2200MW",
    description: "Generator & Services",
    scope: "Supply of power generator & services",
    sponsor:
      "Joint Venture of Branch of Elsewedy Electric and Branch of Sinohydro Corporation Limited",
    client:
      "JV Elsewedy Electric / Sinohydro Corporation Limited",
    contractor: "TIMC",
    location: "Rabigh, KSA",
    contractAmount: 2_000_000,
  },
  {
    no: 7,
    name: "Natco Jeddah Siemens",
    description: "Transport & Equipment",
    scope: "Supply of transportation & equipment",
    sponsor: "Natco Logistics Services Company",
    client: "Natco Logistics Services Company",
    contractor: "TIMC",
    location: "Jeddah, KSA",
    contractAmount: 1_320_000,
  },
  {
    no: 8,
    name: "New 110/33/13.8kV Substation for NAQUA — Allith City",
    description: "Generator & Equipment",
    scope: "Supply of power generator and heavy equipment",
    sponsor: "Elsewedy Electric Power Systems Projects",
    client: "Elsewedy Electric Power Systems Projects",
    contractor: "TIMC",
    location: "Allith City, KSA",
    contractAmount: 1_200_000,
  },
  {
    no: 9,
    name: "Design & Construction of Source OHTL Supporting 1A Substation — Jazan",
    description: "Access Road & Pads",
    scope: "Construction of access road & structural pads",
    sponsor: "Alfanar Company",
    client: "Alfanar Company",
    contractor: "TIMC",
    location: "Jazan, KSA",
    contractAmount: 3_999_930,
  },
  {
    no: 10,
    name: "Design & Construction of Source OHTL Supporting 1A Substation — Jazan (Normal Soil Pads)",
    description: "Structure Pads",
    scope: "Structure pads — normal soil",
    sponsor: "Engineering and Construction Company",
    client: "Engineering and Construction Company",
    contractor: "TIMC",
    location: "Jazan, KSA",
    contractAmount: 1_580_000,
  },
  {
    no: 11,
    name: "380kV OHTL from Jillah BSP #9063 to Layla BSP #9049",
    description: "Access Road & Pads",
    scope: "Construction of access road & structure pads",
    sponsor:
      "National Contracting Company Ltd. (Transmission & Distribution Division)",
    client: "National Contracting Company Ltd.",
    contractor: "TIMC",
    location: "Jillah–Layla Corridor, KSA",
    contractAmount: 1_250_000,
  },
];

/** Completed projects — from TIMC Completed Project List (last 2 years) */
export const completedProjects: ListedProject[] = [
  {
    no: 1,
    name: "Jeddah Solar Project",
    description: "Solar Project",
    sponsor: "Larsen & Toubro Limited",
    client: "Larsen & Toubro Limited",
    contractor: "TIMC",
    location: "Jeddah, KSA",
    contractAmount: 1_338_512,
    endDate: "31-12-2022",
    notes: "Completed",
  },
  {
    no: 2,
    name: "Shoaibah Power Plant",
    description: "Power Plant",
    sponsor: "Branch of Hyundai Engineering & Contracting Co.",
    client: "Branch of Hyundai Engineering & Contracting Co.",
    contractor: "TIMC",
    location: "Shoaibah, KSA",
    contractAmount: 1_160_827,
    endDate: "24-06-2024",
    notes: "Completed",
  },
  {
    no: 3,
    name: "NEOM Construction Site",
    description: "Construction Site",
    sponsor: "ABACUS International Co",
    client: "ABACUS International Co",
    contractor: "TIMC",
    location: "NEOM, KSA",
    contractAmount: 1_355_822,
    endDate: "31-01-2023",
    notes: "Completed",
  },
  {
    no: 4,
    name: "NEOM Khuraybah",
    description: "Construction Site",
    sponsor: "Gheed Najd Contracting Est",
    client: "Gheed Najd Contracting Est",
    contractor: "TIMC",
    location: "NEOM Khuraybah, KSA",
    contractAmount: 299_313,
    endDate: "30-04-2023",
    notes: "Completed",
  },
  {
    no: 5,
    name: "Nesma Sindlah Project",
    description: "Industrial Project",
    sponsor: "Desert Eagle Contracting Co",
    client: "Desert Eagle Contracting Co",
    contractor: "TIMC",
    location: "Sindlah, KSA",
    contractAmount: 750_338,
    endDate: "30-03-2022",
    notes: "Completed",
  },
  {
    no: 6,
    name: "Majma Housing Project",
    description: "Housing Project",
    sponsor: "Katerra Saudi Arabia Contracting Co",
    client: "Katerra Saudi Arabia Contracting Co",
    contractor: "TIMC",
    location: "Majma, KSA",
    contractAmount: 1_518_412,
    endDate: "05-02-2023",
    notes: "Completed",
  },
  {
    no: 7,
    name: "Makkah Project",
    description: "Construction",
    sponsor: "M Faheem El Amar Contracting Co",
    client: "M Faheem El Amar Contracting Co",
    contractor: "TIMC",
    location: "Makkah, KSA",
    contractAmount: 164_950,
    endDate: "15-06-2023",
    notes: "Completed",
  },
  {
    no: 8,
    name: "WTS Project",
    description: "Industrial Project",
    sponsor: "Memar Monif Contracting Est",
    client: "Memar Monif Contracting Est",
    contractor: "TIMC",
    location: "Saudi Arabia",
    contractAmount: 1_325_220,
    endDate: "17-04-2023",
    notes: "Completed",
  },
  {
    no: 9,
    name: "NEOM Construction Site",
    description: "Construction Site",
    sponsor: "Prestige Rental Equipments Co",
    client: "Prestige Rental Equipments Co",
    contractor: "TIMC",
    location: "NEOM, KSA",
    contractAmount: 201_952,
    endDate: "30-09-2022",
    notes: "Completed",
  },
  {
    no: 10,
    name: "Factory Saniya 3",
    description: "Factory Works",
    sponsor: "SANY Alameriah for Contracting Co",
    client: "SANY Alameriah for Contracting Co",
    contractor: "TIMC",
    location: "Saniya, KSA",
    contractAmount: 1_848_067,
    endDate: "15-06-2023",
    notes: "Completed",
  },
  {
    no: 11,
    name: "Nisma Project",
    description: "Industrial Project",
    sponsor: "Tahadi Lifter For Contracting Est",
    client: "Tahadi Lifter For Contracting Est",
    contractor: "TIMC",
    location: "Saudi Arabia",
    contractAmount: 1_775_195,
    endDate: "30-06-2022",
    notes: "Completed",
  },
  {
    no: 12,
    name: "Rabigh Power Plant",
    description: "Power Plant",
    sponsor: "Taj Noori Contracting Est",
    client: "Taj Noori Contracting Est",
    contractor: "TIMC",
    location: "Rabigh, KSA",
    contractAmount: 1_500_000,
    endDate: "30-06-2024",
    notes: "Completed",
  },
  {
    no: 13,
    name: "Sharma / NEOM",
    description: "Construction Site",
    sponsor: "Ahmed Muhammad Al Mkhavi",
    client: "Ahmed Muhammad Al Mkhavi",
    contractor: "TIMC",
    location: "Sharma / NEOM, KSA",
    contractAmount: 1_233_606,
    endDate: "30-06-2024",
    notes: "Completed",
  },
  {
    no: 14,
    name: "Jeddah NATCO",
    description: "Logistics Site",
    sponsor: "Group of Ibrahim Muhammed Sanad Al Badawi Co. Limited",
    client: "Group of Ibrahim Muhammed Sanad Al Badawi Co. Limited",
    contractor: "TIMC",
    location: "Jeddah, KSA",
    contractAmount: 1_002_432,
    endDate: "31-12-2023",
    notes: "Completed",
  },
  {
    no: 15,
    name: "Shoaibah Solar Project",
    description: "Solar Project",
    sponsor: "Tran Ji Trading and Contracting Company",
    client: "Tran Ji Trading and Contracting Company",
    contractor: "TIMC",
    location: "Shoaibah, KSA",
    contractAmount: 1_768_000,
    endDate: "30-06-2024",
    notes: "Completed",
  },
  {
    no: 16,
    name: "Rabigh Power Plant",
    description: "Power Plant",
    sponsor: "Elsewedy Electric Power Systems Projects",
    client: "Elsewedy Electric Power Systems Projects",
    contractor: "TIMC",
    location: "Rabigh, KSA",
    contractAmount: 3_500_000,
    endDate: "31-12-2025",
    notes: "Completed",
  },
  {
    no: 17,
    name: "Jeddah Site",
    description: "Site Works",
    sponsor: "Natco Logistics Services Company",
    client: "Natco Logistics Services Company",
    contractor: "TIMC",
    location: "Jeddah, KSA",
    contractAmount: 1_320_000,
    endDate: "30-12-2024",
    notes: "Completed",
  },
];

export type ClientEntry = {
  name: string;
  /** Short label for capsule UI */
  shortName: string;
  /** Logo for dark theme (white / light ink where needed) */
  logo: string;
  /**
   * Logo for light theme. Required when `logo` uses white ink so it
   * stays readable on light cards (typically black-ink variant).
   */
  logoOnLight?: string;
};

/** Trusted partners with official brand logos supplied by TIMC. */
export const clients: ClientEntry[] = [
  {
    name: "Larsen & Toubro Limited",
    shortName: "Larsen & Toubro",
    logo: "/images/clients/larsen-toubro-on-dark.png",
    logoOnLight: "/images/clients/larsen-toubro-on-light.png",
  },
  {
    name: "Branch of Hyundai Engineering & Contracting Co.",
    shortName: "Hyundai Engineering",
    logo: "/images/clients/hyundai-engineering-on-dark.png",
    logoOnLight: "/images/clients/hyundai-engineering-on-light.png",
  },
  {
    name: "Elsewedy Electric Power Systems Projects",
    shortName: "Elsewedy Electric",
    logo: "/images/clients/elsewedy-electric-v3.png",
    logoOnLight: "/images/clients/elsewedy-electric-on-light.png",
  },
  {
    name: "Natco Logistics Services Company",
    shortName: "NATCO",
    logo: "/images/clients/natco-on-dark.png",
    logoOnLight: "/images/clients/natco-on-light.png",
  },
  {
    name: "SANY Alameriah for Contracting Co",
    shortName: "SANY Alameriah",
    logo: "/images/clients/sany-alameriah-on-dark.png",
    logoOnLight: "/images/clients/sany-alameriah-on-light.png",
  },
  {
    name: "NEOM",
    shortName: "NEOM",
    logo: "/images/clients/neom.png",
    logoOnLight: "/images/clients/neom-on-light.png",
  },
  {
    name: "Muqawil",
    shortName: "Muqawil",
    logo: "/images/clients/muqawil-on-dark.png",
    logoOnLight: "/images/clients/muqawil-on-light.png",
  },
];
