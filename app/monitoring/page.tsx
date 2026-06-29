"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Shell } from "@/components/layout/shell";
import {
  Satellite, Cloud, Cpu, HardDrive, MemoryStick, Activity,
  MapPin, CheckCircle2, Loader2, Clock, Zap, RefreshCw,
  Thermometer, Wifi, Database, Globe, Star,
} from "lucide-react";

import type { SpaceBodyKey } from "@/components/monitoring/monitoring-scene";

const MonitoringScene = dynamic(
  () => import("@/components/monitoring/monitoring-scene").then((m) => ({ default: m.MonitoringScene })),
  { ssr: false, loading: () => <div className="w-full rounded-xl bg-muted/20 animate-pulse" style={{ minHeight: 300 }} /> }
);

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
  const satRad = (satAngle * Math.PI) / 180;
  const satX = 160 + 118 * Math.cos(satRad);
  const satY = 160 + 48 * Math.sin(satRad);
  const cloudShift = (tick * 0.6) % 60;
  const cloudShift2 = (tick * 0.4) % 50;
  const nightSide = satAngle > 90 && satAngle < 270;

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-[300px] mx-auto drop-shadow-2xl" aria-label="Earth globe">
      <defs>
        <radialGradient id="eg-ocean" cx="38%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#1e6fa8" />
          <stop offset="30%"  stopColor="#165a8a" />
          <stop offset="60%"  stopColor="#0f3d64" />
          <stop offset="100%" stopColor="#081f35" />
        </radialGradient>
        <radialGradient id="eg-atm" cx="50%" cy="50%" r="50%">
          <stop offset="72%"  stopColor="transparent" />
          <stop offset="88%"  stopColor="rgba(80,160,255,0.10)" />
          <stop offset="100%" stopColor="rgba(60,140,255,0.28)" />
        </radialGradient>
        <radialGradient id="eg-night" cx="72%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="rgba(0,0,30,0.65)" />
          <stop offset="55%"  stopColor="rgba(0,0,15,0.30)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="eg-spec" cx="32%" cy="26%" r="38%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="eg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="78%"  stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(80,160,255,0.22)" />
        </radialGradient>
        <clipPath id="ec"><circle cx="160" cy="160" r="120" /></clipPath>
        <filter id="eg-blur"><feGaussianBlur stdDeviation="2" /></filter>
        <filter id="eg-glow-filter">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* Outer atmosphere glow rings */}
      <circle cx="160" cy="160" r="138" fill="rgba(60,140,255,0.05)" />
      <circle cx="160" cy="160" r="132" fill="rgba(60,140,255,0.07)" />
      <circle cx="160" cy="160" r="126" fill="rgba(60,140,255,0.04)" />

      {/* Main sphere */}
      <circle cx="160" cy="160" r="120" fill="url(#eg-ocean)" />

      <g clipPath="url(#ec)" opacity="0.92">
        {/* India subcontinent */}
        <path d="M195 128 L218 122 L228 138 L224 160 L215 182 L205 196 L196 200 L190 192 L185 175 L188 155 L190 140Z"
          fill="#2d6a4f" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5"/>
        {/* Sri Lanka */}
        <ellipse cx="208" cy="203" rx="4.5" ry="7" fill="#2d6a4f" opacity="0.9"/>
        {/* Andaman islands */}
        <ellipse cx="230" cy="188" rx="2" ry="8" fill="#2d6a4f" opacity="0.7" transform="rotate(-15 230 188)"/>
        {/* Southeast Asia */}
        <path d="M225 118 L248 110 L258 128 L250 145 L240 150 L228 140Z"
          fill="#40916c" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
        {/* Malay Peninsula */}
        <path d="M242 148 L248 155 L244 175 L238 180 L236 165 L238 152Z"
          fill="#2d6a4f" opacity="0.8"/>
        {/* Central Asia */}
        <path d="M95 70 L140 62 L178 68 L195 82 L190 100 L175 108 L155 104 L132 108 L112 102 L92 95 L88 80Z"
          fill="#3a7d5a" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
        {/* West India + Pakistan */}
        <path d="M160 110 L185 105 L198 120 L195 128 L190 135 L175 130 L162 125Z"
          fill="#40916c" opacity="0.9"/>
        {/* Bangladesh / Myanmar */}
        <path d="M215 138 L228 132 L232 148 L224 155 L215 152 L210 145Z"
          fill="#2d6a4f" opacity="0.85"/>
        {/* Himalayan snow caps */}
        <path d="M155 105 L195 98 L198 106 L158 113Z"
          fill="rgba(255,255,255,0.20)" opacity="0.8"/>
        {/* Ocean latitude bands */}
        {[-50,-30,-10,10,30,50].map(d => (
          <ellipse key={d} cx="160" cy={160+d} rx="120" ry={Math.max(4, 120-Math.abs(d)*1.8)}
            fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.7"/>
        ))}
        {/* Animated cloud layer 1 */}
        <ellipse cx={72 + cloudShift} cy="128" rx="32" ry="11" fill="rgba(255,255,255,0.20)" filter="url(#eg-blur)"/>
        <ellipse cx={80 + cloudShift} cy="123" rx="22" ry="7"  fill="rgba(255,255,255,0.28)"/>
        <ellipse cx={62 + cloudShift} cy="132" rx="14" ry="5"  fill="rgba(255,255,255,0.16)"/>
        {/* Cloud layer 2 */}
        <ellipse cx={185 + cloudShift2 * 0.6} cy="112" rx="24" ry="8"  fill="rgba(255,255,255,0.22)" filter="url(#eg-blur)"/>
        <ellipse cx={195 + cloudShift2 * 0.6} cy="108" rx="16" ry="5"  fill="rgba(255,255,255,0.30)"/>
        {/* Cloud layer 3 — NE India high coverage */}
        <ellipse cx={208 + cloudShift * 0.3} cy="148" rx="30" ry="10" fill="rgba(255,255,255,0.26)" filter="url(#eg-blur)"/>
        <ellipse cx={218 + cloudShift * 0.3} cy="143" rx="20" ry="7"  fill="rgba(255,255,255,0.32)"/>
        <ellipse cx={200 + cloudShift * 0.3} cy="154" rx="15" ry="5"  fill="rgba(255,255,255,0.18)"/>
        {/* North polar ice cap */}
        <ellipse cx="160" cy="52"  rx="58" ry="14" fill="rgba(240,248,255,0.55)" opacity="0.8"/>
        <ellipse cx="160" cy="48"  rx="42" ry="9"  fill="rgba(255,255,255,0.65)"/>
        {/* South polar ice cap */}
        <ellipse cx="160" cy="268" rx="48" ry="11" fill="rgba(240,248,255,0.50)" opacity="0.75"/>
        {/* Night side city lights */}
        {nightSide && (
          <g opacity="0.65">
            <circle cx="185" cy="155" r="1.5" fill="#fffacd"/>
            <circle cx="192" cy="162" r="1"   fill="#fffacd" opacity="0.8"/>
            <circle cx="200" cy="148" r="1.2" fill="#fffacd"/>
            <circle cx="178" cy="168" r="0.8" fill="#ffd700" opacity="0.7"/>
            <circle cx="210" cy="158" r="0.9" fill="#fffacd" opacity="0.6"/>
          </g>
        )}
      </g>

      {/* Atmosphere rim */}
      <circle cx="160" cy="160" r="120" fill="url(#eg-atm)" />
      {/* Night shadow */}
      <circle cx="160" cy="160" r="120" fill="url(#eg-night)" />
      {/* Specular highlight */}
      <circle cx="160" cy="160" r="120" fill="url(#eg-spec)" />
      {/* Outer glow */}
      <circle cx="160" cy="160" r="124" fill="url(#eg-glow)" />

      {/* Orbit trail */}
      <ellipse cx="160" cy="150" rx="148" ry="56"
        fill="none" stroke="rgba(100,200,255,0.18)" strokeWidth="0.8" strokeDasharray="5 4"/>

      {/* Satellite */}
      <g transform={`translate(${satX},${satY})`} filter="url(#eg-glow-filter)">
        <rect x="-16" y="-1.5" width="10" height="3" rx="0.8" fill="#60a5fa" opacity="0.95"/>
        <rect x="6"   y="-1.5" width="10" height="3" rx="0.8" fill="#60a5fa" opacity="0.95"/>
        <line x1="-14" y1="0" x2="-7" y2="0" stroke="rgba(0,0,0,0.3)" strokeWidth="0.4"/>
        <line x1="8"   y1="0" x2="15" y2="0" stroke="rgba(0,0,0,0.3)" strokeWidth="0.4"/>
        <rect x="-5" y="-2.5" width="10" height="5" rx="1.5"
          fill="#e2e8f0" stroke="rgba(100,200,255,0.9)" strokeWidth="0.8"/>
        <line x1="0" y1="-2.5" x2="0" y2="-6" stroke="#94a3b8" strokeWidth="0.6"/>
        <circle cx="0" cy="-6.5" r="0.8" fill="#60a5fa"/>
        <ellipse cx="0" cy="3.5" rx="1.5" ry="2.5" fill="rgba(147,197,253,0.4)"/>
      </g>

      {/* AOI marker — Assam */}
      <g transform="translate(209,135)">
        <circle r="7" fill="rgba(239,68,68,0.15)" style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }}/>
        <circle r="4" fill="rgba(239,68,68,0.25)"/>
        <circle r="2.5" fill="#ef4444"/>
        <line x1="0" y1="-2.5" x2="0" y2="-13" stroke="#ef4444" strokeWidth="1.2"/>
        <circle cx="0" cy="-15" r="3" fill="#ef4444"/>
        <circle cx="0" cy="-15" r="1.5" fill="rgba(255,255,255,0.8)"/>
      </g>
      <text x="218" y="115" fill="rgba(255,255,255,0.85)" fontSize="7"
        fontFamily="monospace" textAnchor="middle" fontWeight="600">Assam AOI</text>
    </svg>
  );
}

