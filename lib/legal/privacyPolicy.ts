import type { PrivacyFacts } from "./privacyFacts";

export interface DataRow {
  id: string;
  what: string;
  details: string;
  source: string;
  purpose: string;
  retention: string;
}

export interface ThirdPartyRow {
  id: string;
  role: string;
  who: string;
  receives: string;
}

export interface CookieCategory {
  id: string;
  title: string;
  purpose: string;
  setBy: string;
  control: string;
  canSwitchOff: boolean;
}

export interface LegalBasisRow {
  id: string;
  activity: string;
  basis: string;
}

function named(name: string | null, generic: string): string {
  return name ?? generic;
}

function namedList(names: readonly string[], generic: string): string {
  return names.length > 0 ? names.join(", ") : generic;
}

/** Who runs the site, using only what has been confirmed. */
export function buildOperatorLines(facts: PrivacyFacts): string[] {
  const lines = [`${facts.siteName} is run by ${facts.operatorName ?? "the people named on our About page"}.`];
  if (facts.operatorAddress) lines.push(`Postal address for legal notices: ${facts.operatorAddress}.`);
  lines.push("In data protection terms, we decide why and how the personal data in this policy is used.");
  return lines;
}

/** Everything we collect. Rows for orders and ads appear only when those features are on. */
export function buildDataRows(facts: PrivacyFacts): DataRow[] {
  const rows: DataRow[] = [
    {
      id: "newsletter",
      what: "Newsletter email address",
      details: `Your email address, and the sign-up details ${named(facts.newsletterProvider, "the newsletter service")} records.`,
      source: "You, through the signup form",
      purpose: "To send the weekly newsletter and tell you about changes to it",
      retention: "Until you unsubscribe or ask us to remove it",
    },
    {
      id: "messages",
      what: "Messages you send us",
      details: "The email you send, including your name, your address and anything you write.",
      source: "You, from your own email app",
      purpose: "To answer you, fix errors and keep a record of corrections",
      retention: "As long as needed to deal with your message. The public corrections log holds no personal details",
    },
    {
      id: "usage",
      what: "Usage and device data",
      details: `Pages you view, the site you came from, your browser and device type, and your approximate location. Collected by ${named(facts.analyticsProvider, "our analytics tool")}.`,
      source: "Your browser, automatically",
      purpose: "To see which pages help readers and where the site breaks",
      retention: facts.analyticsRetention ?? "For the period set in our analytics settings",
    },
    {
      id: "technical",
      what: "Technical request data",
      details: "Your IP address, browser type, the page requested and the time, recorded as the site is delivered.",
      source: "Your browser, automatically",
      purpose: "To deliver the site, keep it secure and fix faults",
      retention: "For the log period of our hosting service",
    },
    {
      id: "affiliate",
      what: "Affiliate click data",
      details: "A record that you followed an affiliate link, and of a purchase if you make one. We usually see totals, not who you are.",
      source: "The affiliate partner, after you click",
      purpose: "To learn whether links lead to sales, and to be paid a commission",
      retention: "As set by the affiliate partner's own policy",
    },
  ];

  if (facts.checkoutEnabled) {
    rows.push({
      id: "orders",
      what: "Order details",
      details: "Your name, email address, what you bought and whether payment went through. Card details go to the checkout service, not to us.",
      source: `You, through ${named(facts.checkoutProvider, "an external checkout service")}`,
      purpose: "To provide what you bought, give support and keep records",
      retention: "As long as needed for support, refunds and tax and accounting rules",
    });
  }

  if (facts.adsEnabled) {
    rows.push({
      id: "ads",
      what: "Advertising data",
      details: "Ad identifiers and how you interact with ads, collected by ad partners.",
      source: "Ad partners, when ads are shown",
      purpose: "To show and measure ads, which help pay for the site",
      retention: "As set by each ad partner's own policy",
    });
  }

  rows.push({
    id: "tools",
    what: "What you type into our tools",
    details: "Prices, answers, plan details and anything else you enter in a calculator, quiz or checklist.",
    source: "You, in your own browser",
    purpose: "To give you your result. We do not receive it",
    retention: "Not kept. Refreshing the page clears it",
  });

  return rows;
}

