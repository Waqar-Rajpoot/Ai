import type { Metadata } from "next";
import { AdoptionView } from "@/components/society/AdoptionView";

export const metadata: Metadata = {
  title: "How fast is AI spreading? The adoption data explained",
  description:
    "The Fed-hosted tracker series on generative AI use among US adults aged 18 to 64, work vs outside work, why surveys differ, and the source and date for every number.",
  alternates: { canonical: "/society/ai-adoption-data" },
};

export default function AiAdoptionDataPage() {
  return <AdoptionView />;
}