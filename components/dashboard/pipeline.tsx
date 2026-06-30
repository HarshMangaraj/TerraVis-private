"use client";

import { CheckCircle2 } from "lucide-react";

export function PipelinePanel() {
  const steps = [
    { id: 1, label: "Data Acquisition", status: "Completed", time: "10:30:11 AM" },
    { id: 2, label: "Cloud Detection", status: "Completed", time: "10:30:45 AM" },
    { id: 3, label: "Multi-modal Fusion", status: "In Progress", time: "10:31:10 AM" },
    { id: 4, label: "AI Reconstruction", status: "Pending", time: "--:--:--" },
    { id: 5, label: "Validation & QC", status: "Pending", time: "--:--:--" },
    { id: 6, label: "Output Generation", status: "Pending", time: "--:--:--" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm h-full flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-semibold text-foreground">AI Processing Pipeline</h3>
        <p className="text-[11px] text-muted-foreground font-mono mt-0.5">Scene ID: GV_LISS4_20260622_1030</p>
      </div>

      {/* Stepper container */}
      <div className="relative flex-1 flex flex-col justify-between my-5 pl-2">
        {/* Connecting Vertical Line */}
        <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-border/80 z-0" />
        
        {/* In-progress glowing line segment */}
        <div className="absolute left-[17px] top-3 h-[42%] w-0.5 bg-gradient-to-b from-[#10b981] to-[#3b82f6] z-0" />

        {steps.map((s) => {
          const isCompleted = s.status === "Completed";
          const isInProgress = s.status === "In Progress";
          const isPending = s.status === "Pending";

          return (
            <div key={s.id} className="relative flex items-center justify-between z-10 py-1">
              <div className="flex items-center gap-3">
                {/* Node icon indicator */}
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0a0d14]">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#10b981] fill-[#10b981]/10" />
                  ) : isInProgress ? (
                    <span className="relative flex h-3 w-3 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3b82f6] opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3b82f6]" />
                    </span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1c2333] border border-border/80" />
                  )}
                </div>

                <span className={`text-xs font-semibold ${isCompleted ? "text-muted-foreground" : isInProgress ? "text-foreground font-bold" : "text-muted-foreground/60"}`}>
                  {s.id}. {s.label}
                </span>
              </div>

              <div className="text-right flex items-center gap-2">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${
                  isCompleted 
                    ? "bg-[#10b981]/5 border-[#10b981]/15 text-[#10b981]" 
                    : isInProgress 
                    ? "bg-[#3b82f6]/5 border-[#3b82f6]/15 text-[#3b82f6] animate-pulse" 
                    : "bg-[#1c2333]/30 border-border/50 text-muted-foreground/40"
                }`}>
                  {s.status}
                </span>
                <span className="text-[9px] font-mono text-muted-foreground/50 w-16">{s.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="border-t border-border/85 pt-3">
        <div className="flex justify-between text-[11px] font-semibold text-foreground mb-1.5">
          <span>Overall Progress</span>
          <span className="font-bold text-indigo-400">45%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#10141d] overflow-hidden border border-border/60">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-[#5b4bfb] to-[#818cf8] shadow-[0_0_8px_rgba(91,75,251,0.5)] transition-all duration-1000 ease-out" 
            style={{ width: "45%" }}
          />
        </div>
      </div>
    </div>
  );
}
