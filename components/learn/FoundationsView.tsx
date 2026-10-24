// import Link from "next/link";
// import {
//   ABILITIES,
//   AI_KINDS,
//   CONSIDER_PAYING_IF,
//   DOES_BADLY,
//   DOES_WELL,
//   FREE_VS_PAID_ROWS,
//   GUIDES,
//   HOW_IT_WORKS_STEPS,
//   KEY_TERMS,
//   MYTHS,
//   PROMPT_TIPS,
//   RENEWAL_TIPS,
//   SCAM_TYPES,
//   SELF_CHECK_QUESTIONS,
//   SOURCES,
//   STAY_FREE_IF,
//   STRONG_PROMPT,
//   TOPICS,
//   VERIFY_STEPS,
//   WEAK_PROMPT,
//   WHERE_YOU_MEET_AI,
// } from "@/lib/learn/foundationsContent";
// import { CONTENT_CHECKED_ON } from "@/lib/learn/learnConstants";
// import { FOUNDATIONS_RESULT_MESSAGES } from "@/lib/learn/selfCheck";
// import { CheckList, LearnSection as Section } from "./LearnSection";
// import { PasteChecker } from "./PasteChecker";
// import { PromptBuilder } from "./PromptBuilder";
// import { SelfCheck } from "./SelfCheck";
// import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "./learnStyles";

// interface SectionProps {
//   id: string;
//   title: string;
//   intro?: string;
//   children: ReactNode;
// }

// function Section({ id, title, intro, children }: SectionProps) {
//   return (
//     <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 py-8">
//       <h2 id={`${id}-heading`} className={SECTION_HEADING}>
//         {title}
//       </h2>
//       {intro && <p className={SECTION_INTRO}>{intro}</p>}
//       {children}
//     </section>
//   );
// }

// function CheckList({ items, mark }: { items: readonly string[]; mark: string }) {
//   return (
//     <ul className="m-0 grid list-none gap-2 p-0">
//       {items.map((item) => (
//         <li key={item} className="flex gap-2">
//           <span aria-hidden="true" className="font-bold text-[var(--color-accent)]">{mark}</span>
//           <span>{item}</span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// /** Level 1 hub: self-check, the seven topics, interactive tools, guides and sources. */
// export function FoundationsView() {
//   return (
//     <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
//       {/* Hero */}
//       <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
//         <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
//         <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
//           Level 1 · Foundations
//         </p>
//         <h1 className="relative mb-3 mt-4 max-w-3xl">Start here: understand AI in plain English</h1>
//         <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
//           No experience needed. In about an hour you will know what AI is, how to ask for what you want, when to doubt
//           an answer, and what to keep private.
//         </p>
//         <div className="relative mt-6 flex flex-wrap gap-3">
//           <a href="#self-check" className={BUTTON_PRIMARY}>Take the self-check</a>
//           <a href="#guides" className={BUTTON_OUTLINE}>Jump to the guides</a>
//         </div>
//         <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
//           {[
//             { value: GUIDES.length, label: "guides" },
//             { value: TOPICS.length, label: "topics" },
//             { value: SELF_CHECK_QUESTIONS.length, label: "quiz questions" },
//           ].map((stat) => (
//             <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
//               <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
//               <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
//             </div>
//           ))}
//         </dl>
//         <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
//           Facts checked on {CONTENT_CHECKED_ON}. Prices and features change, so confirm them on the provider&apos;s website before buying.
//         </p>
//       </header>

//       {/* On this page */}
//       <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
//         {TOPICS.map((topic) => (
//           <a
//             key={topic.id}
//             href={`#${topic.id}`}
//             className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
//           >
//             {topic.title}
//           </a>
//         ))}
//       </nav>

//       <Section id="self-check" title="Self-check: where are you starting from?" intro="Six quick questions. You get feedback after each one, and nothing is stored.">
//            <SelfCheck questions={SELF_CHECK_QUESTIONS} messages={FOUNDATIONS_RESULT_MESSAGES} />
//       </Section>

