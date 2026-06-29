(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPanel",
    ()=>MapPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$satellite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Satellite$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/satellite.js [app-client] (ecmascript) <export default as Satellite>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const STATUS_COLOR = {
    Completed: "var(--color-success)",
    Processing: "var(--color-primary)",
    Failed: "var(--color-destructive)",
    "In Queue": "var(--color-info)"
};
const STATUS_LABEL_CLASS = {
    Completed: "bg-success/10 text-success border-success/25",
    Processing: "bg-primary/10 text-primary border-primary/25",
    Failed: "bg-destructive/10 text-destructive border-destructive/25",
    "In Queue": "bg-info/10 text-info border-info/25"
};
const BBOX = {
    minLng: 87.5,
    maxLng: 97.5,
    minLat: 21.5,
    maxLat: 29.5
};
function project(lat, lng) {
    const x = (lng - BBOX.minLng) / (BBOX.maxLng - BBOX.minLng) * 100;
    const y = (1 - (lat - BBOX.minLat) / (BBOX.maxLat - BBOX.minLat)) * 100;
    return {
        x,
        y
    };
}
const extras = [
    {
        id: "EX-1",
        lat: 26.1,
        lng: 91.7,
        status: "Completed",
        name: "Guwahati_W01"
    },
    {
        id: "EX-2",
        lat: 27.1,
        lng: 93.6,
        status: "Completed",
        name: "Tezpur_N12"
    },
    {
        id: "EX-3",
        lat: 25.0,
        lng: 94.5,
        status: "Processing",
        name: "Kohima_B08"
    },
    {
        id: "EX-4",
        lat: 24.0,
        lng: 92.5,
        status: "In Queue",
        name: "Silchar_L04"
    },
    {
        id: "EX-5",
        lat: 23.8,
        lng: 91.3,
        status: "Completed",
        name: "Agartala_P05"
    },
    {
        id: "EX-6",
        lat: 28.2,
        lng: 95.9,
        status: "Failed",
        name: "Tezu_X06"
    },
    {
        id: "EX-7",
        lat: 26.9,
        lng: 94.8,
        status: "Completed",
        name: "Jorhat_G07"
    },
    {
        id: "EX-8",
        lat: 25.3,
        lng: 92.7,
        status: "Processing",
        name: "Haflong_M08"
    }
];
const allPoints = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scenes"].map((s)=>({
            id: s.id,
            lat: s.lat,
            lng: s.lng,
            status: s.status,
            name: s.name
        })),
    ...extras
];
// ─── Satellite Map Modal ──────────────────────────────────────────────────────
function SatelliteModal(param) {
    let { point, onClose } = param;
    _s();
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Esri World Imagery tiles work without API key via iframe embed
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d".concat(point.lng, "!3d").concat(point.lat, "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: {
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)"
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-3xl rounded-2xl overflow-hidden border border-border shadow-2xl",
            style: {
                background: "#0d1117"
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-5 py-4 border-b border-border/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 border border-primary/25",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$satellite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Satellite$3e$__["Satellite"], {
                                        className: "h-4 w-4 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-bold text-foreground",
                                                    children: point.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ".concat(STATUS_LABEL_CLASS[point.status]),
                                                    children: point.status
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                point.lat.toFixed(4),
                                                "° N, ",
                                                point.lng.toFixed(4),
                                                "° E · LISS-IV Scene Location"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://www.google.com/maps/@".concat(point.lat, ",").concat(point.lng, ",13z/data=!3m1!1e3"),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this),
                                        "Open in Maps"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    style: {
                        height: 460
                    },
                    children: [
                        !loaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0d1117]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-7 w-7 animate-spin text-primary/60"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Loading satellite imagery…"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                            src: mapSrc,
                            width: "100%",
                            height: "100%",
                            style: {
                                border: 0,
                                display: "block"
                            },
                            allowFullScreen: true,
                            loading: "lazy",
                            referrerPolicy: "no-referrer-when-downgrade",
                            onLoad: ()=>setLoaded(true),
                            title: "Satellite view of ".concat(point.name)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-6 px-5 py-3 border-t border-border/50 bg-muted/20",
                    children: [
                        {
                            label: "Coordinates",
                            value: "".concat(point.lat.toFixed(4), "°N  ").concat(point.lng.toFixed(4), "°E")
                        },
                        {
                            label: "Scene ID",
                            value: point.id
                        },
                        {
                            label: "Status",
                            value: point.status
                        },
                        {
                            label: "Sensor",
                            value: "LISS-IV MX"
                        }
                    ].map((param)=>{
                        let { label, value } = param;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[9px] uppercase tracking-wider text-muted-foreground",
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-foreground",
                                    children: value
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, label, true, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(SatelliteModal, "5HkI/FtSFoHY/ZszUPbNWJy51d0=");
_c = SatelliteModal;
function MapPanel() {
    let { externalSelectedCoord, onClearExternalCoord } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s1();
    const [hover, setHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [internalSelected, setInternalSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedPoint = internalSelected || (externalSelectedCoord ? {
        id: "3D-CLICK",
        name: "3D Globe Location",
        lat: externalSelectedCoord.lat,
        lng: externalSelectedCoord.lng,
        status: "Completed"
    } : null);
    const handleCloseModal = ()=>{
        setInternalSelected(null);
        onClearExternalCoord === null || onClearExternalCoord === void 0 ? void 0 : onClearExternalCoord();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-border bg-card p-5 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-wrap items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold text-foreground",
                                        children: "Scene Geography"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: [
                                            "Northeast India · ",
                                            allPoints.length,
                                            " active captures · click a pin to explore"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "h-4 w-4 text-primary shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex flex-wrap items-center gap-3 text-[11px]",
                        children: Object.keys(STATUS_COLOR).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2 w-2 rounded-full",
                                        style: {
                                            background: STATUS_COLOR[s]
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: s
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, s, true, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full overflow-hidden rounded-xl border border-border shadow-inner",
                        style: {
                            height: 260,
                            background: "linear-gradient(135deg, oklch(0.88 0.04 220), oklch(0.85 0.06 240) 50%, oklch(0.87 0.04 250))"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 100 100",
                                preserveAspectRatio: "none",
                                className: "absolute inset-0 h-full w-full pointer-events-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                                            id: "mapgrid",
                                            width: "5",
                                            height: "5",
                                            patternUnits: "userSpaceOnUse",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M 5 0 L 0 0 0 5",
                                                fill: "none",
                                                stroke: "oklch(0.72 0.04 240)",
                                                strokeWidth: "0.15",
                                                opacity: "0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                                lineNumber: 193,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 191,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        width: "100",
                                        height: "100",
                                        fill: "url(#mapgrid)"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 196,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M 8,42 L 18,30 L 28,22 L 42,18 L 58,14 L 72,18 L 86,28 L 92,42 L 88,58 L 82,72 L 70,82 L 54,86 L 38,82 L 22,74 L 12,60 Z",
                                        fill: "oklch(0.78 0.06 200 / 0.5)",
                                        stroke: "oklch(0.50 0.16 195)",
                                        strokeWidth: "0.5",
                                        strokeOpacity: "0.6"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this),
                                    [
                                        25,
                                        27
                                    ].map((lat)=>{
                                        const y = (1 - (lat - BBOX.minLat) / (BBOX.maxLat - BBOX.minLat)) * 100;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                            x: "1",
                                            y: y,
                                            fontSize: "2.5",
                                            fill: "oklch(0.50 0.04 240)",
                                            opacity: "0.7",
                                            children: [
                                                lat,
                                                "°N"
                                            ]
                                        }, lat, true, {
                                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            allPoints.map((p)=>{
                                const { x, y } = project(p.lat, p.lng);
                                const color = STATUS_COLOR[p.status];
                                const isHovered = hover === p.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10",
                                    style: {
                                        left: "".concat(x, "%"),
                                        top: "".concat(y, "%")
                                    },
                                    onMouseEnter: ()=>setHover(p.id),
                                    onMouseLeave: ()=>setHover(null),
                                    onClick: ()=>setInternalSelected(p),
                                    children: [
                                        isHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute inset-0 -m-3 animate-ping rounded-full opacity-30",
                                            style: {
                                                background: color
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                            lineNumber: 226,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative block rounded-full ring-2 ring-white transition-all",
                                            style: {
                                                width: isHovered ? 14 : 10,
                                                height: isHovered ? 14 : 10,
                                                background: color,
                                                boxShadow: "0 0 ".concat(isHovered ? 10 : 6, "px ").concat(color),
                                                transform: isHovered ? "scale(1.3)" : "scale(1)",
                                                transition: "all 0.2s ease"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                            lineNumber: 228,
                                            columnNumber: 17
                                        }, this),
                                        isHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-popover px-2.5 py-1.5 text-[11px] shadow-xl pointer-events-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold text-foreground",
                                                    children: p.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-muted-foreground",
                                                    children: [
                                                        p.status,
                                                        " · ",
                                                        p.lat.toFixed(1),
                                                        "°N ",
                                                        p.lng.toFixed(1),
                                                        "°E"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-primary/70 text-[10px] mt-0.5",
                                                    children: "Click to open satellite view"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                            lineNumber: 240,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, p.id, true, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: "\n            @keyframes scan {\n              0% { top: 0%; opacity: 0; }\n              5% { opacity: 0.4; }\n              95% { opacity: 0.4; }\n              100% { top: 100%; opacity: 0; }\n            }\n          "
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-x-0 h-px opacity-40 pointer-events-none",
                                style: {
                                    background: "linear-gradient(to right, transparent, oklch(0.50 0.16 195), transparent)",
                                    animation: "scan 4s linear infinite",
                                    top: "50%"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 grid grid-cols-4 gap-2",
                        children: [
                            {
                                label: "Completed",
                                count: allPoints.filter((p)=>p.status === "Completed").length,
                                color: "text-success"
                            },
                            {
                                label: "Processing",
                                count: allPoints.filter((p)=>p.status === "Processing").length,
                                color: "text-primary"
                            },
                            {
                                label: "In Queue",
                                count: allPoints.filter((p)=>p.status === "In Queue").length,
                                color: "text-info"
                            },
                            {
                                label: "Failed",
                                count: allPoints.filter((p)=>p.status === "Failed").length,
                                color: "text-destructive"
                            }
                        ].map((param)=>{
                            let { label, count, color } = param;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg bg-muted/50 border border-border/60 p-2 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-base font-bold ".concat(color),
                                        children: count
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] text-muted-foreground",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, label, true, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            selectedPoint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SatelliteModal, {
                point: selectedPoint,
                onClose: handleCloseModal
            }, void 0, false, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx",
                lineNumber: 285,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s1(MapPanel, "VGk5f+/UtN6EBkYhNfaagjadgrs=");
_c1 = MapPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "SatelliteModal");
__turbopack_context__.k.register(_c1, "MapPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/map-panel.tsx [app-client] (ecmascript)"));
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>MapPin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }
    ]
];
const MapPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("map-pin", __iconNode);
;
 //# sourceMappingURL=map-pin.js.map
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)");
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>X
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
];
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("x", __iconNode);
;
 //# sourceMappingURL=x.js.map
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ExternalLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M15 3h6v6",
            key: "1q9fwt"
        }
    ],
    [
        "path",
        {
            d: "M10 14 21 3",
            key: "gplh6r"
        }
    ],
    [
        "path",
        {
            d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
            key: "a6xqqp"
        }
    ]
];
const ExternalLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("external-link", __iconNode);
;
 //# sourceMappingURL=external-link.js.map
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExternalLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript)");
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>LoaderCircle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21 12a9 9 0 1 1-6.219-8.56",
            key: "13zald"
        }
    ]
];
const LoaderCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("loader-circle", __iconNode);
;
 //# sourceMappingURL=loader-circle.js.map
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Loader2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Downloads_liss-dashboard-codebase_tar_liss-dashboard-codebase_225289c8._.js.map