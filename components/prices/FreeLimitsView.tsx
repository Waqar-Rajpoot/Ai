import Link from "next/link";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { DataTable } from "@/components/shared/DataTable";
import { FaqList } from "@/components/shared/FaqList";
import { FreshnessLabel } from "@/components/shared/FreshnessLabel";
import { LinkListSection } from "@/components/shared/LinkListSection";
import { NewsletterBox } from "@/components/shared/NewsletterBox";
import { PageHeader } from "@/components/shared/PageHeader";
import { PriceDisclaimer } from "@/components/shared/PriceDisclaimer";
import { SourceList } from "@/components/shared/SourceList";
import {
  FREE_LIMITS_FAQ,
  FREE_LIMITS_PAGE,
  FREE_LIMITS_RELATED_LINKS,
  FREE_LIMITS_RISKS,
  FREE_LIMITS_SOURCES,
  FREE_LIMITS_VERIFIED_ON,
  FREE_PLAN_PROFILES,
  HOW_LIMITS_WORK,
  RECENT_CHANGES,
  STRETCH_TIPS,
  WHICH_FITS_COLUMN_HEADERS,
  WHICH_FITS_ROWS,
} from "@/lib/prices/freeLimits";
import { FreeLimitsTable } from "./FreeLimitsTable";
import { FreePlanDetails } from "./FreePlanDetails";
import styles from "./FreeLimitsView.module.css";

/** The free-plan limits page: Blueprint 5.4, Level 1 to 2. */
export function FreeLimitsView() {
  return (
    <article className="page page-wide">
      <PageHeader title={FREE_LIMITS_PAGE.title} badge="levels-1-2" intro={FREE_LIMITS_PAGE.description} />
      <div className={styles.meta}>
        <FreshnessLabel label="verified-on" isoDate={FREE_LIMITS_VERIFIED_ON} />
        <span>Updated monthly.</span>
      </div>

      <CalloutBox title="The short answer">
        <ul>
          <li>ChatGPT Free has no cap on everyday text chat. Uploads, images, voice and data analysis each have their own limits, and ads can appear.</li>
          <li>Claude Free and Gemini Free give you one allowance for everything you do, and it refills every five hours. Gemini adds a weekly limit.</li>
          <li>Claude and Gemini publish no message counts. ChatGPT publishes one number: 3 file uploads a day.</li>
          <li>Claude and the Gemini app show no ads. ChatGPT Free and Go do, in a growing list of countries.</li>
        </ul>
      </CalloutBox>

      <h2>Free plans at a glance</h2>
      <FreeLimitsTable />

      <h2>How free-plan limits work</h2>
      <div className={styles.blocks}>
        {HOW_LIMITS_WORK.map((block) => (
          <div key={block.title}>
            <h3>{block.title}</h3>
            <p className={styles.prose}>{block.text}</p>
          </div>
        ))}
      </div>

      <h2>What each free plan includes</h2>
      <FreePlanDetails profiles={FREE_PLAN_PROFILES} variant="includes" />

      <h2>Where each plan stops</h2>
      <FreePlanDetails profiles={FREE_PLAN_PROFILES} variant="stops" />

      <h2>Ads in free tiers</h2>
      <FreePlanDetails profiles={FREE_PLAN_PROFILES} variant="ads" />

      <h2>Getting more from a free plan</h2>
      <div className={styles.blocks}>
        {STRETCH_TIPS.map((tip) => (
          <div key={tip.title}>
            <h3>{tip.title}</h3>
            <p className={styles.prose}>{tip.text}</p>
          </div>
        ))}
      </div>
      <p className={styles.prose}>
        New to prompting? Start with the{" "}
        <Link href="/learn/foundations/write-better-prompts">prompt guide</Link>, or open the{" "}
        <Link href="/tools/prompt-library">prompt library</Link>.
      </p>

      <h2>Which free plan fits you?</h2>
      <DataTable
        caption="A starting point, based on published limits. This is not a test result."
        rowHeaderLabel="If"
        columnHeaders={WHICH_FITS_COLUMN_HEADERS}
        rows={WHICH_FITS_ROWS}
      />

      <h2>What changed in 2026</h2>
      <ol className={styles.timeline}>
        {RECENT_CHANGES.map((change) => (
          <li key={change.sortDate} className={styles.change}>
            <strong>{change.dateLabel}</strong>
            <p className={styles.prose}>{change.text}</p>
          </li>
        ))}
      </ol>

      <h2>Questions about free plans</h2>
      <FaqList entries={FREE_LIMITS_FAQ} />

      <CalloutBox title="What can go wrong" variant="warning">
        <ul>
          {FREE_LIMITS_RISKS.map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
      </CalloutBox>

      <h2>Sources and verified-on date</h2>
      <p className={styles.prose}>
        We read each provider page on the verified-on date. Where a provider page does not cover a
        claim, we rely on a secondary report and say so in the text.
      </p>
      <SourceList sources={FREE_LIMITS_SOURCES} />

      <PriceDisclaimer />

      <LinkListSection heading="Related pages" items={FREE_LIMITS_RELATED_LINKS} />
      <NewsletterBox />
    </article>
  );
}