import type { Metadata } from "next";
import { ReviewsIndexView } from "@/components/compare/ReviewsIndexView";

export const metadata: Metadata = {
  title: "AI model reviews",
  description:
    "Tested reviews of named AI models in one fixed layout, filterable by maker, price tier and open-weight or local models.",
  alternates: { canonical: "/compare/reviews" },
};

export default function ReviewsIndexPage() {
  return <ReviewsIndexView />;
}