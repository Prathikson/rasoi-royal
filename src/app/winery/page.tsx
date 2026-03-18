"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";

// Bottle placeholder component — transparent bg ready for real product images
function BottlePlaceholder({ label, color, idx }: { label: string; color: string; idx: number }) {
  return (
    <div className="flex flex-col items-center justify-end h-full" style={{ padding:"20px 16px 0" }}>
      <svg viewBox="0 0 80 200" className="w-full" style={{ maxHeight:"220px" }}>
        <defs>
          <linearGradient id={`bg${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9"/>
            <stop offset="100%" stopColor={color} stopOpacity="0.6"/>
          </linearGradient>
        </defs>
        {/* Bottle shape */}
        <path d="M28 0 L28 28 Q18 36 16 60 L14 80 L14 175 Q14 188 40 188 Q66 188 66 175 L66 80 L64 60 Q62 36 52 28 L52 0 Z"
          fill={`url(#bg${idx})`} stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        {/* Label */}
        <rect x="20" y="90" width="40" height="60" rx="2" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        <text x="40" y="112" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="5" fontFamily="serif" fontWeight="600" letterSpacing="0.5">RASOI</text>
        <text x="40" y="122" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="4.5" fontFamily="sans-serif" letterSpacing="0.3">ROYAL</text>
        <line x1="24" y1="128" x2="56" y2="128" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
        <text x="40" y="138" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="4" fontFamily="sans-serif" letterSpacing="0.2">{label.slice(0,12)}</text>
        {/* Neck label */}
        <rect x="26" y="10" width="28" height="14" rx="1" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
        <text x="40" y="20" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="3.5" fontFamily="sans-serif" letterSpacing="0.2">SELECTED</text>
        {/* Glass shine */}
        <path d="M22 65 Q20 100 20 160" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
      <p style={{ fontFamily:"var(--font-jost)", fontSize:"9px", fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginTop:"8px", textAlign:"center" }}>
        Place your product image here
      </p>
    </div>
  );
}

// Animated wave canvas
function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0; let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth * window.devicePixelRatio; canvas.height = canvas.offsetHeight * window.devicePixelRatio; ctx.scale(window.devicePixelRatio, window.devicePixelRatio); };
    resize(); window.addEventListener("resize", resize);
    const waves = [
      { y:.3, amp:30, freq:.008, sp:.018, c:"rgba(184,132,30,0.18)", lw:2 },
      { y:.4, amp:24, freq:.011, sp:.025, c:"rgba(212,164,58,0.14)", lw:1.5 },
      { y:.5, amp:18, freq:.014, sp:-.02, c:"rgba(240,192,96,0.10)", lw:1 },
      { y:.6, amp:28, freq:.007, sp:.015, c:"rgba(184,132,30,0.08)", lw:2.5 },
      { y:.65,amp:14, freq:.018, sp:-.03, c:"rgba(212,164,58,0.07)", lw:1 },
      { y:.7, amp:22, freq:.010, sp:.02,  c:"rgba(240,192,96,0.06)", lw:1.5 },
      { y:.35,amp:32, freq:.006, sp:.012, c:"rgba(184,132,30,0.05)", lw:3 },
    ];
    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0,0,w,h);
      waves.forEach(wave => {
        ctx.beginPath(); ctx.moveTo(0, h*wave.y);
        for(let x=0; x<=w; x+=2){
          const y = h*wave.y + Math.sin(x*wave.freq+t*wave.sp*60)*wave.amp + Math.sin(x*wave.freq*1.8+t*wave.sp*35)*wave.amp*0.35;
          ctx.lineTo(x,y);
        }
        ctx.strokeStyle = wave.c; ctx.lineWidth = wave.lw; ctx.stroke();
      });
      t += 0.016; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

const categories = ["All","Red Wine","White Wine","Rosé","Champagne","Whisky","Cocktails","Beer"];

