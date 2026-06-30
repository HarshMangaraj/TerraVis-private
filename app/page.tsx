"use client";

import dynamic from "next/dynamic";
import { Shell } from "@/components/layout/shell";

// Skeleton shown while any widget is hydrating
const WidgetPlaceholder = ({ height }: { height: number }) => (
  <div
    className="flex w-full items-center justify-center rounded-xl border border-border bg-card shadow-sm animate-pulse"
    style={{ height }}
  >
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent opacity-40" />
  </div>
);

// ── All dashboard widgets are dynamically imported with ssr:false ──────────────
// This prevents canvas / DOM / useEffect code from running during SSR,
// which was the cause of the "page.js ENOENT" compilation crash.

const StatsRow = dynamic(
  () => import("@/components/dashboard/stats-row").then((m) => m.StatsRow),
  { ssr: false, loading: () => <WidgetPlaceholder height={96} /> }
);

const MapPanel = dynamic(
  () => import("@/components/dashboard/map-panel").then((m) => m.MapPanel),
  { ssr: false, loading: () => <WidgetPlaceholder height={430} /> }
);

const PipelinePanel = dynamic(
  () => import("@/components/dashboard/pipeline").then((m) => m.PipelinePanel),
  { ssr: false, loading: () => <WidgetPlaceholder height={430} /> }
);

const BeforeAfter = dynamic(
  () => import("@/components/dashboard/before-after").then((m) => m.BeforeAfter),
  { ssr: false, loading: () => <WidgetPlaceholder height={400} /> }
);

const ConfidenceMap = dynamic(
  () => import("@/components/dashboard/confidence-map").then((m) => m.ConfidenceMap),
  { ssr: false, loading: () => <WidgetPlaceholder height={300} /> }
);

const ScientificValidation = dynamic(
  () => import("@/components/dashboard/scientific-validation").then((m) => m.ScientificValidation),
  { ssr: false, loading: () => <WidgetPlaceholder height={300} /> }
);

const DetectedObjects = dynamic(
  () => import("@/components/dashboard/detected-objects").then((m) => m.DetectedObjects),
  { ssr: false, loading: () => <WidgetPlaceholder height={300} /> }
);

const ScenesTable = dynamic(
  () => import("@/components/dashboard/scenes-table").then((m) => m.ScenesTable),
  { ssr: false, loading: () => <WidgetPlaceholder height={300} /> }
);

const AIAgentsStatus = dynamic(
  () => import("@/components/dashboard/agents-status").then((m) => m.AIAgentsStatus),
  { ssr: false, loading: () => <WidgetPlaceholder height={300} /> }
);

const QuickActions = dynamic(
  () => import("@/components/dashboard/quick-actions").then((m) => m.QuickActions),
  { ssr: false, loading: () => <WidgetPlaceholder height={300} /> }
);

const OutputDownloads = dynamic(
  () => import("@/components/dashboard/output-downloads").then((m) => m.OutputDownloads),
  { ssr: false, loading: () => <WidgetPlaceholder height={300} /> }
);

// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <Shell
      title="LISS-IV AI Platform"
      subtitle="Cloud removal · Reconstruction · Real-time monitoring"
    >
      <div className="flex flex-col gap-5 w-full">
        {/* Top metrics row */}
        <StatsRow />

        {/* Map + Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
          <div className="lg:col-span-8 w-full">
            <MapPanel />
          </div>
          <div className="lg:col-span-4 w-full">
            <PipelinePanel />
          </div>
        </div>

        {/* Result preview + analytics widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 w-full">
          <div className="lg:col-span-5 w-full">
            <BeforeAfter />
          </div>
          <div className="lg:col-span-2 w-full">
            <ConfidenceMap />
          </div>
          <div className="lg:col-span-2 w-full">
            <ScientificValidation />
          </div>
          <div className="lg:col-span-3 w-full">
            <DetectedObjects />
          </div>
        </div>

        {/* Queue + agents + actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 w-full">
          <div className="lg:col-span-4 w-full">
            <ScenesTable />
          </div>
          <div className="lg:col-span-3 w-full">
            <AIAgentsStatus />
          </div>
          <div className="lg:col-span-2 w-full">
            <QuickActions />
          </div>
          <div className="lg:col-span-3 w-full">
            <OutputDownloads />
          </div>
        </div>
      </div>
    </Shell>
  );
}

