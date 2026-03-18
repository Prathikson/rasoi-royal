"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const reviews = [
  { id:1, name:"Priya Sharma",    role:"Food Critic · Edmonton Journal", text:"Rasoi Royal delivers an experience unmatched in Western Canada. The Rogan Josh alone is worth the trip.", stars:5 },
  { id:2, name:"James MacKenzie", role:"Regular Guest",                  text:"We celebrate every anniversary here. The tasting menu is a journey through India's culinary history.", stars:5 },
  { id:3, name:"Aisha Patel",     role:"Verified Diner",                 text:"The most authentic dal makhani outside of Delhi. As someone who grew up on this, it brought tears to my eyes.", stars:5 },
  { id:4, name:"Robert Chen",     role:"Restaurant Guide Writer",        text:"Extraordinary depth of flavour. The spice blending is masterful — Rasoi Royal belongs in Canada's top 10.", stars:5 },
];

export function Testimonials() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-10% 0px" });
  const [active, setActive] = useState(0);
  useEffect(() => { const t = setInterval(() => setActive(a => (a+1)%reviews.length), 4800); return () => clearInterval(t); }, []);

  return (
    <section style={{ background:"var(--bg2)", padding:"clamp(80px,10vw,140px) 0" }} ref={ref}>
      <div className="px-8 md:px-16">
        <motion.div initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.65 }} className="mb-16">
          <p className="lbl mb-3">What Guests Say</p>
          <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(36px,5.5vw,84px)",letterSpacing:"-0.025em",lineHeight:0.95,color:"var(--fg)" }}>
            Voices of<br/>the table.
          </h2>
        </motion.div>

        {/* Featured quote */}
        <div className="max-w-2xl mb-12">
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-12 }}
              transition={{ duration:0.45,ease:[0.22,1,0.36,1] }}>
              <p style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(17px,2.3vw,28px)",color:"var(--fg)",lineHeight:1.5,marginBottom:20,letterSpacing:"-0.01em" }}>
                &ldquo;{reviews[active].text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background:"var(--bg3)" }}>
                  <span style={{ fontFamily:"var(--font-jost)",fontSize:10,fontWeight:500,color:"var(--fg)" }}>{reviews[active].name[0]}</span>
                </div>
                <div>
                  <p style={{ fontFamily:"var(--font-jost)",fontSize:13,fontWeight:400,color:"var(--fg)" }}>{reviews[active].name}</p>
                  <p className="lbl" style={{ letterSpacing:"0.1em",color:"var(--fg3)",fontSize:9 }}>{reviews[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mb-12">
          {reviews.map((_,i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ width:i===active?24:8,height:8,borderRadius:4,border:"none",background:i===active?"var(--fg)":"var(--border)",cursor:"pointer",transition:"all 0.3s" }}/>
          ))}
        </div>

        {/* 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {reviews.map((r,i) => (
            <motion.div key={r.id}
              initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.1+i*0.08,duration:0.55 }}
              onClick={() => setActive(i)}
              className="rounded-[8px] p-5 cursor-pointer transition-all"
              style={{ background:active===i?"var(--fg)":"var(--white)",border:`1px solid ${active===i?"var(--fg)":"var(--border)"}` }}>
              <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_,si) => <span key={si} style={{ color:active===i?"rgba(248,246,242,0.5)":"var(--fg3)",fontSize:10 }}>★</span>)}</div>
              <p style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:13,fontWeight:400,color:active===i?"rgba(248,246,242,0.65)":"var(--fg2)",lineHeight:1.65,marginBottom:14 }}>
                &ldquo;{r.text.slice(0,75)}…&rdquo;
              </p>
              <p style={{ fontFamily:"var(--font-jost)",fontSize:12,fontWeight:400,color:active===i?"rgba(248,246,242,0.55)":"var(--fg)" }}>{r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
