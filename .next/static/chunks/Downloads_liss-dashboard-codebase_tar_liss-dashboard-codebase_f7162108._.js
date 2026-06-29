(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/tailwind-merge@3.6.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileBarChart2$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/file-chart-column.js [app-client] (ecmascript) <export default as FileBarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudOff$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/cloud-off.js [app-client] (ecmascript) <export default as CloudOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-client] (ecmascript) <export default as Wand2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/boxes.js [app-client] (ecmascript) <export default as Boxes>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$satellite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Satellite$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/satellite.js [app-client] (ecmascript) <export default as Satellite>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const groups = [
    {
        label: "Main",
        items: [
            {
                title: "Dashboard",
                url: "/",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
            },
            {
                title: "Dataset Explorer",
                url: "/data-manager",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"]
            },
            {
                title: "Results & Reports",
                url: "/results",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileBarChart2$3e$__["FileBarChart2"]
            }
        ]
    },
    {
        label: "AI Models",
        items: [
            {
                title: "Cloud Detection",
                url: "/models/cloud-detection",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudOff$3e$__["CloudOff"]
            },
            {
                title: "Gen Prediction",
                url: "/models/reconstruction",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"]
            },
            {
                title: "Multi-Sensor Fusion",
                url: "/models/fusion",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"]
            },
            {
                title: "Moisture Stress",
                url: "/models/manager",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$boxes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Boxes$3e$__["Boxes"]
            }
        ]
    },
    {
        label: "System",
        items: [
            {
                title: "Monitoring",
                url: "/monitoring",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"]
            },
            {
                title: "Settings",
                url: "/settings",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
            }
        ]
    }
];
function Sidebar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isActive = (url)=>url === "/" ? pathname === "/" : pathname.startsWith(url);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out shrink-0", collapsed ? "w-[68px]" : "w-56"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center border-b border-sidebar-border transition-all", collapsed ? "justify-center px-0 py-5" : "gap-3 px-4 py-5"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm",
                        style: {
                            background: "var(--gradient-primary)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$satellite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Satellite$3e$__["Satellite"], {
                            className: "h-4 w-4 text-white"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-bold leading-tight tracking-tight text-sidebar-foreground",
                                children: "LISS-IV AI"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] tracking-wider text-muted-foreground/70",
                                children: "Cloud Removal Platform"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 flex flex-col gap-6",
                children: groups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50",
                                children: g.label
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: g.items.map((item)=>{
                                    const active = isActive(item.url);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.url,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group flex items-center gap-3 rounded-xl transition-all duration-150 cursor-pointer relative", collapsed ? "justify-center p-3" : "px-3 py-2.5", active ? "bg-primary/12 text-primary" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"),
                                            title: collapsed ? item.title : undefined,
                                            children: [
                                                active && !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all", active ? "bg-primary/15 text-primary shadow-sm" : "text-muted-foreground group-hover:bg-sidebar-accent group-hover:text-sidebar-foreground"),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                                        lineNumber: 107,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 23
                                                }, this),
                                                !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("truncate text-sm font-medium", active ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"),
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                            lineNumber: 85,
                                            columnNumber: 21
                                        }, this)
                                    }, item.url, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                        lineNumber: 84,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, g.label, true, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-sidebar-border px-3 py-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 rounded-xl bg-success/8 border border-success/15 px-3 py-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative flex h-2 w-2 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative inline-flex h-2 w-2 rounded-full bg-success"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] font-medium text-success",
                                    children: "Live"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-muted-foreground",
                                    children: "23 active jobs"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setCollapsed(!collapsed),
                className: "absolute -right-3 top-14 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-all hover:text-foreground hover:border-primary/30 hover:bg-primary/5",
                children: collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    className: "h-3 w-3"
                }, void 0, false, {
                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                    lineNumber: 148,
                    columnNumber: 22
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                    className: "h-3 w-3"
                }, void 0, false, {
                    fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                    lineNumber: 148,
                    columnNumber: 61
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "08JhlLD2LM6Uel+hWLLKL/dSZrM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cloudDistribution",
    ()=>cloudDistribution,
    "notifications",
    ()=>notifications,
    "pipeline",
    ()=>pipeline,
    "qualityMetrics",
    ()=>qualityMetrics,
    "satelliteOrbits",
    ()=>satelliteOrbits,
    "scenes",
    ()=>scenes,
    "stats",
    ()=>stats,
    "statsDelta",
    ()=>statsDelta,
    "systemHealth",
    ()=>systemHealth,
    "throughputData",
    ()=>throughputData
]);
const stats = {
    totalScenes: 12_847,
    processed: 11_392,
    cloudAvg: 38.7,
    reconstructed: 10_854,
    reconstructedSuccess: 95.3,
    avgPSNR: 32.84,
    storageUsed: 2.45,
    storageTotal: 10,
    accuracy: 97.8,
    activeJobs: 23,
    uptime: 99.94,
    throughput: 847
};
const statsDelta = {
    totalScenes: 8.2,
    processed: 12.4,
    cloudAvg: -3.1,
    reconstructed: 9.7,
    avgPSNR: 1.2,
    storageUsed: 5.6,
    accuracy: 0.3,
    throughput: 14.2
};
const pipeline = [
    {
        key: "ingestion",
        label: "Ingestion",
        count: 1455
    },
    {
        key: "preprocess",
        label: "Pre-processing",
        count: 1208
    },
    {
        key: "detection",
        label: "Cloud Detection",
        count: 982
    },
    {
        key: "reconstruction",
        label: "Reconstruction",
        count: 764
    },
    {
        key: "fusion",
        label: "Fusion",
        count: 612
    },
    {
        key: "postprocess",
        label: "Post-processing",
        count: 487
    },
    {
        key: "completed",
        label: "Completed",
        count: 10854
    }
];
const scenes = [
    {
        id: "SC-10247",
        name: "Brahmaputra_Valley_T44",
        date: "2026-06-26",
        cloudPct: 42.3,
        psnr: 33.21,
        status: "Completed",
        lat: 26.7,
        lng: 92.5,
        satellite: "LISS-IV MX",
        bands: "3B,2,1"
    },
    {
        id: "SC-10246",
        name: "Shillong_Plateau_E18",
        date: "2026-06-26",
        cloudPct: 68.1,
        psnr: 29.14,
        status: "Completed",
        lat: 25.57,
        lng: 91.88,
        satellite: "LISS-IV MONO",
        bands: "2"
    },
    {
        id: "SC-10245",
        name: "Kaziranga_NP_R02",
        date: "2026-06-26",
        cloudPct: 23.4,
        psnr: 35.67,
        status: "Processing",
        lat: 26.58,
        lng: 93.17,
        satellite: "LISS-IV MX",
        bands: "3B,2,1"
    },
    {
        id: "SC-10244",
        name: "Imphal_Basin_S07",
        date: "2026-06-25",
        cloudPct: 81.7,
        psnr: 0,
        status: "Failed",
        lat: 24.81,
        lng: 93.94,
        satellite: "LISS-IV MX",
        bands: "4,3B,2"
    },
    {
        id: "SC-10243",
        name: "Arunachal_NE_T55",
        date: "2026-06-25",
        cloudPct: 15.2,
        psnr: 36.89,
        status: "Completed",
        lat: 27.83,
        lng: 95.34,
        satellite: "LISS-IV MX",
        bands: "3B,2,1"
    },
    {
        id: "SC-10242",
        name: "Tripura_South_F19",
        date: "2026-06-25",
        cloudPct: 54.8,
        psnr: 31.42,
        status: "Completed",
        lat: 23.55,
        lng: 91.74,
        satellite: "LISS-IV MONO",
        bands: "2"
    },
    {
        id: "SC-10241",
        name: "Mizoram_Hills_Q88",
        date: "2026-06-24",
        cloudPct: 47.6,
        psnr: 32.05,
        status: "Processing",
        lat: 23.16,
        lng: 92.94,
        satellite: "LISS-IV MX",
        bands: "4,3B,2"
    },
    {
        id: "SC-10240",
        name: "Nagaland_Central_A12",
        date: "2026-06-24",
        cloudPct: 33.9,
        psnr: 34.18,
        status: "Completed",
        lat: 25.67,
        lng: 94.11,
        satellite: "LISS-IV MX",
        bands: "3B,2,1"
    },
    {
        id: "SC-10239",
        name: "Sikkim_North_X41",
        date: "2026-06-24",
        cloudPct: 72.5,
        psnr: 28.77,
        status: "In Queue",
        lat: 27.53,
        lng: 88.51,
        satellite: "LISS-IV MX",
        bands: "3B,2,1"
    },
    {
        id: "SC-10238",
        name: "Manas_Reserve_K33",
        date: "2026-06-23",
        cloudPct: 28.1,
        psnr: 35.02,
        status: "Completed",
        lat: 26.72,
        lng: 90.95,
        satellite: "LISS-IV MONO",
        bands: "2"
    }
];
const qualityMetrics = Array.from({
    length: 30
}, (_, i)=>{
    const day = i + 1;
    const psnr = 30 + Math.sin(i / 4) * 2 + i / 30 * 3 + (Math.random() - 0.5);
    const ssim = 0.82 + Math.cos(i / 5) * 0.04 + i / 30 * 0.05 + (Math.random() - 0.5) * 0.01;
    const rmse = 12 - Math.sin(i / 4) * 1.5 - i / 30 * 2 + (Math.random() - 0.5) * 0.4;
    return {
        day: "D".concat(day),
        PSNR: +psnr.toFixed(2),
        SSIM: +ssim.toFixed(3),
        RMSE: +rmse.toFixed(2)
    };
});
const cloudDistribution = [
    {
        name: "0–20%",
        value: 28,
        fill: "var(--color-chart-2)"
    },
    {
        name: "20–40%",
        value: 31,
        fill: "var(--color-chart-1)"
    },
    {
        name: "40–60%",
        value: 22,
        fill: "var(--color-chart-3)"
    },
    {
        name: "60–80%",
        value: 13,
        fill: "var(--color-chart-4)"
    },
    {
        name: ">80%",
        value: 6,
        fill: "var(--color-chart-5)"
    }
];
const systemHealth = [
    {
        name: "API Gateway",
        status: "operational",
        detail: "142ms latency"
    },
    {
        name: "Database Cluster",
        status: "operational",
        detail: "PostgreSQL · 8.4ms"
    },
    {
        name: "Object Storage",
        status: "operational",
        detail: "S3 · 99.99% SLA"
    },
    {
        name: "GPU Worker 1",
        status: "operational",
        detail: "A100 · 87% load"
    },
    {
        name: "GPU Worker 2",
        status: "degraded",
        detail: "A100 · 96% load"
    },
    {
        name: "ML Pipeline",
        status: "operational",
        detail: "PyTorch 2.3"
    },
    {
        name: "Queue Manager",
        status: "operational",
        detail: "47 jobs pending"
    },
    {
        name: "Sentinel API",
        status: "operational",
        detail: "ESA · Live feed"
    }
];
const throughputData = Array.from({
    length: 24
}, (_, i)=>({
        hour: "".concat(i, ":00"),
        scenes: Math.floor(30 + Math.sin(i / 24 * Math.PI * 2) * 15 + Math.random() * 10),
        processed: Math.floor(25 + Math.sin(i / 24 * Math.PI * 2 + 0.5) * 12 + Math.random() * 8)
    }));
