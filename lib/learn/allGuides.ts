import { FOUNDATIONS_GUIDES } from "./foundations/foundationsGuides";
import type { GuideRecord } from "./guideTypes";
import { PRACTITIONER_GUIDES } from "./practitioner/practitionerGuides";

/**
 * Every guide on the site, across levels. Used for cross-level "Related" links
 * and by the content checker. Add each new level's list here.
 */
export const ALL_GUIDES: readonly GuideRecord[] = [...FOUNDATIONS_GUIDES, ...PRACTITIONER_GUIDES];
