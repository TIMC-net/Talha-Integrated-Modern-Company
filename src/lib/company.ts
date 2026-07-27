export const company = {
  name: "TALHA INTEGRATED MODERN COMPANY",
  shortName: "TIMC",
  tagline: "General Contractor — Civil, Foundation & Energy",
  phone: "+966 13 000 0000",
  mobile: "+966 50 000 0000",
  email: "info@talhaimc.com",
  website: "https://www.talhaimc.com",
  location: "Kingdom of Saudi Arabia",
  established: "2010",
  /** Marked until TIMC confirms official contact details */
  contactPending: true,
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

/** Placeholder — replace with TIMC-approved Mission / Vision / Values copy */
export const whoWeAre = [
  {
    id: "mission",
    title: "Our Mission",
    content: [
      "To deliver disciplined general contracting across civil infrastructure, foundation engineering, and energy infrastructure — with integrated equipment support that keeps every project phase on schedule.",
      "Content pending from TIMC — final mission statement will replace this placeholder.",
    ],
  },
  {
    id: "vision",
    title: "Our Vision",
    content: [
      "To be a trusted Saudi contractor partner known for safe execution, technical clarity, and reliable delivery across the Kingdom.",
      "Content pending from TIMC — final vision statement will replace this placeholder.",
    ],
  },
  {
    id: "values",
    title: "Core Values",
    content: [
      "Safety first. Quality without compromise. Integrity in every commitment. Partnership with clients and crews. Continuous improvement on every site.",
      "Content pending from TIMC — final core values will replace this placeholder.",
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

/** Placeholder certifications — replace with official ISO / licenses / vendor regs */
export const certifications = [
  {
    id: "iso",
    title: "ISO Certifications",
    description:
      "ISO certificates will be listed here once confirmed by TIMC (e.g. quality, HSE, environmental).",
  },
  {
    id: "licenses",
    title: "Company Licenses",
    description:
      "Commercial and contractor licenses will be published after TIMC provides official documentation.",
  },
  {
    id: "vendor",
    title: "Vendor Registrations",
    description:
      "Client and agency vendor registrations will appear here once TIMC shares approved listings.",
  },
];

export const ongoingProjects = [
  {
    no: 1,
    name: "Heat Exchanger Piping Works",
    client: "Industrial Client",
    contractor: "Main Contractor",
    description: "Piping Works",
    location: "Jubail – 1, KSA",
  },
  {
    no: 2,
    name: "Chiller Piping Works",
    client: "Oil & Gas Client",
    contractor: "Holdings Partner",
    description: "Structural & Piping Works",
    location: "Eastern Province, KSA",
  },
  {
    no: 3,
    name: "Circular Platform for Vertical Vessel",
    client: "Engineering Consultant",
    contractor: "Project Partner",
    description: "Structural & Circular Platforms",
    location: "Jubail Light Industry, KSA",
  },
  {
    no: 4,
    name: "LOTO Stations Fabrication",
    client: "Petrochemical Client",
    contractor: "Talha IMC",
    description: "Customized Fabrication",
    location: "Jubail Support Industry, KSA",
  },
];

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
