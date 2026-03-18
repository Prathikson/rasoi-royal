"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const pillars = [
  { icon:"◎", title:"Radical Transparency", desc:"No black boxes, nothing to hide. Every ingredient disclosed — you will never have to guess what is in each dish." },
  { icon:"◯", title:"Verified Ingredients",  desc:"Sourced directly from 12 regions across India. Every spice traceable to the same farms supplying royal courts for generations." },
  { icon:"✦", title:"Real Results",           desc:"We do not promise miracles. We deliver genuine flavour — crafted with intent, precision, and respect for tradition." },
];

export function PhilosophySection() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-5% 0px" });

  return (
    <section style={{ background:"var(--bg)" }} ref={ref}>
      <div className="px-8 md:px-16 pt-20 pb-10">
        <motion.div initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}>
          <p className="lbl mb-4">Our Ethos</p>
          <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(36px,5.5vw,84px)",letterSpacing:"-0.025em",lineHeight:0.95,color:"var(--fg)",marginBottom:16 }}>
            Royal, honest,<br/>authentic cuisine.
          </h2>
          <p className="body-md" style={{ maxWidth:440,marginBottom:0 }}>
            Unreservedly honest food that truly nourishes — kind to body and soul, no exceptions.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Pillar cards */}
        <div className="px-8 md:px-16 py-8 flex flex-col gap-4">
          {pillars.map((p,i) => (
            <motion.div key={p.title}
              initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.15+i*0.1,duration:0.6 }}
              className="rounded-[8px] p-6"
              style={{ background:"var(--white)",border:"1px solid var(--border)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                style={{ background:"var(--bg2)",border:"1px solid var(--border)" }}>
                <span style={{ fontSize:15,color:"var(--gold)" }}>{p.icon}</span>
              </div>
              <p style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(15px,1.8vw,18px)",fontWeight:400,color:"var(--fg)",marginBottom:8,letterSpacing:"-0.01em" }}>{p.title}</p>
              <p className="body-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Portrait image with link */}
        <motion.div initial={{ opacity:0,scale:0.98 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ duration:0.9 }}
          className="relative overflow-hidden" style={{ minHeight:"clamp(400px,50vw,600px)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=900&h=800&fit=crop"
            alt="Restaurant" className="absolute inset-0 w-full h-full object-cover block"/>
          <div className="absolute bottom-6 left-6">
            <Link href="/about"
              style={{
                display:"inline-flex",alignItems:"center",gap:10,
                background:"rgba(248,246,242,0.9)",backdropFilter:"blur(16px)",
                borderRadius:"100px",padding:"10px 20px",border:"1px solid rgba(248,246,242,0.2)",
                fontFamily:"var(--font-jost)",fontSize:10,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",
                color:"var(--fg)",textDecoration:"none",transition:"opacity 0.2s",
              }}
              className="hover:opacity-85">
              Our Philosophy
              <span style={{ width:22,height:22,background:"var(--fg)",color:"var(--bg)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11 }}>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
