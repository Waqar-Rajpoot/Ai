import { NewsletterBox } from "@/components/shared/NewsletterBox";
import { LinkListSection } from "@/components/shared/LinkListSection";
import {
  FREE_TOOLS,
  HERO_CONTENT,
  LEVEL_STEPS,
  READER_PATHS,
  SOCIETY_LINKS,
  TRUST_LINKS,
} from "@/lib/home/homeContent";
import { Hero } from "./Hero";
import { LevelRow } from "./LevelRow";

/** Home page content. "Latest" and "Model snapshot" join in Phases 2 and 5. */
export function HomeView() {
  return (
    <div className="page page-wide">
      <Hero {...HERO_CONTENT} />
      <LevelRow steps={LEVEL_STEPS} />
      <LinkListSection heading="Start here by reader type" items={READER_PATHS} />
      <LinkListSection heading="Free tools" items={FREE_TOOLS} />
      <LinkListSection heading="AI and society" items={SOCIETY_LINKS} />
      <LinkListSection heading="Why trust us" items={TRUST_LINKS} />
      <NewsletterBox />
    </div>
  );
}
