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
  // Skip the "inline-block" default when the caller supplies its own
  // "hidden ..." visibility classes — combining them on the same element
  // makes Tailwind's cascade resolve to `display: block` (always visible)
  // instead of `none`, since both are unprefixed same-specificity utilities.
  const base = className.includes("hidden") ? "" : "inline-block";

  return (
    <motion.span
      className={`${base} ${className}`.trim()}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      {children}
    </motion.span>
  );
}
