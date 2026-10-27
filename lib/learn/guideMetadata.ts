import type { Metadata } from "next";
import { findPublishedGuide, guideHref } from "./guideHelpers";
import type { GuideRecord } from "./guideTypes";

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
