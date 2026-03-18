"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { num: "24",    unit: "hrs",  label: "Dal Makhani slow-cooked" },
  { num: "12",    unit: "+",    label: "Regions spices sourced from" },
  { num: "200",   unit: "+",    label: "Wine labels in our cellar" },
  { num: "4",     unit: "yrs",  label: "Best Indian Restaurant, Alberta" },
];

const awards = [
  { year:"2023", name:"Best Chef Alberta",      org:"Avenue Magazine" },
  { year:"2023", name:"Best Indian Restaurant", org:"Avenue Magazine" },
  { year:"2022", name:"Sommelier of the Year",  org:"Alberta Hospitality" },
  { year:"2021", name:"Best New Restaurant",    org:"enRoute Magazine" },
];

export function StatsSection() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section ref={ref} style={{ background: "var(--fg)", overflow: "hidden" }}>
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(248,246,242,0.06)" }}>
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity:0, y:16 }} animate={inView?{opacity:1,y:0}:{}}
            transition={{ delay:i*0.08, duration:0.6 }}
            className="flex flex-col px-8 md:px-12 py-12"
            style={{ background:"var(--fg)" }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:8 }}>
              <span style={{ fontFamily:"var(--font-playfair),serif", fontStyle:"italic", fontSize:"clamp(42px,5.5vw,72px)", fontWeight:400, letterSpacing:"-0.03em", color:"rgba(248,246,242,0.9)", lineHeight:1 }}>
                {s.num}
              </span>
              <span style={{ fontFamily:"var(--font-jost)", fontSize:"clamp(16px,2vw,24px)", fontWeight:300, color:"var(--gold2)", marginLeft:2 }}>
                {s.unit}
              </span>
            </div>
            <span style={{ fontFamily:"var(--font-jost)", fontSize:12, fontWeight:300, color:"rgba(248,246,242,0.35)", lineHeight:1.5 }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Awards ticker */}
      <div className="px-8 md:px-16 py-12" style={{ borderTop:"1px solid rgba(248,246,242,0.07)" }}>
        <p style={{ fontFamily:"var(--font-jost)", fontSize:9, fontWeight:600, letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(248,246,242,0.25)", marginBottom:20 }}>
          Awards & Recognition
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {awards.map((a, i) => (
            <motion.div key={a.name}
              initial={{ opacity:0, y:12 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.2+i*0.07, duration:0.5 }}
              className="rounded-[8px] p-5"
              style={{ border:"1px solid rgba(248,246,242,0.07)" }}>
              <p style={{ fontFamily:"var(--font-jost)", fontSize:10, fontWeight:500, letterSpacing:"0.18em", color:"var(--gold)", marginBottom:6 }}>
                {a.year}
              </p>
              <p style={{ fontFamily:"var(--font-playfair),serif", fontStyle:"italic", fontSize:"clamp(14px,1.5vw,17px)", fontWeight:400, color:"rgba(248,246,242,0.75)", marginBottom:4, letterSpacing:"-0.01em", lineHeight:1.2 }}>
                {a.name}
              </p>
              <p style={{ fontFamily:"var(--font-jost)", fontSize:11, fontWeight:300, color:"rgba(248,246,242,0.3)" }}>
                {a.org}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
