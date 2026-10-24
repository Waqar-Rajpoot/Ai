import Link from "next/link";
import { BADGE_CLASS, CARD_CLASS } from "@/components/shared/pageStyles";
import { BENCHLM_SCORES_AS_OF, PLAN_PRICES_AS_REPORTED } from "@/lib/tools/quizConstants";
import type { ModelPick } from "@/lib/tools/quizModels";
import type { QuizResult } from "@/lib/tools/quizRules";

interface QuizResultPanelProps {
  result: QuizResult;
}

function ModelCard({ pick }: { pick: ModelPick }) {
  const { model, role } = pick;
  return (
    <li className={CARD_CLASS}>
      <p className="m-0 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
        <span>{role}</span>
        {model.openWeight && <span className={`${BADGE_CLASS} normal-case tracking-normal`}>Open weight</span>}
      </p>
      <h5 className="mb-0 mt-1 text-lg">
        <Link href={`/compare/reviews/${model.id}`}>{model.name}</Link>
      </h5>
      <p className="m-0 text-sm text-[var(--color-muted)]">{model.maker} · {model.bestFor}</p>
      <dl className="mb-0 mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-[var(--color-muted)]">API price, in / out</dt>
        <dd className="m-0 tabular-nums">{model.apiPrice}</dd>
        <dt className="text-[var(--color-muted)]">Context</dt>
        <dd className="m-0 tabular-nums">{model.context}</dd>
        <dt className="text-[var(--color-muted)]">BenchLM score</dt>
        <dd className="m-0 tabular-nums">{model.benchLm}</dd>
      </dl>
      {model.note && <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">{model.note}</p>}
    </li>
  );
}

/** Shows a finished quiz result: the suggested type, why, plans, models, an alternative and next steps. */
export function QuizResultPanel({ result }: QuizResultPanelProps) {
  const { primary, alternative, reasons, cautions, picks, roundups } = result;
  const watchOut = [...primary.watchOut, ...cautions];

  return (
    <div className="grid gap-6">
      <section className={`${CARD_CLASS} relative overflow-hidden`} aria-labelledby="quiz-result-title">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0">
          <span className="rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Your suggested fit</span>
        </p>
        <h3 id="quiz-result-title" className="relative mb-1 mt-3 text-2xl">{primary.title}</h3>
        <p className="relative m-0 text-lg text-[var(--color-muted)]">{primary.tagline}</p>
        <p className="relative mb-0 mt-4"><span className={BADGE_CLASS}>Cost: {primary.costSummary}</span></p>
        <p className="relative mb-0 mt-3 text-sm"><strong>Who it suits:</strong> {primary.fits}</p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className={CARD_CLASS}>
          <h4 className="mt-0">Why this fits you</h4>
          <ul className="m-0 grid gap-2 pl-5 text-sm">
            {reasons.map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
        </section>
        <section className={CARD_CLASS}>
          <h4 className="mt-0">What you get</h4>
          <ul className="m-0 grid gap-2 pl-5 text-sm">
            {primary.whatYouGet.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </div>

      <section className={`${CARD_CLASS} border-amber-500/60`}>
        <h4 className="mt-0">What can go wrong</h4>
        <ul className="m-0 grid gap-2 pl-5 text-sm">
          {watchOut.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      {primary.plans.length > 0 && (
        <section aria-labelledby="quiz-result-plans">
          <h4 id="quiz-result-plans" className="mt-0">Plans to compare</h4>
          <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">US monthly prices for {primary.title}</caption>
              <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="p-3">Provider</th>
                  <th scope="col" className="p-3">Plan</th>
                  <th scope="col" className="p-3">US price</th>
                  <th scope="col" className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {primary.plans.map((plan) => (
                  <tr key={`${plan.provider}-${plan.plan}`} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 text-left align-top font-semibold">{plan.provider}</th>
                    <td className="p-3 align-top">{plan.plan}</td>
                    <td className="p-3 align-top tabular-nums">{plan.price}</td>
                    <td className="p-3 align-top text-[var(--color-muted)]">{plan.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
            Prices and features change. Confirm on the provider&apos;s website before buying. US prices as reported in {PLAN_PRICES_AS_REPORTED}. See the full <Link href="/prices/plans">plan table</Link>.
          </p>
        </section>
      )}

      <section aria-labelledby="quiz-result-models">
        <h4 id="quiz-result-models" className="mt-0">Models worth a look</h4>
        {picks.length > 0 ? (
          <>
            <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
              {picks.map((pick) => <ModelCard key={pick.model.id} pick={pick} />)}
            </ul>
            <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
              API prices are US dollars per million tokens. BenchLM scores are an independent composite as of {BENCHLM_SCORES_AS_OF}. A score is a shortlist, not a verdict.
              {primary.picksNote ? ` ${primary.picksNote}` : ""}
            </p>
          </>
        ) : (
          <p className={`${CARD_CLASS} m-0 text-sm`}>
            Our directory does not rank image, audio or video tools yet. Use the roundups below and judge samples by eye.
          </p>
        )}
        <p className="mb-0 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {roundups.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link href="/compare/models">Full model directory</Link>
        </p>
      </section>

      {alternative && (
        <section className={CARD_CLASS}>
          <h4 className="mt-0">If this is not quite right</h4>
          <p className="m-0 text-sm"><strong>{alternative.type.title}.</strong> {alternative.reason}</p>
          <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">Cost: {alternative.type.costSummary}</p>
        </section>
      )}

      <section className={CARD_CLASS}>
        <h4 className="mt-0">Your next steps</h4>
        <ul className="m-0 grid gap-2 pl-5 text-sm">
          {primary.nextSteps.map((link) => (
            <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
          ))}
        </ul>
      </section>
    </div>
  );
}