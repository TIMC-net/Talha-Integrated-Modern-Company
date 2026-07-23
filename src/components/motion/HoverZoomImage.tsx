"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";

type HoverZoomImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  children?: ReactNode;
};

export default function HoverZoomImage({
  src,
  alt,
  className = "",
  sizes,
  children,
}: HoverZoomImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`group relative overflow-hidden bg-paper ${className}`}>
      <motion.div
        className="absolute inset-0 h-full w-full"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-700 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
      {children}
    </div>
  );
}
