# Antigravity Guide: About Me Graphic Placement + Right Content Build

Yeh file Antigravity ko exact execution instructions dene ke liye hai.
Goal: About Me section ka left graphic area reference ke close ho, aur right side text block clean tarike se rebuild ho.

---

## Objective (strict)

1. Existing About Me section ko **fully redesign nahi** karna.
2. Sirf yeh do parts pe focus karna:
   - **Left side graphic zone** (jahan generated image style apply hoga)
   - **Right side text content block** (proper hierarchy + spacing)
3. Abhi ke liye generated final image ki jagah **placeholder image** use karna hai.
4. Section Hero ke baad aur Skills se pehle hi rehna chahiye.

---

## Master Prompt for Antigravity

```text
Update only the About Me section in my React + Vite frontend.

Do not redesign the whole page. Keep all other sections untouched.

Task focus:
1) LEFT SIDE GRAPHIC AREA
- Replace current left visual composition with a cleaner composition based on the provided reference image style.
- Use one temporary placeholder image for now (clear comment in code: "TODO: replace with final generated about image").
- Place the placeholder inside a styled frame/card so it feels like a poster/polaroid block.
- Add minimal decorative accents only if needed (small doodle/star/circle text), but keep it balanced and not cluttered.
- Ensure the graphic block is properly aligned vertically with right-side text on desktop.

2) RIGHT SIDE TEXT AREA
- Build a clean text layout with clear visual hierarchy:
  - Script/eyebrow: "About Me"
  - Main heading: "HI!!!"
  - Intro line with name + role + location
  - Two short paragraph groups
  - Optional contact chips/links at bottom
- Improve spacing, line length, and readability.
- Keep contrast high and typography consistent with current theme.

3) RESPONSIVE RULES
- Desktop: 2-column layout (left graphic, right text)
- Tablet/mobile: stack layout without overlap or clipping
- The left card must stay centered on small screens
- Heading should never overflow

4) ACCESSIBILITY + QUALITY
- Semantic headings and paragraph tags
- Alt text for placeholder image
- Visible focus state for interactive links/chips
- No breaking changes in other components

Deliverables:
- Exact code edits
- Mention where placeholder image path is set so it can be swapped later
```

---

## Placeholder Image Instruction (must include)

Use this temporary source until final generated image is integrated:

```text
Use placeholder image now.
Do not block implementation waiting for final asset.
Add TODO comment near image src for easy replacement.
```

Suggested placeholder options:
- `/public/about-placeholder.jpg` (preferred if adding local file)
- or `https://images.unsplash.com/...` temporary URL

---

## Suggested Content for Right Side

```text
About Me
HI!!!

My name is [Your Name], and I'm a [Designer/Illustrator/Developer] based in [City, Country].

Ever since I can remember, I’ve had a strong interest in visual storytelling —
from quick sketches to complete digital experiences.

I love exploring creative ways to express ideas and build meaningful work for people.
```

Optional chips:
- yourname@email.com
- +00 000 000 000
- portfolio link

---

## Done Criteria

- [ ] Left graphic block repositioned and visually closer to reference style
- [ ] Placeholder image integrated with TODO replace comment
- [ ] Right text block rebuilt with clean hierarchy
- [ ] Responsive behavior verified
- [ ] Only About Me section changed
