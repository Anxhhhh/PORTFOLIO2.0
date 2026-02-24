import React, { useState, useEffect } from "react";

// ==========================================
// 1. PRELOADER COMPONENT
// ==========================================
const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const name = "PRATHAM";

  useEffect(() => {
    // Start fading out the loader after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    // Completely remove the loader from the DOM after 3 seconds
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden font-sans transition-opacity duration-500 ease-in-out ${isFadingOut ? "opacity-0" : "opacity-100"
        }`}
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
        <div className="flex text-3xl md:text-5xl font-light tracking-[0.3em] ml-[0.3em]">
          {name.split("").map((letter, index) => (
            <span
              key={index}
              className="letter-anim inline-block"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Loading Line */}
        <div className="mt-8 w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-white/60 animate-[loadingLine_2s_ease-in-out_forwards]" />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. HERO COMPONENT
// ==========================================
const Hero = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* BACKGROUND & GRADIENTS */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(1300px 650px at 55% 6%, rgba(255,255,255,0.22), rgba(255,255,255,0.10) 35%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(1200px 750px at 78% 95%, rgba(255,255,255,0.20), rgba(255,255,255,0.08) 40%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(1800px 1000px at 50% 50%, rgba(255,255,255,0.04), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />

      {/* TOP NAVIGATION */}
      <nav className="absolute top-0 w-full z-20 flex justify-between items-center px-6 py-8 md:px-12 text-sm font-light tracking-wide">
        <div className="flex gap-6">
          <a href="#about" className="hover:text-gray-400 transition-colors">About</a>
          <a href="#services" className="hover:text-gray-400 transition-colors">Services</a>
        </div>
        <div className="uppercase tracking-widest text-lg font-normal">WEN LAUNCH</div>
        <div className="flex gap-6">
          <a href="#cases" className="hover:text-gray-400 transition-colors">Cases</a>
          <a href="#contact" className="hover:text-gray-400 transition-colors">Contact</a>
        </div>
      </nav>

      {/* LEFT SIDE TEXT */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col text-sm font-light text-gray-200">
        <span>Creative</span>
        <span>studio</span>
      </div>

      {/* RIGHT SIDE ARROW */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:scale-110 transition-transform cursor-pointer">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      {/* MAIN CONTENT CENTERED */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center px-6">
        <div className="relative flex flex-col items-center">
          <h1 className="flex flex-col text-[clamp(3.5rem,8vw,8.5rem)] md:text-[130px] font-medium leading-[0.9] tracking-[-0.02em] text-center">
            <span>WE ARE</span>
            <span>FULL-SERVICE</span>
            <span className="font-serif italic font-light tracking-normal mt-2 md:mt-0">AGENCY</span>
          </h1>

          {/* Right-aligned paragraph */}
          <div className="mt-8 md:mt-0 md:absolute md:-bottom-12 md:-right-24 text-center md:text-left text-[13px] md:text-sm text-gray-300 max-w-[260px] leading-relaxed font-light">
            <p>The first full-stack Web3 creative agency integrating AI technology to deliver best-in-class client experience.</p>
          </div>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center">
        <div className="relative w-32 h-32 flex items-center justify-center cursor-pointer group">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] group-hover:text-white text-gray-400 transition-colors">
            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text className="text-[10.5px] uppercase tracking-[0.2em] fill-current">
              <textPath href="#circlePath" startOffset="0%">
                SCROLL TO EXPLORE • SCROLL TO EXPLORE •
              </textPath>
            </text>
          </svg>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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