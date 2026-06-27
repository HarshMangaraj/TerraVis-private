import { Shell } from "@/components/layout/shell";
import { Boxes, CheckCircle2, Clock, GitBranch, Zap, Upload, RotateCcw } from "lucide-react";

type ModelStatus = "Production" | "Staging" | "Retired" | "Training";

const models = [
  { id: "cloud-detection", name: "Cloud Detection", version: "v3.2.1", status: "Production" as ModelStatus, accuracy: "94.0%", updated: "2026-06-15", size: "187 MB", framework: "PyTorch 2.3" },
  { id: "reconstruction", name: "Reconstruction", version: "v3.2.0", status: "Production" as ModelStatus, accuracy: "PSNR 32.84", updated: "2026-06-10", size: "524 MB", framework: "PyTorch 2.3" },
  { id: "fusion", name: "Fusion", version: "v2.1.3", status: "Production" as ModelStatus, accuracy: "99.8% cov.", updated: "2026-05-28", size: "312 MB", framework: "PyTorch 2.3" },
  { id: "cloud-v3.3-beta", name: "Cloud Detection (beta)", version: "v3.3.0-beta", status: "Staging" as ModelStatus, accuracy: "95.1%", updated: "2026-06-25", size: "201 MB", framework: "PyTorch 2.3" },
  { id: "recon-v2.8", name: "Reconstruction Legacy", version: "v2.8.4", status: "Retired" as ModelStatus, accuracy: "PSNR 29.12", updated: "2026-01-15", size: "418 MB", framework: "PyTorch 2.1" },
  { id: "super-res", name: "Super Resolution", version: "v1.0.0-alpha", status: "Training" as ModelStatus, accuracy: "—", updated: "In progress", size: "—", framework: "PyTorch 2.3" },
];

const statusStyle: Record<ModelStatus, string> = {
  Production: "bg-success/12 text-success border-success/25",
  Staging: "bg-primary/12 text-primary border-primary/25",
  Retired: "bg-muted text-muted-foreground border-border",
  Training: "bg-warning/12 text-warning border-warning/25",
};

const abTests = [
  { id: "AB-041", model: "Cloud Detection", variantA: "v3.2.1", variantB: "v3.3.0-beta", traffic: "80/20", status: "Running", improvement: "+1.1% IoU" },
  { id: "AB-040", model: "Reconstruction", variantA: "v3.1.0", variantB: "v3.2.0", traffic: "—", status: "Completed", improvement: "+2.4 dB PSNR" },
];

export default function ModelManagerPage() {
  return (
    <Shell title="Model Manager" subtitle="Version control · deployment · A/B experiments">
      <div className="flex flex-col gap-5">

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "In Production", value: "3", color: "oklch(0.52 0.17 150)" },
            { label: "Staging", value: "1", color: "oklch(0.50 0.16 195)" },
            { label: "In Training", value: "1", color: "oklch(0.62 0.17 85)" },
            { label: "A/B Running", value: "1", color: "oklch(0.52 0.17 265)" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="text-3xl font-bold tabular-nums" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Model registry */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Model Registry</h3>
              <p className="text-xs text-muted-foreground">{models.length} models across all stages</p>
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/15 transition-colors">
              <Upload className="h-3.5 w-3.5" />
              Register model
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/60">
                  {["Model", "Version", "Accuracy", "Framework", "Size", "Updated", "Status", "Actions"].map(c => (
                    <th key={c} className="pb-2.5 pr-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {models.map(m => (
                  <tr key={m.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <Boxes className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="font-medium text-foreground whitespace-nowrap">{m.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-muted-foreground">{m.version}</td>
                    <td className="py-2.5 pr-3 font-semibold text-foreground">{m.accuracy}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{m.framework}</td>
                    <td className="py-2.5 pr-3 tabular-nums text-muted-foreground">{m.size}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{m.updated}</td>
                    <td className="py-2.5 pr-3">
                      <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${statusStyle[m.status]}`}>{m.status}</span>
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1">
                        {m.status !== "Production" && m.status !== "Retired" && (
                          <button className="flex h-6 w-6 items-center justify-center rounded border border-border hover:border-success/30 hover:bg-success/8 transition-colors" title="Deploy">
                            <CheckCircle2 className="h-3 w-3 text-muted-foreground hover:text-success" />
                          </button>
                        )}
                        <button className="flex h-6 w-6 items-center justify-center rounded border border-border hover:bg-muted transition-colors" title="History">
                          <GitBranch className="h-3 w-3 text-muted-foreground" />
                        </button>
                        {m.status === "Retired" && (
                          <button className="flex h-6 w-6 items-center justify-center rounded border border-border hover:bg-muted transition-colors" title="Restore">
                            <RotateCcw className="h-3 w-3 text-muted-foreground" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* A/B Tests */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">A/B Experiments</h3>
            <button className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
              <Zap className="h-3 w-3" /> New experiment
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {abTests.map(t => (
              <div key={t.id} className="flex items-center gap-4 rounded-lg border border-border/50 bg-muted/30 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <GitBranch className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[11px] text-muted-foreground">{t.id}</span>
                    <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${t.status === "Running" ? "bg-primary/12 text-primary border-primary/25" : "bg-muted text-muted-foreground border-border"}`}>{t.status}</span>
                  </div>
                  <div className="text-sm font-medium text-foreground">{t.model}: {t.variantA} vs {t.variantB}</div>
                  <div className="text-[11px] text-muted-foreground">Traffic split: {t.traffic}</div>
                </div>
                <div className="shrink-0 rounded-lg border border-success/25 bg-success/10 px-3 py-1.5 text-sm font-bold text-success">{t.improvement}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
