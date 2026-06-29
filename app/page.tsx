"use client";

import dynamic from "next/dynamic";
import { Shell } from "@/components/layout/shell";
import { SystemHealth } from "@/components/dashboard/system-health";
import { ScenesTable } from "@/components/dashboard/scenes-table";

// Optimized Skeleton Loader to keep layouts visually stable during hydration
const WidgetPlaceholder = ({ height }: { height: number }) => (
  <div 
    className="flex w-full items-center justify-center rounded-xl border border-border bg-card shadow-sm animate-pulse" 
    style={{ height }}
  >
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent opacity-40" />
  </div>
);

// Dynamically import resource-intensive client-only components
const EarthHero = dynamic(() => import("@/components/dashboard/earth-hero").then((m) => m.EarthHero), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={380} />,
});

const MapPanel = dynamic(() => import("@/components/dashboard/map-panel").then((m) => m.MapPanel), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={380} />,
});

const BeforeAfter = dynamic(() => import("@/components/dashboard/before-after").then((m) => m.BeforeAfter), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={420} />,
});

const CloudDonut = dynamic(() => import("@/components/dashboard/cloud-donut").then((m) => m.CloudDonut), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={420} />,
});

const QualityChart = dynamic(() => import("@/components/dashboard/quality-chart").then((m) => m.QualityChart), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={320} />,
});

const ThroughputChart = dynamic(() => import("@/components/dashboard/throughput-chart").then((m) => m.ThroughputChart), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={320} />,
});

const SpaceVizPanel = dynamic(() => import("@/components/dashboard/space-viz-panel").then((m) => m.SpaceVizPanel), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={400} />,
});

import { useState } from "react";

import type { SpaceBodyKey } from "@/components/monitoring/monitoring-scene";

export default function DashboardPage() {
  const [clickedGlobeCoord, setClickedGlobeCoord] = useState<{ lat: number; lng: number } | null>(null);
  const [activeBody, setActiveBody] = useState<SpaceBodyKey>("earth");

  const bodyButtons: { id: SpaceBodyKey; emoji: string; label: string; color: string }[] = [
    { id: "earth", emoji: "🌍", label: "Earth", color: "#3b82f6" },
    { id: "moon",  emoji: "🌕", label: "Moon", color: "#d1d5db" },
    { id: "mars",  emoji: "🔴", label: "Mars", color: "#ef4444" },
    { id: "sun",   emoji: "☀️", label: "Sun", color: "#fbbf24" },
    { id: "milky", emoji: "🌌", label: "Milky Way", color: "#8b5cf6" },
  ];

  return (
    <Shell
      title="LISS-IV AI Platform"
      subtitle="Cloud removal · Reconstruction · Real-time monitoring"
    >
      <div className="flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full" style={{ height: 450 }}>
            <EarthHero activeBody={activeBody} onGlobeClick={(lat, lng) => setClickedGlobeCoord({ lat, lng })} />
          </div>
          
          <div className="flex items-center justify-center gap-2">
            {bodyButtons.map(({ id, emoji, label, color }) => (
              <button
                key={id}
                onClick={() => setActiveBody(id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeBody === id
                    ? "border shadow-md scale-105"
                    : "border border-border/50 bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                style={activeBody === id ? {
                  background: `color-mix(in oklch, ${color} 15%, transparent)`,
                  borderColor: `color-mix(in oklch, ${color} 40%, transparent)`,
                  color: color,
                } : {}}
              >
                <span className="text-lg leading-none">{emoji}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-1">
            <MapPanel externalSelectedCoord={clickedGlobeCoord} onClearExternalCoord={() => setClickedGlobeCoord(null)} />
          </div>
          <div className="xl:col-span-2">
            <SpaceVizPanel 
              activeBody={activeBody}
              onActiveBodyChange={setActiveBody}
              onGlobeClick={(lat, lng) => setClickedGlobeCoord({ lat, lng })} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <BeforeAfter />
          </div>
          <CloudDonut />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <QualityChart />
          </div>
          <SystemHealth />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ScenesTable />
          </div>
          <ThroughputChart />
        </div>
      </div>
    </Shell>
  );
}
