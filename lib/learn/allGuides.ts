import { COMPARE_GUIDES } from "../compare/compareGuides";
import { HEAD_TO_HEAD_GUIDES } from "../compare/headToHeadGuides";
import { FOUNDATIONS_GUIDES } from "./foundations/foundationsGuides";
import type { GuideRecord } from "./guideTypes";
import { POWER_USER_GUIDES } from "./power-user/powerUserGuides";
import { PRACTITIONER_GUIDES } from "./practitioner/practitionerGuides";

/**
 * Every guide on the site, across levels, plus the comparison pages. Used for
 * cross-level "Related" links and by the content checker. Add each new level's list here.
 */
export const ALL_GUIDES: readonly GuideRecord[] = [
  ...FOUNDATIONS_GUIDES,
  ...PRACTITIONER_GUIDES,
  ...POWER_USER_GUIDES,
  ...COMPARE_GUIDES,
  ...HEAD_TO_HEAD_GUIDES,
];
