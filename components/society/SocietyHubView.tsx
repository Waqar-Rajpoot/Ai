import Link from "next/link";
import { FaqList } from "@/components/compare/FaqList";
import { RelatedLinks } from "@/components/compare/RelatedLinks";
import { ComparisonTable } from "@/components/learn/ComparisonTable";
import { CheckList, LearnSection as Section } from "@/components/learn/LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  articleHref,
  ARTICLE_GROUPS,
  BY_INTEREST_TABLE,
  findArticle,
  HOW_WE_COVER_LEGEND,
  HOW_WE_COVER_RULES,
  INTERACTIVE_FEATURES,
  INTERACTIVE_NOTE,
  LATEST_DATA,
  LATEST_DATA_NOTE,
  NOT_ADVICE_NOTE,
  READING_PATHS,
  SOCIETY_ARTICLES,
  SOCIETY_AUTHOR,
  SOCIETY_CHECKED_ON,
  SOCIETY_FAQ,
  SOCIETY_READ_MINUTES,
  SOCIETY_RELATED,
  SOCIETY_SECTIONS,
  SOCIETY_SOURCES,
  SOCIETY_WHAT_CAN_GO_WRONG,
  START_HERE_NUMBERS,
  type HubArticle,
} from "@/lib/society/hubContent";
import { MYTH_FACT_ITEMS } from "@/lib/society/mythsFacts";
import { MythFactCards } from "./MythFactCards";
import { DepthProvider, DepthText, PlainTechnicalToggle } from "./PlainTechnicalToggle";

function ArticleStatus({ article }: { article: HubArticle }) {
  return article.isPublished ? (
    <Link href={articleHref(article)} className={BUTTON_PRIMARY}>
      Read the article
    </Link>
  ) : (
    <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold">Coming soon</span>
  );
}

function ArticleCard({ article, eyebrow }: { article: HubArticle; eyebrow?: string }) {
  return (
    <li className={`${CARD_CLASS} flex flex-col`}>
      <p className="m-0 text-xs font-bold text-[var(--color-accent)]">
        {eyebrow ?? `Article ${article.number}`} · {article.type} · {article.minutes} min
      </p>
      <strong className="mt-1 text-lg">{article.title}</strong>
      <p className="mb-0 mt-1 grow text-sm text-[var(--color-muted)]">
        <DepthText plain={article.plain} technical={article.technical} />
      </p>
      <div className="mt-4">
        <ArticleStatus article={article} />
      </div>
    </li>
  );
}

