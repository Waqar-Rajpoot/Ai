export interface VerifiableRecord {
  /** ISO date (YYYY-MM-DD) the facts were checked against the official source, or null if not yet checked. */
  verifiedOn: string | null;
}

export interface VerificationSummary {
  total: number;
  verifiedCount: number;
  pendingCount: number;
  oldestVerifiedOn: string | null;
  newestVerifiedOn: string | null;
}

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** True only for real calendar dates written as YYYY-MM-DD. */
export function isIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/** Formats an ISO date as "October 20, 2026". Returns the input unchanged if it is not a valid ISO date. */
export function formatVerifiedDate(isoDate: string): string {
  if (!isIsoDate(isoDate)) return isoDate;
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Counts verified and pending records and finds the oldest and newest check. Invalid dates count as pending. */
export function summarizeVerification(records: readonly VerifiableRecord[]): VerificationSummary {
  const validDates = records
    .map((record) => record.verifiedOn)
    .filter((value): value is string => value !== null && isIsoDate(value))
    .sort(); // ISO dates sort correctly as plain strings

  return {
    total: records.length,
    verifiedCount: validDates.length,
    pendingCount: records.length - validDates.length,
    oldestVerifiedOn: validDates[0] ?? null,
    newestVerifiedOn: validDates[validDates.length - 1] ?? null,
  };
}

/** Oldest check date if EVERY record has a valid date. Otherwise null, because the page is not fully verified. */
export function oldestVerifiedOnAll(records: readonly VerifiableRecord[]): string | null {
  const summary = summarizeVerification(records);
  return summary.total > 0 && summary.pendingCount === 0 ? summary.oldestVerifiedOn : null;
}

/** One plain sentence describing the summary, for the hub page. */
export function describeVerification(summary: VerificationSummary): string {
  if (summary.verifiedCount === 0) {
    return "No data page has a verified-on date yet. Each one will show its own date once it has been checked.";
  }
  const oldest = formatVerifiedDate(summary.oldestVerifiedOn ?? "");
  const newest = formatVerifiedDate(summary.newestVerifiedOn ?? "");
  return `${summary.verifiedCount} of ${summary.total} pages have a verified-on date. Oldest check: ${oldest}. Most recent: ${newest}.`;
}