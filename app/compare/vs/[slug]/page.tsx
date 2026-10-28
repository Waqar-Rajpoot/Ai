import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/learn/GuideArticle";
import { HEAD_TO_HEAD_GUIDES } from "@/lib/compare/headToHeadGuides";
import { ALL_GUIDES } from "@/lib/learn/allGuides";
import { buildGuideMetadata } from "@/lib/learn/guideMetadata";
import { findPublishedGuide, getPublishedGuides, resolveRelatedGuides } from "@/lib/learn/guideHelpers";

interface HeadToHeadPageProps {
  readonly params: Promise<{ slug: string }>;
}

/**
 * Static export: only published head-to-head pages get a route, under /compare/vs.
 * The /compare/vs hub page has its own `page.tsx` and is not affected by this route.
 */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getPublishedGuides(HEAD_TO_HEAD_GUIDES).map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: HeadToHeadPageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildGuideMetadata(HEAD_TO_HEAD_GUIDES, slug);
}

export default async function HeadToHeadPage({ params }: HeadToHeadPageProps) {
  const { slug } = await params;
  const guide = findPublishedGuide(HEAD_TO_HEAD_GUIDES, slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} relatedGuides={resolveRelatedGuides(ALL_GUIDES, guide)} />;
}
