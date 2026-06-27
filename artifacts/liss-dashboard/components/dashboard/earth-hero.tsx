"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Loader2, Signal, Globe } from "lucide-react";
import { satelliteOrbits } from "@/lib/mock-data";

const EarthScene = dynamic(
  () => import("./earth-scene").then((m) => ({ default: m.EarthScene })),
  { ssr: false }
);

function WebGLFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative" style={{ width: 220, height: 220 }}>
        {/* Atmosphere outer glow */}
        <div
          className="absolute -inset-3 rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 50%, oklch(0.50 0.16 195 / 0.4) 75%, transparent 100%)",
            filter: "blur(4px)",
          }}
        />
        {/* Planet core */}
        <div
          className="absolute inset-0 rounded-full shadow-2xl"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, oklch(0.45 0.15 195), oklch(0.28 0.12 240) 50%, oklch(0.18 0.08 260))",
            boxShadow:
              "0 0 80px -10px oklch(0.50 0.16 195 / 0.5), inset -30px -20px 60px oklch(0.12 0.05 260 / 0.8)",
          }}
        />
        {/* Land masses */}
        {[
          { top: "22%", left: "18%", w: "28%", h: "20%", r: "40% 60% 60% 40%" },
          { top: "45%", left: "52%", w: "22%", h: "18%", r: "60% 40% 40% 60%" },
          { top: "60%", left: "28%", w: "20%", h: "22%", r: "45% 55% 55% 45%" },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: s.top, left: s.left, width: s.w, height: s.h,
              background: "oklch(0.52 0.18 150)",
              borderRadius: s.r,
              filter: "blur(1px)",
              opacity: 0.6,
            }}
          />
        ))}
        {/* Cloud band */}
        <div
          className="absolute opacity-20"
          style={{
            top: "38%", left: "10%", width: "80%", height: "14%",
            background: "linear-gradient(90deg, transparent, white 30%, white 70%, transparent)",
            borderRadius: "50%",
            filter: "blur(3px)",
          }}
        />
        {/* Orbit rings */}
        <div className="absolute" style={{ top: "22%", left: "-20%", width: "140%", height: "55%", border: "1px solid oklch(0.50 0.16 195 / 0.25)", borderRadius: "50%", transform: "rotateX(75deg)" }} />
        <div className="absolute" style={{ top: "18%", left: "-30%", width: "160%", height: "60%", border: "1px solid oklch(0.50 0.16 195 / 0.2)", borderRadius: "50%", transform: "rotateX(75deg) rotate(45deg)" }} />
        {/* Satellite dots */}
        {[{ t: "15%", l: "72%" }, { t: "80%", l: "12%" }, { t: "48%", l: "96%" }].map((p, i) => (
          <div key={i} className="absolute h-3 w-3 rounded-full ring-2 ring-white/20" style={{ top: p.t, left: p.l, background: i === 2 ? "oklch(0.62 0.17 85)" : "oklch(0.50 0.16 195)", boxShadow: `0 0 10px ${i === 2 ? "oklch(0.62 0.17 85)" : "oklch(0.50 0.16 195)"}` }} />
        ))}
      </div>
    </div>
  );
}

function useWebGL() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(!!ctx);
    } catch {
      setHasWebGL(false);
    }
  }, []);
  return hasWebGL;
}

export function EarthHero() {
  const hasWebGL = useWebGL();

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border shadow-sm"
      style={{
        background: "radial-gradient(ellipse at center, #0d1b3e 0%, #050a1a 70%)",
        minHeight: 380,
      }}
    >
      {/* Stars background (always visible) */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 17 + 3) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
              width: i % 4 === 0 ? 2 : 1,
              height: i % 4 === 0 ? 2 : 1,
              opacity: 0.3 + (i % 5) * 0.1,
            }}
          />
        ))}
      </div>

      {/* 3D scene or fallback */}
      {hasWebGL === null ? (
        /* Still checking */
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400/60" />
        </div>
      ) : hasWebGL ? (
        /* WebGL available → Three.js scene */
        <div className="absolute inset-0">
          <EarthScene />
        </div>
      ) : (
        /* No WebGL → CSS fallback */
        <WebGLFallback />
      )}

      {/* Title overlay */}
      <div className="pointer-events-none absolute left-5 top-5 z-10">
        <div className="flex items-center gap-2 mb-1">
          <Globe className="h-3.5 w-3.5 text-blue-300" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-300">Live Orbital View</span>
        </div>
        <h2 className="text-xl font-bold text-white leading-tight">LISS-IV Constellation</h2>
        <p className="mt-0.5 text-xs text-blue-300/70">3 satellites · Real-time tracking</p>
      </div>

      {/* Stats overlay */}
      <div className="pointer-events-none absolute right-5 top-5 z-10 flex flex-col gap-1.5">
        <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-center backdrop-blur-sm">
          <div className="text-[9px] uppercase tracking-wider text-blue-200/80">Satellites</div>
          <div className="text-xl font-bold tabular-nums text-white">3</div>
        </div>
        <div className="rounded-xl border border-green-400/20 bg-black/40 px-3 py-2 text-center backdrop-blur-sm">
          <div className="text-[9px] uppercase tracking-wider text-blue-200/80">Passes Today</div>
          <div className="text-xl font-bold tabular-nums text-green-400">14</div>
        </div>
      </div>

      {/* Satellite status cards */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex gap-2">
        {satelliteOrbits.map((s) => (
          <div
            key={s.name}
            className="flex flex-1 min-w-36 items-center gap-2.5 rounded-lg border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-sm"
          >
            <span className={`h-2 w-2 rounded-full shrink-0 ${s.status === "operational" ? "bg-green-400" : "bg-yellow-400"}`} />
            <div className="min-w-0 flex-1 truncate">
              <div className="text-[11px] font-semibold text-white truncate">{s.name}</div>
              <div className="text-[10px] text-blue-200/60">{s.altitude} km</div>
            </div>
            <Signal className="h-3.5 w-3.5 text-blue-400 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