function MoonGlobe({ tick }: { tick: number }) {
  const terminator = 40 + Math.sin(tick * 0.02) * 20;
  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px] mx-auto drop-shadow-2xl" aria-label="Moon globe">
      <defs>
        <radialGradient id="mg-base" cx="36%" cy="30%" r="68%">
          <stop offset="0%"   stopColor="#e5e7eb" />
          <stop offset="35%"  stopColor="#c4c9d0" />
          <stop offset="65%"  stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#374151" />
        </radialGradient>
        <radialGradient id="mg-shadow" cx={`${100 - terminator}%`} cy="50%" r="55%">
          <stop offset="0%"   stopColor="rgba(0,0,10,0.85)" />
          <stop offset="50%"  stopColor="rgba(0,0,5,0.50)" />
          <stop offset="78%"  stopColor="rgba(0,0,5,0.10)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="mg-spec" cx="30%" cy="25%" r="40%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.20)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="mg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="80%"  stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(200,210,220,0.15)" />
        </radialGradient>
        <clipPath id="mc"><circle cx="150" cy="150" r="110" /></clipPath>
        <filter id="mc-blur"><feGaussianBlur stdDeviation="1.5" /></filter>
        <filter id="mc-blur-sm"><feGaussianBlur stdDeviation="0.7" /></filter>
      </defs>

      <circle cx="150" cy="150" r="124" fill="rgba(200,210,220,0.04)"/>
      <circle cx="150" cy="150" r="118" fill="rgba(200,210,220,0.06)"/>
      <circle cx="150" cy="150" r="110" fill="url(#mg-base)"/>

      <g clipPath="url(#mc)">
        {/* Mare regions */}
        <ellipse cx="155" cy="148" rx="28" ry="22" fill="rgba(55,65,81,0.52)" filter="url(#mc-blur)"/>
        <ellipse cx="155" cy="148" rx="22" ry="17" fill="rgba(55,65,81,0.38)"/>
        <ellipse cx="128" cy="115" rx="20" ry="17" fill="rgba(55,65,81,0.48)" filter="url(#mc-blur)"/>
        <ellipse cx="105" cy="130" rx="25" ry="22" fill="rgba(55,65,81,0.55)" filter="url(#mc-blur)"/>
        <ellipse cx="105" cy="130" rx="18" ry="16" fill="rgba(55,65,81,0.40)"/>
        <ellipse cx="188" cy="122" rx="14" ry="11" fill="rgba(55,65,81,0.50)" filter="url(#mc-blur)"/>
        <ellipse cx="92"  cy="155" rx="22" ry="30" fill="rgba(55,65,81,0.42)" filter="url(#mc-blur)"/>
        <ellipse cx="118" cy="178" rx="18" ry="13" fill="rgba(55,65,81,0.44)" filter="url(#mc-blur)"/>

        {/* Tycho crater with rays */}
        <circle cx="138" cy="185" r="14" fill="rgba(55,65,81,0.45)"/>
        <circle cx="138" cy="185" r="13" fill="rgba(45,55,72,0.50)"/>
        <circle cx="137" cy="184" r="5"  fill="rgba(80,90,105,0.60)"/>
        <circle cx="136" cy="183" r="2"  fill="rgba(120,130,145,0.70)"/>
        <ellipse cx="145" cy="190" rx="13" ry="4" fill="rgba(210,215,220,0.15)" filter="url(#mc-blur)"/>
        {[0,30,60,100,140,200,250,300,340].map(a => {
          const rad = (a * Math.PI) / 180;
          return (
            <line key={a}
              x1={138 + 14 * Math.cos(rad)} y1={185 + 14 * Math.sin(rad)}
              x2={138 + 52 * Math.cos(rad)} y2={185 + 52 * Math.sin(rad)}
              stroke="rgba(200,205,215,0.16)" strokeWidth="1.2" strokeLinecap="round"/>
          );
        })}

        {/* Copernicus */}
        <circle cx="108" cy="152" r="11" fill="rgba(50,60,76,0.50)"/>
        <circle cx="108" cy="152" r="9"  fill="rgba(45,55,70,0.55)"/>
        <circle cx="107" cy="151" r="3.5" fill="rgba(75,85,100,0.65)"/>
        <circle cx="107" cy="151" r="1.5" fill="rgba(160,170,185,0.60)"/>
        <ellipse cx="114" cy="157" rx="10" ry="3" fill="rgba(210,215,220,0.12)" filter="url(#mc-blur)"/>

        {/* Aristarchus — bright ejecta */}
        <circle cx="90"  cy="130" r="8"  fill="rgba(55,65,80,0.45)"/>
        <circle cx="90"  cy="130" r="6.5" fill="rgba(50,58,72,0.55)"/>
        <circle cx="89"  cy="129" r="2.5" fill="rgba(200,210,225,0.75)"/>

        {/* Plato */}
        <ellipse cx="120" cy="102" rx="9" ry="7"  fill="rgba(45,55,72,0.58)"/>
        <ellipse cx="120" cy="102" rx="6" ry="4.5" fill="rgba(40,50,66,0.62)"/>

        {/* Clavius */}
        <circle cx="155" cy="195" r="9"  fill="rgba(50,60,75,0.48)"/>
        <circle cx="155" cy="195" r="7.5" fill="rgba(45,55,68,0.52)"/>
        <circle cx="154" cy="194" r="3"  fill="rgba(80,90,105,0.60)"/>

        {/* Smaller craters */}
        <circle cx="175" cy="160" r="5"   fill="rgba(55,65,82,0.50)"/>
        <circle cx="174" cy="159" r="1.8" fill="rgba(95,105,120,0.55)"/>
        <circle cx="162" cy="118" r="4"   fill="rgba(55,65,82,0.48)"/>
        <circle cx="200" cy="148" r="4.5" fill="rgba(55,65,82,0.45)"/>
        <circle cx="199" cy="147" r="1.5" fill="rgba(90,100,115,0.55)"/>
        <circle cx="82"  cy="170" r="5"   fill="rgba(55,65,82,0.48)"/>
        <circle cx="145" cy="103" r="3.5" fill="rgba(58,68,84,0.50)"/>
        <circle cx="170" cy="200" r="3"   fill="rgba(58,68,84,0.45)"/>
        <circle cx="92"  cy="188" r="3.5" fill="rgba(55,65,80,0.48)"/>
        <circle cx="130" cy="135" r="3"   fill="rgba(60,70,86,0.45)"/>
        <circle cx="178" cy="100" r="4"   fill="rgba(55,65,80,0.46)"/>
        <circle cx="177" cy="99"  r="1.4" fill="rgba(140,150,165,0.58)"/>
        <circle cx="215" cy="165" r="5"   fill="rgba(55,65,82,0.44)"/>
        <circle cx="214" cy="164" r="1.8" fill="rgba(90,100,115,0.52)"/>

        {/* Surface grain texture */}
        {Array.from({ length: 25 }).map((_, i) => (
          <circle key={i}
            cx={60 + (i * 53 % 180)} cy={60 + (i * 79 % 180)}
            r={0.3 + (i % 3) * 0.25}
            fill="rgba(180,185,195,0.12)" opacity="0.5"/>
        ))}
      </g>

      <circle cx="150" cy="150" r="110" fill="url(#mg-shadow)"/>
      <circle cx="150" cy="150" r="110" fill="url(#mg-spec)"/>
      <circle cx="150" cy="150" r="114" fill="url(#mg-glow)"/>

      {/* Chandrayaan-3 landing site */}
      <g transform="translate(162,196)" opacity="0.85">
        <circle r="3.5" fill="rgba(196,181,253,0.20)" style={{ animation: "ping 3s ease-in-out infinite" }}/>
        <circle r="1.8" fill="#c4b5fd"/>
        <line x1="0" y1="-1.8" x2="0" y2="-9" stroke="#c4b5fd" strokeWidth="0.8"/>
        <circle cx="0" cy="-10.5" r="2" fill="#c4b5fd"/>
      </g>
      <text x="168" y="181" fill="rgba(196,181,253,0.80)" fontSize="5.5"
        fontFamily="monospace" textAnchor="middle" fontWeight="600">Ch-3</text>
    </svg>
  );
}

