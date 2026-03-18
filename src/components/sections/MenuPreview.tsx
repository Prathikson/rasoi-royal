"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { menuItems } from "@/lib/menuData";

const featured = menuItems.filter(m => m.chef).slice(0, 6);
const cardBgs = ["#f0ebe0","#e8dfd0","#ede8dc","#e5ddd0","#ebe3d5","#e8e0d2"];

export function MenuPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-5% 0px" });

  return (
    <section style={{ background:"var(--white)", padding:"clamp(80px,10vw,130px) 0" }} ref={ref}>
      {/* Header */}
      <div className="px-8 md:px-16 mb-14">
        <motion.div initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}>
          <p className="lbl mb-4">Explore</p>
          <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(36px,5.5vw,84px)",letterSpacing:"-0.025em",lineHeight:0.95,color:"var(--fg)" }}>
            Signature dishes.
          </h2>
          <p className="body-md" style={{ maxWidth:360,marginTop:14 }}>
            Crafted from generations of royal recipes — refined for the modern palate.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll product cards */}
      <div style={{ overflowX:"auto", scrollbarWidth:"none", paddingBottom:6 }}>
        <div style={{ display:"flex",gap:12,paddingLeft:"clamp(32px,4vw,64px)",paddingRight:"clamp(32px,4vw,64px)",width:"max-content" }}>
          {featured.map((item,i) => (
            <motion.div key={item.id}
              initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.06*i, duration:0.6, ease:[0.22,1,0.36,1] }}
              style={{ width:"clamp(240px,26vw,320px)",flexShrink:0,cursor:"pointer" }}
              className="group">
              {/* Card image */}
              <div className="relative overflow-hidden"
                style={{ background:cardBgs[i%cardBgs.length],borderRadius:10,paddingBottom:"118%",position:"relative" }}>
                {/* Category tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="tag">{item.category}</span>
                </div>
                {/* Cart/add icon */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ background:"rgba(255,255,255,0.8)",backdropFilter:"blur(8px)" }}>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="var(--fg)" strokeWidth="1.4" strokeLinecap="round">
                    <line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/>
                  </svg>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.name} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover block transition-transform duration-600 group-hover:scale-105"/>
              </div>
              {/* Name + price */}
              <div style={{ padding:"13px 3px 3px" }}>
                <div className="flex items-start justify-between gap-2">
                  <p style={{ fontFamily:"var(--font-jost),sans-serif",fontSize:"10px",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--fg)",lineHeight:1.35,flex:1 }}>
                    {item.name}
                  </p>
                  <p style={{ fontFamily:"var(--font-playfair),serif",fontSize:"15px",fontWeight:400,color:"var(--gold)",flexShrink:0 }}>
                    {item.price}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="px-8 md:px-16 mt-12 flex items-center justify-between flex-wrap gap-4">
        <p className="body-sm">Stay nourished — without having to think about it.</p>
        <Link href="/menu" className="btn-ghost">View full menu →</Link>
      </div>
    </section>
  );
}
