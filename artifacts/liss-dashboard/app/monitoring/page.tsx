import { Shell } from "@/components/layout/shell";
import { SystemHealth } from "@/components/dashboard/system-health";
import { ThroughputChart } from "@/components/dashboard/throughput-chart";

export default function Page() {
  return (
    <Shell title="Monitoring" subtitle="Real-time infrastructure and pipeline health">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <SystemHealth />
        <ThroughputChart />
      </div>
    </Shell>
  );
}
