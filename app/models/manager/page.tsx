"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Shell } from "@/components/layout/shell";
import {
  CheckCircle2, Clock, Zap, Upload,
  Droplets, TrendingUp, TrendingDown, Activity,
  BarChart3, Layers, Map, Leaf, Sprout,
  Flower2, Wheat, AlertTriangle, Database, Download, Play,
  ChevronDown, Info, Filter, X, ZoomIn, ZoomOut,
  RefreshCcw, Crosshair, Globe
} from "lucide-react";

type StressLevel = "healthy" | "moderate" | "severe";
type LayerMode  = "stress" | "ndvi" | "moisture" | "sar";

// ─── Static data ──────────────────────────────────────────────────────────────

const moistureSummary = [
  { label:"Healthy Crop Area", value:"847 ha",     change:"+12%",  trend:"up"      as const, icon:Leaf,          color:"#22c55e" },
  { label:"Moderate Stress",   value:"312 ha",     change:"+5%",   trend:"up"      as const, icon:Activity,      color:"#eab308" },
  { label:"Severe Stress",     value:"89 ha",      change:"-3%",   trend:"down"    as const, icon:AlertTriangle,  color:"#ef4444" },
  { label:"Avg Soil Moisture", value:"0.28 m³/m³", change:"-8%",   trend:"down"    as const, icon:Droplets,      color:"#60a5fa" },
  { label:"Growth Stage",      value:"Flowering",  change:"Day 62",trend:"neutral" as const, icon:Flower2,       color:"#a78bfa" },
  { label:"Processing Time",   value:"1m 42s",     change:"—",     trend:"neutral" as const, icon:Clock,         color:"#94a3b8" },
];

const vegetationIndices = [
  { name:"NDVI",              value:0.72,  min:-1,  max:1,  color:"#22c55e", trend:[0.65,0.68,0.71,0.73,0.74,0.72,0.70,0.72] },
  { name:"NDWI",              value:0.34,  min:-1,  max:1,  color:"#60a5fa", trend:[0.40,0.38,0.36,0.35,0.33,0.34,0.35,0.34] },
  { name:"Soil Moisture Idx", value:0.28,  min:0,   max:1,  color:"#a78bfa", trend:[0.32,0.31,0.30,0.29,0.28,0.27,0.28,0.28] },
  { name:"SAR Backscatter",   value:-12.4, min:-30, max:0,  color:"#fb923c", trend:[-14.2,-13.8,-13.1,-12.9,-12.5,-12.4,-12.6,-12.4] },
  { name:"Temperature",       value:31.2,  min:15,  max:45, color:"#f87171", trend:[28.4,29.1,30.2,30.8,31.5,31.8,31.2,31.2] },
];

const growthStages = [
  { stage:"Germination", day:"Day 1-10",   status:"done"     as const, icon:Sprout  },
  { stage:"Vegetative",  day:"Day 11-35",  status:"done"     as const, icon:Leaf    },
  { stage:"Flowering",   day:"Day 36-65",  status:"active"   as const, icon:Flower2 },
  { stage:"Grain Fill",  day:"Day 66-90",  status:"upcoming" as const, icon:Wheat   },
  { stage:"Harvest",     day:"Day 91-110", status:"upcoming" as const, icon:Clock   },
];

const timeSeriesData = {
  moisture:   [0.32, 0.31, 0.30, 0.29, 0.28, 0.27, 0.28],
  rainfall:   [12, 8, 0, 3, 15, 2, 0],
  vegetation: [0.68, 0.70, 0.71, 0.73, 0.74, 0.72, 0.70],
  days:       ["Jun 22","Jun 23","Jun 24","Jun 25","Jun 26","Jun 27","Jun 28"],
};

const stageColor: Record<string,string> = { done:"#22c55e", active:"#60a5fa", upcoming:"#475569" };

// ─── Moisture Stress Hotspots (global agricultural zones) ────────────────────

interface Hotspot {
  id: string;
  name: string;
  region: string;
  lat: number; lon: number;
  status: StressLevel;
  ndvi: number; ndwi: number; moisture: number; sar: number;
  area: string; crop: string; lastIrrigated: string;
  recommendation: string;
  severity: number; // 0-1 for ring size
}