const drinks = [
  { id:1,  name:"Château Margaux 2018",   region:"Bordeaux, France",    cat:"Red Wine",    price:"$28 / $145", bg:"#6b1a1a", img:null, desc:"Opulent dark fruit, cedar, violet. Silky tannins.", badge:"Reserve", alc:"13.5%" },
  { id:2,  name:"Barolo Serralunga 2017", region:"Piedmont, Italy",     cat:"Red Wine",    price:"$22 / $110", bg:"#8b2a2a", img:null, desc:"Tar, roses, dried cherries. Pairs magnificently with lamb.", badge:"Staff Pick", alc:"14%" },
  { id:3,  name:"Pouilly-Fumé 2022",      region:"Loire Valley, France",cat:"White Wine",  price:"$18 / $88",  bg:"#c8b84a", img:null, desc:"Mineral Sauvignon Blanc, citrus blossom, flinty finish.", alc:"12.5%" },
  { id:4,  name:"Cloudy Bay Sauvignon",   region:"Marlborough, NZ",     cat:"White Wine",  price:"$16 / $75",  bg:"#b8d460", img:null, desc:"Zesty passionfruit and gooseberry. Fresh and vibrant.", alc:"13%" },
  { id:5,  name:"Whispering Angel Rosé",  region:"Provence, France",    cat:"Rosé",        price:"$19 / $92",  bg:"#d4886a", img:null, desc:"Pale salmon, peach and white pepper. Definitive Provence.", badge:"Sommelier", alc:"13%" },
  { id:6,  name:"Billecart-Salmon Blanc", region:"Champagne, France",   cat:"Champagne",   price:"$32 / $165", bg:"#c4b060", img:null, desc:"Delicate bubbles, green apple, brioche, toasty finish.", badge:"Celebration", alc:"12%" },
  { id:7,  name:"Macallan 18yr",          region:"Speyside, Scotland",  cat:"Whisky",      price:"$42 / glass",bg:"#8b5a1a", img:null, desc:"Rich dried fruit, spice, dark chocolate. Sherry casks.", badge:"Rare", alc:"43%" },
  { id:8,  name:"Hibiki Harmony",         region:"Japan",               cat:"Whisky",      price:"$38 / glass",bg:"#a8642a", img:null, desc:"Honey, candied orange, rose. Silky and complex.", alc:"43%" },
  { id:9,  name:"Mango Lassi Martini",    region:"House Signature",     cat:"Cocktails",   price:"$16",        bg:"#d4a030", img:null, desc:"Alphonso mango purée, cardamom vodka, rosewater.", badge:"Signature", alc:"14%" },
  { id:10, name:"Saffron Old Fashioned",  region:"House Signature",     cat:"Cocktails",   price:"$18",        bg:"#b86a18", img:null, desc:"Saffron-infused bourbon, Indian demerara, orange smoke.", badge:"Signature", alc:"25%" },
  { id:11, name:"Spiced Chai Negroni",    region:"House Signature",     cat:"Cocktails",   price:"$17",        bg:"#8b4a30", img:null, desc:"Gin, Campari, masala chai vermouth, cinnamon ice.", alc:"22%" },
  { id:12, name:"Kingfisher Premium",     region:"India",               cat:"Beer",        price:"$8",         bg:"#1a5c1a", img:null, desc:"India's iconic lager. Light, crisp, refreshing.", alc:"4.8%" },
];

