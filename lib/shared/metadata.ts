import type { Metadata } from "next";

/** Fields every page supplies for its metadata. */
export interface PageMetadataInput {
  readonly title: string;
  readonly description: string;
  /** Route of the page, for example "/about". Resolved against `metadataBase`. */
  readonly route: string;
}

/** Builds title, description, canonical and Open Graph metadata for one page. */
export function buildPageMetadata({
  title,
  description,
  route,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: route },
    openGraph: { title, description, url: route },
  };
}
