"use client";

import { useEffect } from "react";
import { useLayoutContext } from "./context";

interface ShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Shell({ title, subtitle, children }: ShellProps) {
  const { setTitle, setSubtitle } = useLayoutContext();

  useEffect(() => {
    setTitle(title);
    if (subtitle) setSubtitle(subtitle);
  }, [title, subtitle, setTitle, setSubtitle]);

  // The actual layout DOM (Sidebar, Header) has been moved to app/layout.tsx
  // so that it persists across Next.js page navigations, avoiding expensive re-mounts.
  return <>{children}</>;
}
