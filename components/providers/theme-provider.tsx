"use client";

import { useEffect } from "react";
import { useUIStore } from "@/lib/store/useUIStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useUIStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <>{children}</>;
}
