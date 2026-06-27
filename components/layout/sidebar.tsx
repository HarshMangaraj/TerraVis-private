"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Database, Cpu, FileBarChart2, GitCompare, FileText,
  CloudOff, Wand2, Layers, Boxes, Activity, Settings, Satellite,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Data Manager", url: "/data-manager", icon: Database },
      { title: "Processing", url: "/processing", icon: Cpu },
      { title: "Results", url: "/results", icon: FileBarChart2 },
      { title: "Comparison", url: "/comparison", icon: GitCompare },
      { title: "Reports", url: "/reports", icon: FileText },
    ],
  },
  {
    label: "AI Models",
    items: [
      { title: "Cloud Detection", url: "/models/cloud-detection", icon: CloudOff },
      { title: "Reconstruction", url: "/models/reconstruction", icon: Wand2 },
      { title: "Fusion", url: "/models/fusion", icon: Layers },
      { title: "Model Manager", url: "/models/manager", icon: Boxes },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Monitoring", url: "/monitoring", icon: Activity },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isActive = (url: string) => url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out shrink-0 shadow-sm",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center border-b border-sidebar-border px-3 py-4 transition-all",
        collapsed ? "justify-center" : "gap-3"
      )}>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Satellite className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="text-sm font-semibold leading-tight tracking-tight text-sidebar-foreground">LISS-IV AI</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cloud Removal</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-3">
        {groups.map((g) => (
          <div key={g.label} className="mb-4">
            {!collapsed && (
              <div className="mb-1 px-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                {g.label}
              </div>
            )}
            <div className="flex flex-col gap-0.5 px-2">
              {g.items.map((item) => {
                const active = isActive(item.url);
                return (
                  <Link key={item.url} href={item.url}>
                    <div
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-all duration-150 cursor-pointer",
                        active
                          ? "bg-primary/10 text-primary shadow-sm border border-primary/15"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        collapsed && "justify-center px-0"
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          active ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
                        )}
                      />
                      {!collapsed && (
                        <span className="truncate font-medium">{item.title}</span>
                      )}
                      {active && !collapsed && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Live status */}
      {!collapsed && (
        <div className="border-t border-sidebar-border px-3 py-3">
          <div className="flex items-center gap-2 rounded-lg bg-success/8 border border-success/15 px-3 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-[11px] text-muted-foreground">
              Live · <span className="text-success font-medium">23 active jobs</span>
            </span>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-14 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-colors hover:text-foreground hover:border-primary/30"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
  );
}
