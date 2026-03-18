# Antigravity Guide: Infinite Tech Stack Marquee Between Skills Content

Yeh guide aapke exact requirement ke liye hai:

- Skills section ke beech ek **horizontal text scroll / infinite marquee effect** add karna hai.
- Marquee mein aapka tech stack continuously move kare.
- Effect premium, smooth, modern aur portfolio ke dark aesthetic ke saath match kare.
- Existing layout break nahi hona chahiye.

Tech stack items jo marquee mein hone chahiye:

- HTML
- CSS
- REACT
- N8N
- FIGMA
- BLENDER
- TYPESCRIPT
- JAVASCRIPT
- FRONTEND
- BACKEND
- DATABASE
- POSTMAN
- APIs

---

## 1) Requirement Antigravity ko clear do

Antigravity ko yeh intent clearly do:

1. Skills section ke andar ya skill cards ke beech ek full-width marquee strip add ho.
2. Marquee continuously infinite loop mein chale.
3. Text readable ho, overcrowded na ho, aur spacing premium lage.
4. Motion smooth ho, laggy ya cheap ticker jaisa na lage.
5. Hover par optional pause ho sakta hai, lekin mobile par auto-run maintain rahe.
6. Reduced motion users ke liye safe fallback ho.
7. Existing hero, skills cards aur page structure intact rahe.

---

## 2) Copy-paste master prompt for Antigravity

```text
Add a premium infinite horizontal marquee text effect inside the Skills section of my React + Vite + Tailwind + Framer Motion portfolio.

Goal:
Create a full-width scrolling marquee band between the Skills section content blocks that continuously loops my tech stack items in a smooth, modern, anti-gravity style.

Tech stack items to display:
HTML, CSS, REACT, N8N, FIGMA, BLENDER, TYPESCRIPT, JAVASCRIPT, FRONTEND, BACKEND, DATABASE, POSTMAN, APIs

Technical requirements:
1) Keep the current design language intact: dark, minimal, premium, cinematic.
2) Place the marquee visually between the Skills heading/content areas or between skill card rows so it feels integrated into the section, not like a random banner.
3) Use a duplicated content track so the marquee loops seamlessly with no visible jump.
4) Prefer CSS keyframes or a lightweight Framer Motion implementation; do not add heavy dependencies.
5) The marquee should scroll horizontally forever at a readable speed.
6) Each item should have generous spacing and optionally a subtle separator such as a dot, slash, plus, or small glow divider.
7) Typography should match the portfolio aesthetic:
   - uppercase
   - slightly increased tracking
   - medium contrast white/gray tones
8) Add subtle visual treatment:
   - soft borders or gradient edge fade
   - optional glass / blur strip background if it matches the existing UI
   - slight hover emphasis is okay, but keep it elegant
9) Make it responsive:
   - slightly smaller text on mobile
   - preserve spacing and avoid overflow glitches
10) Accessibility:
   - if prefers-reduced-motion is enabled, stop the infinite movement and show the items in a wrapped or static row
11) Avoid changing unrelated sections.
12) Keep code clean and reusable by extracting a small `TechMarquee` component if appropriate.

Expected output:
- Unified diff patch
- Mention exactly which file(s) were changed
- Include tunable constants for speed, gap, item opacity, and separator style
```

---

## 3) Recommended placement

Aapke current layout ke hisaab se Antigravity ko yeh placement suggest karo:

### Best option
- Skills cards ke **upper intro area aur grid ke beech** marquee band insert karo.

### Good alternative
- Skill cards grid ko do chunks mein split karke unke **beech marquee strip** daalo.

### Avoid
- Marquee ko page ke bilkul top ya bilkul bottom par mat daalo agar woh disconnected feel de.
- Bahut thick banner mat banao jo cards se attention chura le.

---

## 4) Suggested visual direction

Antigravity ko yeh styling direction do:

- Background: transparent ya very subtle glass strip
- Border: `border-y border-white/10`
- Text color: `text-white/70` with hover or highlight `text-white`
- Tracking: `tracking-[0.25em]` ya close equivalent
- Text transform: uppercase
- Marquee height: `56px` to `88px` range depending on breakpoint
- Edge fade: left/right gradient mask ya overlay for premium look
- Speed: slow to medium, readable, non-distracting

---

## 5) Suggested implementation structure

Agar Antigravity component banaye, toh yeh structure useful hoga:

```text
frontend/src/components/TechMarquee.jsx
```

Ya agar project abhi single-file structure mein hai, toh temporarily `App.jsx` ke andar add kar sakta hai.

### Suggested data structure

```js
const techStack = [
  "HTML",
  "CSS",
  "REACT",
  "N8N",
  "FIGMA",
  "BLENDER",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "POSTMAN",
  "APIs",
];
```

### Loop strategy

- Array ko at least 2 times render karo.
- Ek continuous track banao.
- TranslateX animation use karo.
- Animation end/start perfectly aligned ho taki visible jump na aaye.

---

## 6) Optional stronger cinematic follow-up prompt

Agar first version subtle aaye aur aapko zyada premium look chahiye, yeh second-pass prompt do:

```text
Refine the tech marquee in the Skills section:
- Make it feel more integrated into the portfolio’s cinematic dark aesthetic.
- Add subtle gradient edge fades.
- Improve spacing and typography hierarchy.
- Keep motion smooth and luxurious, not like a news ticker.
- Preserve performance and avoid flashy effects.
```

---

## 7) Suggested tuning values

Start yahan se:

- Marquee speed: `22s` to `32s` per full loop
- Item gap: `2.5rem` to `4rem`
- Font size desktop: `0.95rem` to `1.15rem`
- Font size mobile: `0.72rem` to `0.85rem`
- Strip padding Y: `0.85rem` to `1rem`
- Text opacity base: `0.65`
- Hover opacity: `1`
- Separator opacity: `0.35`

Agar movement too fast lage:
- duration increase karo

Agar marquee too empty lage:
- gap thoda reduce karo
- array ko extra repeat karo

Agar cheap ticker jaisa feel aaye:
- text size slightly badhao
- speed slow karo
- separators aur edge fade improve karo

---

## 8) Implementation checklist

- [ ] Skills section ke beech marquee strip inserted.
- [ ] Seamless infinite loop working.
- [ ] Tech stack list correct hai.
- [ ] Responsive layout maintained.
- [ ] Reduced motion fallback added.
- [ ] No horizontal page overflow.
- [ ] Existing design language preserved.
- [ ] No unnecessary dependency added.

---

## 9) One-line fallback prompt

```text
Add a seamless infinite marquee strip inside the Skills section that scrolls my tech stack items horizontally in a premium dark portfolio style, with responsive behavior and reduced-motion fallback.
```
