import type { Metadata } from "next";
import { EuAiActView } from "@/components/news/EuAiActView";

export const metadata: Metadata = {
  title: "EU AI Act timeline: every date, in plain English",
  description:
    "What already applies, which dates moved in 2026, and what is next. February 2, 2025 to August 2, 2028, with what each date means for you. Not legal advice.",
  alternates: { canonical: "/news/eu-ai-act" },
};

export default function EuAiActPage() {
  return <EuAiActView />;
}