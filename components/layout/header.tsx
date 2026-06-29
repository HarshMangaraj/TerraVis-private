"use client";

import { Bell, Search, RefreshCw, Download } from "lucide-react";
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
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-5 backdrop-blur-sm shadow-sm">
      <div className="flex flex-col">
        <h1 className="text-sm font-semibold text-foreground leading-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 rounded-lg bg-muted/70 border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
          <Search className="h-3.5 w-3.5" />
          <span>Search scenes...</span>
          <kbd className="rounded border border-border bg-background px-1 py-0.5 text-[10px] font-mono">⌘K</kbd>
        </div>

        {/* Refresh */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>

        {/* Export */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Download className="h-3.5 w-3.5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-10 z-50 w-80 rounded-xl border border-border bg-popover shadow-xl">
              <div className="border-b border-border px-4 py-3">
                <div className="text-sm font-semibold">Notifications</div>
                <div className="text-[11px] text-muted-foreground">{notifications.length} recent events</div>
              </div>
              <div className="py-1">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer">
                    <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", typeIcon[n.type] || "bg-muted-foreground")} />
                    <div className="min-w-0 flex-1">
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

        {/* Avatar */}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white shadow-sm"
          style={{ background: "var(--gradient-primary)" }}
        >
          LA
        </div>
      </div>
    </header>
  );
}
