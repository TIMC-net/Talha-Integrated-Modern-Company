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
      "To provide our clients with timely, cost-effective and comprehensive industrial solutions by integrating the latest techniques, tools and qualified personnel for global competitiveness.",
      "To build strategic partnerships with our customers through a variety of service options, and to offer our employees opportunities for growth through participation, achievement, recognition and reward.",
    ],
  },
  {
    id: "vision",
    label: "Our Vision",
    content: [
      "To be a trusted general contracting partner across Saudi Arabia — delivering civil infrastructure, foundation engineering and energy infrastructure with integrated equipment support under one roof.",
      "We aim to set the standard for quality, HSE discipline and schedule reliability on industrial and infrastructure projects throughout the Kingdom.",
    ],
  },
  {
    id: "history",
    label: "Our History",
    content: [
      "Talha Integrated Modern Company was established in 2010 as a Saudi-owned contracting company. We began with industrial support services and have grown into a multi-discipline contractor.",
      "Today our work spans civil works, foundations, energy infrastructure packages and integrated equipment rental — serving industrial and infrastructure clients across the Kingdom of Saudi Arabia.",
    ],
  },
];

export const whyChooseUs: WhyChooseItem[] = [
  {
    id: "customer",
    title: "Customer-Centered Approach",
    description:
      "Clear communication, responsive site leadership and solutions shaped around your schedule, specifications and operational constraints.",
  },
  {
    id: "sustainability",
    title: "Sustainability Commitment",
    description:
      "We are dedicated to sustainability and environmental responsibility. Our commitment to sustainable practices ensures that our solutions are not only effective but also environmentally conscious.",
  },
  {
    id: "quality",
    title: "Quality & Safety Focus",
    description:
      "Disciplined HSE and quality systems on every site — protecting people, assets and programme while delivering work that meets specification.",
  },
];

export const aboutFaqs: FaqItem[] = [
  {
    id: "industries",
    question: "What industries do you specialize in?",
    answer:
      "TIMC focuses on general contracting for civil infrastructure, foundation engineering and energy infrastructure, with integrated equipment rental supporting industrial and construction clients across Saudi Arabia.",
  },
  {
    id: "timeline",
    question: "What is your typical project timeline?",
    answer:
      "Timelines depend on scope, site conditions and client approvals. After enquiry we assess the works, prepare a programme and align mobilisation so deadlines are planned, monitored and met.",
  },
  {
    id: "quote",
    question: "How can I get a quote for my project?",
    answer:
      "Share your scope via the Contact page or email. Our team will review requirements, clarify technical details and prepare a commercial and technical response.",
  },
  {
    id: "support",
    question: "Do you provide post-project support?",
    answer:
      "Yes. We support handover documentation, punch-list clearance and follow-up coordination as required by the contract and client procedures.",
  },
  {
    id: "contact",
    question: "How can I contact you for more information?",
    answer:
      "Reach us by phone, email or the Contact form on this website. Company contact details are listed in the site footer and Contact page.",
  },
];
