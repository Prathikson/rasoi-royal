"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const offers = [
  { id:1, idx:"01", title:"Royal Sunday Brunch",  badge:"Every Sunday",  price:"$65", img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=600&fit=crop", desc:"40+ dishes from across India. Live ghazal music, bottomless chai, and Bollywood brunch cocktails." },
  { id:2, idx:"02", title:"Chef's Tasting Menu",   badge:"Nightly",       price:"$120",img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&h=600&fit=crop", desc:"Seven courses by Chef Arjun Mehta, each paired with wines from our curated cellar." },
  { id:3, idx:"03", title:"Diwali Celebration",    badge:"Oct – Nov",     price:"$85", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900&h=600&fit=crop", desc:"Celebrate the festival of lights — traditional sweets, royal mains, and firework desserts." },
  { id:4, idx:"04", title:"Private Dining",        badge:"By Request",    price:"POA", img:"https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=900&h=600&fit=crop", desc:"Exclusive rooms for up to 40 guests with bespoke menus, A/V, and dedicated service." },
];

export function Offers() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-5% 0px" });
  const [hov, setHov] = useState<number|null>(null);

  return (
    <section style={{ background:"var(--white)" }} ref={ref}>
      {/* Header */}
      <div className="px-8 md:px-16 pt-20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8"
        style={{ borderBottom:"1px solid var(--border)" }}>
        <motion.div initial={{ opacity:0,x:-18 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7 }}>
          <p className="lbl mb-3">Experiences</p>
          <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(36px,5.5vw,84px)",letterSpacing:"-0.025em",lineHeight:0.95,color:"var(--fg)" }}>
            Offers &<br/>Occasions
          </h2>
        </motion.div>
        <motion.p className="body-md" style={{ maxWidth:260 }} initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.3 }}>
          Every occasion deserves a setting that matches the moment.
        </motion.p>
      </div>

      {/* Hover-reveal list rows */}
      {offers.map((o,i) => (
        <motion.div key={o.id}
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
          transition={{ delay:0.1+i*0.08, duration:0.6 }}
          onMouseEnter={() => setHov(o.id)} onMouseLeave={() => setHov(null)}
          style={{ borderBottom:"1px solid var(--border)", position:"relative", overflow:"hidden", cursor:"default" }}>

          {/* Hover bg image */}
          <AnimatePresence>
            {hov===o.id && (
              <motion.div className="absolute inset-0 pointer-events-none"
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.35 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.img} alt="" className="w-full h-full object-cover"/>
                <div className="absolute inset-0" style={{ background:"rgba(248,246,242,0.87)" }}/>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative z-10 px-8 md:px-16 py-7 flex items-center gap-6 flex-wrap">
            <span style={{ fontFamily:"var(--font-jost)",fontSize:11,fontWeight:400,color:"var(--fg3)",minWidth:26,letterSpacing:"0.06em" }}>{o.idx}</span>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
              <h3 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(18px,2.5vw,32px)",letterSpacing:"-0.015em",color:"var(--fg)",lineHeight:1.1 }}>
                {o.title}
              </h3>
              <AnimatePresence>
                {hov===o.id && (
                  <motion.p className="body-sm" style={{ maxWidth:380 }}
                    initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ duration:0.22 }}>
                    {o.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-5 ml-auto shrink-0">
              <span style={{ fontFamily:"var(--font-jost)",fontSize:10,fontWeight:400,color:"var(--fg3)",letterSpacing:"0.12em",textTransform:"uppercase",padding:"4px 12px",border:"1px solid var(--border)",borderRadius:"100px" }}>{o.badge}</span>
              <span style={{ fontFamily:"var(--font-playfair)",fontStyle:"italic",fontSize:20,fontWeight:400,color:"var(--fg)" }}>{o.price}<span style={{ fontFamily:"var(--font-jost)",fontSize:11,fontWeight:300,color:"var(--fg3)" }}>{o.price!=="POA"?" pp":""}</span></span>
              <Link href="/contact" style={{ width:34,height:34,borderRadius:"50%",background:"var(--fg)",color:"#f8f6f2",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",fontSize:14,transition:"opacity 0.2s" }} className="hover:opacity-70 shrink-0">→</Link>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
