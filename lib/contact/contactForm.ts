import { CONTACT_SITE_NAME, MAX_MAILTO_LENGTH, MAX_SUBJECT_DETAIL_LENGTH } from "./contactConstants";
import {
  CONTACT_FIELDS,
  CONTACT_REASONS,
  type ContactField,
  type ContactReason,
  type ContactReasonId,
  type ContactValues,
} from "./contactReasons";

/** A missing reason is a bug in this module's data, so it throws. */
export function getReason(id: ContactReasonId): ContactReason {
  const reason = CONTACT_REASONS.find((candidate) => candidate.id === id);
  if (!reason) throw new Error(`Unknown contact reason "${id}"`);
  return reason;
}

export function getReasonFields(reason: ContactReason): ContactField[] {
  return reason.fieldIds.map((id) => CONTACT_FIELDS[id]);
}

/** Required fields that are empty or only spaces. */
export function getMissingRequiredFields(reason: ContactReason, values: ContactValues): ContactField[] {
  return getReasonFields(reason).filter((field) => field.required && !(values[field.id] ?? "").trim());
}

export function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
}

/** For example "Error report: https://example.com/prices/plans". */
export function buildSubject(reason: ContactReason, values: ContactValues): string {
  const detail = reason.subjectFieldId ? (values[reason.subjectFieldId] ?? "").trim().replace(/\s+/g, " ") : "";
  return detail ? `${reason.subjectPrefix}: ${truncate(detail, MAX_SUBJECT_DETAIL_LENGTH)}` : reason.subjectPrefix;
}

/** Plain-text message: one line per short field, a heading and paragraph per long field, then a signature. */
export function buildBody(reason: ContactReason, values: ContactValues): string {
  const lines: string[] = [`Reason: ${reason.title}`];
  for (const field of getReasonFields(reason)) {
    if (field.id === "yourName") continue;
    const value = (values[field.id] ?? "").trim();
    if (!value) continue;
    if (field.multiline) lines.push("", `${field.label}:`, value);
    else lines.push(`${field.label}: ${value}`);
  }
  const name = (values.yourName ?? "").trim();
  if (name) lines.push("", `— ${name}`);
  lines.push("", `Sent from the contact page of ${CONTACT_SITE_NAME}`);
  return lines.join("\n");
}

export function isLikelyEmail(text: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
}

/** Uses CRLF line breaks, which email apps expect in a mailto body. */
export function buildMailtoUrl(email: string, subject: string, body: string): string {
  const crlfBody = body.replace(/\n/g, "\r\n");
  return `mailto:${email.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(crlfBody)}`;
}

export function isMailtoTooLong(url: string): boolean {
  return url.length > MAX_MAILTO_LENGTH;
}

/** The whole message as text, for pasting into webmail. */
export function buildCopyText(email: string, subject: string, body: string): string {
  return `To: ${email.trim()}\nSubject: ${subject}\n\n${body}`;
}