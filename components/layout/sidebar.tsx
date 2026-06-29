"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Database, FileBarChart2,
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
      { title: "Dataset Explorer", url: "/data-manager", icon: Database },
      { title: "Results & Reports", url: "/results", icon: FileBarChart2 },
    ],
  },
  {
    label: "AI Models",
    items: [
      { title: "Cloud Detection", url: "/models/cloud-detection", icon: CloudOff },
      { title: "Gen Prediction", url: "/models/reconstruction", icon: Wand2 },
      { title: "Multi-Sensor Fusion", url: "/models/fusion", icon: Layers },
      { title: "Moisture Stress", url: "/models/manager", icon: Boxes },
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
        "relative flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out shrink-0",
        collapsed ? "w-[68px]" : "w-56"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center border-b border-sidebar-border transition-all",
        collapsed ? "justify-center px-0 py-5" : "gap-3 px-4 py-5"
      )}>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Satellite className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="text-sm font-bold leading-tight tracking-tight text-sidebar-foreground">LISS-IV AI</div>
            <div className="text-[10px] tracking-wider text-muted-foreground/70">Cloud Removal Platform</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 flex flex-col gap-6">
        {groups.map((g) => (
          <div key={g.label}>
            {!collapsed && (
              <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                {g.label}
              </div>
            )}
            <div className="flex flex-col gap-1">
              {g.items.map((item) => {
                const active = isActive(item.url);
                return (
                  <Link key={item.url} href={item.url}>
                    <div
                      className={cn(
                        "group flex items-center gap-3 rounded-xl transition-all duration-150 cursor-pointer relative",
                        collapsed ? "justify-center p-3" : "px-3 py-2.5",
                        active
                          ? "bg-primary/12 text-primary"
                          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      {/* Active indicator bar */}
                      {active && !collapsed && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary" />
                      )}

                      {/* Icon wrapper */}
                      <div className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
                        active
                          ? "bg-primary/15 text-primary shadow-sm"
                          : "text-muted-foreground group-hover:bg-sidebar-accent group-hover:text-sidebar-foreground"
                      )}>
                        <item.icon className="h-4 w-4" />
                      </div>

                      {!collapsed && (
                        <span className={cn(
                          "truncate text-sm font-medium",
                          active ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
                        )}>
                          {item.title}
                        </span>
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
          <div className="flex items-center gap-2 rounded-xl bg-success/8 border border-success/15 px-3 py-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-success">Live</p>
              <p className="text-[10px] text-muted-foreground">23 active jobs</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-14 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-all hover:text-foreground hover:border-primary/30 hover:bg-primary/5"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
  );
}