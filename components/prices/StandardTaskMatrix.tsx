import { CARD_CLASS } from "@/components/shared/pageStyles";
import { API_MODELS } from "@/lib/prices/apiCostTable";
import { formatUsd } from "@/lib/prices/formatPrice";
import { STANDARD_TASKS } from "@/lib/prices/standardTasks";
import { calculateTaskCost, createUsage } from "@/lib/tools/apiCost";

/** Static grid of cost per task at list prices. It works without JavaScript. */
export function StandardTaskMatrix() {
  return (
    <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
      <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
        <caption className="sr-only">Cost of one task on each model, in US dollars</caption>
        <thead className="bg-[var(--color-bg)] text-xs text-[var(--color-muted)]">
          <tr>
            <th scope="col" className="p-3 uppercase tracking-wide">Model</th>
            {STANDARD_TASKS.map((task) => (
              <th key={task.id} scope="col" className="p-3 font-semibold">{task.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {API_MODELS.map((model) => (
            <tr key={model.id} className="border-t border-[var(--color-border)]">
              <th scope="row" className="p-3 text-left font-semibold">{model.name}</th>
              {STANDARD_TASKS.map((task) => {
                const cost = calculateTaskCost(model, createUsage(task.inputTokens, task.outputTokens));
                return (
                  <td key={task.id} className="p-3 tabular-nums">
                    {cost.exceedsContext ? "Too long" : formatUsd(cost.totalUsd)}
                    {cost.usedLongPromptRate && <sup title="Long-prompt rate applied"> †</sup>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}