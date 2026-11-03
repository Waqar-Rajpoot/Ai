/** First part of the wordmark, shown in the normal text colour. */
export const BRAND_NAME_LEAD = "Clear";

/** Second part of the wordmark, shown in the accent colour and italic. */
export const BRAND_NAME_ACCENT = "wise";

/** Full brand name, for titles, metadata and alt text. */
export const BRAND_NAME = `${BRAND_NAME_LEAD}${BRAND_NAME_ACCENT}`;

/** Short descriptor used under the logo and in metadata. */
export const BRAND_TAGLINE = "Clear guidance on AI for everyday people";

/** Default meta description. Keep under about 160 characters and free of prices or promises. */
export const BRAND_DESCRIPTION =
  "Plain-English AI guides, dated tests and sourced prices for everyday people. Learn, compare models and stay current, with no hype.";

/** Fixed logo colours. The logo never changes with the site theme. */
export const BRAND_COLORS = {
  deepGreen: "#17493B",
  leaf: "#2E7D62",
  sunrise: "#E9A23B",
  cream: "#FAF6EE",
  slate: "#4A5568",
} as const;