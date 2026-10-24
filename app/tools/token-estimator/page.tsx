import type { Metadata } from "next";
import { TokenEstimatorView } from "@/components/tools/TokenEstimatorView";

export const metadata: Metadata = {
  title: "Token and context estimator: will my text fit?",
  description:
    "Estimate how many tokens your text uses and see whether it fits the context window of each AI model we review. Free, runs in your browser, with plain-English guidance.",
  alternates: { canonical: "/tools/token-estimator" },
};

export default function TokenEstimatorPage() {
  return <TokenEstimatorView />;
}