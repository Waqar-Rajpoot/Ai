import { formatVerifiedDate, isIsoDate } from "@/lib/prices/verification";

/** "Verified on <date>", or "Not yet verified" when there is no valid date. Reused by every data table. */
export function VerifiedOnLabel({ verifiedOn }: { verifiedOn: string | null }) {
  if (!verifiedOn || !isIsoDate(verifiedOn)) {
    return <span className="text-[var(--color-muted)]">Not yet verified</span>;
  }
  return (
    <span>
      Verified on <time dateTime={verifiedOn}>{formatVerifiedDate(verifiedOn)}</time>
    </span>
  );
}