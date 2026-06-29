import { Shell } from "@/components/layout/shell";
import { 
  Cpu, Play, Pause, RotateCcw, Clock, CheckCircle2, AlertTriangle,
  Database, Cloud, Scissors, BarChart3, Download, Wand2,
  MapPin, Calendar, HardDrive, Zap, Layers, Maximize2
} from "lucide-react";

const datasetInfo = {
  name: "Brahmaputra_Valley_T44",
  source: "Sentinel-2 L1C",
  date: "2026-06-15",
  size: "2.4 GB",
  bands: "13 (RGB + NIR + SWIR)",
  resolution: "10m",
  cloudCoverage: "23.5%",
};

const pipelineSteps = [
  { id: "dataset", label: "Dataset Loaded", status: "done" as const, icon: Database, time: "12:04:22", duration: "2s" },
  { id: "radiometric", label: "Radiometric Correction", status: "done" as const, icon: Wand2, time: "12:04:25", duration: "3s" },
  { id: "geometric", label: "Geometric Correction", status: "done" as const, icon: Maximize2, time: "12:04:28", duration: "4s" },
  { id: "registration", label: "Image Registration", status: "done" as const, icon: Layers, time: "12:04:32", duration: "6s" },
  { id: "cloudmask", label: "Cloud Mask Generation", status: "running" as const, icon: Cloud, time: "12:04:38", duration: "~12s" },
  { id: "patch", label: "Patch Generation", status: "queued" as const, icon: Scissors, time: "—", duration: "~18s" },
  { id: "normalization", label: "Normalization", status: "queued" as const, icon: BarChart3, time: "—", duration: "~5s" },
  { id: "ready", label: "Ready for AI Reconstruction", status: "queued" as const, icon: Zap, time: "—", duration: "—" },
];

const processingLogs = [
  { time: "12:04:38", message: "Generating cloud mask using S2Cloudless...", level: "info" as const },
  { time: "12:04:36", message: "Coregistration RMSE: 0.12px — within threshold", level: "info" as const },
  { time: "12:04:32", message: "Aligning bands with mutual information metric", level: "info" as const },
  { time: "12:04:28", message: "Applying RPC orthorectification model", level: "info" as const },
  { time: "12:04:25", message: "Atmospheric correction: 6S model applied", level: "info" as const },
  { time: "12:04:24", message: "TOA to BOA reflectance conversion", level: "info" as const },
  { time: "12:04:22", message: "Loading 13 spectral bands (10980×10980px)", level: "info" as const },
  { time: "12:04:22", message: "Pipeline initialized on GPU: A100-1", level: "info" as const },
];

const summaryCards = [
  { label: "Cloud Coverage", value: "23.5%", icon: Cloud, color: "oklch(0.50 0.16 195)" },
  { label: "Total Patches", value: "1,024", icon: Scissors, color: "oklch(0.52 0.17 150)" },
  { label: "Processing Time", value: "2m 14s", icon: Clock, color: "oklch(0.58 0.18 280)" },
  { label: "Output Size", value: "3.8 GB", icon: HardDrive, color: "oklch(0.56 0.22 25)" },
];

const stageColor: Record<string, string> = {
  done: "oklch(0.52 0.17 150)",
  running: "oklch(0.50 0.16 195)",
  failed: "oklch(0.56 0.22 25)",
  queued: "oklch(0.52 0.015 240)",
};

