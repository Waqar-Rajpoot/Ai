import Link from "next/link";
import {
  PRICE_TIER_LABELS,
  REVIEW_SECTION_LINKS,
  REVIEW_SITE_PATHS,
} from "@/lib/compare/reviews/reviewConfig";
import { formatShortDate } from "@/lib/compare/reviews/reviewFormat";
import type { ReviewPageModel } from "@/lib/compare/reviews/reviewTypes";
import { ReviewAffiliateDisclosure } from "./ReviewAffiliateDisclosure";
import { ReviewAlternatives } from "./ReviewAlternatives";
import { ReviewDates } from "./ReviewDates";
import { ReviewEvidence } from "./ReviewEvidence";
import { ReviewHeadToHead } from "./ReviewHeadToHead";
import { ReviewPriceAndContext } from "./ReviewPriceAndContext";
import { ReviewRanking } from "./ReviewRanking";
import { ReviewSafetyAndLimits } from "./ReviewSafetyAndLimits";
import { ReviewSummaryBox } from "./ReviewSummaryBox";
import { ReviewTestResults } from "./ReviewTestResults";
import { ReviewVerdict } from "./ReviewVerdict";
import { ReviewWhoShouldSkip } from "./ReviewWhoShouldSkip";
import styles from "./ReviewPage.module.css";

interface ReviewPageProps {
  model: ReviewPageModel;
}

/** Full review page. Every review uses the same fixed layout. */
export function ReviewPage({ model }: ReviewPageProps) {
  const { row, tier, isOpenWeight, hasTestRun, editorial, ranking } = model;

  return (
    <article className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href={REVIEW_SITE_PATHS.compareHub}>Compare</Link></li>
          <li><Link href={REVIEW_SITE_PATHS.reviewsHub}>Reviews</Link></li>
          <li aria-current="page">{row.name}</li>
        </ol>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Compare · Model review</p>
        <h1 className={styles.title}>{row.name} review</h1>
        <p className={styles.lead}>
          {row.maker} · {row.bestFor}
        </p>
        <ul className={styles.badgeRow}>
          <li className={styles.badge}>{PRICE_TIER_LABELS[tier]}</li>
          {isOpenWeight ? <li className={styles.badge}>Open-weight or local</li> : null}
          {row.introRateEndsOn ? (
            <li className={styles.badge}>Intro rate to {formatShortDate(row.introRateEndsOn)}</li>
          ) : null}
          {ranking.liveRank !== null ? (
            <li className={styles.badge}>BenchLM #{ranking.liveRank}</li>
          ) : null}
          <li className={styles.badge}>{hasTestRun ? "Tested" : "Independent data"}</li>
        </ul>
      </header>

      <nav aria-label="On this page" className={styles.anchorNav}>
        <ul>
          {REVIEW_SECTION_LINKS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <ReviewSummaryBox model={model} />
      <ReviewWhoShouldSkip model={model} />
      <ReviewPriceAndContext model={model} />
      <ReviewRanking model={model} />
      <ReviewEvidence model={model} />
      <ReviewHeadToHead model={model} />
      <ReviewTestResults model={model} />
      <ReviewSafetyAndLimits model={model} />
      <ReviewAlternatives model={model} />
      <ReviewVerdict model={model} />
      <ReviewDates model={model} />
      <ReviewAffiliateDisclosure hasAffiliateLinks={Boolean(editorial.hasAffiliateLinks)} />

      <nav aria-label="More reviews" className={styles.footerLinks}>
        <Link href={REVIEW_SITE_PATHS.reviewsHub}>All reviews</Link>
        <Link href={REVIEW_SITE_PATHS.headToHead}>Head-to-head tests</Link>
        <Link href={REVIEW_SITE_PATHS.howWeTest}>How we test</Link>
      </nav>
    </article>
  );
}