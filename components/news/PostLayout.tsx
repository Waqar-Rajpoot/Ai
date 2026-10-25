import Link from "next/link";
import type { ReactNode } from "react";
import { NewsletterBox } from "@/components/shared/NewsletterBox";
import { PageSection } from "@/components/shared/PageSection";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { NEWSLETTER_ACTION_URL } from "@/lib/config/env";
import { describePostLevels, type NewsLevel } from "@/lib/news/news";
import { NEWSLETTER_EMAIL_FIELD_NAME } from "@/lib/news/newsConstants";
import { NEWSLETTER_BENEFITS } from "@/lib/news/newsContent";
import { AFFILIATE_DISCLOSURE, PRICE_DISCLAIMER } from "@/lib/news/roundupConstants";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import type { RelatedLink } from "@/lib/society/societyContentTypes";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TocItem {
  id: string;
  label: string;
}

export interface AdjacentLink {
  href: string;
  label: string;
}

interface PostLayoutProps {
  breadcrumbs: readonly BreadcrumbItem[];
  /** "Weekly roundup", "Release post"... */
  kindLabel: string;
  levels: readonly NewsLevel[];
  title: string;
  author: string;
  publishedOn: string;
  verifiedOn: string | null;
  summary: string;
  toc: readonly TocItem[];
  /** Copy, print and similar buttons, shown under the header. */
  toolbar?: ReactNode;
  whatCanGoWrong: readonly string[];
  showPriceDisclaimer: boolean;
  showAffiliateDisclosure: boolean;
  sourceLine: string;
  related: readonly RelatedLink[];
  older?: AdjacentLink | null;
  newer?: AdjacentLink | null;
  children: ReactNode;
}

/** The standard wrapper for every news post (Blueprint 5.0): breadcrumbs, badges, summary, then the closing boxes. */
export function PostLayout({
  breadcrumbs,
  kindLabel,
  levels,
  title,
  author,
  publishedOn,
  verifiedOn,
  summary,
  toc,
  toolbar,
  whatCanGoWrong,
  showPriceDisclaimer,
  showAffiliateDisclosure,
  sourceLine,
  related,
  older = null,
  newer = null,
  children,
}: PostLayoutProps) {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted)] print:hidden">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.label}>
            {index > 0 && " › "}
            {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
          </span>
        ))}
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl print:hidden" />
        <p className="relative m-0 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-white">{kindLabel}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>{describePostLevels(levels)}</span>
          <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Published {formatIsoDate(publishedOn)}</span>
          {verifiedOn && <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Verified on {formatIsoDate(verifiedOn)}</span>}
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">{title}</h1>
        <p className="relative m-0 text-sm text-[var(--color-muted)]">By {author}</p>
        <div className={`${CARD_CLASS} relative mt-5 max-w-3xl border-[var(--color-accent)]`}>
          <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Summary</p>
          <p className="mb-0 mt-1 text-sm">{summary}</p>
        </div>
        {toolbar && <div className="relative mt-4">{toolbar}</div>}
      </header>

      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2 print:hidden">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {children}

      <PageSection id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {whatCanGoWrong.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </div>
        {showPriceDisclaimer && <p className="mb-0 mt-3 text-sm font-semibold">{PRICE_DISCLAIMER}</p>}
        {showAffiliateDisclosure && <p className="mb-0 mt-2 text-sm font-semibold">{AFFILIATE_DISCLOSURE}</p>}
      </PageSection>

      <PageSection id="sources" title="Sources and labels">
        <p className="m-0 text-sm text-[var(--color-muted)]">{sourceLine}</p>
        <p className="mb-0 mt-3 text-sm">
          <Link href="/about/source-policy">Source policy</Link> · <Link href="/about/how-we-test">How we test</Link> · <Link href="/about/corrections">Report an error</Link> · <Link href="/news/changelog">Changelog</Link>
        </p>
      </PageSection>

      <div className="print:hidden">
        <PageSection id="related" title="Keep reading">
          <ul className="m-0 grid list-none gap-3 p-0 text-sm sm:grid-cols-2">
            {related.map((link) => (
              <li key={link.href} className={CARD_CLASS}>
                <Link href={link.href}>{link.label}</Link>
                <span className="block text-xs text-[var(--color-muted)]">{link.note}</span>
              </li>
            ))}
          </ul>
        </PageSection>

        {(older || newer) && (
          <nav aria-label="Other roundups" className="mt-6 grid gap-3 sm:grid-cols-2">
            {older ? (
              <Link href={older.href} className={`${CARD_CLASS} no-underline ${FOCUS_RING}`}>
                <span className="block text-xs text-[var(--color-muted)]">← Older roundup</span>
                <span className="font-semibold">{older.label}</span>
              </Link>
            ) : <span />}
            {newer && (
              <Link href={newer.href} className={`${CARD_CLASS} text-right no-underline ${FOCUS_RING}`}>
                <span className="block text-xs text-[var(--color-muted)]">Newer roundup →</span>
                <span className="font-semibold">{newer.label}</span>
              </Link>
            )}
          </nav>
        )}

        <div id="subscribe" className="mt-8 scroll-mt-24">
          <NewsletterBox
            actionUrl={NEWSLETTER_ACTION_URL}
            emailFieldName={NEWSLETTER_EMAIL_FIELD_NAME}
            heading="Get the weekly roundup by email"
            description="The same roundup you just read, sent on a fixed weekday."
            benefits={NEWSLETTER_BENEFITS}
          />
        </div>
      </div>
    </div>
  );
}