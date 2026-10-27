import type { GuideSource } from "../learn/guideTypes";

/**
 * Sources used only by the comparison pages (articles 13 to 15). Sources shared
 * with the guides stay in `practitionerSources.ts` and are imported where needed.
 * `verifiedOn` is the day each page was opened and the claims made from it were confirmed.
 */
const VERIFIED_ON = "2026-10-27";

export const COMPARE_SOURCES = {
  openaiModelReleaseNotes: {
    id: "openai-model-release-notes",
    title: "Model Release Notes",
    publisher: "OpenAI Help Center",
    url: "https://help.openai.com/en/articles/9624314-model-release-notes",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  xaiIntroduction: {
    id: "xai-introduction",
    title: "Introduction: What is Grok?",
    publisher: "xAI Docs",
    url: "https://docs.x.ai/docs/introduction",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
} as const satisfies Record<string, GuideSource>;
