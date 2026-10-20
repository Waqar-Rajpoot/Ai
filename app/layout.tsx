import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { BackToTop } from "@/components/layout/BackToTop";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { SITE_LANGUAGE, SITE_LOCALE, THEME_COLOR } from "@/lib/layout/layoutConstants";
import { buildWebSiteJsonLd } from "@/lib/seo/structuredData";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: { default: SITE_CONFIG.name, template: `%s | ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  // "./" gives every page its own canonical URL, resolved against metadataBase.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    locale: SITE_LOCALE,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={SITE_LANGUAGE}>
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