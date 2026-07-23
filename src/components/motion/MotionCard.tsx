"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
};

const SPRING = { type: "spring" as const, stiffness: 320, damping: 22 };

export default function MotionCard({ children, className = "" }: MotionCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -8, transition: SPRING }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
