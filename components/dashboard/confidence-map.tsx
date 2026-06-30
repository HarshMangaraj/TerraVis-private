"use client";

import { useRef, useEffect } from "react";

export function ConfidenceMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    // ── Draw pseudo-color confidence heatmap ──────────────────────────────
    // Simulate pixel-level classification confidence using smooth radial blobs
    const blobs = [
      { x: 0.30 * W, y: 0.38 * H, r: W * 0.32, conf: 0.95, color: [16,  185, 129] }, // high — green
      { x: 0.68 * W, y: 0.28 * H, r: W * 0.26, conf: 0.78, color: [245, 158,  11] }, // medium — amber
      { x: 0.50 * W, y: 0.68 * H, r: W * 0.22, conf: 0.55, color: [239,  68,  68] }, // low — red
      { x: 0.80 * W, y: 0.72 * H, r: W * 0.18, conf: 0.62, color: [245, 158,  11] }, // medium
      { x: 0.15 * W, y: 0.65 * H, r: W * 0.20, conf: 0.42, color: [239,  68,  68] }, // low
      { x: 0.60 * W, y: 0.50 * H, r: W * 0.14, conf: 0.88, color: [ 52, 211, 153] }, // high
    ];

    blobs.forEach(({ x, y, r, conf, color }) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      const [R, G, B] = color;
      grad.addColorStop(0,   `rgba(${R},${G},${B},${conf * 0.75})`);
      grad.addColorStop(0.4, `rgba(${R},${G},${B},${conf * 0.40})`);
      grad.addColorStop(1,   `rgba(${R},${G},${B},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    });

    // Fine grid to mimic pixel classification
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = "rgba(148,163,184,0.3)";
    ctx.lineWidth = 0.5;
    const gs = 12;
    for (let x = 0; x < W; x += gs) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += gs) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Contour iso-lines
    const contourData = [
      { level: 0.90, color: "rgba(16,185,129,0.55)", width: 0.8 },
      { level: 0.70, color: "rgba(245,158,11,0.50)", width: 0.6 },
      { level: 0.50, color: "rgba(239,68,68,0.45)",  width: 0.6 },
    ];
    contourData.forEach(({ color, width }, i) => {
      ctx.beginPath();
      ctx.moveTo(W * 0.10, H * (0.30 + i * 0.15));
      ctx.bezierCurveTo(
        W * 0.30, H * (0.20 + i * 0.10),
        W * 0.60, H * (0.35 + i * 0.08),
        W * 0.90, H * (0.28 + i * 0.12)
      );
      ctx.strokeStyle = color;
      ctx.lineWidth   = width;
      ctx.stroke();
    });

    // Value labels on canvas
    ctx.font      = "bold 9px monospace";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    [
      { x: W * 0.28, y: H * 0.36, v: "0.95" },
      { x: W * 0.66, y: H * 0.26, v: "0.78" },
      { x: W * 0.48, y: H * 0.66, v: "0.55" },
    ].forEach(({ x, y, v }) => ctx.fillText(v, x, y));

  }, []);

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col h-full gap-3">
      {/* Header */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Confidence Map
        </h3>
        <p className="text-[9px] font-mono text-muted-foreground/50 mt-0.5">
          GV_LISS4_20260622_CONF
        </p>
      </div>

      {/* Image + heatmap stack */}
      <div className="relative flex-1 min-h-[150px] rounded-lg overflow-hidden border border-border bg-[#07090e]">
        {/* Real satellite base image */}
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&auto=format&fit=crop&q=70"
          alt="Satellite base"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          loading="lazy"
        />

        {/* Canvas heatmap overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full mix-blend-screen"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
          }}
        />

        {/* Top-right: accuracy chip */}
        <div className="absolute top-2 right-2 z-10 rounded border border-[#10b981]/30 bg-black/60 px-1.5 py-0.5 text-[8px] font-bold text-[#10b981] backdrop-blur-sm">
          Acc: 94.2%
        </div>

        {/* Corner coordinate HUD */}
        <div className="absolute bottom-2 left-2 z-10 rounded bg-black/60 border border-border/60 px-1.5 py-0.5 text-[8px] font-mono text-muted-foreground backdrop-blur-sm">
          26.15°N 93.62°E
        </div>
      </div>

      {/* Color legend bar */}
      <div className="mt-1">
        <div className="flex justify-between text-[8px] text-muted-foreground font-semibold mb-1.5">
          <span>Low (0.0)</span>
          <span>Confidence</span>
          <span>High (1.0)</span>
        </div>
        <div
          className="h-2.5 w-full rounded-full border border-border/60"
          style={{
            background:
              "linear-gradient(to right, #ef4444 0%, #f97316 25%, #f59e0b 50%, #84cc16 75%, #10b981 100%)",
          }}
        />
        {/* Tick marks */}
        <div className="flex justify-between text-[7px] text-muted-foreground/50 mt-1 font-mono">
          <span>0.0</span>
          <span>0.25</span>
          <span>0.50</span>
          <span>0.75</span>
          <span>1.0</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "High", value: "58%",  color: "#10b981" },
          { label: "Med",  value: "27%",  color: "#f59e0b" },
          { label: "Low",  value: "15%",  color: "#ef4444" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded border border-border bg-[#0d1017] px-2 py-1 text-center"
          >
            <div className="text-[9px] font-bold" style={{ color }}>
              {value}
            </div>
            <div className="text-[8px] text-muted-foreground/60">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
