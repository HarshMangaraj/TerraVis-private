// components/BeforeAfter.tsx
"use client";

import { useState } from "react";
import { Download, ZoomIn, Eye, BarChart2, Info } from "lucide-react";

const TABS = [
  { id: "Original",       label: "Original" },
  { id: "CloudMask",      label: "Cloud Mask" },
  { id: "Reconstructed",  label: "Reconstructed" },
  { id: "Confidence",     label: "Confidence" },
  { id: "IR",             label: "IR Enhanced" },
  { id: "Change",         label: "Change Detection" },
] as const;

type TabId = typeof TABS[number]["id"];

const TAB_IMAGES: Record<TabId, { before: string; after: string; beforeLabel: string; afterLabel: string }> = {
  Original: {
    before: "public/image/original-before.jpeg",
    after: "public/image/original-after.jpeg",
    beforeLabel: "Raw Satellite Image",
    afterLabel: "Reference Image",
  },
  CloudMask: {
    before: "public/image/cloud-before.jpeg",
    after: "public/image/original-after.jpeg",
    beforeLabel: "Cloudy Input",
    afterLabel: "Cloud Mask",
  },
  Reconstructed: {
    before: "public/image/reconstructed-before.jpeg",
    after: "public/image/reconstructed-after.jpeg",
    beforeLabel: "Cloudy Input",
    afterLabel: "Reconstructed Output",
  },
  Confidence: {
    before: "public/image/confidence-before.jpeg",
    after: "public/image/confidence-after.jpeg",
    beforeLabel: "Prediction",
    afterLabel: "Confidence Map",
  },
  IR: {
    before: "public/image/ir-before.jpeg",
    after: "public/image/ir-after.jpeg",
    beforeLabel: "RGB Composite",
    afterLabel: "NDVI / Infrared",
  },
  Change: {
    before: "/images/change-before.jpeg",
    after: "/images/change-after.jpeg",
    beforeLabel: "Before",
    afterLabel: "After",
  },
};

const METRICS: Record<TabId, { psnr: string; ssim: string; cloud: string; time: string }> = {
  Original:      { psnr: "—",        ssim: "—",     cloud: "72%",  time: "10:30 AM" },
  CloudMask:     { psnr: "—",        ssim: "—",     cloud: "72%",  time: "10:31 AM" },
  Reconstructed: { psnr: "33.2 dB",  ssim: "0.924", cloud: "0%",   time: "10:33 AM" },
  Confidence:    { psnr: "33.2 dB",  ssim: "0.924", cloud: "0%",   time: "10:33 AM" },
  IR:            { psnr: "29.1 dB",  ssim: "0.891", cloud: "0%",   time: "10:35 AM" },
  Change:        { psnr: "—",        ssim: "—",     cloud: "Δ 4%", time: "10:36 AM" },
};

export function BeforeAfter() {
  const [activeTab, setActiveTab] = useState<TabId>("Reconstructed");
  const pair    = TAB_IMAGES[activeTab];
  const metrics = METRICS[activeTab];

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col h-full min-h-[400px] gap-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Latest Result Preview</h3>
          <p className="text-[10px] text-muted-foreground/60 font-mono mt-0.5">
            GV_LISS4_20260622_1030 · {metrics.time}
          </p>
        </div>
        <button className="flex items-center gap-1 rounded-lg border border-border bg-[#141924] px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <Download className="h-3 w-3" />
          Export
        </button>
      </div>

      {/* Tab pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 border-b border-border/40">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#5b4bfb]/15 border-[#5b4bfb]/40 text-indigo-400 shadow-[0_0_8px_rgba(91,75,251,0.2)]"
                  : "bg-[#10141d]/50 border-border/60 text-muted-foreground hover:text-foreground hover:bg-[#141924]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Two-card image comparison */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {[
          { src: pair.before, label: pair.beforeLabel, side: "before" as const },
          { src: pair.after,  label: pair.afterLabel,  side: "after"  as const },
        ].map(({ src, label, side }) => (
          <div key={side} className="relative rounded-lg overflow-hidden border border-border group min-h-[180px] bg-[#090b11]">
            {/* Satellite image */}
            <img
              src={src}
              alt={label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

            {/* "After" gets a subtle colour-grade to simulate reconstruction */}
            {side === "after" && activeTab === "Reconstructed" && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge"
                style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(59,130,246,0.04) 100%)" }}
              />
            )}

            {/* Confidence heatmap overlay for Confidence tab */}
            {activeTab === "Confidence" && side === "after" && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60"
                style={{
                  background: `
                    radial-gradient(circle at 35% 45%, rgba(16,185,129,0.55) 0%, transparent 45%),
                    radial-gradient(circle at 65% 35%, rgba(245,158,11,0.50) 0%, transparent 40%),
                    radial-gradient(circle at 50% 70%, rgba(239,68,68,0.40) 0%, transparent 35%)
                  `,
                }}
              />
            )}

            {/* IR tinted overlay */}
            {activeTab === "IR" && side === "after" && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
                style={{ background: "linear-gradient(160deg, rgba(220,38,38,0.4), rgba(234,179,8,0.3), rgba(21,128,61,0.4))" }}
              />
            )}

            {/* Top-left badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
              <span className={`rounded border px-1.5 py-0.5 text-[8px] font-bold backdrop-blur-sm ${
                side === "before"
                  ? "bg-black/60 border-white/20 text-gray-300"
                  : "bg-[#10b981]/20 border-[#10b981]/40 text-[#10b981]"
              }`}>
                {label}
              </span>
            </div>

            {/* Bottom info strip */}
            <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 z-10">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono text-white/60">
                  LISS-IV · 5.8m GSD
                </span>
                <button className="rounded p-0.5 bg-black/40 border border-white/10 hover:bg-black/60 transition-colors">
                  <ZoomIn className="h-2.5 w-2.5 text-white/60" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom metrics strip */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-[#0d1017] px-3 py-2">
        <div className="flex items-center gap-4">
          <div className="text-[9px]">
            <span className="text-muted-foreground/60 mr-1">PSNR</span>
            <span className="font-bold text-foreground font-mono">{metrics.psnr}</span>
          </div>
          <div className="text-[9px]">
            <span className="text-muted-foreground/60 mr-1">SSIM</span>
            <span className="font-bold text-foreground font-mono">{metrics.ssim}</span>
          </div>
          <div className="text-[9px]">
            <span className="text-muted-foreground/60 mr-1">Cloud</span>
            <span className={`font-bold font-mono ${metrics.cloud === "0%" ? "text-[#10b981]" : "text-[#f59e0b]"}`}>
              {metrics.cloud}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Eye className="h-2.5 w-2.5" /> Full view
          </button>
          <button className="flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <BarChart2 className="h-2.5 w-2.5" /> Stats
          </button>
        </div>
      </div>
    </div>
  );
}