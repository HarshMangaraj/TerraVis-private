"use client";
import { useState, useMemo } from "react";
import { Shell } from "@/components/layout/shell";
import {
  Database, Upload, HardDrive, CheckCircle2, Cloud, CloudOff,
  Search, Download, Play, Brain, Sliders, X, Map, ChevronDown,
  FolderOpen,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const datasets = [
  { id: "LISS_001.tif",    sensor: "LISS-IV",    date: "2026-06-27", loc: "Assam",             res: "5.8 m",  cloud: 42, size: "212 MB", status: "Ready",      type: "GeoTIFF", bands: "R, G, NIR" },
  { id: "LISS_002.tif",    sensor: "LISS-IV",    date: "2026-06-26", loc: "Meghalaya",          res: "5.8 m",  cloud: 8,  size: "198 MB", status: "Ready",      type: "GeoTIFF", bands: "R, G, NIR" },
  { id: "LISS_003_MX.tif", sensor: "LISS-IV",    date: "2026-06-25", loc: "Arunachal Pradesh",  res: "5.8 m",  cloud: 71, size: "224 MB", status: "Ready",      type: "GeoTIFF", bands: "R, G, NIR" },
  { id: "S1_GRD_001.tif",  sensor: "Sentinel-1", date: "2026-06-24", loc: "Northeast India",    res: "10 m",   cloud: 0,  size: "890 MB", status: "Ready",      type: "GeoTIFF", bands: "VV, VH" },
  { id: "S2_L2A_001.tif",  sensor: "Sentinel-2", date: "2026-06-23", loc: "Sikkim",             res: "10 m",   cloud: 15, size: "1.2 GB", status: "Processing", type: "GeoTIFF", bands: "B2–B12" },
  { id: "LISS_004.tif",    sensor: "LISS-IV",    date: "2026-06-22", loc: "Nagaland",           res: "5.8 m",  cloud: 55, size: "206 MB", status: "Ready",      type: "GeoTIFF", bands: "R, G, NIR" },
  { id: "DEM_NE_01.nc",    sensor: "DEM",        date: "2026-06-20", loc: "Northeast India",    res: "30 m",   cloud: 0,  size: "450 MB", status: "Ready",      type: "NetCDF",  bands: "Elevation" },
  { id: "S1_GRD_002.tif",  sensor: "Sentinel-1", date: "2026-06-19", loc: "Bhutan border",      res: "10 m",   cloud: 0,  size: "910 MB", status: "Ready",      type: "GeoTIFF", bands: "VV, VH" },
  { id: "LISS_005_MX.tif", sensor: "LISS-IV",    date: "2026-06-18", loc: "Manipur",            res: "5.8 m",  cloud: 33, size: "218 MB", status: "Failed",     type: "GeoTIFF", bands: "R, G, NIR" },
  { id: "S2_L2A_002.tif",  sensor: "Sentinel-2", date: "2026-06-17", loc: "Assam",             res: "10 m",   cloud: 22, size: "1.1 GB", status: "Ready",      type: "GeoTIFF", bands: "B2–B12" },
  { id: "DEM_SIK_01.hdf",  sensor: "DEM",        date: "2026-06-15", loc: "Sikkim",             res: "30 m",   cloud: 0,  size: "320 MB", status: "Ready",      type: "HDF5",    bands: "Elevation" },
  { id: "LISS_006.tif",    sensor: "LISS-IV",    date: "2026-06-14", loc: "Mizoram",            res: "5.8 m",  cloud: 11, size: "195 MB", status: "Ready",      type: "GeoTIFF", bands: "R, G, NIR" },
];

type Dataset = typeof datasets[number];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const sensorAccent: Record<string, string> = {
  "LISS-IV":    "oklch(0.50 0.16 195)",
  "Sentinel-1": "oklch(0.52 0.17 150)",
  "Sentinel-2": "oklch(0.52 0.17 265)",
  "DEM":        "oklch(0.62 0.17 85)",
};

function cloudBucket(c: number) {
  return c <= 20 ? "low" : c <= 50 ? "med" : "high";
}

const statusStyle: Record<string, string> = {
  Ready:      "bg-success/12 text-success border-success/25",
  Processing: "bg-warning/12 text-warning border-warning/25",
  Failed:     "bg-destructive/12 text-destructive border-destructive/25",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, sub, color,
}: { icon: React.ElementType; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-xl font-bold tabular-nums text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{sub}</p>
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: `color-mix(in oklch, ${color} 12%, white)`,
            border: `1px solid color-mix(in oklch, ${color} 25%, transparent)`,
          }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
      </div>
    </div>
  );
}

function SensorBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-lg font-bold tabular-nums text-foreground">{count.toLocaleString()}</p>
      <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${(count / total) * 100}%`, background: color }} />
      </div>
    </div>
  );
}

function CloudBar({ pct }: { pct: number }) {
  const low = pct <= 20;
  return (
    <div>
      <span
        className="font-mono text-xs font-medium"
        style={{ color: low ? "var(--color-success, oklch(0.52 0.17 150))" : "var(--color-warning, oklch(0.62 0.17 85))" }}
      >
        {pct}%
      </span>
      <div className="mt-0.5 h-1 w-14 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: low ? "oklch(0.52 0.17 150)" : "oklch(0.62 0.17 85)",
          }}
        />
      </div>
    </div>
  );
}

function PreviewPanel({ ds }: { ds: Dataset }) {
  const isLISS = ds.sensor === "LISS-IV";
  const auxItems = isLISS
    ? [
        { label: "Sentinel-1", ok: true },
        { label: "Sentinel-2", ok: true },
        { label: "DEM", ok: true },
        { label: "Historical", ok: true },
      ]
    : [
        { label: "LISS-IV", ok: false },
        { label: "Historical", ok: false },
      ];

  const meta = [
    { k: "Sensor",      v: ds.sensor },
    { k: "Date",        v: ds.date },
    { k: "Resolution",  v: ds.res },
    { k: "Cloud cover", v: `${ds.cloud}%` },
    { k: "Projection",  v: "WGS84" },
    { k: "Size",        v: ds.size },
    { k: "Bands",       v: ds.bands },
    { k: "Image",       v: "10240 × 10240" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Thumbnail */}
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-xs font-semibold text-foreground">Image preview</p>
        <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-muted/60 border border-border/40 flex-col gap-2">
          <Map className="h-8 w-8 text-muted-foreground/40" />
          <span className="text-[10px] text-muted-foreground font-mono truncate max-w-full px-2">{ds.id}</span>
        </div>

        {/* Meta */}
        <div className="mt-3 divide-y divide-border/40">
          {meta.map(({ k, v }) => (
            <div key={k} className="flex items-center justify-between py-1.5">
              <span className="text-[11px] text-muted-foreground">{k}</span>
              <span className="text-[11px] font-medium text-foreground">{v}</span>
            </div>
          ))}
        </div>

        {/* Aux data */}
        <div className="mt-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Linked auxiliary</p>
          <div className="flex flex-wrap gap-1.5">
            {auxItems.map(({ label, ok }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                  ok
                    ? "bg-success/10 text-success border-success/25"
                    : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {ok ? <CheckCircle2 className="h-3 w-3" /> : <X className="h-3 w-3" />}
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-primary/25 bg-primary/8 py-2 text-xs font-medium text-primary hover:bg-primary/15 transition-colors">
            <Download className="h-3 w-3" /> Download
          </button>
          <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground hover:bg-muted/40 transition-colors">
            <CloudOff className="h-3 w-3" /> Generate cloud mask
          </button>
          <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground hover:bg-muted/40 transition-colors">
            <Play className="h-3 w-3" /> Start reconstruction
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Upload dialog ─────────────────────────────────────────────────────────────

function UploadDialog({ onClose }: { onClose: () => void }) {
  const types = [
    { label: "LISS-IV scene",  icon: Database },
    { label: "Sentinel-1",     icon: Database },
    { label: "Sentinel-2",     icon: Database },
    { label: "DEM file",       icon: HardDrive },
    { label: "Cloud mask",     icon: Cloud },
  ];
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-semibold text-foreground">Upload dataset</span>
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted/40 transition-colors">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
        {types.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 py-4 text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>
      <div className="border-t border-border px-4 pb-4">
        <div className="mt-3 flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border bg-muted/20 py-5 hover:border-primary/40 hover:bg-primary/4 transition-colors cursor-pointer">
          <FolderOpen className="h-5 w-5 text-muted-foreground" />
          <p className="text-xs font-medium text-foreground">Drop files here</p>
          <p className="text-[11px] text-muted-foreground">GeoTIFF, HDF5, NetCDF · max 50 GB</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const SENSORS   = ["LISS-IV", "Sentinel-1", "Sentinel-2", "DEM"] as const;
const CLOUD_BUCKETS = ["low", "med", "high"] as const;
const TYPES     = ["GeoTIFF", "HDF5", "NetCDF"] as const;
const STATUSES  = ["", "Ready", "Processing", "Failed"] as const;

export default function DataManagerPage() {
  const [query,        setQuery]        = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sensors,      setSensors]      = useState<Set<string>>(new Set(SENSORS));
  const [clouds,       setClouds]       = useState<Set<string>>(new Set(CLOUD_BUCKETS));
  const [types,        setTypes]        = useState<Set<string>>(new Set(TYPES));
  const [selected,     setSelected]     = useState<Dataset>(datasets[0]);
  const [showUpload,   setShowUpload]   = useState(false);

  function toggle<T extends string>(set: Set<T>, val: T): Set<T> {
    const n = new Set(set);
    n.has(val) ? n.delete(val) : n.add(val);
    return n;
  }

  const filtered = useMemo(() => datasets.filter((d) => {
    if (query && !`${d.id}${d.sensor}${d.loc}${d.status}`.toLowerCase().includes(query.toLowerCase())) return false;
    if (statusFilter && d.status !== statusFilter) return false;
    if (!sensors.has(d.sensor)) return false;
    if (!clouds.has(cloudBucket(d.cloud))) return false;
    if (!types.has(d.type)) return false;
    return true;
  }), [query, statusFilter, sensors, clouds, types]);

  const totalImages = 4250 + 1850 + 2020 + 350;

  return (
    <Shell title="Dataset Explorer" subtitle="LISS-IV · Sentinel · DEM · cloud masks">
      <div className="flex flex-col gap-5">

        {/* ── Top stat cards ── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard icon={Database}    label="Total images"   value="8,470"  sub="LISS-IV + Sentinel"  color="oklch(0.50 0.16 195)" />
          <StatCard icon={CloudOff}    label="Cloud-free"     value="1,940"  sub="45.6% of LISS-IV"   color="oklch(0.52 0.17 150)" />
          <StatCard icon={Cloud}       label="Cloudy"         value="2,310"  sub="54.4% of LISS-IV"   color="oklch(0.62 0.17 85)"  />
          <StatCard icon={HardDrive}   label="Storage used"   value="245 GB" sub="of 10 TB quota"      color="oklch(0.52 0.17 265)" />
        </div>

        {/* ── Sensor breakdown bars ── */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <SensorBar label="LISS-IV scenes"  count={4250} total={totalImages} color="oklch(0.50 0.16 195)" />
          <SensorBar label="Sentinel-1"       count={1850} total={totalImages} color="oklch(0.52 0.17 150)" />
          <SensorBar label="Sentinel-2"       count={2020} total={totalImages} color="oklch(0.52 0.17 265)" />
          <SensorBar label="DEM files"        count={350}  total={totalImages} color="oklch(0.62 0.17 85)"  />
        </div>

        {/* ── Main layout: filters | table | preview ── */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[180px_1fr_200px]">

          {/* Filter sidebar */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm h-fit">
            <p className="mb-3 text-xs font-semibold text-foreground">Filters</p>

            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Sensor</p>
            {SENSORS.map((s) => (
              <label key={s} className="flex items-center gap-2 mb-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sensors.has(s)}
                  onChange={() => setSensors(toggle(sensors, s))}
                  className="accent-primary"
                />
                <span className="text-xs text-muted-foreground">{s}</span>
              </label>
            ))}

            <div className="my-3 border-t border-border/50" />

            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Cloud cover</p>
            {(["low", "med", "high"] as const).map((b) => (
              <label key={b} className="flex items-center gap-2 mb-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={clouds.has(b)}
                  onChange={() => setClouds(toggle(clouds, b))}
                  className="accent-primary"
                />
                <span className="text-xs text-muted-foreground">
                  {b === "low" ? "Low (0–20%)" : b === "med" ? "Medium (20–50%)" : "High (50%+)"}
                </span>
              </label>
            ))}

            <div className="my-3 border-t border-border/50" />

            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">File type</p>
            {TYPES.map((t) => (
              <label key={t} className="flex items-center gap-2 mb-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={types.has(t)}
                  onChange={() => setTypes(toggle(types, t))}
                  className="accent-primary"
                />
                <span className="text-xs text-muted-foreground">{t}</span>
              </label>
            ))}
          </div>

          {/* Dataset table */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">Dataset list</p>
                  <p className="text-xs text-muted-foreground">All ingested scenes · click to preview</p>
                </div>
                <button
                  onClick={() => setShowUpload((v) => !v)}
                  className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/15 transition-colors"
                >
                  <Upload className="h-3 w-3" />
                  Upload dataset
                </button>
              </div>

              {/* Search + status */}
              <div className="mb-3 flex gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
                  <Search className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <input
                    className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"
                    placeholder="Search name, sensor, location…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none rounded-lg border border-border bg-muted/40 pl-3 pr-7 py-2 text-xs text-muted-foreground outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s || "All status"}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{ tableLayout: "fixed" }}>
                  <colgroup>
                    <col style={{ width: 36 }} />
                    <col style={{ width: 140 }} />
                    <col style={{ width: 90 }} />
                    <col style={{ width: 88 }} />
                    <col style={{ width: 130 }} />
                    <col style={{ width: 52 }} />
                    <col style={{ width: 72 }} />
                    <col style={{ width: 70 }} />
                    <col style={{ width: 80 }} />
                    <col style={{ width: 36 }} />
                  </colgroup>
                  <thead>
                    <tr className="border-b border-border/60">
                      {["", "Dataset", "Sensor", "Date", "Location", "Res.", "Cloud %", "Size", "Status", ""].map((h, i) => (
                        <th key={i} className="pb-2 pr-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((d) => {
                      const color = sensorAccent[d.sensor] ?? "oklch(0.5 0.1 200)";
                      const isSelected = selected.id === d.id;
                      return (
                        <tr
                          key={d.id}
                          onClick={() => setSelected(d)}
                          className={`border-b border-border/30 cursor-pointer transition-colors ${
                            isSelected ? "bg-primary/6" : "hover:bg-muted/30"
                          }`}
                        >
                          <td className="py-2 pr-2">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-md border"
                              style={{
                                background: `color-mix(in oklch, ${color} 10%, white)`,
                                borderColor: `color-mix(in oklch, ${color} 25%, transparent)`,
                              }}
                            >
                              <Map className="h-3.5 w-3.5" style={{ color }} />
                            </div>
                          </td>
                          <td className="py-2 pr-2 font-mono font-semibold text-primary truncate" style={{ fontSize: 10 }}>
                            {d.id}
                          </td>
                          <td className="py-2 pr-2">
                            <span
                              className="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold"
                              style={{
                                background: `color-mix(in oklch, ${color} 10%, transparent)`,
                                borderColor: `color-mix(in oklch, ${color} 30%, transparent)`,
                                color,
                              }}
                            >
                              {d.sensor}
                            </span>
                          </td>
                          <td className="py-2 pr-2 text-muted-foreground">{d.date}</td>
                          <td className="py-2 pr-2 text-foreground truncate">{d.loc}</td>
                          <td className="py-2 pr-2 font-mono text-muted-foreground">{d.res}</td>
                          <td className="py-2 pr-2"><CloudBar pct={d.cloud} /></td>
                          <td className="py-2 pr-2 font-mono text-muted-foreground tabular-nums">{d.size}</td>
                          <td className="py-2 pr-2">
                            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ${statusStyle[d.status]}`}>
                              {d.status}
                            </span>
                          </td>
                          <td className="py-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelected(d); }}
                              className="rounded p-1 hover:bg-muted/50 transition-colors"
                              title="View details"
                            >
                              <Sliders className="h-3 w-3 text-muted-foreground" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-right text-[11px] text-muted-foreground">
                {filtered.length} of {datasets.length} datasets
              </p>
            </div>

            {/* Quick actions */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-foreground">Quick actions</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: CloudOff, label: "Generate cloud masks" },
                  { icon: Sliders,  label: "Preprocess datasets" },
                  { icon: Brain,    label: "Train model" },
                  { icon: Play,     label: "Run reconstruction" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                  >
                    <Icon className="h-3 w-3" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload dialog (inline, not fixed) */}
            {showUpload && <UploadDialog onClose={() => setShowUpload(false)} />}
          </div>

          {/* Preview panel */}
          <PreviewPanel ds={selected} />
        </div>

      </div>
    </Shell>
  );
}