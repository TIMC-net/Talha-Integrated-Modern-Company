"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, type ComponentType, type MouseEvent } from "react";
import {
  IconCivil,
  IconEquipment,
  IconManpower,
  IconScaffolding,
} from "@/components/ServiceIcons";
import MotionCard from "@/components/motion/MotionCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const features = [
  {
    title: "Civil & Mechanical Works",
    text: "All services are precisely and professionally executed utilizing the suitable resources and applying latest technologies.",
    href: "/services/civil",
    Icon: IconCivil,
  },
  {
    title: "Equipment Rental",
    text: "Looking for equipment and heavy equipment rental in Saudi? Talha offers a large choice of high-quality, robust, and efficient heavy machinery.",
    href: "/services/equipment",
    Icon: IconEquipment,
  },
  {
    title: "Scaffolding Services",
    text: "TALHA provides scaffolding and industrial support solutions with skilled teams across the Saudi Arabia market.",
    href: "/services/scaffolding",
    Icon: IconScaffolding,
  },
  {
    title: "Manpower Supply",
    text: "We provide recruitment solutions and manpower supply to the oil & gas industry and construction industry.",
    href: "/services/manpower",
    Icon: IconManpower,
  },
];

function FeatureCard({
  title,
  text,
  href,
  Icon,
}: {
  title: string;
  text: string;
  href: string;
  Icon: ComponentType;
}) {
  const [hovered, setHovered] = useState(false);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springConfig = { stiffness: 250, damping: 20, mass: 0.5 };
  const tiltX = useSpring(useTransform(pointerY, [0, 1], [-16, 16]), springConfig);
  const tiltY = useSpring(useTransform(pointerX, [0, 1], [16, -16]), springConfig);

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    setHovered(false);
    pointerX.set(0.5);
    pointerY.set(0.5);
  }

  return (
    <MotionCard className="h-full">
      <Link
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="surface-card group flex h-full flex-col border-t-4 border-t-accent bg-white p-7"
      >
        <motion.div
          className="mb-6 flex h-14 w-14 items-center justify-center bg-ink transition-colors duration-300 group-hover:bg-accent"
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 300 }}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Icon />
        </motion.div>

        <h3 className="mb-3 font-display text-[15px] font-bold tracking-wide text-ink uppercase">
          {title}
        </h3>

        <p className="mb-6 flex-1 text-[13px] leading-[1.7] text-slate">{text}</p>

        <span className="inline-flex items-center gap-1.5 font-display text-[12px] font-bold tracking-wide text-accent-dark uppercase transition group-hover:gap-2.5">
          Read More <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </MotionCard>
  );
}

export default function FeatureServices() {
  return (
    <section className="relative z-10">
      <div className="container-site -mt-20 md:-mt-24">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <RevealItem key={feature.title}>
              <FeatureCard {...feature} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
