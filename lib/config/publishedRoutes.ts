import { PART_A_ROUTES } from "@/lib/pages/staticPages";
import { FREE_LIMITS_PAGE } from "@/lib/prices/freeLimits";

/** Every route that exists so far, for sitemap.xml. Each phase appends its own. */
export const PUBLISHED_ROUTES: readonly string[] = [
  ...PART_A_ROUTES,
  FREE_LIMITS_PAGE.route,
];