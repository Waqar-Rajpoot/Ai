import type { FreshnessLabel } from "@/types";
import { formatDisplayDate } from "./format";

/** Dated labels need a date; vendor-reported and superseded do not. */
export type FreshnessInput =
  | { readonly label: "verified-on" | "tested-on"; readonly isoDate: string }
  | { readonly label: "vendor-reported" | "superseded" };

const FRESHNESS_LABEL_TEXT: Readonly<Record<FreshnessLabel, string>> = {
  "verified-on": "Verified on",
  "tested-on": "Tested on",
  "vendor-reported": "Vendor-reported",
  superseded: "Superseded",
};

/** Text of a freshness label, for example "Verified on Oct 21, 2026". */
export function formatFreshness(input: FreshnessInput): string {
  const text = FRESHNESS_LABEL_TEXT[input.label];
  return "isoDate" in input ? `${text} ${formatDisplayDate(input.isoDate)}` : text;
}