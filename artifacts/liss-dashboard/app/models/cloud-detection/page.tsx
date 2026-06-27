import { Shell } from "@/components/layout/shell";
import { QualityChart } from "@/components/dashboard/quality-chart";
import { CloudOff, TrendingUp, Layers, Zap } from "lucide-react";

const confusionMatrix = [
  { label: "True Cloud", cloud: 94.1, clear: 5.9 },
  { label: "True Clear", cloud: 2.3, clear: 97.7 },
];

const architecture = [
  { layer: "Encoder", detail: "ResNet-50 backbone · 4 stages · 2048 channels", type: "Conv" },
  { layer: "Skip connections", detail: "4 skip connections with channel attention", type: "Attn" },
  { layer: "Bottleneck", detail: "ASPP module · dilated convolutions r=6,12,18", type: "ASPP" },
  { layer: "Decoder", detail: "4 upsampling blocks · bilinear + Conv", type: "Conv" },
  { layer: "Output head", detail: "1×1 Conv → sigmoid → binary mask", type: "Head" },
];

export default function CloudDetectionPage() {
  return (
    <Shell title="Cloud Detection" subtitle="U-Net v3.2 · Binary segmentation · IoU 0.94">
      <div className="flex flex-col gap-5">

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "IoU Score", value: "0.940", delta: "+0.015", icon: TrendingUp, color: "oklch(0.52 0.17 150)" },
            { label: "F1 Score", value: "0.963", delta: "+0.008", icon: Layers, color: "oklch(0.50 0.16 195)" },
            { label: "Precision", value: "96.8%", delta: "+1.1%", icon: CloudOff, color: "oklch(0.52 0.17 265)" },
            { label: "Inference", value: "0.8s", delta: "−0.2s", icon: Zap, color: "oklch(0.62 0.17 85)" },
          ].map(({ label, value, delta, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold tabular-nums text-foreground">{value}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${color} 12%, white)`, border: `1px solid color-mix(in oklch, ${color} 22%, transparent)` }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
              </div>
              <span className="text-xs font-medium text-success">{delta} vs v3.1</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <QualityChart />
          </div>

          <div className="flex flex-col gap-4">
            {/* Confusion matrix */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Confusion Matrix</h3>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/60 border-b border-border">
                      <th className="p-2 text-left text-[10px] font-semibold text-muted-foreground">Actual ↓ / Pred →</th>
                      <th className="p-2 text-center text-[10px] font-semibold text-primary">Cloud</th>
                      <th className="p-2 text-center text-[10px] font-semibold text-success">Clear</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confusionMatrix.map((row) => (
                      <tr key={row.label} className="border-b border-border/50">
                        <td className="p-2 text-[11px] font-medium text-muted-foreground">{row.label}</td>
                        <td className="p-2 text-center">
                          <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${row.label === "True Cloud" ? "bg-primary/15 text-primary" : "bg-destructive/12 text-destructive"}`}>
                            {row.cloud}%
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${row.label === "True Clear" ? "bg-success/15 text-success" : "bg-warning/12 text-warning"}`}>
                            {row.clear}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Architecture */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Architecture</h3>
              <div className="flex flex-col gap-1.5">
                {architecture.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-lg bg-muted/40 px-3 py-2">
                    <span className="shrink-0 rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">{a.type}</span>
                    <div>
                      <div className="text-xs font-medium text-foreground">{a.layer}</div>
                      <div className="text-[10px] text-muted-foreground">{a.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
