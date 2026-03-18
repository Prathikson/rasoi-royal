"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";

const team = [
  { name:"Arjun Mehta",    role:"Executive Chef",     bio:"Trained at Taj Hotel culinary school and Le Cordon Bleu Paris. 22 years of royal Indian cuisine.",   img:"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=600&fit=crop&crop=faces", spec:"Mughlai & Kashmiri" },
  { name:"Priya Kapoor",   role:"Pastry Chef",        bio:"Graduate of IHMCT Mumbai. Reinterprets classic mithai as fine-dining dessert experiences.",           img:"https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=500&h=600&fit=crop&crop=faces", spec:"Royal Sweets" },
  { name:"Rajan Nair",     role:"Tandoor Specialist", bio:"Born in Kerala, trained in Lucknow. Guardian of our tandoor and the bread programme.",               img:"https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=500&h=600&fit=crop&crop=faces", spec:"Tandoor & Breads" },
  { name:"Meera Sundaram", role:"Head Sommelier",     bio:"WSET Level 4. Curates our 200-label cellar and our Indian-inspired cocktail programme.",              img:"https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&h=600&fit=crop&crop=faces", spec:"Wine & Cocktails" },
];

const journey = [
  { year:"2018", title:"The Vision",        desc:"Chef Arjun Mehta returns to Edmonton after two decades in Michelin-starred kitchens across London and Mumbai.", img:"https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&h=400&fit=crop" },
  { year:"2019", title:"The Foundation",    desc:"Two years of recipe development, spice sourcing from 12 regions, and perfecting the tasting menu.",             img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop" },
  { year:"2020", title:"Doors Open",        desc:"Rasoi Royal opens on Jasper Avenue. Fully booked within the first week.",                                       img:"https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=600&h=400&fit=crop" },
  { year:"2021", title:"Recognition",       desc:"Named Best New Restaurant by Avenue Magazine. Chef Arjun featured in enRoute's Canada's Best New Restaurants.", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop" },
  { year:"2022", title:"The Cellar Opens",  desc:"Our winery programme launches — a 200-label curated cellar with an in-house sommelier.",                       img:"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop" },
  { year:"2023", title:"Award Season",      desc:"Best Indian Restaurant Alberta (two consecutive years). Chef Arjun wins Best Chef Alberta.",                   img:"https://images.unsplash.com/photo-1488992783499-418eb1f62d08?w=600&h=400&fit=crop" },
];

// Horizontal draggable journey
function JourneyCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0));
    setScrollLeft(trackRef.current?.scrollLeft ?? 0);
    document.body.style.userSelect = "none";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };
  const onMouseUp = () => { setDragging(false); document.body.style.userSelect = ""; };

  return (
    <div>
      <div className="px-8 md:px-16 mb-6 flex items-center justify-between">
        <div>
          <p className="lbl mb-2">Our Journey</p>
          <h2 style={{ fontFamily:"var(--font-playfair),serif", fontStyle:"italic", fontWeight:400, fontSize:"clamp(30px,4.5vw,60px)", letterSpacing:"-0.025em", lineHeight:1.0, color:"var(--fg)" }}>
            From vision<br/><span style={{ color:"var(--fg3)" }}>to table.</span>
          </h2>
        </div>
        <p style={{ fontFamily:"var(--font-jost)", fontSize:"11px", fontWeight:400, color:"var(--fg3)", letterSpacing:"0.08em" }}>
          ← Drag to explore →
        </p>
      </div>

      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ overflowX:"auto", scrollbarWidth:"none", cursor:dragging?"grabbing":"grab", paddingLeft:"clamp(32px,4vw,64px)", paddingRight:"clamp(32px,4vw,64px)", paddingBottom:16 }}>
        <div style={{ display:"flex", gap:16, width:"max-content" }}>
          {journey.map((j,i) => (
            <motion.div key={j.year}
              initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.06, duration:0.5 }}
              style={{ width:"clamp(280px,32vw,400px)", flexShrink:0, borderRadius:10, overflow:"hidden", background:"var(--white)", border:"1px solid var(--border)" }}>
              {/* Image */}
              <div style={{ height:220, overflow:"hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={j.img} alt={j.title} loading="lazy" style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.5s",pointerEvents:"none" }}/>
              </div>
              {/* Text */}
              <div style={{ padding:"20px" }}>
                <p className="lbl lbl-gold mb-2">{j.year}</p>
                <h3 style={{ fontFamily:"var(--font-playfair),serif",fontSize:"19px",fontWeight:400,letterSpacing:"-0.01em",color:"var(--fg)",marginBottom:8 }}>{j.title}</h3>
                <p className="body-sm">{j.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


const aboutFaqs = [
  { q:"Who is Chef Arjun Mehta?",        a:"Chef Arjun trained at the Taj Hotel culinary school and Le Cordon Bleu in Paris. He spent 15 years in Michelin-starred kitchens in London and Mumbai before returning to Edmonton to open Rasoi Royal in 2020." },
  { q:"Where do your spices come from?",  a:"We source directly from family farms in Kochi, Jaipur, Coorg, and Varanasi — the same regions that supplied royal courts for centuries. We visit our farms annually." },
  { q:"What makes your food 'royal'?",    a:"Royal Indian cuisine refers to the style developed in the great courts of the Mughal Empire and Rajasthan. It is characterised by complex layering of spices, slow cooking, and the use of rare ingredients like saffron, rose water, and dried flowers." },
  { q:"Do you host private events?",      a:"Yes. Our private dining rooms seat 10–40 guests. We offer fully bespoke menus, floral arrangements, A/V setup, and dedicated service teams for corporate, social, and celebratory events." },
];

function AboutFAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <div style={{ maxWidth:640, borderTop:"1px solid var(--border)" }}>
      {aboutFaqs.map((f,i) => (
        <div key={i} style={{ borderBottom:"1px solid var(--border)" }}>
          <button onClick={() => setOpen(open===i?null:i)}
            className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
            style={{ background:"none",border:"none" }}>
            <span style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(15px,1.8vw,19px)",fontWeight:400,color:"var(--fg)",paddingRight:20,letterSpacing:"-0.01em" }}>{f.q}</span>
            <motion.div animate={{ rotate:open===i?45:0 }} transition={{ duration:0.22 }}
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background:open===i?"var(--fg)":"var(--bg2)",color:open===i?"var(--bg)":"var(--fg2)",transition:"background 0.2s" }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="0" x2="5" y2="10"/><line x1="0" y1="5" x2="10" y2="5"/></svg>
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {open===i && (
              <motion.p className="body-md" style={{ paddingBottom:18,maxWidth:520 }}
                initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }}
                transition={{ duration:0.3,ease:[0.22,1,0.36,1] }}>
                {f.a}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const questions = [
  { id:"heat",  q:"How do you like your heat?",  opts:["Mild & fragrant","Medium spice","Bring the fire"] },
  { id:"diet",  q:"Any dietary preference?",     opts:["Vegetarian","Non-vegetarian","Either works"] },
  { id:"style", q:"What mood are you in?",       opts:["Light & delicate","Rich & hearty","Something unique"] },
];

const recs: Record<string,{name:string;cat:string;price:string}> = {
  "Mild & fragrant|Vegetarian|Light & delicate":   { name:"Hara Bhara Kebab",    cat:"Appetizer",  price:"$13" },
  "Mild & fragrant|Vegetarian|Rich & hearty":      { name:"Shahi Paneer",        cat:"Main Course",price:"$20" },
  "Mild & fragrant|Non-vegetarian|Light & delicate":{ name:"Chicken Seekh Kebab",cat:"Appetizer",  price:"$16" },
  "Medium spice|Vegetarian|Rich & hearty":         { name:"Dal Makhani",         cat:"Main Course",price:"$18" },
  "Medium spice|Non-vegetarian|Rich & hearty":     { name:"Butter Chicken",      cat:"Main Course",price:"$24" },
  "Bring the fire|Non-vegetarian|Bring the fire":  { name:"Chicken Chettinad",   cat:"Main Course",price:"$25" },
  "Something unique|Either works|Something unique":{ name:"Dum Gosht Biryani",   cat:"Biryani",    price:"$29" },
};

function FlavorMatcher() {
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<{name:string;cat:string;price:string}|null>(null);

  const pick = (id:string, opt:string) => {
    const newAns = { ...answers, [id]:opt };
    setAnswers(newAns);
    if (step < questions.length-1) {
      setStep(s=>s+1);
    } else {
      const key = `${newAns.heat}|${newAns.diet}|${newAns.style}`;
      const match = recs[key] || { name:"Dal Makhani", cat:"Main Course", price:"$18" };
      setResult(match);
    }
  };

  const reset = () => { setAnswers({}); setStep(0); setResult(null); };
  const q = questions[step];

  return (
    <div className="rounded-[10px] overflow-hidden" style={{ border:"1px solid var(--border)" }}>
      <div className="px-6 py-5" style={{ background:"var(--bg2)", borderBottom:"1px solid var(--border)" }}>
        {!result
          ? <p style={{ fontFamily:"var(--font-jost)",fontSize:10,fontWeight:500,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--fg3)" }}>Question {step+1} of {questions.length}</p>
          : <p style={{ fontFamily:"var(--font-jost)",fontSize:10,fontWeight:500,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--gold)" }}>Your perfect dish</p>
        }
      </div>
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div key={step} initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:0.3 }}
            className="p-6">
            <p style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(18px,2.2vw,24px)",fontWeight:400,color:"var(--fg)",marginBottom:20,letterSpacing:"-0.01em" }}>{q.q}</p>
            <div className="flex flex-col gap-2">
              {q.opts.map(opt => (
                <button key={opt} onClick={() => pick(q.id, opt)}
                  className="text-left rounded-[6px] px-5 py-3.5 transition-all cursor-pointer hover:bg-[var(--fg)] hover:text-[var(--white)]"
                  style={{ fontFamily:"var(--font-jost)",fontSize:13,fontWeight:400,color:"var(--fg)",background:"var(--bg2)",border:"1px solid var(--border)" }}>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }}
            className="p-6 text-center">
            <p style={{ fontFamily:"var(--font-jost)",fontSize:10,fontWeight:500,letterSpacing:"0.18em",textTransform:"uppercase",color:"var(--fg3)",marginBottom:12 }}>{result.cat}</p>
            <p style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(24px,3vw,38px)",fontWeight:400,color:"var(--fg)",letterSpacing:"-0.02em",marginBottom:8 }}>{result.name}</p>
            <p style={{ fontFamily:"var(--font-playfair),serif",fontSize:22,fontWeight:400,color:"var(--gold)",marginBottom:24 }}>{result.price}</p>
            <div className="flex gap-3 justify-center">
              <a href="/menu" className="btn-dark">View on Menu</a>
              <button onClick={reset} className="btn-ghost">Try Again</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const imgY = useTransform(scrollYProgress,[0,1],["0%","20%"]);

  return (
    <PageShell heroDark>
      {/* Cinematic hero */}
      <div ref={heroRef} className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight:"90vh",background:"var(--dark)" }}>
        <motion.div style={{ y:imgY }} className="absolute inset-0 scale-[1.15]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=1600&h=900&fit=crop" alt=""
            className="w-full h-full object-cover" style={{ opacity:0.42 }}/>
          <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom,rgba(20,16,8,0.25) 0%,rgba(20,16,8,0.85) 100%)" }}/>
        </motion.div>
        <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3,duration:0.9 }}
          className="relative z-10 px-8 md:px-16 pb-16">
          <p className="lbl lbl-gold mb-4">Our Story</p>
          <h1 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,letterSpacing:"-0.03em",lineHeight:0.92,color:"#f8f6f2",fontSize:"clamp(56px,10vw,152px)" }}>
            Cooking from<br/><span style={{ color:"rgba(248,246,242,0.4)" }}>the heart of India.</span>
          </h1>
        </motion.div>
      </div>

      {/* About text */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ borderTop:"1px solid var(--border)" }}>
        <div className="px-8 md:px-16 py-16 lg:py-20">
          <p className="lbl mb-4">Philosophy</p>
          <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(30px,4.5vw,64px)",letterSpacing:"-0.025em",lineHeight:0.95,color:"var(--fg)",marginBottom:24 }}>
            Royalty is a<br/><span style={{ color:"var(--fg3)" }}>standard.</span>
          </h2>
          {["Every dish we serve traces its lineage to the royal kitchens of Rajasthan, the Mughal courts of Delhi, and the coastal tables of Kerala.",
            "We source our spices directly from family farms in Kochi, Jaipur, and Varanasi that supplied these courts for generations.",
            "Our promise: never compromise on authenticity, while presenting it with the refinement that Edmonton's finest dining deserves.",
          ].map((p,i) => <p key={i} className="body-md" style={{ marginBottom:16 }}>{p}</p>)}
        </div>
        <div className="relative overflow-hidden" style={{ minHeight:400 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=700&fit=crop" alt=""
            className="absolute inset-0 w-full h-full object-cover block"/>
        </div>
      </div>

      {/* Horizontal journey */}
      <div className="py-16" style={{ background:"var(--bg2)",borderTop:"1px solid var(--border)" }}>
        <JourneyCarousel />
      </div>

      {/* Team */}

      {/* ── Values / Mission / Vision ── */}
      <div style={{ background:"var(--fg)", borderTop:"1px solid rgba(248,246,242,0.08)" }}>
        <div className="px-8 md:px-16 py-20">
          <p className="lbl lbl-gold mb-4" style={{ color:"rgba(248,246,242,0.4)" }}>What Drives Us</p>
          <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(36px,5.5vw,80px)",letterSpacing:"-0.025em",lineHeight:0.95,color:"#f8f6f2",marginBottom:48 }}>
            Our principles.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background:"rgba(248,246,242,0.07)", borderRadius:8, overflow:"hidden" }}>
            {[
              { icon:"◎", label:"Our Mission", title:"Nourish authentically.", body:"To serve food that is rooted in the living tradition of Indian royal kitchens — made with integrity, without compromise, every single service." },
              { icon:"✦", label:"Our Vision",  title:"India's finest table.", body:"To be Canada's most celebrated Indian restaurant — a destination for those who believe that great food is one of life's most essential pleasures." },
              { icon:"◯", label:"Our Values",  title:"Honest. Royal. Kind.", body:"We disclose every ingredient, respect the craft of our farmers, and treat every guest as royalty. No black boxes. No shortcuts. No exceptions." },
            ].map(v => (
              <div key={v.label} className="px-8 py-10" style={{ background:"var(--fg)" }}>
                <span style={{ fontSize:28, display:"block", marginBottom:16, color:"var(--gold)" }}>{v.icon}</span>
                <p style={{ fontFamily:"var(--font-jost)",fontSize:10,fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(248,246,242,0.3)",marginBottom:10 }}>{v.label}</p>
                <p style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(18px,2.2vw,24px)",fontWeight:400,letterSpacing:"-0.015em",color:"rgba(248,246,242,0.82)",marginBottom:12 }}>{v.title}</p>
                <p style={{ fontFamily:"var(--font-jost)",fontSize:13,fontWeight:300,color:"rgba(248,246,242,0.38)",lineHeight:1.78 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="team" className="px-8 md:px-16 py-20" style={{ borderTop:"1px solid var(--border)" }}>
        <p className="lbl mb-3">The People</p>
        <h2 style={{ fontFamily:"var(--font-jost),sans-serif",fontWeight:800,textTransform:"uppercase",letterSpacing:"-0.02em",fontSize:"clamp(26px,4vw,56px)",lineHeight:1,color:"var(--fg)",marginBottom:4 }}>
          <span style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400 }}>Meet our team.</span>
        </h2>
        <p className="body-sm" style={{ marginTop:10,marginBottom:40 }}>Hover each card to learn more.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((m,i) => (
            <motion.div key={m.name}
              initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.09,duration:0.55 }}
              className="group relative rounded-[10px] overflow-hidden cursor-default"
              style={{ background:"var(--bg2)",border:"1px solid var(--border)" }}>
              <div className="relative overflow-hidden" style={{ height:"clamp(220px,28vw,360px)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.img} alt={m.name} loading="lazy"
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"/>
                {/* Hover overlay */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4"
                  style={{ background:"linear-gradient(to top,rgba(20,16,8,0.85) 0%,transparent 55%)" }}>
                  <p style={{ fontFamily:"var(--font-jost)",fontSize:"12px",fontWeight:300,color:"rgba(248,246,242,0.7)",lineHeight:1.65 }}>{m.bio}</p>
                </div>
              </div>
              <div style={{ padding:"14px 16px" }}>
                <p className="lbl lbl-gold mb-1">{m.role}</p>
                <p style={{ fontFamily:"var(--font-playfair),serif",fontSize:"17px",fontWeight:400,letterSpacing:"-0.01em",color:"var(--fg)" }}>{m.name}</p>
                <p style={{ fontFamily:"var(--font-jost)",fontSize:"11px",fontWeight:300,color:"var(--fg3)",marginTop:2 }}>{m.spec}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      {/* ── About FAQ ── */}
      <div className="px-8 md:px-16 py-20" style={{ background:"var(--bg2)", borderTop:"1px solid var(--border)" }}>
        <p className="lbl mb-4">Common Questions</p>
        <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(30px,4.5vw,64px)",letterSpacing:"-0.025em",lineHeight:0.95,color:"var(--fg)",marginBottom:40 }}>
          About us.
        </h2>
        <AboutFAQ />
      </div>

      {/* ── Flavor Matcher Mini-Game ── */}
      <div className="px-8 md:px-16 py-20" style={{ background:"var(--white)", borderTop:"1px solid var(--border)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="lbl mb-4">Interactive</p>
            <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(30px,4.5vw,64px)",letterSpacing:"-0.025em",lineHeight:0.95,color:"var(--fg)",marginBottom:16 }}>
              Find your<br/>perfect dish.
            </h2>
            <p className="body-md" style={{ maxWidth:340 }}>
              Answer three quick questions and we&apos;ll suggest the perfect dish to start your Rasoi Royal journey.
            </p>
          </div>
          <FlavorMatcher />
        </div>
      </div>

      {/* CTA */}
      <div className="px-8 md:px-16 pb-16">
        <div className="rounded-[10px] p-8 md:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={{ background:"var(--fg)" }}>
          <h3 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(22px,3vw,38px)",fontWeight:400,letterSpacing:"-0.015em",color:"#f8f6f2" }}>Come experience our story.</h3>
          <a href="tel:+17805550142" className="btn-reserve btn-reserve-light shrink-0">Reserve a Table</a>
        </div>
      </div>
    </PageShell>
  );
}
