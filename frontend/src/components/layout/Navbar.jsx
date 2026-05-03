import React, { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const Navbar = ({ show }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Works", href: "#works" },
    { name: "Contact", href: "#contact" },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      if (window.lenis) {
	window.lenis.scrollTo(element, {
	  offset: 0,
	  duration: 1.5,
	  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	});
      } else {
	// Fallback if lenis is not ready
	element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${show ? "opacity-100 translate-y-0 delay-[800ms]" : "opacity-0 -translate-y-8"}`}>
      <nav
	className={`pointer-events-auto flex items-center justify-between transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden backdrop-blur-2xl border ${isScrolled
	  ? "w-[90%] md:w-[750px] lg:w-[800px] border-white/20 py-4 px-8 rounded-full translate-y-6"
	  : "w-full bg-transparent border-transparent py-8 px-8 md:px-12 rounded-none translate-y-0"
	  }`}
	style={isScrolled ? { background: "rgba(18, 18, 24, 0.75)" } : {}}
      >
	<div className="flex-1 flex justify-start gap-6 md:gap-8 text-[13px] md:text-[15px] font-normal tracking-wide relative z-10">
	  {navLinks.slice(0, 2).map((link) => (
	    <a 
	      key={link.name}
	      href={link.href} 
	      onClick={(e) => handleClick(e, link.href)}
	      className={`transition-colors ${isScrolled ? "text-white/70 hover:text-white" : "text-white hover:text-gray-300"}`}
	    >
	      {link.name}
	    </a>
	  ))}
	</div>

	<div className={`uppercase shrink-0 tracking-widest font-normal transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap hidden sm:block px-4 ${isScrolled ? "text-sm scale-95 opacity-90 text-white" : "text-lg scale-100 opacity-100 text-white"}`}>
	  PORTFOLIO
	</div>

	<div className="flex-1 flex justify-end gap-6 md:gap-8 items-center text-[13px] md:text-[15px] font-normal tracking-wide relative z-10">
	  {navLinks.slice(2).map((link) => (
	    <a 
	      key={link.name}
	      href={link.href} 
	      onClick={(e) => handleClick(e, link.href)}
	      className={`transition-colors ${isScrolled ? "text-white/70 hover:text-white" : "text-white hover:text-gray-300"}`}
	    >
	      {link.name}
	    </a>
	  ))}
	  <div className="flex gap-4 border-l border-white/10 pl-6 md:pl-8 ml-2">
	    <a 
	      href="https://github.com/Anxhhhh" 
	      target="_blank" 
	      rel="noopener noreferrer"
	      className={`transition-all hover:scale-110 ${isScrolled ? "text-white/70 hover:text-white" : "text-white hover:text-gray-300"}`}
	      aria-label="GitHub"
	    >
	      <Github className="w-4 h-4 md:w-5 md:h-5" />
	    </a>
	    <a 
	      href="https://www.linkedin.com/in/anshraj-singh-thakur-349ab533b/" 
	      target="_blank" 
	      rel="noopener noreferrer"
	      className={`transition-all hover:scale-110 ${isScrolled ? "text-white/70 hover:text-white" : "text-white hover:text-gray-300"}`}
	      aria-label="LinkedIn"
	    >
	      <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
	    </a>
	  </div>
	</div>
      </nav>
    </div>
  );
};

export default Navbar;
