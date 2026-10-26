export interface PrivacyFacts {
  siteName: string;
  /** Legal name of whoever runs the site. Null until confirmed. */
  operatorName: string | null;
  /** Postal address for legal notices. Null until confirmed. */
  operatorAddress: string | null;
  /** Service names. Null means the page uses a generic description. */
  newsletterProvider: string | null;
  analyticsProvider: string | null;
  checkoutProvider: string | null;
  hostingProvider: string | null;
  /** Named partners. Empty means the page says partners are named next to each link or ad. */
  affiliateNetworks: readonly string[];
  adNetworks: readonly string[];
  /** Turn on when display ads go live (Blueprint Part H: only once traffic is steady). */
  adsEnabled: boolean;
  /** Turn on when the shop or courses go live. */
  checkoutEnabled: boolean;
  /** True only if the site really asks for consent before non-essential cookies. */
  usesConsentBanner: boolean;
  /** How long the analytics tool keeps data. Null uses a generic line. */
  analyticsRetention: string | null;
}

/** Date the policy takes effect. Set it to the day the page goes live. */
export const PRIVACY_EFFECTIVE_ON = "October 25, 2026";

/** Date the policy was last changed. */
export const PRIVACY_UPDATED_ON = "October 25, 2026";

/** Fill these in before publishing. Every null shows a neutral sentence on the page. */
export const PRIVACY_FACTS: PrivacyFacts = {
  siteName: "AI Tools for Everyday People",
  operatorName: null,
  operatorAddress: null,
  newsletterProvider: null,
  analyticsProvider: null,
  checkoutProvider: null,
  hostingProvider: null,
  affiliateNetworks: [],
  adNetworks: [],
  adsEnabled: false,
  checkoutEnabled: false,
  usesConsentBanner: false,
  analyticsRetention: null,
};