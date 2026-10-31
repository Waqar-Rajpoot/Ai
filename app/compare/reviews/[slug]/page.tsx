import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewPage } from "@/components/compare/reviews/ReviewPage";
import {
  getReviewMetadata,
  getReviewPageModel,
  getReviewSlugs,
} from "@/lib/compare/reviews/reviews";

interface ReviewRouteProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getReviewSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ReviewRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return getReviewMetadata(slug) ?? { title: "Review not found" };
}

export default async function ReviewRoute({ params }: ReviewRouteProps) {
  const { slug } = await params;
  const model = getReviewPageModel(slug);
  if (!model) notFound();
  return <ReviewPage model={model} />;
}