//       <Section id="abilities" title="What you will be able to do">
//         <div className={CARD_CLASS}>
//           <CheckList items={ABILITIES} mark="✓" />
//         </div>
//       </Section>

//       <Section id="topics" title="Topics in this level" intro="Seven topics, plus a safety section on scams. Pick one, or read them in order.">
//         <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
//           {TOPICS.map((topic, index) => (
//             <li key={topic.id}>
//               <a
//                 href={`#${topic.id}`}
//                 className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
//               >
//                 <span className="text-xs font-bold text-[var(--color-accent)]">{String(index + 1).padStart(2, "0")}</span>
//                 <strong className="mt-1 block">{topic.title}</strong>
//                 <span className="mt-1 block text-sm text-[var(--color-muted)]">{topic.summary}</span>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </Section>

//       <Section id="what-is-ai" title="What AI is" intro="Regulators describe an AI system as a machine-based system that takes input and produces outputs such as predictions, content or recommendations. That covers much more than chatbots.">
//         <ul className="m-0 mb-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
//           {AI_KINDS.map((kind) => (
//             <li key={kind.id} className={CARD_CLASS}>
//               <strong>{kind.title}</strong>
//               <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{kind.summary}</p>
//             </li>
//           ))}
//         </ul>
//         <div className="grid gap-6 lg:grid-cols-2">
//           <div className={CARD_CLASS}>
//             <h3 className="mt-0">Where you already meet AI</h3>
//             <CheckList items={WHERE_YOU_MEET_AI} mark="•" />
//           </div>
//           <div className={CARD_CLASS}>
//             <h3 className="mt-0">Common myths</h3>
//             <dl className="m-0 grid gap-3">
//               {MYTHS.map((entry) => (
//                 <div key={entry.myth}>
//                   <dt className="font-semibold">Myth: {entry.myth}</dt>
//                   <dd className="m-0 text-sm text-[var(--color-muted)]">Fact: {entry.fact}</dd>
//                 </div>
//               ))}
//             </dl>
//           </div>
//         </div>
//       </Section>

//       <Section id="how-chatbots-work" title="How a chatbot works, without maths" intro="A simplified picture, enough to explain why chatbots are useful and why they sometimes get things wrong.">
//         <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
//           {HOW_IT_WORKS_STEPS.map((step, index) => (
//             <li key={step.id} className={CARD_CLASS}>
//               <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
//               <strong className="mt-3 block">{step.title}</strong>
//               <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{step.summary}</p>
//             </li>
//           ))}
//         </ol>
//         <aside className={`${CARD_CLASS} mt-6 border-[var(--color-accent)]`}>
//           <h3 className="mt-0">Why answers sound sure even when they are wrong</h3>
//           <p className="mb-0">
//             Researchers at OpenAI argue that models hallucinate partly because standard training and testing reward a
//             guess more than an honest &ldquo;I don&apos;t know&rdquo;, and they say the problem persists in the latest models.
//             Treat fluent writing as a draft to check, not as proof. <span className="text-[var(--color-muted)]">(Vendor-reported, 2025.)</span>
//           </p>
//         </aside>
//       </Section>

//       <Section id="prompts" title="Prompts and the five-part formula" intro="Our formula: Role, Task, Context, Format, Limits. It is this site's own checklist, and it matches the advice in vendor guides: be specific, give context, and say what the answer should look like.">
//         <PromptBuilder />
//         <div className="mt-6 grid gap-6 lg:grid-cols-2">
//           <div className={CARD_CLASS}>
//             <h3 className="mt-0">Weak vs strong</h3>
//             <p className="mb-1 text-sm font-semibold text-rose-500">Weak</p>
//             <p className="mt-0 rounded-xl bg-[var(--color-bg)] p-3">{WEAK_PROMPT}</p>
//             <p className="mb-1 text-sm font-semibold text-emerald-500">Strong</p>
//             <p className="m-0 rounded-xl bg-[var(--color-bg)] p-3">{STRONG_PROMPT}</p>
//           </div>
//           <div className={CARD_CLASS}>
//             <h3 className="mt-0">Six habits that help</h3>
//             <CheckList items={PROMPT_TIPS} mark="✓" />
//           </div>
//         </div>
//       </Section>

