import { title } from "process";

/** A plain-English definition. */
export interface TermEntry {
  term: string;
  meaning: string;
}

/** A question with a short answer. */
export interface FaqEntry {
  question: string;
  answer: string;
}

/** A link to another page on the site. */
export interface GuideLink {
  href: string;
  label: string;
}

/** A source or label note shown at the foot of a page. */
export interface SourceNote {
  label: string;
  detail: string;
  link?: GuideLink;
}

/** A numbered step with a short title. */
export interface StepEntry {
  title: string;
  detail: string;
}

/** A practical tip with a link to a page that explains more. */
export interface TipEntry {
title: string;
  detail: string;
  link: GuideLink;
}