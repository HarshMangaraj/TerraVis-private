"use client";

import { useState, useEffect, useRef } from "react";
import { Shell } from "@/components/layout/shell";
import {
  Satellite, Cloud, Cpu, HardDrive, MemoryStick, Activity,
  MapPin, CheckCircle2, Loader2, Clock, Zap, RefreshCw,
  Thermometer, Wifi, Database, Globe, Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type LogEntry = { time: string; level: "info" | "success" | "warn"; msg: string };
type Job = { id: string; image: string; stage: string; progress: number; elapsed: string; status: "running" | "queued" | "done" };
type SpaceBody = "earth" | "moon" | "mars" | "sun" | "milky";

// ─── Mock real-time hook ──────────────────────────────────────────────────────
function useRealtimeMetrics() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);
  const jitter = (base: number, range: number) =>
    Math.min(100, Math.max(0, base + Math.sin(tick * 0.7 + base) * range));
  return {
    gpu: Math.round(jitter(74, 8)),
    cpu: Math.round(jitter(52, 12)),
    ram: Math.round(jitter(68, 5)),
    storage: 24.5,
    temp: Math.round(jitter(71, 4)),
    netIn: jitter(120, 30).toFixed(1),
    netOut: jitter(45, 15).toFixed(1),
    queue: 3, running: 2, tick,
    satLat: (23.4 + Math.sin(tick * 0.05) * 8).toFixed(4),
    satLon: (88.1 + tick * 0.3 % 360 - 180 > 180 ? (88.1 + tick * 0.3 % 360 - 360) : 88.1 + tick * 0.3 % 60).toFixed(4),
  };
}

// ─── Static data ──────────────────────────────────────────────────────────────
const CLOUD_REGIONS = [
  { region: "Northeast India", cover: 72, trend: "+4%" },
  { region: "South India",     cover: 34, trend: "-2%" },
  { region: "North India",     cover: 18, trend: "-1%" },
  { region: "Central India",   cover: 45, trend: "+1%" },
  { region: "West India",      cover: 29, trend: "0%"  },
  { region: "East India",      cover: 61, trend: "+3%" },
];

const SAT_DATA = {
  name: "IRS-P6 (ResourceSat-2A)", sensor: "LISS-IV MX",
  alt: "817 km", inclination: "98.7°", nextPass: "14:32 IST",
  passOver: "Northeast India", orbitNo: 48201,
};

const INITIAL_JOBS: Job[] = [
  { id: "JOB-1041", image: "LISS_003_MX.tif", stage: "Cloud detection",   progress: 78,  elapsed: "1m 12s", status: "running" },
  { id: "JOB-1040", image: "LISS_001.tif",    stage: "Diffusion inpaint", progress: 44,  elapsed: "3m 05s", status: "running" },
  { id: "JOB-1039", image: "LISS_006.tif",    stage: "Queued",            progress: 0,   elapsed: "—",      status: "queued"  },
  { id: "JOB-1038", image: "LISS_002.tif",    stage: "Completed",         progress: 100, elapsed: "4m 50s", status: "done"    },
];

const AOI = { district: "Kamrup", state: "Assam", lat: "26.1433° N", lon: "91.7898° E", cloud: "72%", date: "2026-06-27", area: "1,240 km²" };

const BASE_LOGS: LogEntry[] = [
  { time: "14:05:03", level: "success", msg: "Dataset LISS_001.tif loaded successfully" },
  { time: "14:06:11", level: "info",    msg: "Cloud detection model U-Net v3.2 initialized" },
  { time: "14:06:44", level: "success", msg: "Cloud mask generated — 42% coverage" },
  { time: "14:07:02", level: "info",    msg: "Diffusion inpainting started (LISS_001.tif)" },
  { time: "14:08:30", level: "info",    msg: "SAR fusion initiated — Sentinel-1 aligned" },
  { time: "14:09:15", level: "warn",    msg: "High cloud cover detected in NER region (72%)" },
  { time: "14:10:01", level: "success", msg: "Reconstruction completed — PSNR 32.1 dB" },
];

