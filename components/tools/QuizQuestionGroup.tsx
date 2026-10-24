import type { QuizQuestion } from "@/lib/tools/quizQuestions";

interface QuizQuestionGroupProps<Id extends string> {
  number: number;
  question: QuizQuestion<Id>;
  value: Id | undefined;
  onChange: (id: Id) => void;
}

/** One quiz question as an accessible radio group. The tick means the selected state is not colour alone. */
export function QuizQuestionGroup<Id extends string>({ number, question, value, onChange }: QuizQuestionGroupProps<Id>) {
  const groupName = `quiz-${question.key}`;
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-1 p-0 text-lg font-bold">
        <span aria-hidden="true" className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm text-white">{number}</span>
        {question.title}
      </legend>
      <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">{question.help}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {question.options.map((option) => {
          const inputId = `${groupName}-${option.id}`;
          const isSelected = value === option.id;
          return (
            <div key={option.id} className="relative">
              <input
                id={inputId}
                type="radio"
                name={groupName}
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                className="peer sr-only"
              />
              <label
                htmlFor={inputId}
                className={`block h-full cursor-pointer rounded-2xl border p-4 transition motion-reduce:transition-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[color:var(--color-accent)] ${
                  isSelected
                    ? "border-[var(--color-accent)] bg-[var(--color-bg)] shadow-sm"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]"
                }`}
              >
                <span className="flex items-start justify-between gap-2 font-semibold">
                  {option.label}
                  <span aria-hidden="true" className="text-[var(--color-accent)]">{isSelected ? "✓" : ""}</span>
                </span>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{option.hint}</span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}