export default function PreprocessingPage() {
  return (
    <Shell title="Preprocessing" subtitle="Step-by-step pipeline · Image preparation · AI-ready output">
      <div className="flex flex-col gap-5">

        {/* Dataset Information */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Dataset Information</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-muted-foreground">Scene</span>
              <span className="text-xs font-semibold text-foreground">{datasetInfo.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-muted-foreground">Source</span>
              <span className="text-xs font-semibold text-foreground">{datasetInfo.source}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Date
              </span>
              <span className="text-xs font-semibold text-foreground">{datasetInfo.date}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> Resolution
              </span>
              <span className="text-xs font-semibold text-foreground">{datasetInfo.resolution}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-muted-foreground">Size</span>
              <span className="text-xs font-semibold text-foreground">{datasetInfo.size}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-muted-foreground">Bands</span>
              <span className="text-xs font-semibold text-foreground">{datasetInfo.bands}</span>
            </div>
            <div className="flex flex-col gap-1 col-span-2 md:col-span-2">
              <span className="text-[11px] text-muted-foreground">Cloud Coverage</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: "23.5%", background: "oklch(0.52 0.015 240)" }} />
                </div>
                <span className="text-xs font-semibold text-foreground">23.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Previews */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <h4 className="text-xs font-semibold text-foreground mb-3">Original vs Corrected</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square rounded-lg overflow-hidden border border-border relative bg-muted">
                <img 
                  src="/planets/earth_clouds.png" 
                  alt="Original satellite view" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs">
                  Original
                </span>
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border border-border relative bg-muted">
                <img 
                  src="/planets/earth_atmos.jpg" 
                  alt="Corrected satellite view" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs">
                  Corrected
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <h4 className="text-xs font-semibold text-foreground mb-3">Cloud Mask & Patches</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square rounded-lg overflow-hidden border border-border relative bg-muted animate-pulse">
                <img 
                  src="/planets/earth_clouds.png" 
                  alt="Cloud Mask" 
                  className="w-full h-full object-cover opacity-80" 
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs">
                  Cloud Mask
                </span>
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border border-border relative bg-muted">
                <img 
                  src="/planets/earth_normal.jpg" 
                  alt="Generated Patches" 
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs">
                  Patches
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Timeline */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Preprocessing Pipeline</h3>
              <p className="text-xs text-muted-foreground">
                {pipelineSteps.filter(s => s.status === "done").length} completed · 
                {pipelineSteps.filter(s => s.status === "running").length} running · 
                {pipelineSteps.filter(s => s.status === "queued").length} queued
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                <Pause className="h-3 w-3" /> Pause
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                <RotateCcw className="h-3 w-3" /> Restart
              </button>
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="relative">
            {pipelineSteps.map((step, idx) => {
              const color = stageColor[step.status];
              const StepIcon = step.icon;
              const isLast = idx === pipelineSteps.length - 1;

              return (
                <div key={step.id} className="flex gap-4 relative">
                  {/* Timeline connector + icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 z-10 transition-all"
                      style={{
                        background: step.status === "running" 
                          ? `color-mix(in oklch, ${color} 15%, white)` 
                          : step.status === "done"
                          ? `color-mix(in oklch, ${color} 12%, white)`
                          : "var(--color-muted)",
                        borderColor: step.status === "done" ? color : step.status === "running" ? color : "var(--color-border)",
                      }}
                    >
                      {step.status === "done" ? (
                        <CheckCircle2 className="h-4 w-4" style={{ color }} />
                      ) : step.status === "running" ? (
                        <div className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${color} transparent ${color} ${color}` }} />
                      ) : (
                        <StepIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className="w-0.5 flex-1 min-h-[24px]"
                        style={{
                          background: step.status === "done" 
                            ? `linear-gradient(to bottom, ${color}, var(--color-muted))` 
                            : "var(--color-muted)",
                        }}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div className={`flex-1 pb-5 ${isLast ? "pb-0" : ""}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: step.status === "done" || step.status === "running" ? "var(--color-foreground)" : "var(--color-muted-foreground)" }}
                      >
                        {step.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] tabular-nums text-muted-foreground">{step.duration}</span>
                        <span className="text-[10px] tabular-nums text-muted-foreground">{step.time}</span>
                      </div>
                    </div>
                    {step.status === "running" && (
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted mt-2">
                        <div className="h-full w-2/3 rounded-full animate-pulse" style={{ background: color }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Processing Logs */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h4 className="text-xs font-semibold text-foreground mb-3">Processing Logs</h4>
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto font-mono text-[11px]">
            {processingLogs.map((log, idx) => (
              <div key={idx} className="flex gap-3 py-0.5">
                <span className="text-muted-foreground shrink-0">{log.time}</span>
                <span className="text-foreground/80">{log.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {summaryCards.map(card => {
            const CardIcon = card.icon;
            return (
              <div key={card.label} className="rounded-xl border border-border bg-card p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${card.color} 12%, white)` }}>
                    <CardIcon className="h-3.5 w-3.5" style={{ color: card.color }} />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{card.label}</span>
                </div>
                <span className="text-lg font-bold text-foreground">{card.value}</span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <Wand2 className="h-3.5 w-3.5" /> Start Reconstruction
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <Cloud className="h-3.5 w-3.5" /> Generate Cloud Mask
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <Download className="h-3.5 w-3.5" /> Download
          </button>
        </div>

      </div>
    </Shell>
  );
}