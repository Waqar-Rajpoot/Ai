import type { Metadata } from "next";
import { JobsView } from "@/components/society/JobsView";

export const metadata: Metadata = {
  title: "Is AI taking jobs? What current surveys actually say",
  description:
    "What three named sources say about AI and jobs, what none of them can tell you, why we skip headline totals, and what you can do. Plain and technical layers, with a private tasks check.",
  alternates: { canonical: "/society/is-ai-taking-jobs" },
};

export default function IsAiTakingJobsPage() {
  return <JobsView />;
}