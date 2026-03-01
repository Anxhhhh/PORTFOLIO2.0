import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Layout, Server, Sparkles, Puzzle, Database } from "lucide-react";

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
            @keyframes loadingLine {
              0% { width: 0%; transform: translateX(-100%); }
              100% { width: 100%; transform: translateX(0%); }
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
            {/* Cinematic Letter Reveal */}
            <motion.div
              className="flex text-4xl md:text-5xl font-light tracking-[0.3em] uppercase py-4"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {name.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: {
                      y: 40,
                      opacity: 0,
                    },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="inline-block"
                  style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Premium Loading Line */}
            <div className="mt-8 w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
              <div className="absolute top-0 left-0 h-full w-full bg-white/80 animate-[loadingLine_2.5s_cubic-bezier(0.76,0,0.24,1)_forwards] shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
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
          PORTFOLIO
        </div>
        <div className="flex gap-8">
          
          <a href="#contact" className="hover:text-gray-400 transition-colors">Contact</a>
        </div>
      </nav>

      {/* LEFT SIDE TEXT */}
      <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col text-[15px] font-normal text-gray-200 leading-tight">
        <span>PORTFOLIO</span>
        <span>WEBSITE</span>
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
            <span>ANSHRAJ</span>
            <span>FULL&ndash;STACK</span>
            <div className="relative flex items-center justify-center w-full mx-auto">
              {/* The word AGENCY */}
              <span className="font-serif font-normal tracking-normal text-[clamp(4.5rem,10vw,10.5rem)] mt-2">
                DEVELOPER
              </span>

              {/* Desktop positioned paragraph next to DEVELOPER */}
              <div className="absolute left-1/2 ml-[clamp(320px,28vw,540px)] top-1/2 -translate-y-1/2 hidden lg:block text-left text-[14px] text-gray-300 max-w-[280px] leading-relaxed font-normal tracking-normal whitespace-pre-wrap z-30 pt-6 px-4">
                <p>A passionate full-stack developer<br />building immersive digital<br />experiences with modern web<br />technologies and creative design.</p>
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
// 3. SKILLS COMPONENT
// ==========================================
const Skills = () => {
  const skills = [
    {
      title: "Full Stack Development",
      description: "Building scalable web applications using modern frontend and backend technologies.",
      icon: Layers
    },
    {
      title: "React & Frontend",
      description: "Creating interactive UI with React, Tailwind CSS and responsive design principles.",
      icon: Layout
    },
    {
      title: "Backend Development",
      description: "Developing REST APIs and server logic using Node.js and databases.",
      icon: Server
    },
    {
      title: "Artificial Intelligence",
      description: "Working with machine learning models and AI-based problem solving.",
      icon: Sparkles
    },
    {
      title: "Problem Solving",
      description: "Strong DSA foundation with competitive programming experience.",
      icon: Puzzle
    },
    {
      title: "Database Management",
      description: "Designing and managing structured and NoSQL databases efficiently.",
      icon: Database
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#0c0c0c] text-white py-32 px-6 md:px-12 font-sans z-10">
      <motion.div
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="mb-8 md:mb-12 mt-4 ml-2">
            <h2 className="text-[clamp(3.5rem,6vw,5rem)] font-light leading-none uppercase tracking-wide text-white mb-2">
              SKILLS
            </h2>
            <p className="text-gray-400 text-[15px] font-light tracking-wide">Technical Excellence</p>
          </motion.div>

          <SkillCard skill={skills[0]} variants={itemVariants} />
          <SkillCard skill={skills[3]} variants={itemVariants} />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6 md:mt-32">
          <SkillCard skill={skills[1]} variants={itemVariants} />
          <SkillCard skill={skills[4]} variants={itemVariants} />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6 md:mt-16">
          <SkillCard skill={skills[2]} variants={itemVariants} />
          <SkillCard skill={skills[5]} variants={itemVariants} />
        </div>
      </motion.div>
    </div>
  );
};

const SkillCard = ({ skill, variants }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      variants={variants}
      className="group relative bg-[#111111]/80 backdrop-blur-md border border-white/5 p-8 md:p-10 min-h-[300px] flex flex-col justify-between hover:bg-[#161616] transition-colors duration-500 overflow-hidden"
    >
      {/* Subtle Glow inside the card on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(239,68,68,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-12 h-12 rounded-full border border-red-500/20 bg-red-500/5 flex items-center justify-center mb-12 group-hover:bg-red-500/10 group-hover:scale-110 transition-all duration-500">
        <Icon className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" strokeWidth={1.5} />
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-normal text-gray-100 mb-3 tracking-wide">{skill.title}</h3>
        <p className="text-gray-400 text-[14px] leading-relaxed font-light">{skill.description}</p>
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. MAIN APP EXPORT
// ==========================================
export default function App() {
  return (
    <div className="bg-[#0c0c0c] min-h-screen selection:bg-white/20 selection:text-white">
      <Preloader />
      <Hero />
      <Skills />
    </div>
  );
}