const HOTSPOTS: Hotspot[] = [
  // ── India ─────────────────────────────────────────────────────────────────
  { id:"h1",  name:"Punjab AOI",          region:"India",     lat:30.7,  lon:76.8,  status:"moderate", ndvi:0.64, ndwi:0.28, moisture:0.21, sar:-13.1, area:"312 ha", crop:"Wheat",     lastIrrigated:"Jun 24", recommendation:"Irrigate within 24 hrs.",            severity:0.55 },
  { id:"h2",  name:"Haryana District",    region:"India",     lat:29.1,  lon:76.1,  status:"moderate", ndvi:0.67, ndwi:0.30, moisture:0.22, sar:-12.9, area:"248 ha", crop:"Rice",      lastIrrigated:"Jun 25", recommendation:"Monitor and irrigate if rain absent.", severity:0.50 },
  { id:"h3",  name:"UP Terai Belt",       region:"India",     lat:26.8,  lon:80.9,  status:"severe",   ndvi:0.41, ndwi:0.10, moisture:0.08, sar:-19.2, area:"520 ha", crop:"Sugarcane", lastIrrigated:"Jun 18", recommendation:"URGENT: Critical stress.",            severity:0.90 },
  { id:"h4",  name:"Rajasthan Basin",     region:"India",     lat:27.0,  lon:74.2,  status:"severe",   ndvi:0.38, ndwi:0.08, moisture:0.06, sar:-20.1, area:"410 ha", crop:"Millet",    lastIrrigated:"Jun 15", recommendation:"URGENT: Severe deficit. Irrigate.",   severity:0.95 },
  { id:"h5",  name:"Maharashtra Vidarbha",region:"India",     lat:20.5,  lon:78.4,  status:"severe",   ndvi:0.43, ndwi:0.12, moisture:0.09, sar:-18.5, area:"380 ha", crop:"Cotton",    lastIrrigated:"Jun 17", recommendation:"URGENT: Irrigate immediately.",        severity:0.88 },
  { id:"h6",  name:"Gujarat Saurashtra",  region:"India",     lat:22.3,  lon:71.2,  status:"moderate", ndvi:0.61, ndwi:0.25, moisture:0.20, sar:-13.8, area:"295 ha", crop:"Cotton",    lastIrrigated:"Jun 23", recommendation:"Increase irrigation by 15%.",         severity:0.52 },
  { id:"h7",  name:"Madhya Pradesh",      region:"India",     lat:23.5,  lon:77.5,  status:"moderate", ndvi:0.66, ndwi:0.29, moisture:0.23, sar:-12.6, area:"340 ha", crop:"Soybean",   lastIrrigated:"Jun 25", recommendation:"Monitor closely.",                    severity:0.48 },
  { id:"h8",  name:"West Bengal Delta",   region:"India",     lat:22.6,  lon:88.4,  status:"healthy",  ndvi:0.81, ndwi:0.44, moisture:0.38, sar:-10.5, area:"180 ha", crop:"Rice",      lastIrrigated:"Jun 28", recommendation:"Optimal. Continue schedule.",         severity:0.15 },
  { id:"h9",  name:"Assam Valley (AOI)",  region:"India",     lat:26.1,  lon:91.7,  status:"healthy",  ndvi:0.79, ndwi:0.43, moisture:0.36, sar:-10.9, area:"142 ha", crop:"Rice",      lastIrrigated:"Jun 28", recommendation:"Excellent condition.",                severity:0.12 },
  { id:"h10", name:"Tamil Nadu Delta",    region:"India",     lat:10.8,  lon:79.5,  status:"healthy",  ndvi:0.76, ndwi:0.40, moisture:0.33, sar:-11.2, area:"210 ha", crop:"Rice",      lastIrrigated:"Jun 27", recommendation:"Good moisture. Continue.",            severity:0.18 },
  // ── South Asia ────────────────────────────────────────────────────────────
  { id:"h11", name:"Pakistan Punjab",     region:"Pakistan",  lat:31.0,  lon:72.5,  status:"severe",   ndvi:0.40, ndwi:0.09, moisture:0.07, sar:-19.8, area:"580 ha", crop:"Wheat",     lastIrrigated:"Jun 16", recommendation:"URGENT: Critical water stress.",      severity:0.92 },
  { id:"h12", name:"Sindh Irrigated",     region:"Pakistan",  lat:27.5,  lon:68.5,  status:"moderate", ndvi:0.62, ndwi:0.26, moisture:0.21, sar:-13.5, area:"420 ha", crop:"Cotton",    lastIrrigated:"Jun 22", recommendation:"Increase irrigation frequency.",     severity:0.55 },
  { id:"h13", name:"Bangladesh Paddy",    region:"Bangladesh",lat:23.7,  lon:90.4,  status:"moderate", ndvi:0.69, ndwi:0.32, moisture:0.25, sar:-12.2, area:"260 ha", crop:"Rice",      lastIrrigated:"Jun 26", recommendation:"Irrigate within 48 hrs.",            severity:0.45 },
  { id:"h14", name:"Sri Lanka Central",   region:"Sri Lanka", lat:7.3,   lon:80.7,  status:"healthy",  ndvi:0.83, ndwi:0.46, moisture:0.40, sar:-9.8,  area:"95 ha",  crop:"Tea",       lastIrrigated:"Jun 28", recommendation:"Excellent. No action needed.",        severity:0.10 },
  // ── Southeast Asia ────────────────────────────────────────────────────────
  { id:"h15", name:"Mekong Delta",        region:"Vietnam",   lat:10.2,  lon:105.5, status:"healthy",  ndvi:0.85, ndwi:0.48, moisture:0.42, sar:-9.2,  area:"680 ha", crop:"Rice",      lastIrrigated:"Jun 28", recommendation:"Optimal moisture. Continue.",         severity:0.08 },
  { id:"h16", name:"Central Thailand",    region:"Thailand",  lat:15.5,  lon:100.5, status:"moderate", ndvi:0.65, ndwi:0.27, moisture:0.22, sar:-13.3, area:"390 ha", crop:"Rice",      lastIrrigated:"Jun 23", recommendation:"Irrigate before next dry spell.",    severity:0.50 },
  // ── Africa ────────────────────────────────────────────────────────────────
  { id:"h17", name:"Nile Delta",          region:"Egypt",     lat:30.8,  lon:31.2,  status:"moderate", ndvi:0.58, ndwi:0.22, moisture:0.18, sar:-14.5, area:"450 ha", crop:"Cotton",    lastIrrigated:"Jun 22", recommendation:"Increase drip irrigation.",          severity:0.58 },
  { id:"h18", name:"Sahel Region",        region:"Mali",      lat:14.5,  lon:-3.5,  status:"severe",   ndvi:0.28, ndwi:0.05, moisture:0.04, sar:-22.5, area:"820 ha", crop:"Millet",    lastIrrigated:"Jun 10", recommendation:"Critical: drought conditions.",       severity:0.98 },
  { id:"h19", name:"East Africa Rift",    region:"Kenya",     lat:0.5,   lon:37.0,  status:"moderate", ndvi:0.60, ndwi:0.24, moisture:0.19, sar:-14.0, area:"315 ha", crop:"Maize",     lastIrrigated:"Jun 20", recommendation:"Supplemental irrigation needed.",    severity:0.55 },
  // ── Americas ──────────────────────────────────────────────────────────────
  { id:"h20", name:"California Central Valley",region:"USA",  lat:36.7,  lon:-119.8,status:"severe",   ndvi:0.44, ndwi:0.13, moisture:0.10, sar:-18.1, area:"920 ha", crop:"Almonds",   lastIrrigated:"Jun 19", recommendation:"URGENT: Drought stress. Irrigate.",  severity:0.85 },
  { id:"h21", name:"US Corn Belt",        region:"USA",       lat:41.5,  lon:-93.0, status:"healthy",  ndvi:0.82, ndwi:0.45, moisture:0.39, sar:-10.2, area:"740 ha", crop:"Corn",      lastIrrigated:"Jun 27", recommendation:"Optimal. Continue rotation.",        severity:0.12 },
  { id:"h22", name:"Cerrado Brazil",      region:"Brazil",    lat:-15.0, lon:-47.5, status:"moderate", ndvi:0.63, ndwi:0.26, moisture:0.21, sar:-13.6, area:"560 ha", crop:"Soybean",   lastIrrigated:"Jun 21", recommendation:"Monitor deforestation impact.",       severity:0.52 },
  // ── Europe ────────────────────────────────────────────────────────────────
  { id:"h23", name:"Po Valley Italy",     region:"Italy",     lat:45.0,  lon:11.0,  status:"moderate", ndvi:0.68, ndwi:0.30, moisture:0.23, sar:-12.8, area:"280 ha", crop:"Wheat",     lastIrrigated:"Jun 24", recommendation:"Irrigate within 24-48 hrs.",        severity:0.48 },
  { id:"h24", name:"Iberian Peninsula",   region:"Spain",     lat:39.5,  lon:-3.8,  status:"severe",   ndvi:0.39, ndwi:0.10, moisture:0.08, sar:-19.5, area:"490 ha", crop:"Olive",     lastIrrigated:"Jun 15", recommendation:"URGENT: Heatwave stress.",           severity:0.88 },
  // ── Central Asia ──────────────────────────────────────────────────────────
  { id:"h25", name:"Aral Sea Basin",      region:"Uzbekistan",lat:42.0,  lon:61.0,  status:"severe",   ndvi:0.32, ndwi:0.07, moisture:0.05, sar:-21.0, area:"670 ha", crop:"Cotton",    lastIrrigated:"Jun 12", recommendation:"Critical: severe desertification.",  severity:0.96 },
  { id:"h26", name:"Ganges-Brahmaputra",  region:"India",     lat:25.5,  lon:85.0,  status:"healthy",  ndvi:0.80, ndwi:0.43, moisture:0.37, sar:-10.7, area:"390 ha", crop:"Rice",      lastIrrigated:"Jun 28", recommendation:"Excellent. Monsoon replenishment.",  severity:0.14 },
];