// ─── Space body definitions ───────────────────────────────────────────────────
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
    description: "Earth's natural satellite — 3,474 km diameter. Used as a calibration reference for LISS-IV radiometric correction.",
    distance: "384,400 km", fact: "Phase: Waxing gibbous",
  },
  mars: {
    label: "Mars", emoji: "🔴",
    color: "#ef4444", bgColor: "#1a0a0a",
    description: "The Red Planet — ISRO's Mangalyaan (Mars Orbiter Mission) successfully reached Martian orbit in 2014.",
    distance: "225,000,000 km", fact: "MOM orbital period: 72.7 hrs",
  },
  sun: {
    label: "Sun", emoji: "☀️",
    color: "#fbbf24", bgColor: "#1a1200",
    description: "Primary energy source for LISS-IV solar panels and the driver of atmospheric conditions affecting cloud formation.",
    distance: "149,600,000 km", fact: "Solar irradiance: 1361 W/m²",
  },
  milky: {
    label: "Milky Way", emoji: "🌌",
    color: "#8b5cf6", bgColor: "#060614",
    description: "Our home galaxy — 100,000 light-years across. ISRO's deep-space observation programs study galactic phenomena.",
    distance: "26,000 light-yrs", fact: "Galaxy type: Barred spiral",
  },
};

// ─── SVG Globes ──────────────────────────────────────────────────────────────

function EarthGlobe({ tick }: { tick: number }) {
  const satAngle = (tick * 3) % 360;
  const satX = 160 + 110 * Math.cos((satAngle * Math.PI) / 180);
  const satY = 160 + 55 * Math.sin((satAngle * Math.PI) / 180);
  const cloudShift = (tick * 0.8) % 30;
  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-[300px] mx-auto drop-shadow-xl" aria-label="Earth globe">
      <defs>
        <radialGradient id="eg" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#2a6496" /><stop offset="55%" stopColor="#1a4a7a" /><stop offset="100%" stopColor="#0d2a4a" />
        </radialGradient>
        <radialGradient id="eg2" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="transparent" /><stop offset="100%" stopColor="rgba(100,160,255,0.18)" />
        </radialGradient>
        <clipPath id="ec"><circle cx="160" cy="160" r="120" /></clipPath>
      </defs>
      <circle cx="160" cy="160" r="130" fill="none" stroke="rgba(100,160,255,0.12)" strokeWidth="18" />
      <circle cx="160" cy="160" r="120" fill="url(#eg)" />
      <g clipPath="url(#ec)" opacity="0.85">
        <path d="M175 130 L195 125 L210 145 L205 175 L188 195 L175 185 L168 160 Z" fill="#2d6a4f" />
        <path d="M195 125 L220 118 L228 135 L215 148 L200 142 Z" fill="#40916c" />
        <ellipse cx="198" cy="200" rx="6" ry="9" fill="#2d6a4f" />
        <path d="M90 110 L115 100 L128 130 L122 175 L105 195 L85 175 L82 145 Z" fill="#2d6a4f" />
        <path d="M142 118 L162 112 L168 130 L155 138 L142 130 Z" fill="#3a7d5a" />
        <path d="M110 75 L138 68 L145 90 L128 98 L108 90 Z" fill="#2d6a4f" />
        <path d="M225 138 L248 130 L255 152 L240 162 L228 155 Z" fill="#2d6a4f" />
        {[-40,-20,0,20,40].map(d=><ellipse key={d} cx="160" cy="160" rx="120" ry={Math.abs(d*2.8)||4} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>)}
        <ellipse cx={80+cloudShift} cy="130" rx="28" ry="10" fill="rgba(255,255,255,0.18)" />
        <ellipse cx={195+cloudShift*0.5} cy="118" rx="22" ry="8" fill="rgba(255,255,255,0.22)" />
        <ellipse cx={120+cloudShift*0.7} cy="155" rx="18" ry="6" fill="rgba(255,255,255,0.14)" />
        <ellipse cx="230" cy="145" rx="14" ry="5" fill="rgba(255,255,255,0.16)" />
      </g>
      <circle cx="160" cy="160" r="120" fill="url(#eg2)" />
      <ellipse cx="160" cy="160" rx="148" ry="74" fill="none" stroke="rgba(100,200,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
      <g transform={`translate(${satX},${satY})`}>
        <rect x="-6" y="-3" width="12" height="6" rx="1.5" fill="#e2e8f0" stroke="rgba(100,200,255,0.8)" strokeWidth="0.8" />
        <rect x="-14" y="-1.5" width="8" height="3" rx="0.5" fill="#60a5fa" opacity="0.9" />
        <rect x="6" y="-1.5" width="8" height="3" rx="0.5" fill="#60a5fa" opacity="0.9" />
      </g>
      <g transform="translate(207,128)">
        <circle r="5" fill="rgba(239,68,68,0.3)" style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }} />
        <circle r="3" fill="#ef4444" />
        <line x1="0" y1="-3" x2="0" y2="-14" stroke="#ef4444" strokeWidth="1" />
        <circle cx="0" cy="-17" r="3" fill="#ef4444" />
      </g>
      <text x="207" y="102" fill="rgba(255,255,255,0.8)" fontSize="7" textAnchor="middle">Assam AOI</text>
    </svg>
  );
}

