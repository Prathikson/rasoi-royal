"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { menuItems, menuCategories, type MenuItem, type DietTag } from "@/lib/menuData";
import Link from "next/link";

// Extra nutrition data
const detail: Record<number,{ cal:number; ingredients:string[]; allergens:string[]; serves:string; story:string }> = {
  1: { cal:280, ingredients:["Cottage cheese","Saffron yoghurt","Lime","Cumin","Tandoor smoke"], allergens:["Dairy"], serves:"Starter for 2", story:"Our most requested starter. The paneer is made fresh daily, marinated for 6 hours." },
  2: { cal:320, ingredients:["Samosa","Chickpea curry","Tamarind","Mint foam","Pomegranate"], allergens:["Gluten","Dairy"], serves:"Starter for 2", story:"A street-food classic elevated with house-made tamarind and mint foam." },
  3: { cal:220, ingredients:["Spinach","Green peas","Cashews","Mint","Ginger"], allergens:["Tree nuts"], serves:"Starter for 2", story:"Light, vibrant, and completely plant-based. A favourite with health-conscious diners." },
  4: { cal:180, ingredients:["Semolina shells","Spiced yoghurt","Tamarind","Pomegranate"], allergens:["Gluten","Dairy"], serves:"Starter for 1", story:"Eaten in two bites — a burst of sweet, sour, and spice." },
  5: { cal:310, ingredients:["Minced chicken","Ginger","Coriander","Cardamom"], allergens:[], serves:"Starter for 2", story:"Char-marked from our live tandoor. Served minutes after cooking." },
  6: { cal:290, ingredients:["Sole fillet","Ajwain","Kashmiri chilli","Lime"], allergens:["Fish","Gluten"], serves:"Starter for 2", story:"A Punjab classic — crispy, fragrant, and best eaten hot." },
  7: { cal:350, ingredients:["Saffron lamb","Cardamom","Rose water","Raita"], allergens:["Dairy"], serves:"Starter for 2", story:"Delicate Mughal influence: rose water and cardamom lift the lamb." },
  8: { cal:380, ingredients:["Tiger prawns","Kokum sauce","Curry leaf oil"], allergens:["Shellfish"], serves:"Starter for 2", story:"Kerala coastal flavours — sour kokum and crisp curry leaf." },
  9: { cal:440, ingredients:["Black lentils","Smoked butter","Heavy cream","Fenugreek"], allergens:["Dairy"], serves:"Main for 2", story:"Slow-cooked for 24 hours. The depth of flavour cannot be rushed." },
  10:{ cal:520, ingredients:["Paneer","Cashew","Tomato","Cream","Rose petals"], allergens:["Dairy","Tree nuts"], serves:"Main for 2", story:"The 'royal' in our name is embodied in this dish." },
  11:{ cal:380, ingredients:["Organic tofu","Spinach","Ginger","Cumin"], allergens:["Soy"], serves:"Main for 2", story:"Vegan-friendly yet full of richness — a modern Indian classic." },
  12:{ cal:460, ingredients:["Chickpea flour","Yoghurt curry","Jodhpuri spices"], allergens:["Dairy","Gluten"], serves:"Main for 2", story:"Traditional Rajasthani village fare, now served in our dining room." },
  13:{ cal:680, ingredients:["Kashmiri lamb","Dried flowers","Mace","Cardamom"], allergens:["Dairy"], serves:"Main for 2-3", story:"Slow-braised for four hours. Flowers and mace are our signature additions." },
  14:{ cal:610, ingredients:["Tandoor chicken","Tomato","Butter","Cream","Fenugreek"], allergens:["Dairy"], serves:"Main for 2", story:"The dish that defined a generation of Indian restaurants. Ours is the original way." },
  15:{ cal:540, ingredients:["Fresh catch","Coconut milk","Kashmiri chilli","Tamarind"], allergens:["Fish","Dairy"], serves:"Main for 2", story:"Our chef's Goan heritage in a single bowl." },
  16:{ cal:590, ingredients:["Chicken","Black pepper","Kalpasi","Coconut"], allergens:["Dairy"], serves:"Main for 2", story:"South India's boldest spice combination. Not for the faint-hearted." },
  17:{ cal:220, ingredients:["Leavened dough","Roasted garlic","Cultured butter"], allergens:["Gluten","Dairy"], serves:"Per piece", story:"Hand-stretched and slapped against the tandoor wall — the only way." },
  18:{ cal:180, ingredients:["Whole wheat","Layered dough","Light oil"], allergens:["Gluten"], serves:"Per piece", story:"Crisp layers from a slow-cooked tandoor. Pairs with any main." },
  19:{ cal:260, ingredients:["Almonds","Coconut","Raisins","Leavened dough"], allergens:["Gluten","Dairy","Tree nuts"], serves:"Per piece", story:"A Mughal-era recipe — the sweetness contrasts beautifully with spicy mains." },
  20:{ cal:820, ingredients:["Basmati","Hyderabadi lamb","Saffron","Caramelised onions"], allergens:["Dairy"], serves:"Main for 2-3", story:"Sealed and cooked dum-style. Opened tableside for the full aromatic effect." },
  21:{ cal:620, ingredients:["Basmati","Seasonal vegetables","Rose water","Saffron"], allergens:[], serves:"Main for 2", story:"Our most fragrant dish. Rose water is added moments before serving." },
  22:{ cal:740, ingredients:["Basmati","Tiger prawns","Coconut milk","Curry leaf"], allergens:["Shellfish"], serves:"Main for 2", story:"Malabar coast flavours — coconut and curry leaf lift the prawns." },
  23:{ cal:380, ingredients:["Milk solids","Rose-cardamom syrup","Pistachio","Saffron ice cream"], allergens:["Dairy","Tree nuts"], serves:"For 1", story:"Warm gulab, cold saffron ice cream — the contrast is everything." },
  24:{ cal:290, ingredients:["Chenna","Saffron milk","Rose petals","Cardamom"], allergens:["Dairy"], serves:"For 1-2", story:"Our chef's grandmother's recipe, unchanged since 1962." },
  25:{ cal:340, ingredients:["Kulfi","Basil seeds","Rose syrup","Vermicelli"], allergens:["Dairy","Gluten"], serves:"For 1", story:"Old Delhi street food — a complete sensory experience in one glass." },
};

