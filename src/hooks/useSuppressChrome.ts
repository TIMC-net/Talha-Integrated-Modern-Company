"use client";

import { useEffect, useState } from "react";

const ATTRS = [
  "data-scroll-locked",
  "data-project-panel-open",
] as const;

type SuppressAttr = (typeof ATTRS)[number];

/**
 * True while a modal or project detail panel should hide fixed page chrome.
 * Pass a subset of attributes for callers that only need a subset (e.g. scroll spy).
 */
export function useSuppressChrome(attrs: readonly SuppressAttr[] = ATTRS) {
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const list = [...attrs];
    const read = () => {
      const html = document.documentElement;
      setSuppressed(list.some((attr) => html.hasAttribute(attr)));
    };

    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: list,
    });
    return () => mo.disconnect();
  }, [attrs]);

  return suppressed;
}

/** Section spy only hides under full-page scroll lock — not project panel chrome. */
export const SCROLL_LOCK_ONLY = [
  "data-scroll-locked",
] as const satisfies readonly SuppressAttr[];
