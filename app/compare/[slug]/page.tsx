import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/learn/GuideArticle";
import { COMPARE_GUIDES } from "@/lib/compare/compareGuides";
import { ALL_GUIDES } from "@/lib/learn/allGuides";
import { buildGuideMetadata } from "@/lib/learn/guideMetadata";
import { findPublishedGuide, getPublishedGuides, resolveRelatedGuides } from "@/lib/learn/guideHelpers";

interface ComparePageProps {
  readonly params: Promise<{ slug: string }>;
}

/**
 * Static export: only published comparison pages get a route. Pages that have
 * their own folder under app/compare (for example open-vs-closed) take priority.
 */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getPublishedGuides(COMPARE_GUIDES).map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildGuideMetadata(COMPARE_GUIDES, slug);
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const guide = findPublishedGuide(COMPARE_GUIDES, slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} relatedGuides={resolveRelatedGuides(ALL_GUIDES, guide)} />;
}
