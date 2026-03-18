"use client";
import { useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "@/components/sections/Footer";
import { GoldenCursor } from "@/components/ui/GoldenCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { useLenis } from "@/hooks/useLenis";

// noPt = hero pages that handle their own top padding
export function PageShell({ children, heroDark = false }: { children: React.ReactNode; heroDark?: boolean }) {
  useLenis();
  // Tell the header if the page starts with light bg (so it shows dark text)
  useEffect(() => {
    if (!heroDark) {
      const el = document.createElement("div");
      el.className = "page-light-bg";
      el.style.display = "none";
      document.body.appendChild(el);
      return () => { el.remove(); };
    }
  }, [heroDark]);

  return (
    <>
      <GrainOverlay />
      <GoldenCursor />
      <CookieBanner />
      <Header visible={true} />
      {/* heroDark = page starts dark (winery, about) so no top padding needed */}
      <main style={{ paddingTop: heroDark ? 0 : "80px" }}>{children}</main>
      <Footer />
    </>
  );
}
