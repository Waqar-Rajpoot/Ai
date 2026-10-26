export type DisclosurePageTypeId =
  | "review"
  | "head-to-head"
  | "roundup"
  | "price-table"
  | "guide"
  | "news-post"
  | "newsletter"
  | "sponsored"
  | "shop-course";

export interface DisclosurePageType {
  id: DisclosurePageTypeId;
  label: string;
  description: string;
  /** The page shows scores, verdicts or rankings. */
  carriesScores: boolean;
  /** A labelled sponsor slot may appear on this page type. */
  allowsSponsorSlot: boolean;
  /** The page is itself paid content. */
  isSponsoredPage: boolean;
  /** The page sells our own products or courses. */
  isOwnProductPage: boolean;
}

export interface DisclosureInput {
  pageTypeId: DisclosurePageTypeId;
  hasAffiliateLinks: boolean;
  hasDisplayAds: boolean;
  hasSponsorSlot: boolean;
  /** A maker gave us free or early access, credits or hardware. */
  hasMakerAccess: boolean;
  /** An AI model that helped draft the page is also a subject of it. */
  aiModelIsSubject: boolean;
}

export type RequirementKind = "required" | "not-allowed";

export interface DisclosureRequirement {
  id: string;
  kind: RequirementKind;
  title: string;
  where: string;
  /** Wording or code to use, or null when there is none. */
  text: string | null;
  reason: string;
}

export interface DisclosureExample {
  id: string;
  title: string;
  input: DisclosureInput;
}

/** Added to every affiliate link so tools can tell a paid link from an editorial one. */
export const AFFILIATE_LINK_REL = "sponsored noopener noreferrer";

export const AFFILIATE_DISCLOSURE_SHORT =
  "This page has affiliate links. We may earn a commission if you buy through them. It never changes a score or verdict.";

export const AFFILIATE_DISCLOSURE_FULL =
  "Some links on this page are affiliate links. If you buy through one, we may earn a commission, at no extra cost to you. Affiliate status is never an input to a score, a ranking or a verdict, and models without an affiliate program are tested the same way.";

export const SPONSORED_LABEL = "Sponsored";
export const SPONSORED_NOTE =
  "Paid for by the sponsor. This content is kept apart from our reviews and did not affect any score or verdict.";

export const SPONSOR_SLOT_LABEL = "Sponsor";
export const SPONSOR_SLOT_NOTE = "Paid placement. It is not an endorsement and did not affect the content above.";

export const AD_LABEL = "Advertisement";

export const MAKER_ACCESS_NOTE =
  "The maker gave us free or early access, credits or hardware to test this. It did not affect the scores or the verdict.";

export const OWN_PRODUCT_NOTE = "This is our own product. Checkout happens on an external page.";

export const AI_SUBJECT_NOTE =
  "An AI model that helped draft this page is also a subject of it. Every fact was checked against its source.";

export const DISCLOSURE_PAGE_TYPES: readonly DisclosurePageType[] = [
  { id: "review", label: "Model review", description: "A tested review with a scorecard and a verdict.", carriesScores: true, allowsSponsorSlot: false, isSponsoredPage: false, isOwnProductPage: false },
  { id: "head-to-head", label: "Head-to-head comparison", description: "Two models, the same tasks and a winner.", carriesScores: true, allowsSponsorSlot: false, isSponsoredPage: false, isOwnProductPage: false },
  { id: "roundup", label: "Best-for roundup", description: "A ranked list of models for one use.", carriesScores: true, allowsSponsorSlot: false, isSponsoredPage: false, isOwnProductPage: false },
  { id: "price-table", label: "Plan or price table", description: "A table of plans, prices or limits.", carriesScores: false, allowsSponsorSlot: false, isSponsoredPage: false, isOwnProductPage: false },
  { id: "guide", label: "Guide or explainer", description: "A learning page at any level.", carriesScores: false, allowsSponsorSlot: false, isSponsoredPage: false, isOwnProductPage: false },
  { id: "news-post", label: "News post or release note", description: "A short dated post about a release, price or rule.", carriesScores: false, allowsSponsorSlot: false, isSponsoredPage: false, isOwnProductPage: false },
  { id: "newsletter", label: "Weekly roundup or newsletter issue", description: "The weekly roundup, also sent as the newsletter.", carriesScores: false, allowsSponsorSlot: true, isSponsoredPage: false, isOwnProductPage: false },
  { id: "sponsored", label: "Sponsored content", description: "Content paid for by a sponsor.", carriesScores: false, allowsSponsorSlot: false, isSponsoredPage: true, isOwnProductPage: false },
  { id: "shop-course", label: "Shop or course page", description: "Our own prompt packs, templates, checklists or courses.", carriesScores: false, allowsSponsorSlot: false, isSponsoredPage: false, isOwnProductPage: true },
];

