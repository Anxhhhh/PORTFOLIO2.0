# Antigravity Step-by-Step Guide: 3D Glass Layer (Background unchanged)

This guide is written in a practical Hinglish style for your requirement:

- **Background same rahe** (no redesign)
- Upar ek **glass layer** add ho
- Cursor move hone par glass area **press / dent** ho jaye
- Overall look should feel premium and aesthetic

---

## 1) Clear requirement define karo (before prompting Antigravity)

Use this exact spec:

1. Keep existing background untouched.
2. Add a full-screen transparent glass overlay.
3. Overlay should use blur + subtle highlights + border.
4. Mouse position ke around circular “pressed dent” effect visible ho.
5. Effect smooth ho: lag na lage.
6. Respect performance and reduced-motion preference.

---

## 2) Antigravity ko precise prompt do

Copy-paste prompt:

```text
Implement a full-viewport 3D glass overlay in my React + Vite app without changing the existing background.

Requirements:
- Keep current background exactly as-is.
- Add a top glass layer with translucent look (backdrop blur, subtle border, soft highlight, low opacity gradients).
- Add a mouse-follow interaction where the glass appears pressed inward at cursor position (a dynamic dent effect).
- Use CSS variables updated via pointermove for --mx and --my.
- Build dent using radial gradients + optional mask/composite tricks, not by replacing the background.
- Add slight tilt/parallax to the glass layer based on cursor position for 3D feel.
- Smooth animation using requestAnimationFrame; avoid heavy re-renders.
- On mobile/touch: center-based gentle animation fallback.
- Respect prefers-reduced-motion.
- Provide:
  1) component file
  2) CSS file
  3) integration snippet in App.jsx
  4) short tuning guide (intensity, blur, radius).
```

Tip: “Do not replace existing background” line must be explicit, warna tool layout alter kar sakta hai.

---

## 3) Expected file structure (Antigravity output)

```text
src/
  components/
    GlassOverlay.jsx
  styles/
    glass-overlay.css
```

Then integrate in `App.jsx`:
- Background layer stays where it is.
- `GlassOverlay` should sit above content as an overlay.

---

## 4) Implementation logic (what Antigravity should generate)

### A. Glass base layer

Glass layer should include:
- `position: fixed; inset: 0; pointer-events: none;`
- `backdrop-filter: blur(...) saturate(...)`
- soft border + inner highlight
- subtle top-left to bottom-right gradient

### B. Cursor dent effect

Use CSS variables from JS:
- `--mx` = mouse X in px
- `--my` = mouse Y in px

Dent can be simulated with 2 radial gradients:
1. darker inner shadow at cursor → pressed illusion
2. outer highlight ring → glass thickness illusion

### C. 3D feel

Map cursor to normalized range `[-1, 1]`:
- `rotateX` based on y
- `rotateY` based on x
- very small angles (2deg to 6deg)

### D. Performance

- pointer event stores target coordinates
- visual update happens in `requestAnimationFrame`
- update CSS variables directly on element style
- avoid React state updates on every mousemove

---

## 5) Quick acceptance checklist

After Antigravity code generation, verify:

- [ ] Background pixels unchanged behind overlay
- [ ] Glass visible but not too opaque
- [ ] Cursor ke niche dent clearly visible
- [ ] No jitter at 60fps on desktop
- [ ] Touch devices pe fallback smooth hai
- [ ] `prefers-reduced-motion` enabled users ke liye mild/static mode

---

## 6) Tuning values (aesthetic presets)

Start with these values:

- Blur: `backdrop-filter: blur(12px) saturate(135%)`
- Glass opacity: `0.10` to `0.18`
- Dent radius: `140px` to `220px`
- Dent darkness: `rgba(0,0,0,0.18)`
- Highlight ring: `rgba(255,255,255,0.30)`
- Tilt max: `4deg`
- Interaction easing: `0.08` to `0.14`

If effect zyada strong lag raha ho:
- Dent alpha reduce karo
- Tilt angle kam karo
- Blur thoda reduce karo (10–12px)

---

## 7) Common mistakes to avoid

1. **Background replace kar dena** instead of overlay layering.
2. Mousemove pe React `setState` spam (jank).
3. High blur + multiple huge gradients (GPU heavy).
4. Pointer events enabled on overlay (click blocks).
5. No reduced-motion handling.

---

## 8) One-line instruction for Antigravity retries

Agar first result perfect na ho, this follow-up prompt use karo:

```text
Keep my background untouched and improve only the glass overlay interaction: stronger local dent under cursor, softer global blur, lower opacity, and smoother inertial follow using requestAnimationFrame with CSS variables.
```

