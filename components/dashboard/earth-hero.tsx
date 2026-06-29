"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const EarthScene = dynamic(
  () => import("./earth-scene").then((m) => ({ default: m.EarthScene })),
  { ssr: false }
);

const MonitoringScene = dynamic(
  () => import("@/components/monitoring/monitoring-scene").then((m) => ({ default: m.MonitoringScene })),
  { ssr: false }
);

import type { SpaceBodyKey } from "@/components/monitoring/monitoring-scene";

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

export function EarthHero({ activeBody = "earth", onGlobeClick }: { activeBody?: SpaceBodyKey; onGlobeClick?: (lat: number, lng: number) => void }) {
  const hasWebGL = useWebGL();

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-full w-full"
      style={{
        background: "#050d1a",
        minHeight: 380,
      }}
    >
      {hasWebGL === null ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400/60" />
        </div>
      ) : hasWebGL ? (
        <div className="absolute inset-0">
          {activeBody === "earth" ? (
            <EarthScene onGlobeClick={onGlobeClick} />
          ) : activeBody === "milky" ? (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#050d1a] relative overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen" />
              <div className="z-10 animate-bounce text-8xl drop-shadow-2xl">👙</div>
              <p className="z-10 mt-6 text-2xl font-bold text-pink-400 tracking-widest drop-shadow-md">GALACTIC BIKINI</p>
              <p className="z-10 mt-2 text-sm text-pink-200/70">It gets hot near the galactic core.</p>
            </div>
          ) : (
            <MonitoringScene body={activeBody} hideUI={true} />
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm">
          WebGL not supported
        </div>
      )}
    </div>
  );
}
