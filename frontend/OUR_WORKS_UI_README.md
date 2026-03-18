# Our Works UI Improvement README

This document explains exactly how to improve the **Our Works** section in this portfolio so that:

- Clicking **PROJECTS**, **HACKATHON**, or **ACHIEVEMENTS** opens the respective section.
- **Projects** displays **3 placeholder projects** for now.
- **Hackathon** and **Achievements** display a **"Not here yet, but soon"** style message.
- The **Projects** view has a **horizontal scrolling effect**.
- A **Go Back** button returns the user to the category selection view.
- The changes stay visually consistent with the current dark premium portfolio design.

> Important: This README is intentionally written as an implementation guide only. It does **not** make code changes by itself.

---

## 1. Goal of the UI update

The section should behave like a mini interactive showcase instead of a static grid.

### Desired user flow

1. User lands on the **Our Works** section.
2. User sees 3 top-level category cards/buttons:
   - **PROJECTS**
   - **HACKATHON**
   - **ACHIEVEMENTS**
3. When the user clicks one category:
   - the grid of categories disappears,
   - the selected panel opens,
   - content for that category is shown.
4. If the user opens **PROJECTS**:
   - show 3 placeholder project cards,
   - allow horizontal scrolling,
   - optionally support arrow buttons for smoother navigation.
5. If the user opens **HACKATHON** or **ACHIEVEMENTS**:
   - show a polished empty-state panel,
   - display messaging such as **"Not here yet, but soon."**
6. A **Go Back** button takes the user back to the category overview.

---

## 2. Where this should be implemented

In the current project structure, this work belongs inside:

- `frontend/src/App.jsx`

The current app already contains:

- an `OurWorks` component,
- `workSections` metadata,
- `placeholderProjects` data,
- `activeSection` state,
- `scrollProjects()` for horizontal scrolling,
- a conditional content renderer,
- a back button pattern.

So the update should mainly be a refinement or cleanup of the existing section rather than a brand-new rebuild.

---

## 3. Recommended architecture

Use a **data-driven structure** instead of hardcoding repeated UI blocks.

### Keep these 3 layers

#### A. Section metadata
Create an object for the three section definitions.

Suggested structure:

```js
const workSections = {
  projects: {
    label: "PROJECTS",
    eyebrow: "Featured Builds",
    title: "Placeholder projects with horizontal storytelling.",
    description: "Swipe or use arrows to explore the placeholder project cards.",
  },
  hackathon: {
    label: "HACKATHON",
    eyebrow: "Coming Soon",
    title: "Hackathon entries will appear here soon.",
    description: "Not here yet, but soon.",
  },
  achievements: {
    label: "ACHIEVEMENTS",
    eyebrow: "Coming Soon",
    title: "Achievements and milestones will live here soon.",
    description: "Not here yet, but soon.",
  },
};
```

#### B. Projects data array
Keep the projects in a dedicated array with 3 placeholder entries.

Suggested item shape:

```js
{
  title: "Nova Commerce",
  category: "E-commerce Platform",
  year: "2026",
  summary: "Short placeholder summary here.",
  stack: ["React", "Node.js", "Stripe"],
}
```

#### C. Interactive state
Track which section is currently open.

```js
const [activeSection, setActiveSection] = useState(null);
```

- `null` means the category overview is visible.
- `"projects"` means the projects panel is open.
- `"hackathon"` means the hackathon panel is open.
- `"achievements"` means the achievements panel is open.

---

## 4. Exact UI behavior to implement

### A. Default view: category chooser

When `activeSection === null`, show a grid of 3 cards/buttons.

Each card should:

- use the section label from `workSections`,
- be fully clickable,
- call `setActiveSection(key)` on click,
- include hover feedback,
- preserve the current dark premium style.

### B. Projects panel

When `activeSection === "projects"`, render:

- heading/eyebrow/title/description,
- left/right arrow buttons,
- horizontally scrollable project rail,
- 3 placeholder project cards.

### C. Hackathon panel

When `activeSection === "hackathon"`, render:

- a centered placeholder/empty-state panel,
- a heading,
- a subtle icon if desired,
- the line **"Not here yet, but soon."**

### D. Achievements panel

When `activeSection === "achievements"`, render the same empty-state pattern with achievements-specific title text and the same coming-soon line.

### E. Go Back button

When any panel is open (`activeSection` is not `null`), show a **Go Back** button near the top-right or top area.

On click:

```js
setActiveSection(null)
```

This should restore the 3-card category overview.

---

## 5. Step-by-step implementation plan

Follow this order while editing the UI.

### Step 1: Confirm section data

Make sure you have a `workSections` object with 3 entries:

- `projects`
- `hackathon`
- `achievements`

Each should include at least:

