import { scenes, type SceneStatus } from "@/lib/mock-data";
import { ChevronRight, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<SceneStatus, string> = {
  Completed: "bg-success/12 text-success border-success/25",
  Processing: "bg-primary/12 text-primary border-primary/25",
  Failed: "bg-destructive/12 text-destructive border-destructive/25",
  "In Queue": "bg-muted text-muted-foreground border-border",
};

const STATUS_DOT: Record<SceneStatus, string> = {
  Completed: "bg-success",
  Processing: "bg-primary animate-pulse",
  Failed: "bg-destructive",
  "In Queue": "bg-muted-foreground",
};

export function ScenesTable() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Scenes</h3>
          <p className="text-xs text-muted-foreground">Latest LISS-IV captures · Northeast India</p>
        </div>
        <button className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          View All <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/60">
              {["Scene ID", "Name", "Date", "Cloud %", "PSNR (dB)", "Satellite", "Status"].map((col) => (
                <th key={col} className="pb-2.5 pr-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {col}
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scenes.map((s) => (
              <tr
                key={s.id}
                className="group border-b border-border/30 transition-colors hover:bg-muted/30 cursor-pointer"
              >
                <td className="py-2.5 pr-3 font-mono font-semibold text-primary whitespace-nowrap">
                  {s.id}
                </td>
                <td className="py-2.5 pr-3 text-foreground max-w-36 truncate" title={s.name}>
                  {s.name}
                </td>
                <td className="py-2.5 pr-3 text-muted-foreground whitespace-nowrap">{s.date}</td>
                <td className="py-2.5 pr-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${s.cloudPct}%`,
                          background: s.cloudPct > 60
                            ? "var(--color-destructive)"
                            : s.cloudPct > 40
                            ? "var(--color-warning)"
                            : "var(--color-success)",
                        }}
                      />
                    </div>
                    <span className="tabular-nums text-foreground">{s.cloudPct}%</span>
                  </div>
                </td>
                <td className="py-2.5 pr-3 tabular-nums whitespace-nowrap">
                  {s.psnr > 0 ? (
                    <span className={s.psnr > 33 ? "text-success font-semibold" : s.psnr > 30 ? "text-foreground" : "text-warning"}>
                      {s.psnr.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="py-2.5 pr-3 text-muted-foreground whitespace-nowrap text-[11px]">
                  {s.satellite}
                </td>
                <td className="py-2.5">
                  <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-semibold", STATUS_STYLE[s.status])}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[s.status])} />
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
