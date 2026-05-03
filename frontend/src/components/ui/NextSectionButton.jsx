import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const NextSectionButton = ({ targetId, label = "Next", className = "flex justify-center mt-12 mb-8" }) => {
  const buttonRef = useRef(null);

  const handleScroll = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.4;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.4;
    gsap.to(buttonRef.current, { x, y, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className={`${className} pointer-events-auto`}
    >
      <button
        ref={buttonRef}
        onClick={handleScroll}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative px-12 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/10 active:scale-95"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.12)_0%,transparent_70%)]" />
        <span className="relative z-10 text-xs md:text-sm font-light tracking-[0.4em] text-white/90 group-hover:text-emerald-300 uppercase transition-colors">
          {label}
        </span>
      </button>
    </motion.div>
  );
};

export default NextSectionButton;