- `label`
- `eyebrow`
- `title`
- `description`

This keeps the section configurable and easy to update later.

---

### Step 2: Add/confirm placeholder project data

Create exactly **3 placeholder projects**.

Recommended placeholders:

1. **Nova Commerce**
2. **Pulse Board**
3. **Echo Space**

Each card should contain:

- title,
- category,
- year,
- short summary,
- tech stack tags.

If needed, add optional fields later such as:

- `href`
- `github`
- `demo`
- `image`

But for now, these are not required.

---

### Step 3: Add active section state

Inside `OurWorks`, create state for the selected category.

```js
const [activeSection, setActiveSection] = useState(null);
```

This state is the core of the whole interaction.

---

### Step 4: Render category buttons from data

Instead of writing 3 separate buttons manually, use:

```js
Object.entries(workSections).map(([key, item]) => ...)
```

Why this is better:

- less repeated JSX,
- easier to maintain,
- easier to reorder,
- consistent styling for all categories.

Each button should:

- call `setActiveSection(key)`,
- show `item.eyebrow`,
- show `item.label`,
- show helper text like:
  - `Click to open the projects panel`
  - `Click to open the hackathon panel`
  - `Click to open the achievements panel`

---

### Step 5: Add a content renderer

Create a helper function such as:

```js
const renderContent = () => {
  if (!activeSection) return null;

  if (activeSection === "projects") {
    return ...projects layout...;
  }

  return ...coming soon layout...;
};
```

This keeps the JSX clean and prevents the main return block from becoming too large.

---

### Step 6: Build the projects horizontal scrolling area

For the **PROJECTS** tab, use a horizontally scrollable container.

#### Recommended setup

Use a `ref`:

```js
const projectRailRef = useRef(null);
```

Then add a helper like:

```js
const scrollProjects = (direction) => {
  if (!projectRailRef.current) return;

  const rail = projectRailRef.current;
  const amount = rail.clientWidth * 0.82;

  rail.scrollBy({
    left: direction === "next" ? amount : -amount,
    behavior: "smooth",
  });
};
```

#### Why this works well

- scroll feels controlled,
- user can use trackpad/touch naturally,
- arrows improve desktop usability,
- cards remain large and premium.

#### Recommended rail classes

```html
<div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
```

This gives:

- horizontal layout,
- snap scrolling,
- hidden scrollbar,
- smooth, clean visual presentation.

---

### Step 7: Design the project cards

Each placeholder project card should feel like a featured case-study tile.

Include:

- top row: category + year,
- center: project title + summary,
- bottom: tech tags + CTA button,
- background gradient / border accent,
- hover polish.

#### Suggested card design rules

- `min-h-[360px]`
- `min-w-[85%]` on mobile
- `md:min-w-[48%]`
- `xl:min-w-[32%]`
- `snap-center`
- border with subtle transparency
- soft radial highlight or glow

#### CTA button options

Use one of these texts:

- `View Concept`
- `View Project`
- `Explore`

Even if the link is not wired yet, keep the CTA visually present for layout realism.

---

### Step 8: Add the empty-state panel for non-project tabs

For **HACKATHON** and **ACHIEVEMENTS**, use a single reusable empty-state layout.

The panel should include:

- subtle border,
- centered icon,
- eyebrow label,
- title,
- supporting copy,
- the message:

```text
Not here yet, but soon.
```

#### Why a shared empty-state is better

- consistent UX,
- avoids unnecessary duplication,
- easy to swap with real content later.

---

### Step 9: Add the Go Back button

Show the button only when a panel is active.

```js
{activeSection && (
  <button type="button" onClick={() => setActiveSection(null)}>
    Go Back
  </button>
)}
```

#### UX recommendation

The back button should:

- appear above the panel,
- be visible immediately,
- use an icon like `ArrowLeft`,
- have rounded full styling,
- match the site theme.

This creates a clear escape path for the user.

---

### Step 10: Add subtle animation

Use motion sparingly.

Recommended animations:

- category grid fades/slides in,
- selected panel fades up,
- project cards stagger in slightly,
- hover causes a small lift or border emphasis,
- avoid heavy scale or exaggerated transitions.

#### Good motion values

- `duration: 0.4` to `0.6`
- `y: 20` or `24`
- opacity fade from `0` to `1`
- slight delay by card index for projects only

The site already has a premium minimal aesthetic, so the motion should feel elegant rather than flashy.

---

## 6. Recommended visual design direction

To keep the updated UI aligned with the rest of the portfolio:

### Use these design principles

- **Dark layered surfaces**
- **Soft transparent borders**
- **Subtle red accent** for important metadata
- **Light typography with spacious tracking**
- **Large section titles**
- **Minimal but polished hover states**

### Avoid these mistakes

Do **not**:

