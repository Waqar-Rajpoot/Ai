import type { BreadcrumbItem } from "@/types";

/** Turns "how-we-test" into "How we test". Fallback label for unknown routes. */
export function humanizeSlug(slug: string): string {
  const spaced = slug.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Builds the breadcrumb trail for a pathname, starting at Home.
 *
 * @param pathname - Current route, for example "/about/how-we-test".
 * @param labelsByHref - Known labels keyed by route; unknown segments are humanized.
 */
export function buildBreadcrumbs(
  pathname: string,
  labelsByHref: Readonly<Record<string, string>>,
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
  let href = "";
  for (const segment of pathname.split("/").filter(Boolean)) {
    href += `/${segment}`;
    items.push({ label: labelsByHref[href] ?? humanizeSlug(segment), href });
  }
  return items;
}