// ─── Mercator projection (equirectangular / plate carrée) ─────────────────────
// For the equirectangular image: x = (lon+180)/360, y = (90-lat)/180
function latLonToXY(lat: number, lon: number, W: number, H: number): [number,number] {
  const x = ((lon + 180) / 360) * W;
  const y = ((90 - lat) / 180) * H;
  return [x, y];
}

// ─── Colour helpers ───────────────────────────────────────────────────────────
function stressColor(s: StressLevel): string {
  return s === "healthy" ? "#22c55e" : s === "moderate" ? "#eab308" : "#ef4444";
}

function ndviToColor(v: number): string {
  if (v >= 0.7) return "#16a34a";
  if (v >= 0.55) return "#84cc16";
  if (v >= 0.35) return "#ca8a04";
  return "#b91c1c";
}

function moistureToColor(v: number): string {
  if (v >= 0.30) return "#1d4ed8";
  if (v >= 0.15) return "#60a5fa";
  if (v >= 0.07) return "#f59e0b";
  return "#dc2626";
}

function sarToColor(v: number): string {
  const t = Math.max(0, Math.min(1, (v - (-22)) / 14));
  const g = Math.round(40 + t * 200);
  return `rgb(${g},${g},${Math.round(g*1.15)})`;
}

function dotColor(h: Hotspot, layer: LayerMode): string {
  if (layer === "ndvi")     return ndviToColor(h.ndvi);
  if (layer === "moisture") return moistureToColor(h.moisture);
  if (layer === "sar")      return sarToColor(h.sar);
  return stressColor(h.status);
}

