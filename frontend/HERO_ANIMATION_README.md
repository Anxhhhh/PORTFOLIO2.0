# 🎯 Hero Page Animation Upgrade — Instructions for AI Agent

## Overview

This document contains **complete instructions** for upgrading the Hero section (`src/components/Hero.jsx`) of this React + Vite + TailwindCSS portfolio project with advanced, premium-quality animations — **without changing any existing colors, fonts, layout, or overall design style**.

The portfolio belongs to **Pratham Jain**, a Full Stack Web Developer based in Bhopal, India.

---

## 📦 Tech Stack (Already Installed)

```json
{
  "gsap": "^3.14.2",
  "motion": "^12.35.0",
  "lenis": "^1.3.18-dev.1",
  "tailwindcss": "^4.2.1",
  "react": "^19.2.0"
}
```

> **DO NOT install new packages.** Everything needed is already available.  
> Use **GSAP** for timeline-based animations and **motion** (`framer-motion` v12) for React-based declarative animations.

---

## 🎨 Design Tokens — DO NOT CHANGE THESE

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Accent color | `#BAFE03` (lime-green) |
| Text color | `white` |
| Secondary text | `text-gray-400`, `text-gray-300` |
| Emerald elements | `bg-emerald-500`, `text-emerald-50` |
| Font — PRATHAM | `TouraynDemo` (local OTF at `src/fonts/TouraynDemo-Regular-BF69a5a801b0086.otf`) |
| Font — Jain | `Javacom` (local OTF at `src/fonts/Javacom.otf`) |
| Font — UI text | `font-mono` (Tailwind) |
| WebkitTextStroke on PRATHAM | `3px #1E1E1E` |
| WebkitTextStroke on Jain | `2px white`, `color: transparent` |
| Grid opacity | `opacity-[0.09]` |
| Border accent | `border-white/10`, `border-white/20` |

---

## 📄 Current `src/components/Hero.jsx` (Full Source)

