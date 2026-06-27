"use client";

import { Shell } from "@/components/layout/shell";
import { useState } from "react";
import { scenes } from "@/lib/mock-data";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const completedScenes = scenes.filter(s => s.status === "Completed");

const THUMB_PAIRS = [
  {
    id: "SC-10247",
    cloudy: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=600&h=600&fit=crop",
    clear: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&h=600&fit=crop",
  },
  {
    id: "SC-10246",
    cloudy: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=600&fit=crop",
    clear: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&h=600&fit=crop",
  },
  {
    id: "SC-10243",
    cloudy: "https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?w=600&h=600&fit=crop",
    clear: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&h=600&fit=crop",
  },
];

const metrics = [
  { label: "PSNR", before: "—", after: "33.21 dB", delta: "+33.2", good: true },
  { label: "SSIM", before: "—", after: "0.924", delta: "+0.924", good: true },
  { label: "RMSE", before: "—", after: "6.84", delta: "↓ 93%", good: true },
  { label: "Cloud %", before: "42.3%", after: "0.0%", delta: "−42.3%", good: true },
  { label: "Entropy", before: "6.12", after: "7.41", delta: "+1.29", good: true },
  { label: "Contrast", before: "0.31", after: "0.87", delta: "+0.56", good: true },
];

export default function ComparisonPage() {
  const [selected, setSelected] = useState(0);
  const [divider, setDivider] = useState(50);
  const pair = THUMB_PAIRS[selected];
  const scene = completedScenes[selected];

  return (
    <Shell title="Comparison" subtitle="Before / after quality comparison with scene metrics">
      <div className="flex flex-col gap-5">

        {/* Scene selector */}
        <div className="flex items-center gap-3 overflow-x-auto">
          {THUMB_PAIRS.map((p, i) => {
            const sc = completedScenes[i];
            return (
              <button
                key={p.id}
                onClick={() => setSelected(i)}
                className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-all ${selected === i ? "border-primary/40 bg-primary/8 shadow-sm" : "border-border bg-card hover:bg-muted/50"}`}
              >
                <img src={p.cloudy} alt="" className="h-10 w-10 rounded-lg object-cover border border-border" />
                <div>
                  <div className={`text-xs font-semibold ${selected === i ? "text-primary" : "text-foreground"}`}>{p.id}</div>
                  <div className="text-[10px] text-muted-foreground">{sc?.name?.replace(/_/g, " ") ?? ""}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Comparison viewer */}
          <div className="xl:col-span-2 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Scene {pair.id}</h3>
                <p className="text-xs text-muted-foreground">{scene?.name?.replace(/_/g, " ")} · {scene?.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelected(Math.max(0, selected - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40"
                  disabled={selected === 0}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <span className="text-xs text-muted-foreground">{selected + 1} / {THUMB_PAIRS.length}</span>
                <button
                  onClick={() => setSelected(Math.min(THUMB_PAIRS.length - 1, selected + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40"
                  disabled={selected === THUMB_PAIRS.length - 1}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "CLOUDY INPUT", badge: "bg-muted text-muted-foreground border-border", src: pair.cloudy, sub: `${scene?.cloudPct}% cloud cover` },
                { label: "RECONSTRUCTED", badge: "bg-success/10 text-success border-success/25", src: pair.clear, sub: `PSNR ${scene?.psnr} dB · SSIM 0.924` },
              ].map(({ label, badge, src, sub }) => (
                <div key={label} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${badge}`}>{label}</span>
                    <ZoomIn className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-border shadow-sm group cursor-pointer">
                    <img src={src} alt={label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute bottom-2 right-2 rounded-lg border border-white/20 bg-black/50 px-2 py-1 text-[10px] text-white backdrop-blur-sm">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider slider */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5 text-[11px] text-muted-foreground">
                <span>Cloudy</span>
                <span className="font-medium text-foreground">Blend: {divider}% / {100 - divider}%</span>
                <span>Reconstructed</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={divider}
                onChange={e => setDivider(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          {/* Metrics panel */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-1 text-sm font-semibold text-foreground">Quality Metrics</h3>
            <p className="mb-4 text-xs text-muted-foreground">Before vs. after cloud removal</p>
            <div className="flex flex-col gap-3">
              {metrics.map(m => (
                <div key={m.label} className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5">
                  <div>
                    <div className="text-xs font-semibold text-foreground">{m.label}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-muted-foreground line-through">{m.before}</span>
                      <span className="text-xs font-semibold text-success">{m.after}</span>
                    </div>
                  </div>
                  <span className="rounded-md border border-success/25 bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">{m.delta}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/6 p-3">
              <div className="text-[11px] font-semibold text-primary mb-1">Model Info</div>
              <div className="space-y-1 text-[11px] text-muted-foreground">
                <div className="flex justify-between"><span>Architecture</span><span className="font-medium text-foreground">U-Net + GAN</span></div>
                <div className="flex justify-between"><span>Version</span><span className="font-medium text-foreground">v3.2.1</span></div>
                <div className="flex justify-between"><span>Inference</span><span className="font-medium text-foreground">4.2s / scene</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
