"use client";

import { useState } from "react";

export function ScenesTable() {
  const [queue] = useState([
    { id: "GV_LISS4_20260622_1030", aoi: "Arunachal Pradesh", task: "Cloud Removal", status: "In Progress", progress: 45, time: "10:31 AM" },
    { id: "GV_LISS4_20260622_0945", aoi: "Assam", task: "IR Enhancement", status: "Completed", progress: 100, time: "09:58 AM" },
    { id: "GV_LISS4_20260622_0915", aoi: "Meghalaya", task: "Cloud Removal", status: "Completed", progress: 100, time: "09:32 AM" },
    { id: "GV_LISS4_20260622_0840", aoi: "Nagaland", task: "Cloud Removal", status: "Running", progress: 70, time: "09:10 AM" },
    { id: "GV_LISS4_20260622_0810", aoi: "Manipur", task: "IR Enhancement", status: "Queued", progress: 0, time: "08:55 AM" },
  ]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#10b981]/10 border-[#10b981]/25 text-[#10b981]";
      case "In Progress":
        return "bg-[#3b82f6]/10 border-[#3b82f6]/25 text-[#3b82f6]";
      case "Running":
        return "bg-[#f59e0b]/10 border-[#f59e0b]/25 text-[#f59e0b]";
      default:
        return "bg-[#6b7280]/10 border-[#6b7280]/25 text-muted-foreground/80";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between h-full min-h-[300px]">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Recent Processing Queue</h3>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-border/80 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
              <th className="py-2 px-1">Scene ID</th>
              <th className="py-2 px-1">AOI</th>
              <th className="py-2 px-1">Task Type</th>
              <th className="py-2 px-1 text-center">Status</th>
              <th className="py-2 px-1">Progress</th>
              <th className="py-2 px-1 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-xs">
            {queue.map((row) => (
              <tr key={row.id} className="hover:bg-[#141924]/40 transition-colors group">
                <td className="py-2.5 px-1 font-mono font-semibold text-foreground">{row.id}</td>
                <td className="py-2.5 px-1 text-muted-foreground font-semibold">{row.aoi}</td>
                <td className="py-2.5 px-1 text-muted-foreground">{row.task}</td>
                <td className="py-2.5 px-1 text-center">
                  <span className={`inline-block rounded-md border px-2 py-0.5 text-[9px] font-bold ${getStatusStyle(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-2.5 px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] w-8">{row.progress}%</span>
                    <div className="h-1 w-16 rounded-full bg-[#10141d] overflow-hidden border border-border/40">
                      <div 
                        className={`h-full rounded-full ${
                          row.status === "Completed" 
                            ? "bg-[#10b981]" 
                            : row.status === "Running"
                            ? "bg-[#f59e0b]"
                            : "bg-[#3b82f6]"
                        }`}
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-1 text-right font-mono text-muted-foreground/60 text-[10px]">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button className="w-full flex items-center justify-center rounded-lg bg-[#141822] border border-border hover:bg-[#1b212f] hover:text-white px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all cursor-pointer">
          View All Queue
        </button>
      </div>
    </div>
  );
}
