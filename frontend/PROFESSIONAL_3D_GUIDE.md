# Professional 3D Portfolio Upgrade Guide (React + R3F + Drei + GSAP)

This guide is written for your current repo (`frontend` Vite React app) and focuses on **professional-level 3D sections**:

1. Hero: dark theme + 3D glass sphere + mouse parallax + floating motion  
2. Skills: 3D rotating cube (each face = skill category)  
3. Projects: 3D card flip interaction

---

## 0) Prerequisites

- Node.js 18+ installed
- Your existing project already runs via Vite

From repo root:

```bash
cd frontend
npm install
npm run dev
```

---

## 1) Install the 3D + animation stack

Inside `frontend`:

```bash
npm i three @react-three/fiber @react-three/drei gsap
```

What each package does:
- `three`: core WebGL engine
- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: useful helpers/components (lights, environment, controls)
- `gsap`: premium animation control for timeline-based motion

---

## 2) Create a clean 3D folder structure

Inside `frontend/src`, create:

```text
src/
  components/
    sections/
      Hero3DSection.jsx
      Skills3DSection.jsx
      Projects3DSection.jsx
    three/
      HeroScene.jsx
      GlassSphere.jsx
      SkillsCube.jsx
      ProjectFlipCard3D.jsx
  hooks/
    useMouseParallax.js
  constants/
    portfolioData.js
```

Why this matters:
- `sections/*` = page-level layout and text
- `three/*` = pure 3D objects/scenes
- `hooks/*` = reusable input behavior (mouse)
- `constants/*` = centralized skill/project data

---

## 3) Add reusable data first (`constants/portfolioData.js`)

Create `src/constants/portfolioData.js`:

```js
export const SKILL_FACES = [
  { title: "Frontend", items: ["React", "Tailwind", "Framer Motion"] },
  { title: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  { title: "Database", items: ["MongoDB", "PostgreSQL", "Redis"] },
  { title: "AI/ML", items: ["Python", "TensorFlow", "LLM APIs"] },
  { title: "DevOps", items: ["Docker", "CI/CD", "Vercel"] },
  { title: "Core CS", items: ["DSA", "OOP", "System Design"] },
];

export const PROJECTS = [
  {
    title: "AI Resume Analyzer",
    front: "React + Node + NLP",
    back: "Built parser + scoring engine with feedback insights.",
  },
  {
    title: "Full Stack SaaS Dashboard",
    front: "React + Charts + Auth",
    back: "Role-based dashboard with analytics and exports.",
  },
  {
    title: "3D Portfolio",
    front: "R3F + Drei + GSAP",
    back: "Interactive hero + cube + card flips with smooth UX.",
  },
];
```

Keep all section content here so UI stays clean.

---

## 4) Build mouse parallax hook (`hooks/useMouseParallax.js`)

Create:

```js
import { useEffect, useState } from "react";

export default function useMouseParallax(strength = 0.2) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setOffset({ x: x * strength, y: -y * strength });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength]);

  return offset;
}
```

Use this offset to subtly move 3D groups/camera.

---

## 5) Hero 3D glass sphere (professional setup)

### 5.1 Create glass sphere mesh (`three/GlassSphere.jsx`)

```jsx
import { MeshTransmissionMaterial, Float } from "@react-three/drei";

export default function GlassSphere() {
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh>
        <sphereGeometry args={[1.15, 128, 128]} />
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.08}
          thickness={0.9}
          ior={1.15}
          chromaticAberration={0.02}
          anisotropy={0.12}
          distortion={0.08}
          distortionScale={0.25}
          temporalDistortion={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.1}
          resolution={1024}
        />
      </mesh>
    </Float>
  );
}
```

### 5.2 Hero scene wrapper (`three/HeroScene.jsx`)

```jsx
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import GlassSphere from "./GlassSphere";

export default function HeroScene({ parallax }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 4]} intensity={1.2} />
      <Environment preset="city" />

      <group position={[parallax.x, parallax.y, 0]}>
        <GlassSphere />
      </group>
    </Canvas>
  );
}
```

### 5.3 Section-level component (`sections/Hero3DSection.jsx`)

```jsx
import useMouseParallax from "../../hooks/useMouseParallax";
import HeroScene from "../three/HeroScene";

export default function Hero3DSection() {
  const parallax = useMouseParallax(0.28);

  return (
    <section className="relative min-h-screen bg-[#0c0c0c] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <HeroScene parallax={parallax} />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center text-center px-6">
        <h1 className="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.9]">
          ANSHRAJ
          <br />
          FULL-STACK
          <br />
          DEVELOPER
        </h1>
      </div>
    </section>
  );
}
```