const allCat = { id:"all", label:"All Dishes", sub:"Everything", icon:"✦" };
const allCats = [allCat, ...menuCategories];

const dietFilters: {id:DietTag;label:string;icon:string}[] = [
  {id:"veg",label:"Veg",icon:"🥗"},{id:"non-veg",label:"Non-Veg",icon:"🍗"},
  {id:"vegan",label:"Vegan",icon:"🌱"},{id:"gluten-free",label:"GF",icon:"◎"},
];

const cardBgs = ["#f0ebe0","#e8dfd0","#ede8dc","#e5ddd0","#ebe3d5","#e8e0d2","#f2ede2","#e8e4d8"];

function DietBadge({ tags }: { tags: DietTag[] }) {
  const v = tags.includes("vegan"), vg = tags.includes("veg"), gf = tags.includes("gluten-free");
  return (
    <div className="flex gap-1">
      {v  && <span style={{ fontSize:"8px",fontWeight:700,fontFamily:"var(--font-jost)",letterSpacing:"0.1em",background:"#1a5238",color:"#fff",padding:"2px 7px",borderRadius:"100px" }}>VEGAN</span>}
      {!v&&vg&&<span style={{ fontSize:"8px",fontWeight:700,fontFamily:"var(--font-jost)",letterSpacing:"0.1em",border:"1px solid #1a5238",color:"#1a5238",padding:"2px 7px",borderRadius:"100px" }}>VEG</span>}
      {!v&&!vg&&<span style={{ fontSize:"8px",fontWeight:700,fontFamily:"var(--font-jost)",letterSpacing:"0.1em",border:"1px solid #7a1515",color:"#7a1515",padding:"2px 7px",borderRadius:"100px" }}>NON-VEG</span>}
      {gf&&<span style={{ fontSize:"8px",fontWeight:700,fontFamily:"var(--font-jost)",letterSpacing:"0.1em",border:"1px solid #3a2a6a",color:"#3a2a6a",padding:"2px 7px",borderRadius:"100px" }}>GF</span>}
    </div>
  );
}