//       <Section id="key-terms" title="Key terms" intro="Twelve words you will see in every AI product. Tap a term to open it.">
//         <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//           {KEY_TERMS.map((entry) => (
//             <details key={entry.term} className={`${CARD_CLASS} group py-3`}>
//               <summary className={`cursor-pointer list-none font-semibold ${FOCUS_RING}`}>
//                 <span className="mr-2 inline-block text-[var(--color-accent)] transition-transform group-open:rotate-90 motion-reduce:transition-none" aria-hidden="true">▸</span>
//                 {entry.term}
//               </summary>
//               <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{entry.definition}</p>
//             </details>
//           ))}
//         </div>
//         <p className="mt-4 text-sm">
//           <Link href="/learn/glossary">See the full glossary</Link>
//         </p>
//       </Section>

//       <Section id="strengths-limits" title="What AI does well and badly">
//         <div className="grid gap-6 lg:grid-cols-2">
//           <div className={`${CARD_CLASS} border-emerald-500/50`}>
//             <h3 className="mt-0">Lean on it for</h3>
//             <CheckList items={DOES_WELL} mark="✓" />
//           </div>
//           <div className={`${CARD_CLASS} border-rose-500/50`}>
//             <h3 className="mt-0">Double-check it for</h3>
//             <CheckList items={DOES_BADLY} mark="!" />
//           </div>
//         </div>
//       </Section>

//       <Section id="free-vs-paid" title="Free vs paid plans" intro="The main differences are limits and features. Ads and privacy depend on the provider and your settings.">
//         <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
//           <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
//             <thead className="bg-[var(--color-surface)]">
//               <tr>
//                 <th scope="col" className="p-3">Topic</th>
//                 <th scope="col" className="p-3">Free</th>
//                 <th scope="col" className="p-3">Paid</th>
//               </tr>
//             </thead>
//             <tbody>
//               {FREE_VS_PAID_ROWS.map((row) => (
//                 <tr key={row.topic} className="border-t border-[var(--color-border)]">
//                   <th scope="row" className="p-3 align-top">{row.topic}</th>
//                   <td className="p-3 align-top text-[var(--color-muted)]">{row.free}</td>
//                   <td className="p-3 align-top text-[var(--color-muted)]">{row.paid}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="mt-6 grid gap-6 lg:grid-cols-3">
//           <div className={CARD_CLASS}>
//             <h3 className="mt-0">Stay free if</h3>
//             <CheckList items={STAY_FREE_IF} mark="•" />
//           </div>
//           <div className={CARD_CLASS}>
//             <h3 className="mt-0">Consider paying if</h3>
//             <CheckList items={CONSIDER_PAYING_IF} mark="•" />
//           </div>
//           <div className={CARD_CLASS}>
//             <h3 className="mt-0">Avoid surprise renewals</h3>
//             <CheckList items={RENEWAL_TIPS} mark="•" />
//           </div>
//         </div>
//         <p className="mt-4 text-sm text-[var(--color-muted)]">
//           Source: OpenAI announcement on ads (vendor-reported, checked {CONTENT_CHECKED_ON}). For current prices, see the{" "}
//           <Link href="/prices/plans">consumer plan table</Link>. Prices and features change. Confirm on the provider&apos;s website before buying.
//         </p>
//       </Section>

//       <Section id="privacy" title="Privacy basics" intro="Chats may be stored, and on some consumer plans they can be used to train future models unless you switch that off. Check the setting on every tool you use.">
//         <PasteChecker />
//         <div className={`${CARD_CLASS} mt-6`}>
//           <h3 className="mt-0">Check your data settings</h3>
//           <ol className="m-0 grid gap-1 pl-5">
//             <li>Open the app&apos;s settings and find the Privacy or Data controls page.</li>
//             <li>Look for a switch about using your chats to improve or train models, and decide on it.</li>
//             <li>Delete chats you do not need. Deleted chats are not used for future training on at least some providers, so check yours.</li>
//             <li>Use a work-approved tool for anything related to your job.</li>
//           </ol>
//           <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
//             Example: on Claude consumer plans the switch is called &ldquo;Help improve Claude&rdquo; (Settings, Privacy). Providers change these
//             terms, so confirm on the provider&apos;s own privacy page.
//           </p>
//         </div>
//       </Section>

