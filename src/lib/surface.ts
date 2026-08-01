/** Relative luminance 0–1 from a CSS color string. Returns null if transparent/unusable. */
function luminanceFromCssColor(color: string): number | null {
  if (!color || color === "transparent") return null;

  const rgba = color.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i,
  );
  if (rgba) {
    const r = Number(rgba[1]);
    const g = Number(rgba[2]);
    const b = Number(rgba[3]);
    const a = rgba[4] === undefined ? 1 : Number(rgba[4]);
    if (a < 0.35) return null;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  const modern = color.match(
    /rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
  );
  if (modern) {
    const r = Number(modern[1]);
    const g = Number(modern[2]);
    const b = Number(modern[3]);
    let a = 1;
    if (modern[4] !== undefined) {
      a = modern[4].endsWith("%")
        ? Number(modern[4].slice(0, -1)) / 100
        : Number(modern[4]);
    }
    if (a < 0.35) return null;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h = hex[1];
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const n = Number.parseInt(full, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  return null;
}

function isNavChrome(node: Element) {
  return Boolean(node.closest("[data-nav-chrome], [data-site-nav]"));
}

/**
 * Detect whether the page surface under a point is visually dark.
 */
export function isDarkSurfaceAt(x: number, y: number): boolean {
  const stack = document.elementsFromPoint(x, y);
  const el =
    stack.find((node) => node instanceof Element && !isNavChrome(node)) ?? null;
  if (!el) return true;

  for (const node of stack) {
    if (!(node instanceof Element) || isNavChrome(node)) continue;
    if (node.closest("[data-media]")) return true;
  }

  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    if (node.hasAttribute("data-media")) return true;

    const style = window.getComputedStyle(node);
    const lum = luminanceFromCssColor(style.backgroundColor);
    if (lum !== null) return lum < 0.55;

    node = node.parentElement;
  }

  if (el.closest("[data-dark-surface]")) {
    return document.documentElement.dataset.theme !== "light";
  }

  return document.documentElement.dataset.theme !== "light";
}

/**
 * Navbar chrome should go white the instant a dark surface touches
 * the floating button / capsule band — no overlap threshold delay.
 */
export function isDarkNavBand(bandBottom = 88): boolean {
  const vw = window.innerWidth;
  // Center of the mobile FABs / desktop capsule vertical band
  const touchY = Math.min(52, Math.max(40, bandBottom * 0.5));

  // 1) Media / photo panel — flip on first pixel of contact with the band
  for (const media of document.querySelectorAll<HTMLElement>("[data-media]")) {
    const r = media.getBoundingClientRect();
    if (r.width < vw * 0.3) continue;
    // Touches the chrome strip (y: 0 → bandBottom)
    if (r.bottom > 0 && r.top < bandBottom) return true;
  }

  // 2) Dark painted section under the button line (navy / black themes)
  if (isDarkSurfaceAt(vw / 2, touchY)) return true;

  // 3) Leading edge: section just entering under the chrome
  if (isDarkSurfaceAt(vw / 2, bandBottom - 4)) return true;

  return false;
}
