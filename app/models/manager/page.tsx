import { Shell } from "@/components/layout/shell";
import { 
  Boxes, CheckCircle2, Clock, GitBranch, Zap, Upload, RotateCcw,
  Droplets, Thermometer, TrendingUp, TrendingDown, Activity, 
  BarChart3, Layers, Map, Calendar, CloudRain, Leaf, Sprout,
  Flower2, Wheat, AlertTriangle, Database, Download, Play,
  ChevronDown, Info, Maximize2, Filter
} from "lucide-react";

type StressLevel = "healthy" | "moderate" | "severe";

const moistureSummary = [
  { label: "Healthy Crop Area", value: "847 ha", change: "+12%", trend: "up" as const, icon: Leaf, color: "oklch(0.52 0.17 150)" },
  { label: "Moderate Stress", value: "312 ha", change: "+5%", trend: "up" as const, icon: Activity, color: "oklch(0.62 0.17 85)" },
  { label: "Severe Stress", value: "89 ha", change: "-3%", trend: "down" as const, icon: AlertTriangle, color: "oklch(0.56 0.22 25)" },
  { label: "Average Soil Moisture", value: "0.28 m³/m³", change: "-8%", trend: "down" as const, icon: Droplets, color: "oklch(0.50 0.16 195)" },
  { label: "Current Growth Stage", value: "Flowering", change: "Day 62", trend: "neutral" as const, icon: Flower2, color: "oklch(0.58 0.18 280)" },
  { label: "Processing Time", value: "1m 42s", change: "—", trend: "neutral" as const, icon: Clock, color: "oklch(0.52 0.015 240)" },
];

const vegetationIndices = [
  { name: "NDVI", value: 0.72, min: -1, max: 1, color: "oklch(0.52 0.17 150)", trend: [0.65, 0.68, 0.71, 0.73, 0.74, 0.72, 0.70, 0.72] },
  { name: "NDWI", value: 0.34, min: -1, max: 1, color: "oklch(0.50 0.16 195)", trend: [0.40, 0.38, 0.36, 0.35, 0.33, 0.34, 0.35, 0.34] },
  { name: "Soil Moisture Index", value: 0.28, min: 0, max: 1, color: "oklch(0.58 0.18 280)", trend: [0.32, 0.31, 0.30, 0.29, 0.28, 0.27, 0.28, 0.28] },
  { name: "SAR Backscatter", value: -12.4, min: -30, max: 0, color: "oklch(0.62 0.17 85)", trend: [-14.2, -13.8, -13.1, -12.9, -12.5, -12.4, -12.6, -12.4] },
  { name: "Temperature", value: 31.2, min: 15, max: 45, color: "oklch(0.56 0.22 25)", trend: [28.4, 29.1, 30.2, 30.8, 31.5, 31.8, 31.2, 31.2] },
];

const growthStages = [
  { stage: "Germination", day: "Day 1-10", status: "done" as const, icon: Sprout },
  { stage: "Vegetative", day: "Day 11-35", status: "done" as const, icon: Leaf },
  { stage: "Flowering", day: "Day 36-65", status: "active" as const, icon: Flower2 },
  { stage: "Grain Filling", day: "Day 66-90", status: "upcoming" as const, icon: Wheat },
  { stage: "Harvest", day: "Day 91-110", status: "upcoming" as const, icon: Clock },
];

const timeSeriesData = {
  moisture: [0.32, 0.31, 0.30, 0.29, 0.28, 0.27, 0.28],
  rainfall: [12, 8, 0, 3, 15, 2, 0],
  vegetation: [0.68, 0.70, 0.71, 0.73, 0.74, 0.72, 0.70],
  temperature: [29, 30, 31, 32, 31, 30, 31],
  days: ["Jun 22", "Jun 23", "Jun 24", "Jun 25", "Jun 26", "Jun 27", "Jun 28"],
};

const stageColor: Record<string, string> = {
  done: "oklch(0.52 0.17 150)",
  active: "oklch(0.50 0.16 195)",
  upcoming: "oklch(0.52 0.015 240)",
};