//       <Section id="scams" title="Scams and deepfakes" intro="AI makes impersonation cheap. You cannot always tell a fake by looking or listening, so the defence is a habit: verify through a second channel.">
//         <ul className="m-0 mb-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
//           {SCAM_TYPES.map((scam) => (
//             <li key={scam.id} className={CARD_CLASS}>
//               <strong>{scam.title}</strong>
//               <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{scam.summary}</p>
//             </li>
//           ))}
//         </ul>
//         <div className={`${CARD_CLASS} border-[var(--color-accent)]`}>
//           <h3 className="mt-0">The five-step verify habit</h3>
//           <ol className="m-0 grid gap-1 pl-5">
//             {VERIFY_STEPS.map((step) => (
//               <li key={step}>{step}</li>
//             ))}
//           </ol>
//           <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
//             Based on advice from the US Federal Trade Commission on family emergency scams.
//           </p>
//         </div>
//       </Section>

//       <Section id="guides" title="Guides in this level" intro="Each takes 5 to 10 minutes. Start with guide 1, or jump to the safety guides first.">
//         <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
//           {GUIDES.map((guide) => {
//             const body = (
//               <>
//                 <div className="flex items-center justify-between gap-2 text-xs">
//                   <span className="font-bold text-[var(--color-accent)]">
//                     {guide.kind.toUpperCase()} {guide.number}
//                   </span>
//                   <span className="text-[var(--color-muted)]">{guide.minutes} min read</span>
//                 </div>
//                 <strong className="mt-2 block text-lg">{guide.title}</strong>
//                 <span className="mt-1 block text-sm text-[var(--color-muted)]">{guide.summary}</span>
//                 {!guide.isPublished && (
//                   <span className="mt-3 inline-block rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">Coming soon</span>
//                 )}
//               </>
//             );

//             return (
//               <li key={guide.number}>
//                 {guide.isPublished ? (
//                   <Link
//                     href={guide.href}
//                     className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
//                   >
//                     {body}
//                   </Link>
//                 ) : (
//                   <div className={`${CARD_CLASS} h-full opacity-80`}>{body}</div>
//                 )}
//               </li>
//             );
//           })}
//         </ol>
//       </Section>

//       <Section id="what-can-go-wrong" title="What can go wrong">
//         <div className={`${CARD_CLASS} border-amber-500/60`}>
//           <ul className="m-0 grid gap-1 pl-5">
//             <li>Wrong answers that sound right. Check anything you will act on.</li>
//             <li>Oversharing. Once pasted, you cannot take it back.</li>
//             <li>Treating a general answer as advice for your health, legal or money situation.</li>
//             <li>Trusting a familiar voice or video without verifying.</li>
//           </ul>
//         </div>
//       </Section>

//       <Section id="sources" title="Sources and labels" intro={`Facts on this page were checked on ${CONTENT_CHECKED_ON}. Vendor-reported means the claim comes from the company's own pages.`}>
//         <ul className="m-0 grid list-none gap-2 p-0">
//           {SOURCES.map((source) => (
//             <li key={source.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
//               <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">{source.type}</span>
//               <a href={source.href} target="_blank" rel="noopener noreferrer">
//                 {source.publisher}: {source.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//         <p className="mt-4 text-sm">
//           <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report an error</Link>
//         </p>
//       </Section>

//       {/* Next level */}
//       <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
//         <div>
//           <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next: Level 2</p>
//           <p className="m-0 font-semibold">Practitioner: use AI for real tasks with files and web search</p>
//         </div>
//         <Link href="/learn/practitioner" className={BUTTON_PRIMARY}>Continue to Practitioner</Link>
//       </footer>
//     </div>
//   );
// }









