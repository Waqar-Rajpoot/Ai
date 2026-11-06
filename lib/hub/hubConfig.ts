import type { HubLink } from "./hubTypes";

/** Policy links shown at the bottom of every hub unless the hub overrides them. */
export const DEFAULT_HUB_FOOTER_LINKS: readonly HubLink[] = [
  { label: "Source policy", href: "/about/source-policy" },
  { label: "How we test", href: "/about/how-we-test" },
  { label: "Report an error", href: "/about/corrections" },
];

/** Copy and destination for the closing newsletter band. */
export const HUB_NEWSLETTER = {
  heading: "Want new data as it lands?",
  text: "The weekly roundup collects the week's changes in one place.",
  label: "Get the weekly roundup",
  href: "/newsletter",
} as const;