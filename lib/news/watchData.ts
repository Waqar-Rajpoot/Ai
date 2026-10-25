import type { VerificationLevel } from "@/lib/prices/apiCostTable";

export interface PriceDate {
  id: string;
  /** ISO date (YYYY-MM-DD), read as UTC. */
  isoDate: string;
  title: string;
  detail: string;
  href: string;
  verification: VerificationLevel;
}

/**
 * Introductory API rates with an end date (Blueprint 6.7). These are dates to watch, not price changes yet.
 * Re-check both against Google's own page close to launch (Blueprint 7.3).
 */
export const PRICE_DATES: readonly PriceDate[] = [
  {
    id: "gemini-4-argon-intro-end",
    isoDate: "2026-11-30",
    title: "Gemini 4 Argon introductory API rate listed to this date",
    detail: "Google · listed at $2 in / $10 out per million tokens. Check the rate that applies afterwards.",
    href: "/prices/api",
    verification: "secondary",
  },
  {
    id: "gemini-3-8-flash-intro-end",
    isoDate: "2026-12-31",
    title: "Gemini 3.8 Flash introductory API rate listed to this date",
    detail: "Google · listed at $0.75 in / $3.75 out per million tokens. Check the rate that applies afterwards.",
    href: "/prices/api",
    verification: "secondary",
  },
];