"use client";
import { useState, useEffect } from "react";
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => { const m = document.documentElement.scrollHeight - window.innerHeight; setP(m > 0 ? Math.round((window.scrollY / m) * 100) : 0); };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return p;
}