/** Everyone else who handles data. Rows for checkout and ads appear only when those features are on. */
export function buildThirdPartyRows(facts: PrivacyFacts): ThirdPartyRow[] {
  const rows: ThirdPartyRow[] = [
    { id: "mail", role: "Our email service", who: "The service that hosts our mailbox", receives: "The messages you send us." },
    { id: "newsletter", role: "Newsletter service", who: named(facts.newsletterProvider, "An external newsletter service"), receives: "Your email address and anything else the signup form asks for. Its own privacy policy applies on its pages." },
    { id: "analytics", role: "Analytics", who: named(facts.analyticsProvider, "An analytics service"), receives: "Usage and device data." },
    { id: "hosting", role: "Hosting and delivery", who: named(facts.hostingProvider, "Our hosting provider"), receives: "Your IP address and request details each time a page loads, as with any website host." },
    { id: "affiliate", role: "Affiliate partners", who: namedList(facts.affiliateNetworks, "The partners named next to each affiliate link"), receives: "A record of your click once you follow the link, and of a purchase if you make one." },
  ];

  if (facts.checkoutEnabled) {
    rows.push({ id: "checkout", role: "Checkout and payments", who: named(facts.checkoutProvider, "An external checkout service"), receives: "Your order and payment details. Its own terms and privacy policy apply on its pages." });
  }
  if (facts.adsEnabled) {
    rows.push({ id: "ads", role: "Advertising partners", who: namedList(facts.adNetworks, "The partners named in each ad or its label"), receives: "Ad identifiers and how you interact with ads." });
  }
  return rows;
}

/** The four kinds of cookie and similar technology we describe, worded to match the site's real setup. */
export function buildCookieCategories(facts: PrivacyFacts): CookieCategory[] {
  return [
    {
      id: "essential",
      title: "Essential",
      purpose: "Help the site work and remember choices you make, such as a display setting or your cookie choice, if the site uses them.",
      setBy: "This site",
      control: "These cannot be switched off in our settings. Your browser can block them, but some features may stop working.",
      canSwitchOff: false,
    },
    {
      id: "analytics",
      title: "Analytics",
      purpose: "Count visits and show which pages are used, so we can improve the site.",
      setBy: named(facts.analyticsProvider, "Our analytics tool"),
      control: facts.usesConsentBanner
        ? "Choose in the cookie settings, which you can reopen at any time. You can also block them in your browser."
        : "Block them in your browser's settings or with a privacy extension. The site and the tools work without them.",
      canSwitchOff: true,
    },
    {
      id: "affiliate",
      title: facts.adsEnabled ? "Affiliate and advertising" : "Affiliate",
      purpose: facts.adsEnabled
        ? "Let partners recognise that you came from us, measure sales and show ads."
        : "Let partners recognise that you came from us and measure sales.",
      setBy: "Partners, after you click an affiliate link or when ads are shown",
      control: "Block third-party cookies in your browser. Following an affiliate link is always your choice.",
      canSwitchOff: true,
    },
    {
      id: "external",
      title: "External services",
      purpose: "Newsletter signup and checkout pages run on other companies' sites, which set their own cookies there.",
      setBy: "Those services",
      control: "Read their policies. You can block cookies in your browser.",
      canSwitchOff: true,
    },
  ];
}

/** Why we may use data, written for readers in the EU and UK. Purchase rows appear only when checkout is on. */
export function buildLegalBases(facts: PrivacyFacts): LegalBasisRow[] {
  const rows: LegalBasisRow[] = [
    { id: "newsletter", activity: "Sending the newsletter", basis: "Your consent. You can withdraw it by unsubscribing." },
    { id: "messages", activity: "Answering your messages", basis: "Our legitimate interest in replying to you, or steps you asked for." },
    { id: "analytics", activity: "Analytics and site security", basis: "Our legitimate interest in running and improving a safe site, or your consent where the law requires it." },
    { id: "cookies", activity: "Non-essential cookies", basis: "Your consent where the law requires it." },
  ];
  if (facts.checkoutEnabled) {
    rows.push({ id: "orders", activity: "Orders and support", basis: "To carry out the contract with you, and to meet legal duties such as tax records." });
  }
  rows.push({ id: "legal", activity: "Legal duties and protecting our rights", basis: "Where the law requires us to keep or share records, or to defend a claim." });
  return rows;
}

/** What we use personal data for. The order line appears only when checkout is on. */
export function buildPurposes(facts: PrivacyFacts): string[] {
  const purposes = [
    "Send the weekly newsletter and tell you about changes to it.",
    "Answer your messages and fix errors you report.",
    "See which pages readers use, so we can improve guides, reviews and tools.",
    "Keep the site working and secure, and fix faults.",
    "Find out whether affiliate links and ads work.",
  ];
  if (facts.checkoutEnabled) purposes.push("Provide the digital products or courses you buy, give support and keep records.");
  purposes.push("Meet our legal duties and protect our rights.");
  return purposes;
}