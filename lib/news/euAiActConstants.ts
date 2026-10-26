/** The five dates the request and the blueprint require in the main table, in order. */
export const REQUIRED_CORE_DATES: readonly string[] = ["2025-02-02", "2025-08-02", "2026-08-02", "2027-12-02", "2028-08-02"];

export const OMNIBUS_NAME = "Regulation (EU) 2026/1744";
export const AI_ACT_NAME = "Regulation (EU) 2024/1689";

/** Dates of the omnibus itself, as reported by secondary sources. */
export const OMNIBUS_STEPS: readonly { dateIso: string; label: string }[] = [
  { dateIso: "2026-05-07", label: "Council and Parliament reach a provisional deal" },
  { dateIso: "2026-06-16", label: "European Parliament approves" },
  { dateIso: "2026-06-29", label: "Council gives final adoption" },
  { dateIso: "2026-07-08", label: "Signed" },
  { dateIso: "2026-07-24", label: "Published in the Official Journal" },
  { dateIso: "2026-07-27", label: "Enters into force" },
];

export const LEGAL_DISCLAIMER =
  "This page is general information, not legal advice. Dates and obligations depend on your role, your product and your country. If a decision rests on one of these dates, check the Official Journal text or ask a lawyer.";

export const SOURCE_CHECK_NOTE =
  "Every date here comes from at least one secondary write-up. We could not open the Official Journal text from our tools, so none is confirmed against the regulation itself yet.";

/** Days between page checks, shown as a rule of thumb for readers. */
export const REVIEW_INTERVAL_DAYS = 30;