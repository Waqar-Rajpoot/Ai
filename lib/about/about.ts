import { UNNAMED_ROLE_LABEL } from "./aboutConstants";

export interface TeamRole {
  id: string;
  role: string;
  /** Null until a real person is named. */
  name: string | null;
  /** One line a reader can check, such as a job title. Null if none is given. */
  background: string | null;
  responsibilities: readonly string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Pillar {
  id: "learn" | "compare" | "stay-current";
  name: string;
  question: string;
  whatItDoes: string;
  sections: readonly NavLink[];
  start: NavLink;
}

export interface LearningLevel {
  level: 1 | 2 | 3 | 4;
  name: string;
  reader: string;
  afterThisLevel: string;
  typicalPage: string;
  href: string;
}

export interface CadenceRow {
  trigger: string;
  whatWePublish: string;
  target: string;
  where: NavLink;
}

export interface DataPageRow {
  page: NavLink;
  updateTrigger: string;
}

export interface FundingRow {
  source: string;
  ourRule: string;
}

/** A person's name, or the honest placeholder while the role is unfilled. */
export function describeRoleHolder(role: TeamRole): string {
  return role.name?.trim() ? role.name : UNNAMED_ROLE_LABEL;
}

/** Roles that still have no named person. Use it in a build check or a test. */
export function findUnfilledRoles(roles: readonly TeamRole[]): TeamRole[] {
  return roles.filter((role) => !role.name?.trim());
}

/** Total number of distinct sections across the pillars. */
export function countPillarSections(pillars: readonly Pillar[]): number {
  return new Set(pillars.flatMap((pillar) => pillar.sections.map((section) => section.href))).size;
}