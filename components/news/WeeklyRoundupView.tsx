import Link from "next/link";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { NEWSLETTER_BENEFITS, LABELS, SOURCE_STEPS } from "@/lib/news/newsContent";
import { SAMPLE_BANNER_TEXT, SPONSOR_LABEL } from "@/lib/news/roundupConstants";
import { EMPTY_COPY, FAQ, GLOSSARY, READ_GUIDE, RELATED_LINKS, SOURCE_LINE, WHAT_CAN_GO_WRONG } from "@/lib/news/roundupContent";
import { countRoundupItems, getAdjacentRoundups, roundupToPlainText } from "@/lib/news/roundups";
import { CLAIM_LABEL_TEXT, REVIEW_STATUS_TEXT, type WeeklyRoundup } from "@/lib/news/roundupTypes";
import { getWeekdayName } from "@/lib/news/weeklyArchive";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import { ARTICLE_AUTHOR_LABEL } from "@/lib/society/societyConstants";
import { PostLayout } from "./PostLayout";
import { RoundupDates } from "./RoundupDates";
import { RoundupToolbar } from "./RoundupToolbar";

void NEWSLETTER_BENEFITS;

/** One weekly roundup: the six standard parts, corrections, and the standard post wrapper. */
export function WeeklyRoundupView({ roundup }: { roundup: WeeklyRoundup }) {
  const counts = countRoundupItems(roundup);
  const { older, newer } = getAdjacentRoundups(roundup.slug);
  const hasPrices = roundup.priceChanges.length > 0 || roundup.releases.some((release) => release.priceNote !== null);

  const toc = [
    { id: "brief", label: "In brief" },
    { id: "releases", label: "New models" },
    { id: "prices", label: "Prices and plans" },
    { id: "policy", label: "Safety and policy" },
    { id: "next-week", label: "Next week" },
    { id: "sponsor", label: "Sponsor" },
    { id: "corrections", label: "Corrections" },
    { id: "faq", label: "FAQ" },
    { id: "subscribe", label: "Subscribe" },
  ];

  const chips: readonly { label: string; value: number; href: string }[] = [
    { label: "Releases", value: counts.releases, href: "#releases" },
    { label: "Price changes", value: counts.priceChanges, href: "#prices" },
    { label: "Policy items", value: counts.policyItems, href: "#policy" },
    { label: "Dates next week", value: counts.dates, href: "#next-week" },
  ];

  return (
    <PostLayout
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "News", href: "/news" },
        { label: "Weekly roundups", href: "/news/weekly" },
        { label: roundup.title },
      ]}
      kindLabel="Weekly roundup"
      levels={roundup.levels}
      title={roundup.title}
      author={roundup.author ?? ARTICLE_AUTHOR_LABEL}
      publishedOn={roundup.publishedOn}
      verifiedOn={roundup.verifiedOn}
      summary={roundup.summary}
      toc={toc}
      toolbar={<RoundupToolbar plainText={roundupToPlainText(roundup)} />}
      whatCanGoWrong={WHAT_CAN_GO_WRONG}
      showPriceDisclaimer={hasPrices}
      showAffiliateDisclosure={roundup.hasAffiliateLinks}
      sourceLine={`${SOURCE_LINE} Facts verified on ${formatIsoDate(roundup.verifiedOn)}.`}
      related={RELATED_LINKS}
      older={older ? { href: `/news/weekly/${older.slug}`, label: older.title } : null}
      newer={newer ? { href: `/news/weekly/${newer.slug}`, label: newer.title } : null}
    >
      {roundup.isSample && (
        <div className={`${CARD_CLASS} mt-6 border-amber-500/60`} role="note">
          <p className="m-0 text-sm font-semibold">{SAMPLE_BANNER_TEXT}</p>
        </div>
      )}

      <PageSection id="brief" title="This week in brief" intro={`Published on a ${getWeekdayName(roundup.publishedOn)}. Six parts, always in the same order.`}>
        <ul className={`${CARD_CLASS} m-0 grid gap-2 pl-8 text-sm`}>
          {roundup.highlights.map((point) => <li key={point}>{point}</li>)}
        </ul>
        <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
          {chips.map((chip) => (
            <li key={chip.label}>
              <a href={chip.href} className={`${BADGE_CLASS} no-underline ${FOCUS_RING}`}>{chip.label}: <strong className="tabular-nums">{chip.value}</strong></a>
            </li>
          ))}
        </ul>
        <details className={`${CARD_CLASS} mt-4 text-sm`}>
          <summary className={`cursor-pointer font-semibold ${FOCUS_RING}`}>How to read this roundup in two minutes</summary>
          <ol className="mb-0 mt-3 grid gap-2 pl-5">
            {READ_GUIDE.map((step) => <li key={step.headline}><strong>{step.headline}</strong> {step.detail}</li>)}
          </ol>
          <p className="mb-1 mt-4 font-semibold">Labels you will see</p>
          <dl className="m-0 grid gap-2 sm:grid-cols-2">
            {LABELS.map((entry) => (
              <div key={entry.label}>
                <dt className="font-semibold">{entry.label}</dt>
                <dd className="m-0 text-[var(--color-muted)]">{entry.meaning}</dd>
              </div>
            ))}
          </dl>
          <p className="mb-1 mt-4 font-semibold">Where a number comes from</p>
          <ol className="m-0 grid gap-1 pl-5 text-[var(--color-muted)]">
            {SOURCE_STEPS.map((step) => <li key={step.headline}>{step.headline.replace(/^\d\.\s*/, "")} {step.detail}</li>)}
          </ol>
        </details>
      </PageSection>

      <PageSection id="releases" title="New models and releases" intro="Models released this week, and whether they matter to you.">
        {roundup.releases.length === 0 ? (
          <div className={CARD_CLASS}><p className="m-0 text-sm text-[var(--color-muted)]">{EMPTY_COPY.releases}</p></div>
        ) : (
          <div className="grid gap-4">
            {roundup.releases.map((release) => (
              <article key={release.id} id={release.id} className={`${CARD_CLASS} scroll-mt-24`}>
                <header className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="m-0">{release.model}</h3>
                    <p className="m-0 text-sm text-[var(--color-muted)]">{release.maker}</p>
                  </div>
                  <ul className="m-0 flex list-none flex-wrap gap-1 p-0">
                    <li className={`${BADGE_CLASS} border-[var(--color-accent)]`}>{CLAIM_LABEL_TEXT[release.claimLabel]}</li>
                    <li className={BADGE_CLASS}>{REVIEW_STATUS_TEXT[release.reviewStatus]}</li>
                  </ul>
                </header>
                <p className="mb-0 mt-3 text-sm">{release.summary}</p>
                {(release.priceNote || release.contextNote) && (
                  <dl className="m-0 mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    {release.priceNote && <div><dt className="font-semibold">Price</dt><dd className="m-0 text-[var(--color-muted)]">{release.priceNote}</dd></div>}
                    {release.contextNote && <div><dt className="font-semibold">Context</dt><dd className="m-0 text-[var(--color-muted)]">{release.contextNote}</dd></div>}
                  </dl>
                )}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Should you care? For beginners</p>
                    <p className="mb-0 mt-1 text-sm">{release.forBeginners}</p>
                  </div>
                  <div>
                    <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">For power users</p>
                    <p className="mb-0 mt-1 text-sm">{release.forPowerUsers}</p>
                  </div>
                </div>
                <p className="mb-0 mt-4 flex flex-wrap gap-4 text-sm">
                  {release.releasePostHref && <Link href={release.releasePostHref}>Release post</Link>}
                  {release.directoryHref && <Link href={release.directoryHref}>Directory row</Link>}
                  {release.reviewHref && <Link href={release.reviewHref}>Full review</Link>}
                </p>
              </article>
            ))}
          </div>
        )}
      </PageSection>

      <PageSection id="prices" title="Price and plan changes" intro="Old and new figures side by side, with the date they take effect and where we checked.">
        {roundup.priceChanges.length === 0 ? (
          <div className={CARD_CLASS}>
            <p className="m-0 text-sm text-[var(--color-muted)]">{EMPTY_COPY.priceChanges} See <Link href="/prices/plans">consumer plans</Link> and <Link href="/prices/api">API costs</Link>.</p>
          </div>
        ) : (
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
              <caption className="sr-only">Price and plan changes in this roundup</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">What changed</th>
                  <th scope="col" className="p-3">Before</th>
                  <th scope="col" className="p-3">After</th>
                  <th scope="col" className="p-3">Takes effect</th>
                  <th scope="col" className="p-3">What it means</th>
                  <th scope="col" className="p-3">Source</th>
                </tr>
              </thead>
              <tbody>
                {roundup.priceChanges.map((change) => (
                  <tr key={change.id} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{change.provider}: {change.subject}</th>
                    <td className="p-3 align-top">{change.before}</td>
                    <td className="p-3 align-top">{change.after}</td>
                    <td className="p-3 align-top tabular-nums">{formatIsoDate(change.effectiveOn)}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{change.whatItMeans}</td>
                    <td className="p-3 align-top text-xs text-[var(--color-muted)]">
                      Verified on {formatIsoDate(change.verifiedOn)}
                      {change.sourceUrl && (<><br /><a href={change.sourceUrl} target="_blank" rel="noopener noreferrer">Provider page</a></>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageSection>

      <PageSection id="policy" title="Safety, privacy and policy" intro="Short plain-English items, each linked to the guide that explains the background.">
        {roundup.policyItems.length === 0 ? (
          <div className={CARD_CLASS}><p className="m-0 text-sm text-[var(--color-muted)]">{EMPTY_COPY.policyItems}</p></div>
        ) : (
          <div className="grid gap-4">
            {roundup.policyItems.map((item) => (
              <article key={item.id} id={item.id} className={`${CARD_CLASS} scroll-mt-24`}>
                <h3 className="mt-0">{item.title}</h3>
                <p className="m-0 text-sm"><strong>What happened:</strong> {item.whatHappened}</p>
                <p className="mb-0 mt-2 text-sm"><strong>What it means for you:</strong> {item.whatItMeans}</p>
                <p className="mb-0 mt-2 text-sm"><strong>Related guide:</strong> <Link href={item.guideHref}>{item.guideLabel}</Link></p>
                <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">
                  {formatIsoDate(item.occurredOn)} · Source:{" "}
                  {item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{item.sourceName}</a> : item.sourceName}
                </p>
              </article>
            ))}
          </div>
        )}
      </PageSection>

      <PageSection id="next-week" title="Next week" intro="Retirements and price dates in the seven days after this roundup.">
        {roundup.nextWeek.length === 0 ? (
          <div className={CARD_CLASS}>
            <p className="m-0 text-sm text-[var(--color-muted)]">{EMPTY_COPY.nextWeek} See the <Link href="/prices/retirements">retirements tracker</Link>.</p>
          </div>
        ) : (
          <RoundupDates items={roundup.nextWeek} publishedOn={roundup.publishedOn} />
        )}
      </PageSection>

      <PageSection id="sponsor" title="Sponsor slot">
        {roundup.sponsor ? (
          <aside className={`${CARD_CLASS} border-dashed`} aria-label="Sponsored message">
            <p className="m-0 flex flex-wrap items-center gap-2 text-sm font-semibold">
              <span className={`${BADGE_CLASS} border-[var(--color-accent)]`}>{SPONSOR_LABEL}</span>
              {roundup.sponsor.name}
            </p>
            <p className="mb-0 mt-2 text-sm">{roundup.sponsor.message}</p>
            {roundup.sponsor.url && (
              <p className="mb-0 mt-2 text-sm"><a href={roundup.sponsor.url} target="_blank" rel="sponsored noopener noreferrer">Visit {roundup.sponsor.name}</a></p>
            )}
            <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">Paid for by the sponsor, kept apart from the editorial parts above, and never a scoring input. See <Link href="/about/independence">independence and disclosure</Link>.</p>
          </aside>
        ) : (
          <div className={CARD_CLASS}><p className="m-0 text-sm text-[var(--color-muted)]">{EMPTY_COPY.sponsor}</p></div>
        )}
      </PageSection>

      <PageSection id="corrections" title="Corrections to this roundup">
        {roundup.corrections.length === 0 ? (
          <div className={CARD_CLASS}><p className="m-0 text-sm text-[var(--color-muted)]">{EMPTY_COPY.corrections} Spotted a mistake? <Link href="/about/corrections">Tell us</Link>.</p></div>
        ) : (
          <ul className={`${CARD_CLASS} m-0 grid list-none gap-3 p-4`}>
            {roundup.corrections.map((correction) => (
              <li key={`${correction.onDate}-${correction.text}`} className="text-sm">
                <strong className="tabular-nums">{formatIsoDate(correction.onDate)}:</strong> {correction.text}
              </li>
            ))}
          </ul>
        )}
      </PageSection>

      <PageSection id="faq" title="Questions about roundups">
        <div className="grid gap-3">
          {FAQ.map((entry) => (
            <details key={entry.question} className={`${CARD_CLASS} group py-3 print:hidden`}>
              <summary className={`cursor-pointer list-none font-semibold ${FOCUS_RING}`}>
                <span aria-hidden="true" className="mr-2 inline-block text-[var(--color-accent)] transition-transform group-open:rotate-90 motion-reduce:transition-none">▸</span>
                {entry.question}
              </summary>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{entry.answer}</p>
            </details>
          ))}
        </div>
        <h3>Terms in plain English</h3>
        <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 print:hidden">
          {GLOSSARY.map((entry) => (
            <div key={entry.term} className={CARD_CLASS}>
              <dt className="font-bold">{entry.term}</dt>
              <dd className="m-0 mt-1 text-sm text-[var(--color-muted)]">{entry.meaning}</dd>
            </div>
          ))}
        </dl>
      </PageSection>
    </PostLayout>
  );
}