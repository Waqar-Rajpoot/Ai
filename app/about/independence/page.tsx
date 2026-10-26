import type { Metadata } from "next";
import { IndependenceView } from "@/components/about/IndependenceView";

export const metadata: Metadata = {
  title: "Independence and disclosure: how we make money",
  description:
    "How the site earns money, how affiliate links, sponsors and ads are labelled, and why payment never changes a score or verdict. Includes a finder for the labels each page must carry.",
  alternates: { canonical: "/about/independence" },
};

export default function IndependencePage() {
  return <IndependenceView />;
}