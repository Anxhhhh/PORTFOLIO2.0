import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Layers, Layout, Server, Sparkles, Puzzle, Database } from "lucide-react";
import SmoothCursor from "./components/smooth-cursor";
import Hero from "./components/Hero";
import AboutMeSection from "./components/AboutMeSection";
import SmoothScroll from "./components/SmoothScroll";
import TechMarquee from "./components/TechMarquee";
import TechStack from "./components/TechStack";


// ==========================================
// 1. PRELOADER COMPONENT
// ==========================================
const Preloader = ({ isLoading }) => {
  const name = "ANSHRAJ";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
	  key="loader"
	  exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
	  className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden font-sans origin-top"
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
// 1.5 NAVBAR COMPONENT
// ==========================================

const Navbar = ({ show }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <div className={`fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${show ? "opacity-100 translate-y-0 delay-[800ms]" : "opacity-0 -translate-y-8"}`}>
      <nav
	className={`pointer-events-auto flex items-center justify-between transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden backdrop-blur-2xl border ${isScrolled
	  ? "w-[90%] md:w-[550px] border-white/20 py-4 px-8 rounded-full translate-y-6"
	  : "w-full bg-transparent border-transparent py-8 px-8 md:px-12 rounded-none translate-y-0"
	  }`}
	style={isScrolled ? { background: "rgba(18, 18, 24, 0.75)" } : {}}
      >
	<div className="flex gap-8 text-[15px] font-normal tracking-wide relative z-10 w-24">
	  <a href="#about" className={`transition-colors ${isScrolled ? "text-white/90 hover:text-white" : "text-white hover:text-gray-300"}`}>About</a>
	  <a href="#services" className={`transition-colors ${isScrolled ? "text-white/90 hover:text-white" : "text-white hover:text-gray-300"}`}>Services</a>
	</div>

	<div className={`uppercase tracking-widest font-normal absolute left-1/2 -translate-x-1/2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${isScrolled ? "text-sm scale-95 opacity-90 text-white" : "text-lg scale-100 opacity-100 text-white"}`}>
	  PORTFOLIO
	</div>

	<div className="flex gap-8 text-[15px] font-normal tracking-wide relative z-10 w-24 justify-end">
	  <a href="#contact" className={`transition-colors ${isScrolled ? "text-white/90 hover:text-white" : "text-white hover:text-gray-300"}`}>Contact</a>
	</div>
      </nav>
    </div>
  );
};

// Hero component is now in src/components/Hero.jsx

