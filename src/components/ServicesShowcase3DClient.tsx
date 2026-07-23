"use client";

import dynamic from "next/dynamic";

const ServicesShowcase3D = dynamic(() => import("@/components/ServicesShowcase3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-white sm:h-[540px] lg:h-[340px]" />
  ),
});

export default ServicesShowcase3D;
