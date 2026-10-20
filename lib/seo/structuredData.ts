export interface SiteIdentity {
  name: string;
  url: string;
  description: string;
}

export interface WebSiteJsonLd {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  inLanguage: string;
}

/** Builds the schema.org WebSite description search engines read. */
export function buildWebSiteJsonLd(site: SiteIdentity, language: string): WebSiteJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: language,
  };
}

/** Serializes to JSON that is safe inside a <script> tag (escapes "<"). */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}