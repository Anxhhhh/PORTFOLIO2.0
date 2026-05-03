import { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import NextSectionButton from "../ui/NextSectionButton";

// ============================================================
// Hero Component — Premium Animated Version
// All 8 animations from HERO_ANIMATION_README.md
// ============================================================


const ANSH_LETTERS = "ANSHRAJ".split("");

export default function Hero({ visible }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // ── Refs ──────────────────────────────────────────────────
  const textRef = useRef(null);
  const badgeRef = useRef(null);
  const prathamRef = useRef(null);
  const letterRefs = useRef([]);  // individual letter spans for PRATHAM
  const jainRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);
  const discoverTextRef = useRef(null);
  const scrollParticleRef = useRef(null);
  const glowRef = useRef(null);
  const cornerRefs = useRef([]);  // 4 corner accent divs
  const charRefs = useRef([]);  // subtitle characters
  const noteRefs = useRef([]);  // sticky note cards

  // ── Particles (memo so they don't regenerate) ─────────────
  const particles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 4,
      opacity: 0.04 + Math.random() * 0.06,
    })), []);

  // ── Subtitle text split ───────────────────────────────────
  const line1 = "Developer • Designer • Creative problem solver";
  const line2 = "turning ideas into real digital products.";

  // ────────────────────────────────────────────────────────────
  // EFFECT 1: Entrance animation when loader finishes (GSAP Timeline)
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      // Set initial hidden states via gsap.set (avoids CSS transition conflicts)
      gsap.set(cornerRefs.current, { opacity: 0, scale: 0.5 });
      gsap.set(badgeRef.current, { opacity: 0, y: 30, filter: "blur(6px)" });
      gsap.set(letterRefs.current, { opacity: 0, y: 60, rotateX: -90 });
      gsap.set(jainRef.current, { opacity: 0, x: -40, skewX: -10 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(scrollRef.current, { opacity: 0, y: 20 });
      gsap.set(glowRef.current, { opacity: 0 });
      if (charRefs.current.length) {
        gsap.set(charRefs.current, { opacity: 0 });
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Corner accents
      tl.fromTo(
        cornerRefs.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }
      )
        // Badge with blur reveal
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.3"
        )
        // PRATHAM letter-by-letter 3D flip entrance
        .fromTo(
          letterRefs.current,
          { opacity: 0, y: 60, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.05 },
          "-=0.4"
        )
        // Sticky notes pop in with the main name
        .fromTo(
          noteRefs.current,
          { opacity: 0, y: 40, scale: 0.88, filter: "blur(4px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" },
          "<0.4" // Start halfway through the name flip animation
        )
        // Jain slides in from left with skew
        .fromTo(
          jainRef.current,
          { opacity: 0, x: -40, skewX: -10 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.9 },
          "-=0.5"
        )
        // Subtitle section
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        // Scroll indicator
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        // Glow reveal
        .fromTo(
          glowRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2 },
          "-=1.0"
        )
        // Typewriter effect for subtitle chars
        .fromTo(
          charRefs.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.03, stagger: 0.03, ease: "none" },
          "-=0.2"
        );

      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [visible]);

  // ────────────────────────────────────────────────────────────
  // EFFECT 2: Mouse parallax on the text wrapper
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!textRef.current || !isLoaded) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(textRef.current, {
        x: xPos,
        y: yPos,
        rotationX: -yPos * 0.5,
        rotationY: xPos * 0.5,
        ease: "power3.out",
        duration: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLoaded]);

  // ────────────────────────────────────────────────────────────
  // EFFECT 3: Glitch on "Jain" (random every 4–8s)
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    let glitchTimeoutId;

    const triggerGlitch = () => {
      if (!jainRef.current) return;
      const tl = gsap.timeline();
      tl.to(jainRef.current, { x: -6, skewX: 5, duration: 0.06 })
        .to(jainRef.current, { x: 8, skewX: -4, duration: 0.06 })
        .to(jainRef.current, { x: -4, skewX: 2, duration: 0.05 })
        .to(jainRef.current, { x: 0, skewX: 0, duration: 0.08, ease: "power2.out" });
    };

    const scheduleGlitch = () => {
      const delay = 4000 + Math.random() * 4000;
      glitchTimeoutId = setTimeout(() => {
        triggerGlitch();
        scheduleGlitch();
      }, delay);
    };

    scheduleGlitch();
    return () => clearTimeout(glitchTimeoutId);
  }, [isLoaded]);

  // ────────────────────────────────────────────────────────────
  // EFFECT 4: Glow pulsing loop
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded || !glowRef.current) return;

    const anim = gsap.to(glowRef.current, {
      opacity: 0.4,
      scale: 1.15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => anim.kill();
  }, [isLoaded]);

  // ────────────────────────────────────────────────────────────
  // EFFECT 5: Scroll indicator — breathing text + traveling particle
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    let breathAnim, particleAnim;

    if (discoverTextRef.current) {
      breathAnim = gsap.to(discoverTextRef.current, {
        opacity: 0.2,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    if (scrollParticleRef.current) {
      particleAnim = gsap.fromTo(
        scrollParticleRef.current,
        { top: "0%", opacity: 0 },
        {
          top: "100%",
          opacity: 1,
          duration: 1.5,
          repeat: -1,
          ease: "power1.in",
          onRepeat: () => {
            gsap.set(scrollParticleRef.current, { top: 0, opacity: 0 });
          },
        }
      );
    }

    return () => {
      breathAnim?.kill();
      particleAnim?.kill();
    };
  }, [isLoaded]);

  // ────────────────────────────────────────────────────────────
  // EFFECT 6: Scroll parallax on ANSHRAJ + THAKUR
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // ANSHRAJ drifts up faster — stronger parallax
      if (prathamRef.current) {
        gsap.to(prathamRef.current, {
          y: scrollY * -0.35,
          ease: "none", duration: 0.4, overwrite: "auto",
        });
      }
      // THAKUR drifts up slower — creates depth separation
      if (jainRef.current) {
        gsap.to(jainRef.current, {
          y: scrollY * -0.15,
          ease: "none", duration: 0.4, overwrite: "auto",
        });
      }
      // Subtitle ("FULL STACK WEB DEVELOPER" + description) — gentle drift
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          y: scrollY * -0.2,
          ease: "none", duration: 0.4, overwrite: "auto",
        });
      }
      // DISCOVER indicator — fastest exit (it's at the bottom)
      if (scrollRef.current) {
        gsap.to(scrollRef.current, {
          y: scrollY * -0.5,
          opacity: Math.max(0, 1 - scrollY / 200),
          ease: "none", duration: 0.3, overwrite: "auto",
        });
      }

      // Sticky Notes Horizontal Parallax
      if (noteRefs.current[0]) {
        gsap.to(noteRefs.current[0], {
          x: scrollY * -0.4, // Move left
          ease: "none", duration: 0.4, overwrite: "auto",
        });
      }
      if (noteRefs.current[1]) {
        gsap.to(noteRefs.current[1], {
          x: scrollY * -0.3, // Move left
          ease: "none", duration: 0.4, overwrite: "auto",
        });
      }
      if (noteRefs.current[2]) {
        gsap.to(noteRefs.current[2], {
          x: scrollY * 0.35, // Move right
          ease: "none", duration: 0.4, overwrite: "auto",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoaded]);


  // ────────────────────────────────────────────────────────────
  // Handler: Magnetic badge
  // ────────────────────────────────────────────────────────────
  const handleBadgeMouseMove = (e) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;
    gsap.to(badgeRef.current, { x: deltaX, y: deltaY, duration: 0.4, ease: "power2.out" });
  };

  const handleBadgeMouseLeave = () => {
    gsap.to(badgeRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  // ────────────────────────────────────────────────────────────
  // JSX
  // ────────────────────────────────────────────────────────────
  return (
    <div
      id="home"
      className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center [perspective:1000px]"
    >
      {/* ── Cyber Corner Accents ─────────────────────────────── */}
      <div ref={el => cornerRefs.current[0] = el} className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/20" />
      <div ref={el => cornerRefs.current[1] = el} className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/20" />
      <div ref={el => cornerRefs.current[2] = el} className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-white/20" />
      <div ref={el => cornerRefs.current[3] = el} className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20" />

      {/* ── Decorative Grid ──────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* ── Floating Particles (z-index 1, behind everything) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            ref={(el) => {
              if (el) {
                gsap.to(el, {
                  y: "-110vh",
                  duration: p.duration,
                  delay: p.delay,
                  repeat: -1,
                  ease: "none",
                });
              }
            }}
          />
        ))}
      </div>

      {/* ── Sticky Notes ─────────────────────────────────────── */}

      {/* Note 1 — top-left */}
      <div
        ref={el => noteRefs.current[0] = el}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, { 
            scale: 1.05, 
            rotate: -2, 
            borderColor: "rgba(16,185,129,0.3)", 
            backgroundColor: "rgba(16,185,129,0.05)",
            duration: 0.4, 
            ease: "power2.out" 
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, { 
            scale: 1, 
            rotate: 0, 
            borderColor: "rgba(255,255,255,0.09)", 
            backgroundColor: "rgba(12,12,12,0.82)",
            duration: 0.6, 
            ease: "elastic.out(1, 0.5)" 
          });
        }}
        className="hidden lg:flex absolute top-[22%] left-[4%] flex-col gap-2 p-5 rounded-2xl z-20 max-w-[220px] cursor-default transition-colors duration-300"
        style={{
          background: "rgba(12,12,12,0.82)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(14px)",
          opacity: 0,
        }}
      >
        <span className="text-[10px] font-mono text-emerald-400/80 tracking-[0.25em] uppercase mb-1">About me</span>
        <p className="text-[13px] leading-[1.65] text-white/80 font-light">
          Crafting digital experiences that push the boundaries of web technology.
        </p>
      </div>

      {/* Note 2 — mid-left */}
      <div
        ref={el => noteRefs.current[1] = el}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, { 
            scale: 1.05, 
            rotate: -1, 
            borderColor: "rgba(16,185,129,0.3)", 
            backgroundColor: "rgba(16,185,129,0.05)",
            duration: 0.4, 
            ease: "power2.out" 
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, { 
            scale: 1, 
            rotate: -2.5, 
            borderColor: "rgba(255,255,255,0.09)", 
            backgroundColor: "rgba(12,12,12,0.82)",
            duration: 0.6, 
            ease: "elastic.out(1, 0.5)" 
          });
        }}
        className="hidden lg:flex absolute top-[52%] left-[3%] flex-col gap-2 p-5 rounded-2xl z-20 max-w-[200px] cursor-default transition-colors duration-300"
        style={{
          background: "rgba(12,12,12,0.82)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(14px)",
          transform: "rotate(-2.5deg)",
          opacity: 0,
        }}
      >
        <span className="text-[10px] font-mono text-emerald-400/80 tracking-[0.25em] uppercase mb-1">Stack</span>
        <p className="text-[13px] leading-[1.65] text-white/80 font-light">
          React · Node.js · TypeScript · MongoDB · Tailwind
        </p>
      </div>

      {/* Note 3 — right side */}
      <div
        ref={el => noteRefs.current[2] = el}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, { 
            scale: 1.05, 
            rotate: 4, 
            borderColor: "rgba(16,185,129,0.3)", 
            backgroundColor: "rgba(16,185,129,0.05)",
            duration: 0.4, 
            ease: "power2.out" 
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, { 
            scale: 1, 
            rotate: 2, 
            borderColor: "rgba(255,255,255,0.09)", 
            backgroundColor: "rgba(12,12,12,0.82)",
            duration: 0.6, 
            ease: "elastic.out(1, 0.5)" 
          });
        }}
        className="hidden lg:flex absolute top-[30%] right-[4%] flex-col gap-2 p-5 rounded-2xl z-20 max-w-[220px] cursor-default transition-colors duration-300"
        style={{
          background: "rgba(12,12,12,0.82)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(14px)",
          transform: "rotate(2deg)",
          opacity: 0,
        }}
      >
        <span className="text-[10px] font-mono text-emerald-400/80 tracking-[0.25em] uppercase mb-1">Philosophy</span>
        <p className="text-[13px] leading-[1.65] text-white/80 font-light">
          The first full-stack developer integrating design thinking to deliver best-in-class experiences.
        </p>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full mt-4">

        {/* Location Badge — magnetic */}
        <div
          ref={badgeRef}
          onMouseMove={handleBadgeMouseMove}
          onMouseLeave={handleBadgeMouseLeave}
          className="mb-8 px-5 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md cursor-default"
          style={{ opacity: 0 }} // initial hidden — GSAP controls
        >
          <p className="text-xs md:text-sm font-mono text-gray-300 tracking-widest flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            BASED IN BHOPAL, INDIA
          </p>
        </div>

        {/* Animated Text Wrapper — 3D parallax target */}
        <div
          ref={textRef}
          className="relative cursor-default flex justify-center items-center mt-12 md:mt-16 w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Foreground Text Container */}
          <div className="relative flex justify-center items-center">

            {/* Glow behind PRATHAM */}
            <div
              ref={glowRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(186,254,3,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: 0,
                opacity: 0,
              }}
            />

            {/* ANSH — main name */}
            <h1
              ref={prathamRef}
              className="relative text-[clamp(2.5rem,9vw,9rem)] md:text-[180px] font-normal tracking-wide leading-none flex justify-center z-10"
              style={{
                fontFamily: 'TouraynDemo, sans-serif',
                color: "#BAFE03",
                WebkitTextStroke: "3px #1E1E1E",
                perspective: "500px",
              }}
            >
              {ANSH_LETTERS.map((letter, i) => (
                <span
                  key={i}
                  ref={(el) => (letterRefs.current[i] = el)}
                  className="inline-block"
                  style={{
                    fontFamily: 'TouraynDemo, sans-serif',
                    color: "#7fe67aff",
                    WebkitTextStroke: "3px #1E1E1E",
                    opacity: 0, // initial — GSAP controls
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            {/* Jain — glitch effect */}
            <h2
              ref={jainRef}
              className="absolute top-[45%] md:top-[60%] text-[clamp(4.5rem,12vw,12rem)] md:text-[150px] font-normal tracking-normal leading-none z-20"
              style={{
                fontFamily: 'Javacom, cursive',
                WebkitTextStroke: "2px white",
                color: "transparent",
                opacity: 0, // initial — GSAP controls
              }}
            >
              Singh
            </h2>
          </div>
        </div>

        {/* Subtitles & Tagline */}
        <div
          ref={subtitleRef}
          className="mt-30 flex flex-col items-center gap-4 text-center"
          style={{ opacity: 0 }} // initial — GSAP controls
        >
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-12 h-[1px] bg-emerald-500/50" />
            <p className="text-lg md:text-2xl font-mono text-emerald-50 tracking-[0.4em] uppercase font-light">
              Full Stack Web Developer
            </p>
            <div className="hidden md:block w-12 h-[1px] bg-emerald-500/50" />
          </div>

          {/* Typewriter text */}
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mt-2 font-mono leading-relaxed border border-white/5 bg-white/5 p-4 rounded-xl backdrop-blur-sm">
            {/* Line 1 */}
            {line1.split("").map((ch, i) => (
              <span
                key={`l1-${i}`}
                ref={(el) => { charRefs.current[i] = el; }}
                style={{ opacity: 0 }}
              >
                {ch}
              </span>
            ))}
            <br />
            {/* Line 2 */}
            {line2.split("").map((ch, i) => (
              <span
                key={`l2-${i}`}
                ref={(el) => { charRefs.current[line1.length + i] = el; }}
                style={{ opacity: 0 }}
              >
                {ch}
              </span>
            ))}
          </p>
          
          {/* Main CTA Button */}
          <button
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - (rect.left + rect.width / 2)) * 0.4;
              const y = (e.clientY - (rect.top + rect.height / 2)) * 0.4;
              gsap.to(e.currentTarget, { x, y, duration: 0.3, ease: "power2.out" });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
            }}
            className="group relative mt-10 px-12 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/10 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] animate-button-breath"
          >
            {/* Emerald glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.15)_0%,transparent_70%)]" />
            
            <style>{`
              @keyframes buttonBreath {
                0%, 100% { border-color: rgba(255,255,255,0.1); }
                50% { border-color: rgba(16,185,129,0.2); }
              }
              .animate-button-breath {
                animation: buttonBreath 3s ease-in-out infinite;
              }
            `}</style>

            <span className="relative z-10 text-xs md:text-sm font-light tracking-[0.4em] text-white/90 group-hover:text-emerald-300 uppercase transition-colors">
              Explore
            </span>
          </button>
        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center"
        style={{ opacity: 0 }} // initial — GSAP controls
      >
        <span
          ref={discoverTextRef}
          className="text-[10px] font-mono text-gray-500 tracking-[0.4em] uppercase mb-4"
        >
          Discover
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
          <div
            ref={scrollParticleRef}
            className="absolute left-0 w-full h-[30%] bg-emerald-400"
            style={{ top: 0, opacity: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
