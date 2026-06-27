import { Shell } from "@/components/layout/shell";
import { Database, Upload, HardDrive, CheckCircle2, Clock, AlertTriangle, FolderOpen, Search } from "lucide-react";

const batches = [
  { id: "B-2207", date: "2026-06-27", scenes: 24, size: "18.4 GB", status: "Ingested", region: "Northeast India", satellite: "LISS-IV MX" },
  { id: "B-2206", date: "2026-06-26", scenes: 31, size: "23.7 GB", status: "Ingested", region: "Northeast India", satellite: "LISS-IV MONO" },
  { id: "B-2205", date: "2026-06-25", scenes: 18, size: "13.8 GB", status: "Ingested", region: "Northeast India", satellite: "LISS-IV MX" },
  { id: "B-2204", date: "2026-06-24", scenes: 42, size: "31.9 GB", status: "Ingested", region: "Northeast India + Assam", satellite: "LISS-IV MX" },
  { id: "B-2203", date: "2026-06-23", scenes: 15, size: "11.5 GB", status: "Ingested", region: "Sikkim + Bhutan", satellite: "LISS-IV MX" },
  { id: "B-2202", date: "2026-06-22", scenes: 27, size: "20.6 GB", status: "Archived", region: "Northeast India", satellite: "LISS-IV MONO" },
  { id: "B-2201", date: "2026-06-21", scenes: 9, size: "6.9 GB", status: "Failed", region: "Arunachal Pradesh", satellite: "LISS-IV MX" },
];

const statusStyle: Record<string, string> = {
  Ingested: "bg-success/12 text-success border-success/25",
  Archived: "bg-muted text-muted-foreground border-border",
  Failed: "bg-destructive/12 text-destructive border-destructive/25",
};

const storageBreakdown = [
  { label: "Raw scenes", size: 1.22, color: "oklch(0.50 0.16 195)" },
  { label: "Cloud masks", size: 0.38, color: "oklch(0.52 0.17 265)" },
  { label: "Reconstructed", size: 0.71, color: "oklch(0.52 0.17 150)" },
  { label: "Reports/logs", size: 0.14, color: "oklch(0.62 0.17 85)" },
];

export default function DataManagerPage() {
  const totalUsed = storageBreakdown.reduce((a, b) => a + b.size, 0).toFixed(2);

  return (
    <Shell title="Data Manager" subtitle="LISS-IV ingestion batches · storage · metadata">
      <div className="flex flex-col gap-5">

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Database, label: "Total Scenes", value: "12,847", sub: "across 207 batches", color: "oklch(0.50 0.16 195)" },
            { icon: HardDrive, label: "Storage Used", value: `${totalUsed} TB`, sub: "of 10 TB quota", color: "oklch(0.52 0.17 150)" },
            { icon: CheckCircle2, label: "Ingested Today", value: "24", sub: "Batch B-2207", color: "oklch(0.52 0.17 265)" },
            { icon: Clock, label: "Pending Queue", value: "3 batches", sub: "~2h estimated", color: "oklch(0.62 0.17 85)" },
          ].map(({ icon: Icon, label, value, sub, color }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-xl font-bold tabular-nums text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-sm" style={{ background: `color-mix(in oklch, ${color} 12%, white)`, border: `1px solid color-mix(in oklch, ${color} 25%, transparent)` }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Batch table */}
          <div className="xl:col-span-2 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Ingestion Batches</h3>
                <p className="text-xs text-muted-foreground">Recent ISRO data deliveries</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground">
                  <Search className="h-3 w-3" />
                  Filter batches
                </div>
                <button className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/15 transition-colors">
                  <Upload className="h-3 w-3" />
                  New Batch
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/60">
                    {["Batch ID", "Date", "Scenes", "Size", "Region", "Satellite", "Status"].map(c => (
                      <th key={c} className="pb-2.5 pr-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {batches.map(b => (
                    <tr key={b.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer">
                      <td className="py-2.5 pr-3 font-mono font-semibold text-primary">{b.id}</td>
                      <td className="py-2.5 pr-3 text-muted-foreground">{b.date}</td>
                      <td className="py-2.5 pr-3 font-medium text-foreground">{b.scenes}</td>
                      <td className="py-2.5 pr-3 text-muted-foreground tabular-nums">{b.size}</td>
                      <td className="py-2.5 pr-3 text-foreground max-w-36 truncate">{b.region}</td>
                      <td className="py-2.5 pr-3 text-muted-foreground whitespace-nowrap">{b.satellite}</td>
                      <td className="py-2.5">
                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ${statusStyle[b.status]}`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Storage breakdown */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-1 text-sm font-semibold text-foreground">Storage Breakdown</h3>
            <p className="mb-4 text-xs text-muted-foreground">{totalUsed} TB used of 10 TB</p>

            {/* Stacked bar */}
            <div className="flex h-4 w-full overflow-hidden rounded-full mb-4">
              {storageBreakdown.map(s => (
                <div key={s.label} className="h-full transition-all" style={{ width: `${(s.size / 10) * 100}%`, background: s.color }} />
              ))}
              <div className="h-full flex-1 bg-muted" />
            </div>

            <div className="flex flex-col gap-3">
              {storageBreakdown.map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(s.size / 10) * 100}%`, background: s.color }} />
                    </div>
                    <span className="w-12 text-right text-xs font-semibold tabular-nums text-foreground">{s.size} TB</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Drop zone */}
            <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 text-center hover:border-primary/40 hover:bg-primary/4 transition-colors cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <FolderOpen className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs font-medium text-foreground">Drop scene files here</p>
              <p className="text-[11px] text-muted-foreground">GeoTIFF, HDF5 · max 50 GB</p>
              <button className="mt-1 rounded-lg border border-primary/25 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/15 transition-colors">Browse files</button>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
