import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, FolderOpen, Trophy, Code2 } from "lucide-react";
import NextSectionButton from "../ui/NextSectionButton";

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
    title: "ResumeAnalyser",
    category: "ML",
    year: "2026",
    summary: "A ML web-app which helps in generating the resume and also analyzes it",
    stack: ["React", "Flask", "Sqlite"],
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    url: "https://makeyourresumebetter.netlify.app/"
  },
  {
    title: "SYNOPTIC",
    category: "Weather Forecast Service",
    year: "2026",
    summary: "A sleek, real-time weather tracking app providing accurate forecasts and environmental data with high-end interactive visualizations.",
    stack: ["React", "OpenWeather API", "Tailwind CSS", "Chart.js"],
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    url: "https://anshweatherapp.netlify.app/"
  },
  {
    title: "NeuroKart",
    category: "E-commerce Platform",
    year: "2026",
    summary: "A modern shopping experience with real-time inventory and seamless checkout flow.",
    stack: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    url: "https://neurokart.netlify.app/"
  },
  {
    title: "MyPortFolio",
    category: "Web-app",
    year: "2026",
    summary: "A web-app for my portfolio",
    stack: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    url: "https://anshhhfolio.netlify.app/"
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
        <div className="absolute inset-0 bg-pink-500/10 blur-2xl rounded-full" />
        <div className="relative w-20 h-20 rounded-full border border-white/10 bg-zinc-900/80 flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
        </div>
      </div>
      <span className="text-xs font-light tracking-[0.3em] text-pink-500 uppercase mb-4">
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
        <span className="w-1 h-1 rounded-full bg-pink-500/50" />
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
              <span className="text-[10px] font-light tracking-[0.3em] text-pink-400 uppercase">
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
            
            <a 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              className="group/btn relative px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full overflow-hidden transition-all duration-300 hover:border-pink-500/50 hover:bg-white/20 inline-block text-center"
            >
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,transparent_70%)]" />
              <span className="relative z-10 flex items-center gap-2 text-xs font-light tracking-widest text-white uppercase group-hover/btn:text-white transition-colors">
                View 
                <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 translate-y-2">
          <div className="absolute bottom-4 left-4 w-2 h-[1px] bg-gradient-to-r from-pink-500/40 to-transparent" />
          <div className="absolute bottom-4 left-4 w-[1px] h-2 bg-gradient-to-t from-pink-500/40 to-transparent" />
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
      className="group relative overflow-hidden rounded-3xl text-left transition-all duration-500 hover:-translate-y-2 min-h-[320px] flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
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
          
          <span className="text-xs font-light tracking-[0.3em] text-pink-400 uppercase block mb-3">
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
            <ArrowRight className="w-5 h-5 text-pink-400" strokeWidth={1.5} />
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

    let isScrolling = false;
    const handleWheel = (e) => {
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      
      if (!isHorizontalScroll) {
        e.preventDefault(); // Always prevent vertical page scroll when over the projects

        if (isScrolling) return; // Prevent multiple scrolls at once

        // Threshold to prevent accidental scrolls from trackpads/high-res mice
        if (Math.abs(e.deltaY) < 20) return;

        const direction = e.deltaY > 0 ? "next" : "prev";
        scrollProjects(direction);
        
        isScrolling = true;
        setTimeout(() => {
          isScrolling = false;
        }, 400); // Reduced cooldown for better responsiveness
      }
    };

    rail.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      rail.removeEventListener("wheel", handleWheel);
      if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
    };
  }, []);

  const scrollProjects = (direction) => {
    if (!projectRailRef.current) return;
    const rail = projectRailRef.current;
    
    // Calculate total card width: card width + gap (6 is gap-6 which is 24px)
    const cardWidth = rail.querySelector('.group')?.clientWidth || rail.clientWidth * 0.8;
    const gap = 24; 
    const scrollAmount = cardWidth + gap;

    rail.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
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
              className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
              aria-label="Go back to categories"
            >
              <ArrowLeft className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
            </button>
            <span className="text-[10px] font-light tracking-[0.3em] text-pink-500 uppercase">
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
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
            aria-label="Scroll projects left"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scrollProjects("next")}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
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
        data-lenis-prevent
        className="flex gap-6 overflow-x-auto pb-4 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
            aria-label="Go back to categories"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          </button>
          <span className="text-[10px] font-light tracking-[0.3em] text-pink-500 uppercase">
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
            MY WORKS
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

        {/* Works Next Button */}
        {!activeSection && (
          <NextSectionButton targetId="contact" label="Next" />
        )}
      </div>
    </section>
  );
};

export default OurWorks;