export const DEFAULT_DISCLOSURE_INPUT: DisclosureInput = {
  pageTypeId: "review",
  hasAffiliateLinks: true,
  hasDisplayAds: false,
  hasSponsorSlot: false,
  hasMakerAccess: false,
  aiModelIsSubject: false,
};

export const DISCLOSURE_EXAMPLES: readonly DisclosureExample[] = [
  { id: "review-affiliate", title: "A review with affiliate links", input: { ...DEFAULT_DISCLOSURE_INPUT } },
  { id: "sponsored-article", title: "A sponsored article", input: { ...DEFAULT_DISCLOSURE_INPUT, pageTypeId: "sponsored", hasAffiliateLinks: false } },
  { id: "newsletter-sponsor", title: "A newsletter issue with a sponsor", input: { ...DEFAULT_DISCLOSURE_INPUT, pageTypeId: "newsletter", hasAffiliateLinks: false, hasSponsorSlot: true } },
  { id: "self-review", title: "A comparison drafted by a model it compares", input: { ...DEFAULT_DISCLOSURE_INPUT, pageTypeId: "head-to-head", hasAffiliateLinks: false, aiModelIsSubject: true } },
  { id: "review-access", title: "A review after early access from a maker", input: { ...DEFAULT_DISCLOSURE_INPUT, hasAffiliateLinks: false, hasMakerAccess: true } },
];

export function findDisclosurePageType(pageTypeId: DisclosurePageTypeId): DisclosurePageType {
  const found = DISCLOSURE_PAGE_TYPES.find((pageType) => pageType.id === pageTypeId);
  if (!found) throw new Error(`Unknown page type: ${pageTypeId}`);
  return found;
}

/**
 * Which disclosures a page must carry, and what it must not do, given its type and what it contains.
 * Pure, so components can use the same rules the page explains. Order is stable.
 */