function MoonGlobe({ tick }: { tick: number }) {
  const angle = (tick * 1.5) % 360;
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px] mx-auto drop-shadow-xl">
      <defs>
        <radialGradient id="mg" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#d1d5db" /><stop offset="60%" stopColor="#9ca3af" /><stop offset="100%" stopColor="#4b5563" />
        </radialGradient>
        <clipPath id="mc"><circle cx="150" cy="150" r="110" /></clipPath>
      </defs>
      <circle cx="150" cy="150" r="118" fill="none" stroke="rgba(209,213,219,0.08)" strokeWidth="14" />
      <circle cx="150" cy="150" r="110" fill="url(#mg)" />
      <g clipPath="url(#mc)" opacity="0.9">
        <circle cx="110" cy="120" r="18" fill="rgba(75,85,99,0.4)" />
        <circle cx="175" cy="95"  r="12" fill="rgba(75,85,99,0.35)" />
        <circle cx="140" cy="170" r="22" fill="rgba(75,85,99,0.3)" />
        <circle cx="80"  cy="165" r="14" fill="rgba(75,85,99,0.38)" />
        <circle cx="195" cy="155" r="9"  fill="rgba(75,85,99,0.32)" />
        <circle cx="160" cy="125" r="6"  fill="rgba(107,114,128,0.5)" />
        <circle cx="125" cy="90"  r="8"  fill="rgba(107,114,128,0.4)" />
      </g>
      <circle cx="150" cy="150" r="110" fill="rgba(0,0,0,0)" />
    </svg>
  );
}

function MarsGlobe({ tick }: { tick: number }) {
  const shift = (tick * 1.2) % 40;
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px] mx-auto drop-shadow-xl">
      <defs>
        <radialGradient id="mrg" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#dc6b3a" /><stop offset="50%" stopColor="#b84a2a" /><stop offset="100%" stopColor="#7a2a14" />
        </radialGradient>
        <clipPath id="mrc"><circle cx="150" cy="150" r="110" /></clipPath>
      </defs>
      <circle cx="150" cy="150" r="118" fill="none" stroke="rgba(220,107,58,0.1)" strokeWidth="14" />
      <circle cx="150" cy="150" r="110" fill="url(#mrg)" />
      <g clipPath="url(#mrc)" opacity="0.85">
        <path d="M80 130 Q100 115 130 125 Q160 135 185 120 Q210 105 230 118 L230 145 Q205 130 180 145 Q155 160 130 150 Q100 140 80 155Z" fill="rgba(120,60,30,0.5)" />
        <path d="M60 155 Q90 145 115 155 Q140 165 165 152 L165 175 Q140 188 115 178 Q88 168 60 178Z" fill="rgba(140,70,35,0.4)" />
        <ellipse cx="150" cy="82" rx="35" ry="12" fill="rgba(240,240,250,0.25)" />
        <ellipse cx={90+shift} cy="115" rx="20" ry="7" fill="rgba(210,160,100,0.2)" />
        <ellipse cx={180+shift*0.5} cy="165" rx="15" ry="5" fill="rgba(210,160,100,0.15)" />
      </g>
    </svg>
  );
}

