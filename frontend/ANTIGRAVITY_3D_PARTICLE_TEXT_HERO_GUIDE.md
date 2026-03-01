# Antigravity Step-by-Step Guide: Cinematic 3D Particle Text Hero

This guide is tailored so **Antigravity** can understand and generate the exact hero section you want.

Goal:
- Build a full-screen hero with particle text:
  - `ANSHRAJ`
  - `FULL STACK`
  - `DEVELOPER`
- Text is rendered via **GPU particles**.
- Interactions:
  - Hover → 3D explosion
  - Mouse move → magnetic distortion
  - Scroll → smooth noise dissolve
- Background: dark + subtle starfield
- Stack: React + R3F + Drei + GSAP + custom GLSL + postprocessing bloom

---

## 1) Give Antigravity this exact implementation brief

Copy-paste this prompt:

```text
Implement a cinematic full-screen 3D hero section in a React + Vite app using:
- React
- @react-three/fiber
- @react-three/drei
- three
- gsap + gsap/ScrollTrigger
- postprocessing (bloom)
- custom GLSL shaders

Hero text (multi-line):
ANSHRAJ
FULL STACK
DEVELOPER

Requirements:
1) Render text entirely as GPU particles (THREE.Points + BufferGeometry + ShaderMaterial). Do not use regular DOM text for the final visual.
2) On hover: particles explode outward in 3D using randomized direction attributes and a uHover uniform.
3) On mouse move: apply localized magnetic distortion around cursor position with smooth falloff.
4) On scroll: dissolve text smoothly using noise-based displacement and threshold controlled by a uScroll uniform, animated with GSAP ScrollTrigger scrub.
5) Scene style: dark background with subtle starfield and cinematic bloom.
6) Performance: keep one particle draw call, avoid React state updates per frame, update shader uniforms in useFrame/requestAnimationFrame.
7) Add mobile-safe fallback (reduced particle count + reduced effects).
8) Respect prefers-reduced-motion.

Deliverables:
- Component files
- GLSL shader files (vertex + fragment)
- utility to convert multiline text to sampled particle points
- integration in App.jsx
- brief tuning section (particle count, explosion strength, dissolve speed, bloom intensity)
```

---

## 2) Ask Antigravity to produce this file structure

```text
src/
  components/
    HeroCanvas.jsx
    ParticleText.jsx
    Starfield.jsx
  shaders/
    particle.vert.glsl
    particle.frag.glsl
  utils/
    textToPoints.js
  App.jsx
```

If Antigravity outputs different names, that is fine, but ensure responsibilities stay the same.

---

## 3) Non-negotiable architecture (tell Antigravity to follow)

1. **Single particle system for text**
   - Use one `THREE.BufferGeometry` + `THREE.Points`.

2. **GPU-driven movement in vertex shader**
   - Keep base positions in attributes.
   - Combine explosion + magnetic + dissolve forces in shader.

3. **Uniform-driven animation**
   - `uTime`, `uHover`, `uScroll`, `uMouse`, `uPixelRatio`.

4. **GSAP integration**
   - `uHover` tween on pointer enter/leave.
   - `uScroll` scrub with `ScrollTrigger`.

5. **Postprocessing**
   - Bloom should be subtle; avoid washing out readability.

---

## 4) Shader behavior specification (important)

### Vertex shader must include

- Base position attribute (`aBase`)
- Random direction attribute (`aRandom`)
- Per-particle size (`aSize`) and seed (`aSeed`)

Displacement logic:
- Explosion: `pos += aRandom * uHover * explosionStrength`
- Magnetic: radial falloff around `uMouse`
- Dissolve: simplex/perlin noise threshold with `uScroll`

Point sizing:
- Perspective-correct `gl_PointSize`
- clamp min/max size if needed

### Fragment shader must include

- Soft circular sprite using `gl_PointCoord`
- Smooth alpha falloff
- Slight glow-friendly particle color
- `transparent: true`, `depthWrite: false`, optional additive blending

---

## 5) Text-to-particles utility requirements

In `textToPoints.js`:

1. Create offscreen canvas.
2. Draw multiline text centered.
3. Sample alpha pixels with configurable stride.
4. Convert sampled pixels to centered world coordinates.
5. Return typed arrays for:
   - positions/base positions
   - random vectors
   - size variation
   - seed values

Add option presets:
- desktop: denser points
- mobile: lower density for performance

---

## 6) Scroll + interaction behavior checklist

Ask Antigravity to verify these behaviors:

- Hovering hero increases `uHover` smoothly (ease out)
- Leaving hero restores shape smoothly
- Cursor causes local distortion only near pointer
- Scroll gradually dissolves text (not sudden fade)
- Starfield remains subtle (not distracting)
- Animation remains smooth on normal laptops

---

## 7) Performance constraints you should explicitly include

Use this follow-up if output is laggy:

```text
Optimize the particle hero for GPU performance:
- Keep one Points draw call for text.
- Precompute geometry attributes once with typed arrays.
- Avoid per-frame React setState.
- Update uniforms in useFrame.
- Clamp DPR to <= 2.
- Reduce particle density on mobile.
- Keep bloom intensity moderate.
```

---

## 8) Quick QA acceptance criteria

Mark complete only if all are true:

- [ ] Text is fully particle-rendered (no visible DOM fallback text)
- [ ] Hover explosion is obvious and smooth
- [ ] Mouse magnetic distortion feels local and responsive
- [ ] Scroll dissolve is noise-like and cinematic
- [ ] Dark background + subtle stars + bloom look polished
- [ ] 60fps-ish on desktop with no major stutter

---

## 9) Retry prompt for Antigravity (if first result is weak)

```text
Keep current structure but improve visual quality:
- stronger yet smooth hover explosion,
- tighter magnetic falloff around cursor,
- more organic noise dissolve on scroll,
- slightly brighter particle core with soft bloom,
- reduce clutter by lowering starfield brightness,
while preserving performance and one text particle draw call.
```
