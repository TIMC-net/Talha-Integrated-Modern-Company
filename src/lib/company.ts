export const company = {
  name: "TALHA INTEGRATED MODERN COMPANY",
  shortName: "TALHA",
  tagline: "ALL WORKS UNDER ONE ROOF",
  phone: "+966 13 000 0000",
  mobile: "+966 50 000 0000",
  email: "info@talhaimc.com",
  website: "https://www.talhaimc.com",
  location: "Kingdom of Saudi Arabia",
  established: "2010",
};

export const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  {
    label: "SERVICES",
    href: "#",
    children: [
      { label: "Scaffolding", href: "/services/scaffolding" },
      { label: "Manpower Supply", href: "/services/manpower" },
      { label: "Civil Division", href: "/services/civil" },
      { label: "Mechanical Division", href: "/services/mechanical" },
      { label: "Materials Supply", href: "/services/materials" },
      { label: "Equipment Rental", href: "/services/equipment" },
    ],
  },
  {
    label: "PROJECTS",
    href: "#",
    children: [
      { label: "Ongoing Projects", href: "/projects/ongoing" },
      { label: "Completed Projects", href: "/projects/completed" },
    ],
  },
  { label: "CLIENTS", href: "/clients" },
  { label: "CONTACT US", href: "/contact" },
];

export const featureCards = [
  {
    title: "CIVIL & MECHANICAL WORKS",
    text: "All services are precisely and professionally executed utilizing the suitable resources and applying latest technologies.",
    href: "/services/civil",
    icon: "/images/civil.svg",
  },
  {
    title: "EQUIPMENT RENTAL",
    text: "Looking for Equipment and heavy equipment rental in Saudi? Talha offers a large choice of high-quality, robust, and efficient heavy equipment.",
    href: "/services/equipment",
    icon: "/images/equipment.svg",
  },
  {
    title: "SCAFFOLDING SERVICES",
    text: "TALHA INTEGRATED MODERN COMPANY provides scaffolding solutions with skilled teams for industrial and construction projects across Saudi Arabia.",
    href: "/services/scaffolding",
    icon: "/images/scaffolding.svg",
  },
  {
    title: "MANPOWER SUPPLY",
    text: "We provide recruitment solutions and manpower supply to the oil & gas industry and construction industry. We are also engaged in skilled workforce solutions.",
    href: "/services/manpower",
    icon: "/images/manpower.svg",
  },
];

export const slides = [
  {
    title: "TALHA INTEGRATED MODERN COMPANY",
    text: "A fast growing equipment rental, heavy lifting, material supply, trading, scaffolding, civil works and support service company based in Kingdom of Saudi Arabia.",
    href: "/about",
    image: "/images/header-scrap.jpg",
  },
  {
    title: "HEAVY EQUIPMENT RENTAL",
    text: "Looking for Equipment and heavy equipment rental in Saudi? Talha offers a large choice of high-quality, robust, and efficient heavy equipment for rental.",
    href: "/services/equipment",
    image: "/images/civil-construction.jpg",
  },
  {
    title: "SCAFFOLDING",
    text: "At TALHA, we are one of the leading providers of scaffolding solutions in the region.",
    href: "/services/scaffolding",
    image: "/images/header-scaffolding.jpg",
  },
  {
    title: "CIVIL DIVISION",
    text: "The Civil Construction division of Talha has dedicated, professional & experienced engineers, who are committed to convert ideas into action.",
    href: "/services/civil",
    image: "/images/header-contracting.jpg",
  },
];

export const whoWeAre = [
  {
    id: "mission",
    title: "OUR MISSION",
    content: [
      "To provide our clients with timely, cost effective and comprehensive Industrial solutions by integrating the latest in techniques, tools and qualified personnel for global competitiveness. To be a dynamic and world class technology leader in providing Innovative solutions to the global market.",
      "To maintain a strong economic platform through sound financial practices in support of these goals. To build strategic partnerships with our customers through a variety of service options. Offer our employees opportunities for growth through participation, achievement, recognition and reward.",
    ],
  },
  {
    id: "safety",
    title: "SAFETY POLICY",
    content: [
      "Safety, Health and Wellbeing of people, accident prevention and the protection of the environment are fundamental principles of Talha Integrated Modern Company. Our staff are committed to communicate and implement all regulation and instruction to enable work to be carried out safely.",
      "All of our workers are required to report to our safety in-charge the existence of any conditions or situation which may become a hazard in special or unusual circumstances.",
      "The company has a health and safety program in order to eliminate accidents at job sites. This program is implemented by arranging safety awareness meetings weekly and monthly.",
    ],
  },
  {
    id: "quality",
    title: "QUALITY POLICY",
    content: [
      "The quality policy is defined with the objective to achieve customer satisfaction. The policy is communicated to all levels of employees in the organization to ensure their commitment to quality. It is our quality policy to develop and implement Quality system standards to improve product quality performance and overall effectiveness of the system.",
      "To develop the skills of our employees, great emphasis is placed on structured training programs and utilizing only qualified personnel in order to improve overall performance.",
      "We are a multidisciplinary team of professionals that work in coordination to position, consolidate and maintain our corporate image and prestige. We add value for our customers by anticipating and identifying their needs and providing cost-effective solutions and services.",
    ],
  },
  {
    id: "maintenance",
    title: "GENERAL & FACILITY MAINTENANCE",
    content: [
      "Handling all types of short-form or long-form plant maintenance works related to Civil, Electrical, and Mechanical disciplines. Removal of ground weeds and waste disposal from plant facilities. Executing routine cleaning of office, sanitary and other facilities including material supply.",
    ],
  },
];

