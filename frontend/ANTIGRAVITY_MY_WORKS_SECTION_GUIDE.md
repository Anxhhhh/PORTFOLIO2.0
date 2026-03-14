# Antigravity Guide: Add a Premium "My Works" Section (Hackathons, Projects, Achievements)

Yeh guide aapko direct copy-paste prompts + step-by-step procedure dega so Antigravity aapke current portfolio mein ek strong **My Works** section add kare bina existing design break kiye.

---

## 1) Build objective (clear brief)

Antigravity ko yeh exact intent samjhao:

1. Existing visual style dark / premium hi rahe.
2. New section ka heading: **My Works**.
3. Is section ke andar 3 categories honi chahiye:
   - **Hackathons**
   - **Projects**
   - **Achievements**
4. Cards responsive ho (mobile, tablet, desktop).
5. Motion subtle ho (scroll reveal / hover), over-animation nahi.
6. Reusable data arrays use ho so aage content update easy ho.

---

## 2) Copy-paste master prompt for Antigravity

```text
Add a new “My Works” section to my React + Vite + Tailwind portfolio.

Important constraints:
- Keep the existing theme and typography style consistent with the current website.
- Do not redesign unrelated sections.
- Add this section after Skills (or before Contact if that fits current structure).

Section requirements:
1) Section title: “My Works”.
2) Include 3 content groups:
   - Hackathons
   - Projects
   - Achievements
3) Each group should render cards from data arrays (no hardcoded repeated JSX blocks).
4) Each card should support:
   - title
   - subtitle or role
   - date/year
   - short description (1-2 lines)
   - optional tech tags
   - optional external link (GitHub / demo / certificate)
5) Add clean hover interactions:
   - slight lift
   - border/glow emphasis
   - smooth transition
6) Add subtle entrance animation while in view.
7) Ensure accessibility:
   - semantic headings
   - sufficient contrast
   - keyboard focus styles for links/buttons
8) Make layout fully responsive:
   - mobile: single column
   - tablet: 2 columns where appropriate
   - desktop: balanced grid

Deliverables:
- Updated component code (App.jsx or extracted MyWorks.jsx)
- Any new reusable data constants
- Minimal styling changes using Tailwind utilities
- Final integration snippet showing where section is inserted
```

---

## 3) Better result ke liye data bhi prompt mein do

Antigravity ko content-ready data do, warna placeholder output aata hai.

Use this template:

```text
Use the following starter data:

Hackathons:
- Smart India Hackathon 2024 | Finalist | 2024
  Built [problem statement] using [tech stack], focused on [impact].
- HackX Delhi | Top 10 | 2023
  Created [project] with [team size] members.

Projects:
- AI Interview Prep Platform | Full Stack Project | 2024
  React, Node.js, MongoDB, OpenAI API.
- DevConnect | Social Platform for Developers | 2024
  MERN + JWT + real-time chat.
- Portfolio 2.0 | Personal Brand Website | 2025
  React, Tailwind, Framer Motion.

Achievements:
- Solved 500+ DSA problems across LeetCode/GFG.
- 3⭐ at CodeChef.
- Winner / Finalist in [specific contest].
```

Aap placeholders ko apne real details se replace kar do.

---

## 4) Recommended implementation procedure

1. **Backup checkpoint:**
   - Commit current state before generating.
2. **Run master prompt:**
   - Antigravity se first draft code lo.
3. **Ask for refactor pass:**
   - Ensure arrays + map rendering use hua hai.
4. **Ask for polish pass:**
   - spacing, typography, hover intensity fine tune.
5. **Ask for accessibility pass:**
   - focus rings, aria-labels, heading order.
6. **Run local check:**
   - no console errors, no layout break.
7. **Final content pass:**
   - dummy text replace with real achievements.

---

## 5) Prompt for second pass (polish)

```text
Good start. Now refine only the My Works section:
- Improve spacing rhythm and visual hierarchy.
- Keep animation subtle and professional.
- Make card heights consistent in each row.
- Add better link styling with visible focus ring.
- Reduce visual noise; keep premium minimal look.
Do not modify other sections.
```

---

## 6) Prompt for third pass (mobile optimization)

```text
Now optimize the My Works section for mobile:
- Ensure text is readable at small widths.
- Keep card padding balanced.
- Prevent overflow for long titles/tags.
- Keep tap targets comfortable.
- Verify smooth scroll performance.
Only return necessary code changes.
```

---

## 7) Quick acceptance checklist

- [ ] My Works section exists with 3 groups (Hackathons, Projects, Achievements)
- [ ] Data-driven cards via arrays/maps
- [ ] Consistent with current portfolio visual language
- [ ] Responsive across breakpoints
- [ ] Hover + reveal animations smooth, not distracting
- [ ] Keyboard focus visible on all interactive elements
- [ ] No unrelated section changes

---

## 8) One-line fallback prompt (if output is messy)

```text
Rebuild My Works section from scratch as a clean, data-driven, responsive grid with three categories (Hackathons, Projects, Achievements), preserving my existing theme and changing nothing outside that section.
```
