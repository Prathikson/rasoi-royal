"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function CTASection() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-10% 0px" });

  return (
    <section className="px-8 md:px-16 py-6" ref={ref}>
      <motion.div
        initial={{ opacity:0,scale:0.99 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ duration:0.7 }}
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ background:"var(--fg)",borderRadius:10,padding:"clamp(64px,9vw,112px) clamp(32px,5vw,80px)",minHeight:"clamp(320px,42vw,500px)" }}>
        {/* subtle bg */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=1400&h=600&fit=crop" alt=""
          className="absolute inset-0 w-full h-full object-cover" style={{ opacity:0.1 }}/>
        <div className="relative z-10">
          <motion.p className="lbl" style={{ color:"rgba(248,246,242,0.35)",marginBottom:14 }}
            initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.2 }}>
            Reserve Your Table
          </motion.p>
          <motion.h2
            style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(40px,7vw,108px)",letterSpacing:"-0.03em",lineHeight:0.95,color:"#f8f6f2",marginBottom:20 }}
            initial={{ opacity:0,y:22 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.25,duration:0.8 }}>
            An evening<br/>you&apos;ll remember.
          </motion.h2>
          <motion.div className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity:0,y:12 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.45 }}>
            {/* Reserve = call the number */}
            <a href={`tel:${siteConfig.restaurant.phone}`}
              style={{
                display:"inline-flex",alignItems:"center",justifyContent:"space-between",gap:12,
                background:"rgba(248,246,242,0.92)",backdropFilter:"blur(16px)",
                borderRadius:"100px",padding:"10px 10px 10px 26px",
                border:"1px solid rgba(248,246,242,0.12)",
                fontFamily:"var(--font-jost)",fontSize:11,fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",
                color:"var(--fg)",textDecoration:"none",transition:"opacity 0.2s",
              }}
              className="hover:opacity-85">
              Reserve a Table
              <span style={{ width:34,height:34,borderRadius:"50%",background:"var(--fg)",color:"#f8f6f2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="2" y1="6" x2="10" y2="6"/><polyline points="7,3 10,6 7,9"/>
                </svg>
              </span>
            </a>
            <Link href="/menu"
              style={{ fontFamily:"var(--font-jost)",fontSize:11,fontWeight:400,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(248,246,242,0.45)",display:"flex",alignItems:"center",padding:"10px 20px",textDecoration:"none",transition:"color 0.2s" }}
              className="hover:!text-[rgba(248,246,242,0.85)]">
              Explore Menu →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
