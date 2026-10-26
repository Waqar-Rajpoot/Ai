import type { Metadata } from "next";
import { ChangelogView } from "@/components/news/ChangelogView";

export const metadata: Metadata = {
  title: "Changelog: what changed on AI Tools for Everyday People",
  description:
    "A dated list of what changed on the site, which sources disagreed and how we settled it, what is still unconfirmed, and a link to the corrections log.",
  alternates: { canonical: "/news/changelog" },
};

export default function ChangelogPage() {
  return <ChangelogView />;
}