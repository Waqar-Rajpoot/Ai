/** Scroll distance (px) after which the back-to-top button appears. */
export const BACK_TO_TOP_THRESHOLD_PX = 600;

/** Language code for the `<html lang>` attribute. */
export const SITE_LANGUAGE = "en";

/** Locale used in Open Graph metadata. */
export const SITE_LOCALE = "en_US";

/** Browser toolbar colour for one colour scheme. */
export interface ThemeColor {
  media: string;
  color: string;
}

/** Browser UI colour per colour scheme. Keep in sync with --color-bg in globals.css. */
export const THEME_COLORS: ThemeColor[] = [
  { media: "(prefers-color-scheme: light)", color: "#f3eee2" },
  { media: "(prefers-color-scheme: dark)", color: "#0e1b16" },
];