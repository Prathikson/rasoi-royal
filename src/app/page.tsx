"use client";
import { useState } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { GoldenCursor } from "@/components/ui/GoldenCursor";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { useLenis } from "@/hooks/useLenis";
import { Hero } from "@/components/sections/Hero";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { Offers } from "@/components/sections/Offers";
import { StatsSection } from "@/components/sections/StatsSection";
import { AmbianceSection } from "@/components/sections/AmbianceSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

const SESSION_KEY = "rasoi-preloader-shown";

function App() {
  useLenis();
  return (
    <>
      <Header visible={true} />
      <main>
        <Hero />
        <MenuPreview />
        <StatsSection />
        <Offers />
        <AmbianceSection />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(() => {
    if (typeof window !== "undefined") return !!sessionStorage.getItem(SESSION_KEY);
    return false;
  });
  const handleComplete = () => { sessionStorage.setItem(SESSION_KEY, "1"); setLoaded(true); };
  return (
    <>
      {!loaded && <Preloader onComplete={handleComplete} />}
      <GrainOverlay />
      <GoldenCursor />
      <CookieBanner />
      <App />
    </>
  );
}
