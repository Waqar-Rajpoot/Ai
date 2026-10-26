/** Date the page copy was last reviewed (Blueprint 6.2). Bump on every edit. */
export const TERMS_REVIEWED_ON = "October 25, 2026";

/** Version label of the terms text. Bump it, and add a history entry, on every change. */
export const TERMS_VERSION = "0.1 (draft)";

/**
 * True until a qualified lawyer has reviewed the wording and the operator details are filled in.
 * Set it to false only then. While true, the page shows a draft banner.
 */
export const TERMS_IS_DRAFT = true;

/** ISO date (YYYY-MM-DD) the terms take effect. Null until launch. */
export const TERMS_EFFECTIVE_ON: string | null = null;

export const UNSET_DETAIL_LABEL = "To be published before launch";