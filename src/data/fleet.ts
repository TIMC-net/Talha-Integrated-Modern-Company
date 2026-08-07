export type FleetEquipment = {
  id: string;
  slug: string;
  name: string;
  /** Capacity / range from the rental blueprint */
  capacity: string;
  /** Short application label */
  application: string;
  /** Typical-use copy shown on the equipment detail view */
  description: string;
  image?: string;
};

export type FleetCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  items: FleetEquipment[];
};

/**
 * TIMC equipment rental catalogue — 7 categories from the Master Blueprint.
 */
export const fleetCategories: FleetCategory[] = [
  {
    id: "lifting",
    slug: "lifting-mobile-cranes",
    name: "Lifting & Mobile Cranes",
    description:
      "Mobile, rough-terrain, all-terrain, crawler, boom, tower and spider cranes for heavy and utility lifts.",
    items: [
      {
        id: "lc-mobile",
        slug: "mobile-crane",
        name: "Mobile Crane",
        capacity: "25–250 Ton",
        application: "General heavy lifting",
        description:
          "Truck-mounted mobile crane for general heavy lifts on prepared industrial and infrastructure sites. Fast mobilisation for equipment placement, structural loads and multi-purpose construction lifting.",
        image: "/images/equipment/categories/cranes/mobile-crane-v1.jpg",
      },
      {
        id: "lc-rt",
        slug: "rough-terrain-crane",
        name: "Rough Terrain Crane",
        capacity: "30–100 Ton",
        application: "Uneven terrain",
        description:
          "All-wheel-drive rough terrain crane designed for uneven, unprepared ground. Suited to remote sites, civil yards and projects where outriggers and site grades demand specialised mobility.",
        image: "/images/equipment/categories/cranes/rough-terrain-crane-v1.jpg",
      },
      {
        id: "lc-at",
        slug: "all-terrain-crane",
        name: "All Terrain Crane",
        capacity: "60–500 Ton",
        application: "Road/site lifting",
        description:
          "Road-legal all-terrain crane combining highway travel with high on-site lifting capacity. Used for larger industrial packages, plant installation and road-to-site heavy lifts.",
        image: "/images/equipment/categories/cranes/all-terrain-crane-v1.jpg",
      },
      {
        id: "lc-crawler",
        slug: "crawler-crane",
        name: "Crawler Crane",
        capacity: "80–600 Ton",
        application: "Mega projects",
        description:
          "Tracked crawler crane for sustained heavy lifts on mega-projects. Delivers stability and high capacity for structural erection, major plant packages and long-duration critical lifts.",
        image: "/images/equipment/categories/cranes/crawler-crane-v1.jpg",
      },
      {
        id: "lc-boom",
        slug: "boom-truck",
        name: "Boom Truck",
        capacity: "7–15 Ton",
        application: "Utility lifting",
        description:
          "Boom truck for utility and materials lifting at moderate tonnage. Ideal for day-to-day site logistics, smaller components and service works requiring rapid, flexible crane support.",
        image: "/images/equipment/categories/cranes/boom-truck-v1.jpg",
      },
      {
        id: "lc-tower",
        slug: "tower-crane",
        name: "Tower Crane",
        capacity: "Various",
        application: "High-rise",
        description:
          "Tower crane for high-rise and multi-storey construction. Provides continuous vertical lifting capacity for structure, formwork and materials over long project cycles.",
        image: "/images/equipment/categories/cranes/tower-crane-v1.jpg",
      },
      {
        id: "lc-spider",
        slug: "spider-crane",
        name: "Spider Crane",
        capacity: "2–10 Ton",
        application: "Confined spaces",
        description:
          "Compact spider crane for confined and restricted-access lifts. Moves into basements, plant rooms and tight industrial spaces where conventional mobile cranes cannot operate.",
        image: "/images/equipment/categories/cranes/spider-crane-v1.jpg",
      },
    ],
  },
  {
    id: "civil",
    slug: "civil-earthmoving-compaction",
    name: "Civil, Earthmoving & Compaction",
    description:
      "Excavators, dozers, loaders, graders, skid steers and rollers for earthworks and compaction packages.",
    items: [
      {
        id: "cv-exc",
        slug: "excavator",
        name: "Excavator",
        capacity: "5–50 Ton",
        application: "Excavation",
        description:
          "Hydraulic excavator for mass excavation, trenching, foundations and bulk civil work. Core plant for pads, utilities corridors and structural digs across TIMC packages.",
        image:
          "/images/equipment/categories/earth-moving/excavator-v1.png",
      },
      {
        id: "cv-mini",
        slug: "mini-excavator",
        name: "Mini Excavator",
        capacity: "1–5 Ton",
        application: "Urban work",
        description:
          "Compact excavator for urban and access-restricted works. Suited to finishing digs, trench repairs and sites where full-size excavators cannot manoeuvre.",
        image:
          "/images/equipment/categories/earth-moving/mini-excavator-v1.png",
      },
      {
        id: "cv-dozer",
        slug: "bulldozer",
        name: "Bulldozer",
        capacity: "D4–D11",
        application: "Clearing",
        description:
          "Blade dozer for clearing, rough grading and bulk earthshifting. Used on site opening packages, embankments and large-area preparation.",
        image:
          "/images/equipment/categories/earth-moving/bulldozer-v1.png",
      },
      {
        id: "cv-loader",
        slug: "wheel-loader",
        name: "Wheel Loader",
        capacity: "1–6 m³",
        application: "Loading",
        description:
          "Front-end wheel loader for stockpile management, loading and material transfer. Supports dump-truck cycles, backfill logistics and compound material handling.",
        image:
          "/images/equipment/categories/earth-moving/wheel-loader-v1.png",
      },
      {
        id: "cv-backhoe",
        slug: "backhoe",
        name: "Backhoe",
        capacity: "Std",
        application: "General works",
        description:
          "Backhoe loader for versatile dig-and-load tasks. Practical for utilities, small trenches and general site works requiring multipurpose plant.",
        image: "/images/equipment/categories/earth-moving/backhoe-v1.png",
      },
      {
        id: "cv-grader",
        slug: "motor-grader",
        name: "Motor Grader",
        capacity: "Std",
        application: "Road grading",
        description:
          "Motor grader for fine and coarse grading of roads, pads and formation levels. Essential for access roads and finished grade control on civil packages.",
        image:
          "/images/equipment/categories/earth-moving/motor-grader-v1.png",
      },
      {
        id: "cv-skid",
        slug: "skid-steer",
        name: "Skid Steer",
        capacity: "Std",
        application: "Compact works",
        description:
          "Skid-steer loader with multi-attachment capability for tight-site materials handling, cleanup and compact earthworks support.",
        image:
          "/images/equipment/categories/earth-moving/skid-steer-v1.png",
      },
      {
        id: "cv-sdr",
        slug: "single-drum-roller",
        name: "Single Drum Roller",
        capacity: "7–20 Ton",
        application: "Soil",
        description:
          "Single-drum roller for soil compaction on embankments, subgrade and structural fills. Delivers controlled layer density for civil earthworks.",
        image:
          "/images/equipment/categories/compaction-paving/single-drum-roller-v1.png",
      },
      {
        id: "cv-ddr",
        slug: "double-drum-roller",
        name: "Double Drum Roller",
        capacity: "2–12 Ton",
        application: "Asphalt",
        description:
          "Double-drum roller for asphalt and base compaction on paving packages. Used for roads, yards and finished hardstanding.",
        image:
          "/images/equipment/categories/compaction-paving/double-drum-roller-v1.png",
      },
      {
        id: "cv-pr",
        slug: "pneumatic-roller",
        name: "Pneumatic Roller",
        capacity: "Various",
        application: "Finishing",
        description:
          "Pneumatic multi-tyre roller for finishing and chipseal compaction. Improves surface density and finish quality on pavement packages.",
        image:
          "/images/equipment/categories/compaction-paving/pneumatic-roller-v1.png",
      },
    ],
  },
  {
    id: "transport",
    slug: "transportation-heavy-haulage",
    name: "Transportation & Heavy Haulage",
    description:
      "Flatbeds, lowbeds, satah and pipe trailers, dump trucks and tankers for plant and materials movement.",
    items: [
      {
        id: "tr-flat",
        slug: "flatbed",
        name: "Flatbed",
        capacity: "12 m",
        application: "General",
        description:
          "Open flatbed trailer for general plant and materials haulage. Standard platform for construction logistics across regional project routes.",
        image: "/images/equipment/categories/transport/flatbed-v1.png",
      },
      {
        id: "tr-low",
        slug: "lowbed",
        name: "Lowbed",
        capacity: "Heavy",
        application: "Machinery",
        description:
          "Lowbed trailer for oversized and overweight machinery moves. Designed for heavy excavators, cranes and capital plant mobilisation.",
        image: "/images/equipment/categories/transport/lowbed-v1.png",
      },
      {
        id: "tr-satah",
        slug: "extendable-trailer-satah",
        name: "Extendable Trailer (Satah)",
        capacity: "Long loads",
        application: "Steel/pipes",
        description:
          "Extendable satah trailer for long steel, pipes and modular loads that exceed standard deck lengths. Supports energy and industrial linear cargo.",
        image:
          "/images/equipment/categories/transport/extendable-trailer-satah-v1.png",
      },
      {
        id: "tr-pipe",
        slug: "pipe-trailer",
        name: "Pipe Trailer",
        capacity: "Various",
        application: "Pipes",
        description:
          "Purpose-built pipe trailer for utility and energy corridor pipe transport. Secure carriage for long tubular materials.",
        image: "/images/equipment/categories/transport/pipe-trailer-v1.png",
      },
      {
        id: "tr-dump",
        slug: "dump-truck",
        name: "Dump Truck",
        capacity: "10–40 Ton",
        application: "Bulk",
        description:
          "Dump truck for bulk spoil, aggregate and quarry materials. Supports excavator and loader cycles on continuous earthworks packages.",
        image: "/images/equipment/categories/transport/dump-truck-v1.png",
      },
      {
        id: "tr-water",
        slug: "water-tanker",
        name: "Water Tanker",
        capacity: "5,000–20,000 L",
        application: "Dust",
        description:
          "Water tanker for dust suppression and site water supply. Essential HSE and environmental control support on dry and desert sites.",
        image: "/images/equipment/categories/transport/water-tanker-v1.png",
      },
      {
        id: "tr-fuel",
        slug: "fuel-tanker",
        name: "Fuel Tanker",
        capacity: "Various",
        application: "Fuel",
        description:
          "Fuel tanker for on-site fuel logistics serving plant fleets. Keeps generators, earthmoving and transport assets supplied during remote works.",
        image: "/images/equipment/categories/transport/fuel-tanker-v1.png",
      },
    ],
  },
  {
    id: "rigging",
    slug: "rigging-material-handling",
    name: "Rigging & Material Handling",
    description:
      "Forklifts, telehandlers, reach stackers, winches and spreader beams for yard and industrial handling.",
    items: [
      {
        id: "rg-df",
        slug: "diesel-forklift",
        name: "Diesel Forklift",
        capacity: "3–30 Ton",
        application: "Handling",
        description:
          "Diesel forklift for outdoor and industrial yard handling of heavy palletised and containerised loads. Built for continuous compound logistics.",
        image:
          "/images/equipment/categories/material-handling/diesel-forklift-v1.png",
      },
      {
        id: "rg-ef",
        slug: "electric-forklift",
        name: "Electric Forklift",
        capacity: "1.5–5 Ton",
        application: "Warehouse",
        description:
          "Electric forklift for clean indoor warehouse environments. Suited to covered stores and materials hubs with emissions-sensitive zones.",
        image:
          "/images/equipment/categories/material-handling/electric-forklift-v1.png",
      },
      {
        id: "rg-tele",
        slug: "telehandler",
        name: "Telehandler",
        capacity: "12–17 m",
        application: "Construction",
        description:
          "Telescopic handler for height placement of materials on construction sites. Combines reach and lift for scaffold, formwork and fit-out logistics.",
        image:
          "/images/equipment/categories/material-handling/telehandler-v1.png",
      },
      {
        id: "rg-rt",
        slug: "reach-truck",
        name: "Reach Truck",
        capacity: "1–3 Ton",
        application: "Racking",
        description:
          "Reach truck for narrow-aisle racking and warehouse retrieval. Optimised for high-density storage operations.",
        image:
          "/images/equipment/categories/material-handling/reach-truck-v1.png",
      },
      {
        id: "rg-rs",
        slug: "reach-stacker",
        name: "Reach Stacker",
        capacity: "10–45 Ton",
        application: "Containers",
        description:
          "Reach stacker for container and heavy unit stacking in yards and logistics hubs. Supports multimodule plant and container programmes.",
        image:
          "/images/equipment/categories/material-handling/reach-stacker-v1.png",
      },
      {
        id: "rg-winch",
        slug: "winches",
        name: "Winches",
        capacity: "Various",
        application: "Pulling",
        description:
          "Winch systems for pulling, recovery and controlled tensioning. Used in install, salvage and specialised material positioning tasks.",
        image:
          "/images/equipment/categories/material-handling/winches-v1.png",
      },
      {
        id: "rg-beam",
        slug: "spreader-beams",
        name: "Spreader Beams",
        capacity: "Various",
        application: "Rigging",
        description:
          "Below-the-hook spreader beams for safe multi-point lifts. Essential rigging accessories for balanced heavy and lengthy loads.",
        image:
          "/images/equipment/categories/material-handling/spreader-beams-v1.png",
      },
    ],
  },
  {
    id: "aerial",
    slug: "aerial-access",
    name: "Aerial & Access",
    description:
      "Scissor lifts, articulating and telescopic booms, spider lifts and manlifts for elevated work.",
    items: [
      {
        id: "ae-scissor",
        slug: "scissor-lift",
        name: "Scissor Lift",
        capacity: "6–18 m",
        application: "Vertical",
        description:
          "Scissor lift for vertical access during fit-out, M&E and finishing works. Stable platform for crews on flat, prepared floors.",
        image: "/images/equipment/categories/aerial/scissor-lift-v1.png",
      },
      {
        id: "ae-art",
        slug: "articulating-boom",
        name: "Articulating Boom",
        capacity: "12–43 m",
        application: "Obstacle",
        description:
          "Articulating boom lift for up-and-over access around obstacles and complex structures. Ideal for industrial plants and building envelopes.",
        image:
          "/images/equipment/categories/aerial/articulating-boom-v1.png",
      },
      {
        id: "ae-tele",
        slug: "telescopic-boom",
        name: "Telescopic Boom",
        capacity: "18–56 m",
        application: "Reach",
        description:
          "Telescopic boom lift for long reach at height. Used for façade, steel, and high exterior work requiring extended outreach.",
        image:
          "/images/equipment/categories/aerial/telescopic-boom-v1.png",
      },
      {
        id: "ae-spider",
        slug: "spider-lift",
        name: "Spider Lift",
        capacity: "15–35 m",
        application: "Confined",
        description:
          "Tracked spider lift for confined or sensitive floors where standard booms cannot access. Compact footprint with elevated reach.",
        image:
          "/images/equipment/categories/aerial/spider-lift-v1.png",
      },
      {
        id: "ae-man",
        slug: "manlift",
        name: "Manlift",
        capacity: "5–42 m",
        application: "Maintenance",
        description:
          "Personnel manlift for maintenance and industrial access packages. Provides safe elevated working for inspection and service crews.",
        image: "/images/equipment/categories/aerial/manlift-v1.png",
      },
    ],
  },
  {
    id: "power",
    slug: "power-air-utilities",
    name: "Power, Air & Utilities",
    description:
      "Generators, ATS, distribution panels, air compressors and lighting towers for temporary site utilities.",
    items: [
      {
        id: "pw-canopy",
        slug: "canopy-generator",
        name: "Canopy Generator",
        capacity: "50–2000 kVA",
        application: "Power",
        description:
          "Weather-protected canopy generator for continuous or standby construction power. Suited to general site supply across a wide kVA band.",
        image:
          "/images/equipment/categories/power-generation/canopy-generator-v2.png",
      },
      {
        id: "pw-open",
        slug: "open-generator",
        name: "Open Generator",
        capacity: "250–2000 kVA",
        application: "Industrial",
        description:
          "Open-frame industrial generator for large temporary power demand. Used on industrial compounds and heavy temporary load packages.",
        image:
          "/images/equipment/categories/power-generation/open-generator-v1.png",
      },
      {
        id: "pw-ats",
        slug: "ats",
        name: "ATS",
        capacity: "Various",
        application: "Transfer",
        description:
          "Automatic transfer switch for critical temporary power changeover. Protects essential loads during generator / grid source switching.",
        image: "/images/equipment/categories/power-generation/ats-v1.png",
      },
      {
        id: "pw-panel",
        slug: "distribution-panels",
        name: "Distribution Panels",
        capacity: "Various",
        application: "Distribution",
        description:
          "Site power distribution and protection panels. Route and protect temporary electrical supply to multi-zone construction loads.",
        image:
          "/images/equipment/categories/power-generation/distribution-panels-v1.png",
      },
      {
        id: "pw-air",
        slug: "air-compressor",
        name: "Air Compressor",
        capacity: "185–1600 CFM",
        application: "Air",
        description:
          "Air compressor for tools, testing and industrial air demand. Supports civil, mechanical and commissioning activities on site.",
        image:
          "/images/equipment/categories/air-compressor/air-compressor-v1.png",
      },
      {
        id: "pw-light",
        slug: "lighting-tower",
        name: "Lighting Tower",
        capacity: "LED",
        application: "Lighting",
        description:
          "Mobile LED lighting tower for night works and secure-area illumination. Improves visibility and safety during extended shifts.",
        image:
          "/images/equipment/categories/electrical/lighting-tower-v1.png",
      },
    ],
  },
  {
    id: "site",
    slug: "site-support-specialty",
    name: "Site Support & Specialty",
    description:
      "Office cabins, accommodation, storage containers, fencing and concrete barriers for site establishment.",
    items: [
      {
        id: "ss-office",
        slug: "office-cabin",
        name: "Office Cabin",
        capacity: "Various",
        application: "Site office",
        description:
          "Portable office cabin for site supervision and client teams. Rapid establishment of project offices on temporary compounds.",
        image:
          "/images/equipment/categories/site-support/office-cabin-v2.png",
      },
      {
        id: "ss-acc",
        slug: "accommodation",
        name: "Accommodation",
        capacity: "Various",
        application: "Housing",
        description:
          "Workforce accommodation modules for remote packages. Supports camp housing requirements for multi-shift site crews.",
        image:
          "/images/equipment/categories/site-support/accommodation-v2.png",
      },
      {
        id: "ss-store",
        slug: "storage-container",
        name: "Storage Container",
        capacity: "10–40 ft",
        application: "Storage",
        description:
          "Secure storage container for tools and materials. Standard ISO-style site storage across 10–40 ft lengths.",
        image:
          "/images/equipment/categories/site-support/storage-container-v1.png",
      },
      {
        id: "ss-fence",
        slug: "fencing",
        name: "Fencing",
        capacity: "Various",
        application: "Security",
        description:
          "Temporary fencing for perimeter control and site security. Defines secure works zones and public interface boundaries.",
        image: "/images/equipment/categories/site-support/fencing-v1.png",
      },
      {
        id: "ss-barrier",
        slug: "concrete-barrier",
        name: "Concrete Barrier",
        capacity: "Various",
        application: "Traffic",
        description:
          "Concrete traffic and worksite separation barriers. Protects work areas and manages vehicle separation on active roads and sites.",
        image:
          "/images/equipment/categories/site-support/concrete-barrier-v1.png",
      },
    ],
  },
];

