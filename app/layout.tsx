import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LISS-IV AI Platform",
  description: "Cloud removal · Reconstruction · Real-time monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload Three.js planet textures so they are already in browser cache
            when the WebGL canvas initialises — eliminates the texture-load stall */}
        <link rel="preload" href="/planets/earth_atmos.jpg" as="image" />
        <link rel="preload" href="/planets/earth_normal.jpg" as="image" />
        <link rel="preload" href="/planets/earth_clouds.png" as="image" />
        <link rel="preload" href="/planets/moon.jpg" as="image" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
