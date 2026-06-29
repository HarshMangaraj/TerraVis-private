import { Shell } from "@/components/layout/shell";
import { BeforeAfter } from "@/components/dashboard/before-after";
import { 
  Wand2, Gauge, Image, Zap, Upload, Download, Play, ChevronDown,
  Calendar, Cloud, CloudRain, Droplets, Leaf, Thermometer, TrendingUp,
  TrendingDown, AlertTriangle, CheckCircle2, Info, GitCompare,
  BarChart3, FileText, Map, Maximize2, Sliders, Clock, Shield,
  Sun, Waves, Wind, Bug, Scissors, Layers
} from "lucide-react";

const predictionTypes = [
  { id: "cloud-removal", label: "Cloud Removal", icon: Cloud },
  { id: "crop-growth", label: "Crop Growth", icon: Leaf },
  { id: "moisture", label: "Moisture Prediction", icon: Droplets },
  { id: "water-deficit", label: "Water Deficit", icon: Waves },
  { id: "vegetation", label: "Vegetation Change", icon: TrendingUp },
  { id: "land-cover", label: "Land Cover Change", icon: Map },
];

const timeOptions = ["Today", "+8 Days", "+15 Days", "+30 Days", "+60 Days"];
const modelOptions = ["Diffusion Model", "Transformer", "GAN"];

const predictionSummary = [
  { label: "Prediction Confidence", value: "96%", trend: "up", change: "+2%", icon: Shield, color: "oklch(0.52 0.17 150)" },
  { label: "Vegetation Growth", value: "+18%", trend: "up", change: "NDVI +0.12", icon: Leaf, color: "oklch(0.52 0.17 150)" },
  { label: "Moisture Change", value: "-12%", trend: "down", change: "Deficit risk", icon: Droplets, color: "oklch(0.50 0.16 195)" },
  { label: "Water Deficit", value: "28 mm", trend: "up", change: "Moderate", icon: AlertTriangle, color: "oklch(0.62 0.17 85)" },
  { label: "Estimated Yield", value: "4.2 t/ha", trend: "up", change: "+8% vs avg", icon: BarChart3, color: "oklch(0.58 0.18 280)" },
  { label: "Processing Time", value: "3.8s", trend: "neutral", change: "GPU: A100", icon: Zap, color: "oklch(0.52 0.17 265)" },
];

const futureAnalytics = [
  { 
    label: "Crop Growth Forecast", 
    data: [0.65, 0.68, 0.72, 0.75, 0.78, 0.82, 0.85, 0.88], 
    unit: "NDVI",
    color: "oklch(0.52 0.17 150)",
    labels: ["Day+0", "Day+4", "Day+8", "Day+12", "Day+16", "Day+20", "Day+24", "Day+30"]
  },
  { 
    label: "Moisture Forecast", 
    data: [0.32, 0.30, 0.28, 0.25, 0.22, 0.24, 0.26, 0.28], 
    unit: "m³/m³",
    color: "oklch(0.50 0.16 195)",
    labels: ["Day+0", "Day+4", "Day+8", "Day+12", "Day+16", "Day+20", "Day+24", "Day+30"]
  },
  { 
    label: "Rainfall Prediction", 
    data: [0, 2, 8, 0, 0, 15, 3, 0], 
    unit: "mm",
    color: "oklch(0.58 0.18 280)",
    labels: ["Day+0", "Day+4", "Day+8", "Day+12", "Day+16", "Day+20", "Day+24", "Day+30"]
  },
  { 
    label: "Temperature Trend", 
    data: [29, 31, 32, 33, 34, 32, 30, 29], 
    unit: "°C",
    color: "oklch(0.56 0.22 25)",
    labels: ["Day+0", "Day+4", "Day+8", "Day+12", "Day+16", "Day+20", "Day+24", "Day+30"]
  },
];

