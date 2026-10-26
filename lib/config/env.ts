/**
 * The only module that reads `process.env`.
 *
 * Next.js inlines `NEXT_PUBLIC_*` values only when they are accessed as a
 * literal `process.env.NAME`, so each variable is read explicitly below
 * rather than looked up by a dynamic key.
 */

function requireValue(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

/** Validated environment values. Required ones fail the build when missing. */
export const env = {
  siteUrl: requireValue("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL),
  siteName: requireValue("NEXT_PUBLIC_SITE_NAME", process.env.NEXT_PUBLIC_SITE_NAME),
  contactEmail: requireValue(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  ),
  /** External signup form. Undefined until the newsletter is set up. */
  newsletterActionUrl: process.env.NEXT_PUBLIC_NEWSLETTER_ACTION_URL || undefined,
} as const;


/** External newsletter signup form URL. Null when not set, so the page shows "Signup is not open yet". */
export const NEWSLETTER_ACTION_URL: string | null =
  process.env.NEXT_PUBLIC_NEWSLETTER_ACTION_URL?.trim() || null;



  /** External newsletter sign-up form URL, or null when it is not set. */
export function getNewsletterActionUrl(): string | null {
  return process.env.NEXT_PUBLIC_NEWSLETTER_ACTION_URL?.trim() || null;
}