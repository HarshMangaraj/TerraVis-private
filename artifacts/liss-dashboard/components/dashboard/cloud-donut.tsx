"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { cloudDistribution } from "@/lib/mock-data";
import { Cloud } from "lucide-react";

const FILLS = [
  "oklch(0.52 0.17 150)",
  "oklch(0.50 0.16 195)",
  "oklch(0.62 0.17 85)",
  "oklch(0.52 0.17 265)",
  "oklch(0.56 0.22 25)",
];

export function CloudDonut() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Cloud Cover Distribution</h3>
          <p className="text-xs text-muted-foreground">Across last 30 days of captures</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/15">
          <Cloud className="h-4 w-4 text-primary" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative h-44 w-44 shrink-0">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={cloudDistribution.map((d, i) => ({ ...d, fill: FILLS[i] }))}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={3}
                strokeWidth={0}
              >
                {cloudDistribution.map((_, i) => (
                  <Cell key={i} fill={FILLS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "var(--color-foreground)",
                  boxShadow: "0 4px 12px oklch(0 0 0 / 0.12)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-foreground">38.7%</span>
            <span className="text-[10px] text-muted-foreground">avg cover</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {cloudDistribution.map((d, i) => (
            <div key={d.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: FILLS[i] }} />
                <span className="text-xs text-muted-foreground">{d.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${d.value}%`, background: FILLS[i] }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-semibold tabular-nums text-foreground">{d.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
