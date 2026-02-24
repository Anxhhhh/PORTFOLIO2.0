import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// 1. PRELOADER COMPONENT
// ==========================================
const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const name = "ANSHRAJ";

  useEffect(() => {
    // Keep loader on screen before sliding up
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(removeTimer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0c0c] text-white overflow-hidden font-sans origin-top"
        >
          <style>{`
            @keyframes revealLetter {
              0% { opacity: 0; transform: translateY(20px); filter: blur(8px); }
              100% { opacity: 1; transform: translateY(0); filter: blur(0); }
            }
            @keyframes loadingLine {
              0% { width: 0%; transform: translateX(-100%); }
              100% { width: 100%; transform: translateX(0%); }
            }
            .letter-anim {
              opacity: 0;
              animation: revealLetter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>

          {/* Grain overlay for the preloader */}
          <div
            className="absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Letter-by-Letter Reveal */}
            <div className="flex text-2xl md:text-3xl font-light tracking-wide">
              {name.split("").map((letter, index) => (
                <span
                  key={index}
                  className="letter-anim inline-block"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>

            {/* Loading Line */}
            <div className="mt-8 w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-white/60 animate-[loadingLine_2s_ease-in-out_forwards]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// 2. HERO COMPONENT
// ==========================================
const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#0c0c0c] text-white overflow-hidden font-sans selection:bg-white/20 selection:text-white">
      {/* BACKGROUND & GRADIENTS */}
      <div className="absolute inset-0 bg-[#0c0c0c]" />

      {/* Subtle Glow Behind Text */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(1200px 600px at 50% 40%, rgba(255,255,255,0.08), transparent 100%)",
        }}
      />

      {/* Heavy noise match original */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />

      {/* TOP NAVIGATION */}
      <nav className="absolute top-0 w-full z-20 flex justify-between items-start px-8 py-8 md:px-12 text-[15px] font-normal tracking-wide">
        <div className="flex gap-8">
          <a href="#about" className="hover:text-gray-400 transition-colors">About</a>
          <a href="#services" className="hover:text-gray-400 transition-colors">Services</a>
        </div>
        <div className="uppercase tracking-widest text-lg font-normal translate-y-[-2px]">
          WEN LAUNCH
        </div>
        <div className="flex gap-8">
          <a href="#cases" className="hover:text-gray-400 transition-colors">Cases</a>
          <a href="#contact" className="hover:text-gray-400 transition-colors">Contact</a>
        </div>
      </nav>

      {/* LEFT SIDE TEXT */}
      <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col text-[15px] font-normal text-gray-200 leading-tight">
        <span>Creative</span>
        <span>studio</span>
      </div>

      {/* RIGHT SIDE ARROW */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="text-white hover:scale-110 hover:rotate-12 transition-all cursor-pointer">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>

      {/* MAIN CONTENT CENTERED */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center px-6">
        <div className="relative flex flex-col items-center justify-center w-full">
          <h1 className="flex flex-col text-[clamp(4rem,9vw,9.5rem)] font-medium leading-[0.85] tracking-tight text-center w-full">
            <span>WE ARE</span>
            <span>FULL&ndash;SERVICE</span>
            <div className="relative flex items-center justify-center w-full mx-auto">
              {/* The word AGENCY */}
              <span className="font-serif font-normal tracking-normal text-[clamp(4.5rem,10vw,10.5rem)] mt-2">
                AGENCY
              </span>

              {/* Desktop positioned paragraph next to AGENCY */}
              <div className="absolute left-1/2 ml-[clamp(150px,20vw,280px)] top-1/2 -translate-y-1/2 hidden lg:block text-left text-[14px] text-gray-300 max-w-[280px] leading-relaxed font-normal tracking-normal whitespace-pre-wrap ml-[50%] z-30 pt-6 px-4">
                <p>The first full-stack Web3<br />creative agency integrating AI<br />technology to deliver best-in-<br />class client experience.</p>
              </div>
            </div>
          </h1>

          {/* Mobile paragraph */}
          <div className="mt-12 lg:hidden text-center text-[14px] text-gray-300 max-w-[300px] leading-relaxed font-normal">
            <p>The first full-stack Web3 creative agency integrating AI technology to deliver best-in-class client experience.</p>
          </div>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center">
        <div className="relative w-32 h-32 flex items-center justify-center cursor-pointer group">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] group-hover:text-white text-gray-400 transition-colors">
            <path id="circlePath" d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" fill="transparent" />
            <text className="text-[10px] uppercase tracking-[0.2em] fill-current">
              <textPath href="#circlePath" startOffset="0%">
                SCROLL TO EXPLORE • SCROLL TO EXPLORE •
              </textPath>
            </text>
          </svg>
          <svg className="w-5 h-5 text-white group-hover:translate-y-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="miter" strokeWidth={1.5} d="M12 4v16m0 0l-6-6m6 6l6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN APP EXPORT
// ==========================================
export default function App() {
  return (
    <>
      <Preloader />
      <Hero />
    </>
  );
}