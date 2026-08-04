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
  /** Cover photo for project cards only */
  coverImage?: string;
  /** Extended dossier — detail page when present */
  details?: ProjectDetails;
};

/** Extended write-up + gallery for a project detail page */
export type ProjectDetails = {
  /** Optional longer title override for the detail page */
  fullName?: string;
  /**
   * Hero / top banner image on the detail page only.
   * Independent from `coverImage` on the listing card.
   */
  heroImage?: string;
  overview: string;
  scopeItems: string[];
  standardsNote?: string;
  images: string[];
};

/** Ongoing projects — from TIMC Ongoing Project List (Excel + detail dossiers) */
export const ongoingProjects: ListedProject[] = [
  {
    no: 1,
    name: "Starah Central Road Access Project",
    description: "Access Roads & Pads",
    scope:
      "Supply and place access roads and supply and execute structure pad",
    sponsor: "Civil & Electrical Projects Contracting Co.",
    client: "Civil & Electrical Projects Contracting Co.",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/1/cover-v3.jpg",
    details: {
      fullName: "Starah Central Road Access Project",
      heroImage: "/images/projects/ongoing/1/details-hero-v1.jpg",
      overview:
        "The project involves the construction and preparation of civil infrastructure works for the project site in full compliance with Saudi Electricity Company (SEC) standards. The scope includes the supply of all required materials, earthworks, backfilling, grading, and compaction to ensure a stable foundation for the project facilities.",
      scopeItems: [
        "Construction of Access Roads in normal soil conditions, including excavation, grading, supply of approved fill material, placement, and compaction.",
        "Construction of Structural Pads (40 m × 40 m), including the supply and placement of approved backfill material with a total thickness of 300 mm, compacted in two layers of 150 mm each, in accordance with SEC specifications.",
        "Construction of Finger Roads, including supply, placement, grading, and 300 mm backfilling compacted in two layers of 150 mm each, meeting all SEC quality and compaction requirements.",
        "Execution of all earthworks, leveling, and compaction using approved equipment and testing procedures to achieve the required density and performance standards.",
      ],
      standardsNote:
        "All works are executed in accordance with the latest Saudi Electricity Company (SEC) standards, ensuring quality, durability, safety, and timely project completion.",
      images: [
        "/images/projects/ongoing/1/gallery-1.jpg",
        "/images/projects/ongoing/1/gallery-2.jpg",
        "/images/projects/ongoing/1/gallery-3.jpg",
      ],
    },
  },
  {
    no: 2,
    name: "Starah Independent Power Plant — 2GW Onshore Wind Project",
    description: "RC Pile Foundations",
    scope:
      "RC bored cast-in-situ pile foundations for suspension and tension towers",
    sponsor: "Civil & Electrical Projects Contracting Co.",
    client: "Civil & Electrical Projects Contracting Co.",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/2/cover-v2.jpg",
    details: {
      fullName: "Starah Independent Power Plant — 2GW Onshore Wind Project",
      heroImage: "/images/projects/ongoing/2/12.jpg",
      overview:
        "The project involves the supply, construction, and execution of reinforced concrete (RC) bored cast-in-situ pile foundations for both Suspension Towers and Tension Towers, in full compliance with project specifications and international construction standards.",
      scopeItems: [
        "Supply and construction of 800 mm diameter bored cast-in-situ piles with a depth of 25 meters, including boring, temporary casing, dewatering, reinforcement steel installation, concrete placement, and complete execution.",
        "Supply and construction of 1,000 mm diameter bored cast-in-situ piles with a depth of 25 meters, including boring, temporary casing, dewatering, reinforcement steel installation, concrete placement, and complete execution.",
        "Pile head cutting and disposal for both 800 mm and 1,000 mm diameter piles, ensuring the pile heads are trimmed to the specified elevation and all excavated materials are safely removed from the site.",
        "Execution of all piling works using specialized equipment, strict quality control procedures, and approved construction methodologies to ensure structural integrity, safety, and long-term performance.",
      ],
      standardsNote:
        "All piling activities are carried out in accordance with the approved engineering drawings, project specifications, and applicable international standards, delivering durable and reliable foundations for high-voltage transmission tower infrastructure.",
      images: [
        "/images/projects/ongoing/2/01.jpg",
        "/images/projects/ongoing/2/02.jpg",
        "/images/projects/ongoing/2/03.jpg",
        "/images/projects/ongoing/2/04.jpg",
        "/images/projects/ongoing/2/05.jpg",
        "/images/projects/ongoing/2/06.jpg",
        "/images/projects/ongoing/2/07.jpg",
        "/images/projects/ongoing/2/08.jpg",
        "/images/projects/ongoing/2/09.jpg",
        "/images/projects/ongoing/2/10.jpg",
        "/images/projects/ongoing/2/11.jpg",
        "/images/projects/ongoing/2/12.jpg",
      ],
    },
  },
  {
    no: 3,
    name: "Reinforcement of Rabigh Power Plant 1.2GW SCC6-5000F 3+1 Project",
    description: "Generator & Equipment",
    scope:
      "Power generation solutions, generator supply & maintenance, and heavy equipment rental",
    sponsor: "Branch of Elsewedy Electric Power Systems Projects",
    client: "Branch of Elsewedy Electric Power Systems Projects",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/3/cover-v2.jpg",
    details: {
      fullName:
        "Reinforcement of Rabigh Power Plant 1.2GW SCC6-5000F 3+1 Project",
      heroImage: "/images/projects/ongoing/3/03.jpg",
      overview:
        "Our team successfully delivered comprehensive power generation, heavy equipment rental, and maintenance services for major industrial and infrastructure projects, providing reliable solutions that ensured uninterrupted operations, high safety standards, and efficient project execution.",
      scopeItems: [
        "Power Generation Solutions: supply, installation, testing, and commissioning of 1 MW diesel power generators; configuration in synchronized operation as the primary power supply; installation of a standby generator for continuous backup; complete electrical integration, synchronization, testing, and commissioning per project specifications.",
        "Generator Load Bank Testing: supply of 2.5 MVA load banks for generator performance and load testing; comprehensive load testing coordinated with the client’s electrical team; performance verification, operational testing, and commissioning by experienced engineers.",
        "Generator Supply & Maintenance: more than 100 diesel generators supplied for various Elsewedy Electric Company projects (50 kVA to 1,000 kVA); full generator mobilization, installation, technical support, and operational assistance; Annual Maintenance Agreements (AMA) for tower lighting systems — preventive maintenance, scheduled inspections, corrective maintenance, emergency breakdown support, and performance optimization.",
        "Heavy Equipment Rental: boom trucks (7 to 15 ton), forklifts (10 to 25 ton), and mobile cranes (25 to 300 ton); certified operators, equipment mobilization and demobilization, preventive maintenance and 24/7 technical support, and compliance with international HSE standards.",
      ],
      standardsNote:
        "Through integrated power generation and heavy equipment solutions, we delivered safe, reliable, and cost-effective services that supported major industrial and infrastructure projects while maintaining the highest standards of quality, operational excellence, and customer satisfaction.",
      images: [
        "/images/projects/ongoing/3/01.jpg",
        "/images/projects/ongoing/3/02.jpg",
        "/images/projects/ongoing/3/03.jpg",
        "/images/projects/ongoing/3/04.jpg",
        "/images/projects/ongoing/3/05.jpg",
        "/images/projects/ongoing/3/06.jpg",
        "/images/projects/ongoing/3/07.jpg",
      ],
    },
  },
  {
    no: 4,
    name: "FA20 Power and Water Project PE-318 — Sabia Jazan",
    description: "Heavy Equipment & Power",
    scope:
      "Heavy equipment rental, power generation, and maintenance solutions",
    sponsor: "Mkhavi Arabia Contracting Company",
    client: "Mkhavi Arabia Contracting Company",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/4/cover-v2.jpg",
    details: {
      fullName: "FA20 Power and Water Project PE-318 — Sabia Jazan",
      heroImage: "/images/projects/ongoing/4/03.jpg",
      overview:
        "Successfully delivered comprehensive heavy equipment rental, power generation, and maintenance solutions to Mkhavi Arabia Contracting in support of major construction and infrastructure projects across Saudi Arabia.",
      scopeItems: [
        "Supply of boom trucks (7 to 15 ton), forklifts (5 to 25 ton), and mobile cranes (25 to 200 ton) to meet diverse project lifting and material handling requirements.",
        "Provision of all equipment with TÜV-certified operators, ensuring safe, efficient, and fully compliant site operations.",
        "Maintenance of all equipment to the highest standards through routine inspections, preventive maintenance, and rapid technical support — maximizing reliability and minimizing downtime.",
        "Supply of more than 30 diesel generator sets (50 kVA to 750 kVA), providing dependable temporary power for construction activities and critical site operations.",
        "Annual Maintenance Agreements (AMA) for tower lighting systems, including scheduled preventive maintenance, routine inspections, corrective maintenance, emergency breakdown support, and prompt technical assistance for continuous operational reliability.",
      ],
      standardsNote:
        "Throughout the project, our commitment to quality, safety, and operational excellence enabled Mkhavi Arabia Contracting to maintain uninterrupted project progress while meeting demanding construction schedules and the highest industry standards.",
      images: [
        "/images/projects/ongoing/4/01.jpg",
        "/images/projects/ongoing/4/02.jpg",
        "/images/projects/ongoing/4/03.jpg",
        "/images/projects/ongoing/4/04.jpg",
        "/images/projects/ongoing/4/05.jpg",
      ],
    },
  },
  {
    no: 5,
    name: "Al Shuaibah 1 & 2 Solar Photovoltaic Independent Power Plant (IPP)",
    description: "Generator & Equipment",
    scope:
      "Power generation, heavy equipment rental, and tower light maintenance for solar IPP construction",
    sponsor: "Tran Ji Trading and Contracting Company",
    client: "Tran Ji Trading and Contracting Company",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/5/cover-v2.jpg",
    details: {
      fullName:
        "Al Shuaibah 1 & 2 Solar Photovoltaic Independent Power Plant (IPP)",
      heroImage: "/images/projects/ongoing/5/02.jpg",
      overview:
        "Successfully delivered comprehensive power generation, heavy equipment rental, and maintenance services for the Al Shuaibah 1 & 2 Solar Photovoltaic Independent Power Plant (IPP) in support of Tran Ji Trading Company during the construction phase.",
      scopeItems: [
        "Power Generation: supplied 50+ diesel generator sets (50 kVA to 1,000 kVA) for temporary construction and site power; installation, commissioning, operation, and technical support; 24/7 emergency breakdown support and preventive maintenance.",
        "Tower Light Maintenance: Annual Maintenance Agreement (AMA) covering scheduled preventive maintenance, routine inspections, corrective maintenance, emergency technical support, and performance optimization for maximum reliability and uptime.",
        "Heavy Equipment Supply: boom trucks (7 ton and 10 ton), forklifts (10, 16, and 25 ton), and mobile cranes (25, 50, and 100 ton).",
        "Support Services: TÜV-certified operators, equipment mobilization and demobilization, preventive maintenance and routine servicing, 24/7 technical support and emergency response, and compliance with project HSE and quality standards.",
      ],
      standardsNote:
        "Through our commitment to quality, safety, and operational excellence, we ensured reliable equipment availability, uninterrupted project progress, and efficient execution of one of Saudi Arabia’s landmark renewable energy developments.",
      images: [
        "/images/projects/ongoing/5/01.jpg",
        "/images/projects/ongoing/5/02.jpg",
      ],
    },
  },
  {
    no: 6,
    name: "Expansion of the Rabigh 2 IPP Power Plant — Additional 2200MW",
    description: "Generator & Services",
    scope:
      "Temporary power generation, heavy equipment rental, and maintenance services",
    sponsor:
      "Joint Venture of Branch of Elsewedy Electric and Branch of Sinohydro Corporation Limited",
    client: "JV Elsewedy Electric / Sinohydro Corporation Limited",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/6/cover-v3.jpg",
    details: {
      fullName:
        "Expansion of the Rabigh 2 IPP Power Plant by an Additional Capacity of 2200MW",
      heroImage: "/images/projects/ongoing/6/07-v2.jpg",
      overview:
        "Successfully delivered integrated temporary power generation, heavy equipment rental, and maintenance services in support of a large-scale renewable energy and infrastructure project. Our comprehensive solutions ensured uninterrupted site operations, safe material handling, and efficient project execution throughout the construction period.",
      scopeItems: [
        "Power Generation Services: supplied 50+ diesel generator sets (50 kVA to 1,000 kVA) for construction activities, site offices, workshops, accommodation camps, and critical facilities; installation, commissioning, operation, routine servicing, and technical support; 24/7 emergency breakdown response and preventive maintenance.",
        "Tower Light Services: supply and installation of mobile tower lights for night-time operations; Annual Maintenance Agreement (AMA) covering scheduled inspections and preventive maintenance; corrective maintenance, emergency repairs, and on-site technical support for continuous lighting performance.",
        "Heavy Equipment Rental: boom trucks (7 and 10 ton), forklifts (10, 16, and 25 ton), and mobile cranes (25, 50, and 100 ton) supporting lifting, logistics, material handling, and construction activities across the project site.",
        "Operational Support: qualified operators for all equipment; equipment mobilization and demobilization; preventive maintenance and routine inspections; on-site technical support and rapid response; compliance with project HSE requirements and international quality standards.",
      ],
      standardsNote:
        "Our integrated temporary power and heavy equipment solutions supported uninterrupted site operations and efficient project execution throughout the construction period.",
      images: [
        "/images/projects/ongoing/6/01-v2.jpg",
        "/images/projects/ongoing/6/02-v2.jpg",
        "/images/projects/ongoing/6/03-v2.jpg",
        "/images/projects/ongoing/6/04-v2.jpg",
        "/images/projects/ongoing/6/05-v2.jpg",
        "/images/projects/ongoing/6/06-v2.jpg",
        "/images/projects/ongoing/6/07-v2.jpg",
      ],
    },
  },
  {
    no: 7,
    name: "Construction of 13.8kV Substation for National Aquaculture Group (NAQUA) — Allith City",
    description: "Generator & Equipment",
    scope:
      "Temporary power generation, heavy equipment rental, and maintenance services",
    sponsor: "Branch of Elsewedy Electric Power Systems Projects",
    client: "Branch of Elsewedy Electric Power Systems Projects",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/7/cover-v2.jpg",
    details: {
      fullName:
        "Construction of 13.8kV Substation for National Aquaculture Group (NAQUA), Allith City",
      heroImage: "/images/projects/ongoing/7/02.jpg",
      overview:
        "Successfully delivered integrated temporary power generation, heavy equipment rental, and maintenance services in support of a large-scale renewable energy and infrastructure project. Our comprehensive solutions ensured uninterrupted site operations, safe material handling, and efficient project execution throughout the construction period.",
      scopeItems: [
        "Power Generation Services: supplied 20 diesel generator sets (50 kVA to 1,000 kVA) for construction activities, site offices, workshops, accommodation camps, and critical facilities; installation, commissioning, operation, routine servicing, and technical support; 24/7 emergency breakdown response and preventive maintenance.",
        "Heavy Equipment Rental: boom trucks (7 and 10 ton), forklifts (10, 16, and 25 ton), and mobile cranes (25, 50, and 100 ton) supporting lifting, logistics, material handling, and construction activities across the project site.",
        "Operational Support: qualified operators for all equipment; equipment mobilization and demobilization; preventive maintenance and routine inspections; on-site technical support and rapid response; compliance with project HSE requirements and international quality standards.",
      ],
      standardsNote:
        "Our integrated temporary power and heavy equipment solutions supported uninterrupted site operations and efficient project execution throughout the construction period.",
      images: [
        "/images/projects/ongoing/7/01.jpg",
        "/images/projects/ongoing/7/02.jpg",
      ],
    },
  },
  {
    no: 8,
    name: "Design & Construction of Source OHTL Supporting 1A Substation — Jazan",
    description: "Access Road & Pads",
    scope:
      "Construction of access roads, finger roads, and structural pads",
    sponsor: "Alfanar Company",
    client: "Alfanar Company",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/8/cover-v2.jpg",
    details: {
      fullName:
        "Design & Construction of Source OHTL Supporting 1A Substation — Jazan",
      heroImage: "/images/projects/ongoing/8/02.jpg",
      overview:
        "Construction of high-quality access roads, finger roads, and structural pads for power, industrial, and infrastructure works in full compliance with approved engineering designs, project specifications, and Saudi Electricity Company (SEC) standards.",
      scopeItems: [
        "Access Roads & Finger Roads (5 m wide, normal soil): site preparation and ground scarification; cutting and filling to approved finished levels; road embankments with 1:4 side slopes; ground compaction to minimum 95% Modified Proctor Density (MDD); supply, placement, and compaction of Sub-base A-1A material; two 150 mm surface course layers with watering, grading, leveling, and compaction of each layer to 95% density; final profiling and finishing to approved drawings and SEC standards; quality control, testing, and inspection throughout construction.",
        "40 m × 40 m Structural Pads (normal soil, 1:4 side slopes): site clearing and ground scarification; cutting and filling to design levels; subgrade compaction to 95% density; supply and placement of Sub-base A-1A material; two 150 mm surface course layers with layer-by-layer watering, grading, and compaction; final shaping, profiling, and finishing; complete testing and QA for equipment-ready foundation pads.",
        "45 m × 45 m Structural Pads (normal soil, 1:4 side slopes): ground preparation, scarification, and site grading; excavation and filling as required; subgrade compaction to 95% density; approved Sub-base A-1A material; two compacted 150 mm surface course layers; watering, leveling, grading, and compaction of each layer; final surface profiling per approved drawings and specifications for pads ready for equipment installation.",
      ],
      standardsNote:
        "All works are executed in accordance with approved engineering drawings and specifications, SEC standards, approved materials, project QA/QC procedures, HSE regulations, and industry best practices — delivering durable infrastructure for substations, power plants, renewable energy facilities, and industrial developments across Saudi Arabia.",
      images: [
        "/images/projects/ongoing/8/01.jpg",
        "/images/projects/ongoing/8/02.jpg",
        "/images/projects/ongoing/8/03.jpg",
        "/images/projects/ongoing/8/04.jpg",
      ],
    },
  },
  {
    no: 9,
    name: "Design & Construction of Source OHTL Supporting 1A Substation — Jazan",
    description: "Structure Pads",
    scope:
      "Construction of structural pads in normal soil for OHTL / substation support works",
    sponsor: "Engineering and Construction Company",
    client: "Engineering and Construction Company",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/9/cover-v2.jpg",
    details: {
      fullName:
        "Design & Construction of Source OHTL Supporting 1A Substation — Structure Pads (Jazan)",
      heroImage: "/images/projects/ongoing/9/details-hero-v1.jpg",
      overview:
        "Delivery of structural foundation pads for the Source OHTL supporting 1A substation package in the Jazan region. Works cover earthworks, fill placement, layer compaction, and finished pad surfaces prepared to receive tower and equipment foundations in normal soil conditions, aligned with approved engineering drawings and SEC civil requirements.",
      scopeItems: [
        "Site clearing, setting-out, and ground scarification of pad footprints in normal soil prior to earthworks.",
        "Cutting and filling to approved finished levels, with embankment formation using design side slopes suitable for heavy equipment loads.",
        "Subgrade preparation and compaction to a minimum of 95% Modified Proctor Density (MDD), verified through field density testing.",
        "Supply, placement, and compaction of approved Sub-base A-1A material to the specified thickness across each structural pad.",
        "Construction of compacted surface course layers (typically two 150 mm lifts) with watering, grading, leveling, and compaction of each lift to 95% density.",
        "Final shaping, profiling, and finishing of pad surfaces ready for subsequent foundation and tower erection works.",
        "Quality control, survey checks, and progressive inspection records throughout construction in coordination with the client’s supervision team.",
      ],
      standardsNote:
        "Executed under approved engineering drawings, SEC specifications, project QA/QC procedures, and HSE requirements — delivering durable foundation pads for OHTL and substation infrastructure in the Jazan region.",
      images: [
        "/images/projects/ongoing/9/site-01.jpg",
        "/images/projects/ongoing/9/site-02.jpg",
        "/images/projects/ongoing/9/site-03.jpg",
        "/images/projects/ongoing/9/site-04.jpg",
        "/images/projects/ongoing/9/site-05.jpg",
      ],
    },
  },
  {
    no: 10,
    name: "380kV OHTL from Jillah BSP #9063 to Layla BSP #9049",
    description: "Access Road & Pads",
    scope:
      "Construction of access roads and structure pads along the 380kV OHTL corridor",
    sponsor:
      "National Contracting Company Ltd. (Transmission & Distribution Division)",
    client: "National Contracting Company Ltd.",
    contractor: "TIMC",
    location: "KSA",
    coverImage: "/images/projects/ongoing/10/cover-v2.jpg",
    details: {
      fullName:
        "380kV OHTL from Jillah BSP #9063 to Layla BSP #9049 — Access Roads & Structure Pads",
      heroImage: "/images/projects/ongoing/10/details-hero-v1.jpg",
      overview:
        "Civil support works for the 380kV overhead transmission line corridor linking Jillah Bulk Supply Point (BSP #9063) and Layla Bulk Supply Point (BSP #9049). The package focuses on building safe, all-weather site access and durable structure pads that enable tower foundation and stringing activities under National Contracting Company Ltd. (Transmission & Distribution) supervision.",
      scopeItems: [
        "Construction of access roads and finger roads along the OHTL alignment, including scarification, cut-and-fill earthworks, and embankment formation to design levels.",
        "Road layer works with approved fill / Sub-base A-1A material, multi-lift compaction to 95% MDD, watering, grading, and final surface profiling for construction traffic.",
        "Structure pad construction at tower locations in normal soil, including site preparation, subgrade compaction, sub-base placement, and finished surface course layers ready for foundation crews.",
        "Drainage-aware grading and edge finishing so pads and roads remain trafficable during construction, with spoil management and site housekeeping.",
        "Survey control, material acceptance, density testing, and joint progressive inspection with the client and SEC-aligned quality requirements.",
        "Equipment-supported execution (graders, rollers, water trucks, and material handling plant) with certified operators and continuous HSE controls along the corridor.",
      ],
      standardsNote:
        "Works follow approved route and civil drawings, NCC / SEC project specifications, QA/QC hold points, and HSE rules for transmission line construction across the Jillah–Layla corridor.",
      images: [
        "/images/projects/ongoing/10/site-01.jpg",
        "/images/projects/ongoing/10/site-02.jpg",
        "/images/projects/ongoing/10/site-03.jpg",
      ],
    },
  },
];

