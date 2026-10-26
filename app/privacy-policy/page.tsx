import type { Metadata } from "next";
import { PrivacyPolicyView } from "@/components/legal/PrivacyPolicyView";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What AI Tools for Everyday People collects, why, who else is involved, how long we keep it, and your choices. Our tools run in your browser, and there are no accounts.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView />;
}