// ==========================================
// 3. SKILLS COMPONENT
// ==========================================
const Skills = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const col1Y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

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
    <div ref={sectionRef} className="relative min-h-[80vh] bg-black text-white pt-16 pb-4 px-6 md:px-12 font-sans overflow-hidden">
      <motion.div
	className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
	variants={containerVariants}
	initial="hidden"
	whileInView="visible"
	viewport={{ once: true, margin: "-100px" }}
      >
        {/* Infinite Tech Marquee */}
        <div className="md:col-span-3 -mt-8 md:-mt-16">
          <TechMarquee speed={5} />
        </div>

	{/* Column 1 */}
	<motion.div style={{ y: col1Y }} className="flex flex-col gap-4">
	  <motion.div
	    initial={{ opacity: 0, y: 20 }}
	    whileInView={{ opacity: 1, y: 0 }}
	    transition={{ duration: 0.6 }}
	    viewport={{ once: true }}
	    className="mb-4 md:mb-8 mt-2 ml-2"
	  >
	    <h2 className="text-[clamp(3.5rem,6vw,5rem)] font-light leading-none uppercase tracking-wide text-white mb-2">
	      SKILLS
	    </h2>
	    <p className="text-gray-400 text-[15px] font-light tracking-wide">Technical Excellence</p>
	  </motion.div>

	  <div className="flex flex-col gap-4">
	    <SkillCard skill={skills[0]} variants={itemVariants} />
	    <SkillCard skill={skills[3]} variants={itemVariants} />
	  </div>
	</motion.div>

	{/* Column 2 */}
	<motion.div style={{ y: col2Y }} className="flex flex-col gap-4 md:mt-16">
	  <SkillCard skill={skills[1]} variants={itemVariants} />
	  <SkillCard skill={skills[4]} variants={itemVariants} />
	</motion.div>

	{/* Column 3 */}
	<motion.div style={{ y: col3Y }} className="flex flex-col gap-4 md:mt-8">
	  <SkillCard skill={skills[2]} variants={itemVariants} />
	  <SkillCard skill={skills[5]} variants={itemVariants} />
	</motion.div>
      </motion.div>

      {/* NEXT Button */}
      <motion.div 
	initial={{ opacity: 0 }}
	whileInView={{ opacity: 1 }}
	transition={{ duration: 0.6, delay: 0.4 }}
	viewport={{ once: true }}
	className="flex justify-center mt-12 mb-8 pointer-events-auto"
      >
	<button
	  onClick={() => {
	    const worksSection = document.getElementById("works");
	    if (worksSection) {
	      worksSection.scrollIntoView({ behavior: "smooth" });
	    }
	  }}
	  onMouseMove={(e) => {
	    const rect = e.currentTarget.getBoundingClientRect();
	    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.4;
	    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.4;
	    import("gsap").then(gsap => {
	      gsap.default.to(e.currentTarget, { x, y, duration: 0.3, ease: "power2.out" });
	    });
	  }}
	  onMouseLeave={(e) => {
	    import("gsap").then(gsap => {
	      gsap.default.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
	    });
	  }}
	  className="group relative px-12 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/10 active:scale-95"
	>
	  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.12)_0%,transparent_70%)]" />
	  <span className="relative z-10 text-xs md:text-sm font-light tracking-[0.4em] text-white/90 group-hover:text-emerald-300 uppercase transition-colors">
	    Next
	  </span>
	</button>
      </motion.div>
    </div>
  );
};

