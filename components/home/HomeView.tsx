import { NewsletterBox } from "@/components/shared/NewsletterBox";
import { PageSection } from "@/components/shared/PageSection";
import { HOME_DATES_TO_WATCH_COUNT, POPULAR_SEARCHES } from "@/lib/home/homeContent";
import { getDatesToWatch } from "@/lib/home/homeLogic";
import { API_PRICE_ROWS } from "@/lib/prices/apiCostTable";
import { LEVEL_ORDER } from "@/lib/shared/levels";
import { FREE_TOOLS } from "@/lib/home/homeContent";
import { DataHubGrid } from "./DataHubGrid";
import { DatesToWatch } from "./DatesToWatch";
import { FreeToolsGrid } from "./FreeToolsGrid";
import { Hero, type HeroStat } from "./Hero";
import { LatestFromSite } from "./LatestFromSite";
import { LevelRow } from "./LevelRow";
import { ModelSnapshot } from "./ModelSnapshot";
import { PillarsStrip } from "./PillarsStrip";
import { PopularGuides } from "./PopularGuides";
import { SocietyTeaser } from "./SocietyTeaser";
import { StartHerePaths } from "./StartHerePaths";
import { WhyTrust } from "./WhyTrust";

interface HomeViewProps {
  /** External newsletter sign-up URL, or null to link to the newsletter page. */
  newsletterActionUrl: string | null;
}

/** Home page: hero, pillars, reader paths, levels, latest, models, data, tools, society, trust and newsletter. */
export function HomeView({ newsletterActionUrl }: HomeViewProps) {
  // Runs at build time on a static site, so rebuild when you publish the weekly update.
  const datesToWatch = getDatesToWatch(new Date(), HOME_DATES_TO_WATCH_COUNT);

  const stats: readonly HeroStat[] = [
    { value: String(API_PRICE_ROWS.length), label: "Models compared" },
    { value: String(LEVEL_ORDER.length), label: "Learning levels" },
    { value: String(FREE_TOOLS.length), label: "Free tools" },
    { value: "Weekly", label: "Data updates" },
  ];

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      <Hero stats={stats} popularSearches={POPULAR_SEARCHES} />

      <section aria-label="What this site does" className="py-8">
        <PillarsStrip />
      </section>

      <PageSection id="start-by-reader" title="Start here: who are you?" intro="Pick the path that fits you. Each one opens with the three guides most readers need first.">
        <StartHerePaths />
      </PageSection>

      <PageSection id="start-by-level" title="Start here: how much do you know?" intro="Four levels, from a first prompt to reading benchmarks critically. Each level opens with a short self-check, and every advanced page links back to the basics it needs.">
        <LevelRow />
      </PageSection>

      <PageSection id="popular-guides" title="Ten guides to read first" intro="The most useful pages for beginners, for choosing a model, and for controlling cost.">
        <PopularGuides />
      </PageSection>

      <PageSection id="latest" title="Latest from the site" intro="New releases, price changes and explainers, each dated and sourced.">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <LatestFromSite />
          <DatesToWatch items={datesToWatch} />
        </div>
      </PageSection>

      <PageSection id="model-snapshot" title="Model snapshot" intro="The top models by an independent composite score, with what they cost. Open the directory for all of them.">
        <ModelSnapshot />
      </PageSection>

      <PageSection id="prices-and-data" title="Prices and data, always dated" intro="Plans, API costs, limits, features, privacy, retirements and benchmarks, each with a verified-on date and a source for every number.">
        <DataHubGrid />
      </PageSection>

      <PageSection id="free-tools" title="Free tools" intro="Calculators, a quiz, a prompt library and checklists. They run in your browser, so your data stays with you.">
        <FreeToolsGrid />
      </PageSection>

      <PageSection id="ai-and-society" title="AI and society" intro="How AI is changing daily life, work and the economy. Both sides, with named surveys and dated figures.">
        <SocietyTeaser />
      </PageSection>

      <PageSection id="why-trust-us" title="Why trust us" intro="We test models ourselves, label every source, and say so when we are wrong.">
        <WhyTrust />
      </PageSection>

      <section aria-label="Newsletter" className="py-8">
        <NewsletterBox actionUrl={newsletterActionUrl} />
      </section>
    </div>
  );
}