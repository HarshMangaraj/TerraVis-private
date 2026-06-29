"use client";

import { useState } from "react";
import { Shell } from "@/components/layout/shell";
import {
  CloudOff, TrendingUp, Layers, Zap, Play, RotateCcw, Download,
  ChevronDown, FileDown, ArrowRight, Clock, CheckCircle2, Loader2,
} from "lucide-react";

// ─── Static data ─────────────────────────────────────────────────────────────

const DATASETS = [
  { id: "LISS_001.tif", satellite: "LISS-IV", date: "2026-06-27", res: "5.8 m", size: "10240 × 10240", cloudGT: 42 },
  { id: "LISS_002.tif", satellite: "LISS-IV", date: "2026-06-26", res: "5.8 m", size: "10240 × 10240", cloudGT: 8  },
  { id: "LISS_003_MX.tif", satellite: "LISS-IV", date: "2026-06-25", res: "5.8 m", size: "10240 × 10240", cloudGT: 71 },
  { id: "LISS_006.tif", satellite: "LISS-IV", date: "2026-06-14", res: "5.8 m", size: "10240 × 10240", cloudGT: 11 },
];

const MODELS = [
  { id: "unet",       label: "U-Net",        version: "v3.2", iou: "96.4%", dice: "95.8%" },
  { id: "deeplabv3", label: "DeepLabV3+",    version: "v2.1", iou: "94.1%", dice: "93.4%" },
  { id: "segformer", label: "SegFormer",     version: "v1.5", iou: "97.0%", dice: "96.5%" },
  { id: "custom",    label: "Custom Model",  version: "v1.0", iou: "—",     dice: "—"     },
];

const confusionMatrix = [
  { label: "True Cloud", cloud: 94.1, clear: 5.9 },
  { label: "True Clear", cloud: 2.3,  clear: 97.7 },
];

const modelInfo = {
  unet:       { input: "256×256", output: "Binary Mask", dataset: "LISS-IV Dataset", epochs: 50,  loss: "Binary Cross Entropy" },
  deeplabv3:  { input: "512×512", output: "Binary Mask", dataset: "LISS-IV Dataset", epochs: 80,  loss: "Focal Loss" },
  segformer:  { input: "512×512", output: "Binary Mask", dataset: "LISS-IV + S2",    epochs: 100, loss: "Dice + BCE" },
  custom:     { input: "256×256", output: "Binary Mask", dataset: "Custom",           epochs: "—", loss: "—" },
};

type LogEntry = { time: string; msg: string; done: boolean };

// ─── View panel placeholders ──────────────────────────────────────────────────

