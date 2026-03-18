"use client";
import { useState, useEffect, useCallback } from "react";
export function useTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("rasoi-theme") === "dark") { setIsDark(true); document.documentElement.classList.add("dark"); }
  }, []);
  const toggle = useCallback(() => {
    setIsDark(p => {
      const n = !p;
      document.documentElement.classList.toggle("dark", n);
      localStorage.setItem("rasoi-theme", n ? "dark" : "light");
      return n;
    });
  }, []);
  return { isDark, toggle };
}
