"use client";

import { Route, Waves, Building, Landmark, Droplet, Leaf } from "lucide-react";

export function DetectedObjects() {
  const objects = [
    { label: "Roads", value: "128 km", icon: Route },
    { label: "Rivers", value: "34", icon: Waves },
    { label: "Buildings", value: "512", icon: Building },
    { label: "Bridges", value: "18", icon: Landmark },
    { label: "Water Bodies", value: "27", icon: Droplet },
    { label: "Vegetation Area", value: "68%", icon: Leaf },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Detected Objects</h3>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-2.5">
        {objects.map((o) => {
          const Icon = o.icon;
          return (
            <div key={o.label} className="flex items-center justify-between border-b border-border/40 pb-1.5 last:border-b-0 last:pb-0 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-muted-foreground/80" />
                <span>{o.label}</span>
              </div>
              <span className="font-semibold text-foreground font-mono">{o.value}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <button className="w-full flex items-center justify-center rounded-lg bg-[#5b4bfb] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
}
