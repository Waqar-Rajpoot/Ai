import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExplainerView } from "@/components/news/ExplainerView";
import { getExplainerBySlug, getExplainerSlugs, validateExplainer } from "@/lib/news/explainerLogic";

type ExplainerPageProps = { params: Promise<{ slug: string }> };

/** Only the listed explainers exist. Any other slug is a 404 in the static export. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getExplainerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ExplainerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const explainer = getExplainerBySlug(slug);
  if (!explainer) return {};
  return {
    title: explainer.title,
    description: explainer.description,
    alternates: { canonical: `/news/explainers/${explainer.slug}` },
  };
}

export default async function ExplainerPage({ params }: ExplainerPageProps) {
  const { slug } = await params;
  const explainer = getExplainerBySlug(slug);
  if (!explainer) notFound();

  // Blueprint rule: every explainer has a date and a source. An incomplete one fails the build.
  const problems = validateExplainer(explainer);
  if (problems.length > 0) {
    throw new Error(`Explainer "${slug}" is incomplete: ${problems.join("; ")}`);
  }

  return <ExplainerView explainer={explainer} />;
}