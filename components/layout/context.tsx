"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextType {
  title: string;
  subtitle: string;
  setTitle: (t: string) => void;
  setSubtitle: (s: string) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  title: "",
  subtitle: "",
  setTitle: () => {},
  setSubtitle: () => {},
});

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  return (
    <LayoutContext.Provider value={{ title, subtitle, setTitle, setSubtitle }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}
