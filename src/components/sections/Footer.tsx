"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { label: "Menu",    href: "/menu" },
  { label: "Winery",  href: "/winery" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];
const socials = [
  { label: "Instagram", href: "https://instagram.com/rasoiroyal", icon: "IG" },
  { label: "TikTok",    href: "https://tiktok.com/@rasoiroyal",  icon: "TT" },
  { label: "Facebook",  href: "https://facebook.com/rasoiroyal", icon: "FB" },
  { label: "YouTube",   href: "https://youtube.com/@rasoiroyal", icon: "YT" },
];
const legal = [
  { label: "Privacy Policy", href: "/cookies#privacy" },
  { label: "Terms of Use",   href: "/cookies#terms" },
  { label: "Cookie Policy",  href: "/cookies" },
];
const hours = Object.entries(siteConfig.restaurant.hours);

export function Footer() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  const dimText  = "rgba(248,246,242,0.38)";
  const faintText= "rgba(248,246,242,0.22)";
  const hoverCls = "hover:!text-[rgba(248,246,242,0.85)] transition-colors duration-200";

  return (
    <footer ref={ref} style={{ background: "var(--fg)" }}>
      {/* ── Top band: logo + reserve + socials ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        className="px-8 md:px-16 pt-16 pb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        style={{ borderBottom: "1px solid rgba(248,246,242,0.07)" }}>
        {/* Logo */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
            <span style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 24, fontWeight: 400, color: "rgba(248,246,242,0.88)" }}>Rasoi</span>
            <span style={{ fontFamily: "var(--font-jost),sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.32em", textTransform: "uppercase", color: faintText, marginLeft: 4 }}>Royal</span>
          </div>
          <p style={{ fontFamily: "var(--font-jost)", fontSize: 12, fontWeight: 300, color: faintText, lineHeight: 1.7, maxWidth: 220 }}>
            Royal Indian dining in the heart of Edmonton, Alberta.
          </p>
        </div>

        {/* Socials + Reserve */}
        <div className="flex flex-col items-start md:items-end gap-5">
          <a href={`tel:${siteConfig.restaurant.phone}`}
            style={{
              fontFamily: "var(--font-jost)", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--fg)", background: "rgba(248,246,242,0.9)",
              borderRadius: "100px", padding: "13px 28px",
              textDecoration: "none", display: "inline-block",
              transition: "opacity 0.2s",
            }}
            className="hover:opacity-80">
            Reserve a Table
          </a>
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                title={s.label}
                className={hoverCls}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(248,246,242,0.14)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-jost)", fontSize: 9, fontWeight: 600,
                  letterSpacing: "0.06em", color: faintText, textDecoration: "none",
                  transition: "all 0.2s",
                }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Mid band: Nav + Hours ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15, duration: 0.7 }}
        className="px-8 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 gap-10"
        style={{ borderBottom: "1px solid rgba(248,246,242,0.07)" }}>
        {/* Pages */}
        <div>
          <p style={{ fontFamily: "var(--font-jost)", fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: faintText, marginBottom: 14 }}>Pages</p>
          <ul className="space-y-2.5">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={hoverCls} style={{ fontFamily: "var(--font-jost)", fontSize: 13, fontWeight: 300, color: dimText, textDecoration: "none" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow */}
        <div>
          <p style={{ fontFamily: "var(--font-jost)", fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: faintText, marginBottom: 14 }}>Follow</p>
          <ul className="space-y-2.5">
            {socials.map(s => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={hoverCls}
                  style={{ fontFamily: "var(--font-jost)", fontSize: 13, fontWeight: 300, color: dimText, textDecoration: "none" }}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div className="col-span-2">
          <p style={{ fontFamily: "var(--font-jost)", fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: faintText, marginBottom: 14 }}>Opening Hours</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px" }}>
            {hours.map(([day, hrs]) => (
              <div key={day} className="flex items-baseline justify-between gap-3">
                <span style={{ fontFamily: "var(--font-jost)", fontSize: 12, fontWeight: 400, color: dimText }}>{day}</span>
                <span style={{ fontFamily: "var(--font-jost)", fontSize: 12, fontWeight: 300, color: faintText, textAlign: "right" }}>{hrs}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Bottom: legal + copyright ── */}
      <div className="px-8 md:px-16 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p style={{ fontFamily: "var(--font-jost)", fontSize: 10, fontWeight: 300, color: faintText, letterSpacing: "0.06em" }}>
          © 2026 Rasoi Royal. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-5">
          {legal.map(l => (
            <Link key={l.href} href={l.href} className={hoverCls}
              style={{ fontFamily: "var(--font-jost)", fontSize: 10, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: faintText, textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
