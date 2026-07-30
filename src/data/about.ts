export type AboutTab = {
  id: string;
  label: string;
  content: string[];
};

export type WhyChooseItem = {
  id: string;
  title: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const aboutTabs: AboutTab[] = [
  {
    id: "mission",
    label: "Our Mission",
    content: [
      "To deliver innovative engineering, construction, and infrastructure solutions that meet the highest standards of quality, safety, and operational excellence while completing every project efficiently, responsibly, and within agreed timelines.",
    ],
  },
  {
    id: "vision",
    label: "Our Vision",
    content: [
      "To become one of Saudi Arabia's leading engineering and general contracting companies, recognized for excellence in infrastructure development, foundation engineering, and integrated heavy equipment rental, while expanding our presence across the GCC through sustainable growth, innovation, and client-focused solutions.",
    ],
  },
  {
    id: "history",
    label: "Our History",
    content: [
      "Talha Integrated Modern Company (TIMC) was established in 2010 as a Saudi Arabian engineering and contracting company. Headquartered in Jeddah, TIMC serves clients across Saudi Arabia's major cities, industrial zones, and strategic development projects while also maintaining operations in Pakistan.",
      "The company expanded its corporate identity to reflect broader capabilities beyond equipment rental, and today operates as an integrated engineering and contracting partner across power, utility, industrial, infrastructure, renewable energy, and oil & gas sectors.",
    ],
  },
];

export const whyChooseUs: WhyChooseItem[] = [
  {
    id: "integrated",
    title: "Integrated Solutions",
    description:
      "Integrated engineering and contracting solutions under one roof.",
  },
  {
    id: "fleet",
    title: "Modern Equipment Fleet",
    description: "Modern fleet of over 300 pieces of equipment.",
  },
  {
    id: "team",
    title: "Experienced Professionals",
    description: "Experienced engineers and technical professionals.",
  },
  {
    id: "mobilisation",
    title: "Fast Mobilisation",
    description: "Fast mobilisation across Saudi Arabia.",
  },
  {
    id: "standards",
    title: "Quality & Safety Standards",
    description:
      "Commitment to international quality and safety standards.",
  },
  {
    id: "experience",
    title: "Proven Project Experience",
    description:
      "Proven experience supporting major infrastructure and energy projects.",
  },
  {
    id: "management",
    title: "Reliable Project Management",
    description:
      "Reliable project management from planning through completion.",
  },
  {
    id: "partnerships",
    title: "Long-Term Partnerships",
    description:
      "Long-term client relationships built on trust, quality, and performance.",
  },
];

export const aboutFaqs: FaqItem[] = [
  {
    id: "industries",
    question: "What industries does TIMC serve?",
    answer:
      "TIMC serves the oil & gas, power, utilities, industrial, infrastructure, renewable energy, mining, commercial, and government sectors.",
  },
  {
    id: "operate",
    question: "Where does TIMC operate?",
    answer:
      "TIMC operates throughout Saudi Arabia with headquarters in Jeddah and project experience across major cities, industrial zones, and strategic developments. The company also maintains operations in Pakistan.",
  },
  {
    id: "services",
    question: "What services does TIMC provide?",
    answer:
      "TIMC provides general contracting, civil infrastructure, foundation engineering, industrial maintenance, mechanical works, electrical works, heavy equipment rental, transportation, earthworks, utility infrastructure, and renewable energy support services.",
  },
  {
    id: "turnkey",
    question: "Does TIMC provide turnkey project solutions?",
    answer:
      "Yes. TIMC delivers integrated engineering, construction, and equipment solutions tailored to each client's project requirements.",
  },
];
