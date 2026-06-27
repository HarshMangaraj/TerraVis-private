import { Shell } from "@/components/layout/shell";
import { FileText, Download, Calendar, BarChart2, Map, Cpu, FileBarChart2 } from "lucide-react";

const reports = [
  { id: "RPT-0241", title: "Monthly Cloud Removal Summary", type: "Summary", date: "2026-06-01", scenes: 1247, size: "4.2 MB", status: "Ready", icon: BarChart2, color: "oklch(0.50 0.16 195)" },
  { id: "RPT-0240", title: "Northeast India Coverage Analysis", type: "Spatial", date: "2026-05-31", scenes: 842, size: "11.7 MB", status: "Ready", icon: Map, color: "oklch(0.52 0.17 150)" },
  { id: "RPT-0239", title: "Model v3.2 Performance Evaluation", type: "ML Report", date: "2026-05-28", scenes: 500, size: "2.8 MB", status: "Ready", icon: Cpu, color: "oklch(0.52 0.17 265)" },
  { id: "RPT-0238", title: "Q2 2026 Quality Metrics Digest", type: "Summary", date: "2026-05-25", scenes: 3841, size: "6.1 MB", status: "Ready", icon: FileBarChart2, color: "oklch(0.62 0.17 85)" },
  { id: "RPT-0237", title: "Cloud Detection Accuracy by Region", type: "Spatial", date: "2026-05-20", scenes: 620, size: "8.4 MB", status: "Ready", icon: Map, color: "oklch(0.50 0.16 195)" },
  { id: "RPT-0236", title: "Ingestion Batch Analysis — May 2026", type: "Ingestion", date: "2026-05-15", scenes: 1103, size: "3.5 MB", status: "Generating", icon: BarChart2, color: "oklch(0.52 0.17 150)" },
  { id: "RPT-0235", title: "SSIM Distribution Heatmap", type: "ML Report", date: "2026-05-10", scenes: 918, size: "14.2 MB", status: "Ready", icon: Cpu, color: "oklch(0.52 0.17 265)" },
];

const typeColor: Record<string, string> = {
  Summary: "bg-primary/10 text-primary border-primary/25",
  Spatial: "bg-success/10 text-success border-success/25",
  "ML Report": "bg-info/10 text-info border-info/25",
  Ingestion: "bg-warning/10 text-warning border-warning/25",
};

export default function ReportsPage() {
  return (
    <Shell title="Reports" subtitle="Generated analysis reports · download as PDF or CSV">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Reports", value: "241", sub: "since launch", color: "oklch(0.50 0.16 195)" },
            { label: "This Month", value: "18", sub: "June 2026", color: "oklch(0.52 0.17 150)" },
            { label: "Avg Report Size", value: "7.3 MB", sub: "PDF + CSV bundle", color: "oklch(0.52 0.17 265)" },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold tabular-nums" style={{ color }}>{value}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/6 px-5 py-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Generate New Report</h3>
            <p className="text-xs text-muted-foreground">Custom date range · region filter · export as PDF or CSV</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity">
            <FileText className="h-4 w-4" />
            Generate
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Report Archive</h3>
            <p className="text-xs text-muted-foreground">{reports.length} most recent · click to download</p>
          </div>
          <div className="flex flex-col gap-2">
            {reports.map(r => {
              const Icon = r.icon;
              const isGenerating = r.status === "Generating";
              return (
                <div key={r.id} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklch, ${r.color} 10%, white)`, border: `1px solid color-mix(in oklch, ${r.color} 20%, transparent)` }}>
                    <Icon className="h-4 w-4" style={{ color: r.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[11px] font-semibold text-muted-foreground">{r.id}</span>
                      <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${typeColor[r.type] ?? "bg-muted text-muted-foreground border-border"}`}>{r.type}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{r.date}</span>
                      <span>{r.scenes.toLocaleString()} scenes</span>
                      <span>{r.size}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {isGenerating ? (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-warning/25 bg-warning/10 px-2.5 py-1.5 text-[11px] font-medium text-warning">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
                        Generating…
                      </span>
                    ) : (
                      <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/6 transition-all">
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Shell>
  );
}
