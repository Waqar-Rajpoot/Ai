import { BRAND_DESCRIPTION, BRAND_NAME } from "@/lib/config/brand";
import { env } from "./env";

/** Site-wide values used by the layout, metadata and footer. */
export const SITE_CONFIG = {
  name: BRAND_NAME,
  url: env.siteUrl,
  contactEmail: env.contactEmail,
  newsletterActionUrl: env.newsletterActionUrl,
  description: BRAND_DESCRIPTION,
} as const;

/** Alias so files can import `siteConfig`. It is the same object as `SITE_CONFIG`. */
export const siteConfig = SITE_CONFIG;