function ImagePanel({
  label, sublabel, bg, pattern,
}: { label: string; sublabel: string; bg: string; pattern?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div
        className="flex aspect-square w-full flex-col items-center justify-center rounded-lg border border-border/50 text-center"
        style={{ background: bg }}
      >
        {pattern === "mask" && (
          <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-60">
            <rect width="80" height="80" fill="#000" />
            <ellipse cx="30" cy="28" rx="18" ry="12" fill="#fff" opacity="0.9" />
            <ellipse cx="55" cy="20" rx="14" ry="9" fill="#fff" opacity="0.7" />
            <ellipse cx="45" cy="55" rx="10" ry="7" fill="#fff" opacity="0.5" />
          </svg>
        )}
        {pattern === "prob" && (
          <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-80">
            <defs>
              <radialGradient id="pg1" cx="40%" cy="35%" r="50%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e3a5f" />
              </radialGradient>
              <radialGradient id="pg2" cx="70%" cy="25%" r="35%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#1e3a5f" />
              </radialGradient>
            </defs>
            <rect width="80" height="80" fill="url(#pg1)" />
            <ellipse cx="56" cy="20" rx="14" ry="10" fill="url(#pg2)" opacity="0.8" />
          </svg>
        )}
        {pattern === "overlay" && (
          <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-70">
            <rect width="80" height="80" fill="#1a3a2a" />
            <rect x="0" y="30" width="80" height="20" fill="#1a2a3a" opacity="0.5" />
            <ellipse cx="30" cy="28" rx="18" ry="12" fill="rgba(239,68,68,0.45)" />
            <ellipse cx="55" cy="20" rx="14" ry="9"  fill="rgba(239,68,68,0.35)" />
            <ellipse cx="45" cy="55" rx="10" ry="7"  fill="rgba(239,68,68,0.25)" />
          </svg>
        )}
        {!pattern && (
          <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-50">
            <rect width="80" height="80" fill="#1a2a3a" />
            <path d="M10 50 Q25 30 50 40 Q75 50 90 30" stroke="rgba(255,255,255,0.15)" fill="none" strokeWidth="1.5" />
            <path d="M0 65 Q30 52 60 62 Q80 68 100 56" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="1" />
            <rect x="15" y="40" width="50" height="25" fill="rgba(255,255,255,0.04)" rx="2" />
          </svg>
        )}
        <p className="mt-2 text-[10px] font-medium text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CloudDetectionPage() {
  const [datasetId,  setDatasetId]  = useState(DATASETS[0].id);
  const [modelId,    setModelId]    = useState("unet");
  const [running,    setRunning]    = useState(false);
  const [done,       setDone]       = useState(false);
  const [logs,       setLogs]       = useState<LogEntry[]>([]);

  const ds    = DATASETS.find((d) => d.id === datasetId)!;
  const model = MODELS.find((m) => m.id === modelId)!;
  const info  = modelInfo[modelId as keyof typeof modelInfo];

  function now() {
    return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  function runDetection() {
    setRunning(true);
    setDone(false);
    setLogs([]);

    const steps: [number, string][] = [
      [300,  "Dataset loaded"],
      [900,  "Model loaded"],
      [1400, "Cloud detection started"],
      [2600, "Mask generated"],
      [3000, "Detection completed"],
    ];

    steps.forEach(([delay, msg], i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, { time: now(), msg, done: true }]);
        if (i === steps.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, delay);
    });
  }

  function reset() {
    setDone(false);
    setLogs([]);
  }

  const stats = [
    { label: "Cloud cover",      value: `${ds.cloudGT}%`,  color: "oklch(0.50 0.16 195)" },
    { label: "Shadow area",      value: "6%",              color: "oklch(0.52 0.17 265)" },
    { label: "Clear area",       value: `${100 - ds.cloudGT - 6}%`, color: "oklch(0.52 0.17 150)" },
    { label: "Processing time",  value: "2.1 sec",         color: "oklch(0.62 0.17 85)"  },
  ];

  const metrics = [
    { label: "IoU",       value: model.iou  },
    { label: "Dice",      value: model.dice },
    { label: "Precision", value: "97.2%"    },
    { label: "Recall",    value: "94.8%"    },
    { label: "F1 Score",  value: "96.0%"    },
  ];

  return (
    <Shell title="Cloud Detection" subtitle={`${model.label} ${model.version} · Binary segmentation · IoU ${model.iou}`}>
      <div className="flex flex-col gap-5">

        {/* ── Controls bar ── */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap items-end gap-4">

            {/* Dataset select */}
            <div className="flex flex-col gap-1 min-w-[180px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Dataset</label>
              <div className="relative">
                <select
                  value={datasetId}
                  onChange={(e) => { setDatasetId(e.target.value); reset(); }}
                  className="w-full appearance-none rounded-lg border border-border bg-muted/40 py-2 pl-3 pr-8 text-xs text-foreground outline-none"
                >
                  {DATASETS.map((d) => (
                    <option key={d.id} value={d.id}>{d.id}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              </div>
            </div>

            {/* Model select */}
            <div className="flex flex-col gap-1 min-w-[160px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Model</label>
              <div className="relative">
                <select
                  value={modelId}
                  onChange={(e) => { setModelId(e.target.value); reset(); }}
                  className="w-full appearance-none rounded-lg border border-border bg-muted/40 py-2 pl-3 pr-8 text-xs text-foreground outline-none"
                >
                  {MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              </div>
            </div>

            {/* Model quick stats */}
            <div className="flex gap-3">
              {[
                { k: "Version", v: model.version },
                { k: "IoU",     v: model.iou     },
                { k: "Dice",    v: model.dice     },
              ].map(({ k, v }) => (
                <div key={k} className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-center">
                  <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{k}</p>
                  <p className="text-xs font-bold tabular-nums text-foreground">{v}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={reset}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/40 transition-colors"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
              <button
                onClick={runDetection}
                disabled={running}
                className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {running
                  ? <><Loader2 className="h-3 w-3 animate-spin" /> Detecting…</>
                  : <><Play className="h-3 w-3" /> Detect clouds</>}
              </button>
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_260px]">

          {/* Left column */}
          <div className="flex flex-col gap-5">

            {/* Dataset info */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Dataset information</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {[
                  { k: "Dataset name",            v: ds.id },
                  { k: "Satellite",               v: ds.satellite },
                  { k: "Capture date",            v: ds.date },
                  { k: "Resolution",              v: ds.res },
                  { k: "Image size",              v: ds.size },
                  { k: "Cloud cover (GT)",        v: `${ds.cloudGT}%` },
                ].map(({ k, v }) => (
                  <div key={k} className="rounded-lg bg-muted/30 px-3 py-2">
                    <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{k}</p>
                    <p className="mt-0.5 text-xs font-semibold text-foreground truncate" title={v}>{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Four image panels */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Detection results</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <ImagePanel label="Original image"   sublabel="LISS-IV scene"          bg="#1a2a3a" />
                <ImagePanel label="Cloud mask"       sublabel="White = cloud · Black = clear" bg="#111"    pattern="mask" />
                <ImagePanel label="Probability map"  sublabel="Blue = low · Yellow = high"   bg="#0f1f3a" pattern="prob" />
                <ImagePanel label="Overlay"          sublabel="Mask on original"             bg="#1a2a1a" pattern="overlay" />
              </div>
              {!done && !running && (
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Run detection to generate results
                </p>
              )}
              {running && (
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-primary">
                  <Loader2 className="h-3 w-3 animate-spin" /> Processing…
                </div>
              )}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(({ label, value, color }) => (
                <div key={label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="text-xl font-bold tabular-nums text-foreground">{done || label === "Processing time" ? value : "—"}</p>
                    </div>
                    <div
                      className="h-7 w-7 rounded-lg flex items-center justify-center"
                      style={{ background: `color-mix(in oklch, ${color} 12%, white)`, border: `1px solid color-mix(in oklch, ${color} 22%, transparent)` }}
                    >
                      <CloudOff className="h-3.5 w-3.5" style={{ color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance metrics */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Performance metrics</p>
              <div className="grid grid-cols-5 gap-2">
                {metrics.map(({ label, value }) => (
                  <div key={label} className="rounded-lg bg-muted/30 px-3 py-3 text-center">
                    <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                    <p className="mt-1 text-base font-bold tabular-nums text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Processing log */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Processing log</p>
              <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                {logs.length === 0 && (
                  <p className="text-muted-foreground italic text-[11px]">No activity yet — run detection to start.</p>
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
                    <span className="text-primary">Running…</span>
                  </div>
                )}
              </div>
            </div>

            {/* Export */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Export</p>
              <div className="flex flex-wrap gap-2">
                <button disabled={!done} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <Download className="h-3 w-3" /> Download cloud mask
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

            {/* Confusion matrix */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Confusion matrix</p>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="p-2 text-left text-[9px] font-semibold text-muted-foreground">Actual ↓ / Pred →</th>
                      <th className="p-2 text-center text-[9px] font-semibold text-primary">Cloud</th>
                      <th className="p-2 text-center text-[9px] font-semibold text-success">Clear</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confusionMatrix.map((row) => (
                      <tr key={row.label} className="border-b border-border/50">
                        <td className="p-2 text-[10px] font-medium text-muted-foreground">{row.label}</td>
                        <td className="p-2 text-center">
                          <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${row.label === "True Cloud" ? "bg-primary/15 text-primary" : "bg-destructive/12 text-destructive"}`}>
                            {row.cloud}%
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${row.label === "True Clear" ? "bg-success/15 text-success" : "bg-warning/12 text-warning"}`}>
                            {row.clear}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Model information */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Model information</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { k: "Model",    v: model.label     },
                  { k: "Version",  v: model.version   },
                  { k: "Input",    v: info.input      },
                  { k: "Output",   v: info.output     },
                  { k: "Dataset",  v: info.dataset    },
                  { k: "Epochs",   v: String(info.epochs) },
                  { k: "Loss",     v: info.loss       },
                ].map(({ k, v }) => (
                  <div key={k} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0">
                    <span className="text-[10px] text-muted-foreground">{k}</span>
                    <span className="text-[10px] font-medium text-foreground text-right max-w-[130px] truncate" title={v}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Architecture</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { type: "Conv",  layer: "Encoder",        detail: "ResNet-50 · 4 stages · 2048ch" },
                  { type: "Attn",  layer: "Skip connections", detail: "4 skip · channel attention"  },
                  { type: "ASPP",  layer: "Bottleneck",     detail: "Dilated conv r=6,12,18"        },
                  { type: "Conv",  layer: "Decoder",        detail: "4× upsample · bilinear+Conv"   },
                  { type: "Head",  layer: "Output head",    detail: "1×1 Conv → sigmoid → mask"     },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg bg-muted/40 px-2.5 py-2">
                    <span className="shrink-0 rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[8px] font-bold text-primary">{a.type}</span>
                    <div>
                      <p className="text-[10px] font-medium text-foreground">{a.layer}</p>
                      <p className="text-[9px] text-muted-foreground">{a.detail}</p>
                    </div>
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