import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LISS-IV AI Platform",
  description: "Cloud removal · Reconstruction · Real-time monitoring",
};

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { LayoutProvider } from "@/components/layout/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preload" href="/planets/earth_atmos.jpg" as="image" />
        <link rel="preload" href="/planets/earth_normal.jpg" as="image" />
        <link rel="preload" href="/planets/earth_clouds.png" as="image" />
        <link rel="preload" href="/planets/moon.jpg" as="image" />
      </head>
      <body suppressHydrationWarning>
        <LayoutProvider>
          <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-5">
                {children}
              </main>
            </div>
          </div>
        </LayoutProvider>
      </body>
    </html>
  );
}
