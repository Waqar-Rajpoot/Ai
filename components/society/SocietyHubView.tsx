// import Link from "next/link";
// import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
// import {
//   getFirstTopic,
//   getTopicHref,
//   INTERACTIVE_FEATURES_ANCHOR,
//   SOCIETY_INTERACTIVE_FEATURES,
//   SOCIETY_TOPIC_GROUPS,
//   SOCIETY_TRUST_LINKS,
//   type SocietyTopic,
// } from "@/lib/society/societyTopics";

// const SECTION_LAYOUT = "grid gap-6 border-t border-[var(--color-border)] py-10 lg:grid-cols-[16rem_1fr] lg:gap-12";

// function TopicRow({ topic }: { topic: SocietyTopic }) {
//   return (
//     <li>
//       <Link
//         href={getTopicHref(topic)}
//         className={`group block rounded-lg px-3 py-4 text-[var(--color-text)] no-underline transition hover:bg-[var(--color-surface)] motion-reduce:transition-none ${FOCUS_RING}`}
//       >
//         <span className="block text-lg font-semibold group-hover:underline">{topic.title}</span>
//         <span className="mt-1 block max-w-prose text-sm text-[var(--color-muted)]">{topic.description}</span>
//       </Link>
//     </li>
//   );
// }

// /** AI & Society hub: groups every article by theme and links to the interactive features. */
// export function SocietyHubView() {
//   const firstTopic = getFirstTopic();
//   const hasInteractiveFeatures = SOCIETY_INTERACTIVE_FEATURES.length > 0;

//   return (
//     <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-10">
//       <header className="max-w-3xl pb-10">
//         <h1 className="m-0">How AI is changing daily life, work and the world</h1>
//         <p className="mb-0 mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
//           Each page weighs benefits and risks together, and every figure names its source and date.
//         </p>
//         <div className="mt-6 flex flex-wrap gap-3">
//           <Link href={getTopicHref(firstTopic)} className={BUTTON_PRIMARY}>
//             Start with {firstTopic.title}
//           </Link>
//           {hasInteractiveFeatures && (
//             <a href={`#${INTERACTIVE_FEATURES_ANCHOR}`} className={BUTTON_OUTLINE}>
//               Try the interactive features
//             </a>
//           )}
//         </div>
//       </header>

//       {SOCIETY_TOPIC_GROUPS.map((group) => (
//         <section key={group.id} aria-labelledby={`${group.id}-title`} className={SECTION_LAYOUT}>
//           <div>
//             <h2 id={`${group.id}-title`} className="m-0 text-xl">
//               {group.title}
//             </h2>
//             <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{group.intro}</p>
//           </div>
//           <ul className="m-0 grid list-none gap-1 p-0">
//             {group.topics.map((topic) => (
//               <TopicRow key={topic.slug} topic={topic} />
//             ))}
//           </ul>
//         </section>
//       ))}

//       {hasInteractiveFeatures && (
//         <section id={INTERACTIVE_FEATURES_ANCHOR} aria-labelledby="interactive-features-title" className={`${SECTION_LAYOUT} scroll-mt-24`}>
//           <div>
//             <h2 id="interactive-features-title" className="m-0 text-xl">
//               Interactive features
//             </h2>
//             <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">Explore the data yourself.</p>
//           </div>
//           <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
//             {SOCIETY_INTERACTIVE_FEATURES.map((feature) => (
//               <li key={feature.href} className={CARD_CLASS}>
//                 <Link href={feature.href} className="font-semibold">
//                   {feature.title}
//                 </Link>
//                 <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{feature.description}</p>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       <footer className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-6 text-sm">
//         {SOCIETY_TRUST_LINKS.map((link) => (
//           <Link key={link.href} href={link.href}>
//             {link.label}
//           </Link>
//         ))}
//       </footer>
//     </div>
//   );
// }