function MarsGlobe({ tick }: { tick: number }) {
  const shift  = (tick * 0.9) % 50;
  const shift2 = (tick * 0.5) % 40;
  const dustOpacity = 0.15 + Math.sin(tick * 0.12) * 0.08;

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px] mx-auto drop-shadow-2xl" aria-label="Mars globe">
      <defs>
        <radialGradient id="mrg-base" cx="36%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#e07a40" />
          <stop offset="30%"  stopColor="#c45e2a" />
          <stop offset="60%"  stopColor="#9a3e18" />
          <stop offset="100%" stopColor="#5a1e08" />
        </radialGradient>
        <radialGradient id="mrg-shadow" cx="75%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="rgba(10,0,0,0.80)" />
          <stop offset="55%"  stopColor="rgba(5,0,0,0.40)" />
          <stop offset="80%"  stopColor="rgba(5,0,0,0.10)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="mrg-spec" cx="32%" cy="26%" r="36%">
          <stop offset="0%"   stopColor="rgba(255,220,180,0.18)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="mrg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="78%"  stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(200,80,30,0.20)" />
        </radialGradient>
        <clipPath id="mrc"><circle cx="150" cy="150" r="110" /></clipPath>
        <filter id="mr-blur"><feGaussianBlur stdDeviation="2" /></filter>
        <filter id="mr-blur-sm"><feGaussianBlur stdDeviation="1" /></filter>
      </defs>

      <circle cx="150" cy="150" r="124" fill="rgba(200,80,30,0.06)"/>
      <circle cx="150" cy="150" r="118" fill="rgba(200,80,30,0.08)"/>
      <circle cx="150" cy="150" r="110" fill="url(#mrg-base)"/>

      <g clipPath="url(#mrc)" opacity="0.95">
        {/* Valles Marineris canyon */}
        <path d="M85 145 Q110 138 140 142 Q168 146 195 140 Q210 138 218 142"
          fill="none" stroke="rgba(30,8,0,0.30)" strokeWidth="5.5" strokeLinecap="round" filter="url(#mr-blur)"/>
        <path d="M85 145 Q110 138 140 142 Q168 146 195 140 Q210 138 218 142"
          fill="none" stroke="rgba(60,20,5,0.70)" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M87 149 Q112 142 142 146 Q170 150 197 144"
          fill="none" stroke="rgba(80,30,8,0.45)" strokeWidth="2" strokeLinecap="round"/>

        {/* Tharsis highland */}
        <ellipse cx="105" cy="145" rx="30" ry="22" fill="rgba(180,90,45,0.35)" filter="url(#mr-blur)"/>

        {/* Olympus Mons */}
        <ellipse cx="88"  cy="130" rx="18" ry="13" fill="rgba(160,75,35,0.45)" filter="url(#mr-blur-sm)"/>
        <ellipse cx="88"  cy="130" rx="11" ry="8"  fill="rgba(140,60,25,0.55)"/>
        <ellipse cx="88"  cy="130" rx="5"  ry="3.5" fill="rgba(120,50,20,0.70)"/>
        <ellipse cx="88"  cy="130" rx="2.5" ry="1.8" fill="rgba(80,25,10,0.85)"/>

        {/* Tharsis Mons chain */}
        <ellipse cx="102" cy="140" rx="8"  ry="6" fill="rgba(150,65,28,0.55)"/>
        <ellipse cx="108" cy="150" rx="8"  ry="6" fill="rgba(148,63,26,0.52)"/>
        <ellipse cx="112" cy="161" rx="8"  ry="6" fill="rgba(145,60,24,0.50)"/>

        {/* Hellas Basin */}
        <ellipse cx="190" cy="188" rx="26" ry="18" fill="rgba(100,35,10,0.55)" filter="url(#mr-blur)"/>
        <ellipse cx="190" cy="188" rx="18" ry="12" fill="rgba(80,25,6,0.60)"/>

        {/* Argyre basin */}
        <ellipse cx="120" cy="190" rx="18" ry="13" fill="rgba(100,38,12,0.50)" filter="url(#mr-blur)"/>

        {/* Terrain albedo variation */}
        <path d="M60 128 Q100 118 148 124 Q190 130 240 120 L240 155 Q195 145 148 150 Q100 155 60 145Z"
          fill="rgba(130,55,20,0.28)"/>
        <path d="M60 155 Q100 148 145 154 Q185 160 240 150 L240 172 Q185 164 145 170 Q100 176 60 168Z"
          fill="rgba(160,70,30,0.20)"/>

        {/* North polar ice cap */}
        <ellipse cx="150" cy="52"  rx="44" ry="12" fill="rgba(240,248,255,0.50)"/>
        <ellipse cx="150" cy="47"  rx="30" ry="7"  fill="rgba(255,255,255,0.65)"/>
        <ellipse cx="150" cy="44"  rx="16" ry="4"  fill="rgba(255,255,255,0.75)"/>
        <path d="M130 52 Q150 42 170 52" fill="none" stroke="rgba(220,235,245,0.40)" strokeWidth="1.5"/>

        {/* South polar ice cap */}
        <ellipse cx="150" cy="248" rx="32" ry="9"  fill="rgba(240,248,255,0.45)"/>
        <ellipse cx="150" cy="252" rx="20" ry="6"  fill="rgba(255,255,255,0.55)"/>

        {/* Animated dust storm */}
        <g opacity={dustOpacity + 0.1}>
          <ellipse cx={165 + shift * 0.4} cy="105" rx="35" ry="10"
            fill="rgba(220,140,60,0.50)" filter="url(#mr-blur)"/>
          <ellipse cx={170 + shift * 0.4} cy="108" rx="20" ry="6"
            fill="rgba(230,150,70,0.45)"/>
        </g>
        <g opacity={dustOpacity}>
          <ellipse cx={90 + shift2 * 0.5} cy="170" rx="28" ry="8"
            fill="rgba(215,130,55,0.45)" filter="url(#mr-blur)"/>
        </g>
      </g>

      <circle cx="150" cy="150" r="110" fill="url(#mrg-shadow)"/>
      <circle cx="150" cy="150" r="110" fill="url(#mrg-spec)"/>
      <circle cx="150" cy="150" r="114" fill="url(#mrg-glow)"/>

      {/* MOM satellite */}
      <g transform="translate(210,105)" opacity="0.80">
        <circle r="4" fill="rgba(239,68,68,0.15)" style={{ animation: "ping 3s ease infinite" }}/>
        <circle r="2.5" fill="#f87171"/>
        <line x1="-2.5" y1="0" x2="-9" y2="0" stroke="#94a3b8" strokeWidth="0.8"/>
        <line x1="2.5"  y1="0" x2="9"  y2="0" stroke="#94a3b8" strokeWidth="0.8"/>
      </g>
      <text x="215" y="97" fill="rgba(248,113,113,0.85)" fontSize="5.5"
        fontFamily="monospace" textAnchor="middle" fontWeight="600">MOM</text>
    </svg>
  );
}

