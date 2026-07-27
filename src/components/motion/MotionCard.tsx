"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
};

const SPRING = { type: "spring" as const, stiffness: 320, damping: 22 };

export default function MotionCard({ children, className = "" }: MotionCardProps) {
  const reduce = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <motion.div
      className={className}
      whileHover={reduce || !canHover ? undefined : { y: -8, transition: SPRING }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
