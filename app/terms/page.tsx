import type { Metadata } from "next";
import { TermsView } from "@/components/legal/TermsView";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The rules for using AI Tools for Everyday People: using the site, general information not advice, affiliate and sponsor notice, and how terms change. Plain English and full wording.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <TermsView />;
}