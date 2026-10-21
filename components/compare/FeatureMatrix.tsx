import { APP_FEATURES, APPS, countFeatureCells, FEATURE_SUPPORT } from "@/lib/compare/appsComparison";
import { formatIsoDate } from "@/lib/compare/modelDirectory";

/** Features by app. A cell stays "Not verified yet" until the provider's own page has been opened. */
export function FeatureMatrix() {
  const cells = countFeatureCells();

  return (
    <div className="grid gap-3">
      <p className="m-0 text-sm text-[var(--color-muted)]">
        {cells.verified} of {cells.total} cells verified against a provider&apos;s own page.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <caption className="sr-only">Voice, images, video, file upload, web search, agents and memory for ChatGPT, Claude, Gemini and Grok</caption>
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th scope="col" className="p-3">Feature</th>
              {APPS.map((app) => (
                <th key={app.id} scope="col" className="p-3">{app.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {APP_FEATURES.map((feature) => (
              <tr key={feature.id} className="border-t border-[var(--color-border)]">
                <th scope="row" className="p-3 align-top">{feature.label}</th>
                {APPS.map((app) => {
                  const support = FEATURE_SUPPORT[app.id][feature.id];
                  return (
                    <td key={app.id} className="p-3 align-top">
                      {support.status === "verified" ? (
                        <>
                          {support.summary}
                          <span className="mt-0.5 block text-xs text-[var(--color-muted)]">Verified {formatIsoDate(support.verifiedOn)}</span>
                        </>
                      ) : (
                        <span className="text-[var(--color-muted)]">Not verified yet</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}