import Link from "next/link";
import {
  ABILITIES,
  AI_KINDS,
  CONSIDER_PAYING_IF,
  DOES_BADLY,
  DOES_WELL,
  FREE_VS_PAID_ROWS,
  GUIDES,
  HOW_IT_WORKS_STEPS,
  KEY_TERMS,
  MYTHS,
  PROMPT_TIPS,
  RENEWAL_TIPS,
  SCAM_TYPES,
  SELF_CHECK_QUESTIONS,
  SOURCES,
  STAY_FREE_IF,
  STRONG_PROMPT,
  TOPICS,
  VERIFY_STEPS,
  WEAK_PROMPT,
  WHERE_YOU_MEET_AI,
} from "@/lib/learn/foundationsContent";
import { CONTENT_CHECKED_ON } from "@/lib/learn/learnConstants";
import { FOUNDATIONS_RESULT_MESSAGES } from "@/lib/learn/selfCheck";
import { CheckList, LearnSection as Section } from "./LearnSection";
import { PasteChecker } from "./PasteChecker";
import { PromptBuilder } from "./PromptBuilder";
import { SelfCheck } from "./SelfCheck";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "./learnStyles";

/** Level 1 hub: self-check, the seven topics, interactive tools, guides and sources. */
export function FoundationsView() {
  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Level 1 · Foundations
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">Start here: understand AI in plain English</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          No experience needed. In about an hour you will know what AI is, how to ask for what you want, when to doubt
          an answer, and what to keep private.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <a href="#self-check" className={BUTTON_PRIMARY}>Take the self-check</a>
          <a href="#guides" className={BUTTON_OUTLINE}>Jump to the guides</a>
        </div>
        <dl className="relative mt-8 grid max-w-xl grid-cols-3 gap-4 text-center">
          {[
            { value: GUIDES.length, label: "guides" },
            { value: TOPICS.length, label: "topics" },
            { value: SELF_CHECK_QUESTIONS.length, label: "quiz questions" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-3">
              <dd className="m-0 text-2xl font-extrabold">{stat.value}</dd>
              <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          Facts checked on {CONTENT_CHECKED_ON}. Prices and features change, so confirm them on the provider&apos;s website before buying.
        </p>
      </header>

      {/* On this page */}
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {TOPICS.map((topic) => (
          <a
            key={topic.id}
            href={`#${topic.id}`}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            {topic.title}
          </a>
        ))}
      </nav>

      <Section id="self-check" title="Self-check: where are you starting from?" intro="Six quick questions. You get feedback after each one, and nothing is stored.">
        <SelfCheck questions={SELF_CHECK_QUESTIONS} messages={FOUNDATIONS_RESULT_MESSAGES} />
      </Section>

      <Section id="abilities" title="What you will be able to do">
        <div className={CARD_CLASS}>
          <CheckList items={ABILITIES} mark="✓" />
        </div>
      </Section>

      <Section id="topics" title="Topics in this level" intro="Seven topics, plus a safety section on scams. Pick one, or read them in order.">
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((topic, index) => (
            <li key={topic.id}>
              <a
                href={`#${topic.id}`}
                className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                <span className="text-xs font-bold text-[var(--color-accent)]">{String(index + 1).padStart(2, "0")}</span>
                <strong className="mt-1 block">{topic.title}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{topic.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="what-is-ai" title="What AI is" intro="Regulators describe an AI system as a machine-based system that takes input and produces outputs such as predictions, content or recommendations. That covers much more than chatbots.">
        <ul className="m-0 mb-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {AI_KINDS.map((kind) => (
            <li key={kind.id} className={CARD_CLASS}>
              <strong>{kind.title}</strong>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{kind.summary}</p>
            </li>
          ))}
        </ul>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Where you already meet AI</h3>
            <CheckList items={WHERE_YOU_MEET_AI} mark="•" />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Common myths</h3>
            <dl className="m-0 grid gap-3">
              {MYTHS.map((entry) => (
                <div key={entry.myth}>
                  <dt className="font-semibold">Myth: {entry.myth}</dt>
                  <dd className="m-0 text-sm text-[var(--color-muted)]">Fact: {entry.fact}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section id="how-chatbots-work" title="How a chatbot works, without maths" intro="A simplified picture, enough to explain why chatbots are useful and why they sometimes get things wrong.">
        <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li key={step.id} className={CARD_CLASS}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <strong className="mt-3 block">{step.title}</strong>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{step.summary}</p>
            </li>
          ))}
        </ol>
        <aside className={`${CARD_CLASS} mt-6 border-[var(--color-accent)]`}>
          <h3 className="mt-0">Why answers sound sure even when they are wrong</h3>
          <p className="mb-0">
            Researchers at OpenAI argue that models hallucinate partly because standard training and testing reward a
            guess more than an honest &ldquo;I don&apos;t know&rdquo;, and they say the problem persists in the latest models.
            Treat fluent writing as a draft to check, not as proof. <span className="text-[var(--color-muted)]">(Vendor-reported, 2025.)</span>
          </p>
        </aside>
      </Section>

      <Section id="prompts" title="Prompts and the five-part formula" intro="Our formula: Role, Task, Context, Format, Limits. It is this site's own checklist, and it matches the advice in vendor guides: be specific, give context, and say what the answer should look like.">
        <PromptBuilder />
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Weak vs strong</h3>
            <p className="mb-1 text-sm font-semibold text-rose-500">Weak</p>
            <p className="mt-0 rounded-xl bg-[var(--color-bg)] p-3">{WEAK_PROMPT}</p>
            <p className="mb-1 text-sm font-semibold text-emerald-500">Strong</p>
            <p className="m-0 rounded-xl bg-[var(--color-bg)] p-3">{STRONG_PROMPT}</p>
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Six habits that help</h3>
            <CheckList items={PROMPT_TIPS} mark="✓" />
          </div>
        </div>
      </Section>

      <Section id="key-terms" title="Key terms" intro="Twelve words you will see in every AI product. Tap a term to open it.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {KEY_TERMS.map((entry) => (
            <details key={entry.term} className={`${CARD_CLASS} group py-3`}>
              <summary className={`cursor-pointer list-none font-semibold ${FOCUS_RING}`}>
                <span className="mr-2 inline-block text-[var(--color-accent)] transition-transform group-open:rotate-90 motion-reduce:transition-none" aria-hidden="true">▸</span>
                {entry.term}
              </summary>
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{entry.definition}</p>
            </details>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href="/learn/glossary">See the full glossary</Link>
        </p>
      </Section>

      <Section id="strengths-limits" title="What AI does well and badly">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={`${CARD_CLASS} border-emerald-500/50`}>
            <h3 className="mt-0">Lean on it for</h3>
            <CheckList items={DOES_WELL} mark="✓" />
          </div>
          <div className={`${CARD_CLASS} border-rose-500/50`}>
            <h3 className="mt-0">Double-check it for</h3>
            <CheckList items={DOES_BADLY} mark="!" />
          </div>
        </div>
      </Section>

      <Section id="free-vs-paid" title="Free vs paid plans" intro="The main differences are limits and features. Ads and privacy depend on the provider and your settings.">
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th scope="col" className="p-3">Topic</th>
                <th scope="col" className="p-3">Free</th>
                <th scope="col" className="p-3">Paid</th>
              </tr>
            </thead>
            <tbody>
              {FREE_VS_PAID_ROWS.map((row) => (
                <tr key={row.topic} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top">{row.topic}</th>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.free}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Stay free if</h3>
            <CheckList items={STAY_FREE_IF} mark="•" />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Consider paying if</h3>
            <CheckList items={CONSIDER_PAYING_IF} mark="•" />
          </div>
          <div className={CARD_CLASS}>
            <h3 className="mt-0">Avoid surprise renewals</h3>
            <CheckList items={RENEWAL_TIPS} mark="•" />
          </div>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Source: OpenAI announcement on ads (vendor-reported, checked {CONTENT_CHECKED_ON}). For current prices, see the{" "}
          <Link href="/prices/plans">consumer plan table</Link>. Prices and features change. Confirm on the provider&apos;s website before buying.
        </p>
      </Section>

      <Section id="privacy" title="Privacy basics" intro="Chats may be stored, and on some consumer plans they can be used to train future models unless you switch that off. Check the setting on every tool you use.">
        <PasteChecker />
        <div className={`${CARD_CLASS} mt-6`}>
          <h3 className="mt-0">Check your data settings</h3>
          <ol className="m-0 grid gap-1 pl-5">
            <li>Open the app&apos;s settings and find the Privacy or Data controls page.</li>
            <li>Look for a switch about using your chats to improve or train models, and decide on it.</li>
            <li>Delete chats you do not need. Deleted chats are not used for future training on at least some providers, so check yours.</li>
            <li>Use a work-approved tool for anything related to your job.</li>
          </ol>
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
            Example: on Claude consumer plans the switch is called &ldquo;Help improve Claude&rdquo; (Settings, Privacy). Providers change these
            terms, so confirm on the provider&apos;s own privacy page.
          </p>
        </div>
      </Section>

      <Section id="scams" title="Scams and deepfakes" intro="AI makes impersonation cheap. You cannot always tell a fake by looking or listening, so the defence is a habit: verify through a second channel.">
        <ul className="m-0 mb-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {SCAM_TYPES.map((scam) => (
            <li key={scam.id} className={CARD_CLASS}>
              <strong>{scam.title}</strong>
              <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{scam.summary}</p>
            </li>
          ))}
        </ul>
        <div className={`${CARD_CLASS} border-[var(--color-accent)]`}>
          <h3 className="mt-0">The five-step verify habit</h3>
          <ol className="m-0 grid gap-1 pl-5">
            {VERIFY_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
            Based on advice from the US Federal Trade Commission on family emergency scams.
          </p>
        </div>
      </Section>

      <Section id="guides" title="Guides in this level" intro="Each takes 5 to 10 minutes. Start with guide 1, or jump to the safety guides first.">
        <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
          {GUIDES.map((guide) => {
            const body = (
              <>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-[var(--color-accent)]">
                    {guide.kind.toUpperCase()} {guide.number}
                  </span>
                  <span className="text-[var(--color-muted)]">{guide.minutes} min read</span>
                </div>
                <strong className="mt-2 block text-lg">{guide.title}</strong>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{guide.summary}</span>
                {!guide.isPublished && (
                  <span className="mt-3 inline-block rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">Coming soon</span>
                )}
              </>
            );

            return (
              <li key={guide.number}>
                {guide.isPublished ? (
                  <Link
                    href={guide.href}
                    className={`${CARD_CLASS} block h-full text-[var(--color-text)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div className={`${CARD_CLASS} h-full opacity-80`}>{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      <Section id="what-can-go-wrong" title="What can go wrong">
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <ul className="m-0 grid gap-1 pl-5">
            <li>Wrong answers that sound right. Check anything you will act on.</li>
            <li>Oversharing. Once pasted, you cannot take it back.</li>
            <li>Treating a general answer as advice for your health, legal or money situation.</li>
            <li>Trusting a familiar voice or video without verifying.</li>
          </ul>
        </div>
      </Section>

      <Section id="sources" title="Sources and labels" intro={`Facts on this page were checked on ${CONTENT_CHECKED_ON}. Vendor-reported means the claim comes from the company's own pages.`}>
        <ul className="m-0 grid list-none gap-2 p-0">
          {SOURCES.map((source) => (
            <li key={source.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">{source.type}</span>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.publisher}: {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/about/source-policy">How we choose sources</Link> · <Link href="/about/corrections">Report an error</Link>
        </p>
      </Section>

      {/* Next level */}
      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Next: Level 2</p>
          <p className="m-0 font-semibold">Practitioner: use AI for real tasks with files and web search</p>
        </div>
        <Link href="/learn/practitioner" className={BUTTON_PRIMARY}>Continue to Practitioner</Link>
      </footer>
    </div>
  );
}