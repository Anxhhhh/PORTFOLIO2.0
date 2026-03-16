# Antigravity Guide: Scroll-Takeover Skills Section (Landing hides behind)

Yeh guide aapke exact requirement ke liye hai:

- Normal page scroll ke time ek **scroll-takeover** feel aaye.
- Jaise hi user scroll kare, **Skills section active ho**.
- **Landing/Hero section piche chhup jaye** (behind effect / pinned transition).
- Mouse wheel ya trackpad scroll par premium transition lage.

---

## 1) Requirement Antigravity ko clear do

Antigravity ko yeh intent ekdum clear dena zaroori hai:

1. Hero section initial load par normal dikhe.
2. Scroll start hote hi Hero sticky/pinned feel de aur gradually piche move/fade ho.
3. Skills section foreground mein rise kare.
4. User ko normal jumpy scroll nahi, controlled transition mile.
5. Effect mobile par lightweight fallback ke saath ho.

---

## 2) Copy-paste master prompt for Antigravity

```text
Implement a scroll-takeover transition between Landing (Hero) and Skills in my React + Vite + Tailwind + Framer Motion portfolio.

Goal:
When the user scrolls down, instead of a plain normal scroll feeling, the Hero should feel pinned and move behind, while the Skills section comes to front with a premium anti-gravity transition.

Technical requirements:
1) Keep current design and content intact; only add transition behavior.
2) Add a dedicated wrapper around Hero + Skills to control scroll progress.
3) Use Framer Motion hooks (useScroll, useTransform, useSpring) for smooth progress-based animation.
4) Hero behavior while scrolling through transition zone:
   - slight scale down (e.g. 1 -> 0.92)
   - move up (negative y)
   - fade (opacity reduces)
   - optional blur increase
   - lower z-index so it visually goes behind Skills
5) Skills behavior:
   - start slightly below (positive y)
   - move to natural position (y -> 0)
   - opacity 0 -> 1
   - optional subtle scale 0.98 -> 1
   - higher z-index so it appears in front
6) Create a scroll range (e.g. 120vh-180vh container) to give enough distance for takeover effect.
7) Keep animation smooth using spring smoothing; avoid choppy direct mapping.
8) Preserve accessibility and reduced-motion support:
   - if prefers-reduced-motion, disable complex transforms and keep simple fade.
9) Mobile fallback:
   - reduce transform intensity
   - avoid heavy blur
10) Do not introduce new heavy dependencies unless absolutely necessary.

Expected output:
- Unified diff patch.
- Mention exactly which component/file was changed.
- Include tunable constants section for: takeover distance, hero fade strength, skills rise amount.
```

---

## 3) Optional stronger cinematic prompt (second pass)

Agar first output subtle ho aur aapko zyada “wow” chahiye, yeh follow-up do:

```text
Refine only the Hero->Skills scroll-takeover:
- Increase depth illusion with better z-layering.
- Hero should feel like it slides under a glass sheet and recedes.
- Skills should feel magnetically pulled upward into focus.
- Keep it smooth and premium, not flashy.
- Do not change typography, color palette, or unrelated sections.
```

---

## 4) Suggested tuning values

Start yahan se:

- Takeover scroll zone: `140vh`
- Hero translateY: `0 -> -180px`
- Hero scale: `1 -> 0.93`
- Hero opacity: `1 -> 0.15`
- Skills translateY: `80px -> 0`
- Skills opacity: `0 -> 1`
- Spring: `stiffness 90`, `damping 22`, `mass 0.35`

Agar transition hard lag raha hai:
- damping badhao
- blur kam karo
- movement ranges 20-30% reduce karo

---

## 5) Implementation checklist

- [ ] Hero and Skills ko same controlled scroll container mein wrap kiya gaya.
- [ ] Hero piche jata dikhta hai (z-index + fade + scale + y).
- [ ] Skills front pe aata hai (y + opacity + optional scale).
- [ ] Reduced motion preference handled.
- [ ] Mobile performance smooth.
- [ ] No console warnings, no layout breaks.

---

## 6) One-line fallback prompt

```text
Create a clean scroll takeover between Hero and Skills: Hero recedes behind on scroll, Skills rises to foreground, with smooth Framer Motion progress mapping and mobile-safe reduced-intensity behavior.
```
