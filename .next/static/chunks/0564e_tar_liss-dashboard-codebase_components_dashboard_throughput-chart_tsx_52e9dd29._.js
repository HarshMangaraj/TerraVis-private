(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThroughputChart",
    ()=>ThroughputChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/recharts@2.15.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/recharts@2.15.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/recharts@2.15.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/recharts@2.15.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/recharts@2.15.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/recharts@2.15.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/recharts@2.15.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
"use client";
;
;
;
;
function ThroughputChart() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-border bg-card p-5 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-sm font-semibold text-foreground",
                                children: "24h Throughput"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: "Scenes ingested vs processed per hour"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/15",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                            className: "h-4 w-4 text-primary"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-48 w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                        data: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["throughputData"],
                        margin: {
                            top: 4,
                            right: 4,
                            bottom: 0,
                            left: -24
                        },
                        barGap: 2,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                        id: "ingestGrad",
                                        x1: "0",
                                        y1: "0",
                                        x2: "0",
                                        y2: "1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                offset: "0%",
                                                stopColor: "oklch(0.50 0.16 195)",
                                                stopOpacity: 0.9
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                                lineNumber: 24,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                offset: "100%",
                                                stopColor: "oklch(0.50 0.16 195)",
                                                stopOpacity: 0.5
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                                lineNumber: 25,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                        lineNumber: 23,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                        id: "procGrad",
                                        x1: "0",
                                        y1: "0",
                                        x2: "0",
                                        y2: "1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                offset: "0%",
                                                stopColor: "oklch(0.52 0.17 150)",
                                                stopOpacity: 0.9
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                                lineNumber: 28,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                offset: "100%",
                                                stopColor: "oklch(0.52 0.17 150)",
                                                stopOpacity: 0.5
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                                lineNumber: 29,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                        lineNumber: 27,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                lineNumber: 22,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                strokeDasharray: "3 3",
                                stroke: "var(--color-border)",
                                vertical: false,
                                opacity: 0.6
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                dataKey: "hour",
                                tick: {
                                    fill: "var(--color-muted-foreground)",
                                    fontSize: 9
                                },
                                axisLine: false,
                                tickLine: false,
                                interval: 5
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                tick: {
                                    fill: "var(--color-muted-foreground)",
                                    fontSize: 9
                                },
                                axisLine: false,
                                tickLine: false
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                contentStyle: {
                                    background: "var(--color-popover)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: "var(--color-foreground)",
                                    boxShadow: "0 4px 12px oklch(0 0 0 / 0.1)"
                                },
                                cursor: {
                                    fill: "oklch(0.50 0.16 195 / 0.05)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: "scenes",
                                name: "Ingested",
                                fill: "url(#ingestGrad)",
                                radius: [
                                    3,
                                    3,
                                    0,
                                    0
                                ],
                                maxBarSize: 10
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$recharts$40$2$2e$15$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                dataKey: "processed",
                                name: "Processed",
                                fill: "url(#procGrad)",
                                radius: [
                                    3,
                                    3,
                                    0,
                                    0
                                ],
                                maxBarSize: 10
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = ThroughputChart;
var _c;
__turbopack_context__.k.register(_c, "ThroughputChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/throughput-chart.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=0564e_tar_liss-dashboard-codebase_components_dashboard_throughput-chart_tsx_52e9dd29._.js.map