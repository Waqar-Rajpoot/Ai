import type { Metadata } from "next";
import AiInEducationView from "@/components/society/AiInEducationView";
import { AI_IN_EDUCATION_DESCRIPTION, AI_IN_EDUCATION_TITLE } from "@/lib/society/aiInEducation";

export const metadata: Metadata = {
  title: AI_IN_EDUCATION_TITLE,
  description: AI_IN_EDUCATION_DESCRIPTION,
};

export default function AiInEducationPage() {
  return <AiInEducationView />;
}