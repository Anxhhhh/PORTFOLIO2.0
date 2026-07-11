import React from "react";
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
import usePreloader from "./hooks/usePreloader";

export default function App() {
  const { isLoading, onComplete } = usePreloader();

  return (
    <SmoothScroll>
      <Preloader isLoading={isLoading} onComplete={onComplete} />
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
      </div>

      <SmoothCursor />
    </SmoothScroll>
  );
}
