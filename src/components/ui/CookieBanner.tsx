"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const KEY = "rasoi-cookies-accepted";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if not accepted yet in this browser
    if (!sessionStorage.getItem(KEY) && !localStorage.getItem(KEY)) {
      const t = setTimeout(() => setShow(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(KEY, "1");
    setShow(false);
  };
  const decline = () => {
    sessionStorage.setItem(KEY, "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9000]"
        >
          <div className="rounded-[12px] p-5 shadow-xl"
            style={{ background: "var(--white)", border: "1px solid var(--border)" }}>
            <div className="flex items-start gap-3 mb-4">
              <span style={{ fontSize: 20 }}>🍪</span>
              <div>
                <p style={{ fontFamily: "var(--font-playfair),serif", fontSize: "15px", fontWeight: 400, color: "var(--fg)", marginBottom: 4 }}>
                  We use cookies
                </p>
                <p className="body-sm">
                  We use cookies to enhance your experience. By continuing to browse, you agree to our{" "}
                  <Link href="/cookies" style={{ color: "var(--gold)", textDecoration: "underline" }}>Cookie Policy</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={accept} className="btn-dark" style={{ flex: 1, justifyContent: "center", padding: "10px" }}>
                Accept All
              </button>
              <button onClick={decline} className="btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "10px" }}>
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
