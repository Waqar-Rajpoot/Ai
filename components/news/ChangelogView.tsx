import Link from "next/link";
import { CARD_CLASS } from "@/components/shared/pageStyles";
import { ChangelogExplorer } from "@/components/news/ChangelogExplorer";
import { SourceConflictBoard } from "@/components/news/SourceConflictBoard";
import { CHANGELOG } from "@/lib/news/changelogData";
import { CORRECTIONS_HREF, SOURCE_POLICY_HREF } from "@/lib/news/changelogConstants";
import { formatIsoLabel, getLatestDate, getOpenConflicts, sortEntries, toIsoDate, validateChangelog } from "@/lib/news/changelogLogic";

const problems = validateChangelog(CHANGELOG, toIsoDate(new Date()));
if (problems.length > 0) {
  throw new Error(`Changelog is invalid:\n${problems.join("\n")}`);
}

const SORTED = sortEntries(CHANGELOG);
const OPEN_CONFLICTS = getOpenConflicts(SORTED);
const LATEST = getLatestDate(SORTED);
const CORRECTION_COUNT = SORTED.filter((entry) => entry.kind === "correction").length;

/** /news/changelog: what changed on the site, which sources disagreed, and where corrections live. */
export function ChangelogView() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">Trust</p>
        <h1 className="mb-2 mt-1">What changed on this site, and why you can trust the numbers</h1>
        <p className="m-0 text-lg">
          Every number, name and date on this site can change. This log shows when it did, which sources disagreed, which one we used, and what we have not been able to confirm yet.
        </p>
      </header>

      <section aria-label="At a glance" className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className={CARD_CLASS}>
          <p className="m-0 text-2xl font-bold">{SORTED.length}</p>
          <p className="m-0 text-sm text-[var(--color-muted)]">dated entries</p>
        </div>
        <div className={CARD_CLASS}>
          <p className="m-0 text-2xl font-bold">{LATEST ? formatIsoLabel(LATEST) : "None yet"}</p>
          <p className="m-0 text-sm text-[var(--color-muted)]">latest entry</p>
        </div>
        <div className={CARD_CLASS}>
          <p className="m-0 text-2xl font-bold">{OPEN_CONFLICTS.length}</p>
          <p className="m-0 text-sm text-[var(--color-muted)]">source conflicts still open</p>
        </div>
        <div className={CARD_CLASS}>
          <p className="m-0 text-2xl font-bold">{CORRECTION_COUNT}</p>
          <p className="m-0 text-sm text-[var(--color-muted)]">
            corrections in this log. <Link href={CORRECTIONS_HREF}>Full corrections log</Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="open-conflicts" className="mb-10">
        <h2 id="open-conflicts" className="mb-1">Check these before you rely on them</h2>
        <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">
          These are the places where sources disagree and we have not yet read the provider&apos;s own page. The site shows our best pick and labels it.
        </p>
        <SourceConflictBoard entries={OPEN_CONFLICTS} />
      </section>

      <section aria-labelledby="how-we-decide" className={`${CARD_CLASS} mb-10`}>
        <h2 id="how-we-decide" className="mt-0">How we settle a disagreement</h2>
        <ol className="mb-0 space-y-2 pl-5 text-sm">
          <li>The provider&apos;s own page wins over press coverage, and a dated page wins over an undated one.</li>
          <li>If we cannot reach the provider&apos;s page, we use the newest secondary source and label the number as reported, not confirmed.</li>
          <li>If two sources measure different things, we keep both and say what each one counted.</li>
          <li>When we are wrong, it goes in the <Link href={CORRECTIONS_HREF}>corrections log</Link> with what we said, what is true, and when we fixed it.</li>
        </ol>
        <p className="mb-0 mt-3 text-sm">
          The full rules are in the <Link href={SOURCE_POLICY_HREF}>source policy</Link>.
        </p>
      </section>

      <section aria-labelledby="all-entries">
        <h2 id="all-entries" className="sr-only">All entries</h2>
        <ChangelogExplorer entries={SORTED} />
      </section>
    </main>
  );
}