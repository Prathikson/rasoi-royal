"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  { q:"How do I make a reservation?",           a:"Complete our online form or call us directly. We recommend booking 48 hours ahead for weekdays and a week ahead for weekends." },
  { q:"Do you cater for dietary requirements?",  a:"Yes. We have extensive vegetarian, vegan, and gluten-free options. Note any requirements during booking and our chef will accommodate fully." },
  { q:"Is there a dress code?",                  a:"Smart casual. We ask guests to avoid sportswear for dinner service. Jacket and tie are not required but welcomed." },
  { q:"Can I book for a private event?",         a:"We have private dining rooms for 10–40 guests. Contact our events team for bespoke menu and package options." },
  { q:"What is your cancellation policy?",       a:"24 hours' notice for individual bookings. Large groups (8+) require 48 hours' notice to avoid a cancellation fee." },
  { q:"Do you offer gift vouchers?",             a:"Yes — dining experience vouchers from $100. Contact us to arrange, or purchase in person at the restaurant." },
];

export function FAQ() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-8% 0px" });
  const [open, setOpen] = useState<number|null>(0);

  return (
    <section style={{ background:"var(--white)", padding:"clamp(80px,10vw,140px) 0" }} ref={ref}>
      <div className="px-8 md:px-16 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16">
        {/* Left */}
        <motion.div initial={{ opacity:0,x:-18 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7 }}>
          <p className="lbl mb-3">FAQ</p>
          <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(36px,5vw,76px)",letterSpacing:"-0.025em",lineHeight:0.95,color:"var(--fg)",marginBottom:16 }}>
            Questions<br/>answered.
          </h2>
          <p className="body-md" style={{ maxWidth:280,marginTop:12 }}>Can&apos;t find your answer? Get in touch directly.</p>
        </motion.div>

        {/* Accordion */}
        <div style={{ borderTop:"1px solid var(--border)" }}>
          {faqs.map((f,i) => (
            <motion.div key={i}
              initial={{ opacity:0,y:12 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.12+i*0.07,duration:0.5 }}
              style={{ borderBottom:"1px solid var(--border)" }}>
              <button onClick={() => setOpen(open===i?null:i)}
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
                style={{ background:"none",border:"none" }}>
                <span style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(15px,1.8vw,19px)",fontWeight:400,color:"var(--fg)",paddingRight:24,letterSpacing:"-0.01em",lineHeight:1.3 }}>{f.q}</span>
                <motion.div animate={{ rotate:open===i?45:0 }} transition={{ duration:0.22 }}
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background:open===i?"var(--fg)":"var(--bg2)",color:open===i?"var(--bg)":"var(--fg2)",border:"1px solid var(--border)",transition:"background 0.2s,color 0.2s" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="0" x2="5" y2="10"/><line x1="0" y1="5" x2="10" y2="5"/>
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open===i && (
                  <motion.p className="body-md"
                    style={{ paddingBottom:20,maxWidth:540 }}
                    initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }}
                    transition={{ duration:0.32,ease:[0.22,1,0.36,1] }}>
                    {f.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
