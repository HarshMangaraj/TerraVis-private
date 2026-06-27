import { Shell } from "@/components/layout/shell";

export default function Page() {
  return (
    <Shell title="Settings" subtitle="Platform configuration and user preferences">
      <div className="max-w-2xl space-y-5">
        {[
          { group: "Pipeline", items: ["Ingestion source", "GPU workers", "Batch size", "Queue priority"] },
          { group: "Models", items: ["Cloud detection threshold", "Reconstruction model version", "Fusion parameters"] },
          { group: "Notifications", items: ["Email alerts", "Slack webhook", "Failed scene threshold"] },
        ].map((section) => (
          <div key={section.group} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-foreground">{section.group}</h3>
            <div className="divide-y divide-border">
              {section.items.map((item) => (
                <div key={item} className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">{item}</span>
                  <div className="h-8 w-36 rounded-lg bg-muted/60 border border-border animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