function SpiceIcons({ level }: { level?: 1|2|3 }) {
  if (!level) return null;
  return <span style={{ fontSize:"11px",letterSpacing:"1px" }}>{"🌶️".repeat(level)}</span>;
}

// Reference-style modal: slides up from bottom, covers 80% of screen
function ItemModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const d = detail[item.id] ?? { cal:320, ingredients:["Ask your server"], allergens:[], serves:"1 portion", story:"A celebrated dish from our kitchen." };
  return (
    <motion.div className="fixed inset-0 z-[500] flex items-end"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.3 }}
      onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background:"rgba(20,16,8,0.65)", backdropFilter:"blur(6px)" }}/>

      {/* Sheet — slides up from bottom, 80vh */}
      <motion.div className="relative w-full rounded-t-[20px] overflow-hidden"
        style={{ background:"var(--white)", height:"82vh", maxHeight:"82vh" }}
        initial={{ y:"100%" }} animate={{ y:0 }} exit={{ y:"100%" }}
        transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
        onClick={e => e.stopPropagation()}>

        {/* Close pill */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full px-4 py-2"
          style={{ background:"var(--bg2)", border:"1px solid var(--border)", fontFamily:"var(--font-jost)", fontSize:"10px", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--fg)", cursor:"pointer" }}>
          Close ×
        </button>

        {/* Two-column layout — image left, details right */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Left: image */}
          <div className="relative overflow-hidden" style={{ background:cardBgs[item.id%cardBgs.length] }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.img} alt={item.name} className="w-full h-full object-cover block"/>
            {/* Category tag */}
            <div className="absolute top-5 left-5">
              <span className="tag">{item.category}</span>
            </div>
          </div>

          {/* Right: scrollable details */}
          <div className="overflow-y-auto h-full" style={{ padding:"clamp(28px,4vw,52px)" }}>
            {/* Category + name */}
            <p className="lbl lbl-gold mb-2">{item.category} — {item.subcategory.replace("-"," ")}</p>
            <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(26px,3.5vw,42px)", fontWeight:400, letterSpacing:"-0.015em", color:"var(--fg)", marginBottom:10, lineHeight:1.1 }}>
              {item.name}
            </h2>
            <div className="flex items-center gap-3 mb-5">
              <DietBadge tags={item.tags} />
              <SpiceIcons level={item.spice} />
            </div>

            {/* Price + Calories row */}
            <div className="flex gap-6 mb-6 pb-6" style={{ borderBottom:"1px solid var(--border)" }}>
              <div>
                <p className="lbl mb-1">Price</p>
                <p style={{ fontFamily:"var(--font-playfair),serif", fontSize:"32px", fontWeight:400, color:"var(--gold)", lineHeight:1 }}>{item.price}</p>
              </div>
              <div>
                <p className="lbl mb-1">Calories</p>
                <p style={{ fontFamily:"var(--font-playfair),serif", fontSize:"32px", fontWeight:400, color:"var(--fg)", lineHeight:1 }}>{d.cal} <span style={{ fontSize:"14px", color:"var(--fg3)" }}>kcal</span></p>
              </div>
              <div>
                <p className="lbl mb-1">Serves</p>
                <p style={{ fontFamily:"var(--font-jost)", fontSize:"13px", fontWeight:300, color:"var(--fg2)", lineHeight:1.2, paddingTop:4 }}>{d.serves}</p>
              </div>
            </div>

            {/* Story */}
            <p className="lbl mb-2">The Dish</p>
            <p className="body-md mb-6">{d.story}</p>
            <p className="body-sm mb-8">{item.desc}</p>

            {/* Ingredients */}
            <p className="lbl mb-3">Key Ingredients</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {d.ingredients.map(ing => (
                <span key={ing} style={{ fontFamily:"var(--font-jost)", fontSize:"11px", fontWeight:400, color:"var(--fg2)", background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:"100px", padding:"5px 14px" }}>{ing}</span>
              ))}
            </div>

            {/* Allergens */}
            {d.allergens.length > 0 && (
              <>
                <p className="lbl mb-3">Allergens</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {d.allergens.map(a => (
                    <span key={a} style={{ fontFamily:"var(--font-jost)", fontSize:"11px", fontWeight:500, color:"#7a1515", border:"1px solid rgba(122,21,21,0.25)", borderRadius:"100px", padding:"5px 14px" }}>{a}</span>
                  ))}
                </div>
              </>
            )}

            {/* CTA */}
            <Link href="/contact" className="btn-dark" style={{ width:"100%", justifyContent:"center", borderRadius:8, padding:"15px" }}>
              Reserve & Order This Dish
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [diet, setDiet] = useState<DietTag[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MenuItem|null>(null);
  const toggleDiet = (t:DietTag) => setDiet(f => f.includes(t)?f.filter(x=>x!==t):[...f,t]);

  const filtered = useMemo(() => {
    let items = activeCat==="all" ? menuItems : menuItems.filter(i=>i.subcategory===activeCat);
    if (diet.length>0) items = items.filter(i=>diet.every(d=>i.tags.includes(d)));
    if (search.trim()) items = items.filter(i=>i.name.toLowerCase().includes(search.toLowerCase())||i.desc.toLowerCase().includes(search.toLowerCase()));
    return items;
  }, [activeCat,diet,search]);

  return (
    <PageShell heroDark>
      {/* Page hero — consistent with other pages */}
      <div className="relative overflow-hidden flex flex-col justify-end"
        style={{ minHeight:"52vh", background:"var(--dark)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1600&h=700&fit=crop" alt=""
          className="absolute inset-0 w-full h-full object-cover" style={{ opacity:0.2 }}/>
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top, var(--dark) 45%, transparent)" }}/>
        <motion.div className="relative z-10 px-8 md:px-16 pb-14"
          initial={{ opacity:0,y:28 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.8 }}>
          <p className="lbl lbl-gold mb-3">Our Menu</p>
          <h1 style={{ fontFamily:"var(--font-playfair),serif", fontStyle:"italic", fontWeight:400, letterSpacing:"-0.03em", lineHeight:0.95, fontSize:"clamp(44px,7vw,112px)", color:"#f8f6f2" }}>
            Every dish<br/><span style={{ color:"rgba(248,246,242,0.38)" }}>tells a story.</span>
          </h1>
        </motion.div>
      </div>

      <div className="px-6 md:px-10 lg:px-16 py-10">
        {/* Search + diet filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative max-w-sm">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search dishes…"
              style={{ width:"100%",padding:"11px 16px 11px 38px",background:"var(--white)",border:"1px solid var(--border)",borderRadius:"100px",fontSize:"13px",fontWeight:300,color:"var(--fg)",outline:"none",fontFamily:"var(--font-jost)" }}/>
            <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:"var(--fg3)",fontSize:"14px" }}>◎</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dietFilters.map(d=>(
              <button key={d.id} onClick={()=>toggleDiet(d.id)}
                style={{ fontFamily:"var(--font-jost)",fontSize:"11px",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase",padding:"7px 16px",borderRadius:"100px",border:"1px solid",borderColor:diet.includes(d.id)?"var(--fg)":"var(--border)",background:diet.includes(d.id)?"var(--fg)":"transparent",color:diet.includes(d.id)?"var(--white)":"var(--fg3)",cursor:"pointer",transition:"all 0.2s" }}>
                {d.icon} {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-10 pb-8" style={{ borderBottom:"1px solid var(--border)" }}>
          {allCats.map(cat=>(
            <button key={cat.id} onClick={()=>setActiveCat(cat.id)}
              style={{ fontFamily:"var(--font-jost)",fontSize:"11px",fontWeight:activeCat===cat.id?600:400,letterSpacing:"0.1em",textTransform:"uppercase",padding:"8px 18px",borderRadius:"100px",background:activeCat===cat.id?"var(--fg)":"transparent",color:activeCat===cat.id?"var(--white)":"var(--fg3)",border:`1px solid ${activeCat===cat.id?"var(--fg)":"var(--border)"}`,cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap" }}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 style={{ fontFamily:"var(--font-playfair),serif", fontStyle:"italic", fontSize:"clamp(22px,3vw,38px)", fontWeight:400, letterSpacing:"-0.015em", color:"var(--fg)" }}>
            {allCats.find(c=>c.id===activeCat)?.label}
          </h2>
          <span className="lbl">{filtered.length} dishes</span>
        </div>

        {/* ── 3-col grid (xl), 2-col (md/sm) ── */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCat+diet.join("")+search}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
            style={{
              display:"grid",
              gridTemplateColumns:"repeat(3, 1fr)",
              gap:"clamp(12px,1.5vw,20px)",
            }}
            className="menu-grid">
            {filtered.map((item,i)=>(
              <motion.div key={item.id}
                initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
                transition={{ delay:i*0.04, duration:0.45 }}
                onClick={()=>setSelected(item)}
                className="group cursor-pointer"
                whileHover={{ rotateY: 2, rotateX: -1.5, scale: 1.02, boxShadow: "0 24px 64px rgba(28,22,18,0.13)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ background: cardBgs[i%cardBgs.length], borderRadius: 10, overflow: "hidden", transformStyle: "preserve-3d" }}>
                {/* Square image */}
                <div className="relative overflow-hidden" style={{ paddingBottom: "100%", position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={item.name} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover block transition-transform duration-600 group-hover:scale-107"/>
                  {/* Category tag */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="tag">{item.category}</span>
                  </div>
                  {/* + open modal button — top right */}
                  <button
                    onClick={e => { e.stopPropagation(); setSelected(item); }}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                    style={{ background: "rgba(248,246,242,0.92)", backdropFilter: "blur(8px)", border: "none", cursor: "pointer", color: "var(--fg)" }}
                    aria-label="View details">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/>
                    </svg>
                  </button>
                  {item.chef && (
                    <div className="absolute top-3 left-3 z-10">
                      <span style={{ fontFamily:"var(--font-jost)",fontSize:"8px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",background:"var(--fg)",color:"var(--bg)",padding:"3px 9px",borderRadius:"100px" }}>Chef&apos;s</span>
                    </div>
                  )}
                </div>
                {/* Info below image */}
                <div style={{ padding: "14px 16px 16px", background: "var(--card)" }}>
                  <div className="flex items-start gap-2 mb-2"><DietBadge tags={item.tags}/><SpiceIcons level={item.spice}/></div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 style={{ fontFamily:"var(--font-playfair),serif",fontSize:"clamp(14px,1.6vw,17px)",fontWeight:400,letterSpacing:"-0.01em",color:"var(--fg)",lineHeight:1.25,flex:1 }}>{item.name}</h3>
                    <span style={{ fontFamily:"var(--font-playfair),serif",fontSize:"16px",fontWeight:400,color:"var(--gold)",flexShrink:0 }}>{item.price}</span>
                  </div>
                  <p style={{ fontFamily:"var(--font-jost)",fontSize:"11px",fontWeight:300,color:"var(--fg3)",lineHeight:1.5,marginTop:5 }}>{item.desc.slice(0,55)}…</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length===0&&<div className="py-24 text-center"><p style={{ fontFamily:"var(--font-playfair),serif",fontSize:"22px",fontStyle:"italic",color:"var(--fg3)" }}>No dishes match your filters.</p></div>}

        <div className="mt-16 py-10 px-10 rounded-[10px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={{ background:"var(--bg2)",border:"1px solid var(--border)" }}>
          <div>
            <h3 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontSize:"clamp(22px,3vw,36px)",fontWeight:400,color:"var(--fg)",letterSpacing:"-0.015em" }}>Ready to dine?</h3>
            <p className="body-sm" style={{ marginTop:6 }}>Reserve your table and we&apos;ll prepare a royal experience.</p>
          </div>
          <a href="tel:+17805550142" className="btn-dark shrink-0">Reserve Now</a>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media(max-width:1024px){.menu-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:640px){.menu-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}}
        @media(max-width:400px){.menu-grid{grid-template-columns:1fr!important}}
      `}</style>

      <AnimatePresence>{selected&&<ItemModal item={selected} onClose={()=>setSelected(null)}/>}</AnimatePresence>
    </PageShell>
  );
}
