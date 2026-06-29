"use client";

import { useState } from "react";
import { Shell } from "@/components/layout/shell";
import {
  Layers, ArrowRight, Gauge, TrendingUp, Zap, Shield,
  CheckCircle2, AlertTriangle, Loader2, Download, FileDown,
  RotateCcw, Play, ChevronDown, Map,
} from "lucide-react";

// ─── Static data ──────────────────────────────────────────────────────────────

const DATASETS = {
  liss:  { id: "LISS_001.tif",   label: "LISS-IV",     date: "2026-06-27", res: "5.8 m",  bands: "R, G, NIR", size: "212 MB" },
  s1:    { id: "S1_GRD_001.tif", label: "Sentinel-1",  date: "2026-06-24", res: "10 m",   bands: "VV, VH",    size: "890 MB" },
  s2:    { id: "S2_L2A_001.tif", label: "Sentinel-2",  date: "2026-06-23", res: "10 m",   bands: "B2–B12",    size: "1.2 GB" },
  dem:   { id: "DEM_NE_01.nc",   label: "DEM",         date: "2026-06-20", res: "30 m",   bands: "Elevation", size: "450 MB" },
};

const FUSION_METHODS = [
  { id: "weighted", label: "Weighted average fusion" },
  { id: "sar",      label: "SAR-guided inpainting"   },
  { id: "temporal", label: "Temporal + SAR fusion"   },
  { id: "deep",     label: "Deep feature fusion"     },
];

const fusionSources = [
  { key: "liss", name: "LISS-IV Optical",  bands: "R, G, NIR",      res: "5.8 m", weight: 0.65, color: "oklch(0.50 0.16 195)" },
  { key: "s1",   name: "SAR (Sentinel-1)", bands: "VV, VH",         res: "10 m",  weight: 0.25, color: "oklch(0.52 0.17 150)" },
  { key: "s2",   name: "Sentinel-2",       bands: "B2–B12",         res: "10 m",  weight: 0.08, color: "oklch(0.52 0.17 265)" },
  { key: "dem",  name: "DEM Elevation",    bands: "Elevation",      res: "30 m",  weight: 0.02, color: "oklch(0.62 0.17 85)"  },
];

const scenarios = [
  { coverage: "0–30%",   method: "Direct pass-through",  psnr: "38.4 dB", time: "0.4s", quality: 98 },
  { coverage: "30–60%",  method: "SAR-guided inpaint",   psnr: "33.2 dB", time: "4.1s", quality: 91 },
  { coverage: "60–85%",  method: "Temporal + SAR fusion", psnr: "29.7 dB", time: "6.8s", quality: 82 },
  { coverage: ">85%",    method: "Full generative prior", psnr: "26.1 dB", time: "12.3s",quality: 68 },
];

type LogEntry = { time: string; msg: string };
type AlignStatus = "idle" | "checking" | "ok" | "warn";

// ─── Bar chart (inline SVG) ───────────────────────────────────────────────────

