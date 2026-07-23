"use client";

import Image from "next/image";
import {
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useState,
} from "react";

type ImageFocusZoomProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** How far to zoom in (1 = no zoom) */
  zoomScale?: number;
};

/**
 * In-card zoom: moving the pointer pans into the image’s unique details
 * (like catalog product zoom — stays inside the frame, no lightbox).
 */
export default function ImageFocusZoom({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 50vw, 280px",
  zoomScale = 1.85,
}: ImageFocusZoomProps) {
  const [active, setActive] = useState(false);
  const [locked, setLocked] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const updateOrigin = useCallback((clientX: number, clientY: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
    setOrigin(`${x}% ${y}%`);
  }, []);

  const onPointerEnter = (e: PointerEvent<HTMLButtonElement>) => {
    if (locked) return;
    setActive(true);
    updateOrigin(e.clientX, e.clientY, e.currentTarget);
  };

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!active && !locked) return;
    updateOrigin(e.clientX, e.clientY, e.currentTarget);
  };

  const onPointerLeave = () => {
    if (locked) return;
    setActive(false);
    setOrigin("50% 50%");
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !locked;
    setLocked(next);
    setActive(next || true);
    updateOrigin(e.clientX, e.clientY, e.currentTarget);
    if (!next) {
      setActive(false);
      setOrigin("50% 50%");
    }
  };

  const zoomed = active || locked;

  return (
    <button
      type="button"
      aria-label={`Zoom ${alt || "image"}`}
      aria-pressed={locked}
      className={`relative block h-full w-full cursor-zoom-in overflow-hidden bg-white ${className}`}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        draggable={false}
        className="object-contain p-4 select-none"
        style={{
          transform: zoomed ? `scale(${zoomScale})` : "scale(1)",
          transformOrigin: origin,
          transition: zoomed
            ? "transform 0.15s ease-out"
            : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </button>
  );
}
