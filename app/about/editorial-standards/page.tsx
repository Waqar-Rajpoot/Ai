import type { Metadata } from "next";
import { EditorialStandardsView } from "@/components/about/EditorialStandardsView";

export const metadata: Metadata = {
  title: "Editorial standards: how we choose, write, check and label pages",
  description:
    "How topics are chosen, how pages are written and reviewed, when a review counts as stale, how AI tools are used for drafting, and what level and content badges mean.",
  alternates: { canonical: "/about/editorial-standards" },
};

export default function EditorialStandardsPage() {
  return <EditorialStandardsView />;
}