function SunGlobe({ tick }: { tick: number }) {
  const flare   = Math.sin(tick * 0.5) * 8;
  const flare2  = Math.sin(tick * 0.3 + 1.5) * 5;
  const coronaR = Math.sin(tick * 0.2) * 4;
  const rotation = (tick * 0.4) % 360;

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px] mx-auto drop-shadow-2xl" aria-label="Sun globe">
      <defs>
        <radialGradient id="sg-base" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fff9c4" />
          <stop offset="25%"  stopColor="#fde047" />
          <stop offset="55%"  stopColor="#fbbf24" />
          <stop offset="80%"  stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id="sg-limb" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="transparent" />
          <stop offset="72%"  stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(180,80,0,0.35)" />
        </radialGradient>
        <radialGradient id="sg-spec" cx="38%" cy="32%" r="35%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="sg-corona" cx="50%" cy="50%" r="50%">
          <stop offset="60%"  stopColor="transparent" />
          <stop offset="78%"  stopColor="rgba(251,191,36,0.18)" />
          <stop offset="90%"  stopColor="rgba(253,224,71,0.10)" />
          <stop offset="100%" stopColor="rgba(253,224,71,0.04)" />
        </radialGradient>
        <clipPath id="sc"><circle cx="150" cy="150" r="106" /></clipPath>
        <filter id="sg-blur"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="sg-blur-sm"><feGaussianBlur stdDeviation="1.5" /></filter>
      </defs>

      {/* Outer corona rings */}
      <circle cx="150" cy="150" r={152+coronaR} fill="rgba(251,191,36,0.03)"/>
      <circle cx="150" cy="150" r={142+coronaR} fill="rgba(251,191,36,0.05)"/>
      <circle cx="150" cy="150" r={132+coronaR} fill="rgba(251,191,36,0.08)"/>
      <circle cx="150" cy="150" r={122+coronaR} fill="rgba(253,224,71,0.10)"/>

      {/* Animated corona streamers */}
      <g opacity="0.28" transform={`rotate(${rotation} 150 150)`}>
        {[0,22,45,68,90,115,140,165,192,220,248,275,302,330].map(a => {
          const rad = (a * Math.PI) / 180;
          const len = 36 + (a % 3 === 0 ? 20 : a % 2 === 0 ? 12 : 6) + flare * 0.4;
          return (
            <line key={a}
              x1={150 + 107 * Math.cos(rad)} y1={150 + 107 * Math.sin(rad)}
              x2={150 + (107+len) * Math.cos(rad)} y2={150 + (107+len) * Math.sin(rad)}
              stroke="rgba(253,224,71,0.9)" strokeWidth={a % 3 === 0 ? 1.8 : 0.8}
              strokeLinecap="round"/>
          );
        })}
      </g>

      <circle cx="150" cy="150" r="106" fill="url(#sg-base)"/>

      <g clipPath="url(#sc)">
        {/* Granulation / convection texture */}
        <g opacity="0.15" transform={`rotate(${rotation * 0.3} 150 150)`}>
          {Array.from({ length: 22 }).map((_, i) => {
            const px = 55 + (i * 67 % 190);
            const py = 55 + (i * 83 % 190);
            return (
              <circle key={i} cx={px} cy={py}
                r={3 + (i % 4)}
                fill="rgba(255,220,100,0.5)"
                stroke="rgba(180,80,0,0.3)" strokeWidth="0.5"/>
            );
          })}
        </g>

        {/* Sunspot group 1 — umbra / penumbra */}
        <ellipse cx="120" cy="138" rx="12" ry="9"  fill="rgba(155,60,0,0.45)" filter="url(#sg-blur-sm)"/>
        <ellipse cx="120" cy="138" rx="7"  ry="5.5" fill="rgba(100,30,0,0.70)"/>
        <ellipse cx="120" cy="138" rx="3.5" ry="2.5" fill="rgba(50,10,0,0.90)"/>
        <ellipse cx="120" cy="138" rx="15" ry="12" fill="rgba(200,90,0,0.12)" filter="url(#sg-blur)"/>

        {/* Sunspot group 2 */}
        <ellipse cx="175" cy="162" rx="9"  ry="7"  fill="rgba(155,60,0,0.40)" filter="url(#sg-blur-sm)"/>
        <ellipse cx="175" cy="162" rx="5"  ry="4"  fill="rgba(100,30,0,0.65)"/>
        <ellipse cx="175" cy="162" rx="2"  ry="1.8" fill="rgba(50,10,0,0.88)"/>
        <ellipse cx="175" cy="162" rx="12" ry="9"  fill="rgba(200,90,0,0.10)" filter="url(#sg-blur)"/>

        {/* Sunspot group 3 */}
        <ellipse cx="148" cy="118" rx="6"  ry="4.5" fill="rgba(150,55,0,0.42)" filter="url(#sg-blur-sm)"/>
        <ellipse cx="148" cy="118" rx="3"  ry="2.5" fill="rgba(95,28,0,0.70)"/>

        {/* Solar flare arc */}
        <path d={`M106 150 Q${88+flare} ${120-flare*0.8} 112 108`}
          fill="none" stroke="rgba(255,240,120,0.50)" strokeWidth="4.5" strokeLinecap="round" filter="url(#sg-blur)"/>
        <path d={`M106 150 Q${88+flare} ${120-flare*0.8} 112 108`}
          fill="none" stroke="rgba(253,224,71,0.75)" strokeWidth="2.5" strokeLinecap="round" filter="url(#sg-blur-sm)"/>

        {/* Solar prominence arc */}
        <path d={`M158 106 Q${172+flare2} ${78-flare2} 188 110`}
          fill="none" stroke="rgba(253,224,71,0.40)" strokeWidth="4" strokeLinecap="round" filter="url(#sg-blur)"/>
        <path d={`M158 106 Q${172+flare2} ${78-flare2} 188 110`}
          fill="none" stroke="rgba(251,191,36,0.70)" strokeWidth="2" strokeLinecap="round" filter="url(#sg-blur-sm)"/>

        {/* Plasma loops */}
        <path d="M130 192 Q118 210 145 208 Q165 206 158 192"
          fill="none" stroke="rgba(251,191,36,0.55)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M168 195 Q175 215 195 205"
          fill="none" stroke="rgba(253,224,71,0.50)" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Chromosphere hot spots */}
        <circle cx="95"  cy="155" r="3.5" fill="rgba(255,240,100,0.40)" filter="url(#sg-blur-sm)"/>
        <circle cx="205" cy="140" r="3"   fill="rgba(255,240,100,0.35)" filter="url(#sg-blur-sm)"/>
        <circle cx="150" cy="200" r="4"   fill="rgba(255,235,90,0.38)"  filter="url(#sg-blur-sm)"/>
      </g>

      {/* Limb darkening + specular + corona */}
      <circle cx="150" cy="150" r="106" fill="url(#sg-limb)"/>
      <circle cx="150" cy="150" r="106" fill="url(#sg-spec)"/>
      <circle cx="150" cy="150" r="106" fill="url(#sg-corona)"/>
    </svg>
  );
}

