"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const images = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1000&fit=crop", alt: "Restaurant interior" },
  { src: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&h=600&fit=crop",  alt: "Dining room" },
  { src: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=800&h=600&fit=crop",   alt: "Evening service" },
];

export function AmbianceSection() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0,1], ["0%","-8%"]);
  const y2 = useTransform(scrollYProgress, [0,1], ["0%","12%"]);

  return (
    <section ref={ref} style={{ background: "var(--bg)", overflow: "hidden" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: text */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 lg:py-0">
          <motion.div initial={{ opacity:0, x:-24 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.8 }}>
            <p className="lbl mb-4">The Space</p>
            <h2 style={{ fontFamily:"var(--font-playfair),serif", fontStyle:"italic", fontWeight:400, fontSize:"clamp(36px,5.5vw,80px)", letterSpacing:"-0.025em", lineHeight:0.95, color:"var(--fg)", marginBottom:20 }}>
              A room<br/>worthy of<br/>the food.
            </h2>
            <p className="body-md" style={{ maxWidth:360, marginBottom:32 }}>
              Designed by award-winning Edmonton studio Aldous &amp; Co., our space channels the warmth of a Jaipur haveli through a modern lens — warm limestone, hand-beaten brass, and candlelight.
            </p>
            <div className="flex flex-col gap-4 mb-10">
              {[
                { l:"Main Dining Room", v:"60 covers" },
                { l:"Private Alcove",   v:"Up to 14" },
                { l:"Chef's Table",     v:"6 guests" },
                { l:"Private Terrace",  v:"Seasonal" },
              ].map(s => (
                <div key={s.l} className="flex items-baseline justify-between pb-4" style={{ borderBottom:"1px solid var(--border)", maxWidth:320 }}>
                  <span style={{ fontFamily:"var(--font-jost)",fontSize:13,fontWeight:300,color:"var(--fg2)" }}>{s.l}</span>
                  <span style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:15,color:"var(--gold)" }}>{s.v}</span>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-ghost">Book a Private Dining Experience →</Link>
          </motion.div>
        </div>

        {/* Right: stacked parallax images */}
        <div className="relative overflow-hidden" style={{ minHeight:"clamp(480px,60vw,720px)" }}>
          <motion.div style={{ y: y1 }} className="absolute inset-0 grid grid-rows-2 gap-2 p-3">
            <div className="overflow-hidden rounded-[8px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover block"/>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {images.slice(1).map((img,i) => (
                <motion.div key={i} style={{ y: i===1?y2:undefined }} className="overflow-hidden rounded-[8px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover block"/>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
