"use client";

import { ResponsiveContainer, AreaChart, Area, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { qualityMetrics } from "@/lib/mock-data";
import { TrendingUp } from "lucide-react";

export function QualityChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Quality Metrics — Last 30 Days</h3>
          <p className="text-xs text-muted-foreground">PSNR, SSIM and RMSE across reconstruction pipeline</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-success/25 bg-success/8 px-2.5 py-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-success" />
          <span className="text-[11px] font-medium text-success">+1.2 dB avg</span>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <AreaChart data={qualityMetrics} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="psnrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.50 0.16 195)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="oklch(0.50 0.16 195)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ssimGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.52 0.17 150)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="oklch(0.52 0.17 150)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} opacity={0.6} />
            <XAxis
              dataKey="day"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={4}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 1]}
            />
            <Tooltip
              contentStyle={{
                background: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 10,
                fontSize: 12,
                color: "var(--color-foreground)",
                boxShadow: "0 8px 24px oklch(0 0 0 / 0.12)",
              }}
              labelStyle={{ color: "var(--color-foreground)", fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Area yAxisId="left" type="monotone" dataKey="PSNR" stroke="oklch(0.50 0.16 195)" strokeWidth={2} fill="url(#psnrGrad)" dot={false} activeDot={{ r: 4, fill: "oklch(0.50 0.16 195)" }} />
            <Area yAxisId="right" type="monotone" dataKey="SSIM" stroke="oklch(0.52 0.17 150)" strokeWidth={2} fill="url(#ssimGrad)" dot={false} activeDot={{ r: 4, fill: "oklch(0.52 0.17 150)" }} />
            <Line yAxisId="left" type="monotone" dataKey="RMSE" stroke="oklch(0.62 0.17 85)" strokeWidth={1.5} dot={false} strokeDasharray="4 2" activeDot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
