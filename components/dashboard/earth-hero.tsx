"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const EarthScene = dynamic(
  () => import("./earth-scene").then((m) => ({ default: m.EarthScene })),
  { ssr: false }
);

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
          <EarthScene />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm">
          WebGL not supported
        </div>
      )}
    </div>
  );
}
