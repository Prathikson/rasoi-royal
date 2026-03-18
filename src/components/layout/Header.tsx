"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

const nav = [
  { l: "Menu",    h: "/menu" },
  { l: "Winery",  h: "/winery" },
  { l: "About",   h: "/about" },
  { l: "Contact", h: "/contact" },
];

function useHeaderTheme() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => {
      const y = window.scrollY;
      setScrolled(y > 60);

      const isLightPage = !!document.querySelector(".page-light-bg");

      if (isLightPage) {
        // Light-bg pages (cookies) — always dark text regardless of scroll
        setDark(false);
      } else {
        // Dark-hero pages: homepage, menu, winery, about, contact
        // Stay in dark (white text) mode until user has scrolled 80px
        setDark(y < 80);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return { dark, scrolled };
}

export function Header({ visible = true }: { visible?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, scrolled } = useHeaderTheme();

  useEffect(() => {
    if (!visible) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.1 }
    );
  }, [visible]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  // When scrolled: always show light bg + dark text
  // When not scrolled: if dark bg → white text; if light bg → dark text
  const onLight = scrolled || !dark;
  const textCol  = onLight ? "var(--fg)"                 : "rgba(248,246,242,0.88)";
  const subCol   = onLight ? "var(--fg3)"                : "rgba(248,246,242,0.38)";
  const navCol   = onLight ? "var(--fg2)"                : "rgba(248,246,242,0.7)";
  const btnBg    = onLight ? "var(--white)"              : "rgba(248,246,242,0.12)";
  const btnBord  = onLight ? "var(--border)"             : "rgba(248,246,242,0.25)";
  const btnCol   = onLight ? "var(--fg)"                 : "rgba(248,246,242,0.82)";
  const btnHov   = onLight ? "hover:!bg-[var(--fg)] hover:!text-white hover:!border-[var(--fg)]"
                           : "hover:!bg-[rgba(248,246,242,0.22)] hover:!border-[rgba(248,246,242,0.5)]";

  return (
    <>
      <header
        ref={ref}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between"
        style={{
          padding: "18px 32px",
          background: scrolled ? "rgba(248,246,242,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
          opacity: visible ? undefined : 0,
        }}
      >
        {/* Logo — italic Rasoi + spaced Royal */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{
            fontFamily: "var(--font-playfair), serif", fontStyle: "italic",
            fontSize: 17, fontWeight: 400, color: textCol,
            letterSpacing: "0.04em", transition: "color 0.4s",
          }}>
            Rasoi
          </span>
          <span style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: 9, fontWeight: 500, letterSpacing: "0.32em",
            textTransform: "uppercase", color: subCol,
            marginLeft: 4, transition: "color 0.4s",
          }}>
            Royal
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map(n => (
            <Link key={n.h} href={n.h}
              style={{
                fontFamily: "var(--font-jost)", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: navCol, textDecoration: "none", transition: "opacity 0.2s",
              }}
              className="hover:opacity-60">
              {n.l}
            </Link>
          ))}
        </nav>

        {/* Reserve button */}
        <div className="hidden md:flex">
          <a
            href={`tel:${siteConfig.restaurant.phone}`}
            className={`${btnHov} transition-all duration-300`}
            style={{
              fontFamily: "var(--font-jost)", fontSize: 11, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: btnCol, background: btnBg,
              border: `1px solid ${btnBord}`, borderRadius: "100px",
              padding: "10px 22px", textDecoration: "none", display: "inline-block",
            }}>
            Reserve
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          style={{ background: "none", border: "none" }}>
          <span style={{ display:"block", width:20, height:1, background:textCol, transition:"all 0.3s", transform:menuOpen?"rotate(45deg) translate(2px,2px)":"" }}/>
          <span style={{ display:"block", width:20, height:1, background:textCol, transition:"all 0.3s", opacity:menuOpen?0:1 }}/>
          <span style={{ display:"block", width:20, height:1, background:textCol, transition:"all 0.3s", transform:menuOpen?"rotate(-45deg) translate(2px,-2px)":"" }}/>
        </button>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-center px-10"
            style={{ background: "var(--bg)" }}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <ul className="space-y-1 mb-10">
              {nav.map((n, i) => (
                <motion.li key={n.h}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}>
                  <Link href={n.h} onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-playfair), serif", fontStyle: "italic",
                      fontSize: "clamp(36px, 8vw, 60px)", fontWeight: 400,
                      color: "var(--fg)", display: "block", padding: "4px 0",
                      textDecoration: "none", letterSpacing: "-0.02em",
                    }}>
                    {n.l}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a href={`tel:${siteConfig.restaurant.phone}`} className="btn-dark self-start">
              Reserve → {siteConfig.restaurant.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
