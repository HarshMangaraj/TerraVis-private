"use client";

import dynamic from "next/dynamic";
import { Shell } from "@/components/layout/shell";
import { StatsRow } from "@/components/dashboard/stats-row";
import { PipelinePanel } from "@/components/dashboard/pipeline";
import { SystemHealth } from "@/components/dashboard/system-health";
import { ScenesTable } from "@/components/dashboard/scenes-table";

// Optimized Skeleton Loader to keep layouts visually stable during hydration
const WidgetPlaceholder = ({ height }: { height: number }) => (
  <div 
    className="flex w-full items-center justify-center rounded-xl border border-border bg-card shadow-sm animate-pulse" 
    style={{ height }}
  >
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent opacity-40" />
  </div>
);

// Dynamically import resource-intensive client-only components
const EarthHero = dynamic(() => import("@/components/dashboard/earth-hero").then((m) => m.EarthHero), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={380} />,
});

const MapPanel = dynamic(() => import("@/components/dashboard/map-panel").then((m) => m.MapPanel), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={380} />,
});

const BeforeAfter = dynamic(() => import("@/components/dashboard/before-after").then((m) => m.BeforeAfter), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={420} />,
});

const CloudDonut = dynamic(() => import("@/components/dashboard/cloud-donut").then((m) => m.CloudDonut), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={420} />,
});

const QualityChart = dynamic(() => import("@/components/dashboard/quality-chart").then((m) => m.QualityChart), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={320} />,
});

const ThroughputChart = dynamic(() => import("@/components/dashboard/throughput-chart").then((m) => m.ThroughputChart), {
  ssr: false,
  loading: () => <WidgetPlaceholder height={320} />,
});

export default function DashboardPage() {
  return (
    <Shell
      title="LISS-IV AI Platform"
      subtitle="Cloud removal · Reconstruction · Real-time monitoring"
    >
      <div className="flex flex-col gap-5">
        <StatsRow />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
          <div className="xl:col-span-3" style={{ height: 380 }}>
            <EarthHero />
          </div>
          <div className="xl:col-span-2">
            <MapPanel />
          </div>
        </div>

        <PipelinePanel />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <BeforeAfter />
          </div>
          <CloudDonut />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <QualityChart />
          </div>
          <SystemHealth />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ScenesTable />
          </div>
          <ThroughputChart />
        </div>
      </div>
    </Shell>
  );
}
