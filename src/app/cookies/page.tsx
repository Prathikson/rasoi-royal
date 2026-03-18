import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";
export const metadata = { title: "Privacy, Terms & Cookies — Rasoi Royal" };

const sections = [
  { id:"privacy", title:"Privacy Policy", body:"We collect only the information you provide when making a reservation or contacting us — name, email, phone, and booking details. This data is used solely to manage your reservation and communicate with you. We do not sell or share your personal data with third parties. Data is retained for 24 months and may be deleted on request by emailing us directly." },
  { id:"terms",   title:"Terms of Use",   body:"By using this website, you agree to our terms. All content is the intellectual property of Rasoi Royal. Reservations are subject to our cancellation policy: 24 hours' notice for individuals, 48 hours for groups of 8 or more. No-shows for large parties may incur a fee. We reserve the right to update these terms at any time." },
  { id:"cookies", title:"Cookie Policy",  body:"We use essential cookies to maintain site functionality — your theme preference and session state. We do not use advertising or third-party tracking cookies. By clicking 'Accept All' on our banner, you consent to our use of cookies. Declining non-essential cookies will not affect core site functionality." },
  { id:"accessibility", title:"Accessibility", body:"Rasoi Royal is committed to making our website accessible to all users. If you experience any difficulty accessing content, please contact us and we will work to resolve it promptly." },
];

export default function CookiesPage() {
  return (
    <PageShell>
      {/* Page hero */}
      <div className="relative overflow-hidden flex flex-col justify-end" style={{ minHeight:"42vh",background:"var(--bg2)" }}>
        <div className="px-8 md:px-16 pb-12">
          <p className="lbl lbl-gold mb-3">Legal</p>
          <h1 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(40px,6vw,88px)",letterSpacing:"-0.03em",lineHeight:0.95,color:"var(--fg)" }}>
            Privacy & Legal
          </h1>
          <p className="body-sm" style={{ marginTop:10 }}>Last updated January 2026 · Rasoi Royal, Edmonton AB</p>
        </div>
      </div>

      {/* Jump links */}
      <div className="px-8 md:px-16 py-6 flex flex-wrap gap-3" style={{ borderBottom:"1px solid var(--border)",background:"var(--white)" }}>
        {sections.map(s => (
          <a key={s.id} href={`#${s.id}`}
            style={{ fontFamily:"var(--font-jost)",fontSize:11,fontWeight:400,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--fg3)",textDecoration:"none",padding:"5px 14px",borderRadius:"100px",border:"1px solid var(--border)",transition:"all 0.2s" }}
            className="hover:bg-[var(--fg)] hover:text-[var(--white)] hover:border-[var(--fg)]">
            {s.title}
          </a>
        ))}
      </div>

      {/* Content */}
      <div className="px-8 md:px-16 py-16" style={{ maxWidth:820 }}>
        {sections.map((s,i) => (
          <div key={s.id} id={s.id} style={{ paddingTop: i===0?0:48, paddingBottom:48, borderBottom: i<sections.length-1?"1px solid var(--border)":"none" }}>
            <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(22px,3vw,36px)",letterSpacing:"-0.02em",color:"var(--fg)",marginBottom:16,lineHeight:1.1 }}>{s.title}</h2>
            <p className="body-md">{s.body}</p>
          </div>
        ))}

        {/* Contact */}
        <div style={{ paddingTop:40,marginTop:16,borderTop:"1px solid var(--border)" }}>
          <h2 style={{ fontFamily:"var(--font-playfair),serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(20px,2.5vw,30px)",color:"var(--fg)",marginBottom:12 }}>Questions?</h2>
          <p className="body-md" style={{ marginBottom:20 }}>For any legal, privacy, or accessibility enquiries:</p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:legal@rasoiroyal.ca" className="btn-ghost">legal@rasoiroyal.ca</a>
            <Link href="/contact" className="btn-dark">Contact Us</Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
