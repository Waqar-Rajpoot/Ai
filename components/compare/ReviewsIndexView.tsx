import Link from "next/link";
import { DIRECTORY_SCORES_AS_OF, formatIsoDate, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import { FRESHNESS_LABELS, RESULT_LABELS } from "@/lib/compare/compareStandards";
import { BUDGET_TIER_MAX_INPUT_PRICE, MID_TIER_MAX_INPUT_PRICE } from "@/lib/compare/modelFilters";
import { getReviewStatItems } from "@/lib/compare/modelStats";
import {
  HOW_TO_READ_A_REVIEW,
  REVIEW_FRESHNESS_RULES,
  REVIEW_LAYOUT_SECTIONS,
  REVIEWS_FAQ,
  SCORECARD_POINTS,
  USE_CASE_LINKS,
} from "@/lib/compare/reviewsIndexContent";
import { LearnSection as Section } from "../learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";
import { DefinitionList } from "./DefinitionList";
import { FaqList } from "./FaqList";
import { MakerOverview } from "./MakerOverview";
import { ModelShortlist } from "./ModelShortlist";
import { ReviewsIndexList } from "./ReviewsIndexList";
import { StatStrip } from "./StatStrip";

const PAGE_LINKS: readonly { id: string; label: string }[] = [
  { id: "start", label: "Where to start" },
  { id: "reviews", label: "All reviews" },
  { id: "makers", label: "By maker" },
  { id: "use-cases", label: "By use case" },
  { id: "layout", label: "What is in a review" },
  { id: "scorecard", label: "Scorecard" },
  { id: "labels", label: "Labels" },
  { id: "freshness", label: "Staying fresh" },
  { id: "how-to-read", label: "How to read one" },
  { id: "faq", label: "FAQ" },
];

/** Reviews index page: where to start, filterable review cards, makers, use cases, review method, labels and FAQ. */
export function ReviewsIndexView() {
  const scoresAsOf = formatIsoDate(DIRECTORY_SCORES_AS_OF);

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Levels 2-4 · Compare
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Model reviews</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          One fixed layout for every review: summary, who should skip it, price, test results, safety and a verdict. Each review shows its test date, so you can judge how fresh it is.
        </p>
        <StatStrip items={getReviewStatItems(MODEL_DIRECTORY_ROWS)} />
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          Scores as of {scoresAsOf}. Prices and features change. Confirm on the provider&apos;s website before buying.
        </p>
      </header>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {PAGE_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Section id="start" title="Which review should I read first?" intro="One model per need, based on the 'best for' label in the directory. Start here if you are not sure.">
        <ModelShortlist />
      </Section>

      <Section id="reviews" title="All reviews" intro="Search, filter by maker or price tier, or show only open-weight and local models.">
        <ReviewsIndexList />
        <p className="mb-0 mt-4 text-sm text-[var(--color-muted)]">
          Price tiers use the input price per million tokens: budget is up to ${BUDGET_TIER_MAX_INPUT_PRICE}, mid-priced is up to ${MID_TIER_MAX_INPUT_PRICE}, premium is above that. Open-weight and local means the weights can be downloaded, so check each licence.
        </p>
      </Section>

      <Section id="makers" title="Reviews by maker" intro="Every maker and its models, with the best score first.">
        <MakerOverview />
      </Section>

      <Section id="use-cases" title="Browse by use case" intro="Ranked roundups age better than single scores. Each one links back to the reviews.">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {USE_CASE_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className={`block rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-4 text-sm">
          Want two models head to head? See the <Link href="/compare/vs">head-to-head tests</Link>. Ready to switch tools? See the <Link href="/compare/alternatives">alternatives</Link>.
        </p>
      </Section>

      <Section id="layout" title="What is in every review" intro="Every review follows the same layout, so you always know where to look.">
        <DefinitionList items={REVIEW_LAYOUT_SECTIONS} />
      </Section>

      <Section id="scorecard" title="The seven-point scorecard" intro="Every model is scored on the same seven points, each with a fixed test.">
        <DefinitionList items={SCORECARD_POINTS} />
        <p className="mb-0 mt-4 text-sm">
          The full method, weights and test days are on <Link href="/about/how-we-test">How we test</Link>.
        </p>
      </Section>

      <Section id="labels" title="Labels on every number" intro="Each result says where it came from and when.">
        <DefinitionList items={RESULT_LABELS} />
        <h3 className="mb-3 mt-8">Date labels</h3>
        <DefinitionList items={FRESHNESS_LABELS} />
      </Section>

      <Section id="freshness" title="How reviews stay fresh">
        <DefinitionList items={REVIEW_FRESHNESS_RULES} />
        <p className="mb-0 mt-4 text-sm">
          See what changed on the <Link href="/news/changelog">changelog</Link>, or read about new releases in the <Link href="/news/weekly">weekly roundup</Link>.
        </p>
      </Section>

      <Section id="how-to-read" title="How to read a review">
        <DefinitionList items={HOW_TO_READ_A_REVIEW} />
      </Section>

      <Section id="independence" title="Independence">
        <div className={CARD_CLASS}>
          <p className="m-0">
            Payment never changes a score or verdict. Affiliate links are always disclosed, sponsored content is kept apart from reviews, and makers get no pre-publication access.
          </p>
          <p className="mb-0 mt-3 text-sm">
            <Link href="/about/independence">Independence and disclosure</Link> · <Link href="/about/editorial-standards">Editorial standards</Link> · <Link href="/about/corrections">Corrections log</Link>
          </p>
        </div>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <FaqList items={REVIEWS_FAQ} />
      </Section>

      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Want the numbers first?</p>
          <p className="m-0 font-semibold">See every model in one table</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/compare" className={BUTTON_OUTLINE}>Back to Compare</Link>
          <Link href="/compare/models" className={BUTTON_PRIMARY}>Open the model directory</Link>
        </div>
      </footer>
    </div>
  );
}