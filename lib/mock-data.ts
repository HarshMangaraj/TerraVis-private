export type SceneStatus = "Completed" | "Processing" | "Failed" | "In Queue";

export interface Scene {
  id: string;
  name: string;
  date: string;
  cloudPct: number;
  psnr: number;
  status: SceneStatus;
  lat: number;
  lng: number;
  satellite: string;
  bands: string;
}

export const stats = {
  totalScenes: 12_847,
  processed: 11_392,
  cloudAvg: 38.7,
  reconstructed: 10_854,
  reconstructedSuccess: 95.3,
  avgPSNR: 32.84,
  storageUsed: 2.45,
  storageTotal: 10,
  accuracy: 97.8,
  activeJobs: 23,
  uptime: 99.94,
  throughput: 847,
};

export const statsDelta = {
  totalScenes: 8.2,
  processed: 12.4,
  cloudAvg: -3.1,
  reconstructed: 9.7,
  avgPSNR: 1.2,
  storageUsed: 5.6,
  accuracy: 0.3,
  throughput: 14.2,
};

export const pipeline = [
  { key: "ingestion", label: "Ingestion", count: 1455 },
  { key: "preprocess", label: "Pre-processing", count: 1208 },
  { key: "detection", label: "Cloud Detection", count: 982 },
  { key: "reconstruction", label: "Reconstruction", count: 764 },
  { key: "fusion", label: "Fusion", count: 612 },
  { key: "postprocess", label: "Post-processing", count: 487 },
  { key: "completed", label: "Completed", count: 10854 },
];

export const scenes: Scene[] = [
  { id: "SC-10247", name: "Brahmaputra_Valley_T44", date: "2026-06-26", cloudPct: 42.3, psnr: 33.21, status: "Completed", lat: 26.7, lng: 92.5, satellite: "LISS-IV MX", bands: "3B,2,1" },
  { id: "SC-10246", name: "Shillong_Plateau_E18", date: "2026-06-26", cloudPct: 68.1, psnr: 29.14, status: "Completed", lat: 25.57, lng: 91.88, satellite: "LISS-IV MONO", bands: "2" },
  { id: "SC-10245", name: "Kaziranga_NP_R02", date: "2026-06-26", cloudPct: 23.4, psnr: 35.67, status: "Processing", lat: 26.58, lng: 93.17, satellite: "LISS-IV MX", bands: "3B,2,1" },
  { id: "SC-10244", name: "Imphal_Basin_S07", date: "2026-06-25", cloudPct: 81.7, psnr: 0, status: "Failed", lat: 24.81, lng: 93.94, satellite: "LISS-IV MX", bands: "4,3B,2" },
  { id: "SC-10243", name: "Arunachal_NE_T55", date: "2026-06-25", cloudPct: 15.2, psnr: 36.89, status: "Completed", lat: 27.83, lng: 95.34, satellite: "LISS-IV MX", bands: "3B,2,1" },
  { id: "SC-10242", name: "Tripura_South_F19", date: "2026-06-25", cloudPct: 54.8, psnr: 31.42, status: "Completed", lat: 23.55, lng: 91.74, satellite: "LISS-IV MONO", bands: "2" },
  { id: "SC-10241", name: "Mizoram_Hills_Q88", date: "2026-06-24", cloudPct: 47.6, psnr: 32.05, status: "Processing", lat: 23.16, lng: 92.94, satellite: "LISS-IV MX", bands: "4,3B,2" },
  { id: "SC-10240", name: "Nagaland_Central_A12", date: "2026-06-24", cloudPct: 33.9, psnr: 34.18, status: "Completed", lat: 25.67, lng: 94.11, satellite: "LISS-IV MX", bands: "3B,2,1" },
  { id: "SC-10239", name: "Sikkim_North_X41", date: "2026-06-24", cloudPct: 72.5, psnr: 28.77, status: "In Queue", lat: 27.53, lng: 88.51, satellite: "LISS-IV MX", bands: "3B,2,1" },
  { id: "SC-10238", name: "Manas_Reserve_K33", date: "2026-06-23", cloudPct: 28.1, psnr: 35.02, status: "Completed", lat: 26.72, lng: 90.95, satellite: "LISS-IV MONO", bands: "2" },
];

export const qualityMetrics = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const psnr = 30 + Math.sin(i / 4) * 2 + (i / 30) * 3 + (Math.random() - 0.5);
  const ssim = 0.82 + Math.cos(i / 5) * 0.04 + (i / 30) * 0.05 + (Math.random() - 0.5) * 0.01;
  const rmse = 12 - Math.sin(i / 4) * 1.5 - (i / 30) * 2 + (Math.random() - 0.5) * 0.4;
  return {
    day: `D${day}`,
    PSNR: +psnr.toFixed(2),
    SSIM: +ssim.toFixed(3),
    RMSE: +rmse.toFixed(2),
  };
});

export const cloudDistribution = [
  { name: "0–20%", value: 28, fill: "var(--color-chart-2)" },
  { name: "20–40%", value: 31, fill: "var(--color-chart-1)" },
  { name: "40–60%", value: 22, fill: "var(--color-chart-3)" },
  { name: "60–80%", value: 13, fill: "var(--color-chart-4)" },
  { name: ">80%", value: 6, fill: "var(--color-chart-5)" },
];

export const systemHealth = [
  { name: "API Gateway", status: "operational" as const, detail: "142ms latency" },
  { name: "Database Cluster", status: "operational" as const, detail: "PostgreSQL · 8.4ms" },
  { name: "Object Storage", status: "operational" as const, detail: "S3 · 99.99% SLA" },
  { name: "GPU Worker 1", status: "operational" as const, detail: "A100 · 87% load" },
  { name: "GPU Worker 2", status: "degraded" as const, detail: "A100 · 96% load" },
  { name: "ML Pipeline", status: "operational" as const, detail: "PyTorch 2.3" },
  { name: "Queue Manager", status: "operational" as const, detail: "47 jobs pending" },
  { name: "Sentinel API", status: "operational" as const, detail: "ESA · Live feed" },
];

export const throughputData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  scenes: Math.floor(30 + Math.sin((i / 24) * Math.PI * 2) * 15 + Math.random() * 10),
  processed: Math.floor(25 + Math.sin((i / 24) * Math.PI * 2 + 0.5) * 12 + Math.random() * 8),
}));

export const notifications = [
  { id: 1, type: "success" as const, title: "Reconstruction batch B-2204 completed", time: "2m ago", detail: "10,854 scenes · 95.3% success" },
  { id: 2, type: "warning" as const, title: "GPU Worker 2 load above 95%", time: "14m ago", detail: "Consider scaling up workers" },
  { id: 3, type: "info" as const, title: "New ingestion: 24 LISS-IV scenes", time: "1h ago", detail: "Northeast India region" },
  { id: 4, type: "success" as const, title: "Model v3.2.1 deployed to production", time: "3h ago", detail: "U-Net cloud detection" },
];

export const satelliteOrbits = [
  { name: "LISS-IV-1", altitude: 508, inclination: 97.9, period: 94.2, status: "operational" as const, lat: 26.7, lng: 92.5 },
  { name: "LISS-IV-2", altitude: 509, inclination: 97.9, period: 94.3, status: "operational" as const, lat: 15.2, lng: 78.4 },
  { name: "LISS-IV-3", altitude: 507, inclination: 97.8, period: 94.1, status: "degraded" as const, lat: -5.3, lng: 115.2 },
];
