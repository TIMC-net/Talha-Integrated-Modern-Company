"use client";

import dynamic from "next/dynamic";

const ServicesShowcase3D = dynamic(() => import("@/components/ServicesShowcase3D"), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-white md:h-[340px]" />,
});

export default ServicesShowcase3D;
