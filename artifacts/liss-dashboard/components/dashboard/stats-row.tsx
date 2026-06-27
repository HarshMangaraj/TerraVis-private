import { Layers, CheckCircle2, Cloud, Wand2, Gauge, HardDrive, ArrowUpRight, ArrowDownRight, Zap, Shield } from "lucide-react";
import { stats, statsDelta } from "@/lib/mock-data";
import type { LucideIcon } from "lucide-react";

interface MetricProps {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  delta: number;
  accent: string;
}

function Metric({ icon: Icon, label, value, sub, delta, accent }: MetricProps) {
  const up = delta >= 0;
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md group">
      <div
        className="absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-8 transition-opacity group-hover:opacity-15"
        style={{ background: accent }}
      />
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
          <span className="text-2xl font-bold tabular-nums tracking-tight text-foreground">{value}</span>
          {sub && <span className="text-[11px] text-muted-foreground truncate">{sub}</span>}
        </div>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 shadow-sm"
          style={{
            background: `color-mix(in oklch, ${accent} 12%, white)`,
            border: `1px solid color-mix(in oklch, ${accent} 20%, transparent)`,
          }}
        >
          <Icon className="h-4 w-4" style={{ color: accent }} />
        </div>
      </div>
      <div className={`mt-3 flex items-center gap-1 text-xs ${up ? "text-success" : "text-destructive"}`}>
        {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
        <span className="font-semibold">{up ? "+" : ""}{delta}%</span>
        <span className="text-muted-foreground">vs last week</span>
      </div>
    </div>
  );
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
      <Metric icon={Layers} label="Total Scenes" value={stats.totalScenes.toLocaleString()} delta={statsDelta.totalScenes} accent="oklch(0.50 0.16 195)" />
      <Metric icon={CheckCircle2} label="Processed" value={stats.processed.toLocaleString()} delta={statsDelta.processed} accent="oklch(0.52 0.17 150)" />
      <Metric icon={Cloud} label="Cloud Avg" value={`${stats.cloudAvg}%`} delta={statsDelta.cloudAvg} accent="oklch(0.62 0.17 85)" />
      <Metric icon={Wand2} label="Reconstructed" value={stats.reconstructed.toLocaleString()} sub={`${stats.reconstructedSuccess}% success`} delta={statsDelta.reconstructed} accent="oklch(0.52 0.17 265)" />
      <Metric icon={Gauge} label="Avg PSNR" value={`${stats.avgPSNR} dB`} delta={statsDelta.avgPSNR} accent="oklch(0.50 0.16 195)" />
      <Metric icon={HardDrive} label="Storage" value={`${stats.storageUsed} TB`} sub={`of ${stats.storageTotal} TB`} delta={statsDelta.storageUsed} accent="oklch(0.56 0.22 25)" />
      <Metric icon={Shield} label="Accuracy" value={`${stats.accuracy}%`} delta={statsDelta.accuracy} accent="oklch(0.52 0.17 150)" />
      <Metric icon={Zap} label="Throughput" value={`${stats.throughput}/hr`} delta={statsDelta.throughput} accent="oklch(0.62 0.17 85)" />
    </div>
  );
}
