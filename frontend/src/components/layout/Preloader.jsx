import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default Preloader;
