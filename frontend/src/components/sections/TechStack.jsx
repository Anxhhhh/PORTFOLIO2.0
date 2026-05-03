import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useMotionTemplate, useScroll, useSpring } from "framer-motion";
import NextSectionButton from "../ui/NextSectionButton";

const techStack = [
  {
    name: "HTML5",
    category: "Frontend",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
      </svg>
    ),
    color: "#E34F26"
  },
  {
    name: "CSS3",
    category: "Styling",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm5.09 8.766l.14 1.624h8.38l-.23 2.622-2.88.804-2.923-.81-.17-1.928H7.135l.261 2.94 4.604 1.272 4.621-1.279.467-5.244H6.59zM5.918 4.41l.142 1.625h11.88l.143-1.625H5.918z" />
      </svg>
    ),
    color: "#1572B6"
  },
  {
    name: "JavaScript",
    category: "Language",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M0 0h24v24H0V0zm22.034 18.268c0-1.142-.733-1.54-1.508-1.54-.633 0-1.166.333-1.166.867 0 .433.3.666.833.866.6.233 1.3.433 1.3 1.3 0 .867-.766 1.4-1.833 1.4-1.1 0-1.7-.533-1.7-1.333h1.1c0 .4.233.6.733.6.434 0 .7-.2.7-.533 0-.3-.233-.434-.733-.634-.7-.266-1.4-.433-1.4-1.333 0-.767.567-1.333 1.6-1.333 1.067 0 1.633.5 1.633 1.3h-1.033zm-4.75-.434c0 .834-.334 1.367-1.134 1.367-.6 0-.933-.333-.933-.8 0-.467.367-.734.933-.734.567 0 .867.067 1.134.167v-.001zm.133-2.6h-1.1v.267c-.233-.2-.566-.334-.966-.334-1.134 0-1.7.934-1.7 2.1 0 1.134.6 2.067 1.7 2.067.433 0 .833-.134 1.066-.467v.4h1.1v-4.033h-.1z" />
      </svg>
    ),
    color: "#F7DF1E"
  },
  {
    name: "React",
    category: "Frontend",
    icon: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full" style={{ color: "#61DAFB" }}>
        <circle cx="50" cy="50" r="10" />
        <path d="M50 30c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 36c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" opacity=".3" />
        <ellipse cx="50" cy="50" rx="45" ry="17" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="50" cy="50" rx="45" ry="17" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="45" ry="17" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(120 50 50)" />
      </svg>
    ),
    color: "#61DAFB"
  },
  {
    name: "Tailwind",
    category: "Styling",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
    color: "#38B2AC"
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 1.5L2.1 7.2v11.4l9.9 5.7 9.9-5.7V7.2L12 1.5zm8.1 16.2l-8.1 4.7-8.1-4.7V8.1l8.1-4.7 8.1 4.7v9.6zM12 6.9c-2.8 0-5.1 2.3-5.1 5.1s2.3 5.1 5.1 5.1 5.1-2.3 5.1-5.1-2.3-5.1-5.1-5.1zm0 8.4c-1.8 0-3.3-1.5-3.3-3.3S10.2 8.7 12 8.7s3.3 1.5 3.3 3.3-1.5 3.3-3.3 3.3z" />
      </svg>
    ),
    color: "#339933"
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M17.193 11.516c.15.114.28.232.392.353-.332-1.47-1.127-2.903-2.316-4.04-2.106-2.022-4.793-2.956-6.012-4.832-.016-.026-.062-.03-.07-.002-.132.482-.124 1.173.076 1.83.178.587.495 1.118.89 1.58.016.018.046.01.04-.012-.416-1.503-.134-2.857.732-3.87 0 0 .114.125.106.136-.932 1.132-1.42 2.766-.632 4.414 0 0 .01.02.02.022 2.693 1.156 5.56 2.806 6.814 4.42z" />
        <path d="M11.468 20.916c-.01 0-.01-.01-.01-.02 0-.256.035-2.03.04-2.618C11.506 17.5 11.12 16.5 10.4 15.5c-.833-1.166-1.916-2.133-2.116-3.882-.017-.13-.017-.258-.008-.382.116-.2.3-.393.542-.572.036-.027.086-.01.1.027.42 1.144 1.488 2.052 3.036 2.652.03.013.048-.018.033-.042-1.253-.198-2.603-.687-3.414-1.848 0 0-.012-.018-.002-.027.632-.6 1.632-.982 2.732-1.04.14-.008.28-.01.418-.01.033 0 .048.04.025.064-.91.957-1.258 2.455-.427 3.655.45.65.918 1.05 1.15 1.766.166.417.18 1.116.18 1.116 0 .618-.048 2.316-.073 2.85-.01.183-.357.19-.364.015z" />
      </svg>
    ),
    color: "#47A248"
  },
  {
    name: "GSAP",
    category: "Animation",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M19.7 2.1c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3zm-7.7 0c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3zm-7.7 0C3 2.1 2 3.1 2 4.4s1 2.3 2.3 2.3 2.3-1 2.3-2.3S5.6 2.1 4.3 2.1zM19.7 9.4c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3zm-7.7 0c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3zm-7.7 0C3 9.4 2 10.4 2 11.7s1 2.3 2.3 2.3 2.3-1 2.3-2.3S5.6 9.4 4.3 9.4zm15.4 7.3c-1.3 0-2.3 1-2.3 2.3S18.4 21.3 19.7 21.3s2.3-1 2.3-2.3-1.1-2.3-2.3-2.3zm-7.7 0c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3zm-7.7 0C3 16.7 2 17.7 2 19s1.1 2.3 2.3 2.3S6.6 20.3 6.6 19s-1-2.3-2.3-2.3z" />
      </svg>
    ),
    color: "#88CE02"
  },
  {
    name: "Figma",
    category: "Design",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C8.686 0 6 2.686 6 6s2.686 6 6 6V6c0-3.314-2.686-6-6-6zm0 12c-3.314 0-6 2.686-6 6s2.686 6 6 6V18c0-3.314-2.686-6-6-6zm0 0c3.314 0 6-2.686 6-6s-2.686-6-6-6V6c0 3.314 2.686 6 6 6zm0 12c3.314 0 6-2.686 6-6v6c0 3.314-2.686 6-6 6zm6-6c0-3.314-2.686-6-6-6v12c3.314 0 6-2.686 6-6z" />
      </svg>
    ),
    color: "#F24E1E"
  },
  {
    name: "Git",
    category: "DevTools",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.187 0L8.708 2.624l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.906l2.658 2.66c.646-.223 1.388-.082 1.904.433.72.719.72 1.884 0 2.603s-1.884.72-2.603 0c-.527-.526-.67-1.285-.43-1.939L12.61 8.835v4.542c.22.115.42.28.588.49.72.72.72 1.884 0 2.603s-1.884.72-2.603 0c-.72-.719-.72-1.884 0-2.603.18-.18.39-.311.614-.413V8.65c-.225-.102-.435-.233-.615-.413-.509-.51-.651-1.242-.44-1.883L7.387 3.586.452 10.522c-.603.604-.603 1.582 0 2.187l10.48 10.477c.604.604 1.582.604 2.187 0l10.427-10.43c.608-.603.608-1.58 0-2.186z" />
      </svg>
    ),
    color: "#F05032"
  },
  {
    name: "Spline",
    category: "3D",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 4.5c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5c1.474 0 2.85-.426 4.012-1.157l-1.428-1.428c-.76.375-1.64.585-2.584.585-3.037 0-5.5-2.463-5.5-5.5s2.463-5.5 5.5-5.5c1.196 0 2.302.383 3.203 1.03l1.424-1.424C15.54 5.319 13.856 4.5 12 4.5zm0 3c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5c.813 0 1.57-.215 2.226-.59l-1.01-1.01c-.37.193-.787.3-1.216.3-1.657 0-3-1.343-3-3s1.343-3 3-3c.48 0 .942.113 1.346.315l1.01-1.01C13.834 7.696 12.956 7.5 12 7.5z" />
      </svg>
    ),
    color: "#FF2D55"
  },
  {
    name: "Postman",
    category: "API",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M16.48 9.32a.11.11 0 010-.12c.03-.04.09-.04.13-.01a182.26 182.26 0 016 5.86.11.11 0 010 .15c-.03.04-.09.04-.13.02l-6-5.9zm-4.48-1.8a.11.11 0 010-.12c.03-.04.09-.04.13-.01a182.26 182.26 0 016 5.86.11.11 0 010 .15c-.03.04-.09.04-.13.02l-6-5.9zm-4.48-1.8a.11.11 0 010-.12c.03-.04.09-.04.13-.01a182.26 182.26 0 016 5.86.11.11 0 010 .15c-.03.04-.09.04-.13.02l-6-5.9zM0 12a12 12 0 1112 12A12.01 12.01 0 010 12z" />
      </svg>
    ),
    color: "#FF6C37"
  },
  {
    name: "Express.js",
    category: "Backend",
    icon: (
      <span className="text-xl font-bold tracking-tighter">ex</span>
    ),
    color: "#ffffff"
  },
  {
    name: "Java",
    category: "Language",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M6.35 15.68c-.14.03-.27.07-.4.12 1.37.1 2.38.38 3.03.8 0 .02 0 .03-.01.05-1.14.73-3.66 1.42-6.24.47l-.14-.05c3.27 1.86 8.52 1.25 10.37-1.42h.01c-.13-.04-.26-.07-.4-.1zM11.51 16.7s0 .01.01.01v-.01zM10.82 13.9c-.3 0-.58.01-.84.02h.1l.13-.02c2.19-.17 4.14-.64 4.54-1.3.17-.3-.04-.57-.5-.73 2.11.41 2.51 1.25 1.13 1.87-.91.41-2.61.64-4.56.64-.17 0-.33 0-.5-.01l.12-.02.48-.45zm4.86.9c-.33-.06-.69-.11-1.07-.16-1.12.18-2.31.29-3.41.29-1.22 0-2.37-.11-3.41-.33.37.06.74.11 1.1.15-2.07.41-3.34 1.15-2.58 1.83.69-.37 2.65-.7 4.9-.7 2.39 0 4.46.33 5.06.74.77-.69-.5-1.42-2.59-1.82zM15.48 4.6l-.16.14c-1.19 1.19-1.89 2.59-1.63 3.96h.01c-.04-.01-.07-.02-.1-.03 2.87-1.03 2.57-2.82 2.57-2.82 1.54 1.63 1.23 3.33-1.03 4.11-.27.1-.56.17-.85.23.01.03.04.05.07.08 1.35-.41 1.9-.96 2.05-1.64.08-.34.02-.71-.21-1.09h.01c.21 1.05-.13 2.1-1.08 2.92.11-.03.22-.05.33-.08.64-.16 1.2-.42 1.63-.76.7-.56.97-1.32.74-2.15l-.01-.03c-.22.45-.58.85-1.06 1.17l-.27-.01c.01-.01.01-.02.02-.03.35-.37.58-.8.67-1.27.05-.3-.01-.63-.18-.95l-.16.14-.14.15c.34 1.42-.41 2.97-2.13 3.3h-.01c.14-.02.27-.04.4-.07 1.68-.42 2.15-1.5 1.55-2.67-.3-.58-.87-.98-1.57-1.15z" />
      </svg>
    ),
    color: "#007396"
  },
  {
    name: "Canva",
    category: "Design",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 2.5c3.59 0 6.5 2.91 6.5 6.5s-2.91 6.5-6.5 6.5-6.5-2.91-6.5-6.5 2.91-6.5 6.5-6.5z" />
      </svg>
    ),
    color: "#00C4CC"
  },
  {
    name: "GitHub",
    category: "Collaboration",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "#ffffff"
  }
];

const TechCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative h-44 md:h-48 bg-zinc-900/70 backdrop-blur-xl border border-white/[0.06] rounded-2xl flex flex-col items-center justify-center p-6 transition-all duration-500 hover:border-emerald-500/40 hover:bg-zinc-800/80 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/5 transition-all"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(180px circle at ${x}px ${y}px, ${item.color}12, transparent)`
        }}
      />
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08)_0%,transparent_60%)]" />
      
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="relative z-10 flex flex-col items-center gap-4 text-center"
      >
        <motion.div 
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
          style={{ color: item.color }}
        >
          {item.icon}
        </motion.div>
        <div>
          <h3 className="text-sm md:text-base font-medium text-gray-200 group-hover:text-white transition-all duration-300 tracking-wide">
            {item.name}
          </h3>
          <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-emerald-400/70 transition-colors duration-300 font-light tracking-widest uppercase mt-1 block">
            {item.category}
          </span>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-1 -translate-y-1">
        <div className="absolute top-3 right-3 w-3 h-[1px] bg-gradient-to-l from-emerald-500/60 to-transparent" />
        <div className="absolute top-3 right-3 w-[1px] h-3 bg-gradient-to-b from-emerald-500/60 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-1 translate-y-1">
        <div className="absolute bottom-3 left-3 w-3 h-[1px] bg-gradient-to-r from-emerald-500/60 to-transparent" />
        <div className="absolute bottom-3 left-3 w-[1px] h-3 bg-gradient-to-t from-emerald-500/60 to-transparent" />
      </div>
    </motion.div>
  );
};

const TechStackSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.1,
  });

  const headingY = useTransform(smoothProgress, [0, 1], [50, -50]);
  const headingOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} id="tech-stack" className="relative py-24 md:py-32 px-6 md:px-12 bg-black overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        }}
      />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[35%] h-[35%] bg-emerald-500/4 blur-[140px] rounded-full" />
        <div className="absolute top-[60%] right-[-10%] w-[30%] h-[30%] bg-zinc-800/10 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] left-[60%] w-[20%] h-[20%] bg-emerald-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="max-w-2xl mb-16 md:mb-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-emerald-500/50" />
            <span className="text-xs md:text-sm font-light tracking-[0.5em] text-emerald-500 uppercase">
              Tech Stack
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-tight text-white mb-6 uppercase leading-[0.95]"
          >
            Tools I build<br />with precision.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-lg"
          >
            A curated stack I use to design, build, animate, ship, and scale digital experiences with meticulous attention to detail.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {techStack.map((tech, index) => (
            <TechCard key={tech.name} item={tech} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-28 text-center"
        >
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
            <p className="text-gray-600 text-xs md:text-sm font-light tracking-[0.2em] italic uppercase">
              Obsessed with clean execution over hype
            </p>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </motion.div>

        {/* Tech Stack Next Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <NextSectionButton targetId="works" label="Next" />
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