function MilkyWayGlobe({ tick }: { tick: number }) {
  const rotate  = tick * 0.4;
  const twinkle = tick * 0.15;

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[260px] mx-auto drop-shadow-2xl" aria-label="Milky Way galaxy">
      <defs>
        <radialGradient id="mwg-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#fffde7" stopOpacity="1.0" />
          <stop offset="12%"  stopColor="#fef9c3" stopOpacity="0.95" />
          <stop offset="30%"  stopColor="#e9d5ff" stopOpacity="0.70" />
          <stop offset="55%"  stopColor="#7c3aed" stopOpacity="0.35" />
          <stop offset="80%"  stopColor="#3b0764" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#060614" stopOpacity="0" />
        </radialGradient>
        <filter id="mw-glow">
          <feGaussianBlur stdDeviation="3.5" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        <filter id="mw-glow-sm">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        <filter id="mw-star-glow">
          <feGaussianBlur stdDeviation="0.8"/>
        </filter>
      </defs>

      {/* Deep space background */}
      <rect width="300" height="300" fill="#020208" rx="150" ry="150"/>

      {/* Background nebulae */}
      <ellipse cx="60"  cy="80"  rx="55" ry="35" fill="rgba(59,7,100,0.08)"  filter="url(#mw-glow)"/>
      <ellipse cx="240" cy="220" rx="50" ry="30" fill="rgba(30,27,75,0.10)"  filter="url(#mw-glow)"/>
      <ellipse cx="220" cy="70"  rx="40" ry="25" fill="rgba(49,46,129,0.07)" filter="url(#mw-glow)"/>
      <ellipse cx="80"  cy="230" rx="45" ry="28" fill="rgba(76,29,149,0.06)" filter="url(#mw-glow)"/>

      {/* Background stars */}
      {Array.from({ length: 120 }).map((_, i) => {
        const x  = 15 + (i * 131 % 270);
        const y  = 15 + (i * 97  % 270);
        const r  = 0.3 + (i % 5) * 0.15;
        const op = 0.12 + Math.sin(i * 2.1 + twinkle) * 0.10;
        return <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={op}/>;
      })}

      {/* Rotating spiral arms */}
      <g transform={`rotate(${rotate} 150 150)`}>
        {/* Halo */}
        <ellipse cx="150" cy="150" rx="128" ry="40" fill="rgba(100,80,160,0.06)"/>
        <ellipse cx="150" cy="150" rx="115" ry="34" fill="rgba(120,90,180,0.08)"/>
        {/* Outer arms */}
        <ellipse cx="150" cy="150" rx="105" ry="30" fill="rgba(150,120,220,0.10)"/>
        <ellipse cx="150" cy="150" rx="98"  ry="27" fill="rgba(160,130,230,0.12)"/>
        {/* Mid arms */}
        <ellipse cx="150" cy="150" rx="88"  ry="24" fill="rgba(170,140,240,0.14)"/>
        <ellipse cx="150" cy="150" rx="80"  ry="21" fill="rgba(180,150,245,0.16)"/>
        {/* Orion spur */}
        <ellipse cx="150" cy="150" rx="70"  ry="18" fill="rgba(190,160,250,0.18)"/>
        <ellipse cx="150" cy="150" rx="62"  ry="16" fill="rgba(196,168,252,0.22)"/>
        {/* Inner arms */}
        <ellipse cx="150" cy="150" rx="52"  ry="13" fill="rgba(209,180,255,0.28)"/>
        <ellipse cx="150" cy="150" rx="42"  ry="10" fill="rgba(220,190,255,0.36)"/>
        <ellipse cx="150" cy="150" rx="32"  ry="7.5" fill="rgba(230,200,255,0.48)"/>
        <ellipse cx="150" cy="150" rx="22"  ry="5.5" fill="rgba(238,210,255,0.62)"/>
        <ellipse cx="150" cy="150" rx="13"  ry="3.5" fill="rgba(245,220,255,0.78)"/>
        {/* Dark dust lanes */}
        <ellipse cx="150" cy="150" rx="95"  ry="27" fill="none"
          stroke="rgba(2,2,12,0.22)" strokeWidth="2.5"/>
        <ellipse cx="150" cy="150" rx="78"  ry="21" fill="none"
          stroke="rgba(2,2,12,0.18)" strokeWidth="2"/>
        <ellipse cx="150" cy="150" rx="60"  ry="16" fill="none"
          stroke="rgba(2,2,12,0.15)" strokeWidth="1.5"/>
        {/* Star clusters */}
        {[
          [60,150], [240,150], [95,108], [205,192],
          [95,192], [205,108], [72,128], [228,172],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={1.2 + (i%3)*0.4}
            fill="white" opacity={0.30 + Math.sin(i + twinkle) * 0.15}
            filter="url(#mw-star-glow)"/>
        ))}
        {/* Nebula pockets */}
        <ellipse cx="72"  cy="130" rx="8" ry="4" fill="rgba(186,230,253,0.12)" filter="url(#mw-glow-sm)"/>
        <ellipse cx="228" cy="170" rx="7" ry="3" fill="rgba(196,181,253,0.14)" filter="url(#mw-glow-sm)"/>
        <ellipse cx="100" cy="198" rx="6" ry="3" fill="rgba(254,202,202,0.10)" filter="url(#mw-glow-sm)"/>
        <ellipse cx="200" cy="102" rx="6" ry="3" fill="rgba(167,243,208,0.10)" filter="url(#mw-glow-sm)"/>

        {/* Sun position marker */}
        <circle cx="218" cy="150" r="3.5" fill="rgba(251,191,36,0.15)"
          style={{ animation: "ping 4s ease-in-out infinite" }}/>
        <circle cx="218" cy="150" r="2"   fill="#fbbf24" opacity="0.75"/>
      </g>

      {/* Galactic core — fixed center */}
      <ellipse cx="150" cy="150" rx="18" ry="5.5" fill="rgba(255,252,220,0.88)" filter="url(#mw-glow)"/>
      <ellipse cx="150" cy="150" rx="11" ry="3.5" fill="rgba(255,255,240,0.96)" filter="url(#mw-glow)"/>
      <ellipse cx="150" cy="150" rx="6"  ry="2.2" fill="rgba(255,255,255,1.0)"/>
      <ellipse cx="150" cy="150" rx="3"  ry="1.4" fill="rgba(255,255,255,1.0)" filter="url(#mw-glow-sm)"/>
      <circle  cx="150" cy="150" r="1.2" fill="rgba(10,5,30,0.95)"/>

      {/* Bright foreground stars */}
      {[
        [42,  45,  1.4, 0.9],
        [255, 52,  1.2, 0.85],
        [38,  258, 1.5, 0.92],
        [262, 255, 1.3, 0.88],
        [148, 28,  1.0, 0.80],
        [152, 272, 1.1, 0.82],
        [28,  148, 1.2, 0.85],
        [272, 152, 1.0, 0.80],
      ].map(([x, y, r, op], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={Number(r)*1.8} fill="white" opacity={Number(op)*0.3} filter="url(#mw-star-glow)"/>
          <circle cx={x} cy={y} r={r as number} fill="white" opacity={op as number}/>
        </g>
      ))}

      <text x="150" y="290" fill="rgba(251,191,36,0.55)" fontSize="6"
        fontFamily="monospace" textAnchor="middle">Sol ~26,000 ly from core</text>
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
  label: string; value: number | string; pct?: number; unit?: string; color: string; icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
}) {
  const displayPct = typeof pct !== "undefined" ? pct : typeof value === "number" ? value : 0;
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm flex items-center gap-3">
      <div className="relative shrink-0">
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
    <span className="relative flex h-2 w-2 shrink-0">
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
        // Capture level & msg synchronously before calling setLogs.
        // setLogs updater runs asynchronously — if we closed over `i` directly,
        // `i` could already be incremented by the next tick, causing an OOB access.
        const [level, msg] = messages[i];
        const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setLogs((p) => [...p.slice(-18), { time: now, level, msg }]);
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

          {/* 3D Globe */}
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col min-w-[280px]">
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
              <PulsingDot color="oklch(0.50 0.16 195)" />
              <p className="text-xs font-semibold text-foreground">Earth observation · Live 3D</p>
            </div>
            <div className="flex-1" style={{ minHeight: 280 }}>
              <MonitoringScene body="earth" />
            </div>
            <div className="flex gap-3 text-[10px] text-muted-foreground px-4 pb-3 pt-1 flex-wrap">
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
                {/* 3D Scene */}
                <div className="rounded-xl overflow-hidden relative" style={{ minHeight: 320 }}>
                  <MonitoringScene body={activeBody as SpaceBodyKey} />
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
                {l.level === "success" && <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5 text-success" />}
                {l.level === "warn"    && <Activity     className="h-3 w-3 shrink-0 mt-0.5 text-warning" />}
                {l.level === "info"    && <Database     className="h-3 w-3 shrink-0 mt-0.5 text-primary/60" />}
                <span className="text-muted-foreground shrink-0">{l.time}</span>
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