import type { Metadata } from "next";
import { PrivacyView } from "@/components/prices/PrivacyView";

export const metadata: Metadata = {
  title: "AI privacy matrix: training, retention and how to opt out",
  description:
    "Compare ChatGPT, Claude, Gemini, Grok and DeepSeek on training, data retention, deletion and data location, with step-by-step instructions to turn off data sharing.",
  alternates: { canonical: "/prices/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyView />;
}