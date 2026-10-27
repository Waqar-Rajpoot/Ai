import type { Metadata } from "next";
import { findPublishedGuide, guideHref } from "./guideHelpers";
import type { GuideRecord } from "./guideTypes";

/**
 * Builds page metadata for one guide route, shared by every level so the
 * level pages cannot drift apart.
 * @param guides The guides served by the route.
 * @param slug The slug from the URL.
 * @returns Metadata for a published guide, or an empty object for an unknown slug.
 */
export function buildGuideMetadata(guides: readonly GuideRecord[], slug: string): Metadata {
  const guide = findPublishedGuide(guides, slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical: guideHref(guide) },
    openGraph: { title: guide.title, description: guide.metaDescription, type: "article" },
  };
}
