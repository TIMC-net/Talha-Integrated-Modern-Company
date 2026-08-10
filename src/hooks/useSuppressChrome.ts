"use client";

import { useEffect, useState } from "react";

const ATTRS = [
  "data-scroll-locked",
  "data-project-panel-open",
  "data-fleet-card-hover",
] as const;

/** True while a modal or card detail panel should hide fixed page chrome. */
export function useSuppressChrome() {
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const read = () => {
      const html = document.documentElement;
      setSuppressed(ATTRS.some((attr) => html.hasAttribute(attr)));
    };

    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [...ATTRS],
    });
    return () => mo.disconnect();
  }, []);

  return suppressed;
}
