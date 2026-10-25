import { daysSince } from "@/lib/shared/dates";
import {
  FREE_LIMITS_CHECKED_ISO,
  MIN_QUERY_LENGTH,
  REVIEW_INTERVAL_DAYS,
} from "./freeLimits";
import {
  DIMENSIONS,
  LIMIT_CELLS,
  PROVIDERS,
  type Confidence,
  type DimensionId,
  type FreeProvider,
  type LimitCell,
  type ProviderId,
} from "./freeLimits";
import { SITUATIONS, STALE_CLAIMS, type Situation, type StaleClaim } from "./freeLimits";

// Re-exported so existing imports from this file keep working.
export { daysSince, describeDaysAgo } from "@/lib/shared/dates";

export type FreshnessStatus = "fresh" | "due";

export interface Freshness {
  daysSinceCheck: number;
  status: FreshnessStatus;
}

export interface Recommendation {
  situation: Situation;
  primary: FreeProvider;
  backup: FreeProvider | null;
}

/** Reviewed monthly (Blueprint 6.5), so a check older than the interval is due. */
export function getFreshness(now: Date): Freshness {
  const daysSinceCheck = daysSince(FREE_LIMITS_CHECKED_ISO, now);
  return { daysSinceCheck, status: daysSinceCheck > REVIEW_INTERVAL_DAYS ? "due" : "fresh" };
}

export function getProvider(id: ProviderId): FreeProvider {
  const provider = PROVIDERS.find((entry:any) => entry.id === id);
  if (!provider) throw new Error(`Unknown provider: ${id}`);
  return provider;
}

/** The cell for one provider and dimension, or undefined if the data has a gap. */
export function getCell(providerId: ProviderId, dimensionId: DimensionId): LimitCell | undefined {
  return LIMIT_CELLS.find((cell:any) => cell.providerId === providerId && cell.dimensionId === dimensionId);
}

/** Counts cells by confidence, for the "how solid is this table" summary. */
export function countByConfidence(cells: readonly LimitCell[] = LIMIT_CELLS): Record<Confidence, number> {
  const counts: Record<Confidence, number> = { published: 0, reported: 0, unclear: 0 };
  for (const cell of cells) counts[cell.confidence] += 1;
  return counts;
}

/** Every provider and dimension pair should have exactly one cell. Returns the missing pairs. */
export function findMissingCells(): string[] {
  const missing: string[] = [];
  for (const provider of PROVIDERS) {
    for (const dimension of DIMENSIONS) {
      if (!getCell(provider.id, dimension.id)) missing.push(`${provider.id}:${dimension.id}`);
    }
  }
  return missing;
}

/** Looks up a situation and resolves its providers. */
export function getRecommendation(situationId: string): Recommendation | undefined {
  const situation = SITUATIONS.find((entry:any) => entry.id === situationId);
  if (!situation) return undefined;
  return {
    situation,
    primary: getProvider(situation.primary),
    backup: situation.backup ? getProvider(situation.backup) : null,
  };
}

/** Matches a typed number or phrase against the out-of-date claims. Needs at least two characters. */
export function searchStaleClaims(query: string): StaleClaim[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < MIN_QUERY_LENGTH) return [];
  return STALE_CLAIMS.filter((entry:any) =>
    [entry.claim, entry.provider, entry.origin, entry.status].join(" ").toLowerCase().includes(needle),
  );
}