export const servicesContent: Record<
  string,
  {
    title: string;
    breadcrumb: string;
    intro: string;
    bannerImage?: string;
    bannerTitle?: string;
    image?: string;
    body: string[];
    listItems?: string[];
  }
> = {
  scaffolding: {
    title: "Scaffolding Works",
    breadcrumb: "SCAFFOLDING WORKS",
    intro: "Scaffolding Works",
    bannerImage: "/images/header-scaffolding.jpg",
    image: "/images/scaffolding.jpg",
    body: [
      "At TALHA, we are one of the leading providers of scaffolding solutions in the region. Our experience and expertise in the design, engineering, delivery and maintenance of our systems has set the highest industry standards for quality and safety. Our innovative approach and skilled qualified scaffolding personnel develop the right solution for every project and ensures production efficiency, cost effectiveness and on-time completion.",
    ],
  },
  manpower: {
    title: "Manpower Supply",
    breadcrumb: "MANPOWER SUPPLY",
    intro: "Manpower Supply",
    bannerImage: "/images/header-manpower.jpg",
    image: "/images/manpower-supply.jpg",
    body: [
      "We successfully supply manpower and labor services to various industries. Our manpower supply services always help in recruiting the right candidates for the prescribed jobs in various companies. This helps in saving time, energy and our client's money. Our manpower and labor supply services cater to the requirements of industries such as Engineering, Automobile and Pharmaceutical. Before we provide the required manpower or labor to our customer, we check the candidates on following basis:",
    ],
    listItems: [
      "Exact documentation",
      "Behavioral interviews",
      "Training",
      "Reference checking",
      "Legal Status.",
    ],
  },
  civil: {
    title: "CIVIL DIVISION",
    breadcrumb: "CIVIL DIVISION",
    intro: "CIVIL DIVISION",
    bannerImage: "/images/header-contracting.jpg",
    image: "/images/civil-construction.jpg",
    body: [
      "The Civil Construction division of Talha has dedicated, professional & experienced engineers, who are committed to convert ideas into action. We not only provide quality services in the civil construction field but also maintain relationships with our customers. Clients of small and big magnitude, private and government and others with their specifications are served by Talha. Some of the industries we serve are Construction of Industrial, Commercial & Residential Buildings, Construction and Development of Roads, Drainage & Sewerage System, Utility Services etc. Construction of Industrial setup such as Factory Sheds, Building, Fire Stations, Foundation of Machines & Equipment, Cooling Tower System etc. Construction of Malls and Shopping Complex including construction of all type Interior Jobs.",
    ],
  },
  mechanical: {
    title: "Mechanical Division",
    breadcrumb: "Mechanical Division",
    intro: "Mechanical Division",
    bannerImage: "/images/about-us-bg.jpg",
    image: "/images/manpower-supply.jpg",
    body: [
      "TALHA provides human resource solutions from many countries to the Saudi Arabia Market. We are totally committed to a culture of excellence and unwaveringly focused on maximum customer satisfaction. Our area of expertise in labour supply are professionally qualified and experienced Engineers, Skilled Workforce, Semi Skilled Technicians and unskilled labour.",
    ],
  },
  materials: {
    title: "Material Supply",
    breadcrumb: "Material Supply",
    intro: "Material Supply",
    bannerImage: "/images/header-contracting.jpg",
    bannerTitle: "Materials",
    body: [],
  },
  equipment: {
    title: "Equipment Rental",
    breadcrumb: "Equipment Rental",
    intro: "Equipment Rental",
    bannerImage: "/images/header-scrap.jpg",
    bannerTitle: "Equipments",
    body: [],
  },
};

export const materialProducts = [
  {
    title: "Safety & Lifting",
    image: "/images/materials/Safety-Harnesses-Full-Body-Harness.jpg",
    href: "/services/materials/safety-lifting",
  },
  {
    title: "Electrical",
    image: "/images/materials/Fire-Detection-Alarm-System.jpg",
    href: "/services/materials/electrical",
  },
  {
    title: "Mechanical",
    image: "/images/materials/Grooved-Fittings-Valves.jpg",
    href: "/services/materials/mechanical",
  },
  {
    title: "Compaction & Paving",
    image: "/images/materials/jakhammers.jpg",
  },
  {
    title: "Civil",
    image: "/images/materials/Constructions-Sand.jpg",
    href: "/services/materials/civil",
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
    description: "Civil Construction & Scaffolding",
    location: "Al Khobar, KSA",
  },
];

export const clients = [
  "SABIC",
  "Saudi Aramco",
  "TASNEE",
  "SWCC",
  "HADEED",
  "Worley",
  "ACC",
  "Industrial Partners",
];
