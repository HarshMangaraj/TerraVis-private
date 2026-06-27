import { Download, ZoomIn } from "lucide-react";
import Image from "next/image";

const SATELLITE_IMAGES = [
  {
    title: "Cloudy LISS-IV",
    badge: "INPUT",
    badgeClass: "bg-muted text-muted-foreground border border-border",
    subtitle: "Original capture · 42.3% cloud cover",
    url: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=400&h=400&fit=crop&auto=format",
  },
  {
    title: "Cloud Mask (U-Net)",
    badge: "MASK",
    badgeClass: "bg-primary/10 text-primary border border-primary/25",
    subtitle: "Binary segmentation · IoU 0.94",
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop&auto=format",
  },
  {
    title: "Reconstructed",
    badge: "OUTPUT",
    badgeClass: "bg-success/10 text-success border border-success/25",
    subtitle: "Cloud-free output · PSNR 33.21 dB",
    url: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop&auto=format",
  },
];

export function BeforeAfter() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Before / After Preview</h3>
          <p className="text-xs text-muted-foreground">Scene SC-10247 · Brahmaputra Valley · 26 Jun 2026</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <ZoomIn className="h-3 w-3" />
            View Full
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Download className="h-3 w-3" />
            Export
          </button>
        </div>
      </div>

      <div className="flex items-stretch gap-3">
        {SATELLITE_IMAGES.map((img, i) => (
          <div key={i} className="flex flex-1 flex-col gap-2 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">{img.title}</span>
              <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${img.badgeClass}`}>{img.badge}</span>
            </div>

            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border group cursor-pointer shadow-sm">
              <img
                src={img.url}
                alt={img.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="h-6 w-6 text-white" />
              </div>
            </div>

            <span className="text-[11px] text-muted-foreground leading-tight">{img.subtitle}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-muted/40 border border-border/60 px-3 py-2">
        {[
          ["Sensor", "LISS-IV MX"],
          ["Resolution", "5.8m"],
          ["Bands", "3B, 2, 1"],
          ["Date", "26 Jun 2026"],
          ["Orbit", "44,827"],
          ["Model", "U-Net v3.2"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5 text-[11px]">
            <span className="text-muted-foreground">{k}:</span>
            <span className="font-medium text-foreground">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