/** AI & Society hub: start here, reading paths, all articles, interactive features and the latest data. */
export function SocietyHubView() {
  const startHere = START_HERE_NUMBERS.flatMap((number) => {
    const article = findArticle(number);
    return article ? [article] : [];
  });

  return (
    <DepthProvider>
      <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
        {/* Header */}
        <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
          <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            All levels · Hub
          </p>
          <h1 className="relative mb-3 mt-4 max-w-3xl">AI &amp; Society: how AI is changing daily life, work and the world</h1>
          <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
            Balanced, dated and sourced. Read about the benefits and the risks together, try the interactive features, and see the latest numbers from named surveys and trackers.
          </p>
          <p className="relative mb-0 mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
            <span>By {SOCIETY_AUTHOR}</span>
            <span>Figures checked {SOCIETY_CHECKED_ON}</span>
            <span>{SOCIETY_READ_MINUTES} min read</span>
          </p>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <a href="#start-here" className={BUTTON_PRIMARY}>Start here</a>
            <a href="#interactive-features" className={BUTTON_OUTLINE}>Try the interactive features</a>
          </div>
          <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
            {[
              { value: SOCIETY_ARTICLES.length, label: "articles" },
              { value: INTERACTIVE_FEATURES.length, label: "interactive features" },
              { value: HOW_WE_COVER_RULES.length, label: "rules for every page" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
                <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
                <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <div className="relative mt-6">
            <PlainTechnicalToggle />
          </div>
        </header>

        {/* On this page */}
        <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
          {SOCIETY_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <Section id="start-here" title="Start here" intro="Five articles that give a fair picture, in reading order. Switch to Technical above for sources and definitions.">
          <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {startHere.map((article) => (
              <ArticleCard key={article.number} article={article} eyebrow={article.shortLabel} />
            ))}
          </ol>
        </Section>

        <Section id="reading-paths" title="Reading paths" intro="Pick a path by how much time you have, or by what you care about.">
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
            {READING_PATHS.map((path) => (
              <li key={path.id} className={CARD_CLASS}>
                <h3 className="mb-1 mt-0">{path.title}</h3>
                <p className="mt-0 text-sm text-[var(--color-muted)]">{path.bestFor}</p>
                <ul className="m-0 grid list-none gap-1 p-0 text-sm">
                  {path.articleNumbers.map((number) => {
                    const article = findArticle(number);
                    if (!article) return null;
                    return (
                      <li key={number}>
                        {article.isPublished ? <Link href={articleHref(article)}>{article.title}</Link> : <span>{article.title} <span className="text-xs text-[var(--color-muted)]">(coming soon)</span></span>}
                      </li>
                    );
                  })}
                </ul>
                {path.extra && <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">{path.extra}</p>}
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-8">By what you care about</h3>
          <ComparisonTable {...BY_INTEREST_TABLE} />
        </Section>

        <Section id="all-articles" title="All twelve articles" intro="Grouped by theme. Each one is two-sided, dated and sourced.">
          <div className="grid gap-10">
            {ARTICLE_GROUPS.map((group) => {
              const articles = SOCIETY_ARTICLES.filter((article) => article.group === group.id);
              return (
                <div key={group.id}>
                  <h3 className="mb-1 mt-0">{group.title}</h3>
                  <p className="mb-4 mt-0 text-sm text-[var(--color-muted)]">{group.intro}</p>
                  <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                      <ArticleCard key={article.number} article={article} />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>

        <Section id="interactive-features" title="Interactive features" intro="Four short features turn the articles into something you can try. Each one links back to the article it comes from.">
          <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {INTERACTIVE_FEATURES.map((feature) => {
              const article = findArticle(feature.articleNumber);
              return (
                <li key={feature.id} className={`${CARD_CLASS} flex flex-col`}>
                  <p className="m-0 text-xs font-bold text-[var(--color-accent)]">About {feature.minutes} min</p>
                  <strong className="mt-1 text-lg">{feature.title}</strong>
                  <p className="mb-1 mt-2 text-sm">
                    <span className="font-semibold">What it does: </span>
                    {feature.whatItDoes}
                  </p>
                  <p className="m-0 grow text-sm">
                    <span className="font-semibold">What you get: </span>
                    {feature.youGet}
                  </p>
                  {article && (
                    <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
                      From article {article.number}:{" "}
                      {article.isPublished ? <Link href={articleHref(article)}>{article.title}</Link> : article.title}
                    </p>
                  )}
                  <div className="mt-4">
                    {feature.isPublished ? (
                      <Link href={feature.href} className={BUTTON_PRIMARY}>
                        Open it
                      </Link>
                    ) : (
                      <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold">Coming soon</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-[var(--color-muted)]">{INTERACTIVE_NOTE}</p>

          <h3 className="mb-2 mt-10">Try it now: myth or fact?</h3>
          <p className="mb-4 mt-0 text-sm text-[var(--color-muted)]">
            A preview of the myth-or-fact cards. Six claims, each checked against a named source and date. The full set will live on its own page.
          </p>
          <MythFactCards items={MYTH_FACT_ITEMS} />
        </Section>

        <Section id="latest-data" title="Latest data" intro={`Four anchor figures, each with its source and date. Checked ${SOCIETY_CHECKED_ON}.`}>
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
            {LATEST_DATA.map((item) => (
              <li key={item.id} className={CARD_CLASS}>
                <p className="m-0 text-3xl font-extrabold">{item.value}</p>
                <p className="mb-2 mt-1 text-sm">{item.label}</p>
                <p className="m-0 text-xs text-[var(--color-muted)]">
                  {item.kind} · {item.source} · {item.date}
                </p>
                <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">
                  <DepthText plain="" technical={item.technical} />
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--color-muted)]">{LATEST_DATA_NOTE}</p>
          <p className="mt-2 text-sm">
            See the signals behind these numbers in <Link href="/society/future-of-ai#signals">The future of AI</Link>, and how adoption is counted in <Link href="/society/ai-adoption-data">How fast is AI spreading?</Link>.
          </p>
        </Section>

        <Section id="how-we-cover" title="How we cover AI and society" intro="Four rules apply to every page in this section, and every figure carries a label.">
          <div className={CARD_CLASS}>
            <CheckList items={HOW_WE_COVER_RULES} mark="✓" />
          </div>
          <div className="mt-6">
            <ComparisonTable {...HOW_WE_COVER_LEGEND} />
          </div>
          <p className="mt-4 text-sm text-[var(--color-muted)]">{NOT_ADVICE_NOTE}</p>
          <p className="mt-2 text-sm">
            <Link href="/about/how-we-test">How we test</Link> · <Link href="/about/source-policy">Source policy</Link> · <Link href="/about/independence">Independence and disclosure</Link>
          </p>
        </Section>

        <Section id="faq" title="Frequently asked questions">
          <FaqList items={SOCIETY_FAQ} />
        </Section>

        <Section id="what-can-go-wrong" title="What can go wrong">
          <div className={`${CARD_CLASS} border-amber-500/60`}>
            <ul className="m-0 grid gap-1 pl-5">
              {SOCIETY_WHAT_CAN_GO_WRONG.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="sources" title="Sources and labels" intro="Official means a government or central-bank body. Independent third party means an outside group that publishes its own work. Secondary sources are leads, not the final word.">
          <ul className="m-0 grid list-none gap-2 p-0">
            {SOCIETY_SOURCES.map((source) => (
              <li key={source.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">{source.label}</span>
                <a href={source.href} target="_blank" rel="noopener noreferrer">
                  {source.publisher}: {source.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/news/changelog">Changelog</Link> · <Link href="/about/corrections">Report an error</Link>
          </p>
        </Section>

        <Section id="related" title="Related pages">
          <RelatedLinks items={SOCIETY_RELATED} />
        </Section>

        {/* Where next */}
        <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Not sure where to begin?</p>
            <p className="m-0 font-semibold">Try the interactive features, or read the six forces to watch to 2030</p>
            <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
              Want new data as it lands? <Link href="/newsletter">Get the weekly roundup</Link>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#interactive-features" className={BUTTON_OUTLINE}>Interactive features</a>
            <Link href="/society/future-of-ai" className={BUTTON_PRIMARY}>Read the six forces</Link>
          </div>
        </footer>
      </div>
    </DepthProvider>
  );
}