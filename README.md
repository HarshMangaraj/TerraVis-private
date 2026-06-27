# LISS-IV AI Platform Dashboard

A modern Next.js web application for satellite imagery analysis, cloud removal, reconstruction, and real-time monitoring of LISS-IV data.

## Features

- **Interactive Satellite View:** 3D Earth visualizations using `@react-three/fiber` and `@react-three/drei`.
- **Pipeline Monitoring:** Real-time job queues and system resource tracking.
- **Before/After Analysis:** Side-by-side reconstruction comparison slider.
- **Data Manager:** Cloud coverage statistics and historical scene data tables.

## Project Structure

- `app/` - Next.js App Router pages and layouts.
- `components/` - Shared UI elements (layout and dashboard views).
- `lib/` - Mock data and helper utility functions.
- `public/` - Static assets and icons.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### Installation

Install the project dependencies:
```bash
pnpm install
```

### Development Server

Run the local development server:
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build and Production

To build the application for production:
```bash
pnpm build
```

To run the production server:
```bash
pnpm start
```
