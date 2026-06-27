import { Shell } from "@/components/layout/shell";
import { Cpu, Play, Pause, RotateCcw, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

const jobs = [
  { id: "JOB-8841", scene: "Brahmaputra_Valley_T44", stage: "Reconstruction", progress: 78, eta: "4 min", status: "running" as const, gpu: "A100-1", startedAt: "12:04:22" },
  { id: "JOB-8840", scene: "Kaziranga_NP_R02", stage: "Cloud Detection", progress: 95, eta: "1 min", status: "running" as const, gpu: "A100-1", startedAt: "12:01:14" },
  { id: "JOB-8839", scene: "Mizoram_Hills_Q88", stage: "Fusion", progress: 42, eta: "11 min", status: "running" as const, gpu: "A100-2", startedAt: "12:06:03" },
  { id: "JOB-8838", scene: "Nagaland_Central_A12", stage: "Post-processing", progress: 60, eta: "3 min", status: "running" as const, gpu: "A100-2", startedAt: "12:03:55" },
  { id: "JOB-8837", scene: "Shillong_Plateau_E18", stage: "Completed", progress: 100, eta: "—", status: "done" as const, gpu: "A100-1", startedAt: "11:58:40" },
  { id: "JOB-8836", scene: "Imphal_Basin_S07", stage: "Failed: OOM", progress: 31, eta: "—", status: "failed" as const, gpu: "A100-2", startedAt: "11:55:11" },
  { id: "JOB-8835", scene: "Tripura_South_F19", stage: "Completed", progress: 100, eta: "—", status: "done" as const, gpu: "A100-1", startedAt: "11:50:28" },
  { id: "JOB-8834", scene: "Sikkim_North_X41", stage: "In Queue", progress: 0, eta: "~18 min", status: "queued" as const, gpu: "—", startedAt: "—" },
];

const stageColor: Record<string, string> = {
  running: "oklch(0.50 0.16 195)",
  done: "oklch(0.52 0.17 150)",
  failed: "oklch(0.56 0.22 25)",
  queued: "oklch(0.52 0.015 240)",
};

const gpuLoad = [
  { name: "A100-1", load: 87, temp: 72, mem: "32/80 GB", jobs: 3 },
  { name: "A100-2", load: 94, temp: 78, mem: "61/80 GB", jobs: 2 },
];

export default function ProcessingPage() {
  return (
    <Shell title="Processing" subtitle="Active jobs · GPU workers · pipeline queue">
      <div className="flex flex-col gap-5">

        {/* GPU status */}
        <div className="grid grid-cols-2 gap-4">
          {gpuLoad.map(g => (
            <div key={g.name} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{g.name}</span>
                </div>
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold border ${g.load > 90 ? "bg-warning/12 text-warning border-warning/25" : "bg-success/12 text-success border-success/25"}`}>
                  {g.load}% load
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="text-muted-foreground">GPU utilization</span>
                    <span className="font-semibold text-foreground">{g.load}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full transition-all" style={{ width: `${g.load}%`, background: g.load > 90 ? "var(--color-warning)" : "var(--color-primary)" }} />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Temp: <span className="font-medium text-foreground">{g.temp}°C</span></span>
                  <span>VRAM: <span className="font-medium text-foreground">{g.mem}</span></span>
                  <span>Jobs: <span className="font-medium text-foreground">{g.jobs}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Jobs table */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Active Job Queue</h3>
              <p className="text-xs text-muted-foreground">{jobs.filter(j => j.status === "running").length} running · {jobs.filter(j => j.status === "queued").length} queued · {jobs.filter(j => j.status === "done").length} completed</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                <Pause className="h-3 w-3" /> Pause All
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                <RotateCcw className="h-3 w-3" /> Retry Failed
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {jobs.map(job => {
              const color = stageColor[job.status];
              return (
                <div key={job.id} className="flex items-center gap-4 rounded-lg border border-border/50 bg-card px-4 py-3 hover:bg-muted/30 transition-colors">
                  {/* Status icon */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${color} 12%, white)` }}>
                    {job.status === "running" && <Play className="h-3.5 w-3.5" style={{ color }} />}
                    {job.status === "done" && <CheckCircle2 className="h-3.5 w-3.5" style={{ color }} />}
                    {job.status === "failed" && <AlertTriangle className="h-3.5 w-3.5" style={{ color }} />}
                    {job.status === "queued" && <Clock className="h-3.5 w-3.5" style={{ color }} />}
                  </div>

                  {/* Scene + stage */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] font-semibold text-primary">{job.id}</span>
                      <span className="truncate text-xs font-medium text-foreground">{job.scene}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${job.progress}%`, background: color }}
                        />
                      </div>
                      <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">{job.progress}%</span>
                    </div>
                  </div>

                  {/* Stage */}
                  <div className="hidden md:flex w-36 shrink-0 flex-col">
                    <span className="text-xs font-medium text-foreground truncate">{job.stage}</span>
                    <span className="text-[10px] text-muted-foreground">ETA: {job.eta}</span>
                  </div>

                  {/* GPU */}
                  <div className="hidden lg:block w-20 shrink-0 text-[11px] text-muted-foreground text-right">
                    <div>{job.gpu}</div>
                    <div>{job.startedAt}</div>
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
