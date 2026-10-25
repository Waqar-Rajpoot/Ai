import Link from "next/link";
import { CheckList } from "@/components/learn/LearnSection";
import { CARD_CLASS } from "@/components/learn/learnStyles";
import type { EvidenceKind, Force } from "@/lib/society/forces";

const KIND_STYLES: Record<EvidenceKind, string> = {
  Measured: "border-emerald-500",
  Projected: "border-amber-500",
  Estimate: "border-[var(--color-accent)]",
  "In law": "border-sky-500",
};

/** One of the six forces: what we know, what we do not, both sides, signals, and a technical layer. */
export function ForceCard({ force }: { force: Force }) {
  return (
    <article id={force.id} className={`${CARD_CLASS} scroll-mt-24`}>
      <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Force {force.number} of 6</p>
      <h3 className="mb-1 mt-1 text-xl">{force.title}</h3>
      <p className="mt-0 font-semibold">{force.question}</p>
      <p className="text-[var(--color-muted)]">{force.summary}</p>

      <h4 className="mb-2 mt-5">What we know</h4>
      <ul className="m-0 grid list-none gap-3 p-0">
        {force.facts.map((fact) => (
          <li key={fact.text} className="rounded-xl border border-[var(--color-border)] p-3 text-sm">
            <p className="m-0">{fact.text}</p>
            <p className="mb-0 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--color-muted)]">
              <span className={`rounded-full border px-2 py-0.5 font-semibold text-[var(--color-text)] ${KIND_STYLES[fact.kind]}`}>{fact.kind}</span>
              <span>
                {fact.source} · {fact.date}
              </span>
            </p>
          </li>
        ))}
      </ul>

      <h4 className="mb-2 mt-5">What we do not know</h4>
      <CheckList items={force.unknowns} mark="?" />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/50 p-4 text-sm">
          <p className="m-0 font-semibold">The upside</p>
          <p className="mb-0 mt-1 text-[var(--color-muted)]">{force.upside}</p>
        </div>
        <div className="rounded-xl border border-amber-500/50 p-4 text-sm">
          <p className="m-0 font-semibold">The risk</p>
          <p className="mb-0 mt-1 text-[var(--color-muted)]">{force.risk}</p>
        </div>
      </div>

      <h4 className="mb-2 mt-5">Signals to watch</h4>
      <ul className="m-0 grid list-none gap-2 p-0 text-sm">
        {force.signals.map((signal) => (
          <li key={signal.name}>
            {signal.href ? (
              signal.href.startsWith("http") ? (
                <a href={signal.href} target="_blank" rel="noopener noreferrer">
                  {signal.name}
                </a>
              ) : (
                <Link href={signal.href}>{signal.name}</Link>
              )
            ) : (
              <strong>{signal.name}</strong>
            )}
            <span className="block text-xs text-[var(--color-muted)]">
              {signal.source} · {signal.cadence}
            </span>
          </li>
        ))}
      </ul>

      <details className="mt-5 rounded-xl border border-[var(--color-border)] p-4">
        <summary className="cursor-pointer font-semibold">Go deeper: the technical layer</summary>
        <ul className="mb-0 mt-3 grid gap-2 pl-5 text-sm text-[var(--color-muted)]">
          {force.deeper.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </details>

      <p className="mb-0 mt-4 text-sm">
        Read more: <Link href={force.readMore.href}>{force.readMore.label}</Link>
      </p>
    </article>
  );
}