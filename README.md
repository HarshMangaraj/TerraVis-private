# 🛰️ LISS-IV AI Platform Dashboard

A state-of-the-art Next.js development dashboard designed for satellite imagery analysis, cloud removal, spectral reconstruction, and real-time sensor monitoring of **LISS-IV** (Linear Imaging Self-Scanning Sensor-IV) satellite data.

The platform provides a modern, responsive, and visually interactive UI to manage, process, and analyze remote sensing data streams.

---

## 🎯 Features

- **3D Earth Visualization:** Immersive 3D globes and scenes powered by React Three Fiber (`three.js`, `@react-three/drei`).
- **Real-Time Job Monitoring:** GPU load, temperature, VRAM utilization, and pipeline job queue tables.
- **Spectral Comparison Slider:** Side-by-side "Before/After" cloud removal slider to analyze AI reconstruction quality.
- **Metadata Management:** Searchable and filterable data tables displaying cloud cover, acquisition dates, and scene quality scores.
- **Deep Performance Analytics:** Integrated charts (throughput and quality metrics) using Recharts.

---

## 📂 Project Structure & Repo Map

Below is a detailed map of the project files to help you navigate and customize the dashboard easily.

```text
├── app/                              # Next.js App Router (Pages & Layouts)
│   ├── comparison/                   # Spectral comparison page
│   ├── data-manager/                 # Cloud coverage and acquisition catalog
│   ├── models/                       # AI model overview and configurations
│   │   ├── cloud-detection/          # Cloud masking interface
│   │   ├── fusion/                   # Multi-sensor image fusion view
│   │   ├── manager/                  # AI model version registry
│   │   └── reconstruction/           # Super-resolution/reconstruction interface
│   ├── monitoring/                   # Hardware/pipeline metrics
│   ├── processing/                   # Running processing jobs & GPU status
│   ├── reports/                      # System/scientific reports & exports
│   ├── results/                      # Saved outputs and metrics
│   ├── settings/                     # User/platform settings
│   ├── globals.css                   # Core Tailwind/CSS tokens & styling
│   ├── layout.tsx                    # Root HTML layout and provider setup
│   └── page.tsx                      # Dashboard homepage (orchestrates modules)
│
├── components/                       # Shared UI Components
│   ├── dashboard/                    # Dashboard-specific widgets and scenes
│   │   ├── before-after.tsx          # Before/After interactive slider component
│   │   ├── cloud-donut.tsx           # Donut chart for cloud coverage percentage
│   │   ├── earth-hero.tsx            # Hero section embedding the 3D globe scene
│   │   ├── earth-scene.tsx           # Three.js 3D earth scene canvas & controls
│   │   ├── map-panel.tsx             # Geospatial coverage grid map
│   │   ├── pipeline.tsx              # Processing pipeline step indicator
│   │   ├── quality-chart.tsx         # Spectral quality score line chart
│   │   ├── scenes-table.tsx          # Table of scanned LISS-IV scenes
│   │   ├── stats-row.tsx             # Quick stats summary cards
│   │   ├── system-health.tsx         # System health/resource grid
│   │   └── throughput-chart.tsx      # Processing throughput bar chart
│   └── layout/                       # Core shell layouts
│       ├── header.tsx                # Top navigation header & user profile
│       ├── shell.tsx                 # Core page wrapper (sidebar + header grid)
│       └── sidebar.tsx               # Left navigation pane & status toggle
│
├── lib/                              # Data & Core Utilities
│   ├── mock-data.ts                  # Mock data for scenes, charts, and jobs
│   └── utils.ts                      # Tailwind/Clsx CSS classes merger
│
├── public/                           # Static Assets
│   ├── favicon.svg               
│   ├── opengraph.jpg             
│   └── robots.txt                
│
├── next.config.ts                    # Next.js compiler/server configuration
├── postcss.config.mjs                # PostCSS configurations (Tailwind integrations)
├── tailwind.config.js                # Core Tailwind CSS design system rules
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## 🛠️ How to Customize Pages & Layouts

### 1. Changing Layouts & Sidebar Links
- To modify the navigation sidebar groups (e.g., adding a new page route or changing icons), go to [components/layout/sidebar.tsx](file:///c:/Users/ASUS/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx). Look for the `groups` array configuration.
- To modify the header style or user profile dropdown, go to [components/layout/header.tsx](file:///c:/Users/ASUS/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/header.tsx).

### 2. Modifying Dashboard Widgets
- **Home Page Layout:** Go to [app/page.tsx](file:///c:/Users/ASUS/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/app/page.tsx) to rearrange, remove, or add new widgets to the grid.
- **3D Globe Customization:** To adjust 3D shaders, Earth rotation speed, or add custom pins on the globe, edit [components/dashboard/earth-scene.tsx](file:///c:/Users/ASUS/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/earth-scene.tsx).
- **Interactive Comparisons:** Customize the image slider functionality in [components/dashboard/before-after.tsx](file:///c:/Users/ASUS/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/dashboard/before-after.tsx).

### 3. Adding New Routing Pages
To add a new page (e.g. `/analytics`):
1. Create a directory named `app/analytics`.
2. Inside `app/analytics`, create a `page.tsx` file exporting your page component:
   ```tsx
   import { Shell } from "@/components/layout/shell";

   export default function AnalyticsPage() {
     return (
       <Shell title="Analytics" subtitle="Historical satellite telemetry metrics">
         <div>Your custom analytics content here...</div>
       </Shell>
     );
   }
   ```
3. Add the link in the sidebar array inside [sidebar.tsx](file:///c:/Users/ASUS/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/components/layout/sidebar.tsx).

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or newer
- **pnpm** (preferred) or **npm**

### 1. Installation
Install the project dependencies locally:
```bash
pnpm install
```

### 2. Development Server
Start the Next.js development server:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Compile the application into optimized, production-ready static assets:
```bash
pnpm build
```

Run the compiled production server:
```bash
pnpm start
```

---

## 🎨 Theme and Customization
The application uses **Tailwind CSS v4** with a custom dark theme design system.
You can adjust default parameters, colors (such as primary gradients, border hues, and cards backgrounds), by editing the CSS variable tokens inside [app/globals.css](file:///c:/Users/ASUS/Downloads/liss-dashboard-codebase.tar/liss-dashboard-codebase/app/globals.css):
- `--gradient-primary`: Core application primary buttons & highlights.
- `--color-background`: Application body background colors.
- `--color-card`: Sidebar, main panels, and widgets container background.
