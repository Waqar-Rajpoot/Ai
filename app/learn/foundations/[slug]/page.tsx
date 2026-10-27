import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/learn/GuideArticle";
import { FOUNDATIONS_GUIDES } from "@/lib/learn/foundations/foundationsGuides";
import {
  findPublishedGuide,
  getPublishedGuides,
  guideHref,
  resolveRelatedGuides,
} from "@/lib/learn/guideHelpers";

interface GuidePageProps {
  readonly params: Promise<{ slug: string }>;
}

/** Static export: only published guides get a page, and any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getPublishedGuides(FOUNDATIONS_GUIDES).map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = findPublishedGuide(FOUNDATIONS_GUIDES, slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical: guideHref(guide) },
    openGraph: { title: guide.title, description: guide.metaDescription, type: "article" },
  };
}

export default async function FoundationsGuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = findPublishedGuide(FOUNDATIONS_GUIDES, slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} relatedGuides={resolveRelatedGuides(FOUNDATIONS_GUIDES, guide)} />;
}
