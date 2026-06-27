import { Shell } from "@/components/layout/shell";
import { BeforeAfter } from "@/components/dashboard/before-after";
import { Wand2, Gauge, Image, Zap } from "lucide-react";

const trainingHistory = [
  { epoch: 10, psnr: 27.2, ssim: 0.81, loss: 0.182 },
  { epoch: 20, psnr: 29.1, ssim: 0.85, loss: 0.143 },
  { epoch: 30, psnr: 30.8, ssim: 0.87, loss: 0.121 },
  { epoch: 40, psnr: 31.7, ssim: 0.89, loss: 0.108 },
  { epoch: 50, psnr: 32.4, ssim: 0.91, loss: 0.097 },
  { epoch: 60, psnr: 32.84, ssim: 0.924, loss: 0.089 },
];

export default function ReconstructionPage() {
  const latest = trainingHistory[trainingHistory.length - 1];

  return (
    <Shell title="Reconstruction" subtitle="GAN-based inpainting · cloud-free generation · PSNR 32.84 dB">
      <div className="flex flex-col gap-5">

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "PSNR", value: `${latest.psnr} dB`, icon: Gauge, color: "oklch(0.50 0.16 195)" },
            { label: "SSIM", value: `${latest.ssim}`, icon: Image, color: "oklch(0.52 0.17 150)" },
            { label: "Training Loss", value: `${latest.loss}`, icon: Wand2, color: "oklch(0.62 0.17 85)" },
            { label: "Inference", value: "4.2s", icon: Zap, color: "oklch(0.52 0.17 265)" },
          ].map(({ label, value, icon: Icon, color }) => (
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
              <span className="text-[11px] text-muted-foreground">Epoch {latest.epoch} · v3.2</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <BeforeAfter />

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Training History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/60">
                    {["Epoch", "PSNR (dB)", "SSIM", "Loss", "Progress"].map(h => (
                      <th key={h} className="pb-2.5 pr-4 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trainingHistory.map((row, i) => {
                    const isLatest = i === trainingHistory.length - 1;
                    return (
                      <tr key={row.epoch} className={`border-b border-border/30 ${isLatest ? "bg-primary/4" : "hover:bg-muted/30"} transition-colors`}>
                        <td className="py-2.5 pr-4 font-mono font-semibold text-foreground">{row.epoch}</td>
                        <td className="py-2.5 pr-4 tabular-nums text-foreground">{row.psnr}</td>
                        <td className="py-2.5 pr-4 tabular-nums text-foreground">{row.ssim}</td>
                        <td className="py-2.5 pr-4 tabular-nums text-muted-foreground">{row.loss}</td>
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${(row.psnr / 35) * 100}%` }} />
                            </div>
                            {isLatest && <span className="rounded-md border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">Latest</span>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Architecture", value: "U-Net + GAN" },
                { label: "Optimizer", value: "AdamW lr=1e-4" },
                { label: "Dataset", value: "8,400 pairs" },
                { label: "Augmentation", value: "Flip, rotate, crop" },
                { label: "Loss", value: "L1 + Perceptual + GAN" },
                { label: "GPU", value: "4× A100 80GB" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-muted/40 border border-border/60 p-2.5">
                  <div className="text-[10px] text-muted-foreground">{label}</div>
                  <div className="text-xs font-semibold text-foreground">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
