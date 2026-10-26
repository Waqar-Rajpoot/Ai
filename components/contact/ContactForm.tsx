"use client";

import { useMemo, useState } from "react";
import { CopyTextButton } from "@/components/shared/CopyTextButton";
import { BUTTON_PRIMARY, CARD_CLASS, INPUT_CLASS } from "@/components/shared/pageStyles";
import { MAX_MULTILINE_LENGTH, MAX_SINGLE_LINE_LENGTH } from "@/lib/contact/contactConstants";
import {
  buildBody,
  buildCopyText,
  buildMailtoUrl,
  buildSubject,
  getMissingRequiredFields,
  getReason,
  getReasonFields,
  isLikelyEmail,
  isMailtoTooLong,
} from "@/lib/contact/contactForm";
import { CONTACT_REASONS, type ContactFieldId, type ContactReasonId, type ContactValues } from "@/lib/contact/contactReasons";

interface ContactFormProps {
  /** The public contact address. Empty if it has not been set. */
  email: string;
}

/** Builds an email for the reader and opens it in their own email app. Nothing is sent from this page. */
export function ContactForm({ email }: ContactFormProps) {
  const [reasonId, setReasonId] = useState<ContactReasonId>("general");
  const [values, setValues] = useState<ContactValues>({});

  const reason = getReason(reasonId);
  const fields = getReasonFields(reason);
  const missing = getMissingRequiredFields(reason, values);
  const hasEmail = isLikelyEmail(email);
  const subject = useMemo(() => buildSubject(reason, values), [reason, values]);
  const body = useMemo(() => buildBody(reason, values), [reason, values]);
  const mailtoUrl = useMemo(() => buildMailtoUrl(email, subject, body), [email, subject, body]);
  const copyText = useMemo(() => buildCopyText(email, subject, body), [email, subject, body]);
  const isReady = hasEmail && missing.length === 0;

  function updateValue(id: ContactFieldId, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
  }

  return (
    <div className="grid gap-6">
      {!hasEmail && (
        <p className={`${CARD_CLASS} m-0 border-amber-500/60 text-sm`} role="alert">
          Our email address is not available on this page right now. Please try again later.
        </p>
      )}

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="mb-2 p-0 text-lg font-bold">Why are you writing?</legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACT_REASONS.map((option) => {
            const inputId = `contact-reason-${option.id}`;
            const isSelected = option.id === reasonId;
            return (
              <div key={option.id} className="relative">
                <input id={inputId} type="radio" name="contact-reason" value={option.id} checked={isSelected} onChange={() => setReasonId(option.id)} className="peer sr-only" />
                <label
                  htmlFor={inputId}
                  className={`block h-full cursor-pointer rounded-2xl border p-4 transition motion-reduce:transition-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[color:var(--color-accent)] ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[var(--color-bg)] shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]"
                  }`}
                >
                  <span className="flex items-start justify-between gap-2 font-semibold">
                    {option.title}
                    <span aria-hidden="true" className="text-[var(--color-accent)]">{isSelected ? "✓" : ""}</span>
                  </span>
                  <span className="mt-1 block text-sm text-[var(--color-muted)]">{option.summary}</span>
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-4">
        {fields.map((field) => {
          const inputId = `contact-${field.id}`;
          const hintId = `${inputId}-hint`;
          const value = values[field.id] ?? "";
          return (
            <div key={field.id}>
              <label htmlFor={inputId} className="text-sm font-semibold">
                {field.label} <span className="font-normal text-[var(--color-muted)]">({field.required ? "required" : "optional"})</span>
              </label>
              <p id={hintId} className="mb-1 mt-0 text-sm text-[var(--color-muted)]">{field.hint}</p>
              {field.multiline ? (
                <textarea
                  id={inputId}
                  rows={5}
                  value={value}
                  maxLength={MAX_MULTILINE_LENGTH}
                  aria-describedby={hintId}
                  onChange={(event) => updateValue(field.id, event.target.value)}
                  className={INPUT_CLASS}
                />
              ) : (
                <input
                  id={inputId}
                  type={field.type}
                  value={value}
                  maxLength={MAX_SINGLE_LINE_LENGTH}
                  aria-describedby={hintId}
                  onChange={(event) => updateValue(field.id, event.target.value)}
                  className={INPUT_CLASS}
                />
              )}
            </div>
          );
        })}
      </div>

      <section className={CARD_CLASS} aria-labelledby="contact-preview">
        <h3 id="contact-preview" className="mt-0">Your message, as it will appear</h3>
        <dl className="m-0 grid gap-3 text-sm">
          <div>
            <dt className="text-xs text-[var(--color-muted)]">To</dt>
            <dd className="m-0 break-all">{hasEmail ? email : "Not available"}</dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--color-muted)]">Subject</dt>
            <dd className="m-0 break-words">{subject}</dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--color-muted)]">Message</dt>
            <dd className="m-0"><pre className="m-0 whitespace-pre-wrap break-words font-sans">{body}</pre></dd>
          </div>
        </dl>
      </section>

      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {isReady ? (
            <a href={mailtoUrl} className={BUTTON_PRIMARY}>Open in my email app</a>
          ) : (
            <button type="button" disabled className={`${BUTTON_PRIMARY} opacity-50`}>Open in my email app</button>
          )}
          <CopyTextButton text={copyText} label="Copy message" disabled={!isReady} />
          <CopyTextButton text={email} label="Copy address" disabled={!hasEmail} />
        </div>
        <p className="m-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
          {missing.length > 0
            ? `Still needed: ${missing.map((field) => field.label).join(", ")}.`
            : isMailtoTooLong(mailtoUrl)
              ? "This message is long, and some email apps cut off long messages. If yours does, use Copy message instead."
              : "Ready. Nothing has been sent yet. It is sent only when you send it from your email app."}
        </p>
      </div>
    </div>
  );
}