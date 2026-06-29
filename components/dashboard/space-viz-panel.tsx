"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Star } from "lucide-react";
import type { SpaceBodyKey } from "@/components/monitoring/monitoring-scene";

const MonitoringScene = dynamic(
  () => import("@/components/monitoring/monitoring-scene").then((m) => ({ default: m.MonitoringScene })),
  { ssr: false, loading: () => <div className="w-full rounded-xl bg-muted/20 animate-pulse" style={{ minHeight: 300 }} /> }
);

type SpaceBody = "earth" | "moon" | "mars" | "sun" | "milky";

const SPACE_BODIES: Record<SpaceBody, {
  label: string; emoji: string; color: string; bgColor: string;
  description: string; distance: string; fact: string;
}> = {
  earth: {
    label: "Earth", emoji: "🌍",
    color: "#3b82f6", bgColor: "#0d1a2e",
    description: "IRS-P6 ResourceSat-2A is currently orbiting at 817 km altitude, imaging Northeast India.",
    distance: "0 km", fact: "Orbit: 98.7° sun-synchronous",
  },
  moon: {
    label: "Moon", emoji: "🌕",
    color: "#d1d5db", bgColor: "#1a1a1a",
    description: "Earth's natural satellite — used as a calibration reference for LISS-IV radiometric correction.",
    distance: "384,400 km", fact: "Phase: Waxing gibbous",
  },
  mars: {
    label: "Mars", emoji: "🔴",
    color: "#ef4444", bgColor: "#1a0a0a",
    description: "ISRO's Mangalyaan (MOM) successfully reached Martian orbit in 2014.",
    distance: "225M km", fact: "MOM orbital period: 72.7 hrs",
  },
  sun: {
    label: "Sun", emoji: "☀️",
    color: "#fbbf24", bgColor: "#1a1200",
    description: "Primary energy source for LISS-IV solar panels and driver of atmospheric cloud formation.",
    distance: "149.6M km", fact: "Solar irradiance: 1361 W/m²",
  },
  milky: {
    label: "Milky Way", emoji: "🌌",
    color: "#8b5cf6", bgColor: "#060614",
    description: "Our home galaxy — 100,000 light-years across. ISRO deep-space programs study galactic phenomena.",
    distance: "26,000 ly", fact: "Galaxy type: Barred spiral",
  },
};



export function SpaceVizPanel({ activeBody, onActiveBodyChange, onGlobeClick }: { activeBody?: SpaceBodyKey; onActiveBodyChange?: (b: SpaceBodyKey) => void; onGlobeClick?: (lat: number, lng: number) => void }) {
  const [internalBody, setInternalBody] = useState<SpaceBodyKey>("earth");
  const currentBody = activeBody || internalBody;
  const body = SPACE_BODIES[currentBody];

  const handleBodyChange = (id: SpaceBodyKey) => {
    setInternalBody(id);
    onActiveBodyChange?.(id);
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-purple-400" />
          <p className="text-sm font-semibold text-foreground">Space Visualization</p>
          <span className="rounded-md border border-purple-400/25 bg-purple-400/10 px-2 py-0.5 text-[9px] font-semibold text-purple-400">
            ISRO Context
          </span>
        </div>
      </div>

      {/* Viz area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px]" style={{ background: body.bgColor }}>
        {/* 3D Scene */}
        <div className="overflow-hidden" style={{ minHeight: 320 }}>
          <MonitoringScene body={currentBody} onGlobeClick={onGlobeClick} />
        </div>

        {/* Info sidebar */}
        <div className="flex flex-col gap-3 p-4 border-t lg:border-t-0 lg:border-l" style={{ borderColor: `color-mix(in oklch, ${body.color} 15%, transparent)` }}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-2xl">{body.emoji}</span>
              <span className="text-base font-bold" style={{ color: body.color }}>{body.label}</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{body.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border px-3 py-2" style={{ borderColor: `color-mix(in oklch, ${body.color} 20%, transparent)`, background: `color-mix(in oklch, ${body.color} 6%, transparent)` }}>
              <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Distance</p>
              <p className="text-[11px] font-bold" style={{ color: body.color }}>{body.distance}</p>
            </div>
            <div className="rounded-lg border px-3 py-2" style={{ borderColor: `color-mix(in oklch, ${body.color} 20%, transparent)`, background: `color-mix(in oklch, ${body.color} 6%, transparent)` }}>
              <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Status</p>
              <p className="text-[11px] font-bold" style={{ color: body.color }}>{body.fact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
