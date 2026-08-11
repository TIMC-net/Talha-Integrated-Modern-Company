/** Shared stock fallbacks when a listed project has no `coverImage`. */
export const listedProjectFallbackImages = [
  "/images/civil-construction.webp",
  "/images/scaffolding.webp",
  "/images/manpower-supply.webp",
] as const;

/** Cover for a completed/ongoing listing card — prefer dedicated cover. */
export function listedProjectImage(
  project: { coverImage?: string },
  index: number,
): string {
  if (project.coverImage) return project.coverImage;
  return listedProjectFallbackImages[index % listedProjectFallbackImages.length];
}
