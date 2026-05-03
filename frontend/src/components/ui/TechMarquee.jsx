import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const techStack = [
  "HTML",
  "CSS",
  "REACT",
  "N8N",
  "FIGMA",
  "BLENDER",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "POSTMAN",
  "APIs",
];

const TechMarquee = ({ speed = 10 }) => {
  // Triple the stack for seamless infinite loop at large scales
  const duplicatedStack = [...techStack, ...techStack, ...techStack];

  return (
    <div className="relative w-full overflow-hidden py-20 md:py-32 bg-transparent my-4 flex items-center">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-33.33%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-track-left {
          animation: marquee-left var(--duration-left) linear infinite;
          will-change: transform;
        }
        .marquee-track-right {
          animation: marquee-right var(--duration-right) linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Decorative Diagonal Band Container */}
      <div className="relative w-full rotate-[-3deg] scale-105">
        {/* Top Row (Outlined) */}
        <div
          className="marquee-track-left flex whitespace-nowrap mb-4 md:mb-8"
          style={{ '--duration-left': `${speed * 1.2}s` }}
        >
          {duplicatedStack.map((item, index) => (
            <div key={`out-${item}-${index}`} className="flex items-center">
              <span 
                className="text-7xl md:text-[12rem] font-bold tracking-tighter uppercase px-8 md:px-16"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                  color: "transparent",
                  fontFamily: "var(--font-headline, sans-serif)"
                }}
              >
                {item}
              </span>
              <span className="w-4 h-4 md:w-8 md:h-8 rounded-full bg-emerald-500/20 blur-[2px]" />
            </div>
          ))}
        </div>

        {/* Bottom Row (Solid) - Moving Opposite Direction */}
        <div
          className="marquee-track-right flex whitespace-nowrap"
          style={{ '--duration-right': `${speed}s` }}
        >
          {duplicatedStack.map((item, index) => (
            <div key={`sol-${item}-${index}`} className="flex items-center">
              <span 
                className="text-7xl md:text-[12rem] font-bold tracking-tighter uppercase px-8 md:px-16 text-white"
                style={{
                  fontFamily: "var(--font-headline, sans-serif)"
                }}
              >
                {item}
              </span>
              <span className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Screen Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default TechMarquee;
