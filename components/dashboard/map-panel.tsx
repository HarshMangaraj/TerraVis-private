"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, Plus, Minus, Compass, Layers, Edit2, Target } from "lucide-react";

// Constants for map dimensions and tile math
const TILE_SIZE = 256;
const INITIAL_ZOOM = 8;
const MIN_ZOOM = 6;
const MAX_ZOOM = 14;
const WORLD_SIZE = 256;

// Northeast India center coordinates
const CENTER_LAT = 26.2006;
const CENTER_LNG = 92.9376;

export function MapPanel({
  externalSelectedCoord,
  onClearExternalCoord,
}: {
  externalSelectedCoord?: { lat: number; lng: number } | null;
  onClearExternalCoord?: () => void;
} = {}) {
  const [layers, setLayers] = useState({
    lissIv: true,
    sentinel1: true,
    cloudMask: true,
    aoiBoundary: true,
    roads: true,
    rivers: true,
    dem: false,
    landCover: false,
  });

  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [center, setCenter] = useState({ x: CENTER_LNG, y: CENTER_LAT });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Convert lat/lng to pixel coordinates
  const latLngToPixel = useCallback((lat: number, lng: number, zoom: number) => {
    const scale = Math.pow(2, zoom);
    const worldSize = TILE_SIZE * scale;
    
    const x = ((lng + 180) / 360) * worldSize;
    const latRad = (lat * Math.PI) / 180;
    const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * worldSize;
    
    return { x, y };
  }, []);

  // Convert pixel coordinates to lat/lng
  const pixelToLatLng = useCallback((px: number, py: number, zoom: number) => {
    const scale = Math.pow(2, zoom);
    const worldSize = TILE_SIZE * scale;
    
    const lng = (px / worldSize) * 360 - 180;
    const n = Math.PI - (2 * Math.PI * py) / worldSize;
    const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
    
    return { lat, lng };
  }, []);

  // Generate tile URLs
  const getTileUrl = useCallback((x: number, y: number, z: number) => {
    // ESRI World Imagery (high quality satellite)
    return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
  }, []);

  // Handle zoom
  const handleZoom = useCallback((delta: number, mouseX?: number, mouseY?: number) => {
    setZoom(prev => {
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta));
      return newZoom;
    });
  }, []);

  // Handle mouse wheel for zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    handleZoom(delta);
  }, [handleZoom]);

  // Handle mouse down for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      setDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, []);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    if (dragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      const scale = Math.pow(2, zoom);
      const worldSize = TILE_SIZE * scale;
      const containerWidth = containerRef.current?.clientWidth || 400;
      const containerHeight = containerRef.current?.clientHeight || 430;
      
      const pixelDx = (dx / containerWidth) * worldSize;
      const pixelDy = (dy / containerHeight) * worldSize;
      
      setCenter(prev => {
        const currentPixel = latLngToPixel(prev.y, prev.x, zoom);
        const newPixel = {
          x: currentPixel.x - pixelDx,
          y: currentPixel.y - pixelDy
        };
        const newLatLng = pixelToLatLng(newPixel.x, newPixel.y, zoom);
        return { x: newLatLng.lng, y: newLatLng.lat };
      });
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [dragging, dragStart, zoom, latLngToPixel, pixelToLatLng]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  // Calculate visible tiles
  const getVisibleTiles = useCallback(() => {
    if (!containerRef.current) return [];
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    const centerPixel = latLngToPixel(center.y, center.x, zoom);
    
    const tilesX = Math.ceil(containerWidth / TILE_SIZE) + 2;
    const tilesY = Math.ceil(containerHeight / TILE_SIZE) + 2;
    
    const centerTileX = Math.floor(centerPixel.x / TILE_SIZE);
    const centerTileY = Math.floor(centerPixel.y / TILE_SIZE);
    
    const tiles = [];
    
    for (let dx = -Math.floor(tilesX / 2); dx <= Math.floor(tilesX / 2); dx++) {
      for (let dy = -Math.floor(tilesY / 2); dy <= Math.floor(tilesY / 2); dy++) {
        const tileX = centerTileX + dx;
        const tileY = centerTileY + dy;
        
        if (tileX >= 0 && tileX < Math.pow(2, zoom) && tileY >= 0 && tileY < Math.pow(2, zoom)) {
          const tilePixelX = tileX * TILE_SIZE - centerPixel.x + containerWidth / 2;
          const tilePixelY = tileY * TILE_SIZE - centerPixel.y + containerHeight / 2;
          
          tiles.push({
            x: tileX,
            y: tileY,
            z: zoom,
            url: getTileUrl(tileX, tileY, zoom),
            pixelX: tilePixelX,
            pixelY: tilePixelY
          });
        }
      }
    }
    
    return tiles;
  }, [center, zoom, latLngToPixel, getTileUrl]);

  const visibleTiles = getVisibleTiles();

  const toggleLayer = (key: keyof typeof layers) =>
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));

  const currentPixel = latLngToPixel(CENTER_LAT, CENTER_LNG, zoom);

  return (
    <div className="relative w-full h-[430px] rounded-xl border border-border overflow-hidden bg-[#07090e] shadow-sm group">
      {/* Real Tiled Map */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ userSelect: 'none' }}
      >
        {visibleTiles.map((tile, index) => (
          <img
            key={`${tile.z}-${tile.x}-${tile.y}-${index}`}
            src={tile.url}
            alt={`Map tile ${tile.x},${tile.y}`}
            className="absolute"
            style={{
              left: `${tile.pixelX}px`,
              top: `${tile.pixelY}px`,
              width: `${TILE_SIZE}px`,
              height: `${TILE_SIZE}px`,
              opacity: layers.lissIv ? 1 : 0.4,
              imageRendering: 'auto'
            }}
            draggable={false}
            onError={(e) => {
              // Fallback to OSM tiles if ESRI fails
              const target = e.target as HTMLImageElement;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = `https://tile.openstreetmap.org/${tile.z}/${tile.x}/${tile.y}.png`;
              }
            }}
          />
        ))}
      </div>

      {/* Dark vignette gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(7,9,14,0.45) 100%)",
        }}
      />

      {/* GIS SVG Overlays */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* AOI Polygon — Northeast India region */}
        {layers.aoiBoundary && (
          <>
            <path
              d="M 22,18 L 44,13 L 72,22 L 84,42 L 78,72 L 54,78 L 32,68 L 18,48 Z"
              fill="rgba(16, 185, 129, 0.07)"
              stroke="#10b981"
              strokeWidth="0.7"
              strokeDasharray="3,1.5"
              className="drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]"
            />
            {[
              [22, 18], [44, 13], [72, 22], [84, 42],
              [78, 72], [54, 78], [32, 68], [18, 48],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="0.9"
                fill="#10b981"
                opacity="0.9"
              />
            ))}
          </>
        )}

        {/* Brahmaputra + tributaries */}
        {layers.rivers && (
          <g
            stroke="#38bdf8"
            fill="none"
            opacity="0.75"
            className="drop-shadow-[0_0_3px_rgba(56,189,248,0.5)]"
          >
            <path d="M 18,48 Q 28,52 38,44 T 58,62 T 80,70" strokeWidth="0.5" />
            <path d="M 34,16 Q 42,28 54,34 T 74,24" strokeWidth="0.3" />
            <path d="M 50,38 Q 54,52 56,78" strokeWidth="0.22" />
            <path d="M 38,44 Q 35,55 30,65" strokeWidth="0.22" />
          </g>
        )}

        {/* Highway network */}
        {layers.roads && (
          <g stroke="#f87171" strokeWidth="0.25" fill="none" opacity="0.7">
            <path d="M 22,18 L 80,70" />
            <path d="M 18,48 L 84,42" />
            <path d="M 54,14 L 32,68" />
            <path d="M 44,13 L 54,78" strokeDasharray="1.5,1" />
          </g>
        )}

        {/* Cloud mask patches */}
        {layers.cloudMask && (
          <g fill="rgba(241,245,249,0.35)" stroke="rgba(241,245,249,0.5)" strokeWidth="0.3">
            <ellipse cx="36" cy="32" rx="9" ry="6" className="blur-[1px]" />
            <ellipse cx="68" cy="56" rx="7" ry="5" className="blur-[1px]" />
            <path
              d="M 28,30 Q 31,24 38,26 Q 43,23 46,30 Q 52,29 50,37 Q 45,41 36,39 Q 28,42 28,30 Z"
              className="blur-[1.5px]"
            />
          </g>
        )}

        {/* Land Cover */}
        {layers.landCover && (
          <path
            d="M 54,14 L 72,22 L 84,42 L 78,72 Z"
            fill="rgba(168,85,247,0.12)"
            stroke="#a855f7"
            strokeWidth="0.4"
            strokeDasharray="2,1.5"
          />
        )}

        {/* DEM */}
        {layers.dem && (
          <path
            d="M 22,18 L 44,13 L 72,22 L 32,68 Z"
            fill="rgba(234,179,8,0.12)"
            stroke="#eab308"
            strokeWidth="0.4"
          />
        )}

        {/* AOI Center crosshair */}
        {layers.aoiBoundary && (
          <g stroke="#10b981" strokeWidth="0.4" opacity="0.8">
            <line x1="51" y1="44" x2="51" y2="50" />
            <line x1="48" y1="47" x2="54" y2="47" />
            <circle cx="51" cy="47" r="3" fill="none" strokeDasharray="1,1" />
          </g>
        )}

        {/* External coord pin */}
        {externalSelectedCoord && (
          <g>
            <circle cx="51" cy="47" r="1.5" fill="#ef4444" className="animate-ping" opacity="0.6" />
            <circle cx="51" cy="47" r="0.8" fill="#ef4444" />
          </g>
        )}
      </svg>

      {/* Top: Search bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center gap-2 z-10">
        <div className="relative flex-1 max-w-[280px]">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            defaultValue="Northeast India, LISS-IV AOI"
            className="w-full rounded-lg border border-border bg-[#0a0d14]/90 px-8 py-1.5 text-xs text-foreground placeholder-muted-foreground/70 focus:outline-none focus:border-indigo-500/50 backdrop-blur-sm shadow-md"
          />
        </div>
        <div className="rounded-lg border border-[#10b981]/30 bg-[#0a0d14]/90 px-2.5 py-1.5 text-[9px] font-bold text-[#10b981] backdrop-blur-sm">
          LIVE
          <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
        </div>
      </div>

      {/* Left: Layer control */}
      <div className="absolute top-14 left-3 z-10 w-[168px] rounded-lg border border-border bg-[#0a0d14]/90 p-2.5 backdrop-blur-sm shadow-md">
        <div className="flex items-center gap-1.5 mb-2">
          <Layers className="h-3 w-3 text-muted-foreground" />
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Layers
          </h4>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { key: "lissIv",      label: "LISS-IV Image",    dot: "#818cf8" },
            { key: "sentinel1",   label: "Sentinel-1 (SAR)", dot: "#60a5fa" },
            { key: "cloudMask",   label: "Cloud Mask",       dot: "#f1f5f9" },
            { key: "aoiBoundary", label: "AOI Boundary",     dot: "#10b981" },
            { key: "roads",       label: "Roads",             dot: "#f87171" },
            { key: "rivers",      label: "Rivers",            dot: "#38bdf8" },
            { key: "dem",         label: "DEM",               dot: "#eab308" },
            { key: "landCover",   label: "Land Cover",        dot: "#a855f7" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-2 text-[10px] font-semibold text-foreground hover:text-white cursor-pointer select-none"
            >
              <div
                className={`h-3 w-3 rounded-sm border border-border flex items-center justify-center transition-all ${
                  layers[item.key as keyof typeof layers]
                    ? "bg-[#5b4bfb]"
                    : "bg-[#10141d]"
                }`}
                onClick={() => toggleLayer(item.key as keyof typeof layers)}
              >
                {layers[item.key as keyof typeof layers] && (
                  <svg viewBox="0 0 10 10" className="h-2 w-2">
                    <polyline
                      points="1.5,5 3.5,8 8.5,2"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
              </div>
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: item.dot }}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Right: Zoom & tools */}
      <div className="absolute top-14 right-3 z-10 flex flex-col gap-1.5">
        {[
          { icon: Plus,    title: "Zoom In",    action: () => handleZoom(1) },
          { icon: Minus,   title: "Zoom Out",   action: () => handleZoom(-1) },
          { icon: Compass, title: "Recenter",   action: () => setCenter({ x: CENTER_LNG, y: CENTER_LAT }) },
          { icon: Target,  title: "Pin AOI",    action: () => {} },
          { icon: Edit2,   title: "Draw Tool",  action: () => {} },
        ].map((btn, idx) => (
          <button
            key={idx}
            title={btn.title}
            onClick={btn.action}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-[#0a0d14]/90 text-muted-foreground hover:text-white hover:bg-[#141924] backdrop-blur-sm shadow-md transition-all cursor-pointer"
          >
            <btn.icon className="h-3.5 w-3.5" />
          </button>
        ))}
        {/* Zoom indicator */}
        <div className="flex h-7 items-center justify-center rounded-lg border border-border bg-[#0a0d14]/90 px-2 text-[9px] font-mono text-muted-foreground backdrop-blur-sm">
          z{zoom}
        </div>
      </div>

      {/* Bottom-left: HUD coords + scale */}
      <div className="absolute bottom-3 left-3 z-10 rounded-lg bg-[#0a0d14]/90 border border-border px-2.5 py-1.5 backdrop-blur-sm text-[9px] font-mono text-muted-foreground shadow-md">
        <div className="flex gap-3 mb-1">
          <span>
            Lat: <span className="text-foreground font-bold">{center.y.toFixed(3)}° N</span>
          </span>
          <span>
            Lon: <span className="text-foreground font-bold">{center.x.toFixed(3)}° E</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 border-t border-border/40 pt-1">
          <div className="flex items-center">
            <div className="h-0.5 w-5 bg-muted-foreground" />
            <div className="h-1 w-0.5 bg-muted-foreground" />
          </div>
          <div className="flex items-center">
            <div className="h-0.5 w-5 bg-muted-foreground" />
            <div className="h-1 w-0.5 bg-muted-foreground" />
          </div>
          <span>50 km</span>
        </div>
      </div>

      {/* Bottom-right: Inset India locator map */}
      <div className="absolute bottom-3 right-3 z-10 rounded-lg bg-[#0a0d14]/90 border border-border p-1 backdrop-blur-sm shadow-md overflow-hidden h-[72px] w-[72px]">
        <svg className="h-full w-full" viewBox="0 0 100 120" fill="none">
          {/* India outline */}
          <path
            d="M 30,10 L 40,8 L 52,16 L 54,26 L 62,36 L 76,33 L 82,40 L 80,52 L 70,55 L 57,63 L 52,78 L 46,93 L 42,98 L 37,93 L 26,78 L 20,63 L 15,48 L 26,36 Z"
            fill="rgba(99,102,241,0.12)"
            stroke="rgba(148,163,184,0.6)"
            strokeWidth="1.2"
          />
          {/* Northeast highlight box */}
          <rect
            x="64"
            y="30"
            width="18"
            height="14"
            fill="rgba(16,185,129,0.25)"
            stroke="#10b981"
            strokeWidth="0.8"
          />
          {/* NE label */}
          <text x="70" y="40" fontSize="5" fill="#10b981" fontFamily="monospace">NE</text>
        </svg>
      </div>

      {/* Sensor badge */}
      <div className="absolute top-3 right-3 z-10 rounded-lg bg-[#0a0d14]/90 border border-[#5b4bfb]/40 px-2 py-1 backdrop-blur-sm text-[9px] font-mono text-indigo-400 shadow-md">
        LISS-IV · 5.8m GSD
      </div>
    </div>
  );
}