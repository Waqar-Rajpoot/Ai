import type { Metadata } from "next";
import { SourcePolicyView } from "@/components/about/SourcePolicyView";

export const metadata: Metadata = {
  title: "Source policy: where our numbers come from",
  description:
    "How we choose sources, label vendor-reported and independent numbers, and resolve conflicts. Includes a source checker, a map of what backs each page and our update deadlines.",
  alternates: { canonical: "/about/source-policy" },
};

export default function SourcePolicyPage() {
  return <SourcePolicyView />;
}