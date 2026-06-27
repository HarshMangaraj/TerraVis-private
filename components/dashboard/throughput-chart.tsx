"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { throughputData } from "@/lib/mock-data";
import { Activity } from "lucide-react";

export function ThroughputChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">24h Throughput</h3>
          <p className="text-xs text-muted-foreground">Scenes ingested vs processed per hour</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/15">
          <Activity className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer>
          <BarChart data={throughputData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }} barGap={2}>
            <defs>
              <linearGradient id="ingestGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.50 0.16 195)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="oklch(0.50 0.16 195)" stopOpacity={0.5} />
              </linearGradient>
              <linearGradient id="procGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.52 0.17 150)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="oklch(0.52 0.17 150)" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} opacity={0.6} />
            <XAxis
              dataKey="hour"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              interval={5}
            />
            <YAxis
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 11,
                color: "var(--color-foreground)",
                boxShadow: "0 4px 12px oklch(0 0 0 / 0.1)",
              }}
              cursor={{ fill: "oklch(0.50 0.16 195 / 0.05)" }}
            />
            <Bar dataKey="scenes" name="Ingested" fill="url(#ingestGrad)" radius={[3, 3, 0, 0]} maxBarSize={10} />
            <Bar dataKey="processed" name="Processed" fill="url(#procGrad)" radius={[3, 3, 0, 0]} maxBarSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
