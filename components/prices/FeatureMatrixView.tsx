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
  FEATURE_CHANGES,
  FEATURE_FAQ,
  FEATURE_MATRIX_PAGE,
  FEATURE_MATRIX_VERIFIED_ON,
  FEATURE_RELATED_LINKS,
  FEATURE_RISKS,
  FEATURE_SECTIONS,
  FEATURE_SOURCES,
  FREE_PLAN_ROWS,
  NEED_COLUMN_HEADERS,
  NEED_ROWS,
  PAID_PLAN_ROWS,
  PROVIDER_COLUMN_HEADERS,
} from "@/lib/prices/featureMatrix";
import styles from "./FeatureMatrixView.module.css";

/** The feature-matrix page: Blueprint 5.4, Level 2. */
export function FeatureMatrixView() {
  return (
    <article className="page page-wide">
      <PageHeader title={FEATURE_MATRIX_PAGE.title} badge={2} intro={FEATURE_MATRIX_PAGE.description} />
      <div className={styles.meta}>
        <FreshnessLabel label="verified-on" isoDate={FEATURE_MATRIX_VERIFIED_ON} />
        <span>Updated monthly.</span>
      </div>

      <CalloutBox title="The short answer">
        <ul>
          <li>On the free plan, all three include voice and web search. Memory is included on Claude and Gemini, and limited on ChatGPT.</li>
          <li>Images: ChatGPT Free (limited) and Gemini Free generate them. Anthropic lists no image generator for Claude.</li>
          <li>Video: only Gemini, from its first paid plan. OpenAI closed the Sora app on Apr 26, 2026.</li>
          <li>Agents that act for you mostly start on paid plans. ChatGPT Work has a limited desktop version on Free.</li>
          <li>Deep research is on Gemini Free when capacity allows, limited on ChatGPT Free, and paid-only on Claude.</li>
        </ul>
      </CalloutBox>

      <nav aria-label="Jump to a feature" className={styles.jump}>
        <strong>Jump to</strong>
        <ul className={styles.jumpList}>
          {FEATURE_SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <h2>Features on the free plan</h2>
      <DataTable
        caption="What each free plan includes"
        rowHeaderLabel="Feature"
        columnHeaders={PROVIDER_COLUMN_HEADERS}
        rows={FREE_PLAN_ROWS}
      />

      <h2>What paying adds</h2>
      <DataTable
        caption="What the first paid steps add. Prices are on the Plans page."
        rowHeaderLabel="Feature"
        columnHeaders={PROVIDER_COLUMN_HEADERS}
        rows={PAID_PLAN_ROWS}
      />

      {FEATURE_SECTIONS.map((section) => (
        <section key={section.id} id={section.id} className={styles.feature}>
          <h2>{section.title}</h2>
          <p className={styles.prose}>{section.intro}</p>
          <DataTable
            caption={`${section.title}, by provider`}
            rowHeaderLabel="Plan"
            columnHeaders={PROVIDER_COLUMN_HEADERS}
            rows={section.rows}
          />
          <h3>What to watch</h3>
          <ul className={styles.prose}>
            {section.watchFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Which feature should decide your choice?</h2>
      <DataTable
        caption="A starting point, based on provider pages. This is not a test result."
        rowHeaderLabel="If you want to"
        columnHeaders={NEED_COLUMN_HEADERS}
        rows={NEED_ROWS}
      />

      <h2>What changed in 2026</h2>
      <ol className={styles.timeline}>
        {FEATURE_CHANGES.map((change) => (
          <li key={change.sortDate} className={styles.change}>
            <strong>{change.dateLabel}</strong>
            <p className={styles.prose}>{change.text}</p>
          </li>
        ))}
      </ol>

      <h2>Questions about features</h2>
      <FaqList entries={FEATURE_FAQ} />

      <CalloutBox title="What can go wrong" variant="warning">
        <ul>
          {FEATURE_RISKS.map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
      </CalloutBox>

      <h2>Sources and verified-on date</h2>
      <p className={styles.prose}>
        We read each provider page on the verified-on date. Where a provider page does not cover a
        claim, we rely on a secondary report and mark it in the text.
      </p>
      <SourceList sources={FEATURE_SOURCES} />

      <PriceDisclaimer />

      <LinkListSection heading="Related pages" items={FEATURE_RELATED_LINKS} />
      <NewsletterBox />
    </article>
  );
}
