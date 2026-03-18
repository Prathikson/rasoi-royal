"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const italRef  = useRef<HTMLSpanElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(charsRef.current, { y: 0, opacity: 1, duration: 1.0, stagger: 0.07, ease: "expo.out" }, 0.2)
      .to(italRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, "-=0.4")
      .to(lineRef.current,  { scaleX: 1, duration: 1.0, ease: "expo.inOut" }, 0.5)
      .addLabel("exit", "+=0.65")
      .to(charsRef.current, { y: "-115%", opacity: 0, stagger: 0.03, duration: 0.65, ease: "expo.in" }, "exit")
      .to(italRef.current,  { opacity: 0, duration: 0.3 }, "exit")
      .to(wrapRef.current,  { yPercent: -100, duration: 0.9, ease: "expo.inOut", onComplete }, "-=0.25");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--fg)" }}>
      <div style={{ overflow: "hidden", display: "flex", alignItems: "baseline", gap: "0.06em" }}>
        {"RASOI".split("").map((c, i) => (
          <span key={i} ref={el => { if (el) charsRef.current[i] = el; }}
            style={{ display: "block", fontFamily: "var(--font-jost),sans-serif", fontWeight: 800, fontSize: "clamp(52px,12vw,148px)", letterSpacing: "-0.01em", color: "var(--bg)", opacity: 0, transform: "translateY(110%)", willChange: "transform" }}>
            {c}
          </span>
        ))}
        <span ref={italRef} style={{ display: "block", fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(42px,9.5vw,118px)", letterSpacing: "0.02em", color: "rgba(248,246,242,0.35)", marginLeft: "0.12em", opacity: 0, transform: "translateY(12px)" }}>
          Royal
        </span>
      </div>
      <div ref={lineRef} className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: "rgba(248,246,242,0.12)", transformOrigin: "left", transform: "scaleX(0)" }} />
    </div>
  );
}
