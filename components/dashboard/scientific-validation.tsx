"use client";

import { CheckCircle2 } from "lucide-react";

export function ScientificValidation() {
  const metrics = [
    { label: "SSIM", value: "0.98" },
    { label: "PSNR (dB)", value: "42.6" },
    { label: "Spectral Consistency", value: "0.97" },
    { label: "NDVI Error", value: "1.2%" },
    { label: "Road Continuity", value: "98.7%" },
    { label: "Water Accuracy", value: "96.3%" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Scientific Validation</h3>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-2.5">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between border-b border-border/40 pb-1.5 last:border-b-0 last:pb-0 text-xs">
            <span className="text-muted-foreground">{m.label}</span>
            <div className="flex items-center gap-1.5 font-mono font-semibold text-foreground">
              <span>{m.value}</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981]" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">Overall Score</span>
        <div className="flex items-center gap-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 px-2.5 py-1 text-xs font-bold text-[#10b981]">
          <span>97.5%</span>
          <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981] fill-[#10b981]/15" />
        </div>
      </div>
    </div>
  );
}