/** Completed projects — from TIMC “List of Completed Projects” (last 2 years) */
export const completedProjects: ListedProject[] = [
  {
    no: 1,
    name: "Jeddah Solar Power Project (300 MW) — Third Jeddah Industrial City",
    description: "Equipment & Generators",
    scope: "Supply of Equipment and Power Generators",
    sponsor: "Larsen & Toubro Limited Company",
    client: "Larsen & Toubro Limited Company",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 2,
    name: "Al Shuaibah 1 & 2 Solar Power Plant (2,631 MW)",
    description: "Equipment & Generators",
    scope: "Supply of Equipment and Power Generators",
    sponsor: "Branch of Hyundai Engineering & Contracting Co.",
    client: "Branch of Hyundai Engineering & Contracting Co.",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 3,
    name: "THE LINE – Civil & Infrastructure Works (NEOM)",
    description: "Equipment & Generators",
    scope: "Supply of Equipment and Power Generators",
    sponsor: "ABACUS International Co",
    client: "ABACUS International Co",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 4,
    name: "NEOM Al Khuraybah Infrastructure Development",
    description: "Equipment & Generators",
    scope: "Supply of Equipment and Power Generators",
    sponsor: "Gheed Najd Contracting Est",
    client: "Gheed Najd Contracting Est",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 5,
    name: "Sindalah Island Backbone Infrastructure",
    description: "Heavy Equipment",
    scope: "Supply of Heavy Equipment",
    sponsor: "Desert Eagle Contracting Co",
    client: "Desert Eagle Contracting Co",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 6,
    name: "Majma Housing Project – Residential Infrastructure Development",
    description: "Power Generators",
    scope: "Supply of Power Generators",
    sponsor: "Katerra Saudi Arabia Contracting Co",
    client: "Katerra Saudi Arabia Contracting Co",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 7,
    name: "Water Treatment System (WTS) – Water Treatment Plant Projects",
    description: "Heavy Equipment",
    scope: "Supply of Heavy Equipment",
    sponsor: "Memar Monif Contracting Est",
    client: "Memar Monif Contracting Est",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 8,
    name: "THE LINE – Civil & Infrastructure Works (NEOM)",
    description: "Heavy Equipment",
    scope: "Supply of Heavy Equipment",
    sponsor: "Prestige Rental Equipements CO",
    client: "Prestige Rental Equipements CO",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 9,
    name: "SANY Alameriah Precast Concrete Factory – Jeddah Industrial City 3",
    description: "Equipment & Generators",
    scope: "Supply of Equipment and Power Generators",
    sponsor: "SANY Alameriah for Contracting Co",
    client: "SANY Alameriah for Contracting Co",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 10,
    name: "Jabal Omar Development Project – Makkah",
    description: "Equipment & Generators",
    scope: "Supply of Equipment and Power Generators",
    sponsor: "Tahadi Lifter For Contracting Est",
    client: "Tahadi Lifter For Contracting Est",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 11,
    name: "Rabigh 2 Independent Power Plant (Rabigh 2 IPP)",
    description: "Heavy Equipment",
    scope: "Supply of Heavy Equipment",
    sponsor: "Taj Noori Contracting Est",
    client: "Taj Noori Contracting Est",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 12,
    name: "Sindalah Island Development – Infrastructure Works",
    description: "Heavy Equipment",
    scope: "Supply of Heavy Equipment",
    sponsor: "Ahmed Muhammad Al Mkhavi",
    client: "Ahmed Muhammad Al Mkhavi",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 13,
    name: "Al Shuaibah 1 & 2 Solar Photovoltaic (PV) Independent Power Plant (IPP)",
    description: "Equipment & Generators",
    scope: "Supply of Equipment and Power Generators",
    sponsor: "Tran Ji Trading and Contracting Company",
    client: "Tran Ji Trading and Contracting Company",
    contractor: "TIMC",
    location: "KSA",
    notes: "Completed",
  },
  {
    no: 14,
    name: "Reinforcement of Rabigh Power Plant — 1.2GW SCC6-5000F 3+1 Project",
    description: "Equipment & Generators",
    scope: "Supply of Equipment and Power Generators",
    sponsor: "ELSEWEDY Electric Power Systems Projects",
    client: "ELSEWEDY Electric Power Systems Projects",
    contractor: "TIMC",
    location: "KSA",
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
    name: "Alfanar",
    shortName: "Alfanar",
    logo: "/images/clients/alfanar.png",
  },
  {
    name: "Almajdouie Logistics Company L.L.C.",
    shortName: "Almajdouie",
    logo: "/images/clients/almajdouie.png",
  },
  {
    name: "Elsewedy Electric",
    shortName: "Elsewedy Electric",
    logo: "/images/clients/elsewedy-electric.png",
  },
  {
    name: "CEPCO",
    shortName: "CEPCO",
    logo: "/images/clients/cepco.png",
  },
  {
    name: "Energia",
    shortName: "Energia",
    logo: "/images/clients/energia.png",
  },
  {
    name: "Makhavi Machinery and Equipment Rental",
    shortName: "Makhavi",
    logo: "/images/clients/makhavi.png",
  },
  {
    name: "Larsen & Toubro Limited Construction",
    shortName: "Larsen & Toubro",
    logo: "/images/clients/larsen-toubro.png",
  },
  {
    name: "Gas Arabian Services",
    shortName: "GAS",
    logo: "/images/clients/gas-arabian.png",
  },
  {
    name: "SSQ",
    shortName: "SSQ",
    logo: "/images/clients/ssq.png",
  },
  {
    name: "Zamil Construction",
    shortName: "Zamil",
    logo: "/images/clients/zamil-construction.png",
  },
  {
    name: "SANY Alameriah Co.",
    shortName: "SANY Alameriah",
    logo: "/images/clients/sany-alameriah.png",
  },
  {
    name: "GPI",
    shortName: "GPI",
    logo: "/images/clients/gpi.png",
  },
  {
    name: "TranJi for Trading and Contracting Company",
    shortName: "TranJi",
    logo: "/images/clients/tranji.png",
  },
  {
    name: "SINOHYDRO",
    shortName: "SINOHYDRO",
    logo: "/images/clients/sinohydro.png",
  },
];
