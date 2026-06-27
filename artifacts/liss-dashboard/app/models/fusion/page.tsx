import { Shell } from "@/components/layout/shell";
import { Layers, ArrowRight, Gauge, TrendingUp, Zap, Shield } from "lucide-react";

const fusionSources = [
  { name: "LISS-IV Optical", bands: "3B, 2, 1", resolution: "5.8m", weight: 0.65, color: "oklch(0.50 0.16 195)" },
  { name: "SAR (Sentinel-1)", bands: "VV, VH", resolution: "10m", weight: 0.25, color: "oklch(0.52 0.17 150)" },
  { name: "Temporal LISS", bands: "3B, 2, 1 (T−8d)", resolution: "5.8m", weight: 0.10, color: "oklch(0.62 0.17 85)" },
];

const scenarios = [
  { coverage: "0–30%", method: "Direct pass-through", psnr: "38.4 dB", time: "0.4s", quality: 98 },
  { coverage: "30–60%", method: "SAR-guided inpaint", psnr: "33.2 dB", time: "4.1s", quality: 91 },
  { coverage: "60–85%", method: "Temporal + SAR fusion", psnr: "29.7 dB", time: "6.8s", quality: 82 },
  { coverage: ">85%", method: "Full generative prior", psnr: "26.1 dB", time: "12.3s", quality: 68 },
];

export default function FusionPage() {
  return (
    <Shell title="Fusion Model" subtitle="Multi-temporal SAR–optical fusion · adaptive pipeline">
      <div className="flex flex-col gap-5">

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Avg PSNR", value: "32.1 dB", icon: Gauge, color: "oklch(0.50 0.16 195)" },
            { label: "SAR-fused", value: "38%", icon: Layers, color: "oklch(0.52 0.17 150)" },
            { label: "Temporal fused", value: "24%", icon: TrendingUp, color: "oklch(0.62 0.17 85)" },
            { label: "Coverage rate", value: "99.8%", icon: Shield, color: "oklch(0.52 0.17 265)" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold tabular-nums text-foreground">{value}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${color} 12%, white)`, border: `1px solid color-mix(in oklch, ${color} 22%, transparent)` }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Fusion pipeline visual */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Data Source Weights</h3>
            <div className="flex flex-col gap-3">
              {fusionSources.map((src) => (
                <div key={src.name} className="rounded-lg border border-border/50 bg-muted/30 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm" style={{ background: src.color }} />
                      <span className="text-sm font-semibold text-foreground">{src.name}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: src.color }}>{(src.weight * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted mb-2">
                    <div className="h-full rounded-full" style={{ width: `${src.weight * 100}%`, background: src.color }} />
                  </div>
                  <div className="flex gap-4 text-[11px] text-muted-foreground">
                    <span>Bands: <span className="font-medium text-foreground">{src.bands}</span></span>
                    <span>Res: <span className="font-medium text-foreground">{src.resolution}</span></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pipeline flow */}
            <div className="mt-4 flex items-center gap-1 overflow-x-auto rounded-lg border border-border/50 bg-muted/20 p-3">
              {["LISS-IV", "Cloud mask", "SAR align", "Fuse", "Refine", "Output"].map((step, i) => (
                <div key={step} className="flex items-center gap-1 shrink-0">
                  <div className="rounded-md border border-primary/20 bg-primary/8 px-2 py-1 text-[10px] font-semibold text-primary">{step}</div>
                  {i < 5 && <ArrowRight className="h-3 w-3 text-muted-foreground/40" />}
                </div>
              ))}
            </div>
          </div>

          {/* Scenario routing */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Cloud Coverage Scenarios</h3>
            <div className="flex flex-col gap-2">
              {scenarios.map((s) => (
                <div key={s.coverage} className="rounded-lg border border-border/50 bg-card px-4 py-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">{s.coverage} cloud</span>
                    <div className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{s.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{s.method}</span>
                    <span className="text-xs font-semibold text-primary">{s.psnr}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${s.quality}%`,
                        background: s.quality > 90 ? "var(--color-success)" : s.quality > 75 ? "var(--color-primary)" : "var(--color-warning)",
                      }}
                    />
                  </div>
                  <div className="mt-0.5 text-right text-[10px] text-muted-foreground">{s.quality}% quality score</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
