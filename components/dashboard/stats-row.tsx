"use client";

import { Calendar, MapPin, Cloud, Cpu, CheckCircle2, Globe } from "lucide-react";

export function StatsRow() {
  const stats = [
    {
      label: "Active Satellite",
      value: "LISS-IV (ISRO)",
      sub: (
        <span className="flex items-center gap-1.5 mt-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-[#10b981] font-bold text-[9px] leading-none">Live Feed</span>
        </span>
      ),
      icon: Globe,
      color: "oklch(0.68 0.17 150)",
    },
    {
      label: "Latest Scene",
      value: "22 Jun 2026 | 10:30 AM",
      sub: "12 min ago",
      icon: Calendar,
      color: "oklch(0.53 0.21 275)",
    },
    {
      label: "AOI",
      value: "North East India",
      sub: "2,45,000 km²",
      icon: MapPin,
      color: "oklch(0.62 0.17 220)",
    },
    {
      label: "Cloud Coverage",
      value: "72%",
      sub: <span className="text-[#f59e0b] font-bold text-[9px]">High</span>,
      icon: Cloud,
      color: "oklch(0.75 0.17 80)",
    },
    {
      label: "Current Pipeline",
      value: "Cloud Removal",
      sub: <span className="text-[#3b82f6] font-bold text-[9px]">In Progress</span>,
      icon: Cpu,
      color: "oklch(0.62 0.17 220)",
    },
    {
      label: "Completed Today",
      value: "12 Scenes",
      sub: (
        <span className="flex items-center gap-1 mt-0.5">
          <span className="text-[#10b981] font-bold text-[9px]">8 Success</span>
          <span className="text-muted-foreground/60 text-[9px]">|</span>
          <span className="text-[#3b82f6] font-bold text-[9px]">4 Running</span>
        </span>
      ),
      icon: CheckCircle2,
      color: "oklch(0.68 0.17 150)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 w-full">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="relative overflow-hidden rounded-xl border border-border bg-[#10141d] p-3.5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md group flex flex-col justify-between min-h-[90px]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5 min-w-0 text-left">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <span className="text-[12px] font-bold text-foreground truncate mt-1 leading-tight">{stat.value}</span>
              </div>
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-[#141924] text-muted-foreground shadow-sm group-hover:scale-105 transition-transform"
              >
                <Icon className="h-3.5 w-3.5" style={{ color: stat.color }} />
              </div>
            </div>
            <div className="text-[9px] text-muted-foreground mt-2 leading-none text-left">
              {typeof stat.sub === "string" ? stat.sub : stat.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
