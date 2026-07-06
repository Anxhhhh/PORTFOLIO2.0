import React from "react";

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

// Double the stack per track to guarantee it overflows the screen width
const singleTrack = [...techStack, ...techStack];

const TechMarquee = ({ speed = 60 }) => {
  return (
    <div className="relative w-full overflow-hidden py-20 md:py-32 bg-transparent my-4 flex items-center">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left ${speed * 12}s linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marquee-right ${speed * 12}s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Decorative Diagonal Band Container */}
      <div className="relative w-full rotate-[-3deg] scale-110 pointer-events-none">
        
        {/* Top Row (Outlined) - Moving Left */}
        <div className="flex w-max mb-6 md:mb-10">
          {[1, 2].map((trackId) => (
            <div key={`track-top-${trackId}`} className="flex animate-marquee-left whitespace-nowrap">
              {singleTrack.map((item, index) => (
                <div key={`out-${item}-${index}`} className="flex items-center">
                  <span 
                    className="text-7xl md:text-[11rem] font-black tracking-tighter uppercase px-8 md:px-16"
                    style={{
                      WebkitTextStroke: "2px rgba(16, 185, 129, 0.4)",
                      color: "transparent",
                      fontFamily: "var(--font-headline, sans-serif)",
                    }}
                  >
                    {item}
                  </span>
                  <span className="w-3 h-3 md:w-6 md:h-6 rounded-full border border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Row (Solid) - Moving Right */}
        <div className="flex w-max">
          {[1, 2].map((trackId) => (
            <div key={`track-bot-${trackId}`} className="flex animate-marquee-right whitespace-nowrap">
              {singleTrack.map((item, index) => (
                <div key={`sol-${item}-${index}`} className="flex items-center">
                  <span 
                    className="text-7xl md:text-[11rem] font-black tracking-tighter uppercase px-8 md:px-16 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30"
                    style={{
                      fontFamily: "var(--font-headline, sans-serif)",
                      filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.4))"
                    }}
                  >
                    {item}
                  </span>
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Screen Edge Fades - Darker and wider for better depth */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default TechMarquee;