---

## 6) Skills section with 3D rotating cube

### 6.1 Create cube (`three/SkillsCube.jsx`)

```jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const faces = [
  { pos: [0, 0, 1.01], rot: [0, 0, 0] },
  { pos: [0, 0, -1.01], rot: [0, Math.PI, 0] },
  { pos: [1.01, 0, 0], rot: [0, Math.PI / 2, 0] },
  { pos: [-1.01, 0, 0], rot: [0, -Math.PI / 2, 0] },
  { pos: [0, 1.01, 0], rot: [-Math.PI / 2, 0, 0] },
  { pos: [0, -1.01, 0], rot: [Math.PI / 2, 0, 0] },
];

export default function SkillsCube({ labels }) {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.35;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.25} />
      </mesh>

      {faces.map((f, i) => (
        <group key={i} position={f.pos} rotation={f.rot}>
          <Text
            color="white"
            fontSize={0.18}
            maxWidth={1.5}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            {labels[i]?.title ?? "Skill"}
          </Text>
        </group>
      ))}
    </group>
  );
}
```

### 6.2 Section file (`sections/Skills3DSection.jsx`)

Use a `<Canvas>` and render `SkillsCube` with your `SKILL_FACES` titles.

Professional tip: Keep the cube visual and show detailed bullet lists outside canvas (HTML), so it remains readable on mobile.

---

## 7) Projects section with 3D card flip effect

For each project card:

- Use CSS perspective container (`perspective: 1200px`)
- Inner element rotates `rotateY(180deg)` on hover/focus
- Front shows tech stack
- Back shows impact/result

Example minimal structure:

```jsx
<div className="group [perspective:1200px]">
  <div className="relative h-64 w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    <div className="absolute inset-0 rounded-2xl bg-zinc-900 p-6 [backface-visibility:hidden]">
      Front Content
    </div>
    <div className="absolute inset-0 rounded-2xl bg-zinc-800 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
      Back Content
    </div>
  </div>
</div>
```

If you want pure 3D card meshes (inside Canvas), do that later after this stable CSS+3D hybrid version is complete.

---

## 8) Add GSAP for premium motion timing

Install already done in step 1. Use GSAP for:
- Hero heading reveal
- Section fade/slide on scroll
- Subtle stagger for cards

Example in a component:

```jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HeadingIntro() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <div className="hero-line">ANSHRAJ</div>
      <div className="hero-line">FULL STACK</div>
    </div>
  );
}
```

---

## 9) Replace your current page flow incrementally

In `src/App.jsx` do this in small merges:

1. Keep your existing preloader exactly as-is  
2. Replace current hero component with `Hero3DSection`  
3. Replace skills with `Skills3DSection`  
4. Replace projects with `Projects3DSection`

Do not switch all at once. Migrate one section, test, then continue.

---

## 10) Performance checklist (important for professional feel)

- Use only 1 heavy glass object in hero
- Keep sphere segments realistic (start 64, scale to 128 only if needed)
- Set `<Canvas dpr={[1, 2]}>` (avoid fixed high dpr)
- Avoid too many realtime shadows initially
- Pause animations when section is off-screen (optional advanced improvement)
- Test on mobile and lower-end laptop before final deployment

---

## 11) Accessibility and fallback

- Add `aria-label` to major sections/buttons
- Ensure project cards are keyboard-focusable (`tabIndex={0}`)
- Respect reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .reduce-motion,
  .reduce-motion * {
    animation: none !important;
    transition: none !important;
  }
}
```

- Add graceful fallback if WebGL is unavailable:
  - show static gradient + plain hero text

---

## 12) Deployment and QA workflow

Before deploy:

```bash
npm run lint
npm run build
npm run preview
```

Check manually:
- Hero stays smooth at ~60fps on your machine
- Text remains readable over sphere
- Cube labels are readable and not too fast
- Card flip works on hover and keyboard focus
- Mobile layout remains clean

---

## 13) Suggested 2-day execution plan

### Day 1
- Setup dependencies and folder structure
- Implement Hero 3D sphere + parallax + GSAP heading reveal
- Tune lighting/material until premium look

### Day 2
- Build Skills cube and integrate section text
- Build Projects flip cards
- Run lint/build, polish spacing, deploy

---

## 14) Final quality bar (professional)

If these 5 are true, your portfolio will look genuinely professional:

1. Motion is subtle, not noisy  
2. 3D supports content (not overpowering text)  
3. Frame rate is stable  
4. Sections are consistent in spacing/typography  
5. Mobile experience remains fast and readable

---

If you want, next step is to implement this directly in your repo with production-ready components and exact styling that matches your current visual identity.
