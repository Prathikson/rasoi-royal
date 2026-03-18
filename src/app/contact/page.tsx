"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

// Constants for form options
const partySizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
const occasions = ["Anniversary", "Birthday", "Business", "Date Night", "Celebration", "Just Dining"];
const faqContact = [
  { q: "Do you take walk-ins?", a: "Yes, but we recommend reservations—especially for dinner service and weekends. Walk-ins are seated based on availability." },
  { q: "What's your cancellation policy?", a: "Please give us 24 hours' notice. For parties of 8+, we require 48 hours. Last-minute cancellations may incur a fee." },
  { q: "Can you accommodate dietary restrictions?", a: "Absolutely. We handle vegetarian, vegan, gluten-free, and allergy requests daily. Just let us know when booking." },
  { q: "Is there parking nearby?", a: "Street parking is available on Jasper Ave and surrounding streets. There's also a parkade two blocks east on 99 St." },
  { q: "Do you offer private dining?", a: "Yes! Our private room seats up to 16 guests. Perfect for celebrations, corporate dinners, or intimate gatherings. Contact us to arrange." }
];

// Booking Style Picker — cool minimal game for contact page
function BookingStylePicker() {
  const steps = [
    { id:"occasion", q:"What are you celebrating?",  opts:[{l:"Anniversary",e:"💍"},{l:"Birthday",e:"🎂"},{l:"Business Dinner",e:"💼"},{l:"Just Dining",e:"✦"}] },
    { id:"size",     q:"How many guests?",           opts:[{l:"Just the two of us",e:"2"},{l:"Small group (3–5)",e:"4"},{l:"Party of 6–10",e:"8"},{l:"Large event 10+",e:"12+"}] },
    { id:"vibe",     q:"What atmosphere?",           opts:[{l:"Romantic & intimate",e:"🕯️"},{l:"Lively & celebratory",e:"🥂"},{l:"Quiet & private",e:"◎"},{l:"The Chef's Table",e:"👨‍🍳"}] },
  ];

  const suggestions: Record<string,string> = {
    "Anniversary|Just the two of us|Romantic & intimate":  "A candlelit corner table in our main dining room, with a complimentary amuse-bouche from Chef Arjun.",
    "Anniversary|Just the two of us|Quiet & private":      "Our private alcove seats two — completely secluded with its own service team.",
    "Birthday|Small group (3–5)|Lively & celebratory":     "Our Chef's Table seats 4–6 and gives your group a front-row view of the kitchen. Unforgettable.",
    "Business Dinner|Small group (3–5)|Quiet & private":   "Private dining room with A/V setup and a pre-agreed menu — everything handled in advance.",
    "Just Dining|Just the two of us|The Chef's Table":     "Chef Arjun's five-course surprise menu. Available Tuesday–Thursday with advance booking.",
  };

  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [step, setStep] = useState(0);
  const [rec, setRec] = useState<string|null>(null);

  const pick = (id:string, opt:string) => {
    const a = { ...answers, [id]:opt };
    setAnswers(a);
    if (step < steps.length - 1) {
      setStep(s=>s+1);
    } else {
      const k = `${a.occasion}|${a.size}|${a.vibe}`;
      setRec(suggestions[k] || "We have the perfect table for you. Share your answers when you call and we will arrange everything.");
    }
  };

  const reset = () => { setAnswers({}); setStep(0); setRec(null); };
  const q = steps[step];

  return (
    <div className="rounded-[10px] overflow-hidden" style={{ border:"1px solid var(--border)", background:"var(--white)" }}>
      <div className="px-6 py-4" style={{ background:"var(--bg2)", borderBottom:"1px solid var(--border)" }}>
        <p className="lbl">Find your perfect table</p>
        {!rec && (
          <div className="flex gap-1.5 mt-2">
            {steps.map((_,i) => (
              <div key={i} className="h-0.5 flex-1 rounded-full transition-all" style={{ background:i<=step?"var(--gold)":"var(--border)" }}/>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {!rec ? (
          <motion.div key={step} initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:0.28 }}
            className="p-6">
            <p style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(16px,2vw,20px)",fontWeight:400,color:"var(--fg)",marginBottom:16,letterSpacing:"-0.01em" }}>{q.q}</p>
            <div className="grid grid-cols-2 gap-2">
              {q.opts.map(o => (
                <button key={o.l} onClick={() => pick(q.id,o.l)}
                  className="rounded-[6px] p-4 text-left cursor-pointer transition-all hover:bg-[var(--fg)] hover:text-[var(--white)] group"
                  style={{ background:"var(--bg2)",border:"1px solid var(--border)",fontFamily:"var(--font-jost)" }}>
                  <span style={{ display:"block",fontSize:20,marginBottom:6 }}>{o.e}</span>
                  <span style={{ fontSize:12,fontWeight:400,letterSpacing:"0.02em" }}>{o.l}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="rec" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}
            className="p-6">
            <span style={{ fontSize:32,display:"block",marginBottom:12 }}>✦</span>
            <p className="lbl lbl-gold mb-3">Our recommendation</p>
            <p style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(15px,1.8vw,19px)",fontWeight:400,color:"var(--fg)",lineHeight:1.6,letterSpacing:"-0.01em",marginBottom:20 }}>{rec}</p>
            <div className="flex gap-3 flex-wrap">
              <a href="tel:+17805550142" className="btn-dark">Call to Book</a>
              <button onClick={reset} className="btn-ghost">Start Over</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function ContactPage() {
  const [submitted,setSubmitted] = useState(false);
  const [form,setForm] = useState({ name:"",email:"",phone:"",occasion:"",size:"",date:"",time:"",notes:"" });
  const [openFaq,setOpenFaq] = useState<number|null>(null);
  const set=(k:string,v:string)=>setForm(f=>({...f,[k]:v}));
  const inputStyle: React.CSSProperties = { width:"100%", padding:"12px 16px", background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:"1px", fontSize:"14px", fontWeight:300, color:"var(--fg)", outline:"none", fontFamily:"var(--font-jost)" };
  const labelStyle: React.CSSProperties = { display:"block", fontSize:"10px", fontWeight:600, color:"var(--gold)", letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:8, fontFamily:"var(--font-jost)" };

  return (
    <PageShell heroDark>
      {/* Hero */}
      <div className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight:"55vh", background:"var(--dark)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity:0.2 }}/>
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top, var(--dark) 45%, transparent)" }}/>
        <div className="relative z-10 px-8 md:px-14 pb-14">
          <span className="lbl block mb-3">Get in Touch</span>
          <h1 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(46px,7.5vw,112px)", fontWeight:400, letterSpacing:"-0.025em", lineHeight:0.95, color:"#f0e8d5", fontStyle:"italic" }}>
            Reserve Your<br/><span style={{ color:"var(--gold2)" }}>Royal Table.</span>
          </h1>
        </div>
      </div>

      {/* Form + Info */}
      <div className="px-6 md:px-14 py-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16">
        <div>
          <h2 style={{ fontFamily:"var(--font-playfair)", fontSize:"28px", fontWeight:400, color:"var(--fg)", letterSpacing:"-0.015em", marginBottom:28 }}>Make a Reservation</h2>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="form" exit={{ opacity:0,y:-20 }} onSubmit={e=>{e.preventDefault();setSubmitted(true);}} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label style={labelStyle}>Full Name *</label><input required value={form.name} onChange={e=>set("name",e.target.value)} style={inputStyle} placeholder="Your name"/></div>
                  <div><label style={labelStyle}>Email *</label><input required type="email" value={form.email} onChange={e=>set("email",e.target.value)} style={inputStyle} placeholder="you@email.com"/></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label style={labelStyle}>Phone</label><input value={form.phone} onChange={e=>set("phone",e.target.value)} style={inputStyle} placeholder="+1 (780) 555-0000"/></div>
                  <div><label style={labelStyle}>Date *</label><input required type="date" value={form.date} onChange={e=>set("date",e.target.value)} style={inputStyle}/></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label style={labelStyle}>Time</label><select value={form.time} onChange={e=>set("time",e.target.value)} style={inputStyle}><option value="">Select…</option>{["11:30","12:00","12:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"].map(t=><option key={t}>{t}</option>)}</select></div>
                  <div><label style={labelStyle}>Party Size *</label><div className="flex flex-wrap gap-1.5 mt-1">{partySizes.map(s=><button type="button" key={s} onClick={()=>set("size",s)} style={{ fontFamily:"var(--font-jost)", fontSize:"12px", fontWeight:400, padding:"8px 14px", borderRadius:"1px", border:"1px solid", borderColor:form.size===s?"var(--gold)":"var(--border)", background:form.size===s?"var(--gold)":"transparent", color:form.size===s?"#fff":"var(--fg3)", cursor:"pointer", transition:"all 0.2s" }}>{s}</button>)}</div></div>
                </div>
                <div><label style={labelStyle}>Occasion</label><div className="flex flex-wrap gap-2">{occasions.map(o=><button type="button" key={o} onClick={()=>set("occasion",o)} style={{ fontFamily:"var(--font-jost)", fontSize:"11px", fontWeight:400, padding:"6px 14px", borderRadius:"1px", border:"1px solid", borderColor:form.occasion===o?"var(--gold)":"var(--border2)", background:form.occasion===o?"var(--gold)":"transparent", color:form.occasion===o?"#fff":"var(--fg3)", cursor:"pointer", transition:"all 0.2s" }}>{o}</button>)}</div></div>
                <div><label style={labelStyle}>Special Requests</label><textarea rows={4} value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder="Dietary requirements, allergies, special arrangements…" style={{ ...inputStyle, resize:"vertical", lineHeight:1.7 }}/></div>
                <button type="submit" className="btn-dark w-full" style={{ fontSize:"11px", padding:15 }}>Confirm Reservation</button>
                <p style={{ fontFamily:"var(--font-jost)", fontSize:"11px", fontWeight:300, color:"var(--fg3)", textAlign:"center" }}>Or call: <a href={`tel:${siteConfig.restaurant.phone}`} style={{ color:"var(--gold)" }}>{siteConfig.restaurant.phone}</a></p>
              </motion.form>
            ) : (
              <motion.div key="done" initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} className="py-16 text-center">
                <div style={{ fontSize:"44px", marginBottom:14 }}>🪔</div>
                <h3 style={{ fontFamily:"var(--font-playfair)", fontSize:"28px", fontWeight:400, color:"var(--fg)", marginBottom:10 }}>Your table awaits.</h3>
                <p style={{ fontFamily:"var(--font-jost)", fontSize:"14px", fontWeight:300, color:"var(--fg3)", lineHeight:1.75 }}>We&apos;ll confirm within 2 hours. Check your inbox.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-8">
          {[["📍","Address",siteConfig.restaurant.address],["📞","Phone",siteConfig.restaurant.phone],["✉️","Email",siteConfig.restaurant.email]].map(([icon,label,val])=>(
            <div key={label} className="flex gap-3 pb-5" style={{ borderBottom:"1px solid var(--border2)" }}>
              <span style={{ fontSize:"15px", flexShrink:0, marginTop:2 }}>{icon}</span>
              <div><p style={{ fontFamily:"var(--font-jost)", fontSize:"9px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:3 }}>{label}</p><p style={{ fontFamily:"var(--font-jost)", fontSize:"13px", fontWeight:300, color:"var(--fg2)" }}>{val}</p></div>
            </div>
          ))}
          <div>
            <p style={{ fontFamily:"var(--font-jost)", fontSize:"9px", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:10 }}>Hours</p>
            {Object.entries(siteConfig.restaurant.hours).map(([day,hrs])=>(
              <div key={day} className="flex justify-between py-2" style={{ borderBottom:"1px solid var(--border2)" }}>
                <span style={{ fontFamily:"var(--font-jost)", fontSize:"13px", fontWeight:400, color:"var(--fg)" }}>{day}</span>
                <span style={{ fontFamily:"var(--font-jost)", fontSize:"13px", fontWeight:300, color:"var(--fg3)" }}>{hrs}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-width interactive map ── */}
      <div style={{ borderTop:"1px solid var(--border2)" }}>
        <div className="px-8 md:px-14 py-8">
          <span className="lbl">Find Us</span>
          <h2 style={{ fontFamily:"var(--font-playfair)", fontSize:"clamp(28px,4vw,52px)", fontWeight:400, color:"var(--fg)", marginTop:10, marginBottom:0 }}>Visit Rasoi Royal</h2>
        </div>
        <div className="relative" style={{ height:"clamp(360px,45vw,520px)", background:"var(--bg3)" }}>
          <svg viewBox="0 0 1200 520" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(184,132,30,0.07)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="1200" height="520" fill="var(--bg2)"/>
            <rect width="1200" height="520" fill="url(#cgrid)"/>
            {/* Street network */}
            <g stroke="rgba(26,18,9,0.12)" fill="none">
              <line x1="0" y1="260" x2="1200" y2="260" strokeWidth="14" stroke="rgba(255,255,255,0.6)"/>
              <line x1="600" y1="0" x2="600" y2="520" strokeWidth="12" stroke="rgba(255,255,255,0.5)"/>
              <line x1="0" y1="130" x2="1200" y2="130" strokeWidth="6" stroke="rgba(255,255,255,0.35)"/>
              <line x1="0" y1="390" x2="1200" y2="390" strokeWidth="6" stroke="rgba(255,255,255,0.35)"/>
              <line x1="300" y1="0" x2="300" y2="520" strokeWidth="6" stroke="rgba(255,255,255,0.35)"/>
              <line x1="900" y1="0" x2="900" y2="520" strokeWidth="6" stroke="rgba(255,255,255,0.35)"/>
            </g>
            {/* Block fills */}
            {[[310,140,180,110],[310,270,180,110],[730,140,160,110],[730,270,160,110],[50,140,240,110],[50,270,240,110],[920,140,260,110],[920,270,260,110]].map(([x,y,w,h],i)=>(
              <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="var(--bg)" stroke="rgba(184,132,30,0.1)" strokeWidth="1"/>
            ))}
            {/* Street labels */}
            <text x="600" y="252" textAnchor="middle" fill="rgba(184,132,30,0.7)" fontSize="11" fontFamily="sans-serif" fontWeight="600" letterSpacing="1.5">JASPER AVE NW</text>
            <text x="593" y="200" fill="rgba(184,132,30,0.5)" fontSize="10" fontFamily="sans-serif" transform="rotate(-90,593,200)" letterSpacing="1">101 ST NW</text>
            {/* Restaurant pin */}
            <g transform="translate(600,260)">
              <circle r="32" fill="var(--gold)" opacity="0.15"/>
              <circle r="18" fill="var(--gold)" opacity="0.3"/>
              <circle r="10" fill="var(--gold)"/>
              <circle r="4" fill="white"/>
              <text x="0" y="-30" textAnchor="middle" fill="var(--fg)" fontSize="11" fontFamily="serif" fontWeight="700" letterSpacing="0.5">Rasoi Royal</text>
              <text x="0" y="-18" textAnchor="middle" fill="var(--fg3)" fontSize="9" fontFamily="sans-serif">10123 Jasper Ave</text>
            </g>
          </svg>
          {/* Direction buttons floating on map */}
          <div className="absolute bottom-6 left-6 flex gap-3">
            <a href="https://maps.apple.com/?q=Rasoi+Royal+Edmonton" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] transition-opacity hover:opacity-85"
              style={{ background:"rgba(248,245,239,0.95)", border:"1px solid var(--border)", backdropFilter:"blur(8px)" }}>
              <span style={{ fontSize:"14px" }}>🍎</span><span style={{ fontFamily:"var(--font-jost)", fontSize:"11px", fontWeight:500, color:"var(--fg)", letterSpacing:"0.08em" }}>Apple Maps</span>
            </a>
            <a href="https://maps.google.com/?q=Rasoi+Royal+Edmonton" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] transition-opacity hover:opacity-85"
              style={{ background:"rgba(248,245,239,0.95)", border:"1px solid var(--border)", backdropFilter:"blur(8px)" }}>
              <span style={{ fontSize:"14px" }}>🗺️</span><span style={{ fontFamily:"var(--font-jost)", fontSize:"11px", fontWeight:500, color:"var(--fg)", letterSpacing:"0.08em" }}>Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Full-width spice game ── */}
      <div className="px-6 md:px-14 py-16" style={{ borderTop:"1px solid var(--border2)", background:"var(--bg2)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="lbl">Interactive</span>
            <h2 style={{ fontFamily:"var(--font-playfair)", fontSize:"clamp(30px,4vw,56px)", fontWeight:400, letterSpacing:"-0.02em", color:"var(--fg)", marginTop:12 }}>
              Know Your<br/><em style={{ color:"var(--gold)" }}>Spices?</em>
            </h2>
            <p style={{ fontFamily:"var(--font-jost)", fontSize:"14px", fontWeight:300, color:"var(--fg3)", lineHeight:1.8, marginTop:12, maxWidth:340 }}>
              Test your spice knowledge before your visit. Score 50+ points and show your server for a complimentary masala chai.
            </p>
          </div>
          <BookingStylePicker />
        </div>
      </div>

      {/* ── Contact FAQ ── */}
      <div className="px-6 md:px-14 py-16" style={{ borderTop:"1px solid var(--border2)" }}>
        <span className="lbl block mb-4">Quick Answers</span>
        <h2 style={{ fontFamily:"var(--font-playfair)", fontSize:"clamp(26px,3.5vw,46px)", fontWeight:400, letterSpacing:"-0.02em", color:"var(--fg)", marginBottom:24 }}>Visit FAQ</h2>
        <div style={{ maxWidth:700 }}>
          {faqContact.map((f,i)=>(
            <div key={i} style={{ borderBottom:"1px solid var(--border2)" }}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer" style={{ background:"none", border:"none" }}>
                <span style={{ fontFamily:"var(--font-playfair)", fontSize:"17px", fontWeight:400, color:"var(--fg)", paddingRight:20 }}>{f.q}</span>
                <motion.span animate={{ rotate:openFaq===i?45:0 }} transition={{ duration:0.2 }} style={{ color:"var(--gold)", fontSize:20, lineHeight:1, flexShrink:0 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openFaq===i&&<motion.p initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }} transition={{ duration:0.3 }} style={{ overflow:"hidden", fontFamily:"var(--font-jost)", fontSize:"14px", fontWeight:300, color:"var(--fg3)", lineHeight:1.8, paddingBottom:16 }}>{f.a}</motion.p>}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