function ContributionChart() {
  const bars = fusionSources.map((s) => ({ label: s.name.split(" ")[0], pct: s.weight * 100, color: s.color }));
  const maxH = 80;
  return (
    <div>
      <p className="mb-3 text-xs font-semibold text-foreground">Feature contribution</p>
      <div className="flex items-end gap-3 h-24">
        {bars.map((b) => (
          <div key={b.label} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[9px] font-bold tabular-nums" style={{ color: b.color }}>{b.pct.toFixed(0)}%</span>
            <div className="w-full rounded-t-md" style={{ height: `${(b.pct / 65) * maxH}%`, background: b.color, minHeight: 4 }} />
            <span className="text-[9px] text-muted-foreground">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Image panel placeholder ──────────────────────────────────────────────────

function FusionPanel({ label, sub, color, pattern }: { label: string; sub: string; color: string; pattern: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div
        className="flex aspect-square w-full flex-col items-center justify-center rounded-lg border border-border/50"
        style={{ background: color }}
      >
        {pattern === "optical" && (
          <svg width="70" height="70" viewBox="0 0 70 70" className="opacity-60">
            <rect width="70" height="70" fill="#1a2a3a"/>
            <path d="M5 45 Q20 28 42 36 Q60 44 70 28" stroke="rgba(255,255,255,0.18)" fill="none" strokeWidth="1.5"/>
            <rect x="12" y="38" width="46" height="22" fill="rgba(255,255,255,0.05)" rx="2"/>
          </svg>
        )}
        {pattern === "sar" && (
          <svg width="70" height="70" viewBox="0 0 70 70" className="opacity-60">
            <rect width="70" height="70" fill="#0a1a0a"/>
            {[10,20,30,40,50,60].map(y=>(
              <line key={y} x1="0" y1={y} x2="70" y2={y+5} stroke="rgba(80,220,80,0.15)" strokeWidth="1"/>
            ))}
            <ellipse cx="35" cy="32" rx="20" ry="12" fill="rgba(80,220,80,0.12)" stroke="rgba(80,220,80,0.3)" strokeWidth="1"/>
          </svg>
        )}
        {pattern === "dem" && (
          <svg width="70" height="70" viewBox="0 0 70 70" className="opacity-70">
            <rect width="70" height="70" fill="#1a1208"/>
            <path d="M0 55 L20 30 L35 42 L50 20 L70 38 L70 70 L0 70Z" fill="rgba(180,140,60,0.25)"/>
            <path d="M0 60 L15 40 L30 50 L45 28 L65 44 L70 70 L0 70Z" fill="rgba(180,140,60,0.15)"/>
          </svg>
        )}
        {pattern === "fused" && (
          <svg width="70" height="70" viewBox="0 0 70 70" className="opacity-70">
            <rect width="70" height="70" fill="#1a2a1a"/>
            <path d="M5 45 Q20 28 42 36 Q60 44 70 28" stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth="1.5"/>
            <ellipse cx="35" cy="32" rx="20" ry="12" fill="rgba(80,180,80,0.12)" stroke="rgba(80,180,80,0.2)" strokeWidth="1"/>
            <path d="M0 58 L15 42 L30 52 L45 30 L65 46 L70 70 L0 70Z" fill="rgba(180,140,60,0.12)"/>
          </svg>
        )}
        <p className="mt-1 text-[9px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function FusionPage() {
  const [method,    setMethod]    = useState("weighted");
  const [running,   setRunning]   = useState(false);
  const [done,      setDone]      = useState(false);
  const [logs,      setLogs]      = useState<LogEntry[]>([]);
  const [alignSt,   setAlignSt]   = useState<AlignStatus>("idle");
  const [selected,  setSelected]  = useState({ liss: true, s1: true, s2: true, dem: true });

  const activeCount = Object.values(selected).filter(Boolean).length;

  function now() {
    return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  function checkAlignment() {
    setAlignSt("checking");
    setTimeout(() => setAlignSt("ok"), 1800);
  }

  function runFusion() {
    setRunning(true);
    setDone(false);
    setLogs([]);

    const steps: [number, string][] = [
      [400,  "Input datasets loaded"],
      [900,  "Coordinate system aligned (WGS84 / UTM 46N)"],
      [1500, "Spatial registration completed"],
      [2200, `${FUSION_METHODS.find(m => m.id === method)?.label} initiated`],
      [3200, "Feature fusion in progress"],
      [4200, "Output layer generated"],
      [4800, "Fusion completed successfully"],
    ];

    steps.forEach(([delay, msg], i) => {
      setTimeout(() => {
        setLogs((p) => [...p, { time: now(), msg }]);
        if (i === steps.length - 1) { setRunning(false); setDone(true); }
      }, delay);
    });
  }

  function reset() { setDone(false); setLogs([]); setAlignSt("idle"); }

  const stats = [
    { label: "Avg PSNR",       value: done ? "32.1 dB" : "—", icon: Gauge,     color: "oklch(0.50 0.16 195)" },
    { label: "SAR-fused",      value: done ? "38%"     : "—", icon: Layers,    color: "oklch(0.52 0.17 150)" },
    { label: "Temporal fused", value: done ? "24%"     : "—", icon: TrendingUp, color: "oklch(0.62 0.17 85)"  },
    { label: "Coverage rate",  value: done ? "99.8%"   : "—", icon: Shield,    color: "oklch(0.52 0.17 265)" },
  ];

  return (
    <Shell title="Multi-Sensor Fusion" subtitle="SAR–optical–DEM adaptive fusion · multi-temporal pipeline">
      <div className="flex flex-col gap-5">

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold tabular-nums text-foreground">{value}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: `color-mix(in oklch, ${color} 12%, white)`, border: `1px solid color-mix(in oklch, ${color} 22%, transparent)` }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Controls bar ── */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1 min-w-[200px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Fusion method</label>
              <div className="relative">
                <select value={method} onChange={e => { setMethod(e.target.value); reset(); }}
                  className="w-full appearance-none rounded-lg border border-border bg-muted/40 py-2 pl-3 pr-8 text-xs text-foreground outline-none">
                  {FUSION_METHODS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              </div>
            </div>

            {/* Alignment check */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Coordinate alignment</label>
              <button onClick={checkAlignment} disabled={alignSt === "checking"}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/40 transition-colors disabled:opacity-50">
                {alignSt === "checking" && <Loader2 className="h-3 w-3 animate-spin" />}
                {alignSt === "ok"       && <CheckCircle2 className="h-3 w-3 text-success" />}
                {alignSt === "idle"     && <Gauge className="h-3 w-3" />}
                {alignSt === "checking" ? "Checking…" : alignSt === "ok" ? "WGS84 aligned ✓" : "Check alignment"}
              </button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button onClick={reset}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/40 transition-colors">
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
              <button onClick={runFusion} disabled={running || activeCount < 2}
                className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {running ? <><Loader2 className="h-3 w-3 animate-spin" /> Fusing…</> : <><Play className="h-3 w-3" /> Run fusion</>}
              </button>
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_270px]">

          {/* Left */}
          <div className="flex flex-col gap-5">

            {/* Input datasets */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Input datasets</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(Object.entries(DATASETS) as [keyof typeof DATASETS, typeof DATASETS[keyof typeof DATASETS]][]).map(([key, ds]) => {
                  const active = selected[key as keyof typeof selected];
                  const color = fusionSources.find(f => f.key === key)?.color ?? "oklch(0.5 0.1 200)";
                  return (
                    <div
                      key={key}
                      onClick={() => setSelected(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                      className={`cursor-pointer rounded-xl border p-3 transition-all ${active ? "border-primary/30 bg-primary/6" : "border-border bg-muted/20 opacity-50"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg"
                          style={{ background: `color-mix(in oklch, ${color} 12%, white)`, border: `1px solid color-mix(in oklch, ${color} 25%, transparent)` }}>
                          <Map className="h-3.5 w-3.5" style={{ color }} />
                        </div>
                        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${active ? "border-primary bg-primary" : "border-border bg-transparent"}`}>
                          {active && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-[10px] font-semibold text-foreground">{ds.label}</p>
                      <p className="text-[9px] text-muted-foreground font-mono truncate">{ds.id}</p>
                      <div className="mt-2 flex flex-col gap-0.5">
                        <span className="text-[9px] text-muted-foreground">Res: <span className="text-foreground font-medium">{ds.res}</span></span>
                        <span className="text-[9px] text-muted-foreground">Bands: <span className="text-foreground font-medium">{ds.bands}</span></span>
                        <span className="text-[9px] text-muted-foreground">Size: <span className="text-foreground font-medium">{ds.size}</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">{activeCount} of 4 datasets selected — click to toggle</p>
            </div>

            {/* Alignment status */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Alignment status</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {fusionSources.map((src) => {
                  const active = selected[src.key as keyof typeof selected];
                  return (
                    <div key={src.key} className={`rounded-lg border px-3 py-2.5 ${active ? "border-border/50 bg-muted/30" : "border-border/20 bg-muted/10 opacity-40"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-foreground">{src.name.split(" ")[0]}</span>
                        {active && alignSt === "checking" && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
                        {active && alignSt === "ok"       && <CheckCircle2 className="h-3 w-3 text-success" />}
                        {active && alignSt === "idle"     && <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />}
                      </div>
                      <p className="text-[9px] text-muted-foreground">Res: {src.res}</p>
                      <p className="text-[9px] text-muted-foreground">Bands: {src.bands}</p>
                      {alignSt === "ok" && active && (
                        <p className="mt-1 text-[9px] font-medium text-success">WGS84 ✓</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Four image panels */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Fusion preview</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <FusionPanel label="LISS-IV optical" sub="RGB scene"         color="#1a2a3a" pattern="optical" />
                <FusionPanel label="SAR (Sentinel-1)" sub="VV/VH backscatter" color="#0a1a0a" pattern="sar"     />
                <FusionPanel label="DEM elevation"   sub="Terrain height"    color="#1a1208" pattern="dem"     />
                <FusionPanel label="Fused output"    sub="Multi-sensor composite" color="#1a2a1a" pattern="fused" />
              </div>
              {!done && !running && <p className="mt-3 text-center text-[11px] text-muted-foreground">Run fusion to generate output</p>}
              {running && <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-primary"><Loader2 className="h-3 w-3 animate-spin" /> Processing…</div>}
            </div>

            {/* Fusion statistics */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Fusion statistics</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { k: "Output resolution", v: done ? "5.8 m"    : "—" },
                  { k: "Output size",       v: done ? "1.84 GB"  : "—" },
                  { k: "Spatial coverage",  v: done ? "99.8%"    : "—" },
                  { k: "Processing time",   v: done ? "4.8 sec"  : "—" },
                  { k: "PSNR",              v: done ? "32.1 dB"  : "—" },
                  { k: "SSIM",              v: done ? "0.912"    : "—" },
                  { k: "Bands fused",       v: done ? "10"       : "—" },
                  { k: "Projection",        v: "WGS84 / UTM 46N"       },
                ].map(({ k, v }) => (
                  <div key={k} className="rounded-lg bg-muted/30 px-3 py-2">
                    <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{k}</p>
                    <p className="mt-0.5 text-xs font-bold text-foreground">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Processing log */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Processing log</p>
              <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                {logs.length === 0 && !running && (
                  <p className="text-muted-foreground italic">No activity yet — run fusion to start.</p>
                )}
                {logs.map((l, i) => (
                  <div key={i} className="flex items-center gap-2.5 rounded-md bg-muted/30 px-3 py-1.5">
                    <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-success" />
                    <span className="text-muted-foreground">{l.time}</span>
                    <span className="text-foreground">{l.msg}</span>
                  </div>
                ))}
                {running && (
                  <div className="flex items-center gap-2.5 rounded-md bg-muted/30 px-3 py-1.5">
                    <Loader2 className="h-3 w-3 flex-shrink-0 text-primary animate-spin" />
                    <span className="text-primary">Processing…</span>
                  </div>
                )}
              </div>
            </div>

            {/* Export */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Export</p>
              <div className="flex flex-wrap gap-2">
                <button disabled={!done} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <Download className="h-3 w-3" /> Download fused image
                </button>
                <button disabled={!done} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <FileDown className="h-3 w-3" /> Export GeoTIFF
                </button>
                <button disabled={!done} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <FileDown className="h-3 w-3" /> Export PNG
                </button>
                <button disabled={!done} className="ml-auto flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue to reconstruction <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">

            {/* Fusion pipeline */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Fusion pipeline</p>
              <div className="flex flex-col gap-1.5">
                {["LISS-IV input", "Cloud mask", "SAR align", "DEM warp", "Feature fuse", "Refine", "Output"].map((step, i, arr) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-full rounded-md border px-2.5 py-1.5 text-[10px] font-semibold text-center ${i === 0 || i === arr.length - 1 ? "border-primary/25 bg-primary/8 text-primary" : "border-border bg-muted/30 text-muted-foreground"}`}>
                      {step}
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-2.5 bg-border/60" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Source weights */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Source weights</p>
              <div className="flex flex-col gap-2.5">
                {fusionSources.map((src) => (
                  <div key={src.key}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-sm" style={{ background: src.color }} />
                        <span className="text-[10px] text-muted-foreground">{src.name.split(" ")[0]}</span>
                      </div>
                      <span className="text-[10px] font-bold" style={{ color: src.color }}>{(src.weight * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${src.weight * 100}%`, background: src.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Contribution chart */}
              <div className="mt-4 border-t border-border/40 pt-4">
                <ContributionChart />
              </div>
            </div>

            {/* Cloud coverage scenarios */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Coverage scenarios</p>
              <div className="flex flex-col gap-2">
                {scenarios.map((s) => (
                  <div key={s.coverage} className="rounded-lg border border-border/50 bg-muted/20 px-3 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold text-foreground">{s.coverage} cloud</span>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{s.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] text-muted-foreground">{s.method}</span>
                      <span className="text-[9px] font-semibold text-primary">{s.psnr}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{
                        width: `${s.quality}%`,
                        background: s.quality > 90 ? "oklch(0.52 0.17 150)" : s.quality > 75 ? "oklch(0.50 0.16 195)" : "oklch(0.62 0.17 85)",
                      }} />
                    </div>
                    <div className="mt-0.5 text-right text-[9px] text-muted-foreground">{s.quality}% quality</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Shell>
  );
}