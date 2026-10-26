import { REQUIRED_CORE_DATES } from "./euAiActConstants";
import { daysBetweenIso, isIsoDate } from "./changelogLogic";
import type { EuSource, Milestone, MilestoneStatus, RoleGuide } from "./euAiActTypes";

/** Whether a milestone is behind, on, or ahead of the given day. */
export function getMilestoneStatus(milestone: Milestone, todayIso: string): MilestoneStatus {
  if (milestone.dateIso === todayIso) return "today";
  return milestone.dateIso < todayIso ? "passed" : "upcoming";
}

/** Milestones sorted by date, oldest first. */
export function sortMilestones(milestones: readonly Milestone[]): Milestone[] {
  return [...milestones].sort((a, b) => (a.dateIso < b.dateIso ? -1 : a.dateIso > b.dateIso ? 1 : 0));
}

/** The first milestone dated today or later, or null when every date has passed. */
export function getNextMilestone(milestones: readonly Milestone[], todayIso: string): Milestone | null {
  return sortMilestones(milestones).find((m) => m.dateIso >= todayIso) ?? null;
}

/** Plain-English countdown: "in 38 days", "today", "about 13 months ago". */
export function describeDistance(dateIso: string, todayIso: string): string {
  const days = daysBetweenIso(todayIso, dateIso);
  if (days === 0) return "today";
  const abs = Math.abs(days);
  const text = abs < 60 ? `${abs} day${abs === 1 ? "" : "s"}` : abs < 730 ? `about ${Math.round(abs / 30.44)} months` : `about ${(abs / 365.25).toFixed(1)} years`;
  return days > 0 ? `in ${text}` : `${text} ago`;
}

/** Milestones to show: the core five, or everything when `showAll` is true. */
export function visibleMilestones(milestones: readonly Milestone[], showAll: boolean): Milestone[] {
  return sortMilestones(milestones).filter((m) => showAll || m.core);
}

/** Looks up a role guide by id. */
export function findGuide(guides: readonly RoleGuide[], id: string): RoleGuide | undefined {
  return guides.find((guide) => guide.id === id);
}

/** Problems that would make the page wrong. Empty means valid. */
export function validateEuAiAct(
  milestones: readonly Milestone[],
  sources: readonly EuSource[],
  guides: readonly RoleGuide[],
): string[] {
  const errors: string[] = [];
  const sourceIds = new Set(sources.map((s) => s.id));
  const ids = new Set<string>();

  for (const m of milestones) {
    const fail = (msg: string) => errors.push(`${m.id}: ${msg}`);
    if (ids.has(m.id)) fail("duplicate id");
    ids.add(m.id);
    if (!isIsoDate(m.dateIso)) fail("dateIso is not a real date");
    if (m.sourceIds.length === 0) fail("needs at least one source");
    for (const id of m.sourceIds) if (!sourceIds.has(id)) fail(`unknown source ${id}`);
    for (const field of [m.title, m.plainEnglish, m.legalNote, m.whoItAffects, m.forYou]) {
      if (field.trim() === "") fail("empty text field");
    }
    if (m.change && m.change.was === m.change.now) fail("change.was equals change.now");
  }

  const coreDates = milestones.filter((m) => m.core).map((m) => m.dateIso);
  if (coreDates.length !== REQUIRED_CORE_DATES.length || REQUIRED_CORE_DATES.some((d) => !coreDates.includes(d))) {
    errors.push(`core dates must be exactly: ${REQUIRED_CORE_DATES.join(", ")}`);
  }

  for (const guide of guides) {
    if (guide.doThisMonth.length < 3) errors.push(`${guide.id}: needs at least three actions`);
    for (const note of guide.comingUp) {
      if (!isIsoDate(note.dateIso)) errors.push(`${guide.id}: bad comingUp date`);
      else if (!milestones.some((m) => m.dateIso === note.dateIso)) errors.push(`${guide.id}: comingUp date ${note.dateIso} is not a milestone`);
    }
  }
  if (sources.length < 2) errors.push("needs at least two sources");
  return errors;
}