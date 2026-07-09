import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─────────────────────────────────────────────────────────────────────────────
// Greetings — each shown instantly, Welcome stays longer at the end
// ─────────────────────────────────────────────────────────────────────────────
const GREETINGS = [
  { word: "Hello",    lang: "en" },
  { word: "Hola",     lang: "es" },
  { word: "Bonjour",  lang: "fr" },
  { word: "Ciao",     lang: "it" },
  { word: "こんにちは", lang: "ja" },
  { word: "안녕하세요", lang: "ko" },
  { word: "नमस्ते",   lang: "hi" },
  { word: "مرحبا",    lang: "ar" },
  { word: "Welcome",  lang: "en" }, // last — held longer
];

// How long each regular greeting is visible (seconds)
const HOLD_DURATION = 0.18;
// How long "Welcome" stays before the wipe
const WELCOME_HOLD = 0.65;

// ─────────────────────────────────────────────────────────────────────────────
// Loader
// Props:
//   onComplete — callback fired when exit animation is done
// ─────────────────────────────────────────────────────────────────────────────
export default function Loader({ onComplete }) {
  const panelRef = useRef(null);
  const greetRef = useRef(null);
  const tlRef    = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    const greet = greetRef.current;

    if (!panel || !greet) return;

    // ── Accessibility: skip if reduced motion preferred ───────────────────
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      const tid = setTimeout(() => onComplete?.(), 300);
      return () => clearTimeout(tid);
    }

    // ── Body scroll lock ──────────────────────────────────────────────────
    document.body.style.overflow = "hidden";

    const total = GREETINGS.length;

    // ── Set first word immediately (invisible) ────────────────────────────
    greet.textContent = GREETINGS[0].word;
    greet.style.direction = "ltr";
    gsap.set(greet, { opacity: 0, y: 14, scale: 0.97, filter: "blur(6px)" });

    // ── Master timeline ───────────────────────────────────────────────────
    const tl = gsap.timeline();
    tlRef.current = tl;


    // ── Step 1: Fade the text IN once at the very start ───────────────────
    tl.to(greet, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.35,
      ease: "power3.out",
    });

    // ── Step 2: Instant-swap through each greeting ────────────────────────
    // Hold each word, then hard-cut the text. No fade, no slide.
    GREETINGS.forEach((item, i) => {
      const isLast = i === total - 1;
      const hold   = isLast ? WELCOME_HOLD : HOLD_DURATION;

      // Hold current word for `hold` seconds
      tl.to({}, { duration: hold });

      if (!isLast) {
        // Instant text swap — zero animation
        tl.call(() => {
          greet.textContent = GREETINGS[i + 1].word;
          greet.style.direction =
            GREETINGS[i + 1].lang === "ar" ? "rtl" : "ltr";
        });
      }
    });

    // ── Step 3: Cinematic upward wipe exit ────────────────────────────────
    // Fire onComplete at the START of the wipe so the Hero mounts and begins
    // its entrance animation while the black panel is still lifting away.
    // This eliminates the blank-screen gap between loader and hero.
    tl.call(() => {
      document.body.style.overflow = "";
      onComplete?.();
    });

    tl.to(greet, {
      opacity: 0,
      filter: "blur(10px)",
      scale: 1.04,
      duration: 0.22,
      ease: "power2.in",
    });

    tl.to(
      panel,
      {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.72,
        ease: "power4.inOut",
      },
      "<0.04"
    );

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      tlRef.current?.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "inset(0 0 0% 0)",
        willChange: "clip-path",
        isolation: "isolate",
      }}
    >
      {/* ── Subtle noise grain ──────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
          opacity: 0.04,
          pointerEvents: "none",
          zIndex: 0,
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Faint radial glow ────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.028) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Greeting text ────────────────────────────────────────────────── */}
      <p
        ref={greetRef}
        aria-live="polite"
        style={{
          position: "relative",
          zIndex: 10,
          fontFamily:
            "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 500,
          fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)",
          letterSpacing: "-0.01em",
          color: "#ffffff",
          userSelect: "none",
          textRendering: "geometricPrecision",
          WebkitFontSmoothing: "antialiased",
          opacity: 0,
        }}
      />
    </div>
  );
}
