import { Shell } from "@/components/layout/shell";
import { StatsRow } from "@/components/dashboard/stats-row";
import { PipelinePanel } from "@/components/dashboard/pipeline";
import { EarthHero } from "@/components/dashboard/earth-hero";
import { BeforeAfter } from "@/components/dashboard/before-after";
import { CloudDonut } from "@/components/dashboard/cloud-donut";
import { QualityChart } from "@/components/dashboard/quality-chart";
import { SystemHealth } from "@/components/dashboard/system-health";
import { ScenesTable } from "@/components/dashboard/scenes-table";
import { MapPanel } from "@/components/dashboard/map-panel";
import { ThroughputChart } from "@/components/dashboard/throughput-chart";

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
