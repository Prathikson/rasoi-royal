"use client";
import { useEffect } from "react";
export function useLenis() {
  useEffect(() => {
    let lenis: import("@studio-freight/lenis").default | null = null;
    async function init() {
      const Lenis = (await import("@studio-freight/lenis")).default;
      lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time: number) => lenis?.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    init();
    return () => { lenis?.destroy(); };
  }, []);
}
