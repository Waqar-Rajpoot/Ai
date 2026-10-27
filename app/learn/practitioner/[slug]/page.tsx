import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/learn/GuideArticle";
import { ALL_GUIDES } from "@/lib/learn/allGuides";
import { buildGuideMetadata } from "@/lib/learn/guideMetadata";
import { findPublishedGuide, getPublishedGuides, resolveRelatedGuides } from "@/lib/learn/guideHelpers";
import { PRACTITIONER_GUIDES } from "@/lib/learn/practitioner/practitionerGuides";

interface GuidePageProps {
  readonly params: Promise<{ slug: string }>;
}

/** Static export: only published guides get a page, and any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getPublishedGuides(PRACTITIONER_GUIDES).map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildGuideMetadata(PRACTITIONER_GUIDES, slug);
}

export default async function PractitionerGuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = findPublishedGuide(PRACTITIONER_GUIDES, slug);
  if (!guide) notFound();
  // Related guides can come from any level, so resolve against every guide.
  return <GuideArticle guide={guide} relatedGuides={resolveRelatedGuides(ALL_GUIDES, guide)} />;
}