function SunGlobe({ tick }: { tick: number }) {
  const flare = Math.sin(tick * 0.5) * 8;
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px] mx-auto drop-shadow-xl">
      <defs>
        <radialGradient id="sg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef9c3" /><stop offset="40%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id="sg2" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="transparent" /><stop offset="100%" stopColor="rgba(251,191,36,0.18)" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r={140+flare*0.3} fill="rgba(251,191,36,0.04)" />
      <circle cx="150" cy="150" r={128+flare*0.5} fill="rgba(251,191,36,0.07)" />
      <circle cx="150" cy="150" r="110" fill="url(#sg)" />
      <circle cx="150" cy="150" r="110" fill="url(#sg2)" />
      {[0,45,90,135,180,225,270,315].map(a=>(
        <ellipse key={a} cx="150" cy="150"
          rx={118+flare} ry={5+flare*0.3}
          fill="rgba(253,224,71,0.12)"
          transform={`rotate(${a} 150 150)`}
        />
      ))}
      <circle cx="108" cy="138" r="12" fill="rgba(180,83,9,0.35)" />
      <circle cx="170" cy="162" r="8"  fill="rgba(180,83,9,0.28)" />
      <circle cx="150" cy="118" r="6"  fill="rgba(180,83,9,0.32)" />
    </svg>
  );
}

function MilkyWayGlobe({ tick }: { tick: number }) {
  const rotate = tick * 0.5;
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px] mx-auto drop-shadow-xl">
      <defs>
        <radialGradient id="mwg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0c0a1a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="300" fill="#060614" />
      {Array.from({length:80}).map((_,i)=>(
        <circle key={i} cx={30+Math.sin(i*2.3)*130+150} cy={30+Math.cos(i*1.7)*100+120}
          r={Math.random()*1.5+0.4} fill="white" opacity={0.3+Math.sin(i+tick*0.1)*0.3} />
      ))}
      <g transform={`rotate(${rotate} 150 150)`}>
        <ellipse cx="150" cy="150" rx="110" ry="35" fill="rgba(167,139,250,0.12)" />
        <ellipse cx="150" cy="150" rx="90"  ry="26" fill="rgba(167,139,250,0.16)" />
        <ellipse cx="150" cy="150" rx="65"  ry="18" fill="rgba(196,181,253,0.22)" />
        <ellipse cx="150" cy="150" rx="40"  ry="11" fill="rgba(221,214,254,0.35)" />
        <ellipse cx="150" cy="150" rx="18"  ry="5"  fill="rgba(237,233,254,0.6)"  />
        <ellipse cx="150" cy="150" rx="7"   ry="3"  fill="rgba(255,255,255,0.85)" />
      </g>
      <circle cx="150" cy="150" r="140" fill="url(#mwg)" opacity="0.08" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function GaugeRing({ pct, color, size = 48 }: { pct: number; color: string; size?: number }) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/40" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" className="transition-all duration-700" />
    </svg>
  );
}

function MetricCard({ label, value, pct, unit, color, icon: Icon }: {
  label: string; value: number | string; pct?: number; unit?: string; color: string; icon: React.ElementType;
}) {
  const displayPct = typeof pct !== "undefined" ? pct : typeof value === "number" ? value : 0;
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <GaugeRing pct={displayPct} color={color} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-base font-bold tabular-nums text-foreground leading-tight">{value}{unit}</p>
        {typeof pct !== "undefined" && (
          <div className="mt-1 h-1 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
          </div>
        )}
      </div>
    </div>
  );
}

function PulsingDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: color }} />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }} />
    </span>
  );
}