export default function WineryPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [activeId, setActiveId] = useState(drinks[0].id);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] });
  const heroY = useTransform(scrollYProgress, [0,1], ["0%","20%"]);

  const filtered = activeCat === "All" ? drinks : drinks.filter(d => d.cat === activeCat);
  const active = drinks.find(d => d.id === activeId) ?? drinks[0];

  return (
    <PageShell heroDark>
      {/* ── Cinematic hero with wave ── */}
      <div ref={heroRef} className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight:"100vh", background:"var(--dark2)" }}>
        <motion.div style={{ y:heroY }} className="absolute inset-0 scale-[1.15]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1800&h=1000&fit=crop" alt="Winery"
            className="w-full h-full object-cover" style={{ opacity:0.3 }}/>
          <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(18,14,6,0.5) 0%, rgba(18,14,6,0.3) 35%, rgba(18,14,6,0.7) 70%, rgba(18,14,6,0.98) 100%)" }}/>
        </motion.div>
        <WaveCanvas />
        <div className="relative z-10 px-8 md:px-14 pb-16">
          <motion.span className="lbl lbl-gold block mb-4" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}>The Cellar</motion.span>
          <motion.h1 initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.45,duration:1,ease:[0.22,1,0.36,1] }}
            style={{ lineHeight:0.92, color:"#f8f6f2" }}>
            <span style={{ fontFamily:"var(--font-playfair),serif", fontStyle:"italic", fontWeight:400, letterSpacing:"-0.03em", fontSize:"clamp(52px,9.5vw,144px)", display:"block", color:"#f8f6f2" }}>Wines &amp;</span>
            <span style={{ fontFamily:"var(--font-playfair),serif", fontStyle:"italic", fontWeight:400, letterSpacing:"-0.03em", fontSize:"clamp(44px,8vw,124px)", color:"rgba(248,246,242,0.38)", display:"block" }}>Spirits</span>
          </motion.h1>
          <motion.p initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.7,duration:0.8 }}
            style={{ fontFamily:"var(--font-jost)", fontSize:"clamp(13px,1.4vw,15px)", fontWeight:300, color:"rgba(240,232,213,0.45)", lineHeight:1.8, maxWidth:420, marginTop:16 }}>
            A curated cellar of 200+ labels — thoughtfully paired with our royal Indian menu by our in-house sommelier.
          </motion.p>
        </div>
      </div>

      {/* ── Interactive showcase — like reference product spotlight ── */}
      <div style={{ background:"var(--dark)", borderTop:"1px solid rgba(184,132,30,0.15)" }}>
        {/* Category filter bar */}
        <div className="px-8 md:px-14 py-6 flex gap-2 flex-wrap" style={{ borderBottom:"1px solid rgba(184,132,30,0.1)", overflowX:"auto" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCat(cat); if(cat!=="All"){ const first = drinks.find(d=>d.cat===cat); if(first) setActiveId(first.id); }}}
              style={{ fontFamily:"var(--font-jost)", fontSize:"11px", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 18px", borderRadius:"1px", border:"1px solid", borderColor:activeCat===cat?"var(--gold)":"rgba(184,132,30,0.2)", background:activeCat===cat?"var(--gold)":"transparent", color:activeCat===cat?"#fff":"rgba(240,232,213,0.45)", cursor:"pointer", transition:"all 0.2s", whiteSpace:"nowrap" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Two-panel interactive view */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] min-h-screen">
          {/* Left: bottle showcase */}
          <div className="relative flex flex-col items-center justify-center overflow-hidden"
            style={{ background:`linear-gradient(160deg, ${active.bg}22 0%, ${active.bg}08 100%)`, minHeight:"60vh", borderRight:"1px solid rgba(184,132,30,0.1)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={active.id} className="flex flex-col items-center gap-6"
                initial={{ opacity:0, y:32, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-20, scale:0.95 }}
                transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}>
                {/* Bottle — transparent bg placeholder  */}
                <div style={{ width:"clamp(120px,16vw,200px)", height:"clamp(260px,32vw,400px)", position:"relative" }}>
                  <BottlePlaceholder label={active.name} color={active.bg} idx={active.id}/>
                </div>
                {/* Price pill */}
                <div className="rounded-[1px] px-5 py-2.5" style={{ background:"rgba(184,132,30,0.12)", border:"1px solid rgba(184,132,30,0.25)" }}>
                  <p style={{ fontFamily:"var(--font-playfair)", fontSize:"22px", fontWeight:400, color:"var(--gold2)", textAlign:"center" }}>{active.price}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Decorative circle */}
            <div className="absolute rounded-full pointer-events-none" style={{ width:"60vh", height:"60vh", border:"1px solid rgba(184,132,30,0.06)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
            <div className="absolute rounded-full pointer-events-none" style={{ width:"40vh", height:"40vh", border:"1px solid rgba(184,132,30,0.08)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
          </div>

          {/* Right: detail panel + list */}
          <div className="flex flex-col">
            {/* Active item detail */}
            <AnimatePresence mode="wait">
              <motion.div key={active.id} className="px-8 md:px-12 py-10 flex-1"
                style={{ borderBottom:"1px solid rgba(184,132,30,0.1)" }}
                initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}
                transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}>
                {active.badge && (
                  <span style={{ fontFamily:"var(--font-jost)", fontSize:"9px", fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", background:"linear-gradient(135deg,#b07d2e 0%,#c89a4a 50%,#b07d2e 100%)", color:"#fff", padding:"3px 12px", borderRadius:"1px", display:"inline-block", marginBottom:16 }}>{active.badge}</span>
                )}
                <p style={{ fontFamily:"var(--font-jost)", fontSize:"11px", fontWeight:500, letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>{active.region}</p>
                <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(24px,3.5vw,44px)", fontWeight:400, letterSpacing:"-0.02em", lineHeight:1.05, color:"#f0e8d5", marginBottom:12 }}>{active.name}</h2>
                <p style={{ fontFamily:"var(--font-jost)", fontSize:"14px", fontWeight:300, color:"rgba(240,232,213,0.5)", lineHeight:1.8, marginBottom:16 }}>{active.desc}</p>
                <div className="flex gap-6 flex-wrap mb-8">
                  {[["Category",active.cat],["ABV",active.alc],["Price",active.price]].map(([l,v]) => (
                    <div key={l}>
                      <p style={{ fontFamily:"var(--font-jost)", fontSize:"9px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(184,132,30,0.5)", marginBottom:4 }}>{l}</p>
                      <p style={{ fontFamily:"var(--font-jost)", fontSize:"14px", fontWeight:400, color:"rgba(240,232,213,0.8)" }}>{v}</p>
                    </div>
                  ))}
                </div>
                <Link href="/contact" style={{ fontFamily:"var(--font-jost)", fontSize:"10px", fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", background:"linear-gradient(135deg,#b07d2e 0%,#c89a4a 50%,#b07d2e 100%)", color:"#fff", padding:"11px 24px", borderRadius:"1px", display:"inline-block", transition:"opacity 0.2s" }} className="hover:opacity-85">
                  Reserve & Request Pairing
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Scrollable list */}
            <div className="overflow-y-auto" style={{ maxHeight:"420px" }}>
              {filtered.map((d, i) => (
                <button key={d.id} onClick={() => setActiveId(d.id)}
                  className="w-full flex items-center gap-5 px-8 md:px-12 py-5 text-left transition-all cursor-pointer"
                  style={{ background:activeId===d.id?"rgba(184,132,30,0.1)":"transparent", borderBottom:"1px solid rgba(184,132,30,0.07)", border:"none", borderBottom:"1px solid rgba(184,132,30,0.07)" }}>
                  {/* Colour swatch */}
                  <div className="w-8 h-8 rounded-[2px] shrink-0" style={{ background:d.bg, opacity:0.8 }}/>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily:"var(--font-playfair),serif", fontSize:"15px", fontWeight:400, color:activeId===d.id?"#f0e8d5":"rgba(240,232,213,0.55)", letterSpacing:"-0.01em", lineHeight:1.2 }}>{d.name}</p>
                    <p style={{ fontFamily:"var(--font-jost)", fontSize:"10px", fontWeight:300, color:"rgba(184,132,30,0.4)", marginTop:2 }}>{d.region}</p>
                  </div>
                  <span style={{ fontFamily:"var(--font-playfair)", fontSize:"14px", fontWeight:500, color:"var(--gold2)", flexShrink:0 }}>{d.price}</span>
                  {/* Counter */}
                  <span style={{ fontFamily:"var(--font-jost)", fontSize:"9px", fontWeight:500, color:"rgba(184,132,30,0.25)", minWidth:22, textAlign:"right" }}>0{i+1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* ── Wine & Drinks List by Category ── */}
      <div style={{ background:"var(--bg)", borderTop:"1px solid var(--border)" }}>
        <div className="px-8 md:px-16 py-16">
          <p className="lbl lbl-gold mb-4">The Menu</p>
          <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(36px,5.5vw,80px)",letterSpacing:"-0.03em",lineHeight:0.95,color:"var(--fg)",marginBottom:48 }}>
            Wines & Spirits
          </h2>
          {[
            { cat:"Red Wine", items:[{n:"Château Margaux 2018",reg:"Bordeaux, France",size:"75cl",abv:"13.5%",price:"$28 / $145"},{n:"Barolo Serralunga 2017",reg:"Piedmont, Italy",size:"75cl",abv:"14%",price:"$22 / $110"},{n:"Malbec Reserve 2020",reg:"Mendoza, Argentina",size:"75cl",abv:"13.8%",price:"$16 / $78"}] },
            { cat:"White Wine", items:[{n:"Pouilly-Fumé 2022",reg:"Loire Valley, France",size:"75cl",abv:"12.5%",price:"$18 / $88"},{n:"Cloudy Bay Sauvignon 2023",reg:"Marlborough, NZ",size:"75cl",abv:"13%",price:"$16 / $75"},{n:"Chablis Premier Cru 2021",reg:"Burgundy, France",size:"75cl",abv:"12.8%",price:"$22 / $105"}] },
            { cat:"Rosé", items:[{n:"Whispering Angel 2023",reg:"Provence, France",size:"75cl",abv:"13%",price:"$19 / $92"},{n:"Miraval Studio 2023",reg:"Provence, France",size:"75cl",abv:"12.5%",price:"$17 / $82"}] },
            { cat:"Champagne & Sparkling", items:[{n:"Billecart-Salmon Blanc de Blancs",reg:"Champagne, France",size:"75cl",abv:"12%",price:"$32 / $165"},{n:"Moët & Chandon Impérial",reg:"Champagne, France",size:"75cl",abv:"12%",price:"$22 / $110"},{n:"Aperol Spritz",reg:"Prosecco DOC",size:"25cl",abv:"8%",price:"$16"}] },
            { cat:"Whisky & Spirits", items:[{n:"The Macallan 18yr",reg:"Speyside, Scotland",size:"50ml",abv:"43%",price:"$42"},{n:"Hibiki Harmony",reg:"Japan",size:"50ml",abv:"43%",price:"$38"},{n:"Grey Goose Vodka",reg:"France",size:"50ml",abv:"40%",price:"$14"},{n:"Monkey 47 Gin",reg:"Black Forest, Germany",size:"50ml",abv:"47%",price:"$16"}] },
            { cat:"Signature Cocktails", items:[{n:"Mango Lassi Martini",reg:"House Signature",size:"200ml",abv:"14%",price:"$16"},{n:"Saffron Old Fashioned",reg:"House Signature",size:"180ml",abv:"25%",price:"$18"},{n:"Spiced Chai Negroni",reg:"House Signature",size:"180ml",abv:"22%",price:"$17"},{n:"Rose Petal Spritz",reg:"House Signature",size:"200ml",abv:"8%",price:"$14"}] },
            { cat:"Beer & Cider", items:[{n:"Kingfisher Premium",reg:"India",size:"330ml",abv:"4.8%",price:"$8"},{n:"Bira 91 White",reg:"India",size:"330ml",abv:"4.9%",price:"$9"},{n:"Pear Cider",reg:"Ontario, Canada",size:"330ml",abv:"4.5%",price:"$8"}] },
          ].map((group, gi) => (
            <div key={group.cat} style={{ marginBottom:36, borderTop: gi===0?"none":"1px solid var(--border)", paddingTop: gi===0?0:32 }}>
              <p style={{ fontFamily:"var(--font-jost)",fontSize:10,fontWeight:600,letterSpacing:"0.22em",textTransform:"uppercase",color:"var(--gold)",marginBottom:16 }}>{group.cat}</p>
              <div>
                {group.items.map((item,ii) => (
                  <div key={item.n} className="flex items-baseline justify-between flex-wrap gap-2 py-3"
                    style={{ borderBottom:"1px solid var(--border)", gap:"8px" }}>
                    <div className="flex items-baseline gap-4 flex-wrap flex-1 min-w-0">
                      <span style={{ fontFamily:"var(--font-playfair),serif",fontSize:"clamp(15px,1.8vw,18px)",fontWeight:400,letterSpacing:"-0.01em",color:"var(--fg)" }}>{item.n}</span>
                      <span style={{ fontFamily:"var(--font-jost)",fontSize:11,fontWeight:300,color:"var(--fg3)" }}>{item.reg}</span>
                    </div>
                    <div className="flex items-baseline gap-5 shrink-0">
                      <span style={{ fontFamily:"var(--font-jost)",fontSize:11,fontWeight:400,color:"var(--fg3)",letterSpacing:"0.06em" }}>{item.size}</span>
                      <span style={{ fontFamily:"var(--font-jost)",fontSize:11,fontWeight:400,color:"var(--fg3)",letterSpacing:"0.06em" }}>{item.abv}</span>
                      <span style={{ fontFamily:"var(--font-playfair),serif",fontSize:16,fontWeight:400,color:"var(--gold)" }}>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sommelier CTA */}
      <div className="px-6 md:px-14 py-16" style={{ background:"var(--dark)", borderTop:"1px solid rgba(184,132,30,0.12)" }}>
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 rounded-[3px]"
          style={{ border:"1px solid rgba(184,132,30,0.18)", background:"rgba(184,132,30,0.05)" }}>
          <div>
            <span style={{ fontSize:"28px" }}>🍷</span>
            <h3 style={{ fontFamily:"var(--font-playfair)", fontSize:"clamp(22px,3vw,38px)", fontWeight:400, letterSpacing:"-0.02em", color:"#f0e8d5", marginTop:8 }}>Ask our Sommelier</h3>
            <p style={{ fontFamily:"var(--font-jost)", fontSize:"13px", fontWeight:300, color:"rgba(240,232,213,0.4)", marginTop:8, lineHeight:1.75 }}>Our in-house sommelier curates pairings tailored to your meal and palate preferences.</p>
          </div>
          <Link href="/contact" className="btn-dark shrink-0">Book a Pairing Session</Link>
        </div>
      </div>
    </PageShell>
  );
}