// ─── WorldMap component ───────────────────────────────────────────────────────

function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(800);
  const [H, setH] = useState(420);
  const [zoom, setZoom]         = useState(1);
  const [pan,  setPan]          = useState<[number,number]>([0,0]);
  const [isPanning, setIsPanning] = useState(false);
  const panStart   = useRef<[number,number,number,number]>([0,0,0,0]);
  const [selected, setSelected] = useState<Hotspot|null>(null);
  const [hovered,  setHovered]  = useState<string|null>(null);
  const [tooltip,  setTooltip]  = useState<{x:number;y:number;h:Hotspot}|null>(null);
  const [layer, setLayer]       = useState<LayerMode>("stress");
  const [tick,  setTick]        = useState(0);

  // Animate ring pulse
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t+1) % 120), 50);
    return () => clearInterval(id);
  }, []);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current; if(!el) return;
    const ob = new ResizeObserver(([e]) => {
      setW(Math.round(e.contentRect.width));
      setH(Math.round(e.contentRect.height));
    });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // Convert screen (mouse) coords → map (image) coords, accounting for pan/zoom
  const toMapCoords = useCallback((ex: number, ey: number): [number,number] => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return [0,0];
    const mx = (ex - rect.left - rect.width/2  - pan[0]) / zoom + W/2;
    const my = (ey - rect.top  - rect.height/2 - pan[1]) / zoom + H/2;
    return [mx, my];
  }, [zoom, pan, W, H]);

  const hitTest = useCallback((mx: number, my: number): Hotspot|null => {
    for (const h of HOTSPOTS) {
      const [hx, hy] = latLonToXY(h.lat, h.lon, W, H);
      const r = 6 + h.severity * 14;
      if (Math.hypot(mx-hx, my-hy) < r + 4) return h;
    }
    return null;
  }, [W, H]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      setPan([
        panStart.current[2] + e.clientX - panStart.current[0],
        panStart.current[3] + e.clientY - panStart.current[1],
      ]);
      return;
    }
    const [mx,my] = toMapCoords(e.clientX, e.clientY);
    const h = hitTest(mx,my);
    setHovered(h?.id ?? null);
    if (h) {
      const rect = containerRef.current?.getBoundingClientRect();
      setTooltip({ x: e.clientX-(rect?.left??0), y: e.clientY-(rect?.top??0), h });
    } else setTooltip(null);
  }, [isPanning, toMapCoords, hitTest]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsPanning(true);
    panStart.current = [e.clientX, e.clientY, pan[0], pan[1]];
  }, [pan]);

  const onMouseUp = useCallback((e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - panStart.current[0]);
    const dy = Math.abs(e.clientY - panStart.current[1]);
    setIsPanning(false);
    if (dx < 4 && dy < 4) {
      const [mx,my] = toMapCoords(e.clientX, e.clientY);
      const h = hitTest(mx,my);
      setSelected(prev => prev?.id === h?.id ? null : h);
    }
  }, [toMapCoords, hitTest]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.max(0.6, Math.min(6, z * (e.deltaY < 0 ? 1.12 : 0.9))));
  }, []);

  const LAYERS: { key: LayerMode; label: string; icon: string }[] = [
    { key:"stress",   label:"Stress",   icon:"🌡" },
    { key:"ndvi",     label:"NDVI",     icon:"🌿" },
    { key:"moisture", label:"Moisture", icon:"💧" },
    { key:"sar",      label:"SAR",      icon:"📡" },
  ];

  const legends: Record<LayerMode, { label:string; color:string }[]> = {
    stress:   [{ label:"Healthy",  color:"#22c55e" },{ label:"Moderate", color:"#eab308" },{ label:"Severe",  color:"#ef4444" }],
    ndvi:     [{ label:"≥0.7 Dense",color:"#16a34a" },{ label:"0.55-0.7",color:"#84cc16" },{ label:"0.35-0.55",color:"#ca8a04" },{ label:"<0.35 Bare",color:"#b91c1c" }],
    moisture: [{ label:"Wet >0.30",color:"#1d4ed8" },{ label:"0.15-0.30",color:"#60a5fa" },{ label:"0.07-0.15",color:"#f59e0b" },{ label:"Dry <0.07",color:"#dc2626" }],
    sar:      [{ label:"High σ°",  color:"#e2e8f0" },{ label:"Medium",   color:"#64748b" },{ label:"Low σ°",  color:"#1e293b" }],
  };

  const pulseFrac = (Math.sin((tick / 120) * Math.PI * 2) + 1) / 2; // 0..1

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* ── Map panel ── */}
      <div className="lg:col-span-3 rounded-xl border border-border bg-black overflow-hidden shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0b0f1a] border-b border-white/8 shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-primary" />
            <span className="text-[12px] font-semibold text-white/90">Global Moisture Stress Map</span>
            <span className="rounded-full bg-green-500/20 border border-green-500/30 px-2 py-0.5 text-[9px] font-bold text-green-400 tracking-wider">LIVE · Jun 28</span>
            <span className="text-[10px] text-white/30">{HOTSPOTS.length} monitoring zones</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex rounded-lg overflow-hidden border border-white/10 bg-white/5">
              {LAYERS.map(l => (
                <button key={l.key} onClick={() => setLayer(l.key)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold transition-colors ${layer===l.key?"bg-primary text-white":"text-white/45 hover:text-white/80"}`}>
                  <span>{l.icon}</span><span>{l.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setZoom(z => Math.min(z+0.4,6))} className="flex h-7 w-7 items-center justify-center rounded border border-white/10 text-white/45 hover:bg-white/10 transition-colors"><ZoomIn className="h-3.5 w-3.5"/></button>
            <button onClick={() => setZoom(z => Math.max(z-0.4,0.6))} className="flex h-7 w-7 items-center justify-center rounded border border-white/10 text-white/45 hover:bg-white/10 transition-colors"><ZoomOut className="h-3.5 w-3.5"/></button>
            <button onClick={() => {setZoom(1);setPan([0,0]);setSelected(null);}} className="flex h-7 w-7 items-center justify-center rounded border border-white/10 text-white/45 hover:bg-white/10 transition-colors"><RefreshCcw className="h-3.5 w-3.5"/></button>
            <button className="flex items-center gap-1.5 rounded border border-white/10 px-2.5 py-1.5 text-[10px] text-white/45 hover:bg-white/10 transition-colors"><Download className="h-3 w-3"/>Export</button>
          </div>
        </div>

        {/* Map viewport */}
        <div
          ref={containerRef}
          className="relative flex-1 overflow-hidden select-none"
          style={{ minHeight:420, background:"#06090f", cursor:isPanning?"grabbing":"crosshair" }}
          onMouseMove={onMouseMove}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={() => { setHovered(null); setTooltip(null); setIsPanning(false); }}
          onWheel={onWheel}
        >
          {/* Satellite world map basemap */}
          <div style={{
            position:"absolute", inset:0, overflow:"hidden",
          }}>
            <div style={{
              width:"100%", height:"100%",
              transform:`translate(${pan[0]}px,${pan[1]}px) scale(${zoom})`,
              transformOrigin:"center",
              transition: isPanning?"none":"transform 0.18s ease",
            }}>
              {/* Equirectangular satellite image — same CDN used by earth globes */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                alt="Satellite basemap"
                style={{ width:"100%", height:"100%", objectFit:"fill", display:"block", imageRendering:"auto" }}
                draggable={false}
              />

              {/* SVG overlay — hotspot markers in equirectangular space */}
              <svg
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
              >
                <defs>
                  {HOTSPOTS.map(h => {
                    const col = dotColor(h, layer);
                    return (
                      <radialGradient key={h.id} id={`grd-${h.id}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor={col} stopOpacity={0.9} />
                        <stop offset="100%" stopColor={col} stopOpacity={0.0} />
                      </radialGradient>
                    );
                  })}
                </defs>

                {HOTSPOTS.map(h => {
                  const [hx,hy] = latLonToXY(h.lat, h.lon, W, H);
                  const col     = dotColor(h, layer);
                  const baseR   = 5 + h.severity * 12;
                  const isHov   = hovered === h.id;
                  const isSel   = selected?.id === h.id;
                  // Halo radius — pulsing
                  const haloR   = baseR * (1.6 + pulseFrac * 0.8);
                  const haloOp  = (0.18 + pulseFrac * 0.22) * (h.severity);

                  return (
                    <g key={h.id}>
                      {/* Halo glow */}
                      <circle cx={hx} cy={hy} r={haloR} fill={`url(#grd-${h.id})`} opacity={haloOp} />
                      {/* Outer ring (severe only) */}
                      {h.status === "severe" && (
                        <circle cx={hx} cy={hy} r={baseR+3} fill="none" stroke={col} strokeWidth={0.8} opacity={0.5+pulseFrac*0.4} />
                      )}
                      {/* Core dot */}
                      <circle cx={hx} cy={hy} r={isHov||isSel ? baseR+2 : baseR}
                        fill={col} opacity={0.9}
                        stroke={isSel?"#818cf8":isHov?"rgba(255,255,255,0.9)":"rgba(0,0,0,0.4)"}
                        strokeWidth={isSel?2:1}
                      />
                      {/* Selection ring */}
                      {isSel && <circle cx={hx} cy={hy} r={baseR+6} fill="none" stroke="#818cf8" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.8} />}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Hover tooltip */}
          {tooltip && (
            <div className="pointer-events-none absolute z-30 rounded-lg border border-white/15 bg-[#0b0f1a]/95 backdrop-blur-md shadow-2xl px-3 py-2.5"
              style={{ left:Math.min(tooltip.x+16, W-200), top:Math.max(tooltip.y-90, 8), minWidth:180 }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background:dotColor(tooltip.h, layer) }}/>
                <p className="font-bold text-white text-[12px] leading-tight">{tooltip.h.name}</p>
              </div>
              <p className="text-[10px] text-white/40 mb-1.5">{tooltip.h.region} · {tooltip.h.crop} · {tooltip.h.area}</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] text-white/55">
                <span>NDVI <b className="text-white">{tooltip.h.ndvi}</b></span>
                <span>Moisture <b className="text-white">{tooltip.h.moisture}</b></span>
                <span>NDWI <b className="text-white">{tooltip.h.ndwi}</b></span>
                <span>SAR <b className="text-white">{tooltip.h.sar} dB</b></span>
              </div>
              <div className={`mt-2 text-[10px] font-semibold rounded px-1.5 py-0.5 inline-block ${
                tooltip.h.status==="healthy"?"bg-green-500/20 text-green-400":tooltip.h.status==="moderate"?"bg-yellow-500/20 text-yellow-400":"bg-red-500/20 text-red-400"}`}>
                {tooltip.h.status.toUpperCase()}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex flex-col gap-1 bg-[#0b0f1a]/90 backdrop-blur-sm rounded-lg border border-white/10 px-3 py-2">
            <p className="text-[8px] text-white/35 uppercase tracking-widest font-semibold mb-0.5">{LAYERS.find(l=>l.key===layer)?.label}</p>
            {legends[layer].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <span className="h-2 w-4 rounded-sm block shrink-0" style={{ background:l.color, opacity:0.85 }}/>
                <span className="text-[10px] text-white/60">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Zoom + coords hint */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <span className="text-[9px] text-white/30 bg-black/50 rounded px-2 py-1">
              {(zoom*100).toFixed(0)}% · scroll to zoom · drag to pan · click to inspect
            </span>
          </div>

          {/* Compass */}
          <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-[#0b0f1a]/80 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center leading-none">
              <div className="text-[9px] font-bold text-white">N</div>
              <div className="text-[7px] text-white/35">↑</div>
            </div>
          </div>

          {/* Region count badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {(["healthy","moderate","severe"] as StressLevel[]).map(s => {
              const cnt = HOTSPOTS.filter(h=>h.status===s).length;
              return (
                <span key={s} className={`rounded-full border px-2 py-0.5 text-[9px] font-bold backdrop-blur-sm ${
                  s==="healthy" ?"border-green-500/30 bg-green-500/15 text-green-400":
                  s==="moderate"?"border-yellow-500/30 bg-yellow-500/15 text-yellow-400":
                                 "border-red-500/30 bg-red-500/15 text-red-400"}`}>
                  {cnt} {s}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-col gap-3">
        {/* Selected zone */}
        {selected ? (
          <div className="rounded-xl border border-primary/30 bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Selected Zone</p>
                <h4 className="text-[13px] font-bold text-foreground leading-tight">{selected.name}</h4>
                <p className="text-[10px] text-muted-foreground">{selected.region} · {selected.crop} · {selected.area}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-muted text-muted-foreground">
                <X className="h-3.5 w-3.5"/>
              </button>
            </div>
            <div className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] font-bold mb-3 ${
              selected.status==="healthy" ?"bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20":
              selected.status==="moderate"?"bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20":
                                          "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${selected.status==="healthy"?"bg-green-500":selected.status==="moderate"?"bg-yellow-500":"bg-red-500"}`}/>
              {selected.status.toUpperCase()} STRESS
            </div>

            {[
              { label:"NDVI",     val:selected.ndvi,     lo:-1,  hi:1,   color:"#22c55e" },
              { label:"Moisture", val:selected.moisture,  lo:0,   hi:0.5, color:"#60a5fa" },
              { label:"NDWI",     val:selected.ndwi,     lo:-1,  hi:1,   color:"#a78bfa" },
            ].map(it => (
              <div key={it.label} className="mb-2.5">
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] text-muted-foreground">{it.label}</span>
                  <span className="text-[9px] font-semibold text-foreground">{it.val}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width:`${Math.max(3,((it.val-it.lo)/(it.hi-it.lo))*100)}%`, background:it.color, transition:"width 0.6s ease" }}/>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {[["Region",selected.region],["Lat/Lon",`${selected.lat.toFixed(1)}, ${selected.lon.toFixed(1)}`],["SAR",`${selected.sar} dB`],["Irrigated",selected.lastIrrigated]].map(([k,v]) => (
                <div key={k} className="rounded-md bg-muted/40 px-2 py-1.5">
                  <p className="text-[8px] text-muted-foreground uppercase tracking-wide">{k}</p>
                  <p className="text-[10px] font-semibold text-foreground">{v}</p>
                </div>
              ))}
            </div>

            <div className={`rounded-lg border px-2.5 py-2 text-[10px] leading-snug ${
              selected.status==="severe" ?"border-red-400/30 bg-red-500/5 text-red-600 dark:text-red-400":
              selected.status==="moderate"?"border-yellow-400/30 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400":
                                          "border-green-400/30 bg-green-500/5 text-green-600 dark:text-green-400"}`}>
              <p className="font-semibold mb-0.5">AI Recommendation</p>
              {selected.recommendation}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-5 flex flex-col items-center justify-center text-center gap-3" style={{minHeight:160}}>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-primary/60"/>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-0.5">Click a hotspot</p>
              <p className="text-[11px] text-muted-foreground">Hover to preview. Click to pin zone data and recommendations.</p>
            </div>
          </div>
        )}

        {/* Regional summary */}
        <div className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2.5">Global Coverage</p>
          {(["healthy","moderate","severe"] as StressLevel[]).map(s => {
            const cnt = HOTSPOTS.filter(h=>h.status===s).length;
            const pct = Math.round((cnt/HOTSPOTS.length)*100);
            const col = s==="healthy"?"#22c55e":s==="moderate"?"#eab308":"#ef4444";
            return (
              <div key={s} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] capitalize text-muted-foreground">{s}</span>
                  <span className="text-[10px] font-semibold text-foreground">{cnt} zones · {pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width:`${pct}%`, background:col }}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sensor info */}
        <div className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2.5">Data Sources</p>
          {[
            ["Optical","Sentinel-2 / LISS-IV"],
            ["SAR","Sentinel-1 C-band"],
            ["Resolution","10m / 5.8m GSD"],
            ["Revisit","5 days"],
            ["Coverage","Global"],
          ].map(([k,v]) => (
            <div key={k} className="flex justify-between py-1 border-b border-border last:border-none">
              <span className="text-[10px] text-muted-foreground">{k}</span>
              <span className="text-[10px] font-semibold text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CropStressPage() {
  return (
    <Shell title="Moisture Stress Detection" subtitle="Global satellite monitoring · NDVI · SAR · Soil moisture">
      <div className="flex flex-col gap-5">

        {/* Controls */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1.5 min-w-[180px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Dataset</label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs cursor-pointer hover:bg-muted transition-colors">
                <span className="text-foreground font-medium">Sentinel-2 L2A</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground"/>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 min-w-[180px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Region Focus</label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs cursor-pointer hover:bg-muted transition-colors">
                <span className="text-foreground font-medium">South Asia</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground"/>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                <Upload className="h-3.5 w-3.5"/> Upload
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                <Play className="h-3.5 w-3.5"/> Analyze
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["LISS-IV Image","Sentinel-1 SAR","Sentinel-2","DEM","Historical"].map(ds => (
              <span key={ds} className="inline-flex items-center rounded-md border border-border bg-muted/30 px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors">
                <Database className="h-3 w-3 mr-1"/> {ds}
              </span>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {moistureSummary.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-xl border border-border bg-card p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background:`${card.color}1a` }}>
                    <Icon className="h-3.5 w-3.5" style={{ color:card.color }}/>
                  </div>
                  <span className="text-[10px] text-muted-foreground leading-tight">{card.label}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-foreground">{card.value}</span>
                  {card.trend !== "neutral" && (
                    <span className={`inline-flex items-center text-[10px] font-semibold ${card.trend==="up"?"text-warning":"text-success"}`}>
                      {card.trend==="up" ? <TrendingUp className="h-3 w-3 mr-0.5"/> : <TrendingDown className="h-3 w-3 mr-0.5"/>}
                      {card.change}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── THE WORLD MAP ── */}
        <WorldMap />

        {/* Vegetation Indices */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary"/> Vegetation & Moisture Indices — Punjab AOI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {vegetationIndices.map(idx => {
              const pct = ((idx.value-idx.min)/(idx.max-idx.min))*100;
              return (
                <div key={idx.name} className="rounded-lg border border-border bg-muted/20 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-muted-foreground">{idx.name}</span>
                    <Info className="h-3 w-3 text-muted-foreground/60"/>
                  </div>
                  <span className="text-xl font-bold text-foreground">{idx.value}</span>
                  <div className="flex items-end gap-0.5 h-8 mt-2">
                    {idx.trend.map((v,i) => {
                      const bh = ((v-idx.min)/(idx.max-idx.min))*100;
                      return <div key={i} className="flex-1 rounded-t-sm" style={{ height:`${Math.max(bh,4)}%`, background:idx.color, opacity:i===idx.trend.length-1?1:0.38 }}/>;
                    })}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-muted-foreground">{idx.min}</span>
                    <span className="text-[9px] text-muted-foreground">{idx.max}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growth Stage */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sprout className="h-4 w-4 text-primary"/> Crop Growth Stage — Punjab
          </h3>
          <div className="relative flex items-center justify-between">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" style={{zIndex:0}}/>
            {growthStages.map(stage => {
              const col = stageColor[stage.status];
              const Icon = stage.icon;
              return (
                <div key={stage.stage} className="relative z-10 flex flex-col items-center gap-2" style={{width:"20%"}}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 bg-card" style={{
                    borderColor:stage.status!=="upcoming"?col:"var(--color-border)",
                    background:stage.status==="done"?`${col}22`:stage.status==="active"?`${col}18`:"var(--color-card)",
                  }}>
                    {stage.status==="done"    ? <CheckCircle2 className="h-4 w-4" style={{color:col}}/>
                    :stage.status==="active"  ? <div className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" style={{borderColor:`${col} transparent ${col} ${col}`}}/>
                    :<Icon className="h-4 w-4 text-muted-foreground"/>}
                  </div>
                  <div className="text-center">
                    <span className={`text-[11px] font-semibold block ${stage.status==="active"?"text-foreground":"text-muted-foreground"}`}>{stage.stage}</span>
                    <span className="text-[10px] text-muted-foreground">{stage.day}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-center">
            <span className="text-[11px] text-muted-foreground">Current Stage: </span>
            <span className="text-xs font-bold text-primary">🌼 Flowering — Day 62 of 110</span>
          </div>
        </div>

        {/* AI Panel */}
        <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/5 to-primary/2 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 border border-primary/20">
              <Zap className="h-4 w-4 text-primary"/>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">🤖 AI Recommendation — Global Alert Summary</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-warning">⚠ 10 critical zones detected globally</strong> — Rajasthan, Sahel (Mali), Aral Sea Basin, Iberian Peninsula, and California Central Valley are in severe drought conditions. 
                <span className="text-primary font-medium"> Priority action: emergency irrigation support for South Asian belt</span>. 
                <span className="text-success"> 10 zones healthy</span> including Mekong Delta, US Corn Belt, and Northeast India.
              </p>
              <div className="flex gap-2 mt-3">
                <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Download className="h-3 w-3"/> Download Report
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                  <Filter className="h-3 w-3"/> Adjust Parameters
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Shell>
  );
}