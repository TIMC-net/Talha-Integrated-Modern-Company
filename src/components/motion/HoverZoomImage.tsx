"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

type HoverZoomImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  children?: ReactNode;
  priority?: boolean;
};

export default function HoverZoomImage({
  src,
  alt,
  className = "",
  sizes,
  children,
  priority = false,
}: HoverZoomImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className={`img-zoom group relative w-full max-w-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 h-full w-full"
        initial={{ scale: 1 }}
        whileHover={reduce || !canHover ? undefined : { scale: 1.1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={70}
          loading={priority ? "eager" : "lazy"}
          className={`object-cover object-center bg-navy-900 transition-opacity duration-500 ease-out ${
            loaded ? "opacity-100" : "opacity-60"
          }`}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
        />
      </motion.div>
      {children}
    </div>
  );
}
