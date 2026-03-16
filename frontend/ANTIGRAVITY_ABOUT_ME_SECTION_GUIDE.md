# Antigravity Guide: Add a Poster-Style “About Me” Section (Between Hero and Skills)

Yeh guide Antigravity ko exact direction dene ke liye hai taaki tumhare portfolio mein **Hero aur Skills ke beech** ek bold, editorial, black-and-white + neon accent style **About Me** section बने — reference image ke look ke close.

---

## 1) Build objective (clear brief)

Antigravity ko yeh intent do:

1. Section placement: **Hero ke turant baad, Skills ke pehle**.
2. Visual style: dark textured background, monochrome portrait card, hand-drawn doodle accents, punchy typography.
3. Font style match: ek heavy headline font + ek handwritten/script accent font + clean sans body font.
4. Content structure reference image jaisa ho:
   - Small scripted title “About Me”
   - Left side tilted photo card
   - Right side huge “HI!!!” intro
   - 2 short paragraph blocks
   - Bottom contact chips/labels
5. Portrait ke liye **placeholder image** use karna hai (later replace karenge).
6. Existing app ka style break nahi hona chahiye.

---

## 2) Copy-paste master prompt for Antigravity

```text
Create a new “About Me” section in my React + Vite + Tailwind portfolio.

Important:
- Insert this section between Hero and Skills in App.jsx.
- Keep all existing sections intact.
- Match the visual vibe of a dark editorial poster:
  black grainy background, monochrome portrait card, white typography, hot-pink accent doodles.

Typography requirements (must use same style family feel):
- Big headline font for “HI!!!” (e.g., Anton or Archivo Black).
- Handwritten/script font for “About Me” accent (e.g., Caveat or Permanent Marker).
- Clean sans font for body copy (e.g., Inter).

Implementation requirements:
1) Create reusable component `AboutMeSection` (in App.jsx or separate component file).
2) Layout:
   - Desktop: 2-column layout
     left = tilted portrait card + decorative circle text / doodles
     right = large headline + short paragraphs
   - Mobile: stacked layout, preserve hierarchy.
3) Use a placeholder portrait image source and clear comment: “Replace with real portrait”.
4) Include decorative elements similar to reference:
   - small starburst shape
   - scribble/line accents
   - outlined chips at bottom for email/phone/portfolio link
5) Add subtle motion only:
   - section fade/slide on scroll
   - card slight hover tilt or lift
6) Accessibility:
   - semantic heading order
   - good contrast
   - links with focus-visible styles

Deliverables:
- Full code changes needed
- Any Tailwind class additions
- Exact integration snippet showing AboutMeSection inserted between Hero and Skills
- Keep code clean and componentized
```

---

## 3) Content pack to give Antigravity (editable)

```text
Use this content:

Eyebrow/script title:
- About Me

Main heading:
- HI!!!

Intro line:
- My name is [YOUR NAME], I’m a [designer / illustrator / developer] based in [LOCATION].

Paragraph block 1 title + text:
- Ever since
- I remember I’ve always had a special interest in visual communication,
  from the most simple sketch to the most elaborate presentation.

Paragraph block 2 title + text:
- I live to
- discover and experience creative ways to express myself and do it for others.

Bottom chips:
- yourname@email.com
- +00 000 000 000
- www.behance.net/yourprofile

Photo card notes:
- Add placeholder portrait image
- Optional badge text: “21 YEARS”, “NATIONALITY: XX-XX”
```

---

## 4) Font setup prompt (important for same feel)

```text
Please wire typography so the section has:
- Headline font: Anton (or Archivo Black fallback)
- Script accent font: Caveat (or Permanent Marker fallback)
- Body font: Inter

Load fonts using either:
- @import in src/index.css, or
- <link> in index.html

Then map utility classes in Tailwind-friendly way (custom class names are okay), for example:
- .font-headline
- .font-script
- .font-body

Apply:
- “HI!!!” => font-headline, very bold, tight line-height
- “About Me” => font-script, italic/handwritten effect
- Paragraphs/chips => font-body
```

---

## 5) Integration checklist (must pass)

- [ ] `AboutMeSection` created.
- [ ] Added between `<Hero />` and `<Skills />` in `App.jsx`.
- [ ] Placeholder portrait image included with replace comment.
- [ ] Font trio applied (headline/script/body).
- [ ] Dark textured background + neon pink accents included.
- [ ] Responsive layout verified (mobile/tablet/desktop).
- [ ] Keyboard focus visible for bottom links.
- [ ] No unrelated redesign.

---

## 6) Polish prompt (second pass)

```text
Refine only the About Me section:
- Make spacing and alignment closer to the reference poster style.
- Increase contrast in headline and key words.
- Keep decorative accents subtle and tasteful.
- Ensure the tilted photo card does not clip on small screens.
- Keep overall look premium and minimal, not cluttered.
Do not modify other sections.
```

---

## 7) Mobile optimization prompt (third pass)

```text
Optimize only About Me section for mobile:
- Stack elements cleanly.
- Keep “HI!!!” impactful without overflow.
- Reduce doodle clutter on very small screens.
- Keep portrait card centered and readable.
- Ensure chips wrap gracefully and remain tappable.
Return only necessary code edits.
```

---

## 8) One-line fallback prompt

```text
Rebuild a clean, responsive About Me section between Hero and Skills that matches the provided poster reference style (dark grain, bold headline, script accent, placeholder portrait) without changing any other section.
```
