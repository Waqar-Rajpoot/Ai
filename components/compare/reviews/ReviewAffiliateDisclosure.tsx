import Link from "next/link";
import { REVIEW_SITE_PATHS } from "@/lib/compare/reviews/reviewConfig";
import styles from "./ReviewPage.module.css";

interface ReviewAffiliateDisclosureProps {
  hasAffiliateLinks: boolean;
}

/** Shown only when the page contains affiliate links. */
export function ReviewAffiliateDisclosure({ hasAffiliateLinks }: ReviewAffiliateDisclosureProps) {
  if (!hasAffiliateLinks) return null;

  return (
    <aside className={styles.pending} aria-label="Affiliate disclosure">
      This page contains affiliate links. Payment never changes a score or verdict.{" "}
      <Link href={REVIEW_SITE_PATHS.independence}>Independence and disclosure</Link>
    </aside>
  );
}