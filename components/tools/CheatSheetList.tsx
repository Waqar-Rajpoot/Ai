"use client";

import { useEffect, useMemo, useState } from "react";
import { BADGE_CLASS, BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { calculateProgress, getAllItems } from "@/lib/tools/checklists";
import { CHEAT_SHEETS_REVIEWED_ON } from "@/lib/tools/cheatSheetConstants";
import { CHEAT_SHEETS } from "@/lib/tools/cheatSheetData";
import {
  buildDownloadFileName,
  describeLevels,
  describePlaceholder,
  extractPlaceholders,
  fillTemplate,
  filterSheetsByLevel,
  sheetToPlainText,
  type ChecklistBlock,
  type LevelFilter,
  type SheetBlock,
  type SheetId,
  type TemplateBlock,
} from "@/lib/tools/cheatSheets";
import { downloadTextFile } from "./downloadTextFile";
import { ProgressBar } from "./ProgressBar";
import { useCheckedIds } from "./useCheckedIds";
import { useCopyFeedback } from "./useCopyFeedback";

const DEFAULT_SHEET: SheetId = "prompt-formula";

const LEVEL_OPTIONS: readonly { id: LevelFilter; label: string }[] = [
  { id: "all", label: "All levels" },
  { id: 1, label: "Level 1" },
  { id: 2, label: "Level 2" },
  { id: 3, label: "Level 3" },
];

interface CopyApi {
  copy: (key: string, text: string) => Promise<void>;
  labelFor: (key: string, idleLabel: string) => string;
}

const SMALL_BUTTON = `${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`;
const QUIET_BUTTON = `rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`;

function TemplateBlockView({ block, copy, labelFor }: { block: TemplateBlock } & CopyApi) {
  const placeholders = useMemo(() => extractPlaceholders(block.text), [block.text]);
  const [values, setValues] = useState<Record<string, string>>({});
  const filledText = useMemo(() => fillTemplate(block.text, values), [block.text, values]);

  return (
    <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
      <div className={`${CARD_CLASS} self-start print:hidden`}>
        <p className="m-0 text-sm font-semibold">Fill in the boxes</p>
        <p className="mb-3 mt-1 text-xs text-[var(--color-muted)]">Stays in your browser. Keep private details out.</p>
        <div className="grid gap-3">
          {placeholders.map((token) => {
            const inputId = `${block.id}-${token}`;
            const isLong = block.longFields?.includes(token) ?? false;
            return (
              <label key={token} htmlFor={inputId} className="text-sm">
                <span className="text-[var(--color-muted)]">{describePlaceholder(token)}</span>
                {isLong ? (
                  <textarea
                    id={inputId}
                    rows={4}
                    value={values[token] ?? ""}
                    onChange={(event) => setValues((current) => ({ ...current, [token]: event.target.value }))}
                    className={`${INPUT_CLASS} mt-1`}
                  />
                ) : (
                  <input
                    id={inputId}
                    type="text"
                    value={values[token] ?? ""}
                    onChange={(event) => setValues((current) => ({ ...current, [token]: event.target.value }))}
                    className={`${INPUT_CLASS} mt-1`}
                  />
                )}
              </label>
            );
          })}
        </div>
        <button type="button" onClick={() => setValues({})} className={`${QUIET_BUTTON} mt-4`}>Clear boxes</button>
      </div>

      <div>
        <p className="m-0 text-sm font-semibold">Preview</p>
        <pre className={`${CARD_CLASS} mb-3 mt-2 whitespace-pre-wrap text-sm`} aria-live="polite">{filledText}</pre>
        <div className="flex flex-wrap gap-2 print:hidden">
          <button type="button" onClick={() => copy(`${block.id}-filled`, filledText)} className={SMALL_BUTTON}>
            {labelFor(`${block.id}-filled`, "Copy this prompt")}
          </button>
          <button type="button" onClick={() => copy(`${block.id}-blank`, block.text)} className={QUIET_BUTTON}>
            {labelFor(`${block.id}-blank`, "Copy blank template")}
          </button>
        </div>
        <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">Boxes left empty stay as [PLACEHOLDERS] so you can see what is missing.</p>
      </div>
    </div>
  );
}

function ChecklistBlockView({ block }: { block: ChecklistBlock }) {
  const items = useMemo(() => getAllItems(block.groups), [block.groups]);
  const validIds = useMemo<ReadonlySet<string>>(() => new Set(items.map((item) => item.id)), [items]);
  const { checkedIds, isLoaded, toggle, clear } = useCheckedIds(validIds, block.storageKey);
  const progress = calculateProgress(items, checkedIds);

  function resetTicks() {
    if (window.confirm("Clear every tick on this checklist?")) clear(items.map((item) => item.id));
  }

  return (
    <div>
      <div className={`${CARD_CLASS} mb-4`}>
        <ProgressBar progress={progress} label={`${block.heading} progress`} />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="m-0 text-sm tabular-nums text-[var(--color-muted)]" role="status" aria-live="polite">
            {progress.done} of {progress.total} ticked · {progress.essentialDone} of {progress.essentialTotal} essentials
          </p>
          <button type="button" onClick={resetTicks} className={`${QUIET_BUTTON} print:hidden`}>Clear ticks</button>
        </div>
        <p className="mb-0 mt-2 text-xs text-[var(--color-muted)] print:hidden">
          {isLoaded ? "Ticks are saved in this browser only. Nothing is sent to us." : "Loading your saved ticks…"}
        </p>
      </div>

      <div className="grid gap-4">
        {block.groups.map((group) => {
          const groupProgress = calculateProgress(group.items, checkedIds);
          return (
            <article key={group.id} className={`${CARD_CLASS} break-inside-avoid`}>
              <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="m-0 text-base">{group.title}</h4>
                <span className="text-xs tabular-nums text-[var(--color-muted)]">{groupProgress.done} of {groupProgress.total}</span>
              </header>
              <p className="mb-2 mt-0 text-sm text-[var(--color-muted)]">{group.summary}</p>
              <ul className="m-0 list-none p-0">
                {group.items.map((item) => {
                  const isChecked = checkedIds.has(item.id);
                  return (
                    <li key={item.id} className="border-t border-[var(--color-border)] py-3 first:border-t-0">
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(item.id)}
                          className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                        />
                        <span className="text-sm">
                          <span className={isChecked ? "opacity-70" : "font-semibold"}>{item.text}</span>{" "}
                          <span className={`${BADGE_CLASS} align-middle ${item.priority === "essential" ? "border-[var(--color-accent)]" : ""}`}>
                            {item.priority === "essential" ? "Essential" : "Recommended"}
                          </span>
                        </span>
                      </label>
                      <details className="ml-8 mt-1 text-sm print:hidden">
                        <summary className={`cursor-pointer text-[var(--color-muted)] ${FOCUS_RING}`}>Why and how</summary>
                        <p className="mb-0 mt-2"><strong>Why:</strong> {item.why}</p>
                        {item.how && <p className="mb-0 mt-1"><strong>How:</strong> {item.how}</p>}
                        {item.guide && <p className="mb-0 mt-1"><a href={item.guide.href}>{item.guide.label}</a></p>}
                      </details>
                      <p className="ml-8 mt-1 hidden text-xs print:block">{item.why}</p>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function BlockView({ block, copy, labelFor }: { block: SheetBlock } & CopyApi) {
  return (
    <section aria-labelledby={`block-${block.id}`} className="mt-8 break-inside-avoid-page">
      <h4 id={`block-${block.id}`} className="mb-1 mt-0 text-lg">{block.heading}</h4>
      {block.intro && <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">{block.intro}</p>}

      {block.kind === "steps" && (
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
          {block.items.map((item, index) => (
            <li key={item.title} className={`${CARD_CLASS} flex gap-3`}>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <span className="text-sm"><strong>{item.title}.</strong> {item.detail}</span>
            </li>
          ))}
        </ol>
      )}

      {block.kind === "table" && (
        <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">{block.heading}</caption>
            <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope="col" className="p-3">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-[var(--color-border)]">
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={cell} scope="row" className="p-3 text-left align-top font-semibold">{cell}</th>
                    ) : (
                      <td key={`${index}-${cell}`} className="p-3 align-top">{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {block.kind === "template" && <TemplateBlockView key={block.id} block={block} copy={copy} labelFor={labelFor} />}
      {block.kind === "checklist" && <ChecklistBlockView block={block} />}
      {block.kind === "note" && (
        <div className={`${CARD_CLASS} border-amber-500/60`}>
          <p className="m-0 text-sm">{block.text}</p>
        </div>
      )}
    </section>
  );
}

/** Sheet picker with level filter, plus copy, download and print for the open sheet. */
export function CheatSheetList() {
  const { copy, labelFor } = useCopyFeedback();
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [activeId, setActiveId] = useState<SheetId>(DEFAULT_SHEET);

  useEffect(() => {
    function readHash() {
      const requested = window.location.hash.slice(1);
      const match = CHEAT_SHEETS.find((sheet) => sheet.id === requested);
      if (match) setActiveId(match.id);
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  const visibleSheets = useMemo(() => filterSheetsByLevel(CHEAT_SHEETS, levelFilter), [levelFilter]);
  const active = CHEAT_SHEETS.find((sheet) => sheet.id === activeId) ?? CHEAT_SHEETS[0];

  function selectSheet(id: SheetId) {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  function selectLevel(level: LevelFilter) {
    setLevelFilter(level);
    const next = filterSheetsByLevel(CHEAT_SHEETS, level);
    const firstVisible = next[0];
    if (firstVisible && !next.some((sheet) => sheet.id === activeId)) selectSheet(firstVisible.id);
  }

  const plainText = sheetToPlainText(active, CHEAT_SHEETS_REVIEWED_ON);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2 print:hidden" role="group" aria-label="Filter by level">
        {LEVEL_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={levelFilter === option.id}
            onClick={() => selectLevel(option.id)}
            className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
              levelFilter === option.id
                ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div role="group" aria-label="Choose a sheet" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 print:hidden">
        {visibleSheets.map((sheet) => {
          const isActive = sheet.id === active.id;
          return (
            <button
              key={sheet.id}
              id={sheet.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectSheet(sheet.id)}
              className={`${CARD_CLASS} scroll-mt-24 text-left transition motion-reduce:transition-none ${FOCUS_RING} ${isActive ? "border-[var(--color-accent)]" : "hover:border-[var(--color-accent)]"}`}
            >
              <span className={`${BADGE_CLASS} mb-2`}>{describeLevels(sheet.levels)}</span>
              <span className="block font-bold">{sheet.shortTitle}</span>
              <span className="mt-1 block text-sm text-[var(--color-muted)]">{sheet.whoFor}</span>
            </button>
          );
        })}
      </div>

      <article className="mt-6" aria-labelledby="active-sheet-title">
        <div className="hidden print:block">
          <p className="m-0 text-sm">AI Tools for Everyday People · {describeLevels(active.levels)} · Reviewed {CHEAT_SHEETS_REVIEWED_ON}</p>
        </div>
        <header className={`${CARD_CLASS} flex flex-wrap items-start justify-between gap-4`}>
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">{describeLevels(active.levels)}</p>
            <h3 id="active-sheet-title" className="mb-1 mt-1">{active.title}</h3>
            <p className="m-0 max-w-2xl text-sm text-[var(--color-muted)]">{active.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <button type="button" onClick={() => copy(`sheet-${active.id}`, plainText)} className={SMALL_BUTTON}>
              {labelFor(`sheet-${active.id}`, "Copy sheet")}
            </button>
            <button type="button" onClick={() => downloadTextFile(buildDownloadFileName(active), plainText)} className={SMALL_BUTTON}>
              Download .txt
            </button>
            <button type="button" onClick={() => window.print()} className={SMALL_BUTTON}>Print</button>
          </div>
        </header>

        {active.blocks.map((block) => (
          <BlockView key={`${active.id}-${block.id}`} block={block} copy={copy} labelFor={labelFor} />
        ))}
      </article>
    </div>
  );
}