"use client";

import { scenes, type SceneStatus } from "@/lib/mock-data";
import { useState } from "react";
import { MapPin } from "lucide-react";

const STATUS_COLOR: Record<SceneStatus, string> = {
  Completed: "var(--color-success)",
  Processing: "var(--color-primary)",
  Failed: "var(--color-destructive)",
  "In Queue": "var(--color-info)",
};

const BBOX = { minLng: 87.5, maxLng: 97.5, minLat: 21.5, maxLat: 29.5 };
function project(lat: number, lng: number) {
  const x = ((lng - BBOX.minLng) / (BBOX.maxLng - BBOX.minLng)) * 100;
  const y = (1 - (lat - BBOX.minLat) / (BBOX.maxLat - BBOX.minLat)) * 100;
  return { x, y };
}

const extras = [
  { id: "EX-1", lat: 26.1, lng: 91.7, status: "Completed" as SceneStatus, name: "Guwahati_W01" },
  { id: "EX-2", lat: 27.1, lng: 93.6, status: "Completed" as SceneStatus, name: "Tezpur_N12" },
  { id: "EX-3", lat: 25.0, lng: 94.5, status: "Processing" as SceneStatus, name: "Kohima_B08" },
  { id: "EX-4", lat: 24.0, lng: 92.5, status: "In Queue" as SceneStatus, name: "Silchar_L04" },
  { id: "EX-5", lat: 23.8, lng: 91.3, status: "Completed" as SceneStatus, name: "Agartala_P05" },
  { id: "EX-6", lat: 28.2, lng: 95.9, status: "Failed" as SceneStatus, name: "Tezu_X06" },
  { id: "EX-7", lat: 26.9, lng: 94.8, status: "Completed" as SceneStatus, name: "Jorhat_G07" },
  { id: "EX-8", lat: 25.3, lng: 92.7, status: "Processing" as SceneStatus, name: "Haflong_M08" },
];
const allPoints = [
  ...scenes.map((s) => ({ id: s.id, lat: s.lat, lng: s.lng, status: s.status, name: s.name })),
  ...extras,
];

export function MapPanel() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Scene Geography</h3>
          <p className="text-xs text-muted-foreground">Northeast India · {allPoints.length} active captures</p>
        </div>
        <MapPin className="h-4 w-4 text-primary shrink-0" />
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px]">
        {(Object.keys(STATUS_COLOR) as SceneStatus[]).map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: STATUS_COLOR[s] }} />
            <span className="text-muted-foreground">{s}</span>
          </div>
        ))}
      </div>

      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border shadow-inner"
        style={{
          background: "linear-gradient(135deg, oklch(0.88 0.04 220), oklch(0.85 0.06 240) 50%, oklch(0.87 0.04 250))",
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full pointer-events-none">
          <defs>
            <pattern id="mapgrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="oklch(0.72 0.04 240)" strokeWidth="0.15" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#mapgrid)" />
          <path
            d="M 8,42 L 18,30 L 28,22 L 42,18 L 58,14 L 72,18 L 86,28 L 92,42 L 88,58 L 82,72 L 70,82 L 54,86 L 38,82 L 22,74 L 12,60 Z"
            fill="oklch(0.78 0.06 200 / 0.5)"
            stroke="oklch(0.50 0.16 195)"
            strokeWidth="0.5"
            strokeOpacity="0.6"
          />
          <path
            d="M 10,25 Q 40,50 80,30 T 95,70"
            fill="none"
            stroke="oklch(0.50 0.16 195)"
            strokeWidth="0.3"
            strokeOpacity="0.3"
            strokeDasharray="2 2"
          />
          <path
            d="M 5,60 Q 35,40 75,55 T 95,35"
            fill="none"
            stroke="oklch(0.52 0.17 265)"
            strokeWidth="0.3"
            strokeOpacity="0.2"
            strokeDasharray="2 2"
          />
          {[25, 27].map((lat) => {
            const y = (1 - (lat - BBOX.minLat) / (BBOX.maxLat - BBOX.minLat)) * 100;
            return (
              <text key={lat} x="1" y={y} fontSize="2.5" fill="oklch(0.50 0.04 240)" opacity="0.7">{lat}°N</text>
            );
          })}
        </svg>

        {allPoints.map((p) => {
          const { x, y } = project(p.lat, p.lng);
          const color = STATUS_COLOR[p.status];
          const isHovered = hover === p.id;
          return (
            <div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
            >
              {isHovered && (
                <span className="absolute inset-0 -m-3 animate-ping rounded-full opacity-30" style={{ background: color }} />
              )}
              <span
                className="relative block rounded-full ring-2 ring-white transition-all"
                style={{
                  width: isHovered ? 14 : 10,
                  height: isHovered ? 14 : 10,
                  background: color,
                  boxShadow: `0 0 ${isHovered ? 10 : 6}px ${color}`,
                  transform: isHovered ? "scale(1.3)" : "scale(1)",
                  transition: "all 0.2s ease",
                }}
              />
              {isHovered && (
                <div className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-popover px-2.5 py-1.5 text-[11px] shadow-xl">
                  <div className="font-semibold text-foreground">{p.name}</div>
                  <div className="text-muted-foreground">{p.status} · {p.lat.toFixed(1)}°N {p.lng.toFixed(1)}°E</div>
                </div>
              )}
            </div>
          );
        })}

        <style>{`
          @keyframes scan {
            0% { top: 0%; opacity: 0; }
            5% { opacity: 0.4; }
            95% { opacity: 0.4; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>
        <div
          className="absolute inset-x-0 h-px opacity-40 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, oklch(0.50 0.16 195), transparent)",
            animation: "scan 4s linear infinite",
            top: "50%",
          }}
        />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {[
          { label: "Completed", count: allPoints.filter(p => p.status === "Completed").length, color: "text-success" },
          { label: "Processing", count: allPoints.filter(p => p.status === "Processing").length, color: "text-primary" },
          { label: "In Queue", count: allPoints.filter(p => p.status === "In Queue").length, color: "text-info" },
          { label: "Failed", count: allPoints.filter(p => p.status === "Failed").length, color: "text-destructive" },
        ].map(({ label, count, color }) => (
          <div key={label} className="rounded-lg bg-muted/50 border border-border/60 p-2 text-center">
            <div className={`text-base font-bold ${color}`}>{count}</div>
            <div className="text-[10px] text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
