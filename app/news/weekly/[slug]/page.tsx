import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeeklyRoundupView } from "@/components/news/WeeklyRoundupView";
import { assertPublishedRoundupsValid, findRoundupBySlug, listRoundupSlugs } from "@/lib/news/roundups";

/** Only slugs from generateStaticParams exist. Anything else is a 404. */
export const dynamicParams = false;

interface RoundupPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  assertPublishedRoundupsValid();
  return listRoundupSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RoundupPageProps): Promise<Metadata> {
  const { slug } = await params;
  const roundup = findRoundupBySlug(slug);
  if (!roundup) return {};
  return {
    title: `${roundup.title} | Weekly AI roundup`,
    description: roundup.summary,
    alternates: { canonical: `/news/weekly/${roundup.slug}` },
    robots: roundup.isSample ? { index: false, follow: false } : undefined,
    openGraph: { type: "article", publishedTime: roundup.publishedOn },
  };
}

export default async function WeeklyRoundupPage({ params }: RoundupPageProps) {
  const { slug } = await params;
  const roundup = findRoundupBySlug(slug);
  if (!roundup) notFound();
  return <WeeklyRoundupView roundup={roundup} />;
}