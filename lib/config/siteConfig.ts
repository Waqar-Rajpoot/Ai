import { env } from "./env";

/** Site-wide values used by the layout, metadata and footer. */
export const SITE_CONFIG = {
  name: env.siteName,
  url: env.siteUrl,
  contactEmail: env.contactEmail,
  newsletterActionUrl: env.newsletterActionUrl,
  description:
    "Learn AI from first steps to expert topics, compare named models with dated tests, and stay current on prices and rules.",
} as const;

/** Alias so files can import `siteConfig`. It is the same object as `SITE_CONFIG`. */
export const siteConfig = SITE_CONFIG;