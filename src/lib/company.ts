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

export const ongoingProjects = [
  {
    no: 1,
    name: "Reinforcement of Rabigh Power Plant 1.2 GW SCC6-5000F 3+1 Project",
    client: "Power Sector Client",
    contractor: "TIMC",
    description: "Power plant reinforcement works",
    location: "Rabigh, KSA",
  },
  {
    no: 2,
    name: "AR RASS Solar PV Independent Power Plant Project",
    client: "Renewable Energy Client",
    contractor: "TIMC",
    description: "Solar PV IPP support works",
    location: "Ar Rass, KSA",
  },
  {
    no: 3,
    name: "Rabigh 2 IPP Power Plant (Al-Mourjan CCPP)",
    client: "Power Sector Client",
    contractor: "TIMC",
    description: "Combined-cycle power plant works",
    location: "Rabigh, KSA",
  },
  {
    no: 4,
    name: "Starah Independent Power Plant — 2GW Onshore Wind Project",
    client: "Renewable Energy Client",
    contractor: "TIMC",
    description: "Onshore wind IPP support works",
    location: "Saudi Arabia",
  },
  {
    no: 5,
    name: "Al Shuaibah 1 & 2 Solar PV IPP",
    client: "Renewable Energy Client",
    contractor: "TIMC",
    description: "Solar PV independent power plant works",
    location: "Al Shuaibah, KSA",
  },
  {
    no: 6,
    name: "Neom Coast Guard Residential Village (CGRV)",
    client: "NEOM",
    contractor: "TIMC",
    description: "Residential village construction support",
    location: "NEOM, KSA",
  },
  {
    no: 7,
    name: "Design and Construction of Source OHTL Supporting 1A Substation",
    client: "Power / Utility Client",
    contractor: "TIMC",
    description: "OHTL and substation support works",
    location: "Saudi Arabia",
  },
];

/** Placeholder completed projects — replace when TIMC provides official list */
export const completedProjects = [
  {
    no: 1,
    name: "Steam Header Project",
    client: "Petrochemical Client",
    contractor: "Talha IMC",
    description: "Detailed Engineering",
    location: "Jubail – 1, KSA",
  },
  {
    no: 2,
    name: "Repair & Installation of Access Beam",
    client: "Steel Plant Client",
    contractor: "Project Partner",
    description: "Structural Works",
    location: "Jubail – 1, KSA",
  },
  {
    no: 3,
    name: "Turnaround Major Maintenance",
    client: "Industrial Client",
    contractor: "Project Partner",
    description: "Civil / Piping / Mechanical Works",
    location: "Jubail – 1, KSA",
  },
  {
    no: 4,
    name: "Raw Water Line – Re-routing Works",
    client: "Oil & Gas Client",
    contractor: "Main Contractor",
    description: "Civil & Piping",
    location: "Dhahran, KSA",
  },
  {
    no: 5,
    name: "Road & Repair Works",
    client: "Industrial Client",
    contractor: "Talha IMC",
    description: "Civil & Asphalt",
    location: "Jubail Port, KSA",
  },
  {
    no: 6,
    name: "Desalination Project – Walls & Ceilings",
    client: "Utility Client",
    contractor: "Main Contractor",
    description: "Civil Construction",
    location: "Al Khobar, KSA",
  },
];

export type ClientEntry = {
  name: string;
  /** Optional logo path under /public — leave empty until TIMC provides logos */
  logo?: string;
};

export const clients: ClientEntry[] = [
  { name: "SABIC" },
  { name: "Saudi Aramco" },
  { name: "TASNEE" },
  { name: "SWCC" },
  { name: "HADEED" },
  { name: "Worley" },
  { name: "ACC" },
  { name: "Industrial Partners" },
];