const scenarios = [
  { id: "no-rain", label: "No Rain", icon: Sun, color: "oklch(0.62 0.17 85)", risk: "Moderate", health: "Stressed", yield: "3.2 t/ha", water: "42 mm" },
  { id: "heavy-rain", label: "Heavy Rain", icon: CloudRain, color: "oklch(0.50 0.16 195)", risk: "Low", health: "Excellent", yield: "4.8 t/ha", water: "8 mm" },
  { id: "drought", label: "Drought", icon: Sun, color: "oklch(0.56 0.22 25)", risk: "Critical", health: "Severe", yield: "1.8 t/ha", water: "65 mm" },
  { id: "flood", label: "Flood", icon: Waves, color: "oklch(0.50 0.16 195)", risk: "High", health: "Damaged", yield: "2.1 t/ha", water: "0 mm" },
  { id: "irrigation", label: "Extra Irrigation", icon: Droplets, color: "oklch(0.52 0.17 150)", risk: "Low", health: "Healthy", yield: "4.5 t/ha", water: "15 mm" },
  { id: "heatwave", label: "Heatwave", icon: Thermometer, color: "oklch(0.56 0.22 25)", risk: "High", health: "Heat Stress", yield: "2.8 t/ha", water: "38 mm" },
];

const aiRecommendations = [
  { icon: Droplets, title: "Irrigation Advisory", description: "Increase irrigation by 20% in northeast quadrant starting Day+5", priority: "high", color: "oklch(0.56 0.22 25)" },
  { icon: Leaf, title: "Fertilizer Suggestion", description: "Apply NPK 15-15-15 at 120 kg/ha before expected rainfall on Day+8", priority: "medium", color: "oklch(0.62 0.17 85)" },
  { icon: Bug, title: "Disease Risk", description: "Low fungal risk due to dry forecast. Monitor after Day+20 rainfall", priority: "low", color: "oklch(0.52 0.17 150)" },
  { icon: Calendar, title: "Harvest Recommendation", description: "Optimal harvest window: Day+28 to Day+32 based on maturity curve", priority: "medium", color: "oklch(0.50 0.16 195)" },
];

