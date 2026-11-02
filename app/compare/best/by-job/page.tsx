import type { Metadata } from "next";
import { ByJobView } from "@/components/compare/ByJobView";
import { BY_JOB_PAGE } from "@/lib/compare/byJob";

export const metadata: Metadata = {
  title: BY_JOB_PAGE.pageTitle,
  description: BY_JOB_PAGE.description,
  alternates: { canonical: "/compare/best/by-job" },
};

export default function BestByJobPage() {
  return <ByJobView page={BY_JOB_PAGE} />;
}