const SkillCard = ({ skill, variants }) => {
  const Icon = skill.icon;
  const cardRef = useRef(null);
  
  // Mouse motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      whileHover={{ y: -5 }}
      className="group relative bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-6 md:p-8 min-h-[250px] flex flex-col justify-between hover:bg-zinc-800/90 hover:border-red-500/40 transition-all duration-500 overflow-hidden cursor-pointer shadow-2xl"
    >
      {/* Glossy Border Reveal */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(200px circle at ${x}px ${y}px, rgba(239,68,68,0.15), transparent)`
        }}
      />
      
      {/* Premium Inner Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.05)_0%,transparent_70%)]" />

      <div 
	style={{ transform: "translateZ(60px)" }}
	className="relative z-10 w-12 h-12 rounded-full border border-red-500/20 bg-red-500/5 flex items-center justify-center mb-12 group-hover:bg-red-500/20 group-hover:border-red-500/40 group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(239,68,68,0.0)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]"
      >
	<Icon className="w-5 h-5 text-red-500 group-hover:text-red-400 group-hover:rotate-[360deg] transition-all duration-700" strokeWidth={1.5} />
      </div>

      <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
	<h3 className="text-2xl font-normal text-gray-100 mb-3 tracking-wide group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{skill.title}</h3>
	<p className="text-gray-400 text-[14px] leading-relaxed font-light group-hover:text-gray-200 transition-colors">{skill.description}</p>
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. OUR WORKS COMPONENT
// ==========================================
import { ArrowRight, ArrowLeft, ChevronRight, FolderOpen, Trophy, Code2 } from "lucide-react";

const workSections = {
  projects: {
    label: "PROJECTS",
    eyebrow: "Featured Builds",
    icon: Code2,
    title: "A selection of projects I've built.",
    description: "Swipe or use arrows to explore the project cards.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  hackathon: {
    label: "HACKATHON",
    eyebrow: "Coming Soon",
    icon: FolderOpen,
    title: "Hackathon entries will appear here soon.",
    description: "Not here yet, but soon.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  achievements: {
    label: "ACHIEVEMENTS",
    eyebrow: "Coming Soon",
    icon: Trophy,
    title: "Achievements and milestones will live here soon.",
    description: "Not here yet, but soon.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
  },
};

const placeholderProjects = [
  {
    title: "Nova Commerce",
    category: "E-commerce Platform",
    year: "2026",
    summary: "A modern shopping experience with real-time inventory and seamless checkout flow.",
    stack: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Pulse Board",
    category: "Analytics Dashboard",
    year: "2026",
    summary: "Real-time analytics platform with customizable widgets and team collaboration.",
    stack: ["React", "Tailwind", "Firebase", "D3.js"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Echo Space",
    category: "Social Platform",
    year: "2025",
    summary: "A minimalist social space for meaningful conversations and creative sharing.",
    stack: ["Next.js", "PostgreSQL", "AWS", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
];

const EmptyState = ({ section }) => {
  const IconComponent = section.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full" />
        <div className="relative w-20 h-20 rounded-full border border-white/10 bg-zinc-900/80 flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
        </div>
      </div>
      <span className="text-xs font-light tracking-[0.3em] text-red-500 uppercase mb-4">
        {section.eyebrow}
      </span>
      <h3 className="text-2xl md:text-3xl font-light text-white/80 mb-4 tracking-wide">
        {section.title}
      </h3>
      <p className="text-gray-500 text-sm md:text-base font-light max-w-md">
        {section.description}
      </p>
      <div className="mt-8 flex items-center gap-2 text-gray-600 text-xs tracking-widest uppercase">
        <span>Coming</span>
        <span className="w-1 h-1 rounded-full bg-red-500/50" />
        <span>Soon</span>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-center flex-shrink-0"
    >
      <div className="relative overflow-hidden rounded-3xl min-h-[380px] flex flex-col justify-between transition-all duration-500">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-zinc-900/30" />
        
        <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-light tracking-[0.3em] text-red-400 uppercase">
                {project.category}
              </span>
              <span className="text-xs text-white/50 font-light">
                {project.year}
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-light text-white mb-4 tracking-wide group-hover:text-white/90 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-300/80 text-sm font-light leading-relaxed mb-6">
              {project.summary}
            </p>
          </div>
          
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-light tracking-wider text-gray-200 uppercase px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <button className="group/btn relative px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:bg-white/20">
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]" />
              <span className="relative z-10 flex items-center gap-2 text-xs font-light tracking-widest text-white uppercase group-hover/btn:text-white transition-colors">
                View Concept
                <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
              </span>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 translate-y-2">
          <div className="absolute bottom-4 left-4 w-2 h-[1px] bg-gradient-to-r from-red-500/40 to-transparent" />
          <div className="absolute bottom-4 left-4 w-[1px] h-2 bg-gradient-to-t from-red-500/40 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

const CategoryCard = ({ section, onClick }) => {
  const IconComponent = section.icon;
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl text-left transition-all duration-500 hover:-translate-y-2 min-h-[320px] flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${section.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:via-black/60 transition-all duration-500" />
      <div className="absolute inset-0 bg-zinc-900/40" />
      
      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        <div className="flex-1">
          <div className="w-16 h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-500">
            <IconComponent className="w-7 h-7 text-white/80 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
          </div>
          
          <span className="text-xs font-light tracking-[0.3em] text-red-400 uppercase block mb-3">
            {section.eyebrow}
          </span>
          
          <h3 className="text-2xl md:text-3xl font-light text-white mb-4 tracking-wide group-hover:text-white/90 transition-colors">
            {section.label}
          </h3>
          
          <p className="text-gray-300/80 text-base font-light leading-relaxed">
            {section.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-8">
          <span className="text-xs text-white/50 font-light tracking-wider uppercase">
            Click to explore
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
            <ArrowRight className="w-5 h-5 text-red-400" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </motion.button>
  );
};

const ProjectsPanel = ({ onBack }) => {
  const projectRailRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const scrollStateRef = useRef({ startX: 0, scrollLeft: 0, lastX: 0, lastTime: 0, velocity: 0 });
  const momentumRef = useRef(null);
  const section = workSections.projects;

  useEffect(() => {
    const rail = projectRailRef.current;
    if (!rail) return;

    const handleWheel = (e) => {
      if (!isHovering) return;

      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY + e.deltaX;
      const targetScroll = rail.scrollLeft + delta * 1.2;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const clampedScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      rail.scrollLeft = clampedScroll;
    };

    const handleDragEnd = () => {
      if (!isDragging || !rail) return;

      const { velocity } = scrollStateRef.current;
      
      if (Math.abs(velocity) > 0.5) {
        const startScroll = rail.scrollLeft;
        const targetScroll = startScroll + velocity * 15;
        const maxScroll = rail.scrollWidth - rail.clientWidth;
        const clampedTarget = Math.max(0, Math.min(targetScroll, maxScroll));

        const animate = () => {
          if (!rail) return;
          const currentScroll = rail.scrollLeft;
          const diff = clampedTarget - currentScroll;
          
          if (Math.abs(diff) > 0.5) {
            rail.scrollLeft += diff * 0.12;
            momentumRef.current = requestAnimationFrame(animate);
          }
        };
        momentumRef.current = requestAnimationFrame(animate);
      }
    };

    rail.addEventListener("wheel", handleWheel, { passive: false });
    
    const dragEndHandler = () => handleDragEnd();
    rail.addEventListener("mouseup", dragEndHandler);
    rail.addEventListener("mouseleave", dragEndHandler);

    return () => {
      rail.removeEventListener("wheel", handleWheel);
      rail.removeEventListener("mouseup", dragEndHandler);
      rail.removeEventListener("mouseleave", dragEndHandler);
      if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
    };
  }, [isHovering, isDragging]);

  const scrollProjects = (direction) => {
    if (!projectRailRef.current) return;
    const rail = projectRailRef.current;
    const amount = rail.clientWidth * 0.8;
    rail.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e) => {
    if (!projectRailRef.current) return;
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
    
    setIsDragging(true);
    const rail = projectRailRef.current;
    scrollStateRef.current = {
      startX: e.pageX - rail.offsetLeft,
      scrollLeft: rail.scrollLeft,
      lastX: e.pageX,
      lastTime: performance.now(),
      velocity: 0,
    };
    rail.style.cursor = "grabbing";
    rail.style.userSelect = "none";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (projectRailRef.current) {
      projectRailRef.current.style.cursor = "grab";
      projectRailRef.current.style.userSelect = "";
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !projectRailRef.current) return;
    
    const rail = projectRailRef.current;
    const now = performance.now();
    const dt = now - scrollStateRef.current.lastTime;
    
    const x = e.pageX - rail.offsetLeft;
    const walk = (x - scrollStateRef.current.startX);
    const rawVelocity = dt > 0 ? (scrollStateRef.current.lastX - e.pageX) / dt : 0;
    scrollStateRef.current.velocity = scrollStateRef.current.velocity * 0.5 + rawVelocity * 0.5;
    
    scrollStateRef.current.lastX = e.pageX;
    scrollStateRef.current.lastTime = now;
    
    rail.scrollLeft = scrollStateRef.current.scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    if (!projectRailRef.current) return;
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
    
    const touch = e.touches[0];
    const rail = projectRailRef.current;
    scrollStateRef.current = {
      startX: touch.pageX - rail.offsetLeft,
      scrollLeft: rail.scrollLeft,
      lastX: touch.pageX,
      lastTime: performance.now(),
      velocity: 0,
    };
  };

  const handleTouchMove = (e) => {
    if (!projectRailRef.current) return;
    
    const rail = projectRailRef.current;
    const touch = e.touches[0];
    const x = touch.pageX - rail.offsetLeft;
    const walk = (x - scrollStateRef.current.startX);
    rail.scrollLeft = scrollStateRef.current.scrollLeft - walk;
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="mb-8 md:mb-12 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
              aria-label="Go back to categories"
            >
              <ArrowLeft className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
            </button>
            <span className="text-[10px] font-light tracking-[0.3em] text-red-500 uppercase">
              {section.eyebrow}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">
            {section.label}
          </h3>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => scrollProjects("prev")}
            className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
            aria-label="Scroll projects left"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scrollProjects("next")}
            className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
            aria-label="Scroll projects right"
          >
            <ArrowRight className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-500 text-sm font-light mb-8">
        {section.description}
      </p>
      
      <div
        ref={projectRailRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 select-none scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {placeholderProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

const ComingSoonPanel = ({ section, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
            aria-label="Go back to categories"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          </button>
          <span className="text-[10px] font-light tracking-[0.3em] text-red-500 uppercase">
            {section.eyebrow}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">
          {section.label}
        </h3>
      </div>
      <EmptyState section={section} />
    </motion.div>
  );
};

const OurWorks = () => {
  const sectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.1,
  });

  const headingY = useTransform(smoothProgress, [0, 0.4], isMobile ? [50, 0] : [100, 0]);
  const headingOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const headingX = useTransform(smoothProgress, [0, 0.4], [-40, 0]);

  const renderContent = () => {
    if (activeSection === "projects") {
      return <ProjectsPanel onBack={() => setActiveSection(null)} />;
    }
    if (activeSection === "hackathon" || activeSection === "achievements") {
      return (
        <ComingSoonPanel
          section={workSections[activeSection]}
          onBack={() => setActiveSection(null)}
        />
      );
    }
    return null;
  };

  const renderCategoryGrid = () => {
    if (activeSection) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
      >
        {Object.entries(workSections).map(([key, section]) => (
          <CategoryCard
            key={key}
            section={section}
            key_name={key}
            onClick={() => setActiveSection(key)}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <section ref={sectionRef} id="works" className="relative bg-black text-white pt-8 pb-8 px-4 md:px-8 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity, x: headingX }}
          className="mb-8 md:mb-12 mt-4"
        >
          <h2 className="text-[clamp(3.5rem,6vw,5rem)] font-light leading-none uppercase tracking-wide text-white mb-2">
            OUR WORKS
          </h2>
          <p className="text-gray-400 text-[15px] font-light tracking-wide">
            Featured Works
          </p>
        </motion.div>

        {activeSection ? (
          renderContent()
        ) : (
          renderCategoryGrid()
        )}
      </div>
    </section>
  );
};

// ==========================================
// 5. MAIN APP EXPORT
// ==========================================
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const skillsRef = useRef(null);

  useEffect(() => {
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(removeTimer);
  }, []);

  // 1. Skills Parallax (Matching OurWorks)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: skillsRef, // Using the created ref
    offset: ["start end", "end start"],
  });

  const skillsSmoothProgress = useSpring(skillsScrollProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.1,
  });

  const skillsGridY = useTransform(skillsSmoothProgress, [0, 1], isMobile ? [150, -150] : [150, -150]);
  const skillsGridScale = useTransform(skillsSmoothProgress, [0, 1], [0.85, 1.10]);
  const skillsRotateX = useTransform(skillsSmoothProgress, [0, 1], isMobile ? [0, 0] : [-10, 5]);


  return (
    <SmoothScroll>
      <div className="bg-black min-h-screen selection:bg-white/20 selection:text-white">
	<Preloader isLoading={isLoading} />
	<Navbar show={!isLoading} />

	{/* ── Standard Scrolling Sections ──────────────────────────── */}
	<Hero visible={!isLoading} />
	<AboutMeSection />

	{/* Skills Section — Now following natural scroll with parallax effects */}
	<section ref={skillsRef} className="relative bg-black z-20 overflow-hidden pt-0 pb-24">
	  <motion.div
	    style={{ y: skillsGridY, scale: skillsGridScale, rotateX: skillsRotateX }}
	    className="preserve-3d"
	  >
	     <Skills />
	  </motion.div>
	</section>

	{/* Normal Scrolling Content — z-index 20 covers the sticky container naturally */}
	<div className="relative z-20 bg-black border-t border-white/5">
	  <TechStack />
	  <OurWorks />
	</div>

	<SmoothCursor />
      </div>
    </SmoothScroll>
  );
}