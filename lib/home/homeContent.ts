import { getLevelHref, LEVEL_DEFINITIONS, LEVEL_ORDER } from "@/lib/shared/levels";
import type { LinkItem } from "@/types";

/** Home page hero copy (draft; edit freely). */
export const HERO_CONTENT = {
  headline: "Learn AI. Compare the models. Stay current.",
  promise:
    "Every price, score and rule on this site is checked by hand, dated and sourced.",
  compareLabel: "Compare models",
  compareHref: "/compare/models",
} as const;

/** The six reader paths of "Start here by reader type". */
export const READER_PATHS: readonly LinkItem[] = [
  {
    label: "Students",
    href: "/learn/practitioner/use-ai-to-study-without-cheating",
    description: "Study with AI without crossing the line.",
  },
  {
    label: "Parents and teachers",
    href: "/tools/ai-safety-checklist",
    description: "Safety checklists for families and schools.",
  },
  {
    label: "Job seekers",
    href: "/learn/practitioner/ai-resume-and-interview-prep",
    description: "Resume and interview prep with AI.",
  },
  {
    label: "Office workers and freelancers",
    href: "/learn/practitioner/ai-for-email-and-writing-at-work",
    description: "Email and writing at work.",
  },
  {
    label: "Small business owners",
    href: "/compare/best/small-business",
    description: "The best models for a small business.",
  },
  {
    label: "Beginners",
    href: "/learn/foundations/what-is-ai",
    description: "A plain-English start.",
  },
];

/** The four learning levels, in order, for "Start here by level". */
export const LEVEL_STEPS: readonly (LinkItem & { readonly level: number })[] =
  LEVEL_ORDER.map((level) => ({
    level: LEVEL_DEFINITIONS[level].number,
    label: LEVEL_DEFINITIONS[level].name,
    href: getLevelHref(level),
    description: LEVEL_DEFINITIONS[level].reader,
  }));

export const FREE_TOOLS: readonly LinkItem[] = [
  { label: "Prompt library", href: "/tools/prompt-library" },
  { label: "Which AI fits me?", href: "/tools/which-ai-fits-me" },
  { label: "Cost calculators", href: "/tools/subscription-cost-calculator" },
];

export const SOCIETY_LINKS: readonly LinkItem[] = [
  { label: "Role in life", href: "/society/role-of-ai-in-our-lives" },
  { label: "Pros and cons", href: "/society/pros-and-cons-of-ai" },
  { label: "Jobs", href: "/society/is-ai-taking-jobs" },
  { label: "Future", href: "/society/future-of-ai" },
];

export const TRUST_LINKS: readonly LinkItem[] = [
  { label: "How we test", href: "/about/how-we-test" },
  { label: "Independence", href: "/about/independence" },
  { label: "Corrections", href: "/about/corrections" },
];