export function getDisclosureRequirements(input: DisclosureInput): DisclosureRequirement[] {
  const pageType = findDisclosurePageType(input.pageTypeId);
  const requirements: DisclosureRequirement[] = [];

  if (input.hasAffiliateLinks) {
    requirements.push(
      {
        id: "affiliate-near",
        kind: "required",
        title: "Affiliate disclosure near the first affiliate link",
        where: "Directly before or beside the first affiliate link, visible without scrolling or clicking",
        text: AFFILIATE_DISCLOSURE_SHORT,
        reason: "Readers should know about the relationship before they click. Consumer-protection guidance asks for disclosures that are clear, conspicuous and close to the recommendation.",
      },
      {
        id: "affiliate-end",
        kind: "required",
        title: "Full affiliate disclosure at the end of the page",
        where: "The standard page wrapper, after the content",
        text: AFFILIATE_DISCLOSURE_FULL,
        reason: "The full text says what affiliate status does and does not affect.",
      },
      {
        id: "affiliate-rel",
        kind: "required",
        title: "Mark every affiliate link in its code",
        where: "In the link's rel attribute",
        text: `rel="${AFFILIATE_LINK_REL}"`,
        reason: "Search engines and other tools can then tell a paid link from an editorial one.",
      },
      {
        id: "source-links-plain",
        kind: "required",
        title: "Keep source links plain",
        where: "Every link that cites a source",
        text: null,
        reason: "A link that backs a claim is evidence, not a promotion, so it is never an affiliate link.",
      },
    );
  }

  if (pageType.isSponsoredPage) {
    requirements.push(
      {
        id: "sponsored-label",
        kind: "required",
        title: "A \"Sponsored\" label at the top and in every listing",
        where: "The top of the page, and wherever the page is listed or linked",
        text: `${SPONSORED_LABEL}: ${SPONSORED_NOTE}`,
        reason: "Readers must know the content is paid for before they read it.",
      },
      {
        id: "sponsored-no-scores",
        kind: "not-allowed",
        title: "No scores, verdicts or rankings on sponsored content",
        where: "The whole page",
        text: null,
        reason: "Sponsored content is kept apart from reviews, and payment never changes a score.",
      },
    );
  }

  if (input.hasSponsorSlot) {
    if (pageType.allowsSponsorSlot) {
      requirements.push({
        id: "sponsor-slot-label",
        kind: "required",
        title: "Label the sponsor slot, and keep it to one",
        where: "In the roundup or newsletter, set apart from the editorial content",
        text: `${SPONSOR_SLOT_LABEL}: ${SPONSOR_SLOT_NOTE}`,
        reason: "One clearly labelled slot keeps paid placement apart from our own recommendations.",
      });
    } else {
      requirements.push({
        id: "sponsor-slot-blocked",
        kind: "not-allowed",
        title: "No sponsor slot on this kind of page",
        where: "The whole page",
        text: null,
        reason: "Sponsor slots belong in the weekly roundup and newsletter. Reviews, comparisons, tables and guides are kept apart from paid placement.",
      });
    }
  }

  if (input.hasDisplayAds) {
    requirements.push(
      {
        id: "ad-label",
        kind: "required",
        title: "Label every ad",
        where: "Above or on each ad unit",
        text: AD_LABEL,
        reason: "An ad must never pass for content.",
      },
      {
        id: "ad-placement",
        kind: "required",
        title: "Keep ads out of summaries, scorecards, verdicts and rankings",
        where: "Placement of every ad unit",
        text: null,
        reason: "The parts of a page that carry our judgement stay free of paid material.",
      },
    );
  }

  if (input.hasMakerAccess) {
    requirements.push({
      id: "maker-access-note",
      kind: "required",
      title: "Say that a maker gave us access",
      where: "Near the top of the page, before the results",
      text: MAKER_ACCESS_NOTE,
      reason: "Readers should know about any help from a maker. It never changes a score.",
    });
  }

  if (input.aiModelIsSubject) {
    if (pageType.carriesScores) {
      requirements.push({
        id: "model-reviews-itself",
        kind: "not-allowed",
        title: "A model does not draft its own review or comparison",
        where: "The drafting step",
        text: null,
        reason: "A review of a model is not drafted by that model. Use another tool or draft it by hand, and let recorded tests set the scores.",
      });
    } else {
      requirements.push({
        id: "ai-subject-note",
        kind: "required",
        title: "Say that the drafting model is also a subject",
        where: "Near the top of the page",
        text: AI_SUBJECT_NOTE,
        reason: "Readers should know when a tool helped write about itself.",
      });
    }
  }

  if (pageType.isOwnProductPage) {
    requirements.push({
      id: "own-product-note",
      kind: "required",
      title: "Mark our own products as ours",
      where: "Beside each product and at the checkout link",
      text: OWN_PRODUCT_NOTE,
      reason: "Readers should know they are buying from us, not from a third party.",
    });
  }

  return requirements;
}