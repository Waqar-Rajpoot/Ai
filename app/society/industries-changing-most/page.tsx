import type { Metadata } from "next";
import { IndustriesView } from "@/components/society/IndustriesView";

export const metadata: Metadata = {
  title: "Which industries are changing most with AI, and which are next",
  description:
    "Eight industries compared using named surveys from the Census Bureau, the Federal Reserve and the AMA. Why AI-use numbers differ, who is being hired less, and what to watch next. Dated and sourced.",
  alternates: { canonical: "/society/industries-changing-most" },
};

export default function IndustriesChangingMostPage() {
  return <IndustriesView />;
}