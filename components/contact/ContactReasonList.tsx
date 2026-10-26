import Link from "next/link";
import { CARD_CLASS } from "@/components/shared/pageStyles";
import { CONTACT_REASONS } from "@/lib/contact/contactReasons";

/** What to include for each reason to write. Static, so it works without JavaScript. */
export function ContactReasonList() {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
      {CONTACT_REASONS.map((reason) => (
        <li key={reason.id} className={CARD_CLASS}>
          <h3 className="mt-0">{reason.title}</h3>
          <p className="m-0 text-sm text-[var(--color-muted)]">{reason.summary}</p>
          <p className="mb-1 mt-3 text-sm font-semibold">Please include</p>
          <ul className="m-0 grid gap-1 pl-5 text-sm">
            {reason.include.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="mb-1 mt-3 text-sm font-semibold">Check first</p>
          <p className="m-0 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {reason.checkFirst.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </p>
        </li>
      ))}
    </ul>
  );
}