import { Shell } from "@/components/layout/shell";
import { ScenesTable } from "@/components/dashboard/scenes-table";
import { QualityChart } from "@/components/dashboard/quality-chart";

export default function Page() {
  return (
    <Shell title="Results" subtitle="Browse and download reconstruction results">
      <div className="flex flex-col gap-5">
        <QualityChart />
        <ScenesTable />
      </div>
    </Shell>
  );
}