- add bright multicolor gradients everywhere,
- use oversized shadows,
- make buttons too rounded/cartoonish,
- add too much animation,
- introduce a new design system that clashes with Hero/Skills.

---

## 7. Content guidelines for each category

### PROJECTS

Use 3 placeholder cards only for now.

Recommended placeholder content style:

- believable product names,
- modern startup-style summaries,
- concise stack labels,
- no overly long paragraphs.

### HACKATHON

Use empty-state copy such as:

- `Hackathon entries will appear here soon.`
- `Not here yet, but soon.`

### ACHIEVEMENTS

Use empty-state copy such as:

- `Achievements and milestones will live here soon.`
- `Not here yet, but soon.`

---

## 8. Accessibility requirements

Do not skip this part.

### Buttons

All clickable category cards must be real `<button>` elements.

### Arrow controls

Arrow buttons for the project rail must include clear `aria-label`s:

- `Scroll projects left`
- `Scroll projects right`

### Focus visibility

Make sure keyboard users can see focus states on:

- category cards,
- project CTA button,
- left/right arrows,
- go back button.

### Text contrast

Gray-on-dark text should remain readable.

Use supporting text like `text-gray-400` or `text-gray-300`, but make sure headings remain strongly visible in white or near-white.

---

## 9. Responsive behavior requirements

### Mobile

- category cards stack in one column,
- projects rail shows one dominant card at a time,
- horizontal swipe should feel natural,
- button sizes should remain easy to tap.

### Tablet

- category grid can move to 2 or 3 columns depending on balance,
- project cards can become wider but still scroll horizontally.

### Desktop

- category grid displays all 3 choices comfortably,
- project arrow controls sit beside the heading block,
- card widths feel curated rather than stretched edge-to-edge.

---

## 10. Suggested development checklist

Use this checklist while implementing.

### Structure

- [ ] `OurWorks` section exists in the correct location.
- [ ] `workSections` contains 3 categories.
- [ ] `placeholderProjects` contains exactly 3 entries.
- [ ] `activeSection` controls which panel is visible.

### Interaction

- [ ] Clicking **PROJECTS** opens the projects showcase.
- [ ] Clicking **HACKATHON** opens the hackathon placeholder panel.
- [ ] Clicking **ACHIEVEMENTS** opens the achievements placeholder panel.
- [ ] Clicking **Go Back** returns to the category overview.
- [ ] Arrow buttons scroll the project rail.

### Layout

- [ ] Project cards scroll horizontally.
- [ ] Project cards snap nicely while scrolling.
- [ ] Empty-state panels are centered and polished.
- [ ] Spacing is balanced on mobile and desktop.

### Quality

- [ ] No unrelated sections were modified.
- [ ] The design remains consistent with the portfolio theme.
- [ ] Keyboard focus is visible.
- [ ] No overflow or broken alignment appears.

---

## 11. Suggested prompt if using Antigravity/Codex again

If you want an AI coding assistant to implement this cleanly, use this prompt:

```text
Improve the “Our Works” section in my React + Vite + Tailwind portfolio without changing unrelated sections.

Requirements:
- Show 3 category buttons/cards: PROJECTS, HACKATHON, ACHIEVEMENTS.
- When a category is clicked, open its respective panel.
- PROJECTS should show 3 placeholder project cards.
- Add horizontal scrolling for the projects panel with optional left/right controls.
- HACKATHON and ACHIEVEMENTS should show a polished empty-state message saying “Not here yet, but soon.”
- Add a Go Back button to return to the category selection view.
- Keep the dark premium visual style already used in the website.
- Use reusable data arrays/objects instead of repeated hardcoded JSX.
- Keep motion subtle and responsive.
- Maintain accessibility with semantic buttons and aria-labels.

Return only the necessary code changes.
```

---

## 12. If you want to improve it further later

Once real content is ready, the next upgrades can be:

1. replace placeholder projects with real portfolio case studies,
2. add project links to GitHub/live demo,
3. add screenshots or cover images,
4. replace hackathon empty-state with actual hackathon cards,
5. replace achievements empty-state with achievements timeline/cards,
6. add keyboard arrow support for the projects rail,
7. add scroll progress indicator for the horizontal rail.

---

## 13. Final implementation summary

To achieve the requested UI:

- keep the **Our Works** section interactive,
- render the 3 category options first,
- open the selected category on click,
- show **3 placeholder project cards** in the **PROJECTS** panel,
- show **"Not here yet, but soon."** for **HACKATHON** and **ACHIEVEMENTS**,
- add a **horizontal scrolling effect** for project cards,
- add a **Go Back** button to return to the category overview,
- keep everything visually aligned with the current dark premium portfolio style.

This is the cleanest and most scalable way to deliver the exact behavior you asked for.
