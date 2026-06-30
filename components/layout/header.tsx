"use client";

import { Bell, Search, RefreshCw, Download, Settings, Sun, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { useLayoutContext } from "./context";

export function Header() {
  const { title, subtitle } = useLayoutContext();
  const [showNotifs, setShowNotifs] = useState(false);

  const typeIcon: Record<string, string> = {
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
    error: "bg-destructive",
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/65 px-5 backdrop-blur-md shadow-sm z-30">
      {/* Left: Dropdown Trigger */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-[#141822] border border-border/80 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-[#1b212f] transition-all cursor-pointer">
          <span className="h-4 w-4 flex items-center justify-center text-sm">🌐</span>
          <span className="font-semibold">Dashboard</span>
          <ChevronDown className="h-3 w-3.5 text-muted-foreground" />
        </button>
      </div>

      {/* Middle: Live System Health Badges */}
      <div className="hidden lg:flex items-center gap-3">
        {/* LISS-IV Badge */}
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-[#0f131a] px-3 py-1 text-[11px] shadow-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#182030] text-[#818cf8] text-xs">
            🛰️
          </div>
          <div className="text-left">
            <div className="text-[9px] font-medium text-muted-foreground leading-none">LISS-IV</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-semibold text-[#10b981] text-[10px] leading-none">Live</span>
            </div>
          </div>
        </div>

        {/* GPU Cluster Badge */}
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-[#0f131a] px-3 py-1 text-[11px] shadow-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#182030] text-[#818cf8] text-xs">
            💻
          </div>
          <div className="text-left">
            <div className="text-[9px] font-medium text-muted-foreground leading-none">GPU Cluster</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
              <span className="font-semibold text-[#10b981] text-[10px] leading-none">Active</span>
            </div>
          </div>
        </div>

        {/* System Status Badge */}
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-[#0f131a] px-3 py-1 text-[11px] shadow-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#182030] text-[#818cf8] text-xs">
            ⚙️
          </div>
          <div className="text-left">
            <div className="text-[9px] font-medium text-muted-foreground leading-none">System Status</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
              <span className="font-semibold text-[#10b981] text-[10px] leading-none">Healthy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Controls & Profile */}
      <div className="flex items-center gap-2.5">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-10 z-50 w-80 rounded-xl border border-border bg-popover shadow-xl">
              <div className="border-b border-border px-4 py-3 bg-muted/20">
                <div className="text-sm font-semibold">Notifications</div>
                <div className="text-[11px] text-muted-foreground">{notifications.length} recent events</div>
              </div>
              <div className="py-1 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-accent/30 transition-colors cursor-pointer">
                    <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", typeIcon[n.type] || "bg-muted-foreground")} />
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-xs font-medium leading-tight">{n.title}</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">{n.detail}</div>
                      <div className="mt-1 text-[10px] text-muted-foreground/60">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
          <Settings className="h-4 w-4" />
        </button>

        {/* Help */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Brightness Switch */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
          <Sun className="h-4 w-4" />
        </button>

        <div className="h-4 w-px bg-border/80 mx-1" />

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-foreground leading-tight">ISRO Scientist</div>
            <div className="text-[9px] text-muted-foreground leading-none">Security Lvl: 4</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5b4bfb] font-bold text-white text-[11px] shadow-sm border border-indigo-500/20">
            IS
          </div>
        </div>
      </div>
    </header>
  );
}