```jsx
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero({ visible }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [visible]);

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
        duration: 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLoaded]);

  return (
    <div id="home" className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col items-center justify-center [perspective:1000px]">

      {/* Cyber Accents */}
      <div className={`absolute top-8 left-8 w-12 h-12 border-t border-l border-white/20 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100" : "opacity-0 -translate-x-4 -translate-y-4"}`}></div>
      <div className={`absolute top-8 right-8 w-12 h-12 border-t border-r border-white/20 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100" : "opacity-0 translate-x-4 -translate-y-4"}`}></div>
      <div className={`absolute bottom-8 left-8 w-12 h-12 border-b border-l border-white/20 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100" : "opacity-0 -translate-x-4 translate-y-4"}`}></div>
      <div className={`absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100" : "opacity-0 translate-x-4 translate-y-4"}`}></div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.09]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full mt-4">

        {/* Location Badge */}
        <div
          className={`mb-8 px-5 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-xs md:text-sm font-mono text-gray-300 tracking-widest flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            BASED IN BHOPAL, INDIA
          </p>
        </div>

        {/* ANIMATED TEXT WRAPPER */}
        <div ref={textRef} className="relative transform-style-3d cursor-default flex justify-center items-center mt-12 md:mt-16 w-full">

          {/* Foreground Text Container */}
          <div className="relative flex justify-center items-center">
            {/* PRATHAM */}
            <h1
              className={`relative text-[clamp(4rem,14vw,14rem)] md:text-[270px] font-normal tracking-wide leading-none flex justify-center z-10 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
              style={{ fontFamily: '"TouraynDemo", sans-serif', color: '#BAFE03', WebkitTextStroke: '3px #1E1E1E' }}
            >
              PRATHAM
            </h1>

            {/* Jain */}
            <h2
              className={`absolute top-[45%] md:top-[60%] text-[clamp(4.5rem,12vw,12rem)] md:text-[150px] font-normal tracking-normal leading-none z-20 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                fontFamily: '"Javacom", cursive',
                WebkitTextStroke: '2px white',
                color: 'transparent'
              }}
            >
              Jain
            </h2>
          </div>
        </div>

        {/* Subtitles & Tagline */}
        <div
          className={`mt-30 flex flex-col items-center gap-4 transition-all duration-1000 delay-[800ms] ease-out text-center ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-12 h-[1px] bg-emerald-500/50"></div>
            <p className="text-lg md:text-2xl font-mono text-emerald-50 tracking-[0.4em] uppercase font-light">
              Full Stack Web Developer
            </p>
            <div className="hidden md:block w-12 h-[1px] bg-emerald-500/50"></div>
          </div>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl mt-2 font-mono leading-relaxed border border-white/5 bg-white/5 p-4 rounded-xl backdrop-blur-sm">
            Developer • Designer • Creative problem solver <br />turning ideas into real digital products.
          </p>
        </div>

      </div>

      {/* Futuristic Scroll Indicator */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center transition-all duration-1000 delay-[1200ms] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <span className="text-[10px] font-mono text-gray-500 tracking-[0.4em] uppercase mb-4">Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[30%] bg-emerald-400 animate-[bounce_2s_infinite]"></div>
        </div>
      </div>

    </div>
  );
}
```

---

## 🚀 Animations to Apply — Detailed Instructions

Apply ALL of the following animations. Each one is described independently so you can implement them one by one.

---

### ✅ 1. Replace CSS Transition Enters with GSAP Timeline

**Goal:** Replace all the `transition-all duration-1000` CSS class-based entrance animations with a proper GSAP `tl` (timeline) that plays once when `visible` becomes `true`.

**How:**
- Create refs for: location badge, `h1` (PRATHAM), `h2` (Jain), subtitle section, scroll indicator, and the 4 corner accents.
- In a `useEffect` triggered by `visible`, build a GSAP timeline:

```js
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

// Corner accents
tl.fromTo(cornerRefs, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 })
// Badge
  .fromTo(badgeRef.current, { opacity: 0, y: 30, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=0.3")
// PRATHAM — letter-by-letter split
  .fromTo(prathamLetters, { opacity: 0, y: 60, rotateX: -90 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.05 }, "-=0.4")
// Jain
  .fromTo(jainRef.current, { opacity: 0, x: -40, skewX: -10 }, { opacity: 1, x: 0, skewX: 0, duration: 0.9 }, "-=0.5")
// Subtitle
  .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
// Scroll indicator
  .fromTo(scrollRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
```

**Important:** Remove the `transition-all duration-1000` Tailwind classes from the corresponding elements after you implement the GSAP timeline — the two systems will conflict otherwise. Set their initial state manually using `gsap.set()` before the timeline plays.

---

### ✅ 2. Text Scramble Effect on PRATHAM on Hover

**Goal:** When the user hovers over the `h1` "PRATHAM" text, each letter rapidly scrambles through random characters before settling back to the original letter — like a hacker-style decode effect.

**Characters to use:** `"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>{}[]/"`

**How:**
- Wrap each letter of "PRATHAM" in its own `<span>` element with a ref or a data attribute.
- On `mouseenter` of the `h1`, iterate over each letter span with a staggered `setInterval` or GSAP `stagger` approach:

```js
const scramble = (targetChar, spanEl) => {
  let count = 0;
  const interval = setInterval(() => {
    spanEl.innerText = chars[Math.floor(Math.random() * chars.length)];
    count++;
    if (count >= 8) {
      spanEl.innerText = targetChar;
      clearInterval(interval);
    }
  }, 40);
};
```

- Trigger with a stagger delay per letter index: `delay = index * 60ms`
- Keep the `color: '#BAFE03'` and `WebkitTextStroke: '3px #1E1E1E'` on every letter span.

---

### ✅ 3. Magnetic Hover Effect on the Location Badge

**Goal:** The location badge pill floats slightly toward the cursor when hovering, like a magnetic element, then snaps back smoothly when the cursor leaves.

**How:**
- Add `onMouseMove` and `onMouseLeave` event handlers to the badge `div`.
- On mouse move:

```js
const rect = badgeEl.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;
const deltaX = (e.clientX - centerX) * 0.35;
const deltaY = (e.clientY - centerY) * 0.35;

gsap.to(badgeEl, { x: deltaX, y: deltaY, duration: 0.4, ease: "power2.out" });
```

- On mouse leave:

```js
gsap.to(badgeEl, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
```

---

### ✅ 4. Glitch Flicker Effect on "Jain"

**Goal:** Every 4–8 seconds (random interval), the `h2` "Jain" text briefly glitches — it rapidly shifts in x position 2-3 times and returns, simulating a CRT/glitch artifact. Keep the outline style (`WebkitTextStroke: '2px white', color: 'transparent'`).

**How:**
- Use a `setInterval` with a random delay after mount:

```js
const triggerGlitch = () => {
  const tl = gsap.timeline();
  tl.to(jainRef.current, { x: -6, skewX: 5, duration: 0.06 })
    .to(jainRef.current, { x: 8, skewX: -4, duration: 0.06 })
    .to(jainRef.current, { x: -4, skewX: 2, duration: 0.05 })
    .to(jainRef.current, { x: 0, skewX: 0, duration: 0.08, ease: "power2.out" });
};

const scheduleGlitch = () => {
  const delay = 4000 + Math.random() * 4000;
  setTimeout(() => {
    triggerGlitch();
    scheduleGlitch(); // reschedule
  }, delay);
};

scheduleGlitch();
```

- Only trigger after the component is fully loaded (`isLoaded === true`).
- Clean up the timeout in the `useEffect` return.

---

### ✅ 5. Animated Gradient Glow Behind "PRATHAM"

**Goal:** Add a radial glow element behind the big `h1` "PRATHAM" text that slowly pulses and shifts color between `#BAFE03` (lime) and `rgba(186, 254, 3, 0.0)` — giving a breathing ambient light effect.

**How:**
- Add a `div` as an absolute sibling behind the `h1`, inside the same relative container:

```jsx
<div
  ref={glowRef}
  className="absolute inset-0 pointer-events-none"
  style={{
    background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(186,254,3,0.12) 0%, transparent 70%)',
    filter: 'blur(40px)',
    zIndex: 0
  }}
/>
```

- Animate with GSAP infinite yoyo loop:

```js
gsap.to(glowRef.current, {
  opacity: 0.4,
  scale: 1.15,
  duration: 3,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});
```

---

### ✅ 6. Typewriter Effect for Subtitle Text

**Goal:** The subtitle line `"Developer • Designer • Creative problem solver"` appears character by character (typewriter style) after the hero entrance animation completes.

**How:**
- Split the subtitle text into characters, render each in a `<span>`.
- Use GSAP stagger animation triggered after the main timeline completes (add to the timeline as the last step):

```js
tl.fromTo(charSpans, 
  { opacity: 0 }, 
  { opacity: 1, duration: 0.03, stagger: 0.03, ease: "none" },
  "-=0.2" // slight overlap with subtitle div appearing
);
```

- Do NOT change the font, color (`text-gray-400`), or container styles.
- The `<br />` between the two lines should be preserved — split only each line separately.

---

### ✅ 7. Floating Parallax Particles (Subtle)

**Goal:** Add 6–8 very subtle floating dot particles in the hero background — small white dots at ~5–10% opacity that drift upward slowly at different speeds, creating a sense of depth. They should NOT distract from the main content.

**How:**
- Generate particles with random positions using `useMemo`:

```js
const particles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 100, // vw %
  size: Math.random() * 3 + 1, // px
  duration: 8 + Math.random() * 6,
  delay: Math.random() * 4,
  opacity: 0.04 + Math.random() * 0.06
})), []);
```

- Render them as `<div>` elements with `position: absolute`, `borderRadius: '50%'`, `backgroundColor: 'white'`:

```jsx
{particles.map(p => (
  <div
    key={p.id}
    className="absolute rounded-full bg-white pointer-events-none"
    style={{
      left: `${p.x}%`,
      bottom: '-10px',
      width: p.size,
      height: p.size,
      opacity: p.opacity
    }}
    ref={el => { if (el) {
      gsap.to(el, {
        y: '-110vh',
        duration: p.duration,
        delay: p.delay,
        repeat: -1,
        ease: 'none'
      });
    }}
  />
))}
```

- Place the particle container `div` at the same level as the grid overlay, with `z-index: 1`.

---

### ✅ 8. Scroll Indicator Upgrade

**Goal:** Replace the current simple scroll indicator with an animated version:
- The `"Discover"` text fades in and out in a loop (breathing).
- The vertical line has a traveling light particle (already exists — just improve it):
  - Use GSAP instead of `animate-[bounce_2s_infinite]`.
  - The particle travels from top to bottom of the line smoothly and resets.

**How:**
```js
// Breathing text
gsap.to(discoverTextRef.current, {
  opacity: 0.2,
  duration: 1.4,
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut'
});

// Traveling particle
gsap.fromTo(scrollParticleRef.current,
  { top: '0%', opacity: 0 },
  { top: '100%', opacity: 1, duration: 1.5, repeat: -1, ease: 'power1.in', 
    onRepeat: () => gsap.set(scrollParticleRef.current, { top: 0, opacity: 0 })
  }
);
```

- Remove the `animate-[bounce_2s_infinite]` Tailwind class from the particle div.

---

## ⚙️ Implementation Rules — MUST FOLLOW

1. **Preserve ALL existing styles exactly** — colors, fonts, layout, spacing, border classes, Tailwind classes (except `transition-all duration-XXX` on elements that get GSAP enter animations).
2. **The `visible` prop** is passed from `App.jsx` and becomes `true` when the loader finishes. All entrance animations must wait for this.
3. **Cleanup all GSAP instances and intervals** in `useEffect` return functions to prevent memory leaks.
4. **Do NOT add any new npm packages** — only use what's already in `package.json`.
5. **Import from `gsap`** directly. The GSAP ScrollTrigger plugin is NOT needed here since all animations are in-view entrance animations.
6. **Keep the mouse parallax** already implemented (the `handleMouseMove` on `textRef`) — just extend or keep it alongside other effects.
7. Keep `id="home"` on the root `div` — the navbar likely uses this for scroll-to-section.
8. **Test the component** after writing by running `npm run dev` in the project root.

---

## 📁 File to Modify

**Only modify this one file:**
```
src/components/Hero.jsx
```

**Do NOT touch:**
- `src/App.jsx`
- `src/index.css`
- `src/components/Loader.jsx`
- `src/components/Navbar.jsx`
- Any other component

---

## 🧪 Verification Checklist

After implementing all 8 animations, verify:

- [ ] On page load (after loader finishes), entrance animations play smoothly in sequence
- [ ] "PRATHAM" scrambles on hover
- [ ] Badge has magnetic hover behavior
- [ ] "Jain" occasionally glitches every few seconds
- [ ] Lime glow behind "PRATHAM" slowly pulses
- [ ] Subtitle text appears with typewriter effect
- [ ] Floating particles drift upward slowly in the background
- [ ] Scroll indicator has smooth traveling particle and breathing "Discover" text
- [ ] No console errors
- [ ] Original design (colors, fonts, layout) is visually identical to before except for the new motion
