"use client";

import { Download, FileDown } from "lucide-react";

export function OutputDownloads() {
  const files = [
    { name: "Cloud-Free Image (GeoTIFF)", size: "45.2 MB" },
    { name: "Confidence Map (GeoTIFF)", size: "12.8 MB" },
    { name: "Cloud Mask (GeoTIFF)", size: "8.4 MB" },
    { name: "Land Cover (GeoTIFF)", size: "32.1 MB" },
    { name: "Detected Objects (Shapefile)", size: "4.7 MB" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Output & Downloads</h3>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-2.5">
        {files.map((f) => (
          <div key={f.name} className="flex items-center justify-between border-b border-border/40 pb-1.5 last:border-b-0 last:pb-0 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground truncate mr-2">
              <FileDown className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
              <span className="truncate">{f.name}</span>
            </div>
            <button className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#10141d] border border-border hover:bg-indigo-600/10 hover:text-[#818cf8] transition-colors cursor-pointer text-muted-foreground">
              <Download className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#5b4bfb] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
          <Download className="h-3.5 w-3.5" />
          <span>Download All</span>
        </button>
      </div>
    </div>
  );
}
