"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Pressable({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      {children}
    </motion.span>
  );
}
