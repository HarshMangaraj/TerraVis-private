"use client";

import { Plus, FileText, Database, Monitor } from "lucide-react";

export function QuickActions() {
  const actions = [
    { title: "New Analysis", desc: "Select AOI and run new pipeline", icon: Plus },
    { title: "View Reports", desc: "Generate and download reports", icon: FileText },
    { title: "Data Library", desc: "Access archived datasets", icon: Database },
    { title: "System Monitor", desc: "Monitor system performance", icon: Monitor },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Quick Actions</h3>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-2">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button key={act.title} className="w-full flex items-center gap-3 rounded-lg border border-border/60 bg-[#0f131a] px-3 py-1.5 text-left hover:border-[#5b4bfb]/40 hover:bg-[#141924] transition-all cursor-pointer group">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-[#818cf8] group-hover:bg-indigo-600/20 transition-all">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-foreground leading-tight">{act.title}</p>
                <p className="text-[10px] text-muted-foreground truncate leading-none mt-0.5">{act.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
