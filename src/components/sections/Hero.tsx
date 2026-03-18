"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: "#hero", start: "top top", end: "bottom top", scrub: true,
      onUpdate: s => gsap.set(bgRef.current, { yPercent: s.progress * 18 }),
    });
    gsap.fromTo(".hl-inner",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "expo.out", delay: 0.15 }
    );
    gsap.fromTo(".h-sub",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", delay: 0.72 });
    gsap.fromTo(".h-cta",  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.92 });
    gsap.fromTo(".h-meta", { opacity: 0 },         { opacity: 1, duration: 0.6, delay: 1.1 });
  }, []);

  const lines = [
    { text: "True to Oneself,", italic: false },
    { text: "Kind to", italic: false },
    { text: "Flavour.", italic: true },
  ];

  return (
    <section id="hero" className="relative overflow-hidden" style={{ height: "100svh", minHeight: 640, background: "var(--dark)" }}>
      {/* Parallax bg */}
      <div ref={bgRef} className="absolute inset-0" style={{ scale: 1.15, transformOrigin: "center top" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1800&h=1100&fit=crop"
          alt="" className="w-full h-full object-cover block" style={{ opacity: 0.52 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,16,8,0.18) 0%, rgba(20,16,8,0.08) 30%, rgba(20,16,8,0.75) 100%)" }} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-14 md:pb-20">
        {/* Headline — single font, Playfair italic, like reference */}
        <div style={{ marginBottom: 24 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <span className="hl-inner block" style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: l.italic ? "italic" : "normal",
                fontWeight: 400,
                fontSize: "clamp(46px, 8.5vw, 128px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                color: l.italic ? "rgba(248,246,242,0.55)" : "#f8f6f2",
                display: "block",
              }}>
                {l.text}
              </span>
            </div>
          ))}
        </div>

        <div className="h-sub" style={{ opacity: 0, marginBottom: 24 }}>
          <p style={{ fontFamily: "var(--font-jost)", fontSize: "clamp(13px,1.3vw,15px)", fontWeight: 300, color: "rgba(248,246,242,0.48)", lineHeight: 1.78, maxWidth: 380 }}>
            Authentic recipes from India&apos;s royal courts — refined for Edmonton&apos;s finest table.
          </p>
        </div>

        {/* Pill CTA bar — reference style */}
        <div className="h-cta" style={{ opacity: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "rgba(248,246,242,0.9)", backdropFilter: "blur(20px)",
            borderRadius: "100px", padding: "8px 8px 8px 28px", maxWidth: 500,
            border: "1px solid rgba(248,246,242,0.12)",
          }}>
            <span style={{ fontFamily: "var(--font-jost)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg)" }}>
              Explore All Dishes
            </span>
            <Link href="/menu" style={{
              width: 40, height: 40, borderRadius: "50%", background: "var(--fg)",
              color: "#f8f6f2", display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", flexShrink: 0,
            }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="2" y1="6.5" x2="11" y2="6.5" /><polyline points="7.5,3 11,6.5 7.5,10" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="h-meta absolute bottom-7 right-8 flex flex-col items-end gap-1" style={{ opacity: 0 }}>
          <span style={{ fontFamily: "var(--font-jost)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(248,246,242,0.3)" }}>©2026</span>
          <span style={{ fontFamily: "var(--font-jost)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(248,246,242,0.3)" }}>Edmonton, AB</span>
        </div>
      </div>
    </section>
  );
}