export default function GenerativePredictionPage() {
  return (
    <Shell title="Generative Prediction" subtitle="AI-powered forecasting · Future simulation · Scenario analysis">
      <div className="flex flex-col gap-5">

        {/* 1️⃣ Dataset Selection + Prediction Config */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-end gap-3">
            {/* Dataset Select */}
            <div className="flex flex-col gap-1.5 min-w-[170px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Select Dataset</label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs cursor-pointer hover:bg-muted transition-colors">
                <span className="text-foreground font-medium">Sentinel-2 L2A</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
            {/* Prediction Type */}
            <div className="flex flex-col gap-1.5 min-w-[180px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Prediction Type</label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs cursor-pointer hover:bg-muted transition-colors">
                <span className="text-foreground font-medium">Crop Growth + Moisture</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
            {/* Time Horizon */}
            <div className="flex flex-col gap-1.5 min-w-[140px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Prediction Time</label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs cursor-pointer hover:bg-muted transition-colors">
                <span className="text-foreground font-medium">+15 Days</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
            {/* Model */}
            <div className="flex flex-col gap-1.5 min-w-[160px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">AI Model</label>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs cursor-pointer hover:bg-muted transition-colors">
                <span className="text-foreground font-medium">Diffusion Model</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                <Upload className="h-3.5 w-3.5" /> Upload Dataset
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
                <Maximize2 className="h-3.5 w-3.5" /> Choose Area
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                <Play className="h-3.5 w-3.5" /> Generate Prediction
              </button>
            </div>
          </div>
          {/* Dataset Chips */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {["LISS-IV Image", "Sentinel-1", "Sentinel-2", "DEM"].map(ds => (
              <span key={ds} className="inline-flex items-center rounded-md border border-border bg-muted/30 px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors">
                <Database className="h-3 w-3 mr-1" /> {ds}
              </span>
            ))}
          </div>
          {/* Prediction Type Chips */}
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {predictionTypes.map(pt => (
              <span key={pt.id} className="inline-flex items-center rounded-md border border-primary/20 bg-primary/8 px-2 py-1 text-[10px] text-primary hover:bg-primary/15 cursor-pointer transition-colors">
                <pt.icon className="h-3 w-3 mr-1" /> {pt.label}
              </span>
            ))}
          </div>
          {/* Time + Model Chips */}
          <div className="flex gap-3 mt-2">
            <div className="flex gap-1.5">
              <span className="text-[10px] text-muted-foreground py-1">Time:</span>
              {timeOptions.map(t => (
                <span key={t} className={`inline-flex items-center rounded-md border px-2 py-1 text-[10px] cursor-pointer transition-colors ${t === "+15 Days" ? "bg-primary/12 text-primary border-primary/25" : "border-border text-muted-foreground hover:bg-muted"}`}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-1.5">
              <span className="text-[10px] text-muted-foreground py-1">Model:</span>
              {modelOptions.map(m => (
                <span key={m} className={`inline-flex items-center rounded-md border px-2 py-1 text-[10px] cursor-pointer transition-colors ${m === "Diffusion Model" ? "bg-primary/12 text-primary border-primary/25" : "border-border text-muted-foreground hover:bg-muted"}`}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3️⃣ Prediction Viewer - Split Screen */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <GitCompare className="h-4 w-4 text-primary" /> Prediction Comparison
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">Before</span>
              <div className="h-1 w-12 rounded-full bg-muted">
                <div className="h-full w-1/2 rounded-full bg-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">After</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Current Image */}
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="aspect-[4/3] rounded-md bg-muted/50 border border-border flex items-center justify-center mb-2">
                <div className="text-center">
                  <Image className="h-10 w-10 mx-auto text-muted-foreground/40 mb-1" />
                  <span className="text-[11px] text-muted-foreground">Current Satellite Image</span>
                  <span className="text-[10px] text-muted-foreground/60 block">Jun 28, 2026</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-foreground">📷 Sentinel-2 — Current</span>
                <span className="text-[10px] text-muted-foreground">NDVI: 0.72</span>
              </div>
            </div>
            {/* Predicted Image */}
            <div className="rounded-lg border border-primary/20 bg-primary/[0.02] p-3">
              <div className="aspect-[4/3] rounded-md bg-gradient-to-br from-green-900/10 via-primary/5 to-blue-900/10 border border-primary/20 flex items-center justify-center mb-2 relative">
                <div className="absolute top-2 right-2 rounded-md bg-primary/15 border border-primary/25 px-2 py-0.5 text-[10px] font-bold text-primary">
                  AI Generated
                </div>
                <div className="text-center">
                  <Wand2 className="h-10 w-10 mx-auto text-primary/40 mb-1" />
                  <span className="text-[11px] text-primary/70">Predicted Future Image</span>
                  <span className="text-[10px] text-primary/50 block">Jul 13, 2026 (+15 days)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-foreground">🤖 Diffusion Model — Predicted</span>
                <span className="text-[10px] text-primary">NDVI: 0.85 ↑</span>
              </div>
            </div>
          </div>
          {/* Slider */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground">Before</span>
            <input type="range" className="flex-1 h-1.5 rounded-full appearance-none bg-muted cursor-pointer accent-primary" defaultValue={50} />
            <span className="text-[10px] text-muted-foreground">After</span>
          </div>
        </div>

        {/* 4️⃣ Prediction Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {predictionSummary.map(card => {
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
                    <span className={`inline-flex items-center text-[10px] font-semibold ${card.trend === "up" && card.label.includes("Moisture") ? "text-warning" : card.trend === "up" ? "text-success" : "text-warning"}`}>
                      {card.trend === "up" ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                      {card.change}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 5️⃣ Future Analytics Charts */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Future Analytics — 30 Day Forecast
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {futureAnalytics.map(chart => (
              <div key={chart.label} className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-medium text-foreground">{chart.label}</span>
                  <span className="text-[10px] text-muted-foreground">{chart.unit}</span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {chart.data.map((val, i) => {
                    const maxVal = Math.max(...chart.data);
                    const minVal = Math.min(...chart.data);
                    const range = maxVal - minVal || 1;
                    const height = ((val - minVal) / range) * 80 + 10;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full rounded-t-sm transition-all hover:opacity-80"
                          style={{ 
                            height: `${height}px`, 
                            background: chart.color,
                            opacity: i === chart.data.length - 1 ? 1 : 0.5,
                          }} 
                        />
                        <span className="text-[8px] text-muted-foreground leading-none">{chart.labels[i]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6️⃣ AI Prediction Report */}
        <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/[0.02] p-5 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 border border-primary/20">
              <FileText className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">🤖 AI Prediction Report</h3>
              <p className="text-[11px] text-muted-foreground">Diffusion Model · +15 Days Forecast · 96% Confidence</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-border bg-card p-3">
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">Current Condition</span>
              <p className="text-xs font-medium text-foreground mt-1">🌤 Moderate Moisture</p>
              <p className="text-[11px] text-muted-foreground mt-1">NDVI: 0.72 · Moisture: 0.28 m³/m³ · Temp: 31°C</p>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-3">
              <span className="text-[10px] font-semibold uppercase text-primary">Predicted Condition</span>
              <p className="text-xs font-semibold text-primary mt-1">🌿 Healthy Crop Growth</p>
              <p className="text-[11px] text-muted-foreground mt-1">NDVI: 0.85 ↑ · Moisture: 0.22 m³/m³ ↓ · Temp: 33°C ↑</p>
            </div>
            <div className="rounded-lg border border-success/20 bg-success/[0.03] p-3">
              <span className="text-[10px] font-semibold uppercase text-success">Confidence Score</span>
              <p className="text-2xl font-bold text-success mt-1">96%</p>
              <p className="text-[11px] text-muted-foreground mt-1">Based on expected rainfall & irrigation</p>
            </div>
          </div>
        </div>

        {/* 7️⃣ Scenario Simulation */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Sliders className="h-4 w-4 text-primary" /> Scenario Simulation
            </h3>
            <span className="text-[10px] text-muted-foreground">Click a scenario to simulate</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {scenarios.map(sc => (
              <button key={sc.id} className="rounded-xl border border-border bg-card p-3 text-left hover:bg-muted/50 hover:border-primary/30 transition-all shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${sc.color} 12%, white)` }}>
                    <sc.icon className="h-3.5 w-3.5" style={{ color: sc.color }} />
                  </div>
                  <span className="text-[11px] font-semibold text-foreground">{sc.label}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Risk:</span>
                    <span className={`font-semibold ${sc.risk === "Low" ? "text-success" : sc.risk === "Critical" ? "text-destructive" : "text-warning"}`}>{sc.risk}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Health:</span>
                    <span className="font-medium text-foreground">{sc.health}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Yield:</span>
                    <span className="font-medium text-foreground">{sc.yield}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Water:</span>
                    <span className="font-medium text-foreground">{sc.water}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 8️⃣ AI Recommendations */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" /> AI Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {aiRecommendations.map(rec => (
              <div key={rec.title} className="rounded-lg border border-border bg-muted/20 p-3 hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${rec.color} 12%, white)` }}>
                    <rec.icon className="h-3.5 w-3.5" style={{ color: rec.color }} />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase ${rec.priority === "high" ? "text-destructive" : rec.priority === "medium" ? "text-warning" : "text-success"}`}>
                    {rec.priority} priority
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-foreground mb-1">{rec.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 9️⃣ Export Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <Download className="h-3.5 w-3.5" /> Download Predicted Map
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <Map className="h-3.5 w-3.5" /> Export GeoTIFF
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <FileText className="h-3.5 w-3.5" /> Download PDF Report
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <Clock className="h-3.5 w-3.5" /> Save Prediction
          </button>
        </div>

      </div>
    </Shell>
  );
}

// Missing Database icon import workaround
function Database({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}