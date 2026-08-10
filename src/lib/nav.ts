/** Path helpers for in-app navigation. */

export function normalizePath(path: string): string {
  const bare = path.split("?")[0]?.split("#")[0] ?? "/";
  if (bare.length > 1 && bare.endsWith("/")) return bare.slice(0, -1);
  return bare || "/";
}

export function isSamePath(pathname: string, href: string): boolean {
  return normalizePath(pathname) === normalizePath(href);
}

/**
 * Clicking a nav link for the current page forces a full reload
 * (Next.js soft nav won't remount if the pathname is unchanged).
 * Returns true when the click was handled as same-route.
 */
export function handleSameRouteClick(
  event: { preventDefault: () => void },
  pathname: string,
  href: string,
): boolean {
  if (!isSamePath(pathname, href)) return false;
  event.preventDefault();
  if (typeof window !== "undefined") {
    // Full document load so hero, carousels, Lenis, etc. re-init cleanly
    window.location.assign(href);
  }
  return true;
}
