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
      <body>{children}</body>
    </html>
  );
}
