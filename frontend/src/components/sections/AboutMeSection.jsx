"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Download } from "lucide-react";
import NextSectionButton from "../ui/NextSectionButton";
import ResumeModal from "../ui/ResumeModal";

const AboutMeSection = () => {
  const containerRef = useRef(null);
  
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const float1Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const float2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const float3Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <>
      <section 
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-black text-white py-24 px-6 md:px-12 overflow-hidden flex items-center justify-center"
    >
      <div className="max-w-[1240px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
        
        {/* Floating Background Accents */}
        <motion.div style={{ y: float1Y }} className="absolute -left-20 top-1/4 w-64 h-64 rounded-full bg-pink-500/5 blur-[100px] pointer-events-none" />
        <motion.div style={{ y: float2Y }} className="absolute -right-20 bottom-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <motion.div style={{ y: float3Y }} className="absolute left-1/2 top-0 w-32 h-32 rounded-full border border-white/5 opacity-20 pointer-events-none" />
        
        {/* LEFT SIDE: GRAPHIC AREA */}
        <div className="relative flex justify-center items-center h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
            whileHover={{ scale: 1.02, rotate: -2, y: -10 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative z-10 group cursor-none"
          >
            {/* Displaying User's Graphic directly with parallax reveal */}
            <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-[400px] md:max-w-[600px] overflow-hidden rounded-2xl">
              <motion.div 
                style={{ y: imgY, scale: 1.2 }}
                className="w-full h-full"
              >
                <img 
                  src="/about-portrait.png" 
                  alt="Anshraj Portrait" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                />
              </motion.div>
              
              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Doodle Accents */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-6 -right-6 text-pink-500 w-12 h-12 md:w-16 md:h-16"
            >
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: TEXT AREA */}
        <div className="flex flex-col justify-center gap-4 md:gap-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="font-script text-3xl md:text-4xl text-white/90">About Me</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-8xl md:text-[140px] font-headline text-white leading-[0.8] tracking-tighter"
            >
              HI!!!
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl font-body font-light text-gray-200 leading-relaxed max-w-lg">
              My name is <span className="font-bold underline decoration-pink-500/50 underline-offset-8">Anshraj</span>, and I'm a <span className="italic opacity-80">Full Stack Developer and AI/ML student</span> based in India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 pt-2">
              <div className="space-y-3">
                <span className="font-script text-3xl text-pink-400 block pb-1 border-b border-pink-500/20 w-fit">Ever since</span>
                <p className="font-body text-sm md:text-base leading-relaxed text-gray-400 font-light">
                  I remember, I’ve always been curious about how websites and applications actually work — from simple pages to complex systems. That curiosity led me into web development and later into AI/ML, where I started building real projects and improving my skills step by step.
                </p>
              </div>

              <div className="space-y-3">
                <span className="font-script text-3xl text-pink-400 block pb-1 border-b border-pink-500/20 w-fit">I am driven to</span>
                <p className="font-body text-sm md:text-base leading-relaxed text-gray-400 font-light">
                  I enjoy building modern web applications and  passionate about leveraging AI/ML to create efficient and impactful solutions.
                </p>
                <div className="absolute right-0 bottom-0 text-[120px] font-headline text-white/[0.03] select-none translate-y-12">L</div>
              </div>
            </div>

            {/* Buttons Area */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-pink-500/40 hover:bg-white/10 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                >
                  {/* Pink glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,transparent_70%)]" />
                  
                  <FileText className="relative z-10 w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10 text-xs md:text-sm font-light tracking-[0.3em] text-white/90 group-hover:text-pink-300 uppercase transition-colors">
                    View RESUME
                  </span>
                </button>

                {/* Direct Download Link */}
                <a
                  href="/resume.pdf"
                  download="Anshraj_Singh_Resume.pdf"
                  className="group flex items-center gap-2 text-xs md:text-sm font-mono text-white/70 hover:text-pink-400 transition-colors uppercase tracking-widest"
                >
                  <Download className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Download PDF
                </a>
              </motion.div>

              <NextSectionButton targetId="skills" label="Next" className="mt-0 mb-0" />
            </div>
          </motion.div>

          {/* Contact Links Area */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a href="mailto:anshrajsingh62@gmail.com" className="font-body text-xs md:text-sm tracking-widest uppercase border-b border-white/20 pb-1 hover:border-pink-500 transition-colors">
              anshrajsingh62@gmail.com
            </a>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
            <span className="font-body text-xs md:text-sm tracking-widest text-white/60">6264902102</span>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
            <a href="#" className="font-body text-xs md:text-sm tracking-widest uppercase border-b border-white/20 pb-1 hover:border-pink-500 transition-colors">
              PORTFOLIO
            </a>
          </motion.div>
        </div>
      </div>
    </section>
    
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />
    </>
  );
};

export default AboutMeSection;