function CloudHeatBar({ cover }: { cover: number }) {
  const color = cover >= 60 ? "oklch(0.55 0.20 25)" : cover >= 35 ? "oklch(0.62 0.17 85)" : "oklch(0.52 0.17 150)";
  return (
    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${cover}%`, background: color }} />
    </div>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 120; const h = 28;
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={h - (data[data.length - 1] / max) * h} r="2.5" fill={color} />
    </svg>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MonitoringPage() {
  const m = useRealtimeMetrics();
  const [logs, setLogs] = useState<LogEntry[]>(BASE_LOGS);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [gpuHistory, setGpuHistory] = useState<number[]>([60, 65, 72, 70, 74, 68, 76, 74]);
  const [cpuHistory, setCpuHistory] = useState<number[]>([40, 48, 52, 45, 55, 50, 54, 52]);
  const [activeBody, setActiveBody] = useState<SpaceBody>("earth");
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messages: [LogEntry["level"], string][] = [
      ["info",    "SAR alignment check initiated"],
      ["success", "Sentinel-1 registered to LISS-IV frame"],
      ["info",    "Diffusion model batch step 450/512"],
      ["warn",    "GPU temperature: 78°C — thermal throttle risk"],
      ["success", "Cloud mask exported — LISS_003_MX.tif"],
      ["info",    "Queue job JOB-1042 added"],
    ];
    let i = 0;
    const id = setInterval(() => {
      if (i < messages.length) {
        const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setLogs((p) => [...p.slice(-18), { time: now, level: messages[i][0], msg: messages[i][1] }]);
        i++;
      }
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  useEffect(() => {
    setGpuHistory((p) => [...p.slice(-15), m.gpu]);
    setCpuHistory((p) => [...p.slice(-15), m.cpu]);
    setJobs((prev) => prev.map((j) =>
      j.status === "running" ? { ...j, progress: Math.min(100, j.progress + Math.floor(Math.random() * 3)) } : j
    ));
  }, [m.tick]);

  const coverageSummary = Math.round(CLOUD_REGIONS.reduce((a, r) => a + r.cover, 0) / CLOUD_REGIONS.length);
  const body = SPACE_BODIES[activeBody];

  const bodyButtons: { id: SpaceBody; emoji: string; label: string }[] = [
    { id: "earth", emoji: "🌍", label: "Earth"     },
    { id: "moon",  emoji: "🌕", label: "Moon"      },
    { id: "mars",  emoji: "🔴", label: "Mars"      },
    { id: "sun",   emoji: "☀️", label: "Sun"       },
    { id: "milky", emoji: "🌌", label: "Milky Way" },
  ];

  return (
    <Shell title="Real-time Monitoring" subtitle="Live pipeline · satellite telemetry · system health">
      <div className="flex flex-col gap-5">

        {/* ── 3-column top bar ── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto_1fr]">

          {/* Satellite status */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PulsingDot color="oklch(0.52 0.17 150)" />
                <p className="text-xs font-semibold text-foreground">Live satellite status</p>
              </div>
              <span className="rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-[9px] font-bold text-primary tracking-wider">LIVE</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <Satellite className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{SAT_DATA.name}</p>
                <p className="text-[10px] text-muted-foreground">{SAT_DATA.sensor}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {[
                { k: "Latitude",    v: `${m.satLat}° N` },
                { k: "Longitude",   v: `${m.satLon}° E` },
                { k: "Altitude",    v: SAT_DATA.alt         },
                { k: "Inclination", v: SAT_DATA.inclination },
                { k: "Next pass",   v: SAT_DATA.nextPass    },
                { k: "Pass over",   v: SAT_DATA.passOver    },
              ].map(({ k, v }) => (
                <div key={k} className="rounded-lg bg-muted/30 px-2 py-1.5">
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wide">{k}</p>
                  <p className="text-[10px] font-semibold text-foreground font-mono">{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-muted/20 border border-border/40 px-3 py-1.5 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Orbit #</span>
              <span className="text-[10px] font-mono font-bold text-primary">{SAT_DATA.orbitNo + m.tick}</span>
            </div>
          </div>

          {/* Globe */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col items-center justify-center gap-2 min-w-[260px]">
            <div className="flex items-center gap-2 self-start w-full mb-1">
              <PulsingDot color="oklch(0.50 0.16 195)" />
              <p className="text-xs font-semibold text-foreground">Earth observation</p>
            </div>
            <EarthGlobe tick={m.tick} />
            <div className="flex gap-3 text-[10px] text-muted-foreground mt-1 flex-wrap justify-center">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500 inline-block" /> AOI (Assam)</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-300 inline-block" /> LISS-IV orbit</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-white/40 inline-block" /> Cloud cover</span>
            </div>
          </div>

          {/* Cloud coverage */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PulsingDot color="oklch(0.62 0.17 85)" />
                <p className="text-xs font-semibold text-foreground">Cloud coverage monitor</p>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground">{coverageSummary}% avg</span>
            </div>
            <div className="flex flex-col gap-2">
              {CLOUD_REGIONS.map(({ region, cover, trend }) => {
                const color = cover >= 60 ? "oklch(0.55 0.20 25)" : cover >= 35 ? "oklch(0.62 0.17 85)" : "oklch(0.52 0.17 150)";
                return (
                  <div key={region}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-foreground">{region}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground">{trend}</span>
                        <span className="text-[10px] font-bold tabular-nums" style={{ color }}>{cover}%</span>
                      </div>
                    </div>
                    <CloudHeatBar cover={cover} />
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex gap-2 text-[9px] text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-green-500 inline-block" /> Low (&lt;35%)</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-yellow-500 inline-block" /> Medium</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-500 inline-block" /> High (&gt;60%)</span>
            </div>
          </div>
        </div>

        {/* ── Space Visualization ── */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-400" />
              <p className="text-xs font-semibold text-foreground">Space visualization</p>
              <span className="rounded-md border border-purple-400/25 bg-purple-400/10 px-2 py-0.5 text-[9px] font-semibold text-purple-400">
                ISRO Context
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground hidden sm:block">Select a celestial body to explore</p>
          </div>

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[auto_1fr]">
            {/* Body selector — vertical tabs */}
            <div className="flex flex-row lg:flex-col gap-1 p-3 border-b lg:border-b-0 lg:border-r border-border/50 bg-muted/20 flex-wrap">
              {bodyButtons.map(({ id, emoji, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveBody(id)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all text-left min-w-[100px] lg:min-w-0 lg:w-full ${
                    activeBody === id
                      ? "border text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                  style={activeBody === id ? {
                    background: `color-mix(in oklch, ${SPACE_BODIES[id].color} 10%, transparent)`,
                    borderColor: `color-mix(in oklch, ${SPACE_BODIES[id].color} 30%, transparent)`,
                    color: SPACE_BODIES[id].color,
                  } : {}}
                >
                  <span className="text-base leading-none">{emoji}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Visualization area */}
            <div
              className="p-5 flex flex-col gap-4"
              style={{ background: body.bgColor }}
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_280px]">
                {/* Globe */}
                <div className="flex items-center justify-center py-4">
                  {activeBody === "earth"  && <EarthGlobe tick={m.tick} />}
                  {activeBody === "moon"   && <MoonGlobe tick={m.tick} />}
                  {activeBody === "mars"   && <MarsGlobe tick={m.tick} />}
                  {activeBody === "sun"    && <SunGlobe tick={m.tick} />}
                  {activeBody === "milky"  && <MilkyWayGlobe tick={m.tick} />}
                </div>

                {/* Info panel */}
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{body.emoji}</span>
                      <span className="text-lg font-bold" style={{ color: body.color }}>{body.label}</span>
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

                  {/* ISRO connection */}
                  {activeBody === "earth" && (
                    <div className="rounded-lg border border-blue-500/20 bg-blue-500/8 p-3">
                      <p className="text-[9px] font-semibold text-blue-400 uppercase tracking-wider mb-1.5">Live LISS-IV telemetry</p>
                      <div className="flex flex-col gap-1">
                        {[
                          { k: "Lat",       v: `${m.satLat}° N` },
                          { k: "Lon",       v: `${m.satLon}° E` },
                          { k: "Altitude",  v: "817 km" },
                          { k: "Next pass", v: "14:32 IST" },
                        ].map(({ k, v }) => (
                          <div key={k} className="flex justify-between">
                            <span className="text-[10px] text-gray-500">{k}</span>
                            <span className="text-[10px] font-mono font-bold text-blue-300">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeBody === "mars" && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/8 p-3">
                      <p className="text-[9px] font-semibold text-red-400 uppercase tracking-wider mb-1">ISRO MOM mission</p>
                      <p className="text-[10px] text-gray-400">Mars Orbiter Mission (Mangalyaan) — launched Nov 2013, Mars orbit insertion Sep 2014. India became the first Asian nation to reach Mars orbit.</p>
                    </div>
                  )}

                  {activeBody === "moon" && (
                    <div className="rounded-lg border border-gray-500/20 bg-gray-500/8 p-3">
                      <p className="text-[9px] font-semibold text-gray-300 uppercase tracking-wider mb-1">Chandrayaan-3</p>
                      <p className="text-[10px] text-gray-400">ISRO's Chandrayaan-3 achieved a historic soft landing near the lunar south pole on 23 August 2023.</p>
                    </div>
                  )}

                  {activeBody === "sun" && (
                    <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/8 p-3">
                      <p className="text-[9px] font-semibold text-yellow-400 uppercase tracking-wider mb-1">Aditya-L1</p>
                      <p className="text-[10px] text-gray-400">ISRO's Aditya-L1 solar observatory was launched in Sep 2023 to study solar wind and coronal dynamics from the L1 Lagrange point.</p>
                    </div>
                  )}

                  {activeBody === "milky" && (
                    <div className="rounded-lg border border-purple-500/20 bg-purple-500/8 p-3">
                      <p className="text-[9px] font-semibold text-purple-400 uppercase tracking-wider mb-1">AstroSat</p>
                      <p className="text-[10px] text-gray-400">ISRO's AstroSat (2015) is India's first dedicated multi-wavelength space observatory, studying X-ray binaries and active galactic nuclei.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── System health ── */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PulsingDot color="oklch(0.52 0.17 265)" />
              <p className="text-xs font-semibold text-foreground">System health</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <RefreshCw className="h-3 w-3" /> Live · 2s refresh
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            <MetricCard label="GPU usage"  value={m.gpu}          unit="%"     color="oklch(0.50 0.16 195)" icon={Zap}         />
            <MetricCard label="CPU usage"  value={m.cpu}          unit="%"     color="oklch(0.52 0.17 265)" icon={Cpu}         />
            <MetricCard label="RAM"        value={m.ram}          unit="%"     color="oklch(0.52 0.17 150)" icon={MemoryStick} />
            <MetricCard label="Storage"    value={m.storage}      pct={25}     unit=" TB" color="oklch(0.62 0.17 85)"  icon={HardDrive}  />
            <MetricCard label="GPU temp"   value={m.temp}         unit="°C"    pct={m.temp} color={m.temp > 75 ? "oklch(0.55 0.20 25)" : "oklch(0.52 0.17 150)"} icon={Thermometer} />
            <MetricCard label="Net in"     value={m.netIn}        unit=" MB/s" pct={40}  color="oklch(0.52 0.17 265)" icon={Wifi}       />
            <MetricCard label="Net out"    value={m.netOut}       unit=" MB/s" pct={20}  color="oklch(0.50 0.16 195)" icon={Activity}   />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/30 px-3 py-2 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">GPU history (30s)</p>
                <p className="text-xs font-bold text-foreground">{m.gpu}%</p>
              </div>
              <Sparkline data={gpuHistory} color="oklch(0.50 0.16 195)" />
            </div>
            <div className="rounded-lg bg-muted/30 px-3 py-2 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground mb-0.5">CPU history (30s)</p>
                <p className="text-xs font-bold text-foreground">{m.cpu}%</p>
              </div>
              <Sparkline data={cpuHistory} color="oklch(0.52 0.17 265)" />
            </div>
          </div>
        </div>

        {/* ── Active jobs + AOI ── */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_240px]">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PulsingDot color="oklch(0.50 0.16 195)" />
                <p className="text-xs font-semibold text-foreground">Active processing jobs</p>
              </div>
              <div className="flex gap-2 text-[10px]">
                <span className="rounded-md bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 font-semibold">{m.running} running</span>
                <span className="rounded-md bg-muted border border-border text-muted-foreground px-2 py-0.5">{m.queue} queued</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/60">
                    {["Job ID", "Image", "Stage", "Progress", "Elapsed", "Status"].map((h) => (
                      <th key={h} className="pb-2 pr-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j) => (
                    <tr key={j.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="py-2.5 pr-3 font-mono font-semibold text-primary text-[10px]">{j.id}</td>
                      <td className="py-2.5 pr-3 font-mono text-[10px] text-foreground">{j.image}</td>
                      <td className="py-2.5 pr-3 text-muted-foreground text-[11px]">{j.stage}</td>
                      <td className="py-2.5 pr-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{
                              width: `${j.progress}%`,
                              background: j.status === "done" ? "oklch(0.52 0.17 150)" : j.status === "queued" ? "oklch(0.5 0.0 0)" : "oklch(0.50 0.16 195)",
                            }} />
                          </div>
                          <span className="text-[10px] tabular-nums text-muted-foreground">{j.progress}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 pr-3 text-[10px] font-mono text-muted-foreground">
                        <div className="flex items-center gap-1"><Clock className="h-3 w-3" />{j.elapsed}</div>
                      </td>
                      <td className="py-2.5">
                        <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[9px] font-semibold ${
                          j.status === "running" ? "bg-primary/10 text-primary border-primary/25"
                          : j.status === "done"  ? "bg-success/10 text-success border-success/25"
                          : "bg-muted text-muted-foreground border-border"
                        }`}>
                          {j.status === "running" && <Loader2 className="h-2.5 w-2.5 animate-spin" />}
                          {j.status === "done"    && <CheckCircle2 className="h-2.5 w-2.5" />}
                          {j.status === "queued"  && <Clock className="h-2.5 w-2.5" />}
                          {j.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-red-500" />
              <p className="text-xs font-semibold text-foreground">Area of interest</p>
            </div>
            <div className="w-full aspect-video rounded-lg border border-border/50 bg-muted/40 mb-3 overflow-hidden">
              <svg viewBox="0 0 200 112" className="w-full h-full opacity-70">
                <rect width="200" height="112" fill="#1a2a1a" />
                <path d="M40 56 Q60 40 80 52 Q100 64 120 50 Q140 36 160 48 L160 80 Q140 70 120 80 Q100 90 80 78 Q60 66 40 80Z" fill="oklch(0.38 0.12 150)" />
                <path d="M80 48 Q90 42 100 46 Q110 50 118 46 L120 56 Q110 60 100 56 Q90 52 80 56Z" fill="oklch(0.44 0.13 150)" />
                <circle cx="104" cy="50" r="4" fill="rgba(239,68,68,0.4)" />
                <circle cx="104" cy="50" r="2.5" fill="#ef4444" />
                <text x="110" y="46" fill="rgba(255,255,255,0.7)" fontSize="6">Kamrup</text>
              </svg>
            </div>
            <div className="flex flex-col divide-y divide-border/30">
              {[
                { k: "District",    v: AOI.district },
                { k: "State",       v: AOI.state    },
                { k: "Latitude",    v: AOI.lat      },
                { k: "Longitude",   v: AOI.lon      },
                { k: "Cloud cover", v: AOI.cloud    },
                { k: "Image date",  v: AOI.date     },
                { k: "Area",        v: AOI.area     },
              ].map(({ k, v }) => (
                <div key={k} className="flex items-center justify-between py-1.5">
                  <span className="text-[10px] text-muted-foreground">{k}</span>
                  <span className="text-[10px] font-semibold text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Processing logs ── */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PulsingDot color="oklch(0.52 0.17 150)" />
              <p className="text-xs font-semibold text-foreground">Processing logs</p>
            </div>
            <span className="text-[10px] text-muted-foreground">{logs.length} entries · auto-scrolling</span>
          </div>
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto font-mono text-[11px] pr-1" style={{ scrollbarWidth: "thin" }}>
            {logs.map((l, i) => (
              <div key={i} className={`flex items-start gap-2.5 rounded-md px-3 py-1.5 ${
                l.level === "success" ? "bg-success/8" : l.level === "warn" ? "bg-warning/8" : "bg-muted/30"
              }`}>
                {l.level === "success" && <CheckCircle2 className="h-3 w-3 flex-shrink-0 mt-0.5 text-success" />}
                {l.level === "warn"    && <Activity     className="h-3 w-3 flex-shrink-0 mt-0.5 text-warning" />}
                {l.level === "info"    && <Database     className="h-3 w-3 flex-shrink-0 mt-0.5 text-primary/60" />}
                <span className="text-muted-foreground flex-shrink-0">{l.time}</span>
                <span className={l.level === "success" ? "text-success" : l.level === "warn" ? "text-warning" : "text-foreground"}>
                  {l.msg}
                </span>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

      </div>
    </Shell>
  );
}