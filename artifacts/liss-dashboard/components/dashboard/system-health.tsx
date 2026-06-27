import { systemHealth } from "@/lib/mock-data";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function SystemHealth() {
  const allGood = systemHealth.every((s) => s.status === "operational");

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">System Health</h3>
          <p className="text-xs text-muted-foreground">Real-time infrastructure status</p>
        </div>
        <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${allGood ? "bg-success/10 text-success border border-success/20" : "bg-warning/10 text-warning border border-warning/20"}`}>
          {allGood ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5" />
          )}
          {allGood ? "All Operational" : "Degraded"}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {systemHealth.map((s) => {
          const isOp = s.status === "operational";
          const color = isOp ? "var(--color-success)" : "var(--color-warning)";
          return (
            <div
              key={s.name}
              className="group flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  {isOp && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40" style={{ background: color }} />}
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                </span>
                <span className="text-sm font-medium text-foreground">{s.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground">{s.detail}</span>
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${isOp ? "bg-success/12 text-success border border-success/20" : "bg-warning/12 text-warning border border-warning/20"}`}>
                  {isOp ? "OK" : "WARN"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-muted-foreground">30-day uptime</span>
          <span className="text-xs font-bold text-success">99.94%</span>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: 6,
                background: i === 14 ? "var(--color-warning)" : "var(--color-success)",
                opacity: 0.5 + (i / 30) * 0.5,
              }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground/60">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
