import { Download, Sparkles, Cloud, Wand2, Layers, Sliders, CheckCircle2, ChevronRight } from "lucide-react";
import { pipeline } from "@/lib/mock-data";

const ICONS = [Download, Sparkles, Cloud, Wand2, Layers, Sliders, CheckCircle2];

const STAGE_COLORS = [
  "oklch(0.50 0.16 195)",
  "oklch(0.50 0.16 210)",
  "oklch(0.50 0.16 230)",
  "oklch(0.50 0.16 255)",
  "oklch(0.52 0.17 265)",
  "oklch(0.52 0.17 280)",
  "oklch(0.52 0.17 150)",
];

export function PipelinePanel() {
  const max = pipeline[0].count;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Processing Pipeline</h3>
          <p className="text-xs text-muted-foreground">Live throughput across 7 stages · LISS-IV satellite data</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-[11px] font-medium text-success">Live</span>
        </div>
      </div>

      <div className="flex items-end gap-1 overflow-x-auto pb-2">
        {pipeline.map((step, i) => {
          const Icon = ICONS[i];
          const isLast = i === pipeline.length - 1;
          const color = STAGE_COLORS[i];
          const pct = step.count / max;

          return (
            <div key={step.key} className="flex items-end gap-1">
              <div className="flex w-28 flex-col items-center gap-2">
                <div className="flex h-20 w-12 items-end overflow-hidden rounded-lg" style={{ background: `color-mix(in oklch, ${color} 8%, white)`, border: `1px solid color-mix(in oklch, ${color} 20%, transparent)` }}>
                  <div
                    className="w-full rounded-md transition-all duration-1000 ease-out"
                    style={{
                      height: `${pct * 100}%`,
                      background: `linear-gradient(to top, ${color}, color-mix(in oklch, ${color} 60%, white))`,
                      boxShadow: `0 0 12px -4px ${color}`,
                    }}
                  />
                </div>

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 shadow-sm"
                  style={{
                    borderColor: `color-mix(in oklch, ${color} 40%, transparent)`,
                    background: `color-mix(in oklch, ${color} 10%, white)`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>

                <div className="text-center">
                  <span className="block text-[11px] font-medium leading-tight text-foreground">{step.label}</span>
                  <span className="block text-xs font-bold tabular-nums" style={{ color }}>{step.count.toLocaleString()}</span>
                  <span className="block text-[10px] text-muted-foreground">scenes</span>
                </div>
              </div>

              {!isLast && (
                <div className="mb-8 flex flex-col items-center gap-0.5">
                  <ChevronRight className="h-5 w-5 text-muted-foreground/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-full bg-muted/60 h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${(pipeline[pipeline.length - 1].count / pipeline[0].count) * 100}%`,
            background: "linear-gradient(to right, oklch(0.50 0.16 195), oklch(0.52 0.17 150))",
          }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
        <span>0 scenes</span>
        <span>{((pipeline[pipeline.length - 1].count / pipeline[0].count) * 100).toFixed(0)}% throughput efficiency</span>
        <span>{pipeline[0].count.toLocaleString()} scenes</span>
      </div>
    </div>
  );
}