export default function CropStressPage() {
  return (
    <Shell title="Crop Stress Analysis" subtitle="Moisture monitoring · Vegetation indices · Growth tracking">
      <div className="flex flex-col gap-5">

        {/* 1️⃣ Dataset Selection & Controls */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1.5 min-w-[180px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Dataset</label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs cursor-pointer hover:bg-muted transition-colors">
                <span className="text-foreground font-medium">Sentinel-2 L2A</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 min-w-[180px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Area of Interest</label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs cursor-pointer hover:bg-muted transition-colors">
                <span className="text-foreground font-medium">Punjab — Sector 7</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                <Upload className="h-3.5 w-3.5" /> Upload Dataset
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                <Maximize2 className="h-3.5 w-3.5" /> Select Area
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                <Play className="h-3.5 w-3.5" /> Analyze Stress
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["LISS-IV Image", "Sentinel-1 SAR", "Sentinel-2", "DEM", "Historical Images"].map(ds => (
              <span key={ds} className="inline-flex items-center rounded-md border border-border bg-muted/30 px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors">
                <Database className="h-3 w-3 mr-1" /> {ds}
              </span>
            ))}
          </div>
        </div>

        {/* 2️⃣ Moisture Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {moistureSummary.map(card => {
            const CardIcon = card.icon;
            return (
              <div key={card.label} className="rounded-xl border border-border bg-card p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${card.color} 12%, white)` }}>
                    <CardIcon className="h-3.5 w-3.5" style={{ color: card.color }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground leading-tight">{card.label}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-foreground">{card.value}</span>
                  {card.trend !== "neutral" && (
                    <span className={`inline-flex items-center text-[10px] font-semibold ${card.trend === "up" ? "text-warning" : "text-success"}`}>
                      {card.trend === "up" ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                      {card.change}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3️⃣ Interactive Stress Map + Layer Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Interactive Moisture Stress Map</h3>
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted transition-colors">
                <Download className="h-3 w-3" /> Export
              </button>
            </div>
            {/* Map Placeholder */}
            <div className="relative aspect-[16/10] rounded-lg bg-muted/50 border border-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-yellow-900/10 to-red-900/20" />
              {/* Legend */}
              <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-card/90 backdrop-blur-sm rounded-lg border border-border px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm" style={{ background: "oklch(0.52 0.17 150)" }} />
                  <span className="text-[10px] text-muted-foreground">Healthy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm" style={{ background: "oklch(0.62 0.17 85)" }} />
                  <span className="text-[10px] text-muted-foreground">Moderate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm" style={{ background: "oklch(0.56 0.22 25)" }} />
                  <span className="text-[10px] text-muted-foreground">Severe</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg border border-border px-2 py-1">
                <span className="text-[10px] text-muted-foreground">
                  <Map className="h-3 w-3 inline mr-1" />
                  Punjab — Sector 7
                </span>
              </div>
            </div>
          </div>
          {/* Layer Toggles */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <h4 className="text-[11px] font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" /> Map Layers
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { name: "Moisture Layer", checked: true, color: "oklch(0.50 0.16 195)" },
                { name: "Crop Layer", checked: true, color: "oklch(0.52 0.17 150)" },
                { name: "NDVI", checked: false, color: "oklch(0.52 0.17 150)" },
                { name: "NDWI", checked: false, color: "oklch(0.50 0.16 195)" },
                { name: "SAR Moisture", checked: false, color: "oklch(0.58 0.18 280)" },
                { name: "DEM", checked: false, color: "oklch(0.62 0.17 85)" },
              ].map(layer => (
                <label key={layer.name} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={layer.checked} className="h-3.5 w-3.5 rounded border-border accent-primary" />
                  <span className="text-[11px] text-foreground">{layer.name}</span>
                  <div className="h-2 w-2 rounded-full ml-auto" style={{ background: layer.color }} />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 4️⃣ Vegetation & Moisture Indices */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" /> Vegetation & Moisture Indices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {vegetationIndices.map(idx => {
              const pct = ((idx.value - idx.min) / (idx.max - idx.min)) * 100;
              return (
                <div key={idx.name} className="rounded-lg border border-border bg-muted/20 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-muted-foreground">{idx.name}</span>
                    <Info className="h-3 w-3 text-muted-foreground/60 cursor-help" />
                  </div>
                  <span className="text-xl font-bold text-foreground">{idx.value}</span>
                  {/* Mini sparkline */}
                  <div className="flex items-end gap-0.5 h-8 mt-2">
                    {idx.trend.map((val, i) => {
                      const barH = ((val - idx.min) / (idx.max - idx.min)) * 100;
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm transition-all"
                          style={{
                            height: `${Math.max(barH, 4)}%`,
                            background: idx.color,
                            opacity: i === idx.trend.length - 1 ? 1 : 0.4,
                          }}
                        />
                      );
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

        {/* 5️⃣ Crop Growth Stage Timeline */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sprout className="h-4 w-4 text-primary" /> Crop Growth Stage
          </h3>
          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" style={{ zIndex: 0 }} />
            {growthStages.map((stage, idx) => {
              const color = stageColor[stage.status];
              const StageIcon = stage.icon;
              return (
                <div key={stage.stage} className="relative z-10 flex flex-col items-center gap-2" style={{ width: "20%" }}>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 bg-card"
                    style={{
                      borderColor: stage.status === "active" ? color : stage.status === "done" ? color : "var(--color-border)",
                      background: stage.status === "done" ? `color-mix(in oklch, ${color} 15%, white)` : stage.status === "active" ? `color-mix(in oklch, ${color} 12%, white)` : "var(--color-card)",
                    }}
                  >
                    {stage.status === "done" ? (
                      <CheckCircle2 className="h-4 w-4" style={{ color }} />
                    ) : stage.status === "active" ? (
                      <div className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${color} transparent ${color} ${color}` }} />
                    ) : (
                      <StageIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="text-center">
                    <span className={`text-[11px] font-semibold block ${stage.status === "active" ? "text-foreground" : "text-muted-foreground"}`}>
                      {stage.stage}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{stage.day}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-center">
            <span className="text-[11px] text-muted-foreground">Current Stage: </span>
            <span className="text-xs font-bold text-primary">🌼 Flowering Stage — Day 62 of 110</span>
          </div>
        </div>

        {/* 6️⃣ Time-Series Analysis */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" /> Time-Series Analysis
              </h3>
              <p className="text-[11px] text-muted-foreground">Last 7 days — Punjab Sector 7</p>
            </div>
            <div className="flex items-center gap-2">
              {["7D", "14D", "30D"].map(period => (
                <button key={period} className={`rounded-md px-2.5 py-1 text-[10px] font-medium ${period === "7D" ? "bg-primary/12 text-primary border border-primary/25" : "text-muted-foreground hover:bg-muted"}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          {/* Chart Area */}
          <div className="h-48 rounded-lg bg-muted/30 border border-border p-4 relative">
            <div className="flex items-end gap-1 h-full">
              {timeSeriesData.days.map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col gap-0.5">
                    {/* Temperature line */}
                    <div className="w-full h-1 rounded-full" style={{ background: "oklch(0.56 0.22 25)", opacity: 0.6 }} />
                    {/* Rainfall bar */}
                    <div className="w-full rounded-t-sm" style={{ height: `${timeSeriesData.rainfall[i] * 2}px`, background: "oklch(0.50 0.16 195)", opacity: 0.7 }} />
                    {/* Vegetation area */}
                    <div className="w-full rounded-t-sm" style={{ height: `${timeSeriesData.vegetation[i] * 30}px`, background: "oklch(0.52 0.17 150)", opacity: 0.5 }} />
                    {/* Moisture bar */}
                    <div className="w-full rounded-t-sm" style={{ height: `${timeSeriesData.moisture[i] * 40}px`, background: "oklch(0.58 0.18 280)", opacity: 0.8 }} />
                  </div>
                  <span className="text-[9px] text-muted-foreground">{day.split(" ")[1]}</span>
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="absolute top-3 right-3 flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: "oklch(0.58 0.18 280)" }} />
                <span className="text-[9px] text-muted-foreground">Moisture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: "oklch(0.50 0.16 195)" }} />
                <span className="text-[9px] text-muted-foreground">Rainfall</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: "oklch(0.52 0.17 150)" }} />
                <span className="text-[9px] text-muted-foreground">NDVI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: "oklch(0.56 0.22 25)" }} />
                <span className="text-[9px] text-muted-foreground">Temp</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/[0.02] p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 border border-primary/20">
              <Zap className="h-4.5 w-4.5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">🤖 AI Recommendation</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-warning">⚠ Moderate water stress detected</strong> in the northeastern section (Sector 7-B). 
                Soil moisture has dropped 8% over the past 7 days. Recommended action: 
                <span className="text-primary font-medium"> Increase irrigation by 15-20%</span> in affected zones within the next 48 hours 
                to prevent yield impact during the critical flowering stage. 
                <span className="text-success"> NDVI remains healthy at 0.72</span>, indicating crop is resilient but requires immediate attention.
              </p>
              <div className="flex gap-2 mt-3">
                <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Download className="h-3 w-3" /> Download Report
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                  <Filter className="h-3 w-3" /> Adjust Parameters
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Shell>
  );
}