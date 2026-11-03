import type { Metadata, Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";
import { BackToTop } from "@/components/layout/BackToTop";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { BRAND_TAGLINE } from "@/lib/config/brand";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { SITE_LANGUAGE, SITE_LOCALE, THEME_COLORS } from "@/lib/layout/layoutConstants";
import { buildWebSiteJsonLd } from "@/lib/seo/structuredData";
import "./globals.css";

/** Self-hosted at build time by next/font, so there are no runtime requests to outside services. */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const DEFAULT_TITLE = `${SITE_CONFIG.name}: ${BRAND_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  // "./" gives every page its own canonical URL, resolved against metadataBase.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    locale: SITE_LOCALE,
    title: DEFAULT_TITLE,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: SITE_CONFIG.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLORS,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={SITE_LANGUAGE} className={sourceSerif.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <Breadcrumbs />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <JsonLd data={buildWebSiteJsonLd(SITE_CONFIG, SITE_LANGUAGE)} />
      </body>
    </html>
  );
}