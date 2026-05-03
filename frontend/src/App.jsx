import React, { useState, useEffect } from "react";
import SmoothCursor from "./components/layout/SmoothCursor";
import Hero from "./components/sections/Hero";
import AboutMeSection from "./components/sections/AboutMeSection";
import SmoothScroll from "./components/layout/SmoothScroll";
import Skills from "./components/sections/Skills";
import TechStack from "./components/sections/TechStack";
import OurWorks from "./components/sections/OurWorks";
import ContactSection from "./components/sections/ContactSection";
import Navbar from "./components/layout/Navbar";
import Preloader from "./components/layout/Preloader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(removeTimer);
  }, []);

  return (
    <SmoothScroll>
      <Preloader isLoading={isLoading} />
      <Navbar show={!isLoading} />

      <div className="relative bg-black">
        <Hero visible={!isLoading} />
        <AboutMeSection />
        <Skills />

        <div className="relative z-20 bg-black border-t border-white/5">
          <TechStack />
          <OurWorks />
          <ContactSection />
        </div>

        <SmoothCursor />
      </div>
    </SmoothScroll>
  );
}
