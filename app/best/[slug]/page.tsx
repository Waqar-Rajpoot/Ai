import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/learn/GuideArticle";
import { COMPARE_GUIDES } from "@/lib/compare/compareGuides";
import { ALL_GUIDES } from "@/lib/learn/allGuides";
import { findPublishedGuide, resolveRelatedGuides } from "@/lib/learn/guideHelpers";

const BEST_SLUGS: Record<string, string> = {
  "ai-model-by-job": "best-ai-model-by-job",
  "ai-tools-for-students": "best-ai-tools-for-students",
};

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return Object.keys(BEST_SLUGS).map((slug) => ({ slug }));
}

export default async function BestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guideSlug = BEST_SLUGS[slug];
  const guide = guideSlug ? findPublishedGuide(COMPARE_GUIDES, guideSlug) : undefined;
  if (!guide) notFound();
  return <GuideArticle guide={guide} relatedGuides={resolveRelatedGuides(ALL_GUIDES, guide)} />;
}