const notifications = [
    {
        id: 1,
        type: "success",
        title: "Reconstruction batch B-2204 completed",
        time: "2m ago",
        detail: "10,854 scenes · 95.3% success"
    },
    {
        id: 2,
        type: "warning",
        title: "GPU Worker 2 load above 95%",
        time: "14m ago",
        detail: "Consider scaling up workers"
    },
    {
        id: 3,
        type: "info",
        title: "New ingestion: 24 LISS-IV scenes",
        time: "1h ago",
        detail: "Northeast India region"
    },
    {
        id: 4,
        type: "success",
        title: "Model v3.2.1 deployed to production",
        time: "3h ago",
        detail: "U-Net cloud detection"
    }
];
const satelliteOrbits = [
    {
        name: "LISS-IV-1",
        altitude: 508,
        inclination: 97.9,
        period: 94.2,
        status: "operational",
        lat: 26.7,
        lng: 92.5
    },
    {
        name: "LISS-IV-2",
        altitude: 509,
        inclination: 97.9,
        period: 94.3,
        status: "operational",
        lat: 15.2,
        lng: 78.4
    },
    {
        name: "LISS-IV-3",
        altitude: 507,
        inclination: 97.8,
        period: 94.1,
        status: "degraded",
        lat: -5.3,
        lng: 115.2
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutProvider",
    ()=>LayoutProvider,
    "useLayoutContext",
    ()=>useLayoutContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const LayoutContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    title: "",
    subtitle: "",
    setTitle: ()=>{},
    setSubtitle: ()=>{}
});
function LayoutProvider(param) {
    let { children } = param;
    _s();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [subtitle, setSubtitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutContext.Provider, {
        value: {
            title,
            subtitle,
            setTitle,
            setSubtitle
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/context.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(LayoutProvider, "YfgYhA29YQJ+dIdVDte5zsz0j1s=");
_c = LayoutProvider;
function useLayoutContext() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LayoutContext);
}
_s1(useLayoutContext, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "LayoutProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/lucide-react@0.545.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/node_modules/.pnpm/next@15.5.19_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$components$2f$layout$2f$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Header() {
    _s();
    const { title, subtitle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$components$2f$layout$2f$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutContext"])();
    const [showNotifs, setShowNotifs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const typeIcon = {
        success: "bg-success",
        warning: "bg-warning",
        info: "bg-info",
        error: "bg-destructive"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-5 backdrop-blur-sm shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-sm font-semibold text-foreground leading-tight",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-muted-foreground",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                        lineNumber: 25,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-2 rounded-lg bg-muted/70 border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Search scenes..."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                className: "rounded border border-border bg-background px-1 py-0.5 text-[10px] font-mono",
                                children: "⌘K"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowNotifs(!showNotifs),
                                className: "relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$545$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            showNotifs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-10 z-50 w-80 rounded-xl border border-border bg-popover shadow-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-b border-border px-4 py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-semibold",
                                                children: "Notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                                lineNumber: 59,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] text-muted-foreground",
                                                children: [
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifications"].length,
                                                    " recent events"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                                lineNumber: 60,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-1",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifications"].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-3 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-1.5 h-2 w-2 shrink-0 rounded-full", typeIcon[n.type] || "bg-muted-foreground")
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs font-medium leading-tight",
                                                                children: n.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                                                lineNumber: 67,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-0.5 text-[11px] text-muted-foreground",
                                                                children: n.detail
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                                                lineNumber: 68,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-1 text-[10px] text-muted-foreground/60",
                                                                children: n.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                                                lineNumber: 69,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, n.id, true, {
                                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                                lineNumber: 64,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$19_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white shadow-sm",
                        style: {
                            background: "var(--gradient-primary)"
                        },
                        children: "LA"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(Header, "iG62V3lOICQq6O7QQapMRI2BH9c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$liss$2d$dashboard$2d$codebase$2e$tar$2f$liss$2d$dashboard$2d$codebase$2f$components$2f$layout$2f$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutContext"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_liss-dashboard-codebase_tar_liss-dashboard-codebase_f7162108._.js.map